<template>
  <div
    class="c-image_canvas"
    :style="[canvasStyle, { 'z-index': `${props.zIndex}` }]"
  >
    <img
      :src="props.object.path"
      :style="animationStyle"
      :class="[animationClass, { 'u-clickable': props.object.isClickable }]"
      @click="onClick"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs, watch } from "vue";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { useCanvas } from "@/composables/hooks/atoms/canvases/useCanvas";

const props = defineProps({
  object: {
    type: Object as PropType<GOUImage>,
    required: true,
  },
  zIndex: {
    type: Number,
    default: undefined,
  },
});

const {object} = toRefs(props)
const { canvasStyle, animationStyle, animationClass } = useCanvas(object.value);
watch(() => object, () => {
  console.log(object.value.animation)
})
const onClick = () => {
  if (!props.object.isClickable) {
    return;
  }
  props.object.onClick();
};
const onMouseEnter = () => {
  if (!props.object.isClickable) {
    return;
  }
  props.object.onMouseEnter();
};
const onMouseLeave = () => {
  if (!props.object.isClickable) {
    return;
  }
  props.object.onMouseLeave();
};
</script>

<style scoped lang="scss">
.c-image_canvas {
  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  user-select: none;
  transform-origin: var(--origin);
  transform: var(--rotate);
  img {
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
  }
}
</style>
