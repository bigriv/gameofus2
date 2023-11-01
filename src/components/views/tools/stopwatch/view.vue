<template>
  <StopWatch
    :bgColor="background.code"
    :bgOpacity="background.opacity"
    :fontSize="font.size"
    :fontColor="font.color"
    :fontWeight="font.weight"
    :fontFamily="font.family"
  />
</template>

<script setup lang="ts">
import StopWatch from "@/components/templates/tools/StopWatch.vue";
import { COLOR } from "@/composables/types/GOUColor";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const background: {
  code: string;
  opacity: number;
} = reactive({
  code: COLOR.WHITE,
  opacity: 1,
});
const font = reactive({
  size: 14,
  weight: "400",
  family: "Meiryo",
  color: COLOR.BLACK as string,
});

const loadParams = () => {
  const parameter = route.query;
  console.log(parameter);
  if (!parameter) {
    return;
  }
  if (parameter.bgColor) {
    background.code = parameter.bgColor as string;
  }
  if (parameter.bgOpacity) {
    background.opacity = Number(parameter.bgOpacity);
  }
  if (parameter.fontSize) {
    font.size = Number(parameter.fontSize);
  }
  if (parameter.fontColor) {
    font.color = parameter.fontColor as string;
  }
  if (parameter.fontWeight) {
    font.weight = parameter.fontWeight as string;
  }
  if (parameter.fontFamily) {
    font.family = parameter.fontFamily as string;
  }
};

onMounted(() => {
  loadParams();
});
</script>
