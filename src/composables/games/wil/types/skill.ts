import { WIL_ELEMENT } from "../enums/element";
import {
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "../enums/skill";
import { WIL_SKILL_ID } from "../enums/skill";

export class WilSkill {
  readonly id: WIL_SKILL_ID;
  readonly name: string;
  readonly description: string;
  // readonly animation: GOULottie;
  // readonly sound: GOUAudio;
  readonly type: WIL_SKILL_TYPE;
  readonly cost: number;
  readonly power?: number;
  readonly effect?: Function; // TODO: 引数と戻り値の型を指定できるならする
  readonly target: WIL_SKILL_TARGET;
  readonly range: WIL_SKILL_RANGE;
  readonly element: WIL_ELEMENT;

  constructor(define: {
    id: WIL_SKILL_ID;
    name: string;
    description: string;
    // animation: GOULottie;
    // sound: GOUAudio;
    type: WIL_SKILL_TYPE;
    cost: number;
    power?: number;
    effect?: Function;
    target: WIL_SKILL_TARGET;
    range: WIL_SKILL_RANGE;
    element: WIL_ELEMENT;
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
  }

  /**
   * 攻め手の属性が受け手にとって弱点かを判定する
   * @param attacker 攻め手の属性
   * @param defenser 受け手の属性
   * @returns 弱点ならtrue、それ以外はfalse
   */
  static isWeekness(attacker: WIL_ELEMENT, defenser: WIL_ELEMENT): boolean {
    return false
  }

  /**
   * 攻め手の属性に対し、受け手が抵抗を持っているかを判定する
   * @param attacker 攻め手の属性
   * @param defenser 受け手の属性
   * @returns 抵抗を持っていればtrue、それ以外はfalse
   */
  static isResistance(attacker: WIL_ELEMENT, defenser: WIL_ELEMENT): boolean {
    return false

  }
}
