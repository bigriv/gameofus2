import { WAS_AREA_ID, WAS_EVENT_TIMMING } from "@/composables/games/was/const";
import { useWasInit } from "@/composables/games/was/init";

export const useWasMain = (loadData: any, emits: Function) => {
  const {
    isLoadedImages,
    loadFile,
    loadSaveData,
    PRINCESS,
    CHARACTERS,
    BOSSES,
    ITEMS,
    SKILLS,
    map,
    state,
  } = useWasInit(loadData);

  /**
   * イベントのタイミングを更新する
   */
  const updateTimming = () => {
    const currentTimming = state.timming;

    // 攻略したエリアによってタイミングを変える
    switch (state.player.currentArea) {
      case WAS_AREA_ID.SATAN_CASTLE:
        // ラスダン以外の全てのエリアを攻略済みの場合はラスダン攻略前にイベントタイミングを更新する
        if (
          map.areas.CAVE.isClear &&
          map.areas.SEA.isClear &&
          map.areas.VILLAGE.isClear &&
          map.areas.MOUNTAIN.isClear &&
          !map.areas.KINGDOM_CASTLE.isClear
        ) {
          state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA;
        }
        break;
      case WAS_AREA_ID.CAVE:
        state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE;
        break;
      case WAS_AREA_ID.SEA:
        state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_SEA;
        break;
      case WAS_AREA_ID.VILLAGE:
        state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_VILLAGE;
        break;
      case WAS_AREA_ID.MOUNTAIN:
        state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_MOUNTAIN;
        break;
      case WAS_AREA_ID.KINGDOM_CASTLE:
        state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE;
        break;
    }

    return state.timming !== currentTimming;
  };

  /**
   * セーブ処理を行う
   */
  const save = () => {
    emits(
      "save",
      state.timming,
      state.player.healed,
      state.player,
      CHARACTERS,
      BOSSES,
      map.areas
    );
  };

  return {
    isLoadedImages,
    loadFile,
    loadSaveData,
    PRINCESS,
    CHARACTERS,
    BOSSES,
    ITEMS,
    SKILLS,
    map,
    player: state.player,
    eventTimming: state.timming,
    updateTimming,
    save,
  };
};
