import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_SKILL_RANGE } from "../enums/skill";
import { WilCharacter } from "./character";
import { WilField, WilFieldCell } from "./field";
import { WilSkill } from "./skill";
import { WilBattleEvent } from "./event";

export abstract class WilOperator {
  moveCharacter?: WilCharacter;
  targetCell?: WilFieldCell;
  selectSkill?: WilSkill;

  resetMove() {
    this.moveCharacter = undefined;
    this.targetCell = undefined;
    this.selectSkill = undefined;
  }

  battleProcess(field: WilField): Array<WilBattleEvent> {
    if (!this.moveCharacter) {
      throw new WrongImplementationError(
        "キャラクター選択されていない状態で戦闘処理が行われました。"
      );
    }
    if (!this.targetCell) {
      throw new WrongImplementationError(
        "対象マスが設定されていない状態で戦闘処理が行われました。"
      );
    }
    if (!this.selectSkill) {
      // 発動スキルが設定されていなければ移動処理を行う
      this.moveCharacter.migrate();
      field.migrateCharacter(this.moveCharacter, this.targetCell);
      return [];
    }

    // スキルの発動処理
    if (this.moveCharacter.useSkill(this.selectSkill)) {
      // 発動に失敗した場合の処理
      return [];
    }

    switch (this.selectSkill.range) {
      case WIL_SKILL_RANGE.FRONT:
        break;
      case WIL_SKILL_RANGE.SKIP:
        break;
      case WIL_SKILL_RANGE.AROUND:
        break;
      case WIL_SKILL_RANGE.CROSS:
        break;
      case WIL_SKILL_RANGE.ROW:
        break;
      case WIL_SKILL_RANGE.COLUMN:
        break;
      case WIL_SKILL_RANGE.ALL:
        break;
    }

    return [];
  }
}
