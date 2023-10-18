export enum ANIMATION_TYPE {
  FADEIN = "fadein",
  FADEOUT = "fadeout",
  FLASH = "flash",
  SHAKE = "shake",
  ROTATE = "rotate",
  ROTATEBACK = "rotateback",
  SLIDE = "slide",
}

export enum ANIMATION_EASING_TYPE {
  LINER = "linear",
  EASE = "ease",
  EASE_IN = "ease-in",
  EASE_OUT = "ease-out",
  EASE_IN_OUT = "ease-in-out",
}

export class GOUAnimation {
  readonly type: ANIMATION_TYPE; // アニメーションタイプ
  easing: ANIMATION_EASING_TYPE; // イージングタイプ
  duration: number; // 持続時間(s) 0以下の指定で無限ループ
  iteration: number; // 実行回数
  stop: boolean; // 停止フラグ

  constructor(
    type: ANIMATION_TYPE,
    easing: ANIMATION_EASING_TYPE,
    duration: number,
    iteration?: number
  ) {
    this.type = type;
    this.easing = easing;
    this.duration = duration;
    this.iteration = iteration ?? 1;
    this.stop = false;
  }

  style(): { [key: string]: string } {
    return {
      "--easing": this.easing,
      "--duration": this.duration + "s",
      "--iteration": String(this.iteration),
    };
  }
}
