import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WilOperator } from "./operator";

export class WilComputer extends WilOperator {
  battleMove(afterFunction: Function) {
    // TODO: コンピュータのキャラクター行動選択処理を実装
    console.log("proceed enemy turn");
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }
    this.moveCharacter.stack += 100;
    setTimeout(() => {
      afterFunction();
    }, 1000);
  }
}
