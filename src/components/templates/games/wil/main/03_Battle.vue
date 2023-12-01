<template>
  <div class="c-battle">
    <div class="c-battle__background">
      <GOUVisualCanvas :objects="{ background: background }" />
    </div>
    <div class="c-battle__infomation">
      <div class="c-battle__infomation__turn">あなたのターン</div>
      <div class="c-battle__infomation__moveable">
        残りの魔法石 {{ player.magicStone }}
      </div>
    </div>
    <div class="c-battle__field">
      <Field
        :field="field"
        :player="player"
        @selectPlayerCell="onClickField"
        @selectEnemyCell="onClickField"
        @hover="(hover) => (hoverCharacter = hover)"
      />
    </div>

    <transition>
      <div
        v-show="timming == WIL_BATTLE_TIMMING.BATTLE_START"
        class="c-battle__start"
      >
        <div class="c-battle__start__text">開戦</div>
      </div>
    </transition>
    <transition>
      <div
        v-show="timming == WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START"
        class="c-battle__player_turn_start"
      >
        <div class="c-battle__start__text">聖騎士団の侵攻</div>
      </div>
    </transition>
    <transition>
      <div
        v-show="timming == WIL_BATTLE_TIMMING.BATTLE_ENEMY_TURN_START"
        class="c-battle__enemy_turn_start"
      >
        <div class="c-battle__start__text">{{ enemy?.name }}の侵攻</div>
      </div>
    </transition>

    <div class="c-battle__guide">
      {{ message }}
    </div>
    <UnderFrame
      v-model:timming="timming"
      v-model:field="field"
      v-model:player="player"
      :skills="props.skills"
      :computer="computer"
      :hoverCharacter="hoverCharacter"
      @error="error"
      @endSet="endSet"
      @selectSkill="selectSkill"
      @endTurn="endTurn"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, onMounted, ref, watch } from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import Field from "@/components/templates/games/wil/main/battle/01_Field.vue";
import UnderFrame from "@/components/templates/games/wil/main/battle/02_UnderFrame.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilField } from "@/composables/games/wil/types/field.ts";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilPlayer } from "@/composables/games/wil/types/player";
import { WilComputer } from "@/composables/games/wil/types/computer";
import { WilChapter } from "@/composables/games/wil/types/chapter";

const props = defineProps({
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
    required: true,
  },
  chapter: {
    type: Object as PropType<WilChapter>,
    required: true,
  },
  player: {
    type: Object as PropType<WilPlayer>,
    required: true,
  },
});
const emits = defineEmits(["update:player"]);

const background: Ref<GOUVisual | undefined> = ref();
const timming: Ref<WIL_BATTLE_TIMMING> = ref(
  WIL_BATTLE_TIMMING.SET_SELECT_CELL
);
const field: Ref<WilField> = ref(new WilField());
const enemy = ref(props.chapter.proceedNextEnemy());
const player = computed({
  get: () => props.player,
  set: (newValue: WilPlayer) => emits("update:player", newValue),
});
const hoverCharacter: Ref<WilCharacter | undefined> = ref();
const computer = ref(new WilComputer());
const message = ref("キャラクターを配置するマスを選択してください。");

onMounted(() => {
  field.value.changeColor(timming.value);
});
const onClickField = (x: number, y: number) => {
  // キャラクター配置場所選択時
  if (
    timming.value === WIL_BATTLE_TIMMING.SET_SELECT_CELL ||
    timming.value === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER
  ) {
    field.value.resetSelected();
    selectSetCell(x, y);
    return;
  }

  // 移動先マス選択時
  if (timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
    field.value.resetSelected();
    selectMovePlace(x, y);
    return;
  }
};
const error = (message: string) => {
  alert(message);
};
const endSet = () => {
  console.log(enemy.value)
  field.value.setEnemyCharacters(enemy.value!.deploy);
  timming.value = WIL_BATTLE_TIMMING.BATTLE_START;
  setTimeout(() => {
    startPlayerTurn();
  }, 1500);
};
const startPlayerTurn = () => {
  player.value.addMagicStone();
  timming.value = WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START;
  setTimeout(() => {
    timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER;
  }, 1500);
};
const selectSetCell = (x: number, y: number) => {
  field.value.resetSelected();
  if (!field.value.isSetablePlayerCahracter(x, y)) {
    alert("配置できません。");
    return;
  }
  timming.value = WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER;
  const cell = field.value.getPlayerCell(x, y);
  cell!.selected = true;
  player.value.targetCell = cell;
  return;
};
const selectMovePlace = (x: number, y: number) => {
  if (!player.value.selectCharacter) {
    alert("キャラクターが選択されていません。");
    return;
  }
  const cell = field.value.getPlayerCell(x, y);
  if (!cell || cell.character) {
    alert("移動できません。");
    return;
  }
  cell.character = player.value.selectCharacter;
  const pre = field.value.getPlayerCell(cell.x, cell.y);
  if (pre) {
    pre.character = undefined;
  }
  timming.value = WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER;
};
const selectSkill = (skill: WilSkill) => {
  if (!player.value.selectCharacter) {
    alert("キャラクターが選択されていません。");
    return;
  }
  player.value.selectSkill = skill;
  timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET;
};
const endTurn = () => {
  timming.value = WIL_BATTLE_TIMMING.BATTLE_ENEMY_TURN_START;
  setTimeout(() => {
    timming.value = WIL_BATTLE_TIMMING.BATTLE_ENEMY_TURN_START;
  }, 1500);
};

watch(
  () => hoverCharacter.value,
  () => {
    if (timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
      field.value.changeColor(
        timming.value,
        player.value.selectCharacter,
        player.value.selectSkill,
        hoverCharacter.value
      );
    }
  }
);
watch(
  () => timming.value,
  () => {
    field.value.changeColor(
      timming.value,
      player.value.selectCharacter,
      player.value.selectSkill,
      player.value.targetCell?.character
    );

    switch (timming.value) {
      case WIL_BATTLE_TIMMING.SET_SELECT_CELL:
        message.value = "キャラクターを配置するマスを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER:
        message.value = "配置するキャラクターを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_START:
      case WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START:
      case WIL_BATTLE_TIMMING.BATTLE_ENEMY_TURN_START:
      case WIL_BATTLE_TIMMING.TALK:
        message.value = "";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER:
        message.value = "行動するキャラクターを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE:
        message.value = "行動を選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE:
        message.value = "移動するマスを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL:
        message.value = "攻撃・魔法を選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET:
        message.value = "攻撃・魔法の対象を選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER:
        message.value = ""; // TODO: 行動結果を表示
        break;
      case WIL_BATTLE_TIMMING.BATTLE_PROCESS_ENEMY_CHARACTER:
        message.value = ""; // TODO: 行動結果を表示
        break;
      case WIL_BATTLE_TIMMING.BATTLE_END:
        message.value = ""; // TODO: 戦闘結果を表示
        break;
    }
  }
);
</script>

<style scoped lang="scss">
.c-battle {
  position: relative;
  width: 100%;
  height: 100%;
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__infomation {
    position: absolute;
    width: 90%;
    top: 2%;
    left: 5%;
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 2px 5px;
  }
  &__field {
    position: absolute;
    top: 15%;
    left: 5%;
    width: 90%;
    height: 50%;
  }
  &__start,
  &__player_turn_start,
  &__enemy_turn_start {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 25%;
    transform: translateY(-50%);
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    opacity: 1;
    &__text {
      font-family: "Yuji Mai";
      color: white;
      text-shadow: 5px 5px 5px black;
      transform: translateY(-10%);
    }
  }
  &__start {
    background: linear-gradient(135deg, red, #aa0000, #0000aa, blue);
  }
  &__player_turn_start {
    background: linear-gradient(blue, #0000aa);
  }
  &__enemy_turn_start {
    background: linear-gradient(red, #aa0000);
  }
  &__guide {
    position: absolute;
    width: 90%;
    height: 5%;
    top: 65%;
    left: 5%;
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 2px 5px;
  }
}
.v-enter-active {
  transition: all 0.5s ease-out;
}
.v-leave-active {
  transition: all 0.5s ease-in;
}
.v-enter-from {
  top: 0;
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}
@media screen and (max-width: 400px) {
  .c-battle__infomation {
    font-size: 12px;
  }
  .c-battle__start__text {
    font-size: 48px;
  }
  .c-battle__guide {
    font-size: 8px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-battle__infomation {
    font-size: 14px;
  }
  .c-battle__start__text {
    font-size: 54px;
  }
  .c-battle__guide {
    font-size: 10px;
  }
}
@media screen and (min-width: 600px) {
  .c-battle__infomation {
    font-size: 16px;
  }
  .c-battle__start__text {
    font-size: 72px;
  }
  .c-battle__guide {
    font-size: 12px;
  }
}
</style>
