import { GOUColor } from "@/composables/types/GOUColor";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUPosition from "@/composables/types/GOUPosition";

/**
 * 描画用の矩形図形クラス
 */
class GOURect extends GOUDiagram {
  width: number;
  height: number;
  border?: { thick: number; color: GOUColor };
  constructor(
    width: number,
    height: number,
    color?: GOUColor,
    border?: { thick: number; color: GOUColor }
  ) {
    super(color);
    this.width = width;
    this.height = height;
    this.border = border;
  }

  // 図形の最も左の点のX座標を取得する
  getMinX(): number {
    return 0;
  }
  // 図形の最も右の点のX座標を取得する
  getMaxX(): number {
    return this.width;
  }
  // 図形の最も上の点のY座標を取得する
  getMinY(): number {
    return 0;
  }
  // 図形の最も下の点のY座標を取得する
  getMaxY(): number {
    return this.height;
  }
  isInside(position: GOUPosition): boolean {
    if (position.px < this.getMinX()) {
      return false;
    }
    if (position.px > this.getMaxX()) {
      return false;
    }
    if (position.py < this.getMinY()) {
      return false;
    }
    if (position.py > this.getMaxY()) {
      return false;
    }
    return true;
  }
}

export default GOURect;
