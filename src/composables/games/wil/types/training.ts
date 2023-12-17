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
  days: number = 0;
  plan: {
    attack: WilTrainingPlan;
    defense: WilTrainingPlan;
    migration: WilTrainingPlan;
    magic: WilTrainingPlan;
    phisic: WilTrainingPlan;
  };
  results: Array<WilTrainingResult> = [];
  log: Array<string> = [];

  constructor(images: { [key: string]: GOUVisual }) {
    this.plan = {
      attack: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.ATTACK.id,
          name: WIL_TRAINING_DEFINES.ATTACK.name,
          image: images[WIL_TRAINING_DEFINES.ATTACK.image],
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.ATTACK.maxRise),
          learnRate: WIL_TRAINING_DEFINES.ATTACK.learnRate,
        }),
      },
      defense: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.DEFENSE.id,
          name: WIL_TRAINING_DEFINES.DEFENSE.name,
          image: images[WIL_TRAINING_DEFINES.DEFENSE.image],
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.DEFENSE.maxRise),
          learnRate: WIL_TRAINING_DEFINES.DEFENSE.learnRate,
        }),
      },
      migration: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.MIGRATION.id,
          name: WIL_TRAINING_DEFINES.MIGRATION.name,
          image: images[WIL_TRAINING_DEFINES.MIGRATION.image],
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.MIGRATION.maxRise),
          learnRate: WIL_TRAINING_DEFINES.MIGRATION.learnRate,
        }),
      },
      magic: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.MAGIC.id,
          name: WIL_TRAINING_DEFINES.MAGIC.name,
          image: images[WIL_TRAINING_DEFINES.MAGIC.image],
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.MAGIC.maxRise),
          learnRate: WIL_TRAINING_DEFINES.MAGIC.learnRate,
        }),
      },
      phisic: {
        menu: new WilTrainingMenu({
          id: WIL_TRAINING_DEFINES.PHISIC.id,
          name: WIL_TRAINING_DEFINES.PHISIC.name,
          image: images[WIL_TRAINING_DEFINES.PHISIC.image],
          maxRise: new WilStatus(WIL_TRAINING_DEFINES.PHISIC.maxRise),
          learnRate: WIL_TRAINING_DEFINES.PHISIC.learnRate,
        }),
      },
    };
  }

  process(): Array<WilTrainingResult> {
    const result = new Array<WilTrainingResult>();
    // 訓練の順番を担保するためにループではなく個別に処理
    if (this.plan.attack.character) {
      result.push(this.plan.attack.character.training(this.plan.attack.menu));
    }
    if (this.plan.defense.character) {
      result.push(this.plan.defense.character.training(this.plan.attack.menu));
    }
    if (this.plan.migration.character) {
      result.push(
        this.plan.migration.character.training(this.plan.attack.menu)
      );
    }
    if (this.plan.magic.character) {
      result.push(this.plan.magic.character.training(this.plan.attack.menu));
    }
    if (this.plan.phisic.character) {
      result.push(this.plan.phisic.character.training(this.plan.attack.menu));
    }

    // TODO: ログに記録
    return result;
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
  readonly maxRise: WilStatus;
  readonly learnRate: {
    phisic: number;
    magic: number;
  };

  constructor(define: {
    id: WIL_TRAINING_ID;
    name: string;
    image: GOUVisual;
    maxRise: WilStatus;
    learnRate: {
      phisic: number;
      magic: number;
    };
  }) {
    this.id = define.id;
    this.name = define.name;
    this.image = define.image;
    this.maxRise = define.maxRise;
    this.learnRate = define.learnRate;
  }

  /**
   * ステータス上昇値の計算を行う
   * 1: 40%
   * 2: 30%
   * 3: 20%
   * 4: 10%
   * @param max 上昇最大値
   * @returns 上昇値
   */
  private calcRise(max: number): number {
    const rnd = Math.random();
    if (rnd < 0.4) {
      return Math.min(1, max);
    }
    if (rnd < 0.7) {
      return Math.min(2, max);
    }
    if (rnd < 0.9) {
      return Math.min(3, max);
    }
    return Math.min(4, max);
  }

  /**
   * ステータスの上昇値を取得する
   * @returns 上昇するステータス値
   */
  getRise(): WilStatus {
    return new WilStatus({
      life: this.calcRise(this.maxRise.life),
      attack: this.calcRise(this.maxRise.attack),
      defense: this.calcRise(this.maxRise.defense),
      magic: this.calcRise(this.maxRise.magic),
      speed: this.calcRise(this.maxRise.speed),
    });
  }
}

/**
 * 訓練結果クラス
 */
export class WilTrainingResult {
  id: WIL_TRAINING_ID;
  before: WilStatus;
  after: WilStatus = new WilStatus();
  learned?: WilSkill;

  constructor(id: WIL_TRAINING_ID, before: WilStatus) {
    this.id = id;
    this.before = before;
  }
}
