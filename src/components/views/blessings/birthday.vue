<template>
  <BasicModal v-model:isOpen="isOpenConfirmModal">
    <div class="u-horizontal--center">
      <div>
        <span>音が出ます</span>
      </div>
      <div class="u-margin_top--10">
        <button @click="onClickConfirm">OK</button>
      </div>
    </div>
  </BasicModal>
  <div v-if="errorState.isBadRequest">
    <BadRequest :errors="errorState.messages" />
  </div>
  <div v-else class="u-fill u-horizontal--center">
    <div v-if="isConfirmed" class="u-horizontal--center">
      <h1>Happy Birthday!!</h1>
      <h2 v-if="props.name">{{ props.name }}</h2>
      <div class="c-layer">
        <GOUVisualCanvas :objects="objects" class="u-horizontal--center" />
      </div>

      <h3>Since {{ birthday }}</h3>
      <h2>祝 {{ age }}歳</h2>
      <div v-if="props.message" class="u-horizontal--center c-message">
        {{ props.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import BasicModal from "@/components/atoms/BasicModal.vue";
import BadRequest from "@/components/templates/errors/BadRequest.vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import { birthdayMusic } from "@/composables/sounds/blessing";
import GOUFrame from "@/composables/types/visuals/GOUFrame";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { GOUMelodyAudio } from "@/composables/types/audio/GOUMelodyAudio";

const props = defineProps({
  date: {
    type: String,
    required: true,
  },
  icons: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
});

const isOpenConfirmModal = ref(false);
const errorState: any = reactive({
  isBadRequest: false,
  messages: [],
});
const isConfirmed = ref(false);
const birthday = ref("");
const age = ref(0);
const music = ref();
const objects: { [key: string]: GOUVisual | undefined } = reactive({
  animations: undefined,
});
const ICON_DEFINE: { [key: string]: string } = {
  STAR: "/blessings/animations/star.json",
  SHRIMP: "/blessings/animations/shrimp.json",
};

onMounted(async () => {
  // 日付の書式チェック
  if (!props.date.match(/^[0-9]{4}(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])$/)) {
    errorState.isBadRequest = true;
    errorState.messages = ["日付の書式が正しくありません。"];
    return;
  }
  // アイコンの存在チェック
  const icons = props.icons.split(" ").map((i) => i.toUpperCase());
  console.log(icons);
  for (const icon of icons) {
    if (!ICON_DEFINE[icon]) {
      errorState.isBadRequest = true;
      errorState.messages = ["存在しないアイコンが指定されています。"];
      return;
    }
  }

  isOpenConfirmModal.value = true;

  const birthdayYear = Number(props.date.substring(0, 4));
  const birthdayMonth = Number(props.date.substring(4, 6));
  const birthdayDate = Number(props.date.substring(6, 8));
  // 日付のフォーマット
  birthday.value = birthdayYear + "/" + birthdayMonth + "/" + birthdayDate;

  // 年齢の計算
  const today = new Date();
  const thisYearsBirthday = new Date(
    today.getFullYear(),
    birthdayMonth - 1,
    birthdayDate
  );
  age.value = today.getFullYear() - birthdayYear;
  if (today < thisYearsBirthday) {
    // 今年まだ誕生日が来ていなければマイナス1歳する
    age.value--;
  }

  // アイコンの取得
  const frame = new GOUFrame(100, 100);
  for (const icon of icons) {
    const object = new GOULottie(ICON_DEFINE[icon], 100, 100, true);
    object.load();
    frame.setChild(icon, object);
  }
  objects.animations = frame;
});

const onClickConfirm = () => {
  isConfirmed.value = true;
  music.value = new GOUMelodyAudio(birthdayMusic);
  music.value.play();
  isOpenConfirmModal.value = false;
};
</script>

<style scoped lang="scss">
.u-fill {
  max-width: 400px;
  max-height: 100vh;
}
button {
  background-color: white;
  cursor: pointer;
  padding: 5px 10px;
  border: solid 1px black;
  border-radius: 5px;
}
.c-message {
  font-size: 20px;
  width: 400px;
  max-width: 100%;
}
.c-layer {
  position: relative;
  width: 200px;
  height: 200px;
  margin: auto;
}
</style>
