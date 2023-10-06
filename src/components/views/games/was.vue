<template>
  <div class="c-game">
    <Title
      v-if="display === 'title'"
      v-model="display"
      @start="onStart"
      @load="onLoad"
    />
    <Main
      v-else-if="display === 'main'"
      :loadData="loadData"
      @save="onSave"
      @loaded="onLoaded"
      @end="onEnd"
    />
    <Ending
      v-else-if="display === 'end'"
      :type="endingType"
      @back="onBackTitle"
    />
  </div>
  <div class="c-description">
    <div class="c-description__block">
      <h2>リリースノート</h2>
      <p>2023/10/05 ver 1.0 リリース</p>
    </div>

    <div class="c-description__block">
      <h2>あらすじ</h2>
      <p>
        勇者と魔王の決戦となる戦争に徴兵を受けた主人公。<br />
        魔王討伐後の帰路にて、人間に殺されそうな淑女を身を挺して救う。<br />
        主人公の助けた淑女は姿こそ人間に近いが、討伐された魔王の娘であった。<br />
        魔王の娘は魔族と知らずに自分を助けた主人公を不憫に思い、死にかけの主人公に魔力を分け与える。<br />
        生き長らえた主人公は魔王の娘から半ば強引に新たな魔王になるように頼まれる。<br />
        <br />
        魔王の力とは統率の力。魔族を従えることでその力を得ることができる。<br />
        魔王としての力をつけるために様々な魔族と関わっていく主人公。<br />
        旅の中で、主人公は魔族にも善良な心があることと、平和を手にしたはずの人間たち、特に勇者が意味もなく魔族を狩り続けていることを知っていく。<br />
        <br />
        意味もなく魔族を討伐する勇者への不信感と、従えた魔族たちを守りたいという思いを胸に主人公は魔王を目指す。<br />
      </p>
    </div>

    <div class="c-description__block">
      <h2>説明</h2>
      <p>操作方法はクリックのみです。</p>
      <p>セーブは魔王城に帰ったタイミングで自動的に行われます。</p>
      <p>体力か満腹度が0になるとゲームオーバーになります。</p>
      <p>各エリアをクリアした後、魔王城に帰ると一度だけ全回復できます。</p>
      <p>エンディングは全4種類です。</p>
    </div>

    <div class="c-description__block">
      <h2>推定プレイ時間</h2>
      <p>30分</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "@/components/templates/games/was/01_Title.vue";
import Main from "@/components/templates/games/was/02_Main.vue";
import Ending from "@/components/templates/games/was/03_Ending.vue";
import { WAS_ENDING, WAS_EVENT_TIMMING } from "@/composables/games/was/const";
import { WasPlayerCharacter } from "@/composables/games/was/types/playerCharacter";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasArea } from "@/composables/games/was/types/area";

const display = ref("title");
const endingType = ref();
const loadData = ref();

const onSave = (
  timming: WAS_EVENT_TIMMING,
  healed: boolean,
  player: WasPlayerCharacter,
  characters: { [key: string]: WasNonPlayerCharacter },
  bosses: { [key: string]: WasNonPlayerCharacter },
  areas: { [key: string]: WasArea }
) => {
  const data = {
    timming: timming,
    healed: healed,
    player: player.toJson(),
    characters: {
      CAVE: characters.CAVE.toJson(),
      SEA: characters.SEA.toJson(),
      VILLAGE: characters.VILLAGE.toJson(),
      MOUNTAIN: characters.MOUNTAIN.toJson(),
      KINGDOM_CASTLE: characters.KINGDOM_CASTLE.toJson(),
    },
    bosses: {
      CAVE: bosses.CAVE.toJson(),
      SEA: bosses.SEA.toJson(),
      VILLAGE: bosses.VILLAGE.toJson(),
      MOUNTAIN: bosses.MOUNTAIN.toJson(),
      KINGDOM_CASTLE: bosses.KINGDOM_CASTLE.toJson(),
    },
    areas: {
      CAVE: areas.CAVE.toJson(),
      SEA: areas.SEA.toJson(),
      VILLAGE: areas.VILLAGE.toJson(),
      MOUNTAIN: areas.MOUNTAIN.toJson(),
      KINGDOM_CASTLE: areas.KINGDOM_CASTLE.toJson(),
    },
  };
  console.log("save", data);
  localStorage.setItem("wasSave", JSON.stringify(data));
};
const load = () => {
  const strData = localStorage.getItem("wasSave");
  if (!strData) {
    return;
  }
  loadData.value = JSON.parse(strData);
};

const onStart = () => {
  display.value = "main";
};
const onLoad = () => {
  load();
  display.value = "main";
};
const onLoaded = () => {
  loadData.value = undefined
}
const onEnd = (type: WAS_ENDING) => {
  console.log(type);
  endingType.value = type;
  display.value = "end";
};
const onBackTitle = () => {
  display.value = "title";
};
</script>

<style scoped lang="scss">
.c-game {
  border-style: outset;
  box-sizing: content-box;
  border-width: 6rem;
  border-color: black;
}
.c-description {
  padding-bottom: 20rem;
  h2 {
    margin-top: 1em;
  }
  p {
    font-size: 14rem;
    line-height: 1.1
  }
}
@media screen and (max-width: 600px) {
  .c-game {
    width: max(100vw, 350px);
    height: max(100vw, 350px);
    margin: auto;
  }
  .c-description {
    width: max(100vw, 350px);
    margin: auto;
    text-align: left;
  }
}
@media screen and (min-width: 600px) {
  .c-game {
    width: 600px;
    height: 600px;
    margin: auto;
  }
  .c-description {
    width: 600rem;
    margin: auto;
    text-align: left;
  }
}
</style>
