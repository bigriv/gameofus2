<template>
  <div class="c-field">
    <div class="c-field__frame">
      <div class="c-field__frame__computer">
        <WilBattleField
          :reverse="true"
          :field="props.battle.computer.field"
          :damageResults="computerDamageEvents"
          @click="onClickComputerCell"
          @hover="onHoverCell"
        />
      </div>
      <div class="c-field__frame__player">
        <WilBattleField
          :field="props.battle.player.field"
          :damageResults="playerDamageEvents"
          @click="onClickPlayerCell"
          @hover="onHoverCell"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import WilBattleField from "@/components/molecules/games/wil/WilBattleField.vue";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";
import { WilBattle } from "@/composables/games/wil/types/battle";
import { WilFieldCell } from "@/composables/games/wil/types/field";

const props = defineProps({
  battle: {
    type: Object as PropType<WilBattle>,
    required: true,
  },
});

const emits = defineEmits(["selectComputerCell", "selectPlayerCell", "hover"]);

const playerDamageEvents = computed(() =>
  props.battle.damageResults.filter(
    (event) => event.cell.team === WIL_BATTLE_TEAM.PLAYER
  )
);
const computerDamageEvents = computed(() =>
  props.battle.damageResults.filter(
    (event) => event.cell.team === WIL_BATTLE_TEAM.COMPUTER
  )
);

const onClickComputerCell = (y: number, x: number) => {
  emits("selectComputerCell", x, y);
};
const onClickPlayerCell = (y: number, x: number) => {
  emits("selectPlayerCell", x, y);
};
const onHoverCell = (cell: WilFieldCell | undefined) => {
  emits("hover", cell);
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
