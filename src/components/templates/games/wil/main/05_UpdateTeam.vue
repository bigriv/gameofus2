<template>
  <WilConfirmDialog
    v-model:isShow="isShow"
    :message="displayMessage"
    :cancelable="false"
    @submit="onSubmit"
  />
</template>

<script setup lang="ts">
import { PropType, onMounted, ref } from "vue";
import WilConfirmDialog from "@/components/molecules/games/wil/WilConfirmDialog.vue";
import { useWilDisplay } from "@/composables/games/wil/display";
import { WIL_CHARACTER_DEFINES } from "@/composables/games/wil/defines/character";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilTeamEvent } from "@/composables/games/wil/types/event";
import { WilPlayer } from "@/composables/games/wil/types/player";

const props = defineProps({
  event: {
    type: Object as PropType<WilTeamEvent>,
    required: true,
  },
  player: {
    type: Object as PropType<WilPlayer>,
    required: true,
  },
});

const emits = defineEmits(["end"]);
const { displayMessage, onNextMessage } = useWilDisplay();
const isShow = ref(false);
const onSubmit = () => {
  isShow.value = false;
  setTimeout(() => {
    onNextMessage.value();
  }, 200);
};
const chainMessage = (messages: string[], afterFunction: Function) => {
  const message = messages.shift();
  if (!message) {
    displayMessage.value = undefined;
    onNextMessage.value = () => {};
    afterFunction();
    return;
  }
  isShow.value = true;
  displayMessage.value = message;
  onNextMessage.value = () => {
    chainMessage(messages, afterFunction);
  };
};
onMounted(() => {
  const messages = new Array<string>();
  for (const inCharacter of props.event.in) {
    const character = new WilCharacter(WIL_CHARACTER_DEFINES[inCharacter]);
    messages.push(`${character.name}が仲間になった！`);
    props.player.allCharacters.push(character);
  }

  for (const outCharacter of props.event.out) {
    const character = props.player.removeCharacter(outCharacter);
    if (!character) {
      continue;
    }
    messages.push(`${character.name}が離脱した。`);
  }
  chainMessage(messages, () => emits("end"));
});
</script>
