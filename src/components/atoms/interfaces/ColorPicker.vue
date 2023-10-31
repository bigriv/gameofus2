<template>
  <div class="c-color_picker">
    <div class="c-color_picker__input">
      <button
        :disabled="isShowModal"
        class="c-color_picker__input__button"
        :style="{ '--color': rgb }"
        @click="onClickButton"
      ></button>
    </div>

    <div v-if="isShowModal" class="c-color_picker__modal">
      <i class="c-color_picker__modal__display" :style="{ '--color': rgb }" />
      <div class="c-color_picker__modal__forms">
        <div class="c-color_picker__modal__forms__inputs">
          <input
            v-model.number="color.red"
            type="range"
            :max="255"
            :min="0"
            class="c-color_picker__modal__forms__inputs__slider--red"
          />
          <input
            :value="color.red"
            type="text"
            @keypress.prevent.stop="onChangeRed"
            @blur="onChangeRed"
          />
        </div>
        <div class="c-color_picker__modal__forms__inputs">
          <input
            v-model.number="color.green"
            type="range"
            :max="255"
            :min="0"
            class="c-color_picker__modal__forms__inputs__slider--green"
          />
          <input
            :value="color.green"
            type="text"
            @keypress.prevent.stop="onChangeGreen"
            @blur="onChangeGreen"
          />
        </div>
        <div class="c-color_picker__modal__forms__inputs">
          <input
            v-model.number="color.blue"
            type="range"
            :max="255"
            :min="0"
            class="c-color_picker__modal__forms__inputs__slider--blue"
          />
          <input
            :value="color.blue"
            type="text"
            @keypress.prevent.stop="onChangeBlue"
            @blur="onChangeBlue"
          />
        </div>
      </div>
      <div class="c-color_picker__modal__buttons u-margin_top--20">
        <button @click="onClose">Cancel</button>
        <button @click="onSubmit">OK</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";

const props = defineProps({
  color: {
    type: String,
    default: undefined,
  },
});
const emits = defineEmits(["submit"]);

const isShowModal = ref(false);
const color = reactive({
  red: 255,
  green: 255,
  blue: 255,
});
const rgb = computed(() => {
  const r = color.red.toString(16).padStart(2, "0");
  const g = color.green.toString(16).padStart(2, "0");
  const b = color.blue.toString(16).padStart(2, "0");
  return `#${r}${g}${b}`;
});

const resetColor = () => {
  console.log(props.color);
  if (!props.color || !/^#[0-9a-fA-F]{6}$/.test(props.color)) {
    color.red = 255;
    color.green = 255;
    color.blue = 255;
    return;
  }
  const red = props.color.slice(1, 3);
  const green = props.color.slice(3, 5);
  const blue = props.color.slice(5, 7);

  color.red = Number("0x" + red);
  color.green = Number("0x" + green);
  color.blue = Number("0x" + blue);
};

/**
 * 親から渡される色の監視
 * 親が変わった場合はコンポーネント内で扱っている色も変える
 */
watch(() => props.color, resetColor);

// アクションイベント
const onClickButton = () => {
  isShowModal.value = true;
};
const onClose = () => {
  resetColor();
  isShowModal.value = false;
};
const onSubmit = () => {
  isShowModal.value = false;
  emits("submit", rgb.value);
};
const onChangeRed = (event: Event) => {
  color.red = onChangeColor(event);
};
const onChangeGreen = (event: Event) => {
  color.green = onChangeColor(event);
};
const onChangeBlue = (event: Event) => {
  color.blue = onChangeColor(event);
};
const onChangeColor = (event: Event): number => {
  console.log(event);
  const getValue = (value: string) => {
    const num = Number(value);
    if (Number.isNaN(num)) {
      const replaced = value.replace(/\D+/g, "");
      console.log("replaced", replaced);
      return Number(replaced);
    }
    if (num > 255) {
      // 最大値チェック
      return 255;
    }
    return num;
  };

  if (event instanceof FocusEvent) {
    if (!(event.target instanceof HTMLInputElement)) {
      return 0;
    }
    return getValue(event.target.value);
  }

  if (event instanceof KeyboardEvent) {
    if (!(event.target instanceof HTMLInputElement)) {
      return 0;
    }
    if (!/^\d$/.test(event.key)) {
      // 非数値が入力された場合は元々入力されていた値を返す
      return Number(event.target.value);
    }
    return getValue(event.target.value);
  }

  return 0;
};
</script>

<style scoped lang="scss">
button {
  cursor: pointer;
}
.c-color_picker {
  position: relative;
  &__input {
    width: 40px;
    height: 20px;
    &__button {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
      cursor: pointer;

      &::before {
        content: "";
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background-color: var(--color);
        border: solid #fff;
        border-width: 2px 1px;
      }
    }
  }
  &__modal {
    position: absolute;
    top: 0;
    left: 40px;
    background-color: #ffffff;
    border: 1px black solid;
    padding: 5px;
    &__display {
      display: block;
      width: 60px;
      height: 60px;
      background-color: var(--color);
      float: left;
      border: 1px lightgray solid;
      margin-right: 10px;
    }
    &__forms {
      display: flex;
      flex-direction: column;
      gap: 4px 0;
      &__inputs {
        display: flex;
        flex-direction: row;
        gap: 0 4px;
        &__slider {
          &--red {
            &::-webkit-slider-runnable-track {
              background: linear-gradient(to right, #fff, #ff0000);
            }
            &::-moz-range-track {
              background: linear-gradient(to right, #fff, #ff0000);
            }
          }
          &--green {
            &::-webkit-slider-runnable-track {
              background: linear-gradient(to right, #fff, #00ff00);
            }
            &::-moz-range-track {
              background: linear-gradient(to right, #fff, #00ff00);
            }
          }
          &--blue {
            &::-webkit-slider-runnable-track {
              background: linear-gradient(to right, #fff, #0000ff);
            }
            &::-moz-range-track {
              background: linear-gradient(to right, #fff, #0000ff);
            }
          }
        }
      }
      input[type="text"] {
        width: 50px;
      }
      input[type="range"] {
        width: 128px;
        appearance: none;
        -webkit-appearance: none;
        outline: none;
        background: transparent;
        width: 100%;
        height: 16px;
        &:hover {
          cursor: grab;
        }
        &:active {
          cursor: grabbing;
        }
        &::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 8px;
          border: 1px lightgray solid;
        }
        &::-moz-range-track {
          height: 8px;
          border-radius: 8px;
          border: 1px lightgray solid;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          background-color: #4cabe2;
          border-radius: 50%;
          border: 1px lightgray solid;
          margin-top: -4px; // (trackのheight - thumbのheight) / 2
        }
        &::-moz-range-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          background-color: #4cabe2;
          border-radius: 50%;
          border: 1px lightgray solid;
          margin-top: -4px; // (trackのheight - thumbのheight) / 2
        }
      }
    }
    &__buttons {
      display: flex;
      justify-content: end;
      button {
        width: 60px;
        height: 100%;
        + button {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
