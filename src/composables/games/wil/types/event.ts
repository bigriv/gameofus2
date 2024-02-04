import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_BATTLE_TACTICS } from "@/composables/games/wil/enums/battle";
import { WilTalkDefine } from "@/composables/games/wil/defines/talks/index";
import { WilFieldCell } from "@/composables/games/wil/types/field";
import { WilTraining } from "@/composables/games/wil/types/training";
import { WilBattle } from "@/composables/games/wil/types/battle";

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

  constructor(
    define: {
      message?: Array<string>;
      sound?: WIL_SOUND_ID;
      bgm?: WIL_SOUND_ID;
      talker?: string;
      background?: WIL_IMAGE_ID;
      left?: WIL_IMAGE_ID;
      right?: WIL_IMAGE_ID;
    },
    images: { [key: string]: GOUVisual },
    sounds: { [key: string]: GOUReadAudio }
  ) {
    this.message = define.message;
    this.sound = define.sound ? sounds[define.sound] : undefined;
    this.bgm = define.bgm ? sounds[define.bgm] : undefined;
    this.talker = define.talker;
    this.background = define.background ? images[define.background] : undefined;
    this.left = define.left ? images[define.left] : undefined;
    this.right = define.right ? images[define.right] : undefined;
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
  tactics: WIL_BATTLE_TACTICS;
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
      tactics: WIL_BATTLE_TACTICS;
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
    this.tactics = define.tactics;
    this.background = define.background;
    this.deployBgm = define.deployBgm;
    this.battleBgm = define.battleBgm;
    this.deploy = define.deploy;
    this.talks =
      define.talks?.map((talk) => {
        return {
          event: talk.event.map((e) => new WilTalkEvent(e, images, sounds)),
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
          event: talk.event.map((e) => new WilTalkEvent(e, images, sounds)),
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
