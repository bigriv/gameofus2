import { GOUColor } from "@/composables/types/GOUColor";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUPosition from "@/composables/types/GOUPosition";

/**
 * 描画用の円図形クラス
 */
class GOUCircle extends GOUDiagram {
  radius: number;
  constructor(radius: number, color?: GOUColor) {
    super(color);
    this.radius = radius;
  }
  getMinX(): number {
    return 0;
  }
  getMaxX(): number {
    return this.radius * 2;
  }
  getMinY(): number {
    return 0;
  }
  getMaxY(): number {
    return this.radius * 2;
  }
  isInside(position: GOUPosition): boolean {
    const direction = Math.sqrt(
      Math.pow(position.px - this.getCenterX(), 2) +
        Math.pow(position.py - this.getCenterY(), 2)
    );
    return direction < this.radius;
  }
}

export default GOUCircle;
