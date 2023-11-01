<template>
  <div class="c-contents" :style="styles">
    <div class="c-contents__time">
      <span>{{ time }}</span>
    </div>
    <div class="c-contents__buttons">
      <button
        v-if="timmer.isStop"
        class="c-contents__buttons__button c-contents__buttons__button--start"
        @click="onStart"
      >
        スタート
      </button>
      <button
        v-else
        class="c-contents__buttons__button c-contents__buttons__button--stop"
        @click="onStop"
      >
        ストップ
      </button>
      <button
        :disabled="!timmer.isStop"
        class="c-contents__buttons__button c-contents__buttons__button--reset"
        @click="onReset"
      >
        リセット
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import { computed, onUnmounted, reactive } from "vue";


const props = defineProps({
  bgColor: {
    type: String,
    default: COLOR.WHITE
  },
  bgOpacity: {
    type: Number,
    default: 0
  },
  fontSize: {
    type: Number,
    default: 10
  },
  fontColor: {
    type: String,
    default: COLOR.BLACK
  },
  fontWeight: {
    type: String,
    default: "normal"
  },
  fontFamily: {
    type: String,
    default: "メイリオ"
  },
})

const timmer: {
  start: number | undefined;
  current: number | undefined;
  isStop: boolean;
} = reactive({
  start: undefined,
  current: undefined,
  isStop: true,
});
const time = computed(() => {
  if (!timmer.start) {
    return "00:00:00.00";
  }
  if (timmer.current) {
    const diff = timmer.current - timmer.start;
    const ms = Math.floor((diff % 1000) / 10)
      .toString()
      .padStart(2, "0");
    const ss = Math.floor((diff / 1000) % 60)
      .toString()
      .padStart(2, "0");
    const mm = Math.floor((diff / (60 * 1000)) % 60)
      .toString()
      .padStart(2, "0");
    const hh = Math.floor(diff / (60 * 60 * 1000))
      .toString()
      .padStart(2, "0");
    return `${hh}:${mm}:${ss}.${ms}`;
  }
  return "00:00:00.00";
});

const styles = computed(() => {
  return {
    "--backgourndColor": new GOUColor(
      props.bgColor,
      props.bgOpacity
    ).rgba(),
    "--fontSize": props.fontSize + "px",
    "--fontWeight": props.fontWeight,
    "--fontFamily": props.fontFamily,
    "--fontColor": new GOUColor(props.fontColor).rgba(),
  };
});

let intervalId: NodeJS.Timer | undefined = undefined;
const onStart = () => {
  if (!timmer.start) {
    timmer.start = Date.now();
  }
  timmer.isStop = false;
  intervalId = setInterval(() => {
    if (timmer.isStop) {
      clearInterval(intervalId);
      return;
    }
    timmer.current = Date.now();
  }, 10);
};

const onStop = () => {
  timmer.isStop = true;
  timmer.current = Date.now();
};
const onReset = () => {
  timmer.start = undefined;
  timmer.current = undefined;
};
onUnmounted(() => {
  clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.c-contents {
  background-color: var(--backgourndColor);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  &__time {
    align-self: center;
    padding: 5px;
    > span {
      letter-spacing: 0.1em;
      font-size: var(--fontSize);
      font-weight: var(--fontWeight);
      color: var(--fontColor);
      font-family: var(--fontFamily);
    }
  }
  &__buttons {
    display: flex;
    flex-wrap: wrap;
    &__button {
      cursor: pointer;
      width: 100px;
      height: 40px;
      &:hover {
        opacity: 0.8;
      }
      &:active {
        opacity: 1;
      }
      &:disabled {
        background-color: lightgray;
        cursor: not-allowed;
        &:hover {
          opacity: 1;
        }
        &:active {
          opacity: 1;
        }
      }
      &--start {
        background-color: springgreen;
      }
      &--stop {
        background-color: red;
      }
      &--reset {
        background-color: yellow;
      }
    }
  }
}
</style>
