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
}

export default GOUPosition;
