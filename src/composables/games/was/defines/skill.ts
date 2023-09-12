import { WasCharacter } from "../types/character";
import { WAS_ELEMENT } from "../const";

type WAS_SKILL_TYPE = {
  name: string;
  element: WAS_ELEMENT;
  cost: number;
  power?: number;
  beforeEffect?: Function; // ターン開始時に発動する効果（速度の補正など）
  effect?: Function;
  afterEffect?: Function; // ターン終了時に発動する効果（ステータスのリセットなど）
};

const WAS_SKILL: { [index: string]: WAS_SKILL_TYPE } = {
  HEAL: {
    name: "ヒール",
    element: WAS_ELEMENT.NONE,
    cost: 10,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      if (
        target.status.life + activist.status.magic >=
        target.defaultStatus.life
      ) {
        target.status.life = target.defaultStatus.life;
      } else {
        target.status.life += activist.status.magic;
      }
      return `${target.name}はヒールを発動！${activist.status.magic}回復した`;
    },
  },
  // HIGH_HEAL: {
  //   name: "ハイヒール",
  //   element: WAS_ELEMENT.NONE,
  //   cost: 20,
  //   effect: (activist: WasCharacter, target: WasCharacter) => {
  //     if (
  //       target.status.life + activist.status.magic * 2 >=
  //       target.defaultStatus.life
  //     ) {
  //       target.status.life = target.defaultStatus.life;
  //     } else {
  //       target.status.life += activist.status.magic * 2;
  //     }
  //     return `${target.name}は${activist.status.magic * 2}回復した`;
  //   },
  // },
  POWER_ATTACK: {
    name: "力任せ",
    element: WAS_ELEMENT.NONE,
    cost: 10,
    power: 10,
  },
  SPEED_ATTACK: {
    name: "疾風剣",
    element: WAS_ELEMENT.NONE,
    cost: 10,
    power: 10,
  },
  GARD_ATTACK: {
    name: "攻防一体",
    element: WAS_ELEMENT.NONE,
    cost: 10,
    power: 10,
  },
  DARK_SORD: {
    name: "暗黒剣",
    element: WAS_ELEMENT.DARK,
    cost: 10,
    power: 10,
  },
  FIRE: {
    name: "メラメラ",
    element: WAS_ELEMENT.FIRE,
    cost: 10,
    power: 10,
  },
  WATER: {
    name: "ぶるぶる",
    element: WAS_ELEMENT.WATER,
    cost: 10,
    power: 10,
  },
  SOIL: {
    name: "がちがち",
    element: WAS_ELEMENT.WATER,
    cost: 10,
    power: 10,
  },
  // THUNDER: {
  //   name: "ビリビリ",
  //   element: WAS_ELEMENT.THUNDER,
  //   cost: 10,
  //   power: 10,
  // },
  WIND: {
    name: "ひゅーひゅー",
    element: WAS_ELEMENT.WIND,
    cost: 10,
    power: 10,
  },
  // SHINE: {
  //   name: "ピカピカ",
  //   element: WAS_ELEMENT.SHINE,
  //   cost: 10,
  //   power: 10,
  // },
  // DARK: {
  //   name: "ひそひそ",
  //   element: WAS_ELEMENT.DARK,
  //   cost: 10,
  //   power: 10,
  // },
  SATAN_SPACIAL: {
    name: "魔王覚醒",
    element: WAS_ELEMENT.DARK,
    cost: 50,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      target.status.attack = activist.status.attack * 1.2;
      target.status.defense = activist.status.defense * 1.2;
      target.status.magic = activist.status.magic * 1.2;
      target.status.speed = activist.status.speed * 1.2;
    },
  },
} as const;

export { WAS_SKILL };
export type { WAS_SKILL_TYPE };
