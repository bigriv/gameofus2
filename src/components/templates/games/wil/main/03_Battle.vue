<template>
  <div class="c-battle">
    <div class="c-battle__background">
      <GOUVisualCanvas :objects="{ background: background }" />
    </div>
    <div class="c-battle__infomation">
      <div class="c-battle__infomation__turn">{{ infomationMessage }}</div>
    </div>
    <div class="c-battle__field">
      <Field
        :field="field"
        :player="player"
        :events="damageEvents"
        @selectComputerCell="onClickComputerField"
        @selectPlayerCell="onClickPlayerField"
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
        <div class="c-battle__start__text">
          {{ player.moveCharacter?.name }}のターン
        </div>
      </div>
    </transition>
    <transition>
      <div
        v-show="timming == WIL_BATTLE_TIMMING.BATTLE_COMPUTER_TURN_START"
        class="c-battle__computer_turn_start"
      >
        <div class="c-battle__start__text">
          {{ computer.moveCharacter?.name }}のターン
        </div>
      </div>
    </transition>

    <div class="c-battle__guide">
      {{ guideMessage }}
    </div>
    <UnderFrame
      v-model:timming="timming"
      v-model:field="field"
      v-model:player="player"
      :skills="props.skills"
      :computer="computer"
      :hoverCharacter="hoverCharacter"
      :messages="messages"
      @error="error"
      @endSet="endSet"
      @endTurn="endTurn"
      @endMessage="endTurn"
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
import { useWilBattle } from "@/composables/games/wil/battle";
import { WilBattle } from "@/composables/games/wil/types/battle";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";
import {
  WilBattleEvent,
  WilDamageEvent,
} from "@/composables/games/wil/types/event";
import { WilOperator } from "@/composables/games/wil/types/operator";

const props = defineProps({
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
    required: true,
  },
  battle: {
    type: Object as PropType<WilBattle>,
    required: true,
  },
  player: {
    type: Object as PropType<WilPlayer>,
    required: true,
  },
});
const emits = defineEmits(["update:player", "end"]);

const { judgeBattleResult } = useWilBattle();

const timming: Ref<WIL_BATTLE_TIMMING> = ref(
  WIL_BATTLE_TIMMING.SET_SELECT_CELL
);
const field: Ref<WilField> = ref(new WilField());
const background: Ref<GOUVisual> = ref(props.battle.background);
const enemyName = ref(props.battle.name);
const player = computed({
  get: () => props.player,
  set: (newValue: WilPlayer) => emits("update:player", newValue),
});
const hoverCharacter: Ref<WilCharacter | undefined> = ref();
const computer = ref(new WilComputer());
const infomationMessage = ref("");
const guideMessage = ref("キャラクターを配置するマスを選択してください。");
const damageEvents: Ref<Array<WilDamageEvent>> = ref([]);
const battleEvents: Ref<Array<WilBattleEvent>> = ref([]);
const messages = computed(() => {
  return (
    battleEvents.value
      .filter((event) => event.message)
      // stringに変換するために一度unknownを介しているが、filterをかけているのでundefinedが入ることはない
      .map((event) => event.message as unknown as Array<string>)
  );
});

onMounted(() => {
  field.value.changeColor(timming.value);
});
const onClickComputerField = (x: number, y: number) => {
  // スキル発動対象選択時
  if (timming.value == WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    field.value.resetSelected();
    player.value.targetCell = field.value.getComputerCell(x, y);
    // 戦闘タイミングをプレイヤー戦闘処理に変更
    timming.value = WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER;
    // 戦闘処理を実行
    processBattle(player.value);
    return;
  }
};
const onClickPlayerField = (x: number, y: number) => {
  // キャラクター配置場所選択時
  if (
    timming.value === WIL_BATTLE_TIMMING.SET_SELECT_CELL ||
    timming.value === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER
  ) {
    selectSetCell(x, y);
    return;
  }

  // 移動先マス選択時
  if (timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
    field.value.resetSelected();
    player.value.targetCell = field.value.getPlayerCell(x, y);
    // 戦闘タイミングをプレイヤー戦闘処理に変更
    timming.value = WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER;
    // 移動処理を実行
    processBattle(player.value);
    return;
  }

  // スキル発動対象選択時
  if (timming.value == WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    field.value.resetSelected();
    player.value.targetCell = field.value.getPlayerCell(x, y);
    // 戦闘タイミングをプレイヤー戦闘処理に変更
    timming.value = WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER;
    // 戦闘処理を実行
    processBattle(player.value);
    return;
  }
};
const error = (message: string) => {
  alert(message);
};
const endSet = () => {
  // 敵キャラを配置
  field.value.setComputerCharacters(props.battle.deploy);

  // 戦闘開始の前処理を実行
  field.value.processBattleStart();

  // 戦闘タイミングを戦闘開始に変更
  timming.value = WIL_BATTLE_TIMMING.BATTLE_START;
  setTimeout(() => {
    startTurn();
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
const startTurn = () => {
  console.log("turn start");
  // リセット
  field.value.resetSelected();
  player.value.resetMove();
  computer.value.resetMove();
  damageEvents.value = [];
  battleEvents.value = [];

  // ターン開始前の前処理を実施
  const { turnCharacter, turnTeam } = field.value.processTurnStart();

  // ターンプレイヤーによって画面表示を切り替え
  if (turnTeam == WIL_BATTLE_TEAM.PLAYER) {
    player.value.moveCharacter = turnCharacter;
    timming.value = WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START;
  } else if (turnTeam == WIL_BATTLE_TEAM.COMPUTER) {
    computer.value.moveCharacter = turnCharacter;
    timming.value = WIL_BATTLE_TIMMING.BATTLE_COMPUTER_TURN_START;
  }

  infomationMessage.value = `${turnCharacter.name}のターン`;

  setTimeout(() => {
    if (timming.value == WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START) {
      timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE;
      return;
    }
    if (timming.value == WIL_BATTLE_TIMMING.BATTLE_COMPUTER_TURN_START) {
      computer.value.decideBattleMove(field.value, props.skills);
      timming.value = WIL_BATTLE_TIMMING.BATTLE_PROCESS_COMPUTER_CHARACTER;
      processBattle(computer.value);
      return;
    }
  }, 1000);
};
const endTurn = () => {
  console.log("turn end");
  // 戦闘終了判定を実施
  const result = judgeBattleResult(field.value);
  if (result) {
    endBattle(result);
    return;
  }
  startTurn();
};
const processBattle = (operator: WilOperator) => {
  const result = operator.processBattle(field.value);
  // TODO: 結果表示
  damageEvents.value = result.damageEvents;
  for (let event of result.battleEvents) {
    console.log(event);
    event.func?.();
  }
  battleEvents.value = result.battleEvents;
  console.log("battle process result", result);
  return;
};
const endBattle = (winner: WIL_BATTLE_TEAM) => {
  timming.value = WIL_BATTLE_TIMMING.BATTLE_END;
  if (winner === WIL_BATTLE_TEAM.PLAYER) {
    infomationMessage.value = `${enemyName.value}との戦闘に勝利した！`;
  } else if (winner === WIL_BATTLE_TEAM.COMPUTER) {
    infomationMessage.value = `${enemyName.value}との戦闘に敗北した。`;
  }
  emits("end");
};
watch(
  () => hoverCharacter.value,
  () => {
    if (timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
      field.value.changeColor(
        timming.value,
        player.value.moveCharacter,
        player.value.selectSkill,
        hoverCharacter.value
      );
    }
  }
);
watch(
  () => timming.value,
  () => {
    console.log(
      "change timming",
      timming.value,
      player.value.moveCharacter,
      player.value.selectSkill,
      player.value.targetCell
    );
    field.value.changeColor(
      timming.value,
      player.value.moveCharacter,
      player.value.selectSkill,
      player.value.targetCell?.character
    );

    switch (timming.value) {
      case WIL_BATTLE_TIMMING.SET_SELECT_CELL:
        guideMessage.value = "キャラクターを配置するマスを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER:
        guideMessage.value = "配置するキャラクターを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_START:
      case WIL_BATTLE_TIMMING.BATTLE_PLAYER_TURN_START:
      case WIL_BATTLE_TIMMING.BATTLE_COMPUTER_TURN_START:
      case WIL_BATTLE_TIMMING.TALK:
        guideMessage.value = "";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE:
        guideMessage.value = "行動を選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE:
        guideMessage.value = "移動するマスを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL:
        guideMessage.value = "攻撃・魔法を選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET:
        guideMessage.value = "攻撃・魔法の対象を選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER:
        guideMessage.value = ""; // TODO: 行動結果を表示
        break;
      case WIL_BATTLE_TIMMING.BATTLE_PROCESS_COMPUTER_CHARACTER:
        guideMessage.value = ""; // TODO: 行動結果を表示
        break;
      case WIL_BATTLE_TIMMING.BATTLE_END:
        guideMessage.value = "";
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
    height: 5%;
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
  &__computer_turn_start {
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
  &__computer_turn_start {
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
    font-size: 10px;
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
    font-size: 12px;
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
    font-size: 14px;
  }
  .c-battle__start__text {
    font-size: 72px;
  }
  .c-battle__guide {
    font-size: 12px;
  }
}
</style>
