import { WIL_ELEMENT } from "../enums/element";
import { WIL_MOVE_RANGE } from "../enums/range";
import { WIL_SKILL_ID } from "../enums/skill";

export const WIL_SKILL_DEFINES: Array<{
  id: WIL_SKILL_ID;
  name: string;
  description: string; // 30文字まで
  cost: number;
  range: {
    type: WIL_MOVE_RANGE;
    distanse: number;
  };
  element: WIL_ELEMENT;
}> = [
  {
    id: WIL_SKILL_ID.SLASH,
    name: "スラッシュ",
    description: "通常の近接攻撃。",
    cost: 1,
    range: {
      type: WIL_MOVE_RANGE.CONSTANT,
      distanse: 1,
    },
    element: WIL_ELEMENT.NONE,
  },
  {
    id: WIL_SKILL_ID.SACRED_RAZER,
    name: "聖光線",
    description: "同じ行の敵すべてに攻撃。",
    cost: 3,
    range: {
      type: WIL_MOVE_RANGE.FOWARD_COLUMN,
      distanse: 10,
    },
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.SHINE_ABSORB,
    name: "シャインアブソーブ",
    description: "攻撃後、与えたダメージ分回復する。",
    cost: 3,
    range: {
      type: WIL_MOVE_RANGE.CONSTANT,
      distanse: 1,
    },
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.SHINE_BALL,
    name: "光弾",
    description: "光属性の魔法攻撃。",
    cost: 2,
    range: {
      type: WIL_MOVE_RANGE.CONSTANT,
      distanse: 3,
    },
    element: WIL_ELEMENT.SHINE,
  },
  {
    id: WIL_SKILL_ID.ULT_SACRED_SWORD,
    name: "極・聖剣生成",
    description: "あらゆる場所の敵に攻撃できる。",
    cost: 5,
    range: {
      type: WIL_MOVE_RANGE.ALL,
      distanse: 0,
    },
    element: WIL_ELEMENT.SHINE,
  },
];
