import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WilOperator } from "./operator";
import { WilField, WilFieldCell } from "./field";
import { WIL_BATTLE_TEAM } from "../enums/battle";

export class WilComputer extends WilOperator {
  constructor(teamName: string) {
    super(WIL_BATTLE_TEAM.COMPUTER, teamName);
  }

  /**
   * キャラクターを配置する
   * @param deploy 配置定義リスト
   */
  deployCharacters(deploy: Array<WilFieldCell>) {
    for (let cell of deploy) {
      if (!cell.character) {
        this.field.removeCharacter(cell.x, cell.y);
        continue;
      }
      this.field.setCharacter(cell.x, cell.y, cell.character);
    }
  }

  /**
   * 処理する行動を決定する
   * @param enemyField 相手チームのフィールド
   * @param skills スキル定義リスト
   */
  decideBattleMove(enemyField: WilField) {
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }

    // TODO: コンピュータの行動処理選択をもう少し賢くする
    // スキルをランダムに選択
    const skillRnd = Math.floor(
      Math.random() * this.moveCharacter.skills.length
    );
    this.selectSkill = this.moveCharacter.skills[skillRnd];

    // 対象にするキャラクターをランダムに選択
    const targetCandidates = enemyField.getCharacters();
    const characterRnd = Math.floor(Math.random() * targetCandidates.length);
    const target = targetCandidates[characterRnd];

    this.targetCell = enemyField.getCharacterCell(target);
  }
}
