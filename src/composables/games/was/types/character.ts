import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WAS_SKILL } from "@/composables/games/was/defines/skill";
import { WAS_ITEM } from "@/composables/games/was/defines/item";
import {
  WAS_BATTLE_MOVE,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
  WAS_SKILL_TYPE,
} from "@/composables/games/was/const";
import { WasStatus } from "@/composables/games/was/types/status";
import { WasSkill } from "@/composables/games/was/types/skill";
import { WasPhysicalAttackSkill } from "@/composables/games/was/types/phisicalAttackSkill";
import { WasMagicalAttackSkill } from "@/composables/games/was/types/magicalAttackSkill";
import { WasHealSkill } from "@/composables/games/was/types/healSkill";
import { WasBuffSkill } from "@/composables/games/was/types/buffSkill";
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
   * アイテムを使用する（バトル中）
   * @param key スキルのID
   */
  useItemInBattle(key: WAS_ITEM_ID): boolean | null {
    // アイテムの消費
    const item = this.items.find((item) => item.id == key);
    if (!item) {
      return null;
    }
    if (item.amount <= 0) {
      return false;
    }
    if (item.amount < 100) {
      // （アイテムを１００個以上所持している場合は消費しない）
      item.amount--;
    }
    return true;
  }
  /**
   * 習得している中からスキルを取得する
   * @param key スキルのID
   * @returns スキル(習得していないスキルの場合はnullを返却する)
   */
  getSkill(key: WAS_SKILL_ID): WasSkill | null {
    const skillId = this.skills.find((skill) => skill == key);
    if (!skillId) {
      return null;
    }
    const skillDefine = WAS_SKILL[skillId];

    let skill: WasSkill;
    switch (skillDefine.type) {
      case WAS_SKILL_TYPE.PHISICAL_ATTACK:
        skill = new WasPhysicalAttackSkill(
          skillDefine.name,
          skillDefine.element,
          skillDefine.cost,
          skillDefine.power,
          skillDefine.beforeEffect,
          skillDefine.effect,
          skillDefine.afterEffect
        );
        break;
      case WAS_SKILL_TYPE.MAGICAL_ATTACK:
        skill = new WasMagicalAttackSkill(
          skillDefine.name,
          skillDefine.element,
          skillDefine.cost,
          skillDefine.power,
          skillDefine.beforeEffect,
          skillDefine.effect,
          skillDefine.afterEffect
        );
        break;
      case WAS_SKILL_TYPE.HEAL:
        skill = new WasHealSkill(
          skillDefine.name,
          skillDefine.element,
          skillDefine.cost,
          skillDefine.power,
          skillDefine.beforeEffect,
          skillDefine.effect,
          skillDefine.afterEffect
        );
        break;
      case WAS_SKILL_TYPE.BUFF:
        skill = new WasBuffSkill(
          skillDefine.name,
          skillDefine.element,
          skillDefine.cost,
          skillDefine.beforeEffect,
          skillDefine.effect,
          skillDefine.afterEffect
        );
        break;
    }
    return skill;
  }
  /**
   * 所持している中からアイテムを取得する
   * @param key アイテムのID
   * @returns アイテム(所持していないアイテムの場合はnullを返却する)
   */
  getItem(key: WAS_ITEM_ID) {
    const item = this.items.find((item) => item.id == key);
    if (!item || item.amount <= 0) {
      return null;
    }
    const itemDefine = WAS_ITEM[item.id];
    return new WasItem(
      itemDefine.name,
      itemDefine.passive,
      itemDefine.beforeEffect,
      itemDefine.effect,
      itemDefine.afterEffect
    );
  }
  /**
   * アイテムを追加する
   * @param key アイテムのID
   * @returns
   */
  addItem(key: WAS_ITEM_ID) {
    let item = this.items.find((item) => item.id == key);
    if (!item) {
      this.items.push({ amount: 1, id: key });
      return;
    }
    if (item.amount >= 100) {
      return;
    }
    item.amount++;
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
