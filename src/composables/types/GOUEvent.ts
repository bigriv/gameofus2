import { GOUAnimation } from "./animations/GOUAnimation";
import { GOUAudio } from "./audio/GOUAudio";
import { GOULottie } from "./visuals/GOULottie";

/**
 * イベントクラス
 */
export class GOUEvent {
  readonly message?: Array<string>; // 改行部分で要素を区切るため配列とする
  readonly sound?: GOUAudio;
  readonly animation?: GOUAnimation | GOULottie;

  constructor(define: {
    message?: Array<string>;
    sound?: GOUAudio;
    animation?: GOUAnimation | GOULottie;
  }) {
    this.message = define.message;
    this.sound = define.sound;
    this.animation = define.animation;
  }
}
