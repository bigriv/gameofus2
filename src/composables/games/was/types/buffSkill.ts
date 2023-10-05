import { WAS_ELEMENT, WAS_SKILL_ID } from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasSkill } from "@/composables/games/was/types/skill";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";

export class WasBuffSkill extends WasSkill {
  constructor(
    id: WAS_SKILL_ID,
    name: string,
    animation: GOULottie,
    sound: GOUAudio,
    element: WAS_ELEMENT,
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
      0,
      cost,
      beforeEffect,
      effect,
      afterEffect
    );
  }
  calcDamage(_activist: WasCharacter, _target: WasCharacter): number {
    return 0;
  }
}
