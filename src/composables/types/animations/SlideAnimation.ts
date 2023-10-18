import GOUPosition from "@/composables/types/GOUPosition";
import { ANIMATION_EASING_TYPE, ANIMATION_TYPE, GOUAnimation } from "@/composables/types/animations/GOUAnimation";

export class SlideAnimation extends GOUAnimation {
  from: GOUPosition;
  to: GOUPosition;

  constructor(
    duration: number,
    ease: ANIMATION_EASING_TYPE,
    iteration?: number,
    from?: GOUPosition,
    to?: GOUPosition
  ) {
    super(ANIMATION_TYPE.SLIDE, ease, duration, iteration);
    this.from = from ?? new GOUPosition();
    this.to = to ?? new GOUPosition(100, 100);
  }

  style(): { [key: string]: string } {
    return {
      ...super.style(),
      "--slideFrom": this.from.transform(),
      "--slideTo": this.to.transform(),
    };
  }
}
