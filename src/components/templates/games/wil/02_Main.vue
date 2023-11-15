<template>
  <div class="c-drawer">
    <template v-if="timming == WIL_EVENT_TIMMING.LOADING">Now Loading</template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.OPENING">
      <Chapter @next="onOpeningEnd" />
    </template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.TALK">
      <Talk @end="onTalkEnd" />
    </template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.BATTLE">
      <Battle
        :playerCharacters="playerCharacters"
        :characters="WIL_CHARACTERS"
        :skills="WIL_SKILLS"
      />
    </template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.TRAINING">
      <Training />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import Chapter from "@/components/templates/games/wil/main/01_Chapter.vue";
import Talk from "@/components/templates/games/wil/main/02_Talk.vue";
import Battle from "@/components/templates/games/wil/main/03_Battle.vue";
import Training from "@/components/templates/games/wil/main/04_Training.vue";
import { WIL_EVENT_TIMMING } from "@/composables/games/wil/enums/timming";
import { useWilInit } from "@/composables/games/wil/init";

const props = defineProps({
  loadData: {
    type: Boolean,
    default: false,
  },
});

const { WIL_SKILLS, WIL_CHARACTERS } = useWilInit();

const isLoading = ref(true);
const timming = ref(WIL_EVENT_TIMMING.LOADING);

const playerCharacters = ref([
  WIL_CHARACTERS.value.HERO,
  WIL_CHARACTERS.value.HOLY_KNIGHTS_SOLDIER,
  WIL_CHARACTERS.value.HOLY_KNIGHTS_MAGICIAN,
  WIL_CHARACTERS.value.HOLY_KNIGHTS_LEADER,
  WIL_CHARACTERS.value.HOLY_KNIGHTS_ARCHER,
]);

watch(
  () => isLoading.value,
  () => {
    timming.value = WIL_EVENT_TIMMING.OPENING;
  }
);

const onOpeningEnd = () => {
  // TODO: 画面遷移の切り替え
  timming.value = WIL_EVENT_TIMMING.TALK;
};
const onTalkEnd = () => {
  // TODO: 画面遷移の切り替え
  timming.value = WIL_EVENT_TIMMING.BATTLE;
};

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
  // TODO: ファイルのロード

  if (props.loadData) {
    // TODO: セーブデータのロード
  }
});
</script>

<style scoped lang="scss">
.c-drawer {
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
