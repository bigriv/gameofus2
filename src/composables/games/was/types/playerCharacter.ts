import {
  WAS_BATTLE_MOVE,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
} from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasStatus } from "@/composables/games/was/types/status";
import { WasArea } from "@/composables/games/was/types/area";
import { WasSkill } from "@/composables/games/was/types/skill";
import { WasItem } from "@/composables/games/was/types/item";
import { WasHealSkill } from "@/composables/games/was/types/healSkill";
import { WasBuffSkill } from "@/composables/games/was/types/buffSkill";

/**
 * WAS用のPlayer操作キャラクタークラス
 */
export class WasPlayerCharacter extends WasCharacter {
  exploreCount: number;
  constructor(
    name: string,
    status: WasStatus,
    skills?: Array<WAS_SKILL_ID>,
    items?: Array<{ amount: number; id: WAS_ITEM_ID }>
  ) {
    super(name, null, status, skills, items);
    this.exploreCount = 0;
  }

  /**
   * 戦闘時の行動をセットする
   * @param self 自身
   * @param enemy 敵キャラクター
   * @param move 選択された行動タイプ（スキル・アイテムの場合はIDも渡される）
   */
  setBattleMove(
    self: WasCharacter,
    enemy: WasCharacter,
    move:
      | { type: WAS_BATTLE_MOVE.ATTACK }
      | { type: WAS_BATTLE_MOVE.SKILL; skill: WasSkill }
      | { type: WAS_BATTLE_MOVE.ITEM; item: WasItem }
  ) {
    switch (move.type) {
      case WAS_BATTLE_MOVE.ATTACK:
        this.move = {
          type: WAS_BATTLE_MOVE.ATTACK,
          target: enemy,
        };
        break;
      case WAS_BATTLE_MOVE.SKILL:
        let target = enemy;
        const skill = move.skill;
        if (
          skill instanceof WasHealSkill || skill instanceof WasBuffSkill
        ) {
          // サポートスキルは対象を自身に書き換える
          target = self;
        }
        this.move = {
          type: WAS_BATTLE_MOVE.SKILL,
          target: target,
          skillId: move.skill.id,
        };
        break;
      case WAS_BATTLE_MOVE.ITEM:
        this.move = {
          type: WAS_BATTLE_MOVE.ITEM,
          target: self,
          itemId: move.item.id,
        };
        break;
    }
  }

  /**
   * 探索処理
   * @param area 探索するエリア
   * @returns エンカウント時はキャラクター、ドロップ判定にかかればアイテム、それ以外はnull
   */
  explore(area: WasArea): WasCharacter | WAS_ITEM_ID | null {
    // 満腹度を消費
    this.status.satiety -= 5;
    // 探索回数を加算
    this.exploreCount++;
    return area.explore();
  }

  /**
   * 探索回数をもとにステータスの上昇値を計算する
   * @param min 探索1回あたりに上昇する値の最小値
   * @param max 探索1回あたりに上昇する値の最大値
   * @returns 算出した上昇値
   */
  calcRiseStatusValue = (min: number, max: number) => {
    const base = Math.round((Math.random() * (max - min) + min) * 100) / 100;
    return Math.round(base * this.exploreCount);
  };

  /**
   * ステータスを上昇させる
   */
  riseStatus() {
    console.log("before", this.defaultStatus);
    this.defaultStatus.life += this.calcRiseStatusValue(3, 5);
    this.defaultStatus.attack += this.calcRiseStatusValue(0.4, 0.6);
    this.defaultStatus.defense += this.calcRiseStatusValue(0.4, 0.6);
    this.defaultStatus.speed += this.calcRiseStatusValue(0.4, 0.6);
    this.defaultStatus.magic += this.calcRiseStatusValue(0.4, 0.6);
    this.resetStatus();

    this.exploreCount = 0;
    console.log("after", this.defaultStatus);
  }

  /**
   * 保持データをjson形式に変換する
   * @returns json形式のデータ
   */
  toJson() {
    const json = super.toJson();
    return Object.assign(json, {
      exploreCount: this.exploreCount,
      skills: this.skills,
      items: this.items,
    });
  }
}
