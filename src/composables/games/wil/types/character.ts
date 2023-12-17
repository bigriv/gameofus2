import { WilStatus } from "@/composables/games/wil/types/status";
import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import { WIL_SKILL_ID, WIL_SKILL_TYPE } from "../enums/skill";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilSkill } from "./skill";
import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_CONDITION_ID } from "../enums/condition";
import { WilTrainingMenu, WilTrainingResult } from "./training";
import { WilBattleMoveResult } from "./battle";
import { WilConditionUtil } from "./condition";

export class WilCharacter {
  readonly id: string;
  readonly name: string;
  visual: GOUVisual;
  miniVisual: GOUVisual;
  skills: Array<WilSkill> = [];
  skillType: Array<WIL_SKILL_TYPE>;
  defaultStatus: WilStatus;
  status: WilStatus;
  condition: WIL_CONDITION_ID = WIL_CONDITION_ID.HEALTH;
  conditionCount: number = 0;
  element: WIL_ELEMENT;
  stack: number = 0;

  constructor(
    sequence: number,
    define: {
      name: string;
      visual: WIL_IMAGE_ID;
      miniVisual: WIL_IMAGE_ID;
      status: {
        life: number;
        attack: number;
        defense: number;
        speed: number;
        magic: number;
      };
      element: WIL_ELEMENT;
      skills?: Array<WIL_SKILL_ID>;
      skillType: Array<WIL_SKILL_TYPE>;
    },
    skills: { [key: string]: WilSkill },
    images: { [key: string]: GOUVisual }
  ) {
    this.id = String(sequence);
    this.name = define.name;
    this.visual = images[define.visual];
    this.miniVisual = images[define.miniVisual];
    this.defaultStatus = new WilStatus(define.status);
    this.status = new WilStatus(define.status);
    this.element = define.element ?? WIL_ELEMENT.NONE;
    this.skills = define.skills?.map((id) => skills[id]) ?? [];
    this.skillType = define.skillType;
  }

  /**
   * キャラクターのステータス等をリセットする
   */
  reset() {
    // ターンスタックの初期化
    this.stack = 1000 - this.defaultStatus.speed;

    // ステータスの初期化
    this.status = this.defaultStatus.deepCopy();
    this.condition = WIL_CONDITION_ID.HEALTH;
  }

  /**
   * 習得済みスキルのIDリストを取得する
   * @returns 習得済みスキルのIDリスト
   */
  getSkillIdList(): Array<WIL_SKILL_ID> {
    return this.skills.map((skill) => skill.id);
  }

  /**
   * 訓練を行う
   * @param menu 訓練メニュー
   * @returns 訓練結果
   */
  training(
    menu: WilTrainingMenu,
    skills: { [key: string]: WilSkill }
  ): WilTrainingResult {
    const result = new WilTrainingResult(
      menu.id,
      this.defaultStatus.deepCopy()
    );
    // ステータスの上昇
    this.defaultStatus = WilStatus.add(this.defaultStatus, menu.getRise());
    result.after = this.defaultStatus.deepCopy();
    // スキルの習得
    result.learned = this.learn(skills);

    return result;
  }

  /**
   * スキルを習得する
   * @returns 習得したスキル
   */
  learn(skills: { [key: string]: WilSkill }): WilSkill | undefined {
    const learnedSKillList = this.getSkillIdList();
    let sortedSkilList = [];
    // 以下の条件で習得可能なスキルのリストを絞込む
    // - キャラクターの属性とスキルの属性が一致している
    // - キャラクターの持っているスキル種別に含まれている
    // - 未習得
    for (let key of Object.keys(skills)) {
      if (skills[key].element !== this.element) {
        continue;
      }
      if (!this.skillType.includes(skills[key].type)) {
        continue;
      }
      if (learnedSKillList.includes(skills[key].id)) {
        continue;
      }
      sortedSkilList.push(skills[key]);
    }
    // 習得可能なスキルのリストを習得率の高い順に並び変える
    sortedSkilList = sortedSkilList.sort((a, b) => b.learnRate - a.learnRate);

    // スキル習得判定
    for (let skill of sortedSkilList) {
      // 乱数で習得可否を判定
      if (Math.random() >= skill.learnRate) {
        continue;
      }
      this.skills.push(skill);
      return skill;
    }
    return undefined;
  }

  /**
   * マスを移動する（座標の変更はFieldで行う）
   */
  migrate() {
    // TODO: 消費ターン数について要調整
    this.stack += Math.floor((1000 - this.status.speed) / 10);
  }

  /**
   * スキルを発動する（ダメージ計算処理はBattleクラスが行う）
   * @param skill 発動するスキル
   * @returns 発動に成功すればtrue、失敗した場合はfalse
   */
  useSkill(skill: WilSkill) {
    this.stack += skill.cost;
  }

  /**
   * スキルの発動可否判定を行う
   * @param skill 発動するスキル
   * @returns 発動可能ならtrue、不可ならfalse
   */
  isUsableSkill(skill: WilSkill): boolean {
    return this.getSkillIdList().includes(skill.id);
  }

  /**
   * ターンをスキップする
   * @param stack 次のターンキャラクターのスタック数
   */
  skip(stack: number) {
    this.stack = stack + 1;
  }

  /**
   * 状態異常を上書きし、経過ターン数をリセットする
   * @param condition 上書き後の状態異常
   * @returns 上書きに成功した場合はtrue、失敗した場合はfalse
   */
  overwriteCondition(
    condition: WIL_CONDITION_ID
  ): WilBattleMoveResult | undefined {
    if (this.condition === WIL_CONDITION_ID.HOLY) {
      return new WilBattleMoveResult({
        message: [
          `${this.name}は${WilConditionUtil.getLabel(
            this.condition
          )}のため、状態異常にかからない！`,
        ],
      });
    }
    this.condition = condition;
    this.conditionCount = 0;
    return new WilBattleMoveResult({
      message: [
        `${this.name}は${WilConditionUtil.getLabel(
          this.condition
        )}状態になった。`,
        `（${WilConditionUtil.getDescription(this.condition)}）`,
      ],
    });
  }

  /**
   * 現在の状態異常のパッシブ適用処理を行う
   * @returns パッシブ適用結果
   */
  processConditionPassiveStart(): WilBattleMoveResult | undefined {
    if (this.condition === WIL_CONDITION_ID.DEBILITY) {
      // TODO: 攻撃力弱減少+防御力弱減少
    } else if (this.condition === WIL_CONDITION_ID.PARALYSIS) {
      // TODO: 攻撃力弱減少
    } else if (this.condition === WIL_CONDITION_ID.WEATHERING) {
      // TODO: 防御力中減少
    } else if (this.condition === WIL_CONDITION_ID.BURN) {
      // 防御力弱減少
      const decrease = this.defaultStatus.attack * 0.1;
      this.status.attack -= decrease;
      if (this.status.attack <= 0) {
        this.status.attack = 0;
      }
      return new WilBattleMoveResult({
        message: [
          `${WilConditionUtil.getLabel(
            this.condition
          )}の効果で防御力が10%減少した。`,
        ],
      });
    }
    return undefined;
  }

  /**
   * 現在の状態異常のパッシブ解除処理を行う
   */
  processConditionPassiveEnd() {
    if (this.condition === WIL_CONDITION_ID.DEBILITY) {
      // TODO: 攻撃力弱増加+防御力弱増加
    } else if (this.condition === WIL_CONDITION_ID.PARALYSIS) {
      // TODO: 攻撃力弱増加
    } else if (this.condition === WIL_CONDITION_ID.WEATHERING) {
      // TODO: 防御力中増加
    } else if (this.condition === WIL_CONDITION_ID.BURN) {
      // TODO: 防御力弱増加
      const increase = this.defaultStatus.attack * 0.1;
      // 初期値を超えた場合は別のパッシブが働いているとみなすため、超過判定は行わない
      this.status.attack += increase;
    }
  }

  /**
   * 現在の状態異常のターン終了時処理を行う
   * @returns 処理結果
   */
  processConditionTurnEnd(): WilBattleMoveResult | undefined {
    if (this.condition === WIL_CONDITION_ID.BURN) {
      // TODO: 弱ダメージ
    } else if (this.condition === WIL_CONDITION_ID.POISON) {
      // TODO: 中ダメージ
    } else if (this.condition === WIL_CONDITION_ID.MUDDY) {
      // TODO: スタック中増加
    } else if (this.condition === WIL_CONDITION_ID.PARALYSIS) {
      // TODO: スタック弱増加
    }
    return undefined;
  }

  /**
   * 状態異常の回復処理を行う
   * @returns 回復結果
   */
  recoveryCondition(): WilBattleMoveResult | undefined {
    // 経過ターン数を加算
    this.conditionCount++;
    if (this.conditionCount < WilConditionUtil.SUSTAINED_TURN) {
      return undefined;
    }
    // 一定ターン以上経過していれば状態異常を健康にする
    this.condition = WIL_CONDITION_ID.HEALTH;
    this.conditionCount = 0;
    return new WilBattleMoveResult({
      message: [
        `${this.name}が受けていた${WilConditionUtil.getLabel(
          this.condition
        )}の影響が消えた。`,
      ],
    });
  }

  /**
   * 行動順を比較する
   * satckの少ない順⇒敏捷力の高い順⇒id順で速さを比較を行う
   * @param a 比較対象のキャラクター
   * @param b 比較対象のキャラクター
   * @returns aよりbのほうが速く行動できるならtrue、遅い場合はfalse
   */
  static compareMoveSequense(a: WilCharacter, b: WilCharacter): boolean {
    // satckの少ない順⇒敏捷力の高い順⇒id順で速さを比較
    if (a.stack < b.stack) {
      return true;
    } else if (a.stack > b.stack) {
      return false;
    }

    if (a.status.speed > b.status.speed) {
      return true;
    } else if (a.status.speed < b.status.speed) {
      return false;
    }

    return a.id.localeCompare(b.id) < 0;
  }
}
