<template>
  <WilCard :selected="props.selected" @click="onClick">
    <div
      class="c-card__type"
      :class="`c-card__type--${props.skill.element}`"
    ></div>
    <div class="c-card__name">
      <span>
        {{ props.skill.name }}
      </span>
    </div>
  </WilCard>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import WilCard from "@/components/molecules/games/wil/WilCard.vue";
import { WilSkill } from "@/composables/games/wil/types/skill";

const props = defineProps({
  selected: {
    type: Boolean,
    default: false,
  },
  skill: {
    type: Object as PropType<WilSkill>,
    required: true,
  },
});
const emits = defineEmits(["click"]);

const onClick = () => {
  emits("click", props.skill);
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
    #1e90ff 15%,
    #4169e1 85%,
    #00bfff 100%
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
      font-size: 50px;
      color: black;
      font-family: "Yuji Mai";
      line-height: 1;
    }
    &--NONE {
      background-color: lightgray;
      &::before {
        content: "無";
      }
    }
    &--FIRE {
      background-color: red;
      &::before {
        content: "火";
      }
    }
    &--SHINE {
      background-color: yellow;
      &::before {
        content: "光";
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
    overflow: hidden;
    span {
      letter-spacing: -0.1em;
      display: block;
      text-wrap: nowrap;
      transform-origin: left;
    }
  }
}

@media screen and (max-width: 400px) {
  .c-card__name span {
    font-size: 8px;
    transform: scaleX(0.7);
  }
  .c-card__type::before {
    font-size: 30px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-card__name span {
    font-size: 10px;
    transform: scaleX(0.6);
  }
  .c-card__type::before {
    font-size: 40px;
  }
}
@media screen and (min-width: 600px) {
  .c-card__name span {
    font-size: 12px;
    transform: scaleX(0.8);
  }
  .c-card__type::before {
    font-size: 50px;
  }
}
</style>
