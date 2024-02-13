<template>
  <div class="c-ending" :class="css">
    <template v-if="props.ending === WIL_ENDING_ID.TRUE_END && currentCredit">
      <div class="c-ending__background">
        <GOUVisualCanvas :objects="{ background: currentCredit.background }" />
      </div>
      <div v-if="currentCredit.left" class="c-ending__character--left">
        <GOUVisualCanvas :objects="{ character: currentCredit.left }" />
      </div>
      <div
        v-else-if="currentCredit.texts"
        class="c-ending__credit c-ending__credit--left"
      >
        <span v-for="text in currentCredit.texts">{{ text }}</span>
      </div>
      <div v-if="currentCredit.right" class="c-ending__character--right">
        <GOUVisualCanvas :objects="{ character: currentCredit.right }" />
      </div>
      <div
        v-else-if="currentCredit.texts"
        class="c-ending__credit c-ending__credit--right"
      >
        <span v-for="text in currentCredit.texts">{{ text }}</span>
      </div>
    </template>
    <template v-else>
      <div class="c-ending__text">{{ text }}</div>
      <div class="c-ending__button">
        <GameButton
          label="タイトルへ"
          :fontColor="WIL_BUTTON_FONT_COLOR"
          :backgroundColor="WIL_BUTTON_BACKGROUND_COLOR"
          @click="onClickBack"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, computed, onMounted, onUnmounted, ref } from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { useGameStore } from "@/pinia/game";
import {
  WIL_BUTTON_FONT_COLOR,
  WIL_BUTTON_BACKGROUND_COLOR,
} from "@/composables/games/wil/const";
import { WIL_ENDING_ID } from "@/composables/games/wil/enums/ending";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

const props = defineProps({
  ending: {
    type: String as PropType<WIL_ENDING_ID>,
    required: true,
  },
});
const emits = defineEmits(["end"]);

const gameStore = useGameStore();
const text = computed(() => {
  switch (props.ending) {
    case WIL_ENDING_ID.GAME_OVER:
      return "GAME OVER";
    case WIL_ENDING_ID.TO_BE_CONTINUED:
      return "TO BE CONTINUED";
    case WIL_ENDING_ID.TRUE_END:
      return "Thank you for playing!";
  }
});
const css = computed(() => {
  switch (props.ending) {
    case WIL_ENDING_ID.GAME_OVER:
      return "c-ending--game_over";
    case WIL_ENDING_ID.TO_BE_CONTINUED:
      return "c-ending--to_be_continued";
    case WIL_ENDING_ID.TRUE_END:
      return "c-ending--true_end";
  }
});
const credits = [
  {
    background: WIL_IMAGE_ID.BACKGROUND_HOLY_LAND_CASTLE,
    left: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
    texts: ["製作", "よしを"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
    left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
    texts: ["BGM/SE", "効果音ラボ様"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
    right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
    texts: ["BGM/SE", "効果音ラボ様"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_HOLY_LAND_OUTSIDE,
    right: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
    texts: ["BGM/SE", "効果音ラボ様"],
    duration: 15,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
    left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_MAGICIAN,
    texts: ["BGM", "魔王魂様"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
    right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
    texts: ["BGM", "魔王魂様"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND_STORE_EMPTY,
    left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
    texts: ["BGM", "魔王魂様"],
    duration: 15,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
    left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_ARCHER,
    texts: ["BGM", "DOVA-SYNDROME様"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_CASTLE,
    right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
    texts: ["BGM", "DOVA-SYNDROME様"],
    duration: 15,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_FIRE_LAND_CASTLE,
    left: WIL_IMAGE_ID.CHARACTER_INFERUNITY_SAMURAIS_WIND_SOLDIER,
    texts: ["BGM", "ユーフルカ様"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_FIRE_LAND_CASTLE,
    left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_SAND_SPY,
    texts: ["BGM", "ユーフルカ様"],
    duration: 10,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_FIRE_LAND_CASTLE,
    right: WIL_IMAGE_ID.CHARACTER_INFERUNITY_SAMURAIS_KING,
    texts: ["BGM", "ユーフルカ様"],
    duration: 15,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
    right: WIL_IMAGE_ID.CHARACTER_SUPER_HERO,
    texts: ["スペシャルサンクス", "ヤナフォイ"],
    duration: 15,
  },
  {
    background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
    left: WIL_IMAGE_ID.CHARACTER_HERO,
    texts: ["その他シナリオ・イラスト等", "よしを"],
    duration: 15,
  },
];
const bgm = gameStore.getSounds[WIL_SOUND_ID.BGM_ENDING];
const currentCredit: Ref<
  | {
      background: GOUVisual;
      left?: GOUVisual;
      right?: GOUVisual;
      texts?: Array<string>;
      duration: number;
    }
  | undefined
> = ref();

let creditTimeoutId: NodeJS.Timeout | undefined = undefined;

const proceedCredit = () => {
  const credit = credits.shift();
  if (!credit) {
    currentCredit.value = undefined;
    return;
  }
  currentCredit.value = {
    background: gameStore.getImages[credit.background],
    left: credit.left ? gameStore.getImages[credit.left] : undefined,
    right: credit.right ? gameStore.getImages[credit.right] : undefined,
    texts: credit.texts,
    duration: credit.duration,
  };
  creditTimeoutId = setTimeout(() => {
    proceedCredit();
  }, currentCredit.value.duration * 1000);
};
onMounted(() => {
  if (props.ending === WIL_ENDING_ID.TRUE_END) {
    proceedCredit();
    bgm.play();
  }
});
onUnmounted(() => {
  clearTimeout(creditTimeoutId);
  bgm.stop();
});
const onClickBack = () => {
  emits("end");
};
</script>

<style scoped lang="scss">
.c-ending {
  position: relative;
  width: 100%;
  height: 100%;
  &__text {
    position: absolute;
    top: 20%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    text-align: center;
  }
  &--game_over {
    background: black;
    .c-ending__text {
      color: white;
      font-family: "DotGothic16", sans-serif;
    }
  }
  &--to_be_continued,
  &--true_end {
    background: linear-gradient(
      -225deg,
      #ffffff 25%,
      yellow 40%,
      #ffd000 60%,
      #ffffff 90%
    );
    .c-ending__text {
      font-family: "DotGothic16", sans-serif;
      color: black;
    }
  }
  &--true_end {
    .c-ending__text {
      font-family: "Kaisei Tokumin", sans-serif;
      font-weight: bold;
      text-shadow: 4px 0px 8px black, 0px 4px 8px black;
      color: white;
    }
  }
  &__background {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &__character {
    &--left {
      position: absolute;
      bottom: 2%;
      left: 2%;
      width: 35%;
      height: 70%;
      transform: scaleX(-1);
    }
    &--right {
      position: absolute;
      bottom: 2%;
      right: 2%;
      width: 35%;
      height: 70%;
      z-index: 2;
    }
  }
  &__credit {
    position: absolute;
    width: 50%;
    height: 100%;
    background: black;
    color: white;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span {
      display: block;
      font-size: 20px;
    }
    &--left {
      left: 0;
    }
    &--right {
      right: 0;
    }
  }
  &__button {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 10%;
    transform: translate(-50%, -50%);
    font-size: 14px;
  }
}
@media screen and (max-width: 400px) {
  .c-ending__button {
    font-size: 10px;
    width: 25%;
  }
  .c-ending__text {
    font-size: 30px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-ending__button {
    font-size: 12px;
    width: 23%;
  }
  .c-ending__text {
    font-size: 40px;
  }
}
@media screen and (min-width: 600px) {
  .c-ending__button {
    font-size: 14px;
    width: 20%;
  }
  .c-ending__text {
    font-size: 50px;
  }
}
</style>
