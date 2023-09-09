<template>
  <rect
    :x="props.x"
    :y="props.y"
    :rx="props.rx"
    :ry="props.ry"
    :width="props.width"
    :height="props.height"
    :fill="props.color"
    :stroke="props.border"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  canvasId: {
    type: String,
    required: true,
  },
  x: {
    type: Number,
    default: 0,
  },
  y: {
    type: Number,
    default: 0,
  },
  rx: {
    type: Number,
    default: 0,
  },
  ry: {
    type: Number,
    default: 0,
  },
  width: {
    type: Number,
    default: 0,
  },
  height: {
    type: Number,
    default: 0,
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
