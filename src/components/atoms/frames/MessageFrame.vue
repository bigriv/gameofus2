<template>
  <div class="c-message_frame" @click="onClick">
    <div class="c-message_frame__messages" :style="styles">
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
import { onMounted, reactive, ref, watch } from "vue";

const props = defineProps({
  fontColor: {
    type: String,
    default: "black",
  },
  backgroundColor: {
    type: String,
    default: undefined,
  },
  borderColor: {
    type: String,
    default: undefined,
  },
  messages: {
    type: Array<string>,
    default: [],
  },
  speed: {
    type: Number,
    default: 1,
  },
});

const emits = defineEmits(["click"]);

const isComplete = ref(false);
const texts = ref(new Array<string>());
const animationPos = reactive({
  row: 0,
  col: 0,
});
const timerId = ref();
const styles = {
  "--backgroundColor": props.backgroundColor,
  "--borderColor": props.borderColor,
  "--fontColor": props.fontColor,
};
const removeInterval = () => {
  if (timerId.value) {
    clearInterval(timerId.value);
    timerId.value = null;
  }
};
const animateTypeWrite = () => {
  removeInterval();
  if (!props.messages?.length || props.messages.length == 0) {
    return;
  }
  isComplete.value = false;
  texts.value = [];
  timerId.value = setInterval(() => {
    texts.value[animationPos.row] = props.messages[animationPos.row].slice(
      0,
      ++animationPos.col
    );
    if (animationPos.col >= props.messages[animationPos.row].length) {
      animationPos.row++;
      animationPos.col = 0;
    }
    if (animationPos.row >= props.messages.length) {
      removeInterval();
      isComplete.value = true;
    }
  }, 100 / props.speed);
};

const onClick = () => {
  if (isComplete.value) {
    emits("click");
    return;
  }
  texts.value = props.messages
  animationPos.row = props.messages.length;
  isComplete.value = true
  removeInterval();
};

onMounted(() => {
  animateTypeWrite();
});
watch(
  () => props.messages,
  () => {
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
  border: 2rem solid var(--borderColor);
  border-radius: 2rem;
  padding: 2rem;
  font-size: 16rem;
  font-family: monospace;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
  &__messages {
    width: 100%;
    height: 100%;
    background-color: var(--backgroundColor);
    border: 2rem solid var(--borderColor);
    color: var(--fontColor);
    border-radius: 2rem;
    padding: 8rem;
    &__text {
      width: fit-content;
      padding-right: 2rem;
      line-height: 1.2;
    }
  }
}
</style>
