import { GOUColor } from "@/composables/types/GOUColor";
import GOUPosition from "@/composables/types/GOUPosition";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

class GOUFrame extends GOUVisual {
  color: GOUColor;

  constructor(width: number, height: number, color?: GOUColor) {
    super();
    this.width = width;
    this.height = height;
    this.color = color ?? new GOUColor();
  }

  getMinX(): number {
    return 0;
  }
  getMaxX(): number {
    return this.width;
  }
  getMinY(): number {
    return 0;
  }
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

export default GOUFrame;
