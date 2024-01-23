import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import {
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "@/composables/games/wil/enums/skill";
import {
  WIL_BATTLE_TACTICS,
  WIL_BATTLE_TEAM,
} from "@/composables/games/wil/enums/battle";
import { WilOperator } from "@/composables/games/wil/types/operator";
import { WilField, WilFieldCell } from "@/composables/games/wil/types/field";
import { WilBattle } from "@/composables/games/wil/types/battle";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilConditionUtil } from "@/composables/games/wil/types/condition";

export class WilComputer extends WilOperator {
  private readonly tactics: WIL_BATTLE_TACTICS;
  constructor(teamName: string, tactics: WIL_BATTLE_TACTICS) {
    super(WIL_BATTLE_TEAM.COMPUTER, teamName);
    this.tactics = tactics;
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
   * 発動するスキルを決定する
   */
  private decideUseSkill(allyField: WilField, enemyField: WilField) {
    switch (this.tactics) {
      case WIL_BATTLE_TACTICS.RANDOM:
        this.selectSkill = this.decideUseSkill_randomTactics(allyField);
        break;
      case WIL_BATTLE_TACTICS.SUPPORT_PRIORITY:
        this.selectSkill =
          this.decideUseSkill_supportPriorityTactics(allyField);
        break;
      case WIL_BATTLE_TACTICS.CONTINUOUS_MOVE:
        this.selectSkill = this.decideUseSkill_continuousMoveTactics(
          allyField,
          enemyField
        );
        break;
    }
  }

  /**
   * AIレベル1のスキル選択
   * @returns 選択されたスキル
   */
  private decideUseSkill_randomTactics(allyField: WilField): WilSkill {
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }
    // 相手が対象となるスキルのみを候補とする
    let skillCandidates = this.moveCharacter.skills.filter(
      (skill) => skill.target === WIL_SKILL_TARGET.ENEMY
    );
    // 行動キャラクターが先頭にいない場合は近接物理を対象から外す
    const moveCharacterCell = allyField.getCharacterCell(this.moveCharacter);
    if (!moveCharacterCell) {
      throw new WrongImplementationError("Move character is not on field.");
    }
    if (!allyField.isFront(moveCharacterCell)) {
      skillCandidates = skillCandidates.filter(
        (skill) => skill.type !== WIL_SKILL_TYPE.CLOSE_PHISIC
      );
    }

    // スキルをランダムに選択
    const skillRnd = Math.floor(Math.random() * skillCandidates.length);
    return skillCandidates[skillRnd];
  }

  /**
   * AIレベル2のスキル選択
   * @param allyField 味方のフィールド
   * @returns 選択されたスキル
   */
  private decideUseSkill_supportPriorityTactics(allyField: WilField): WilSkill {
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }
    // 味方を対象にしたスキルを優先して選択する
    let skillCandidates = this.moveCharacter.skills.filter(
      (skill) => skill.target === WIL_SKILL_TARGET.ALLY
    );
    const allyCharacters = allyField.getCharacters();

    for (let skill of skillCandidates) {
      // 体力回復スキルなら体力が減っているキャラクターがいる場合に選定する
      if (WilSkill.isHealSkill(skill.id)) {
        if (
          !allyCharacters.find(
            (character) =>
              character.status.life < 0.7 * character.defaultStatus.life
          )
        ) {
          skillCandidates = skillCandidates.filter(
            (candidate) => candidate.id !== skill.id
          );
        }
        continue;
      }
      // 状態異常上書きスキルなら悪影響状態の場合に選定する
      if (WilSkill.isClearSkill(skill.id)) {
        if (
          !allyCharacters.find(
            (character) => !WilConditionUtil.isBadCondition(character.condition)
          )
        ) {
          skillCandidates = skillCandidates.filter(
            (candidate) => candidate.id !== skill.id
          );
        }
        continue;
      }
    }
    if (skillCandidates.length > 0) {
      // 味方を対象にしたスキルの中からランダムに選定
      const skillRnd = Math.floor(Math.random() * skillCandidates.length);
      return skillCandidates[skillRnd];
    }

    // 味方を対象にするスキルの中から選定されなかった場合は相手を対象にするスキルからランダムに選定する
    skillCandidates = this.moveCharacter.skills.filter(
      (skill) => skill.target === WIL_SKILL_TARGET.ENEMY
    );

    // 行動キャラクターが先頭にいない場合は近接物理を対象から外す
    const moveCharacterCell = allyField.getCharacterCell(this.moveCharacter);
    if (!moveCharacterCell) {
      throw new WrongImplementationError("Move character is not on field.");
    }
    if (!allyField.isFront(moveCharacterCell)) {
      skillCandidates = skillCandidates.filter(
        (skill) => skill.type !== WIL_SKILL_TYPE.CLOSE_PHISIC
      );
    }

    // スキルをランダムに選択
    const skillRnd = Math.floor(Math.random() * skillCandidates.length);
    return skillCandidates[skillRnd];
  }

  /**
   * 連続で行動できるようにスキルを選定する
   * @param allyField 味方フィールド
   * @param enemyField 相手フィールド
   * @returns 選定したスキル
   */
  private decideUseSkill_continuousMoveTactics(
    allyField: WilField,
    enemyField: WilField
  ) {
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }
    let skillCandidates = this.moveCharacter.skills;

    const allyCharacters = allyField.getCharacters();
    for (let skill of skillCandidates) {
      // 体力回復スキルで体力が減っているキャラクターがいない場合は候補から外す
      if (WilSkill.isHealSkill(skill.id)) {
        if (
          !allyCharacters.find(
            (character) =>
              character.status.life < 0.7 * character.defaultStatus.life
          )
        ) {
          skillCandidates = skillCandidates.filter(
            (candidate) => candidate.id !== skill.id
          );
        }
        continue;
      }
      // 状態異常上書きスキルなら悪影響状態の場合に選定する
      if (WilSkill.isClearSkill(skill.id)) {
        if (
          !allyCharacters.find(
            (character) => !WilConditionUtil.isBadCondition(character.condition)
          )
        ) {
          skillCandidates = skillCandidates.filter(
            (candidate) => candidate.id !== skill.id
          );
        }
        continue;
      }
    }

    // 行動キャラクターが先頭にいない場合は近接物理を対象から外す
    const moveCharacterCell = allyField.getCharacterCell(this.moveCharacter);
    if (!moveCharacterCell) {
      throw new WrongImplementationError("Move character is not on field.");
    }
    if (!allyField.isFront(moveCharacterCell)) {
      skillCandidates = skillCandidates.filter(
        (skill) => skill.type !== WIL_SKILL_TYPE.CLOSE_PHISIC
      );
    }

    // スキル候補をコストの少ない順に並び替え
    skillCandidates = skillCandidates.sort((a, b) => a.cost - b.cost);

    // 最小コストのスキルが次の行動キャラクターのスタック数より少なければそれを選定
    const nextMoveCharacter = enemyField
      .getCharacters()
      .sort((a, b) => a.stack - b.stack)[0];
    if (
      WilSkill.calcCost(
        this.moveCharacter.status.speed,
        this.moveCharacter.condition,
        skillCandidates[0]
      ) < nextMoveCharacter.stack
    ) {
      return skillCandidates[0];
    }

    // スキルをランダムに選択
    const skillRnd = Math.floor(Math.random() * skillCandidates.length);
    return skillCandidates[skillRnd];
  }

  /**
   * 行動対象を選択する
   * @param allyField 味方のフィールド
   * @param enemyField 相手のフィールド
   */
  private decideTarget(allyField: WilField, enemyField: WilField) {
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }
    if (!this.selectSkill) {
      throw new WrongImplementationError("Activate skill is not selected.");
    }

    // サポートスキルならサポートが必要なキャラクターを選定する
    if (this.selectSkill.target === WIL_SKILL_TARGET.ALLY) {
      for (let cell of allyField.cells) {
        if (!cell.character || cell.character.status.life <= 0) {
          continue;
        }
        // 体力回復スキルの場合
        if (WilSkill.isHealSkill(this.selectSkill.id)) {
          // 体力の3割が減っている場合は回復が必要とみなす
          if (
            cell.character.status.life <
            0.7 * cell.character.defaultStatus.life
          ) {
            return cell;
          }
        }
        // 状態異常回復スキルの場合
        if (WilSkill.isClearSkill(this.selectSkill.id)) {
          // 悪影響の状態異常になっている場合は回復が必要とみなす
          if (WilConditionUtil.isBadCondition(cell.character.condition)) {
            return cell;
          }
        }
      }
      // 回復系ではないスキルの場合
      const targetCandidates = allyField.cells.filter(
        (cell) => cell.selectable && cell.character
      );
      const cellRand = Math.floor(Math.random() * targetCandidates.length);
      const target = targetCandidates[cellRand];

      return target;
    } else if (this.selectSkill.target === WIL_SKILL_TARGET.SELF) {
      // 自身を対象にするスキルの場合
      return allyField.getCharacterCell(this.moveCharacter);
    }

    // 対象が相手のスキルの場合
    // 選択可能なキャラクターから対象をランダムに選択
    const targetCandidates = enemyField.cells.filter(
      (cell) => cell.selectable && cell.character
    );
    const cellRand = Math.floor(Math.random() * targetCandidates.length);
    const target = targetCandidates[cellRand];

    return target;
  }

  /**
   * 処理する行動を決定する
   * @param enemyField 相手チームのフィールド
   * @param skills スキル定義リスト
   */
  decideBattleMove(battle: WilBattle) {
    this.decideUseSkill(battle.computer.field, battle.player.field);
    battle.updateFieldSelectable();
    this.targetCell = this.decideTarget(
      battle.computer.field,
      battle.player.field
    );
  }
}
