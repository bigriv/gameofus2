<template>
  <div v-if="isShow" class="c-dialog_backgrond"></div>
  <transition>
    <div v-show="isShow" class="c-result_dialog">
      <MessageFrame
        v-if="props.result"
        :fontColor="WIL_FRAME_FONT_COLOR"
        :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
        :borderColor="WIL_FRAME_BORDER_COLOR"
      >
        <div class="c-result_dialog__cards">
          <div
            v-if="props.result.character"
            class="c-result_dialog__cards__character"
          >
            <WilCharacterCard :character="props.result.character" />
          </div>
          <div v-if="props.result" class="c-result_dialog__cards__training">
            <WilTrainingCard :training="props.result.menu" />
          </div>
        </div>
        <template v-if="props.result">
          <div class="c-result_dialog__result">
            <dl>
              <dt>体力</dt>
              <dd>{{ props.result.before.life }}</dd>
              <dd>⇒</dd>
              <dd
                :class="{
                  'u-color--red':
                    props.result.before.life < props.result.after.life,
                }"
              >
                {{ props.result.after.life }}
              </dd>
            </dl>
            <dl>
              <dt>攻撃力</dt>
              <dd>{{ props.result.before.attack }}</dd>
              <dd>⇒</dd>
              <dd
                :class="{
                  'u-color--red':
                    props.result.before.attack < props.result.after.attack,
                }"
              >
                {{ props.result.after.attack }}
              </dd>
            </dl>
            <dl>
              <dt>防御力</dt>
              <dd>{{ props.result.before.defense }}</dd>
              <dd>⇒</dd>
              <dd
                :class="{
                  'u-color--red':
                    props.result.before.defense < props.result.after.defense,
                }"
              >
                {{ props.result.after.defense }}
              </dd>
            </dl>
            <dl>
              <dt>魔力</dt>
              <dd>{{ props.result.before.magic }}</dd>
              <dd>⇒</dd>
              <dd
                :class="{
                  'u-color--red':
                    props.result.before.magic < props.result.after.magic,
                }"
              >
                {{ props.result.after.magic }}
              </dd>
            </dl>
            <dl>
              <dt>敏捷力</dt>
              <dd>{{ props.result.before.speed }}</dd>
              <dd>⇒</dd>
              <dd
                :class="{
                  'u-color--red':
                    props.result.before.speed < props.result.after.speed,
                }"
              >
                {{ props.result.after.speed }}
              </dd>
            </dl>
          </div>
          <div v-if="props.result.learned" class="c-result_dialog__learned">
            {{ props.result.learned.name }}を習得した！
          </div>
          <div class="c-result_dialog__button">
            <GameButton
              label="OK"
              :fontColor="WIL_BUTTON_FONT_COLOR"
              :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
              @click="onSubmit"
            />
          </div>
        </template>
      </MessageFrame>
    </div>
  </transition>
</template>

<script setup lang="ts">
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import WilCharacterCard from "@/components/molecules/games/wil/WilCharacterCard.vue";
import WilTrainingCard from "@/components/molecules/games/wil/WilTrainingCard.vue";
import {
  WIL_FRAME_FONT_COLOR,
  WIL_FRAME_BORDER_COLOR,
  WIL_FRAME_BACKGROUND_COLOR,
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import { WilTrainingResult } from "@/composables/games/wil/types/training";
import { PropType, computed } from "vue";

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
  result: {
    type: Object as PropType<WilTrainingResult>,
    default: undefined,
  },
});
const emits = defineEmits(["submit", "cancel", "update:isShow"]);

const isShow = computed({
  get: () => props.isShow,
  set: (newValue: boolean) => emits("update:isShow", newValue),
});

const onSubmit = () => {
  emits("submit");
};
</script>

<style scoped lang="scss">
.c-result_dialog {
  width: 60%;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  &__cards {
    display: flex;
    justify-content: space-around;
    height: 36%;
    width: 100%;
    color: black;
    padding: 0% 2%;
    margin-top: 2%;
    &__character {
      width: 36%;
      height: 100%;
    }
    &__training {
      width: 36%;
      height: 100%;
    }
  }
  &__result {
    width: 80%;
    color: white;
    padding: 0% 2%;
    margin-top: 4%;
    dl {
      display: flex;
      justify-content: space-between;
      dt {
        width: 50%;
      }
      dd {
        width: 20%;
        text-align: right;
      }
    }
  }
  &__learned {
    width: 80%;
    padding: 0% 2%;
    margin-top: 2%;
  }
  &__button {
    width: 20%;
    height: 8%;
    padding: 0% 2%;
    margin-top: auto;
    margin-bottom: 2%;
    align-self: center;
  }
}
.c-dialog_backgrond {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.v-enter-active,
.v-leave-active {
  transition: height 0.2s ease;
}
.v-enter-from,
.v-leave-to {
  height: 0;
}
</style>
