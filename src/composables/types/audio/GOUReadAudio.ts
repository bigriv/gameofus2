import { GOUAudio } from "./GOUAudio";

export class GOUReadAudio extends GOUAudio {
  readonly path: string;
  audio?: HTMLAudioElement;
  loop: boolean;
  private volume: number = 0.1;

  constructor(path: string, loop?: boolean) {
    super();
    this.path = path;
    this.loop = loop ?? false;
  }

  /**
   * 音声ファイルを取得する
   * @returns
   */
  load(): GOUReadAudio {
    if (this.audio) {
      console.log(`The Audio ${this.path} is already loaded.`);
      return this;
    }
    this.audio = new Audio(this.path);
    return this;
  }

  /**
   * 音声ファイルがロードされているかを判定する
   * @returns ロード済みならtrue、それ以外はfalseを返す
   */
  isLoaded(): boolean {
    if (!this.audio) {
      return false;
    }
    return this.audio.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA;
  }

  /**
   * 音声ファイルを再生する
   * @param position 再生位置
   */
  play(position?: number): void {
    if (!this.isLoaded()) {
      return;
    }
    if (this.isPlaying()) {
      this.playing = false;
    }
    this.audio!.loop = this.loop;
    this.audio!.volume = this.volume;
    this.audio!.currentTime = position ?? 0;
    this.audio!.play();
    this.playing = true;
  }

  /**
   * 音声ファイルの再生を停止する
   * @returns
   */
  stop(): void {
    if (!this.isLoaded()) {
      return;
    }
    if (!this.isPlaying()) {
      return;
    }
    this.audio!.pause();
    this.playing = false;
  }

  setVolume(volume: number) {
    // ロード前でも音量を設定できるように値を保持しておく
    this.volume = volume;
    if (!this.audio) {
      return;
    }
    this.audio.volume = volume;
  }
}
