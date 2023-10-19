import { defineStore } from "pinia";

export const useDisplayStore = defineStore("display", {
  state: () => {
    return {
      reflesh: false,
    };
  },
  actions: {
    refleshStart() {
      this.reflesh = true;
    },
    refleshEnd() {
      this.reflesh = false;
    },
  },
  getters: {
    isReflesh: (state) => {
      return state.reflesh;
    },
  },
});
