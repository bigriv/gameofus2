<template>
  <div class="c-shop">
    <div class="c-shop__character">
      <GOUVisualCanvas :objects="{ shopper: shopper }" />
    </div>
    <div class="c-shop__items">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <dl
          v-for="(item, index) in props.items"
          :key="index"
          @click="selectedItem = item"
        >
          <dt>{{ item.name }}</dt>
          <dd>{{ item.price }}円</dd>
        </dl>
      </MessageFrame>
    </div>
    <div class="c-shop__money">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-shop__money__text">
          <div>所持金</div>
          <div>{{ player.money - usedMoney }}円</div>
        </div>
      </MessageFrame>
    </div>
    <div v-if="selectedItem" class="c-shop__item_detail">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-shop__item_detail__frame">
          <div class="c-shop__item_detail__frame__contents">
            <div>{{ selectedItem.name }}</div>
            <div>{{ selectedItem.price }}円</div>
            <div>{{ selectedItem.detail }}</div>
          </div>
          <div class="c-shop__item_detail__frame__button">
            <GameButton
              label="購入"
              :backgroundColor="COLOR.WHITE"
              :borderColor="COLOR.ORANGE"
              :sounds="{ click: props.sounds.BUTTON }"
              @click="onBuy"
            />
          </div>
        </div>
      </MessageFrame>
    </div>
    <div class="c-shop__button--back">
      <GameButton
        label="帰る"
        :backgroundColor="COLOR.WHITE"
        :borderColor="COLOR.ORANGE"
        :sounds="{ click: props.sounds.BUTTON }"
        @click="onBack"
      />
    </div>
    <div v-if="modal.isShown" class="c-shop__dialog">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-shop__dialog__message">
          <div class="c-shop__dialog__message__text">
            {{ modal.message }}
          </div>
          <div class="c-shop__dialog__message__button">
            <GameButton
              label="OK"
              :backgroundColor="COLOR.WHITE"
              :borderColor="COLOR.ORANGE"
              :sounds="{ click: props.sounds.BUTTON }"
              @click="modal.isShown = false"
            />
          </div>
        </div>
      </MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, PropType, ref, Ref } from "vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { COLOR } from "@/composables/types/GOUColor";
import { TbhItem } from "@/composables/games/tbh/types/item";
import { TbhPlayer } from "@/composables/games/tbh/types/player";
import {
  TBH_MESSAGEFRAME_BACKGROUND_COLOR,
  TBH_MESSAGEFRAME_BORDER_COLOR,
} from "@/composables/games/tbh/const";

const props = defineProps({
  player: {
    type: TbhPlayer,
    required: true,
  },
  items: {
    type: Object as PropType<{ [key: string]: TbhItem }>,
    required: true,
  },
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

const shopper = props.images.SHOPPER;

const selectedItem: Ref<TbhItem | null> = ref(null);
const boughtItems: Array<TbhItem> = [];
const usedMoney = ref(0);
const modal = reactive({
  isShown: false,
  message: "",
});

const onBuy = () => {
  if (!selectedItem.value) {
    throw new WrongImplementationError("Item is not selected.");
  }
  if (
    props.player.items.find((item) => item.id == selectedItem.value!.id) ||
    boughtItems.find((item) => item.id == selectedItem.value!.id)
  ) {
    modal.message = "購入済みです。";
    modal.isShown = true;
    return;
  }
  if (props.player.money - usedMoney.value < selectedItem.value.price) {
    modal.message = "お金が足りません。";
    modal.isShown = true;
    return;
  }
  usedMoney.value += selectedItem.value.price;
  boughtItems.push(selectedItem.value);
  modal.message = `${selectedItem.value.name}を購入しました。`;
  modal.isShown = true;
};
const onBack = () => {
  emits("success", { money: -usedMoney.value, items: boughtItems });
};
</script>

<style scoped lang="scss">
.c-shop {
  &__character {
    position: absolute;
    bottom: 5%;
    left: 50%;
    width: 40%;
    height: 60%;
    transform: translateX(-50%);
  }
  &__items {
    position: absolute;
    top: 2%;
    left: 2%;
    width: 40%;
    height: 42%;
    dl {
      display: flex;
      justify-content: space-between;
      padding: 4px;
      cursor: pointer;
      &:hover {
        background-color: rgba(255, 255, 255, 0.6);
      }
    }
  }
  &__money {
    position: absolute;
    top: 2%;
    right: 2%;
    width: 40%;
    height: 8%;
    &__text {
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  &__item_detail {
    position: absolute;
    top: 12%;
    right: 2%;
    width: 40%;
    height: 32%;
    &__frame {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &__contents {
        div + div {
          margin-top: 2%;
        }
      }
      &__button {
        width: 50%;
        height: 30%;
        font-size: 16px;
      }
    }
  }
  &__button--back {
    position: absolute;
    bottom: 2%;
    left: 2%;
    width: 30%;
    height: 8%;
    font-size: 16px;
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
@media screen and (max-width: 400px) {
  .c-shop {
    font-size: 10px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-shop {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-shop {
    font-size: 14px;
  }
}
</style>
