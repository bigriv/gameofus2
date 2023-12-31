export enum WIL_SKILL_ID {
  // 無属性
  // 近接物理
  SLASH = "SLASH",
  POWER_ATTACK = "CHARGE_ATTACK",
  ONE_LINE = "ONE_LINE",
  // 投擲物理
  SHOT = "SHOT",
  PIERCING_SHOT = "PIERCING_SHOT",
  AROW_RAIN = "AROW_RAIN",
  // 補助魔法
  HEAL = "HEAL",
  CLEAR = "CLEAR",

  // 光属性
  // 近接物理
  LIGHT_SWORD = "LIGHT_SWORD",
  SACRED_CROSS = "SACRED_CROSS",
  // 投擲物理
  CREATE_SACRED_DANCING = "CREATE_SACRED_DANCING",
  // 攻撃魔法
  SHINE_BALL = "SHINE_BALL",
  SHINE_RAZER = "SHINE_RAZER",
  SACRED_RAY = "SACRED_RAY",
  // 補助魔法
  SANCTUARY = "SANCTUARY",
  CREATE_SACRED_SWORD = "CREATE_SACRED_SWORD",

  // 闇属性
  // 近接物理
  POISON_NAIL = "POISON_NAIL",
  // 投擲物理
  SHADOW_SHOT = "SHADOW_SHOT",
  // 攻撃魔法
  SHADOW_BALL = "DARK_BALL",
  BLACK_LINE = "BLACK_LINE",
  BLACK_METEOR = "BLACK_METEOR",
  // 補助魔法
  SMOG = "SMOG",
  INVITE_DEATH = "INVITE_DEATH",

  // 雷属性
  // 近接物理
  THUNDER_SWORD = "THUNDER_SWORD",
  THUNDER_NEEDLE = "THUNDER_NEEDLE",
  LIGHTNING = "LIGHTNING",
  // 投擲物理
  RAILGUN = "RAILGUN",
  THUNDER_SHOT = "THUNDER_SHOT",
  // 攻撃魔法
  THUNDER_BALL = "THUNDER_BALL",
  SPARK = "SPARK",
  PIERCING_THUNDER = "PIERCING_THUNDER",
  THUNDER_VOLT = "THUNDER_VOLT",
  // 補助魔法
  ELECTROMAGNETIC_WAVE = "ELECTROMAGNETIC_WAVE",
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
