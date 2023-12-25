import { MpCoin } from "./coin";
import { MpField } from "./field";
import { MP_COIN_DEFINES } from "../defines/coin";
import GOUPosition from "@/composables/types/GOUPosition";

export class MpManager {
  level: number = 1;
  score: number = 0;
  bestScore: number = 0;
  field: MpField = new MpField();
  isStart: boolean = false;
  isGameover: boolean = false;

  /**
   * ゲームを開始する
   */
  start() {
    this.field = new MpField();
    this.level = 1;
    this.score = 0;
    this.isGameover = false;
    this.isStart = true;
    this.process();
  }

  /**
   * ゲームのメインプロセスを処理する
   */
  private process() {
    let drawInterval = setInterval(() => {
      // コインを動かす
      this.field.moveCoin(this.level);

      if (!this.field.coin) {
        this.createCoin();
      }

      // 壺とコインが衝突したかを判定する
      if (this.field.coin && this.field.pot.isConflictCoin(this.field.coin)) {
        this.score += this.field.coin.score;
        this.field.removeCoin();
      }

      if (this.isLevelup()) {
        this.levelup();
      }

      // コインがフィールドの外にある場合はゲームオーバーにする
      if (this.isEndGame()) {
        this.field.removeCoin();
        this.end();
        clearTimeout(drawInterval);
      }
    }, 1000 / 60);
  }

  /**
   * 新しいコインを生成する
   */
  createCoin() {
    // レベルに応じて生成確率を変動させる
    let maxIndex = 2;
    if (this.level >= 20) {
      maxIndex = MP_COIN_DEFINES.length - 1;
    } else if (this.level >= 10) {
      maxIndex = MP_COIN_DEFINES.length - 2;
    } else if (this.level >= 5) {
      maxIndex = MP_COIN_DEFINES.length - 3;
    }

    const rand = Math.round(Math.random() * maxIndex);
    const newCoin = new MpCoin(MP_COIN_DEFINES[rand]);
    newCoin.position = new GOUPosition(Math.random() * (100 - newCoin.radius));
    this.field.coin = newCoin;
  }

  /**
   * ゲーム終了判定
   * @returns ゲームの終了条件を満たしているかを判定する
   */
  isEndGame(): boolean {
    return !!this.field.coin && !this.field.isInside(this.field.coin);
  }

  /**
   * ゲーム終了時の処理
   */
  end() {
    this.isGameover = true;
    this.isStart = false;
    if (this.bestScore < this.score) {
      localStorage.setItem("games.mp.bestscore", String(this.score));
      this.bestScore = this.score;
    }
  }

  /**
   * レベルアップできるかを判定する
   * @returns レベルアップ可能ならtrue、それ以外ならfalse
   */
  isLevelup() {
    if (this.score >= 20 * this.level * this.level) {
      return true;
    }
    return false;
  }

  /**
   * レベルアップ処理を行う
   */
  levelup() {
    this.level++;
  }
}
