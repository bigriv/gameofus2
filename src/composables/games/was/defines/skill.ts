import { WasCharacter } from "@/composables/games/was/types/character";
import { WAS_ELEMENT, WAS_SKILL_TYPE } from "@/composables/games/was/const";

const WAS_SKILL: {
  [index: string]: {
    type: WAS_SKILL_TYPE;
    name: string;
    power: number;
    element: WAS_ELEMENT;
    cost: number;
    beforeEffect?: Function; // ターン開始時に発動する効果（速度の補正など）
    effect?: Function;
    afterEffect?: Function; // ターン終了時に発動する効果（ステータスのリセットなど）
  };
} = {
  HEAL: {
    type: WAS_SKILL_TYPE.HEAL,
    name: "ヒール",
    power: 1,
    element: WAS_ELEMENT.NONE,
    cost: 10,
  },
  HIGH_HEAL: {
    name: "ハイヒール",
    type: WAS_SKILL_TYPE.HEAL,
    power: 2,
    element: WAS_ELEMENT.NONE,
    cost: 20,
  },
  POWER_ATTACK: {
    name: "力任せ",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.NONE,
    power: 1.2,
    cost: 10,
  },
  SPEED_ATTACK: {
    name: "疾風剣",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.NONE,
    cost: 10,
    power: 1,
    beforeEffect: (activist: WasCharacter, target: WasCharacter) => {
      activist.status.speed += activist.defaultStatus.speed * 0.2;
    },
    afterEffect: (activist: WasCharacter, target: WasCharacter) => {
      activist.status.speed = activist.defaultStatus.speed;
    },
  },
  GARD_ATTACK: {
    name: "シールドアタック",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.NONE,
    cost: 10,
    power: 1,
    beforeEffect: (activist: WasCharacter, target: WasCharacter) => {
      activist.status.defense += activist.defaultStatus.defense * 0.2;
    },
    afterEffect: (activist: WasCharacter, target: WasCharacter) => {
      activist.status.defense = activist.defaultStatus.defense;
    },
  },
  DARK_SORD: {
    name: "暗黒剣",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.DARK,
    cost: 10,
    power: 1.5,
  },
  FIRE: {
    name: "メラメラ",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.FIRE,
    cost: 10,
    power: 1,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5) {
        target.status.attack -= target.status.attack * 0.1;
        return `${target.name}はひるんだ！（攻撃力10%ダウン）`;
      }
    },
  },
  WATER: {
    name: "ぶるぶる",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.WATER,
    cost: 10,
    power: 1,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5) {
        target.status.magic -= target.status.magic * 0.1;
        return `${target.name}はひるんだ！（魔力10%ダウン）`;
      }
    },
  },
  SOIL: {
    name: "ガチガチ",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.SOIL,
    cost: 10,
    power: 1,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5) {
        target.status.defense -= target.status.defense * 0.1;
        return `${target.name}はひるんだ！（防御力10%ダウン）`;
      }
    },
  },
  WIND: {
    name: "ひゅーひゅー",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.WIND,
    cost: 10,
    power: 1,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5) {
        target.status.speed -= target.status.speed * 0.1;
        return `${target.name}はひるんだ！（素早さ10%ダウン）`;
      }
    },
  },
  SATAN_SPACIAL: {
    name: "魔王覚醒",
    type: WAS_SKILL_TYPE.BUFF,
    element: WAS_ELEMENT.DARK,
    power: 0,
    cost: 50,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      target.status.attack = activist.status.attack * 1.2;
      target.status.defense = activist.status.defense * 1.2;
      target.status.magic = activist.status.magic * 1.2;
      target.status.speed = activist.status.speed * 1.2;
      return `${target.name}は魔王として覚醒した！（全ステータス20%アップ！）`;
    },
  },
  JUSTICE_SPACIAL: {
    name: "正義覚醒",
    type: WAS_SKILL_TYPE.BUFF,
    element: WAS_ELEMENT.SHINE,
    power: 0,
    cost: 50,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      target.status.attack = activist.status.attack * 1.2;
      target.status.defense = activist.status.defense * 1.2;
      target.status.magic = activist.status.magic * 1.2;
      target.status.speed = activist.status.speed * 1.2;
      return `${target.name}の正義が覚醒した！（全ステータス20%アップ！）`;
    },
  },
  JUSTICE_ATTACK: {
    name: "正義の鉄槌",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.SHINE,
    cost: 50,
    power: 2,
  },
} as const;

export { WAS_SKILL };
