<template>
  <div class="c-card_list">
    <button
      class="c-card_list__pre_button"
      :disabled="cardStart <= 0"
      @click="cardStart--"
    ></button>
    <div class="c-card_list__container" :style="{ '--cardStart': cardStart }">
      <div
        v-for="data in props.dataList"
        class="c-card_list__container__content"
      >
        <template v-if="data instanceof WilSkill">
          <WilSkillCard
            :selected="props.selected === data.id"
            :skill="data"
            @click="onSelectSkill"
          />
        </template>
        <template v-else-if="data instanceof WilCharacter">
          <WilCharacterCard
            :selected="props.selected === data.id"
            :character="data"
            @click="onSelectCharacter"
          />
        </template>
        <template v-else>
          <WilCard @click="data.onClick">
            <div class="c-card_list__container__content--other">
              {{ data.label }}
            </div>
          </WilCard>
        </template>
      </div>
    </div>
    <button
      class="c-card_list__next_button"
      :disabled="cardStart >= (dataList?.length ?? 0) - 4"
      @click="cardStart++"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import WilCard from "@/components/molecules/games/wil/WilCard.vue";
import WilCharacterCard from "@/components/molecules/games/wil/WilCharacterCard.vue";
import WilSkillCard from "@/components/molecules/games/wil/WilSkillCard.vue";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilSkill } from "@/composables/games/wil/types/skill";

const props = defineProps({
  selected: {
    type: String,
    default: undefined,
  },
  dataList: {
    type: Array<
      WilCharacter | WilSkill | { label: string; onClick?: Function }
    >,
    default: () => [],
  },
});
const emits = defineEmits([
  "update:selected",
  "selectSkill",
  "selectCharacter",
]);
const cardStart = ref(0);
const selected = ref(props.selected);
watch(
  () => selected.value,
  () => emits("update:selected", selected.value)
);
watch(
  () => props.selected,
  () => {
    selected.value = props.selected;
  }
);
const onSelectSkill = (skill: WilSkill) => {
  selected.value = skill.id;
  emits("selectSkill", skill);
};
const onSelectCharacter = (character: WilCharacter) => {
  selected.value = character.id;
  emits("selectCharacter", character);
};
</script>

<style scoped lang="scss">
.c-card_list {
  position: relative;
  width: 100%;
  height: 100%;
  &__container {
    position: absolute;
    width: 90%;
    height: 90%;
    top: 5%;
    left: 5%;
    display: flex;
    gap: 0 1%;
    overflow: hidden;
    &__content {
      min-width: 19.2%;
      max-width: 19.2%;
      height: 100%;
      transform: translateX(calc(-105% * var(--cardStart)));
      transition: transform 0.3s ease-out;
      &--other {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: white;
        background-color: rgba(0, 0, 0, 0.8);
      }
    }
  }
  &__pre_button,
  &__next_button {
    position: absolute;
    top: 50%;
    width: 4%;
    aspect-ratio: 1;
    background-color: lightgray;
    border: none;
    cursor: pointer;
    transform: translateY(-50%);
    &:disabled {
      background-color: gray;
    }
  }
  &__pre_button {
    left: 0%;
    clip-path: polygon(100% 0%, 0% 50%, 100% 100%);
  }
  &__next_button {
    right: 0%;
    clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
  }
}
@media screen and (max-width: 400px) {
  .c-card_list__container__content--other {
    font-size: 8px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-card_list__container__content--other {
    font-size: 10px;
  }
}
@media screen and (min-width: 600px) {
  .c-card_list__container__content--other {
    font-size: 12px;
  }
}
</style>
