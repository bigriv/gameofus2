import { Ref, reactive, ref } from "vue";
import {
  GAME_DISPLAY_WIDTH,
  GAME_DISPLAY_HEIGHT,
  WAS_AREA_ID,
  WAS_BUTTON_EVENT,
  WAS_EVENT_TIMMING,
  WAS_SKILL_ID,
} from "./const";
import {
  WAS_HERO,
  WAS_PRINCESS,
  WAS_ENEMY,
  WAS_BOSS,
  WAS_AREA,
  WAS_MAP_BACKGROUND,
  WAS_ENDING_BACKGROUND,
} from "./defines";
import { WasNonPlayerCharacter } from "./types/character";
import { useWasButton } from "./buttons";
import { WAS_BATTLE_MOVE, WAS_BATTLE_STATUS, WasBattleUtil } from "./battle";
import WasStoryManager from "./story";
import { WAS_SKILL } from "./skill";
import { WAS_ITEM, WAS_ITEM_TYPE } from "./item";
import WAS_SERIF_DEFINE from "./defines/serif";

export const useWas = () => {
  let timming = WAS_EVENT_TIMMING.OPENING;
  const area = ref();

  const layer: any = reactive({
    background: [],
    objects: [],
  });
  const player = ref(WAS_HERO);
  const enemy = ref();
  const displayMessage: Ref<Array<string>> = ref([]);
  const onClickMessageFrame: Ref<Function> = ref(() => {});
  const buttonList = ref();
  const isShowStatusBar = ref(false);

  const {
    EXLPORE_BUTTON_LIST,
    FACE_BUTTON_DEFINE_LIST,
    PERSUADE_BUTTON_LIST,
    BATTLE_BUTTON_LIST,
    SKILL_BUTTON_LIST,
    BATTLE_ITEM_BUTTON_LIST,
  } = useWasButton(player.value);

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
        if (enemy.value.persuadItem !== args) {
          chainMessage(["なにそれ"], showFace);
          return;
        }
        enemy.value.isPersuaded = true;
        if (enemy.value.isBoss) {
          WAS_AREA[area.value].isClear = true;
        }
        let occupySkill = WAS_SKILL[enemy.value.occupySkill];
        player.value.skills.push(enemy.value.occupySkill);
        chainMessage(
          [
            ...enemy.value.serif.PERSUADE_SUCCESS,
            `${occupySkill.name}を習得した！`,
          ],
          () => showArea(area.value)
        );
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
        player.value.move = {
          type: WAS_BATTLE_MOVE.ATTACK,
          target: enemy.value,
        };
        break;
      case WAS_BUTTON_EVENT.SKILL:
        buttonList.value = SKILL_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.ACTIVATE_SKILL:
        let target = enemy.value;
        if (
          [
            WAS_SKILL_ID.HEAL,
            // WAS_SKILL_ID.HIGH_HEAL,
            WAS_SKILL_ID.SATAN_SPACIAL,
          ].includes(args)
        ) {
          // サポートスキルは対象をプレイヤーに書き換える
          target = player.value;
        }
        player.value.move = {
          type: WAS_BATTLE_MOVE.SKILL,
          target: target,
          skillId: args,
        };
        break;
      case WAS_BUTTON_EVENT.BATTLE_ITEM:
        buttonList.value = BATTLE_ITEM_BUTTON_LIST.value;
        return;
      case WAS_BUTTON_EVENT.USE_BATTLE_ITEM:
        player.value.move = {
          type: WAS_BATTLE_MOVE.ITEM,
          target: enemy.value,
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
    // 戦闘中の場合の処理
    if (!enemy.value) {
      console.warn("Enemy is not initialized.");
      return;
    }

    // 敵の行動を設定
    // TODO: ターンごとに行動が変わるように修正
    enemy.value.move = {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: player.value,
    };
    const result = WasBattleUtil.mainFlow(player.value, enemy.value);
    const messages = result.progresses.map((p) => p.message);
    let afterFunction = showBattle;
    if (result.status == WAS_BATTLE_STATUS.WIN) {
      // 勝利時の処理
      afterFunction = () => {
        if (!area.value) {
          console.warn("Area is not initialized.");
          return;
        }
        if (!enemy.value) {
          console.warn("Enemy is not initialized.");
          return;
        }

        let afterMessages = [];
        if (!enemy.value.persuadItem && WAS_ENEMY[area.value].isPersuaded) {
          // 説得アイテムが未設定で雑魚キャラが説得済みの場合は説得成功として処理する
          enemy.value.isPersuaded = true;
          let occupySkill = WAS_SKILL[enemy.value.occupySkill];
          player.value.skills.push(enemy.value.occupySkill);
          afterMessages = [
            ...(enemy.value as WasNonPlayerCharacter).serif.PERSUADE_SUCCESS,
            `${occupySkill.name}を習得した！`,
          ];
        } else {
          let dropItem: WAS_ITEM_TYPE = WAS_ITEM[enemy.value.dropItem];
          player.value.items.push(enemy.value.dropItem);
          if (dropItem.passive instanceof Function) {
            dropItem.passive(player.value);
          }
          afterMessages = [
            ...(enemy.value as WasNonPlayerCharacter).serif.BATTLE_WIN,
            `${dropItem.name}を手に入れた！`,
          ];
        }

        // ボスの場合はタイミングを攻略済みに更新する
        if (enemy.value.isBoss) {
          if (area.value === WAS_AREA_ID.CAVE) {
            WAS_AREA.CAVE.isClear = true;
            timming = WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE;
          } else if (area.value === WAS_AREA_ID.SEA) {
            WAS_AREA.SEA.isClear = true;
            timming = WAS_EVENT_TIMMING.AFTER_CLEAR_SEA;
          } else if (area.value === WAS_AREA_ID.VILLAGE) {
            WAS_AREA.VILLAGE.isClear = true;
            timming = WAS_EVENT_TIMMING.AFTER_CLEAR_VILLAGE;
          } else if (area.value === WAS_AREA_ID.MOUNTAIN) {
            WAS_AREA.MOUNTAIN.isClear = true;
            timming = WAS_EVENT_TIMMING.AFTER_CLEAR_MOUNTAIN;
          }

          // ラスダン以外の全てのエリアを攻略済みの場合はラスダン攻略前にタイミングを更新する
          if (
            WAS_AREA.CAVE.isClear &&
            WAS_AREA.SEA.isClear &&
            WAS_AREA.VILLAGE.isClear &&
            WAS_AREA.MOUNTAIN.isClear
          ) {
            timming = WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA;
          }
        }
        chainMessage(afterMessages, () => showArea(area.value));
      };
    } else if (result.status == WAS_BATTLE_STATUS.LOSE) {
      // 敗北時の処理
      afterFunction = () => showEnd("bad");
    }

    chainMessage(messages, afterFunction);
  };

  const chainMessage: Function = (
    messages: Array<string>,
    afterFunction: Function
  ) => {
    const message = messages.shift();
    if (!message) {
      displayMessage.value = [];
      onClickMessageFrame.value = () => {};
      afterFunction();
      return;
    }
    displayMessage.value = [message];
    onClickMessageFrame.value = () => chainMessage(messages, afterFunction);
  };

  const showAreaSatanCasle = () => {
    layer.background = [WAS_AREA.SATAN_CASTLE.inside];
    layer.objects = [WAS_PRINCESS.visual];
    let messages = new Array<string>();
    switch (timming) {
      case WAS_EVENT_TIMMING.OPENING:
        messages = WAS_SERIF_DEFINE.PRINCESS_OPENING;
        timming = WAS_EVENT_TIMMING.AFTER_OPENING;
        break;
      case WAS_EVENT_TIMMING.AFTER_OPENING:
        messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_OPENING;
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE:
        if (WAS_BOSS.CAVE.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE:
        if (WAS_BOSS.CAVE.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_SEA:
        if (WAS_BOSS.SEA.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_SEA1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_SEA2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_VILLAGE:
        if (WAS_BOSS.VILLAGE.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_VILLAGE1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_VILLAGE2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_MOUNTAIN:
        if (WAS_BOSS.MOUNTAIN.isPersuaded) {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_MOUNTAIN1;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_AFTER_MOUNTAIN2;
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA:
        const bossWithoutLast = [
          WAS_BOSS.CAVE,
          WAS_BOSS.SEA,
          WAS_BOSS.VILLAGE,
          WAS_BOSS.MOUNTAIN,
        ];
        const persuadeCount = bossWithoutLast.filter(
          (boss) => boss.isPersuaded
        ).length;
        // 説得済みの数によってセリフを変える
        if (persuadeCount == bossWithoutLast.length) {
          messages = WAS_SERIF_DEFINE.PRINCESS_BEFORE_LAST_AREA1;
        } else if (persuadeCount == 0) {
          messages = WAS_SERIF_DEFINE.PRINCESS_BEFORE_LAST_AREA3;
        } else {
          messages = WAS_SERIF_DEFINE.PRINCESS_BEFORE_LAST_AREA2;
        }
        break;
    }

    chainMessage(messages, showMap);
  };

  // マップの表示
  const showMap = () => {
    layer.background = [WAS_MAP_BACKGROUND];

    // 進行状況によって表示するエリアを制御
    if (timming < WAS_EVENT_TIMMING.AFTER_OPENING) {
      layer.objects = [WAS_AREA.SATAN_CASTLE.outside];
    } else if (timming < WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE) {
      layer.objects = [WAS_AREA.SATAN_CASTLE.outside, WAS_AREA.CAVE.outside];
    } else if (timming < WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA) {
      layer.objects = [
        WAS_AREA.SATAN_CASTLE.outside,
        WAS_AREA.CAVE.outside,
        WAS_AREA.SEA.outside,
        WAS_AREA.VILLAGE.outside,
        WAS_AREA.MOUNTAIN.outside,
      ];
    } else {
      layer.objects = [
        WAS_AREA.SATAN_CASTLE.outside,
        WAS_AREA.CAVE.outside,
        WAS_AREA.SEA.outside,
        WAS_AREA.VILLAGE.outside,
        WAS_AREA.MOUNTAIN.outside,
        WAS_AREA.KINGDOM_CASTLE.outside,
      ];
    }
  };

  // エリアの表示
  const showArea = (argArea: WAS_AREA_ID) => {
    if (!argArea) {
      console.warn("Area is not initialized.");
      return;
    }
    area.value = argArea;
    if (area.value == WAS_AREA_ID.SATAN_CASTLE) {
      // 魔王城の場合は特殊処理
      showAreaSatanCasle();
      return;
    }
    layer.background = [WAS_AREA[area.value].inside];
    layer.objects = [];
    displayMessage.value = [];
    buttonList.value = EXLPORE_BUTTON_LIST;
  };

  // エリアとキャラクターの表示
  const showCharacterInArea = () => {
    if (!area.value) {
      console.warn("Area is not initialized.");
      return;
    }
    let messages = [];
    enemy.value = WAS_AREA[area.value].encount();

    if (!enemy.value) {
      chainMessage(["誰もいないようだ..."], showMap);
      return;
    }
    layer.objects = [enemy.value.visual];
    if (!enemy.value.isPersuaded) {
      messages.push(`${enemy.value.name}が現れた`);
    }

    let afteFuntion = () => {};

    const serif = (enemy.value as WasNonPlayerCharacter).serif;
    if (enemy.value.isBoss) {
      if (WAS_BOSS[area.value].isPersuaded) {
        // ボス敵を説得済みの場合
        messages.push(...(serif.CHAT ?? []));
        afteFuntion = showMap;
      } else if (WAS_ENEMY[area.value].isPersuaded) {
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
  const showEnd = (type: string) => {
    console.log(type);
    layer.background = [WAS_ENDING_BACKGROUND];
    layer.objects = [
      WasStoryManager.getMessageArea(
        GAME_DISPLAY_WIDTH,
        GAME_DISPLAY_HEIGHT,
        "ゲームオーバー"
      ),
    ];
  };
  return {
    layer,
    player,
    displayMessage,
    onClickMessageFrame,
    buttonList,
    onClickButton,
    isShowStatusBar,
    showMap,
    showArea,
  };
};
