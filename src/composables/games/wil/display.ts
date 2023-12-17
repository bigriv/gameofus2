import { Ref, ref } from "vue";
import { WilBattleMoveResult } from "./types/battle";

export const useWilDisplay = () => {
  const messageComplete: Ref<boolean> = ref(false);
  const displayMessage: Ref<Array<string>> = ref([]);
  const onClickMessageFrame: Ref<Function> = ref(() => {});

  const chainMessage = (messages: string[][], afterFunction: Function) => {
    console.log("chainMessage");
    const message = messages.shift();
    if (!message) {
      displayMessage.value = [];
      onClickMessageFrame.value = () => {};
      messageComplete.value = true;
      afterFunction();
      return;
    }
    displayMessage.value = message;
    onClickMessageFrame.value = () => chainMessage(messages, afterFunction);
  };

  const battleResult: Ref<WilBattleMoveResult | undefined> = ref();
  const chainBattleMoveResult = (results: Array<WilBattleMoveResult>) => {
    const result = results.shift();
    if (!result) {
      battleResult.value = undefined;
      onClickMessageFrame.value = () => {};
      return;
    }
    battleResult.value = result;
    battleResult.value.process();
  };

  return {
    messageComplete,
    displayMessage,
    onClickMessageFrame,
    chainMessage,
    chainBattleMoveResult,
  };
};
