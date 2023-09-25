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
      <h2>{{ props.name }}</h2>

      <LottieCanvas
        :width="ICON_WIDTH"
        :height="ICON_HEIGHT"
        :objects="objects.animations"
        class="u-horizontal--center"
      />

      <h3>Since {{ birthday }}</h3>
      <h2>祝 {{ age }}歳</h2>
      <div class="u-horizontal--center c-message">
        {{ props.message }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import BasicModal from "@/components/atoms/BasicModal.vue";
import LottieCanvas from "@/components/atoms/canvases/LottieCanvas.vue";
import BadRequest from "@/components/templates/errors/BadRequest.vue";
import { birthdayMusic } from "@/composables/sounds/blessing";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { GOUAudioMelody } from "@/composables/types/audio/GOUMelodyAudio";

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
const ICON_WIDTH = 200;
const ICON_HEIGHT = 200;
const objects: { [key: string]: Array<GOULottie> } = reactive({
  animations: [],
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
  let temp: Array<GOULottie> = [];
  for (const icon of icons) {
    const object = new GOULottie(
      ICON_DEFINE[icon],
      ICON_WIDTH,
      ICON_HEIGHT
    );
    object.load();
    temp.push(object);
  }
  objects.animations = temp;
});

const onClickConfirm = () => {
  isConfirmed.value = true;
  music.value = new GOUAudioMelody(birthdayMusic);
  music.value.play();
  isOpenConfirmModal.value = false;
};
</script>

<style scoped lang="scss">
.u-fill {
  max-width: 400rem;
  max-height: 100vh;
}
button {
  background-color: white;
  cursor: pointer;
  padding: 5rem 10rem;
  border: solid 1rem black;
  border-radius: 5rem;
}
.c-message {
  font-size: 20rem;
  width: 400rem;
  max-width: 100%;
}
</style>
