<template>
  <div class="c-game__drawer">
    <div class="c-game__drawer__upper">
      <div class="c-game__drawer__layer">
        <IntegrationCanvas
          :width="GAME_DISPLAY_WIDTH"
          :height="GAME_DISPLAY_HEIGHT"
          :objects="layer.background"
          :zIndex="1"
        />
      </div>
      <div class="c-game__drawer__layer">
        <IntegrationCanvas
          :width="GAME_DISPLAY_WIDTH"
          :height="GAME_DISPLAY_HEIGHT"
          :objects="layer.objects"
          :zIndex="2"
        />
      </div>
      <div class="c-game__drawer__layer">
        <IntegrationCanvas
          :width="GAME_DISPLAY_WIDTH"
          :height="GAME_DISPLAY_HEIGHT"
          :objects="layer.animations"
          :zIndex="3"
        />
      </div>
    </div>

    <div class="c-game__drawer__lower">
      <div
        v-if="displayMessage.length > 0"
        class="c-game__drawer__lower__message_frame"
        style="z-index: 4"
      >
        <MessageFrame
          :fontColor="COLOR.WHITE"
          :messages="displayMessage"
          :speed="2"
          @click="() => onClickMessageFrame()"
        />
      </div>
      <div
        v-if="buttonList?.length > 0"
        class="c-game__drawer__lower__button_list"
        style="z-index: 5"
      >
        <template v-for="row in buttonList">
          <div
            v-if="row instanceof Array"
            class="c-game__drawer__lower__button_list__row"
          >
            <template v-for="cell in row">
              <GameButton
                fontColor="white"
                :label="cell.label"
                class="c-game__drawer__lower__button_list__button"
                @click="onClickButton(cell.eventId, cell.eventArgs)"
              />
            </template>
          </div>
          <template v-else>
            <GameButton
              fontColor="white"
              :label="row.label"
              class="c-game__drawer__lower__button_list__button"
              @click="onClickButton(row.eventId, row.eventArgs)"
            />
          </template>
        </template>
      </div>
      <div
        v-if="isShowStatusBar"
        class="c-game__drawer__lower__status"
        style="z-index: 6"
      >
        <div class="c-game__drawer__lower__status__life">
          <span>体力</span>
          <GameStatusBar
            :max="player.defaultStatus.life"
            :current="player.status.life"
            :barColor="COLOR.GREEN"
            :borderColor="COLOR.LIGHT_GRAY"
          />
        </div>
        <div class="c-game__drawer__lower__status__satiety">
          <span>満腹度</span>
          <GameStatusBar
            :max="player.defaultStatus.satiety"
            :current="player.status.satiety"
            :barColor="COLOR.BLUE"
            :borderColor="COLOR.LIGHT_GRAY"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import IntegrationCanvas from "@/components/molecules/IntegrationCanvas.vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import GameStatusBar from "@/components/atoms/interfaces/GameStatusBar.vue";
import { COLOR } from "@/composables/types/GOUColor";
import { useWasMain } from "@/composables/games/was/main";
import { WAS_ENDING, WAS_EVENT_TIMMING } from "@/composables/games/was/const";
import { WasPlayerCharacter } from "@/composables/games/was/types/playerCharacter";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasArea } from "@/composables/games/was/types/area";

const props = defineProps({
  loadData: {
    default: undefined,
  },
});
const emits = defineEmits<{
  (
    event: "save",
    timming: WAS_EVENT_TIMMING,
    healed: boolean,
    player: WasPlayerCharacter,
    characters: { [key: string]: WasNonPlayerCharacter },
    bosses: { [key: string]: WasNonPlayerCharacter },
    areas: { [key: string]: WasArea }
  ): void;
  (event: "loaded"): void;
  (event: "end", endType: WAS_ENDING): void;
}>();

const {
  GAME_DISPLAY_WIDTH,
  GAME_DISPLAY_HEIGHT,
  resize,
  isLoadedImages,
  loadFile,
  loadSaveData,
  layer,
  displayMessage,
  buttonList,
  isShowStatusBar,
  onClickMessageFrame,
  setClickEvent,
  onClickButton,
  player,
  showMap,
} = useWasMain(props.loadData, emits);

onMounted(() => {
  resize();
  window.addEventListener("resize", resize);
  setClickEvent();
  loadFile();
  loadSaveData();
  emits("loaded");
});

watch(() => isLoadedImages.value, showMap);
</script>

<style scoped lang="scss">
.c-game__drawer {
  position: relative;
  width: 100%;
  height: 100%;
  &__upper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-color: black;
  }
  &__lower {
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    height: 30%;
    border: 6rem solid #d3d3d3;
    background-color: black;
    opacity: 0.8;
    &__message_frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__button_list {
      width: 100%;
      height: 100%;
      &__row {
        display: flex;
        width: 100%;
        height: 25%;
      }
      &__row > &__button {
        width: 25%;
        height: 100%;
      }
      & > &__button {
        width: 25%;
        height: 25%;
      }
    }
    &__status {
      position: absolute;
      top: 0;
      left: 40%;
      width: 50%;
      height: 100%;
      color: white;
      user-select: none;
      span {
        width: 25%;
      }
      &__life {
        position: absolute;
        top: 10rem;
        left: 0;
        display: flex;
        width: 100%;
      }
      &__satiety {
        position: absolute;
        top: 40rem;
        left: 0;
        display: flex;
        width: 100%;
      }
    }
  }
  &__layer {
    position: absolute;
    top: 0;
    left: 0;
  }
}

@media screen and (max-width: 400px) {
  .c-game__drawer__lower__button_list__button,
  .c-game__drawer__lower__message_frame {
    font-size: 12rem;
  }
  .c-game__drawer__lower__status__life > span {
    font-size: 10rem;
  }
  .c-game__drawer__lower__status__satiety > span {
    font-size: 10rem;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-game__drawer__lower__button_list__button,
  .c-game__drawer__lower__message_frame {
    font-size: 14rem;
  }
  .c-game__drawer__lower__status__life > span {
    font-size: 12rem;
  }
  .c-game__drawer__lower__status__satiety > span {
    font-size: 12rem;
  }
}
@media screen and (min-width: 600px) {
  .c-game__drawer__lower__button_list__button,
  .c-game__drawer__lower__message_frame {
    font-size: 16rem;
  }
  .c-game__drawer__lower__status__life > span {
    font-size: 14rem;
  }
  .c-game__drawer__lower__status__satiety > span {
    font-size: 14rem;
  }
}
</style>
