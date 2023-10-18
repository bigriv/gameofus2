import GOURotation from "../GOURotation";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "./GOUAnimation";

export class RotateAnimation extends GOUAnimation {
  from: GOURotation;
  to: GOURotation;

  constructor(
    back: boolean,
    ease: ANIMATION_EASING_TYPE,
    duration: number,
    iteration?: number,
    from?: GOURotation,
    to?: GOURotation
  ) {
    super(
      back ? ANIMATION_TYPE.ROTATEBACK : ANIMATION_TYPE.ROTATE,
      ease,
      duration,
      iteration
    );
    this.from = from ?? new GOURotation();
    this.to = to ?? new GOURotation(360, 0);
  }

  style(): { [key: string]: string } {
    return {
      ...super.style(),
      "--rotateFrom": this.from.transform(),
      "--rotateFromOrigin": this.from.transformOrigin(),
      "--rotateTo": this.to.transform(),
      "--rotateToOrigin": this.to.transformOrigin(),
    };
  }
}
