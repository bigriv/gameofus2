<template>
  <div>
    <h1>400 Bad Request</h1>
    <span v-for="message in props.errors">
      {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  errors: {
    type: Array<String>,
    defult: [],
  },
});
</script>
