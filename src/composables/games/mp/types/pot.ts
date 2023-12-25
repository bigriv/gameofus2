import GOUPosition from "@/composables/types/GOUPosition";
import { MpCoin } from "./coin";

export class MpPot {
  readonly speed: number = 1.5;
  readonly width: number = 12;
  readonly height: number = 10;
  position: GOUPosition = new GOUPosition(45, 90); // フィールドの一番下の真ん中になるように座標を調整

  /**
   * 壺とコインが衝突しているかを判定する
   * @returns 衝突している場合はtrue、衝突していない場合は false
   */
  isConflictCoin(coin: MpCoin): boolean {
    if (
      coin.position.px + coin.radius / 2 < this.position.px ||
      coin.position.px + coin.radius / 2 > this.position.px + this.width
    ) {
      return false;
    }
    if (
      coin.position.py + coin.radius / 2 < this.position.py ||
      coin.position.py + coin.radius / 2 > this.position.py + this.height
    ) {
      return false;
    }
    return true;
  }
}
