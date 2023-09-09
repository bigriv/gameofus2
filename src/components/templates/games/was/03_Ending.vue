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
import GameButton from "@/components/atoms/interfaces/GameButton.vue";
import { COLOR } from "@/composables/types/GOUColor";
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    required: true,
    validator: (value: string) => {
      return ["good", "bad", "dead"].includes(value);
    },
  },
});
const emits = defineEmits(["back"]);

const header = computed(() => {
  switch (props.type) {
    case "good":
      return "Good End";
    case "bad":
      return "Bad End";
    case "dead":
      return "Game Over";
    default:
      return "";
  }
});
const body = computed(() => {
  switch (props.type) {
    case "good":
      return "こうして世界は平和になりましたとさ";
    case "bad":
      return "こうして世界は魔王に支配されましたとさ";
    case "dead":
      return "魔王は倒れ世界は人間に支配されましたとさ";
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
  width: 600rem;
  height: 600rem;
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
    width: 20%;
    height: 7.5%;
    transform: translate(-50%, -50%);
  }
}
.good {
  background-color: white;
  color: orange;
}
.bad {
  background-color: indigo;
  color: white;
}
.dead {
  background-color: black;
  color: red;
}
</style>
