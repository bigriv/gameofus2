import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
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
  log: Array<string> = [];

  constructor(
    player: WilPlayer,
    event: WilBattleEvent,
    skillDefines: { [key: string]: WilSkill }
  ) {
    this.player = player;
    this.player.teamName = event.playerTeamName;
    this.player.deployableCharacters = [...this.player.allCharacters];
    this.player.resetField();

    this.computer = new WilComputer(
      event.computerTeamName,
      event.tactics,
      skillDefines
    );

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
      if (result.message && result.message.length > 0) {
        log.push(...result.message);
      }
      if (result.damage) {
        result.damage.forEach((d) => {
          log.push(`${d.character.name}は${d.damage}のダメージを受けた。`);
        });
      }
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
      this.skipTurn();
      return;
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

    const targets = this.getTargets();

    // ダメージが発生するスキルかを判定
    const isNeedCalcDamage =
      this.turnOperator.selectSkill.power !== undefined &&
      this.turnOperator.selectSkill.power > 0;

    let damageResults = new Array<WilBattleDamegeResult>();
    if (isNeedCalcDamage) {
      // ダメージ適用処理
      targets.forEach((targetCell) => {
        if (!this.turnOperator.moveCharacter) {
          // 行動キャラクターがいない場合は実装ミスとする
          throw new WrongImplementationError(
            "The move character is not exist."
          );
        }
        if (!this.turnOperator.selectSkill) {
          // 発動するスキルがない場合は実装ミスとする
          throw new WrongImplementationError("The use skill is empty.");
        }
        if (!targetCell.character || !targetCell.character.isAlive()) {
          // 対象となるマスに生存しているキャラクターがいなければ何もしない
          return;
        }
        // ダメージ計算処理
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

        // ダメージ適用
        targetCell.character.status.life -= damage;
      });
    }

    moveResults.push(
      // ダメージの結果を行動結果リストに格納
      new WilBattleMoveResult({
        message: [
          `${this.turnOperator.moveCharacter.name}は${this.turnOperator.selectSkill.name}を発動した。`,
        ],
        character: this.turnOperator.moveCharacter,
        characterAnimation: animation,
        cells: targets,
        cellAnimation: this.turnOperator.selectSkill.animation,
        sound: this.turnOperator.selectSkill.sound,
        damage: damageResults,
      })
    );

    // 戦闘不能処理
    targets.forEach((targetCell) => {
      if (!targetCell.character) {
        return;
      }
      if (targetCell.character.isAlive()) {
        return;
      }
      targetCell.character.status.life = 0;
      moveResults.push(
        new WilBattleMoveResult({
          message: [`${targetCell.character.name}は力尽きた。`],
          dead: targetCell,
        })
      );
    });

    // スキル効果適用
    targets.forEach((targetCell) => {
      if (!this.turnOperator.moveCharacter) {
        // 行動キャラクターがいない場合は実装ミスとする
        throw new WrongImplementationError("The move character is not exist.");
      }
      if (!this.turnOperator.selectSkill) {
        // 発動するスキルがない場合は実装ミスとする
        throw new WrongImplementationError("The use skill is empty.");
      }
      if (!this.turnOperator.selectSkill.effect) {
        return;
      }
      if (!targetCell.character || !targetCell.character.isAlive()) {
        return;
      }
      // 生存しているキャラクターにのみスキル効果を適用
      const enemyField =
        this.turnOperator.team === WIL_BATTLE_TEAM.PLAYER
          ? this.computer.field
          : this.player.field;

      moveResults.push(
        ...this.turnOperator.selectSkill.effect(
          this.turnOperator.moveCharacter,
          targetCell,
          this.turnOperator.field,
          enemyField
        )
      );
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
        return character.isAlive();
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
        if (cell.isExsistCharacter()) {
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
      updateFunction = (cell) => {
        cell.selectable =
          this.turnOperator.team !== cell.team && cell.isExsistCharacter();
      };
      this.player.field.cells.forEach(updateFunction);
      this.computer.field.cells.forEach(updateFunction);
      return;
    }

    // スキル対象が全ての場合
    // キャラクターがいるマスすべてを選択可能にする
    if (this.turnOperator.selectSkill.target === WIL_SKILL_TARGET.ALL) {
      updateFunction = (cell) => (cell.selectable = cell.isExsistCharacter());
      this.player.field.cells.forEach(updateFunction);
      this.computer.field.cells.forEach(updateFunction);
    }
  }
}

/**
 * 戦闘行動結果クラス
 */
export class WilBattleMoveResult {
  readonly message?: Array<string>;
  readonly sound?: GOUAudio;
  readonly cells?: Array<WilFieldCell>;
  readonly cellAnimation?: GOUVisual;
  readonly character?: WilCharacter;
  readonly characterAnimation?: GOUVisual | GOUAnimation | GOUFluidVisual;
  readonly damage?: Array<WilBattleDamegeResult>;
  readonly dead?: WilFieldCell;

  constructor(define: {
    message?: Array<string>;
    sound?: GOUAudio;
    cells?: Array<WilFieldCell>;
    cellAnimation?: GOUVisual;
    character?: WilCharacter;
    characterAnimation?: GOUVisual | GOUAnimation | GOUFluidVisual;
    damage?: Array<WilBattleDamegeResult>;
    dead?: WilFieldCell;
  }) {
    this.message = define.message;
    this.sound = define.sound;
    this.cells = define.cells;
    this.cellAnimation = define.cellAnimation;
    this.character = define.character;
    this.characterAnimation = define.characterAnimation;
    this.damage = define.damage;
    this.dead = define.dead;
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
      this.cells.forEach((cell, index) => {
        if (this.cellAnimation instanceof GOUVisual) {
          setTimeout(() => (cell.animation = this.cellAnimation), index * 150);
          setTimeout(() => (cell.animation = undefined), 1000 + index * 150);
        }
      });
    }

    // キャラクターに対するエフェクト
    if (this.character && this.characterAnimation) {
      if (this.characterAnimation instanceof GOUVisual) {
        const character = this.character;
        const temp = this.character.visual.current;
        this.character.visual.current = this.characterAnimation;
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

    if (this.dead && this.dead.character) {
      const animation = new GOUAnimation(
        ANIMATION_TYPE.FADEOUT,
        ANIMATION_EASING_TYPE.EASE,
        1
      );

      if (this.dead.character.visual.current instanceof GOUVisual) {
        this.dead.character.visual.current.animation = animation;
      }
      setTimeout(() => {
        // 戦闘不能時はキャラクターを盤面から取り除く
        this.dead!.character = undefined;
      }, animation.duration * 900);
    }
  }
}

/**
 * 戦闘ダメージ結果クラス
 */
export class WilBattleDamegeResult {
  readonly character: WilCharacter;
  readonly cell: WilFieldCell;
  readonly damage: number;

  constructor(define: { cell: WilFieldCell; damage: number }) {
    if (!define.cell.character) {
      throw new WrongImplementationError(
        "There is no character that should be damaged."
      );
    }
    // 戦闘不能時にキャラクターがマスから削除されることを考慮して、キャラクターを保持しておく
    this.character = define.cell.character;
    this.cell = define.cell;
    this.damage = define.damage;
  }

  /**
   * 結果の処理（SEの発生、アニメーションの適用）を行う
   */
  process() {
    if (this.character.visual.current instanceof GOUVisual) {
      const animation = new GOUAnimation(
        ANIMATION_TYPE.FLASH,
        ANIMATION_EASING_TYPE.EASE_IN_OUT,
        1,
        1
      );
      const currentVisual = this.character.visual.current;
      currentVisual.animation = animation;
      setTimeout(() => {
        currentVisual.animation = undefined;
      }, animation.duration * 1000);
    }
  }
}
