import { WIL_ELEMENT } from "../enums/element";
import { WIL_SKILL_ID, WIL_SKILL_TYPE } from "../enums/skill";
import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_CHARACTER_ID } from "../enums/character";

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
    skills: [WIL_SKILL_ID.SLASH, WIL_SKILL_ID.HEAL],
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
      life: 20,
      attack: 6,
      defense: 4,
      speed: 5,
      magic: 4,
    },
    element: WIL_ELEMENT.DARK,
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.POISON_NAIL,
      WIL_SKILL_ID.SHADOW_BALL,
    ],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
  },
};
