import GOUPosition from "../GOUPosition";
import GOUVisualDefinition from "./GOUVisualDefinition";
import {
  ConstructGOUDiagram,
  GOUShapeType,
} from "../shapes/GOUShapeDefinition";
import GOUImage from "../shapes/GOUImage";
import GOUShape from "../shapes/GOUShape";

class GOUVisual {
  shape: GOUShape;
  position: GOUPosition; // 親の物体から見た物体の相対位置
  children?: { [index: string]: GOUVisual };
  constructor(definition: GOUVisualDefinition) {
    if (definition.shape.type == GOUShapeType.IMAGE_SVG) {
      if (
        !definition.shape.path ||
        !definition.shape.width ||
        !definition.shape.height
      ) {
        throw SyntaxError(
          "If GOUShapeType is IMAGE, need to path and width and height."
        );
      }
      this.shape = new GOUImage(
        definition.shape.path,
        definition.shape.width,
        definition.shape.height
      );
    } else {
      this.shape = ConstructGOUDiagram(definition.shape);
    }
    this.position = definition.position ?? new GOUPosition();
    this.children = definition.children;
  }

  setChild(key: string, child: GOUVisual): void {
    if (!this.children) {
      this.children = {};
    }
    this.children[key] = child;
  }
  deleteChild(key: string): void {
    if (!this.children) {
      return;
    }
    if (!this.children[key]) {
      return;
    }
    delete this.children[key];
  }
  move(position: GOUPosition) {
    this.position = position;
  }
}

export default GOUVisual;
