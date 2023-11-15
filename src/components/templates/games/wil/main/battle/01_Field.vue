<template>
  <div class="c-field">
    <div
      class="c-field__frame"
      :style="{
        'min-width': `${props.field.width * 40}px`,
        'max-width': `${props.field.width * 40}px`,
        height: `${props.field.height * 40}px`,
      }"
    >
      <template v-for="column in props.field.height">
        <div
          v-for="row in props.field.width"
          class="c-field__frame__cell"
          :class="[
            `c-field__frame__cell--${
              props.field.cells[(column - 1) * props.field.width + (row - 1)]
                .color
            }`,
            {
              'c-field__frame__cell--selected':
                props.selectedCells.findIndex((cell) => {
                  return cell.x == row - 1 && cell.y == column - 1;
                }) >= 0,
            },
          ]"
          @click="onClickCell(column - 1, row - 1)"
        >
          <div
            v-if="
              props.field.cells[(column - 1) * props.field.width + (row - 1)]
                .character
            "
            class="c-field__frame__cell__character"
          >
            <GOUVisualCanvas
              :objects="{
                army: props.field.cells[
                  (column - 1) * props.field.width + (row - 1)
                ].character?.miniVisual,
              }"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { WilField } from "@/composables/games/wil/types/field";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";

const props = defineProps({
  field: {
    type: Object as PropType<WilField>,
    required: true,
  },
  selectedCells: {
    type: Array<{ x: number; y: number }>,
    default: () => [{ x: -1, y: -1 }],
  },
});

const emits = defineEmits(["click"]);

const onClickCell = (y: number, x: number) => {
  emits("click", x, y);
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
    flex-wrap: wrap;
    transform: perspective(200px) rotateX(10deg);
    transform-origin: 50% 50%;
    border-bottom: 2px solid black;
    border-right: 2px solid black;
    border-radius: 4px;
    box-sizing: content-box;
    &__cell {
      position: relative;
      width: 40px;
      height: 40px;
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
