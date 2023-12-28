<template>
  <div class="c-postcard" :class="`c-postcard--${props.background}`">
    <p v-if="props.year" class="c-postcard__year">{{ props.year }}年元旦</p>
    <div v-if="props.showIllust || props.oneText" class="c-postcard__center">
      <div v-if="props.oneText" class="c-postcard__center__one_text">
        {{ props.oneText }}
      </div>
      <div v-if="props.showIllust" class="c-postcard__center__image">
        <GOUVisualCanvas :objects="{ img: img }" />
      </div>
    </div>
    <p v-if="props.greeting" class="c-postcard__greeting">
      {{ props.greeting }}
    </p>
    <p v-if="props.message" class="c-postcard__message">{{ props.message }}</p>
    <p v-if="props.from" class="c-postcard__from">{{ props.from }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { GOULottie } from "@/composables/types/visuals/GOULottie";

const props = defineProps({
  background: {
    type: String,
    default: "none",
  },
  year: {
    type: String,
    default: undefined,
  },
  showIllust: {
    type: String,
    default: undefined,
  },
  oneText: {
    type: String,
    default: undefined,
  },
  greeting: {
    type: String,
    default: undefined,
  },
  message: {
    type: String,
    default: undefined,
  },
  from: {
    type: String,
    default: undefined,
  },
});

const img = ref(
  new GOULottie("/blessings/animations/doragon.json", 100, 100, true, 2)
);
onMounted(() => {
  if (props.showIllust) {
    img.value.load();
  }
});
</script>

<style scoped lang="scss">
.c-postcard {
  user-select: none;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  border: 1px black solid;
  width: 300px;
  height: 450px;
  font-family: "Yuji Syuku";
  padding: 10px;
  &--line {
    background: linear-gradient(
      135deg,
      red 5%,
      white 0 6%,
      red 0 7%,
      white 0 8%,
      red 0 9%,
      white 0
    );
  }
  &--circle {
    background: radial-gradient(circle at 5% 5%, red 0, red 10%, white 15%);
  }
  &__year {
    font-size: 30px;
    text-align: center;
  }
  &__center {
    position: relative;
    width: 80%;
    aspect-ratio: 1;
    margin: auto;
    border: red double 8px;
    margin-top: 10px;
    &__image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      aspect-ratio: 1;
      margin: auto;
    }
    &__one_text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      text-align: center;
      font-size: 180px;
      line-height: 1;
    }
  }
  &__greeting {
    text-align: center;
    font-size: 18px;
    margin-top: 10px;
  }
  &__message {
    font-size: 12px;
  }
  &__from {
    font-size: 14px;
    text-align: right;
    margin-top: 10px;
  }
}
</style>
