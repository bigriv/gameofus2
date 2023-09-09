/**
 * 色クラス
 */

enum COLOR {
  BLACK = "#000",
  WHITE = "#fff",
  DARK_GRAY = "#a9a9a9",
  GRAY = "#c0c0c0",
  LIGHT_GRAY = "#d3d3d3",
  SHADOW = "#696969",
  BEIGE = "#ffe4c4",
  DARK_BEIGE = "#d2b48c",
  LIGHT_BROWN = "#8b4513",
  BROWN = "#a52a2a",
  DARK_BROWN = "#5b0f00ff",
  RED = "red",
  INDIGO = "#4b0082",
  SKYBLUE = "#87ceeb",
  BLUE = "blue",
  DARK_BLUE = "#00008b",
  TURQUOISE = "#40e0d0",
  LIGHT_YWLLOW = "#ffffe0",
  YELLOW = "yellow",
  ORANGE = "#ffa500",
  GOLD = "#ffd700",
  GREEN_YELLOW = "#adff2f",
  PALE_GREEN = "#d9ead3",
  LIGHT_GREEN = "#98fb98",
  GREEN = "green",
  DARK_GREEN = "#006400",
}
class GOUColor {
  code: COLOR; // カラーコード
  opacity: number; // 透明度

  constructor(code?: COLOR, opacity?: number) {
    this.code = code ?? COLOR.BLACK;
    this.opacity = opacity ?? 1;
    if (this.opacity < 0 || this.opacity > 1) {
      console.error(
        "The property of opacity in GOUColor must be more than 0 and lower than 1."
      );
    }
  }
}

export { GOUColor, COLOR };
