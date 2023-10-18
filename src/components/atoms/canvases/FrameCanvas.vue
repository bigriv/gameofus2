<template>
  <div
    class="c-frame_canvas"
    :style="[canvasStyle, { 'z-index': `${object.zIndex}` }]"
  >
    <div
      :style="animationStyle"
      class="c-frame_canvas__content"
      :class="[animationClass, { 'u-clickable': object.isClickable }]"
      @click="onClick"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from "vue";
import { useCanvas } from "@/composables/hooks/atoms/canvases/useCanvas";
import GOUFrame from "@/composables/types/visuals/GOUFrame";

const props = defineProps({
  object: {
    type: Object as PropType<GOUFrame>,
    required: true,
  },
});

const { object } = toRefs(props);
const { canvasStyle, animationStyle, animationClass } = useCanvas(object);

const onClick = () => {
  if (!object.value.isClickable) {
    return;
  }
  object.value.onClick();
};
const onMouseEnter = () => {
  if (!object.value.isClickable) {
    return;
  }
  object.value.onMouseEnter();
};
const onMouseLeave = () => {
  if (!object.value.isClickable) {
    return;
  }
  object.value.onMouseLeave();
};
</script>

<style scoped lang="scss">
.c-frame_canvas {
  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  transform-origin: var(--origin);
  transform: var(--rotate);
  &__content {
    width: 100%;
    height: 100%;
  }
}
</style>
