import { GOUAudio } from "./GOUAudio";

export class GOUReadAudio extends GOUAudio {
  audio: HTMLAudioElement;
  constructor(path: string) {
    super();
    this.audio = new Audio(path);
  }
  play(): void {
    if (this.isPlaying()) {
      this.playing = false;
    }
    this.audio.currentTime = 0;
    this.audio.play();
  }
  stop(): void {
    this.audio.pause();
    this.playing = false;
  }
}
