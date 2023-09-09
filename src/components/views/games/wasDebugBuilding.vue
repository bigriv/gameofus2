<template>
  <ImageCanvas :width="600" :height="600" :objects="objects" />
</template>

<script setup lang="ts">
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import { ref } from "vue";
import { WAS_AREA } from "@/composables/games/was/defines";

const objects = ref([
  WAS_AREA.SATAN_CASTLE.outside,
  WAS_AREA.CAVE.outside,
  WAS_AREA.SEA.outside,
  WAS_AREA.VILLAGE.outside,
  WAS_AREA.MOUNTAIN.outside,
  WAS_AREA.KINGDOM_CASTLE.outside,
]);
</script>
