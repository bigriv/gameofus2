export class WasItem {
  name: string;
  passive?: Function; // パッシブ効果
  beforeEffect?: Function; // ターン開始時に発動する効果（速度の補正など）
  effect?: Function; // メイン効果
  afterEffect?: Function; // ターン終了時に発動する効果（ステータスのリセットなど）

  constructor(
    name: string,
    passive?: Function,
    beforeEffect?: Function, // ターン開始時に発動する効果（速度の補正など）
    effect?: Function,
    afterEffect?: Function // ターン終了時に発動する効果（ステータスのリセットなど）
  ) {
    this.name = name;
    this.passive = passive;
    this.beforeEffect = beforeEffect;
    this.effect = effect;
    this.afterEffect = afterEffect;
  }
}
