<template>
  <div class="c-container">
    <div class="c-container__content">
      背景色
      <ColorPicker
        :color="form.bgColor"
        :opacity="form.bgOpacity"
        @submit="onBgColorSubmit"
      />
    </div>
    <div class="c-container__content">
      文字色
      <ColorPicker
        :color="form.fontColor"
        :pickableOpacity="false"
        @submit="onFontColorSubmit"
      />
    </div>
    <div class="c-container__content">
      文字サイズ
      <InputNumber
        v-model="form.fontSize"
        :max="100"
        :min="10"
        class="c-container__content__font_size"
      />
      px
    </div>
    <div class="c-container__content">
      文字フォント
      <select v-model="form.fontFamily">
        <option v-for="fontFamily in fontFamilyList" :value="fontFamily">
          {{ fontFamily }}
        </option>
      </select>
    </div>
    <div class="c-container__content">
      文字の太さ
      <div class="c-container__content__font_weight">
        <template v-for="fontWeight in fontWeightList">
          <input
            v-model="form.fontWeight"
            :id="`fontWeight--${fontWeight.value}`"
            name="fontWeight"
            type="radio"
            :value="fontWeight.value"
          />
          <label :for="`fontWeight--${fontWeight.value}`">{{
            fontWeight.label
          }}</label>
        </template>
      </div>
    </div>

    <div class="c-container__content">
      サンプル
      <div class="c-container__content__sample">
        <StopWatch
          :bgColor="form.bgColor"
          :bgOpacity="form.bgOpacity"
          :fontSize="form.fontSize"
          :fontColor="form.fontColor"
          :fontWeight="form.fontWeight"
          :fontFamily="form.fontFamily"
        />
      </div>
    </div>

    <div class="c-container__content">
      <button @click="onCreateURL">URLを生成</button>
      <div class="c-container__content__copy">
        <input readonly type="text" :value="url" />
        <BasicBalloon content="コピーしました" timming="click">
          <img
            src="/commons/icons/copy.svg"
            alt="コピー"
            class="c-container__content__copy__icon"
            @click="onCopy"
          />
        </BasicBalloon>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicBalloon from "@/components/atoms/BasicBalloon.vue";
import ColorPicker from "@/components/atoms/interfaces/ColorPicker.vue";
import InputNumber from "@/components/atoms/interfaces/InputNumber.vue";
import StopWatch from "@/components/templates/tools/StopWatch.vue";
import { reactive, ref } from "vue";

const url = ref("");
const form: {
  bgColor: string | undefined;
  bgOpacity: number | undefined;
  fontColor: string | undefined;
  fontSize: number | undefined;
  fontFamily: string | undefined;
  fontWeight: string;
} = reactive({
  bgColor: undefined,
  bgOpacity: undefined,
  fontColor: undefined,
  fontSize: 10,
  fontFamily: "メイリオ",
  fontWeight: "normal",
});

const fontFamilyList = [
  "Arial",
  "Helvetica",
  "Helvetica Neue",
  "Segoe UI",
  "San Francisco",
  "ＭＳ ゴシック",
  "MS Pゴシック",
  "メイリオ",
  "ヒラギノ角ゴシック",
  "ヒラギノ丸ゴシック ProN",
  "Osaka",
  "游明朝",
  "ヒラギノ明朝 ProN W3",
  "MS 明朝",
];
const fontWeightList = [
  {
    value: "lighter",
    label: "細字",
  },
  {
    value: "normal",
    label: "中字",
  },
  {
    value: "bolder",
    label: "太字",
  },
];
const onBgColorSubmit = (newColor: string, newOpacity: number) => {
  form.bgColor = newColor;
  form.bgOpacity = newOpacity;
};
const onFontColorSubmit = (newValue: string) => {
  form.fontColor = newValue;
};
const onCreateURL = () => {
  const temps: { [key: string]: string | number | undefined } = {};
  temps.bgColor = form.bgColor ?? "";
  temps.bgOpacity = form.bgOpacity ?? "";
  temps.fontColor = form.fontColor ?? "";
  temps.fontSize = form.fontSize ?? "";
  temps.fontWeight = form.fontWeight ?? "";
  temps.fontFamily = form.fontFamily ?? "";

  let params: Array<string> = [];
  for (const key of Object.keys(temps)) {
    let value: string | number | undefined = temps[key];
    if (!value) {
      value = "";
    } else if (typeof value === "number") {
      value = String(value);
    }
    params.push(`${key}=${value}`);
  }
  url.value = encodeURI(
    import.meta.env.VITE_HOST + "/tools/view/stopwatch?" + params.join("&")
  ).replace(/#/g, "%23");
};
const onCopy = () => {
  navigator.clipboard.writeText(url.value);
};
</script>

<style scoped lang="scss">
input[type="color"],
input[type="range"],
select,
button {
  cursor: pointer;
}
.c-container {
  padding: 0 10px;
  &__content {
    display: flex;
    align-items: center;
    gap: 0 10px;
    + .c-container__content {
      margin-top: 10px;
    }
    &__font_size {
      width: 50px;
    }
    &__font_weight {
      input[type="radio"] {
        appearance: none;
        &:checked + label {
          background-color: rgba(0, 0, 255, 0.4);
        }
      }

      label {
        cursor: pointer;
        border: 1px lightgray solid;
        padding: 2px 4px;
      }
    }
    &__sample {
      width: 400px;
      padding: 5px 10px;
      border: 1px lightgray solid;
    }
    button {
      width: 100px;
      height: 100%;
    }
    &__copy {
      display: flex;
      &__icon {
        position: relative;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
}
</style>
