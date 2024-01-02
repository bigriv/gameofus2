import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_BATTLE_TEAM } from "../enums/battle";
import { WilCharacter } from "./character";
import { WilField } from "./field";
import { WilOperator } from "./operator";
import { WIL_CHARACTER_ID } from "../enums/character";

/**
 * Wil用のプレイヤークラス
 */
export class WilPlayer extends WilOperator {
  allCharacters: Array<WilCharacter> = [];
  deployableCharacters: Array<WilCharacter> = [];

  constructor() {
    super(WIL_BATTLE_TEAM.PLAYER, "");
  }

  /**
   * フィールドを初期化する
   */
  resetField() {
    this.field = new WilField(this.team);
  }

  /**
   * キャラクターをマスに配置し、配置可能リストを更新する
   * @param x 配置するマスのx座標
   * @param y 配置するマスのy座標
   */
  deployCharacter() {
    const character = this.moveCharacter;
    if (!character) {
      throw new WrongImplementationError("The deploy character is empty.");
    }

    const targetCell = this.targetCell;
    if (!targetCell) {
      throw new WrongImplementationError("The deploy cell is empty.");
    }

    // 配置するキャラクターが配置可能リストにいることを確認
    if (!this.deployableCharacters.includes(character)) {
      throw new WrongImplementationError(
        `Can't depoly the character '${character.id}'.`
      );
    }

    // const targetCell = this.field.getCell(x, y);
    // 対象マスにキャラクターが配置済みのキャラクターが存在する場合、配置可能リストにそのキャラクターを追加する
    if (targetCell.character) {
      this.deployableCharacters.push(targetCell.character);
      this.deployableCharacters.sort((a: WilCharacter, b: WilCharacter) =>
        a.id.localeCompare(b.id)
      );
    }

    this.field.setCharacter(targetCell.x, targetCell.y, character);

    // 配置可能リストから配置するキャラクターを排除
    this.deployableCharacters = this.deployableCharacters.filter(
      (c) => c.id !== character.id
    );

    // 行動選択をリセット
    this.resetMove();
  }

  /**
   * 配置済みのキャラクターを外す
   * @param x 対象マスのx座標
   * @param y 対象マスのy座標
   */
  removeDeployedCharacter() {
    const targetCell = this.targetCell;
    if (!targetCell) {
      throw new WrongImplementationError("The deploy cell is empty.");
    }

    if (!targetCell.character) {
      return;
    }
    // 配置可能リストに外したキャラクターを追加する
    this.deployableCharacters.push(targetCell.character);
    this.deployableCharacters.sort((a: WilCharacter, b: WilCharacter) =>
      a.id.localeCompare(b.id)
    );
    this.field.removeCharacter(targetCell.x, targetCell.y);

    // 行動選択をリセット
    this.resetMove();
  }

  /**
   * キャラクターの離脱処理を行う
   * @param id 離脱するキャラクターのID
   * @returns 離脱したキャラクター
   */
  removeCharacter(id: WIL_CHARACTER_ID): WilCharacter | undefined {
    const regexp = new RegExp(`^${id}_\\d+$`, "i");
    const character = this.allCharacters.find((character) => {
      console.log(character.id, regexp.test(character.id));
      return regexp.test(character.id);
    });

    this.allCharacters = this.allCharacters.filter(
      (character) => !regexp.test(character.id)
    );

    return character;
  }
}
