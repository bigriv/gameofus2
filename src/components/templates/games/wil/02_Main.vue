<template>
  <div v-if="props.start" class="c-drawer">
    <template v-if="timming == WIL_CHAPTER_TIMMING.OPENING">
      <ChapterStart
        v-if="currentCapter"
        :chapter="currentCapter"
        @next="proceed"
      />
    </template>
    <template v-else-if="timming == WIL_CHAPTER_TIMMING.TALK">
      <Talk :images="WIL_IMAGES" :events="talkEvents" @end="proceed" />
    </template>
    <template v-else-if="timming == WIL_CHAPTER_TIMMING.BATTLE">
      <Battle
        v-if="battle"
        v-model:player="player"
        :skills="WIL_SKILLS"
        :battle="battle"
        @end="proceed"
      />
    </template>
    <template v-else-if="timming == WIL_CHAPTER_TIMMING.TRAINING">
      <Training
        :images="WIL_IMAGES"
        :skills="WIL_SKILLS"
        :player="player"
        @end="proceed"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import ChapterStart from "@/components/templates/games/wil/main/01_ChapterStart.vue";
import Talk from "@/components/templates/games/wil/main/02_Talk.vue";
import Battle from "@/components/templates/games/wil/main/03_Battle.vue";
import Training from "@/components/templates/games/wil/main/04_Training.vue";
import { WIL_CHAPTER_TIMMING } from "@/composables/games/wil/enums/timming";
import { useWilInit } from "@/composables/games/wil/init";
import { WilChapter } from "@/composables/games/wil/types/chapter";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_CHAPTER_DEFINES } from "@/composables/games/wil/defines/chapter";

const props = defineProps({
  start: {
    type: Boolean,
    default: false,
  },
  loadData: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["loaded"]);

const { WIL_IMAGES, WIL_SOUNDS, WIL_SKILLS, characterSequence, player } =
  useWilInit();

const timming: Ref<WIL_CHAPTER_TIMMING> = ref(WIL_CHAPTER_TIMMING.OPENING);
const talkEvents = ref();
const battle = ref();

const currentCapter: Ref<WilChapter | undefined> = ref();

const proceed = () => {
  if (!currentCapter.value) {
    throw new WrongImplementationError("Current Chapter is not initialized.");
  }
  timming.value = currentCapter.value.proceedNextEvent();
  if (timming.value === WIL_CHAPTER_TIMMING.TALK) {
    talkEvents.value = currentCapter.value.proceedNextTalks();
  } else if (timming.value === WIL_CHAPTER_TIMMING.BATTLE) {
    battle.value = currentCapter.value.proceedNextBattle();
  }
};

onMounted(() => {
  setTimeout(() => {
    emits("loaded");
  }, 1000);
  // TODO: ファイルのロード

  if (props.loadData) {
    // TODO: セーブデータのロード
  }
  currentCapter.value = new WilChapter(
    WIL_CHAPTER_DEFINES[0],
    characterSequence,
    WIL_IMAGES,
    WIL_SOUNDS
  );
  timming.value = currentCapter.value.proceedNextEvent();
});
</script>

<style scoped lang="scss">
.c-drawer {
  width: 100%;
  height: 100%;
  background-color: black;
  &__load {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: white;
    text-align: center;
  }
}
</style>
