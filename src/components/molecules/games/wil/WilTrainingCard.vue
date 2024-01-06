<template>
  <WilCard @click="onClick">
    <div class="c-trainingcard">
      <div>{{ props.training.name }}</div>
      <div class="c-trainingcard__image">
        <GOUVisualCanvas :objects="{ training: props.training.image }" />
      </div>
    </div>
  </WilCard>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import WilCard from "@/components/molecules/games/wil/WilCard.vue";
import { WilTrainingMenu } from "@/composables/games/wil/types/training";

const props = defineProps({
  training: {
    type: Object as PropType<WilTrainingMenu>,
    required: true,
  },
});
const emits = defineEmits(["click"]);

const onClick = () => {
  emits("click", props.training);
};
</script>
<style scoped lang="scss">
.c-trainingcard {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(20, 20, 20, 1),
    rgba(200, 200, 200, 1)
  );
  padding: 2px;
  &__image {
    position: absolute;
    top: 60%;
    left: 50%;
    width: 90%;
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
  }
}

@media screen and (max-width: 400px) {
  .c-trainingcard {
    font-size: 9px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-trainingcard {
    font-size: 11px;
  }
}
@media screen and (min-width: 600px) {
  .c-trainingcard {
    font-size: 14px;
  }
}
</style>
