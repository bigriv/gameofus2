import { WAS_ELEMENT, WAS_SKILL_ID } from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasSkill } from "@/composables/games/was/types/skill";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";

export class WasHealSkill extends WasSkill {
  constructor(
    id: WAS_SKILL_ID,
    name: string,
    animation: GOULottie,
    sound: GOUAudio,
    element: WAS_ELEMENT,
    power: number,
    cost: number,
    beforeEffect?: Function, // ターン開始時に発動する効果（速度の補正など）
    effect?: Function,
    afterEffect?: Function // ターン終了時に発動する効果（ステータスのリセットなど）
  ) {
    super(
      id,
      name,
      animation,
      sound,
      element,
      power,
      cost,
      beforeEffect,
      effect,
      afterEffect
    );
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
