export class WilStatus {
  life: number;
  attack: number;
  defense: number;
  speed: number;
  magic: number;
  constructor(define: {
    life: number;
    attack: number;
    defense: number;
    speed: number;
    magic: number;
  }) {
    this.life = define.life;
    this.attack = define.attack;
    this.defense = define.defense;
    this.speed = define.speed;
    this.magic = define.magic;
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
