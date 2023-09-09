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
    type: String,
    default: "black",
  },
  backgroundColor: {
    type: String,
    default: undefined,
  },
  borderColor: {
    type: String,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["click", "hover"]);
const styles = {
  "--backgroundColor": props.backgroundColor,
  "--borderColor": props.borderColor,
  "--fontColor": props.fontColor,
};

const onClick = () => {
  emits("click");
};
const onHover = (isHover: boolean) => {
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
    font-family: monospace;
    font-weight: 600;
    user-select: none;
  }
}
</style>
