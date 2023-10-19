<template>
  <div class="c-patrol">
    <div
      v-if="props.player.status.life > 0"
      class="c-patrol__player"
      :class="{
        'c-patrol__player--rotate': timming == TBH_TIMMINGS.PATROL,
        'a-attack_left':
          timming == TBH_TIMMINGS.PATROL_BATTLE && turn == 'player',
      }"
    >
      <GOUVisualCanvas :objects="{ player: props.player.visual }" />
    </div>
    <div
      v-if="isShowEnemy"
      class="c-patrol__enemy"
      :class="{
        'a-attack_right':
          timming == TBH_TIMMINGS.PATROL_BATTLE && turn == 'enemy',
      }"
    >
      <GOUVisualCanvas :objects="{ enemy: enemy!.visual }" />
    </div>
    <div
      v-if="timming == TBH_TIMMINGS.PATROL_DISCOVER"
      class="c-patrol__exclamation"
    >
      !
    </div>
    <div v-if="timming == TBH_TIMMINGS.PATROL_BATTLE" class="c-patrol__status">
      <div class="c-patrol__status__enemy">
        <GameStatusBar
          v-if="enemy"
          :max="enemy.defaultStatus.life"
          :current="enemy.status.life"
          :barColor="COLOR.RED"
          :borderColor="COLOR.LIGHT_GRAY"
        />
      </div>
      <div class="c-patrol__status__player">
        <GameStatusBar
          :max="props.player.defaultStatus.life"
          :current="props.player.status.life"
          :barColor="COLOR.GREEN"
          :borderColor="COLOR.LIGHT_GRAY"
        />
      </div>
    </div>
    <div v-if="modal.isShown" class="c-patrol__dialog">
      <MessageFrame
        :backgroundColor="TBH_MESSAGEFRAME_BACKGROUND_COLOR"
        :borderColor="TBH_MESSAGEFRAME_BORDER_COLOR"
      >
        <div class="c-patrol__dialog__message">
          <div class="c-patrol__dialog__message__text">
            {{ modal.message }}
          </div>
          <div class="c-patrol__dialog__message__button">
            <GameButton
              label="OK"
              :backgroundColor="COLOR.WHITE"
              :borderColor="COLOR.ORANGE"
              @click="modal.onAgree"
            />
          </div>
        </div>
      </MessageFrame>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  reactive,
  onMounted,
  ref,
  PropType,
  Ref,
  computed,
  onBeforeMount,
} from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import GameStatusBar from "@/components/atoms/interfaces/GameStatusBar.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { COLOR } from "@/composables/types/GOUColor";
import { TBH_TIMMINGS } from "@/composables/games/tbh/enums/timming";
import { TbhCharacter } from "@/composables/games/tbh/types/character";
import { TbhPlayer } from "@/composables/games/tbh/types/player";
import {
  TBH_MESSAGEFRAME_BACKGROUND_COLOR,
  TBH_MESSAGEFRAME_BORDER_COLOR,
} from "@/composables/games/tbh/const";

const props = defineProps({
  timming: {
    type: Number as PropType<TBH_TIMMINGS>,
    required: true,
  },
  player: {
    type: TbhPlayer,
    required: true,
  },
  characters: {
    type: Object as PropType<{ [keys: string]: TbhCharacter }>,
    required: true,
  },
  sounds: {
    type: Object as PropType<{ [key: string]: GOUReadAudio }>,
    required: true,
  },
});
const emits = defineEmits(["update:timming", "success"]);

const timming = computed({
  get: () => props.timming,
  set: (value) => emits("update:timming", value),
});
const enemy: Ref<TbhCharacter | null> = ref(null);
const isShowEnemy = computed(() => {
  if (!enemy.value) {
    return false;
  }
  if (enemy.value.status.life <= 0) {
    return false;
  }
  return (
    timming.value == TBH_TIMMINGS.PATROL_FACE ||
    timming.value == TBH_TIMMINGS.PATROL_BATTLE ||
    timming.value == TBH_TIMMINGS.PATROL_END
  );
});
const turn: Ref<"player" | "enemy"> = ref("player");
let timeoutId: NodeJS.Timeout | undefined = undefined;
let turnIntervalId: NodeJS.Timeout | undefined = undefined;

const modal = reactive({
  isShown: false,
  message: "",
  onAgree: () => {},
});

const attack = () => {
  if (!enemy.value) {
    throw new WrongImplementationError("Enemy is not set.");
  }
  if (turn.value == "enemy") {
    props.player.status.life -= enemy.value.status.power;
  } else {
    enemy.value.status.life -= props.player.status.power;
  }
  props.sounds.ATTACK.play();

  // 終了判定
  if (props.player.status.life <= 0) {
    modal.message = "負けた...";
    modal.onAgree = () => {
      emits("success", { stamina: -50 });
    };
    modal.isShown = true;

    timming.value = TBH_TIMMINGS.PATROL_END;
    clearInterval(turnIntervalId);
  }
  if (enemy.value!.status.life <= 0) {
    modal.message = "勝った！";
    modal.onAgree = () => {
      emits("success", { stamina: -20, justice: 20 });
    };
    modal.isShown = true;

    timming.value = TBH_TIMMINGS.PATROL_END;
    clearInterval(turnIntervalId);
  }
};
const battle = () => {
  timming.value = TBH_TIMMINGS.PATROL_BATTLE;
  setTimeout(attack, 1000);

  turnIntervalId = setInterval(() => {
    // ターンの切り替え
    if (turn.value == "enemy") {
      turn.value = "player";
    } else {
      if (!enemy.value) {
        throw new WrongImplementationError("Enemy is not set.");
      }
      turn.value = "enemy";
    }

    setTimeout(attack, 1000);
  }, 2000);

  clearTimeout(timeoutId);
};

const encount = (): TbhCharacter | null => {
  // 乱数によって敵とのエンカウントを決定
  const rnd = Math.random();
  if (rnd < 0.3) {
    return null;
  }

  // 正義度によってエンカウントするキャラクターを変更
  if (props.player.justice < 40) {
    return props.characters.YANKEE;
  }
  if (props.player.justice < 80) {
    return props.characters.MONSTER;
  }
  return props.characters.BOSS;
};

// 敵発見処理
const discoverEnemy = () => {
  timming.value = TBH_TIMMINGS.PATROL_DISCOVER;
  props.sounds.EXCLAMATION.play();
};

// 敵対面処理
const faceEnemy = () => {
  timming.value = TBH_TIMMINGS.PATROL_FACE;
  modal.message = "敵があらわれた！";
  modal.onAgree = () => {
    modal.isShown = false;
    battle();
  };
  modal.isShown = true;
};

// エンカウントしなかった場合の処理
const noEncount = () => {
  timming.value = TBH_TIMMINGS.PATROL_END;
  modal.message = "今日も街は平和だ！";
  modal.onAgree = () => {
    emits("success", {});
  };
  modal.isShown = true;
};

onMounted(() => {
  // エンカウント処理
  timming.value = TBH_TIMMINGS.PATROL;
  enemy.value = encount();
  if (enemy.value) {
    props.player.resetStatus();
    enemy.value.resetStatus();
  }

  timeoutId = setTimeout(() => {
    if (enemy.value) {
      discoverEnemy();
    }
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      if (enemy.value) {
        faceEnemy();
      } else {
        noEncount();
      }
      clearTimeout(timeoutId);
    }, 1000);
  }, 4000);
});

onBeforeMount(() => {
  clearTimeout(timeoutId);
  clearInterval(turnIntervalId);
});
</script>

<style scoped lang="scss">
.c-patrol {
  &__player {
    position: absolute;
    bottom: 5%;
    right: 5%;
    width: 20%;
    height: 60%;
  }
  &__player--rotate {
    transform: rotateY(40deg) rotateX(5deg) rotateZ(5deg);
  }
  &__enemy {
    position: absolute;
    bottom: 5%;
    left: 5%;
    width: 20%;
    height: 60%;
  }
  &__exclamation {
    position: absolute;
    bottom: 65%;
    right: 5%;
    color: red;
    font-size: 70px;
    font-weight: bold;
    font-style: italic;
  }
  &__status {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: space-between;
    padding: 5%;
    &__enemy {
      width: 45%;
    }
    &__player {
      width: 45%;
    }
  }
  &__dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    height: 20%;
    z-index: 2;
    &__message {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      white-space: break-spaces;
      &__button {
        width: 30%;
        height: 30%;
        font-size: 16px;
      }
    }
  }
}
.a-attack_right {
  animation: attack_right 2s linear infinite;
  transform: translateX(0%);
  transform-origin: 150% 50%;
  @keyframes attack_right {
    0% {
      transform: translateX(0%);
    }
    40% {
      transform: rotate(0) translateX(100%);
    }
    50% {
      transform: rotate(30deg) translateX(100%);
    }
    60% {
      transform: rotate(0) translateX(100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
}
.a-attack_left {
  animation: attack_left 2s linear infinite;
  transform: translateX(0%);
  transform-origin: -50% 50%;
  @keyframes attack_left {
    0% {
      transform: translateX(0%);
    }
    40% {
      transform: rotate(0) translateX(-100%);
    }
    50% {
      transform: rotate(-30deg) translateX(-100%);
    }
    60% {
      transform: rotate(0) translateX(-100%);
    }
    100% {
      transform: translateX(0%);
    }
  }
}
</style>
