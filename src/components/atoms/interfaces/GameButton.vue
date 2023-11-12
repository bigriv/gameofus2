<template>
  <div class="c-game_button">
    <button
      :style="styles"
      :disabled="disabled"
      @click="onClick"
      @mouseenter="onHover(true)"
      @mouseleave="onHover(false)"
    >
      {{ label }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { COLOR } from "@/composables/types/GOUColor";

const props = defineProps({
  type: {
    type: String,
    default: "primary",
    validator: (value: string) => {
      return ["primary", "secondary"].includes(value);
    },
  },
  label: {
    type: String,
    default: "",
  },
  fontColor: {
    type: String as PropType<COLOR>,
    default: "black",
  },
  backgroundColor: {
    type: String as PropType<COLOR>,
    default: undefined,
  },
  borderColor: {
    type: String as PropType<COLOR>,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  sounds: {
    type: Object as PropType<{
      click?: GOUAudio;
      hover?: GOUAudio;
    }>,
    default: () => ({}),
    required: false,
  },
});
const emits = defineEmits(["click", "hover"]);
const styles = {
  "--backgroundColor": props.backgroundColor,
  "--borderColor": props.borderColor,
  "--fontColor": props.fontColor,
};

const onClick = () => {
  if (props.sounds.click) {
    props.sounds.click.play();
  }
  emits("click");
};
const onHover = (isHover: boolean) => {
  if (props.sounds.hover) {
    props.sounds.hover.play();
  }
  emits("hover", isHover);
};
</script>

<style scoped lang="scss">
.c-game_button {
  width: 100%;
  height: 100%;
  button {
    cursor: pointer;
    width: 100%;
    height: 100%;
    background-color: var(--backgroundColor);
    border-color: var(--borderColor);
    color: var(--fontColor);
    font-size: 100%;
    font-family: "DotGothic16";
    font-weight: normal;
    user-select: none;
  }
}
</style>
