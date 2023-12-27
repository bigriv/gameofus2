<template>
  <GameFrame>
    <template #window>
      <div class="c-mp">
        <div class="c-mp__left_panel">
          <div class="c-mp__field c-mp__frame">
            <i
              v-if="gameManager.isStart"
              class="c-mp__field__pot"
              :style="{
                width: gameManager.field.pot.width + '%',
                height: gameManager.field.pot.height + '%',
                '--x': gameManager.field.pot.position.px + '%',
              }"
            />
            <div
              v-if="gameManager.isStart && gameManager.field.coin"
              class="c-mp__field__coin"
              :style="{
                width: gameManager.field.coin.radius + '%',
                '--x': gameManager.field.coin.position.px + '%',
                '--y': gameManager.field.coin.position.py + '%',
              }"
            >
              <MpCoinElement
                :color="gameManager.field.coin.color"
                :label="gameManager.field.coin.score"
              />
            </div>
          </div>
        </div>

        <div class="c-mp__right_panel">
          <div class="c-mp__description c-mp__frame">
            <dl v-for="coin in MP_COIN_DEFINES">
              <dt>
                <div
                  class="c-mp__description__coin"
                  :style="{
                    '--length':
                      coin.score >= 100 ? 3 : coin.score >= 10 ? 2 : 1,
                  }"
                >
                  <MpCoinElement :color="coin.color" :label="coin.score" />
                </div>
              </dt>
              <dd>+{{ coin.score }}</dd>
            </dl>
          </div>
          <div class="c-mp__level c-mp__frame">
            Level{{ gameManager.level }}
          </div>
          <div class="c-mp__score c-mp__frame">
            <div>Score</div>
            <div class="u-text_align--right">{{ gameManager.score }}</div>
          </div>
          <div class="c-mp__best_score c-mp__frame">
            <div>Best Score</div>
            <div class="u-text_align--right">{{ gameManager.bestScore }}</div>
          </div>
        </div>

        <div v-if="!gameManager.isStart" class="c-mp__dialog">
          <div class="c-mp__dialog__button">
            <GameButton
              :label="gameManager.isGameover ? 'Retry' : 'Start'"
              :borderColor="COLOR.LIGHT_GRAY"
              :fontColor="COLOR.WHITE"
              @click="onStart"
            />
          </div>
          <div
            v-if="gameManager.isGameover"
            class="c-mp__frame c-mp__dialog__score"
          >
            <div>Score</div>
            <div class="u-text_align--right">{{ gameManager.score }}</div>
          </div>
          <div class="c-mp__frame c-mp__dialog__score">
            <div>Best Score</div>
            <div class="u-text_align--right">{{ gameManager.bestScore }}</div>
          </div>
        </div>
      </div>
    </template>
    <template #description> </template>
  </GameFrame>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import GameFrame from "@/components/atoms/frames/GameFrame.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { COLOR } from "@/composables/types/GOUColor";
import { MpManager } from "@/composables/games/mp/types/mp";
import { MP_DIRECTION } from "@/composables/games/mp/enums/direction";
import { MP_COIN_DEFINES } from "@/composables/games/mp/defines/coin";
import MpCoinElement from "@/components/molecules/games/mp/MpCoinElement.vue";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";

const initSounds = (): { [key: string]: GOUReadAudio } => {
  return {
    charin: new GOUReadAudio("/games/tbh/sounds/money.mp3"),
  };
};

const MP_SOUNDS = initSounds();
const gameManager = ref(new MpManager(MP_SOUNDS));
const onStart = () => {
  gameManager.value.start();
};

const keyboardControl = (e: KeyboardEvent) => {
  if (e.code === "ArrowRight") {
    gameManager.value.field.movePot(MP_DIRECTION.RIGHT);
  } else if (e.code === "ArrowLeft") {
    gameManager.value.field.movePot(MP_DIRECTION.LEFT);
  } else if (e.code === "Enter") {
    if (!gameManager.value.isStart) {
      gameManager.value.start();
    }
  }
};
onMounted(() => {
  const bestscore = Number(localStorage.getItem("games.mp.bestscore"));
  if (!Number.isNaN(bestscore)) {
    gameManager.value.bestScore = bestscore;
  }
  window.addEventListener("keydown", keyboardControl);

  for (const key of Object.keys(MP_SOUNDS)) {
    MP_SOUNDS[key].load();
    console.log(MP_SOUNDS[key]);
  }
});
onUnmounted(() => {
  window.removeEventListener("keydown", keyboardControl);
});
</script>

<style scoped lang="scss">
.c-mp {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 0, 255, 0.5);
  display: flex;
  &__frame {
    position: relative;
    border: solid #adadad 4px;
    background: black;
    color: white;
    padding: 0 4%;
    dl {
      display: flex;
      gap: 0 4%;
    }
  }
  &__left_panel {
    width: 75%;
    height: 100%;
    .c-mp__frame {
      padding: 0;
    }
  }
  &__right_panel {
    width: 25%;
    height: 100%;
    > div + div {
      margin-top: 5%;
    }
  }
  &__field {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
    &__pot {
      position: absolute;
      left: var(--x);
      bottom: 5%;
      background: #df6b00;
      border-radius: 0 0 100% 100%;
    }
    &__coin {
      position: absolute;
      aspect-ratio: 1;
      top: var(--y);
      left: var(--x);
    }
  }
  &__description {
    dl {
      align-items: center;
    }
    dl + dl {
      margin-top: 2%;
    }
    dt {
      width: 50%;
      align-self: center;
    }
    &__coin {
      width: calc(var(--length) * 1.5em);
      margin: auto;
    }
  }
  &__dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    border: solid #adadad 4px;
    background: black;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5% 0;
    &__button {
      width: 40%;
      height: 20%;
    }
    &__score {
      margin-top: 5%;
      width: 40%;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-mp__frame {
    font-size: 10px;
  }
  .c-mp__field__coin {
    font-size: 4px;
  }
}
@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-mp__frame {
    font-size: 12px;
  }
  .c-mp__field__coin {
    font-size: 6px;
  }
}
@media screen and (min-width: 600px) {
  .c-mp__frame {
    font-size: 14px;
  }
  .c-mp__field__coin {
    font-size: 8px;
  }
}
</style>
