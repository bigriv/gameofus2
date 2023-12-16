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
    <div
      v-for="(event, index) in props.damageEvents"
      class="c-battle_field__damage a-fade"
      :style="{
        left: `${event.cell.x * 33}%`,
        top: `${event.cell?.y * 20}%`,
        '--delay': `${index * 0.3}s`,
        '--duration': '1s',
        '--iteration': '1',
        '--easing': 'ease-in-out',
      }"
    >
      {{ event?.damage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { WIL_CELL_COLOR } from "@/composables/games/wil/enums/cell";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilDamageEvent } from "@/composables/games/wil/types/event";
import { WilFieldCell, WilField } from "@/composables/games/wil/types/field";
import { watch } from "vue";

const props = defineProps({
  reverse: {
    type: Boolean,
    default: false,
  },
  cells: { type: Array<WilFieldCell>, required: true },
  damageEvents: {
    type: Array<WilDamageEvent>,
    default: () => [],
  },
});
const emits = defineEmits(["click", "hover"]);

const onClickCell = (x: number, y: number) => {
  if (props.cells[x * WilField.WIDTH + y].color !== WIL_CELL_COLOR.BLUE) {
    return;
  }
  emits("click", x, y);
};
const onHoverCharacter = (character: WilCharacter | undefined) => {
  emits("hover", character);
};

// ダメージイベントが更新された時の処理
// 300msずつずらしてSEを鳴らす
watch(
  () => props.damageEvents,
  () => {
    props.damageEvents.forEach((event, index) => {
      if (event.sound) {
        setTimeout(() => {
          event.sound?.play();
        }, index * 300);
      }
    });
  }
);
</script>

<style scoped lang="scss">
.c-battle_field {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  border-radius: 4px;
  box-sizing: content-box;
  box-shadow: 0 0 40px inset white;
  &--reverse {
    transform: scaleX(-1);
    .c-battle_field__damage {
      transform: scaleX(-1);
    }
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
    &--YELLOW {
      background-color: rgba(255, 255, 0, 0.5);
      border-color: yellow;
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
  &__damage {
    position: absolute;
    font-size: 20px;
    color: black;
    font-weight: bold;
    animation-delay: var(--delay);
    transform: translate(-50%, -50%);
  }
}
</style>
