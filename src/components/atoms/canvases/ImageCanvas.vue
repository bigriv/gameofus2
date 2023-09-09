<template>
  <div
    class="c-image_canvas"
    :style="{
      '--width': props.width,
      '--height': props.height,
      'z-index': props.zIndex,
    }"
  >
    <template v-for="image in images">
      <template v-if="(image.shape instanceof GOUImage)">
        <img
          v-if="image instanceof ClickableVisual && image.isClickable"
          :src="image.shape.path"
          :style="{
            '--x': image.position.px,
            '--y': image.position.py,
            '--width': image.shape.width,
            '--height': image.shape.height,
          }"
          class="u-clickable"
          @click="image.onClick()"
          @mouseenter="image.onMouseEnter()"
          @mouseleave="image.onMouseLeave()"
        />
        <img
          v-else
          :src="image.shape.path"
          :style="{
            '--x': image.position.px,
            '--y': image.position.py,
            '--width': image.shape.width,
            '--height': image.shape.height,
          }"
        />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import GOUImage from "@/composables/types/shapes/GOUImage";
import ClickableVisual from "@/composables/types/visuals/ClickableVisual";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { computed } from "vue";

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
    type: Array<GOUVisual>,
    required: true,
  },
  zIndex: {
    type: Number,
    default: undefined,
  },
});
const images = computed(() => {
  return props.objects.filter((object) => object.shape instanceof GOUImage);
});
</script>

<style scoped lang="scss">
.c-image_canvas {
  position: relative;
  width: calc(var(--width) * 1rem);
  height: calc(var(--height) * 1rem);
  user-select: none;
  img {
    position: absolute;
    top: calc(var(--y) * 1rem);
    left: calc(var(--x) * 1rem);
    width: calc(var(--width) * 1rem);
    height: calc(var(--height) * 1rem);
  }
}
</style>
