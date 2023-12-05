<template>
  <div
    class="c-svg_text_canvas"
    :style="[canvasStyle, { 'z-index': `${object.zIndex}` }]"
  >
    <svg
      :viewBox="`0 0 ${90 * object.text.length} 100`"
      class="c-svg_text_canvas__content"
      :class="{ 'u-clickable': object.isClickable }"
      @click="onClick"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <text
        x="0"
        y="90"
        font-size="90"
        :fill="fontColor"
        :style="{
          '--borderColor': borderColor,
        }"
      >
        {{ object.text }}
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, toRefs } from "vue";
import GOUText from "@/composables/types/visuals/GOUText";
import { useCanvas } from "@/composables/hooks/atoms/canvases/useCanvas";

const props = defineProps({
  object: {
    type: Object as PropType<GOUText>,
    required: true,
  },
});
const { object } = toRefs(props);
const { canvasStyle } = useCanvas(object);

const fontColor = computed(() => object.value.color.rgba());
const borderColor = computed(() => object.value.border?.color?.rgba());

const onClick = () => {
  if (!object.value.isClickable) {
    return;
  }
  object.value.onClick();
};
const onMouseEnter = () => {
  if (!object.value.isClickable) {
    return;
  }
  object.value.onMouseEnter();
};
const onMouseLeave = () => {
  if (!object.value.isClickable) {
    return;
  }
  object.value.onMouseLeave();
};
</script>

<style scoped lang="scss">
.c-svg_text_canvas {
  position: absolute;
  top: calc(var(--y) * 1%);
  left: calc(var(--x) * 1%);
  svg text {
    text-shadow: 0 2px 0 var(--borderColor), 2px 0 0 var(--borderColor),
      -2px 0 0 var(--borderColor), 0 -2px 0 var(--borderColor);
  }
}
</style>
