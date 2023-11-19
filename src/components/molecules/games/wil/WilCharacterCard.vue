<template>
  <WilCard :selected="props.selected" @click="onClick">
    <div
      class="c-card__type"
      :class="`c-card__type--${props.character.element}`"
    ></div>
    <div class="c-card__name">{{ props.character.name }}</div>
    <div class="c-card__visual">
      <GOUVisualCanvas :objects="{ character: props.character.visual }" />
    </div>
  </WilCard>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import WilCard from "@/components/molecules/games/wil/WilCard.vue";
import { WilCharacter } from "@/composables/games/wil/types/character";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";

const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  character: {
    type: Object as PropType<WilCharacter>,
    required: true,
  },
});
const emits = defineEmits(["click"]);

const onClick = () => {
  emits("click", props.character);
};
</script>

<style scoped lang="scss">
.c-card {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #fff 0%,
    #ffa500 15%,
    #ffa500 85%,
    #cc9900 100%
  );
  &__type {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
    &::before {
      position: absolute;
      top: 0;
      right: 0;
      color: black;
      font-family: "Yuji Mai";
      line-height: 1;
    }
    &--FIRE {
      background-color: red;
      &::before {
        content: "火";
      }
    }
  }
  &__name {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 12.5%;
    background: rgba(255, 255, 255, 0.8);
    color: black;
    padding: 0 4px;
    letter-spacing: -0.1em;
    overflow: hidden;
  }
  &__visual {
    position: absolute;
    top: 25%;
    left: 5%;
    width: 90%;
    height: 70%;
  }
}

@media screen and (max-width: 400px) {
  .c-card__name {
    font-size: 8px;
  }
  .c-card__type::before {
    font-size: 30px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-card__name {
    font-size: 10px;
  }
  .c-card__type::before {
    font-size: 40px;
  }
}
@media screen and (min-width: 600px) {
  .c-card__name {
    font-size: 12px;
  }
  .c-card__type::before {
    font-size: 50px;
  }
}
</style>
