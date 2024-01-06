import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { SequenceId } from "@/composables/utils/id";
import { WIL_CHAPTER_TIMMING } from "@/composables/games/wil/enums/timming";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WIL_CHARACTER_DEFINES } from "@/composables/games/wil/defines/character";
import { WilChapterDefine } from "@/composables/games/wil/defines/chapter";
import { WilCharacter } from "@/composables/games/wil/types/character";
import {
  WilBattleEvent,
  WilTalkEvent,
  WilTeamEvent,
  WilTrainingEvent,
} from "@/composables/games/wil/types/event";
import { WilFieldCell } from "@/composables/games/wil/types/field";
import { WilSkill } from "@/composables/games/wil/types/skill";

export class WilChapter {
  id: number;
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  talkEvents: Array<Array<WilTalkEvent>>;
  battleEvents: Array<WilBattleEvent>;
  trainingEvents: Array<WilTrainingEvent>;
  teamEvents: Array<WilTeamEvent>;
  private currentFlow: number = -1;
  private currentTalkEvent: number = -1;
  private currentBattleEventtle: number = -1;
  private currentTrainingEvent: number = -1;
  private currentTeamEvent: number = -1;

  constructor(
    define: WilChapterDefine,
    sequence: SequenceId,
    skills: { [key: string]: WilSkill },
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUReadAudio }
  ) {
    this.id = define.id;
    this.title = define.title;
    this.flow = define.flow;
    this.talkEvents = define.talks.map((talk) =>
      talk.map(
        (define) =>
          new WilTalkEvent(
            {
              talker: define.talker,
              background: define.background,
              message: define.message,
              left: define.left,
              right: define.right,
              sound: define.sound,
              bgm: define.bgm,
            },
            images,
            sounds
          )
      )
    );
    this.battleEvents = define.battles.map((battle) => {
      return new WilBattleEvent(
        {
          playerTeamName: battle.playerTeamName,
          computerTeamName: battle.computerTeamName,
          computerLevel: battle.computerLevel,
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
          talks: battle.talks,
        },
        images,
        sounds
      );
    });
    this.trainingEvents =
      define.trainings?.map((training) => {
        return new WilTrainingEvent(
          {
            days: training.days,
            talks: training.talks,
          },
          images,
          sounds
        );
      }) ?? [];
    this.teamEvents = define.updateTeam;
  }

  /**
   * 現在のイベントタイミングの位置を取得する
   * @returns 現在のイベントタイミングの位置
   */
  getCurrentFlow(): number {
    return this.currentFlow;
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
    if (this.currentBattleEventtle < 0) {
      return this.battleEvents[0];
    }
    if (this.currentBattleEventtle >= this.battleEvents.length) {
      return undefined;
    }
    return this.battleEvents[this.currentBattleEventtle];
  }

  /**
   * 戦闘イベントを次に進める
   * @returns 進めた後の戦闘イベント
   */
  proceedBattleEvent(): WilBattleEvent | undefined {
    if (this.currentBattleEventtle + 1 >= this.battleEvents.length) {
      return undefined;
    }
    return this.battleEvents[++this.currentBattleEventtle];
  }

  /**
   * 現在行うべき訓練イベントを取得する
   * @returns 訓練イベント
   */
  getCurrentTrainingEvent(): WilTrainingEvent | undefined {
    if (this.currentTrainingEvent < 0) {
      return this.trainingEvents[0];
    }
    if (this.currentTrainingEvent >= this.trainingEvents.length) {
      return undefined;
    }
    return this.trainingEvents[this.currentTrainingEvent];
  }

  /**
   * 訓練イベントを次に進める
   * @returns 進めた後の訓練イベント
   */
  proceedTrainingEvent(): WilTrainingEvent | undefined {
    if (this.currentTrainingEvent + 1 >= this.trainingEvents.length) {
      return undefined;
    }
    return this.trainingEvents[++this.currentTrainingEvent];
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
