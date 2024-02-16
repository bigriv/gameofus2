import { Ref, ref } from "vue";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";
import { WIL_IMAGE_DEFINES } from "@/composables/games/wil/defines/image";
import { WIL_SOUND_DEFINES } from "@/composables/games/wil/defines/sound";

export const useWilFile = () => {
  const initImages = (): { [key: string]: GOUVisual } => {
    let images: { [key: string]: GOUVisual } = {};

    for (const key of Object.keys(WIL_IMAGE_ID)) {
      if (/.*\.[png|svg]/.test(WIL_IMAGE_DEFINES[key])) {
        images[key] = ConstructGOUVisual({
          type: GOUVisualType.IMAGE_SVG,
          path: WIL_IMAGE_DEFINES[key],
          width: 100,
          height: 100,
        });
      } else if (/.*\.json/.test(WIL_IMAGE_DEFINES[key])) {
        images[key] = ConstructGOUVisual({
          type: GOUVisualType.ANIMATION_LOTTIE,
          path: WIL_IMAGE_DEFINES[key],
          width: 100,
          height: 100,
        });
      }
    }

    return images;
  };

  const initSounds = (): { [key: string]: GOUReadAudio } => {
    let sounds: { [key: string]: GOUReadAudio } = {};

    for (const key of Object.keys(WIL_SOUND_ID)) {
      sounds[key] = new GOUReadAudio(WIL_SOUND_DEFINES[key]);
    }
    return sounds;
  };

  const WIL_IMAGES: { [key: string]: GOUVisual } = initImages();
  const WIL_SOUNDS: { [key: string]: GOUReadAudio } = initSounds();
  const isLoadedImages: Ref<boolean> = ref(false);
  const loadImages = () => {
    for (const key of Object.keys(WIL_IMAGES)) {
      if (WIL_IMAGES[key] instanceof GOUImage) {
        (WIL_IMAGES[key] as GOUImage).load();
      } else if (WIL_IMAGES[key] instanceof GOULottie) {
        (WIL_IMAGES[key] as GOULottie).load();
      }
    }
    for (const key of Object.keys(WIL_SOUNDS)) {
      WIL_SOUNDS[key].load();
    }

    // ロードが完了したかを判定する
    let intervalId = setInterval(() => {
      for (const key of Object.keys(WIL_IMAGES)) {
        if (WIL_IMAGES[key] instanceof GOUImage) {
          if (!(WIL_IMAGES[key] as GOUImage).isLoaded()) {
            return;
          }
        } else if (WIL_IMAGES[key] instanceof GOULottie) {
          if (!(WIL_IMAGES[key] as GOULottie).isLoaded()) {
            return;
          }
        }
      }

      isLoadedImages.value = true;
      clearInterval(intervalId);
    }, 100);
  };

  return {
    WIL_IMAGES,
    WIL_SOUNDS,
    isLoadedImages,
    loadImages,
  };
};
