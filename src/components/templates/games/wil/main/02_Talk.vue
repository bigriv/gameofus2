<template>
  <WilTalk :events="props.events" @end="onEndTalk" />
</template>

<script setup lang="ts">
import { WilTalkEvent } from "@/composables/games/wil/types/event";
import WilTalk from "@/components/molecules/games/wil/WilTalk.vue";

const props = defineProps({
  events: {
    type: Array<WilTalkEvent>,
    default: () => [],
  },
});
const emits = defineEmits(["end"]);

const onEndTalk = () => {
  emits("end");
};
</script>

<style scoped lang="scss"></style>
