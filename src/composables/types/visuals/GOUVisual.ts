import GOUPosition from "../GOUPosition";
import ClickableIf from "../interfaces/ClickableIf";

abstract class GOUVisual implements ClickableIf {
  position: GOUPosition = new GOUPosition(); // 親の物体から見た物体の相対位置
  children?: { [index: string]: GOUVisual };

  isClickable: boolean = false;
  hovering: boolean = false;
  onClick: Function = () => {};
  onMouseEnter: Function = () => {};
  onMouseLeave: Function = () => {};
  onMouseUp: Function = () => {};
  onMouseDown: Function = () => {};

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

  abstract getMinX(): number;
  abstract getMaxX(): number;
  // 図形の真ん中のX座標を取得する
  getCenterX(): number {
    const min = this.getMinX();
    const max = this.getMaxX();
    return (min + max) / 2;
  }
  abstract getMinY(): number;
  abstract getMaxY(): number;
  // 図形の真ん中のY座標を取得する
  getCenterY(): number {
    const min = this.getMinY();
    const max = this.getMaxY();
    return (min + max) / 2;
  }
  abstract isInside(position: GOUPosition): boolean;

  judgeHover(event: MouseEvent): boolean {
    if (!this.isClickable) {
      return false;
    }
    this.hovering = this.isInside(
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

export default GOUVisual;
