<template>
  <span
    :style="{
      '--color': props.color,
    }"
  >
    <i>{{ props.label }}</i>
  </span>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    required: true,
  },
  label: {
    type: Number,
    required: true,
  },
});
</script>

<style scoped lang="scss">
span {
  width: 100%;
  aspect-ratio: 1;
  background-color: v-bind(color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100%;
  font-weight: bold;
}
i {
  color: v-bind(color);
  filter: invert(100%) grayscale(100%) contrast(100);
}
</style>
