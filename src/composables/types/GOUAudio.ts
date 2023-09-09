class GOUAudio {
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
  private oscillator?: OscillatorNode;
  private gain?: GainNode;
  private playing: boolean;
  private intervalId?: NodeJS.Timer;
  melody?: string;
  base?: string;
  private position: number;
  speed: number;
  constructor(melody?: string, speed?: number) {
    this.audio = new ((<any>window).AudioContext ||
      (<any>window).webkitAudioContext)();
    this.melody = melody;
    this.playing = false;
    this.position = 0;
    this.speed = speed ?? 1;
  }
  play(): void {
    if (this.isPlaying()) {
      return;
    }
    this.oscillator = this.audio.createOscillator();
    this.gain = this.audio.createGain();
    this.gain.gain.value = 0.1;
    this.oscillator.connect(this.gain).connect(this.audio.destination);
    this.changeMusicalScale();
    this.oscillator.start();
    this.intervalId = setInterval(() => {
      this.changeMusicalScale();
    }, 1000 / 4 / this.speed);
    this.playing = true;
  }
  stop(): void {
    if (!this.oscillator) {
      return;
    }
    if (!this.isPlaying()) {
      return;
    }
    clearInterval(this.intervalId);
    this.oscillator.stop();
    this.playing = false;
  }
  isPlaying(): boolean {
    return this.playing;
  }

  private changeMusicalScale(): void {
    if (!this.oscillator) {
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
    this.oscillator.frequency.value =
      GOUAudio.MUSICAL_SALE[unitFrequency] * octave;
    this.position += 2;
  }
}

export default GOUAudio;
