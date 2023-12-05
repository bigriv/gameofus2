<template>
  <div class="c-map">
    <div class="c-map__background">
      <GOUVisualCanvas :objects="{ background: props.map.visual }" />
    </div>
    <div class="c-map__areas">
      <div class="c-map__areas__satan_castle">
        <GOUVisualCanvas
          :objects="{ area: areas[WAS_AREA_ID.SATAN_CASTLE].outside }"
          @click="onClick(WAS_AREA_ID.SATAN_CASTLE)"
        />
      </div>
      <div
        v-if="props.timming >= WAS_EVENT_TIMMING.AFTER_OPENING2"
        class="c-map__areas__cave"
      >
        <GOUVisualCanvas
          :objects="{ area: areas[WAS_AREA_ID.CAVE].outside }"
          @click="onClick(WAS_AREA_ID.CAVE)"
        />
      </div>
      <template v-if="props.timming >= WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE">
        <div class="c-map__areas__village">
          <GOUVisualCanvas
            :objects="{ area: areas[WAS_AREA_ID.VILLAGE].outside }"
            @click="onClick(WAS_AREA_ID.VILLAGE)"
          />
        </div>
        <div class="c-map__areas__sea">
          <GOUVisualCanvas
            :objects="{ area: areas[WAS_AREA_ID.SEA].outside }"
            @click="onClick(WAS_AREA_ID.SEA)"
          />
        </div>
        <div class="c-map__areas__mountain">
          <GOUVisualCanvas
            :objects="{ area: areas[WAS_AREA_ID.MOUNTAIN].outside }"
            @click="onClick(WAS_AREA_ID.MOUNTAIN)"
          />
        </div>
      </template>

      <div
        v-if="props.timming >= WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA"
        class="c-map__areas__kingdom_castle"
      >
        <GOUVisualCanvas
          :objects="{ area: areas[WAS_AREA_ID.KINGDOM_CASTLE].outside }"
          @click="onClick(WAS_AREA_ID.KINGDOM_CASTLE)"
        />
      </div>

      <div
        class="c-map__areas__player"
        :class="`c-map__areas__player--${props.player.currentArea}`"
      >
        <GOUVisualCanvas :objects="{ player: props.player.visual }" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType, onMounted, onUnmounted, ref } from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { WAS_AREA_ID } from "@/composables/games/was/const";
import { WasPlayer } from "@/composables/games/was/types/player";
import { WAS_EVENT_TIMMING } from "@/composables/games/was/enums/timming";
import { WasMap } from "@/composables/games/was/types/map";
import { hoverSE } from "@/composables/sounds/seDefinition";

const props = defineProps({
  map: {
    type: Object as PropType<WasMap>,
    required: true,
  },
  timming: {
    type: Number as PropType<WAS_EVENT_TIMMING>,
    required: true,
  },
  player: {
    type: Object as PropType<WasPlayer>,
    required: true,
  },
});

const emits = defineEmits(["click"]);

const areas = ref(props.map.areas);
const onClick = (area: WAS_AREA_ID) => {
  hoverSE.play();
  emits("click", area);
};

onMounted(() => {
  props.map.bgm.play();
});
onUnmounted(() => {
  props.map.bgm.stop();
});
</script>

<style scoped lang="scss">
.c-map {
  position: relative;
  width: 100%;
  height: 100%;
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__areas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    &__satan_castle,
    &__cave,
    &__village,
    &__sea,
    &__mountain,
    &__kingdom_castle {
      cursor: pointer;
      &:hover {
        opacity: 0.8;
      }
    }
    &__satan_castle {
      position: absolute;
      top: 8%;
      left: 7%;
      width: 15%;
      height: 15%;
    }
    &__cave {
      position: absolute;
      top: 30%;
      left: 30%;
      width: 15%;
      height: 10%;
    }
    &__village {
      position: absolute;
      top: 18%;
      left: 65%;
      width: 20%;
      height: 15%;
    }
    &__sea {
      position: absolute;
      top: 67%;
      left: 6.1%;
      width: 17.8%;
      height: 26%;
      background-color: black;
    }
    &__mountain {
      position: absolute;
      top: 48%;
      left: 45%;
      width: 30%;
      height: 15%;
    }
    &__kingdom_castle {
      position: absolute;
      top: 75%;
      left: 75%;
      width: 15%;
      height: 15%;
    }
    &__player {
      position: absolute;
      width: 5%;
      height: 5%;
      &--SATAN_CASTLE {
        top: 20%;
        left: 20%;
      }
      &--CAVE {
        top: 36%;
        left: 42%;
      }
      &--MOUNTAIN {
        top: 60%;
        left: 70%;
      }
      &--SEA {
        top: 75%;
        left: 20%;
      }
      &--VILLAGE {
        top: 30%;
        left: 80%;
      }
      &--KINGDOM_CASTLE {
        top: 86%;
        left: 88%;
      }
    }
  }
}
</style>
