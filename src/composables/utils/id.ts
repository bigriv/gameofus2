export const uuidFormat =
  "[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}";

export const generateUuid = () => {
  return "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/x/g, function () {
    return Math.floor(Math.random() * 16).toString(16);
  });
};

export class SequenceId {
  private id: number;
  readonly start: number;
  readonly intarval: number;
  constructor(start?: number, intarval?: number) {
    this.id = (start ?? 0) - 1;
    this.start = (start ?? 0) - 1;
    this.intarval = intarval ?? 1;
  }

  generateId() {
    this.id += this.intarval;
    return this.id;
  }
  restart() {
    this.id = this.start;
  }
}
