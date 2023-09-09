import GOUVisual from "./GOUVisual";
import GOUPosition from "../GOUPosition";
import { GOUShapeDefinition } from "../shapes/GOUShapeDefinition";

type GOUVisualDefinition = {
  shape: GOUShapeDefinition;
  position?: GOUPosition;
  children?: {
    [index: string]: GOUVisual;
  };
};

export default GOUVisualDefinition;
