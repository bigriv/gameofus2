import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_SOUND_ID } from "../enums/sound";
import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WilCharacter } from "./character";
import { WilTalkEvent } from "./event";
import { WilFieldCell } from "./field";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { SequenceId } from "@/composables/utils/id";
import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_CHARACTER_DEFINES } from "../defines/character";
import { WilBattle } from "./battle";

export class WilChapter {
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  battles: Array<WilBattle>;
  talks: Array<Array<WilTalkEvent>>;
  private currentFlow: number = -1;
  private currentTalk: number = -1;
  private currentEnemy: number = -1;

  constructor(
    define: {
      title: string;
      flow: Array<WIL_CHAPTER_TIMMING>;
      battles: Array<{
        name: string;
        background: WIL_IMAGE_ID;
        enemy: Array<{
          x: number;
          y: number;
          character: WIL_CHARACTER_ID;
        }>;
      }>;
      talks: Array<
        Array<{
          talker?: string;
          background?: WIL_IMAGE_ID;
          message?: Array<string>;
          sound?: WIL_SOUND_ID;
          left?: WIL_IMAGE_ID;
          right?: WIL_IMAGE_ID;
        }>
      >;
    },
    sequence: SequenceId,
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUAudio }
  ) {
    this.title = define.title;
    this.flow = define.flow;
    this.battles = define.battles.map((battle) => {
      return new WilBattle(
        battle.name,
        images[battle.background],
        battle.enemy.map((cell) => {
          const character = new WilCharacter(
            sequence.generateId(),
            WIL_CHARACTER_DEFINES[cell.character],
            images
          );
          return new WilFieldCell(cell.x, cell.y, character);
        })
      );
    });
    this.talks = define.talks.map((talk) =>
      talk.map(
        (define) =>
          new WilTalkEvent({
            talker: define.talker,
            background: define.background
              ? images[define.background]
              : undefined,
            message: define.message,
            left: define.left ? images[define.left] : undefined,
            right: define.right ? images[define.right] : undefined,
            sound: define.sound ? sounds[define.sound] : undefined,
          })
      )
    );
  }

  /**
   * 現在のイベントタイミングを取得する
   * @returns 現在のイベントタイミング
   */
  getCurrentEvent(): WIL_CHAPTER_TIMMING {
    if (this.currentFlow < 0) {
      return WIL_CHAPTER_TIMMING.OPENING;
    }
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

  /**
   * 現在表示すべき会話イベントを取得する
   * @returns 会話イベント
   */
  getCurrentTalks(): Array<WilTalkEvent> | undefined {
    if (this.currentTalk < 0) {
      return this.talks[0];
    }
    if (this.currentTalk >= this.talks.length) {
      return undefined;
    }
    return this.talks[this.currentTalk];
  }

  /**
   * 会話イベントを次に進める
   * @returns 進めた後の会話イベント
   */
  proceedNextTalks(): Array<WilTalkEvent> | undefined {
    if (this.currentTalk + 1 >= this.talks.length) {
      return undefined;
    }
    return this.talks[++this.currentTalk];
  }

  /**
   * 現在行うべき戦闘イベントを取得する
   * @returns 戦闘イベント
   */
  getCurrentBattle(): WilBattle | undefined {
    if (this.currentFlow < 0) {
      return this.battles[0];
    }
    if (this.currentEnemy >= this.battles.length) {
      return undefined;
    }
    return this.battles[this.currentEnemy];
  }

  /**
   * 戦闘イベントを次に進める
   * @returns 進めた後の戦闘イベント
   */
  proceedNextBattle(): WilBattle | undefined {
    if (this.currentEnemy + 1 >= this.battles.length) {
      return undefined;
    }
    return this.battles[++this.currentEnemy];
  }
}
