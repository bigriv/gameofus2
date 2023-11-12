import { WilCharacter } from "@/composables/games/wil/types/character";
import { WIL_CELL_COLOR, WIL_CELL_TEAM } from "../enums/cell";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WilSkill } from "./skill";

export class WilFieldCell {
  color: WIL_CELL_COLOR = WIL_CELL_COLOR.WHITE;
  team: WIL_CELL_TEAM = WIL_CELL_TEAM.NEUTRAL;
  character: WilCharacter | null = null;
}

export class WilField {
  width: number;
  height: number;
  maxCharacter: number;
  playerCharacter: number = 0;
  enemyCharacter: number = 0;
  cells: WilFieldCell[];

  constructor(width: number, height: number, maxCharacter: number) {
    this.width = width;
    this.height = height;
    this.maxCharacter = maxCharacter;
    this.cells = new Array(width * height);
    for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
        this.cells[i * width + j] = new WilFieldCell();
      }
    }
  }

  getCell(x: number, y: number): WilFieldCell | null {
    if (this.cells.length <= y * this.width + x) {
      return null;
    }
    return this.cells[y * this.width + x];
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

    const cell = this.getCell(x, y);
    if (!cell) {
      return false;
    }
    if (!cell.character) {
      this.playerCharacter++;
    }
    cell.character = character;
    cell.team = WIL_CELL_TEAM.BLUE;
    return true;
  }
  /**
   * キャラクターを配置できるかを判定する
   * @returns 配置可能ならtrue、それ以外はfalse
   */
  isSetableCahracter(x: number, y: number): boolean {
    // 配置可能判定（フィールド外または青以外なら配置不可）
    const cell = this.getCell(x, y);
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
    const cell = this.getCell(x, y);
    if (!cell || !cell.character) {
      return;
    }
    this.playerCharacter--;
    cell.character = null;
    cell.team = WIL_CELL_TEAM.NEUTRAL;
  }

  changeColor(
    timming: WIL_BATTLE_TIMMING,
    __character?: WilCharacter,
    __skill?: WilSkill
  ) {
    if (timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL) {
      this.cells.forEach((cell, index) => {
        const x = index % this.width;
        if (x >= (this.width * 2) / 3) {
          cell.color = WIL_CELL_COLOR.BLUE;
        }
      });
      return;
    }

    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER) {
      this.cells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
        if (cell.character && cell.team == WIL_CELL_TEAM.BLUE) {
          cell.color = WIL_CELL_COLOR.BLUE;
        }
      });
      return;
    }
  }
}
