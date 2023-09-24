import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import {
  GAME_DISPLAY_HEIGHT,
  GAME_DISPLAY_WIDTH,
  WAS_ITEM_ID,
} from "@/composables/games/was/const";
import GOUVisualDefinition from "@/composables/types/visuals/GOUVisualDefinition";

type WAS_AREA_DEFINITION_TYPE = {
  name: string;
  outside: GOUVisualDefinition;
  inside: GOUVisualDefinition;
  dropItems?: Array<{ probability: number; amount: number; id: WAS_ITEM_ID }>;
};
/**
 * エリア定義
 */
const WAS_SATAN_CASTLE: WAS_AREA_DEFINITION_TYPE = {
  name: "魔王城",
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/SatanCastle.svg",
    width: 70,
    height: 70,
    position: { x: 50, y: 30 },
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/SatanCastle.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
};

const WAS_CAVE: WAS_AREA_DEFINITION_TYPE = {
  name: "洞窟",
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Cave.svg",
    width: 70,
    height: 40,
    position: { x: 200, y: 125 },
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Cave.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  dropItems: [
    { probability: 0.05, amount: 1, id: WAS_ITEM_ID.POWER_LING },
    { probability: 0.3, amount: 2, id: WAS_ITEM_ID.RICE_BALL },
    { probability: 0.5, amount: 3, id: WAS_ITEM_ID.HERB },
  ],
};

const WAS_VILLAGE: WAS_AREA_DEFINITION_TYPE = {
  name: "エルフ村",
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Village.svg",
    width: 60,
    height: 60,
    position: { x: 420, y: 75 },
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Village.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  dropItems: [
    { probability: 0.05, amount: 1, id: WAS_ITEM_ID.WING_BOOTS },
    { probability: 0.3, amount: 3, id: WAS_ITEM_ID.MEAT },
    { probability: 0.5, amount: 3, id: WAS_ITEM_ID.HERB },
  ],
};

const WAS_SEA: WAS_AREA_DEFINITION_TYPE = {
  name: "海岸",
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Sea.svg",
    width: 100,
    height: 100,
    position: { x: 45, y: 290 },
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Sea.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  dropItems: [
    { probability: 0.05, amount: 1, id: WAS_ITEM_ID.MYSTERIOUS_SHELL },
    { probability: 0.1, amount: 2, id: WAS_ITEM_ID.HOLY_WATER },
    { probability: 0.3, amount: 3, id: WAS_ITEM_ID.FISH },
  ],
};

const WAS_MOUNTAIN: WAS_AREA_DEFINITION_TYPE = {
  name: "山",
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Mountain.svg",
    width: 150,
    height: 70,
    position: { x: 280, y: 200 },
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Mountain.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  dropItems: [
    { probability: 0.1, amount: 1, id: WAS_ITEM_ID.DRAGON_SCALE },
    { probability: 0.4, amount: 3, id: WAS_ITEM_ID.SUPER_HERB },
  ],
};
const WAS_KINGDOM_CASTLE: WAS_AREA_DEFINITION_TYPE = {
  name: "王国",
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/KingdomCastle.svg",
    width: 70,
    height: 70,
    position: { x: 465, y: 300 },
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/KingdomCastle.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  dropItems: [
    { probability: 0.1, amount: 2, id: WAS_ITEM_ID.SUPER_HERB },
    { probability: 0.3, amount: 3, id: WAS_ITEM_ID.RICE_BALL },
    { probability: 0.3, amount: 2, id: WAS_ITEM_ID.MEAT },
    { probability: 0.3, amount: 2, id: WAS_ITEM_ID.FISH },
    { probability: 0.5, amount: 5, id: WAS_ITEM_ID.HERB },
  ],
};

export {
  WAS_SATAN_CASTLE,
  WAS_CAVE,
  WAS_SEA,
  WAS_VILLAGE,
  WAS_MOUNTAIN,
  WAS_KINGDOM_CASTLE,
};
