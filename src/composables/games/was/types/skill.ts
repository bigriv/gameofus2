import { WAS_ELEMENT, WAS_SKILL_ID } from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";

export abstract class WasSkill {
  readonly id: WAS_SKILL_ID;
  readonly name: string;
  readonly animation: GOULottie;
  readonly sound: GOUAudio;
  readonly element: WAS_ELEMENT;
  readonly cost: number;
  readonly power: number;
  readonly beforeEffect?: Function; // ターン開始時に発動する効果（速度の補正など）
  readonly effect?: Function;
  readonly afterEffect?: Function; // ターン終了時に発動する効果（ステータスのリセットなど）

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
    this.id = id;
    this.name = name;
    this.animation = animation;
    this.sound = sound;
    this.element = element;
    this.cost = cost;
    this.power = power >= 0 ? power : 0;
    this.beforeEffect = beforeEffect;
    this.effect = effect;
    this.afterEffect = afterEffect;
  }

  /**
   * ダメージの計算処理
   * @param activist スキルの発動者
   * @param target 対象者
   */
  abstract calcDamage(activist: WasCharacter, target: WasCharacter): number;

  async load(): Promise<void> {
    await this.animation.load()
    if (this.sound instanceof GOUReadAudio) {
      this.sound.load()
    }
  }

  /**
   * 相手の属性が弱点か判定する
   * @param target 判定する対象
   * @param enemy 相手の属性
   * @returns 弱点属性の場合はtrue それ以外はfalse
   */
  isWeekness(target: WAS_ELEMENT, enemy: WAS_ELEMENT): boolean {
    switch (target) {
      case WAS_ELEMENT.NONE:
        return false;
      case WAS_ELEMENT.FIRE:
        return enemy == WAS_ELEMENT.WATER;
      case WAS_ELEMENT.WATER:
        return enemy == WAS_ELEMENT.THUNDER;
      case WAS_ELEMENT.THUNDER:
        return enemy == WAS_ELEMENT.SOIL;
      case WAS_ELEMENT.SOIL:
        return enemy == WAS_ELEMENT.WIND;
      case WAS_ELEMENT.WIND:
        return enemy == WAS_ELEMENT.FIRE;
      case WAS_ELEMENT.DARK:
        return enemy == WAS_ELEMENT.SHINE;
      case WAS_ELEMENT.SHINE:
        return enemy == WAS_ELEMENT.DARK;
    }
  }
}
