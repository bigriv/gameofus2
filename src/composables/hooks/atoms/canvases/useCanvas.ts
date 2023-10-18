import { Ref, computed } from "vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

export const useCanvas = (object: Ref<GOUVisual>) => {
  const canvasStyle = computed(() => ({
    "--x": object.value.position.px,
    "--y": object.value.position.py,
    width: object.value.width + "%",
    height: object.value.height + "%",
    "--rotate": object.value.rotation.transform(),
    "--origin": object.value.rotation.transformOrigin(),
  }));

  const animationStyle = computed(() => {
    if (!object.value.animation) {
      return "";
    }
    return object.value.animation.style();
  });

  const animationClass = computed(() => {
    if (!object.value.animation) {
      return "";
    }
    return [
      `a-${object.value.animation.type}`,
      { "a-infinite": object.value.animation.iteration <= 0 },
      { "a-stop": object.value.animation.stop },
    ];
  });

  return {
    canvasStyle,
    animationStyle,
    animationClass,
  };
};
