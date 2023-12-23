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
    id: WIL_CHARACTER_ID.HERO,
    name: "ヒカル",
    visual: {
      standing: WIL_IMAGE_ID.MINI_CHARACTER_HERO,
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
      WIL_SKILL_TYPE.SHOOT_PHISIC,
      WIL_SKILL_TYPE.ATTACK_MAGIC,
      WIL_SKILL_TYPE.SUPPORT_MAGIC,
    ],
  },
  // 聖騎士団
  HOLY_KNIGHTS_LEADER: {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER,
    name: "ザーグ",
    visual: { standing: WIL_IMAGE_ID.MINI_CHARACTER_HOLY_KNIGHTS_LEADER },
    status: {
      life: 120,
      attack: 12,
      defense: 12,
      speed: 10,
      magic: 12,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SLASH, WIL_SKILL_ID.THUNDER_SWORD],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
  },
  HOLY_KNIGHTS_SOLDIER: {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_SOLDIER,
    name: "聖騎士",
    visual: { standing: WIL_IMAGE_ID.MINI_CHARACTER_HOLY_KNIGHTS_SOLDIER },
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
    name: "聖魔導士",
    visual: { standing: WIL_IMAGE_ID.MINI_CHARACTER_HOLY_KNIGHTS_MAGICIAN },
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
    visual: { standing: WIL_IMAGE_ID.MINI_DARK_MONSTER_SHADOW },
    status: {
      life: 50,
      attack: 5,
      defense: 5,
      speed: 5,
      magic: 5,
    },
    element: WIL_ELEMENT.DARK,
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.POISON_NAIL,
      WIL_SKILL_ID.SHADOW_SHOT,
      WIL_SKILL_ID.SHADOW_BALL,
    ],
    skillType: [WIL_SKILL_TYPE.CLOSE_PHISIC, WIL_SKILL_TYPE.ATTACK_MAGIC],
  },
};
