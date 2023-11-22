<template>
  <div class="c-field">
    <div class="c-field__frame">
      <div class="c-field__frame__enemy">
        <WilBattleField
          :reverse="true"
          :cells="props.field.enemyCells"
          @click="onClickEnemyCell"
          @hover="onHoverCharacter"
        />
      </div>
      <div class="c-field__frame__player">
        <WilBattleField
          :cells="props.field.playerCells"
          @click="onClickPlayerCell"
          @hover="onHoverCharacter"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import WilBattleField from "@/components/molecules/games/wil/WilBattleField.vue";
import { WilField } from "@/composables/games/wil/types/field";
import { WilCharacter } from "@/composables/games/wil/types/character";

const props = defineProps({
  field: {
    type: Object as PropType<WilField>,
    required: true,
  },
});

const emits = defineEmits(["selectEnemyCell", "selectPlayerCell", "hover"]);

const onClickEnemyCell = (y: number, x: number) => {
  emits("selectEnemyCell", x, y);
};
const onClickPlayerCell = (y: number, x: number) => {
  emits("selectPlayerCell", x, y);
};
const onHoverCharacter = (character: WilCharacter | undefined) => {
  emits("hover", character);
};
</script>

<style scoped lang="scss">
.c-field {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  &__frame {
    display: flex;
    justify-content: space-between;
    width: 100%;
    transform: perspective(200px) rotateX(10deg);
    transform-origin: 50% 50%;
    padding: 0 5%;
    &__enemy,
    &__player {
      width: 25%;
    }
  }
}

@keyframes flash {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.5;
  }
}
</style>
