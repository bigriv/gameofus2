<template>
  <BasicCanvas
    :width="props.width"
    :height="props.height"
    :objects="objects"
    :class="{ 'u-clickable': isClickable }"
    @click="onClick"
    @mousemove="(event: MouseEvent) => onMouseMove(event, props.objects)"
  />
</template>

<script setup lang="ts">
import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import { ref, watch } from "vue";
import ClickableVisual from "@/composables/types/visuals/ClickableVisual";

const props = defineProps({
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  objects: {
    type: Array<ClickableVisual>,
    default: () => [],
  },
});

const isClickable = ref(false);

const onClick = (event: MouseEvent) => {
  for (const clickableIf of props.objects) {
    if (clickableIf.judgeHover?.(event)) {
      clickableIf.onClick(event);
    }
  }
};
const onMouseMove = (event: MouseEvent, list: Array<ClickableVisual>) => {
  for (const obj of list) {
    const isHoverBefore = obj.isHover?.() ?? false;
    const isHoverNow = obj.isClickable && (obj.judgeHover?.(event) ?? false);
    if (!isHoverNow) {
      if (isHoverBefore) {
        // ホバーが外れた場合
        obj.onMouseLeave();
        isClickable.value = isHoverNow;
      }
      continue
    }

    if (!isHoverBefore) {
      // 初めてオブジェクトにマウスがホバーしたとき
      obj.onMouseEnter();
    }

    isClickable.value = isHoverNow;
  }
};

// オブジェクトの変更を監視し、配列の中身が空になっていたらホバー状態を解除する
watch(
  () => [...props.objects],
  () => {
    if (props.objects.length == 0) {
      isClickable.value = false;
      return;
    }
  }
);
</script>
