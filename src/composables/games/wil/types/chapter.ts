import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WilCharacter } from "./character";
import { WilBattleEvent, WilTalkEvent, WilTeamEvent } from "./event";
import { WilFieldCell } from "./field";
import { SequenceId } from "@/composables/utils/id";
import { WIL_CHARACTER_DEFINES } from "../defines/character";
import { WIL_BATTLE_TEAM } from "../enums/battle";
import { WilSkill } from "./skill";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { WilChapterDefine } from "../defines/chapter";
import { WIL_CHARACTER_ID } from "../enums/character";

export class WilChapter {
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  battleEvents: Array<WilBattleEvent>;
  talkEvents: Array<Array<WilTalkEvent>>;
  teamEvents: Array<WilTeamEvent>;
  private currentFlow: number = -1;
  private currentTalkEvent: number = -1;
  private currentBatEventtle: number = -1;
  private currentTeamEvent: number = -1;

  constructor(
    define: WilChapterDefine,
    sequence: SequenceId,
    skills: { [key: string]: WilSkill },
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUReadAudio }
  ) {
    this.title = define.title;
    this.flow = define.flow;
    this.battleEvents = define.battles.map((battle) => {
      return new WilBattleEvent({
        playerTeamName: battle.playerTeamName,
        computerTeamName: battle.computerTeamName,
        background: battle.background ? images[battle.background] : undefined,
        deployBgm: battle.deployBgm ? sounds[battle.deployBgm] : undefined,
        battleBgm: battle.battleBgm ? sounds[battle.battleBgm] : undefined,
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
    this.talkEvents = define.talks.map((talk) =>
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
            bgm: define.bgm ? sounds[define.bgm] : undefined,
          })
      )
    );
    this.teamEvents = define.updateTeam;
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
  proceedEvent(): WIL_CHAPTER_TIMMING {
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
  getCurrentTalkEvent(): Array<WilTalkEvent> | undefined {
    if (this.currentTalkEvent < 0) {
      return this.talkEvents[0];
    }
    if (this.currentTalkEvent >= this.talkEvents.length) {
      return undefined;
    }
    return this.talkEvents[this.currentTalkEvent];
  }

  /**
   * 会話イベントを次に進める
   * @returns 進めた後の会話イベント
   */
  proceedTalkEvent(): Array<WilTalkEvent> | undefined {
    if (this.currentTalkEvent + 1 >= this.talkEvents.length) {
      return undefined;
    }
    return this.talkEvents[++this.currentTalkEvent];
  }

  /**
   * 現在行うべき戦闘イベントを取得する
   * @returns 戦闘イベント
   */
  getCurrentBattleEvent(): WilBattleEvent | undefined {
    if (this.currentBatEventtle < 0) {
      return this.battleEvents[0];
    }
    if (this.currentBatEventtle >= this.battleEvents.length) {
      return undefined;
    }
    return this.battleEvents[this.currentBatEventtle];
  }

  /**
   * 戦闘イベントを次に進める
   * @returns 進めた後の戦闘イベント
   */
  proceedBattleEvent(): WilBattleEvent | undefined {
    if (this.currentBatEventtle + 1 >= this.battleEvents.length) {
      return undefined;
    }
    return this.battleEvents[++this.currentBatEventtle];
  }

  /**
   * 現在行うべき理加入イベントを取得する
   * @returns 離加入イベント
   */
  getCurrentTeamEvent():
    | { in: Array<WIL_CHARACTER_ID>; out: Array<WIL_CHARACTER_ID> }
    | undefined {
    if (this.currentTeamEvent < 0) {
      return this.teamEvents[0];
    }
    if (this.currentTeamEvent >= this.teamEvents.length) {
      return undefined;
    }
    return this.teamEvents[this.currentTeamEvent];
  }

  /**
   * 離加入イベントを次に進める
   * @returns 進めた後の離加入イベント
   */
  proceedTeamEvent():
    | { in: Array<WIL_CHARACTER_ID>; out: Array<WIL_CHARACTER_ID> }
    | undefined {
    if (this.currentTeamEvent + 1 >= this.teamEvents.length) {
      return undefined;
    }
    return this.teamEvents[++this.currentTeamEvent];
  }
}
