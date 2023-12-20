import { WIL_ELEMENT } from "../enums/element";
import { WIL_SKILL_ID, WIL_SKILL_TYPE } from "../enums/skill";
import { WIL_IMAGE_ID } from "../enums/image";

export const WIL_CHARACTER_DEFINES: {
  [key: string]: {
    name: string;
    visual: {
      standing: WIL_IMAGE_ID;
      closePhisic?: WIL_IMAGE_ID;
      shootPhisic?: WIL_IMAGE_ID;
      magic?: WIL_IMAGE_ID;
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
    name: "ヒカル",
    visual: {
      standing: WIL_IMAGE_ID.MINI_CHARACTER_HERO,
    },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.SHINE,
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.SACRED_RAZER,
      WIL_SKILL_ID.SANCTUARY,
      WIL_SKILL_ID.CREATE_SACRED_SWORD,
    ],
    skillType: [
      WIL_SKILL_TYPE.CLOSE_PHISIC,
      WIL_SKILL_TYPE.ATTACK_MAGIC,
      WIL_SKILL_TYPE.SUPPORT_MAGIC,
    ],
  },
  // 聖騎士団
  HOLY_KNIGHTS_SOLDIER: {
    name: "近接兵",
    visual: { standing: WIL_IMAGE_ID.CHARACTER_OTHER },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SLASH],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC],
  },
  HOLY_KNIGHTS_MAGICIAN: {
    name: "魔法兵",
    visual: { standing: WIL_IMAGE_ID.CHARACTER_OTHER },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SHINE_BALL],
    skillType: [WIL_SKILL_TYPE.ATTACK_MAGIC],
  },
  HOLY_KNIGHTS_LEADER: {
    name: "騎士団長",
    visual: { standing: WIL_IMAGE_ID.MINI_CHARACTER_HOLY_KNIGHTS_LEADER },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SLASH],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC],
  },

  // 嵐の射手
  STORM_SHOOTERS_ARCHER: {
    name: "弓兵",
    visual: { standing: WIL_IMAGE_ID.CHARACTER_OTHER },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.WIND,
    skills: [WIL_SKILL_ID.SLASH],
    skillType: [WIL_SKILL_TYPE.SHOOT_PHISIC],
  },

  // モンスター
  DARK_MONSTER_SHADOW: {
    name: "シャドウ",
    visual: { standing: WIL_IMAGE_ID.CHARACTER_OTHER },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.DARK,
    skills: [WIL_SKILL_ID.SLASH],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
  },
};
