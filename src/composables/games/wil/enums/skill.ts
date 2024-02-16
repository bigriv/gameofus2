export enum WIL_SKILL_ID {
  // 無属性
  // 近接物理
  SLASH = "SLASH",
  POWER_ATTACK = "POWER_ATTACK",
  // 投擲物理
  PIERCING_SHOT = "PIERCING_SHOT",
  ARROW_RAIN = "ARROW_RAIN",
  REGENERATION = "REGENERATION",
  // 補助魔法
  REPAIR = "REPAIR",
  PRODUCE = "PRODUCE",
  SUMMON_FIRE_DEMON = "SUMMON_FIRE_DEMON",
  SUMMON_ICE_DEMON = "SUMMON_ICE_DEMON",
  SUMMON_WIND_DEMON = "SUMMON_WIND_DEMON",
  SUMMON_SOIL_DEMON = "SUMMON_SOIL_DEMON",

  // 光属性
  // 近接物理
  SHINE_SWORD = "SHINE_SWORD",
  SACRED_CROSS = "SACRED_CROSS",
  WHITE_LINE = "WHITE_LINE",
  // 攻撃魔法
  SHINE_BALL = "SHINE_BALL",
  SHINE_RAZER = "SHINE_RAZER",
  SACRED_RAY = "SACRED_RAY",
  // 補助魔法
  HEAL = "HEAL",
  SANCTUARY = "SANCTUARY",
  CREATE_SACRED_SWORD = "CREATE_SACRED_SWORD",

  // 闇属性
  // 近接物理
  POISON_NAIL = "POISON_NAIL",
  // 攻撃魔法
  SHADOW_BALL = "SHADOW_BALL",
  BLACK_LINE = "BLACK_LINE",
  BLACK_METEOR = "BLACK_METEOR",
  // 補助魔法
  HOPELESS = "HOPELESS",
  SMOG = "SMOG",
  BLACK_HOLE = "BLACK_HOLE",

  // 雷属性
  // 近接物理
  THUNDER_SWORD = "THUNDER_SWORD",
  THUNDER_NEEDLE = "THUNDER_NEEDLE",
  RAIZIN = "RAIZIN",
  // 投擲物理
  THUNDER_SHOT = "THUNDER_SHOT",
  RAILGUN = "RAILGUN",
  // 攻撃魔法
  THUNDER_BALL = "THUNDER_BALL",
  RAIKOU = "RAIKOU",
  SPARK = "SPARK",
  THUNDER_VOLT = "THUNDER_VOLT",
  // 補助魔法
  ELECTROMAGNETIC_WAVE = "ELECTROMAGNETIC_WAVE",
  LIGHTNING = "LIGHTNING",

  // 水属性
  // 近接物理
  SNOW_BLADE = "SNOW_BLADE",
  WATER_SLASH = "WATER_SLASH",
  GLACIER = "GLACIER",
  // 投擲物理
  ICE_SHOT = "ICE_SHOT",
  WARTER_CANNON = "WARTER_CANNON",
  // 攻撃魔法
  BUBBLE_BALL = "BUBBLE_BALL",
  BLIZZARD = "BLIZZARD",
  ICEBERG = "ICEBERG",
  // 補助魔法
  HEAL_WATER = "HEAL_WATER",
  CLEAR_WATER = "CLEAR_WATER",
  SQUALL = "SQUALL",
  SUPER_WATER = "SUPER_WATER",

  // 土属性
  // 近接物理
  SWING = "SWING",
  HEAVY_ROCK = "HEAVY_ROCK",
  SAND_SLASH = "SAND_SLASH",
  // 投擲物理
  SAND_STORM = "SAND_STORM",
  // 攻撃魔法
  ROCK_BUSTER = "ROCK_BUSTER",
  EARTHQUAKE = "EARTHQUAKE",

  // 風属性
  // 近接物理
  FAST_SLASH = "FAST_SLASH",
  WIND_SLASH = "WIND_SLASH",
  // 投擲物理
  WIND_ARROW = "WIND_ARROW",
  ARROW_STORM = "ARROW_STORM",
  JET_ARROW = "JET_ARROW",
  // 攻撃魔法
  AIR_CUTTER = "AIR_CUTTER",
  CYCLONE = "CYCLONE",
  TEMPEST = "TEMPEST",
  // 補助魔法
  HEADWIND = "HEADWIND",
  TAILWIND = "TAILWIND",

  // 火属性
  // 近接物理
  RED_LINE = "RED_LINE",
  BAKUEN = "BAKUEN",
  GOKUEN = "GOKUEN",
  SATAN_FRAME = "SATAN_FRAME",
  // 投擲物理
  FIRE_SHOT = "FIRE_SHOT",
  BURST = "BURST",
  // 攻撃魔法
  FIRE_BALL = "FIRE_BALL",
  CROSS_FIRE = "CROSS_FIRE",
  // 補助魔法
  DEMON_FIRE = "DEMON_FIRE",
  LIGHT_FIRE = "LIGHT_FIRE",
}

// スキルの影響範囲
export enum WIL_SKILL_RANGE {
  SOLO = "SOLO", // 単体
  AROUND = "AROUND", // 八方
  CROSS = "CROSS", // 四方
  ROW = "ROW", // 列
  COLUMN = "COLUMN", // 行
  ALL = "ALL", // 全範囲
}

export enum WIL_SKILL_TYPE {
  SHOOT_PHISIC, // 投擲
  CLOSE_PHISIC, // 近接
  ATTACK_MAGIC, // 攻撃魔法
  SUPPORT_MAGIC, // 補助魔法
}

export enum WIL_SKILL_TARGET {
  ALLY, // 味方のみ対象にできる
  ENEMY, // 敵のみ対象にできる
  SELF, // 自分のみ対象にできる
  ALL, // 敵・味方すべてを対象にできる
}
