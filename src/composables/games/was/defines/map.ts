import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import GOUVisualDefinition from "@/composables/types/visuals/GOUVisualDefinition";

/**
 * 各エリア以外の背景定義
 */

// マップ背景
const WAS_MAP: GOUVisualDefinition = {
  type: GOUVisualType.IMAGE_SVG,
  path: "/games/was/Map.svg",
  width: 100,
  height: 100,
};

export { WAS_MAP };
