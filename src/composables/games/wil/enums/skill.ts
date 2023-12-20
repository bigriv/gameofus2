export enum WIL_SKILL_ID {
  SLASH = "SLASH",
  SACRED_RAZER = "SACRED_RAZER",
  SHINE_BALL = "SHINE_BALL",
  SANCTUARY = "SANCTUARY",
  CREATE_SACRED_SWORD = "CREATE_SACRED_SWORD",
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
