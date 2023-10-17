<template>
  <div
    class="c-lottie_canvas"
    :style="[canvasStyle, { 'z-index': props.zIndex }]"
  >
    <LottieAnimation
      v-if="object.object"
      :animation-data="object.object"
      :auto-play="true"
      :loop="object.loop"
      :speed="object.speed"
      class="c-lottie_canvas__icon"
      :style="animationStyle"
      :class="animationClass"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
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

const { object } = toRefs(props);
const { canvasStyle, animationStyle, animationClass } = useCanvas(object);
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
