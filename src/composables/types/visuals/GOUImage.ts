import GOUPosition from "../GOUPosition";
import GOUVisual from "./GOUVisual";

class GOUImage extends GOUVisual {
  image: HTMLImageElement | null;
  readonly path: string;
  width: number;
  height: number;
  constructor(path: string, width: number, height: number) {
    super();
    this.image = null;
    this.path = path;
    this.width = width;
    this.height = height;
  }
  async load(): Promise<GOUImage> {
    if (this.image) {
      console.log(`The File '${this.path}' is already loaded.`);
      return this;
    }
    this.image = new Image();
    this.image.src = this.path;
    return this;
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
