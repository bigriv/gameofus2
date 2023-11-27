import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WAS_EVENT_TIMMING } from "../const";
import WAS_SERIF_DEFINE from "../defines/serif";
import { WasCharacter } from "./character";
import { WasNonPlayerCharacter } from "./nonPlayerCharacter";
import { WasStatus } from "./status";
import { WasMap } from "./map";

export class WasPrincess extends WasCharacter {
  constructor(name: string, visual: GOUVisual) {
    super(name, visual, new WasStatus());
  }
  getSerif(timming: WAS_EVENT_TIMMING, map: WasMap): Array<string> {
    switch (timming) {
      case WAS_EVENT_TIMMING.OPENING:
        return [...WAS_SERIF_DEFINE.PRINCESS_OPENING];
      case WAS_EVENT_TIMMING.AFTER_OPENING1:
        return [
          ...WAS_SERIF_DEFINE.PRINCESS_AFTER_OPENING1,
          ...WAS_SERIF_DEFINE.PRINCESS_AFTER_OPENING2,
        ];
      case WAS_EVENT_TIMMING.AFTER_OPENING2:
        return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_OPENING2];
      case WAS_EVENT_TIMMING.AFTER_CLEAR_CAVE:
        if ((map.areas.CAVE.boss as WasNonPlayerCharacter)!.isPersuaded) {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE1];
        } else {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_CAVE2];
        }
      case WAS_EVENT_TIMMING.AFTER_CLEAR_SEA:
        if ((map.areas.SEA.boss as WasNonPlayerCharacter)!.isPersuaded) {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_SEA1];
        } else {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_SEA2];
        }
      case WAS_EVENT_TIMMING.AFTER_CLEAR_VILLAGE:
        if ((map.areas.VILLAGE.boss as WasNonPlayerCharacter)!.isPersuaded) {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_VILLAGE1];
        } else {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_VILLAGE2];
        }
      case WAS_EVENT_TIMMING.AFTER_CLEAR_MOUNTAIN:
        if ((map.areas.MOUNTAIN.boss as WasNonPlayerCharacter)!.isPersuaded) {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_MOUNTAIN1];
        } else {
          return [...WAS_SERIF_DEFINE.PRINCESS_AFTER_MOUNTAIN2];
        }
        break;
      case WAS_EVENT_TIMMING.AFTER_CLEAR_ALL_AREA:
        if (map.isUnified()) {
          return [...WAS_SERIF_DEFINE.PRINCESS_BEFORE_LAST_AREA1];
        } else {
          return [...WAS_SERIF_DEFINE.PRINCESS_BEFORE_LAST_AREA2];
        }
      case WAS_EVENT_TIMMING.AFTER_CLEAR_KINGDOM_CASTLE:
        if (
          (map.areas.KINGDOM_CASTLE.boss as WasNonPlayerCharacter)!.isPersuaded
        ) {
          return [...WAS_SERIF_DEFINE.PRINCESS_GOOD_END];
        } else if (map.isUnified()) {
          if (
            (map.areas.KINGDOM_CASTLE.character as WasNonPlayerCharacter)!
              .isPersuaded
          ) {
            return [...WAS_SERIF_DEFINE.PRINCESS_BEST_END];
          } else {
            return [...WAS_SERIF_DEFINE.PRINCESS_BAD_END];
          }
        }

        return [...WAS_SERIF_DEFINE.PRINCESS_WORST_END];
    }
  }
}
