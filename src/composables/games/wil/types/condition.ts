import { WIL_CONDITION_ID } from "../enums/condition";

export class WilConditionUtil {
  static readonly SUSTAINED_TURN = 3; // 状態異常継続ターン数
  static readonly LITTELE_DECREASE_RATE = 10; // ステータス減少率弱
  static readonly MEDIUM_DECREASE_RATE = 20; // ステータス減少率中
  static readonly LITTELE_DAMAGE_RATE = 10; // ダメージ率弱
  static readonly MEDIUM_DAMAGE_RATE = 20; // ダメージ率中
  static readonly LITTELE_STACK_RATE = 10; // スタック増加率弱
  static readonly MEDIUM_STACK_RATE = 20; // スタック増加率中

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
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、防御力${WilConditionUtil.LITTELE_DECREASE_RATE}%減少+ターン終了時に${WilConditionUtil.LITTELE_DECREASE_RATE}%の被ダメージ`;
      case WIL_CONDITION_ID.PARALYSIS:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、攻撃力${WilConditionUtil.LITTELE_DECREASE_RATE}%減少+行動時に増加するスタック数が${this.LITTELE_DECREASE_RATE}%増加`;
      case WIL_CONDITION_ID.DEBILITY:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、攻撃力${WilConditionUtil.LITTELE_DECREASE_RATE}%減少+防御力${this.LITTELE_DECREASE_RATE}%減少`;
      case WIL_CONDITION_ID.WEATHERING:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、防御力${WilConditionUtil.MEDIUM_DECREASE_RATE}%減少`;
      case WIL_CONDITION_ID.MUDDY:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、行動時に増加するスタック数が${WilConditionUtil.MEDIUM_DECREASE_RATE}%増加`;
      case WIL_CONDITION_ID.POISON:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、ターン終了時に${WilConditionUtil.MEDIUM_DECREASE_RATE}%の被ダメージ`;
      case WIL_CONDITION_ID.HOLY:
        return `${WilConditionUtil.SUSTAINED_TURN}ターンの間、状態異常が上書きされない`;
    }
  }

  /**
   * ステータスの減少値を計算する
   * @param status 現在ステータス
   * @param defaultStatus デフォルトステータス
   * @param rate 減少率
   * @returns 減少値
   */
  static calcDecrease(
    status: number,
    defaultStatus: number,
    rate: number
  ): number {
    const decrease = Math.round(defaultStatus * rate * 0.01);
    if (status - decrease < 0) {
      return status;
    }
    return decrease;
  }
  /**
   * ステータスの上昇値(戻し値)を計算する
   * 初期値を超えた場合は別のパッシブが働いているとみなすため、超過判定は行わない
   * @param status 現在ステータス
   * @param defaultStatus デフォルトステータス
   * @param rate 減少率
   * @returns 上昇値(戻し値)
   */
  static calcIncrease(defaultStatus: number, rate: number): number {
    return Math.round(defaultStatus * rate * 0.01);
  }

  /**
   * 状態異常によるダメージを計算
   * @param defaultLife デフォルトの体力
   * @param rate ダメージ率
   * @returns ダメージ量
   */
  static calcDamage(defaultLife: number, rate: number): number {
    let damage = defaultLife * rate * 0.01;
    // ダメージの最大10%を加算
    damage += damage * Math.random() * 0.1;
    return Math.round(damage);
  }

  /**
   * 状態異常によるスタック数増加量を計算
   * @param cost コスト
   * @param rate 増加率
   * @returns 増加スタック量
   */
  static calcIncreaseStack(cost: number, rate: number): number {
    return Math.round(cost * rate * 0.01);
  }
}
