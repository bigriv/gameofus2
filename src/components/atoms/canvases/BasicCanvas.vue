<template>
  <canvas ref="canvas" :width="props.width" :height="props.height"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import GOUCircle from "@/composables/types/shapes/diagrams/GOUCircle";
import GOURect from "@/composables/types/shapes/diagrams/GOURect";
import GOUPolygon from "@/composables/types/shapes/diagrams/GOUPolygon";
import GOUPosition from "@/composables/types/GOUPosition";
import GOULine from "@/composables/types/shapes/diagrams/GOULine";
import GOULineList from "@/composables/types/shapes/diagrams/GOULineList";
import GOUText from "@/composables/types/shapes/diagrams/GOUText";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

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
    type: Array<GOUVisual>,
    default: () => [],
  },
});

const canvas = ref(null);
const drawer = computed(() => {
  if (!canvas || !canvas.value) {
    return null;
  }
  return (canvas.value as HTMLCanvasElement).getContext("2d");
});

onMounted(() => {
  drawDiagrams();
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

// 文字の描画
const drawText = (obj: GOUText, position: GOUPosition) => {
  if (!drawer || !drawer.value) {
    return;
  }

  drawer.value.textBaseline = "top";
  drawer.value.font = `${obj.fontSize}rem serif`;
  drawer.value.globalAlpha = 1;
  drawer.value.fillStyle = obj.color.code;
  drawer.value.fillText(obj.text, position.px, position.py);
};

// 図形の描画
const drawDiagram = (obj: GOUVisual, position?: GOUPosition) => {
  if (obj.shape instanceof GOUCircle) {
    drawCircle(obj.shape, obj.position.add(position));
  } else if (obj.shape instanceof GOURect) {
    drawRect(obj.shape, obj.position.add(position));
  } else if (obj.shape instanceof GOUPolygon) {
    drawPolygon(obj.shape, obj.position.add(position));
  } else if (obj.shape instanceof GOULine) {
    drawLine(obj.shape, obj.position.add(position));
  } else if (obj.shape instanceof GOULineList) {
    drawLines(obj.shape, obj.position.add(position));
  } else if (obj.shape instanceof GOUText) {
    drawText(obj.shape, obj.position.add(position));
  }
  if (!obj.children) {
    return;
  }
  for (const key in obj.children) {
    drawDiagram(obj.children[key], obj.position.add(position));
  }
};

// 図形描画の統括メソッド
const drawDiagrams = () => {
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
  for (const obj of props.objects) {
    drawDiagram(obj);
  }
};
watch(
  () => props.objects,
  () => {
    drawDiagrams();
  },
  { deep: true }
);
</script>
@/composables/types/shape/diagrams/GOUCircle@/composables/types/shape/diagrams/GOURect@/composables/types/shape/diagrams/GOUPolygon@/composables/types/shape/diagrams/GOULine@/composables/types/shape/diagrams/GOULineList@/composables/types/shape/diagrams/GOUText