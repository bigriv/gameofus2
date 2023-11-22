import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilStatus } from "@/composables/games/wil/types/status";
import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import { WilCondition } from "./condition";
import { WIL_SKILL_ID } from "../enums/skill";
import { WIL_CHARACTER_ID } from "../enums/character";
import GOUVisualDefinition from "@/composables/types/visuals/GOUVisualDefinition";

export class WilCharacter {
  id: WIL_CHARACTER_ID;
  name: string;
  visual: GOUVisual;
  miniVisual: GOUVisual;
  defaultStatus: WilStatus;
  status: WilStatus;
  condition: WilCondition | null = null;
  element: WIL_ELEMENT;
  skills: Array<WIL_SKILL_ID> = [];

  constructor(define: {
    id: WIL_CHARACTER_ID;
    name: string;
    visual: GOUVisualDefinition;
    miniVisual: GOUVisualDefinition;
    status: {
      life: number;
      attack: number;
      defense: number;
      speed: number;
      magic: number;
    };
    element: WIL_ELEMENT;
    skills?: Array<WIL_SKILL_ID>;
  }) {
    this.id = define.id;
    this.name = define.name;
    this.visual = ConstructGOUVisual(define.visual);
    this.miniVisual = ConstructGOUVisual(define.miniVisual);
    this.defaultStatus = new WilStatus(define.status);
    this.status = new WilStatus(define.status);
    this.element = define.element ?? WIL_ELEMENT.NONE;
    this.skills = define.skills ?? [];
  }
}
