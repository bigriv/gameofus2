<template>
  <svg
    :viewbox="`0 0 ${props.width} ${props.height}`"
    :width="props.width"
    :height="props.height"
  >
    <slot />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
});
</script>
