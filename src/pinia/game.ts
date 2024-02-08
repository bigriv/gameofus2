import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => {
    return {
      images: {} as { [key: string]: GOUVisual },
      sounds: {} as { [key: string]: GOUAudio },
    };
  },
  actions: {
    setImages(images: { [key: string]: GOUVisual }) {
      this.images = images;
    },
    setSounds(sounds: { [key: string]: GOUAudio }) {
      this.sounds = sounds;
    },
    resetImages() {
      this.images = {};
    },
    resetSounds() {
      this.sounds = {};
    },
  },
  getters: {
    getImages: (state) => {
      return state.images;
    },
    getSounds: (state) => {
      return state.sounds;
    },
  },
});
