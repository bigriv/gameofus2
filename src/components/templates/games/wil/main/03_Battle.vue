<template>
  <div class="c-battle">
    <div class="c-battle__background">
      <GOUVisualCanvas :objects="{ background: background }" />
    </div>
    <div class="c-battle__infomation">
      <div class="c-battle__infomation__turn">あなたのターン</div>
      <div class="c-battle__infomation__moveable">残り行動可能数 10</div>
    </div>
    <div class="c-battle__field">
      <Field
        :field="field"
        :selectedCells="selectedCells"
        @click="onClickField"
      />
    </div>

    <transition>
      <div
        v-show="timming == WIL_BATTLE_TIMMING.BATTLE_START"
        class="c-battle__start"
      >
        <div class="c-battle__start__text">開戦</div>
      </div>
    </transition>

    <UnderFrame
      v-model:timming="timming"
      v-model:selectedCharacter="selectedCharacter"
      :characters="props.characters"
      :skills="props.skills"
      :field="field"
      :playerCharacters="props.playerCharacters"
      @setCharacter="setCharacter"
      @removeCharacter="removeCharacter"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType, Ref, onMounted, ref } from "vue";
import GOUVisualCanvas from "@/components/molecules/GOUVisualCanvas.vue";
import Field from "@/components/templates/games/wil/main/battle/01_Field.vue";
import UnderFrame from "@/components/templates/games/wil/main/battle/02_UnderFrame.vue";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_BATTLE_TIMMING } from "@/composables/games/wil/enums/timming";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilField } from "@/composables/games/wil/types/field.ts";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";

const props = defineProps({
  playerCharacters: {
    type: Array<WilCharacter>,
    required: true,
  },
  characters: {
    type: Object as PropType<{ [key: string]: WilCharacter }>,
    required: true,
  },
  skills: {
    type: Object as PropType<{ [key: string]: WilSkill }>,
    required: true,
  },
});

const background: Ref<GOUVisual | undefined> = ref();
const timming = ref(WIL_BATTLE_TIMMING.SET_SELECT_CELL);
const field = ref(new WilField(10, 5, 1));
const selectedCells = ref([{ x: -1, y: -1 }]);
// const selectedSkill: Ref<WIL_SKILL_ID | null> = ref(null);
const cardStart = ref(0);
const playerCharacters: Ref<
  Array<{ character: WilCharacter; selected: boolean }>
> = ref([]);
const selectedCharacter: Ref<WIL_CHARACTER_ID | undefined> = ref();

onMounted(() => {
  field.value.changeColor(timming.value);
});
const onClickField = (x: number, y: number) => {
  console.log(timming.value);
  // キャラクター配置場所選択時
  if (
    timming.value === WIL_BATTLE_TIMMING.SET_SELECT_CELL ||
    timming.value === WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER
  ) {
    selectSetCell(x, y);
    return;
  }

  // 行動キャラクター選択時
  if (
    timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_CHARACTER ||
    timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL
  ) {
    selectedCharacter.value = field.value.getCell(x, y)?.character?.id;
    selectedCells.value[0] = { x: x, y: y };
    timming.value = WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE;
    return;
  }

  // 移動先マス選択時
  if (timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_MIGRATE_PLACE) {
    selectMovePlace(x, y);
    return;
  }

  // スキル発動対象選択時
  if (timming.value === WIL_BATTLE_TIMMING.BATTLE_SELECT_SKILL_TARGET) {
    selectSkillTarget(x, y);
    return;
  }
};
const startSet = () => {
  timming.value = WIL_BATTLE_TIMMING.SET_SELECT_CELL;
  selectedCells.value[0].x = -1;
  selectedCells.value[0].y = -1;
  cardStart.value = 0;
};
const selectSetCell = (x: number, y: number) => {
  if (!field.value.isSetableCahracter(x, y)) {
    alert("配置できません。");
    return;
  }
  timming.value = WIL_BATTLE_TIMMING.SET_SELECT_CHARACTER;
  selectedCells.value[0] = { x: x, y: y };
  return;
};
const setCharacter = (character: WilCharacter) => {
  if (selectedCells.value[0].x < 0 || selectedCells.value[0].y < 0) {
    alert("配置場所が選択されていません。");
    return;
  }

  const placedCharacter = field.value.getCell(
    selectedCells.value[0].x,
    selectedCells.value[0].y
  )?.character;

  if (placedCharacter) {
    const target = playerCharacters.value.find(
      (c) => c.character.id == placedCharacter.id
    );
    if (target) {
      target.selected = false;
    }
  } else {
    if (field.value.maxCharacter <= field.value.playerCharacter) {
      alert("これ以上配置できません。");
      return;
    }
  }

  field.value.setCharacter(
    selectedCells.value[0].x,
    selectedCells.value[0].y,
    character
  );

  const target = playerCharacters.value.find(
    (c) => c.character.id == character.id
  );
  if (target) {
    target.selected = true;
  }
  startSet();
};
const removeCharacter = () => {
  if (selectedCells.value[0].x < 0 || selectedCells.value[0].y < 0) {
    alert("配置場所が選択されていません。");
    return;
  }
  const character = field.value.getCell(
    selectedCells.value[0].x,
    selectedCells.value[0].y
  )?.character;

  if (character) {
    const target = playerCharacters.value.find(
      (c) => c.character.id == character.id
    );
    if (target) {
      target.selected = false;
    }
  }

  field.value.removeCharacter(
    selectedCells.value[0].x,
    selectedCells.value[0].y
  );
  timming.value = WIL_BATTLE_TIMMING.SET_SELECT_CELL;
  selectedCells.value[0].x = -1;
  selectedCells.value[0].y = -1;
};

const selectMovePlace = (x: number, y: number) => {
  if (!selectedCharacter.value) {
    alert("キャラクターが選択されていません。");
    return;
  }
  props.characters[selectedCharacter.value].migrateCell = field.value.getCell(
    x,
    y
  );
  timming.value = WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER;
};
const selectSkillTarget = (x: number, y: number) => {
  const target = field.value.getCell(x, y)?.character;
  if (!target) {
    alert("対象が存在しません。");
    return;
  }
  if (!selectedCharacter.value) {
    alert("キャラクターが選択されていません。");
    return;
  }
  timming.value = WIL_BATTLE_TIMMING.BATTLE_PROCESS_PLAYER_CHARACTER;
  props.characters[selectedCharacter.value].skillTarget = target;
};
</script>

<style scoped lang="scss">
.c-battle {
  position: relative;
  width: 100%;
  height: 100%;
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  &__infomation {
    position: absolute;
    width: 90%;
    top: 2%;
    left: 5%;
    background-color: rgba(0, 0, 0, 0.8);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
    display: flex;
    justify-content: space-between;
    padding: 2px 5px;
  }
  &__field {
    position: absolute;
    top: 15%;
    left: 5%;
    width: 90%;
    height: 50%;
  }
  &__start {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    height: 25%;
    transform: translateY(-50%);
    border-top: 2px solid white;
    border-bottom: 2px solid white;
    background: linear-gradient(blue, #0000aa);
    opacity: 1;
    &__text {
      font-size: 72px;
      font-family: "Yuji Mai";
      color: white;
      text-shadow: 5px 5px 5px black;
      transform: translateY(-10%);
    }
  }
}
.v-enter-active {
  transition: all 0.5s ease-out;
}
.v-leave-active {
  transition: all 0.5s ease-in;
}
.v-enter-from {
  top: 0;
  opacity: 0;
}
.v-leave-to {
  opacity: 0;
}
@media screen and (max-width: 400px) {
  .c-battle__infomation {
    font-size: 12px;
  }
}

@media screen and (max-width: 600px) and (min-width: 400px) {
  .c-battle__infomation {
    font-size: 14px;
  }
}
@media screen and (min-width: 600px) {
  .c-battle__infomation {
    font-size: 16px;
  }
}
</style>
