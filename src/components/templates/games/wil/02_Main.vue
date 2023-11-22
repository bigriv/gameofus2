<template>
  <div class="c-drawer">
    <template v-if="timming == WIL_EVENT_TIMMING.LOADING">
      <div class="c-drawer__load">Now Loading...</div>
    </template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.OPENING">
      <Chapter @next="onOpeningEnd" />
    </template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.TALK">
      <Talk
        :left="talkCharacters.left"
        :right="talkCharacters.right"
        :event="talkEvent"
        @end="onTalkEnd"
      />
    </template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.BATTLE">
      <Battle
        :characters="WIL_CHARACTERS"
        :skills="WIL_SKILLS"
        :player="player"
      />
    </template>
    <template v-else-if="timming == WIL_EVENT_TIMMING.TRAINING">
      <Training :characters="WIL_CHARACTERS" :player="player" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import Chapter from "@/components/templates/games/wil/main/01_Chapter.vue";
import Talk from "@/components/templates/games/wil/main/02_Talk.vue";
import Battle from "@/components/templates/games/wil/main/03_Battle.vue";
import Training from "@/components/templates/games/wil/main/04_Training.vue";
import { WIL_EVENT_TIMMING } from "@/composables/games/wil/enums/timming";
import { useWilInit } from "@/composables/games/wil/init";
import { WilTalkEvent } from "@/composables/games/wil/types/event";
import GOUVisual from "@/composables/types/visuals/GOUVisual";

const props = defineProps({
  loadData: {
    type: Boolean,
    default: false,
  },
});

const { WIL_SKILLS, WIL_CHARACTERS, player } = useWilInit();

const isLoading = ref(true);
const timming = ref(WIL_EVENT_TIMMING.LOADING);
const talkCharacters: { left?: GOUVisual; right?: GOUVisual } = reactive({
  left: undefined,
  right: undefined,
});
const talkEvent = ref();

watch(
  () => isLoading.value,
  () => {
    timming.value = WIL_EVENT_TIMMING.OPENING;
  }
);

const onOpeningEnd = () => {
  // TODO: 画面遷移の切り替え
  talkCharacters.left = WIL_CHARACTERS.value.HERO.visual;
  talkCharacters.right = WIL_CHARACTERS.value.HERO.visual;
  talkEvent.value = new WilTalkEvent({
    talker: "主人公",
    message: ["俺は主人公。", "しがない田舎に住む青年だ。"],
  });
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
