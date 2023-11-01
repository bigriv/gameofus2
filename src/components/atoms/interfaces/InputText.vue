<template>
  <input
    v-model="modelValue"
    type="text"
    @focus="onFocus"
    @blur="onBlur"
    @input="onInput"
    @change="onChange"
    @keydown="onKeydown"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: String,
  },
});

const emits = defineEmits([
  "update:modelValue",
  "focus",
  "blur",
  "input",
  "change",
  "keydown",
]);

const modelValue = computed({
  get: () => props.modelValue,
  set: (newValue: String | Number) => emits("update:modelValue", newValue),
});

const onFocus = (event: Event) => {
  emits("focus", event);
};
const onBlur = (event: Event) => {
  emits("blur", event);
};
const onInput = (event: Event) => {
  emits("input", event);
};
const onChange = (event: Event) => {
  emits("change", event);
};
const onKeydown = (event: Event) => {
  emits("keydown", event);
};
</script>

<style scoped lang="scss">
input[type="text"] {
  cursor: text;
}
</style>
