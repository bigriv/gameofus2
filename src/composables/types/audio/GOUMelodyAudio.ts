import { GOUAudio } from "@/composables/types/audio/GOUAudio";

export class GOUMelodyAudio extends GOUAudio {
  private static MUSICAL_SALE: { [index: string]: number } = {
    a: 67.323,
    b: 71.326,
    c: 75.567,
    d: 80.061,
    e: 84.822,
    f: 89.865,
    g: 95.209,
    h: 100.87,
    i: 106.869,
    j: 113.223,
    k: 119.956,
    l: 127.089,
  };
  private audio: AudioContext;
  private oscillatorNode?: OscillatorNode;
  private gainNode?: GainNode;
  private position: number;
  private intervalId?: NodeJS.Timer;
  melody: string;
  speed: number;
  constructor(melody?: string, speed?: number) {
    super();
    this.audio = new ((<any>window).AudioContext ||
      (<any>window).webkitAudioContext)();
    this.melody = melody ?? "";
    this.position = 0;
    this.speed = speed ?? 1;
  }
  play() {
    if (this.isPlaying()) {
      return;
    }
    this.oscillatorNode = this.audio.createOscillator();
    this.gainNode = this.audio.createGain();
    this.gainNode.gain.value = 0.1;
    this.oscillatorNode.connect(this.gainNode).connect(this.audio.destination);
    this.changeMusicalScale();
    this.oscillatorNode.start();
    this.intervalId = setInterval(() => {
      this.changeMusicalScale();
    }, 1000 / 4 / this.speed);
    this.playing = true;
  }

  stop(): void {
    if (!this.oscillatorNode) {
      return;
    }
    if (!this.isPlaying()) {
      return;
    }
    clearInterval(this.intervalId);
    this.oscillatorNode.stop();
    this.playing = false;
  }

  private changeMusicalScale(): void {
    if (!this.oscillatorNode) {
      return;
    }
    if (!this.melody) {
      return;
    }
    if (this.position > this.melody.length - 2) {
      this.position = 0;
      this.stop();
    }
    const unitFrequency = this.melody[this.position];
    const octave = Number("0x" + this.melody[this.position + 1]);
    if (!unitFrequency) {
      return;
    }
    if ((!octave && octave != 0) || Number.isNaN(octave)) {
      return;
    }
    this.oscillatorNode.frequency.value =
      GOUMelodyAudio.MUSICAL_SALE[unitFrequency] * octave;
    this.position += 2;
  }
}
