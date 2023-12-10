<template>
  <div class="c-under_frame">
    <template v-if="hoverCharacter">
      <div class="c-under_frame__card">
        <WilCharacterCard :character="hoverCharacter" />
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
      <template v-if="timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL">
        <div class="c-under_frame__message_frame">
          <div>
            配置数 {{ playerCharacterNum }} / {{ WilField.MAX_CHARACTER }}
          </div>
          <div
            v-if="playerCharacterNum > 0"
            class="c-under_frame__message_frame__button u-margin_top--auto"
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

      <template v-else-if="timming === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER">
        <WilCardList
          :dataList="[
            ...characterList,
            { label: '外す', onClick: onRemoveSetCharacter },
          ]"
          @selectCharacter="onSetCharacter"
        />
      </template>

      <template v-else-if="timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE">
        <template v-if="player.moveCharacter">
          <div class="c-under_frame__card">
            <WilCharacterCard :character="player.moveCharacter" />
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
                label="攻撃・魔法"
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
        v-else-if="timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE"
      >
        <template v-if="player.moveCharacter">
          <div class="c-under_frame__card">
            <WilCharacterCard :character="player.moveCharacter" />
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
          timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL ||
          timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET
        "
      >
        <div class="c-under_frame__skills">
          <WilSkillList
            :skillList="skillList"
            :selected="player.selectSkill?.id"
            @select="onSelectSkill"
          />
        </div>
        <template v-if="player.selectSkill">
          <div class="c-under_frame__message">
            <div class="u-d_flex--between">
              <div>消費ターン数</div>
              <div>{{ player.selectSkill.cost }}</div>
            </div>
            <div>効果</div>
            <div>{{ player.selectSkill.description }}</div>
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
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, ref, watch } from "vue";
import WilCharacterCard from "@/components/molecules/games/wil/WilCharacterCard.vue";
import WilSkillList from "@/components/molecules/games/wil/WilSkillList.vue";
import NameValueTable from "@/components/atoms/tables/NameValueTable.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilField } from "@/composables/games/wil/types/field";
import WilCardList from "@/components/molecules/games/wil/WilCardList.vue";
import { WilPlayer } from "@/composables/games/wil/types/player";
import { WilComputer } from "@/composables/games/wil/types/computer";
import {
  WIL_FRAME_FONT_COLOR,
  WIL_FRAME_BORDER_COLOR,
  WIL_FRAME_BACKGROUND_COLOR,
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";

const props = defineProps({
  timming: {
    type: String as PropType<WIL_BATTLE_TIMMING>,
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
  player: {
    type: Object as PropType<WilPlayer>,
    required: true,
  },
  computer: {
    type: Object as PropType<WilComputer>,
    required: true,
  },
  hoverCharacter: {
    type: Object as PropType<WilCharacter>,
    default: undefined,
  },
});

const emits = defineEmits([
  "update:timming",
  "update:field",
  "update:player",
  "error",
  "endSet",
  "endTurn",
]);
const timming = computed({
  get: () => props.timming,
  set: (newValue: WIL_BATTLE_TIMMING) => emits("update:timming", newValue),
});
const field = computed({
  get: () => props.field,
  set: (newValue: WilField) => emits("update:field", newValue),
});
const playerCharacterNum = computed(() => {
  return field.value.getPlayerNum();
});
const player = computed({
  get: () => props.player,
  set: (newValue: WilPlayer) => emits("update:player", newValue),
});
const characterList: Ref<Array<WilCharacter>> = ref(props.player.allCharacters);
const characterStatusList = computed(() => {
  let character = player.value.moveCharacter;
  if (props.hoverCharacter) {
    character = props.hoverCharacter;
  }
  if (!character) {
    return [];
  }

  if (field.value.getEnemyCharacterCell(character)) {
    // 表示するキャラクターが相手フィールドのキャラクターならステータスを隠蔽する
    return [
      { name: "状態", value: character.condition.getLabel() },
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
    { name: "状態", value: character.condition.getLabel() },
    { name: "体力", value: `${status.life}/${defaultStatus.life}` },
    { name: "攻撃力", value: `${status.attack}` },
    { name: "防御力", value: `${status.defense}` },
    { name: "魔力", value: `${status.magic}` },
    { name: "敏捷力", value: `${status.speed}` },
    { name: "次のターンまで", value: `${character.stack}` },
  ];
});

const skillList = computed(() => {
  if (!player.value.moveCharacter) {
    return [];
  }
  const character = player.value.moveCharacter;
  if (!character?.skills) {
    return [];
  }
  return character.skills.map((skillId) => props.skills[skillId]);
});

// 配置終了ボタン押下時のイベント処理
const onEndSet = () => {
  emits("endSet");
};
// 配置キャラクターの選択時のイベント処理
const onSetCharacter = (character: WilCharacter) => {
  if (!player.value.targetCell) {
    emits("error", "配置場所が選択されていません。");
    return;
  }
  if (WilField.MAX_CHARACTER <= playerCharacterNum.value) {
    emits("error", "これ以上配置できません。");
    return;
  }
  if (player.value.targetCell.character) {
    // キャラクターリストに元々配置されていたキャラクターを追加
    characterList.value.push(player.value.targetCell.character);
    characterList.value.sort((a: WilCharacter, b: WilCharacter) =>
      a.id.localeCompare(b.id)
    );
  }
  // キャラクターリストから配置するキャラクターを排除
  characterList.value = characterList.value.filter(
    (c) => c.id !== character.id
  );

  // 選択マスにキャラクターを配置
  player.value.targetCell.character = character;

  // 配置マス選択の表示に切り替え
  field.value.resetSelected();
  player.value.resetMove();
  timming.value = WIL_BATTLE_TIMMING.SET_SELECT_CELL;
};
// 配置済みキャラクターの解除時のイベント処理
const onRemoveSetCharacter = () => {
  if (!player.value.targetCell) {
    emits("error", "配置場所が選択されていません。");
    return;
  }
  if (player.value.targetCell.character) {
    // キャラクターリストに元々配置されていたキャラクターを追加
    characterList.value.push(player.value.targetCell.character);
    characterList.value.sort((a: WilCharacter, b: WilCharacter) =>
      a.id.localeCompare(b.id)
    );
  }

  // 選択マスのキャラクターを排除
  player.value.targetCell.character = undefined;

  // 配置マス選択の表示に切り替え
  field.value.resetSelected();
  player.value.resetMove();
  timming.value = WIL_BATTLE_TIMMING.SET_SELECT_CELL;
};

// 移動コマンド選択時のイベント処理
const onMigrate = () => {
  // 移動先選択の表示に切り替え
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE;
};
// 攻撃・魔法コマンド選択時のイベント処理
const onShowSkillList = () => {
  player.value.selectSkill = undefined;
  // 発動スキル選択の表示に切り替え
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL;
};
// 行動選択画面に戻る
const onBackSelectMove = () => {
  player.value.selectSkill = undefined;
  player.value.targetCell = undefined;

  // 行動選択の表示に切り替え
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE;
};
// 発動スキル選択時のイベント処理
const onSelectSkill = (skill: WilSkill) => {
  player.value.selectSkill = skill;
  // スキル発動対象の選択に切り替え
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET;
};
// ターンスキップ時のイベント処理
const onSkipTurn = () => {
  if (!player.value.moveCharacter) {
    throw new WrongImplementationError("Move character is not set.");
  }
  const nextMoveCharacter = field.value.getFastCharacter(
    player.value.moveCharacter
  );
  if (!nextMoveCharacter) {
    throw new WrongImplementationError("Couldn't get a next move character.");
  }
  player.value.moveCharacter.stack = nextMoveCharacter.stack + 1;
  emits("endTurn");
};

watch(
  () => timming.value,
  () => {
    if (timming.value === WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START) {
      // キャラクターリストをプレイヤーの配置済みキャラクターのリストに更新
      characterList.value = field.value.getPlayerCharacters();
    } else if (
      timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET
    ) {
      // TODO: 回復スキル・サポートスキルの場合は自分のキャラクターをリストに入れる
      // キャラクターリストを敵の配置済みキャラクターのリストに更新
      characterList.value = field.value.getEnemyCharacters();
    }
  }
);
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
  &__skills {
    position: absolute;
    top: 5%;
    left: 2%;
    width: 25%;
    height: 90%;
  }
  &__status {
    position: absolute;
    top: 5%;
    left: 30%;
    width: 32%;
    height: 90%;
  }
  &__message {
    position: absolute;
    top: 5%;
    left: 30%;
    width: 35%;
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
    right: 2%;
    width: 30%;
    height: 90%;
    &__button {
      height: 30%;
    }
    &__message {
      height: 60%;
      background-color: rgba(0, 0, 0, 0.8);
      padding: 2%;
      color: white;
    }
  }
  &__message_frame {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 2px 5px 5px 5px;
    &__button {
      width: 30%;
      height: 30%;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-under_frame__message,
  .c-under_frame__message_frame__button,
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__contents__button,
  .c-under_frame__message_frame {
    font-size: 8px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-under_frame__message,
  .c-under_frame__message_frame__button,
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__contents__button,
  .c-under_frame__message_frame {
    font-size: 10px;
  }
}
@media screen and (min-width: 600px) {
  .c-under_frame__message,
  .c-under_frame__message_frame__button,
  .c-under_frame__status,
  .c-under_frame__contents__message,
  .c-under_frame__contents__button,
  .c-under_frame__message_frame {
    font-size: 12px;
  }
}
</style>
