import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import { GAME_DISPLAY_HEIGHT, GAME_DISPLAY_WIDTH } from "../const";
import {
  WAS_BOSS_GOBLIN,
  WAS_DARK_ELF,
  WAS_DORAGON,
  WAS_ELF,
  WAS_GOBLIN,
  WAS_HERO,
  WAS_KRAKEN,
  WAS_PRINCESS,
  WAS_SAHAGIN,
  WAS_SLIME,
  WAS_SOLDIER,
} from "./character";

/**
 * エリア定義
 */
const WAS_SATAN_CASTLE = {
  name: "魔王城",
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/SatanCastle.svg",
    width: 70,
    height: 70,
    position: { x: 50, y: 30 },
  },
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/SatanCastle.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  character: WAS_PRINCESS,
};

const WAS_CAVE = {
  name: "洞窟",
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Cave.svg",
    width: 70,
    height: 40,
    position: { x: 200, y: 125 },
  },
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Cave.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  character: WAS_GOBLIN,
  boss: WAS_BOSS_GOBLIN,
};
const WAS_SEA = {
  name: "海岸",
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Sea.svg",
    width: 100,
    height: 100,
    position: { x: 45, y: 290 },
  },
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Sea.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  chracter: WAS_SAHAGIN,
  boss: WAS_KRAKEN,
};
const WAS_VILLAGE = {
  name: "エルフ村",
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Village.svg",
    width: 60,
    height: 60,
    position: { x: 420, y: 75 },
  },
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Village.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  character: WAS_ELF,
  boss: WAS_DARK_ELF,
};
const WAS_MOUNTAIN = {
  name: "山",
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/Mountain.svg",
    width: 150,
    height: 70,
    position: { x: 280, y: 200 },
  },
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/Mountain.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  character: WAS_SLIME,
  boss: WAS_DORAGON,
};
const WAS_KINGDOM_CASTLE = {
  name: "王国",
  inside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/outside/KingdomCastle.svg",
    width: 70,
    height: 70,
    position: { x: 465, y: 300 },
  },
  outside: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/buildings/inside/KingdomCastle.svg",
    width: GAME_DISPLAY_WIDTH,
    height: GAME_DISPLAY_HEIGHT,
  },
  character: WAS_SOLDIER,
  boss: WAS_HERO,
};

export {
  WAS_SATAN_CASTLE,
  WAS_CAVE,
  WAS_SEA,
  WAS_VILLAGE,
  WAS_MOUNTAIN,
  WAS_KINGDOM_CASTLE,
};
