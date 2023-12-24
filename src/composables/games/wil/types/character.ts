import { WilStatus } from "@/composables/games/wil/types/status";
import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import { WIL_SKILL_ID, WIL_SKILL_TYPE } from "../enums/skill";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilSkill } from "./skill";
import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_CONDITION_ID } from "../enums/condition";
import { WilTrainingMenu, WilTrainingResult } from "./training";
import { WilBattleDamegeResult, WilBattleMoveResult } from "./battle";
import { WilConditionUtil } from "./condition";
import { WilFieldCell } from "./field";
import { WIL_CHARACTER_ID } from "../enums/character";
import GOUImage from "@/composables/types/visuals/GOUImage";

export class WilCharacter {
  readonly id: string;
  readonly name: string;
  visual: {
    current: GOUVisual;
    standing: GOUVisual;
    closePhisic: GOUVisual;
    shootPhisic: GOUVisual;
    magic: GOUVisual;
  };
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
      id: WIL_CHARACTER_ID;
      name: string;
      visual: {
        standing: WIL_IMAGE_ID;
        closePhisic?: WIL_IMAGE_ID;
        shootPhisic?: WIL_IMAGE_ID;
        magic?: WIL_IMAGE_ID;
      };
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
    this.id = `${define.id}_${sequence}`;
    this.name = define.name;
    this.visual = {
      current: (images[define.visual.standing] as GOUImage).deepCopy(),
      standing: images[define.visual.standing],
      closePhisic: define.visual.closePhisic
        ? images[define.visual.closePhisic]
        : images[define.visual.standing],
      shootPhisic: define.visual.shootPhisic
        ? images[define.visual.shootPhisic]
        : images[define.visual.standing],
      magic: define.visual.magic
        ? images[define.visual.magic]
        : images[define.visual.standing],
    };
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
    const result = new WilTrainingResult(menu, this.defaultStatus.deepCopy());
    // ステータスの上昇
    this.defaultStatus = WilStatus.add(this.defaultStatus, menu.getRise());
    result.after = this.defaultStatus.deepCopy();
    // スキルの習得
    result.learned = this.learn(menu, skills);

    return result;
  }

  /**
   * スキルを習得する
   * @returns 習得したスキル
   */
  learn(
    menu: WilTrainingMenu,
    skills: { [key: string]: WilSkill }
  ): WilSkill | undefined {
    const learnedSKillList = this.getSkillIdList();
    let sortedSkilList = [];
    // 以下の条件で習得可能なスキルのリストを絞込む
    // - スキルの属性が無属性またはキャラクターの属性とスキルの属性が一致している
    // - キャラクターの持っているスキル種別に含まれている
    // - 未習得
    for (let key of Object.keys(skills)) {
      if (
        skills[key].element !== WIL_ELEMENT.NONE &&
        skills[key].element !== this.element
      ) {
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
      let learnRate = skill.learnRate * 0.01;
      if (
        [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.SHOOT_PHISIC].includes(
          skill.type
        )
      ) {
        learnRate *= menu.learnRate.phisic * 0.01;
      } else if (
        [WIL_SKILL_TYPE.ATTACK_MAGIC, WIL_SKILL_TYPE.SUPPORT_MAGIC].includes(
          skill.type
        )
      ) {
        learnRate *= menu.learnRate.magic * 0.01;
      }
      const rnd = Math.random();
      console.log("learnRate", rnd, learnRate);
      // 乱数で習得可否を判定
      if (rnd >= learnRate) {
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
    this.stack += WilStatus.MAX_STATUS + 1 - this.status.speed;
    if (this.condition === WIL_CONDITION_ID.MUDDY) {
      // 泥々の場合はスタック数中上昇
      this.stack += WilConditionUtil.calcIncreaseStack(
        this.stack,
        WilConditionUtil.MEDIUM_STACK_RATE
      );
    } else if (this.condition === WIL_CONDITION_ID.PARALYSIS) {
      // 麻痺の場合はスタック数弱上昇
      this.stack += WilConditionUtil.calcIncreaseStack(
        this.stack,
        WilConditionUtil.LITTELE_DAMAGE_RATE
      );
    }
  }

  /**
   * スキルを発動する（ダメージ計算処理はBattleクラスが行う）
   * @param skill 発動するスキル
   * @returns 発動に成功すればtrue、失敗した場合はfalse
   */
  useSkill(skill: WilSkill) {
    const cost = WilSkill.calcCost(this.condition, skill);
    this.stack += cost;
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
  overwriteCondition(condition: WIL_CONDITION_ID): WilBattleMoveResult {
    if (
      this.condition === WIL_CONDITION_ID.HOLY &&
      condition !== WIL_CONDITION_ID.HOLY
    ) {
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
  processConditionPassiveStart() {
    if (this.condition === WIL_CONDITION_ID.DEBILITY) {
      // 攻撃力弱減少+防御力弱減少
      this.status.attack -= WilConditionUtil.calcDecrease(
        this.status.attack,
        this.defaultStatus.attack,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
      this.status.defense -= WilConditionUtil.calcDecrease(
        this.status.defense,
        this.defaultStatus.defense,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
    } else if (this.condition === WIL_CONDITION_ID.PARALYSIS) {
      // 攻撃力弱減少
      this.status.attack -= WilConditionUtil.calcDecrease(
        this.status.attack,
        this.defaultStatus.attack,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
    } else if (this.condition === WIL_CONDITION_ID.WEATHERING) {
      // 防御力中減少
      this.status.defense -= WilConditionUtil.calcDecrease(
        this.status.defense,
        this.defaultStatus.defense,
        WilConditionUtil.MEDIUM_DECREASE_RATE
      );
    } else if (this.condition === WIL_CONDITION_ID.BURN) {
      // 防御力弱減少
      this.status.defense -= WilConditionUtil.calcDecrease(
        this.status.defense,
        this.defaultStatus.defense,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
    }
  }

  /**
   * 現在の状態異常のパッシブ解除処理を行う
   */
  processConditionPassiveEnd() {
    if (this.condition === WIL_CONDITION_ID.DEBILITY) {
      // 攻撃力弱増加+防御力弱増加
      this.status.attack += WilConditionUtil.calcIncrease(
        this.defaultStatus.attack,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
      this.status.defense += WilConditionUtil.calcIncrease(
        this.defaultStatus.defense,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
    } else if (this.condition === WIL_CONDITION_ID.PARALYSIS) {
      // 攻撃力弱増加
      this.status.attack += WilConditionUtil.calcIncrease(
        this.defaultStatus.attack,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
    } else if (this.condition === WIL_CONDITION_ID.WEATHERING) {
      // 防御力中増加
      this.status.defense += WilConditionUtil.calcIncrease(
        this.defaultStatus.defense,
        WilConditionUtil.MEDIUM_DECREASE_RATE
      );
    } else if (this.condition === WIL_CONDITION_ID.BURN) {
      // 防御力弱増加
      this.status.attack -= WilConditionUtil.calcIncrease(
        this.defaultStatus.attack,
        WilConditionUtil.LITTELE_DECREASE_RATE
      );
    }
  }

  /**
   * 現在の状態異常のターン終了時処理を行う
   * @param cell キャラクターのいるマス（ダメージ表示用）
   * @returns 処理結果
   */
  processConditionTurnEnd(cell: WilFieldCell): WilBattleMoveResult | undefined {
    if (this.condition === WIL_CONDITION_ID.BURN) {
      // 弱ダメージ
      const damage = WilConditionUtil.calcDamage(
        this.defaultStatus.life,
        WilConditionUtil.LITTELE_DAMAGE_RATE
      );
      this.status.life -= damage;
      if (this.status.life < 0) {
        this.status.life = 0;
      }
      return new WilBattleMoveResult({
        message: [
          `${this.name}は${WilConditionUtil.getLabel(
            this.condition
          )}によって${damage}のダメージを受けた。`,
        ],
        damage: [
          new WilBattleDamegeResult({
            cell: cell,
            damage: damage,
          }),
        ],
      });
    } else if (this.condition === WIL_CONDITION_ID.POISON) {
      // 中ダメージ
      const damage = WilConditionUtil.calcDamage(
        this.defaultStatus.life,
        WilConditionUtil.MEDIUM_DAMAGE_RATE
      );
      this.status.life -= damage;
      if (this.status.life < 0) {
        this.status.life = 0;
      }
      return new WilBattleMoveResult({
        message: [
          `${this.name}は${WilConditionUtil.getLabel(
            this.condition
          )}によって${damage}のダメージを受けた。`,
        ],
        damage: [
          new WilBattleDamegeResult({
            cell: cell,
            damage: damage,
          }),
        ],
      });
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
