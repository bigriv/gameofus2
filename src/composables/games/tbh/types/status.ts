export class TbhStatus {
  life: number;
  power: number;

  constructor(status?: { life: number; power: number }) {
    this.life = status?.life ?? 0;
    this.power = status?.power ?? 0;
  }

  toJson() {
    return {
      life: this.life,
      power: this.power,
    };
  }
}
