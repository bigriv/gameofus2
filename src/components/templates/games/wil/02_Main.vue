<template>
  <div>
    <template v-if="timming == WIL_TIMMING.LOADING"> Now Loading</template>
    <template v-else-if="timming == WIL_TIMMING.OPENING"><Chapter /> </template>
    <template v-else-if="timming == WIL_TIMMING.TALK"><Talk /> </template>
    <template v-else-if="timming == WIL_TIMMING.BATTLE"><Battle /> </template>
    <template v-else-if="timming == WIL_TIMMING.TRAINING"
      ><Training />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Chapter from "@/components/templates/games/wil/main/01_Chapter.vue";
import Talk from "@/components/templates/games/wil/main/02_Talk.vue";
import Battle from "@/components/templates/games/wil/main/03_Battle.vue";
import Training from "@/components/templates/games/wil/main/04_Training.vue";
import { WIL_TIMMING } from "@/composables/games/wil/enums/timming";

const timming = ref(WIL_TIMMING.LOADING);
</script>
