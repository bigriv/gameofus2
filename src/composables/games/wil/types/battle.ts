import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { GOUFluidVisual } from "@/composables/types/visuals/GOUFluidVisual";
import {
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "@/composables/games/wil/enums/skill";
import { WIL_CELL_COLOR } from "@/composables/games/wil/enums/cell";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WilField, WilFieldCell } from "@/composables/games/wil/types/field";
import { WilPlayer } from "@/composables/games/wil/types/player";
import { WilComputer } from "@/composables/games/wil/types/computer";
import { WilBattleEvent } from "@/composables/games/wil/types/event";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilOperator } from "@/composables/games/wil/types/operator";
import { WilSkill } from "@/composables/games/wil/types/skill";

/**
 * 戦闘管理クラス
 */
export class WilBattle {
  player: WilPlayer;
  computer: WilComputer;
  turnOperator: WilOperator;
  winner?: WIL_BATTLE_TEAM;
  timming: WIL_BATTLE_TIMMING;
  moveResults: Array<WilBattleMoveResult> = [];
  damageResults: Array<WilBattleDamegeResult> = [];
  log: Array<string> = [];

  constructor(player: WilPlayer, event: WilBattleEvent) {
    this.player = player;
    this.player.teamName = event.playerTeamName;
    this.player.deployableCharacters = [...this.player.allCharacters];
    this.player.resetField();

    this.computer = new WilComputer(event.computerTeamName, event.tactics);

    this.turnOperator = this.player; // 便宜上デフォルトのターンプレイヤーはプレイヤーとする
    this.timming = WIL_BATTLE_TIMMING.SET_SELECT_CELL;
    this.updateFieldSelectable();
    this.changeFieldColor();
  }

  /**
   * 戦闘タイミングを更新し、フィールのマスの色を変える
   * @param newTimming 更新後の戦闘タイミング
   */
  changeTimming(newTimming: WIL_BATTLE_TIMMING) {
    this.timming = newTimming;
    this.updateFieldSelectable();
    this.changeFieldColor();
  }

  /**
   * 戦闘開始時の処理を行う
   */
  startBattle() {
    // すべての配置済みキャラクターのステータスとスタックターン数をリセット
    this.player.getFieldCharacters().forEach((character) => {
      character.reset();
    });
    this.computer.getFieldCharacters().forEach((character) => {
      character.reset();
    });
  }

  /**
   * ターンプレイヤーを取得する
   * @returns ターンプレイヤーのチーム
   */
  getTurnOperator(
    playerCharacter?: WilCharacter,
    computerCharacter?: WilCharacter
  ): WilOperator {
    if (!playerCharacter || !computerCharacter) {
      return this.turnOperator;
    }
    // より早く行動できるキャラクターの所持プレイヤーをターンプレイヤーとする
    if (WilCharacter.compareMoveSequense(playerCharacter, computerCharacter)) {
      return this.player;
    } else {
      return this.computer;
    }
  }

  /**
   * ターン開始時の処理を行う
   */
  startTurn() {
    // 各種値をリセット
    this.resetFieldSelectable();
    this.player.resetMove();
    this.computer.resetMove();
    this.moveResults = [];
    this.damageResults = [];

    // ターンキャラクターを取得し、ターンプレイヤーを決定
    const playerCharacter = this.player.getMoveSequense()[0];
    const computerCharacter = this.computer.getMoveSequense()[0];
    if (!playerCharacter || !computerCharacter) {
      throw new WrongImplementationError(
        `Player or Computer don't have living character. Player fastest character: ${playerCharacter}, Computer fastest character: ${computerCharacter}`
      );
    }
    this.turnOperator = this.getTurnOperator(
      playerCharacter,
      computerCharacter
    );

    if (this.turnOperator instanceof WilPlayer) {
      this.turnOperator.moveCharacter = playerCharacter;
    } else if (this.turnOperator instanceof WilComputer) {
      this.turnOperator.moveCharacter = computerCharacter;
    }
    const consumeStack = this.turnOperator.moveCharacter?.stack ?? 0;

    // 生存しているキャラクターのスタックターン数を一律消費
    this.player.consumeStack(consumeStack);
    this.computer.consumeStack(consumeStack);

    this.setMoveResults([
      new WilBattleMoveResult({
        message: [`${this.turnOperator.moveCharacter?.name}のターン`],
      }),
    ]);
  }

  /**
   * 指定されたマスをターンプレイヤーの行動対象のセルとしてセットする
   * @param team 対象マスの所有チーム
   * @param x 対象マスのx座標
   * @param y 対象マスのy座標
   */
  setMoveTarget(cell: WilFieldCell) {
    let turnPlayer;
    if (this.turnOperator.team === WIL_BATTLE_TEAM.PLAYER) {
      turnPlayer = this.player;
    } else if (this.turnOperator.team === WIL_BATTLE_TEAM.COMPUTER) {
      turnPlayer = this.computer;
    }
    if (!turnPlayer) {
      throw new WrongImplementationError("Turn player is empty.");
    }

    turnPlayer.targetCell = cell;
  }

  /**
   * 行動結果をセットし、ログに記録する
   * @param results セットする行動結果
   */
  setMoveResults(results: Array<WilBattleMoveResult>) {
    if (results.length <= 0) {
      this.moveResults = [];
      return;
    }
    this.moveResults = results;
    const log = new Array<string>();
    for (let result of results) {
      if (!result.message || result.message.length <= 0) {
        continue;
      }
      log.push(...result.message);
    }
    this.log.push(...log);
  }

  /**
   * ターンキャラクターの行動を処理する
   */
  processMove() {
    if (!this.turnOperator.moveCharacter) {
      throw new WrongImplementationError(
        "The operator's move character is empty."
      );
    }
    if (!this.turnOperator.targetCell) {
      throw new WrongImplementationError(
        "The operator's target cell is empty."
      );
    }

    if (!this.turnOperator.selectSkill) {
      // スキルが選択されていない場合は移動処理を行う
      this.turnOperator.field.migrateCharacter(
        this.turnOperator.moveCharacter,
        this.turnOperator.targetCell
      );
      this.turnOperator.moveCharacter.migrate();
      this.setMoveResults([
        new WilBattleMoveResult({
          message: [`${this.turnOperator.moveCharacter.name}は移動した。`],
        }),
      ]);
      return;
    }

    if (!this.turnOperator.targetCell.character) {
      throw new WrongImplementationError(
        "The move target cell is not exist character."
      );
    }

    // スキルの発動処理
    if (
      !this.turnOperator.moveCharacter.isUsableSkill(
        this.turnOperator.selectSkill
      )
    ) {
      // 発動に失敗した場合の処理
      this.setMoveResults([
        new WilBattleMoveResult({
          message: [`${this.turnOperator.selectSkill.name}の発動に失敗した。`],
        }),
      ]);
      return;
    }

    let moveResults = new Array<WilBattleMoveResult>();
    this.turnOperator.moveCharacter.useSkill(this.turnOperator.selectSkill);
    let animation = undefined;
    switch (this.turnOperator.selectSkill.type) {
      case WIL_SKILL_TYPE.CLOSE_PHISIC:
        animation = this.turnOperator.moveCharacter.visual.closePhisic;
        break;
      case WIL_SKILL_TYPE.SHOOT_PHISIC:
        animation = this.turnOperator.moveCharacter.visual.shootPhisic;
        break;
      case WIL_SKILL_TYPE.ATTACK_MAGIC:
      case WIL_SKILL_TYPE.SUPPORT_MAGIC:
        animation = this.turnOperator.moveCharacter.visual.magic;
        break;
    }
    moveResults.push(
      new WilBattleMoveResult({
        message: [
          `${this.turnOperator.moveCharacter.name}は${this.turnOperator.selectSkill.name}を発動した。`,
        ],
        character: this.turnOperator.moveCharacter,
        characterAnimation: animation,
        cells: this.getTargets(),
        cellAnimation: this.turnOperator.selectSkill.animation,
        sound: this.turnOperator.selectSkill.sound,
      })
    );

    let damageResults = new Array<WilBattleDamegeResult>();
    // ダメージ処理
    const isNeedCalcDamage =
      this.turnOperator.selectSkill.power !== undefined &&
      this.turnOperator.selectSkill.power > 0;
    this.getTargets().forEach((targetCell) => {
      if (!this.turnOperator.moveCharacter) {
        // 行動キャラクターがいない場合は実装ミスとする
        throw new WrongImplementationError("The move character is not exist.");
      }
      if (!this.turnOperator.selectSkill) {
        // 発動するスキルがない場合は実装ミスとする
        throw new WrongImplementationError("The use skill is empty.");
      }
      if (!targetCell.character || targetCell.character.status.life <= 0) {
        // 対象となるマスに生存しているキャラクターがいなければ何もしない
        return;
      }
      // ダメージが発生する場合はダメージの計算を行う
      if (isNeedCalcDamage) {
        let damage = WilSkill.calcDamage(
          this.turnOperator.moveCharacter,
          targetCell.character,
          this.turnOperator.selectSkill
        );

        // ダメージとして最大10%を加算
        damage += Math.round(Math.random() * damage * 0.1);

        damageResults.push(
          new WilBattleDamegeResult({
            cell: targetCell,
            damage,
          })
        );
        moveResults.push(
          new WilBattleMoveResult({
            message: [`${targetCell.character.name}に${damage}のダメージ！`],
            damage: damageResults,
          })
        );

        targetCell.character.status.life -= damage;
        if (targetCell.character.status.life <= 0) {
          targetCell.character.status.life = 0;
          moveResults.push(
            new WilBattleMoveResult({
              message: [`${targetCell.character.name}は力尽きた。`],
              characterAnimation: new GOUAnimation(
                ANIMATION_TYPE.FADEOUT,
                ANIMATION_EASING_TYPE.EASE,
                1
              ),
              character: targetCell.character,
            })
          );
          return;
        }
      }

      // スキル効果の適用
      if (this.turnOperator.selectSkill.effect) {
        if (targetCell.character) {
          moveResults.push(
            ...this.turnOperator.selectSkill.effect(
              this.turnOperator.moveCharacter,
              targetCell
            )
          );
        }
      }
    });

    this.setMoveResults(moveResults);
  }

  /**
   * キャラクターの行動順を取得する
   * @returns 行動順に並び替えたキャラクターのリスト
   */
  getMoveSequence(): Array<WilCharacter> {
    // 配置時は空の配列を返す
    if (
      this.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL ||
      this.timming === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER
    ) {
      return [];
    }

    return [
      ...this.player.getFieldCharacters(),
      ...this.computer.getFieldCharacters(),
    ]
      .filter((character) => {
        // 生存しているキャラクターで絞込
        return character.status.life > 0;
      })
      .sort((a, b) => (WilCharacter.compareMoveSequense(a, b) ? -1 : 1));
  }

  /**
   * ターンのスキップ処理を行う
   */
  skipTurn() {
    if (!this.turnOperator.moveCharacter) {
      throw new WrongImplementationError("Move character is not set.");
    }
    const nextMoveCharacter = this.getMoveSequence()[1];

    if (!nextMoveCharacter) {
      throw new WrongImplementationError("Couldn't get a next move character.");
    }

    this.turnOperator.moveCharacter.skip(nextMoveCharacter.stack);
    this.setMoveResults([
      new WilBattleMoveResult({
        message: [
          `${this.turnOperator.moveCharacter.name}のターンをスキップした。`,
        ],
      }),
    ]);
  }

  /**
   * ターン終了時の処理を行う
   */
  endTurn() {
    this.setMoveResults(this.turnOperator.endTurn());

    // 勝者判定
    this.winner = this.judgeWinner();
  }

  /**
   * 戦闘の勝利チームを判定する
   * @returns 勝利チーム（どちらも勝利条件を満たして伊那場合はundefined）
   */
  judgeWinner(): WIL_BATTLE_TEAM | undefined {
    if (!this.player.isExisitAlives()) {
      return WIL_BATTLE_TEAM.COMPUTER;
    }
    if (!this.computer.isExisitAlives()) {
      return WIL_BATTLE_TEAM.PLAYER;
    }
    return undefined;
  }

  /**
   * 戦闘終了時の処理を行う（キャラクターステータスのリセット等）
   */
  endBattle() {
    this.player.allCharacters.forEach((character) => character.reset());
  }

  /**
   * フィールドの選択状態をすべて解除する
   */
  resetFieldSelectable() {
    this.player.field.resetSelectable();
    this.computer.field.resetSelectable();
  }

  /**
   * 移動先またはスキルの影響範囲となるマスをすべて取得する
   * @param target 基準とする対象マス
   * @returns 移動先またはスキルの影響範囲となるマスのリスト
   */
  getTargets(target?: WilFieldCell): Array<WilFieldCell> {
    const targetCell = target ?? this.turnOperator.targetCell;
    if (!targetCell) {
      return [];
    }
    if (!this.turnOperator.selectSkill) {
      return [targetCell];
    }
    const targets = new Array<WilFieldCell>();
    const targetField =
      targetCell.team === WIL_BATTLE_TEAM.PLAYER
        ? this.player.field
        : this.computer.field;
    switch (this.turnOperator.selectSkill.range) {
      case WIL_SKILL_RANGE.SOLO:
        return [targetCell];
      case WIL_SKILL_RANGE.AROUND:
        // 周り8マスを対象とする
        targetField.cells.forEach((cell) => {
          if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
            return;
          }
          if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
            return;
          }
          targets.push(cell);
        });
        return targets;
      case WIL_SKILL_RANGE.CROSS:
        // 上下左右のマスを対象とする
        targetField.cells.forEach((cell) => {
          if (cell.x !== targetCell.x && cell.y !== targetCell.y) {
            return;
          }
          if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
            return;
          }
          if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
            return;
          }
          targets.push(cell);
        });
        return targets;
      case WIL_SKILL_RANGE.ROW:
        // 同じ列のマスを対象とする
        for (let i = 0; i < WilField.HEIGHT; i++) {
          targets.push(targetField.getCell(targetCell.x, i));
        }
        return targets;
      case WIL_SKILL_RANGE.COLUMN:
        // 同じ行のマスを対象とする
        for (let j = 0; j < WilField.WIDTH; j++) {
          targets.push(targetField.getCell(j, targetCell.y));
        }
        return targets;
      case WIL_SKILL_RANGE.ALL:
        return [...targetField.cells];
    }
  }

  /**
   * フィールドのマスの色を変える
   * @param target 選択されているマス
   */
  changeFieldColor(target?: WilFieldCell) {
    // キャラクター配置時
    // すべてのマスの色を変える
    // 相手フィールド⇒赤、自分フィールド⇒青
    if (
      this.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL ||
      this.timming === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER
    ) {
      this.player.field.cells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.BLUE;
      });
      this.computer.field.cells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.RED;
      });
      return;
    }

    // 戦闘開始時
    // すべてのマスを白にする
    if (this.timming === WIL_BATTLE_TIMMING.BATTLE_START) {
      this.player.field.cells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
      });
      this.computer.field.cells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
      });
      return;
    }

    const targetCell = target ?? this.turnOperator.targetCell;
    const turnPlayerColor =
      this.turnOperator.team === WIL_BATTLE_TEAM.PLAYER
        ? WIL_CELL_COLOR.BLUE
        : WIL_CELL_COLOR.RED;

    // 移動先選択時
    // 行動キャラクターのいるマスを黄、移動可能マスを青/赤に変える
    if (this.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
      const changeColorFunction = (cell: WilFieldCell) => {
        if (cell.selectable) {
          cell.color = turnPlayerColor;
          return;
        }
        if (
          cell.character &&
          cell.character.id === this.turnOperator.moveCharacter?.id
        ) {
          cell.color = WIL_CELL_COLOR.YELLOW;
          return;
        }
        cell.color = WIL_CELL_COLOR.WHITE;
      };
      this.player.field.cells.forEach(changeColorFunction);
      this.computer.field.cells.forEach(changeColorFunction);
      return;
    }

    // 発動スキルが選択されていない場合
    // 行動キャラクターのマスのみを黄にする
    if (!this.turnOperator.selectSkill) {
      const changeColorFunction = (cell: WilFieldCell) => {
        if (
          cell.character &&
          cell.character.id === this.turnOperator.moveCharacter?.id
        ) {
          cell.color = WIL_CELL_COLOR.YELLOW;
          return;
        }
        cell.color = WIL_CELL_COLOR.WHITE;
      };
      this.player.field.cells.forEach(changeColorFunction);
      this.computer.field.cells.forEach(changeColorFunction);
      return;
    }
    // スキル発動対象が選択されていない場合
    // 選択可能マスをターンプレイヤーの色に変更し、選択不可で行動キャラクターのいるマスを黄にする
    if (!targetCell) {
      const changeColorFunction = (cell: WilFieldCell) => {
        // 選択可能マスをターンプレイヤーの色に変更
        if (cell.selectable) {
          cell.color = turnPlayerColor;
          return;
        }
        // 行動キャラクターのいるマスを黄にする
        if (
          cell.character &&
          cell.character.id === this.turnOperator.moveCharacter?.id
        ) {
          cell.color = WIL_CELL_COLOR.YELLOW;
          return;
        }
        cell.color = WIL_CELL_COLOR.WHITE;
      };
      this.player.field.cells.forEach(changeColorFunction);
      this.computer.field.cells.forEach(changeColorFunction);
      return;
    }

    // 発動スキル・発動対象が選択されている場合
    // 選択不可で行動キャラクターのいるマスを黄にする
    const changeColorFunction = (cell: WilFieldCell) => {
      if (
        cell.character &&
        cell.character.id === this.turnOperator.moveCharacter?.id
      ) {
        cell.color = WIL_CELL_COLOR.YELLOW;
        return;
      }
      cell.color = WIL_CELL_COLOR.WHITE;
    };
    this.player.field.cells.forEach(changeColorFunction);
    this.computer.field.cells.forEach(changeColorFunction);

    // 対象マスをターンプレイヤーの色に変更する
    if (targetCell.selectable) {
      this.getTargets(targetCell).forEach(
        (cell) => (cell.color = turnPlayerColor)
      );
    }
  }

  /**
   * フィールドの選択可否フラグを更新する
   */
  updateFieldSelectable() {
    let updateFunction = (__cell: WilFieldCell): void => {};
    // 移動先選択時
    if (this.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
      updateFunction = (cell: WilFieldCell) => {
        cell.selectable =
          this.turnOperator.team === cell.team && !cell.character;
      };
      this.player.field.cells.forEach(updateFunction);
      this.computer.field.cells.forEach(updateFunction);
      return;
    }

    // 移動先選択時以外でスキルが選択されていない場合
    // すべてのマスを選択不可にする
    if (!this.turnOperator.selectSkill) {
      this.resetFieldSelectable();
      return;
    }

    // スキルが選択されている場合
    // スキル対象が味方の場合
    if (this.turnOperator.selectSkill.target === WIL_SKILL_TARGET.ALLY) {
      updateFunction = (cell) => {
        if (this.turnOperator.team !== cell.team) {
          cell.selectable = false;
          return;
        }
        if (cell.character) {
          cell.selectable = true;
          return;
        }
        cell.selectable = false;
      };
      this.player.field.cells.forEach(updateFunction);
      this.computer.field.cells.forEach(updateFunction);
      return;
    }

    // スキル対象が自身のみの場合
    if (this.turnOperator.selectSkill.target === WIL_SKILL_TARGET.SELF) {
      // キャラクターIDが一致するマスのみを選択可能にする
      updateFunction = (cell) =>
        (cell.selectable =
          !!cell.character &&
          cell.character.id === this.turnOperator.moveCharacter?.id);
      this.player.field.cells.forEach(updateFunction);
      this.computer.field.cells.forEach(updateFunction);
      return;
    }
    // スキル対象が相手の場合
    if (this.turnOperator.selectSkill.target === WIL_SKILL_TARGET.ENEMY) {
      // スキル種別が近接物理の場合
      if (this.turnOperator.selectSkill.type === WIL_SKILL_TYPE.CLOSE_PHISIC) {
        if (!this.turnOperator.moveCharacter) {
          throw new WrongImplementationError("The move character is emtpy.");
        }
        // 発動キャラクターが自分フィールド内で先頭にいない場合はすべてのマスを選択不可にする
        if (!this.turnOperator.field.isFront(this.turnOperator.moveCharacter)) {
          updateFunction = (cell) => (cell.selectable = false);
          this.player.field.cells.forEach(updateFunction);
          this.computer.field.cells.forEach(updateFunction);
          return;
        }

        // ターンプレイヤーと違うフィールド内で、キャラクターがいるマスで、そのキャラクターが先頭にいる場合は選択可能
        this.player.field.cells.forEach((cell) => {
          cell.selectable =
            this.turnOperator.team !== cell.team &&
            !!cell.character &&
            this.player.field.isFront(cell);
        });
        this.computer.field.cells.forEach((cell) => {
          cell.selectable =
            this.turnOperator.team !== cell.team &&
            !!cell.character &&
            this.computer.field.isFront(cell);
        });
        return;
      }

      // スキル種別が近接以外の場合
      // ターンプレイヤーと違うフィールド内で、キャラクターがいるマスの場合は選択可能
      updateFunction = (cell) =>
        (cell.selectable =
          this.turnOperator.team !== cell.team && !!cell.character);
      this.player.field.cells.forEach(updateFunction);
      this.computer.field.cells.forEach(updateFunction);
      return;
    }

    // スキル対象が全ての場合
    // キャラクターがいるマスすべてを選択可能にする
    if (this.turnOperator.selectSkill.target === WIL_SKILL_TARGET.ALL) {
      updateFunction = (cell) => (cell.selectable = !!cell.character);
      this.player.field.cells.forEach(updateFunction);
      this.computer.field.cells.forEach(updateFunction);
    }
  }
}

/**
 * 戦闘行動結果クラス
 */
export class WilBattleMoveResult {
  message?: Array<string>;
  sound?: GOUAudio;
  cells?: Array<WilFieldCell>;
  cellAnimation?: GOUVisual;
  character?: WilCharacter;
  characterAnimation?: GOUVisual | GOUAnimation | GOUFluidVisual;
  damage?: Array<WilBattleDamegeResult>;

  constructor(define: {
    message?: Array<string>;
    sound?: GOUAudio;
    cells?: Array<WilFieldCell>;
    cellAnimation?: GOUVisual;
    character?: WilCharacter;
    characterAnimation?: GOUVisual | GOUAnimation | GOUFluidVisual;
    damage?: Array<WilBattleDamegeResult>;
  }) {
    this.message = define.message;
    this.sound = define.sound;
    this.cells = define.cells;
    this.cellAnimation = define.cellAnimation;
    this.character = define.character;
    this.characterAnimation = define.characterAnimation;
    this.damage = define.damage;
  }

  /**
   * 結果の処理（SEの発生、アニメーションの適用）を行う
   */
  process() {
    if (this.sound) {
      this.sound.play();
    }
    // マスに対するエフェクト
    if (this.cells && this.cellAnimation) {
      this.cells.forEach((cell) => {
        if (this.cellAnimation instanceof GOUImage) {
          cell.animation = this.cellAnimation as GOUImage;
          setTimeout(() => (cell.animation = undefined), 1000);
        } else if (this.cellAnimation instanceof GOULottie) {
          cell.animation = this.cellAnimation as GOULottie;
          setTimeout(() => (cell.animation = undefined), 1000);
        }
      });
    }

    // キャラクターに対するエフェクト
    if (this.character && this.characterAnimation) {
      if (this.characterAnimation instanceof GOUImage) {
        const character = this.character;
        const temp = this.character.visual.current;
        this.character.visual.current = this.characterAnimation as GOUImage;
        setTimeout(() => (character.visual.current = temp), 1000);
      } else if (this.characterAnimation instanceof GOULottie) {
        const character = this.character;
        const temp = this.character.visual.current;
        this.character.visual.current = this.characterAnimation as GOULottie;
        setTimeout(() => (character.visual.current = temp), 1000);
      } else if (this.characterAnimation instanceof GOUAnimation) {
        if (this.character.visual.current instanceof GOUVisual) {
          const currentVisual = this.character.visual.current;
          currentVisual.animation = this.characterAnimation;
          setTimeout(
            () => (currentVisual.animation = undefined),
            this.characterAnimation.duration * 2000
          );
        }
      } else if (this.characterAnimation instanceof GOUFluidVisual) {
        const character = this.character;
        const currentVisual = this.character.visual.current;
        character.visual.current = this.characterAnimation;
        setTimeout(() => (character.visual.current = currentVisual), 1000);
      }
    }
  }
}

/**
 * 戦闘ダメージ結果クラス
 */
export class WilBattleDamegeResult {
  cell: WilFieldCell;
  damage: number;

  constructor(define: { cell: WilFieldCell; damage: number }) {
    this.cell = define.cell;
    this.damage = define.damage;
  }

  /**
   * 結果の処理（SEの発生、アニメーションの適用）を行う
   */
  process() {
    if (this.cell.character) {
      const character = this.cell.character;
      const animation = new GOUAnimation(
        ANIMATION_TYPE.FLASH,
        ANIMATION_EASING_TYPE.EASE_IN_OUT,
        0.5,
        1
      );
      if (character.visual.current instanceof GOUVisual) {
        const currentVisual = character.visual.current;
        currentVisual.animation = animation;
        setTimeout(() => {
          currentVisual.animation = undefined;
          if (character.status.life <= 0) {
            this.cell.character = undefined;
          }
        }, animation.duration * 1000);
      }
    }
  }
}
