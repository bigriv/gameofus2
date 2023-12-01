import { WilStatus } from "@/composables/games/wil/types/status";
import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import { WilCondition } from "./condition";
import { WIL_SKILL_ID } from "../enums/skill";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilTraining } from "./training";

export class WilCharacter {
  id: string;
  name: string;
  visual: GOUVisual;
  miniVisual: GOUVisual;
  defaultStatus: WilStatus;
  status: WilStatus;
  condition: WilCondition | null = null;
  element: WIL_ELEMENT;
  skills: Array<WIL_SKILL_ID> = [];

  constructor(
    sequence: number,
    define: {
      name: string;
      visual: GOUVisual;
      miniVisual: GOUVisual;
      status: {
        life: number;
        attack: number;
        defense: number;
        speed: number;
        magic: number;
      };
      element: WIL_ELEMENT;
      skills?: Array<WIL_SKILL_ID>;
    }
  ) {
    this.id = String(sequence);
    this.name = define.name;
    this.visual = define.visual;
    this.miniVisual = define.miniVisual;
    this.defaultStatus = new WilStatus(define.status);
    this.status = new WilStatus(define.status);
    this.element = define.element ?? WIL_ELEMENT.NONE;
    this.skills = define.skills ?? [];
  }

  /**
   * 訓練を行い、ステータスを上昇させる
   * @param training 実施する訓練
   */
  training(training: WilTraining): WilTraining {
    // 結果表示用に訓練前のステータスを保持
    training.before = this.defaultStatus.deepCopy();

    // 訓練処理
    training.proccess(this);

    // 結果を反映
    this.defaultStatus = WilStatus.add(this.defaultStatus, training.rise);
    if (training.learned && !this.skills.includes(training.learned)) {
      this.skills.push(training.learned);
    }
    return training;
  }

  /**
   * ステータスをリセットし、状態異常を解除する
   */
  resetStatus() {
    this.status = this.defaultStatus.deepCopy();
    this.condition = null;
  }
}
