import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_TRAINING_ID } from "../enums/training";
import { WilStatus } from "./status";
import { WilSkill } from "./skill";
import { WilCharacter } from "./character";
import { WIL_TRAINING_DEFINES } from "../defines/training";

/**
 * 訓練の管理クラス
 */
export class WilTraining {
  static readonly TRAINING_DAYS = 7;
  days: number = 0;
  plan: {
    attack: WilTrainingPlan;
    defense: WilTrainingPlan;
    migration: WilTrainingPlan;
    magic: WilTrainingPlan;
    phisic: WilTrainingPlan;
  };
  readonly defaultSelectableCharacter: Array<WilCharacter> = [];
  selectableCharacters: Array<WilCharacter> = [];
  results: Array<WilTrainingResult> = [];
  log: Array<string> = [];

  constructor(
    characters: Array<WilCharacter>,
    images: { [key: string]: GOUVisual }
  ) {
    this.plan = {
      attack: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.ATTACK.id,
          name: WIL_TRAINING_DEFINES.ATTACK.name,
          image: images[WIL_TRAINING_DEFINES.ATTACK.image],
          minRise: new WilStatus(WIL_TRAINING_DEFINES.ATTACK.minRise),
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.ATTACK.maxRise),
          learnRate: WIL_TRAINING_DEFINES.ATTACK.learnRate,
        }),
      },
      defense: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.DEFENSE.id,
          name: WIL_TRAINING_DEFINES.DEFENSE.name,
          image: images[WIL_TRAINING_DEFINES.DEFENSE.image],
          minRise: new WilStatus(WIL_TRAINING_DEFINES.DEFENSE.minRise),
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.DEFENSE.maxRise),
          learnRate: WIL_TRAINING_DEFINES.DEFENSE.learnRate,
        }),
      },
      migration: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.MIGRATION.id,
          name: WIL_TRAINING_DEFINES.MIGRATION.name,
          image: images[WIL_TRAINING_DEFINES.MIGRATION.image],
          minRise: new WilStatus(WIL_TRAINING_DEFINES.MIGRATION.minRise),
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.MIGRATION.maxRise),
          learnRate: WIL_TRAINING_DEFINES.MIGRATION.learnRate,
        }),
      },
      magic: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.MAGIC.id,
          name: WIL_TRAINING_DEFINES.MAGIC.name,
          image: images[WIL_TRAINING_DEFINES.MAGIC.image],
          minRise: new WilStatus(WIL_TRAINING_DEFINES.MAGIC.minRise),
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.MAGIC.maxRise),
          learnRate: WIL_TRAINING_DEFINES.MAGIC.learnRate,
        }),
      },
      phisic: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.PHISIC.id,
          name: WIL_TRAINING_DEFINES.PHISIC.name,
          image: images[WIL_TRAINING_DEFINES.PHISIC.image],
          minRise: new WilStatus(WIL_TRAINING_DEFINES.PHISIC.minRise),
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.PHISIC.maxRise),
          learnRate: WIL_TRAINING_DEFINES.PHISIC.learnRate,
        }),
      },
    };

    this.defaultSelectableCharacter = [...characters];
    this.selectableCharacters = [...characters];
  }

  /**
   * 訓練をリセットする
   */
  reset() {
    this.plan.attack.character = undefined;
    this.plan.defense.character = undefined;
    this.plan.migration.character = undefined;
    this.plan.magic.character = undefined;
    this.plan.phisic.character = undefined;
    this.selectableCharacters = [...this.defaultSelectableCharacter];
    this.results = [];
  }

  /**
   * 訓練結果をセットし、ログに記録する
   * @param results 訓練結果
   */
  setTrainingResults(results: Array<WilTrainingResult>) {
    if (results.length <= 0) {
      return;
    }
    this.results = results;
    const log = new Array<string>();
    log.push(`----${this.days}日目の訓練----`);

    for (let result of results) {
      log.push(`【${result.character.name}の${result.menu.name}結果】`);
      log.push(`体力:${result.before.life}⇒${result.after.life}`);
      log.push(`攻撃力:${result.before.attack}⇒${result.after.attack}`);
      log.push(`防御力:${result.before.defense}⇒${result.after.defense}`);
      log.push(`魔力:${result.before.magic}⇒${result.after.magic}`);
      log.push(`敏捷力:${result.before.speed}⇒${result.after.speed}`);
      if (result.learned) {
        log.push(`${result.learned.name}を習得した。`);
      }
    }
    this.log.push(...log);
  }
  /**
   * 訓練の1日を開始する
   */
  startDay() {
    this.reset();
    this.days++;
  }

  process(skills: { [key: string]: WilSkill }): Array<WilTrainingResult> {
    const result = new Array<WilTrainingResult>();
    // 訓練の順番を担保するためにループではなく個別に処理
    if (this.plan.attack.character) {
      result.push(
        this.plan.attack.character.training(this.plan.attack.menu, skills)
      );
    }
    if (this.plan.defense.character) {
      result.push(
        this.plan.defense.character.training(this.plan.defense.menu, skills)
      );
    }
    if (this.plan.migration.character) {
      result.push(
        this.plan.migration.character.training(this.plan.migration.menu, skills)
      );
    }
    if (this.plan.magic.character) {
      result.push(
        this.plan.magic.character.training(this.plan.magic.menu, skills)
      );
    }
    if (this.plan.phisic.character) {
      result.push(
        this.plan.phisic.character.training(this.plan.phisic.menu, skills)
      );
    }

    this.setTrainingResults(result);

    return result;
  }

  /**
   * 訓練の終了判定を行う
   * @returns 訓練の終了条件を満たしていればtrue、それ以外はfalse
   */
  isEnd(): boolean {
    return this.days >= WilTraining.TRAINING_DAYS;
  }

  /**
   * 指定した訓練にキャラクターをセットする
   * @param trainingId 実施する訓練のID
   * @param character 訓練を行うキャラクター
   */
  setCharacter(trainingId: WIL_TRAINING_ID, character: WilCharacter) {
    let temp = undefined;
    switch (trainingId) {
      case WIL_TRAINING_ID.ATTACK:
        temp = this.plan.attack.character;
        this.plan.attack.character = character;
        break;
      case WIL_TRAINING_ID.DEFENSE:
        temp = this.plan.defense.character;
        this.plan.defense.character = character;
        break;
      case WIL_TRAINING_ID.MIGRATION:
        temp = this.plan.migration.character;
        this.plan.migration.character = character;
        break;
      case WIL_TRAINING_ID.MAGIC:
        temp = this.plan.magic.character;
        this.plan.magic.character = character;
        break;
      case WIL_TRAINING_ID.PHISIC:
        temp = this.plan.phisic.character;
        this.plan.phisic.character = character;
        break;
    }

    // 選択可能リストに元々セットされていたキャラクターを追加する
    if (temp) {
      this.selectableCharacters.push(temp);
      this.selectableCharacters.sort((a: WilCharacter, b: WilCharacter) =>
        a.id.localeCompare(b.id)
      );
    }

    // 選択可能リストから配置するキャラクターを削除
    this.selectableCharacters = this.selectableCharacters.filter(
      (c: WilCharacter) => c.id !== character?.id
    );
  }

  /**
   * 訓練にセットされているキャラクターを排除し、選択可能リストに戻す
   * @param trainingId キャラクターを排除する訓練のID
   */
  removeCharacter(trainingId: WIL_TRAINING_ID) {
    let temp = undefined;
    switch (trainingId) {
      case WIL_TRAINING_ID.ATTACK:
        temp = this.plan.attack.character;
        this.plan.attack.character = undefined;
        break;
      case WIL_TRAINING_ID.DEFENSE:
        temp = this.plan.defense.character;
        this.plan.defense.character = undefined;
        break;
      case WIL_TRAINING_ID.MIGRATION:
        temp = this.plan.migration.character;
        this.plan.migration.character = undefined;
        break;
      case WIL_TRAINING_ID.MAGIC:
        temp = this.plan.magic.character;
        this.plan.magic.character = undefined;
        break;
      case WIL_TRAINING_ID.PHISIC:
        temp = this.plan.phisic.character;
        this.plan.phisic.character = undefined;
        break;
    }

    // 選択可能リストに元々セットされていたキャラクターを追加する
    if (temp) {
      this.selectableCharacters.push(temp);
      this.selectableCharacters.sort((a: WilCharacter, b: WilCharacter) =>
        a.id.localeCompare(b.id)
      );
    }
  }
}

/**
 * 訓練予定型
 */
export type WilTrainingPlan = {
  menu: WilTrainingMenu;
  character?: WilCharacter;
};

/**
 * 訓練メニュークラス
 */
export class WilTrainingMenu {
  readonly id: WIL_TRAINING_ID;
  readonly name: string;
  readonly image: GOUVisual;
  readonly minRise: WilStatus;
  readonly maxRise: WilStatus;
  readonly learnRate: {
    phisic: number;
    magic: number;
  };

  constructor(define: {
    id: WIL_TRAINING_ID;
    name: string;
    image: GOUVisual;
    minRise: WilStatus;
    maxRise: WilStatus;
    learnRate: {
      phisic: number;
      magic: number;
    };
  }) {
    this.id = define.id;
    this.name = define.name;
    this.image = define.image;
    this.minRise = define.minRise;
    this.maxRise = define.maxRise;
    this.learnRate = define.learnRate;
  }

  /**
   * ステータス上昇値の計算を行う
   * @param min 上昇最小値
   * @param max 上昇最大値
   * @returns 上昇値
   */
  private calcRise(min: number, max: number): number {
    const rnd = Math.random();
    const range = max - min + 1;
    const sum = ((range + 1) / 2) * range;
    for (let i = 0; i < range; i++) {
      // 1 / sum(0, max - min + 1) * sum(0, i)が乱数以下で判定
      if ((1 / sum) * (((i + 2) / 2) * (i + 1)) <= rnd) {
        return max - i - min;
      }
    }
    return min;
  }

  /**
   * ステータスの上昇値を取得する
   * @returns 上昇するステータス値
   */
  getRise(): WilStatus {
    return new WilStatus({
      life: this.calcRise(this.minRise.life, this.maxRise.life),
      attack: this.calcRise(this.minRise.attack, this.maxRise.attack),
      defense: this.calcRise(this.minRise.defense, this.maxRise.defense),
      magic: this.calcRise(this.minRise.magic, this.maxRise.magic),
      speed: this.calcRise(this.minRise.speed, this.maxRise.speed),
    });
  }
}

/**
 * 訓練結果クラス
 */
export class WilTrainingResult {
  menu: WilTrainingMenu;
  character: WilCharacter;
  before: WilStatus;
  after: WilStatus = new WilStatus();
  learned?: WilSkill;

  constructor(
    menu: WilTrainingMenu,
    character: WilCharacter,
    before: WilStatus
  ) {
    this.menu = menu;
    this.character = character;
    this.before = before;
  }
}
