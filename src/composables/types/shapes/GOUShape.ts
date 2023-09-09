import GOUPosition from "../GOUPosition";

abstract class GOUShape {
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
}

export default GOUShape;
