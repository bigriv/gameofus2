<template>
  <BasicCanvas
    :width="props.width"
    :height="props.height"
    :objects="diagrams"
  />
  <ImageCanvas
    :width="props.width"
    :height="props.height"
    :objects="images"
    :zIndex="props.zIndex"
  />
  <LottieCanvas
    :width="props.width"
    :height="props.height"
    :objects="lotties"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottieAnimation } from "@/composables/types/visuals/GOULottieAnimation";
import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import LottieCanvas from "@/components/atoms/canvases/LottieCanvas.vue";

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
    default: () => [],
  },
  zIndex: {
    type: Number,
    default: undefined,
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
    .filter((object) => object instanceof GOULottieAnimation)
    .map((object) => object as GOULottieAnimation)
);
</script>
