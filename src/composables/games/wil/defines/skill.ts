import { WIL_ELEMENT } from "../enums/element";
import { WIL_MOVE_RANGE } from "../enums/range";
import { WIL_SKILL_ID } from "../enums/skill";

export const WIL_SKILL_DEFINES: Array<{
  id: WIL_SKILL_ID;
  name: string;
  description: string; // 30文字まで
  cost: number;
  range:  WIL_MOVE_RANGE;
  element: WIL_ELEMENT;
}> = [
  {
    id: WIL_SKILL_ID.SLASH,
    name: "スラッシュ",
    description: "通常の近接攻撃。",
    cost: 1,
    range:  WIL_MOVE_RANGE.FIRST,
    element: WIL_ELEMENT.NONE,
  },
  {
    id: WIL_SKILL_ID.SACRED_RAZER,
    name: "聖光線",
    description: "同じ行の敵すべてに攻撃。",
    cost: 3,
    range: WIL_MOVE_RANGE.COLUMN,
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.SHINE_ABSORB,
    name: "シャインアブソーブ",
    description: "攻撃後、与えたダメージ分回復する。",
    cost: 3,
    range:  WIL_MOVE_RANGE.FIRST,
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.SHINE_BALL,
    name: "光弾",
    description: "光属性の魔法攻撃。",
    cost: 2,
    range:  WIL_MOVE_RANGE.SKIP,
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.ULT_SACRED_SWORD,
    name: "極・聖剣生成",
    description: "全ての場所の敵を攻撃する。",
    cost: 5,
    range:  WIL_MOVE_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
  },
];
