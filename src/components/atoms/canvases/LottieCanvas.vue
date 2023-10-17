<template>
  <div
    class="c-lottie_canvas"
    :style="[canvasStyle, { 'z-index': props.zIndex }]"
  >
    <LottieAnimation
      v-if="props.object.object"
      :animation-data="props.object.object"
      :auto-play="true"
      :loop="props.object.loop"
      :speed="props.object.speed"
      class="c-lottie_canvas__icon"
      :style="animationStyle"
      :class="animationClass"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { LottieAnimation } from "lottie-web-vue";
import { useCanvas } from "@/composables/hooks/atoms/canvases/useCanvas";

const props = defineProps({
  object: {
    type: Object as PropType<GOULottie>,
    required: true,
  },
  zIndex: {
    type: Number,
    default: undefined,
  },
});

const { canvasStyle, animationStyle, animationClass } = useCanvas(props.object);
</script>

<style scoped lang="scss">
.c-lottie_canvas {
  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  &__icon {
    width: 100%;
    height: 100%;
  }
}
</style>
