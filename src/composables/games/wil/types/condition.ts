import { WIL_CONDITION_ID } from "../enums/condition";
import { WilCharacter } from "./character";

export class WilCondition {
  current: WIL_CONDITION_ID = WIL_CONDITION_ID.HEALTH;
  turn: number = 0; // 持続ターン数
  static readonly DEFAULT_SUSTAINABLE_TURN = 3;

  constructor() {}

  consume() {
    if (this.current === WIL_CONDITION_ID.HEALTH) {
      return;
    }

    this.turn--;
    if (this.turn <= 0) {
      this.current = WIL_CONDITION_ID.HEALTH;
    }
  }

  isHealth() {
    return this.current === WIL_CONDITION_ID.HEALTH || this.turn <= 0;
  }

  /**
   * 状態異常を上書きし、持続ターン数をリセットする
   * @param newCondition 上書き後の状態異常
   * @returns 上書きに成功した場合はtrue、それ以外はfalse
   */
  overwrite(newCondition: WIL_CONDITION_ID): boolean {
    if (this.current === WIL_CONDITION_ID.HOLY) {
      return false;
    }
    this.current = newCondition;
    this.turn = WilCondition.DEFAULT_SUSTAINABLE_TURN;
    return true;
  }

  // 状態異常開始時に行う処理（主にステータス弱体化）
  // TODO: 戻り値要検討
  static passive(character: WilCharacter) {
    switch (character.condition.current) {
      case WIL_CONDITION_ID.HEALTH:
        return;
      case WIL_CONDITION_ID.BURN:
        // 防御力弱減少
        return;
      case WIL_CONDITION_ID.PARALYSIS:
        // 敏捷性弱減少
        // 攻撃力弱減少
        return;
      case WIL_CONDITION_ID.DEBILITY:
        // 攻撃力弱減少
        // 防御力弱減少
        return;
      case WIL_CONDITION_ID.WEATHERING:
        // 防御力中減少
        return;
      case WIL_CONDITION_ID.MUDDY:
        // 敏捷力中減少
        return;
      case WIL_CONDITION_ID.POISON:
        return;
      case WIL_CONDITION_ID.HOLY:
        return;
    }
  }

  // ターン開始時に行う処理（主にダメージ処理）
  // TODO: 戻り値要検討
  static turnStartEffect(character: WilCharacter) {
    if (character.condition.current === WIL_CONDITION_ID.BURN) {
      // 弱ダメージ
      return;
    }

    return;
  }

  // ターン終了時に行う処理（主にダメージ処理）
  // TODO: 戻り値要検討
  static turnEndEffect(character: WilCharacter) {
    if (character.condition.current === WIL_CONDITION_ID.POISON) {
      // 中ダメージ
    }

    return;
  }

  // 状態異常終了時に行う処理（主にステータス弱体化の戻し）
  // TODO: 戻り値要検討
  static end(character: WilCharacter): void {
    switch (character.condition.current) {
      case WIL_CONDITION_ID.HEALTH:
        return;
      case WIL_CONDITION_ID.BURN:
        const increase = character.defaultStatus.attack * 0.1;
        // 初期値を超えた場合は別のパッシブが働いているとみなすため、超過判定は行わない
        character.status.attack += increase;
        return;
      case WIL_CONDITION_ID.PARALYSIS:
        return;
      case WIL_CONDITION_ID.DEBILITY:
        return;
      case WIL_CONDITION_ID.WEATHERING:
        return;
      case WIL_CONDITION_ID.MUDDY:
        return;
      case WIL_CONDITION_ID.POISON:
        return;
      case WIL_CONDITION_ID.HOLY:
        return;
    }
  }

  getLabel(): string {
    switch (this.current) {
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
}
