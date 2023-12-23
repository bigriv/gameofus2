import { WIL_CONDITION_ID } from "../enums/condition";
import { WIL_ELEMENT } from "../enums/element";
import {
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "../enums/skill";
import { WIL_SKILL_ID } from "../enums/skill";
import { WilBattleMoveResult } from "./battle";
import { WilCharacter } from "./character";
import { WilConditionUtil } from "./condition";
import { WilFieldCell } from "./field";

export class WilSkill {
  static readonly LOW_CONDITION_RATE = 20; // 状態異常にかかる確率（低）
  static readonly MEDIUM_CONDITION_RATE = 50; // 状態異常にかかる確率（中）
  static readonly HIGH_CONDITION_RATE = 80; // 状態異常にかかる確率（高）
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
    __target: WilFieldCell
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
      __target: WilFieldCell
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
      case WIL_ELEMENT.SHINE:
      case WIL_ELEMENT.DARK:
        return false;
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
   * @param activist スキル発動者
   * @param target スキル対象
   * @param skill 発動するスキル
   */
  static calcDamage(
    activist: WilCharacter,
    target: WilCharacter,
    skill: WilSkill
  ): number {
    const power = (skill.power ?? 0) * 0.01;
    let damage = 0;
    // スキル種別によってダメージ計算を変える
    if (skill.type === WIL_SKILL_TYPE.CLOSE_PHISIC) {
      damage = power * activist.status.attack - target.status.defense * 0.5;
    } else if (skill.type === WIL_SKILL_TYPE.SHOOT_PHISIC) {
      damage =
        power * activist.status.attack * 0.8 - target.status.defense * 0.5;
    } else if (skill.type === WIL_SKILL_TYPE.ATTACK_MAGIC) {
      damage = power * activist.status.magic - target.status.magic * 0.5;
    } else if (skill.type === WIL_SKILL_TYPE.SUPPORT_MAGIC) {
      damage = 0;
    }

    if (damage < 0) {
      damage = 0;
    }
    // 弱点判定
    if (WilSkill.isWeekness(skill.element, target.element)) {
      damage *= 2;
    }
    // 抵抗判定
    if (WilSkill.isResistance(skill.element, target.element)) {
      damage *= 0.5;
    }

    // ダメージの最大10%を加算
    damage += damage * Math.random() * 10;

    // ダメージ0が続くのを避けるために50%で1を足す
    damage += Math.random() < 0.5 ? 1 : 0;

    return Math.round(damage);
  }

  /**
   * コストの計算を行う
   * @param condition スキル使用者の状態異常
   * @param skill 発動するスキル
   * @returns 必要コスト
   */
  static calcCost(condition: WIL_CONDITION_ID, skill: WilSkill): number {
    let cost = skill.cost;
    if (condition === WIL_CONDITION_ID.MUDDY) {
      return WilConditionUtil.calcIncreaseStack(
        cost,
        WilConditionUtil.MEDIUM_STACK_RATE
      );
    } else if (condition === WIL_CONDITION_ID.PARALYSIS) {
      return WilConditionUtil.calcIncreaseStack(
        cost,
        WilConditionUtil.LITTELE_DAMAGE_RATE
      );
    }
    return cost;
  }

  /**
   * 状態異常の上書き判定に成功したかを判定する
   * 今かかっている状態異常は考慮せず、確率のみで判定する
   * @param rate 成功率
   * @returns 上書きに成功した場合はtrue、失敗した場合はfalse
   */
  static isSuccessOverwriteCondition(rate: number): boolean {
    return rate * 0.01 < Math.random();
  }
}
