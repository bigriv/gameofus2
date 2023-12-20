import { WIL_CONDITION_ID } from "../enums/condition";
import { WIL_ELEMENT } from "../enums/element";
import {
  WIL_SKILL_ID,
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "../enums/skill";
import { WilBattleMoveResult } from "../types/battle";
import { WilCharacter } from "../types/character";

export const WIL_SKILL_DEFINES: Array<{
  id: WIL_SKILL_ID;
  name: string;
  description: string; // 30文字まで
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
}> = [
  {
    id: WIL_SKILL_ID.SLASH,
    name: "スラッシュ",
    description: "通常の近接攻撃。",
    cost: 1,
    power: 100,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    learnRate: 80,
  },
  {
    id: WIL_SKILL_ID.SACRED_RAZER,
    name: "聖光線",
    description: "同じ行の敵すべてに魔法攻撃。",
    cost: 3,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    element: WIL_ELEMENT.SHINE,
    learnRate: 30,
  },
  {
    id: WIL_SKILL_ID.SHINE_BALL,
    name: "光弾",
    description: "光属性の魔法攻撃。",
    cost: 2,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    learnRate: 50,
  },
  {
    id: WIL_SKILL_ID.SANCTUARY,
    name: "サンクチュアリ",
    description: "味方すべてを神聖状態にする。",
    cost: 2,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
    learnRate: 30,
    effect: (__activest: WilCharacter, __target: WilCharacter) => {
      const result = __target.overwriteCondition(WIL_CONDITION_ID.HOLY);
      return result ? [result] : [];
    },
  },
  {
    id: WIL_SKILL_ID.CREATE_SACRED_SWORD,
    name: "聖剣生成",
    description: "聖剣を生成することで、神聖状態+戦闘終了までステータス弱上昇する。",
    cost: 5,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    learnRate: 10,
    effect: (__activest: WilCharacter, __target: WilCharacter) => {
      const result = __target.overwriteCondition(WIL_CONDITION_ID.HOLY);
      return result ? [result] : [];
    },
  },
];
