<template>
  <transition>
    <div v-show="isMounted" class="c-chapter">
      <div class="c-chapter__title">
        <MessageFrame
          :complete="true"
          :messages="title"
          :fontColor="COLOR.WHITE"
          vertical="center"
          horizontal="center"
        />
      </div>
      <div class="c-chapter__buttons">
        <div class="c-chapter__buttons--next">
          <GameButton label="次へ" :fontColor="COLOR.WHITE" @click="onNext" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import MessageFrame from "@/components/atoms/frames/MessageFrame.vue";
import { COLOR } from "@/composables/types/GOUColor";
import GameButton from "@/components/atoms/interfaces/GameButton.vue";

const emits = defineEmits(["next"]);

const title = ref(["第１章 聖の国と騎士団"]);
const isMounted = ref();

onMounted(() => (isMounted.value = true));

const onNext = () => {
  emits("next");
};
</script>

<style scoped lang="scss">
.v-enter-active {
  transition: opacity 0.8s ease-out;
}
.v-enter-from {
  opacity: 0;
}
.c-chapter {
  width: 100%;
  height: 100%;
  &__title {
    width: 100%;
    height: 40%;
  }
  &__buttons {
    width: 100%;
    height: 40%;
    &--next {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
      height: 20%;
      margin: auto;
    }
  }
}
@media screen and (max-width: 400px) {
  .c-chapter__buttons--next {
    font-size: 10px;
    width: 25%;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-chapter__buttons--next {
    font-size: 12px;
    width: 23%;
  }
}
@media screen and (min-width: 600px) {
  .c-chapter__buttons--next {
    font-size: 14px;
    width: 20%;
  }
}
</style>
