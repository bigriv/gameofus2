import { WilOperator } from "./operator";

export class WilComputer extends WilOperator {
  battleMove(afterFunction: Function) {
    console.log("proceed enemy turn");
    setTimeout(() => {
      afterFunction();
    }, 1000);
  }
}
