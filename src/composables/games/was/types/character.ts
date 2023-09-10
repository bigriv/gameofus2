import GOUVisual from "@/composables/types/visuals/GOUVisual";
import WasStatus from "./status";
import { WAS_SKILL, WAS_SKILL_TYPE } from "../skill";
import { WAS_ITEM, WAS_ITEM_TYPE } from "../item";
import { WAS_BATTLE_MOVE } from "../battle";
import { WAS_ITEM_ID, WAS_SKILL_ID } from "../const";

/**
 * WAS用のキャラクタークラス
 */
class WasCharacter {
  name: string;
  visual: GOUVisual | null;
  status: WasStatus;
  defaultStatus: WasStatus;
  skills: Array<WAS_SKILL_ID>;
  items: Array<WAS_ITEM_ID>;
  move?: { target: WasCharacter } & (
    | { type: WAS_BATTLE_MOVE.ITEM; itemId: WAS_ITEM_ID }
    | { type: WAS_BATTLE_MOVE.SKILL; skillId: WAS_SKILL_ID }
    | { type: WAS_BATTLE_MOVE.ATTACK }
  );

  constructor(
    name: string,
    visual: GOUVisual | null,
    status: WasStatus,
    skills?: Array<WAS_SKILL_ID>,
    items?: Array<WAS_ITEM_ID>
  ) {
    this.name = name;
    this.visual = visual;
    this.status = status ?? new WasStatus();
    this.defaultStatus = { ...this.status };
    this.skills = skills ?? [];
    this.items = items ?? [];
  }
  /**
   * 習得している中からスキルを取得する
   * @param key スキルのID
   * @returns スキル(習得していないスキルの場合はnullを返却する)
   */
  getSkill(key: WAS_SKILL_ID): WAS_SKILL_TYPE | null {
    const skill = this.skills.find((skill) => skill == key);
    if (!skill) {
      // 取得していないスキルのIDが指定される場合は実装誤りのためWarnを出力する
      console.warn(
        `Occured in in the method 'getSkill' in the class 'WasCharacter', key which value is '${key}' is not in SKILL_ID.`
      );
      return null;
    }
    return WAS_SKILL[skill];
  }
  /**
   * 所持している中からアイテムを取得する
   * @param key アイテムのID
   * @returns アイテム(所持していないスキルの場合はnullを返却する)
   */
  getItem(key: WAS_ITEM_ID): WAS_ITEM_TYPE | null {
    const item = this.items.find((item) => item == key);
    if (!item) {
      // 取得していないスキルのIDが指定される場合は実装誤りのためWarnを出力する
      console.warn(
        `Occured in in the method 'getItem' in the class 'WasCharacter', key which value is '${key}' is not in ITEM_ID.`
      );
      return null;
    }
    return WAS_ITEM[item];
  }
  /**
   * 戦闘終了時用のステータス初期化処理
   * 体力と満腹度は次回の戦闘に引き継ぐためリセットしない
   */
  resetStatus(): void {
    const life = this.status.life;
    const satiety = this.status.satiety;
    this.status = JSON.parse(JSON.stringify(this.defaultStatus));
    this.status.life = life;
    this.status.satiety = satiety;
  }
}

/**
 * WAS用のPlayer操作キャラクタークラス
 */
class WasPlayerCharacter extends WasCharacter {
  constructor(
    name: string,
    status: WasStatus,
    skills?: Array<WAS_SKILL_ID>,
    items?: Array<WAS_ITEM_ID>
  ) {
    super(name, null, status, skills, items);
  }
}

/**
 * WAS用のNPCクラス
 */
class WasNonPlayerCharacter extends WasCharacter {
  readonly isBoss: boolean;
  dropItem: WAS_ITEM_ID;
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
export { WasCharacter, WasPlayerCharacter, WasNonPlayerCharacter };
