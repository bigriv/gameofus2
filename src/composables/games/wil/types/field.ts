import { WilCharacter } from "@/composables/games/wil/types/character";
import { WIL_CELL_COLOR } from "../enums/cell";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WilSkill } from "./skill";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_MOVE_RANGE } from "../enums/range";

export class WilFieldCell {
  readonly x: number;
  readonly y: number;
  color: WIL_CELL_COLOR = WIL_CELL_COLOR.WHITE;
  character?: WilCharacter;
  selected: boolean = false;

  constructor(x: number, y: number, character?: WilCharacter) {
    this.x = x;
    this.y = y;
    if (character) {
      this.character = character;
    }
  }
}

export class WilField {
  static readonly WIDTH = 3;
  static readonly HEIGHT = 5;
  static readonly MAX_CHARACTER = 5;
  playerCells: Array<WilFieldCell>;
  enemyCells: Array<WilFieldCell>;

  constructor() {
    this.playerCells = new Array(WilField.WIDTH * WilField.HEIGHT);
    this.enemyCells = new Array(WilField.WIDTH * WilField.HEIGHT);
    for (let i = 0; i < WilField.HEIGHT; i++) {
      for (let j = 0; j < WilField.WIDTH; j++) {
        this.playerCells[i * WilField.WIDTH + j] = new WilFieldCell(j, i);
        this.enemyCells[i * WilField.WIDTH + j] = new WilFieldCell(j, i);
      }
    }
  }

  getPlayerCell(x: number, y: number): WilFieldCell | undefined {
    if (this.playerCells.length <= y * WilField.WIDTH + x) {
      return undefined;
    }
    return this.playerCells[y * WilField.WIDTH + x];
  }
  getEnemyCell(x: number, y: number): WilFieldCell | undefined {
    if (this.enemyCells.length <= y * WilField.WIDTH + x) {
      return undefined;
    }
    return this.enemyCells[y * WilField.WIDTH + x];
  }

  getPlayerNum(): number {
    return this.playerCells.filter((cell) => cell.character).length;
  }
  getEnemyNum(): number {
    return this.enemyCells.filter((cell) => cell.character).length;
  }

  /**
   * プレイヤーキャラクターのリストを取得する
   * @returns プレイヤーキャラクターのリスト
   */
  getPlayerCharacters(): Array<WilCharacter> {
    return this.playerCells
      .filter((cell) => cell.character instanceof WilCharacter)
      .map((cell) => cell.character as WilCharacter)
      .sort((a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id));
  }

  /**
   * 敵キャラクターのリストを取得する
   * @returns 敵キャラクターのリスト
   */
  getEnemyCharacters(): Array<WilCharacter> {
    return this.enemyCells
      .filter((cell) => cell.character instanceof WilCharacter)
      .map((cell) => cell.character as WilCharacter)
      .sort((a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id));
  }

  /**
   * 指定したキャラクターの配置されているプレイヤーのマスを取得する
   * @param character キャラクター
   * @returns 指定したキャラクターの配置されているマス、取得できない場合はundefined
   */
  getPlayerCharacterCell(character: WilCharacter): WilFieldCell | undefined {
    return this.playerCells.find((cell) => cell.character?.id === character.id);
  }

  /**
   * 指定したキャラクターの配置されている相手のマスを取得する
   * @param character キャラクター
   * @returns 指定したキャラクターの配置されているマス、取得できない場合はundefined
   */
  getEnemyCharacterCell(character: WilCharacter): WilFieldCell | undefined {
    return this.enemyCells.find((cell) => cell.character?.id === character.id);
  }

  /**
   * キャラクターを配置する
   * @param x
   * @param y
   * @param character
   * @returns
   */
  setPlayerCharacter(x: number, y: number, character: WilCharacter): boolean {
    if (!this.isSetablePlayerCahracter(x, y)) {
      return false;
    }

    const cell = this.getPlayerCell(x, y);
    if (!cell) {
      return false;
    }
    cell.character = character;
    return true;
  }

  /**
   * キャラクターを配置できるかを判定する
   * @returns 配置可能ならtrue、それ以外はfalse
   */
  isSetablePlayerCahracter(x: number, y: number): boolean {
    // 配置可能判定（フィールド外または青以外なら配置不可）
    const cell = this.getPlayerCell(x, y);
    if (!cell || cell.color !== WIL_CELL_COLOR.BLUE) {
      return false;
    }

    return true;
  }

  setEnemyCharacters(deploy: Array<WilFieldCell>) {
    for (const d of deploy) {
      const cell = this.getEnemyCell(d.x, d.y);
      if (!cell) {
        continue;
      }
      cell.character = d.character;
    }
  }

  /**
   * フィールド上で最速で行動できるキャラクターを取得する
   * @param without 除外するキャラクター
   * @returns 最速行動可能キャラクター
   */
  getFastCharacter(...without: Array<WilCharacter>): WilCharacter | undefined {
    const withoutIdList = without.map((w) => w.id);
    const fastCharacter = (characters: Array<WilCharacter>) => {
      return [...characters]
        .filter((character) => !withoutIdList.includes(character.id))
        .sort((a, b) => {
          if (a.stack == b.stack) {
            if (a.status.speed == b.status.speed) {
              return Math.random() < 0.5 ? 1 : -1;
            }
            return a.status.speed - b.status.speed;
          }
          return b.stack - a.stack;
        })[0];
    };
    const playerFastCharacter = fastCharacter(this.getPlayerCharacters());
    const enemyFastCharacter = fastCharacter(this.getEnemyCharacters());

    if (!playerFastCharacter && !enemyFastCharacter) {
      return undefined;
    }
    if (!playerFastCharacter) {
      return enemyFastCharacter;
    }
    if (!enemyFastCharacter) {
      return playerFastCharacter;
    }

    if (playerFastCharacter.stack < enemyFastCharacter.stack) {
      return playerFastCharacter;
    }
    if (playerFastCharacter.stack > enemyFastCharacter.stack) {
      return enemyFastCharacter;
    }
    if (playerFastCharacter.status.speed < enemyFastCharacter.status.speed) {
      return enemyFastCharacter;
    }
    if (playerFastCharacter.status.speed > enemyFastCharacter.status.speed) {
      return playerFastCharacter;
    }

    return Math.random() < 0.5 ? playerFastCharacter : enemyFastCharacter;
  }

  /**
   * キャラクターをセルから排除する
   * @param x
   * @param y
   */
  removeCharacter(x: number, y: number) {
    const cell = this.getPlayerCell(x, y);
    if (!cell || !cell.character) {
      return;
    }
    cell.character = undefined;
  }

  migrateCharacter(character: WilCharacter, target: WilFieldCell) {
    const cell = this.getPlayerCharacterCell(character);
    if (!cell) {
      throw new WrongImplementationError("キャラクターの存在しないマスです。");
    }
    target.character = cell.character;
    cell.character = undefined;
  }

  changeColor(
    timming: WIL_BATTLE_TIMMING,
    __character?: WilCharacter,
    skill?: WilSkill,
    target?: WilCharacter
  ) {
    console.log("changeColor", timming);
    if (timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL) {
      this.playerCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.BLUE;
      });
      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.RED;
      });
      return;
    }

    if (timming === WIL_BATTLE_TIMMING.BATTLE_START) {
      this.playerCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
        if (cell.character) {
          cell.color = WIL_CELL_COLOR.BLUE;
        }
      });
      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
        if (cell.character) {
          cell.color = WIL_CELL_COLOR.RED;
        }
      });
      return;
    }

    if (
      timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET ||
      timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL
    ) {
      this.playerCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
      });
      this.enemyCells.forEach((cell) => {
        if (cell.character) {
          cell.color = WIL_CELL_COLOR.RED;
        } else {
          cell.color = WIL_CELL_COLOR.WHITE;
        }
      });

      if (!target) {
        return;
      }
      const targetCell = this.getEnemyCharacterCell(target);
      if (!targetCell || !targetCell.character) {
        return;
      }
      if (!skill) {
        return;
      }
      switch (skill.range) {
        case WIL_MOVE_RANGE.FIRST:
          targetCell.color = WIL_CELL_COLOR.RED;
          break;
        case WIL_MOVE_RANGE.SKIP:
          this.enemyCells.forEach((cell) => {
            if (cell.character) {
              cell.color = WIL_CELL_COLOR.RED;
            }
          });
          break;
        case WIL_MOVE_RANGE.AROUND:
          this.enemyCells.forEach((cell) => {
            if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
              return;
            }
            if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
              return;
            }
            cell.color = WIL_CELL_COLOR.RED;
          });
          break;
        case WIL_MOVE_RANGE.CROSS:
          this.enemyCells.forEach((cell) => {
            if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
              return;
            }
            if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
              return;
            }
            cell.color = WIL_CELL_COLOR.RED;
          });
          break;
        case WIL_MOVE_RANGE.ROW:
          this.enemyCells.forEach((cell) => {
            if (cell.x == targetCell.x) {
              cell.color = WIL_CELL_COLOR.RED;
            }
          });
          break;
        case WIL_MOVE_RANGE.COLUMN:
          this.enemyCells.forEach((cell) => {
            if (cell.y == targetCell.y) {
              cell.color = WIL_CELL_COLOR.RED;
            }
          });
          break;
        case WIL_MOVE_RANGE.ALL:
          this.enemyCells.forEach((cell) => {
            cell.color = WIL_CELL_COLOR.BLUE;
          });
          break;
      }
    }
  }

  resetSelected() {
    this.playerCells.forEach((cell) => (cell.selected = false));
    this.enemyCells.forEach((cell) => (cell.selected = false));
  }
}
