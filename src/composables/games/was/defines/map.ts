import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import { GAME_DISPLAY_HEIGHT, GAME_DISPLAY_WIDTH } from "@/composables/games/was/const";

/**
 * 各エリア以外の背景定義
 */

// マップ背景
const WAS_MAP = {
  type: GOUVisualType.IMAGE_SVG,
  path: "/games/was/Map.svg",
  width: GAME_DISPLAY_WIDTH,
  height: GAME_DISPLAY_HEIGHT,
};

export { WAS_MAP };
