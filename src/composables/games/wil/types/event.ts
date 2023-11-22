import { GOUEvent } from "@/composables/types/GOUEvent";
import { GOUAnimation } from "@/composables/types/animations/GOUAnimation";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";

export class WilTalkEvent extends GOUEvent {
  talker?: string;

  constructor(define: {
    talker?: string;
    message?: Array<string>;
    sound?: GOUAudio;
  }) {
    super(define);
    this.talker = define.talker;
  }
}

export class WilBattleEvent extends GOUEvent {
  constructor(define: {
    message?: Array<string>;
    sound?: GOUAudio;
    characterAnimation?: GOUAnimation;
    skillEffect?: GOULottie;
  }) {
    super({
      message: define.message,
      sound: define.sound,
    });
  }
}
