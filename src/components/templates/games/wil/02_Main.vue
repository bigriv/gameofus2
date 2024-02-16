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
      <Talk :events="talkEvents" @end="proceed" />
    </template>
    <template v-else-if="timming == WIL_CHAPTER_TIMMING.BATTLE">
      <Battle
        v-if="battleEvent"
        :player="player"
        :skills="WIL_SKILLS"
        :event="battleEvent"
        @end="endBattle"
      />
    </template>
    <template v-else-if="timming == WIL_CHAPTER_TIMMING.TRAINING">
      <Training
        v-if="trainingEvent"
        :skills="WIL_SKILLS"
        :event="trainingEvent"
        :player="player"
        @end="proceed"
      />
    </template>
    <template v-else-if="timming == WIL_CHAPTER_TIMMING.TEAM">
      <UpdateTeam
        v-if="teamEvent"
        :event="teamEvent"
        :player="player"
        @end="proceed"
      />
    </template>
    <template v-else-if="timming == WIL_CHAPTER_TIMMING.SAVE">
      <Save @save="onSave" @end="proceed" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import ChapterStart from "@/components/templates/games/wil/main/01_ChapterStart.vue";
import Talk from "@/components/templates/games/wil/main/02_Talk.vue";
import Battle from "@/components/templates/games/wil/main/03_Battle.vue";
import Training from "@/components/templates/games/wil/main/04_Training.vue";
import UpdateTeam from "@/components/templates/games/wil/main/05_UpdateTeam.vue";
import Save from "@/components/templates/games/wil/main/06_Save.vue";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { useWilInit } from "@/composables/games/wil/init";
import { WIL_CHAPTER_TIMMING } from "@/composables/games/wil/enums/timming";
import { WIL_BATTLE_TEAM } from "@/composables/games/wil/enums/battle";
import { WIL_ENDING_ID } from "@/composables/games/wil/enums/ending";
import { WIL_CHAPTER_1_DEFINE } from "@/composables/games/wil/defines/chapter";
import { WIL_CHARACTER_DEFINES } from "@/composables/games/wil/defines/character";
import { WilChapter } from "@/composables/games/wil/types/chapter";
import {
  WilBattleEvent,
  WilTalkEvent,
  WilTeamEvent,
  WilTrainingEvent,
} from "@/composables/games/wil/types/event";
import { WilSaveUtil } from "@/composables/games/wil/types/save";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilStatus } from "@/composables/games/wil/types/status";

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

const emits = defineEmits(["loaded", "end"]);

const { WIL_SKILLS, player } = useWilInit();

const timming: Ref<WIL_CHAPTER_TIMMING> = ref(WIL_CHAPTER_TIMMING.OPENING);
const talkEvents: Ref<Array<WilTalkEvent> | undefined> = ref();
const battleEvent: Ref<WilBattleEvent | undefined> = ref();
const trainingEvent: Ref<WilTrainingEvent | undefined> = ref();
const teamEvent: Ref<WilTeamEvent | undefined> = ref();

const currentCapter: Ref<WilChapter | undefined> = ref();
const endBattle = (winner: WIL_BATTLE_TEAM) => {
  if (winner === WIL_BATTLE_TEAM.COMPUTER) {
    emits("end", WIL_ENDING_ID.GAME_OVER);
    return;
  }
  proceed();
};
const proceed = () => {
  if (!currentCapter.value) {
    throw new WrongImplementationError("Current Chapter is not initialized.");
  }
  timming.value = currentCapter.value.proceedEvent();
  switch (timming.value) {
    case WIL_CHAPTER_TIMMING.OPENING:
      break;
    case WIL_CHAPTER_TIMMING.TALK:
      talkEvents.value = currentCapter.value.proceedTalkEvent();
      break;
    case WIL_CHAPTER_TIMMING.BATTLE:
      battleEvent.value = currentCapter.value.proceedBattleEvent();
      if (!battleEvent.value) {
        proceed();
        return;
      }
      player.teamName = battleEvent.value.playerTeamName;
      break;
    case WIL_CHAPTER_TIMMING.TRAINING:
      trainingEvent.value = currentCapter.value.proceedTrainingEvent();
      if (!trainingEvent.value) {
        proceed();
        return;
      }
      break;
    case WIL_CHAPTER_TIMMING.TEAM:
      teamEvent.value = currentCapter.value.proceedTeamEvent();
      if (!teamEvent.value) {
        proceed();
        return;
      }
      break;
    case WIL_CHAPTER_TIMMING.SAVE:
      break;
    case WIL_CHAPTER_TIMMING.ENDING:
      if (currentCapter.value.id >= 5) {
        emits("end", WIL_ENDING_ID.TRUE_END);
        return;
      }

      nextChapter();
      if (!currentCapter.value) {
        emits("end", WIL_ENDING_ID.TO_BE_CONTINUED);
        return;
      }
      proceed();

      break;
  }
};
const nextChapter = () => {
  if (!currentCapter.value) {
    return;
  }
  const nextChapter = WilChapter.getChapterDefine(currentCapter.value.id + 1);
  if (!nextChapter) {
    currentCapter.value = undefined;
    return;
  }

  currentCapter.value = new WilChapter(nextChapter);

  switch (currentCapter.value?.id) {
  }
};

const onSave = () => {
  if (!currentCapter.value) {
    return;
  }
  WilSaveUtil.save(currentCapter.value, player);
};

const loadSaveData = () => {
  const { chapter, flow, characters } = WilSaveUtil.load();
  if (chapter) {
    currentCapter.value = new WilChapter(chapter);
  }
  if (flow) {
    for (let i = -1; i < flow; i++) {
      switch (currentCapter.value?.proceedEvent()) {
        case WIL_CHAPTER_TIMMING.BATTLE:
          currentCapter.value?.proceedBattleEvent();
          break;
        case WIL_CHAPTER_TIMMING.TALK:
          currentCapter.value?.proceedTalkEvent();
          break;
        case WIL_CHAPTER_TIMMING.TRAINING:
          currentCapter.value?.proceedTrainingEvent();
          break;
        case WIL_CHAPTER_TIMMING.TEAM:
          currentCapter.value?.proceedTeamEvent();
          break;
      }
    }
  }
  if (characters.length > 0) {
    player.allCharacters = characters.map((character) => {
      const c = new WilCharacter(WIL_CHARACTER_DEFINES[character.model]);
      c.defaultStatus = new WilStatus(character.defaultStatus);
      c.skills = character.skills;
      c.reset();
      return c;
    });
  }
};

onMounted(() => {
  if (props.loadData) {
    loadSaveData();
    emits("loaded");
  }

  if (!currentCapter.value) {
    currentCapter.value = new WilChapter(WIL_CHAPTER_1_DEFINE);
  }
  proceed();
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
