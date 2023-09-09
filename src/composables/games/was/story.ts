import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import { GOUShapeType } from "@/composables/types/shapes/GOUShapeDefinition";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUPosition from "@/composables/types/GOUPosition";

class WasStoryManager {
  static getMessageArea(
    canvasWidth: number,
    canvasHeight: number,
    text: string
  ) {
    const messageArea = new GOUVisual({
      shape: {
        type: GOUShapeType.DIAGRAM_TEXT,
        text: text,
        fontSize: 20,
        color: new GOUColor(COLOR.WHITE),
      },
    });

    console.log(
      canvasWidth / 2,
      messageArea.shape.getMaxX(),
      canvasHeight / 2,
      messageArea.shape.getMaxY()
    );
    messageArea.move(
      new GOUPosition(
        canvasWidth / 2 - messageArea.shape.getMaxX() / 2,
        canvasHeight / 2 - messageArea.shape.getMaxY() / 2
      )
    );
    return messageArea;
  }
}

export default WasStoryManager;
