import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import { WAS_ITEM_ID } from "@/composables/games/was/const";
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
    width: 100,
    height: 100,
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/SatanCastle.svg",
    width: 100,
    height: 100,
  },
};

const WAS_CAVE: WAS_AREA_DEFINITION_TYPE = {
  name: "洞窟",
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Cave.svg",
    width: 100,
    height: 100,
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Cave.svg",
    width: 100,
    height: 100,
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
    width: 100,
    height: 100,
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Village.svg",
    width: 100,
    height: 100,
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
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Sea.svg",
    width: 100,
    height: 100,
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
    width: 100,
    height: 100,
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Mountain.svg",
    width: 100,
    height: 100,
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
    width: 100,
    height: 100,
  },
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/KingdomCastle.svg",
    width: 100,
    height: 100,
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
