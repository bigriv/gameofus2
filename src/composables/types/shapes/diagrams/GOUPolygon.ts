import { GOUColor } from "@/composables/types/GOUColor";
import GOUPosition from "@/composables/types/GOUPosition";
import GOUDiagram from "@/composables/types/shapes/GOUDiagram";

/**
 * 描画用の多角形図形クラス
 */
class GOUPolygon extends GOUDiagram {
  points: Array<GOUPosition>;
  constructor(points: Array<GOUPosition>, color?: GOUColor) {
    super(color);
    this.points = points;
  }

  // 図形の最も左の点のX座標を取得する
  getMinX(): number {
    return Math.min(...this.points.map((p) => p.px));
  }
  // 図形の最も右の点のX座標を取得する
  getMaxX(): number {
    return Math.max(...this.points.map((p) => p.px));
  }
  // 図形の最も上の点のY座標を取得する
  getMinY(): number {
    return Math.min(...this.points.map((p) => p.py));
  }
  // 図形の最も下の点のY座標を取得する
  getMaxY(): number {
    return Math.max(...this.points.map((p) => p.py));
  }
  isInside(position: GOUPosition): boolean {
    let count = 0;
    for (let i = 0; i < this.points.length; i++) {
      let point1 = this.points[i];
      let point2 =
        i < this.points.length - 1 ? this.points[i + 1] : this.points[0];
      if (point1.py > point2.py) {
        let tmp = new GOUPosition(point1.px, point1.py);
        point1 = new GOUPosition(point2.px, point2.py);
        point2 = new GOUPosition(tmp.px, tmp.py);
      }
      // 点の右側のみを見るので、２点を結ぶ直線が左側にある場合はスキップする（外積を用いて計算）
      const judge =
        (point2.px - point1.px) * (position.py - point1.py) -
        (point2.py - point1.py) * (position.px - point1.px);
      if (judge > 0) {
        continue;
      }

      // 中心がy軸方向について始点と終点の間にない場合、カウントアップしない。ただし、終点は含まない
      if (point1.py > position.py || point2.py <= position.py) {
        continue;
      }
      count++;
    }
    return count % 2 == 1;
  }
}

export default GOUPolygon;
