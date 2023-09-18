import {
  WAS_BATTLE_MOVE,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
  WAS_SKILL_TYPE,
} from "@/composables/games/was/const";
import { WAS_SKILL } from "@/composables/games/was/defines/skill";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasStatus } from "@/composables/games/was/types/status";

/**
 * WAS用のPlayer操作キャラクタークラス
 */
export class WasPlayerCharacter extends WasCharacter {
  constructor(
    name: string,
    status: WasStatus,
    skills?: Array<WAS_SKILL_ID>,
    items?: Array<WAS_ITEM_ID>
  ) {
    super(name, null, status, skills, items);
  }

  setBattleMove(
    self: WasCharacter,
    enemy: WasCharacter,
    move:
      | { type: WAS_BATTLE_MOVE.ATTACK }
      | { type: WAS_BATTLE_MOVE.SKILL; skillId: WAS_SKILL_ID }
      | { type: WAS_BATTLE_MOVE.ITEM; itemId: WAS_ITEM_ID }
  ) {
    let target;
    switch (move.type) {
      case WAS_BATTLE_MOVE.ATTACK:
        this.move = {
          type: WAS_BATTLE_MOVE.ATTACK,
          target: enemy,
        };
        break;
      case WAS_BATTLE_MOVE.SKILL:
        const skill = WAS_SKILL[move.type];
        if (
          skill.type == WAS_SKILL_TYPE.HEAL ||
          skill.type == WAS_SKILL_TYPE.BUFF
        ) {
          // サポートスキルは対象をプレイヤーに書き換える
          target = self;
        }
        this.move = {
          type: WAS_BATTLE_MOVE.SKILL,
          target: self,
          skillId: move.skillId,
        };
        break;
      case WAS_BATTLE_MOVE.ITEM:
        this.move = {
          type: WAS_BATTLE_MOVE.ITEM,
          target: self,
          itemId: move.itemId,
        };
        break;
    }
  }
  /**
   * 保持データをjson形式に変換する
   * @returns json形式のデータ
   */
  toJson() {
    const json = super.toJson();
    return Object.assign(json, {
      skills: this.skills,
      items: this.items,
    });
  }
}
