export class WrongImplementationError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}
