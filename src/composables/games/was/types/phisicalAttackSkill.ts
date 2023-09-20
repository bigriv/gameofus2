import { WAS_ELEMENT } from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasSkill } from "@/composables/games/was/types/skill";

export class WasPhysicalAttackSkill extends WasSkill {
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
    let damage = Math.floor(activist.status.attack * this.power * 0.01);

    if (super.isWeekness(this.element, target.status.element)) {
      // 属性の弱点判定
      damage -= Math.floor(target.status.defense * 0.25);
    } else if (super.isWeekness(target.status.element, this.element)) {
      // 属性の抵抗判定
      damage -= Math.floor(target.status.defense * 0.75);
    } else {
      damage -= Math.floor(target.status.defense * 0.5);
    }

    if (damage < 0) {
      damage = 0;
    }
    // ダメージの10%を最大値とする乱数を加算して返却
    // ダメージが0の場合でも50%の確率でダメージが発生するように1を加算する
    damage +=
      Math.floor(damage * 0.1 * Math.random()) + (Math.random() < 0.5 ? 0 : 1);

    return damage;
  }
}
