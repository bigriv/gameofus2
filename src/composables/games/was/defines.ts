import { COLOR, GOUColor } from "@/composables/types/GOUColor";
import {
  WasCharacter,
  WasNonPlayerCharacter,
  WasPlayerCharacter,
} from "./types/character";
import WasStatus from "./types/status";
import { WAS_ELEMENT } from "./const";
import WAS_SERIF_DEFINE from "./defines/serif";
import WasArea from "./types/area";
import {
  GAME_DISPLAY_HEIGHT,
  GAME_DISPLAY_WIDTH,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
} from "./const";
import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";
import GOUVisualType from "@/composables/types/visuals/GOUVisualType";

/**
 * 各エリア以外の背景定義
 */
// マップ背景
const WAS_MAP_BACKGROUND = ConstructGOUVisual({
  type: GOUVisualType.IMAGE_SVG,
  path: "/games/was/Map.svg",
  width: GAME_DISPLAY_WIDTH,
  height: GAME_DISPLAY_HEIGHT,
});

// エンディング背景
const WAS_ENDING_BACKGROUND = ConstructGOUVisual({
  type: GOUVisualType.DIAGRAM_RECT,
  color: new GOUColor(COLOR.BLACK),
  width: GAME_DISPLAY_WIDTH,
  height: GAME_DISPLAY_HEIGHT,
});

/**
 * キャラ定義
 */
// 主人公
const WAS_HERO = new WasPlayerCharacter(
  "私",
  new WasStatus({
    life: 100,
    satiety: 10,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.DARK,
  }),
  [WAS_SKILL_ID.HEAL],
  [WAS_ITEM_ID.SATAN_SOUL, WAS_ITEM_ID.HERB]
);
// 姫
const WAS_PRINCESS = new WasCharacter(
  "姫",
  ConstructGOUVisual({
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Princess.svg",
    width: 150,
    height: 300,
  }),
  new WasStatus()
);
const WAS_ENEMY: { [key: string]: WasNonPlayerCharacter } = {
  CAVE: new WasNonPlayerCharacter(
    "ゴブリン",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Goblin.svg",
      width: 150,
      height: 300,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 3,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.NONE,
    }),
    false,
    WAS_ITEM_ID.GOBLIN_HANMER,
    WAS_ITEM_ID.SATAN_SOUL,
    WAS_SKILL_ID.POWER_ATTACK,
    {
      FACE1: WAS_SERIF_DEFINE.FACE_GOBLIN,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_GOBLIN,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_GOBLIN,
    }
  ),
  SEA: new WasNonPlayerCharacter(
    "サハギン",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Sahagin.svg",
      width: 150,
      height: 300,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 3,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.WATER,
    }),
    false,
    WAS_ITEM_ID.HOLY_WATER,
    WAS_ITEM_ID.GOBLIN_HANMER,
    WAS_SKILL_ID.SPEED_ATTACK,
    {
      FACE1: WAS_SERIF_DEFINE.FACE_SAHAGIN,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SAHAGIN,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SAHAGIN,
    }
  ),
  VILLAGE: new WasNonPlayerCharacter(
    "エルフ",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Elf.svg",
      width: 150,
      height: 300,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 0,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.NONE,
    }),
    false,
    WAS_ITEM_ID.ELF_MEDICINE,
    WAS_ITEM_ID.SATAN_SOUL,
    WAS_SKILL_ID.WIND,
    {
      FACE1: WAS_SERIF_DEFINE.FACE_ELF,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_ELF,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_ELF,
    }
  ),
  MOUNTAIN: new WasNonPlayerCharacter(
    "スライム",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Slime.svg",
      width: 150,
      height: 150,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 3,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.SHINE,
    }),
    false,
    WAS_ITEM_ID.EMERGENCY_SET,
    WAS_ITEM_ID.RICE_BALL,
    WAS_SKILL_ID.GARD_ATTACK,
    {
      FACE1: WAS_SERIF_DEFINE.FACE_SLIME,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SLIME,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SLIME,
    }
  ),
  KINGDOM_CASTLE: new WasNonPlayerCharacter(
    "兵士",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Soldier.svg",
      width: 150,
      height: 300,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 3,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.NONE,
    }),
    false,
    WAS_ITEM_ID.EMERGENCY_SET,
    null,
    WAS_SKILL_ID.SATAN_SPACIAL,
    {
      FACE1: WAS_SERIF_DEFINE.FACE_SOLDIER,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SOLDIER,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SOLDIER,
    }
  ),
};
const WAS_BOSS: { [key: string]: WasNonPlayerCharacter } = {
  CAVE: new WasNonPlayerCharacter(
    "ボスゴブリン",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/BossGoblin.svg",
      width: 300,
      height: 400,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 0,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.NONE,
    }),
    true,
    WAS_ITEM_ID.BOSS_GOBLIN_HEAD,
    null,
    WAS_SKILL_ID.SOIL,
    {
      FACE1: WAS_SERIF_DEFINE.FACE1_BOSS_GOBLIN,
      FACE2: WAS_SERIF_DEFINE.FACE2_BOSS_GOBLIN,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_BOSS_GOBLIN,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_BOSS_GOBLIN,
      CHAT: WAS_SERIF_DEFINE.CHAT_BOSS_GOBLIN,
    }
  ),
  SEA: new WasNonPlayerCharacter(
    "クラーケン",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Kraken.svg",
      width: 300,
      height: 400,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 0,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.WATER,
    }),
    true,
    WAS_ITEM_ID.KRAKEN_HAND,
    WAS_ITEM_ID.DARK_ELF_EYE,
    WAS_SKILL_ID.WATER,
    {
      FACE1: WAS_SERIF_DEFINE.FACE1_KRAKEN,
      FACE2: WAS_SERIF_DEFINE.FACE2_KRAKEN,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_KRAKEN,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_KRAKEN,
      CHAT: WAS_SERIF_DEFINE.CHAT_KRAKEN,
    }
  ),
  VILLAGE: new WasNonPlayerCharacter(
    "ダークエルフ",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/DarkElf.svg",
      width: 150,
      height: 300,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 0,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.DARK,
    }),
    true,
    WAS_ITEM_ID.DARK_ELF_EYE,
    WAS_ITEM_ID.HOLY_WATER,
    WAS_SKILL_ID.DARK_SORD,
    {
      FACE1: WAS_SERIF_DEFINE.FACE1_DARK_ELF,
      FACE2: WAS_SERIF_DEFINE.FACE2_DARK_ELF,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DARK_ELF,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DARK_ELF,
      CHAT: WAS_SERIF_DEFINE.CHAT_DARK_ELF,
    }
  ),
  MOUNTAIN: new WasNonPlayerCharacter(
    "ドラゴン",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Dragon.svg",
      width: 300,
      height: 300,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 0,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.WIND,
    }),
    true,
    WAS_ITEM_ID.DRAGON_WING,
    WAS_ITEM_ID.ELF_MEDICINE,
    WAS_SKILL_ID.FIRE,
    {
      FACE1: WAS_SERIF_DEFINE.FACE1_DRAGON,
      FACE2: WAS_SERIF_DEFINE.FACE2_DRAGON,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DRAGON,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DRAGON,
      CHAT: WAS_SERIF_DEFINE.CHAT_DRAGON,
    }
  ),
  KINGDOM_CASTLE: new WasNonPlayerCharacter(
    "勇者",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/characters/Hero.svg",
      width: 150,
      height: 300,
    }),
    new WasStatus({
      life: 10,
      satiety: 0,
      attack: 10,
      defense: 0,
      speed: 1,
      magic: 10,
      element: WAS_ELEMENT.WIND,
    }),
    true,
    WAS_ITEM_ID.DRAGON_WING,
    WAS_ITEM_ID.ELF_MEDICINE,
    WAS_SKILL_ID.FIRE,
    {
      FACE1: WAS_SERIF_DEFINE.FACE1_DRAGON,
      FACE2: WAS_SERIF_DEFINE.FACE2_DRAGON,
      BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DRAGON,
      PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DRAGON,
      CHAT: WAS_SERIF_DEFINE.CHAT_DRAGON,
    }
  ),
};

/**
 * エリア定義
 */
const WAS_AREA: { [key: string]: WasArea } = {
  SATAN_CASTLE: new WasArea(
    "魔王城",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/outside/SatanCastle.svg",
      width: 70,
      height: 70,
      position: { x: 50, y: 30 },
    }),
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/inside/SatanCastle.svg",
      width: GAME_DISPLAY_WIDTH,
      height: GAME_DISPLAY_HEIGHT,
    }),
    WAS_PRINCESS
  ),
  CAVE: new WasArea(
    "洞窟",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/outside/Cave.svg",
      width: 70,
      height: 40,
      position: { x: 200, y: 125 },
    }),
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/inside/Cave.svg",
      width: GAME_DISPLAY_WIDTH,
      height: GAME_DISPLAY_HEIGHT,
    }),
    WAS_ENEMY.CAVE,
    WAS_BOSS.CAVE
  ),
  SEA: new WasArea(
    "海岸",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/outside/Sea.svg",
      width: 100,
      height: 100,
      position: { x: 45, y: 290 },
    }),
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/inside/Sea.svg",
      width: GAME_DISPLAY_WIDTH,
      height: GAME_DISPLAY_HEIGHT,
    }),
    WAS_ENEMY.SEA,
    WAS_BOSS.SEA
  ),
  VILLAGE: new WasArea(
    "エルフ村",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/outside/Village.svg",
      width: 60,
      height: 60,
      position: { x: 420, y: 75 },
    }),
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/inside/Village.svg",
      width: GAME_DISPLAY_WIDTH,
      height: GAME_DISPLAY_HEIGHT,
    }),
    WAS_ENEMY.VILLAGE,
    WAS_BOSS.VILLAGE
  ),
  MOUNTAIN: new WasArea(
    "山",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/outside/Mountain.svg",
      width: 150,
      height: 70,
      position: { x: 280, y: 200 },
    }),
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/inside/Mountain.svg",
      width: GAME_DISPLAY_WIDTH,
      height: GAME_DISPLAY_HEIGHT,
    }),
    WAS_ENEMY.MOUNTAIN,
    WAS_BOSS.MOUNTAIN
  ),
  KINGDOM_CASTLE: new WasArea(
    "王国",
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/outside/KingdomCastle.svg",
      width: 70,
      height: 70,
      position: { x: 465, y: 300 },
    }),
    ConstructGOUVisual({
      type: GOUVisualType.IMAGE_SVG,
      path: "/games/was/buildings/inside/KingdomCastle.svg",
      width: GAME_DISPLAY_WIDTH,
      height: GAME_DISPLAY_HEIGHT,
    }),
    WAS_ENEMY.KINGDOM_CASTLE,
    WAS_BOSS.KINGDOM_CASTLE
  ),
};
export {
  WAS_MAP_BACKGROUND,
  WAS_ENDING_BACKGROUND,
  WAS_HERO,
  WAS_PRINCESS,
  WAS_ENEMY,
  WAS_BOSS,
  WAS_AREA,
};
