<template>
  <SvgCanvas :width="100" :height="100">
    <SvgPolygon :points="points" color="red" />
  </SvgCanvas>
  <!-- <BasicCanvas :width="1000" :height="1000" :objects="objects" /> -->

  <ImageCanvas :width="100" :height="100" :objects="imageCanvasObject" />
  <button @click="onClickBeep">音</button>
  <button @click="onClickModalOpen">モーダルを開く</button>
  <BasicModal v-model:isOpen="isModalOpen"> aaa </BasicModal>
</template>

<script setup lang="ts">
import SvgCanvas from "@/components/atoms/canvases/SvgCanvas.vue";
import SvgPolygon from "@/components/atoms/svgDiagrams/SvgPolygon.vue";
// import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import { onMounted, reactive, ref } from "vue";
import GOUAudio from "@/composables/types/GOUAudio";
import BasicModal from "../atoms/BasicModal.vue";
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";

const audio = ref(new GOUAudio());
const points = reactive(new Array<Array<number>>());
const imageCanvasObject = ref(new Array<GOUVisual>());
const isModalOpen = ref(false);
onMounted(() => {
  audio.value.melody = "a3b3c3a0d3e3f3a0g3";
  imageCanvasObject.value.push(
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/Goblin.svg",
      width: 50,
      height: 100,
    })
  );
});
const onClickBeep = () => {
  if (audio.value.isPlaying()) {
    audio.value.stop();
  } else {
    audio.value.play();
  }
};
const onClickModalOpen = () => {
  isModalOpen.value = true;
};
</script>
