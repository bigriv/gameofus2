import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WilCharacter } from "./character";
import { WilFieldCell } from "./field";

export class WilChapter {
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  firstEnemy: {
    name: string;
    deploy: Array<WilFieldCell>;
  };
  secondEnemy?: {
    name: string;
    deploy: Array<WilFieldCell>;
  };
  //   talks: Array<WilTalkEvent>;
  private currentFlow: number = 0;
  //   private currentTalk: number = 0;

  constructor(define: {
    title: string;
    flow: Array<WIL_CHAPTER_TIMMING>;
    firstEnemy: {
      name: string;
      deploy: Array<{
        x: number;
        y: number;
        character: WilCharacter;
      }>;
    };
    secondEnemy?: {
      name: string;
      deploy: Array<{
        x: number;
        y: number;
        character: WilCharacter;
      }>;
    };
    // talk: Array<WilTalkEvent>;
  }) {
    this.title = define.title;
    this.flow = define.flow;
    this.firstEnemy = {
      name: define.firstEnemy.name,
      deploy: define.firstEnemy.deploy.map(
        (cell) => new WilFieldCell(cell.x, cell.y, cell.character)
      ),
    };
    if (define.secondEnemy) {
      this.secondEnemy = {
        name: define.secondEnemy.name,
        deploy: define.secondEnemy.deploy.map(
          (cell) => new WilFieldCell(cell.x, cell.y, cell.character)
        ),
      };
    }
    // this.talk = define.talk;
  }

  /**
   * 現在のイベントタイミングを取得する
   * @returns 現在のイベントタイミング
   */
  getCurrentEvent(): WIL_CHAPTER_TIMMING {
    if (this.currentFlow >= this.flow.length) {
      return WIL_CHAPTER_TIMMING.ENDING;
    }
    return this.flow[this.currentFlow];
  }

  /**
   * イベントタイミングを次に進める
   * @returns 進めた後のイベントタイミング（進めた後が最後ならENDINGを返す）
   */
  proceedNextEvent(): WIL_CHAPTER_TIMMING {
    if (this.currentFlow >= this.flow.length) {
      this.currentFlow = this.flow.length;
      return WIL_CHAPTER_TIMMING.ENDING;
    }
    return this.flow[++this.currentFlow];
  }

  //   /**
  //    * 現在表示すべき台詞を取得する
  //    * @returns 台詞
  //    */
  //   getCurrentSerif(): Array<string> {
  //     if (this.currentTalk >= this.talks.length) {
  //       return [];
  //     }
  //     return [...this.talks[this.currentTalk]];
  //   }

  //   /**
  //    * 台詞を次に進める
  //    * @returns
  //    */
  //   proceedNextSerif(): Array<string> {
  //     if (this.currentTalk >= this.talks.length) {
  //       return [];
  //     }
  //     return [...this.talks[++this.currentTalk]];
  //   }
}
