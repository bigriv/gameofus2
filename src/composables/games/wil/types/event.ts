import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilFieldCell } from "./field";

/**
 * 会話イベント
 */
export class WilTalkEvent {
  message?: Array<string>;
  sound?: GOUAudio;
  bgm?: GOUAudio;
  talker?: string;
  background?: GOUVisual;
  left?: GOUVisual;
  right?: GOUVisual;

  constructor(define: {
    message?: Array<string>;
    sound?: GOUAudio;
    bgm?: GOUAudio;
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
  process() {
    if (this.sound) {
      this.sound.play();
    }
    if (this.bgm && !this.bgm.isPlaying()) {
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
  bgm?: GOUAudio;
  deploy: Array<WilFieldCell>;

  constructor(define: {
    playerTeamName: string;
    computerTeamName: string;
    background?: GOUVisual;
    bgm?: GOUAudio;
    deploy: Array<WilFieldCell>;
  }) {
    this.playerTeamName = define.playerTeamName;
    this.computerTeamName = define.computerTeamName;
    this.background = define.background;
    this.bgm = define.bgm;
    this.deploy = define.deploy;
  }

  /**
   * BGMは同じBGMが再生中なら発生しない
   */
  process() {
    if (this.bgm) {
      this.bgm.play();
    }
  }
}
