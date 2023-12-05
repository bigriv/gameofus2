import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import GOUPosition from "@/composables/types/GOUPosition";
import GOUVisual from "./GOUVisual";

class GOUText extends GOUVisual {
  text: string;
  fontFamily?: string;
  color: GOUColor;
  border: {
    color: GOUColor;
  };
  constructor(
    text: string,
    width: number,
    fontFamily?: string,
    color?: GOUColor,
    border?: {
      color: {
        code: COLOR;
        opacity?: number;
      };
    }
  ) {
    super();
    this.text = text;
    this.fontFamily = fontFamily;
    this.width = width;
    this.height = 0;
    this.color = color ?? new GOUColor();
    this.border = {
      color: new GOUColor(border?.color.code, border?.color.opacity),
    };
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
export default GOUText;
