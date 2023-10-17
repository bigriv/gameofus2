import { computed } from "vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

export const useCanvas = (object: GOUVisual) => {
  const canvasStyle = computed(() => ({
    "--x": object.position.px,
    "--y": object.position.py,
    width: object.width + "%",
    height: object.height + "%",
    "--rotate": object.rotation.transform(),
    "--origin": object.rotation.transformOrigin(),
  }));

  const animationStyle = computed(() => {
    if (!object.animation) {
      return "";
    }
    return {
      "--duration": object.animation.duration + "s",
      "--iteration": object.animation.iteration,
    };
  });

  const animationClass = computed(() => {
    if (!object.animation) {
      return "";
    }
    return [
      `a-${object.animation.type}`,
      { "a-infinite": object.animation.iteration <= 0 },
      { "a-stop": object.animation.stop },
    ];
  });

  return {
    canvasStyle,
    animationStyle,
    animationClass,
  };
};
