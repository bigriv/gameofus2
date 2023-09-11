import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WAS_ITEM_ID, WAS_SKILL_ID } from "../const";
import { WasCharacter } from "./character";
import WasStatus from "./status";

/**
 * WAS用のNPCクラス
 */
export class WasNonPlayerCharacter extends WasCharacter {
  readonly isBoss: boolean;
  dropItem: WAS_ITEM_ID | null;
  serif: {
    FACE1: Array<string>;
    FACE2?: Array<string>;
    BATTLE_WIN: Array<string>;
    PERSUADE_SUCCESS: Array<string>;
    CHAT?: Array<string>;
  };
  persuadItem: WAS_ITEM_ID | null;
  isPersuaded: boolean;
  occupySkill: WAS_SKILL_ID | null;
  constructor(
    name: string,
    visual: GOUVisual,
    status: WasStatus,
    isBoss: boolean,
    dropItem: WAS_ITEM_ID,
    persuadItem: WAS_ITEM_ID | null,
    occupySkill: WAS_SKILL_ID | null,
    serif: {
      FACE1: Array<string>;
      FACE2?: Array<string>;
      BATTLE_WIN: Array<string>;
      PERSUADE_SUCCESS: Array<string>;
      CHAT?: Array<string>;
    },
    skills?: Array<WAS_SKILL_ID>
  ) {
    super(name, visual, status, skills);
    this.isBoss = isBoss;
    this.dropItem = dropItem;
    this.persuadItem = persuadItem;
    this.occupySkill = occupySkill;
    this.serif = serif;
    this.isPersuaded = false;
  }
}
