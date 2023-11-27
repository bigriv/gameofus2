<template>
  <div class="c-basic_canvas" :style="canvasStyle">
    <canvas
      ref="canvas"
      :class="[...animationClass, { 'u-clickable': isClickable }]"
      :style="animationStyle"
      @click="onClick"
      @mousemove="onMouseMove"
    ></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch, PropType, toRefs } from "vue";
import GOUCircle from "@/composables/types/visuals/diagrams/GOUCircle";
import GOURect from "@/composables/types/visuals/diagrams/GOURect";
import GOUPolygon from "@/composables/types/visuals/diagrams/GOUPolygon";
import GOUPosition from "@/composables/types/GOUPosition";
import GOULine from "@/composables/types/visuals/diagrams/GOULine";
import GOULineList from "@/composables/types/visuals/diagrams/GOULineList";
import GOUDiagram from "@/composables/types/visuals/GOUDiagram";
import { useCanvas } from "@/composables/hooks/atoms/canvases/useCanvas";

const props = defineProps({
  object: {
    type: Object as PropType<GOUDiagram>,
    required: true,
  },
});

const { object } = toRefs(props);
const { canvasStyle, animationStyle, animationClass } = useCanvas(object);
const canvas = ref(null);
const drawer = computed(() => {
  if (!canvas || !canvas.value) {
    return null;
  }
  return (canvas.value as HTMLCanvasElement).getContext("2d");
});

onMounted(() => {
  drawDiagram();
});

// 円描画メソッド
const drawCircle = (circle: GOUCircle, position: GOUPosition) => {
  if (!drawer || !drawer.value) {
    return;
  }
  drawer.value.beginPath();
  drawer.value.arc(
    position.px + circle.radius,
    position.py + circle.radius,
    circle.radius,
    0,
    Math.PI * 2,
    true
  );
  drawer.value.globalAlpha = circle.color.opacity;
  drawer.value.fillStyle = circle.color.code;
  drawer.value.fill();
};

// 矩形描画メソッド
const drawRect = (rect: GOURect, position: GOUPosition) => {
  if (!drawer || !drawer.value) {
    return;
  }

  drawer.value.beginPath();
  drawer.value.rect(position.px, position.py, rect.width, rect.height);
  drawer.value.globalAlpha = rect.color.opacity;
  drawer.value.fillStyle = rect.color.code;
  drawer.value.fill();
  if (rect.border) {
    drawer.value.strokeStyle = rect.border.color.code;
    drawer.value.globalAlpha = rect.border.color.opacity;
    drawer.value.lineWidth = rect.border.thick;
    drawer.value.stroke();
  }
};

// 多角形描画メソッド
const drawPolygon = (polygon: GOUPolygon, position: GOUPosition) => {
  if (!drawer || !drawer.value) {
    return;
  }

  drawer.value.beginPath();
  for (let i = 0; i < polygon.points.length; i++) {
    if (i == 0) {
      drawer.value.moveTo(
        position.px + polygon.points[i].px,
        position.py + polygon.points[i].py
      );
    } else {
      drawer.value.lineTo(
        position.px + polygon.points[i].px,
        position.py + polygon.points[i].py
      );
    }
  }
  drawer.value.closePath();
  drawer.value.globalAlpha = polygon.color.opacity;
  drawer.value.fillStyle = polygon.color.code;
  drawer.value.fill();
};

// 線の描画
const drawLine = (line: GOULine, position: GOUPosition) => {
  if (!drawer || !drawer.value) {
    return;
  }

  drawer.value.beginPath();
  drawer.value.moveTo(line.start.px + position.px, line.start.py + position.py);
  drawer.value.lineTo(line.end.px + position.px, line.end.py + position.py);
  drawer.value.strokeStyle = line.color.code;
  drawer.value.globalAlpha = line.color.opacity;
  drawer.value.lineWidth = line.thick;
  drawer.value.stroke();
};

// 複数線の描画
const drawLines = (lines: GOULineList, position: GOUPosition) => {
  if (!drawer || !drawer.value) {
    return;
  }

  for (const line of lines.lines) {
    drawer.value.beginPath();
    drawer.value.moveTo(
      line.start.px + position.px,
      line.start.py + position.py
    );
    drawer.value.lineTo(line.end.px + position.px, line.end.py + position.py);
    drawer.value.strokeStyle = line.color.code;
    drawer.value.globalAlpha = line.color.opacity;
    drawer.value.lineWidth = line.thick;
    drawer.value.stroke();
  }
};

// 図形の描画
const drawDiagram = () => {
  if (!canvas || !canvas.value) {
    return null;
  }
  if (!drawer || !drawer.value) {
    return;
  }

  drawer.value.clearRect(
    0,
    0,
    (canvas.value as HTMLCanvasElement).width,
    (canvas.value as HTMLCanvasElement).height
  );

  if (object.value instanceof GOUCircle) {
    drawCircle(object.value, object.value.position);
  } else if (object.value instanceof GOURect) {
    drawRect(object.value, object.value.position);
  } else if (object.value instanceof GOUPolygon) {
    drawPolygon(object.value, object.value.position);
  } else if (object.value instanceof GOULine) {
    drawLine(object.value, object.value.position);
  } else if (object.value instanceof GOULineList) {
    drawLines(object.value, object.value.position);
  }
};

watch(
  () => object.value,
  () => {
    drawDiagram();
  },
  { deep: true }
);

// クリック可能フラグ
const isClickable = ref(false);

// クリック時の処理
const onClick = (event: MouseEvent) => {
  if (!object.value || !object.value.isClickable) {
    return;
  }
  if (object.value.judgeHover?.(event)) {
    object.value.onClick(event);
  }
};
// マウスホバー時の処理
const onMouseMove = (event: MouseEvent) => {
  if (!object.value || !object.value.isClickable) {
    return;
  }
  const isHoverBefore = object.value.isHover?.() ?? false;
  const isHoverNow =
    object.value.isClickable && (object.value.judgeHover?.(event) ?? false);
  if (!isHoverNow) {
    if (isHoverBefore) {
      // ホバーが外れた場合
      object.value.onMouseLeave();
      isClickable.value = isHoverNow;
    }
    return;
  }

  if (!isHoverBefore) {
    // 初めてオブジェクトにマウスがホバーしたとき
    object.value.onMouseEnter();
  }

  isClickable.value = isHoverNow;
};

// オブジェクトの変更を監視し、配列の中身が空になっていたらホバー状態を解除する
watch(
  () => object.value,
  () => {
    if (!object.value) {
      isClickable.value = false;
      return;
    }
  }
);
</script>

<style scoped>
canvas {
  position: absolute;
}
</style>
@/composables/types/visuals/GOUText