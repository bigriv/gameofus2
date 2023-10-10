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
      <p>2023/10/07 ver 1.01 操作性改善</p>
      <p>2023/10/05 ver 1.00 リリース</p>
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
      <p>満腹度は探索するかスキルを使用すると消費されます。</p>
      <p>
        スキルを使用する際、満腹度が必要なコストを下回っていると通常の攻撃として扱われます。
      </p>
      <p>各エリアをクリアした後、魔王城に帰ると一度だけ全回復できます。</p>
      <p>エンディングは全4種類です。</p>
    </div>

    <div class="c-description__block">
      <h2>推定プレイ時間</h2>
      <p>30分</p>
    </div>

    <div class="c-description__block">
      <h2>攻略のヒント</h2>
      <h3>①アイテム一覧</h3>
      <a v-show="!isShowHint1" @click.prevent.stop="isShowHint1 = true"
        >表示する</a
      >
      <table v-show="isShowHint1">
        <tr>
          <th>アイテム名</th>
          <th>所持可能数</th>
          <th>効果</th>
        </tr>
        <tr v-for="item in itemDescription">
          <td>{{ item.name }}</td>
          <td>{{ item.maxAmount }}</td>
          <td>{{ item.effect }}</td>
        </tr>
      </table>

      <h3 class="u-margin_top--10">②スキル一覧</h3>
      <a v-show="!isShowHint2" @click.prevent.stop="isShowHint2 = true"
        >表示する</a
      >
      <table v-show="isShowHint2">
        <tr>
          <th>スキル名</th>
          <th>効果</th>
          <th>取得条件</th>
        </tr>
        <tr v-for="skill in skillDescription">
          <td>{{ skill.name }}</td>
          <td>{{ skill.effect }}</td>
          <td>{{ skill.get }}</td>
        </tr>
      </table>
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
const isShowHint1 = ref(false);
const isShowHint2 = ref(false);

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
  loadData.value = undefined;
};
const onEnd = (type: WAS_ENDING) => {
  console.log(type);
  endingType.value = type;
  display.value = "end";
};
const onBackTitle = () => {
  display.value = "title";
};

const itemDescription = [
  { name: "魔王の魂", maxAmount: 1, effect: "なし" },
  { name: "薬草", maxAmount: 5, effect: "体力を回復" },
  { name: "超薬草", maxAmount: 3, effect: "体力を回復" },
  { name: "おにぎり", maxAmount: 5, effect: "満腹度を回復" },
  { name: "焼き魚", maxAmount: 5, effect: "体力&満腹度を回復" },
  { name: "骨付き肉", maxAmount: 5, effect: "体力&満腹度を回復" },
  { name: "聖水", maxAmount: 3, effect: "体力&満腹度を全回復" },
  { name: "力の腕輪", maxAmount: 1, effect: "攻撃力を微上昇" },
  { name: "ウィングブーツ", maxAmount: 1, effect: "素早さを微上昇" },
  { name: "不思議な貝殻", maxAmount: 1, effect: "魔力を微上昇" },
  { name: "ドラゴンの鱗", maxAmount: 1, effect: "防御力を微上昇" },
  { name: "ボスゴブリンの首", maxAmount: 1, effect: "全ステータス微アップ" },
  { name: "ダークエルフの眼", maxAmount: 1, effect: "全ステータス微アップ" },
  { name: "クラーケンの触手", maxAmount: 1, effect: "全ステータス微アップ" },
  { name: "ドラゴンの翼", maxAmount: 1, effect: "全ステータス微アップ" },
];

const skillDescription = [
  { name: "ヒール", effect: "体力を回復", get: "習得不可" },
  { name: "ハイヒール", effect: "体力を回復", get: "兵士説得" },
  { name: "力任せ", effect: "高火力で攻撃", get: "ゴブリン説得" },
  {
    name: "疾風剣",
    effect: "素早さを上昇して攻撃(使用ターンのみ)",
    get: "サハギン説得",
  },
  {
    name: "ガードアタック",
    effect: "防御力を上昇して攻撃(使用ターンのみ)",
    get: " スライム説得",
  },
  { name: "暗黒剣", effect: "超高火力の闇属性攻撃", get: "ダークエルフ説得" },
  {
    name: "メラメラ",
    effect: "稀に攻撃力を減少させる炎属性攻撃",
    get: "ドラゴン説得",
  },
  {
    name: "ぶるぶる",
    effect: "稀に魔力を減少させる水属性攻撃",
    get: "クラーケン説得",
  },
  {
    name: "ガチガチ",
    effect: "稀に防御力を減少させる地属性攻撃",
    get: "ボスゴブリン説得",
  },
  {
    name: "ひゅーひゅー",
    effect: "稀に素早さを減少させる風属性攻撃",
    get: "エルフ説得",
  },
  {
    name: "ビリビリ",
    effect: "稀に攻撃力&防御力を減少させる雷属性攻撃",
    get: "習得不可",
  },
  { name: "正義覚醒", effect: "全ステータスを微上昇", get: "習得不可" },
  { name: "正義の鉄槌", effect: "超高火力の光属性攻撃", get: "習得不可" },
];
</script>

<style scoped lang="scss">
.c-game {
  border-style: outset;
  box-sizing: content-box;
  border-color: black;
  margin: auto;
  border-width: 6px;
}
.c-description {
  padding-bottom: 20px;
  margin: auto;
  text-align: left;
  h2 {
    margin-top: 1em;
  }
  p {
    font-size: 14px;
    line-height: 1.1;
  }
  table {
    font-size: 14px;
    line-height: 1.1;
    th,
    td {
      border: 1px black solid;
      padding: 4px;
    }
  }
  a {
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 350px) {
  .c-game {
    width: 350px;
    height: 350px;
  }
  .c-description {
    width: 350px;
  }
}
@media screen and (max-width: 600px) and (min-width: 350px) {
  .c-game {
    width: 100vw;
    height: 100vw;
  }
  .c-description {
    width: 100vw;
  }
}
@media screen and (min-width: 600px) {
  .c-game {
    width: 600px;
    height: 600px;
  }
  .c-description {
    width: 600px;
  }
}
</style>
