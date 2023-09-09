import GOUVisual from "./GOUVisual";
import GOUPosition from "../GOUPosition";
import GOUVisualType from "./GOUVisualType";
import { GOUColor } from "../GOUColor";

type GOUVisualDefinition = (
  | {
      type: GOUVisualType.DIAGRAM_RECT;
      width: number;
      height: number;
      border?: {
        thick: number;
        color: GOUColor;
      };
    }
  | {
      type: GOUVisualType.DIAGRAM_CIERCLE;
      radius: number;
      border?: {
        thick: number;
        color: GOUColor;
      };
    }
  | {
      type: GOUVisualType.DIAGRAM_POLYGON;
      points: Array<GOUPosition>;
      border?: {
        thick: number;
        color: GOUColor;
      };
    }
  | {
      type: GOUVisualType.DIAGRAM_LINE;
      start: GOUPosition;
      end: GOUPosition;
      thick: number;
    }
  | {
      type: GOUVisualType.DIAGRAM_LINE_LIST;
      lines: Array<{
        start: GOUPosition;
        end: GOUPosition;
        thick: number;
        color: GOUColor;
      }>;
    }
  | {
      type: GOUVisualType.DIAGRAM_TEXT;
      text: string;
      fontSize: number;
      fontFamilly: string;
    }
  | {
      type: GOUVisualType.IMAGE_SVG;
      path: string;
      width: number;
      height: number;
    }
) & {
  color?: GOUColor;
  position?: GOUPosition;
  children?: {
    [index: string]: GOUVisualDefinition;
  };
};

export default GOUVisualDefinition;
