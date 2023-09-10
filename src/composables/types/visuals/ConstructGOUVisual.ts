import GOUImage from "../shapes/GOUImage";
import GOUVisualType from "./GOUVisualType";
import GOUCircle from "../shapes/diagrams/GOUCircle";
import GOULine from "../shapes/diagrams/GOULine";
import GOULineList from "../shapes/diagrams/GOULineList";
import GOUPolygon from "../shapes/diagrams/GOUPolygon";
import GOURect from "../shapes/diagrams/GOURect";
import GOUText from "../shapes/diagrams/GOUText";
import GOUVisual from "./GOUVisual";
import GOUVisualDefinition from "./GOUVisualDefinition";
import GOUDiagram from "../shapes/GOUDiagram";
import { GOUColor } from "../GOUColor";
import GOUPosition from "../GOUPosition";

const ConstructGOUVisual = (definition: GOUVisualDefinition): GOUVisual => {
  let visual = null;
  let color = undefined;
  if (definition.color) {
    color = new GOUColor(definition.color.code, definition.color.opacity);
  }

  switch (definition.type) {
    case GOUVisualType.DIAGRAM_CIERCLE:
      visual = new GOUCircle(definition.radius, color);
      break;
    case GOUVisualType.DIAGRAM_POLYGON:
      const points = definition.points.map((p) => new GOUPosition(p.x, p.y));
      visual = new GOUPolygon(points, color);
      break;
    case GOUVisualType.DIAGRAM_RECT:
      let border = undefined;
      if (definition.border) {
        border = {
          thick: definition.border.thick,
          color: new GOUColor(
            definition.border.color.code,
            definition.border.color.opacity
          ),
        };
      }
      visual = new GOURect(definition.width, definition.height, color, border);
      break;
    case GOUVisualType.DIAGRAM_LINE:
      visual = new GOULine(
        new GOUPosition(definition.start.x, definition.start.y),
        new GOUPosition(definition.end.x, definition.end.y),
        definition.thick,
        color
      );
      break;
    case GOUVisualType.DIAGRAM_LINE_LIST:
      const lines = definition.lines.map(
        (l) =>
          new GOULine(
            new GOUPosition(l.start.x, l.start.y),
            new GOUPosition(l.end.x, l.end.y),
            l.thick,
            new GOUColor(l.color.code, l.color.opacity)
          )
      );
      visual = new GOULineList(lines);
      break;
    case GOUVisualType.DIAGRAM_TEXT:
      visual = new GOUText(
        definition.text,
        definition.fontSize,
        definition.fontFamilly,
        color
      );
      break;
    case GOUVisualType.IMAGE_SVG:
      visual = new GOUImage(
        definition.path,
        definition.width,
        definition.height
      );
      break;
  }

  if (visual instanceof GOUDiagram && color) {
    visual.color = color;
  }
  if (definition.position) {
    visual.position = new GOUPosition(
      definition.position.x,
      definition.position.y
    );
  }
  if (definition.children) {
    for (const key of Object.keys(definition.children)) {
      visual.setChild(key, ConstructGOUVisual(definition.children[key]));
    }
  }
  return visual;
};

export default ConstructGOUVisual;
