import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WilCharacter } from "./character";
import { WilField, WilFieldCell } from "./field";
import { WilSkill } from "./skill";
import { WilBattleDamegeResult, WilBattleMoveResult } from "./battle";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WIL_BATTLE_TEAM } from "../enums/battle";

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
   * 選択されている行動を処理する
   * @returns 処理結果
   */
  processMove(): {
    moveResults: Array<WilBattleMoveResult>;
    damageResults: Array<WilBattleDamegeResult>;
  } {
    // TODO: 実装
    return { moveResults: [], damageResults: [] };
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
      // 戦闘不能処理
      // TODO: フィールドからキャラクターを非表示にする
      // TODO: 戦闘不能になったメッセージを表示する
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
   * フィールド色を変える
   * @param timming 戦闘タイミング
   * @param target 選択されているマス
   */
  changeFieldColor(
    turn: WIL_BATTLE_TEAM,
    timming: WIL_BATTLE_TIMMING,
    target?: WilFieldCell
  ) {
    this.field.changeColor(
      turn,
      timming,
      this.moveCharacter,
      this.selectSkill,
      target ?? this.targetCell
    );
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
    return this.field.getCharacters().length > 0;
  }
  // processBattle(field: WilField): {
  //   battleEvents: Array<WilBattleEvent>;
  //   damageEvents: Array<WilDamageEvent>;
  // } {
  //   if (!this.moveCharacter) {
  //     throw new WrongImplementationError(
  //       "キャラクター選択されていない状態で戦闘処理が行われました。"
  //     );
  //   }
  //   if (!this.targetCell) {
  //     throw new WrongImplementationError(
  //       "対象マスが設定されていない状態で戦闘処理が行われました。"
  //     );
  //   }
  //   let battleEvents = new Array<WilBattleEvent>();
  //   if (!this.selectSkill) {
  //     // 発動スキルが設定されていなければ移動処理を行う
  //     this.moveCharacter.migrate();
  //     field.migrateCharacter(this.moveCharacter, this.targetCell);
  //     battleEvents.push(
  //       new WilBattleEvent({
  //         message: [`${this.moveCharacter.name}は移動した。`],
  //       })
  //     );
  //     return { battleEvents, damageEvents: [] };
  //   }

  //   if (!this.targetCell.character) {
  //     throw new WrongImplementationError(
  //       "対象マスにキャラクターが存在しません。"
  //     );
  //   }

  //   // スキルの発動処理
  //   if (!this.moveCharacter.useSkill(this.selectSkill)) {
  //     // 発動に失敗した場合の処理
  //     battleEvents.push(
  //       new WilBattleEvent({
  //         message: [`${this.selectSkill.name}の発動に失敗した。`],
  //       })
  //     );
  //     return { battleEvents, damageEvents: [] };
  //   }

  //   // FIXME: 仮実装として範囲によらず対象のキャラクターにスキルを適用する
  //   battleEvents.push(
  //     new WilBattleEvent({
  //       message: [
  //         `${this.moveCharacter.name}は${this.selectSkill.name}を発動した。`,
  //       ],
  //     })
  //   );
  //   let damageEvents = new Array<WilDamageEvent>();
  //   const isNeedCalcDamage =
  //     this.selectSkill.power !== undefined && this.selectSkill.power > 0;
  //   if (isNeedCalcDamage) {
  //     let damage = this.calcDamage(
  //       this.moveCharacter,
  //       this.targetCell.character,
  //       this.selectSkill
  //     );

  //     // ダメージとして最大10%を加算
  //     damage += Math.round(Math.random() * damage * 0.1);

  //     damageEvents.push(new WilDamageEvent(this.targetCell, damage));
  //     battleEvents.push(
  //       new WilBattleEvent({
  //         message: [`${this.targetCell.character.name}に${damage}のダメージ！`],
  //       })
  //     );

  //     this.targetCell.character.status.life -= damage;
  //     if (this.targetCell.character.status.life <= 0) {
  //       this.targetCell.character.status.life = 0;
  //       battleEvents.push({
  //         message: [`${this.targetCell.character.name}は力尽きた。`],
  //         func: () => {
  //           if (this.targetCell && this.targetCell.character) {
  //             setTimeout(() => {
  //               if (!this.targetCell || !this.targetCell.character) {
  //                 return;
  //               }
  //               this.targetCell.character.miniVisual.animation =
  //                 new GOUAnimation(
  //                   ANIMATION_TYPE.FADEOUT,
  //                   ANIMATION_EASING_TYPE.EASE,
  //                   1
  //                 );
  //               setTimeout(() => {
  //                 if (!this.targetCell || !this.targetCell.character) {
  //                   return;
  //                 }
  //                 this.targetCell.character.miniVisual.animation = undefined;
  //                 this.targetCell.character = undefined;
  //               }, 900);
  //             }, 1500);
  //           }
  //         },
  //       });
  //     }
  //   }
  //   if (this.selectSkill.effect) {
  //     battleEvents.push(this.selectSkill.effect(this.targetCell.character));
  //   }
  //   switch (this.selectSkill.range) {
  //     case WIL_SKILL_RANGE.FRONT:
  //       break;
  //     case WIL_SKILL_RANGE.SKIP:
  //       break;
  //     case WIL_SKILL_RANGE.AROUND:
  //       break;
  //     case WIL_SKILL_RANGE.CROSS:
  //       break;
  //     case WIL_SKILL_RANGE.ROW:
  //       break;
  //     case WIL_SKILL_RANGE.COLUMN:
  //       break;
  //     case WIL_SKILL_RANGE.ALL:
  //       break;
  //   }

  //   return { battleEvents, damageEvents };
  // }
}
