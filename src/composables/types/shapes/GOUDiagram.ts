import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import GOUShape from "./GOUShape";

abstract class GOUDiagram extends GOUShape {
  color: GOUColor;
  constructor(color?: GOUColor) {
    super();
    this.color = color ?? new GOUColor(COLOR.WHITE, 0);
  }
}

export default GOUDiagram;
