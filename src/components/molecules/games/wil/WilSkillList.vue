<template>
  <div class="c-skill_list">
    <button
      class="c-skill_list__triangle_button c-skill_list__triangle_button--up"
      :disabled="start <= 0"
      @click="start--"
    ></button>
    <div class="c-skill_list__skill_buttons" :style="{ '--start': start }">
      <button
        v-for="skill in skillList"
        class="c-skill_list__skill_buttons__content"
        :class="{
          'c-skill_list__skill_buttons__content--flash':
            props.selected === skill.id,
        }"
        @click="() => onSelectSkill(skill)"
      >
        {{ skill.name }}
      </button>
    </div>
    <button
      class="c-skill_list__triangle_button c-skill_list__triangle_button--down"
      :disabled="start >= (props.skillList.length ?? 0) - 4"
      @click="start++"
    ></button>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { WIL_SKILL_ID } from "@/composables/games/wil/enums/skill";
import { WilSkill } from "@/composables/games/wil/types/skill";

const props = defineProps({
  selected: {
    type: String as PropType<WIL_SKILL_ID>,
    default: undefined,
  },
  skillList: {
    type: Array<WilSkill>,
    required: true,
  },
});

const emits = defineEmits(["select"]);

const start = ref(0);

const onSelectSkill = (skill: WilSkill) => {
  emits("select", skill);
};
</script>
<style scoped lang="scss">
.c-skill_list {
  width: 100%;
  height: 100%;
  &__skill_buttons {
    position: absolute;
    top: 10%;
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    &__content {
      width: 100%;
      height: 25%;
      border-color: black;
      transform: translateY(calc(-98% * var(--start)));
      transition: transform 0.3s ease-out;
      background-color: black;
      border-color: white;
      color: white;
      cursor: pointer;
      &--flash {
        animation: button_flash 1s infinite;
        border-style: solid;
        @keyframes button_flash {
          0%,
          100% {
            border-color: black;
          }

          50% {
            border-color: white;
          }
        }
      }
    }
  }
  &__triangle_button {
    position: absolute;
    width: 13%;
    aspect-ratio: 1;
    background-color: lightgray;
    border: none;
    cursor: pointer;
    clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
    left: 50%;
    &--up {
      top: -5%;
      transform: translateX(-50%);
    }
    &--down {
      bottom: -5%;
      rotate: 180deg;
      transform: translateX(50%);
    }
    &:disabled {
      background-color: gray;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-skill_list__skill_buttons__content {
    font-size: 8px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-skill_list__skill_buttons__content {
    font-size: 9px;
  }
}
@media screen and (min-width: 600px) {
  .c-skill_list__skill_buttons__content {
    font-size: 14px;
  }
}
</style>
