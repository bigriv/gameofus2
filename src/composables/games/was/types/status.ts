import { WAS_ELEMENT } from "../const";

type WAS_STATUS_TYPE = {
  life: number;
  satiety: number;
  attack?: number;
  defense?: number;
  speed?: number;
  magic?: number;
  element?: WAS_ELEMENT;
};
class WasStatus {
  life: number;
  satiety: number;
  attack: number;
  defense: number;
  speed: number;
  magic: number;
  element: WAS_ELEMENT;

  constructor(arg?: WAS_STATUS_TYPE) {
    this.life = arg?.life ?? 100;
    this.satiety = arg?.satiety ?? 100;
    this.attack = arg?.attack ?? 0;
    this.defense = arg?.defense ?? 0;
    this.speed = arg?.speed ?? 0;
    this.magic = arg?.magic ?? 0;
    this.element = arg?.element ?? WAS_ELEMENT.NONE;
  }
}

export default WasStatus;
