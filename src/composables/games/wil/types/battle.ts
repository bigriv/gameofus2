import { WilFieldCell } from "./field";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";
import { WilPlayer } from "./player";
import { WilComputer } from "./computer";
import { WIL_BATTLE_TEAM } from "../enums/battle";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WilBattleEvent } from "./event";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WilCharacter } from "./character";
import { WilOperator } from "./operator";
import { WilSkill } from "./skill";
import { WIL_SKILL_RANGE } from "../enums/skill";

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

    this.computer = new WilComputer(event.computerTeamName);

    this.turnOperator = this.player; // 便宜上デフォルトのターンプレイヤーはプレイヤーとする
    this.timming = WIL_BATTLE_TIMMING.SET_SELECT_CELL;
    this.changeFieldColor();
  }

  /**
   * 戦闘タイミングを更新し、フィールのマスの色を変える
   * @param newTimming 更新後の戦闘タイミング
   */
  changeTimming(newTimming: WIL_BATTLE_TIMMING) {
    this.timming = newTimming;
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
    this.resetFieldSelected();
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
      this.computer.moveCharacter = computerCharacter;
    }
    const consumeStack = this.turnOperator.moveCharacter?.stack ?? 0;

    // 生存しているキャラクターのスタックターン数を一律消費
    this.player.consumeStack(consumeStack);
    this.computer.consumeStack(consumeStack);

    // コンピュータのターンなら行動の決定まで行い、行動処理に遷移
    if (this.turnOperator instanceof WilComputer) {
      this.turnOperator.decideBattleMove(this.player.field);
      setTimeout(() => {
        this.changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE);
        this.processMove();
      }, 2000);
    }
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
      this.moveResults = [
        new WilBattleMoveResult({
          message: [`${this.turnOperator.moveCharacter.name}は移動した。`],
        }),
      ];
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
      this.moveResults = [
        new WilBattleMoveResult({
          message: [`${this.turnOperator.selectSkill.name}の発動に失敗した。`],
        }),
      ];
      return;
    }

    let moveResults = new Array<WilBattleMoveResult>();
    this.turnOperator.moveCharacter.useSkill(this.turnOperator.selectSkill);
    // FIXME: 仮実装として範囲によらず対象のキャラクターにスキルを適用する
    moveResults.push(
      new WilBattleMoveResult({
        message: [
          `${this.turnOperator.moveCharacter.name}は${this.turnOperator.selectSkill.name}を発動した。`,
        ],
      })
    );

    let damageResults = new Array<WilBattleDamegeResult>();
    // ダメージ処理
    const isNeedCalcDamage =
      this.turnOperator.selectSkill.power !== undefined &&
      this.turnOperator.selectSkill.power > 0;
    if (isNeedCalcDamage) {
      let damage = WilSkill.calcDamage(
        this.turnOperator.moveCharacter,
        this.turnOperator.targetCell.character,
        this.turnOperator.selectSkill
      );

      // ダメージとして最大10%を加算
      damage += Math.round(Math.random() * damage * 0.1);

      damageResults.push(
        new WilBattleDamegeResult({
          cell: this.turnOperator.targetCell,
          damage,
        })
      );
      moveResults.push(
        new WilBattleMoveResult({
          message: [
            `${this.turnOperator.targetCell.character.name}に${damage}のダメージ！`,
          ],
          damage: damageResults,
        })
      );

      this.turnOperator.targetCell.character.status.life -= damage;
      if (this.turnOperator.targetCell.character.status.life <= 0) {
        this.turnOperator.targetCell.character.status.life = 0;
        moveResults.push(
          new WilBattleMoveResult({
            message: [
              `${this.turnOperator.targetCell.character.name}は力尽きた。`,
            ],
            animation: new GOUAnimation(
              ANIMATION_TYPE.FADEOUT,
              ANIMATION_EASING_TYPE.EASE,
              1
            ),
            cell: this.turnOperator.targetCell,
          })
        );
      }
    }
    // スキル効果の適用
    if (this.turnOperator.selectSkill.effect) {
      moveResults.push(
        ...this.turnOperator.selectSkill.effect(
          this.turnOperator.moveCharacter,
          this.turnOperator.targetCell.character
        )
      );
    }
    const targetCells = [];
    switch (this.turnOperator.selectSkill.range) {
      case WIL_SKILL_RANGE.SOLO:
        targetCells.push(this.turnOperator.targetCell);
        break;
      case WIL_SKILL_RANGE.AROUND:
        break;
      case WIL_SKILL_RANGE.CROSS:
        break;
      case WIL_SKILL_RANGE.ROW:
        break;
      case WIL_SKILL_RANGE.COLUMN:
        break;
      case WIL_SKILL_RANGE.ALL:
        break;
    }

    this.moveResults = moveResults;
    // TODO: ログを記録
  }

  /**
   * ターン終了時の処理を行う
   */
  endTurn() {
    this.moveResults = this.turnOperator.endTurn();
    // TODO: ログを記録

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
  resetFieldSelected() {
    this.player.field.resetSelected();
    this.computer.field.resetSelected();
  }

  /**
   * フィールドのマスの色を変える
   * @param target 選択されているマス
   */
  changeFieldColor(target?: WilFieldCell) {
    this.player.field.changeColor(
      this.turnOperator.team,
      this.timming,
      this.turnOperator.moveCharacter,
      this.turnOperator.selectSkill,
      target ?? this.turnOperator.targetCell
    );
    this.computer.field.changeColor(
      this.turnOperator.team,
      this.timming,
      this.turnOperator.moveCharacter,
      this.turnOperator.selectSkill,
      target ?? this.turnOperator.targetCell
    );
  }
}

/**
 * 戦闘行動結果クラス
 */
export class WilBattleMoveResult {
  message?: Array<string>;
  sound?: GOUAudio;
  animation?: GOULottie | GOUAnimation;
  cell?: WilFieldCell;
  damage?: Array<WilBattleDamegeResult>;

  constructor(define: {
    message?: Array<string>;
    sound?: GOUAudio;
    animation?: GOULottie | GOUAnimation;
    cell?: WilFieldCell;
    damage?: Array<WilBattleDamegeResult>;
  }) {
    this.message = define.message;
    this.sound = define.sound;
    this.animation = define.animation;
    this.cell = define.cell;
    this.damage = define.damage;
  }

  /**
   * 結果の処理（SEの発生、アニメーションの適用）を行う
   */
  process() {
    if (this.sound) {
      this.sound.play();
    }
    if (this.cell?.character) {
      if (this.animation instanceof GOULottie) {
        const character = this.cell.character;
        const temp = this.cell.character.visual;
        this.cell.character.visual.current = this.animation;
        // FIXME: 何秒で戻すかは要調整
        setTimeout(() => (character.visual.current = temp.standing), 1000);
      } else if (this.animation instanceof GOUAnimation) {
        const character = this.cell.character;
        this.cell.character.visual.current.animation = this.animation;
        setTimeout(
          () => (character.visual.current.animation = undefined),
          this.animation.duration * 1000
        );
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
  sound?: GOUAudio;
  animation?: GOUAnimation;

  constructor(define: {
    cell: WilFieldCell;
    damage: number;
    sound?: GOUAudio;
    animation?: GOUAnimation;
  }) {
    this.cell = define.cell;
    this.damage = define.damage;
    this.sound = define.sound;
    this.animation = define.animation;
  }

  /**
   * 結果の処理（SEの発生、アニメーションの適用）を行う
   */
  process() {
    if (this.sound) {
      this.sound.play();
    }
    if (this.animation && this.cell.character) {
      const character = this.cell.character;
      character.visual.current.animation = this.animation;
      setTimeout(
        () => (character.visual.current.animation = undefined),
        this.animation.duration * 1000
      );
    }
  }
}
