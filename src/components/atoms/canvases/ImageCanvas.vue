<template>
  <div
    class="c-image_canvas"
    :style="{
      '--x': props.object.position.px,
      '--y': props.object.position.py,
      '--width': props.object.width,
      '--height': props.object.height,
      'z-index': props.zIndex,
    }"
  >
    <img
      v-if="props.object.isClickable"
      :src="props.object.path"
      :style="{
        '--duration': props.object.animation?.duration + 's',
        '--iteration': props.object.animation?.iteration,
      }"
      :class="
        !props.object.animation
          ? ''
          : [
              `a-${props.object.animation?.type}`,
              { 'a-infinite': props.object.animation?.iteration <= 0 },
            ]
      "
      class="u-clickable"
      @click="props.object.onClick()"
      @mouseenter="props.object.onMouseEnter()"
      @mouseleave="props.object.onMouseLeave()"
    />
    <img
      v-else
      :src="props.object.path"
      :style="{
        '--duration': props.object.animation?.duration + 's',
        '--iteration': props.object.animation?.iteration,
      }"
      :class="
        !props.object.animation
          ? ''
          : [
              `a-${props.object.animation?.type}`,
              { 'a-infinite': props.object.animation?.iteration <= 0 },
            ]
      "
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import GOUImage from "@/composables/types/visuals/GOUImage";

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
</script>

<style scoped lang="scss">
.c-image_canvas {
  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  width: calc(var(--width) * 1%);
  height: calc(var(--height) * 1%);
  user-select: none;
  img {
    width: 100%;
    height: 100%;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
  }
}
</style>
