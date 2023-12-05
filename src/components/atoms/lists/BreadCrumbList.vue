<template>
  <div class="c-breadcrumbs">
    <div v-for="breadcrumb in breadcrumbs">
      <div v-if="breadcrumb.path">
        <router-link :to="breadcrumb.path">
          <span class="c-breadcrumbs__link">{{ breadcrumb.name }}</span>
        </router-link>
        <span class="c-breadcrumbs__space">></span>
      </div>
      <div v-else>
        {{ breadcrumb.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useBreadCrumbList } from "@/composables/hooks/atoms/lists/useBreadCrumbList";

const { breadcrumbs } = useBreadCrumbList();
</script>

<style scoped lang="scss">
.c-breadcrumbs {
  display: flex;
  background-color: #eee;
  width: 100%;
  min-width: 300px;
  padding: 0px 20px;
  font-size: 14px;
  &__space {
    padding: 0 4px;
  }
}
</style>
