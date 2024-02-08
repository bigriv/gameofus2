import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import { WIL_SKILL_ID } from "@/composables/games/wil/enums/skill";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";

export type WilCharacterDefine = {
  id: WIL_CHARACTER_ID;
  name: string;
  visual: {
    standing: WIL_IMAGE_ID;
    closePhisic?: Array<{
      visual: WIL_IMAGE_ID;
      duration: number;
    }>;
    shootPhisic?: Array<{
      visual: WIL_IMAGE_ID;
      duration: number;
    }>;
    magic?: Array<{
      visual: WIL_IMAGE_ID;
      duration: number;
    }>;
  };
  status: {
    life: number;
    attack: number;
    defense: number;
    speed: number;
    magic: number;
  };
  learnable: Array<WIL_SKILL_ID>;
  element: WIL_ELEMENT;
  skills: Array<WIL_SKILL_ID>;
};

export const WIL_CHARACTER_DEFINES: {
  [key: string]: WilCharacterDefine;
} = {
  HERO: {
    id: WIL_CHARACTER_ID.HERO,
    name: "ヒカル",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_HERO1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HERO2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HERO3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HERO4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HERO5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.SHINE,
    status: { life: 100, attack: 5, defense: 5, speed: 5, magic: 5 },
    learnable: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.SHINE_SWORD,
      WIL_SKILL_ID.SACRED_CROSS,
      WIL_SKILL_ID.WHITE_LINE,
      WIL_SKILL_ID.SHINE_BALL,
      WIL_SKILL_ID.SHINE_RAZER,
      WIL_SKILL_ID.SACRED_RAY,
      WIL_SKILL_ID.HEAL,
      WIL_SKILL_ID.SANCTUARY,
      WIL_SKILL_ID.CREATE_SACRED_SWORD,
    ],
    skills: [WIL_SKILL_ID.SLASH],
  },
  HOLY_KNIGHTS_LEADER: {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER,
    name: "ザーグ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_LEADER1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_LEADER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_LEADER3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_LEADER2,
          duration: 0.25,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_LEADER4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_LEADER2,
          duration: 0.25,
        },
      ],
    },
    element: WIL_ELEMENT.THUNDER,
    status: { life: 120, attack: 12, defense: 12, speed: 10, magic: 12 },
    learnable: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.POWER_ATTACK,
      WIL_SKILL_ID.THUNDER_SWORD,
      WIL_SKILL_ID.RAIZIN,
      WIL_SKILL_ID.THUNDER_BALL,
      WIL_SKILL_ID.RAIKOU,
      WIL_SKILL_ID.SPARK,
      WIL_SKILL_ID.THUNDER_VOLT,
    ],
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.THUNDER_BALL,
      WIL_SKILL_ID.THUNDER_SWORD,
    ],
  },
  HOLY_KNIGHTS_SOLDIER: {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_SOLDIER,
    name: "騎士兵",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_SOLDIER1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_SOLDIER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_SOLDIER3,
          duration: 0.5,
        },
      ],
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_SOLDIER4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_SOLDIER5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.THUNDER,
    status: { life: 100, attack: 8, defense: 8, speed: 5, magic: 5 },
    learnable: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.POWER_ATTACK,
      WIL_SKILL_ID.THUNDER_SWORD,
      WIL_SKILL_ID.RAIZIN,
    ],
    skills: [WIL_SKILL_ID.SLASH],
  },
  HOLY_KNIGHTS_MAGICIAN: {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_MAGICIAN,
    name: "魔導兵",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_MAGICIAN1,
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_MAGICIAN2,
          duration: 0.25,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_MAGICIAN3,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_MAGICIAN2,
          duration: 0.25,
        },
      ],
    },
    element: WIL_ELEMENT.THUNDER,
    status: { life: 80, attack: 5, defense: 8, speed: 5, magic: 10 },
    learnable: [
      WIL_SKILL_ID.THUNDER_BALL,
      WIL_SKILL_ID.RAIKOU,
      WIL_SKILL_ID.SPARK,
      WIL_SKILL_ID.THUNDER_VOLT,
      WIL_SKILL_ID.ELECTROMAGNETIC_WAVE,
    ],
    skills: [WIL_SKILL_ID.THUNDER_BALL],
  },
  ICICLE_GURDIANS_QUEEN: {
    id: WIL_CHARACTER_ID.ICICLE_GURDIANS_QUEEN,
    name: "レイナ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_QUEEN1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_QUEEN2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_QUEEN3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_QUEEN4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_QUEEN5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.WATER,
    status: { life: 130, attack: 20, defense: 18, speed: 14, magic: 20 },
    learnable: [
      WIL_SKILL_ID.SNOW_BLADE,
      WIL_SKILL_ID.WATER_SLASH,
      WIL_SKILL_ID.GLACIER,
      WIL_SKILL_ID.BUBBLE_BALL,
      WIL_SKILL_ID.BLIZZARD,
      WIL_SKILL_ID.ICEBERG,
    ],
    skills: [WIL_SKILL_ID.SNOW_BLADE, WIL_SKILL_ID.BUBBLE_BALL],
  },
  ICICLE_GURDIANS_DEFENDER: {
    id: WIL_CHARACTER_ID.ICICLE_GURDIANS_DEFENDER,
    name: "守護兵",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_DEFENDER1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_DEFENDER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_DEFENDER3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_DEFENDER4,
          duration: 0.4,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_DEFENDER5,
          duration: 0.3,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_DEFENDER3,
          duration: 0.3,
        },
      ],
    },
    element: WIL_ELEMENT.SOIL,
    status: { life: 120, attack: 12, defense: 20, speed: 8, magic: 8 },
    learnable: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.POWER_ATTACK,
      WIL_SKILL_ID.SWING,
      WIL_SKILL_ID.HEAVY_ROCK,
    ],
    skills: [WIL_SKILL_ID.SLASH, WIL_SKILL_ID.POWER_ATTACK],
  },
  ICICLE_GURDIANS_MAGICIAN: {
    id: WIL_CHARACTER_ID.ICICLE_GURDIANS_MAGICIAN,
    name: "補助兵",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_MAGICIAN1,
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_MAGICIAN2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_ICICLE_GURDIANS_MAGICIAN3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.WATER,
    status: { life: 110, attack: 8, defense: 16, speed: 16, magic: 20 },
    learnable: [
      WIL_SKILL_ID.BUBBLE_BALL,
      WIL_SKILL_ID.BLIZZARD,
      WIL_SKILL_ID.HEAL_WATER,
      WIL_SKILL_ID.CLEAR_WATER,
      WIL_SKILL_ID.SQUALL,
      WIL_SKILL_ID.SUPER_WATER,
    ],
    skills: [WIL_SKILL_ID.BUBBLE_BALL, WIL_SKILL_ID.HEAL_WATER],
  },
  STORM_SHOOTERS_PRINCE: {
    id: WIL_CHARACTER_ID.STORM_SHOOTERS_PRINCE,
    name: "ジョット",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_PRINCE1,
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_PRINCE2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_PRINCE3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_PRINCE4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_PRINCE5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.WIND,
    status: { life: 150, attack: 27, defense: 24, speed: 32, magic: 24 },
    learnable: [
      WIL_SKILL_ID.ARROW_RAIN,
      WIL_SKILL_ID.WIND_ARROW,
      WIL_SKILL_ID.ARROW_STORM,
      WIL_SKILL_ID.JET_ARROW,
      WIL_SKILL_ID.AIR_CUTTER,
      WIL_SKILL_ID.TEMPEST,
    ],
    skills: [
      WIL_SKILL_ID.ARROW_RAIN,
      WIL_SKILL_ID.WIND_ARROW,
      WIL_SKILL_ID.AIR_CUTTER,
    ],
  },
  STORM_SHOOTERS_ARCHER: {
    id: WIL_CHARACTER_ID.STORM_SHOOTERS_ARCHER,
    name: "火弓兵",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_ARCHER1,
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_ARCHER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_STORM_SHOOTERS_ARCHER3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.FIRE,
    status: { life: 120, attack: 25, defense: 20, speed: 26, magic: 20 },
    learnable: [
      WIL_SKILL_ID.PIERCING_SHOT,
      WIL_SKILL_ID.ARROW_RAIN,
      WIL_SKILL_ID.FIRE_SHOT,
      WIL_SKILL_ID.BURST,
    ],
    skills: [WIL_SKILL_ID.PIERCING_SHOT, WIL_SKILL_ID.FIRE_SHOT],
  },
  SMOG_LABORATORY_MEMBER: {
    id: WIL_CHARACTER_ID.SMOG_LABORATORY_MEMBER,
    name: "科学兵",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_MEMBER1,
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_MEMBER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_MEMBER3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.SOIL,
    status: { life: 100, attack: 15, defense: 15, speed: 20, magic: 25 },
    learnable: [],
    skills: [WIL_SKILL_ID.PRODUCE, WIL_SKILL_ID.REPAIR],
  },
  SMOG_LABORATORY_ANDROID: {
    id: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
    name: "人口兵",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_ANDROID1,
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_ANDROID2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_ANDROID3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_ANDROID2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_SMOG_LABORATORY_ANDROID3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.NONE,
    status: { life: 150, attack: 20, defense: 25, speed: 20, magic: 23 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.ROCK_BUSTER,
      WIL_SKILL_ID.AIR_CUTTER,
      WIL_SKILL_ID.FIRE_BALL,
      WIL_SKILL_ID.WARTER_CANNON,
    ],
  },
  INFERNITY_SAMURAIS_KING: {
    id: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_KING,
    name: "グレン",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_KING1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_KING2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_KING3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_KING4,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.FIRE,
    status: { life: 300, attack: 60, defense: 36, speed: 46, magic: 38 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.GOKUEN,
      WIL_SKILL_ID.BAKUEN,
      WIL_SKILL_ID.SATAN_FRAME,
      WIL_SKILL_ID.LIGHT_FIRE,
    ],
  },
  INFERNITY_SAMURAIS_SAND_SPY: {
    id: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_SAND_SPY,
    name: "サジン",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_SAND_SPY1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_SAND_SPY2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_SAND_SPY3,
          duration: 0.5,
        },
      ],
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_SAND_SPY4,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.SOIL,
    status: { life: 250, attack: 44, defense: 42, speed: 56, magic: 40 },
    learnable: [],
    skills: [WIL_SKILL_ID.SAND_SLASH, WIL_SKILL_ID.SAND_STORM],
  },
  INFERNITY_SAMURAIS_THUNDER_SPY: {
    id: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_THUNDER_SPY,
    name: "シノブ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY3,
          duration: 0.5,
        },
      ],
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_SAND_SPY4,
          duration: 1,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_SAND_SPY4,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.THUNDER,
    status: { life: 140, attack: 30, defense: 26, speed: 40, magic: 26 },
    learnable: [
      WIL_SKILL_ID.THUNDER_SWORD,
      WIL_SKILL_ID.THUNDER_NEEDLE,
      WIL_SKILL_ID.RAIZIN,
      WIL_SKILL_ID.THUNDER_SHOT,
      WIL_SKILL_ID.RAILGUN,
      WIL_SKILL_ID.LIGHTNING,
    ],
    skills: [
      WIL_SKILL_ID.THUNDER_SWORD,
      WIL_SKILL_ID.THUNDER_SHOT,
      WIL_SKILL_ID.LIGHTNING,
    ],
  },
  INFERNITY_SAMURAIS_WATER_SOLDIER: {
    id: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_WATER_SOLDIER,
    name: "スイゲツ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WATER_SOLDIER1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WATER_SOLDIER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WATER_SOLDIER3,
          duration: 0.5,
        },
      ],
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WATER_SOLDIER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WATER_SOLDIER3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.WATER,
    status: { life: 180, attack: 40, defense: 30, speed: 30, magic: 25 },
    learnable: [],
    skills: [WIL_SKILL_ID.WATER_SLASH, WIL_SKILL_ID.WARTER_CANNON],
  },
  INFERNITY_SAMURAI_WIND_SOLDIER: {
    id: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_WIND_SOLDIER,
    name: "センプウ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WIND_SOLDIER1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WIND_SOLDIER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_INFERNITY_SAMURAIS_WIND_SOLDIER3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.WIND,
    status: { life: 200, attack: 52, defense: 38, speed: 52, magic: 36 },
    learnable: [],
    skills: [WIL_SKILL_ID.FAST_SLASH, WIL_SKILL_ID.WIND_SLASH],
  },
  DARK_MONSTER_SHADOW: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
    name: "シャドウ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SHADOW1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SHADOW2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SHADOW3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SHADOW4,
          duration: 0.4,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SHADOW5,
          duration: 0.3,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SHADOW3,
          duration: 0.3,
        },
      ],
    },
    element: WIL_ELEMENT.DARK,
    status: { life: 30, attack: 12, defense: 4, speed: 5, magic: 10 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.POISON_NAIL,
      WIL_SKILL_ID.SHADOW_BALL,
    ],
  },
  DARK_MONSTER_RABBIT: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_RABBIT,
    name: "一角兎",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_RABBIT1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_RABBIT2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_RABBIT3,
          duration: 0.5,
        },
      ],
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_RABBIT4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_RABBIT5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.WATER,
    status: { life: 80, attack: 16, defense: 14, speed: 20, magic: 14 },
    learnable: [],
    skills: [WIL_SKILL_ID.SNOW_BLADE, WIL_SKILL_ID.ICE_SHOT],
  },
  DARK_MONSTER_UNDEAD: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_UNDEAD,
    name: "アンデッド",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_UNDEAD1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_UNDEAD2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_UNDEAD3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_UNDEAD4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_UNDEAD5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.DARK,
    status: { life: 160, attack: 14, defense: 8, speed: 8, magic: 12 },
    learnable: [],
    skills: [WIL_SKILL_ID.POISON_NAIL, WIL_SKILL_ID.SMOG],
  },
  DARK_MONSTER_SCORPION: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SCORPION,
    name: "スコーピオン",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SCORPION1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SCORPION2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SCORPION3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.DARK,
    status: { life: 110, attack: 16, defense: 20, speed: 18, magic: 16 },
    learnable: [],
    skills: [WIL_SKILL_ID.POISON_NAIL, WIL_SKILL_ID.BLACK_LINE],
  },
  DARK_MONSTER_LIZARD: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_LIZARD,
    name: "リザード",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_LIZARD1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_LIZARD2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_LIZARD3,
          duration: 0.5,
        },
      ],
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_LIZARD4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_LIZARD5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.FIRE,
    status: { life: 130, attack: 22, defense: 20, speed: 14, magic: 14 },
    learnable: [],
    skills: [WIL_SKILL_ID.RED_LINE, WIL_SKILL_ID.FIRE_SHOT],
  },
  DARK_MONSTER_WATER_SOLDIER: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_WATER_SOLDIER,
    name: "闇スイゲツ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_WATER_SOLDIER1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_WATER_SOLDIER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_WATER_SOLDIER3,
          duration: 0.5,
        },
      ],
      shootPhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_WATER_SOLDIER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_WATER_SOLDIER3,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.WATER,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [WIL_SKILL_ID.WATER_SLASH, WIL_SKILL_ID.WARTER_CANNON],
  },
  DARK_MONSTER_THUNDER_SOLDIER: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_THUNDER_SOLDIER,
    name: "闇ザーグ",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_THUNDER_SOLDIER1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_THUNDER_SOLDIER2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_THUNDER_SOLDIER3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_SOLDIER4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_HOLY_KNIGHTS_SOLDIER5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.THUNDER,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [WIL_SKILL_ID.THUNDER_SWORD, WIL_SKILL_ID.THUNDER_VOLT],
  },
  DARK_MONSTER_ICE_DEMON: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_ICE_DEMON,
    name: "氷の魔人",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_ICE_DEMON1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_ICE_DEMON2,
          duration: 0.3,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_ICE_DEMON3,
          duration: 0.7,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_ICE_DEMON2,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.WATER,
    status: { life: 500, attack: 40, defense: 40, speed: 40, magic: 30 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.REGENERATION,
      WIL_SKILL_ID.BLIZZARD,
      WIL_SKILL_ID.GLACIER,
    ],
  },
  DARK_MONSTER_FIRE_DEMON: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_FIRE_DEMON,
    name: "炎の魔人",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_FIRE_DEMON1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_FIRE_DEMON2,
          duration: 1,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_FIRE_DEMON2,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.FIRE,
    status: { life: 500, attack: 50, defense: 35, speed: 35, magic: 30 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.REGENERATION,
      WIL_SKILL_ID.CROSS_FIRE,
      WIL_SKILL_ID.DEMON_FIRE,
    ],
  },
  DARK_MONSTER_WIND_DEMON: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_WIND_DEMON,
    name: "風の魔人",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_WIND_DEMON1,
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_WIND_DEMON2,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.WIND,
    status: { life: 500, attack: 30, defense: 40, speed: 50, magic: 30 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.REGENERATION,
      WIL_SKILL_ID.CYCLONE,
      WIL_SKILL_ID.HEADWIND,
    ],
  },
  DARK_MONSTER_SOIL_DEMON: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SOIL_DEMON,
    name: "土の魔人",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SOIL_DEMON1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SOIL_DEMON2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SOIL_DEMON3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SOIL_DEMON4,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.SOIL,
    status: { life: 500, attack: 40, defense: 50, speed: 30, magic: 30 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.REGENERATION,
      WIL_SKILL_ID.HEAVY_ROCK,
      WIL_SKILL_ID.ROCK_BUSTER,
    ],
  },
  DARK_MONSTER_SATAN: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SATAN,
    name: "魔王ホックス",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SATAN1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SATAN2,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SATAN3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SATAN4,
          duration: 0.5,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SATAN5,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.DARK,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [WIL_SKILL_ID.BLACK_LINE, WIL_SKILL_ID.BLACK_METEOR],
  },
  DARK_MONSTER_SUPER_SATAN_HEAD: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_HEAD,
    name: "魔王(頭部)",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_HEAD1,
      closePhisic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_HEAD1,
          duration: 0.3,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_HEAD2,
          duration: 0.3,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_HEAD3,
          duration: 0.4,
        },
      ],
      magic: [
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_HEAD1,
          duration: 0.3,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_HEAD2,
          duration: 0.3,
        },
        {
          visual: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_HEAD3,
          duration: 0.4,
        },
      ],
    },
    element: WIL_ELEMENT.DARK,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.BLACK_METEOR,
      WIL_SKILL_ID.HOPELESS,
      WIL_SKILL_ID.BLACK_HOLE,
    ],
  },
  DARK_MONSTER_SUPER_SATAN_RIGHT_HAND: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_RIGHT_HAND,
    name: "魔王(右腕)",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_RIGHT_HAND1,
      closePhisic: [
        {
          visual:
            WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_RIGHT_HAND2,
          duration: 0.5,
        },
        {
          visual:
            WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_RIGHT_HAND3,
          duration: 0.5,
        },
      ],
      magic: [
        {
          visual:
            WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_RIGHT_HAND4,
          duration: 0.5,
        },
      ],
    },
    element: WIL_ELEMENT.FIRE,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.SUMMON_FIRE_DEMON,
      WIL_SKILL_ID.RED_LINE,
      WIL_SKILL_ID.SATAN_FRAME,
    ],
  },
  DARK_MONSTER_SUPER_SATAN_LEFT_HAND: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_LEFT_HAND,
    name: "魔王(左腕)",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_LEFT_HAND1,
      magic: [
        {
          visual:
            WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_LEFT_HAND2,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.WATER,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.SUMMON_ICE_DEMON,
      WIL_SKILL_ID.SQUALL,
      WIL_SKILL_ID.HEAL_WATER,
    ],
  },
  DARK_MONSTER_SUPER_SATAN_RIGHT_FOOT: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_RIGHT_FOOT,
    name: "魔王(右足)",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_RIGHT_FOOT1,
      magic: [
        {
          visual:
            WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_RIGHT_FOOT2,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.WIND,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [
      WIL_SKILL_ID.SUMMON_WIND_DEMON,
      WIL_SKILL_ID.TEMPEST,
      WIL_SKILL_ID.TAILWIND,
    ],
  },
  DARK_MONSTER_SUPER_SATAN_LEFT_FOOT: {
    id: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_LEFT_FOOT,
    name: "魔王(左足)",
    visual: {
      standing: WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_LEFT_FOOT1,
      magic: [
        {
          visual:
            WIL_IMAGE_ID.DOT_CHARACTER_DARK_MONSTER_SUPER_SATAN_LEFT_FOOT2,
          duration: 1,
        },
      ],
    },
    element: WIL_ELEMENT.SOIL,
    status: { life: 1, attack: 0, defense: 0, speed: 0, magic: 0 },
    learnable: [],
    skills: [WIL_SKILL_ID.SUMMON_SOIL_DEMON, WIL_SKILL_ID.EARTHQUAKE],
  },
};
