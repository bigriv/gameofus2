import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilFieldCell } from "./field";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";

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
  background?: GOUVisual;
  battleBgm?: GOUReadAudio;
  deployBgm?: GOUReadAudio;
  deploy: Array<WilFieldCell>;

  constructor(define: {
    playerTeamName: string;
    computerTeamName: string;
    background?: GOUVisual;
    battleBgm?: GOUReadAudio;
    deployBgm?: GOUReadAudio;
    deploy: Array<WilFieldCell>;
  }) {
    this.playerTeamName = define.playerTeamName;
    this.computerTeamName = define.computerTeamName;
    this.background = define.background;
    this.deployBgm = define.deployBgm;
    this.battleBgm = define.battleBgm;
    this.deploy = define.deploy;
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
}
