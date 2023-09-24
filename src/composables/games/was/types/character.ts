import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WAS_SKILL } from "@/composables/games/was/defines/skill";
import {
  WAS_BATTLE_MOVE,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
} from "@/composables/games/was/const";
import { WasStatus } from "@/composables/games/was/types/status";
import { WasSkill } from "@/composables/games/was/types/skill";
import { WasItem } from "@/composables/games/was/types/item";

/**
 * WAS用のキャラクタークラス
 */
export class WasCharacter {
  name: string;
  visual: GOUVisual | null;
  status: WasStatus;
  defaultStatus: WasStatus;
  skills: Array<WAS_SKILL_ID>;
  items: Array<{ amount: number; id: WAS_ITEM_ID }>;
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
    items?: Array<{ amount: number; id: WAS_ITEM_ID }>
  ) {
    this.name = name;
    this.visual = visual;
    this.status = status ?? new WasStatus();
    this.defaultStatus = new WasStatus(status.toJson());
    this.skills = skills ?? [];
    this.items = items ?? [];
  }

  /**
   * スキルを使用する
   * @param key スキルのID
   * @returns スキルの使用に成功した場合はtrue、失敗した場合はfalse
   */
  useSkill(skill: WasSkill): boolean {
    // コストの消費
    if (this.status.satiety < skill.cost) {
      return false;
    }
    this.status.satiety -= skill.cost;
    return true;
  }
  /**
   * アイテムを使用する
   * @param key スキルのID
   * @returns アイテムが使用できる状態ならtrue、それ以外はfalse
   */
  useItem(key: WAS_ITEM_ID): boolean | null {
    // アイテムの消費
    const item = this.items.find((item) => item.id == key);
    if (!item) {
      return null;
    }
    if (item.amount <= 0) {
      return false;
    }
    if (item.amount < 100) {
      // アイテムの所持数が１００未満なら消費する
      item.amount--;
    }
    return true;
  }

  /**
   * 指定されたスキルIDのスキルを使用できるか判定する
   * @param skillId スキルID
   * @returns 満腹度が十分ならtrue、それ以外はfalse
   */
  isUsableSkill(skillId: WAS_SKILL_ID): boolean {
    const skill = WAS_SKILL[skillId];
    if (!skill || !this.skills.includes(skillId)) {
      return false;
    }
    return skill.cost <= 0 || this.status.satiety - skill.cost >= 0;
  }

  /**
   * 指定されたアイテムを所持しているかを判定する
   * @param key アイテムのID
   * @returns 所持している場合はtrue、それ以外はfalse
   */
  haveItem(key: WAS_ITEM_ID) {
    const item = this.items.find((item) => item.id == key);
    return item && item.amount > 0;
  }

  /**
   * 所持アイテムに渡されたIDのアイテムを追加する
   * @param key アイテムのID
   * @returns 追加成功時はtrue、失敗時はfalse
   */
  addItem(item: WasItem): boolean {
    let holding = this.items.find((i) => i.id == item.id);
    if (!holding) {
      holding = { amount: 0, id: item.id };
      this.items.push(holding);
    }
    if (holding.amount >= item.maxAmount) {
      return false;
    }
    holding.amount++;
    if (item.passive instanceof Function) {
      // パッシブ効果の適用
      item.passive(this);
    }
    return true;
  }

  /**
   * 戦闘終了時用のステータス初期化処理
   * 体力と満腹度は次回の戦闘に引き継ぐためリセットしない
   */
  resetStatus(): void {
    this.status.attack = this.defaultStatus.attack;
    this.status.defense = this.defaultStatus.defense;
    this.status.speed = this.defaultStatus.speed;
    this.status.magic = this.defaultStatus.magic;
    this.status.element = this.defaultStatus.element;
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
