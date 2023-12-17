import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_SOUND_ID } from "../enums/sound";
import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WilCharacter } from "./character";
import { WilBattleEvent, WilTalkEvent } from "./event";
import { WilFieldCell } from "./field";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { SequenceId } from "@/composables/utils/id";
import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_CHARACTER_DEFINES } from "../defines/character";
import { WIL_BATTLE_TEAM } from "../enums/battle";
import { WilSkill } from "./skill";

export class WilChapter {
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  battles: Array<WilBattleEvent>;
  talks: Array<Array<WilTalkEvent>>;
  private currentFlow: number = -1;
  private currentTalk: number = -1;
  private currentBattle: number = -1;

  constructor(
    define: {
      title: string;
      flow: Array<WIL_CHAPTER_TIMMING>;
      battles: Array<{
        playerTeamName: string;
        computerTeamName: string;
        background?: WIL_IMAGE_ID;
        bgm?: WIL_SOUND_ID;
        deploy: Array<{
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
    skills: { [key: string]: WilSkill },
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUAudio }
  ) {
    this.title = define.title;
    this.flow = define.flow;
    this.battles = define.battles.map((battle) => {
      return new WilBattleEvent({
        playerTeamName: battle.playerTeamName,
        computerTeamName: battle.computerTeamName,
        background: battle.background ? images[battle.background] : undefined,
        bgm: battle.bgm ? sounds[battle.bgm] : undefined,
        deploy: battle.deploy.map((cell) => {
          const character = new WilCharacter(
            sequence.generateId(),
            WIL_CHARACTER_DEFINES[cell.character],
            skills,
            images
          );
          return new WilFieldCell(
            WIL_BATTLE_TEAM.COMPUTER,
            cell.x,
            cell.y,
            character
          );
        }),
      });
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
  getCurrentBattle(): WilBattleEvent | undefined {
    if (this.currentFlow < 0) {
      return this.battles[0];
    }
    if (this.currentBattle >= this.battles.length) {
      return undefined;
    }
    return this.battles[this.currentBattle];
  }

  /**
   * 戦闘イベントを次に進める
   * @returns 進めた後の戦闘イベント
   */
  proceedNextBattle(): WilBattleEvent | undefined {
    if (this.currentBattle + 1 >= this.battles.length) {
      return undefined;
    }
    return this.battles[++this.currentBattle];
  }
}
