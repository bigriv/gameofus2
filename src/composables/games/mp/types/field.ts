import { MP_DIRECTION } from "../enums/direction";
import { MpCoin } from "./coin";
import { MpPot } from "./pot";

export class MpField {
  readonly width: number = 100;
  readonly height: number = 100;
  pot: MpPot = new MpPot();
  coin?: MpCoin;

  /**
   * 指定されたオブジェクトがフィールド内にあるかを判定する
   * @param position 判定するオブジェクト
   * @returns フィールド内ならtrue、フィールド外ならfalse
   */
  isInside(object: MpPot | MpCoin): boolean {
    // TODO: オブジェクトの大きさを考量する
    if (object.position.px < 0) {
      return false;
    }
    if (object.position.px >= this.width) {
      return false;
    }
    if (object.position.py < 0) {
      return false;
    }
    if (object.position.py >= this.height) {
      return false;
    }
    return true;
  }

  movePot(direction: MP_DIRECTION) {
    if (direction === MP_DIRECTION.LEFT) {
      if (this.pot.position.px - this.pot.speed < 0) {
        this.pot.position.px = 0;
        return;
      }
      this.pot.position.px -= this.pot.speed;
    } else if (direction === MP_DIRECTION.RIGHT) {
      if (this.pot.position.px + this.pot.width + this.pot.speed > this.width) {
        this.pot.position.px = this.width - this.pot.width;
        return;
      }
      this.pot.position.px += this.pot.speed;
    }
  }

  moveCoin(level: number) {
    if (!this.coin) {
      return;
    }
    this.coin.position.py += 0.2 + 0.05 * level;
  }
  removeCoin() {
    this.coin = undefined;
  }
}
