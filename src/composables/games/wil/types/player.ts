import { WilCharacter } from "./character";
import { WilOperator } from "./operator";

export class WilPlayer extends WilOperator {
  characters: Array<WilCharacter> = [];
}
