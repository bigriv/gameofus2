<template>
  <div class="c-translate">
    <div class="c-translate__language">
      <select v-model="befroreLanguage">
        <option v-for="lang in LANGUAGES" :value="lang.value">
          {{ lang.label }}
        </option>
      </select>
      <div class="c-translate__language__allow">⇒</div>
      <select v-model="afterLanguage">
        <option v-for="lang in LANGUAGES" :value="lang.value">
          {{ lang.label }}
        </option>
      </select>
    </div>
    <div class="c-translate__text">
      <textarea v-model="beforeText" />
      <button @click="onTranslate">翻訳</button>
      <textarea v-model="afterText" readonly />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const LANGUAGES: Array<{ label: string; value: string }> = [
  { label: "日本語", value: "ja" },
  { label: "英語", value: "en" },
  { label: "中国語", value: "zh" },
  { label: "ロシア語", value: "ru" },
];
const apiPath =
  "https://script.google.com/macros/s/AKfycbxZejSUcrzjj__i1IsAZnyKRuGeUPdOg6TI9daLQV7FvZ1fPw_Gb8xtVO7vfwH2dPIk/exec";

const beforeText = ref("");
const afterText = ref("");
const befroreLanguage = ref("ja");
const afterLanguage = ref("en");

const onTranslate = async () => {
  fetch(
    `${apiPath}?text=${beforeText.value}&source=${befroreLanguage.value}&target=${afterLanguage.value}`
  ).then(async (json) => {
    const response = await json.json();
    if (response.code === 200) {
      console.log(response.text);
      afterText.value = response.text;
    }
  });
};
</script>

<style scoped lang="scss">
.c-translate {
  margin: auto;
  padding: 20px;
  max-width: 1400px;
  &__language {
    display: flex;
    justify-content: space-between;
    height: 30px;
    select {
      height: 100%;
      cursor: pointer;
    }
    &__allow {
      text-align: center;
    }
  }
  &__text {
    display: flex;
    justify-content: space-between;
    textarea {
      resize: none;
      height: 100%;
      padding: 4px;
      font-size: 20px;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.1;
      overflow: auto;
    }
    button {
      width: 15%;
      min-width: 100px;
      height: 40px;
      align-self: center;
      cursor: pointer;
    }
  }
}
@media screen and (max-width: 740px) {
  .c-translate__language {
    select {
      width: 40%;
      min-width: 100px;
    }
    &__allow {
      width: 15%;
      min-width: 100px;
    }
  }
  .c-translate__text {
    flex-direction: column;
    min-width: 300px;
    gap: 10px 0;
    textarea {
      width: 100%;
      height: 200px;
    }
  }
}
@media screen and (min-width: 740px) {
  .c-translate__language {
    select {
      width: 40%;
      min-width: 300px;
    }
    &__allow {
      width: 10%;
      min-width: 20px;
    }
  }
  .c-translate__text {
    flex-direction: row;
    textarea {
      min-width: 300px;
      width: 40%;
      height: 200px;
    }
  }
}
</style>
