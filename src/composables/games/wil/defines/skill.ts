import { WIL_ELEMENT } from "../enums/element";
import {
  WIL_SKILL_ID,
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "../enums/skill";

export const WIL_SKILL_DEFINES: Array<{
  id: WIL_SKILL_ID;
  name: string;
  description: string; // 30文字まで
  type: WIL_SKILL_TYPE;
  cost: number;
  power?: number;
  effect?: Function;
  target: WIL_SKILL_TARGET;
  range: WIL_SKILL_RANGE;
  element: WIL_ELEMENT;
}> = [
  {
    id: WIL_SKILL_ID.SLASH,
    name: "スラッシュ",
    description: "通常の近接攻撃。",
    cost: 1,
    power: 100,
    type: WIL_SKILL_TYPE.PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.FRONT,
    element: WIL_ELEMENT.NONE,
  },
  {
    id: WIL_SKILL_ID.SACRED_RAZER,
    name: "聖光線",
    description: "同じ行の敵すべてに魔法攻撃。",
    cost: 3,
    type: WIL_SKILL_TYPE.MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.SHINE_ABSORB,
    name: "シャインアブソーブ",
    description: "魔法攻撃後、与えたダメージ分回復する。",
    cost: 3,
    type: WIL_SKILL_TYPE.MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.FRONT,
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.SHINE_BALL,
    name: "光弾",
    description: "光属性の魔法攻撃。",
    cost: 2,
    type: WIL_SKILL_TYPE.MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SKIP,
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.SANCTUARY,
    name: "サンクチュアリ",
    description: "味方一人を神聖状態にする。",
    cost: 2,
    type: WIL_SKILL_TYPE.MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SKIP,
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.ULT_SACRED_SWORD,
    name: "極・聖剣生成",
    description: "全ての場所の敵を攻撃する魔法。",
    cost: 5,
    type: WIL_SKILL_TYPE.MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
  },
];
