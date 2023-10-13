import { COLOR } from "@/composables/types/GOUColor";
import GOUVisualType from "@/composables/types/visuals/GOUVisualType";

type GOUVisualDefinition = (
  | {
      type: GOUVisualType.FRAME;
      width: number;
      height: number;
    }
  | {
      type: GOUVisualType.DIAGRAM_RECT;
      width: number;
      height: number;
      border?: {
        thick: number;
        color: {
          code?: COLOR;
          opacity?: number;
        };
      };
    }
  | {
      type: GOUVisualType.DIAGRAM_CIERCLE;
      radius: number;
      border?: {
        thick: number;
        color: {
          code?: COLOR;
          opacity?: number;
        };
      };
    }
  | {
      type: GOUVisualType.DIAGRAM_POLYGON;
      points: Array<{ x: number; y: number }>;
      border?: {
        thick: number;
        color: {
          code?: COLOR;
          opacity?: number;
        };
      };
    }
  | {
      type: GOUVisualType.DIAGRAM_LINE;
      start: { x: number; y: number };
      end: { x: number; y: number };
      thick: number;
    }
  | {
      type: GOUVisualType.DIAGRAM_LINE_LIST;
      lines: Array<{
        start: { x: number; y: number };
        end: { x: number; y: number };
        thick: number;
        color: {
          code?: COLOR;
          opacity?: number;
        };
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
  | {
      type: GOUVisualType.ANIMATION_LOTTIE;
      path: string;
      width: number;
      height: number;
    }
) & {
  color?: {
    code?: COLOR;
    opacity?: number;
  };
  position?: { x: number; y: number };
  children?: {
    [index: string]: GOUVisualDefinition;
  };
};

export default GOUVisualDefinition;
