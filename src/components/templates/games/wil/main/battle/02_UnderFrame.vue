<template>
  <div class="c-under_frame">
    <template v-if="timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL">
      <div class="c-under_frame__message_frame">
        <div>配置する場所を選択してください。</div>
        <div>配置数 {{ field.playerCharacter }} / {{ field.maxCharacter }}</div>
        <div
          v-if="field.playerCharacter == field.maxCharacter"
          class="c-under_frame__message_frame--button u-margin_top--auto"
        >
          <GameButton
            label="配置を終了"
            :fontColor="COLOR.WHITE"
            :backgroundColor="COLOR.BLACK"
            @click="onEndSet"
          />
        </div>
      </div>
    </template>

    <template v-if="timming === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER">
      <button
        class="c-under_frame__pre_button"
        :disabled="cardStart <= 0"
        @click="cardStart--"
      ></button>
      <div class="c-under_frame__cards" :style="{ '--cardStart': cardStart }">
        <template v-for="character in playerCharacters">
          <div v-if="!character.selected" class="c-under_frame__cards__content">
            <WilCharacterCard
              :character="character.character"
              @click="onSetCharacter"
            />
          </div>
        </template>
        <div class="c-under_frame__cards__content">
          <WilCard @click="onRemoveSetCharacter">
            <div class="c-under_frame__cards__content--other">外す</div>
          </WilCard>
        </div>
      </div>
      <button
        class="c-under_frame__next_button"
        :disabled="cardStart >= playerCharacters.length - 4"
        @click="cardStart++"
      ></button>
    </template>

    <template v-if="timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER">
      <div class="c-under_frame__message_frame">
        <div>行動するキャラクターを選択してください。</div>
        <div class="c-under_frame__message_frame--button u-margin_top--auto">
          <GameButton
            label="ターンを終了"
            :fontColor="COLOR.WHITE"
            :backgroundColor="COLOR.BLACK"
            @click="func"
          />
        </div>
      </div>
    </template>

    <template v-if="timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE">
      <template v-if="selectedCharacter">
        <div class="c-under_frame__card">
          <WilCharacterCard :character="props.characters[selectedCharacter]" />
        </div>
        <div class="c-under_frame__status">
          <NameValueTable
            :backgroundColor="new GOUColor(COLOR.BLACK, 0.8)"
            :borderColor="new GOUColor(COLOR.WHITE, 0.8)"
            :fontColor="COLOR.WHITE"
            :dataList="characterStatusList"
          />
        </div>
        <div class="c-under_frame__contents">
          <div class="c-under_frame__contents__button">
            <GameButton
              label="移動"
              :fontColor="COLOR.WHITE"
              :backgroundColor="COLOR.BLACK"
              @click="onMigrate"
            />
          </div>
          <div class="c-under_frame__contents__button">
            <GameButton
              label="スキル"
              :fontColor="COLOR.WHITE"
              :backgroundColor="COLOR.BLACK"
              @click="onSkill"
            />
          </div>
          <div class="c-under_frame__contents__button">
            <GameButton
              label="戻る"
              :fontColor="COLOR.WHITE"
              :backgroundColor="COLOR.BLACK"
              @click="onBackSelectCharacter"
            />
          </div>
        </div>
      </template>
    </template>

    <template v-if="timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE">
      <template v-if="selectedCharacter">
        <div class="c-under_frame__card">
          <WilCharacterCard :character="props.characters[selectedCharacter]" />
        </div>
        <div class="c-under_frame__status">
          <NameValueTable
            :backgroundColor="new GOUColor(COLOR.BLACK, 0.8)"
            :borderColor="new GOUColor(COLOR.WHITE, 0.8)"
            :fontColor="COLOR.WHITE"
            :dataList="characterStatusList"
          />
        </div>
        <div class="c-under_frame__contents">
          <div class="c-under_frame__contents__message">
            移動先を選択してください。
          </div>
          <div class="c-under_frame__contents__button">
            <GameButton
              label="戻る"
              :fontColor="COLOR.WHITE"
              :backgroundColor="COLOR.BLACK"
              @click="onBackSelectMove"
            />
          </div>
        </div>
      </template>
    </template>

    <template v-else-if="timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL">
      <button
        class="c-under_frame__pre_button"
        :disabled="cardStart <= 0"
        @click="cardStart--"
      ></button>
      <div class="c-under_frame__cards" :style="{ '--cardStart': cardStart }">
        <div
          v-for="skill in enableSkills"
          class="c-under_frame__cards__content"
        >
          <WilSkillCard :skill="skill" @click="onSelectSkill" />
        </div>
        <div class="c-under_frame__cards__content">
          <WilCard @click="onBackSelectMove">
            <div class="c-under_frame__cards__content--other">戻る</div>
          </WilCard>
        </div>
      </div>
      <button
        class="c-under_frame__next_button"
        :disabled="cardStart >= (enableSkills?.length ?? 0) - 4"
        @click="cardStart++"
      ></button>
    </template>

    <template v-if="timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET">
      <template v-if="selectedSkill">
        <div class="c-under_frame__card">
          <WilSkillCard :skill="props.skills[selectedSkill]" />
        </div>
        <div class="c-under_frame__message">
          <div class="u-d_flex--between">
            <div>消費行動力</div>
            <div>{{ props.skills[selectedSkill].cost }}</div>
          </div>
          <div>効果</div>
          <div>{{ props.skills[selectedSkill].description }}</div>
        </div>
        <div class="c-under_frame__contents">
          <div class="c-under_frame__contents__message">
            対象を選択してください。
          </div>
          <div class="c-under_frame__contents__button">
            <GameButton
              label="戻る"
              :fontColor="COLOR.WHITE"
              :backgroundColor="COLOR.BLACK"
              @click="onSkill"
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, onMounted, ref } from "vue";
import WilCard from "@/components/molecules/games/wil/WilCard.vue";
import WilCharacterCard from "@/components/molecules/games/wil/WilCharacterCard.vue";
import WilSkillCard from "@/components/molecules/games/wil/WilSkillCard.vue";
import NameValueTable from "@/components/atoms/tables/NameValueTable.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WilBurnCondition } from "@/composables/games/wil/types/condition";
import { WIL_SKILL_ID } from "@/composables/games/wil/enums/skill";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilField } from "@/composables/games/wil/types/field";

const props = defineProps({
  timming: {
    type: String as PropType<WIL_BATTLE_TIMMING>,
    required: true,
  },
  characters: {
    type: Object as PropType<{ [key: string]: WilCharacter }>,
    required: true,
  },
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
    required: true,
  },
  field: {
    type: Object as PropType<WilField>,
    required: true,
  },
  selectedCharacter: {
    type: String as PropType<WIL_CHARACTER_ID>,
    default: undefined,
  },
  playerCharacters: {
    type: Array<WilCharacter>,
    required: true,
  },
});

const emits = defineEmits([
  "update:timming",
  "update:selectedCharacter",
  "setCharacter",
  "removeCharacter",
]);
const timming = computed({
  get: () => props.timming,
  set: (newValue) => emits("update:timming", newValue),
});
const playerCharacters: Ref<
  Array<{ character: WilCharacter; selected: boolean }>
> = ref([]);
const selectedCharacter = computed({
  get: () => props.selectedCharacter,
  set: (newValue) => emits("update:selectedCharacter", newValue),
});
const characterStatusList = computed(() => {
  if (!selectedCharacter.value) {
    return [];
  }
  const character = props.characters[selectedCharacter.value];
  const defaultStatus = character.defaultStatus;
  const status = character.status;
  let condition = "健康";
  // TODO: 各状態異常の分岐を追加
  if (character.condition instanceof WilBurnCondition) {
    condition = "火傷";
  }
  return [
    { name: "状態", value: condition },
    { name: "体力", value: `${status.life}/${defaultStatus.life}` },
    { name: "攻撃力", value: `${status.attack}` },
    { name: "防御力", value: `${status.defense}` },
    { name: "魔力", value: `${status.magic}` },
    { name: "行動力", value: `${status.speed}` },
  ];
});

const selectedSkill: Ref<WIL_SKILL_ID | null> = ref(null);
const enableSkills = computed(() => {
  if (!selectedCharacter.value) {
    return [];
  }
  const character = props.characters[selectedCharacter.value];
  if (!character?.skills) {
    return [];
  }
  return character.skills.map((skillId) => props.skills[skillId]);
});

const cardStart = ref(0);

onMounted(() => {
  playerCharacters.value = props.playerCharacters.map((character) => {
    return {
      character: character,
      selected: false,
    };
  });
});
const func = () => {};

// 配置終了ボタン押下時のイベント処理
const onEndSet = () => {
  timming.value = WIL_BATTLE_TIMMING.BATTLE_START;
  setTimeout(() => {
    timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER;
    props.field.changeColor(timming.value);
  }, 1500);
};
// 配置キャラクターの選択時のイベント処理
const onSetCharacter = (character: WilCharacter) => {
  emits("setCharacter", character);
  selectedCharacter.value = character.id;
  timming.value = WIL_BATTLE_TIMMING.SET_SELECT_CELL;
};
// 配置済みキャラクターの解除時のイベント処理
const onRemoveSetCharacter = () => {
  emits("removeCharacter");
};
// 移動コマンド選択時のイベント処理
const onMigrate = () => {
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE;
};
// スキルコマンド選択時のイベント処理
const onSkill = () => {
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL;
};
// 行動コマンド選択中の戻るコマンド選択時のイベント処理
const onBackSelectCharacter = () => {
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER;
};
// 行動選択画面に戻る
const onBackSelectMove = () => {
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE;
};
// 発動スキル選択時のイベント処理
const onSelectSkill = (skill: WilSkill) => {
  selectedSkill.value = skill.id;
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET;
};
</script>

<style scoped lang="scss">
.c-under_frame {
  position: absolute;
  top: 70%;
  left: 0;
  width: 100%;
  height: 30%;
  &__cards {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 5%;
    left: 5%;
    display: flex;
    gap: 0 1%;
    overflow: hidden;
    &__content {
      min-width: 19.2%;
      max-width: 19.2%;
      height: 100%;
      transform: translateX(calc(-105% * var(--cardStart)));
      transition: transform 0.3s ease-out;
      &--other {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: white;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
  }
  &__card {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 18%;
    height: 90%;
  }
  &__status {
    position: absolute;
    top: 5%;
    left: 25%;
    width: 32%;
    height: 90%;
  }
  &__message {
    position: absolute;
    top: 5%;
    left: 25%;
    width: 32%;
    height: 90%;
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.8);
    padding: 4px;
    color: white;
  }
  &__contents {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: absolute;
    top: 5%;
    right: 5%;
    width: 35%;
    height: 90%;
    &__button {
      height: 30%;
    }
    &__message {
      height: 60%;
      background-color: rgba(0, 0, 0, 0.8);
      border: 2px solid rgba(255, 255, 255, 0.8);
      padding: 2%;
      color: white;
    }
  }
  &__pre_button,
  &__next_button {
    position: absolute;
    top: 50%;
    width: 20px;
    height: 20px;
    background-color: lightgray;
    border: none;
    cursor: pointer;
    transform: translateY(-50%);
    &:disabled {
      background-color: gray;
    }
  }
  &__pre_button {
    left: 0%;
    clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
  }
  &__next_button {
    right: 0%;
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  }

  &__message_frame {
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
    padding: 2px 5px 5px 5px;
    &--button {
      width: 30%;
      height: 30%;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__message {
    font-size: 10px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__message {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-under_frame__contents__message,
  .c-under_frame__status,
  .c-under_frame__message {
    font-size: 14px;
  }
}
</style>
