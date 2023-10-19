import { ComputedRef, computed, ref } from "vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUPosition from "@/composables/types/GOUPosition";
import { SlideAnimation } from "@/composables/types/animations/SlideAnimation";
import { ANIMATION_EASING_TYPE } from "@/composables/types/animations/GOUAnimation";
import { TBH_PAGES } from "@/composables/games/tbh/enums/page";
import { TBH_TIMMINGS } from "@/composables/games/tbh/enums/timming";

export const useTbhDisplay = (TBH_IMAGES: { [key: string]: GOUVisual }) => {
  const currentPage = ref(TBH_PAGES.TITLE);
  const timming = ref(TBH_TIMMINGS.OPENING);
  const backgroundLayer: ComputedRef<{ [key: string]: GOUVisual | undefined }> =
    computed(() => {
      let background = undefined;
      switch (currentPage.value) {
        case TBH_PAGES.TITLE:
        case TBH_PAGES.ENDING:
          break;
        case TBH_PAGES.TOP:
          background = TBH_IMAGES.HOME;
          background.width = 100;
          background.height = 100;
          background.animation = undefined;
          break;
        case TBH_PAGES.PATROL:
          background = TBH_IMAGES.RIVERSIDE;
          background.width = 200;
          background.height = 100;
          background.animation = new SlideAnimation(
            4,
            ANIMATION_EASING_TYPE.LINER,
            1,
            new GOUPosition(-50),
            new GOUPosition(0)
          );
          break;
        case TBH_PAGES.TRAINING:
          background = TBH_IMAGES.HOME;
          background.width = 100;
          background.height = 100;
          background.animation = undefined;
          break;
        case TBH_PAGES.WORK:
          background = TBH_IMAGES.RIVERSIDE;
          background.width = 200;
          background.height = 100;
          background.animation = undefined;
          break;
        case TBH_PAGES.SHOP:
          background = TBH_IMAGES.SHOP;
          background.width = 100;
          background.height = 100;
          background.animation = undefined;
          break;
        case TBH_PAGES.REST:
          background = TBH_IMAGES.HOME;
          background.width = 100;
          background.height = 100;
          background.animation = undefined;
          break;
      }
      return { background: background };
    });

  return { currentPage, timming, backgroundLayer };
};
