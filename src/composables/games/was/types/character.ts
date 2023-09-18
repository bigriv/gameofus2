import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WAS_SKILL } from "@/composables/games/was/defines/skill";
import { WAS_ITEM, WAS_ITEM_TYPE } from "@/composables/games/was/defines/item";
import { WAS_BATTLE_MOVE, WAS_ITEM_ID, WAS_SKILL_ID } from "@/composables/games/was/const";
import { WasStatus } from "@/composables/games/was/types/status";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";

/**
 * WAS用のキャラクタークラス
 */
export class WasCharacter {
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
    this.defaultStatus = new WasStatus(status.toJson());
    this.skills = skills ?? [];
    this.items = items ?? [];
  }
  /**
   * 習得している中からスキルを取得する
   * @param key スキルのID
   * @returns スキル(習得していないスキルの場合はnullを返却する)
   */
  getSkill(key: WAS_SKILL_ID) {
    const skill = this.skills.find((skill) => skill == key);
    if (!skill) {
      throw new WrongImplementationError(
        `Occured in in the method 'getSkill' in the class 'WasCharacter', key which value is '${key}' is not in SKILL_ID.`
      );
    }
    if (this.status.satiety - WAS_SKILL[skill].cost < 0) {
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
    this.status = JSON.parse(JSON.stringify(this.defaultStatus)) as WasStatus;
    this.status.life = life;
    this.status.satiety = satiety;
  }

  /**
   * 保持データをjson形式に変換する
   * @returns json形式のデータ
   */
  toJson() {
    return {
      name: this.name,
      status: this.status.toJson(),
      defaultStatus: this.defaultStatus.toJson(),
    };
  }
}
