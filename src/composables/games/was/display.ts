import { Ref, reactive, ref } from "vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import GOUPosition from "@/composables/types/GOUPosition";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasPlayerCharacter } from "@/composables/games/was/types/playerCharacter";
import {
  WAS_DEFAULT_GAME_DISPLAY_HEIGHT,
  WAS_DEFAULT_GAME_DISPLAY_WIDTH,
} from "@/composables/games/was/const";

export const useWasDispay = () => {
  const GAME_DISPLAY_WIDTH = ref(WAS_DEFAULT_GAME_DISPLAY_WIDTH);
  const GAME_DISPLAY_HEIGHT = ref(WAS_DEFAULT_GAME_DISPLAY_HEIGHT);

  const resize = () => {
    if (document.body.offsetWidth <= 350) {
      GAME_DISPLAY_WIDTH.value = 350;
      GAME_DISPLAY_HEIGHT.value = 350 * 0.7;
    } else if (document.body.offsetWidth <= 600) {
      GAME_DISPLAY_WIDTH.value = document.body.offsetWidth;
      GAME_DISPLAY_HEIGHT.value = document.body.offsetWidth * 0.7;
    } else {
      GAME_DISPLAY_WIDTH.value = WAS_DEFAULT_GAME_DISPLAY_WIDTH;
      GAME_DISPLAY_HEIGHT.value = WAS_DEFAULT_GAME_DISPLAY_HEIGHT;
    }
  };

  const layer: {
    background: GOUVisual | undefined;
    objects: GOUVisual | undefined;
    animations: GOULottie | undefined;
  } = reactive({
    background: undefined,
    objects: undefined,
    animations: undefined,
  });
  const displayMessage: Ref<Array<string>> = ref([]);
  const onClickMessageFrame: Ref<Function> = ref(() => {});
  const buttonList = ref();
  const isShowStatusBar = ref(false);

  const chainMessage: Function = (
    messages: Array<string>,
    afterFunction: Function
  ) => {
    const message = messages.shift();
    if (!message) {
      displayMessage.value = [];
      onClickMessageFrame.value = () => {};
      afterFunction();
      return;
    }
    displayMessage.value = [message];
    onClickMessageFrame.value = () => chainMessage(messages, afterFunction);
  };

  const chainEvent: Function = (
    events: Array<{
      target: WasCharacter;
      message: string;
      sound: GOUAudio;
      animation: GOULottie;
    }>,
    afterFunction: Function
  ) => {
    const event = events.shift();
    if (!event) {
      displayMessage.value = [];
      onClickMessageFrame.value = () => {};
      afterFunction();
      return;
    }
    if (event.message) {
      displayMessage.value = [event.message];
    }
    if (event.sound) {
      event.sound.play();
    }
    if (event.animation) {
      event.animation.setPosition(
        new GOUPosition(
          50 - event.animation.getCenterX(),
          50 - event.animation.getCenterY()
        )
      );
      layer.animations = event.animation;
      if (event.target instanceof WasNonPlayerCharacter) {
        layer.objects!.animation = new GOUAnimation(
          ANIMATION_TYPE.FLASH,
          ANIMATION_EASING_TYPE.EASE,
          0.4,
          2
        );
      } else if (event.target instanceof WasPlayerCharacter) {
        layer.background!.animation = new GOUAnimation(
          ANIMATION_TYPE.SHAKE,
          ANIMATION_EASING_TYPE.EASE,
          0.2,
          2
        );
      }
    } else {
      layer.objects!.animation = undefined;
      layer.animations = undefined;
      layer.background!.animation = undefined;
    }

    onClickMessageFrame.value = () => chainEvent(events, afterFunction);
  };

  return {
    GAME_DISPLAY_WIDTH,
    GAME_DISPLAY_HEIGHT,
    resize,
    layer,
    displayMessage,
    onClickMessageFrame,
    buttonList,
    isShowStatusBar,
    chainMessage,
    chainEvent,
  };
};
