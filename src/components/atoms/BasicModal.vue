<template>
  <teleport to="body">
    <transition>
      <div v-show="isModalOpen" class="c-modal">
        <div class="c-modal__background" />
        <div class="c-modal__main">
          <div class="c-modal__main__inner">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

const emits = defineEmits(["update:isOpen"]);

const isModalOpen = computed({
  get: () => props.isOpen,
  set: (newValue) => emits("update:isOpen", newValue),
});
</script>

<style scoped lang="scss">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.c-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  &__background {
    background-color: #000;
    opacity: 0.6;
    width: 100%;
    height: 100%;
  }
  &__main {
    position: absolute;
    top: 50%;
    left: 50%;
    background-color: #fff;
    border-radius: 10rem;
    transform: translate(-50%, -50%);
    &__inner {
      position: relative;
      padding: 36rem 60rem;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
