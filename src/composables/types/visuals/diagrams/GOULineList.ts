import { GOUColor } from "@/composables/types/GOUColor";
import GOUPosition from "@/composables/types/GOUPosition";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOULine from "./GOULine";

type GOULineArgs = {
  start: GOUPosition;
  end: GOUPosition;
  thick: number;
  color: GOUColor;
};
class GOULineList extends GOUDiagram {
  lines: Array<GOULine>;
  constructor(lines: Array<GOULine | GOULineArgs>) {
    super();
    let temp = [];
    for (const line of lines) {
      if (line instanceof GOULine) {
        temp.push(line);
      } else {
        temp.push(new GOULine(line.start, line.end, line.thick, line.color));
      }
    }
    this.lines = temp;
  }
  getMinX(): number {
    return Math.min(...this.lines.map((l) => l.getMinX()));
  }
  getMaxX(): number {
    return Math.max(...this.lines.map((l) => l.getMaxX()));
  }
  getMinY(): number {
    return Math.min(...this.lines.map((l) => l.getMinY()));
  }
  getMaxY(): number {
    return Math.max(...this.lines.map((l) => l.getMaxY()));
  }
  isInside(): boolean {
    return false;
  }
}

export default GOULineList;
