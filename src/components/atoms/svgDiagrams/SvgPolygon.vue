<template>
  <polygon
    :points="props.points.join(' ')"
    :fill="props.color"
    :stroke="props.border"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  points: {
    type: Array,
    default: () => [
      [0, 0],
      [0, 0],
      [0, 0],
    ],
  },
  color: {
    type: String,
    default: "white",
  },
  border: {
    type: String,
    default: "black",
  },
});
</script>
