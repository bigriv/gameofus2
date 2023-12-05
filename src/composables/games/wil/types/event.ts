import { GOUEvent } from "@/composables/types/GOUEvent";
import { GOUAnimation } from "@/composables/types/animations/GOUAnimation";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

export class WilTalkEvent extends GOUEvent {
  talker?: string;
  background?: GOUVisual;
  left?: GOUVisual;
  right?: GOUVisual;

  constructor(define: {
    talker?: string;
    background?: GOUVisual;
    message?: Array<string>;
    sound?: GOUAudio;
    left?: GOUVisual;
    right?: GOUVisual;
  }) {
    super(define);
    this.talker = define.talker;
    this.background = define.background;
    this.left = define.left;
    this.right = define.right;
  }
}

export class WilBattleEvent extends GOUEvent {
  characterAnimation?: GOUAnimation;
  skillEffect?: GOULottie;

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
    this.characterAnimation = define.characterAnimation;
    this.skillEffect = define.skillEffect;
  }
}
