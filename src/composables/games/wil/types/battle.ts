import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilFieldCell } from "./field";

export class WilBattle {
  name: string;
  background: GOUVisual;
  deploy: Array<WilFieldCell>;

  constructor(name: string, background: GOUVisual, deploy: Array<WilFieldCell>) {
    this.name = name;
    this.background = background;
    this.deploy = deploy;
  }
}
