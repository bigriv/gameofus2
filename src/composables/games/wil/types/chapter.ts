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

export class WilChapter {
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  enemys: Array<{
    name: string;
    deploy: Array<WilFieldCell>;
  }>;
  talks: Array<Array<WilTalkEvent>>;
  private currentFlow: number = -1;
  private currentTalk: number = -1;
  private currentEnemy: number = -1;

  constructor(
    define: {
      title: string;
      flow: Array<WIL_CHAPTER_TIMMING>;
      enemys: Array<{
        name: string;
        deploy: Array<{
          x: number;
          y: number;
          character: WIL_CHARACTER_ID;
        }>;
      }>;
      talks: Array<
        Array<{
          talker?: string;
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
    this.enemys = define.enemys.map((enemy) => {
      return {
        name: enemy.name,
        deploy: enemy.deploy.map((cell) => {
          const character = new WilCharacter(
            sequence.generateId(),
            Object.assign(
              JSON.parse(JSON.stringify(WIL_CHARACTER_DEFINES[cell.character])),
              {
                visual: images[WIL_CHARACTER_DEFINES[cell.character].visual],
                miniVisual:
                  images[WIL_CHARACTER_DEFINES[cell.character].miniVisual],
              }
            )
          );
          return new WilFieldCell(cell.x, cell.y, character);
        }),
      };
    });
    this.talks = define.talks.map((talk) =>
      talk.map(
        (define) =>
          new WilTalkEvent({
            talker: define.talker,
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
   * 現在表示すべき会話イベントを取得する
   * @returns 会話イベント
   */
  getCurrentEnemy():
    | {
        name: string;
        deploy: Array<WilFieldCell>;
      }
    | undefined {
    if (this.currentFlow < 0) {
      return this.enemys[0];
    }
    if (this.currentEnemy >= this.enemys.length) {
      return undefined;
    }
    return this.enemys[this.currentEnemy];
  }

  /**
   * 会話イベントを次に進める
   * @returns 進めた後の会話イベント
   */
  proceedNextEnemy():
    | {
        name: string;
        deploy: Array<WilFieldCell>;
      }
    | undefined {
    if (this.currentEnemy + 1 >= this.enemys.length) {
      return undefined;
    }
    return this.enemys[++this.currentEnemy];
  }
}
