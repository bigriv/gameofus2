/**
 * 色クラス
 */

enum COLOR {
  BLACK = "#000000",
  WHITE = "#ffffff",
  DARK_GRAY = "#a9a9a9",
  GRAY = "#c0c0c0",
  LIGHT_GRAY = "#d3d3d3",
  SHADOW = "#696969",
  BEIGE = "#ffe4c4",
  DARK_BEIGE = "#d2b48c",
  LIGHT_BROWN = "#8b4513",
  BROWN = "#a52a2a",
  DARK_BROWN = "#5b0f00ff",
  RED = "#ff0000",
  INDIGO = "#4b0082",
  SKYBLUE = "#87ceeb",
  SHALLOW_BLUE = "#1e90ff",
  BLUE = "#0000ff",
  DARK_BLUE = "#00008b",
  TURQUOISE = "#40e0d0",
  LIGHT_YWLLOW = "#ffffe0",
  YELLOW = "#ffff00",
  ORANGE = "#ffa500",
  GOLD = "#ffd700",
  GREEN_YELLOW = "#adff2f",
  PALE_GREEN = "#d9ead3",
  LIGHT_GREEN = "#98fb98",
  GREEN = "#008000",
  DARK_GREEN = "#006400",
}
class GOUColor {
  code: COLOR; // カラーコード
  opacity: number; // 透明度

  constructor(code?: COLOR, opacity?: number) {
    this.code = code ?? COLOR.WHITE;
    if (!opacity) {
      this.opacity = !code ? 0 : 1;
    } else {
      this.opacity = opacity;
    }
    if (this.opacity < 0 || this.opacity > 1) {
      console.error(
        "The property of opacity in GOUColor must be more than 0 and lower than 1."
      );
    }
  }

  rgba(): string {
    const red = parseInt("0x" + this.code.slice(1, 3));
    const green = parseInt("0x" + this.code.slice(3, 5));
    const blue = parseInt("0x" + this.code.slice(5, 7));
    return `rgba(${red}, ${green}, ${blue}, ${this.opacity})`;
  }
}

export { GOUColor, COLOR };
