export enum WIL_MOVE_RANGE {
  CONSTANT = "CONSTANT", // 定量距離
  SKIP = "SKIP", // 定量飛ばし
  AROUND = "AROUND", // 斜め含む定量距離
  CROSS = "CROSS", // 十字
  FOWARD_ROW = "FOWARD_ROW", // 前方列
  FOWARD_COLUMN = "FOWARD_COLUMN", // 前方同行
  ALL = "ALL", // 全範囲
}
