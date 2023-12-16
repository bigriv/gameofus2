import { GOUEvent } from "@/composables/types/GOUEvent";
import { GOUAnimation } from "@/composables/types/animations/GOUAnimation";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilFieldCell } from "./field";

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
  animations?: Array<GOULottie | GOUAnimation>;
  func?: Function;

  constructor(define: {
    message?: Array<string>;
    sound?: GOUAudio;
    animations?: Array<GOULottie | GOUAnimation>;
    func?: Function;
  }) {
    super({ message: define.message, sound: define.sound });
    this.animations = define.animations;
    this.func = define.func;
  }
}

export class WilDamageEvent {
  cell: WilFieldCell;
  damage: number;
  sound?: GOUAudio;
  constructor(cell: WilFieldCell, damage: number, sound?: GOUAudio) {
    this.cell = cell;
    this.damage = damage;
    this.sound = sound;
  }
}
