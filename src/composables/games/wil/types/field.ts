import { WilCharacter } from "@/composables/games/wil/types/character";
import { WIL_CELL_COLOR } from "../enums/cell";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WilSkill } from "./skill";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_BATTLE_TEAM } from "../enums/battle";

/**
 * Wil用フィールドマスクラス
 */
export class WilFieldCell {
  readonly team: WIL_BATTLE_TEAM;
  readonly x: number;
  readonly y: number;
  color: WIL_CELL_COLOR = WIL_CELL_COLOR.WHITE;
  character?: WilCharacter;
  selected: boolean = false;

  constructor(
    team: WIL_BATTLE_TEAM,
    x: number,
    y: number,
    character?: WilCharacter
  ) {
    this.team = team;
    this.x = x;
    this.y = y;
    if (character) {
      this.character = character;
    }
  }
}

/**
 * Wil用フィールドクラス
 */
export class WilField {
  static readonly WIDTH = 3;
  static readonly HEIGHT = 5;
  static readonly MAX_CHARACTER = 5;
  cells: Array<WilFieldCell> = new Array(WilField.WIDTH * WilField.HEIGHT);

  constructor(team: WIL_BATTLE_TEAM) {
    this.cells = new Array(WilField.WIDTH * WilField.HEIGHT);
    for (let i = 0; i < WilField.HEIGHT; i++) {
      for (let j = 0; j < WilField.WIDTH; j++) {
        this.cells[i * WilField.WIDTH + j] = new WilFieldCell(team, j, i);
      }
    }
  }

  /**
   * フィールドの任意のマスを取得する
   * @param x 取得するフィールドのx座標
   * @param y 取得するフィールドのy座標
   * @returns 取得したマス
   * @throws 範囲外の座標を指定した場合は実装エラーとする
   */
  getCell(x: number, y: number): WilFieldCell {
    if (this.cells.length <= y * WilField.WIDTH + x) {
      throw new WrongImplementationError(
        `The cell (x, y)=(${x}, ${y}) is out of index.`
      );
    }
    return this.cells[y * WilField.WIDTH + x];
  }

  /**
   * 生存しているフィールド上のキャラクターの数を取得する
   * @returns 生存しているフィールド上のキャラクターの数
   */
  countCharacterNum(): number {
    return this.cells.filter(
      (cell) => cell.character && cell.character.status.life > 0
    ).length;
  }

  /**
   * フィールド上の生存キャラクターのリストを取得する
   * @returns 生存しているキャラクターのリスト
   */
  getCharacters(): Array<WilCharacter> {
    return this.cells
      .filter((cell) => cell.character && cell.character.status.life > 0)
      .map((cell) => cell.character as WilCharacter)
      .sort((a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id));
  }

  /**
   * 指定したキャラクターの配置されているマスを取得する
   * @param character キャラクター
   * @returns 指定したキャラクターの配置されているマス、取得できない場合はundefined
   */
  getCharacterCell(character: WilCharacter): WilFieldCell | undefined {
    return this.cells.find((cell) => cell.character?.id === character.id);
  }

  /**
   * キャラクターを配置する
   * @param x 配置するマスのx座標
   * @param y 配置するマスのy座標
   * @param character 配置するキャラクター
   */
  setCharacter(x: number, y: number, character: WilCharacter) {
    this.getCell(x, y).character = character;
  }

  /**
   * キャラクターをマスから排除する
   * @param x x座標
   * @param y y座標
   */
  removeCharacter(x: number, y: number) {
    this.getCell(x, y).character = undefined;
  }

  /**
   * キャラクターを移動する
   * @param character 移動するキャラクター
   * @param target 移動先のマス
   */
  migrateCharacter(character: WilCharacter, target: WilFieldCell) {
    const cell = this.getCharacterCell(character);
    if (!cell) {
      throw new WrongImplementationError(
        `The character id: ${character.id}, name: ${character.name} is is not exsist on field.`
      );
    }

    cell.character = undefined;
    target.character = character;
  }

  /**
   * フィールドのマスの色を変える
   * @param timming 戦闘タイミング
   * @param character 行動キャラクター
   * @param skill 発動予定スキル
   * @param target 発動スキルの対象キャラクター
   * @returns なし
   */
  changeColor(
    __turn: WIL_BATTLE_TEAM,
    __timming: WIL_BATTLE_TIMMING,
    __character?: WilCharacter,
    __skill?: WilSkill,
    __target?: WilFieldCell
  ) {
    console.log("changeColor");
    // // キャラクター配置時
    // // すべてのマスの色を変える
    // // 相手フィールド⇒赤、自分フィールド⇒青
    // if (timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL) {
    //   this.playerCells.forEach((cell) => {
    //     cell.color = WIL_CELL_COLOR.BLUE;
    //   });
    //   this.computerCells.forEach((cell) => {
    //     cell.color = WIL_CELL_COLOR.RED;
    //   });
    //   return;
    // }

    // // 戦闘開始時
    // // すべてのマスを白にする
    // if (timming === WIL_BATTLE_TIMMING.BATTLE_START) {
    //   this.playerCells.forEach((cell) => {
    //     cell.color = WIL_CELL_COLOR.WHITE;
    //   });
    //   this.computerCells.forEach((cell) => {
    //     cell.color = WIL_CELL_COLOR.WHITE;
    //   });
    //   return;
    // }

    // // 自分のターン開始時・キャラクター行動選択時
    // // 行動キャラクターのいるマスのみ色を黄にする
    // if (
    //   timming === WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START ||
    //   timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE
    // ) {
    //   this.playerCells.forEach((cell) => {
    //     if (!cell.character || !character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       return;
    //     }
    //     if (cell.character.id === character.id) {
    //       cell.color = WIL_CELL_COLOR.YELLOW;
    //     } else {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //     }
    //   });

    //   this.computerCells.forEach((cell) => {
    //     cell.color = WIL_CELL_COLOR.WHITE;
    //   });
    // }

    // // 相手のターン開始時
    // // 行動キャラクターのいるマスのみ色を黄にする
    // if (timming === WIL_BATTLE_TIMMING.BATTLE_COMPUTER_TURN_START) {
    //   this.playerCells.forEach((cell) => {
    //     cell.color = WIL_CELL_COLOR.WHITE;
    //   });

    //   this.computerCells.forEach((cell) => {
    //     if (!cell.character || !character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       return;
    //     }
    //     if (cell.character.id === character.id) {
    //       cell.color = WIL_CELL_COLOR.YELLOW;
    //     } else {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //     }
    //   });
    // }

    // // キャラクター移動先選択時
    // // 移動可能マスを青にする
    // if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
    //   this.playerCells.forEach((cell) => {
    //     if (cell.character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       if (character && cell.character.id === character.id) {
    //         cell.color = WIL_CELL_COLOR.YELLOW;
    //       }
    //     } else {
    //       cell.color = WIL_CELL_COLOR.BLUE;
    //     }
    //   });

    //   this.computerCells.forEach((cell) => {
    //     cell.color = WIL_CELL_COLOR.WHITE;
    //   });
    //   return;
    // }

    // // 発動スキル選択時
    // // スキルが選択されている場合は行動キャラクターを黄、対象にできるキャラクターのいるマスを青にする
    // // スキルが選択されていない場合は行動キャラクターのマスのみを黄にする
    // if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL) {
    //   this.playerCells.forEach((cell) => {
    //     // 行動キャラクターのいるマスを青にする
    //     if (!cell.character || !character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       return;
    //     }

    //     if (cell.character.id === character.id) {
    //       cell.color = WIL_CELL_COLOR.YELLOW;
    //     } else {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //     }
    //     if (!skill) {
    //       return;
    //     }

    //     // スキルが選択されている場合
    //     // TODO: サポートスキル・回復スキルの場合は自分フィールドの色を青にする
    //     // TODO: 対象可否判定を行う
    //   });

    //   this.computerCells.forEach((cell) => {
    //     // TODO: サポートスキル・回復スキルの場合は相手フィールドの色を白にする
    //     if (cell.character) {
    //       if (!skill) {
    //         cell.color = WIL_CELL_COLOR.RED;
    //       } else {
    //         // TODO: 対象可否判定を行う
    //         cell.color = WIL_CELL_COLOR.BLUE;
    //       }
    //     } else {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //     }
    //   });
    // }

    // //スキル発動対象選択時
    // // スキル発動対象キャラクターが選択されている場合はスキルの影響範囲を青にする
    // // スキル発動対象キャラクターが選択されていない場合は行動キャラクターを黄、対象にできるキャラクターのいるマスを青にする
    // if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    //   const targetCell = target
    //     ? this.getComputerCharacterCell(target)
    //     : undefined;

    //   this.playerCells.forEach((cell) => {
    //     if (!targetCell) {
    //       // スキル発動対象キャラクターが選択されていない場合
    //       if (!cell.character || !character) {
    //         cell.color = WIL_CELL_COLOR.WHITE;
    //         return;
    //       }
    //       if (cell.character.id === character.id) {
    //         cell.color = WIL_CELL_COLOR.YELLOW;
    //       }
    //       return;
    //     }

    //     // スキル発動対象キャラクターが選択されている場合
    //     // TODO: スキル発動対象キャラクターが選択されていない場合対象可否判定を行う
    //     // TODO: スキル発動対象キャラクターが選択されている場合はサポートスキル・回復スキルの場合は自分フィールドの色を青にする
    //   });

    //   this.computerCells.forEach((cell) => {
    //     if (!targetCell) {
    //       // スキル発動対象キャラクターが選択されていない場合
    //       if (cell.character) {
    //         if (!skill) {
    //           cell.color = WIL_CELL_COLOR.RED;
    //         } else {
    //           // TODO: 対象可否判定を行う
    //           cell.color = WIL_CELL_COLOR.BLUE;
    //         }
    //       } else {
    //         cell.color = WIL_CELL_COLOR.WHITE;
    //       }
    //       return;
    //     }

    //     // スキル発動対象キャラクターが選択されている場合
    //     // TODO: サポートスキル・回復スキルの場合は相手フィールドの色を白にする

    //     if (!skill) {
    //       throw new WrongImplementationError(
    //         "'changeColor' must need skill argument."
    //       );
    //     }

    //     // スキル範囲によってマスの色を変える
    //     switch (skill.range) {
    //       case WIL_SKILL_RANGE.FRONT:
    //         targetCell.color = WIL_CELL_COLOR.BLUE;
    //         break;
    //       case WIL_SKILL_RANGE.SKIP:
    //         this.computerCells.forEach((cell) => {
    //           if (cell.character) {
    //             cell.color = WIL_CELL_COLOR.BLUE;
    //           }
    //         });
    //         break;
    //       case WIL_SKILL_RANGE.AROUND:
    //         this.computerCells.forEach((cell) => {
    //           if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
    //             return;
    //           }
    //           if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
    //             return;
    //           }
    //           cell.color = WIL_CELL_COLOR.BLUE;
    //         });
    //         break;
    //       case WIL_SKILL_RANGE.CROSS:
    //         this.computerCells.forEach((cell) => {
    //           if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
    //             return;
    //           }
    //           if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
    //             return;
    //           }
    //           cell.color = WIL_CELL_COLOR.BLUE;
    //         });
    //         break;
    //       case WIL_SKILL_RANGE.ROW:
    //         this.computerCells.forEach((cell) => {
    //           if (cell.x == targetCell.x) {
    //             cell.color = WIL_CELL_COLOR.BLUE;
    //           }
    //         });
    //         break;
    //       case WIL_SKILL_RANGE.COLUMN:
    //         this.computerCells.forEach((cell) => {
    //           if (cell.y == targetCell.y) {
    //             cell.color = WIL_CELL_COLOR.BLUE;
    //           }
    //         });
    //         break;
    //       case WIL_SKILL_RANGE.ALL:
    //         this.computerCells.forEach((cell) => {
    //           cell.color = WIL_CELL_COLOR.BLUE;
    //         });
    //         break;
    //     }
    //     return;
    //   });
    // }

    // // プレイヤーターンの処理時
    // // 行動キャラクターと自分対象キャラクターを黄、相手対象キャラクターを赤にする
    // if (timming === WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER) {
    //   this.playerCells.forEach((cell) => {
    //     if (!cell.character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       return;
    //     }
    //     if (target?.id === cell.character.id) {
    //       cell.color = WIL_CELL_COLOR.YELLOW;
    //       return;
    //     }
    //     if (character?.id === cell.character.id) {
    //       cell.color = WIL_CELL_COLOR.YELLOW;
    //       return;
    //     }
    //   });
    //   this.computerCells.forEach((cell) => {
    //     if (!cell.character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       return;
    //     }
    //     if (target?.id === cell.character.id) {
    //       cell.color = WIL_CELL_COLOR.RED;
    //       return;
    //     }
    //   });
    // }
    // // コンピュータターンの処理時
    // // 行動キャラクターと相手対象キャラクターを赤、自分対象キャラクターを黄にする
    // if (timming === WIL_BATTLE_TIMMING.BATTLE_PROCESS_COMPUTER_CHARACTER) {
    //   this.playerCells.forEach((cell) => {
    //     if (!cell.character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       return;
    //     }
    //     if (target?.id === cell.character.id) {
    //       cell.color = WIL_CELL_COLOR.YELLOW;
    //       return;
    //     }
    //   });

    //   this.computerCells.forEach((cell) => {
    //     if (!cell.character) {
    //       cell.color = WIL_CELL_COLOR.WHITE;
    //       return;
    //     }
    //     if (target?.id === cell.character.id) {
    //       cell.color = WIL_CELL_COLOR.RED;
    //       return;
    //     }
    //     if (character?.id === cell.character.id) {
    //       cell.color = WIL_CELL_COLOR.RED;
    //       return;
    //     }
    //   });
    // }
  }

  /**
   * すべてのマスの選択状態を解除する
   */
  resetSelected() {
    this.cells.forEach((cell) => (cell.selected = false));
  }
}
