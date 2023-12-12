export enum WIL_SKILL_ID {
  SLASH = "SLASH",
  ULT_SACRED_SWORD = "ULT_SACRED_SWORD",
  SHINE_ABSORB = "SHINE_ABSORB",
  SHINE_BALL = "SHINE_BALL",
  SACRED_RAZER = "SACRED_RAZER",
  SANCTUARY = "SANCTUARY",
}

// スキルの影響範囲
export enum WIL_SKILL_RANGE {
  FRONT = "FRONT", // 最前列
  SKIP = "SKIP", // 定量飛ばし
  AROUND = "AROUND", // 八方
  CROSS = "CROSS", // 四方
  ROW = "ROW", // 列
  COLUMN = "COLUMN", // 行
  ALL = "ALL", // 全範囲
}

export enum WIL_SKILL_TARGET {
  ALLY,
  ENEMY,
  RANDOM,
  ALL,
}
