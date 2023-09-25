export abstract class GOUAudio {
  protected playing: boolean;
  constructor() {
    this.playing = false;
  }
  abstract play(): void;
  abstract stop(): void;
  isPlaying(): boolean {
    return this.playing;
  }
}
