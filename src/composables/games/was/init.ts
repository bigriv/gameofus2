import { Ref, reactive, ref } from "vue";
import {
  WAS_AREA_ID,
  WAS_DEFAULT_GAME_DISPLAY_HEIGHT,
  WAS_DEFAULT_GAME_DISPLAY_WIDTH,
  WAS_EVENT_TIMMING,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
  WAS_SKILL_TYPE,
} from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasPlayerCharacter } from "@/composables/games/was/types/playerCharacter";
import {
  WAS_BOSS_GOBLIN,
  WAS_DARK_ELF,
  WAS_DORAGON,
  WAS_ELF,
  WAS_GOBLIN,
  WAS_HERO,
  WAS_KRAKEN,
  WAS_PRINCESS,
  WAS_SAHAGIN,
  WAS_SATAN,
  WAS_SLIME,
  WAS_SOLDIER,
} from "@/composables/games/was/defines/character";
import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";
import {
  WAS_CAVE,
  WAS_KINGDOM_CASTLE,
  WAS_MOUNTAIN,
  WAS_SATAN_CASTLE,
  WAS_SEA,
  WAS_VILLAGE,
} from "@/composables/games/was/defines/area";
import { WAS_MAP } from "@/composables/games/was/defines/map";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WasArea } from "@/composables/games/was/types/area";
import { WasStatus } from "@/composables/games/was/types/status";
import { WasItem } from "@/composables/games/was/types/item";
import { WAS_ITEM } from "@/composables/games/was/defines/item";
import { WasSkill } from "@/composables/games/was/types/skill";
import { WAS_SKILL } from "@/composables/games/was/defines/skill";
import { WasPhysicalAttackSkill } from "@/composables/games/was/types/phisicalAttackSkill";
import { WasMagicalAttackSkill } from "@/composables/games/was/types/magicalAttackSkill";
import { WasHealSkill } from "@/composables/games/was/types/healSkill";
import { WasBuffSkill } from "@/composables/games/was/types/buffSkill";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import GOUImage from "@/composables/types/visuals/GOUImage";

export const useWasInit = (loadData?: any) => {
  const isLoadedImages: Ref<boolean> = ref(false);

  // プレイヤーの初期化
  const initPlayer = (): WasPlayerCharacter => {
    return new WasPlayerCharacter(
      WAS_SATAN.name,
      ConstructGOUVisual(WAS_SATAN.visual),
      new WasStatus(WAS_SATAN.initStatus),
      WAS_SATAN.skills,
      WAS_SATAN.items
    );
  };

  // 敵キャラクターの初期化
  const initCharacter = (
    defines: { [key: string]: any },
    isBoss: boolean
  ): { [key: string]: WasNonPlayerCharacter } => {
    let characters: { [key: string]: WasNonPlayerCharacter } = {};
    for (const key of Object.keys(defines)) {
      characters[key] = new WasNonPlayerCharacter(
        defines[key].name,
        ConstructGOUVisual(defines[key].visual),
        new WasStatus(defines[key].initStatus),
        isBoss,
        defines[key].dropItem,
        defines[key].persuadItem,
        defines[key].occupySkill,
        defines[key].chooseMove,
        defines[key].serif,
        defines[key].skills,
        defines[key].items
      );
    }

    return characters;
  };

  // エリアの初期化
  const initArea = (): { [key: string]: WasArea } => {
    let areas: { [key: string]: WasArea } = {};
    areas["SATAN_CASTLE"] = new WasArea(
      WAS_SATAN_CASTLE.name,
      ConstructGOUVisual(WAS_SATAN_CASTLE.outside),
      ConstructGOUVisual(WAS_SATAN_CASTLE.inside),
      PRINCESS
    );

    const defines: { [key: string]: any } = {
      CAVE: WAS_CAVE,
      SEA: WAS_SEA,
      VILLAGE: WAS_VILLAGE,
      MOUNTAIN: WAS_MOUNTAIN,
      KINGDOM_CASTLE: WAS_KINGDOM_CASTLE,
    };
    for (const key of Object.keys(defines)) {
      areas[key] = new WasArea(
        defines[key].name,
        ConstructGOUVisual(defines[key].outside),
        ConstructGOUVisual(defines[key].inside),
        CHARACTERS[key],
        BOSSES[key],
        defines[key].dropItems
      );
    }
    return areas;
  };

  // アイテムの初期化
  const initItem = (): { [key: string]: WasItem } => {
    let items: { [key: string]: WasItem } = {};
    const defines = WAS_ITEM;
    for (const key of Object.keys(defines)) {
      if (!Object.values(WAS_ITEM_ID).includes(key as WAS_ITEM_ID)) {
        console.error(`key:'${key}' is undefined in item ids.`);
        continue;
      }
      items[key] = new WasItem(
        key as WAS_ITEM_ID,
        defines[key].name,
        defines[key].maxAmount,
        defines[key].passive,
        defines[key].beforeEffect,
        defines[key].effect,
        defines[key].afterEffect
      );
    }
    return items;
  };

  // スキルの初期化
  const initSkill = (): { [key: string]: WasSkill } => {
    let skills: { [key: string]: WasSkill } = {};
    const defines = WAS_SKILL;
    for (const key of Object.keys(defines)) {
      if (!Object.values(WAS_SKILL_ID).includes(key as WAS_SKILL_ID)) {
        console.error(`key:'${key}' is undefined in skill ids.`);
        continue;
      }
      switch (defines[key].type) {
        case WAS_SKILL_TYPE.PHISICAL_ATTACK:
          skills[key] = new WasPhysicalAttackSkill(
            key as WAS_SKILL_ID,
            defines[key].name,
            new GOULottie(
              defines[key].animation,
              (200 / WAS_DEFAULT_GAME_DISPLAY_WIDTH) * 100,
              (200 / WAS_DEFAULT_GAME_DISPLAY_HEIGHT) * 100
            ),
            new GOUReadAudio(defines[key].sound),
            defines[key].element,
            defines[key].power,
            defines[key].cost,
            defines[key].beforeEffect,
            defines[key].effect,
            defines[key].afterEffect
          );
          break;
        case WAS_SKILL_TYPE.MAGICAL_ATTACK:
          skills[key] = new WasMagicalAttackSkill(
            key as WAS_SKILL_ID,
            defines[key].name,
            new GOULottie(
              defines[key].animation,
              (200 / WAS_DEFAULT_GAME_DISPLAY_WIDTH) * 100,
              (200 / WAS_DEFAULT_GAME_DISPLAY_HEIGHT) * 100
            ),
            new GOUReadAudio(defines[key].sound),
            defines[key].element,
            defines[key].power,
            defines[key].cost,
            defines[key].beforeEffect,
            defines[key].effect,
            defines[key].afterEffect
          );
          break;
        case WAS_SKILL_TYPE.HEAL:
          skills[key] = new WasHealSkill(
            key as WAS_SKILL_ID,
            defines[key].name,
            new GOULottie(
              defines[key].animation,
              (200 / WAS_DEFAULT_GAME_DISPLAY_WIDTH) * 100,
              (200 / WAS_DEFAULT_GAME_DISPLAY_HEIGHT) * 100
            ),
            new GOUReadAudio(defines[key].sound),
            defines[key].element,
            defines[key].power,
            defines[key].cost,
            defines[key].beforeEffect,
            defines[key].effect,
            defines[key].afterEffect
          );
          break;
        case WAS_SKILL_TYPE.BUFF:
          skills[key] = new WasBuffSkill(
            key as WAS_SKILL_ID,
            defines[key].name,
            new GOULottie(
              defines[key].animation,
              (200 / WAS_DEFAULT_GAME_DISPLAY_WIDTH) * 100,
              (200 / WAS_DEFAULT_GAME_DISPLAY_HEIGHT) * 100
            ),
            new GOUReadAudio(defines[key].sound),
            defines[key].element,
            defines[key].cost,
            defines[key].beforeEffect,
            defines[key].effect,
            defines[key].afterEffect
          );
          break;
      }
    }
    return skills;
  };

  const PRINCESS: WasCharacter = new WasCharacter(
    WAS_PRINCESS.name,
    ConstructGOUVisual(WAS_PRINCESS.visual),
    new WasStatus()
  );
  const CHARACTERS: { [key: string]: WasNonPlayerCharacter } = initCharacter(
    {
      CAVE: WAS_GOBLIN,
      SEA: WAS_SAHAGIN,
      VILLAGE: WAS_ELF,
      MOUNTAIN: WAS_SLIME,
      KINGDOM_CASTLE: WAS_SOLDIER,
    },
    false
  );
  const BOSSES: { [key: string]: WasNonPlayerCharacter } = initCharacter(
    {
      CAVE: WAS_BOSS_GOBLIN,
      SEA: WAS_KRAKEN,
      VILLAGE: WAS_DARK_ELF,
      MOUNTAIN: WAS_DORAGON,
      KINGDOM_CASTLE: WAS_HERO,
    },
    true
  );
  const MAP: GOUVisual = ConstructGOUVisual(WAS_MAP);
  const AREAS: { [key: string]: WasArea } = initArea();
  const ITEMS: { [key: string]: WasItem } = initItem();
  const SKILLS: { [key: string]: WasSkill } = initSkill();

  const state: {
    timming: WAS_EVENT_TIMMING;
    healed: boolean;
    currentArea: WAS_AREA_ID;
    player: WasPlayerCharacter;
    character: WasCharacter | null;
  } = reactive({
    timming: WAS_EVENT_TIMMING.OPENING,
    healed: false,
    currentArea: WAS_AREA_ID.SATAN_CASTLE,
    player: initPlayer(),
    character: null,
  });

  const loadFile = () => {
    (state.player.visual as GOUImage).load();
    (PRINCESS.visual as GOUImage).load();
    (MAP as GOUImage).load();
    for (const key of Object.keys(SKILLS)) {
      SKILLS[key].load();
    }
    for (const key of Object.keys(CHARACTERS)) {
      (CHARACTERS[key].visual as GOUImage).load();
    }
    for (const key of Object.keys(BOSSES)) {
      (BOSSES[key].visual as GOUImage).load();
    }
    for (const key of Object.keys(AREAS)) {
      (AREAS[key].inside as GOUImage).load();
      (AREAS[key].outside as GOUImage).load();
    }

    // ロードが完了したかを判定する
    const intervalId = setInterval(() => {
      if (!(state.player.visual as GOUImage).image?.complete) {
        return;
      }
      if (!(PRINCESS.visual as GOUImage).image?.complete) {
        return;
      }
      if (!(MAP as GOUImage).image?.complete) {
        return;
      }
      for (const key of Object.keys(CHARACTERS)) {
        if (!(CHARACTERS[key].visual as GOUImage).image?.complete) {
          return;
        }
      }
      for (const key of Object.keys(BOSSES)) {
        if (!(BOSSES[key].visual as GOUImage).image?.complete) {
          return;
        }
      }
      for (const key of Object.keys(AREAS)) {
        if (!(AREAS[key].inside as GOUImage).image?.complete) {
          return;
        }
        if (!(AREAS[key].outside as GOUImage).image?.complete) {
          return;
        }
      }
      isLoadedImages.value = true;
      clearInterval(intervalId);
    }, 100);
  };

  const loadSaveData = () => {
    console.log("load", loadData);
    if (!loadData) {
      return;
    }
    if (loadData.player) {
      state.player.status = new WasStatus(loadData.player.status);
      state.player.defaultStatus = new WasStatus(loadData.player.defaultStatus);
      state.player.exploreCount = loadData.player.exploreCount ?? 0;
      state.player.skills =
        (loadData.player.skills as Array<WAS_SKILL_ID>) ?? [];
      state.player.items =
        (loadData.player.items as Array<{ amount: number; id: WAS_ITEM_ID }>) ??
        [];
    }
    console.log("player", state.player);
    state.timming =
      (loadData.timming as WAS_EVENT_TIMMING) ?? WAS_EVENT_TIMMING.OPENING;
    state.healed = loadData.healed ?? false;
    if (loadData.exploreCount) {
      state.timming = loadData.exploreCount ?? 0;
    }

    if (loadData.bosses) {
      for (const key of Object.keys(BOSSES)) {
        if (!loadData.bosses[key]) {
          continue;
        }
        BOSSES[key].defaultStatus = new WasStatus(
          loadData.bosses[key].defaultStatus
        );
        BOSSES[key].status = new WasStatus(loadData.bosses[key].status);
        BOSSES[key].isPersuaded = loadData.bosses[key].isPersuaded;
      }
    }

    if (loadData.characters) {
      for (const key of Object.keys(CHARACTERS)) {
        if (!loadData.characters[key]) {
          continue;
        }
        CHARACTERS[key].defaultStatus = new WasStatus(
          loadData.characters[key].defaultStatus
        );
        CHARACTERS[key].status = new WasStatus(loadData.characters[key].status);
        CHARACTERS[key].isPersuaded = loadData.characters[key].isPersuaded;
      }
      console.log(CHARACTERS);
    }

    if (loadData.areas) {
      for (const key of Object.keys(AREAS)) {
        if (!loadData.areas[key]) {
          continue;
        }
        AREAS[key].isClear = loadData.areas[key].isClear;
        AREAS[key].dropItems =
          (loadData.areas[key].dropItems as Array<{
            probability: number;
            amount: number;
            id: WAS_ITEM_ID;
          }>) ?? [];
        AREAS[key].exploreCount = loadData.areas[key].exploreCount ?? 0;
      }
    }
  };

  return {
    PRINCESS,
    CHARACTERS,
    BOSSES,
    MAP,
    AREAS,
    ITEMS,
    SKILLS,
    state,
    isLoadedImages,
    loadFile,
    loadSaveData,
  };
};
