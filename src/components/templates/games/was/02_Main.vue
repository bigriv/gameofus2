<template>
  <div
    v-if="overallTimming !== WAS_OVERALL_TIMMING.LOADING"
    class="c-game__drawer"
  >
    <template v-if="!isReflesh">
      <Map
        v-if="overallTimming === WAS_OVERALL_TIMMING.MAIN_MAP"
        :map="map"
        :timming="state.timming"
        :player="state.player"
        @click="onClickArea"
      />
      <Area
        v-else-if="overallTimming === WAS_OVERALL_TIMMING.MAIN_AREA"
        v-model:timming="state.timming"
        v-model:player="state.player"
        :items="ITEMS"
        :skills="SKILLS"
        :map="map"
        @map="onBackMap"
        @save="onSave"
        @clear="onClearArea"
        @end="onEnd"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, onUnmounted, ref, watch } from "vue";
import Map from "@/components/templates/games/was/main/01_Map.vue";
import Area from "@/components/templates/games/was/main/02_Area.vue";
import { useWasMain } from "@/composables/games/was/main";
import { WAS_AREA_ID, WAS_ENDING } from "@/composables/games/was/const";
import { WasPlayer } from "@/composables/games/was/types/player";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasArea } from "@/composables/games/was/types/area";
import {
  WAS_EVENT_TIMMING,
  WAS_OVERALL_TIMMING,
} from "@/composables/games/was/enums/timming";

const props = defineProps({
  overallTimming: {
    type: String as PropType<WAS_OVERALL_TIMMING>,
    required: true,
  },
  loadData: {
    default: undefined,
  },
});
const emits = defineEmits<{
  (
    event: "save",
    timming: WAS_EVENT_TIMMING,
    healed: boolean,
    player: WasPlayer,
    characters: { [key: string]: WasNonPlayerCharacter },
    bosses: { [key: string]: WasNonPlayerCharacter },
    areas: { [key: string]: WasArea }
  ): void;
  (event: "loaded"): void;
  (event: "end", endType: WAS_ENDING): void;
  (event: "update:overallTimming", timming: WAS_OVERALL_TIMMING): void;
}>();

const isReflesh = ref(false);
const reflesh = () => {
  isReflesh.value = true;
  setTimeout(() => (isReflesh.value = false), 1000);
};
const overallTimming = computed({
  get: () => props.overallTimming,
  set: (newValue: WAS_OVERALL_TIMMING) =>
    emits("update:overallTimming", newValue),
});
const {
  loadIntervalId,
  isLoadedImages,
  loadFile,
  loadSaveData,
  ITEMS,
  SKILLS,
  map,
  state,
  updateTimming,
  save,
} = useWasMain(props.loadData, emits);

const onClickArea = (area: WAS_AREA_ID) => {
  state.player.currentArea = area;
  overallTimming.value = WAS_OVERALL_TIMMING.MAIN_AREA;
};

const onBackMap = () => {
  if (state.player.status.satiety <= 0) {
    // 満腹度が0以下の場合はGame Overとする
    emits("end", WAS_ENDING.HUNGER);
    return;
  }
  overallTimming.value = WAS_OVERALL_TIMMING.MAIN_MAP;
};
const onSave = () => {
  save();
};
const onClearArea = () => {
  updateTimming();
  console.log("clear", state.timming);
  if (state.timming === WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE) {
    // 王国クリア時はエンディングに遷移する
    reflesh();
    state.player.currentArea = WAS_AREA_ID.SATAN_CASTLE;
    overallTimming.value = WAS_OVERALL_TIMMING.MAIN_AREA;
  }
  console.log("clear", state.player.currentArea, overallTimming.value);
};
const onEnd = (ending: WAS_ENDING) => {
  emits("end", ending);
};
onMounted(() => {
  loadFile();
  loadSaveData();
  emits("loaded");
});
onUnmounted(() => {
  clearInterval(loadIntervalId);
});
watch(
  () => isLoadedImages.value,
  () => {
    if (isLoadedImages.value) {
      overallTimming.value = WAS_OVERALL_TIMMING.MAIN_MAP;
    }
  }
);
</script>

<style scoped lang="scss">
:deep(*) {
  font-family: "DotGothic16";
}
.c-game__drawer {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: black;
  &__upper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 70%;
    background-color: black;
  }
  &__lower {
    position: absolute;
    top: 70%;
    left: 0;
    width: 100%;
    height: 30%;
    border: 6px solid #d3d3d3;
    background-color: black;
    opacity: 0.8;
    &__message_frame {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    &__button_list {
      width: 100%;
      height: 100%;
      &__row {
        display: flex;
        width: 100%;
        height: 25%;
      }
      &__row > &__button {
        width: 25%;
        height: 100%;
      }
      & > &__button {
        width: 25%;
        height: 25%;
      }
    }
    &__status {
      position: absolute;
      top: 0;
      left: 40%;
      width: 50%;
      height: 100%;
      color: white;
      span {
        width: 25%;
      }
      &__life {
        position: absolute;
        top: 10px;
        left: 0;
        display: flex;
        width: 100%;
      }
      &__satiety {
        position: absolute;
        top: 40px;
        left: 0;
        display: flex;
        width: 100%;
      }
    }
  }
  &__layer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}

@media screen and (max-width: 400px) {
  .c-game__drawer__lower__button_list__button,
  .c-game__drawer__lower__message_frame {
    font-size: 12px;
  }
  .c-game__drawer__lower__status__life > span {
    font-size: 10px;
  }
  .c-game__drawer__lower__status__satiety > span {
    font-size: 10px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-game__drawer__lower__button_list__button,
  .c-game__drawer__lower__message_frame {
    font-size: 14px;
  }
  .c-game__drawer__lower__status__life > span {
    font-size: 12px;
  }
  .c-game__drawer__lower__status__satiety > span {
    font-size: 12px;
  }
}
@media screen and (min-width: 600px) {
  .c-game__drawer__lower__button_list__button,
  .c-game__drawer__lower__message_frame {
    font-size: 16px;
  }
  .c-game__drawer__lower__status__life > span {
    font-size: 14px;
  }
  .c-game__drawer__lower__status__satiety > span {
    font-size: 14px;
  }
}
</style>
