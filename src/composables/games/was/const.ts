const WAS_DEFAULT_GAME_DISPLAY_WIDTH = 600;
const WAS_DEFAULT_GAME_DISPLAY_HEIGHT = 420;

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
  EXPLORE_ITEM,
  USE_EXPLORE_ITEM,
  BACK_TO_EXPLORE,
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
  AFTER_OPENING1 = 1,
  AFTER_OPENING2 = 2,
  AFTER_CLEAR_CAVE = 3,
  AFTER_CLEAR_SEA = 4,
  AFTER_CLEAR_VILLAGE = 5,
  AFTER_CLEAR_MOUNTAIN = 6,
  AFTER_CLEAR_ALL_AREA = 7,
  AFTER_CLEAR_KINGDOM_CASTLE = 8,
}

enum WAS_BATTLE_MOVE {
  ATTACK,
  SKILL,
  ITEM,
}

enum WAS_BATTLE_STATUS {
  WIN,
  LOSE,
  ANOTHER,
}

enum WAS_SKILL_TYPE {
  PHISICAL_ATTACK,
  MAGICAL_ATTACK,
  HEAL,
  BUFF,
}

enum WAS_ITEM_ID {
  SATAN_SOUL = "SATAN_SOUL",
  HERB = "HERB",
  SUPER_HERB = "SUPER_HERB",
  RICE_BALL = "RICE_BALL",
  FISH = "FISH",
  MEAT = "MEAT",
  HOLY_WATER = "HOLY_WATER",
  POWER_LING = "POWER_LING",
  WING_BOOTS = "WING_BOOTS",
  MYSTERIOUS_SHELL = "MYSTERIOUS_SHELL",
  DRAGON_SCALE = "DRAGON_SCALE",
  BOSS_GOBLIN_HEAD = "BOSS_GOBLIN_HEAD",
  KRAKEN_HAND = "KRAKEN_HAND",
  DARK_ELF_EYE = "DARK_ELF_EYE",
  DRAGON_WING = "DRAGON_WING",
}

enum WAS_SKILL_ID {
  HEAL = "HEAL",
  HIGH_HEAL = "HIGH_HEAL",
  POWER_ATTACK = "POWER_ATTACK",
  SPEED_ATTACK = "SPEED_ATTACK",
  GARD_ATTACK = "GARD_ATTACK",
  DARK_SORD = "DARK_SORD",
  FIRE = "FIRE",
  WATER = "WATER",
  SOIL = "SOIL",
  WIND = "WIND",
  THUNDER = "THUNDER",
  SATAN_SPACIAL = "SATAN_SPACIAL",
  JUSTICE_SPACIAL = "JUSTICE_SPACIAL",
  JUSTICE_ATTACK = "JUSTICE_ATTACK",
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

enum WAS_ENDING {
  WORST = "WORST",
  BAD = "BAD",
  GOOD = "GOOD",
  BEST = "BEST",
  DEAD = "DEAD",
  HUNGER = "HUNGER",
}

export {
  WAS_DEFAULT_GAME_DISPLAY_WIDTH,
  WAS_DEFAULT_GAME_DISPLAY_HEIGHT,
  WAS_AREA_ID,
  WAS_BUTTON_EVENT,
  WAS_BATTLE_MOVE,
  WAS_BATTLE_STATUS,
  WAS_SKILL_TYPE,
  WAS_EVENT_TIMMING,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
  WAS_ELEMENT,
  WAS_ENDING,
};
