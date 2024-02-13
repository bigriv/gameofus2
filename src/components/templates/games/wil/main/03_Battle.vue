<template>
  <div class="c-battle">
    <div class="c-battle__background" @click="onClickWindow">
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
    <div class="c-battle__field" @click="onClickWindow">
      <Field
        :battle="(battle as WilBattle)"
        :moveResult="moveResult"
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
      :moveResult="moveResult"
      @error="error"
      @setCharacter="setCharacter"
      @endSet="endSet"
      @skipTurn="skipTurn"
    />
  </div>
  <div class="c-log_dialog">
    <WilLogDialog v-model:isShow="isShowLog" :log="battle.log" />
  </div>
  <div class="c-confirm_dialog">
    <WilConfirmDialog
      v-model:isShow="confirmModal.isShow"
      :cancelable="false"
      :message="confirmModal.message"
      @submit="confirmModal.onClickOk"
    />
  </div>

  <div v-if="talkEvent.isStart" class="c-talk">
    <WilTalk :events="talkEvent.talk" @end="talkEvent.endTalk" />
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
import { useGameStore } from "@/pinia/game";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import Field from "@/components/templates/games/wil/main/battle/01_Field.vue";
import UnderFrame from "@/components/templates/games/wil/main/battle/02_UnderFrame.vue";
import WilTalk from "@/components/molecules/games/wil/WilTalk.vue";
import WilConfirmDialog from "@/components/molecules/games/wil/WilConfirmDialog.vue";
import WilLogDialog from "@/components/molecules/games/wil/WilLogDialog.vue";
import {
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilPlayer } from "@/composables/games/wil/types/player";
import {
  WilBattleEvent,
  WilTalkEvent,
} from "@/composables/games/wil/types/event";
import {
  WilBattle,
  WilBattleMoveResult,
} from "@/composables/games/wil/types/battle";
import { WilFieldCell } from "@/composables/games/wil/types/field";
import { WilComputer } from "@/composables/games/wil/types/computer";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";

const props = defineProps({
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
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

const gameStore = useGameStore();
const background = props.event.background;
const battle = ref(new WilBattle(props.player, props.event, props.skills));
const hoverCell: Ref<WilFieldCell | undefined> = ref();
const moveSequence: Ref<Array<WilCharacter>> = ref([]);
const guideMessage = ref("キャラクターを配置するマスを選択してください。");
const underFrame: Ref<InstanceType<typeof UnderFrame> | null> = ref(null);
const isShowLog = ref(false);
const talkEvent: {
  isStart: boolean;
  talk: Array<WilTalkEvent> | undefined;
  endTalk: Function;
} = reactive({
  isStart: false,
  talk: undefined,
  endTalk: () => {},
});

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
  changeTimming(WIL_BATTLE_TIMMING.SET_SELECT_CELL, () => {}); // 会話イベントを取得するためにマウント時にもタイミングの変更を行う
});
onUnmounted(() => {
  props.event.processEnd();
});

// 戦闘の行動結果管理オブジェクト
const moveResult: Ref<WilBattleMoveResult | undefined> = ref();
/**
 * 行動結果の表示処理
 * @param results 行動結果
 * @param afterFunction 表示処理完了後に行う処理
 */
const showBattleMoveResult = (
  results: Array<WilBattleMoveResult>,
  afterFunction: Function
) => {
  if (!underFrame.value) {
    throw new WrongImplementationError("Under Frame is Not initialized.");
  }
  if (results.length <= 0) {
    afterFunction();
    return;
  }
  underFrame.value.messageComplete = false;
  chainBattleMoveResult([...results], afterFunction);
};
const chainBattleMoveResult = (
  results: Array<WilBattleMoveResult>,
  afterFunction: Function
) => {
  const result = results.shift();
  if (!result) {
    moveResult.value = undefined;
    underFrame.value!.messageComplete = true;
    underFrame.value!.onNextMessage = () => {};
    afterFunction();
    return;
  }
  moveResult.value = result;
  underFrame.value!.onNextMessage = () =>
    chainBattleMoveResult(results, afterFunction);
  moveResult.value.process();
};

/**
 * 画面をクリックしたときのイベント処理
 * 戦闘タイミングが戦闘処理時の場合に表示されているメッセージを次に進める
 */
const onClickWindow = () => {
  if (battle.value.timming === WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE) {
    underFrame.value?.onNextMessage();
  }
};
/**
 * コンピュータフィールドクリック時の処理
 * @param cell クリックされたマス
 */
const onClickComputerField = (cell: WilFieldCell) => {
  // スキル発動対象選択時
  if (battle.value.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    battle.value.setMoveTarget(cell);
    // 行動処理を実行
    battle.value.processMove();
    showBattleMoveResult(
      battle.value.moveResults as Array<WilBattleMoveResult>,
      endTurn
    );
    // 戦闘タイミングを行動処理に変更
    changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE, () => {});
    return;
  }

  // 戦闘処理時の
  if (battle.value.timming === WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE) {
    underFrame.value?.onNextMessage();
  }
};
/**
 * プレイヤーフィールドクリック時の処理
 * @param cell クリックされたマス
 */
const onClickPlayerField = (cell: WilFieldCell) => {
  // キャラクター配置場所選択時
  if (
    battle.value.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL ||
    battle.value.timming === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER
  ) {
    battle.value.setMoveTarget(cell);
    changeTimming(WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER, () => {});
    return;
  }

  // 移動先マス選択時・スキル発動対象選択時
  if (
    battle.value.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE ||
    battle.value.timming == WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET
  ) {
    battle.value.setMoveTarget(cell);
    // 行動処理を実行
    battle.value.processMove();
    showBattleMoveResult(
      battle.value.moveResults as Array<WilBattleMoveResult>,
      endTurn
    );
    // 戦闘タイミングを行動処理に変更
    changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE, () => {});
    return;
  }

  // 戦闘処理時の
  if (battle.value.timming === WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE) {
    underFrame.value?.onNextMessage();
  }
};
const error = (message: string) => {
  confirmModal.message = message;
  confirmModal.onClickOk = () => {
    confirmModal.isShow = false;
  };
  confirmModal.isShow = true;
};

/**
 * 戦闘タイミングを変更する
 * 設定されている会話イベントに開始条件を満たすものがあればその会話イベントを開始する
 * @param next 変更後の戦闘タイミング
 * @param afterFunction 変更後に行う処理（間に会話イベントが挟まる場合は会話イベントが終わってから実行される）
 */
const changeTimming = (next: WIL_BATTLE_TIMMING, afterFunction: Function) => {
  battle.value.changeTimming(next);
  talkEvent.talk = props.event.getTalk(battle.value as WilBattle);
  if (!talkEvent.talk) {
    afterFunction();
    return;
  }
  talkEvent.isStart = true;
  talkEvent.endTalk = () => {
    talkEvent.isStart = false;
    talkEvent.talk = undefined;
    afterFunction();
  };
};
/**
 * キャラクター配置時の処理
 * @param character
 */
const setCharacter = (character: WilCharacter) => {
  battle.value.player.moveCharacter = character;
  battle.value.player.deployCharacter();

  changeTimming(WIL_BATTLE_TIMMING.SET_SELECT_CELL, () => {});
};
/**
 * 配置終了時の処理
 */
const endSet = () => {
  battle.value.computer.deployCharacters(props.event.deploy);
  props.event.processBattle();
  // 戦闘開始の前処理を実行
  battle.value.startBattle();

  // 戦闘タイミングを戦闘開始に変更
  changeTimming(WIL_BATTLE_TIMMING.BATTLE_START, () =>
    setTimeout(() => {
      moveSequence.value = battle.value.getMoveSequence();
      startTurn();
    }, 1500)
  );
};
/**
 * ターン開始時の処理
 */
const startTurn = () => {
  console.log("turn start");
  changeTimming(WIL_BATTLE_TIMMING.BATTLE_TURN_START, () => {
    battle.value.startTurn();

    if (battle.value.turnOperator instanceof WilComputer) {
      // コンピュータのターンなら行動の決定まで行い、行動処理に遷移
      battle.value.turnOperator.decideBattleMove(battle.value as WilBattle);
      setTimeout(() => {
        battle.value.processMove();
        showBattleMoveResult(
          battle.value.moveResults as Array<WilBattleMoveResult>,
          endTurn
        );
        changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE, () => {});
      }, 1000);
    } else if (battle.value.turnOperator instanceof WilPlayer) {
      // プレイヤーのターンなら戦闘タイミングを行動選択に切り替える
      setTimeout(() => {
        changeTimming(WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE, () => {});
      }, 500);
    }
  });
};
/**
 * ターンスキップ時の処理
 */
const skipTurn = () => {
  battle.value.skipTurn();
  showBattleMoveResult(
    battle.value.moveResults as Array<WilBattleMoveResult>,
    endTurn
  );
  changeTimming(WIL_BATTLE_TIMMING.BATTLE_PROCESS_MOVE, () => {});
};
/**
 * ターン終了時の処理
 */
const endTurn = () => {
  console.log("turn end");
  battle.value.endTurn();
  moveSequence.value = battle.value.getMoveSequence();
  showBattleMoveResult(
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
/**
 * 戦闘終了時の処理
 */
const endBattle = () => {
  props.event.processEnd();
  changeTimming(WIL_BATTLE_TIMMING.BATTLE_END, () => {
    battle.value.endBattle();
    if (battle.value.winner === WIL_BATTLE_TEAM.PLAYER) {
      gameStore.getSounds[WIL_SOUND_ID.BGM_BATTLE_WIN1].play();
      confirmModal.message = `${battle.value.computer.teamName}との戦闘に勝利した！`;
      confirmModal.onClickOk = () => {
        gameStore.getSounds[WIL_SOUND_ID.BGM_BATTLE_WIN1].stop();
        emits("end", battle.value.winner);
      };
      confirmModal.isShow = true;
    } else if (battle.value.winner === WIL_BATTLE_TEAM.COMPUTER) {
      gameStore.getSounds[WIL_SOUND_ID.BGM_BATTLE_LOSE_SHORT].play();
      confirmModal.message = `${battle.value.computer.teamName}との戦闘に敗北した。`;
      confirmModal.onClickOk = () => {
        gameStore.getSounds[WIL_SOUND_ID.BGM_BATTLE_LOSE_SHORT].stop();
        emits("end", battle.value.winner);
      };
      confirmModal.isShow = true;
    }
  });
};
/**
 * マスにホバーしたときのイベント処理
 * @param cell ホバーされたマス
 */
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
/**
 * マスのホバーが外れた時の処理
 */
const onLeaveFieldCell = () => {
  hoverCell.value = undefined;
  if (battle.value.timming !== WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    return;
  }
  battle.value.updateFieldSelectable();
  battle.value.changeFieldColor(hoverCell.value);
};

/**
 * 戦闘タイミングの監視
 * ガイドメッセージの表示の切り替えを行う
 */
watch(
  () => battle.value.timming,
  () => {
    switch (battle.value.timming) {
      case WIL_BATTLE_TIMMING.SET_SELECT_CELL:
        guideMessage.value = "キャラクターを配置するマスを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER:
        guideMessage.value = "配置するキャラクターを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE:
        guideMessage.value = "移動するマスを選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL:
        guideMessage.value = "技・魔法を選択してください。";
        break;
      case WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET:
        guideMessage.value = "技・魔法の対象を選択してください。";
        break;
      default:
        if (battle.value.turnOperator.moveCharacter) {
          guideMessage.value = `${battle.value.turnOperator.teamName} ${battle.value.turnOperator.moveCharacter?.name}のターン`;
        } else {
          guideMessage.value = "";
        }
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
.c-talk {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  .c-battle__log {
    font-size: 8px;
  }
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
  .c-battle__log {
    font-size: 10px;
  }
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
  .c-battle__log {
    font-size: 14px;
  }
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
