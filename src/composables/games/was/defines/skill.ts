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
    name: "ヒール",
    type: WAS_SKILL_TYPE.HEAL,
    element: WAS_ELEMENT.NONE,
    power: 200,
    cost: 15,
  },
  HIGH_HEAL: {
    name: "ハイヒール",
    type: WAS_SKILL_TYPE.HEAL,
    element: WAS_ELEMENT.NONE,
    power: 500,
    cost: 30,
  },
  POWER_ATTACK: {
    name: "力任せ",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.NONE,
    power: 150,
    cost: 10,
  },
  SPEED_ATTACK: {
    name: "疾風剣",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.NONE,
    power: 100,
    cost: 15,
    beforeEffect: (activist: WasCharacter, _target: WasCharacter) => {
      activist.status.speed = activist.status.speed * 10;
    },
    afterEffect: (activist: WasCharacter, _target: WasCharacter) => {
      activist.status.speed = activist.status.speed / 10;
    },
  },
  GARD_ATTACK: {
    name: "ガードアタック",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.NONE,
    power: 100,
    cost: 15,
    beforeEffect: (activist: WasCharacter, _target: WasCharacter) => {
      activist.status.defense = activist.status.defense * 4;
    },
    afterEffect: (activist: WasCharacter, _target: WasCharacter) => {
      activist.status.defense = activist.status.defense / 4;
    },
  },
  DARK_SORD: {
    name: "暗黒剣",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.DARK,
    power: 300,
    cost: 30,
  },
  FIRE: {
    name: "メラメラ",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.FIRE,
    power: 100,
    cost: 20,
    effect: (_activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5 && 0 < target.status.attack) {
        target.status.attack -= Math.floor(target.defaultStatus.attack * 0.12);
        if (target.status.attack < 0) {
          target.status.attack = 0;
        }
        return `${target.name}はひるんだ！（攻撃力20%ダウン）`;
      }
    },
  },
  WATER: {
    name: "ぶるぶる",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.WATER,
    power: 100,
    cost: 20,
    effect: (_activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5 && 0 < target.status.magic) {
        target.status.magic -= Math.floor(target.defaultStatus.magic * 0.2);
        if (target.status.magic < 0) {
          target.status.magic = 0;
        }
        return `${target.name}はひるんだ！（魔力20%ダウン）`;
      }
    },
  },
  SOIL: {
    name: "ガチガチ",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.SOIL,
    power: 100,
    cost: 20,
    effect: (_activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5 && 0 < target.status.defense) {
        target.status.defense -= Math.floor(target.defaultStatus.defense * 0.2);
        if (target.status.defense < 0) {
          target.status.defense = 0;
        }
        return `${target.name}はひるんだ！（防御力20%ダウン）`;
      }
    },
  },
  WIND: {
    name: "ひゅーひゅー",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.WIND,
    power: 100,
    cost: 20,
    effect: (_activist: WasCharacter, target: WasCharacter) => {
      if (Math.random() < 0.5 && 0 < target.status.speed) {
        target.status.speed -= Math.floor(target.defaultStatus.speed * 0.2);
        if (target.status.speed < 0) {
          target.status.speed = 0;
        }
        return `${target.name}はひるんだ！（素早さ20%ダウン）`;
      }
    },
  },
  THUNDER: {
    name: "ビリビリ",
    type: WAS_SKILL_TYPE.MAGICAL_ATTACK,
    element: WAS_ELEMENT.THUNDER,
    power: 100,
    cost: 30,
    effect: (_activist: WasCharacter, target: WasCharacter) => {
      if (
        Math.random() < 0.5 &&
        (0 < target.status.attack || 0 < target.status.defense)
      ) {
        // 攻撃力減少
        target.status.attack -= Math.floor(target.defaultStatus.attack * 0.15);
        if (target.status.attack < 0) {
          target.status.attack = 0;
        }

        // 魔力減少
        target.status.magic -= Math.floor(target.defaultStatus.magic * 0.15);
        if (target.status.magic < 0) {
          target.status.magic = 0;
        }
        return `${target.name}はひるんだ！（攻撃力&防御力15%ダウン）`;
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
      target.status.attack = activist.defaultStatus.attack * 1.4;
      target.status.defense = activist.defaultStatus.defense * 1.4;
      target.status.magic = activist.defaultStatus.magic * 1.4;
      target.status.speed = activist.defaultStatus.speed * 1.4;
      return `${target.name}は魔王として覚醒した！（能力低下を解除！さらに全ステータス40%アップ！）`;
    },
  },
  JUSTICE_SPACIAL: {
    name: "正義覚醒",
    type: WAS_SKILL_TYPE.BUFF,
    element: WAS_ELEMENT.SHINE,
    power: 0,
    cost: 50,
    effect: (activist: WasCharacter, target: WasCharacter) => {
      target.status.attack = activist.defaultStatus.attack * 1.2;
      target.status.defense = activist.defaultStatus.defense * 1.2;
      target.status.magic = activist.defaultStatus.magic * 1.2;
      target.status.speed = activist.defaultStatus.speed * 1.2;
      return `${target.name}の正義が覚醒した！（能力低下を解除！さらに全ステータス20%アップ！）`;
    },
  },
  JUSTICE_ATTACK: {
    name: "正義の鉄槌",
    type: WAS_SKILL_TYPE.PHISICAL_ATTACK,
    element: WAS_ELEMENT.SHINE,
    power: 400,
    cost: 40,
  },
} as const;

export { WAS_SKILL };
