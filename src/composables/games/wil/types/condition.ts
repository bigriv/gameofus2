import { WIL_CONDITION_ID } from "../enums/condition";

export class WilConditionUtil {
  static readonly SUSTAINED_TURN = 3;
  static readonly LITTELE_DECREASE = 10;
  static readonly MEDIUM_DECREASE = 20;
  /**
   * 状態異常の表示名を取得する
   * @param id 状態異常ID
   * @returns 状態異常の表示名
   */
  static getLabel(id: WIL_CONDITION_ID): string {
    switch (id) {
      case WIL_CONDITION_ID.HEALTH:
        return "健康";
      case WIL_CONDITION_ID.BURN:
        return "火傷";
      case WIL_CONDITION_ID.PARALYSIS:
        return "麻痺";
      case WIL_CONDITION_ID.DEBILITY:
        return "衰弱";
      case WIL_CONDITION_ID.WEATHERING:
        return "風化";
      case WIL_CONDITION_ID.MUDDY:
        return "泥々";
      case WIL_CONDITION_ID.POISON:
        return "被毒";
      case WIL_CONDITION_ID.HOLY:
        return "神聖";
    }
  }

  static getDescription(id: WIL_CONDITION_ID): string {
    switch (id) {
      case WIL_CONDITION_ID.HEALTH:
        return "影響なし";
      case WIL_CONDITION_ID.BURN:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、防御力${WilConditionUtil.LITTELE_DECREASE}%減少+ターン終了時に${WilConditionUtil.LITTELE_DECREASE}%の被ダメージ`;
      case WIL_CONDITION_ID.PARALYSIS:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、攻撃力${WilConditionUtil.LITTELE_DECREASE}%減少+ターン終了時に次のターンまでのスタックを${this.LITTELE_DECREASE}%増加`;
      case WIL_CONDITION_ID.DEBILITY:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、攻撃力${WilConditionUtil.LITTELE_DECREASE}%減少+防御力${this.LITTELE_DECREASE}%減少`;
      case WIL_CONDITION_ID.WEATHERING:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、防御力${WilConditionUtil.MEDIUM_DECREASE}%減少`;
      case WIL_CONDITION_ID.MUDDY:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、ターン終了時に次のターンまでのスタックを${WilConditionUtil.MEDIUM_DECREASE}%増加`;
      case WIL_CONDITION_ID.POISON:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、ターン終了時に${WilConditionUtil.MEDIUM_DECREASE}%の被ダメージ`;
      case WIL_CONDITION_ID.HOLY:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、状態異常が上書きされない`;
    }
  }
}
