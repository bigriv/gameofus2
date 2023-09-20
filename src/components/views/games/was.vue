<template>
  <div class="c-game">
    <Title
      v-if="display === 'title'"
      v-model="display"
      @start="onStart"
      @load="onLoad"
    />
    <Main
      v-else-if="display === 'main'"
      :loadData="loadData"
      @save="onSave"
      @end="onEnd"
    />
    <Ending
      v-else-if="display === 'end'"
      :type="endingType"
      @back="onBackTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "@/components/templates/games/was/01_Title.vue";
import Main from "@/components/templates/games/was/02_Main.vue";
import Ending from "@/components/templates/games/was/03_Ending.vue";
import { WAS_ENDING, WAS_EVENT_TIMMING } from "@/composables/games/was/const";
import { WasPlayerCharacter } from "@/composables/games/was/types/palyerCharacter";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasArea } from "@/composables/games/was/types/area";

const display = ref("title");
const endingType = ref();
const loadData = ref();

const onSave = (
  timming: WAS_EVENT_TIMMING,
  player: WasPlayerCharacter,
  characters: { [key: string]: WasNonPlayerCharacter },
  bosses: { [key: string]: WasNonPlayerCharacter },
  areas: { [key: string]: WasArea }
) => {
  const data = {
    timming: timming,
    player: player.toJson(),
    characters: {
      GOBLIN: characters.CAVE.toJson(),
      SAHAGIN: characters.SEA.toJson(),
      ELF: characters.VILLAGE.toJson(),
      SLIME: characters.MOUNTAIN.toJson(),
      SOLDIER: characters.KINGDOM_CASTLE.toJson(),
    },
    bosses: {
      BOSS_GOBLIN: bosses.CAVE.toJson(),
      KRAKEN: bosses.SEA.toJson(),
      DARK_ELF: bosses.VILLAGE.toJson(),
      DORAGON: bosses.MOUNTAIN.toJson(),
      HERO: bosses.KINGDOM_CASTLE.toJson(),
    },
    areas: {
      CAVE: areas.CAVE.toJson(),
      SEA: areas.SEA.toJson(),
      VILLAGE: areas.VILLAGE.toJson(),
      MOUNTAIN: areas.MOUNTAIN.toJson(),
      KINGDOM_CASTLE: areas.KINGDOM_CASTLE.toJson(),
    },
  };
  localStorage.setItem("wasSave", JSON.stringify(data));
};
const load = () => {
  const strData = localStorage.getItem("wasSave");
  if (!strData) {
    return;
  }
  loadData.value = JSON.parse(strData);
  console.log(loadData.value);
};

const onStart = () => {
  display.value = "main";
};
const onLoad = () => {
  load();
  display.value = "main";
};
const onEnd = (type: WAS_ENDING) => {
  console.log(type);
  endingType.value = type;
  display.value = "end";
};
const onBackTitle = () => {
  display.value = "title";
};
</script>

<style scoped lang="scss">
.c-game {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
