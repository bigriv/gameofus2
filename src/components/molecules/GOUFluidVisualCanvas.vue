<template>
  <template v-if="props.object?.current instanceof GOUFrame">
    <FrameCanvas :object="props.object?.current">
      <GOUVisualCanvas
        v-if="props.object?.current.children"
        :objects="props.object?.current.children"
      />
    </FrameCanvas>
  </template>
  <template v-else-if="props.object?.current instanceof GOUDiagram">
    <BasicCanvas :object="props.object?.current" />
  </template>
  <template v-else-if="props.object?.current instanceof GOUImage">
    <ImageCanvas :object="props.object?.current" />
  </template>
  <template v-else-if="props.object?.current instanceof GOULottie">
    <LottieCanvas :object="props.object?.current" />
  </template>
  <template v-else-if="props.object?.current instanceof GOUText">
    <TextCanvas :object="props.object?.current" />
  </template>
  <template
    v-if="props.object?.current && !(props.object.current instanceof GOUFrame)"
  >
    <GOUVisualCanvas
      v-if="props.object?.current.children"
      :objects="props.object?.current.children"
    />
  </template>
</template>

<script setup lang="ts">
import { PropType, onMounted } from "vue";
import FrameCanvas from "@/components/atoms/canvases/FrameCanvas.vue";
import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import LottieCanvas from "@/components/atoms/canvases/LottieCanvas.vue";
import TextCanvas from "@/components/atoms/canvases/TextCanvas.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import GOUFrame from "@/composables/types/visuals/GOUFrame";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import GOUText from "@/composables/types/visuals/GOUText";
import { GOUFluidVisual } from "@/composables/types/visuals/GOUFluidVisual";

const props = defineProps({
  object: {
    type: Object as PropType<GOUFluidVisual>,
    default: undefined,
  },
});

onMounted(() => {
  if (!props.object) {
    return;
  }
  props.object.start();
});
</script>
