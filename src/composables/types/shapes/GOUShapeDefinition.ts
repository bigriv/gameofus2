import { GOUColor } from "../GOUColor";
import GOUPosition from "../GOUPosition";
import GOUCircle from "./diagrams/GOUCircle";
import GOUDiagram from "./GOUDiagram";
import GOULine from "./diagrams/GOULine";
import GOULineList from "./diagrams/GOULineList";
import GOUPolygon from "./diagrams/GOUPolygon";
import GOURect from "./diagrams/GOURect";
import GOUText from "./diagrams/GOUText";

enum GOUShapeType {
  DIAGRAM_CIERCLE,
  DIAGRAM_POLYGON,
  DIAGRAM_RECT,
  DIAGRAM_LINE,
  DIAGRAM_LINE_LIST,
  DIAGRAM_TEXT,
  IMAGE_SVG,
}

type GOUShapeDefinition = {
  type: GOUShapeType;
  width?: number;
  height?: number;
  radius?: number;
  color?: GOUColor;
  border?: {
    thick: number;
    color: GOUColor;
  };
  points?: Array<GOUPosition>;
  start?: GOUPosition;
  end?: GOUPosition;
  thick?: number;
  lines?: Array<
    | GOULine
    | {
        start: GOUPosition;
        end: GOUPosition;
        thick: number;
        color: GOUColor;
      }
  >;
  text?: string;
  fontSize?: number;
  fontFamilly?: string;
  path?: string;
};

const ConstructGOUDiagram = (definition: GOUShapeDefinition): GOUDiagram => {
  switch (definition.type) {
    case GOUShapeType.DIAGRAM_CIERCLE:
      if (definition.radius) {
        return new GOUCircle(definition.radius, definition.color);
      }
      break;
    case GOUShapeType.DIAGRAM_POLYGON:
      if (definition.points) {
        return new GOUPolygon(definition.points, definition.color);
      }
      break;
    case GOUShapeType.DIAGRAM_RECT:
      if (definition.width && definition.height) {
        return new GOURect(
          definition.width,
          definition.height,
          definition.color,
          definition.border
        );
      }
      break;
    case GOUShapeType.DIAGRAM_LINE:
      if (definition.start && definition.end && definition.thick) {
        return new GOULine(
          definition.start,
          definition.end,
          definition.thick,
          definition.color
        );
      }
      break;
    case GOUShapeType.DIAGRAM_LINE_LIST:
      if (definition.lines) {
        return new GOULineList(definition.lines);
      }
      break;
    case GOUShapeType.DIAGRAM_TEXT:
      if (definition.text && definition.fontSize) {
        return new GOUText(
          definition.text,
          definition.fontSize,
          definition.fontFamilly,
          definition.color
        );
      }
  }
  return new GOURect(0, 0);
};

export { GOUShapeType, ConstructGOUDiagram };
export type { GOUShapeDefinition };
