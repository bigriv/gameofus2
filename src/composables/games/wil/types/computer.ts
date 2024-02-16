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
  private decideUseSkill(allyField: WilField, enemyField: WilField): WilSkill {
    if (!this.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }

    const skillCandidateList = this.moveCharacter
      .getSkillIdList()
      .map((skillId) => this.skillDefines[skillId]);

    switch (this.tactics) {
      case WIL_BATTLE_TACTICS.RANDOM:
        return WilAIUtil.randomTactics(
          this.moveCharacter,
          allyField,
          skillCandidateList
        );
      case WIL_BATTLE_TACTICS.SUPPORT_PRIORITY:
        return WilAIUtil.supportPriorityTactics(
          this.moveCharacter,
          allyField,
          skillCandidateList
        );
      case WIL_BATTLE_TACTICS.CONTINUOUS_MOVE:
        return WilAIUtil.continuousMoveTactics(
          this.moveCharacter,
          allyField,
          enemyField,
          skillCandidateList
        );
      case WIL_BATTLE_TACTICS.SUMMON_PRIORITY:
        return WilAIUtil.summonPriorityTactics(
          this.moveCharacter,
          allyField,
          enemyField,
          skillCandidateList
        );
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
        if (!cell.character || !cell.character.isAlive()) {
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
      const targetCandidateList = allyField.cells.filter(
        (cell) => cell.selectable && cell.character
      );
      const cellRand = Math.floor(Math.random() * targetCandidateList.length);
      const target = targetCandidateList[cellRand];

      return target;
    } else if (this.selectSkill.target === WIL_SKILL_TARGET.SELF) {
      // 自身を対象にするスキルの場合
      return allyField.getCharacterCell(this.moveCharacter);
    }

    // 対象が相手のスキルの場合
    // 選択可能なキャラクターから対象をランダムに選択
    const targetCandidateList = enemyField.cells.filter(
      (cell) => cell.selectable && cell.isExsistCharacter()
    );
    console.log("target candidate list", targetCandidateList);
    const cellRand = Math.floor(Math.random() * targetCandidateList.length);
    const target = targetCandidateList[cellRand];

    return target;
  }

  /**
   * 処理する行動を決定する
   * @param enemyField 相手チームのフィールド
   * @param skills スキル定義リスト
   */
  decideBattleMove(battle: WilBattle) {
    this.selectSkill = this.decideUseSkill(
      battle.computer.field,
      battle.player.field
    );
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
   * @param candidateList スキル候補リスト
   * @returns 選出したスキル
   */
  static randomTactics(
    moveCharacter: WilCharacter,
    allyField: WilField,
    candidateList: Array<WilSkill>
  ): WilSkill {
    // 相手が対象となるスキルのみを候補とする
    let skillCandidateList = candidateList.filter(
      (skill) => skill.target === WIL_SKILL_TARGET.ENEMY
    );
    // 行動キャラクターが先頭にいない場合は近接物理を対象から外す
    skillCandidateList = this.getSkillCandidateListFilterClosePhisic(
      moveCharacter,
      allyField,
      skillCandidateList
    );

    // スキルをランダムに選択
    return this.selectRandom(skillCandidateList);
  }

  /**
   * 味方を対象とするもの優先してスキルを選出する
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param candidateList スキル候補リスト
   * @returns 選出したスキル
   */
  static supportPriorityTactics(
    moveCharacter: WilCharacter,
    allyField: WilField,
    candidateList: Array<WilSkill>
  ) {
    // 味方を対象にしたスキルを優先して選択する
    const allyCharacters = allyField.getCharacters();
    let skillCandidateList = this.getSkillCandidateListFilterTarget(
      candidateList,
      WIL_SKILL_TARGET.ALLY
    );
    // 味方を対象にするスキルからサポート系のスキルで絞り込み
    skillCandidateList = this.getSkillCandidateFilterSupportSkill(
      skillCandidateList,
      allyCharacters
    );
    if (skillCandidateList.length > 0) {
      // 味方を対象にしたスキルの中からランダムに選定する
      return this.selectRandom(skillCandidateList);
    }

    // 自身を対象にするスキルを次点で優先して選択する
    skillCandidateList = this.getSkillCandidateListFilterTarget(
      candidateList,
      WIL_SKILL_TARGET.SELF
    );
    // 自身を対象にするスキルからサポート系のスキルで絞り込み
    skillCandidateList = this.getSkillCandidateFilterSupportSkill(
      skillCandidateList,
      [moveCharacter]
    );
    if (skillCandidateList.length > 0) {
      // 自身を対象にしたスキルの中からランダムに選定する
      return this.selectRandom(skillCandidateList);
    }

    // 味方および自身を対象にするスキルから選定されなかった場合は敵を対象とするスキルから無作為に選定する
    return this.randomTactics(
      moveCharacter,
      allyField,
      this.getSkillCandidateListFilterTarget(
        candidateList,
        WIL_SKILL_TARGET.ENEMY
      )
    );
  }

  /**
   * 連続で行動できるようにスキルを選出する
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param enemyField 敵フィールド
   * @param candidateList スキル候補リスト
   * @returns 選出したスキル
   */
  static continuousMoveTactics(
    moveCharacter: WilCharacter,
    allyField: WilField,
    enemyField: WilField,
    candidateList: Array<WilSkill>
  ) {
    const allyCharacters = allyField.getCharacters();
    // 味方を対象にするスキルを取得
    let allyTargetSkills = this.getSkillCandidateListFilterTarget(
      candidateList,
      WIL_SKILL_TARGET.ALLY
    );
    // 味方を対象にするスキルから発動条件を満たすサポート系のスキルで絞り込み
    allyTargetSkills = this.getSkillCandidateFilterSupportSkill(
      allyTargetSkills,
      allyCharacters
    );

    // 自身を対象にするスキルを取得
    let selfTargetSkills = this.getSkillCandidateListFilterTarget(
      candidateList,
      WIL_SKILL_TARGET.SELF
    );
    // 自身を対象にするスキルから発動条件を満たすサポート系のスキルで絞り込み
    selfTargetSkills = this.getSkillCandidateFilterSupportSkill(
      selfTargetSkills,
      [moveCharacter]
    );

    // 敵を対象とするスキルを取得
    let enemyTargetSkills = this.getSkillCandidateListFilterTarget(
      candidateList,
      WIL_SKILL_TARGET.ENEMY
    );
    // 行動キャラクターが先頭にいない場合は近接物理を対象から外す
    enemyTargetSkills = this.getSkillCandidateListFilterClosePhisic(
      moveCharacter,
      allyField,
      enemyTargetSkills
    );

    // スキル候補を結合し、コストの少ない順に並び替え
    const newCandidateList = [
      ...allyTargetSkills,
      ...selfTargetSkills,
      ...enemyTargetSkills,
    ].sort((a, b) => a.cost - b.cost);

    // 最小コストのスキルが次の行動キャラクターのスタック数より少なければそれを選定
    const nextMoveCharacter = enemyField
      .getCharacters()
      .sort((a, b) => a.stack - b.stack)[0];
    if (
      WilSkill.calcCost(
        moveCharacter.status.speed,
        moveCharacter.condition,
        newCandidateList[0]
      ) < nextMoveCharacter.stack
    ) {
      return newCandidateList[0];
    }

    // スキルをランダムに選択
    return this.selectRandom(newCandidateList);
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
    candidateList: Array<WilSkill>
  ): WilSkill {
    // 魔人の召喚可否を判定する関数を定義
    const isSummonableDemon = (id: WIL_CHARACTER_ID, x: number, y: number) => {
      const targetCell = allyField.getCell(x, y);
      if (targetCell.character) {
        return false;
      }
      return !allyField.isExistCharacterModel(id);
    };

    // 候補の中に召喚スキルが存在すれば発動できるかを判定する
    for (const skill of candidateList) {
      if (!WilSkill.isSummonSkill(skill.id)) {
        continue;
      }

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
      candidateList
    );
  }

  /**
   * スキル候補の中から一つを無作為に選出する
   * @param candidateList 候補のリスト
   * @returns 選出したスキル
   */
  private static selectRandom(candidateList: Array<WilSkill>): WilSkill {
    const skillRnd = Math.floor(Math.random() * candidateList.length);
    return candidateList[skillRnd];
  }

  /**
   * 行動キャラクターが先頭にいない場合にスキル候補から近接物理を除外する
   * @param moveCharacter 行動キャラクター
   * @param allyField 味方フィールド
   * @param skillCandidateList スキル候補リスト
   * @returns 行動キャラクターが先頭にいる場合はスキル候補から近接物理を除外した新しい候補リスト、それ以外は元々と同じリスト
   */
  private static getSkillCandidateListFilterClosePhisic(
    moveCharacter: WilCharacter,
    allyField: WilField,
    skillCandidateList: Array<WilSkill>
  ) {
    const moveCharacterCell = allyField.getCharacterCell(moveCharacter);
    if (!moveCharacterCell) {
      return skillCandidateList;
    }
    if (!allyField.isFront(moveCharacterCell)) {
      return skillCandidateList.filter(
        (skill) => skill.type !== WIL_SKILL_TYPE.CLOSE_PHISIC
      );
    }
    return skillCandidateList;
  }

  /**
   * スキル対象によって絞り込んだスキル候補リストを取得する
   * @param candidateList 元となるスキル候補リスト
   * @param target 絞り込みを行うスキル対象
   * @returns 絞り込み後のスキルリスト
   */
  private static getSkillCandidateListFilterTarget(
    candidateList: Array<WilSkill>,
    target: WIL_SKILL_TARGET
  ): Array<WilSkill> {
    return candidateList.filter((skill) => skill.target === target);
  }

  /**
   * サポートスキルで絞り込んだスキル候補リストを取得する
   * @param skillCandidateList 元となるスキル候補リスト
   * @param targetCandidateList 対象となるキャラクターの候補リスト
   * @returns サポートスキルで絞り込んだスキル候補リスト
   */
  private static getSkillCandidateFilterSupportSkill(
    skillCandidateList: Array<WilSkill>,
    targetCandidateList: Array<WilCharacter>
  ) {
    // 味方を対象にしたスキルを優先して選択する
    return skillCandidateList.filter((skill) => {
      if (WilSkill.isSummonSkill(skill.id)) {
        // 召喚スキルは無条件で除外する
        return false;
      }

      if (WilSkill.isHealSkill(skill.id)) {
        // 体力回復スキルなら体力が一定以上が減っているキャラクターが存在する場合に候補とする
        console.log(
          "heal skill",
          targetCandidateList.find(
            (character) =>
              character.status.life < 0.7 * character.defaultStatus.life
          )
        );
        return targetCandidateList.find(
          (character) =>
            character.status.life < 0.7 * character.defaultStatus.life
        );
      }
      if (WilSkill.isClearSkill(skill.id)) {
        console.log(
          "clear skill",
          targetCandidateList.find((character) =>
            WilConditionUtil.isBadCondition(character.condition)
          )
        );
        // 状態異常回復スキルなら悪影響の状態異常のキャラクターが存在する場合に候補とする
        return targetCandidateList.find((character) =>
          WilConditionUtil.isBadCondition(character.condition)
        );
      }

      // いずれの系統のスキルにも当てはまらない場合は候補から外す
      return false;
    });
  }
}
