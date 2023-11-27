import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WasArea } from "./area";

export class WasMap {
  visual: GOUVisual;
  areas: { [key: string]: WasArea };

  constructor(visual: GOUVisual, areas: { [key: string]: WasArea }) {
    this.visual = visual;
    this.areas = areas;
  }
  isUnified() {
    const bossWithoutLast = [
      this.areas.CAVE.boss,
      this.areas.SEA.boss,
      this.areas.VILLAGE.boss,
      this.areas.MOUNTAIN.boss,
    ];
    const persuadeCount = bossWithoutLast.filter(
      (boss) => boss!.isPersuaded
    ).length;
    // 1体以外のボスを説得済みの場合は統率されているとする
    return persuadeCount >= bossWithoutLast.length - 1;
  }
}
