<template>
  <div
    class="c-battle_field"
    :class="{ 'c-battle_field--reverse': props.reverse }"
  >
    <template v-for="column in WilField.HEIGHT">
      <template v-for="row in WilField.WIDTH">
        <div
          class="c-battle_field__cell"
          :class="[
            `c-battle_field__cell--${
              props.cells[(column - 1) * WilField.WIDTH + (row - 1)].color
            }`,
            {
              'c-battle_field__cell--selected':
                props.cells[(column - 1) * WilField.WIDTH + (row - 1)].selected,
            },
          ]"
          @click="onClickCell(column - 1, row - 1)"
          @mouseenter="
            onHoverCharacter(
              props.cells[(column - 1) * WilField.WIDTH + (row - 1)].character
            )
          "
          @mouseleave="onHoverCharacter(undefined)"
        >
          <div
            v-if="
              props.cells[(column - 1) * WilField.WIDTH + (row - 1)].character
            "
            class="c-battle_field__cell__character"
          >
            <GOUVisualCanvas
              :objects="{
                army: cells[(column - 1) * WilField.WIDTH + (row - 1)].character!.miniVisual,
              }"
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilFieldCell, WilField } from "@/composables/games/wil/types/field";

const props = defineProps({
  reverse: {
    type: Boolean,
    default: false,
  },
  cells: { type: Array<WilFieldCell>, required: true },
});
const emits = defineEmits(["click", "hover"]);

const onClickCell = (x: number, y: number) => {
  emits("click", x, y);
};
const onHoverCharacter = (character: WilCharacter | undefined) => {
  emits("hover", character);
};
</script>

<style scoped lang="scss">
.c-battle_field {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 4px;
  box-sizing: content-box;
  box-shadow: 0 0 40px inset white;
  &--reverse {
    transform: scaleX(-1);
  }
  &__cell {
    position: relative;
    width: 33%;
    aspect-ratio: 1;
    border-top: 2px solid black;
    border-left: 2px solid black;
    border-radius: 4px;
    &--WHITE {
      background-color: rgba(255, 255, 255, 0.5);
      border-color: white;
    }
    &--RED {
      background-color: rgba(255, 0, 0, 0.5);
      border-color: red;
    }
    &--BLUE {
      background-color: rgba(0, 0, 255, 0.5);
      border-color: blue;
      cursor: pointer;
      &:hover {
        animation: flash 1s infinite;
      }
    }
    &--selected {
      animation: flash 1s infinite;
    }
    &__character {
      width: 100%;
      height: 100%;
      transform: perspective(40px) rotateX(-20deg) translateY(-25%);
      transform-origin: 50% 50%;
    }
  }
}
</style>
