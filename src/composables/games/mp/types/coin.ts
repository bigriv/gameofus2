import { COLOR } from "@/composables/types/GOUColor";
import GOUPosition from "@/composables/types/GOUPosition";

export class MpCoin {
  readonly radius: number;
  readonly score: number;
  readonly color: COLOR;
  position: GOUPosition = new GOUPosition(50, 0);

  constructor(define: {
    score: number;
    color: COLOR;
    radius: number;
  }) {
    this.score = define.score;
    this.color = define.color;
    this.radius = define.radius;
  }
}
