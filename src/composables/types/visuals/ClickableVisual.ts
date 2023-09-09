import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUVisualDefinition from "@/composables/types/visuals/GOUVisualDefinition";
import GOUPosition from "@/composables/types/GOUPosition";

class ClickableVisual extends GOUVisual {
  isClickable: boolean;
  hovering: boolean;
  onClick: Function;
  onMouseEnter: Function;
  onMouseLeave: Function;
  onMouseUp: Function;
  onMouseDown: Function;

  constructor(definition: GOUVisualDefinition, isClickable?: boolean) {
    super(definition);
    this.isClickable = isClickable ?? false;
    this.hovering = false;
    this.onClick = () => {};
    this.onMouseEnter = () => {};
    this.onMouseLeave = () => {};
    this.onMouseUp = () => {};
    this.onMouseDown = () => {};
  }
  judgeHover(event: MouseEvent): boolean {
    if (!this.isClickable) {
      return false;
    }
    this.hovering = this.shape.isInside(
      new GOUPosition(
        event.offsetX - this.position.px,
        event.offsetY - this.position.py
      )
    );
    return this.hovering;
  }
  isHover(): boolean {
    return this.hovering;
  }
}

export default ClickableVisual;
