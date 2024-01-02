<template>
  <div class="c-battle">
    <div class="c-battle__background">
      <GOUVisualCanvas :objects="{ background: background }" />
    </div>
    <div class="c-battle__sequence">
      <div
        v-for="character in moveSequence"
        class="c-battle__sequence__character"
      >
        <GOUVisualCanvas :objects="{ character: character.visual.standing }" />
      </div>
    </div>
    <div class="c-battle__log">
      <GameButton
        label="ログ"
        :fontColor="WIL_BUTTON_FONT_COLOR"
        :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
        @click="isShowLog = true"
      />
    </div>
    <div class="c-battle__field">
      <Field
        :battle="(battle as WilBattle)"
        @selectComputerCell="onClickComputerField"
        @selectPlayerCell="onClickPlayerField"
        @hover="onHoverFieldCell"
        @leave="onLeaveFieldCell"
      />
    </div>

    <transition>
      <div
        v-show="battle.timming == WIL_BATTLE_TIMMING.BATTLE_START"
        class="c-battle__start"
      >
        <div class="c-battle__start__text">開戦</div>
      </div>
    </transition>

    <div class="c-battle__guide">
      {{ guideMessage }}
    </div>
    <UnderFrame
      ref="underFrame"
      :battle="(battle as WilBattle)"
      :skills="props.skills"
      :hoverCell="hoverCell"
      @error="error"
      @endSet="endSet"
      @skipTurn="skipTurn"
    />
  </div>
  <div class="c-battle__log_dialog">
    <WilLogDialog v-model:isShow="isShowLog" :log="battle.log" />
  </div>
  <div class="c-battle__confirm_dialog">
    <WilConfirmDialog
      v-model:isShow="confirmModal.isShow"
      :cancelable="false"
      :message="confirmModal.message"
      @submit="confirmModal.onClickOk"
    />
  </div>
</template>

<script setup lang="ts">
import {
  PropType,
  Ref,
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
} from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import Field from "@/components/templates/games/wil/main/battle/01_Field.vue";
import UnderFrame from "@/components/templates/games/wil/main/battle/02_UnderFrame.vue";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilPlayer } from "@/composables/games/wil/types/player";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";
import { WilBattleEvent } from "@/composables/games/wil/types/event";
import {
  WilBattle,
  WilBattleMoveResult,
} from "@/composables/games/wil/types/battle";
import { WilFieldCell } from "@/composables/games/wil/types/field";
import WilConfirmDialog from "@/components/molecules/games/wil/WilConfirmDialog.vue";
import { WilComputer } from "@/composables/games/wil/types/computer";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import {
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import WilLogDialog from "@/components/molecules/games/wil/WilLogDialog.vue";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { WilCharacter } from "@/composables/games/wil/types/character";

const props = defineProps({
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
    required: true,
  },
  sounds: {
    type: Object as PropType<{ [key: string]: GOUReadAudio }>,
    required: true,
  },
  event: {
    type: Object as PropType<WilBattleEvent>,
    required: true,
  },
  player: {
    type: Object as PropType<WilPlayer>,
    required: true,
  },
});
const emits = defineEmits(["end"]);

const background = props.event.background;
const battle = ref(new WilBattle(props.player, props.event));
const hoverCell: Ref<WilFieldCell | undefined> = ref();
const moveSequence: Ref<Array<WilCharacter>> = ref([]);
const guideMessage = ref("キャラクターを配置するマスを選択してください。");
const underFrame: Ref<InstanceType<typeof UnderFrame> | null> = ref(null);
const isShowLog = ref(false);

// 確認モーダル
const confirmModal: {
  isShow: boolean;
  message: string;
  onClickOk: Function;
} = reactive({
  isShow: false,
  message: "",
  onClickOk: () => {},
});

onMounted(() => {
  props.event.processDeploy();
});
onUnmounted(() => {
  props.event.processEnd();
});
const onClickComputerField = (cell: WilFieldCell) => {
  // スキル発動対象選択時
  if (battle.value.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    battle.value.setMoveTarget(cell);
    // 戦闘タイミングを行動処理に変更
    battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE);
    // 行動処理を実行
    battle.value.processMove();
    underFrame.value?.showBattleMoveResult(
      battle.value.moveResults as Array<WilBattleMoveResult>,
      endTurn
    );
    return;
  }
};
const onClickPlayerField = (cell: WilFieldCell) => {
  // キャラクター配置場所選択時
  if (
    battle.value.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL ||
    battle.value.timming === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER
  ) {
    battle.value.setMoveTarget(cell);
    battle.value.changeTimming(WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER);
    return;
  }

  // 移動先マス選択時・スキル発動対象選択時
  if (
    battle.value.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE ||
    battle.value.timming == WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET
  ) {
    battle.value.setMoveTarget(cell);
    // 戦闘タイミングをプレイヤー行動処理に変更
    battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE);
    // 行動処理を実行
    battle.value.processMove();
    underFrame.value?.showBattleMoveResult(
      battle.value.moveResults as Array<WilBattleMoveResult>,
      endTurn
    );
    return;
  }
};
const error = (message: string) => {
  alert(message);
};
const endSet = () => {
  battle.value.computer.deployCharacters(props.event.deploy);
  props.event.processBattle();
  // 戦闘開始の前処理を実行
  battle.value.startBattle();

  // 戦闘タイミングを戦闘開始に変更
  battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_START);
  setTimeout(() => {
    moveSequence.value = battle.value.getMoveSequence();
    startTurn();
  }, 1500);
};
const startTurn = () => {
  console.log("turn start");
  battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_TURN_START);
  battle.value.startTurn();

  if (battle.value.turnOperator instanceof WilComputer) {
    // コンピュータのターンなら行動の決定まで行い、行動処理に遷移
    battle.value.turnOperator.decideBattleMove(battle.value as WilBattle);
    setTimeout(() => {
      battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE);
      battle.value.processMove();
      underFrame.value?.showBattleMoveResult(
        battle.value.moveResults as Array<WilBattleMoveResult>,
        endTurn
      );
    }, 1000);
  } else if (battle.value.turnOperator instanceof WilPlayer) {
    // プレイヤーのターンなら先頭タイミングを行動選択に切り替える
    setTimeout(() => {
      battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE);
    }, 1000);
  }
};
const skipTurn = () => {
  battle.value.skipTurn();
  endTurn();
};
const endTurn = () => {
  console.log("turn end");
  battle.value.endTurn();
  moveSequence.value = battle.value.getMoveSequence();
  underFrame.value?.showBattleMoveResult(
    battle.value.moveResults as Array<WilBattleMoveResult>,
    () => {
      // 戦闘終了判定を実施
      if (battle.value.winner) {
        endBattle();
        return;
      }
      startTurn();
    }
  );
};
const endBattle = () => {
  props.event.processEnd();
  battle.value.changeTimming(WIL_BATTLE_TIMMING.BATTLE_END);
  battle.value.endBattle();
  if (battle.value.winner === WIL_BATTLE_TEAM.PLAYER) {
    props.sounds.BGM_BATTLE_WIN.play();
    confirmModal.message = `${battle.value.computer.teamName}との戦闘に勝利した！`;
    confirmModal.onClickOk = () => {
      props.sounds.BGM_BATTLE_WIN.stop();
      emits("end", battle.value.winner);
    };
    confirmModal.isShow = true;
  } else if (battle.value.winner === WIL_BATTLE_TEAM.COMPUTER) {
    props.sounds.BGM_BATTLE_LOSE.play();
    confirmModal.message = `${battle.value.computer.teamName}との戦闘に敗北した。`;
    confirmModal.onClickOk = () => {
      props.sounds.BGM_BATTLE_LOSE.stop();
      emits("end", battle.value.winner);
    };
    confirmModal.isShow = true;
  }
};
const onHoverFieldCell = (cell: WilFieldCell) => {
  hoverCell.value = cell;
  if (!hoverCell.value.character) {
    return;
  }
  if (battle.value.timming !== WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    return;
  }
  battle.value.updateFieldSelectable();
  battle.value.changeFieldColor(hoverCell.value);
};
const onLeaveFieldCell = () => {
  hoverCell.value = undefined;
  if (battle.value.timming !== WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    return;
  }
  battle.value.updateFieldSelectable();
  battle.value.changeFieldColor(hoverCell.value);
};

watch(
  () => battle.value.timming,
  () => {
    if (!(battle.value.turnOperator instanceof WilPlayer)) {
      guideMessage.value = "";
      return;
    }

    switch (battle.value.timming) {
      case WIL_BATTLE_TIMMING.SET_SELECT_CELL:
        guideMessage.value = "キャラクターを配置するマスを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER:
        guideMessage.value = "配置するキャラクターを選択してください。";
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
      default:
        guideMessage.value = "";
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
  &__sequence {
    position: absolute;
    top: 3%;
    left: 5%;
    width: 60%;
    height: 5%;
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    &__character {
      position: relative;
      width: 6%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.5);
      border: 1px solid white;
      &:nth-child(1) {
        background-color: rgba(255, 255, 0, 0.5);
        border: 1px solid yellow;
      }
    }
  }
  &__log {
    position: absolute;
    top: 2%;
    right: 5%;
    width: 18%;
    height: 7%;
  }
  &__field {
    position: absolute;
    top: 15%;
    left: 5%;
    width: 90%;
    height: 50%;
  }
  &__start {
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
  .c-battle__infomation__turn {
    font-size: 10px;
  }
  .c-battle__start__text {
    font-size: 48px;
  }
  .c-battle__guide,
  .c-battle__infomation__log {
    font-size: 8px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-battle__infomation__turn {
    font-size: 12px;
  }
  .c-battle__start__text {
    font-size: 54px;
  }
  .c-battle__guide,
  .c-battle__infomation__log {
    font-size: 10px;
  }
}
@media screen and (min-width: 600px) {
  .c-battle__infomation__turn {
    font-size: 14px;
  }
  .c-battle__start__text {
    font-size: 72px;
  }
  .c-battle__guide,
  .c-battle__infomation__log {
    font-size: 12px;
  }
}
</style>
