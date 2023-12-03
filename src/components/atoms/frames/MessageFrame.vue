<template>
  <div
    class="c-message_frame"
    :class="{ 'u-clickable': props.clickable }"
    :style="styles"
    @click="onClick"
  >
    <div class="c-message_frame__messages">
      <slot>
        <div
          v-for="(text, index) in texts"
          :key="index"
          class="c-message_frame__messages__text"
        >
          {{ text }}
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GOUColor } from "@/composables/types/GOUColor";
import {
  PropType,
  computed,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";

const props = defineProps({
  // 文字色
  fontColor: {
    type: String,
    default: "black",
  },
  // 背景色（未指定で透明）
  backgroundColor: {
    type: GOUColor,
    default: undefined,
  },
  // 枠線の色（未指定で透明）
  borderColor: {
    type: GOUColor,
    default: undefined,
  },
  // メッセージのリスト（1要素につき1行を表示）
  messages: {
    type: Array<string>,
    default: [],
  },
  // 表示完了フラグ
  complete: {
    type: Boolean,
    default: false,
  },
  // 表示速度(100msを基準とした速度倍率)
  speed: {
    type: Number,
    default: 1,
  },
  // メッセージ開始の遅延(s)
  delay: {
    type: Number,
    default: 0,
  },
  // クリック可否
  clickable: {
    type: Boolean,
    default: false,
  },
  // 縦方向の文字の揃え位置
  vertical: {
    type: String as PropType<"start" | "center" | "end">,
    default: "start",
  },
  // 横方向の文字の揃え位置
  horizontal: {
    type: String as PropType<"start" | "center" | "end">,
    default: "start",
  },
});

const emits = defineEmits(["click", "update:complete"]);

const isComplete = computed({
  get: () => props.complete,
  set: (newValue: Boolean) => emits("update:complete", newValue),
});
const texts = ref(new Array<string>());
const animationPos = reactive({
  row: 0,
  col: 0,
});
let intervalId: NodeJS.Timer | undefined = undefined;
let timpeoutId: NodeJS.Timer | undefined = undefined;

const styles = {
  "--backgroundColor": props.backgroundColor?.rgba(),
  "--borderColor": props.borderColor?.rgba(),
  "--fontColor": props.fontColor,
  "--vertical": props.vertical,
  "--horizontal": props.horizontal,
};

const animateTypeWrite = () => {
  clearInterval(intervalId);
  clearTimeout(timpeoutId);
  if (!props.messages?.length || props.messages.length == 0) {
    return;
  }
  texts.value = new Array(props.messages.length);
  intervalId = setInterval(() => {
    if (isComplete.value) {
      clearInterval(intervalId);
      return;
    }
    texts.value[animationPos.row] = props.messages[animationPos.row].slice(
      0,
      ++animationPos.col
    );
    if (animationPos.col >= props.messages[animationPos.row].length) {
      animationPos.row++;
      animationPos.col = 0;
    }
    if (animationPos.row >= props.messages.length) {
      clearInterval(intervalId);
      isComplete.value = true;
    }
  }, 100 / props.speed);
};

const onClick = () => {
  if (isComplete.value) {
    emits("click");
    return;
  }
  clearInterval(intervalId);
  clearTimeout(timpeoutId);
  texts.value = props.messages;
  animationPos.row = props.messages.length - 1;
  isComplete.value = true;
};

onMounted(() => {
  if (props.complete) {
    texts.value = props.messages;
    animationPos.row = props.messages.length - 1;
    return;
  }

  if (props.delay > 0) {
    timpeoutId = setTimeout(animateTypeWrite, props.delay * 1000);
  } else {
    animateTypeWrite();
  }
});
onUnmounted(() => {
  clearInterval(intervalId);
  clearTimeout(timpeoutId);
});
watch(
  () => props.messages,
  () => {
    if (isComplete.value) {
      texts.value = props.messages;
      animationPos.row = props.messages.length - 1;
      return;
    }
    animationPos.row = 0;
    animationPos.col = 0;
    animateTypeWrite();
  }
);
</script>

<style scoped lang="scss">
.c-message_frame {
  width: 100%;
  height: 100%;
  border: 2px solid var(--borderColor);
  border-radius: 2px;
  font-size: 100%;
  font-family: "DotGothic16";
  font-weight: normal;
  user-select: none;
  &__messages {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: var(--vertical);
    align-content: var(--horizontal);
    width: 100%;
    height: 100%;
    background-color: var(--backgroundColor);
    color: var(--fontColor);
    border-radius: 2px;
    padding: 2%;
    &__text {
      width: fit-content;
      padding-right: 2px;
      line-height: 1.2;
    }
  }
}
</style>
