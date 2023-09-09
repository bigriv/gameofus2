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

const ConstructGOUVisual = (definition: GOUVisualDefinition): GOUVisual => {
  let visual = null;
  switch (definition.type) {
    case GOUVisualType.DIAGRAM_CIERCLE:
      visual = new GOUCircle(definition.radius, definition.color);
      break;
    case GOUVisualType.DIAGRAM_POLYGON:
      visual = new GOUPolygon(definition.points, definition.color);
      break;
    case GOUVisualType.DIAGRAM_RECT:
      visual = new GOURect(
        definition.width,
        definition.height,
        definition.color,
        definition.border
      );
      break;
    case GOUVisualType.DIAGRAM_LINE:
      visual = new GOULine(
        definition.start,
        definition.end,
        definition.thick,
        definition.color
      );
      break;
    case GOUVisualType.DIAGRAM_LINE_LIST:
      visual = new GOULineList(definition.lines);
      break;
    case GOUVisualType.DIAGRAM_TEXT:
      visual = new GOUText(
        definition.text,
        definition.fontSize,
        definition.fontFamilly,
        definition.color
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
  if (visual instanceof GOUDiagram && definition.color) {
    visual.color = definition.color;
  }
  if (definition.position) {
    visual.position = definition.position;
  }
  if (definition.children) {
    for (const key of Object.keys(definition.children)) {
      visual.setChild(key, ConstructGOUVisual(definition.children[key]));
    }
  }
  return visual;
};

export default ConstructGOUVisual;
