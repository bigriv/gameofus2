import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import GOUVisual from "../visuals/GOUVisual";

abstract class GOUDiagram extends GOUVisual {
  color: GOUColor;
  constructor(color?: GOUColor) {
    super();
    this.color = color ?? new GOUColor(COLOR.WHITE, 0);
  }
}

export default GOUDiagram;
