import { WAS_ITEM_ID, WAS_SKILL_ID } from "../const";
import { WasCharacter } from "./character";
import WasStatus from "./status";

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
}
