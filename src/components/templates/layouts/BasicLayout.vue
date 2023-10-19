<template>
  <BreadCrumbList />
  <router-view v-if="!isReload" class="u-margin_top--20" />
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import BreadCrumbList from "@/components/atoms/lists/BreadCrumbList.vue";
import { useDisplayStore } from "@/pinia/display";

const store = useDisplayStore();
const isReload = ref(false);
watch(
  () => store.isReflesh,
  async () => {
    console.log("watch store reflesh", store.isReflesh);
    if (store.isReflesh) {
      isReload.value = true;
      await nextTick();
      store.refleshEnd();
      isReload.value = false;
    }
  }
);
</script>

<style scoped lang="scss"></style>
