import { WilCharacter } from "@/composables/games/wil/types/character";
import { WIL_CELL_COLOR } from "../enums/cell";
import { WIL_BATTLE_TIMMING } from "../enums/timming";
import { WilSkill } from "./skill";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_BATTLE_TEAM } from "../enums/battle";
import {
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "../enums/skill";

/**
 * Wil用フィールドマスクラス
 */
export class WilFieldCell {
  readonly team: WIL_BATTLE_TEAM;
  readonly x: number;
  readonly y: number;
  color: WIL_CELL_COLOR = WIL_CELL_COLOR.WHITE;
  character?: WilCharacter;
  selected: boolean = false;

  constructor(
    team: WIL_BATTLE_TEAM,
    x: number,
    y: number,
    character?: WilCharacter
  ) {
    this.team = team;
    this.x = x;
    this.y = y;
    if (character) {
      this.character = character;
    }
  }
}

/**
 * Wil用フィールドクラス
 */
export class WilField {
  static readonly WIDTH = 3;
  static readonly HEIGHT = 5;
  static readonly MAX_CHARACTER = 5;
  readonly team: WIL_BATTLE_TEAM;
  cells: Array<WilFieldCell> = new Array(WilField.WIDTH * WilField.HEIGHT);

  constructor(team: WIL_BATTLE_TEAM) {
    this.team = team;
    this.cells = new Array(WilField.WIDTH * WilField.HEIGHT);
    for (let i = 0; i < WilField.HEIGHT; i++) {
      for (let j = 0; j < WilField.WIDTH; j++) {
        this.cells[i * WilField.WIDTH + j] = new WilFieldCell(team, j, i);
      }
    }
  }

  /**
   * フィールドの任意のマスを取得する
   * @param x 取得するフィールドのx座標
   * @param y 取得するフィールドのy座標
   * @returns 取得したマス
   * @throws 範囲外の座標を指定した場合は実装エラーとする
   */
  getCell(x: number, y: number): WilFieldCell {
    if (this.cells.length <= y * WilField.WIDTH + x) {
      throw new WrongImplementationError(
        `The cell (x, y)=(${x}, ${y}) is out of index.`
      );
    }
    return this.cells[y * WilField.WIDTH + x];
  }

  /**
   * 生存しているフィールド上のキャラクターの数を取得する
   * @returns 生存しているフィールド上のキャラクターの数
   */
  countCharacterNum(): number {
    return this.cells.filter(
      (cell) => cell.character && cell.character.status.life > 0
    ).length;
  }

  /**
   * フィールド上の生存キャラクターのリストを取得する
   * @returns 生存しているキャラクターのリスト
   */
  getCharacters(): Array<WilCharacter> {
    return this.cells
      .filter((cell) => cell.character && cell.character.status.life > 0)
      .map((cell) => cell.character as WilCharacter)
      .sort((a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id));
  }

  /**
   * 指定したキャラクターの配置されているマスを取得する
   * @param character キャラクター
   * @returns 指定したキャラクターの配置されているマス、取得できない場合はundefined
   */
  getCharacterCell(character: WilCharacter): WilFieldCell | undefined {
    return this.cells.find((cell) => cell.character?.id === character.id);
  }

  /**
   * キャラクターを配置する
   * @param x 配置するマスのx座標
   * @param y 配置するマスのy座標
   * @param character 配置するキャラクター
   */
  setCharacter(x: number, y: number, character: WilCharacter) {
    this.getCell(x, y).character = character;
  }

  /**
   * キャラクターをマスから排除する
   * @param x x座標
   * @param y y座標
   */
  removeCharacter(x: number, y: number) {
    this.getCell(x, y).character = undefined;
  }

  /**
   * キャラクターを移動する
   * @param character 移動するキャラクター
   * @param target 移動先のマス
   */
  migrateCharacter(character: WilCharacter, target: WilFieldCell) {
    const cell = this.getCharacterCell(character);
    if (!cell) {
      throw new WrongImplementationError(
        `The character id: ${character.id}, name: ${character.name} is is not exsist on field.`
      );
    }

    cell.character = undefined;
    target.character = character;
  }

  /**
   * フィールドのマスの色を変える
   * @param timming 戦闘タイミング
   * @param character 行動キャラクター
   * @param skill 発動予定スキル
   * @param target 行動対象マス
   * @returns なし
   */
  changeColor(
    turn: WIL_BATTLE_TEAM,
    timming: WIL_BATTLE_TIMMING,
    character?: WilCharacter,
    skill?: WilSkill,
    target?: WilFieldCell
  ) {
    const turnPlayerColor =
      turn === WIL_BATTLE_TEAM.PLAYER
        ? WIL_CELL_COLOR.BLUE
        : WIL_CELL_COLOR.RED;
    console.log("changeColor");
    // キャラクター配置時
    // すべてのマスの色を変える
    // 相手フィールド⇒赤、自分フィールド⇒青
    if (timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL) {
      if (this.team === WIL_BATTLE_TEAM.PLAYER) {
        this.cells.forEach((cell) => {
          cell.color = WIL_CELL_COLOR.BLUE;
        });
      } else if (this.team === WIL_BATTLE_TEAM.COMPUTER) {
        this.cells.forEach((cell) => {
          cell.color = WIL_CELL_COLOR.RED;
        });
      }
      return;
    }

    // 戦闘開始時
    // すべてのマスを白にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_START) {
      this.cells.forEach((cell) => {
        cell.color = WIL_CELL_COLOR.WHITE;
      });
      return;
    }

    // ターン開始時・キャラクター行動選択時
    // 行動キャラクターのいるマスのみ色を黄にする
    if (
      timming === WIL_BATTLE_TIMMING.BATTLE_TURN_START ||
      timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE
    ) {
      this.cells.forEach((cell) => {
        if (cell.character && cell.character.id === character?.id) {
          cell.color = WIL_CELL_COLOR.YELLOW;
          return;
        }
        cell.color = WIL_CELL_COLOR.WHITE;
      });
      return;
    }

    // キャラクター移動先選択時
    // 行動キャラクターのいるマスを黄、移動可能マスを青/赤に変える
    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
      if (this.team !== turn) {
        this.cells.forEach((cell) => {
          cell.color = WIL_CELL_COLOR.WHITE;
        });
        return;
      }

      this.cells.forEach((cell) => {
        if (cell.character) {
          if (cell.character.id === character?.id) {
            cell.color = WIL_CELL_COLOR.YELLOW;
            return;
          }
          cell.color = WIL_CELL_COLOR.WHITE;
        } else {
          cell.color = turnPlayerColor;
        }
      });
      return;
    }

    // 発動スキル選択時
    // スキルが選択されている場合は行動キャラクターを黄、対象にできるキャラクターのいるマスを青/赤にする
    // スキルが選択されていない場合は行動キャラクターのマスのみを黄にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL) {
      if (!skill) {
        this.cells.forEach((cell) => {
          if (cell.character && cell.character.id === character?.id) {
            cell.color = WIL_CELL_COLOR.YELLOW;
          }
          cell.color = WIL_CELL_COLOR.WHITE;
        });

        return;
      }

      // スキルが選択されている場合
      this.cells.forEach((cell) => {
        // 行動キャラクターのいるマスを黄にする
        if (cell.character && cell.character.id === character?.id) {
          cell.color = WIL_CELL_COLOR.YELLOW;
          return;
        }

        // 近接攻撃の場合は最前列のみ対象選択可能
        if (skill.type === WIL_SKILL_TYPE.CLOSE_PHISIC && !this.isFront(cell)) {
          cell.color = WIL_CELL_COLOR.WHITE;
          return;
        }

        switch (skill.target) {
          case WIL_SKILL_TARGET.SELF:
            // スキルの対象が自分のみとなる場合
            if (cell.character && cell.character.id === character?.id) {
              cell.color = turnPlayerColor;
            } else {
              cell.color = WIL_CELL_COLOR.WHITE;
            }
            break;
          case WIL_SKILL_TARGET.ALLY:
            // スキルの対象が味方となる場合
            if (turn === cell.team && cell.character) {
              cell.color = turnPlayerColor;
            } else {
              cell.color = WIL_CELL_COLOR.WHITE;
            }
            break;
          case WIL_SKILL_TARGET.ENEMY:
            // スキルの対象が相手となる場合
            if (turn !== cell.team && cell.character) {
              cell.color = turnPlayerColor;
            } else {
              cell.color = WIL_CELL_COLOR.WHITE;
            }
            break;
        }
      });
    }

    // スキル発動対象選択時
    // スキル発動対象キャラクターが選択されている場合はスキルの影響範囲を青/赤にする
    // スキル発動対象キャラクターが選択されていない場合は行動キャラクターを黄、対象にできるキャラクターのいるマスを青/赤にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
      if (!skill) {
        throw new WrongImplementationError(
          "'changeColor' must need skill argument."
        );
      }

      // スキル発動対象キャラクターが選択されていない場合
      if (!target) {
        this.cells.forEach((cell) => {
          // 行動キャラクターのいるマスを黄にする
          if (cell.character && cell.character.id === character?.id) {
            cell.color = WIL_CELL_COLOR.YELLOW;
          }

          // スキルの対象が発動者のみで発動者のいるマスでない場合は後続処理を行わない
          if (
            skill.target === WIL_SKILL_TARGET.SELF &&
            cell.character &&
            cell.character.id !== character?.id
          ) {
            cell.color = WIL_CELL_COLOR.WHITE;
            return;
          }
          // スキルの対象が味方でフィールドが味方のものではない場合は後続処理を行わない
          if (skill.target === WIL_SKILL_TARGET.ALLY && turn !== cell.team) {
            cell.color = WIL_CELL_COLOR.WHITE;
            return;
          }
          // スキルの対象が相手で相手フィールドのマスでない場合は後続処理を行わない
          if (skill.target === WIL_SKILL_TARGET.ENEMY && turn === cell.team) {
            cell.color = WIL_CELL_COLOR.WHITE;
            return;
          }

          // 近接攻撃の場合は最前列のみ対象選択可能
          if (
            skill.type === WIL_SKILL_TYPE.CLOSE_PHISIC &&
            !this.isFront(cell)
          ) {
            cell.color = WIL_CELL_COLOR.WHITE;
            return;
          }

          switch (skill.target) {
            case WIL_SKILL_TARGET.SELF:
              // スキルの対象が自分のみとなる場合
              if (cell.character && cell.character.id === character?.id) {
                cell.color = turnPlayerColor;
              } else {
                cell.color = WIL_CELL_COLOR.WHITE;
              }
              break;
            case WIL_SKILL_TARGET.ALLY:
              // スキルの対象が味方となる場合
              if (turn === cell.team && cell.character) {
                cell.color = turnPlayerColor;
              } else {
                cell.color = WIL_CELL_COLOR.WHITE;
              }
              break;
            case WIL_SKILL_TARGET.ENEMY:
              // スキルの対象が相手となる場合
              if (turn !== cell.team && cell.character) {
                cell.color = turnPlayerColor;
              } else {
                cell.color = WIL_CELL_COLOR.WHITE;
              }
              break;
          }
        });
        return;
      }

      // スキル発動対象キャラクターが選択されている場合
      this.cells.forEach((cell) => {
        // 行動キャラクターのいるマスを黄にする
        if (cell.character && cell.character.id === character?.id) {
          cell.color = WIL_CELL_COLOR.YELLOW;
          return;
        }
        cell.color = WIL_CELL_COLOR.WHITE;
      });

      // スキルの対象が発動者のみで発動者のいるマスでない場合は後続処理を行わない
      if (
        skill.target === WIL_SKILL_TARGET.SELF &&
        character &&
        character.id !== target.character?.id
      ) {
        return;
      }
      // スキルの対象が味方でフィールドが味方のものではない場合は後続処理を行わない
      if (
        skill.target === WIL_SKILL_TARGET.ALLY &&
        (turn !== target.team || turn !== this.team)
      ) {
        return;
      }
      // スキルの対象が相手で相手フィールドのマスでない場合は後続処理を行わない
      if (
        skill.target === WIL_SKILL_TARGET.ENEMY &&
        (turn === target.team || turn === this.team)
      ) {
        return;
      }

      // 近接攻撃の場合は最前列のみ対象選択可能
      if (skill.type === WIL_SKILL_TYPE.CLOSE_PHISIC && !this.isFront(target)) {
        return;
      }

      // スキル範囲によってマスの色を変える
      switch (skill.range) {
        case WIL_SKILL_RANGE.SOLO:
          target.color = turnPlayerColor;
          break;
        case WIL_SKILL_RANGE.AROUND:
          // 周り8マスの色を変える
          for (let i = -1; i <= 1; i++) {
            if (target.y + i < 0 || target.y + i >= WilField.HEIGHT) {
              continue;
            }
            for (let j = -1; j <= 1; j++) {
              if (target.y + j < 0 || target.y + j >= WilField.WIDTH) {
                continue;
              }
              this.getCell(target.x + j, target.y + i).color = turnPlayerColor;
            }
          }
          break;
        case WIL_SKILL_RANGE.CROSS:
          // 上下のマスの色を変える
          for (let i = -1; i <= 1; i++) {
            if (target.y + i < 0 || target.y + i >= WilField.HEIGHT) {
              continue;
            }
            this.getCell(target.x, target.y + i).color = turnPlayerColor;
          }
          // 左右のマスの色を変える
          for (let j = -1; j <= 1; j++) {
            if (target.y + j < 0 || target.y + j >= WilField.WIDTH) {
              continue;
            }
            this.getCell(target.x + j, target.y).color = turnPlayerColor;
          }
          break;
        case WIL_SKILL_RANGE.ROW:
          // 同じ行のマスの色を変える
          for (let j = 0; j < WilField.WIDTH; j++) {
            this.getCell(j, target.y).color = turnPlayerColor;
          }
          break;
        case WIL_SKILL_RANGE.COLUMN:
          // 同じ列のマスの色を変える
          for (let i = 0; i < WilField.HEIGHT; i++) {
            this.getCell(target.x, i).color = turnPlayerColor;
          }
          break;
        case WIL_SKILL_RANGE.ALL:
          if (this.team === turn) {
            this.cells.forEach((cell) => {
              cell.color = turnPlayerColor;
            });
          } else {
            this.cells.forEach((cell) => {
              cell.color = WIL_CELL_COLOR.WHITE;
            });
          }
          break;
      }
      return;
    }

    // ターン処理時
    // 行動キャラクターと対象キャラクターを黄、行動対象・スキル影響範囲を青/赤にする
    if (timming === WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE) {
      this.cells.forEach((cell) => {
        // 行動キャラクターのいるマスを黄にする
        if (cell.character && cell.character.id === character?.id) {
          cell.color = WIL_CELL_COLOR.YELLOW;
          return;
        }
        cell.color = WIL_CELL_COLOR.WHITE;
      });

      if (!target) {
        throw new WrongImplementationError(
          "'changeColor' is must need target at BATTLE_PROCESS_MOVE timming."
        );
      }
      // スキルが選択されていない場合は移動処理とみなす
      if (!skill) {
        target.color = WIL_CELL_COLOR.YELLOW;
        return;
      }

      // スキルの対象が発動者のみで発動者のいるマスでない場合は後続処理を行わない
      if (
        skill.target === WIL_SKILL_TARGET.SELF &&
        character &&
        character.id !== target.character?.id
      ) {
        return;
      }
      // スキルの対象が味方でフィールドが味方のものではない場合は後続処理を行わない
      if (skill.target === WIL_SKILL_TARGET.ALLY && turn !== target.team) {
        return;
      }
      // スキルの対象が相手でフィールドが相手のものではない場合は後続処理を行わない
      if (skill.target === WIL_SKILL_TARGET.ENEMY && turn === target.team) {
        return;
      }

      // スキル範囲によってマスの色を変える
      switch (skill.range) {
        case WIL_SKILL_RANGE.SOLO:
          target.color = turnPlayerColor;
          break;
        case WIL_SKILL_RANGE.AROUND:
          // 周り8マスの色を変える
          for (let i = -1; i <= 1; i++) {
            if (target.y + i < 0 || target.y + i >= WilField.HEIGHT) {
              continue;
            }
            for (let j = -1; j <= 1; j++) {
              if (target.y + j < 0 || target.y + j >= WilField.WIDTH) {
                continue;
              }
              this.getCell(target.x + j, target.y + i).color = turnPlayerColor;
            }
          }
          break;
        case WIL_SKILL_RANGE.CROSS:
          // 上下のマスの色を変える
          for (let i = -1; i <= 1; i++) {
            if (target.y + i < 0 || target.y + i >= WilField.HEIGHT) {
              continue;
            }
            this.getCell(target.x, target.y + i).color = turnPlayerColor;
          }
          // 左右のマスの色を変える
          for (let j = -1; j <= 1; j++) {
            if (target.y + j < 0 || target.y + j >= WilField.WIDTH) {
              continue;
            }
            this.getCell(target.x + j, target.y).color = turnPlayerColor;
          }
          break;
        case WIL_SKILL_RANGE.ROW:
          // 同じ行のマスの色を変える
          for (let j = 0; j < WilField.WIDTH; j++) {
            this.getCell(j, target.y).color = turnPlayerColor;
          }
          break;
        case WIL_SKILL_RANGE.COLUMN:
          // 同じ列のマスの色を変える
          for (let i = 0; i < WilField.HEIGHT; i++) {
            this.getCell(target.x, i).color = turnPlayerColor;
          }
          break;
        case WIL_SKILL_RANGE.ALL:
          this.cells.forEach((cell) => {
            cell.color = turnPlayerColor;
          });
          break;
      }
      return;
    }
  }

  /**
   * すべてのマスの選択状態を解除する
   */
  resetSelected() {
    this.cells.forEach((cell) => (cell.selected = false));
  }

  /**
   * 対象のマスのキャラクターが最前列に位置するかを判定する
   * @param cell 判定対象のマス
   * @returns 最前列ならtrue、そうでなければfalse
   */
  isFront(cell: WilFieldCell): boolean {
    for (let i = cell.x - 1; i >= 0; i--) {
      if (cell.character) {
        return false;
      }
    }
    return true;
  }
}
