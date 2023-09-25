import axios from "axios";
import GOUPosition from "@/composables/types/GOUPosition";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

export class GOULottieAnimation extends GOUVisual {
  object: Object | null;
  readonly path: string;
  width: number;
  height: number;
  constructor(path: string, width: number, height: number) {
    super();
    this.object = null;
    this.path = path;
    this.width = width;
    this.height = height;
  }
  async load(): Promise<GOULottieAnimation> {
    if (this.object) {
      console.log(`The File '${this.path}' is aleady loaded.`);
      return this;
    }
    await axios
      .get(this.path)
      .then((response) => {
        console.log(response.data);
        if (!response.data) {
          throw new Error(`Data is Empty.${this.path}`);
        }
        this.object = response.data;
      })
      .catch((error) => console.log(error));

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
