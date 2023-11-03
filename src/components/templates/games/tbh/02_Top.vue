<template>
  <div class="c-top">
    <div v-if="props.timming === TBH_TIMMINGS.OPENING" class="c-top__opening">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-top__opening__message">
          <div class="c-top__opening__message__text">
            {{ message }}
          </div>
          <div class="c-top__opening__message__button">
            <GameButton
              label="OK"
              :backgroundColor="COLOR.WHITE"
              :borderColor="COLOR.ORANGE"
              :sounds="{ click: props.sounds.BUTTON }"
              @click="endOpening"
            />
          </div>
        </div>
      </MessageFrame>
    </div>

    <div class="c-top__menu">
      <div
        v-for="(button, index) in MENU_BUTTONS"
        :key="index"
        class="c-top__menu__button"
      >
        <GameButton
          :label="button.label"
          :backgroundColor="COLOR.WHITE"
          :borderColor="COLOR.ORANGE"
          :sounds="{ click: props.sounds.BUTTON }"
          @click="onMove(button.id)"
        />
      </div>
    </div>

    <div class="c-top__money">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-top__money__label">
          <div>所持金</div>
          <div>{{ props.player.money }}円</div>
        </div>
      </MessageFrame>
    </div>
    <div class="c-top__status">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-top__status__frame">
          <div class="c-top__status__frame__content">
            <span class="c-top__status__frame__content__label">体力</span>
            <GameStatusBar
              :max="100"
              :current="props.player.stamina"
              :barColor="COLOR.GREEN"
              :borderColor="COLOR.LIGHT_GRAY"
              class="c-top__status__frame__content__bar"
            />
          </div>
          <div class="c-top__status__frame__content">
            <span class="c-top__status__frame__content__label">筋力</span>
            <GameStatusBar
              :max="100"
              :current="props.player.status.power"
              :barColor="COLOR.RED"
              :borderColor="COLOR.LIGHT_GRAY"
              class="c-top__status__frame__content__bar"
            />
          </div>
          <div class="c-top__status__frame__content">
            <span class="c-top__status__frame__content__label">正義</span>
            <GameStatusBar
              :max="100"
              :current="props.player.justice"
              :barColor="COLOR.YELLOW"
              :borderColor="COLOR.LIGHT_GRAY"
              class="c-top__status__frame__content__bar"
            />
          </div>
        </div>
      </MessageFrame>
    </div>

    <div class="c-top__character">
      <GOUVisualCanvas :objects="{ player: props.player.visual }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameStatusBar from "@/components/atoms/interfaces/GameStatusBar.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { COLOR } from "@/composables/types/GOUColor";
import { TBH_TIMMINGS } from "@/composables/games/tbh/enums/timming";
import { TBH_PAGES } from "@/composables/games/tbh/enums/page";
import TBH_MESSAGES from "@/composables/games/tbh/defines/message";
import { TbhPlayer } from "@/composables/games/tbh/types/player";
import {
  TBH_MESSAGEFRAME_BACKGROUND_COLOR,
  TBH_MESSAGEFRAME_BORDER_COLOR,
} from "@/composables/games/tbh/const";

const props = defineProps({
  timming: {
    type: Number as PropType<TBH_TIMMINGS>,
    required: true,
  },
  player: {
    type: TbhPlayer,
    required: true,
  },
  sounds: {
    type: Object as PropType<{ [key: string]: GOUReadAudio }>,
    required: true,
  },
});
const emits = defineEmits(["update:timming", "move"]);

const timming = computed({
  get: () => props.timming,
  set: (value) => emits("update:timming", value),
});
const MENU_BUTTONS = [
  {
    label: "パトロール",
    id: TBH_PAGES.PATROL,
  },
  {
    label: "特訓",
    id: TBH_PAGES.TRAINING,
  },
  {
    label: "バイト",
    id: TBH_PAGES.WORK,
  },
  {
    label: "買い物",
    id: TBH_PAGES.SHOP,
  },
  {
    label: "休養",
    id: TBH_PAGES.REST,
  },
];

const message = TBH_MESSAGES.OPENING_01;

const onMove = (id: string) => {
  emits("move", id);
};
const endOpening = () => {
  timming.value = TBH_TIMMINGS.TOP;
};
</script>

<style scoped lang="scss">
.c-top {
  font-family: "DotGothic16";
  &__opening {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 70%;
    height: 25%;
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

  &__menu {
    position: absolute;
    top: 2%;
    left: 2%;
    width: 30%;
    height: 40%;
    &__button {
      width: 100%;
      height: 20%;
    }
  }

  &__money {
    position: absolute;
    top: 2%;
    right: 2%;
    width: 40%;
    height: 8%;
    &__label {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 2%;
    }
  }

  &__status {
    position: absolute;
    top: 12%;
    right: 2%;
    width: 40%;
    height: 20%;
    &__frame {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      &__content {
        display: flex;
        &__label {
          width: 20%;
        }
        &__bar {
          width: 80%;
        }
      }
    }
  }

  &__character {
    position: absolute;
    bottom: 5%;
    left: 50%;
    width: 25%;
    height: 70%;
    transform: translateX(-50%);
  }
}
@media screen and (max-width: 400px) {
  .c-top__menu__button {
    font-size: 14px;
  }
  .c-top__status__frame__content__label,
  .c-top__money__label {
    font-size: 10px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-top__menu__button {
    font-size: 16px;
  }
  .c-top__status__frame__content__label,
  .c-top__money__label {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-top__menu__button {
    font-size: 20px;
  }
  .c-top__status__frame__content__label,
  .c-top__money__label {
    font-size: 14px;
  }
}
</style>
