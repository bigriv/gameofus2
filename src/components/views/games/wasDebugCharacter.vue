<template>
  <BasicCanvas :width="1000" :height="1000" :objects="objects" />
</template>

<script setup lang="ts">
import BasicCanvas from "@/components/atoms/canvases/BasicCanvas.vue";
import { reactive } from "vue";
import GOUPosition from "@/composables/types/GOUPosition";
import {
  getHero,
  getElf,
  getGoblin,
  getBossGoblin,
  getSahagin,
  getKraken,
  getWolf,
  getDragon,
  getSlime,
} from "@/composables/games/was/visualDefinition/characterDefinitions";
import { COLOR } from "@/composables/types/GOUColor";

const objects = reactive([
  getHero(100, 200, COLOR.BEIGE, COLOR.BLACK, COLOR.BLACK, new GOUPosition()),
  getGoblin(100, 200, new GOUPosition(0, 200)),
  getElf(100, 200, "normal", new GOUPosition(100, 200)),
  getElf(100, 200, "dark", new GOUPosition(200, 200)),
  getSahagin(100, 200, new GOUPosition(300, 200)),
  getSlime(100, 100, new GOUPosition(400, 200)),
  getBossGoblin(150, 300, new GOUPosition(0, 400)),
  getKraken(150, 300, new GOUPosition(150, 400)),
  getWolf(150, 300, new GOUPosition(300, 400)),
  getDragon(300, 300, new GOUPosition(450, 400)),
]);
</script>
