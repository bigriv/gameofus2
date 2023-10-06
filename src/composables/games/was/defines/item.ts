import { WasCharacter } from "@/composables/games/was/types/character";

const WAS_ITEM: {
  [index: string]: {
    name: string;
    maxAmount: number; // 所持可能上限
    passive?: Function; // パッシブ効果
    beforeEffect?: Function; // ターン開始時に発動する効果（速度の補正など）
    effect?: Function; // メイン効果
    afterEffect?: Function; // ターン終了時に発動する効果（ステータスのリセットなど）
  };
} = {
  SATAN_SOUL: {
    name: "魔王の魂",
    maxAmount: 1,
  },
  HERB: {
    name: "薬草",
    maxAmount: 5,
    // 体力40~50回復
    effect: (target: WasCharacter) => {
      const defaultLife = target.defaultStatus.life;
      const healAmount = Math.round(40 + Math.random() * 10);
      if (target.status.life + healAmount >= defaultLife) {
        target.status.life = defaultLife;
      } else {
        target.status.life += healAmount;
      }
      return `${target.name}は体力を${healAmount}回復した。`;
    },
  },
  SUPER_HERB: {
    name: "超薬草",
    maxAmount: 3,
    // 体力を90~100回復
    effect: (target: WasCharacter) => {
      const defaultLife = target.defaultStatus.life;
      const healAmount = Math.round(90 + Math.random() * 10);
      if (target.status.life + healAmount >= defaultLife) {
        target.status.life = defaultLife;
      } else {
        target.status.life += healAmount;
      }
      return `${target.name}は体力を${healAmount}回復した。`;
    },
  },
  RICE_BALL: {
    name: "おにぎり",
    maxAmount: 5,
    // 満腹度30~40%回復
    effect: (target: WasCharacter) => {
      const defaultSatiety = target.defaultStatus.satiety;
      const healRatio = 0.3 + Math.random() * 0.1;
      const healAmount = Math.round(defaultSatiety * healRatio);

      if (target.status.satiety + healAmount >= defaultSatiety) {
        target.status.satiety = defaultSatiety;
      } else {
        target.status.satiety += healAmount;
      }
      return `${target.name}の満腹度が${Math.round(
        healRatio * 100
      )}%回復した。`;
    },
  },
  FISH: {
    name: "焼き魚",
    maxAmount: 5,
    // 体力60~70、満腹度15~25%回復
    effect: (target: WasCharacter) => {
      const defaultLife = target.defaultStatus.life;
      const lifeHealAmount = Math.round(60 + Math.random() * 10);
      const defaultSatiety = target.defaultStatus.satiety;
      const satifyHealRatio = 0.15 + Math.random() * 0.1;
      const satifyHealAmount = Math.round(defaultSatiety * satifyHealRatio);

      // 体力の回復
      if (target.status.life + lifeHealAmount >= defaultLife) {
        target.status.life = defaultLife;
      } else {
        target.status.life += lifeHealAmount;
      }

      // 満腹度の回復
      if (target.status.satiety + satifyHealAmount >= defaultSatiety) {
        target.status.satiety = defaultSatiety;
      } else {
        target.status.satiety += satifyHealAmount;
      }
      return `${target.name}の体力が${lifeHealAmount}、満腹度が${Math.round(
        satifyHealRatio * 100
      )}%回復した。`;
    },
  },
  MEAT: {
    name: "骨付き肉",
    maxAmount: 5,
    // 体力40~50、満腹度25~35%回復
    effect: (target: WasCharacter) => {
      const defaultLife = target.defaultStatus.life;
      const lifeHealAmount = Math.round(40 + Math.random() * 10);
      const defaultSatiety = target.defaultStatus.satiety;
      const satifyHealRatio = 0.25 + Math.random() * 0.1;
      const satifyHealAmount = Math.round(defaultSatiety * satifyHealRatio);

      // 体力の回復
      if (target.status.life + lifeHealAmount >= defaultLife) {
        target.status.life = defaultLife;
      } else {
        target.status.life += lifeHealAmount;
      }

      // 満腹度の回復
      if (target.status.satiety + satifyHealAmount >= defaultSatiety) {
        target.status.satiety = defaultSatiety;
      } else {
        target.status.satiety += satifyHealAmount;
      }
      return `${target.name}の体力が${lifeHealAmount}、満腹度が${Math.round(
        satifyHealRatio * 100
      )}%回復した。`;
    },
  },
  HOLY_WATER: {
    name: "聖水",
    maxAmount: 3,
    // 体力&満腹度全回復
    effect: (character: WasCharacter) => {
      character.status.life = character.defaultStatus.life;
      character.status.satiety = character.defaultStatus.satiety;
      return `${character.name}の体力と満腹度が完全に回復した！`;
    },
  },
  POWER_LING: {
    name: "力の腕輪",
    maxAmount: 1,
    // デフォルト攻撃力アップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.attack += 5;
      character.resetStatus();
    },
  },
  WING_BOOTS: {
    name: "ウィングブーツ",
    maxAmount: 1,
    // デフォルト素早さアップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.speed += 5;
      character.resetStatus();
    },
  },
  MYSTERIOUS_SHELL: {
    name: "不思議な貝殻",
    maxAmount: 1,
    // デフォルト魔力アップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.magic += 5;
      character.resetStatus();
    },
  },
  DRAGON_SCALE: {
    name: "竜の鱗",
    maxAmount: 1,
    // デフォルト防御力アップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.defense += 5;
      character.resetStatus();
    },
  },
  BOSS_GOBLIN_HEAD: {
    name: "ボスゴブリンの首",
    maxAmount: 1,
    // デフォルト全ステータス微アップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.life += 15;
      character.defaultStatus.satiety += 15;
      character.defaultStatus.attack += 3;
      character.defaultStatus.defense += 5;
      character.defaultStatus.speed += 3;
      character.defaultStatus.magic += 3;
      character.status.life += 15;
      character.status.satiety += 15;
      character.resetStatus();
    },
  },
  KRAKEN_HAND: {
    name: "クラーケンの触手",
    maxAmount: 1,
    // デフォルト全ステータス微アップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.life += 15;
      character.defaultStatus.satiety += 15;
      character.defaultStatus.attack += 5;
      character.defaultStatus.defense += 3;
      character.defaultStatus.speed += 3;
      character.defaultStatus.magic += 3;
      character.status.life += 15;
      character.status.satiety += 15;
      character.resetStatus();
    },
  },
  DARK_ELF_EYE: {
    name: "ダークエルフの眼",
    maxAmount: 1,
    // デフォルト全ステータス微アップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.life += 15;
      character.defaultStatus.satiety += 15;
      character.defaultStatus.attack += 3;
      character.defaultStatus.defense += 3;
      character.defaultStatus.speed += 3;
      character.defaultStatus.magic += 5;
      character.status.life += 15;
      character.status.satiety += 15;
      character.resetStatus();
    },
  },
  DRAGON_WING: {
    name: "ドラゴンの翼",
    maxAmount: 1,
    // デフォルト全ステータス微アップ
    passive: (character: WasCharacter) => {
      character.defaultStatus.life += 15;
      character.defaultStatus.satiety += 15;
      character.defaultStatus.attack += 3;
      character.defaultStatus.defense += 3;
      character.defaultStatus.speed += 5;
      character.defaultStatus.magic += 3;
      character.status.life += 15;
      character.status.satiety += 15;
      character.resetStatus();
    },
  },
} as const;

export { WAS_ITEM };
