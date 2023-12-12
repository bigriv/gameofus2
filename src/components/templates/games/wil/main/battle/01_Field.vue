<template>
  <div class="c-field">
    <div class="c-field__frame">
      <div class="c-field__frame__computer">
        <WilBattleField
          :reverse="true"
          :cells="props.field.computerCells"
          @click="onClickComputerCell"
          @hover="onHoverCharacter"
        />
      </div>
      <div class="c-field__frame__player">
        <WilBattleField
          :cells="props.field.playerCells"
          @click="onClickRightCell"
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

const emits = defineEmits(["selectComputerCell", "selectPlayerCell", "hover"]);

const onClickComputerCell = (y: number, x: number) => {
  emits("selectComputerCell", x, y);
};
const onClickRightCell = (y: number, x: number) => {
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
    &__computer,
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
