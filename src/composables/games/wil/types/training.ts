import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_SKILL_ID } from "../enums/skill";
import { WIL_TRAINING_ID } from "../enums/training";
import { WilStatus } from "./status";
import { WilCharacter } from "./character";

export class WilTraining {
  id: WIL_TRAINING_ID;
  name: string;
  image: GOUVisual;
  before: WilStatus = new WilStatus();
  rise: WilStatus = new WilStatus();
  learned?: WIL_SKILL_ID;

  constructor(define: { id: WIL_TRAINING_ID; name: string; image: GOUVisual }) {
    this.id = define.id;
    this.name = define.name;
    this.image = define.image;
  }

  /**
   * 訓練を処理する
   */
  proccess(character: WilCharacter) {
    this.learned = undefined;

    const result = new WilStatus();
    // TODO: ステータスの上昇値について要調整
    switch (this.id) {
      case WIL_TRAINING_ID.ATTACK:
        result.attack += 3;
        break;
      case WIL_TRAINING_ID.DEFENSE:
        result.defense += 3;
        break;
      case WIL_TRAINING_ID.MIGRATION:
        result.speed += 3;
        break;
      case WIL_TRAINING_ID.MAGIC:
        result.magic += 3;
        // TODO: キャラクターの属性、スキルの習得状況、現在ステータス等によって習得するスキルを変える
        console.log(character);
        this.learned = WIL_SKILL_ID.SLASH;
        break;
      case WIL_TRAINING_ID.PHISIC:
        result.life += 3;
        break;
    }
    this.rise = result;
  }
}
