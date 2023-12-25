<template>
  <div :style="{ width: props.width + '%', height: props.height + '%' }">
    <template v-for="object in objects">
      <template v-if="(object instanceof GOUFluidVisual)">
        <GOUFluidVisualCanvas :object="object" />
      </template>
      <template v-else-if="(object instanceof GOUVisual)">
        <template v-if="(object instanceof GOUFrame)">
          <FrameCanvas :object="object">
            <GOUVisualCanvas
              v-if="object.children"
              :objects="object.children"
            />
          </FrameCanvas>
        </template>
        <template v-else-if="(object instanceof GOUDiagram)">
          <BasicCanvas :object="object" />
        </template>
        <template v-else-if="(object instanceof GOUImage)">
          <ImageCanvas :object="object" />
        </template>
        <template v-else-if="(object instanceof GOULottie)">
          <LottieCanvas :object="object" />
        </template>
        <template v-else-if="(object instanceof GOUText)">
          <TextCanvas :object="object" />
        </template>
        <template v-if="object && !(object instanceof GOUFrame)">
          <GOUVisualCanvas v-if="object.children" :objects="object.children" />
        </template>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import FrameCanvas from "@/components/atoms/canvases/FrameCanvas.vue";
import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import LottieCanvas from "@/components/atoms/canvases/LottieCanvas.vue";
import TextCanvas from "@/components/atoms/canvases/TextCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUFrame from "@/composables/types/visuals/GOUFrame";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import GOUText from "@/composables/types/visuals/GOUText";
import { GOUFluidVisual } from "@/composables/types/visuals/GOUFluidVisual";
import GOUFluidVisualCanvas from "./GOUFluidVisualCanvas.vue";

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
    type: Object as PropType<{
      [key: string]: GOUVisual | GOUFluidVisual | undefined;
    }>,
  },
});
</script>
