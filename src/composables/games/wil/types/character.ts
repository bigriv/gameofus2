import { WilStatus } from "@/composables/games/wil/types/status";
import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import { WilCondition } from "./condition";
import { WIL_SKILL_ID } from "../enums/skill";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_IMAGE_ID } from "../enums/image";

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
    },
    images: { [key: string]: GOUVisual }
  ) {
    this.id = String(sequence);
    this.name = define.name;
    this.visual = images[define.visual];
    this.miniVisual = images[define.miniVisual];
    this.defaultStatus = new WilStatus(define.status);
    this.status = new WilStatus(define.status);
    this.element = define.element ?? WIL_ELEMENT.NONE;
    this.skills = define.skills ?? [];
  }

  /**
   * ステータスをリセットし、状態異常を解除する
   */
  resetStatus() {
    this.status = this.defaultStatus.deepCopy();
    this.condition = null;
  }
}
