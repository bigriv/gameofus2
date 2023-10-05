import {
  WAS_AREA_ID,
  WAS_BATTLE_MOVE,
  WAS_BATTLE_STATUS,
  WAS_BUTTON_EVENT,
  WAS_ENDING,
  WAS_EVENT_TIMMING,
  WAS_ITEM_ID,
} from "@/composables/games/was/const";
import { useWasButton } from "@/composables/games/was/buttons";
import WAS_SERIF_DEFINE from "@/composables/games/was/defines/serif";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { useWasInit } from "@/composables/games/was/init";
import { useWasDispay } from "@/composables/games/was/display";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { useWasBattle } from "@/composables/games/was/battle";
import { WasCharacter } from "@/composables/games/was/types/character";

export const useWasMain = (loadData: any, emits: Function) => {
  const { PRINCESS, CHARACTERS, BOSSES, MAP, AREAS, ITEMS, SKILLS, state } =
    useWasInit(loadData);

  const {
    layer,
    displayMessage,
    onClickMessageFrame,
    buttonList,
    isShowStatusBar,
    chainMessage,
    chainEvent,
  } = useWasDispay();

  const {
    EXLPORE_BUTTON_LIST,
    EXPLORE_ITEM_BUTTON_LIST,
    FACE_BUTTON_DEFINE_LIST,
    PERSUADE_BUTTON_LIST,
    BATTLE_BUTTON_LIST,
    SKILL_BUTTON_LIST,
    BATTLE_ITEM_BUTTON_LIST,
  } = useWasButton(state.player, ITEMS, SKILLS);

  const { battle } = useWasBattle(ITEMS, SKILLS);

  const isUnified = () => {
    const bossWithoutLast = [
      BOSSES.CAVE,
      BOSSES.SEA,
      BOSSES.VILLAGE,
      BOSSES.MOUNTAIN,
    ];
    const persuadeCount = bossWithoutLast.filter(
      (boss) => boss.isPersuaded
    ).length;
    // 1体以外のボスを説得済みの場合は統率されているとする
    return persuadeCount >= bossWithoutLast.length - 1;
  };

  const updateTimming = (area: WAS_AREA_ID) => {
    const currentTimming = state.timming;

    // 攻略したエリアによってタイミングを変える
    switch (area) {
      case WAS_AREA_ID.SATAN_CASTLE:
        // ラスダン以外の全てのエリアを攻略済みの場合はラスダン攻略前にイベントタイミングを更新する
        if (
          AREAS.CAVE.isClear &&
          AREAS.SEA.isClear &&
          AREAS.VILLAGE.isClear &&
          AREAS.MOUNTAIN.isClear &&
          !AREAS.KINGDOM_CASTLE.isClear
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

  const clearArea = (area: WAS_AREA_ID) => {
    AREAS[area].isClear = true;
    // クリアした場合は回復可能にする
    state.healed = false;
    // イベントタイミングの更新も行う
    updateTimming(area);
  };

  const onClickButton = (id: WAS_BUTTON_EVENT, args: any) => {
    if (id !== WAS_BUTTON_EVENT.NONE) {
      // 何も起こさない場合以外は表示をリセットする
      buttonList.value = [];
      isShowStatusBar.value = false;
    }

    switch (id) {
      case WAS_BUTTON_EVENT.EXPLORE:
        if (!state.area) {
          throw new WrongImplementationError("Area is not set.");
        }
        const exploreResult = state.player.explore(AREAS[state.area]);
        if (!exploreResult) {
          // 探索失敗
          chainMessage(["何もみつからない...。"], () => showArea(state.area));
        } else if (exploreResult instanceof WasCharacter) {
          // キャラクター遭遇
          state.character = exploreResult;
          showCharacterInArea();
        } else if (Object.values(WAS_ITEM_ID).includes(exploreResult)) {
          // アイテム発見
          const item = ITEMS[exploreResult];
          const addItemResult = state.player.addItem(item);
          let messages = [`${item.name}をみつけた！`];
          if (!addItemResult) {
            messages.push(`しかし、これ以上${item.name}を持てない...。`);
          }
          chainMessage(messages, () => showArea(state.area));
        }
        return;
      case WAS_BUTTON_EVENT.EXPLORE_ITEM:
        buttonList.value = EXPLORE_ITEM_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.USE_EXPLORE_ITEM:
        const item = ITEMS[args];
        if (!item) {
          throw new WrongImplementationError("Not exsist item is selected.");
        }
        if (!(item.effect instanceof Function)) {
          chainMessage([`${item.name}は今使っても意味がない。`], () =>
            showArea(state.area)
          );
          return;
        }

        const useResult = state.player.useItem(args);
        if (!useResult) {
          chainMessage([`${item.name}を持っていない。`], () =>
            showArea(state.area)
          );
          return;
        }

        const useItemMessages = [];
        useItemMessages.push(`${state.player.name}は${item.name}を使用した！`);

        const result = item.effect(state.player, state.player);
        // 結果詰め込み処理
        if (useItemMessages) {
          useItemMessages.push(result);
        }
        chainMessage(useItemMessages, () => showArea(state.area));
        return;
      case WAS_BUTTON_EVENT.BACK_TO_EXPLORE:
        showArea(state.area);
        return;
      case WAS_BUTTON_EVENT.PERSUADE:
        buttonList.value = PERSUADE_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.USE_PERSUADE_ITEM:
        const area = state.area as WAS_AREA_ID;
        const character = state.character as WasNonPlayerCharacter;
        if (character.persuadItem !== args) {
          chainMessage(["なにそれ"], showFace);
          return;
        }
        character.isPersuaded = true;
        if (character.isBoss) {
          // ボス説得時はエリアをクリア状態にしてイベントタイミングを更新する
          clearArea(area);
        }

        let persuadSuccessMessages = [...character.serif.PERSUADE_SUCCESS];
        if (character.occupySkill) {
          let occupySkill = SKILLS[character.occupySkill];
          state.player.skills.push(character.occupySkill);
          persuadSuccessMessages.push(`${occupySkill.name}を習得した！`);
        }

        chainMessage(persuadSuccessMessages, () => showArea(area));
        return;
      case WAS_BUTTON_EVENT.BATTLE:
        showBattle();
        return;
      case WAS_BUTTON_EVENT.BACK_TO_FACE:
        showFace();
        return;
      case WAS_BUTTON_EVENT.BACK_TO_MAP:
        showMap();
        return;
      case WAS_BUTTON_EVENT.BACK_TO_BATTLE:
        buttonList.value = BATTLE_BUTTON_LIST;
        isShowStatusBar.value = true;
        return;
      case WAS_BUTTON_EVENT.NONE:
        return;
      case WAS_BUTTON_EVENT.ATTACK:
        if (!state.character) {
          throw new WrongImplementationError("Character is not set.");
        }
        state.player.setBattleMove(state.player, state.character, {
          type: WAS_BATTLE_MOVE.ATTACK,
        });
        break;
      case WAS_BUTTON_EVENT.SKILL:
        buttonList.value = SKILL_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.ACTIVATE_SKILL:
        if (!state.character) {
          throw new WrongImplementationError("Character is not set.");
        }
        state.player.setBattleMove(state.player, state.character, {
          type: WAS_BATTLE_MOVE.SKILL,
          skill: SKILLS[args],
        });
        break;
      case WAS_BUTTON_EVENT.BATTLE_ITEM:
        buttonList.value = BATTLE_ITEM_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.USE_BATTLE_ITEM:
        if (!state.character) {
          throw new WrongImplementationError("Character is not set.");
        }
        state.player.setBattleMove(state.player, state.character, {
          type: WAS_BATTLE_MOVE.ITEM,
          item: ITEMS[args],
        });
        break;
    }

    if (
      ![
        WAS_BUTTON_EVENT.ATTACK,
        WAS_BUTTON_EVENT.ACTIVATE_SKILL,
        WAS_BUTTON_EVENT.USE_BATTLE_ITEM,
      ].includes(id)
    ) {
      return;
    }

    if (state.character == PRINCESS) {
      throw new WrongImplementationError(
        "Character is princess, but she can not fight."
      );
    }
    const character = state.character as WasNonPlayerCharacter;
    // 敵の行動を設定
    character.setBattleMove(character, state.player);
    const result = battle(state.player, character);
    let afterFunction = showBattle;
    if (result.status == WAS_BATTLE_STATUS.WIN) {
      // 勝利時の処理
      afterFunction = () => {
        let afterMessages = [];
        const area = state.area as WAS_AREA_ID;
        if (
          character.isBoss &&
          !character.persuadItem &&
          CHARACTERS[area].isPersuaded
        ) {
          // ボスで説得アイテムが未設定で雑魚キャラが説得済みの場合は説得成功として処理する
          character.isPersuaded = true;
          afterMessages = [...character.serif.PERSUADE_SUCCESS];
          if (character.occupySkill) {
            const occupySkill = SKILLS[character.occupySkill];
            state.player.skills.push(character.occupySkill);
            afterMessages.push(`${occupySkill.name}を習得した！`);
          }
        } else {
          afterMessages = [...character.serif.BATTLE_WIN];
          if (character.dropItem) {
            const dropItem = ITEMS[character.dropItem];
            const addResult = state.player.addItem(dropItem);
            if (addResult) {
              afterMessages.push(`${dropItem.name}を手に入れた！`);
            }
          }
        }

        if (character.isBoss) {
          // ボス戦勝利時はエリアをクリア状態にしてイベントタイミングを更新する
          clearArea(area);
        }

        let afterFunction = () => showArea(area);
        // 王国クリア時はエンディングに遷移する
        if (AREAS.KINGDOM_CASTLE.isClear) {
          afterFunction = showAreaSatanCasle;
        }
        chainMessage(afterMessages, afterFunction);
      };
    } else if (result.status == WAS_BATTLE_STATUS.LOSE) {
      // 敗北時の処理
      afterFunction = () => showEnd(WAS_ENDING.DEAD);
    }

    chainEvent(result.progresses, afterFunction);
  };

  const showAreaSatanCasle = () => {
    layer.background = [AREAS.SATAN_CASTLE.inside];
    if (!PRINCESS.visual) {
      throw new WrongImplementationError("Princess visual is not initialized.");
    }
    layer.objects = [PRINCESS.visual];
    let messages = new Array<string>();
    let afterFunction = showMap;
    switch (state.timming) {
      case WAS_EVENT_TIMMING.OPENING:
        messages = WAS_SERIF_DEFINE.PRINCESS_OPENING;
        state.timming = WAS_EVENT_TIMMING.AFTER_OPENING1;
        break;
      case WAS_EVENT_TIMMING.AFTER_OPENING1:
        messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_OPENING1;
        state.player.addItem(ITEMS[WAS_ITEM_ID.SATAN_SOUL]);
        state.timming = WAS_EVENT_TIMMING.AFTER_OPENING2;
        afterFunction = () => showArea(WAS_AREA_ID.SATAN_CASTLE);
        break;
      case WAS_EVENT_TIMMING.AFTER_OPENING2:
        messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_OPENING2;
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE:
        if (BOSSES.CAVE.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE:
        if (BOSSES.CAVE.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_SEA:
        if (BOSSES.SEA.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_SEA1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_SEA2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_VILLAGE:
        if (BOSSES.VILLAGE.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_VILLAGE1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_VILLAGE2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_MOUNTAIN:
        if (BOSSES.MOUNTAIN.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_MOUNTAIN1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_MOUNTAIN2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA:
        if (isUnified()) {
          messages = WAS_SERIF_DEFINE.PRINCESS_BEFORE_LAST_AREA1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_BEFORE_LAST_AREA2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE:
        // 種族の統一ができていなければワーストエンド
        let endType = WAS_ENDING.WORST;
        messages = WAS_SERIF_DEFINE.PRINCESS_WORST_END;
        if (BOSSES.KINGDOM_CASTLE.isPersuaded) {
          // 勇者が説得済みの場合はグッドエンド
          endType = WAS_ENDING.GOOD;
          messages = WAS_SERIF_DEFINE.PRINCESS_GOOD_END;
        } else if (isUnified()) {
          if (CHARACTERS.KINGDOM_CASTLE.isPersuaded) {
            // 説得で攻略したボスがエリア数 - 1以上で兵士を説得済みならベストエンド
            endType = WAS_ENDING.BEST;
            messages = WAS_SERIF_DEFINE.PRINCESS_BEST_END;
          } else {
            // 説得で攻略したボスがエリア数 - 1以上で兵士を説得していなけばバッドエンド
            endType = WAS_ENDING.BAD;
            messages = WAS_SERIF_DEFINE.PRINCESS_BAD_END;
          }
        }
        afterFunction = () => showEnd(endType);
        break;
    }

    if (
      updateTimming(WAS_AREA_ID.SATAN_CASTLE) &&
      state.timming === WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA
    ) {
      // イベントタイミングが全エリアクリア後に変わった場合は姫の会話を続ける
      chainMessage([...messages], showAreaSatanCasle);
      return;
    }

    if (
      state.timming >= WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE &&
      state.timming < WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE &&
      !state.healed
    ) {
      state.player.riseStatus();
      state.player.status.life = state.player.defaultStatus.life;
      state.player.status.satiety = state.player.defaultStatus.satiety;
      state.healed = true;
      messages.push(...WAS_SERIF_DEFINE.PRINCESS_HEAL);
    }

    chainMessage([...messages], afterFunction);

    // 魔王城に帰還したタイミングでオートセーブを行う
    save();
  };

  // マップの表示
  const showMap = () => {
    if (state.player.status.satiety <= 0) {
      // 満腹度が0以下の場合はGame Overとする
      showEnd(WAS_ENDING.HUNGER);
      return;
    }
    layer.background = [MAP];

    // 進行状況によって表示するエリアを制御
    if (state.timming < WAS_EVENT_TIMMING.AFTER_OPENING2) {
      layer.objects = [AREAS.SATAN_CASTLE.outside];
    } else if (state.timming < WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE) {
      layer.objects = [AREAS.SATAN_CASTLE.outside, AREAS.CAVE.outside];
    } else if (state.timming < WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA) {
      layer.objects = [
        AREAS.SATAN_CASTLE.outside,
        AREAS.CAVE.outside,
        AREAS.SEA.outside,
        AREAS.VILLAGE.outside,
        AREAS.MOUNTAIN.outside,
      ];
    } else {
      layer.objects = [
        AREAS.SATAN_CASTLE.outside,
        AREAS.CAVE.outside,
        AREAS.SEA.outside,
        AREAS.VILLAGE.outside,
        AREAS.MOUNTAIN.outside,
        AREAS.KINGDOM_CASTLE.outside,
      ];
    }
  };

  // エリアの表示
  const showArea = (argArea: WAS_AREA_ID | null) => {
    if (!argArea) {
      throw new WrongImplementationError("Area is not set.");
    }
    state.area = argArea;
    if (state.area == WAS_AREA_ID.SATAN_CASTLE) {
      // 魔王城の場合は特殊処理
      showAreaSatanCasle();
      return;
    }
    layer.background = [AREAS[state.area].inside];
    layer.objects = [];
    displayMessage.value = [];
    buttonList.value = EXLPORE_BUTTON_LIST;
    isShowStatusBar.value = true;
  };

  // エリアとキャラクターの表示
  const showCharacterInArea = () => {
    let messages = [];
    const character = state.character as WasNonPlayerCharacter;
    if (character.visual) {
      layer.objects = [character.visual];
    }
    if (!character.isPersuaded) {
      messages.push(`${character.name}が現れた。`);
    }

    let afterFunction = () => {};

    const serif = character.serif;
    if (!state.area) {
      throw new WrongImplementationError("Area is not set.");
    }
    if (character.isBoss) {
      if (BOSSES[state.area].isPersuaded) {
        // ボス敵を説得済みの場合
        messages.push(...(serif.CHAT ?? []));
        afterFunction = showMap;
      } else if (CHARACTERS[state.area].isPersuaded) {
        // 雑魚敵を説得済みの場合
        messages.push(...serif.FACE1);
        afterFunction = showFace;
      } else {
        // 雑魚敵を討伐済みの場合
        messages.push(...(serif.FACE2 ?? []));
        afterFunction = showFace;
      }
    } else {
      messages.push(...serif.FACE1);
      afterFunction = showFace;
    }

    chainMessage(messages, afterFunction);
    return;
  };
  const showFace = () => {
    buttonList.value = FACE_BUTTON_DEFINE_LIST;
    isShowStatusBar.value = true;
  };
  const showBattle = () => {
    buttonList.value = BATTLE_BUTTON_LIST;
    isShowStatusBar.value = true;
  };
  const showEnd = (type: WAS_ENDING) => {
    emits("end", type);
  };

  const save = () => {
    emits(
      "save",
      state.timming,
      state.healed,
      state.player,
      CHARACTERS,
      BOSSES,
      AREAS
    );
  };
  return {
    layer,
    displayMessage,
    onClickMessageFrame,
    buttonList,
    onClickButton,
    AREAS,
    player: state.player,
    isShowStatusBar,
    showMap,
    showArea,
    save,
  };
};
