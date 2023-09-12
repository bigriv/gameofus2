import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { Ref, reactive, ref } from "vue";

export const useWasDispay = () => {
  const layer: {
    background: Array<GOUVisual>;
    objects: Array<GOUVisual>;
  } = reactive({
    background: [],
    objects: [],
  });
  const displayMessage: Ref<Array<string>> = ref([]);
  const onClickMessageFrame: Ref<Function> = ref(() => {});
  const buttonList = ref();
  const isShowStatusBar = ref(false);

  const chainMessage: Function = (
    messages: Array<string>,
    afterFunction: Function
  ) => {
    const message = messages.shift();
    if (!message) {
      displayMessage.value = [];
      onClickMessageFrame.value = () => {};
      afterFunction();
      return;
    }
    displayMessage.value = [message];
    onClickMessageFrame.value = () => chainMessage(messages, afterFunction);
  };

  return {
    layer,
    displayMessage,
    onClickMessageFrame,
    buttonList,
    isShowStatusBar,
    chainMessage,
  };
};
