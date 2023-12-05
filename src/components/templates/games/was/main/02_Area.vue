<template>
  <div class="c-area">
    <div class="c-area__background">
      <GOUVisualCanvas :objects="{ backgournd: currentArea.inside }" />
    </div>
    <div v-if="character" class="c-area__character">
      <GOUVisualCanvas :objects="{ character: character.visual }" />
    </div>
    <div v-if="skillEffect" class="c-area__animation">
      <GOUVisualCanvas :objects="{ animation: skillEffect }" />
    </div>
    <div class="c-area__under_frame">
      <div
        v-if="displayMessage.length > 0"
        class="c-area__under_frame__message_frame"
        style="z-index: 4"
      >
        <MessageFrame
          :fontColor="COLOR.WHITE"
          :messages="displayMessage"
          :speed="2"
          :clickable="true"
          @click="() => onClickMessageFrame()"
        />
      </div>
      <div
        v-if="buttonList?.length > 0"
        class="c-area__under_frame__button_list"
        style="z-index: 5"
      >
        <template v-for="row in buttonList">
          <div
            v-if="row instanceof Array"
            class="c-area__under_frame__button_list__row"
          >
            <template v-for="cell in row">
              <GameButton
                :fontColor="COLOR.WHITE"
                :label="cell.label"
                class="c-area__under_frame__button_list__button"
                @click="onClickButton(cell.eventId, cell.eventArgs)"
              />
            </template>
          </div>
          <template v-else>
            <GameButton
              :fontColor="COLOR.WHITE"
              :label="row.label"
              class="c-area__under_frame__button_list__button"
              @click="onClickButton(row.eventId, row.eventArgs)"
            />
          </template>
        </template>
      </div>
      <div
        v-if="isShowStatusBar"
        class="c-area__under_frame__status"
        style="z-index: 6"
      >
        <div class="c-area__under_frame__status__life">
          <span>体力</span>
          <GameStatusBar
            :max="player.defaultStatus.life"
            :current="player.status.life"
            :barColor="COLOR.GREEN"
            :borderColor="COLOR.LIGHT_GRAY"
          />
        </div>
        <div class="c-area__under_frame__status__satiety">
          <span>満腹度</span>
          <GameStatusBar
            :max="player.defaultStatus.satiety"
            :current="player.status.satiety"
            :barColor="COLOR.BLUE"
            :borderColor="COLOR.LIGHT_GRAY"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, onMounted, onUnmounted, ref } from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import GameStatusBar from "@/components/atoms/interfaces/GameStatusBar.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { useWasBattle } from "@/composables/games/was/battle";
import { useWasButton } from "@/composables/games/was/buttons";
import {
  WAS_AREA_ID,
  WAS_BATTLE_MOVE,
  WAS_BATTLE_STATUS,
  WAS_BUTTON_EVENT,
  WAS_ENDING,
  WAS_EVENT_TIMMING,
  WAS_ITEM_ID,
} from "@/composables/games/was/const";
import WAS_SERIF_DEFINE from "@/composables/games/was/defines/serif";
import { WAS_AREA_TIMMING } from "@/composables/games/was/enums/timming";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasItem } from "@/composables/games/was/types/item";
import { WasMap } from "@/composables/games/was/types/map";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasPlayer } from "@/composables/games/was/types/player";
import { WasSkill } from "@/composables/games/was/types/skill";
import { COLOR } from "@/composables/types/GOUColor";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { WasPrincess } from "@/composables/games/was/types/princess";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { WasArea } from "@/composables/games/was/types/area";
import { WAS_SOUND_DEFINE } from "@/composables/games/was/defines/sound";

const props = defineProps({
  items: {
    type: Object as PropType<{ [key: string]: WasItem }>,
    required: true,
  },
  skills: {
    type: Object as PropType<{ [key: string]: WasSkill }>,
    required: true,
  },
  timming: {
    type: Number as PropType<WAS_EVENT_TIMMING>,
    required: true,
  },
  map: {
    type: Object as PropType<WasMap>,
    required: true,
  },
  player: {
    type: Object as PropType<WasPlayer>,
    required: true,
  },
});

const emits = defineEmits([
  "update:timming",
  "update:player",
  "map",
  "save",
  "clear",
  "end",
]);

const {
  EXLPORE_BUTTON_LIST,
  EXPLORE_ITEM_BUTTON_LIST,
  FACE_BUTTON_DEFINE_LIST,
  PERSUADE_BUTTON_LIST,
  BATTLE_BUTTON_LIST,
  SKILL_BUTTON_LIST,
  BATTLE_ITEM_BUTTON_LIST,
} = useWasButton(props.player, props.items, props.skills);

const { battle } = useWasBattle(props.items, props.skills);

const battleBgm = new GOUReadAudio(WAS_SOUND_DEFINE.BGM_BATTLE_1, true);

const eventTimming = computed({
  get: () => props.timming,
  set: (newValue) => emits("update:timming", newValue),
});
const player = computed({
  get: () => props.player,
  set: (newValue) => emits("update:player", newValue),
});
const character: Ref<WasCharacter | undefined> = ref();
const currentArea = ref(props.map.areas[props.player.currentArea]);
const skillEffect: Ref<GOULottie | undefined> = ref();
const timming = ref(WAS_AREA_TIMMING.SELECT_MOVE);

const displayMessage: Ref<Array<string>> = ref([]);
const buttonList = computed(() => {
  if (displayMessage.value.length > 0) {
    return [];
  }
  switch (timming.value) {
    case WAS_AREA_TIMMING.SELECT_MOVE:
      return EXLPORE_BUTTON_LIST;
    case WAS_AREA_TIMMING.EXPLORE:
      return [];
    case WAS_AREA_TIMMING.SELECT_CONSUME_ITEM:
      return EXPLORE_ITEM_BUTTON_LIST.value;
    case WAS_AREA_TIMMING.USE_CONSUME_ITEM:
      return [];
    case WAS_AREA_TIMMING.SELECT_PERSUADE_ITEM:
      return PERSUADE_BUTTON_LIST.value;
    case WAS_AREA_TIMMING.USE_PERSUADE_ITEM:
      return [];
    case WAS_AREA_TIMMING.FACE:
      return FACE_BUTTON_DEFINE_LIST;
    case WAS_AREA_TIMMING.BATTLE_SELECT_MOVE:
      return BATTLE_BUTTON_LIST;
    case WAS_AREA_TIMMING.BATTLE_ATTACK:
      return [];
    case WAS_AREA_TIMMING.BATTLE_SELECT_SKILL:
      return SKILL_BUTTON_LIST.value;
    case WAS_AREA_TIMMING.BATTLE_USE_SKILL:
      return [];
    case WAS_AREA_TIMMING.BATTLE_SELECT_ITEM:
      return BATTLE_ITEM_BUTTON_LIST.value;
    case WAS_AREA_TIMMING.BATTLE_USE_ITEM:
      return [];
  }
});

const isShowStatusBar = computed(() => {
  if (displayMessage.value.length > 0) {
    return false;
  }
  switch (timming.value) {
    case WAS_AREA_TIMMING.SELECT_MOVE:
    case WAS_AREA_TIMMING.BATTLE_SELECT_MOVE:
    case WAS_AREA_TIMMING.FACE:
      return true;
    case WAS_AREA_TIMMING.EXPLORE:
    case WAS_AREA_TIMMING.SELECT_CONSUME_ITEM:
    case WAS_AREA_TIMMING.USE_CONSUME_ITEM:
    case WAS_AREA_TIMMING.SELECT_PERSUADE_ITEM:
    case WAS_AREA_TIMMING.USE_PERSUADE_ITEM:
    case WAS_AREA_TIMMING.BATTLE_ATTACK:
    case WAS_AREA_TIMMING.BATTLE_SELECT_SKILL:
    case WAS_AREA_TIMMING.BATTLE_USE_SKILL:
    case WAS_AREA_TIMMING.BATTLE_SELECT_ITEM:
    case WAS_AREA_TIMMING.BATTLE_USE_ITEM:
      return false;
  }
});

const onClickMessageFrame: Ref<Function> = ref(() => {});

onMounted(() => {
  battleBgm.load();
  currentArea.value.bgm.play();
  if (player.value.currentArea === WAS_AREA_ID.SATAN_CASTLE) {
    showSatanCastle();
  }
});

onUnmounted(() => {
  battleBgm.stop();
  currentArea.value.bgm.stop();
});
const chainMessage: Function = (
  messages: Array<string>,
  afterFunction: Function
) => {
  const message = messages.shift();
  if (!message) {
    displayMessage.value = [];
    onClickMessageFrame.value = () => {};
    afterFunction();
    return;
  }
  displayMessage.value = [message];
  onClickMessageFrame.value = () => chainMessage(messages, afterFunction);
};

const chainEvent: Function = (
  events: Array<{
    target: WasCharacter;
    message: string;
    sound: GOUAudio;
    animation: GOULottie;
  }>,
  afterFunction: Function
) => {
  const event = events.shift();
  if (!event) {
    displayMessage.value = [];
    onClickMessageFrame.value = () => {};
    afterFunction();
    return;
  }
  if (event.message) {
    displayMessage.value = [event.message];
  }
  if (event.sound) {
    event.sound.play();
  }
  if (event.animation) {
    skillEffect.value = event.animation;
    if (event.target instanceof WasNonPlayerCharacter) {
      if (!character.value) {
        return;
      }
      character.value.visual.animation = new GOUAnimation(
        ANIMATION_TYPE.FLASH,
        ANIMATION_EASING_TYPE.EASE,
        0.4,
        2
      );
    } else if (event.target instanceof WasPlayer) {
      console.log("shake");
      currentArea.value.inside.animation = new GOUAnimation(
        ANIMATION_TYPE.SHAKE,
        ANIMATION_EASING_TYPE.EASE,
        0.2,
        2
      );
    }
  } else {
    // アニメーションを削除
    currentArea.value.inside.animation = undefined;
    character.value!.visual.animation = undefined;
    skillEffect.value = undefined;
  }

  onClickMessageFrame.value = () => chainEvent(events, afterFunction);
};
const showArea = () => {
  if (player.value.currentArea === WAS_AREA_ID.SATAN_CASTLE) {
    showSatanCastle();
    return;
  }
  character.value = undefined;
  timming.value = WAS_AREA_TIMMING.SELECT_MOVE;
};
const showFace = () => {
  timming.value = WAS_AREA_TIMMING.FACE;
};
const showBattle = () => {
  currentArea.value.bgm.stop();
  if (!battleBgm.isPlaying()) {
    battleBgm.play();
  }

  timming.value = WAS_AREA_TIMMING.BATTLE_SELECT_MOVE;
};
/**
 * キャラクターの表示を行う
 */
const showCharacter = () => {
  let messages = [];
  const npc = character.value as WasNonPlayerCharacter;
  if (!npc.isPersuaded) {
    messages.push(`${npc.name}が現れた。`);
  }

  let afterFunction = () => {};

  const branch =
    npc.isBoss &&
    (currentArea.value.character as WasNonPlayerCharacter).isPersuaded
      ? 1
      : 2;
  messages.push(...npc.getSerif(branch));
  if (npc.isBoss && npc.isPersuaded) {
    // ボス敵を説得した場合はセリフを表示後、マップに戻る
    afterFunction = () => emits("map");
  } else {
    // それ以外は対面表示に戻る
    afterFunction = showFace;
  }

  chainMessage(messages, afterFunction);
  return;
};

const clearArea = () => {
  currentArea.value.isClear = true;
  player.value.healed = false;
  emits("clear");
};

const onClickButton = (id: WAS_BUTTON_EVENT, args: any) => {
  if (id !== WAS_BUTTON_EVENT.NONE) {
    // 何も起こさない場合以外は表示をリセットする
    displayMessage.value = [];
  }

  switch (id) {
    case WAS_BUTTON_EVENT.EXPLORE:
      const exploreResult = props.player.explore(currentArea.value as WasArea);
      if (!exploreResult) {
        // 探索失敗
        chainMessage(["何もみつからない...。"], showArea);
      } else if (exploreResult instanceof WasCharacter) {
        // キャラクター遭遇
        character.value = exploreResult;
        showCharacter();
      } else if (Object.values(WAS_ITEM_ID).includes(exploreResult)) {
        // アイテム発見
        const item = props.items[exploreResult];
        const addItemResult = player.value.addItem(item);
        let messages = [`${item.name}をみつけた！`];
        if (!addItemResult) {
          messages.push(`しかし、これ以上${item.name}を持てない...。`);
        }
        chainMessage(messages, showArea);
      }
      return;
    case WAS_BUTTON_EVENT.EXPLORE_ITEM:
      timming.value = WAS_AREA_TIMMING.SELECT_CONSUME_ITEM;
      return;
    case WAS_BUTTON_EVENT.USE_EXPLORE_ITEM:
      const item = props.items[args];
      if (!item) {
        alert("エラーが発生しました。");
        throw new WrongImplementationError("Not exsist item is selected.");
      }
      if (!(item.effect instanceof Function)) {
        chainMessage([`${item.name}は今使っても意味がない。`], showArea);
        return;
      }

      const useResult = player.value.useItem(args);
      if (!useResult) {
        chainMessage([`${item.name}を持っていない。`], showArea);
        return;
      }

      const useItemMessages = [];
      useItemMessages.push(`${player.value.name}は${item.name}を使用した！`);

      const result = item.effect(player.value, player.value);
      // 結果詰め込み処理
      if (useItemMessages) {
        useItemMessages.push(result);
      }
      chainMessage(useItemMessages, showArea);
      return;
    case WAS_BUTTON_EVENT.BACK_TO_EXPLORE:
      showArea();
      return;
    case WAS_BUTTON_EVENT.PERSUADE:
      timming.value = WAS_AREA_TIMMING.SELECT_PERSUADE_ITEM;
      return;
    case WAS_BUTTON_EVENT.USE_PERSUADE_ITEM:
      const npc = character.value as WasNonPlayerCharacter;
      if (npc.persuadItem !== args) {
        chainMessage(["なにそれ"], showFace);
        return;
      }
      let afterFunction = showArea;
      npc.isPersuaded = true;
      if (npc.isBoss) {
        // ボス説得時はエリアをクリア状態にしてイベントタイミングを更新する
        afterFunction = clearArea;
      }

      let persuadSuccessMessages = [...npc.serif.PERSUADE_SUCCESS];
      if (npc.occupySkill) {
        let occupySkill = props.skills[npc.occupySkill];
        player.value.skills.push(npc.occupySkill);
        persuadSuccessMessages.push(`${occupySkill.name}を習得した！`);
      }

      chainMessage(persuadSuccessMessages, afterFunction);
      return;
    case WAS_BUTTON_EVENT.BATTLE:
      showBattle();
      return;
    case WAS_BUTTON_EVENT.BACK_TO_FACE:
      showFace();
      return;
    case WAS_BUTTON_EVENT.BACK_TO_MAP:
      emits("map");
      return;
    case WAS_BUTTON_EVENT.BACK_TO_BATTLE:
      showBattle();
      return;
    case WAS_BUTTON_EVENT.NONE:
      return;
    case WAS_BUTTON_EVENT.ATTACK:
      if (!character.value) {
        alert("エラーが発生しました。");
        throw new WrongImplementationError("Character is not set.");
      }
      player.value.setBattleMove(player.value, character.value, {
        type: WAS_BATTLE_MOVE.ATTACK,
      });
      break;
    case WAS_BUTTON_EVENT.SKILL:
      timming.value = WAS_AREA_TIMMING.BATTLE_SELECT_SKILL;
      return;
    case WAS_BUTTON_EVENT.ACTIVATE_SKILL:
      if (!character.value) {
        alert("エラーが発生しました。");
        throw new WrongImplementationError("Character is not set.");
      }
      player.value.setBattleMove(player.value, character.value, {
        type: WAS_BATTLE_MOVE.SKILL,
        skill: props.skills[args],
      });
      break;
    case WAS_BUTTON_EVENT.BATTLE_ITEM:
      timming.value = WAS_AREA_TIMMING.BATTLE_SELECT_ITEM;
      return;
    case WAS_BUTTON_EVENT.USE_BATTLE_ITEM:
      if (!character.value) {
        alert("エラーが発生しました。");
        throw new WrongImplementationError("Character is not set.");
      }
      player.value.setBattleMove(player.value, character.value, {
        type: WAS_BATTLE_MOVE.ITEM,
        item: props.items[args],
      });
      break;
  }

  if (
    ![
      WAS_BUTTON_EVENT.ATTACK,
      WAS_BUTTON_EVENT.ACTIVATE_SKILL,
      WAS_BUTTON_EVENT.USE_BATTLE_ITEM,
    ].includes(id)
  ) {
    return;
  }

  if (!(character.value instanceof WasNonPlayerCharacter)) {
    alert("エラーが発生しました。");
    throw new WrongImplementationError(
      "Character is princess, but she can not fight."
    );
  }
  // 敵の行動を設定
  const npc = character.value as WasNonPlayerCharacter;
  npc.setBattleMove(npc, player.value);

  // 戦闘処理
  const result = battle(player.value, npc);
  let battleResultFunction = showBattle;
  if (result.status == WAS_BATTLE_STATUS.WIN) {
    // 勝利時の処理
    battleResultFunction = () => {
      let afterMessages = [];
      if (
        npc.isBoss &&
        !npc.persuadItem &&
        (currentArea.value.character as WasNonPlayerCharacter).isPersuaded
      ) {
        // ボスで説得アイテムが未設定で雑魚キャラが説得済みの場合は説得成功として処理する
        npc.isPersuaded = true;
        afterMessages = [...npc.serif.PERSUADE_SUCCESS];
        if (npc.occupySkill) {
          const occupySkill = props.skills[npc.occupySkill];
          player.value.skills.push(npc.occupySkill);
          afterMessages.push(`${occupySkill.name}を習得した！`);
        }
      } else {
        afterMessages = [...npc.serif.BATTLE_WIN];
        if (npc.dropItem) {
          const dropItem = props.items[npc.dropItem];
          const addResult = player.value.addItem(dropItem);
          if (addResult) {
            afterMessages.push(`${dropItem.name}を手に入れた！`);
          }
        }
      }

      let afterFunction = showArea;
      if (npc.isBoss) {
        // ボス戦勝利時はエリアをクリア状態にしてイベントタイミングを更新する
        afterFunction = () => {
          clearArea();
          showArea();
        };
      }

      battleBgm.stop();
      currentArea.value.bgm.play();

      chainMessage(afterMessages, afterFunction);
    };
  } else if (result.status == WAS_BATTLE_STATUS.LOSE) {
    // 敗北時の処理
    battleResultFunction = () => {
      battleBgm.stop();
      emits("end", WAS_ENDING.DEAD);
    };
  }

  chainEvent(result.progresses, battleResultFunction);
};

/**
 * 魔王城内を表示する
 * 姫のセリフの切り替えも行う
 */
const showSatanCastle = () => {
  if (!(currentArea.value.character instanceof WasPrincess)) {
    return;
  }
  timming.value = WAS_AREA_TIMMING.FACE;

  const princess = currentArea.value.character;
  character.value = princess;

  let messages = princess.getSerif(eventTimming.value, props.map);
  let afterFunction = () => emits("map");

  if (eventTimming.value === WAS_EVENT_TIMMING.OPENING) {
    eventTimming.value = WAS_EVENT_TIMMING.AFTER_OPENING1;
  } else if (eventTimming.value === WAS_EVENT_TIMMING.AFTER_OPENING1) {
    player.value.addItem(props.items[WAS_ITEM_ID.SATAN_SOUL]);
    eventTimming.value = WAS_EVENT_TIMMING.AFTER_OPENING2;
  } else if (
    eventTimming.value === WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE
  ) {
    // 種族の統一ができていなければワーストエンド
    let endType = WAS_ENDING.WORST;
    if (
      (props.map.areas.KINGDOM_CASTLE.boss as WasNonPlayerCharacter).isPersuaded
    ) {
      // 勇者を説得済みの場合はグッドエンド
      endType = WAS_ENDING.GOOD;
    } else if (props.map.isUnified()) {
      if (
        (props.map.areas.KINGDOM_CASTLE.character as WasNonPlayerCharacter)
          .isPersuaded
      ) {
        // 説得で攻略したボスがエリア数 - 1以上で兵士を説得済みならベストエンド
        endType = WAS_ENDING.BEST;
      } else {
        // 説得で攻略したボスがエリア数 - 1以上で兵士を説得していなけばバッドエンド
        endType = WAS_ENDING.BAD;
      }
    }
    afterFunction = () => emits("end", endType);
    chainMessage([...messages], afterFunction);

    // エンディングに遷移する場合は後続の処理を行わない
    return;
  }

  // 回復条件を満たしていれば回復処理を行う
  if (
    eventTimming.value >= WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE &&
    eventTimming.value < WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE &&
    !player.value.healed
  ) {
    player.value.riseStatus();
    player.value.status.life = player.value.defaultStatus.life;
    player.value.status.satiety = player.value.defaultStatus.satiety;
    player.value.healed = true;
    messages.push(...WAS_SERIF_DEFINE.PRINCESS_HEAL);
  }

  chainMessage([...messages], afterFunction);

  // 魔王城に帰還したタイミングでオートセーブを行う
  emits("save");
};
</script>

<style scoped lang="scss">
.c-area {
  position: relative;
  width: 100%;
  height: 100%;
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-color: black;
  }
  &__character {
    position: absolute;
    bottom: 30%;
    left: 50%;
    width: 70%;
    height: 50%;
    transform: translateX(-50%);
  }
  &__animation {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50%;
    height: 50%;
    transform: translate(-50%, -50%);
  }
  &__under_frame {
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    height: 30%;
    border: 6px solid #d3d3d3;
    background-color: rgba(0, 0, 0, 0.8);
    &__message_frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__button_list {
      width: 100%;
      height: 100%;
      &__row {
        display: flex;
        width: 100%;
        height: 25%;
      }
      &__button {
        width: 25%;
        height: 25%;
      }
      &__row > &__button {
        width: 25%;
        height: 100%;
      }
    }
    &__status {
      position: absolute;
      top: 0;
      left: 40%;
      width: 50%;
      height: 100%;
      color: white;
      span {
        width: 25%;
      }
      &__life {
        position: absolute;
        top: 10px;
        left: 0;
        display: flex;
        width: 100%;
      }
      &__satiety {
        position: absolute;
        top: 40px;
        left: 0;
        display: flex;
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .c-area__under_frame__button_list__button,
  .c-area__under_frame__message_frame {
    font-size: 12px;
  }
  .c-area__under_frame__status__life > span {
    font-size: 10px;
  }
  .c-area__under_frame__status__satiety > span {
    font-size: 10px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-area__under_frame__button_list__button,
  .c-area__under_frame__message_frame {
    font-size: 14px;
  }
  .c-area__under_frame__status__life > span {
    font-size: 12px;
  }
  .c-area__under_frame__status__satiety > span {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-area__under_frame__button_list__button,
  .c-area__under_frame__message_frame {
    font-size: 16px;
  }
  .c-area__under_frame__status__life > span {
    font-size: 14px6px;
  }
  .c-area__under_frame__status__satiety > span {
    font-size: 14px6px;
  }
}
</style>
