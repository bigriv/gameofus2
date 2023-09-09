<template>
  <div class="u-d_flex">
    <div class="c-canvas"></div>
    <div>
      <div class="c-tabs">
        <template v-for="(tab, i) in tabs" :key="i">
          <input
            :id="`tab__${tab.value}`"
            v-model="selectedTab"
            type="radio"
            :value="tab.value"
            name="tab"
            :checked="i == 0"
          />
          <label :for="`tab__${tab.value}`" class="u-clickable c-tabs__label">
            {{ tab.label }}
          </label>
        </template>
      </div>
      <div v-show="selectedTab == 'canvas'">
        <div>画面比率</div>
        <select v-model="ratio" class="u-clickable">
          <option
            v-for="ratioOption in ratioOptions"
            :value="ratioOption.value"
          >
            {{ ratioOption.label }}
          </option>
        </select>
      </div>
      <div v-show="selectedTab == 'diagram'">
        <div>図形タイプ</div>
        <select v-model="diagramType" class="u-clickable">
          <option
            v-for="diagramTypeOption in diagramTypeOptions"
            :value="diagramTypeOption.value"
          >
            {{ diagramTypeOption.label }}
          </option>
        </select>
        <div>色</div>
        <input type="color" />
      </div>
      <div v-show="selectedTab == 'hierarchy'"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GOUDiagramType } from "@/composables/types/diagrams/GOUDiagramDefinition";

const tabs = [
  { value: "canvas", label: "キャンバス" },
  { value: "diagram", label: "図形" },
  { value: "hierarchy", label: "階層" },
];
const ratioOptions = [
  { value: 1, label: "1:1" },
  { value: 2, label: "1:2" },
  { value: 3, label: "2:1" },
];
const diagramTypeOptions = [
  { value: GOUDiagramType.CIERCLE, label: "円" },
  { value: GOUDiagramType.RECT, label: "矩形" },
  { value: GOUDiagramType.POLYGON, label: "多角形" },
  { value: GOUDiagramType.LINE, label: "線" },
];
const selectedTab = ref(tabs[0].value);
const ratio = ref(ratioOptions[0].value);
const diagramType = ref(diagramTypeOptions[0].value);
</script>
<style scoped lang="scss">
.c-canvas {
  width: 600rem;
  height: 600rem;
  border: 1rem solid black;
}
.c-tabs {
  display: flex;
  &__label {
    font-size: 14rem;
    width: 100rem;
    height: 30rem;
    padding: 5rem;
    border: 1rem solid #aaa;
    display: block;
    user-select: none;
  }
  input[type="radio"] {
    appearance: none;
  }
  input[type="radio"]:checked + label {
    background: linear-gradient(#aec9e8, #91b9e4);
  }
}
</style>
@/composables/types/shape/diagrams/GOUDiagramDefinition