import { WilCharacter } from "./character";

export abstract class WilCondition {
  turn: number; // 持続ターン数
  constructor() {
    this.turn = 3;
  }

  consume() {
    this.turn--;
  }
  isEnd() {
    return this.turn <= 0;
  }
  abstract passive(__character: WilCharacter): void;
  abstract turnStartEffect(__character: WilCharacter): any;
  abstract turnEndEffect(__character: WilCharacter): any;
  abstract end(__character: WilCharacter): void;
}

export class WilBurnCondition extends WilCondition {
  constructor() {
    super();
  }

  passive(__character: WilCharacter): void {
    const decrease = __character.defaultStatus.attack * 0.1;
    __character.status.attack -= decrease;
    if (__character.status.attack < 0) {
      __character.status.attack = 0;
    }
  }
  turnStartEffect(__character: WilCharacter) {
    return null;
  }
  turnEndEffect(__character: WilCharacter) {
    const damage = __character.defaultStatus.life * 0.5;
    __character.status.life -= damage;
  }
  end(__character: WilCharacter): void {
    const increase = __character.defaultStatus.attack * 0.1;
    // 初期値を超えた場合は別のパッシブが働いているとみなすため、超過判定は行わない
    __character.status.attack += increase;
  }
}
