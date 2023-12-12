import { WIL_BATTLE_TEAM } from "../enums/battle";
import { WIL_ELEMENT } from "../enums/element";
import { WIL_SKILL_RANGE } from "../enums/skill";
import { WIL_SKILL_ID } from "../enums/skill";

export class WilSkill {
  id: WIL_SKILL_ID;
  name: string;
  description: string;
  target: WIL_BATTLE_TEAM;
  cost: number;
  range: WIL_SKILL_RANGE;
  element: WIL_ELEMENT;

  constructor(define: {
    id: WIL_SKILL_ID;
    name: string;
    description: string;
    target: WIL_BATTLE_TEAM;
    cost: number;
    range: WIL_SKILL_RANGE;
    element: WIL_ELEMENT;
  }) {
    this.id = define.id;
    this.name = define.name;
    this.description = define.description;
    this.target = define.target;
    this.cost = define.cost;
    this.range = define.range;
    this.element = define.element;
  }
}
