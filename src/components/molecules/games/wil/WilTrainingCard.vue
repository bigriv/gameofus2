<template>
  <WilCard @click="onClick">
    <div class="c-card">
      <div>{{ props.training.name }}</div>
      <div class="c-card__image">
        <GOUVisualCanvas
          :objects="{ training: props.training.image }"
        />
      </div>
    </div>
  </WilCard>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import WilCard from "@/components/molecules/games/wil/WilCard.vue";
import { WilTraining } from "@/composables/games/wil/types/training";
import GOUVisualCanvas from "../../GOUVisualCanvas.vue";

const props = defineProps({
  training: {
    type: Object as PropType<WilTraining>,
    required: true,
  },
});
const emits = defineEmits(["click"]);

const onClick = () => {
  emits("click", props.training);
};
</script>
<style scoped lang="scss">
.c-card {
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
    transform: translate(-50%, -50%);
  }
}

@media screen and (max-width: 400px) {
  .c-card {
    font-size: 10px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-card {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-card {
    font-size: 16px;
  }
}
</style>
