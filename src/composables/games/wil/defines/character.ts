import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_ELEMENT } from "../enums/element";
import { WIL_SKILL_ID } from "../enums/skill";
import GOUVisualDefinition from "@/composables/types/visuals/GOUVisualDefinition";

export const WIL_CHARACTER_DEFINES: Array<{
  id: WIL_CHARACTER_ID;
  name: string;
  visual: GOUVisualDefinition;
  miniVisual: GOUVisualDefinition;
  status: {
    life: number;
    attack: number;
    defense: number;
    speed: number;
    magic: number;
  };
  element: WIL_ELEMENT;
  skills: Array<WIL_SKILL_ID>;
}> = [
  {
    id: WIL_CHARACTER_ID.HERO,
    name: "主人公",
    visual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/games/wil/characters/HERO.png",
    },
    miniVisual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/games/wil/characters/HERO.png",
    },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.FIRE,
    skills: [
      WIL_SKILL_ID.SLASH,
      WIL_SKILL_ID.SACRED_RAZER,
      WIL_SKILL_ID.SHINE_ABSORB,
    ],
  },
  {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_SOLDIER,
    name: "近接兵",
    visual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    miniVisual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.FIRE,
    skills: [WIL_SKILL_ID.SLASH],
  },
  {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_MAGICIAN,
    name: "魔法兵",
    visual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    miniVisual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.FIRE,
    skills: [WIL_SKILL_ID.SHINE_BALL],
  },
  {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER,
    name: "騎士団長",
    visual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    miniVisual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.FIRE,
    skills: [WIL_SKILL_ID.SLASH],
  },
  {
    id: WIL_CHARACTER_ID.HOLY_KNIGHTS_ARCHER,
    name: "弓兵",
    visual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    miniVisual: {
      type: GOUVisualType.IMAGE_SVG,
      width: 100,
      height: 100,
      path: "/commons/icons/human_blue.svg",
    },
    status: {
      life: 100,
      attack: 15,
      defense: 12,
      speed: 8,
      magic: 10,
    },
    element: WIL_ELEMENT.FIRE,
    skills: [WIL_SKILL_ID.SLASH],
  },
];
