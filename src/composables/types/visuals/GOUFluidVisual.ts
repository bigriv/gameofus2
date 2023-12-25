import GOUVisual from "./GOUVisual";

export class GOUFluidVisual {
  readonly defaultVisual?: GOUVisual;
  current?: GOUVisual;
  private sequense: number = -1;
  loop: boolean = false;
  private isStop: boolean = false;
  private timeoutId?: NodeJS.Timeout;

  readonly visuals: Array<{
    visual: GOUVisual; // 表示するオブジェクト
    duration: number; // 持続時間(s)
  }>;

  constructor(
    visuals: Array<{
      visual: GOUVisual;
      duration: number;
    }>,
    defaultVisual?: GOUVisual
  ) {
    this.visuals = visuals;
    this.defaultVisual = defaultVisual;
  }

  start() {
    this.sequense = -1;
    this.isStop = false;
    this.process();
  }
  stop() {
    this.isStop = true;
    clearTimeout(this.timeoutId);
  }
  process() {
    if (this.isStop) {
      return;
    }
    this.sequense++;
    if (this.sequense >= this.visuals.length) {
      if (!this.loop) {
        this.stop();
        return;
      }
      this.sequense = 0;
    }
    this.current = this.visuals[this.sequense].visual;
    this.timeoutId = setTimeout(() => {
      this.process();
    }, this.visuals[this.sequense].duration * 1000);
  }
}
