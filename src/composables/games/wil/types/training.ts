import { WIL_SKILL_ID } from "../enums/skill";
import { WIL_TRAINING_ID } from "../enums/training";
import { WilCharacter } from "./character";
import { WilStatus } from "./status";

export class WilTraining {
  id: WIL_TRAINING_ID;
  name: string;
  image: string;
  before?: WilStatus;
  after?: WilStatus;
  learned?: WIL_SKILL_ID;

  constructor(define: { id: WIL_TRAINING_ID; name: string; image: string }) {
    this.id = define.id;
    this.name = define.name;
    this.image = define.image;
  }

  proccess(character: WilCharacter) {
    this.learned = undefined;
    this.before = character.defaultStatus;
    switch (this.id) {
      case WIL_TRAINING_ID.ATTACK:
        character.defaultStatus.attack += 3;
        break;
      case WIL_TRAINING_ID.DEFENSE:
        character.defaultStatus.defense += 3;
        break;
      case WIL_TRAINING_ID.MIGRATION:
        character.defaultStatus.speed += 3;
        break;
      case WIL_TRAINING_ID.MAGIC:
        character.defaultStatus.magic += 3;
        this.learned = WIL_SKILL_ID.SLASH;
        character.skills.push(WIL_SKILL_ID.SLASH);
        break;
      case WIL_TRAINING_ID.PHISIC:
        character.defaultStatus.life += 3;
        break;
    }
    this.after = character.defaultStatus;
  }
}
