<template>
  <div class="c-training">
    <div class="c-training__characters">
      <WilCardList
        :selected="selectedCharacter?.id"
        :dataList="playerCharacters"
        @update:selected="onSelectCharacter"
      />
    </div>
    <div class="c-training__plan">
      <div class="c-training__plan__cards">
        <div
          v-for="plan in trainingPlans"
          class="c-training__plan__cards__content"
        >
          <div class="c-training__plan__cards__content__training">
            <WilTrainingCard
              :training="plan.training"
              @click="onSelectTraining(plan.training.id)"
            />
          </div>
          <template v-if="plan.character">
            <div class="c-training__plan__cards__content__character">
              <WilCharacterCard :character="plan.character" />
            </div>
            <div class="c-training__plan__cards__content__button">
              <GameButton
                label="選択を解除"
                :fontColor="WIL_BUTTON_FONT_COLOR"
                :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
                @click="onRemoveCharacter(plan.training.id)"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="c-training__infomation">
      <div>残り日数 {{ TRAINING_DAYS - day }}日</div>
      <div class="c-training__infomation__button">
        <GameButton
          v-if="isStartableTraining"
          label="訓練開始"
          :fontColor="WIL_BUTTON_FONT_COLOR"
          :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
          @click="onStartTraining"
        />
        <GameButton
          v-else
          label="訓練終了"
          :fontColor="WIL_BUTTON_FONT_COLOR"
          :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
          @click="onEndTraining"
        />
      </div>
    </div>
    <div
      v-if="resultModal.isShow || confirmModal.isShow"
      class="c-training__modal_backgrond"
    ></div>
    <transition name="result_modal">
      <div v-show="resultModal.isShow" class="c-training__result_modal">
        <MessageFrame
          :fontColor="WIL_FRAME_FONT_COLOR"
          :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
          :borderColor="WIL_FRAME_BORDER_COLOR"
        >
          <div class="c-training__result_modal__cards">
            <div
              v-if="resultModal.character"
              class="c-training__result_modal__cards__character"
            >
              <WilCharacterCard :character="resultModal.character" />
            </div>
            <div
              v-if="resultModal.training"
              class="c-training__result_modal__cards__training"
            >
              <WilTrainingCard :training="resultModal.training" />
            </div>
          </div>
          <template v-if="resultModal.training && resultModal.character">
            <div class="c-training__result_modal__result">
              <dl>
                <dt>体力</dt>
                <dd>{{ resultModal.training.before.life }}</dd>
                <dd>⇒</dd>
                <dd
                  :class="{
                    'u-color--red':
                      resultModal.training.before.life <
                      resultModal.character.defaultStatus.life,
                  }"
                >
                  {{ resultModal.character.defaultStatus.life }}
                </dd>
              </dl>
              <dl>
                <dt>攻撃力</dt>
                <dd>{{ resultModal.training.before.attack }}</dd>
                <dd>⇒</dd>
                <dd
                  :class="{
                    'u-color--red':
                      resultModal.training.before.attack <
                      resultModal.character.defaultStatus.attack,
                  }"
                >
                  {{ resultModal.character.defaultStatus.attack }}
                </dd>
              </dl>
              <dl>
                <dt>防御力</dt>
                <dd>{{ resultModal.training.before.defense }}</dd>
                <dd>⇒</dd>
                <dd
                  :class="{
                    'u-color--red':
                      resultModal.training.before.defense <
                      resultModal.character.defaultStatus.defense,
                  }"
                >
                  {{ resultModal.character.defaultStatus.defense }}
                </dd>
              </dl>
              <dl>
                <dt>魔力</dt>
                <dd>{{ resultModal.training.before.magic }}</dd>
                <dd>⇒</dd>
                <dd
                  :class="{
                    'u-color--red':
                      resultModal.training.before.magic <
                      resultModal.character.defaultStatus.magic,
                  }"
                >
                  {{ resultModal.character.defaultStatus.magic }}
                </dd>
              </dl>
              <dl>
                <dt>行動力</dt>
                <dd>{{ resultModal.training.before.speed }}</dd>
                <dd>⇒</dd>
                <dd
                  :class="{
                    'u-color--red':
                      resultModal.training.before.speed <
                      resultModal.character.defaultStatus.speed,
                  }"
                >
                  {{ resultModal.character.defaultStatus.speed }}
                </dd>
              </dl>
            </div>
            <div
              v-if="resultModal.training.learned"
              class="c-training__result_modal__learned"
            >
              {{ props.skills[resultModal.training.learned].name }}を習得した！
            </div>
            <div class="c-training__result_modal__button">
              <GameButton
                label="OK"
                :fontColor="WIL_BUTTON_FONT_COLOR"
                :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
                @click="onClickOk"
              />
            </div>
          </template>
        </MessageFrame>
      </div>
    </transition>
    <transition name="confirm_modal">
      <div v-show="confirmModal.isShow" class="c-training__confirm_modal">
        <MessageFrame
          :fontColor="WIL_FRAME_FONT_COLOR"
          :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
          :borderColor="WIL_FRAME_BORDER_COLOR"
        >
          <div class="c-training__confirm_modal__inner">
            <div class="c-training__confirm_modal__inner__message">
              {{ confirmModal.message }}
            </div>
            <div class="c-training__confirm_modal__inner__buttons">
              <GameButton
                label="OK"
                :fontColor="WIL_BUTTON_FONT_COLOR"
                :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
                @click="confirmModal.onClickOk"
              />
              <GameButton
                v-if="confirmModal.onClickCancel"
                label="キャンセル"
                :fontColor="WIL_BUTTON_FONT_COLOR"
                :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
                @click="confirmModal.onClickCancel"
              />
            </div>
          </div>
        </MessageFrame>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, reactive, ref } from "vue";
import WilCardList from "@/components/molecules/games/wil/WilCardList.vue";
import { WIL_TRAINING_ID } from "@/composables/games/wil/enums/training";
import { WilCharacter } from "@/composables/games/wil/types/character";
import WilCharacterCard from "@/components/molecules/games/wil/WilCharacterCard.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import { WilTraining } from "@/composables/games/wil/types/training";
import WilTrainingCard from "@/components/molecules/games/wil/WilTrainingCard.vue";
import { WilPlayer } from "@/composables/games/wil/types/player";
import {
  WIL_FRAME_FONT_COLOR,
  WIL_FRAME_BORDER_COLOR,
  WIL_FRAME_BACKGROUND_COLOR,
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { useWilTraining } from "@/composables/games/wil/training";

const props = defineProps({
  images: {
    type: Object as PropType<{ [key: string]: GOUVisual }>,
    required: true,
  },
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
    required: true,
  },
  player: {
    type: Object as PropType<WilPlayer>,
    required: true,
  },
});
const emits = defineEmits(["end"]);

const {
  TRAINING_DAYS,
  day,
  playerCharacters,
  trainingPlans,
  training,
  endDay,
} = useWilTraining(props.images, props.player);

// 選択中キャラクター
const selectedCharacter: Ref<WilCharacter | undefined> = ref();

// 訓練開始可否フラグ
const isStartableTraining = computed(() => {
  // 訓練実施日数が一定以上なら訓練開始不可
  if (day.value >= TRAINING_DAYS) {
    return false;
  }

  // 一人でも訓練に設定されていれば訓練開始可能
  for (const key of Object.keys(trainingPlans)) {
    if (trainingPlans[key].character) {
      return true;
    }
  }
  return false;
});

// 訓練結果表示モーダル
const resultModal: {
  isShow: boolean;
  character?: WilCharacter;
  training?: WilTraining;
  next?: WIL_TRAINING_ID;
} = reactive({
  isShow: false,
  character: undefined,
  training: undefined,
  next: undefined,
});

// 確認モーダル
const confirmModal: {
  isShow: boolean;
  message: string;
  onClickOk: Function;
  onClickCancel?: Function;
} = reactive({
  isShow: false,
  message: "",
  onClickOk: () => {},
  onClickCancel: undefined,
});

const onSelectTraining = (training: WIL_TRAINING_ID) => {
  if (!selectedCharacter.value) {
    return;
  }

  if (trainingPlans[training].character) {
    // 元々配置されていたキャラをリストに追加
    const character = trainingPlans[training].character;
    if (!character) {
      return;
    }
    playerCharacters.value.push(character);
    playerCharacters.value = playerCharacters.value.sort(
      (a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id)
    );
  }

  // 選択したキャラクターを配置し、リストから削除
  trainingPlans[training].character = selectedCharacter.value;
  playerCharacters.value = playerCharacters.value.filter(
    (c: WilCharacter) => c.id !== selectedCharacter.value?.id
  );
  selectedCharacter.value = undefined;
};

const onRemoveCharacter = (training: WIL_TRAINING_ID) => {
  if (trainingPlans[training].character) {
    // 元々配置されていたキャラをリストに追加
    const character = trainingPlans[training].character;
    if (!character) {
      return;
    }
    playerCharacters.value.push(character);
    playerCharacters.value = playerCharacters.value.sort(
      (a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id)
    );
  }

  // 選択を解除
  trainingPlans[training].character = undefined;
};
const showResult = (plan?: WIL_TRAINING_ID) => {
  resultModal.training = undefined;
  resultModal.character = undefined;
  resultModal.next = undefined;

  if (!plan) {
    // 次の訓練結果がない場合はその日の訓練を終わる
    confirmModal.message = `${
      day.value + 1
    }日目の訓練が終了しました。`;
    confirmModal.onClickOk = () => {
      endDay();
      // 最終日の場合は訓練自体を終わる
      if (day.value >= TRAINING_DAYS) {
        confirmModal.message = "訓練を終了します。";
        confirmModal.onClickOk = () => {
          confirmModal.isShow = false;
          emits("end");
        };
        confirmModal.onClickCancel = undefined;
        confirmModal.isShow = true;
      }
      confirmModal.isShow = false;
    };
    confirmModal.onClickCancel = undefined;
    confirmModal.isShow = true;
    return;
  }

  if (!trainingPlans[plan].character) {
    // キャラクターが設定されていなければ次の訓練結果を表示する
    showResult(trainingPlans[plan].next);
    return;
  }
  resultModal.character = trainingPlans[plan].character;
  resultModal.training = trainingPlans[plan].training;
  resultModal.next = trainingPlans[plan].next;
  setTimeout(() => {
    resultModal.isShow = true;
  }, 50);
};
const onStartTraining = () => {
  for (const key of Object.keys(trainingPlans)) {
    if (!trainingPlans[key].character) {
      continue;
    }
    training(
      trainingPlans[key].character as WilCharacter,
      trainingPlans[key].training
    );
  }

  showResult(WIL_TRAINING_ID.ATTACK);
};
const onSelectCharacter = (id: string) => {
  selectedCharacter.value = playerCharacters.value.find(
    (character: WilCharacter) => character.id === id
  );
};
const onClickOk = () => {
  resultModal.isShow = false;
  showResult(resultModal.next);
};

const onEndTraining = () => {
  confirmModal.message = "訓練を終了します。";
  confirmModal.onClickOk = () => {
    confirmModal.isShow = false;
    emits("end");
  };
  confirmModal.onClickCancel = () => {
    confirmModal.isShow = false;
  };
  confirmModal.isShow = true;
};
</script>

<style scoped lang="scss">
.c-training {
  position: relative;
  width: 100%;
  height: 100%;
  &__characters {
    position: absolute;
    top: 5%;
    left: 0;
    width: 100%;
    height: 30%;
  }

  &__plan {
    position: absolute;
    top: 40%;
    width: 100%;
    height: 40%;
    &__cards {
      position: relative;
      display: flex;
      justify-content: space-between;
      width: 90%;
      height: 100%;
      margin: auto;
      &__content {
        position: relative;
        width: 19.2%;
        height: 100%;
        &__training {
          position: absolute;
          top: 0;
          width: 100%;
          height: 70%;
        }
        &__character {
          position: absolute;
          top: 16%;
          width: 100%;
          height: 70%;
        }
        &__button {
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 14%;
        }
      }
    }
  }
  &__infomation {
    position: absolute;
    bottom: 5%;
    left: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    height: 10%;
    border: 2px solid white;
    color: white;
    padding: 0 2%;
    margin: auto;
    &__button {
      width: 20%;
      height: 80%;
    }
  }
  &__modal_backgrond {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__result_modal {
    width: 50%;
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
  &__confirm_modal {
    width: 50%;
    height: 20%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    &__inner {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      height: 100%;
      padding: 2%;
      &__message {
        text-align: center;
      }
      &__buttons {
        margin-top: 8%;
        display: flex;
        justify-content: space-around;
        > div {
          width: 36%;
        }
      }
    }
  }
}
@media screen and (max-width: 400px) {
  .c-training__infomation,
  .c-training__plan__cards__content__button {
    font-size: 10px;
  }
}

.result_modal-enter-active,
.result_modal-leave-active,
.confirm_modal-enter-active,
.confirm_modal-leave-active {
  transition: height 0.2s ease;
}
.result_modal-enter-from,
.result_modal-leave-to,
.confirm_modal-enter-from,
.confirm_modal-leave-to {
  height: 0;
}
@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-training__infomation,
  .c-training__plan__cards__content__button {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-training__infomation,
  .c-training__plan__cards__content__button {
    font-size: 14px;
  }
  .c-training__plan__cards__content__menu {
    font-size: 16px;
  }
}
</style>
