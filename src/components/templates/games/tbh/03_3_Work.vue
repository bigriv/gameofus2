<template>
  <div class="c-work">
    <div class="c-work__character">
      <GOUVisualCanvas :objects="{ character: characterVisual }" />
    </div>
    <div class="c-work__signboard">
      <GOUVisualCanvas :objects="{ signboard: signboardVisual }" />
    </div>
    <div v-if="modal.isShown" class="c-work__dialog">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-work__dialog__message">
          <div class="c-work__dialog__message__text">
            {{ modal.message }}
          </div>
          <div class="c-work__dialog__message__button">
            <GameButton
              label="OK"
              :backgroundColor="COLOR.WHITE"
              :borderColor="COLOR.ORANGE"
              @click="modal.onAgree"
            />
          </div>
        </div>
      </MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount, PropType, ref } from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUFrame from "@/composables/types/visuals/GOUFrame";
import GOUPosition from "@/composables/types/GOUPosition";
import GOURotation from "@/composables/types/GOURotation";
import { COLOR } from "@/composables/types/GOUColor";
import { RotateAnimation } from "@/composables/types/animations/RotateAnimation";
import { ANIMATION_EASING_TYPE } from "@/composables/types/animations/GOUAnimation";
import {
  TBH_MESSAGEFRAME_BACKGROUND_COLOR,
  TBH_MESSAGEFRAME_BORDER_COLOR,
} from "@/composables/games/tbh/const";

const props = defineProps({
  sounds: {
    type: Object as PropType<{ [key: string]: GOUReadAudio }>,
    required: true,
  },
  images: {
    type: Object as PropType<{ [key: string]: GOUVisual }>,
    required: true,
  },
});
const emits = defineEmits(["success"]);

const initWorkingHeroVisual = (): GOUVisual => {
  const visual = new GOUFrame(100, 100);
  const head = props.images.HELMET_HEAD;
  head.width = 100;
  head.height = 100 / 3;
  head.setPosition(new GOUPosition(0, 0));
  visual.setChild("head", head);

  const upper_body = props.images.NORMAL_UPPERBODY;
  upper_body.width = 100;
  upper_body.height = 100 / 3;
  upper_body.setPosition(new GOUPosition(0, 100 / 3));
  visual.setChild("upper_body", upper_body);

  const pcickel = props.images.PICKEL;
  pcickel.width = 100;
  pcickel.height = 100 / 3;
  pcickel.setPosition(new GOUPosition(-30, 100 / 3));
  pcickel.setRotation(new GOURotation(0, 0, -60, new GOUPosition(50, 100)));
  visual.setChild("pickel", pcickel);

  const lower_body = props.images.NORMAL_LOWERBODY;
  lower_body.width = 100;
  lower_body.height = 100 / 3;
  lower_body.setPosition(new GOUPosition(0, (100 / 3) * 2));
  visual.setChild("lower_body", lower_body);

  return visual;
};
const characterVisual = ref(initWorkingHeroVisual());
const signboardVisual = props.images.SIGNBOARD;
let timeoutId: NodeJS.Timeout | undefined = undefined;
const modal = reactive({
  isShown: false,
  message: "5000円ゲット！",
  onAgree: () => emits("success", { stamina: -15, money: 5000 }),
});

onMounted(() => {
  const second = 4;
  timeoutId = setTimeout(() => {
    props.sounds.MONEY.play();
    modal.isShown = true;
  }, second * 1000);

  // アニメーションのセット
  characterVisual.value.children!.pickel.animation = new RotateAnimation(
    true,
    ANIMATION_EASING_TYPE.EASE_IN_OUT,
    1,
    second,
    new GOURotation(0, 0, 0, new GOUPosition(50, 100)),
    new GOURotation(0, 0, -60, new GOUPosition(50, 100))
  );
});
onBeforeUnmount(() => {
  clearTimeout(timeoutId);
});
</script>

<style scoped lang="scss">
.c-work {
  &__character {
    position: absolute;
    bottom: 5%;
    left: 80%;
    width: 25%;
    height: 70%;
    transform: translateX(-50%);
  }
  &__signboard {
    position: absolute;
    bottom: 5%;
    left: 20%;
    width: 30%;
    height: 30%;
    transform: translateX(-50%);
  }
  &__dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 20%;
    &__message {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      white-space: break-spaces;
      &__button {
        width: 30%;
        height: 30%;
        font-size: 16px;
      }
    }
  }
}
@keyframes excavation {
  0% {
    transform: rotate(-20deg) translate(-50%, -100%);
  }
  50% {
    transform: rotate(-150deg) translate(-50%, -100%);
  }
  100% {
    transform: rotate(-20deg) translate(-50%, -100%);
  }
}
</style>
