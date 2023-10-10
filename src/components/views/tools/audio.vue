<template>
  <div class="c-score">
    <template v-for="(m, i) in state.score" :key="i">
      <input
        :id="`score_note__${i}`"
        v-model="selectedPosition"
        type="radio"
        :value="i"
        name="score_note"
      />
      <label :for="`score_note__${i}`" class="u-clickable c-score__note">
        {{ m }}
      </label>
    </template>
  </div>
  <div class="u-margin_top--10">
    <span> frequency </span>
    <select v-model="frequency" class="u-clickable">
      <option v-for="f in fequencyOptions" :key="f" :value="f">{{ f }}</option>
    </select>
  </div>
  <div class="u-margin_top--10">
    <span> octarve </span>
    <select v-model="octarve" class="u-clickable">
      <option v-for="o in octarveOptions" :key="o" :value="o">{{ o }}</option>
    </select>
  </div>
  <div class="c-button_list u-margin_top--10">
    <button class="u-clickable" @click="onWatch">視聴</button>
  </div>
  <div class="c-button_list u-margin_top--10">
    <button class="u-clickable" @click="onAdd">末尾に追加</button>
    <button class="u-clickable" @click="onInsert">選択個所の前に追加</button>
    <button class="u-clickable" @click="onReplace">選択個所を置き換え</button>
    <button class="u-clickable" @click="onDelete">末尾を削除</button>
  </div>
  <div class="c-button_list u-margin_top--20">
    <button class="u-clickable" @click="onPlay">最初から再生</button>
    <button class="u-clickable" @click="onPlayFromSelecting">
      選択個所から再生
    </button>
    <button class="u-clickable" @click="onCopy">譜面をコピー</button>
  </div>
</template>

<script setup lang="ts">
import { GOUMelodyAudio } from "@/composables/types/audio/GOUMelodyAudio";
import { Ref, reactive, ref } from "vue";

const fequencyOptions = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
];

const octarveOptions = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
];

const audio: Ref<GOUMelodyAudio | undefined> = ref();
// 周波数
const frequency = ref(null);
// オクターブ
const octarve = ref(null);
// 譜面
const state: { [key: string]: Array<string> } = reactive({
  score: [],
});
// 選択個所
const selectedPosition = ref(0);

// 入力チェック
const requiredCheck = () => {
  if (!frequency.value) {
    alert("frequencyが選択されていません");
    return false;
  }
  if (!octarve.value) {
    alert("octarveが選択されていません");
    return false;
  }
  return true;
};
// 試聴
const onWatch = () => {
  if (!requiredCheck()) {
    return;
  }
  audio.value = new GOUMelodyAudio(`${frequency.value}${octarve.value}`);
  console.log(audio.value.melody);
  audio.value.play();
};
// 音符の追加
const onAdd = () => {
  if (!requiredCheck()) {
    return;
  }

  state.score.push(`${frequency.value}${octarve.value}`);
};
// 音符の挿入
const onInsert = () => {
  if (!requiredCheck()) {
    return;
  }
  state.score.splice(
    selectedPosition.value,
    0,
    `${frequency.value}${octarve.value}`
  );
};
const onReplace = () => {
  if (!requiredCheck()) {
    return;
  }
  state.score[selectedPosition.value] = `${frequency.value}${octarve.value}`;
};
const onDelete = () => {
  state.score.pop();
};
const onPlay = () => {
  audio.value = new GOUMelodyAudio(state.score.join(""));
  console.log(audio.value.melody);
  audio.value.play();
};
const onPlayFromSelecting = () => {
  audio.value = new GOUMelodyAudio(
    state.score.join("").slice(selectedPosition.value * 2)
  );
  console.log(audio.value.melody);
  audio.value.play();
};
const onCopy = () => {
  navigator.clipboard.writeText(state.score.join(""));
  alert("コピーしました");
};
</script>

<style scoped lang="scss">
span {
  font-size: 14px;
}
.c-button_list {
  button + button {
    margin-left: 20px;
  }
}
button {
  width: 150px;
  height: 30px;
  background: linear-gradient(#aec9e8, #91b9e4);
  border: #d8dee5;
  &:active {
    background: linear-gradient(#91b9e4, #aec9e8);
  }
}
.c-score {
  border: 1px solid black;
  padding: 10px;
  &__note {
    border: #d8dee5;
    padding: 5px 10px;
  }
  input[type="radio"] {
    appearance: none;
  }
  input[type="radio"]:checked + .c-score__note {
    background: linear-gradient(#aec9e8, #91b9e4);
  }
}
</style>
