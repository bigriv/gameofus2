type animationType = "fadein" | "fadeout" | "flash" | "shake";

export class GOUAnimation {
  type: animationType; // アニメーションタイプ
  duration: number; // 持続時間(s) 0以下の指定で無限ループ
  iteration: number; // 実行回数
  stop: boolean; // 停止フラグ
  constructor(type: animationType, duration: number, iteration?: number) {
    this.type = type;
    this.duration = duration;
    this.iteration = iteration ?? 1;
    this.stop = false;
  }
}
