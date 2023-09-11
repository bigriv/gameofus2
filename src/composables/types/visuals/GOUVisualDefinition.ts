import { COLOR } from "../GOUColor";
import GOUVisualType from "./GOUVisualType";

type GOUVisualDefinition = (
  | {
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
      start: { x: number; y: number };
      end: { x: number; y: number };
      thick: number;
    }
  | {
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
      text: string;
      fontSize: number;
      fontFamilly: string;
    }
  | {
      path: string;
      width: number;
      height: number;
    }
) & {
  type: GOUVisualType,
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
