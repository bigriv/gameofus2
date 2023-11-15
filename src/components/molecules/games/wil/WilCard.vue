<template>
  <div
    class="c-card"
    :class="{ 'c-card--flash': props.selected }"
    @click="onClick"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["click"]);
const onClick = () => {
  emits("click");
};
</script>

<style scoped lang="scss">
.c-card {
  position: relative;
  width: 100%;
  height: 100%;
  border: 4px ridge;
  border-color: black;
  cursor: pointer;
  &--flash {
    animation: card_flash 1s infinite;
    border-style: solid;
    @keyframes card_flash {
      0%,
      100% {
        border-color: black;
      }

      50% {
        border-color: white;
      }
    }
  }
}
</style>
