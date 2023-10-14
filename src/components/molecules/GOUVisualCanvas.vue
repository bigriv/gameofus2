<template>
  <template v-for="object in props.objects">
    <template v-if="object instanceof GOUFrame">
      <div
        class="c-frame"
        :style="{ width: object.width, height: object.height }"
      ></div>
      <GOUVisualCanvas
        v-if="object.children"
        :width="object.width"
        :height="object.height"
        :objects="object.children"
      />
    </template>
    <template v-else-if="object instanceof GOUDiagram">
      <BasicCanvas :object="object" />
      <GOUVisualCanvas
        v-if="object.children"
        :width="object.width"
        :height="object.height"
        :objects="object.children"
      />
    </template>
    <template v-else-if="object instanceof GOUImage">
      <ImageCanvas :object="object" />
      <GOUVisualCanvas
        v-if="object.children"
        :width="object.width"
        :height="object.height"
        :objects="object.children"
      />
    </template>
    <template v-else-if="object instanceof GOULottie">
      <LottieCanvas :object="object" />
      <GOUVisualCanvas
        v-if="object.children"
        :width="object.width"
        :height="object.height"
        :objects="object.children"
      />
    </template>
  </template>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import GOUFrame from "@/composables/types/visuals/GOUFrame";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import BasicCanvas from "./BasicCanvas.vue";
import ImageCanvas from "./ImageCanvas.vue";
import LottieCanvas from "./LottieCanvas.vue";

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
    type: Object as PropType<{ [key: string]: GOUVisual }>,
  },
});

</script>
