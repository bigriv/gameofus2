<template>
  <div
    class="c-image_canvas"
    :style="{
      '--width': props.width,
      '--height': props.height,
      'z-index': props.zIndex,
    }"
  >
    <template v-for="image in props.objects">
      <template v-if="(image instanceof GOUImage)">
        <img
          v-if="image.isClickable"
          :src="image.path"
          :style="{
            '--x': image.position.px,
            '--y': image.position.py,
            '--width': image.width,
            '--height': image.height,
            '--duration': image.animation?.duration + 's',
            '--iteration': image.animation?.iteration,
          }"
          :class="
            !image.animation
              ? ''
              : [
                  `a-${image.animation?.type}`,
                  { 'a-infinite': image.animation?.iteration <= 0 },
                ]
          "
          class="u-clickable"
          @click="image.onClick()"
          @mouseenter="image.onMouseEnter()"
          @mouseleave="image.onMouseLeave()"
        />
        <img
          v-else
          :src="image.path"
          :style="{
            '--x': image.position.px,
            '--y': image.position.py,
            '--width': image.width,
            '--height': image.height,
            '--duration': image.animation?.duration + 's',
            '--iteration': image.animation?.iteration,
          }"
          :class="
            !image.animation
              ? ''
              : [
                  `a-${image.animation?.type}`,
                  { 'a-infinite': image.animation?.iteration <= 0 },
                ]
          "
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import GOUImage from "@/composables/types/visuals/GOUImage";

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  objects: {
    type: Array<GOUImage>,
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
  width: calc(var(--width) * 1rem);
  height: calc(var(--height) * 1rem);
  user-select: none;
  img {
    position: absolute;
    top: calc(var(--y) * 1%);
    left: calc(var(--x) * 1%);
    width: calc(var(--width) * 1%);
    height: calc(var(--height) * 1%);
  }
}
</style>
