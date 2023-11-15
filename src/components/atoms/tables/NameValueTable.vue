<template>
  <div class="c-name_value_table" :style="styles">
    <dl v-for="data of props.dataList">
      <dt>{{ data.name }}</dt>
      <dd>{{ data.value }}</dd>
    </dl>
  </div>
</template>

<script setup lang="ts">
import { GOUColor } from "@/composables/types/GOUColor";

const props = defineProps({
  // 文字色
  fontColor: {
    type: String,
    default: "black",
  },
  // 背景色（未指定で透明）
  backgroundColor: {
    type: GOUColor,
    default: undefined,
  },
  // 枠線の色（未指定で透明）
  borderColor: {
    type: GOUColor,
    default: undefined,
  },
  //   テーブルとして表示するデータのリスト
  dataList: {
    type: Array<{ name: string; value: string }>,
    default: () => [],
  },
});

const styles = {
  "--backgroundColor": props.backgroundColor?.rgba(),
  "--borderColor": props.borderColor?.rgba(),
  "--fontColor": props.fontColor,
};
</script>

<style scoped lang="scss">
.c-name_value_table {
  width: 100%;
  height: 100%;
  border: 2px solid var(--borderColor);
  background-color: var(--backgroundColor);
  color: var(--fontColor);
  padding: 5%;
  font-size: 100%;
  dl {
    width: 100%;
    height: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    + dl {
      margin-top: 2%;
    }
  }
}
</style>
