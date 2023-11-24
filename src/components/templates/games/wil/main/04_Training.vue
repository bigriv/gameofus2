<template>
  <div class="c-training">
    <div class="c-training__characters">
      <WilCardList
        v-model:selected="selectedCharacter"
        :dataList="playerCharacters"
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
              <WilCharacterCard :character="props.characters[plan.character]" />
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
      <div>残り日数 {{ days }}日</div>
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
    <div v-if="resultModal.isShow" class="c-training__result_modal">
      <MessageFrame>
        <div
          v-if="resultModal.character"
          class="c-training__result_modal__character"
        >
          <WilCharacterCard :character="resultModal.character" />
        </div>
        <template v-if="resultModal.training">
          <div class="c-training__result_modal__training">
            <WilTrainingCard :training="resultModal.training" />
          </div>
          <div class="c-training__result_modal__training">
            <dl>
              <dt>体力</dt>
              <dd>{{ resultModal.training.before?.life }}</dd>
              <dd>{{ resultModal.training.after?.life }}</dd>
            </dl>
            <dl>
              <dt>攻撃力</dt>
              <dd>{{ resultModal.training.before?.attack }}</dd>
              <dd>{{ resultModal.training.after?.attack }}</dd>
            </dl>
            <dl>
              <dt>防御力</dt>
              <dd>{{ resultModal.training.before?.defense }}</dd>
              <dd>{{ resultModal.training.after?.defense }}</dd>
            </dl>
            <dl>
              <dt>魔力</dt>
              <dd>{{ resultModal.training.before?.magic }}</dd>
              <dd>{{ resultModal.training.after?.magic }}</dd>
            </dl>
            <dl>
              <dt>行動力</dt>
              <dd>{{ resultModal.training.before?.speed }}</dd>
              <dd>{{ resultModal.training.after?.speed }}</dd>
            </dl>
          </div>
        </template>
      </MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, reactive, ref } from "vue";
import WilCardList from "@/components/molecules/games/wil/WilCardList.vue";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WIL_TRAINING_ID } from "@/composables/games/wil/enums/training";
import { WilCharacter } from "@/composables/games/wil/types/character";
import WilCharacterCard from "@/components/molecules/games/wil/WilCharacterCard.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { WilStatus } from "@/composables/games/wil/types/status";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import { WilTraining } from "@/composables/games/wil/types/training";
import WilTrainingCard from "@/components/molecules/games/wil/WilTrainingCard.vue";
import { WilPlayer } from "@/composables/games/wil/types/player";
import {
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";

const props = defineProps({
  characters: {
    type: Object as PropType<{ [key: string]: WilCharacter }>,
    required: true,
  },
  player: {
    type: Object as PropType<WilPlayer>,
    required: true,
  },
});
const selectedCharacter: Ref<WIL_CHARACTER_ID | undefined> = ref();
const playerCharacters: Ref<Array<WilCharacter>> = ref(
  [...props.player.characters].sort()
);
const days = ref(1);
const trainingPlans: {
  [key: string]: {
    training: WilTraining;
    character?: WIL_CHARACTER_ID;
    result?: {
      before: WilStatus;
      after: WilStatus;
    };
    next: WIL_TRAINING_ID | null;
  };
} = reactive({
  ATTACK: {
    training: new WilTraining({
      id: WIL_TRAINING_ID.ATTACK,
      name: "侵攻訓練",
      image: "/games/wil/trainings/swords.svg",
    }),
    character: undefined,
    result: undefined,
    next: WIL_TRAINING_ID.DEFENSE,
  },
  DEFENSE: {
    training: new WilTraining({
      id: WIL_TRAINING_ID.DEFENSE,
      name: "防衛訓練",
      image: "/games/wil/trainings/shield.svg",
    }),
    character: undefined,
    next: WIL_TRAINING_ID.MIGRATION,
  },
  MIGRATION: {
    training: new WilTraining({
      id: WIL_TRAINING_ID.MIGRATION,
      name: "移動訓練",
      image: "/games/wil/trainings/shoes.svg",
    }),
    character: undefined,
    next: WIL_TRAINING_ID.MAGIC,
  },
  MAGIC: {
    training: new WilTraining({
      id: WIL_TRAINING_ID.MAGIC,
      name: "魔導学習",
      image: "/games/wil/trainings/book.svg",
    }),
    character: undefined,
    next: WIL_TRAINING_ID.PHISIC,
  },
  PHISIC: {
    training: new WilTraining({
      id: WIL_TRAINING_ID.PHISIC,
      name: "肉体強化",
      image: "/games/wil/trainings/ironAllay.svg",
    }),
    character: undefined,
    next: null,
  },
});
const isStartableTraining = computed(() => {
  // 残り日数が0日なら訓練開始不可
  if (days.value <= 0) {
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
const resultModal: {
  isShow: boolean;
  character?: WilCharacter;
  training?: WilTraining;
} = reactive({
  isShow: true,
  character: undefined,
  training: undefined,
});

const onSelectTraining = (training: WIL_TRAINING_ID) => {
  if (!selectedCharacter.value) {
    return;
  }

  if (trainingPlans[training].character) {
    // 元々配置されていたキャラをリストに追加
    const character =
      props.characters[trainingPlans[training].character as WIL_CHARACTER_ID];
    playerCharacters.value.push(character);
    playerCharacters.value = playerCharacters.value.sort(
      (a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id)
    );
  }

  // 選択したキャラクターを配置し、リストから削除
  trainingPlans[training].character = selectedCharacter.value;
  playerCharacters.value = playerCharacters.value.filter(
    (c) => c.id !== selectedCharacter.value
  );
  selectedCharacter.value = undefined;
};

const onRemoveCharacter = (training: WIL_TRAINING_ID) => {
  if (trainingPlans[training].character) {
    // 元々配置されていたキャラをリストに追加
    const character =
      props.characters[trainingPlans[training].character as WIL_CHARACTER_ID];
    playerCharacters.value.push(character);
    playerCharacters.value = playerCharacters.value.sort(
      (a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id)
    );
  }

  // 選択を解除
  trainingPlans[training].character = undefined;
};
const showResult = (__plan: WIL_TRAINING_ID) => {};
const onStartTraining = () => {
  for (const key of Object.keys(trainingPlans)) {
    if (trainingPlans[key].character) {
      trainingPlans[key].training;
    }
  }
  if (trainingPlans.ATTACK.character) {
    showResult(WIL_TRAINING_ID.ATTACK);
  } else if (trainingPlans.DEFENSE.character) {
    showResult(WIL_TRAINING_ID.DEFENSE);
  } else if (trainingPlans.MIGRATION.character) {
    showResult(WIL_TRAINING_ID.MIGRATION);
  } else if (trainingPlans.MAGIC.character) {
    showResult(WIL_TRAINING_ID.MAGIC);
  } else if (trainingPlans.PHISIC.character) {
    showResult(WIL_TRAINING_ID.PHISIC);
  }
};
const onEndTraining = () => {};
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
}
@media screen and (max-width: 400px) {
  .c-training__infomation,
  .c-training__plan__cards__content__button {
    font-size: 10px;
  }
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
