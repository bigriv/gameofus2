<template>
  <WilConfirmDialog
    v-model:isShow="dialog.isShow"
    :message="dialog.message"
    :cancelable="dialog.isCancelable"
    @submit="dialog.onSubmit"
    @cancel="onCancel"
  />
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue";
import WilConfirmDialog from "@/components/molecules/games/wil/WilConfirmDialog.vue";

const emits = defineEmits(["save", "end"]);
const dialog = reactive({
  message: "",
  isShow: false,
  isCancelable: true,
  onSubmit: () => {},
});

const onCancel = () => {
  emits("end");
};

onMounted(() => {
  dialog.message = "セーブします。";
  dialog.onSubmit = () => {
    dialog.isShow = false;
    emits("save");
    setTimeout(() => {
      dialog.isCancelable = false;
      dialog.message = "セーブしました。";
      dialog.onSubmit = () => {
        emits("end");
      };
      dialog.isShow = true;
    }, 200);
  };
  dialog.isShow = true
});
</script>
