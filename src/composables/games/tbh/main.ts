import { Ref, ref } from "vue";
import { TBH_PAGES } from "@/composables/games/tbh/enums/page";
import { TBH_ENDINGS } from "@/composables/games/tbh/enums/ending";
import { TbhItem } from "@/composables/games/tbh/types/item";
import { TbhPlayer } from "@/composables/games/tbh/types/player";

export const useTbhMain = (
  TBH_ITEMS: { [key: string]: TbhItem },
  player: TbhPlayer
) => {
  let history = new Array<TBH_PAGES>();
  const endingType: Ref<TBH_ENDINGS | null> = ref(null);
  const addHistory = (page: TBH_PAGES) => {
    history.unshift(page);
    history = history.slice(0, 5);
  };

  const isShowEnding = () => {
    // プレイヤーの体力が0以下、正義度が100以上、直近4回の行動が全て同じの場合はエンディング表示を行う
    if (player.stamina <= 0) {
      return true;
    }
    if (player.justice >= 100) {
      return true;
    }
    const historyKindNum = new Set(history).size;
    console.log(historyKindNum);
    if (history.length >= 4 && historyKindNum == 1) {
      return true;
    }
    return false;
  };

  const judgeEndingType = (): TBH_ENDINGS | null => {
    // 体力が0った場合のエンディング
    if (player.stamina <= 0) {
      if (player.money <= 0) {
        return TBH_ENDINGS.BAD_END_01;
      }
      if (player.justice <= 0) {
        return TBH_ENDINGS.BAD_END_02;
      }
      if (player.status.power >= 100) {
        return TBH_ENDINGS.BAD_END_03;
      }
      if (player.items.length == Object.keys(TBH_ITEMS).length) {
        return TBH_ENDINGS.BAD_END_04;
      }
      return TBH_ENDINGS.BAD_END_00;
    }

    // 同じ行動を繰り返した時のエンディング
    const historyKindNum = new Set(history).size;
    if (history.length >= 4 && historyKindNum == 1) {
      switch (history[0]) {
        case TBH_PAGES.PATROL:
          return TBH_ENDINGS.TRUE_END_01;
        case TBH_PAGES.TRAINING:
          return TBH_ENDINGS.TRUE_END_02;
        case TBH_PAGES.WORK:
          return TBH_ENDINGS.TRUE_END_03;
        case TBH_PAGES.SHOP:
          return TBH_ENDINGS.TRUE_END_04;
        case TBH_PAGES.REST:
          return TBH_ENDINGS.TRUE_END_05;
      }
    }

    // 正義ステータスがカンストしたときのエンディング
    if (player.justice >= 100) {
      if (player.items.length != Object.keys(TBH_ITEMS).length) {
        return TBH_ENDINGS.HAPPY_END_01;
      } else {
        return TBH_ENDINGS.HAPPY_END_02;
      }
    }

    return null;
  };
  return {
    player,
    endingType,
    addHistory,
    isShowEnding,
    judgeEndingType,
  };
};
