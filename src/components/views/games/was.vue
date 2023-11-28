<template>
  <GameFrame>
    <template #window>
      <Title
        v-if="overallTimming === WAS_OVERALL_TIMMING.TITLE"
        v-model="overallTimming"
        @start="onStart"
        @load="onLoad"
      />
      <div
        v-else-if="overallTimming === WAS_OVERALL_TIMMING.LOADING"
        class="c-game__loading"
      >
        Now Loading...
      </div>
      <Ending
        v-else-if="overallTimming === WAS_OVERALL_TIMMING.ENDING"
        :type="endingType"
        @back="onBackTitle"
      />
      <Main
        v-if="
          overallTimming == WAS_OVERALL_TIMMING.LOADING ||
          overallTimming === WAS_OVERALL_TIMMING.MAIN_AREA ||
          overallTimming === WAS_OVERALL_TIMMING.MAIN_MAP
        "
        v-model:overallTimming="overallTimming"
        :loadData="loadData"
        @save="onSave"
        @loaded="onLoaded"
        @end="onEnd"
      />
    </template>
    <template #description>
      <div class="c-game__description__block">
        <h2>リリースノート</h2>
        <p>2023/11/13 ver 1.03 文字フォント変更、スマホ操作性改善</p>
        <p>2023/10/11 ver 1.02 スマホ対応</p>
        <p>2023/10/07 ver 1.01 操作性改善</p>
        <p>2023/10/05 ver 1.00 リリース</p>
      </div>

      <div class="c-game__description__block">
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

      <div class="c-game__description__block">
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

      <div class="c-game__description__block">
        <h2>推定プレイ時間</h2>
        <p>30分</p>
      </div>

      <div class="c-game__description__block">
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
    </template>
  </GameFrame>
</template>

<script setup lang="ts">
import { ref } from "vue";
import GameFrame from "@/components/atoms/frames/GameFrame.vue";
import Title from "@/components/templates/games/was/01_Title.vue";
import Main from "@/components/templates/games/was/02_Main.vue";
import Ending from "@/components/templates/games/was/03_Ending.vue";
import { WAS_ENDING } from "@/composables/games/was/const";
import { WasPlayer } from "@/composables/games/was/types/player";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasArea } from "@/composables/games/was/types/area";
import { WAS_EVENT_TIMMING, WAS_OVERALL_TIMMING } from "@/composables/games/was/enums/timming";

const overallTimming = ref(WAS_OVERALL_TIMMING.TITLE);
const endingType = ref();
const loadData = ref();
const isShowHint1 = ref(false);
const isShowHint2 = ref(false);

const onSave = (
  timming: WAS_EVENT_TIMMING,
  healed: boolean,
  player: WasPlayer,
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
  overallTimming.value = WAS_OVERALL_TIMMING.LOADING;
};
const onLoad = () => {
  load();
  overallTimming.value = WAS_OVERALL_TIMMING.LOADING;
};
const onLoaded = () => {
  loadData.value = undefined;
};
const onEnd = (type: WAS_ENDING) => {
  console.log(type);
  endingType.value = type;
  overallTimming.value = WAS_OVERALL_TIMMING.ENDING;
};
const onBackTitle = () => {
  overallTimming.value = WAS_OVERALL_TIMMING.TITLE;
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
.c-game__loading {
  background-color: black;
  width: 100%;
  height: 100%;
  color: white;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
