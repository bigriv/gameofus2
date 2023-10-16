/**
 * イベントクラス
 */
class GOUEvent {
  sound: string; // 効果音のファイルパス
  func: Function; // 実行する処理
  condition: Function; // 実行条件

  constructor(sound?: string, func?: Function, condition?: Function) {
    this.sound = sound ?? "";
    this.func = func ?? function () {};
    this.condition =
      condition ??
      function () {
        return true;
      };
  }

  // 処理の実行
  execute(): void {
    if (!this.condition()) {
      return;
    }
    this.func();
  }
}

export default GOUEvent;
