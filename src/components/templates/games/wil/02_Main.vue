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
        v-if="battleEvent"
        v-model:player="player"
        :skills="WIL_SKILLS"
        :event="battleEvent"
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
import { Ref, onMounted, ref, watch } from "vue";
import ChapterStart from "@/components/templates/games/wil/main/01_ChapterStart.vue";
import Talk from "@/components/templates/games/wil/main/02_Talk.vue";
import Battle from "@/components/templates/games/wil/main/03_Battle.vue";
import Training from "@/components/templates/games/wil/main/04_Training.vue";
import { WIL_CHAPTER_TIMMING } from "@/composables/games/wil/enums/timming";
import { useWilInit } from "@/composables/games/wil/init";
import { WilChapter } from "@/composables/games/wil/types/chapter";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_CHAPTER_1_DEFINE } from "@/composables/games/wil/defines/chapter";
import {
  WilBattleEvent,
  WilTalkEvent,
} from "@/composables/games/wil/types/event";

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

const {
  WIL_IMAGES,
  WIL_SOUNDS,
  WIL_SKILLS,
  isLoadedFiles,
  loadFiles,
  characterSequence,
  player,
} = useWilInit();

const timming: Ref<WIL_CHAPTER_TIMMING> = ref(WIL_CHAPTER_TIMMING.OPENING);
const talkEvents: Ref<Array<WilTalkEvent> | undefined> = ref();
const battleEvent: Ref<WilBattleEvent | undefined> = ref();

const currentCapter: Ref<WilChapter | undefined> = ref();

const proceed = () => {
  if (!currentCapter.value) {
    throw new WrongImplementationError("Current Chapter is not initialized.");
  }
  timming.value = currentCapter.value.proceedNextEvent();
  if (timming.value === WIL_CHAPTER_TIMMING.TALK) {
    talkEvents.value = currentCapter.value.proceedNextTalks();
  } else if (timming.value === WIL_CHAPTER_TIMMING.BATTLE) {
    battleEvent.value = currentCapter.value.proceedNextBattle();
    if (!battleEvent.value) {
      proceed();
      return;
    }
    player.value.teamName = battleEvent.value.playerTeamName;
  }
};

onMounted(() => {
  loadFiles();

  if (props.loadData) {
    // TODO: セーブデータのロード
  }
  currentCapter.value = new WilChapter(
    WIL_CHAPTER_1_DEFINE,
    characterSequence,
    WIL_SKILLS.value,
    WIL_IMAGES,
    WIL_SOUNDS
  );
  timming.value = currentCapter.value.proceedNextEvent();
});
watch(
  () => isLoadedFiles.value,
  () => {
    if (isLoadedFiles.value) {
      emits("loaded");
    }
  }
);
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
