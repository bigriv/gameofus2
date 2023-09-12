import { WasCharacter } from "../types/character";
import { WasPlayerCharacter } from "../types/palyerCharacter";

type WAS_ITEM_TYPE = {
  name: string;
  passive?: Function; // パッシブ効果
  beforeEffect?: Function; // ターン開始時に発動する効果（速度の補正など）
  effect?: Function; // メイン効果
  afterEffect?: Function; // ターン終了時に発動する効果（ステータスのリセットなど）
};

const WAS_ITEM: { [index: string]: WAS_ITEM_TYPE } = {
  SATAN_SOUL: {
    name: "魔王の魂",
  },
  GOBLIN_HANMER: {
    name: "ゴブリンピッケル",
    // デフォルト攻撃力アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.attack += 5;
      player.status.attack = player.defaultStatus.attack;
    },
  },
  ELF_MEDICINE: {
    name: "エルフの秘薬",
    // 最大体力アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.life += 10;
      player.status.life += 10;
    },
  },
  HOLY_WATER: {
    name: "聖水",
    // デフォルト魔力アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.magic += 10;
      player.status.magic = player.defaultStatus.magic;
    },
  },
  DRAGON_SCALE: {
    name: "竜の鱗",
    // デフォルト防御力アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.defense += 5;
      player.status.defense = player.defaultStatus.defense;
    },
  },
  BOSS_GOBLIN_HEAD: {
    name: "ボスゴブリンの首",
    // デフォルト全ステータス微アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.life += 5;
      player.defaultStatus.satiety += 5;
      player.defaultStatus.attack += 2;
      player.defaultStatus.defense += 2;
      player.defaultStatus.speed += 2;
      player.defaultStatus.magic += 5;
      player.status.life += 5;
      player.status.satiety += 5;
      player.status.attack = player.defaultStatus.attack;
      player.status.defense = player.defaultStatus.defense;
      player.status.speed = player.defaultStatus.speed;
      player.status.magic = player.defaultStatus.magic;
    },
  },
  KRAKEN_HAND: {
    name: "クラーケンの触手",
    // デフォルト全ステータス微アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.life += 5;
      player.defaultStatus.satiety += 5;
      player.defaultStatus.attack += 2;
      player.defaultStatus.defense += 2;
      player.defaultStatus.speed += 2;
      player.defaultStatus.magic += 5;
      player.status.life += 5;
      player.status.satiety += 5;
      player.status.attack = player.defaultStatus.attack;
      player.status.defense = player.defaultStatus.defense;
      player.status.speed = player.defaultStatus.speed;
      player.status.magic = player.defaultStatus.magic;
    },
  },
  DARK_ELF_EYE: {
    name: "ダークエルフの眼",
    // デフォルト全ステータス微アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.life += 5;
      player.defaultStatus.satiety += 5;
      player.defaultStatus.attack += 2;
      player.defaultStatus.defense += 2;
      player.defaultStatus.speed += 2;
      player.defaultStatus.magic += 5;
      player.status.life += 5;
      player.status.satiety += 5;
      player.status.attack = player.defaultStatus.attack;
      player.status.defense = player.defaultStatus.defense;
      player.status.speed = player.defaultStatus.speed;
      player.status.magic = player.defaultStatus.magic;
    },
  },
  DRAGON_WING: {
    name: "ドラゴンの翼",
    // デフォルト全ステータス微アップ
    passive: (player: WasPlayerCharacter) => {
      player.defaultStatus.life += 5;
      player.defaultStatus.satiety += 5;
      player.defaultStatus.attack += 2;
      player.defaultStatus.defense += 2;
      player.defaultStatus.speed += 2;
      player.defaultStatus.magic += 5;
      player.status.life += 5;
      player.status.satiety += 5;
      player.status.attack = player.defaultStatus.attack;
      player.status.defense = player.defaultStatus.defense;
      player.status.speed = player.defaultStatus.speed;
      player.status.magic = player.defaultStatus.magic;
    },
  },
  HERB: {
    name: "薬草",
    // 体力20%回復
    effect: (target: WasCharacter) => {
      const HEAL_RATIO = 0.2;
      const defaultLife = target.defaultStatus.life;
      if (target.status.life + defaultLife * HEAL_RATIO >= defaultLife) {
        target.status.life = defaultLife;
      } else {
        target.status.life += defaultLife * HEAL_RATIO;
      }
      return `${target.name}は体力を${defaultLife * HEAL_RATIO}回復した。`;
    },
  },
  EMERGENCY_SET: {
    name: "救急セット",
    // 体力40%回復
    effect: (target: WasCharacter) => {
      const HEAL_RATIO = 0.4;
      const defaultLife = target.defaultStatus.life;
      if (target.status.life + defaultLife * HEAL_RATIO >= defaultLife) {
        target.status.life = defaultLife;
      } else {
        target.status.life += defaultLife * HEAL_RATIO;
      }
      return `${target.name}は体力を${defaultLife * HEAL_RATIO}回復した。`;
    },
  },
  RICE_BALL: {
    name: "おにぎり",
    // 満腹度25%回復
    effect: (target: WasCharacter) => {
      const HEAL_RATIO = 0.25;
      const defaultSatiety = target.defaultStatus.satiety;
      if (
        target.status.satiety + defaultSatiety * HEAL_RATIO >=
        defaultSatiety
      ) {
        target.status.satiety = defaultSatiety;
      } else {
        target.status.satiety += defaultSatiety * HEAL_RATIO;
      }
      return `${target.name}の満腹度が${defaultSatiety * HEAL_RATIO}回復した。`;
    },
  },
  BIG_RICE_BALL: {
    name: "特大おにぎり",
    // 満腹度50%回復
    effect: (target: WasCharacter) => {
      const HEAL_RATIO = 0.5;
      const defaultSatiety = target.defaultStatus.satiety;
      if (
        target.status.satiety + defaultSatiety * HEAL_RATIO >=
        defaultSatiety
      ) {
        target.status.satiety = defaultSatiety;
      } else {
        target.status.satiety += defaultSatiety * HEAL_RATIO;
      }
      return `${target.name}の満腹度が${defaultSatiety * HEAL_RATIO}回復した。`;
    },
  },
} as const;

export { WAS_ITEM };
export type { WAS_ITEM_TYPE };
