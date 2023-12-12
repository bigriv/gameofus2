import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WilOperator } from "./operator";
import { WilField } from "./field";
import { WilSkill } from "./skill";

export class WilComputer extends WilOperator {
  decideBattleMove(field: WilField, skills: { [key: string]: WilSkill }) {
    console.log("proceed computer turn");
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }

    // TODO: コンピュータの行動処理選択をもう少し賢くする
    // スキルをランダムに選択
    const skillRnd = Math.ceil(
      Math.random() * this.moveCharacter.skills.length
    );
    const skillId = this.moveCharacter.skills[skillRnd];
    this.selectSkill = skills[skillId];

    // 対象にするキャラクターをランダムに選択
    const targetCandidates = field.getPlayerCharacters();
    const characterRnd = Math.ceil(Math.random() * targetCandidates.length);
    const target = targetCandidates[characterRnd];
    this.targetCell = field.getComputerCharacterCell(target);
  }
}
