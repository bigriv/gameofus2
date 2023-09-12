import {
  WAS_AREA_ID,
  WAS_BATTLE_MOVE,
  WAS_BATTLE_STATUS,
  WAS_BUTTON_EVENT,
  WAS_ENDING,
  WAS_EVENT_TIMMING,
  WAS_SKILL_ID,
} from "./const";
import { useWasButton } from "./buttons";
import { WAS_SKILL } from "./defines/skill";
import { WAS_ITEM, WAS_ITEM_TYPE } from "./defines/item";
import WAS_SERIF_DEFINE from "./defines/serif";
import { WasNonPlayerCharacter } from "./types/nonPlayerCharacter";
import { useWasInit } from "./init";
import { useWasDispay } from "./display";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { useWasBattle } from "./battle";

export const useWasMain = (emits: Function) => {
  const { PRINCESS, CHARACTERS, BOSSES, MAP, AREAS, state } = useWasInit();

  const {
    layer,
    displayMessage,
    onClickMessageFrame,
    buttonList,
    isShowStatusBar,
    chainMessage,
  } = useWasDispay();

  const {
    EXLPORE_BUTTON_LIST,
    FACE_BUTTON_DEFINE_LIST,
    PERSUADE_BUTTON_LIST,
    BATTLE_BUTTON_LIST,
    SKILL_BUTTON_LIST,
    BATTLE_ITEM_BUTTON_LIST,
  } = useWasButton(state.player);

  const { battle } = useWasBattle();

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

  const updateTimming = (
    area: WAS_AREA_ID,
    character: WasNonPlayerCharacter
  ) => {
    // ボスの場合はタイミングを攻略済みに更新する
    if (!character.isBoss) {
      return;
    }
    if (area === WAS_AREA_ID.CAVE) {
      AREAS.CAVE.isClear = true;
      state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE;
    } else if (area === WAS_AREA_ID.SEA) {
      AREAS.SEA.isClear = true;
      state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_SEA;
    } else if (area === WAS_AREA_ID.VILLAGE) {
      AREAS.VILLAGE.isClear = true;
      state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_VILLAGE;
    } else if (area === WAS_AREA_ID.MOUNTAIN) {
      AREAS.MOUNTAIN.isClear = true;
      state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_MOUNTAIN;
    } else if (area === WAS_AREA_ID.KINGDOM_CASTLE) {
      AREAS.KINGDOM_CASTLE.isClear = true;
      state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE;
    }

    // ラスダン以外の全てのエリアを攻略済みの場合はラスダン攻略前にタイミングを更新する
    if (
      AREAS.CAVE.isClear &&
      AREAS.SEA.isClear &&
      AREAS.VILLAGE.isClear &&
      AREAS.MOUNTAIN.isClear
    ) {
      state.timming = WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA;
    }
  };
  const onClickButton = (id: WAS_BUTTON_EVENT, args: any) => {
    buttonList.value = [];
    isShowStatusBar.value = false;
    switch (id) {
      case WAS_BUTTON_EVENT.EXPLORE:
        showCharacterInArea();
        return;
      case WAS_BUTTON_EVENT.PERSUADE:
        buttonList.value = PERSUADE_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.USE_PERSUADE_ITEM:
        if (!state.area) {
          throw new WrongImplementationError("Area is not set.");
        }
        const area = state.area as WAS_AREA_ID;
        const character = state.character as WasNonPlayerCharacter;
        if (character.persuadItem !== args) {
          chainMessage(["なにそれ"], showFace);
          return;
        }
        character.isPersuaded = true;
        updateTimming(area, character);

        let messages = [...character.serif.PERSUADE_SUCCESS];
        if (character.occupySkill) {
          let occupySkill = WAS_SKILL[character.occupySkill];
          state.player.skills.push(character.occupySkill);
          messages.push(`${occupySkill.name}を習得した！`);
        }

        chainMessage(messages, () => showArea(area));
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
        return;
      case WAS_BUTTON_EVENT.NONE:
        return;
      case WAS_BUTTON_EVENT.ATTACK:
        if (!state.character) {
          throw new WrongImplementationError("Character is not set.");
        }
        state.player.move = {
          type: WAS_BATTLE_MOVE.ATTACK,
          target: state.character,
        };
        break;
      case WAS_BUTTON_EVENT.SKILL:
        buttonList.value = SKILL_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.ACTIVATE_SKILL:
        if (!state.character) {
          throw new WrongImplementationError("Character is not set.");
        }
        let target = state.character;
        if (
          [
            WAS_SKILL_ID.HEAL,
            // WAS_SKILL_ID.HIGH_HEAL,
            WAS_SKILL_ID.SATAN_SPACIAL,
          ].includes(args)
        ) {
          // サポートスキルは対象をプレイヤーに書き換える
          target = state.player;
        }
        state.player.move = {
          type: WAS_BATTLE_MOVE.SKILL,
          target: target,
          skillId: args,
        };
        break;
      case WAS_BUTTON_EVENT.BATTLE_ITEM:
        buttonList.value = BATTLE_ITEM_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.USE_BATTLE_ITEM:
        if (!state.character) {
          throw new WrongImplementationError("Character is not set.");
        }
        state.player.move = {
          type: WAS_BATTLE_MOVE.ITEM,
          target: state.character,
          itemId: args,
        };
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
      throw new WrongImplementationError();
    }
    const character = state.character as WasNonPlayerCharacter;
    // 敵の行動を設定
    // TODO: ターンごとに行動が変わるように修正
    character.move = {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: state.player,
    };
    const result = battle(state.player, character);
    const messages = result.progresses.map((p) => p.message);
    let afterFunction = showBattle;
    if (result.status == WAS_BATTLE_STATUS.WIN) {
      // 勝利時の処理
      afterFunction = () => {
        let afterMessages = [];
        if (!state.area) {
          throw new WrongImplementationError("Area is not set.");
        }
        const area = state.area as WAS_AREA_ID;
        if (!character.persuadItem && CHARACTERS[area].isPersuaded) {
          // 説得アイテムが未設定で雑魚キャラが説得済みの場合は説得成功として処理する
          character.isPersuaded = true;
          afterMessages = [...character.serif.PERSUADE_SUCCESS];
          if (character.occupySkill) {
            let occupySkill = WAS_SKILL[character.occupySkill];
            state.player.skills.push(character.occupySkill);
            afterMessages.push(`${occupySkill.name}を習得した！`);
          }
        } else {
          afterMessages = [...character.serif.BATTLE_WIN];
          if (character.dropItem) {
            let dropItem: WAS_ITEM_TYPE = WAS_ITEM[character.dropItem];
            state.player.items.push(character.dropItem);
            if (dropItem.passive instanceof Function) {
              dropItem.passive(state.player);
            }
            afterMessages.push(`${dropItem.name}を手に入れた！`);
          }
        }

        updateTimming(area, character);

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

    chainMessage(messages, afterFunction);
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
        state.timming = WAS_EVENT_TIMMING.AFTER_OPENING;
        break;
      case WAS_EVENT_TIMMING.AFTER_OPENING:
        messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_OPENING;
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

    chainMessage(messages, afterFunction);
  };

  // マップの表示
  const showMap = () => {
    layer.background = [MAP];

    // 進行状況によって表示するエリアを制御
    if (state.timming < WAS_EVENT_TIMMING.AFTER_OPENING) {
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
  const showArea = (argArea: WAS_AREA_ID) => {
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
  };

  // エリアとキャラクターの表示
  const showCharacterInArea = () => {
    let messages = [];
    if (!state.area) {
      throw new WrongImplementationError("Area is not set.");
    }
    state.character = AREAS[state.area].encount();

    if (!state.character) {
      chainMessage(["誰もいないようだ..."], showMap);
      return;
    }
    const character = state.character as WasNonPlayerCharacter;
    if (character.visual) layer.objects = [character.visual];
    if (!character.isPersuaded) {
      messages.push(`${character.name}が現れた`);
    }

    let afteFuntion = () => {};

    const serif = character.serif;
    if (character.isBoss) {
      if (BOSSES[state.area].isPersuaded) {
        // ボス敵を説得済みの場合
        messages.push(...(serif.CHAT ?? []));
        afteFuntion = showMap;
      } else if (CHARACTERS[state.area].isPersuaded) {
        // 雑魚敵を説得済みの場合
        messages.push(...serif.FACE1);
        afteFuntion = showFace;
      } else {
        // 雑魚敵を討伐済みの場合
        messages.push(...(serif.FACE2 ?? []));
        afteFuntion = showFace;
      }
    } else {
      messages.push(...serif.FACE1);
      afteFuntion = showFace;
    }

    chainMessage(messages, afteFuntion);
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
    console.log(type);
    emits("end", type);
  };

  const save = () => {};

  const load = () => {};
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
    load,
  };
};
