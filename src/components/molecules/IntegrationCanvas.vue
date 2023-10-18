<template>
  <BasicCanvas v-for="diagram in diagrams" :object="diagram" />
  <ImageCanvas v-for="image in images" :object="image" />
  <LottieCanvas v-for="lottie in lotties" :object="lottie" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import LottieCanvas from "@/components/atoms/canvases/LottieCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";

const props = defineProps({
  objects: {
    type: Array<GOUVisual>,
    default: () => [],
  },
});

const diagrams = computed(() =>
  props.objects
    .filter((object) => object instanceof GOUDiagram)
    .map((object) => object as GOUDiagram)
);
const images = computed(() =>
  props.objects
    .filter((object) => object instanceof GOUImage)
    .map((object) => object as GOUImage)
);
const lotties = computed(() =>
  props.objects
    .filter((object) => object instanceof GOULottie)
    .map((object) => object as GOULottie)
);
</script>
