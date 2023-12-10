import { WilCharacter } from "@/composables/games/wil/types/character";
import { WIL_CELL_COLOR } from "../enums/cell";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WilSkill } from "./skill";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_MOVE_RANGE } from "../enums/range";
import { WIL_BATTLE_TEAM } from "../enums/battle";

export class WilFieldCell {
  readonly x: number;
  readonly y: number;
  color: WIL_CELL_COLOR = WIL_CELL_COLOR.WHITE;
  character?: WilCharacter;
  selected: boolean = false;

  constructor(x: number, y: number, character?: WilCharacter) {
    this.x = x;
    this.y = y;
    if (character) {
      this.character = character;
    }
  }
}

export class WilField {
  static readonly WIDTH = 3;
  static readonly HEIGHT = 5;
  static readonly MAX_CHARACTER = 5;
  playerCells: Array<WilFieldCell>;
  enemyCells: Array<WilFieldCell>;

  constructor() {
    this.playerCells = new Array(WilField.WIDTH * WilField.HEIGHT);
    this.enemyCells = new Array(WilField.WIDTH * WilField.HEIGHT);
    for (let i = 0; i < WilField.HEIGHT; i++) {
      for (let j = 0; j < WilField.WIDTH; j++) {
        this.playerCells[i * WilField.WIDTH + j] = new WilFieldCell(j, i);
        this.enemyCells[i * WilField.WIDTH + j] = new WilFieldCell(j, i);
      }
    }
  }

  /**
   * プレイヤーのフィールドの任意のマスを取得する
   * @param x 取得するプレイヤーフィールドのx座標
   * @param y 取得するプレイヤーフィールドのy座標
   * @returns 取得したマス（範囲外の座標を指定した場合はundefined）
   */
  getPlayerCell(x: number, y: number): WilFieldCell | undefined {
    if (this.playerCells.length <= y * WilField.WIDTH + x) {
      return undefined;
    }
    return this.playerCells[y * WilField.WIDTH + x];
  }

  /**
   * 敵フィールドの任意のマスを取得する
   * @param x 取得する敵フィールドのx座標
   * @param y 取得する敵フィールドのy座標
   * @returns 取得したマス（範囲外の座標を指定した場合はundefined）
   */
  getEnemyCell(x: number, y: number): WilFieldCell | undefined {
    if (this.enemyCells.length <= y * WilField.WIDTH + x) {
      return undefined;
    }
    return this.enemyCells[y * WilField.WIDTH + x];
  }

  /**
   * 生存しているフィールド上のプレイヤーキャラクターの数を取得する
   * @returns 生存しているフィールド上のプレイヤーキャラクターの数
   */
  getPlayerNum(): number {
    return this.playerCells.filter(
      (cell) => cell.character && cell.character.status.life > 0
    ).length;
  }

  /**
   * 生存しているフィールド上の敵キャラクターの数を取得する
   * @returns 生存しているフィールド上の敵キャラクターの数
   */
  getEnemyNum(): number {
    return this.enemyCells.filter(
      (cell) => cell.character && cell.character.status.life > 0
    ).length;
  }

  /**
   * プレイヤーキャラクターのリストを取得する
   * @returns プレイヤーキャラクターのリスト
   */
  getPlayerCharacters(): Array<WilCharacter> {
    return this.playerCells
      .filter((cell) => cell.character instanceof WilCharacter)
      .map((cell) => cell.character as WilCharacter)
      .sort((a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id));
  }

  /**
   * 敵キャラクターのリストを取得する
   * @returns 敵キャラクターのリスト
   */
  getEnemyCharacters(): Array<WilCharacter> {
    return this.enemyCells
      .filter((cell) => cell.character instanceof WilCharacter)
      .map((cell) => cell.character as WilCharacter)
      .sort((a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id));
  }

  /**
   * 指定したキャラクターの配置されているプレイヤーのマスを取得する
   * @param character キャラクター
   * @returns 指定したキャラクターの配置されているマス、取得できない場合はundefined
   */
  getPlayerCharacterCell(character: WilCharacter): WilFieldCell | undefined {
    return this.playerCells.find((cell) => cell.character?.id === character.id);
  }

  /**
   * 指定したキャラクターの配置されている相手のマスを取得する
   * @param character キャラクター
   * @returns 指定したキャラクターの配置されているマス、取得できない場合はundefined
   */
  getEnemyCharacterCell(character: WilCharacter): WilFieldCell | undefined {
    return this.enemyCells.find((cell) => cell.character?.id === character.id);
  }

  /**
   * キャラクターを配置する
   * @param x 配置するマスのx座標
   * @param y 配置するマスのy座標
   * @param character 配置するキャラクター
   * @returns 配置に成功した場合はtrue、失敗した場合はfalse
   */
  setPlayerCharacter(x: number, y: number, character: WilCharacter): boolean {
    if (!this.isSetablePlayerCahracter(x, y)) {
      return false;
    }

    const cell = this.getPlayerCell(x, y);
    if (!cell) {
      return false;
    }
    cell.character = character;
    return true;
  }

  /**
   * キャラクターを配置できるかを判定する
   * @returns 配置可能ならtrue、それ以外はfalse
   */
  isSetablePlayerCahracter(x: number, y: number): boolean {
    // 配置可能判定（フィールド外または青以外なら配置不可）
    const cell = this.getPlayerCell(x, y);
    if (!cell || cell.color !== WIL_CELL_COLOR.BLUE) {
      return false;
    }

    return true;
  }

  /**
   * 相手フィールドにキャラクターを配置する
   * @param deploy キャラクターを配置するマスのリスト
   */
  setEnemyCharacters(deploy: Array<WilFieldCell>) {
    for (const d of deploy) {
      const cell = this.getEnemyCell(d.x, d.y);
      if (!cell) {
        continue;
      }
      cell.character = d.character;
    }
  }

  /**
   * フィールド上で最速で行動できるキャラクターを取得する
   * @param without 除外するキャラクター
   * @returns 最速行動可能キャラクター
   */
  getFastCharacter(...without: Array<WilCharacter>): WilCharacter | undefined {
    const withoutIdList = without.map((w) => w.id);
    const fastCharacter = (
      characters: Array<WilCharacter>
    ): WilCharacter | undefined => {
      return [...characters]
        .filter((character) => {
          // 除外リストに含まれていないかつ生存しているキャラクターで絞込
          return (
            !withoutIdList.includes(character.id) && character.status.life > 0
          );
        })
        .sort((a, b) => {
          // satckの少ない順⇒敏捷力の高い順⇒乱数で並び替え
          if (a.stack == b.stack) {
            if (a.status.speed == b.status.speed) {
              return Math.random() < 0.5 ? 1 : -1;
            }
            return b.status.speed - a.status.speed;
          }
          return a.stack - b.stack;
        })[0];
    };

    return fastCharacter([
      ...this.getPlayerCharacters(),
      ...this.getEnemyCharacters(),
    ]);
  }

  /**
   * 最速行動可能キャラクターから次のターンプレイヤーを取得する
   * @param fastCharacter 最速行動可能キャラクター
   * @returns 次のターンプレイヤー
   */
  getTurnPlayer(fastCharacter: WilCharacter): WIL_BATTLE_TEAM {
    if (
      this.getPlayerCharacters().find(
        (character) => character.id === fastCharacter.id
      )
    ) {
      return WIL_BATTLE_TEAM.PLAYER;
    }
    if (
      this.getEnemyCharacters().find(
        (character) => character.id === fastCharacter.id
      )
    ) {
      return WIL_BATTLE_TEAM.ENEMY;
    }

    throw new WrongImplementationError("Couldn't get a move player.");
  }

  /**
   * キャラクターをセルから排除する
   * @param x x座標
   * @param y y座標
   */
  removePlayerCharacter(x: number, y: number) {
    const cell = this.getPlayerCell(x, y);
    if (!cell || !cell.character) {
      return;
    }
    cell.character = undefined;
  }

  /**
   * キャラクターを移動する
   * @param character 移動するキャラクター
   * @param target 移動先のマス
   */
  migrateCharacter(character: WilCharacter, target: WilFieldCell) {
    const cell = this.getPlayerCharacterCell(character);
    if (!cell) {
      throw new WrongImplementationError("キャラクターの存在しないマスです。");
    }

    target.character = cell.character;
    cell.character = undefined;
  }

  /**
   * フィールドのマスの色を変える
   * @param timming 戦闘タイミング
   * @param character 行動キャラクター
   * @param skill 発動予定スキル
   * @param target 発動スキルの対象キャラクター
   * @returns なし
   */
  changeColor(
    timming: WIL_BATTLE_TIMMING,
    character?: WilCharacter,
    skill?: WilSkill,
    target?: WilCharacter
  ) {
    console.log("changeColor", timming);
    // キャラクター配置時
    // すべてのマスの色を変える
    // 相手フィールド⇒赤、自分フィールド⇒青
    if (timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL) {
      this.playerCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.BLUE;
      });
      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.RED;
      });
      return;
    }

    // 戦闘開始時
    // キャラクターのいるマスの色を変える
    // 相手フィールド⇒赤、自分フィールド⇒青
    if (timming === WIL_BATTLE_TIMMING.BATTLE_START) {
      this.playerCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
        if (cell.character) {
          cell.color = WIL_CELL_COLOR.BLUE;
        }
      });
      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
        if (cell.character) {
          cell.color = WIL_CELL_COLOR.RED;
        }
      });
      return;
    }

    // 自分のターン開始時
    // 行動キャラクターのいるマスのみ色を青にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START) {
      this.playerCells.forEach((cell) => {
        if (!cell.character || !character) {
          cell.color = WIL_CELL_COLOR.WHITE;
          return;
        }
        if (cell.character.id === character.id) {
          cell.color = WIL_CELL_COLOR.BLUE;
        } else {
          cell.color = WIL_CELL_COLOR.WHITE;
        }
      });

      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
      });
    }

    // キャラクター移動先選択時
    // 移動可能マスを青にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
      this.playerCells.forEach((cell) => {
        if (cell.character) {
          cell.color = WIL_CELL_COLOR.WHITE;
        } else {
          cell.color = WIL_CELL_COLOR.BLUE;
        }
      });

      this.enemyCells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
      });
      return;
    }

    // 発動スキル選択時
    // スキルが選択されている場合は行動キャラクターと対象にできるキャラクターのいるマスを青にする
    // スキルが選択されていない場合は行動キャラクターのマスのみを青にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL) {
      this.playerCells.forEach((cell) => {
        // 行動キャラクターのいるマスを青にする
        if (!cell.character || !character) {
          cell.color = WIL_CELL_COLOR.WHITE;
          return;
        }

        if (cell.character.id === character.id) {
          cell.color = WIL_CELL_COLOR.BLUE;
        } else {
          cell.color = WIL_CELL_COLOR.WHITE;
        }
        if (!skill) {
          return;
        }

        // スキルが選択されている場合
        // TODO: サポートスキル・回復スキルの場合は自分フィールドの色を青にする
        // TODO: 対象可否判定を行う
      });

      this.enemyCells.forEach((cell) => {
        // TODO: サポートスキル・回復スキルの場合は相手フィールドの色を白にする
        if (cell.character) {
          if (!skill) {
            cell.color = WIL_CELL_COLOR.RED;
          } else {
            // TODO: 対象可否判定を行う
            cell.color = WIL_CELL_COLOR.BLUE;
          }
        } else {
          cell.color = WIL_CELL_COLOR.WHITE;
        }
      });
    }

    //スキル発動対象選択時
    // スキル発動対象キャラクターが選択されている場合はスキルの影響範囲を青にする
    // スキル発動対象キャラクターが選択されていない場合は行動キャラクターと対象にできるキャラクターのいるマスを青にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
      const targetCell = target
        ? this.getEnemyCharacterCell(target)
        : undefined;

      this.playerCells.forEach((cell) => {
        if (!targetCell) {
          // スキル発動対象キャラクターが選択されていない場合
          if (!cell.character || !character) {
            cell.color = WIL_CELL_COLOR.WHITE;
            return;
          }
          if (cell.character.id === character.id) {
            cell.color = WIL_CELL_COLOR.BLUE;
          }
          return;
        }

        // スキル発動対象キャラクターが選択されている場合
        // TODO: スキル発動対象キャラクターが選択されていない場合対象可否判定を行う
        // TODO: スキル発動対象キャラクターが選択されている場合はサポートスキル・回復スキルの場合は自分フィールドの色を青にする
      });

      this.enemyCells.forEach((cell) => {
        if (!targetCell) {
          // スキル発動対象キャラクターが選択されていない場合
          if (cell.character) {
            if (!skill) {
              cell.color = WIL_CELL_COLOR.RED;
            } else {
              // TODO: 対象可否判定を行う
              cell.color = WIL_CELL_COLOR.BLUE;
            }
          } else {
            cell.color = WIL_CELL_COLOR.WHITE;
          }
          return;
        }

        // スキル発動対象キャラクターが選択されている場合
        // TODO: サポートスキル・回復スキルの場合は相手フィールドの色を白にする

        if (!skill) {
          throw new WrongImplementationError(
            "'changeColor' must need skill argument."
          );
        }

        // スキル範囲によってマスの色を変える
        switch (skill.range) {
          case WIL_MOVE_RANGE.FIRST:
            targetCell.color = WIL_CELL_COLOR.BLUE;
            break;
          case WIL_MOVE_RANGE.SKIP:
            this.enemyCells.forEach((cell) => {
              if (cell.character) {
                cell.color = WIL_CELL_COLOR.BLUE;
              }
            });
            break;
          case WIL_MOVE_RANGE.AROUND:
            this.enemyCells.forEach((cell) => {
              if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
                return;
              }
              if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
                return;
              }
              cell.color = WIL_CELL_COLOR.BLUE;
            });
            break;
          case WIL_MOVE_RANGE.CROSS:
            this.enemyCells.forEach((cell) => {
              if (cell.x < targetCell.x - 1 || cell.x > targetCell.x + 1) {
                return;
              }
              if (cell.y < targetCell.y - 1 || cell.y > targetCell.y + 1) {
                return;
              }
              cell.color = WIL_CELL_COLOR.BLUE;
            });
            break;
          case WIL_MOVE_RANGE.ROW:
            this.enemyCells.forEach((cell) => {
              if (cell.x == targetCell.x) {
                cell.color = WIL_CELL_COLOR.BLUE;
              }
            });
            break;
          case WIL_MOVE_RANGE.COLUMN:
            this.enemyCells.forEach((cell) => {
              if (cell.y == targetCell.y) {
                cell.color = WIL_CELL_COLOR.BLUE;
              }
            });
            break;
          case WIL_MOVE_RANGE.ALL:
            this.enemyCells.forEach((cell) => {
              cell.color = WIL_CELL_COLOR.BLUE;
            });
            break;
        }
        return;
      });
    }
  }

  /**
   * すべてのマスの選択状態を解除する
   */
  resetSelected() {
    this.playerCells.forEach((cell) => (cell.selected = false));
    this.enemyCells.forEach((cell) => (cell.selected = false));
  }

  /**
   * 戦闘開始時に行う処理
   */
  processBattleStart() {
    const process = (character?: WilCharacter) => {
      if (!character) {
        return;
      }
      character.resetStatus();
      character.resetStack();
    };

    // すべての配置済みキャラクターのステータスとスタックターン数をリセット
    this.playerCells.forEach((cell) => {
      process(cell.character);
    });
    this.enemyCells.forEach((cell) => {
      process(cell.character);
    });
  }

  /**
   * ターン開始時に行う処理
   * @returns turnCharacter 最速行動キャラクター
   *          turnTeam ターンプレイヤー
   */
  processTurnStart(): {
    turnCharacter: WilCharacter;
    turnTeam: WIL_BATTLE_TEAM;
  } {
    console.log(this.getPlayerCharacters(), this.getEnemyCharacters())
    const fastMoveCharacter = this.getFastCharacter();
    if (!fastMoveCharacter) {
      throw new WrongImplementationError("Couldn't get the fast move player.");
    }
    const turn = this.getTurnPlayer(fastMoveCharacter);
    const consumeStack = fastMoveCharacter.stack;

    console.log(fastMoveCharacter, consumeStack)
    const process = (character?: WilCharacter) => {
      if (!character || character.status.life <= 0) {
        return;
      }
      character.stack -= consumeStack;
      if (character.stack < 0) {
        character.stack = 0;
      }
    };

    // 生存しているキャラクターのスタックターン数を一律消費
    this.playerCells.forEach((cell) => {
      process(cell.character);
    });
    this.enemyCells.forEach((cell) => {
      process(cell.character);
    });

    return { turnCharacter: fastMoveCharacter, turnTeam: turn };
  }
}
