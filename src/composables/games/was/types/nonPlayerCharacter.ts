import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WAS_ITEM_ID, WAS_SKILL_ID } from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasStatus } from "@/composables/games/was/types/status";

/**
 * WAS用のNPCクラス
 */
export class WasNonPlayerCharacter extends WasCharacter {
  readonly isBoss: boolean;
  readonly dropItem: WAS_ITEM_ID | null;
  readonly serif: {
    FACE1: Array<string>;
    FACE2?: Array<string>;
    BATTLE_WIN: Array<string>;
    PERSUADE_SUCCESS: Array<string>;
    CHAT?: Array<string>;
  };
  readonly persuadItem: WAS_ITEM_ID | null;
  isPersuaded: boolean;
  readonly occupySkill: WAS_SKILL_ID | null;
  readonly chooseMove: Function;
  constructor(
    name: string,
    visual: GOUVisual,
    status: WasStatus,
    isBoss: boolean,
    dropItem: WAS_ITEM_ID,
    persuadItem: WAS_ITEM_ID | null,
    occupySkill: WAS_SKILL_ID | null,
    chooseMove: Function,
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
    this.chooseMove = chooseMove;
    this.serif = serif;
    this.isPersuaded = false;
  }

  setBattleMove(self: WasCharacter, enemy: WasCharacter) {
    this.move = this.chooseMove(self, enemy);
  }
  /**
   * 保持データをjson形式に変換する
   * @returns json形式のデータ
   */
  toJson() {
    const json = super.toJson();
    return Object.assign(json, {
      isPersuaded: this.isPersuaded,
    });
  }
}
