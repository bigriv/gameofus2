<template>
  <div class="c-field">
    <div class="c-field__frame">
      <div class="c-field__frame__computer">
        <WilBattleField
          :reverse="true"
          :cells="props.field.computerCells"
          :damageEvents="computerDamageEvents"
          @click="onClickComputerCell"
          @hover="onHoverCharacter"
        />
      </div>
      <div class="c-field__frame__player">
        <WilBattleField
          :cells="props.field.playerCells"
          :damageEvents="playerDamageEvents"
          @click="onClickRightCell"
          @hover="onHoverCharacter"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import WilBattleField from "@/components/molecules/games/wil/WilBattleField.vue";
import { WilField } from "@/composables/games/wil/types/field";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilDamageEvent } from "@/composables/games/wil/types/event";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";

const props = defineProps({
  field: {
    type: Object as PropType<WilField>,
    required: true,
  },
  events: {
    type: Array<WilDamageEvent>,
    default: () => new Array<WilDamageEvent>(),
  },
});

const emits = defineEmits(["selectComputerCell", "selectPlayerCell", "hover"]);

const playerDamageEvents = computed(() =>
  props.events.filter((event) => event.cell.team === WIL_BATTLE_TEAM.PLAYER)
);
const computerDamageEvents = computed(() =>
  props.events.filter((event) => event.cell.team === WIL_BATTLE_TEAM.COMPUTER)
);

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
