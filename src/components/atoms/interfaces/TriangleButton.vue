<template>
  <button
    class="c-triangle_button"
    :disabled="props.disabled"
    :style="styles"
    @click="onClick"
    @mouseup="isClick = false"
    @mousedown="isClick = true"
    @touchstart="isTouch = true"
    @touchend="isTouch = false"
    @mouseenter="isMouseEnter = true"
    @mouseleave="isMouseEnter = false"
  ></button>
</template>

<script setup lang="ts">
import { PropType, computed, ref, watch } from "vue";
import { GOUColor } from "@/composables/types/GOUColor";

const props = defineProps({
  color: {
    type: Object as PropType<GOUColor>,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  rotate: {
    type: Number,
    defaut: 0,
  },
  mousedownEvent: {
    type: Function,
    default: undefined,
  },
});

const emits = defineEmits(["click", "mouseup", "mousedown"]);

const isMouseEnter = ref(false);
const isClick = ref(false);
const isTouch = ref(false);
const styles = computed(() => {
  return {
    "--color": props.color.rgba(),
    "--rotate": props.rotate + "deg",
  };
});
const onClick = () => {
  emits("click");
};

watch(
  () => [isMouseEnter.value, isClick.value, isTouch.value],
  () => {
    if ((isMouseEnter.value && isClick.value) || isTouch.value) {
      emits("mousedown");
    } else {
      isClick.value = false;
      emits("mouseup");
    }
  }
);
</script>

<style scoped lang="scss">
.c-triangle_button {
  touch-action: manipulation;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-user-select:none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: var(--color);
  rotate: var(--rotate);
  transform-origin: 50% 50%;
  clip-path: polygon(0 100%, 50% 0, 100% 100%);
  border: none;
  &:hover {
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      opacity: 0.2;
      background: black;
    }
  }
}
</style>
