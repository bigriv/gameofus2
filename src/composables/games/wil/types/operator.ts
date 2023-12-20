import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WilCharacter } from "./character";
import { WilField, WilFieldCell } from "./field";
import { WilSkill } from "./skill";
import {  WilBattleMoveResult } from "./battle";
import { WIL_BATTLE_TEAM } from "../enums/battle";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";

/**
 * Wil用の指揮クラス
 */
export abstract class WilOperator {
  team: WIL_BATTLE_TEAM;
  teamName: string;
  field: WilField;
  moveCharacter?: WilCharacter;
  targetCell?: WilFieldCell;
  selectSkill?: WilSkill;

  constructor(team: WIL_BATTLE_TEAM, teamName: string) {
    this.team = team;
    this.teamName = teamName;
    this.field = new WilField(team);
  }

  /**
   * ターン開始時の処理を行う
   */
  startTurn() {
    if (!this.moveCharacter) {
      throw new WrongImplementationError(
        "The move character is not selected in your turn."
      );
    }
  }

  /**
   * ターン終了時の処理を行う
   */
  endTurn() {
    if (!this.moveCharacter) {
      throw new WrongImplementationError(
        "The move character is not selected in your turn."
      );
    }
    const results = new Array<WilBattleMoveResult>();
    // 状態異常の効果を適用する
    let processConditionTurnEndresult =
      this.moveCharacter.processConditionTurnEnd();
    if (processConditionTurnEndresult) {
      results.push(processConditionTurnEndresult);
    }

    if (this.moveCharacter.status.life > 0) {
      // 生存している場合は状態異常の回復処理を行う
      let recoveryConditionResult = this.moveCharacter.recoveryCondition();
      if (recoveryConditionResult) {
        results.push(recoveryConditionResult);
      }
    } else {
      // 状態異常による戦闘不能処理
      results.push(
        new WilBattleMoveResult({
          message: [`${this.moveCharacter.name}は力尽きた。`],
          animation: new GOUAnimation(
            ANIMATION_TYPE.FADEOUT,
            ANIMATION_EASING_TYPE.EASE,
            1
          ),
          cell: this.targetCell,
        })
      );
    }

    // 選択されていた行動をリセットする
    this.resetMove();

    return results;
  }

  /**
   * 選択されていた行動をリセットする
   */
  resetMove() {
    this.moveCharacter = undefined;
    this.targetCell = undefined;
    this.selectSkill = undefined;
  }

  /**
   * 配置済みで生存しているキャラクターを取得する
   * @returns 配置済みで生存しているキャラクターのリスト
   */
  getFieldCharacters(): Array<WilCharacter> {
    return this.field.getCharacters();
  }

  /**
   * ターンスタックの少ない順>敏捷性の高い順>キャラクターID順のキャラクターリストを取得する
   * @returns 生存しているキャラクターを速く行動できる順に並び変えたリスト
   */
  getMoveSequense(): Array<WilCharacter> {
    return [...this.getFieldCharacters()]
      .filter((character) => {
        // 生存しているキャラクターで絞込
        return character.status.life > 0;
      })
      .sort((a, b) => (WilCharacter.compareMoveSequense(a, b) ? -1 : 1));
  }

  /**
   * 生存しているキャラクターすべてのスタック数を消費する
   * @param stack 消費するスタック数
   */
  consumeStack(stack: number) {
    this.getFieldCharacters().forEach((character) => {
      if (!character || character.status.life <= 0) {
        return;
      }
      if (character.stack - stack < 0) {
        character.stack = 0;
      }
      character.stack -= stack;
    });
  }

  /**
   * 生存しているキャラクターがフィールドに存在するかを判定する
   * @returns 生存キャラクターがいる場合はtrue、いない場合はfalse
   */
  isExisitAlives(): boolean {
    return this.field.countCharacterNum() > 0;
  }
}
