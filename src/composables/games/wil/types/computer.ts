import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WilOperator } from "./operator";
import { WilField } from "./field";
import { WilSkill } from "./skill";

export class WilComputer extends WilOperator {
  decideBattleMove(field: WilField, skills: { [key: string]: WilSkill }) {
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }

    // TODO: コンピュータの行動処理選択をもう少し賢くする
    // スキルをランダムに選択
    const skillRnd = Math.floor(
      Math.random() * this.moveCharacter.skills.length
    );
    const skillId = this.moveCharacter.skills[skillRnd];
    this.selectSkill = skills[skillId];

    // 対象にするキャラクターをランダムに選択
    const targetCandidates = field.getPlayerCharacters();
    const characterRnd = Math.floor(Math.random() * targetCandidates.length);
    const target = targetCandidates[characterRnd];

    this.targetCell = field.getPlayerCharacterCell(target);
  }
}
