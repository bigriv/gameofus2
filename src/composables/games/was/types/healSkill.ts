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
  calcDamage(activist: WasCharacter, _target: WasCharacter): number {
    let damage = Math.floor(activist.status.magic * this.power * 0.01);
    // ダメージの10%を最大値とする乱数を加算する
    // ダメージが0の場合でも50%の確率でダメージが発生するように1を加算する
    damage +=
      Math.floor(damage * 0.1 * Math.random()) + (Math.random() < 0.5 ? 0 : 1);
    // マイナスのダメージをとることで回復として扱う
    return -damage;
  }
}
