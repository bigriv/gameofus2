import { Ref, ref } from "vue";

export const useWilDisplay = () => {
  const messageComplete: Ref<boolean> = ref(false);
  const displayMessage: Ref<string | undefined> = ref();
  const onNextMessage: Ref<Function> = ref(() => {});

  const chainMessage = (messages: string[], afterFunction: Function) => {
    console.log("chainMessage");
    const message = messages.shift();
    if (!message) {
      displayMessage.value = undefined;
      onNextMessage.value = () => {};
      messageComplete.value = true;
      afterFunction();
      return;
    }
    displayMessage.value = message;
    onNextMessage.value = () => chainMessage(messages, afterFunction);
  };

  return {
    messageComplete,
    displayMessage,
    onNextMessage,
    chainMessage,
  };
};
