export class WilStatus {
  static readonly MAX_LIFE = 9999;
  static readonly MAX_STATUS = 99;

  life: number;
  attack: number;
  defense: number;
  speed: number;
  magic: number;
  constructor(define?: {
    life: number;
    attack: number;
    defense: number;
    speed: number;
    magic: number;
  }) {
    this.life = define?.life ?? 0;
    this.attack = define?.attack ?? 0;
    this.defense = define?.defense ?? 0;
    this.speed = define?.speed ?? 0;
    this.magic = define?.magic ?? 0;
  }

  /**
   * 二つのステータスを加算する
   * 非破壊メソッド
   * @param status1 ステータス
   * @param status2 ステータス
   * @returns 加算後のステータス
   */
  static add(status1: WilStatus, status2: WilStatus): WilStatus {
    const result = new WilStatus();
    result.life = status1.life + status2.life;
    if (result.life > WilStatus.MAX_LIFE) {
      result.life = WilStatus.MAX_LIFE;
    }
    result.attack = status1.attack + status2.attack;
    if (result.attack > WilStatus.MAX_STATUS) {
      result.attack = WilStatus.MAX_STATUS;
    }
    result.defense = status1.defense + status2.defense;
    if (result.defense > WilStatus.MAX_STATUS) {
      result.defense = WilStatus.MAX_STATUS;
    }
    result.magic = status1.magic + status2.magic;
    if (result.magic > WilStatus.MAX_STATUS) {
      result.magic = WilStatus.MAX_STATUS;
    }
    result.speed = status1.speed + status2.speed;
    if (result.speed > WilStatus.MAX_STATUS) {
      result.speed = WilStatus.MAX_STATUS;
    }
    return result;
  }

  deepCopy(): WilStatus {
    return new WilStatus({
      life: this.life,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
      magic: this.magic,
    });
  }
  /**
   * 保持データをjson形式に変換する
   * @returns json形式のデータ
   */
  toJson() {
    return {
      life: this.life,
      attack: this.attack,
      defense: this.defense,
      speed: this.speed,
      magic: this.magic,
    };
  }
}
