import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import { WAS_ELEMENT, WAS_ITEM_ID, WAS_SKILL_ID } from "../const";
import WAS_SERIF_DEFINE from "./serif";

/**
 * キャラクター定義
 */
const WAS_SATAN = {
  name: "魔王",
  initStatus: {
    life: 100,
    satiety: 10,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.DARK,
  },
  skills: [WAS_SKILL_ID.HEAL],
  items: [WAS_ITEM_ID.SATAN_SOUL, WAS_ITEM_ID.HERB],
};

const WAS_PRINCESS = {
  name: "姫",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Princess.svg",
    width: 150,
    height: 300,
  },
};

const WAS_GOBLIN = {
  name: "ゴブリン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Goblin.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 3,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.NONE,
  },
  dropItem: WAS_ITEM_ID.GOBLIN_HANMER,
  persuadItem: WAS_ITEM_ID.SATAN_SOUL,
  occupySkill: WAS_SKILL_ID.POWER_ATTACK,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_GOBLIN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_GOBLIN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_GOBLIN,
  },
};

const WAS_SAHAGIN = {
  name: "サハギン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Sahagin.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 3,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.WATER,
  },
  dropItem: WAS_ITEM_ID.HOLY_WATER,
  persuadItem: WAS_ITEM_ID.GOBLIN_HANMER,
  occupySkill: WAS_SKILL_ID.SPEED_ATTACK,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_SAHAGIN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SAHAGIN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SAHAGIN,
  },
};

const WAS_ELF = {
  name: "エルフ",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Elf.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.NONE,
  },
  dropItem: WAS_ITEM_ID.ELF_MEDICINE,
  persuadItem: WAS_ITEM_ID.SATAN_SOUL,
  occupySkill: WAS_SKILL_ID.WIND,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_ELF,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_ELF,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_ELF,
  },
};

const WAS_SLIME = {
  name: "スライム",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Slime.svg",
    width: 150,
    height: 150,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 3,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.SHINE,
  },
  dropItem: WAS_ITEM_ID.EMERGENCY_SET,
  persuadItem: WAS_ITEM_ID.RICE_BALL,
  occupySkill: WAS_SKILL_ID.GARD_ATTACK,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_SLIME,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SLIME,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SLIME,
  },
};

const WAS_SOLDIER = {
  name: "兵士",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Soldier.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 3,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.NONE,
  },
  dropItem: WAS_ITEM_ID.EMERGENCY_SET,
  persuadItem: null,
  occupySkill: WAS_SKILL_ID.SATAN_SPACIAL,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_SOLDIER,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SOLDIER,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SOLDIER,
  },
};

const WAS_BOSS_GOBLIN = {
  name: "ボスゴブリン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/BossGoblin.svg",
    width: 300,
    height: 400,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.NONE,
  },
  dropItem: WAS_ITEM_ID.BOSS_GOBLIN_HEAD,
  persuadItem: null,
  occupySkill: WAS_SKILL_ID.SOIL,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_BOSS_GOBLIN,
    FACE2: WAS_SERIF_DEFINE.FACE2_BOSS_GOBLIN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_BOSS_GOBLIN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_BOSS_GOBLIN,
    CHAT: WAS_SERIF_DEFINE.CHAT_BOSS_GOBLIN,
  },
};

const WAS_KRAKEN = {
  name: "クラーケン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Kraken.svg",
    width: 300,
    height: 400,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.WATER,
  },
  dropItem: WAS_ITEM_ID.KRAKEN_HAND,
  persuadItem: WAS_ITEM_ID.DARK_ELF_EYE,
  occupySkill: WAS_SKILL_ID.WATER,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_KRAKEN,
    FACE2: WAS_SERIF_DEFINE.FACE2_KRAKEN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_KRAKEN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_KRAKEN,
    CHAT: WAS_SERIF_DEFINE.CHAT_KRAKEN,
  },
};

const WAS_DARK_ELF = {
  name: "ダークエルフ",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/DarkElf.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.DARK,
  },
  dropItem: WAS_ITEM_ID.DARK_ELF_EYE,
  persuadItem: WAS_ITEM_ID.HOLY_WATER,
  occupySkill: WAS_SKILL_ID.DARK_SORD,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_DARK_ELF,
    FACE2: WAS_SERIF_DEFINE.FACE2_DARK_ELF,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DARK_ELF,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DARK_ELF,
    CHAT: WAS_SERIF_DEFINE.CHAT_DARK_ELF,
  },
};

const WAS_DORAGON = {
  name: "ドラゴン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Dragon.svg",
    width: 300,
    height: 300,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.WIND,
  },
  dropItem: WAS_ITEM_ID.DRAGON_WING,
  persuadItem: WAS_ITEM_ID.ELF_MEDICINE,
  occupySkill: WAS_SKILL_ID.FIRE,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_DRAGON,
    FACE2: WAS_SERIF_DEFINE.FACE2_DRAGON,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DRAGON,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DRAGON,
    CHAT: WAS_SERIF_DEFINE.CHAT_DRAGON,
  },
};

const WAS_HERO = {
  name: "勇者",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Hero.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 10,
    satiety: 0,
    attack: 10,
    defense: 0,
    speed: 1,
    magic: 10,
    element: WAS_ELEMENT.WIND,
  },
  dropItem: WAS_ITEM_ID.DRAGON_WING,
  persuadItem: WAS_ITEM_ID.ELF_MEDICINE,
  occupySkill: WAS_SKILL_ID.FIRE,
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_DRAGON,
    FACE2: WAS_SERIF_DEFINE.FACE2_DRAGON,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DRAGON,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DRAGON,
    CHAT: WAS_SERIF_DEFINE.CHAT_DRAGON,
  },
};

export {
  WAS_SATAN,
  WAS_PRINCESS,
  WAS_GOBLIN,
  WAS_SAHAGIN,
  WAS_ELF,
  WAS_SLIME,
  WAS_SOLDIER,
  WAS_BOSS_GOBLIN,
  WAS_KRAKEN,
  WAS_DARK_ELF,
  WAS_DORAGON,
  WAS_HERO,
};
