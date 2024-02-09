import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import {
  WIL_SKILL_ID,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "@/composables/games/wil/enums/skill";
import {
  WIL_BATTLE_TACTICS,
  WIL_BATTLE_TEAM,
} from "@/composables/games/wil/enums/battle";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WilOperator } from "@/composables/games/wil/types/operator";
import { WilField, WilFieldCell } from "@/composables/games/wil/types/field";
import { WilBattle } from "@/composables/games/wil/types/battle";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilConditionUtil } from "@/composables/games/wil/types/condition";
import { WilCharacter } from "@/composables/games/wil/types/character";

export class WilComputer extends WilOperator {
  private readonly tactics: WIL_BATTLE_TACTICS;
  private readonly skillDefines: { [key: string]: WilSkill };
  constructor(
    teamName: string,
    tactics: WIL_BATTLE_TACTICS,
    skills: { [key: string]: WilSkill }
  ) {
    super(WIL_BATTLE_TEAM.COMPUTER, teamName);
    this.tactics = tactics;
    this.skillDefines = skills;
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
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }

    const skillCandidates = this.moveCharacter
      .getSkillIdList()
      .map((skillId) => this.skillDefines[skillId]);

    switch (this.tactics) {
      case WIL_BATTLE_TACTICS.RANDOM:
        this.selectSkill = WilAIUtil.randomTactics(
          this.moveCharacter,
          allyField,
          skillCandidates
        );
        break;
      case WIL_BATTLE_TACTICS.SUPPORT_PRIORITY:
        this.selectSkill = WilAIUtil.supportPriorityTactics(
          this.moveCharacter,
          allyField,
          skillCandidates
        );
        break;
      case WIL_BATTLE_TACTICS.CONTINUOUS_MOVE:
        this.selectSkill = WilAIUtil.continuousMoveTactics(
          this.moveCharacter,
          allyField,
          enemyField,
          skillCandidates
        );
        break;
      case WIL_BATTLE_TACTICS.SUMMON_PRIORITY:
        this.selectSkill = WilAIUtil.summonPriorityTactics(
          this.moveCharacter,
          allyField,
          enemyField,
          skillCandidates
        );
        break;
    }
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

/**
 * Wil用のCPU行動決定関数の管理クラス
 */
class WilAIUtil {
  /**
   * 発動するスキルの無作為選出
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param skillDefines スキル定義リスト
   * @returns 選出したスキル
   */
  static randomTactics(
    moveCharacter: WilCharacter,
    allyField: WilField,
    candidates: Array<WilSkill>
  ): WilSkill {
    // 相手が対象となるスキルのみを候補とする
    let skillCandidates = candidates.filter(
      (skill) => skill.target === WIL_SKILL_TARGET.ENEMY
    );
    // 行動キャラクターが先頭にいない場合は近接物理を対象から外す
    skillCandidates = this.candidatesRemoveClosePhisic(
      moveCharacter,
      allyField,
      skillCandidates
    );

    // スキルをランダムに選択
    return this.selectRandom(skillCandidates);
  }

  /**
   * 味方を対象とするもの優先してスキルを選出する
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param skillDefines スキル定義リスト
   * @returns 選出したスキル
   */
  static supportPriorityTactics(
    moveCharacter: WilCharacter,
    allyField: WilField,
    candidates: Array<WilSkill>
  ) {
    // 味方を対象にしたスキルを優先して選択する
    let skillCandidates = candidates.filter(
      (skill) => skill.target === WIL_SKILL_TARGET.ALLY || WIL_SKILL_TARGET.SELF
    );
    const allyCharacters = allyField.getCharacters();

    for (let skill of skillCandidates) {
      // 召喚スキルは無条件で除外する
      if (WilSkill.isSummonSkill(skill.id)) {
        skillCandidates = skillCandidates.filter(
          (candidate) => candidate.id !== skill.id
        );
        continue;
      }
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
      return this.selectRandom(skillCandidates);
    }

    return this.randomTactics(
      moveCharacter,
      allyField,
      candidates.filter((skill) => skill.target === WIL_SKILL_TARGET.ENEMY)
    );
  }

  /**
   * 連続で行動できるようにスキルを選出する
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param enemyField 敵フィールド
   * @param skillDefines スキル定義リスト
   * @returns 選出したスキル
   */
  static continuousMoveTactics(
    moveCharacter: WilCharacter,
    allyField: WilField,
    enemyField: WilField,
    candidates: Array<WilSkill>
  ) {
    let newCandidates = candidates;
    const allyCharacters = allyField.getCharacters();
    for (let skill of candidates) {
      // 体力回復スキルで体力が減っているキャラクターがいない場合は候補から外す
      if (WilSkill.isHealSkill(skill.id)) {
        if (
          !allyCharacters.find(
            (character) =>
              character.status.life < 0.7 * character.defaultStatus.life
          )
        ) {
          newCandidates = newCandidates.filter(
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
          newCandidates = newCandidates.filter(
            (candidate) => candidate.id !== skill.id
          );
        }
        continue;
      }
    }

    // 行動キャラクターが先頭にいない場合は近接物理を対象から外す
    newCandidates = this.candidatesRemoveClosePhisic(
      moveCharacter,
      allyField,
      newCandidates
    );

    // スキル候補をコストの少ない順に並び替え
    newCandidates = newCandidates.sort((a, b) => a.cost - b.cost);

    // 最小コストのスキルが次の行動キャラクターのスタック数より少なければそれを選定
    const nextMoveCharacter = enemyField
      .getCharacters()
      .sort((a, b) => a.stack - b.stack)[0];
    if (
      WilSkill.calcCost(
        moveCharacter.status.speed,
        moveCharacter.condition,
        newCandidates[0]
      ) < nextMoveCharacter.stack
    ) {
      return newCandidates[0];
    }

    // スキルをランダムに選択
    return this.selectRandom(newCandidates);
  }

  /**
   * 召喚スキルを優先して選出する
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param skillDefines スキル候補リスト
   * @returns 選出したスキル
   */
  static summonPriorityTactics(
    moveCharacter: WilCharacter,
    allyField: WilField,
    enemyField: WilField,
    candidates: Array<WilSkill>
  ): WilSkill {
    // 魔人の召喚可否を判定する関数
    const isSummonableDemon = (id: WIL_CHARACTER_ID, x: number, y: number) => {
      const targetCell = allyField.getCell(x, y);
      if (targetCell.character) {
        return false;
      }
      return !allyField.isExistCharacterModel(id);
    };

    // 候補の中に召喚する気が存在すれば発動できるかを判定する
    for (const skill of candidates) {
      if (skill.id === WIL_SKILL_ID.PRODUCE) {
        // スキル『製造』の場合は発動者の前方が空きマスの場合に発動する
        const activestCell = allyField.getCharacterCell(moveCharacter);
        if (!activestCell || activestCell.x <= 0) {
          continue;
        }
        const targetCell = allyField.getCell(
          activestCell.x - 1,
          activestCell.y
        );
        if (targetCell.character) {
          continue;
        }
        return skill;
      } else if (skill.id === WIL_SKILL_ID.SUMMON_FIRE_DEMON) {
        if (isSummonableDemon(WIL_CHARACTER_ID.DARK_MONSTER_FIRE_DEMON, 0, 0)) {
          return skill;
        }
      } else if (skill.id === WIL_SKILL_ID.SUMMON_ICE_DEMON) {
        if (isSummonableDemon(WIL_CHARACTER_ID.DARK_MONSTER_ICE_DEMON, 0, 1)) {
          return skill;
        }
      } else if (skill.id === WIL_SKILL_ID.SUMMON_WIND_DEMON) {
        if (isSummonableDemon(WIL_CHARACTER_ID.DARK_MONSTER_WIND_DEMON, 0, 3)) {
          return skill;
        }
      } else if (skill.id === WIL_SKILL_ID.SUMMON_SOIL_DEMON) {
        if (isSummonableDemon(WIL_CHARACTER_ID.DARK_MONSTER_SOIL_DEMON, 0, 4)) {
          return skill;
        }
      }
    }

    // 召喚スキルが選択されなかった場合は連続行動できるようにスキルを選出する
    return this.continuousMoveTactics(
      moveCharacter,
      allyField,
      enemyField,
      candidates
    );
  }

  /**
   * スキル候補の中から一つを無作為に選出する
   * @param candidates 候補のリスト
   * @returns 選出したスキル
   */
  private static selectRandom(candidates: Array<WilSkill>): WilSkill {
    const skillRnd = Math.floor(Math.random() * candidates.length);
    return candidates[skillRnd];
  }

  /**
   * 行動キャラクターが先頭にいない場合にスキル候補から近接物理を除外する
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param skillCandidates スキル候補リスト
   * @returns 行動キャラクターが先頭にいる場合はスキル候補から近接物理を除外した新しい候補リスト、それ以外は元々と同じリスト
   */
  private static candidatesRemoveClosePhisic(
    moveCharacter: WilCharacter,
    allyField: WilField,
    skillCandidates: Array<WilSkill>
  ) {
    const moveCharacterCell = allyField.getCharacterCell(moveCharacter);
    if (!moveCharacterCell) {
      return skillCandidates;
    }
    if (!allyField.isFront(moveCharacterCell)) {
      return skillCandidates.filter(
        (skill) => skill.type !== WIL_SKILL_TYPE.CLOSE_PHISIC
      );
    }
    return skillCandidates;
  }
}
