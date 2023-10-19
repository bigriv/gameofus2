<template>
  <div class="c-construction">
    <div class="c-construction__image u-margin_top--20">
      <ImageCanvas :object="constructionImage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import ImageCanvas from "@/components/atoms/canvases/ImageCanvas.vue";
import GOUImage from "@/composables/types/visuals/GOUImage";

const constructionImage = new GOUImage(
  "/games/tbh/images/SignBoard.svg",
  100,
  100
);
</script>

<style scoped lang="scss">
.c-construction {
  position: relative;
  width: 200px;
  height: 200px;
  margin: auto;
  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
