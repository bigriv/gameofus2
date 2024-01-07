<template>
  <div class="c-newyear">
    <dl>
      <dt>背景</dt>
      <dd class="c-newyear__background">
        <div>
          <input
            v-model="form.background"
            id="background_none"
            name="background"
            type="radio"
            value="none"
          />
          <label for="background_none">
            柄なし
            <div class="c-postcard c-postcard--none"></div>
          </label>
        </div>
        <div>
          <input
            v-model="form.background"
            id="background_line"
            name="background"
            type="radio"
            value="line"
          />
          <label for="background_line">
            線
            <div class="c-postcard c-postcard--line"></div>
          </label>
        </div>
        <div>
          <input
            v-model="form.background"
            id="background_circle"
            name="background"
            type="radio"
            value="circle"
          />
          <label for="background_circle">
            日の丸
            <div class="c-postcard c-postcard--circle"></div>
          </label>
        </div>
      </dd>
    </dl>
    <dl>
      <dt>西暦</dt>
      <dd>
        <input v-model="form.year" readonly disabled type="number" />
      </dd>
    </dl>
    <dl>
      <dt>干支イラスト</dt>
      <dd>
        <input
          v-model="form.isShowIllust"
          id="is_show_illust_check"
          type="checkbox"
        />
        <label for="is_show_illust_check">表示する</label>
      </dd>
    </dl>
    <dl>
      <dt>一文字</dt>
      <dd>
        <input v-model="form.oneText" maxlength="1" type="text" />
      </dd>
      <dd>※1文字だけ入力できます。</dd>
    </dl>
    <dl>
      <dt>賀詞</dt>
      <dd><input v-model="form.greeting" maxlength="15" type="text" /></dd>
      <dd>※15文字まで入力できます。</dd>
    </dl>
    <dl>
      <dt>添え文</dt>
      <dd><textarea v-model="form.message" cols="3" maxlength="100" /></dd>
      <dd>※100文字まで入力できます。</dd>
      <dd>※改行は使用できません。</dd>
    </dl>
    <dl>
      <dt>送り主</dt>
      <dd><input v-model="form.from" maxlength="10" type="text" /></dd>
      <dd>※10文字まで入力できます。</dd>
    </dl>

    <div class="c-newyear__url u-margin_top--40">
      <button @click="onCreateURL">URLを生成</button>
      <div class="c-newyear__url__copy">
        <input readonly type="text" :value="url" />
      </div>
      <BasicBalloon content="コピーしました" timming="click">
        <div class="u-d_flex">
          <img src="/commons/icons/copy.svg" alt="コピー" @click="onCopy" />
        </div>
      </BasicBalloon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import BasicBalloon from "@/components/atoms/BasicBalloon.vue";

const url = ref("");

const form = reactive({
  background: "none",
  year: 2024,
  from: undefined,
  greeting: undefined,
  message: undefined,
  isShowIllust: false,
  oneText: undefined,
});

const onCreateURL = () => {
  url.value = "";

  const temps: { [key: string]: string | undefined } = {};
  temps.background = form.background ? String(form.background) : "";
  temps.year = form.year ? String(form.year) : "";
  temps.from = form.from ?? "";
  temps.greeting = form.greeting ?? "";
  temps.message = form.message ?? "";
  temps.showIllust = form.isShowIllust ? "true" : "";
  temps.oneText = form.oneText ?? "";

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
  setTimeout(() => {
    url.value = encodeURI(
      import.meta.env.VITE_HOST + "/blessings/newyear?" + params.join("&")
    ).replace(/#/g, "%23");
  }, 100);
};
const onCopy = () => {
  navigator.clipboard.writeText(url.value);
};
</script>

<style scoped lang="scss">
textarea {
  resize: none;
  width: 40em;
  height: 4em;
  font-size: 16px;
  padding: 4px;
  font-family: sans-serif;
  line-height: 1;
}
input[type="checkbox"],
input[type="radio"] {
  cursor: pointer;
  + label {
    margin-left: 10px;
    cursor: pointer;
  }
}

input[type="text"],
input[type="number"] {
  font-size: 16px;
  width: 16em;
  padding: 2px;
  font-family: sans-serif;
}
dl + dl {
  margin-top: 20px;
}
dt,
dd {
  font-size: 20px;
}
dd + dd {
  font-size: 14px;
}
.c-newyear {
  padding-bottom: 40px;
  &__background {
    display: flex;
    gap: 0 10px;
  }
  &__url {
    display: flex;
    gap: 0 10px;
    align-items: center;
    button {
      width: 100px;
      height: 100%;
      cursor: pointer;
    }
    img {
      cursor: pointer;
    }
  }
}
.c-postcard {
  width: 100px;
  height: 150px;
  border: 1px black solid;
  padding: 10px;
  &--line {
    background: linear-gradient(
      135deg,
      red 5%,
      white 0 6%,
      red 0 7%,
      white 0 8%,
      red 0 9%,
      white 0
    );
  }
  &--circle {
    background: radial-gradient(circle at 5% 5%, red 0, red 10%, white 15%);
  }
}
</style>
