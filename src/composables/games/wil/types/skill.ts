import { WIL_ELEMENT } from "../enums/element";
import { WIL_MOVE_RANGE } from "../enums/range";
import { WIL_SKILL_ID } from "../enums/skill";

export class WilSkill {
  id: WIL_SKILL_ID;
  name: string;
  description: string;
  cost: number;
  range: WIL_MOVE_RANGE;
  element: WIL_ELEMENT;

  constructor(define: {
    id: WIL_SKILL_ID;
    name: string;
    description: string;
    cost: number;
    range: WIL_MOVE_RANGE;
    element: WIL_ELEMENT;
  }) {
    this.id = define.id;
    this.name = define.name;
    this.description = define.description;
    this.cost = define.cost;
    this.range = define.range;
    this.element = define.element;
  }
}
