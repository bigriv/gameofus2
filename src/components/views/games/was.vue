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
      goblin: characters.CAVE.toJson(),
      sahagin: characters.SEA.toJson(),
      elf: characters.VILLAGE.toJson(),
      slime: characters.MOUNTAIN.toJson(),
      soldier: characters.KINGDOM_CASTLE.toJson(),
    },
    bosses: {
      bossGoblin: bosses.CAVE.toJson(),
      kraken: bosses.SEA.toJson(),
      darkElf: bosses.VILLAGE.toJson(),
      doragon: bosses.MOUNTAIN.toJson(),
      hero: bosses.KINGDOM_CASTLE.toJson(),
    },
    areas: {
      cave: areas.CAVE.isClear,
      sea: areas.SEA.isClear,
      village: areas.VILLAGE.isClear,
      mountain: areas.MOUNTAIN.isClear,
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
