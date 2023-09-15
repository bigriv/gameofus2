import { WAS_ELEMENT } from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasSkill } from "@/composables/games/was/types/skill";

export class WasHealSkill extends WasSkill {
  constructor(
    name: string,
    element: WAS_ELEMENT,
    cost: number,
    power: number,
    beforeEffect?: Function, // ターン開始時に発動する効果（速度の補正など）
    effect?: Function,
    afterEffect?: Function // ターン終了時に発動する効果（ステータスのリセットなど）
  ) {
    super(name, element, cost, power, beforeEffect, effect, afterEffect);
  }
  calcDamage(activist: WasCharacter, target: WasCharacter): number {
    return -activist.status.magic * this.power;
  }
}
