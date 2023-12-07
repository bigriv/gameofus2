import { WIL_ELEMENT } from "../enums/element";
import { WIL_SKILL_ID } from "../enums/skill";
import { WIL_IMAGE_ID } from "../enums/image";

export const WIL_CHARACTER_DEFINES: {
  [key: string]: {
    name: string;
    visual: WIL_IMAGE_ID;
    miniVisual: WIL_IMAGE_ID;
    status: {
      life: number;
      attack: number;
      defense: number;
      speed: number;
      magic: number;
    };
    element: WIL_ELEMENT;
    skills: Array<WIL_SKILL_ID>;
  };
} = {
  HERO: {
    name: "主人公",
    visual: WIL_IMAGE_ID.CHARACTER_HERO,
    miniVisual: WIL_IMAGE_ID.MINI_CHARACTER_HERO,
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
      WIL_SKILL_ID.SHINE_ABSORB,
    ],
  },
  // 聖騎士団
  HOLY_KNIGHTS_SOLDIER: {
    name: "近接兵",
    visual: WIL_IMAGE_ID.CHARACTER_OTHER,
    miniVisual: WIL_IMAGE_ID.CHARACTER_OTHER,
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SLASH],
  },
  HOLY_KNIGHTS_MAGICIAN: {
    name: "魔法兵",
    visual: WIL_IMAGE_ID.CHARACTER_OTHER,
    miniVisual: WIL_IMAGE_ID.CHARACTER_OTHER,
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SHINE_BALL],
  },
  HOLY_KNIGHTS_LEADER: {
    name: "騎士団長",
    visual: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
    miniVisual: WIL_IMAGE_ID.MINI_CHARACTER_HOLY_KNIGHTS_LEADER,
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.THUNDER,
    skills: [WIL_SKILL_ID.SLASH],
  },

  // 嵐の射手
  STORM_SHOOTERS_ARCHER: {
    name: "弓兵",
    visual: WIL_IMAGE_ID.CHARACTER_OTHER,
    miniVisual: WIL_IMAGE_ID.CHARACTER_OTHER,
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.WIND,
    skills: [WIL_SKILL_ID.SLASH],
  },

  // モンスター
  DARK_MONSTER_SHADOW: {
    name: "シャドウ",
    visual: WIL_IMAGE_ID.CHARACTER_OTHER,
    miniVisual: WIL_IMAGE_ID.CHARACTER_OTHER,
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.DARK,
    skills: [WIL_SKILL_ID.SLASH],
  },
};
