import { WIL_ELEMENT } from "../enums/element";
import {
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "../enums/skill";
import { WIL_SKILL_ID } from "../enums/skill";
import { WilBattleMoveResult } from "./battle";
import { WilCharacter } from "./character";

export class WilSkill {
  readonly id: WIL_SKILL_ID;
  readonly name: string;
  readonly description: string;
  // readonly animation: GOULottie;
  // readonly sound: GOUAudio;
  readonly type: WIL_SKILL_TYPE;
  readonly cost: number;
  readonly power?: number;
  readonly effect?: (
    __activest: WilCharacter,
    __target: WilCharacter
  ) => Array<WilBattleMoveResult>;
  readonly target: WIL_SKILL_TARGET;
  readonly range: WIL_SKILL_RANGE;
  readonly element: WIL_ELEMENT;
  readonly learnRate: number;

  constructor(define: {
    id: WIL_SKILL_ID;
    name: string;
    description: string;
    // animation: GOULottie;
    // sound: GOUAudio;
    type: WIL_SKILL_TYPE;
    cost: number;
    power?: number;
    effect?: (
      __activest: WilCharacter,
      __target: WilCharacter
    ) => Array<WilBattleMoveResult>;
    target: WIL_SKILL_TARGET;
    range: WIL_SKILL_RANGE;
    element: WIL_ELEMENT;
    learnRate: number;
  }) {
    this.id = define.id;
    this.name = define.name;
    this.description = define.description;
    // this.animation = define.animation;
    // this.sound = define.sound;
    this.type = define.type;
    this.cost = define.cost;
    this.power = define.power;
    this.effect = define.effect;
    this.target = define.target;
    this.range = define.range;
    this.element = define.element;
    this.learnRate = define.learnRate;
  }

  /**
   * 攻め手の属性が受け手にとって弱点かを判定する
   * @param attacker 攻め手の属性
   * @param defenser 受け手の属性
   * @returns 弱点ならtrue、それ以外はfalse
   */
  static isWeekness(attacker: WIL_ELEMENT, defenser: WIL_ELEMENT): boolean {
    switch (attacker) {
      case WIL_ELEMENT.NONE:
        return false;
      case WIL_ELEMENT.SHINE:
        return defenser === WIL_ELEMENT.DARK;
      case WIL_ELEMENT.DARK:
        return defenser === WIL_ELEMENT.SHINE;
      case WIL_ELEMENT.FIRE:
        return defenser === WIL_ELEMENT.WIND;
      case WIL_ELEMENT.SOIL:
        return defenser === WIL_ELEMENT.THUNDER;
      case WIL_ELEMENT.WIND:
        return defenser === WIL_ELEMENT.SOIL;
      case WIL_ELEMENT.WATER:
        return defenser === WIL_ELEMENT.FIRE;
      case WIL_ELEMENT.THUNDER:
        return defenser === WIL_ELEMENT.WATER;
    }
  }

  /**
   * 攻め手の属性に対し、受け手が抵抗を持っているかを判定する
   * @param attacker 攻め手の属性
   * @param defenser 受け手の属性
   * @returns 抵抗を持っていればtrue、それ以外はfalse
   */
  static isResistance(attacker: WIL_ELEMENT, defenser: WIL_ELEMENT): boolean {
    switch (attacker) {
      case WIL_ELEMENT.NONE:
        return false;
      case WIL_ELEMENT.SHINE:
        return defenser === WIL_ELEMENT.DARK;
      case WIL_ELEMENT.DARK:
        return defenser === WIL_ELEMENT.SHINE;
      case WIL_ELEMENT.FIRE:
        return defenser === WIL_ELEMENT.WATER;
      case WIL_ELEMENT.SOIL:
        return defenser === WIL_ELEMENT.WIND;
      case WIL_ELEMENT.WIND:
        return defenser === WIL_ELEMENT.FIRE;
      case WIL_ELEMENT.WATER:
        return defenser === WIL_ELEMENT.THUNDER;
      case WIL_ELEMENT.THUNDER:
        return defenser === WIL_ELEMENT.SOIL;
    }
  }

  /**
   * ダメージ量の計算を行う
   */
  static calcDamage(
    activist: WilCharacter,
    target: WilCharacter,
    skill: WilSkill
  ): number {
    const power = (skill.power ?? 0) * 0.01;
    let damage = 0;
    // スキル種別によってダメージ計算を変える
    if (
      skill.type === WIL_SKILL_TYPE.CLOSE_PHISIC ||
      skill.type === WIL_SKILL_TYPE.SHOOT_PHISIC
    ) {
      damage = power * activist.status.attack - target.status.defense * 0.5;
    } else if (skill.type === WIL_SKILL_TYPE.ATTACK_MAGIC) {
      damage = power * activist.status.magic - target.status.magic * 0.5;
    } else if (skill.type === WIL_SKILL_TYPE.SUPPORT_MAGIC) {
      damage = 0;
    }

    if (WilSkill.isWeekness(skill.element, target.element)) {
      damage *= 2;
    }
    if (WilSkill.isResistance(skill.element, target.element)) {
      damage *= 0.5;
    }

    return damage;
  }
}
