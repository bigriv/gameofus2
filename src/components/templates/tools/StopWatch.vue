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
    default: COLOR.WHITE,
  },
  bgOpacity: {
    type: Number,
    default: 0,
  },
  fontSize: {
    type: Number,
    default: 10,
  },
  fontColor: {
    type: String,
    default: COLOR.BLACK,
  },
  fontWeight: {
    type: String,
    default: "normal",
  },
  fontFamily: {
    type: String,
    default: "メイリオ",
  },
});

const timmer: {
  count: 0;
  isStop: boolean;
} = reactive({
  count: 0,
  isStop: true,
});

const ONE_SECOUND = 1000;
const ONE_MINUTE = ONE_SECOUND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const time = computed(() => {
  // count = 60 * 60 * 1000 * hh + 60 * 1000 * mm + 1000 * ss + ms
  const hh = Math.floor(timmer.count / ONE_HOUR);
  const mm = Math.floor((timmer.count - ONE_HOUR * hh) / ONE_MINUTE);
  const ss = Math.floor(
    (timmer.count - ONE_HOUR * hh - ONE_MINUTE * mm) / ONE_SECOUND
  );
  const ms = Math.floor(
    (timmer.count - ONE_HOUR * hh - ONE_MINUTE * mm - ONE_SECOUND * ss) / 10
  );
  return [
    hh.toString().padStart(2, "0"),
    mm.toString().padStart(2, "0"),
    ss.toString().padStart(2, "0"),
    ms.toString().padStart(2, "0"),
  ].join(":");
});

const styles = computed(() => {
  return {
    "--backgourndColor": new GOUColor(props.bgColor, props.bgOpacity).rgba(),
    "--fontSize": props.fontSize + "px",
    "--fontWeight": props.fontWeight,
    "--fontFamily": props.fontFamily,
    "--fontColor": new GOUColor(props.fontColor).rgba(),
  };
});

let stopInterval = () => {};
const superInterval = (func: () => void, interval: number) => {
  // タイマー実行時に別タブを見るとタイマーがずれるのでWorkerを使用
  try {
    const code = `self.addEventListener('message', msg=>{setInterval(()=>self.postMessage(null), msg.data)})`;
    const worker = new Worker(`data:text/javascript;base64,${btoa(code)}`);
    worker.onmessage = () => func();
    worker.postMessage(interval);
    return { stop: () => worker.terminate() };
  } catch (_) {
    // Worker が使えない場合は setInterval を使う
    const id = setInterval(func, interval);
    return { stop: () => clearInterval(id) };
  }
};
const onStart = () => {
  timmer.isStop = false;
  const { stop } = superInterval(() => {
    if (timmer.isStop) {
      stopInterval();
      return;
    }
    timmer.count += 10;
  }, 10);
  stopInterval = stop;
};

const onStop = () => {
  timmer.isStop = true;
};
const onReset = () => {
  timmer.count = 0;
};
onUnmounted(() => {
  stopInterval();
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
