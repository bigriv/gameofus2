import { Ref, ref } from "vue";

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

  return {
    messageComplete,
    displayMessage,
    onClickMessageFrame,
    chainMessage,
  };
};
