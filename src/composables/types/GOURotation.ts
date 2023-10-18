import GOUPosition from "@/composables/types/GOUPosition";

/**
 * 回転クラス
 */
class GOURotation {
  rx: number;
  ry: number;
  rz: number;
  origin: GOUPosition;
  order: Array<"x" | "y" | "z">;

  constructor(
    rx?: number,
    ry?: number,
    rz?: number,
    origin?: GOUPosition,
    order?: Array<"x" | "y" | "z">
  ) {
    this.rx = rx ?? 0;
    this.ry = ry ?? 0;
    this.rz = rz ?? 0;
    this.origin = origin ?? new GOUPosition(50, 50, 0); // デフォルトではオブジェクトの中心を原点として回転する
    this.order = order ?? ["x", "y", "z"];
  }

  transform(): string {
    let rotateList = [];
    for (const r of this.order) {
      switch (r) {
        case "x":
          rotateList.push(`rotateX(${this.rx}deg)`);
          break;
        case "y":
          rotateList.push(`rotateY(${this.ry}deg)`);
          break;
        case "z":
          rotateList.push(`rotateZ(${this.rz}deg)`);
          break;
      }
    }
    return rotateList.join(" ");
  }

  transformOrigin(): string {
    // TODO: 2D前提のライブラリとするため、z軸方向は必ずpxで処理するように修正する
    // 仕様決定が難しいため、z軸の中心は常にオブジェクトと同じ平面とする
    return `${this.origin.px}% ${this.origin.py}% 0`;
  }
}

export default GOURotation;
