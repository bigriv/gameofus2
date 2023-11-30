<template>
  <div class="c-game_status_bar" :style="styles">
    <div class="c-game_status_bar__bar" />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  max: {
    type: Number,
    default: 100,
  },
  current: {
    type: Number,
    default: 0,
  },
  barColor: {
    type: String,
    default: "red",
  },
  borderColor: {
    type: String,
    default: "black",
  },
});
const styles = computed(() => {
  return {
    "--max": props.max,
    "--current": props.current,
    "--barColor": props.barColor,
    "--borderColor": props.borderColor,
  };
});
</script>

<style scoped lang="scss">
.c-game_status_bar {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  align-self: center;
  &__bar {
    width: 100%;
    height: 100%;
    min-height: 10px;
    border: 1px solid var(--borderColor);
    position: relative;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: calc(var(--current) / var(--max) * 100%);
      height: 100%;
      background-color: var(--barColor);
    }
  }
}
</style>
