import GOUPosition from "../GOUPosition";
import GOUVisual from "./GOUVisual";

class GOUImage extends GOUVisual {
  path: string;
  width: number;
  height: number;
  constructor(path: string, width: number, height: number) {
    super();
    this.path = path;
    this.width = width;
    this.height = height;
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

export default GOUImage;
