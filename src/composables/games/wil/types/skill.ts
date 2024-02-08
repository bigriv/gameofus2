import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { WIL_CONDITION_ID } from "@/composables/games/wil/enums/condition";
import {
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "@/composables/games/wil/enums/skill";
import { WIL_SKILL_ID } from "@/composables/games/wil/enums/skill";
import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import { WilBattleMoveResult } from "@/composables/games/wil/types/battle";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilConditionUtil } from "@/composables/games/wil/types/condition";
import { WilField, WilFieldCell } from "@/composables/games/wil/types/field";
import { WilSkillDefine } from "@/composables/games/wil/defines/skill";

export class WilSkill {
  static readonly LOW_CONDITION_RATE = 20; // 状態異常にかかる確率（低）
  static readonly MEDIUM_CONDITION_RATE = 50; // 状態異常にかかる確率（中）
  static readonly HIGH_CONDITION_RATE = 80; // 状態異常にかかる確率（高）
  readonly id: WIL_SKILL_ID;
  readonly name: string;
  readonly description: string;
  readonly animation?: GOUVisual;
  readonly sound?: GOUAudio;
  readonly type: WIL_SKILL_TYPE;
  readonly cost: number;
  readonly power?: number;
  readonly effect?: (
    __activest: WilCharacter,
    __target: WilFieldCell,
    __allyField: WilField,
    __enemyField: WilField
  ) => Array<WilBattleMoveResult>;
  readonly target: WIL_SKILL_TARGET;
  readonly range: WIL_SKILL_RANGE;
  readonly element: WIL_ELEMENT;
  readonly isLearnable: (__character: WilCharacter) => boolean;

  constructor(
    define: WilSkillDefine,
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUReadAudio }
  ) {
    this.id = define.id;
    this.name = define.name;
    this.description = define.description;
    this.animation = define.animation ? images[define.animation] : undefined;
    this.sound = define.sound ? sounds[define.sound] : undefined;
    this.type = define.type;
    this.cost = define.cost;
    this.power = define.power;
    this.effect = define.effect;
    this.target = define.target;
    this.range = define.range;
    this.element = define.element;
    this.isLearnable = define.isLearnable;
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
      damage = power * activist.status.attack * 3 - target.status.defense * 1;
    } else if (skill.type === WIL_SKILL_TYPE.SHOOT_PHISIC) {
      damage = power * activist.status.attack * 3 * 0.8 - target.status.defense;
    } else if (skill.type === WIL_SKILL_TYPE.ATTACK_MAGIC) {
      damage = power * activist.status.magic * 3 - target.status.magic * 1;
    } else if (skill.type === WIL_SKILL_TYPE.SUPPORT_MAGIC) {
      damage = 0;
    }

    if (damage < 0) {
      damage = 0;
    }
    // 弱点判定
    if (WilSkill.isWeekness(skill.element, target.element)) {
      damage *= 1.5;
    }
    // 抵抗判定
    if (WilSkill.isResistance(skill.element, target.element)) {
      damage *= 0.5;
    }

    // ダメージの最大10%を加算
    damage += damage * Math.random() * 0.1;

    // ダメージ0が続くのを避けるために50%で1を足す
    damage += Math.random() < 0.5 ? 1 : 0;

    return Math.round(damage);
  }

  /**
   * 回復量の計算を行う
   * 回復量が体力のデフォルト値を超える場合はデフォルトの体力と現在の体力の差を返す
   * @param standard 回復基準値
   * @param target 回復対象
   * @returns 算出した回復量
   */
  static calcHeal(standard: number, target: WilCharacter): number {
    const heal = Math.round(standard * 1.1);
    if (target.status.life + heal > target.defaultStatus.life) {
      return target.defaultStatus.life - target.status.life;
    }

    return heal;
  }

  /**
   * コストの計算を行う
   * @param condition スキル使用者の状態異常
   * @param skill 発動するスキル
   * @returns 必要コスト
   */
  static calcCost(
    speed: number,
    condition: WIL_CONDITION_ID,
    skill: WilSkill
  ): number {
    let cost = skill.cost - Math.floor(speed / 2);
    if (cost <= 0) {
      cost = 1;
    }
    if (condition === WIL_CONDITION_ID.SLOW) {
      cost += WilConditionUtil.calcIncreaseStack(
        cost,
        WilConditionUtil.MEDIUM_STACK_RATE
      );
    } else if (condition === WIL_CONDITION_ID.PARALYSIS) {
      cost += WilConditionUtil.calcIncreaseStack(
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

  /**
   * 体力を回復するスキルかを判定する
   * @param skill 判定するスキル
   * @returns 体力を回復するスキルならtrue、それ以外ならfalse
   */
  static isHealSkill(skill: WIL_SKILL_ID): boolean {
    return [
      WIL_SKILL_ID.REGENERATION,
      WIL_SKILL_ID.REPAIR,
      WIL_SKILL_ID.HEAL,
      WIL_SKILL_ID.CREATE_SACRED_SWORD,
      WIL_SKILL_ID.HEAL_WATER,
      WIL_SKILL_ID.SUPER_WATER,
      WIL_SKILL_ID.LIGHT_FIRE,
    ].includes(skill);
  }

  /**
   * 状態異常を回復するスキルかを判定する
   * @param skill 判定するスキル
   * @returns 状態異常を悪影響以外にするスキルの場合はtrue、それ以外はfalse
   */
  static isClearSkill(skill: WIL_SKILL_ID): boolean {
    return [
      WIL_SKILL_ID.REGENERATION,
      WIL_SKILL_ID.REPAIR,
      WIL_SKILL_ID.SANCTUARY,
      WIL_SKILL_ID.CREATE_SACRED_SWORD,
      WIL_SKILL_ID.LIGHTNING,
      WIL_SKILL_ID.HEAL_WATER,
      WIL_SKILL_ID.CLEAR_WATER,
      WIL_SKILL_ID.TAILWIND,
      WIL_SKILL_ID.LIGHT_FIRE,
    ].includes(skill);
  }
}
