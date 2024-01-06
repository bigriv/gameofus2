<template>
  <div class="c-under_frame">
    <template
      v-if="
        hoverCell?.character &&
        battle.timming !== WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE
      "
    >
      <div class="c-under_frame__card">
        <WilCharacterCard :character="hoverCell.character" />
      </div>
      <div class="c-under_frame__status">
        <NameValueTable
          :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
          :borderColor="WIL_FRAME_BORDER_COLOR"
          :fontColor="WIL_FRAME_FONT_COLOR"
          :dataList="characterStatusList"
        />
      </div>
    </template>

    <template v-else>
      <template v-if="battle.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL">
        <div class="c-under_frame__deploy">
          <div>
            配置数 {{ playerCharacterNum }} / {{ WilField.MAX_CHARACTER }}
          </div>
          <div
            v-if="playerCharacterNum > 0"
            class="c-under_frame__deploy__button u-margin_top--auto"
          >
            <GameButton
              label="配置終了"
              :fontColor="WIL_BUTTON_FONT_COLOR"
              :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
              @click="onEndSet"
            />
          </div>
        </div>
      </template>

      <template
        v-else-if="battle.timming === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER"
      >
        <WilCardList
          :dataList="[
            ...battle.player.deployableCharacters,
            { label: '外す', onClick: onRemoveSetCharacter },
          ]"
          @selectCharacter="onSelectSetCharacter"
        />
      </template>

      <template
        v-else-if="battle.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE"
      >
        <template v-if="battle.player.moveCharacter">
          <div class="c-under_frame__card">
            <WilCharacterCard :character="battle.player.moveCharacter" />
          </div>
          <div class="c-under_frame__status">
            <NameValueTable
              :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
              :borderColor="WIL_FRAME_BORDER_COLOR"
              :fontColor="WIL_FRAME_FONT_COLOR"
              :dataList="characterStatusList"
            />
          </div>
          <div class="c-under_frame__contents">
            <div class="c-under_frame__contents__button">
              <GameButton
                label="移動"
                :fontColor="WIL_BUTTON_FONT_COLOR"
                :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
                @click="onMigrate"
              />
            </div>
            <div class="c-under_frame__contents__button">
              <GameButton
                label="技・魔法"
                :fontColor="WIL_BUTTON_FONT_COLOR"
                :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
                @click="onShowSkillList"
              />
            </div>
            <div class="c-under_frame__contents__button">
              <GameButton
                label="ターンスキップ"
                :fontColor="WIL_BUTTON_FONT_COLOR"
                :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
                @click="onSkipTurn"
              />
            </div>
          </div>
        </template>
      </template>

      <template
        v-else-if="
          battle.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE
        "
      >
        <template v-if="battle.player.moveCharacter">
          <div class="c-under_frame__card">
            <WilCharacterCard :character="battle.player.moveCharacter" />
          </div>
          <div class="c-under_frame__status">
            <NameValueTable
              :backgroundColor="WIL_FRAME_BACKGROUND_COLOR"
              :borderColor="WIL_FRAME_BORDER_COLOR"
              :fontColor="WIL_BUTTON_FONT_COLOR"
              :dataList="characterStatusList"
            />
          </div>
        </template>
        <div class="c-under_frame__contents">
          <div class="c-under_frame__contents__button u-margin_top--auto">
            <GameButton
              label="戻る"
              :fontColor="WIL_BUTTON_FONT_COLOR"
              :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
              @click="onBackSelectMove"
            />
          </div>
        </div>
      </template>

      <template
        v-else-if="
          battle.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL ||
          battle.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET
        "
      >
        <div class="c-under_frame__skills">
          <WilSkillList
            :skillList="skillList"
            :selected="battle.player.selectSkill?.id"
            @select="onSelectSkill"
          />
        </div>
        <template v-if="battle.player.selectSkill">
          <div class="c-under_frame__skill_detail">
            <div class="u-d_flex--between">
              <div>スタック数</div>
              <div>{{ skillCost }}</div>
            </div>
            <div>効果</div>
            <div>{{ battle.player.selectSkill.description }}</div>
          </div>
        </template>
        <div class="c-under_frame__contents">
          <div class="c-under_frame__contents__button u-margin_top--auto">
            <GameButton
              label="戻る"
              :fontColor="WIL_BUTTON_FONT_COLOR"
              :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
              @click="onBackSelectMove"
            />
          </div>
        </div>
      </template>
      <template
        v-else-if="battle.timming === WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE"
      >
        <div class="c-under_frame__message_frame">
          <MessageFrame
            v-model:complete="messageComplete"
            :clickable="true"
            :speed="3"
            :messages="battleResult?.message"
            :fontColor="WIL_FRAME_FONT_COLOR"
            vertical="start"
            horizontal="start"
            @click="() => onNextMessage()"
          />
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, ref } from "vue";
import WilCharacterCard from "@/components/molecules/games/wil/WilCharacterCard.vue";
import WilSkillList from "@/components/molecules/games/wil/WilSkillList.vue";
import NameValueTable from "@/components/atoms/tables/NameValueTable.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilField, WilFieldCell } from "@/composables/games/wil/types/field";
import WilCardList from "@/components/molecules/games/wil/WilCardList.vue";
import {
  WIL_FRAME_FONT_COLOR,
  WIL_FRAME_BORDER_COLOR,
  WIL_FRAME_BACKGROUND_COLOR,
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import {
  WilBattle,
  WilBattleMoveResult,
} from "@/composables/games/wil/types/battle";
import { WilConditionUtil } from "@/composables/games/wil/types/condition";
import { useWilDisplay } from "@/composables/games/wil/display";

const props = defineProps({
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
    required: true,
  },
  battle: {
    type: Object as PropType<WilBattle>,
    required: true,
  },
  hoverCell: {
    type: Object as PropType<WilFieldCell>,
    default: undefined,
  },
});

const emits = defineEmits(["error", "setCharacter", "endSet", "skipTurn"]);
const { messageComplete, onNextMessage } = useWilDisplay();

const battle = computed(() => props.battle);
const playerCharacterNum = computed(() => {
  return battle.value.player.field.countCharacterNum();
});
const characterStatusList = computed(() => {
  let character = battle.value.turnOperator.moveCharacter;
  if (props.hoverCell && props.hoverCell.character) {
    character = props.hoverCell.character;
  }
  if (!character) {
    return [];
  }

  if (battle.value.computer.field.getCharacterCell(character)) {
    // 表示するキャラクターが相手フィールドのキャラクターならステータスを隠蔽する
    return [
      { name: "状態", value: WilConditionUtil.getLabel(character.condition) },
      { name: "体力", value: "???/???" },
      { name: "攻撃力", value: "???" },
      { name: "防御力", value: "???" },
      { name: "魔力", value: "???" },
      { name: "敏捷力", value: "???" },
      { name: "次のターンまで", value: `${character.stack}` },
    ];
  }

  const defaultStatus = character.defaultStatus;
  const status = character.status;
  return [
    { name: "状態", value: WilConditionUtil.getLabel(character.condition) },
    { name: "体力", value: `${status.life}/${defaultStatus.life}` },
    { name: "攻撃力", value: `${status.attack}` },
    { name: "防御力", value: `${status.defense}` },
    { name: "魔力", value: `${status.magic}` },
    { name: "敏捷力", value: `${status.speed}` },
    { name: "次のターンまで", value: `${character.stack}` },
  ];
});

const skillList = computed(() => {
  if (!battle.value.player.moveCharacter) {
    return [];
  }
  const character = battle.value.player.moveCharacter;
  if (!character?.skills) {
    return [];
  }
  return character.skills;
});
const skillCost = computed(() => {
  if (!battle.value.turnOperator.moveCharacter) {
    return 0;
  }
  if (!battle.value.turnOperator.selectSkill) {
    return 0;
  }
  return WilSkill.calcCost(
    battle.value.turnOperator.moveCharacter.condition,
    battle.value.turnOperator.selectSkill
  );
});

// 配置終了ボタン押下時のイベント処理
const onEndSet = () => {
  emits("endSet");
};
// 配置キャラクターの選択時のイベント処理
const onSelectSetCharacter = (character: WilCharacter) => {
  if (WilField.MAX_CHARACTER <= playerCharacterNum.value) {
    emits("error", "これ以上配置できません。");
    return;
  }
  emits("setCharacter", character);
};
// 配置済みキャラクターの解除時のイベント処理
const onRemoveSetCharacter = () => {
  battle.value.player.removeDeployedCharacter();
  // 配置マス選択の表示に切り替え
  battle.value.changeTimming(WIL_BATTLE_TIMMING.SET_SELECT_CELL);
};

// 移動コマンド選択時のイベント処理
const onMigrate = () => {
  // 移動先選択の表示に切り替え
  battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE);
};
// 攻撃・魔法コマンド選択時のイベント処理
const onShowSkillList = () => {
  battle.value.player.selectSkill = undefined;
  // 発動スキル選択の表示に切り替え
  battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL);
};
// 行動選択画面に戻る
const onBackSelectMove = () => {
  battle.value.player.selectSkill = undefined;
  battle.value.player.targetCell = undefined;
  // 行動選択の表示に切り替え
  battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE);
};
// 発動スキル選択時のイベント処理
const onSelectSkill = (skill: WilSkill) => {
  battle.value.player.selectSkill = skill;
  // スキル発動対象の選択に切り替え
  battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET);
};
// ターンスキップ時のイベント処理
const onSkipTurn = () => {
  emits("skipTurn");
};
const battleResult: Ref<WilBattleMoveResult | undefined> = ref();
const showBattleMoveResult = (
  results: Array<WilBattleMoveResult>,
  afterFunction: Function
) => {
  if (results.length <= 0) {
    afterFunction();
    return;
  }
  messageComplete.value = false;
  chainBattleMoveResult([...results], afterFunction);
};
const chainBattleMoveResult = (
  results: Array<WilBattleMoveResult>,
  afterFunction: Function
) => {
  const result = results.shift();
  if (!result) {
    battleResult.value = undefined;
    messageComplete.value = true;
    onNextMessage.value = () => {};
    afterFunction();
    return;
  }
  battleResult.value = result;
  if (result.damage && result.damage.length > 0) {
    battle.value.damageResults = result.damage;
  }
  onNextMessage.value = () => chainBattleMoveResult(results, afterFunction);
  battleResult.value.process();
};

defineExpose({
  showBattleMoveResult,
  onNextMessage,
});
</script>

<style scoped lang="scss">
.c-under_frame {
  position: absolute;
  top: 70%;
  left: 5%;
  width: 90%;
  height: 25%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background-color: rgba(0, 0, 0, 0.8);
  &__card {
    position: absolute;
    top: 5%;
    left: 2%;
    width: 19.2%;
    height: 90%;
  }
  &__status {
    position: absolute;
    top: 5%;
    left: 30%;
    width: 32%;
    height: 90%;
  }
  &__skills {
    position: absolute;
    top: 5%;
    left: 2%;
    width: 25%;
    height: 90%;
  }
  &__skill_detail {
    position: absolute;
    top: 5%;
    left: 30%;
    width: 35%;
    height: 90%;
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
    right: 2%;
    width: 30%;
    height: 90%;
    &__button {
      height: 30%;
    }
    &__message {
      height: 60%;
      padding: 2%;
      color: white;
    }
  }
  &__deploy {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    padding: 2px 5px 5px 5px;
    &__button {
      width: 30%;
      height: 30%;
    }
  }
  &__message_frame {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
@media screen and (max-width: 400px) {
  .c-under_frame__skill_detail,
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__contents__button,
  .c-under_frame__deploy,
  .c-under_frame__deploy__button,
  .c-under_frame__message_frame {
    font-size: 8px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-under_frame__skill_detail,
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__contents__button,
  .c-under_frame__deploy,
  .c-under_frame__deploy__button,
  .c-under_frame__message_frame {
    font-size: 10px;
  }
}
@media screen and (min-width: 600px) {
  .c-under_frame__skill_detail,
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__contents__button,
  .c-under_frame__deploy,
  .c-under_frame__deploy__button,
  .c-under_frame__message_frame {
    font-size: 12px;
  }
}
</style>
