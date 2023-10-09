<template>
  <div class="c-game__drawer" :class="props.type">
    <div class="c-game__drawer__header">
      {{ header }}
    </div>
    <div class="c-game__drawer__body">
      {{ body }}
    </div>
    <GameButton
      label="タイトル画面へ戻る"
      :fontColor="COLOR.WHITE"
      :backgroundColor="COLOR.BLACK"
      class="c-game__drawer__button--back"
      @click="onBackTitle"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, computed } from "vue";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { WAS_ENDING } from "@/composables/games/was/const";
import { COLOR } from "@/composables/types/GOUColor";

const props = defineProps({
  type: {
    type: String as PropType<WAS_ENDING>,
    required: true,
  },
});
const emits = defineEmits(["back"]);

const header = computed(() => {
  switch (props.type) {
    case WAS_ENDING.WORST:
      return "Worst End";
    case WAS_ENDING.BAD:
      return "Bad End";
    case WAS_ENDING.GOOD:
      return "Good End";
    case WAS_ENDING.BEST:
      return "Best End";
    case WAS_ENDING.DEAD:
    case WAS_ENDING.HUNGER:
      return "Game Over";
    default:
      return "";
  }
});
const body = computed(() => {
  switch (props.type) {
    case WAS_ENDING.WORST:
      return "こうして世界は魔王に支配されましたとさ";
    case WAS_ENDING.BAD:
      return "こうして魔族に平和が訪れましたとさ";
    case WAS_ENDING.GOOD:
      return "こうして世界は人間が支配しましたとさ";
    case WAS_ENDING.BEST:
      return "こうして世界は平和になりましたとさ";
    case WAS_ENDING.DEAD:
      return "魔王は倒れ世界は人間に支配されましたとさ";
    case WAS_ENDING.HUNGER:
      return "魔王は空腹に倒れ世界は人間に支配されましたとさ";
    default:
      return "";
  }
});
const onBackTitle = () => {
  emits("back");
};
</script>

<style scoped lang="scss">
.c-game__drawer {
  position: relative;
  width: 100%;
  height: 100%;
  font-family: "Yusei Magic";
  user-select: none;
  &__header {
    position: absolute;
    top: 10%;
    left: 50%;
    font-size: 40rem;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
  }
  &__body {
    position: absolute;
    top: 30%;
    left: 50%;
    font-size: 28rem;
    width: 100%;
    text-align: center;
    transform: translate(-50%, -50%);
  }

  &__button--back {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.GOOD,
.BEST {
  background-color: white;
  color: orange;
}
.BAD,
.WORST {
  background-color: indigo;
  color: white;
}
.DEAD {
  background-color: black;
  color: red;
}

@media screen and (max-width: 400px) {
  .c-game__drawer__button--back {
    font-size: 10rem;
    width: 35%;
    height: 10%;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-game__drawer__button--back {
    font-size: 11rem;
    width: 30%;
    height: 9%;
  }
}
@media screen and (min-width: 600px) {
  .c-game__drawer__button--back {
    font-size: 14rem;
    width: 25%;
    height: 7.5%;
  }
}
</style>
