import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilFieldCell } from "./field";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { WIL_CHARACTER_ID } from "../enums/character";
import { WilTraining } from "./training";
import { WilBattle } from "./battle";
import { WilTalkDefine } from "../defines/talk";

/**
 * 会話イベント
 */
export class WilTalkEvent {
  message?: Array<string>;
  sound?: GOUReadAudio;
  bgm?: GOUReadAudio;
  talker?: string;
  background?: GOUVisual;
  left?: GOUVisual;
  right?: GOUVisual;

  constructor(define: {
    message?: Array<string>;
    sound?: GOUReadAudio;
    bgm?: GOUReadAudio;
    talker?: string;
    background?: GOUVisual;
    left?: GOUVisual;
    right?: GOUVisual;
  }) {
    this.message = define.message;
    this.sound = define.sound;
    this.bgm = define.bgm;
    this.talker = define.talker;
    this.background = define.background;
    this.left = define.left;
    this.right = define.right;
  }

  /**
   * SEとBGMの発生を行う
   * BGMは同じBGMが再生中なら発生しない
   */
  process(currentBgm?: GOUReadAudio) {
    if (this.sound) {
      this.sound.loop = false;
      this.sound.play();
    }
    if (this.bgm && !this.bgm.isPlaying()) {
      if (currentBgm?.isPlaying()) {
        currentBgm.stop();
      }
      this.bgm.loop = true;
      this.bgm.play();
    }
  }
}

/**
 * 戦闘イベント
 */
export class WilBattleEvent {
  playerTeamName: string;
  computerTeamName: string;
  computerLevel: number;
  background?: GOUVisual;
  battleBgm?: GOUReadAudio;
  deployBgm?: GOUReadAudio;
  deploy: Array<WilFieldCell>;
  talks: Array<{
    event: Array<WilTalkEvent>;
    isStart: (battle: WilBattle) => boolean;
    end: boolean;
  }>;

  constructor(
    define: {
      playerTeamName: string;
      computerTeamName: string;
      computerLevel: number;
      background?: GOUVisual;
      battleBgm?: GOUReadAudio;
      deployBgm?: GOUReadAudio;
      deploy: Array<WilFieldCell>;
      talks?: Array<{
        event: WilTalkDefine;
        isStart: (battle: WilBattle) => boolean;
      }>;
    },
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUReadAudio }
  ) {
    this.playerTeamName = define.playerTeamName;
    this.computerTeamName = define.computerTeamName;
    this.computerLevel = define.computerLevel;
    this.background = define.background;
    this.deployBgm = define.deployBgm;
    this.battleBgm = define.battleBgm;
    this.deploy = define.deploy;
    this.talks =
      define.talks?.map((talk) => {
        return {
          event: talk.event.map(
            (e) =>
              new WilTalkEvent({
                talker: e.talker,
                background: e.background ? images[e.background] : undefined,
                message: e.message,
                left: e.left ? images[e.left] : undefined,
                right: e.right ? images[e.right] : undefined,
                sound: e.sound ? sounds[e.sound] : undefined,
                bgm: e.bgm ? sounds[e.bgm] : undefined,
              })
          ),
          isStart: talk.isStart,
          end: false,
        };
      }) ?? [];
  }

  /**
   * キャラクター配置時の処理
   * BGMは同じBGMが再生中なら発生しない
   */
  processDeploy() {
    if (this.deployBgm) {
      this.deployBgm.loop = true;
      this.deployBgm.play();
    }
  }

  /**
   * 戦闘開始時の処理
   * BGMは同じBGMが再生中なら発生しない
   */
  processBattle() {
    if (this.deployBgm && this.deployBgm.isPlaying()) {
      this.deployBgm.stop();
    }
    if (this.battleBgm) {
      this.battleBgm.loop = true;
      this.battleBgm.play();
    }
  }

  /**
   * 戦闘終了時の処理
   */
  processEnd() {
    if (this.deployBgm && this.deployBgm.isPlaying()) {
      this.deployBgm.stop();
    }
    if (this.battleBgm && this.battleBgm.isPlaying()) {
      this.battleBgm.stop();
    }
  }

  /**
   * 会話イベントを取得する
   * @param battle 戦闘管理オブジェクト
   * @returns 戦闘の状況に適した会話イベント（適したものが存在しなければundefined）
   */
  getTalk(battle: WilBattle): Array<WilTalkEvent> | undefined {
    for (let talk of this.talks) {
      if (talk.end) {
        continue;
      }
      if (talk.isStart(battle)) {
        talk.end = true;
        return talk.event;
      }
    }
    return undefined;
  }
}

/**
 * 訓練イベント
 */
export class WilTrainingEvent {
  days: number;
  talks: Array<{
    event: Array<WilTalkEvent>;
    isStart: (training: WilTraining) => boolean;
    end: boolean;
  }>;

  constructor(
    define: {
      days: number;
      talks?: Array<{
        event: WilTalkDefine;
        isStart: (training: WilTraining) => boolean;
      }>;
    },
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUReadAudio }
  ) {
    this.days = define.days;
    this.talks =
      define.talks?.map((talk) => {
        return {
          event: talk.event.map(
            (e) =>
              new WilTalkEvent({
                talker: e.talker,
                background: e.background ? images[e.background] : undefined,
                message: e.message,
                left: e.left ? images[e.left] : undefined,
                right: e.right ? images[e.right] : undefined,
                sound: e.sound ? sounds[e.sound] : undefined,
                bgm: e.bgm ? sounds[e.bgm] : undefined,
              })
          ),
          isStart: talk.isStart,
          end: false,
        };
      }) ?? [];
  }

  /**
   * 会話イベントを取得する
   * @param training 訓練オブジェクト
   * @returns 訓練に適した会話イベント（適したものが存在しなければundefined）
   */
  getTalk(training: WilTraining): Array<WilTalkEvent> | undefined {
    for (let talk of this.talks) {
      console.log(talk);

      if (talk.end) {
        continue;
      }
      if (talk.isStart(training)) {
        talk.end = true;
        return talk.event;
      }
    }
    return undefined;
  }
}

/**
 * 離加入イベント
 */
export class WilTeamEvent {
  in: Array<WIL_CHARACTER_ID>;
  out: Array<WIL_CHARACTER_ID>;

  constructor(define: {
    in: Array<WIL_CHARACTER_ID>;
    out: Array<WIL_CHARACTER_ID>;
  }) {
    this.in = define.in;
    this.out = define.out;
  }
}
