import { WAS_ITEM_ID } from "@/composables/games/was/const";

export class WasItem {
  id: WAS_ITEM_ID;
  name: string;
  maxAmount: number; // 所持可能数
  passive?: Function; // パッシブ効果
  beforeEffect?: Function; // ターン開始時に発動する効果（速度の補正など）
  effect?: Function; // メイン効果
  afterEffect?: Function; // ターン終了時に発動する効果（ステータスのリセットなど）

  constructor(
    id: WAS_ITEM_ID,
    name: string,
    maxAmount: number,
    passive?: Function,
    beforeEffect?: Function, // ターン開始時に発動する効果（速度の補正など）
    effect?: Function,
    afterEffect?: Function // ターン終了時に発動する効果（ステータスのリセットなど）
  ) {
    this.id = id;
    this.name = name;
    this.maxAmount = maxAmount;
    this.passive = passive;
    this.beforeEffect = beforeEffect;
    this.effect = effect;
    this.afterEffect = afterEffect;
  }
}
