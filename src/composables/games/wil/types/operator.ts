import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_MOVE_RANGE } from "../enums/range";
import { WilCharacter } from "./character";
import { WilField, WilFieldCell } from "./field";
import { WilSkill } from "./skill";
import { GOUEvent } from "@/composables/types/GOUEvent";

export abstract class WilOperator {
  magicStone: number = 0;
  selectCharacter?: WilCharacter;
  targetCell?: WilFieldCell;
  selectSkill?: WilSkill;

  resetMagicStone() {
    this.magicStone = 0;
  }

  addMagicStone() {
    this.magicStone += 100;
  }

  resetMove() {
    this.selectCharacter = undefined;
    this.targetCell = undefined;
    this.selectSkill = undefined;
  }

  battleProcess(field: WilField): Array<GOUEvent> {
    if (!this.selectCharacter) {
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
      field.migrateCharacter(this.selectCharacter, this.targetCell);
      return [];
    }

    switch (this.selectSkill.range) {
      case WIL_MOVE_RANGE.FIRST:
        break;
      case WIL_MOVE_RANGE.SKIP:
        break;
      case WIL_MOVE_RANGE.AROUND:
        break;
      case WIL_MOVE_RANGE.CROSS:
        break;
      case WIL_MOVE_RANGE.ROW:
        break;
      case WIL_MOVE_RANGE.COLUMN:
        break;
      case WIL_MOVE_RANGE.ALL:
        break;
    }

    return [];
  }
}