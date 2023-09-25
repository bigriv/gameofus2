<template>
  <div
    class="c-lottie_canvas"
    :style="{
      width: props.width + 'rem',
      height: props.height + 'rem',
    }"
  >
    <template v-for="object in props.objects">
      <LottieAnimation
        v-if="object.object"
        :animation-data="object.object"
        :auto-play="true"
        :loop="true"
        :speed="1"
        class="c-lottie_canvas__icon"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { GOULottieAnimation } from "@/composables/types/visuals/GOULottieAnimation";
import { LottieAnimation } from "lottie-web-vue";

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
    type: Array<GOULottieAnimation>,
    default: () => [],
  },
});
</script>

<style scoped lang="scss">
.c-lottie_canvas {
  position: relative;
  &__icon {
    position: absolute;
  }
}
</style>
