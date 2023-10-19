<template>
  <div class="c-link_card_list">
    <router-link v-for="content in props.contents" :to="{ name: content.path }">
      <div class="c-link_card_list__card">
        <slot :content="content" />
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  contents: {
    type: Array<{ path: String } & any>,
    required: true,
  },
});
</script>

<style setup lang="scss">
.c-link_card_list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1300px;
  a {
    text-decoration: none;
    color: black;
    width: min(calc(100% - 20px), 400px);
    max-width: 400px;
    border-radius: 10px;
    border: 1px solid black;
    box-shadow: 4px 4px 4px black;
    transition: all 0.2s ease-out;
    &:hover {
      transform: translate(1px, 1px);
      box-shadow: 3px 3px 3px black;
      opacity: 0.8;
    }
  }
}
</style>
