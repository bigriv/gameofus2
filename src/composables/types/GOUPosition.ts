/**
 * 座標クラス
 */
class GOUPosition {
  px: number;
  py: number;
  pz: number;

  constructor(px?: number, py?: number, pz?: number) {
    this.px = px ?? 0;
    this.py = py ?? 0;
    this.pz = pz ?? 0;
  }

  add(d?: GOUPosition): GOUPosition {
    return new GOUPosition(
      this.px + (d?.px ?? 0),
      this.py + (d?.py ?? 0),
      this.pz + (d?.pz ?? 0)
    );
  }

  transform(): string {
    // TODO: 2D前提のライブラリとするため、z軸方向は必ずpxで処理するように修正する
    // 仕様決定が難しいため、z軸の移動は0とする
    return `translate3d(${this.px}%, ${this.py}%, 0)`;
  }
}

export default GOUPosition;
