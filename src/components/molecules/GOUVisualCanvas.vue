<template>
  <div :style="{ width: props.width + '%', height: props.height + '%' }">
    <template v-for="object in objects">
      <template v-if="object instanceof GOUDiagram">
        <BasicCanvas :object="object" />
      </template>
      <template v-else-if="object instanceof GOUImage">
        <ImageCanvas :object="object" />
      </template>
      <template v-else-if="object instanceof GOULottie">
        <LottieCanvas :object="object" />
      </template>
      <template v-if="object">
        <GOUVisualCanvas v-if="object.children" :objects="object.children" />
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import LottieCanvas from "@/components/atoms/canvases/LottieCanvas.vue";

const props = defineProps({
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  objects: {
    type: Object as PropType<{ [key: string]: GOUVisual | undefined }>,
  },
});
</script>
