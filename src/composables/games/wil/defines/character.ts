import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import {
  WIL_SKILL_ID,
  WIL_SKILL_TYPE,
} from "@/composables/games/wil/enums/skill";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";

export const WIL_CHARACTER_DEFINES: {
  [key: string]: {
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
    skillType: Array<WIL_SKILL_TYPE>;
    element: WIL_ELEMENT;
    skills: Array<WIL_SKILL_ID>;
  };
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
    status: {
      life: 100,
      attack: 5,
      defense: 5,
      speed: 5,
      magic: 5,
    },
    element: WIL_ELEMENT.SHINE,
    skills: [WIL_SKILL_ID.SLASH],
    skillType: [
      WIL_SKILL_TYPE.CLOSE_PHISIC,
      WIL_SKILL_TYPE.ATTACK_MAGIC,
      WIL_SKILL_TYPE.SUPPORT_MAGIC,
    ],
  },
  // 聖騎士団
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
    status: {
      life: 120,
      attack: 12,
      defense: 10,
      speed: 10,
      magic: 8,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SLASH, WIL_SKILL_ID.THUNDER_SWORD],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
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
    status: {
      life: 100,
      attack: 8,
      defense: 8,
      speed: 5,
      magic: 5,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SLASH],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.SHOOT_PHISIC],
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
    status: {
      life: 80,
      attack: 5,
      defense: 8,
      speed: 5,
      magic: 10,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.THUNDER_BALL],
    skillType: [WIL_SKILL_TYPE.ATTACK_MAGIC, WIL_SKILL_TYPE.SUPPORT_MAGIC],
  },

  // 氷の守護者
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
    status: {
      life: 130,
      attack: 20,
      defense: 16,
      speed: 14,
      magic: 18,
    },
    element: WIL_ELEMENT.WATER,
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.SNOW_BLADE,
      WIL_SKILL_ID.BUBBLE_BALL,
    ],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
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
    status: {
      life: 120,
      attack: 12,
      defense: 20,
      speed: 8,
      magic: 8,
    },
    element: WIL_ELEMENT.SOIL,
    skills: [WIL_SKILL_ID.SLASH, WIL_SKILL_ID.POWER_ATTACK],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
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
    status: {
      life: 90,
      attack: 8,
      defense: 14,
      speed: 16,
      magic: 20,
    },
    element: WIL_ELEMENT.WATER,
    skills: [WIL_SKILL_ID.BUBBLE_BALL, WIL_SKILL_ID.HEAL_WATER],
    skillType: [WIL_SKILL_TYPE.ATTACK_MAGIC, WIL_SKILL_TYPE.SUPPORT_MAGIC],
  },

  // モンスター
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
    status: {
      life: 30,
      attack: 12,
      defense: 4,
      speed: 5,
      magic: 10,
    },
    element: WIL_ELEMENT.DARK,
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.POISON_NAIL,
      WIL_SKILL_ID.SHADOW_BALL,
    ],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
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
    status: {
      life: 80,
      attack: 16,
      defense: 14,
      speed: 20,
      magic: 14,
    },
    element: WIL_ELEMENT.WATER,
    skills: [WIL_SKILL_ID.SNOW_BLADE, WIL_SKILL_ID.ICE_SHOT],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.SHOOT_PHISIC],
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
    status: {
      life: 160,
      attack: 14,
      defense: 8,
      speed: 8,
      magic: 12,
    },
    element: WIL_ELEMENT.DARK,
    skills: [WIL_SKILL_ID.POISON_NAIL, WIL_SKILL_ID.SMOG],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.SUPPORT_MAGIC],
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
    status: {
      life: 500,
      attack: 40,
      defense: 40,
      speed: 40,
      magic: 30,
    },
    element: WIL_ELEMENT.WATER,
    skills: [
      WIL_SKILL_ID.REGENERATION,
      WIL_SKILL_ID.BLIZZARD,
      WIL_SKILL_ID.GLACIER,
    ],
    skillType: [
      WIL_SKILL_TYPE.CLOSE_PHISIC,
      WIL_SKILL_TYPE.SUPPORT_MAGIC,
      WIL_SKILL_TYPE.ATTACK_MAGIC,
    ],
  },
};
