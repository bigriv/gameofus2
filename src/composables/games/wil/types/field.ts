import { WilCharacter } from "@/composables/games/wil/types/character";
import { WIL_CELL_COLOR } from "../enums/cell";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WilSkill } from "./skill";

export class WilFieldCell {
  readonly x: number;
  readonly y: number;
  color: WIL_CELL_COLOR = WIL_CELL_COLOR.WHITE;
  character: WilCharacter | null = null;
  selected: boolean = false;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
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
   * キャラクターを配置する
   * @param x
   * @param y
   * @param character
   * @returns
   */
  setCharacter(x: number, y: number, character: WilCharacter): boolean {
    if (!this.isSetableCahracter(x, y)) {
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
  isSetableCahracter(x: number, y: number): boolean {
    // 配置可能判定（フィールド外または青以外なら配置不可）
    const cell = this.getPlayerCell(x, y);
    if (!cell || cell.color !== WIL_CELL_COLOR.BLUE) {
      return false;
    }

    return true;
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
    cell.character = null;
  }

  changeColor(
    timming: WIL_BATTLE_TIMMING,
    __character?: WilCharacter,
    __skill?: WilSkill
  ) {
    if (timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL) {
      this.playerCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.BLUE;
      });
      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.RED;
      });
      return;
    }

    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER) {
      this.playerCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
        if (cell.character) {
          cell.color = WIL_CELL_COLOR.BLUE;
        }
      });
      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.RED;
      });
      return;
    }
  }
}
