import { WilCharacter } from "@/composables/games/wil/types/character";
import { WIL_CELL_COLOR } from "../enums/cell";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_BATTLE_TEAM } from "../enums/battle";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

/**
 * Wil用フィールドマスクラス
 */
export class WilFieldCell {
  readonly team: WIL_BATTLE_TEAM;
  readonly x: number;
  readonly y: number;
  color: WIL_CELL_COLOR = WIL_CELL_COLOR.WHITE;
  selectable: boolean = false;
  character?: WilCharacter;
  animation?: GOUVisual;

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
  readonly team: WIL_BATTLE_TEAM;
  cells: Array<WilFieldCell> = new Array(WilField.WIDTH * WilField.HEIGHT);

  constructor(team: WIL_BATTLE_TEAM) {
    this.team = team;
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
   * すべてのマスを選択不可状態にする
   */
  resetSelectable() {
    this.cells.forEach((cell) => (cell.selectable = false));
  }

  /**
   * 対象のマスのキャラクターが最前列に位置するかを判定する
   * @param target 判定対象のマスまたは判定対象のキャラクター
   * @returns 最前列ならtrue、そうでなければfalse
   */
  isFront(target: WilFieldCell | WilCharacter): boolean {
    let cell = undefined;
    if (target instanceof WilFieldCell) {
      cell = target;
    } else if (target instanceof WilCharacter) {
      cell = this.getCharacterCell(target);
    }
    if (!cell) {
      return false;
    }

    for (let i = cell.x - 1; i >= 0; i--) {
      if (this.getCell(i, cell.y).character) {
        return false;
      }
    }
    return true;
  }
}
