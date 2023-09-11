const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 600;
const GAME_DISPLAY_WIDTH = CANVAS_WIDTH;
const GAME_DISPLAY_HEIGHT = CANVAS_HEIGHT * 0.7;

enum WAS_AREA_ID {
  SATAN_CASTLE = "SATAN_CASTLE",
  CAVE = "CAVE",
  MOUNTAIN = "MOUNTAIN",
  SEA = "SEA",
  VILLAGE = "VILLAGE",
  KINGDOM_CASTLE = "KINGDOM_CASTLE",
}

enum WAS_BUTTON_EVENT {
  EXPLORE,
  PERSUADE,
  USE_PERSUADE_ITEM,
  BATTLE,
  BACK_TO_FACE,
  BACK_TO_MAP,
  BACK_TO_BATTLE,
  NONE,
  ATTACK,
  SKILL,
  ACTIVATE_SKILL,
  BATTLE_ITEM,
  USE_BATTLE_ITEM,
}

enum WAS_EVENT_TIMMING {
  OPENING = 0,
  AFTER_OPENING = 1,
  AFTER_CLEAR_CAVE = 2,
  AFTER_CLEAR_SEA = 3,
  AFTER_CLEAR_VILLAGE = 4,
  AFTER_CLEAR_MOUNTAIN = 5,
  AFTER_CLEAR_ALL_AREA = 6,
  AFTER_CLEAR_KINGDOM_CASTLE = 7,
}

enum WAS_ITEM_ID {
  SATAN_SOUL = "SATAN_SOUL",
  GOBLIN_HANMER = "GOBLIN_HANMER",
  HOLY_WATER = "HOLY_WATER",
  DRAGON_SCALE = "DRAGON_SCALE",
  ELF_MEDICINE = "ELF_MEDICINE",
  BOSS_GOBLIN_HEAD = "BOSS_GOBLIN_HEAD",
  KRAKEN_HAND = "KRAKEN_HAND",
  DARK_ELF_EYE = "DARK_ELF_EYE",
  DRAGON_WING = "DRAGON_WING",
  HERB = "HERB",
  EMERGENCY_SET = "EMERGENCY_SET",
  RICE_BALL = "RICE_BALL",
  BIG_RICE_BALL = "BIG_RICE_BALL",
}

enum WAS_SKILL_ID {
  HEAL = "HEAL",
  // HIGH_HEAL = "HIGH_HEAL",
  POWER_ATTACK = "POWER_ATTACK",
  SPEED_ATTACK = "SPEED_ATTACK",
  GARD_ATTACK = "GARD_ATTACK",
  DARK_SORD = "DARK_SORD",
  FIRE = "FIRE",
  WATER = "WATER",
  SOIL = "SOIL",
  // THUNDER = "THUNDER",
  WIND = "WIND",
  // SHINE = "SHINE",
  // DARK = "DARK",
  SATAN_SPACIAL = "SATAN_SPACIAL",
}

enum WAS_ELEMENT {
  NONE = "none",
  FIRE = "fire",
  WATER = "water",
  THUNDER = "thunder",
  SOIL = "soil",
  WIND = "wind",
  DARK = "dark",
  SHINE = "shine",
}

export {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GAME_DISPLAY_WIDTH,
  GAME_DISPLAY_HEIGHT,
  WAS_AREA_ID,
  WAS_BUTTON_EVENT,
  WAS_EVENT_TIMMING,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
  WAS_ELEMENT,
};
