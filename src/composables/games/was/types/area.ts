import GOUPosition from "@/composables/types/GOUPosition";
import {
  GAME_DISPLAY_HEIGHT,
  GAME_DISPLAY_WIDTH,
  WAS_ITEM_ID,
} from "@/composables/games/was/const";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";

export class WasArea {
  readonly name: string;
  readonly outside: GOUVisual;
  readonly inside: GOUVisual;
  readonly character: WasCharacter;
  readonly boss?: WasCharacter;
  isClear: boolean;
  dropItems: Array<{
    probability: number;
    amount: number;
    id: WAS_ITEM_ID;
  }>;
  constructor(
    name: string,
    outside: GOUVisual,
    inside: GOUVisual,
    character: WasCharacter,
    boss?: WasCharacter,
    dropItems?: Array<{ probability: number; amount: number; id: WAS_ITEM_ID }>
  ) {
    this.name = name;
    this.outside = outside;
    this.inside = inside;
    this.character = character;
    if (this.character.visual) {
      // キャラクターを画面中央に配置
      this.character.visual.move(
        new GOUPosition(
          GAME_DISPLAY_WIDTH / 2 - this.character.visual.getMaxX() / 2,
          GAME_DISPLAY_HEIGHT - this.character.visual.getMaxY()
        )
      );
    }
    this.boss = boss;
    if (this.boss && this.boss.visual) {
      // キャラクターを画面中央に配置
      this.boss.visual.move(
        new GOUPosition(
          GAME_DISPLAY_WIDTH / 2 - this.boss.visual.getMaxX() / 2,
          GAME_DISPLAY_HEIGHT - this.boss.visual.getMaxY()
        )
      );
    }
    this.dropItems = dropItems ?? [];
    this.isClear = false;
  }

  // 進行状況に応じてキャラクターを返す
  encount() {
    // ボスが設定されていない場合は会話のみのエリアとみなして、キャラクターを強制で返す
    if (!this.boss) {
      return this.character;
    }

    const boss = this.boss as WasNonPlayerCharacter;
    const character = this.character as WasNonPlayerCharacter;
    if (boss.status.life <= 0 && !boss.isPersuaded) {
      // ボスが未説得で倒されている場合は何も表示しない
      return null;
    } else if (character.isPersuaded || character.status.life <= 0) {
      // 雑魚敵だけが倒されているまたは説得済みの場合はボスキャラを表示
      return boss;
    } else {
      // 上記以外は雑魚敵を表示
      return character;
    }
  }

  /**
   * ドロップするアイテムを返す
   * @returns ドロップしたアイテム（ドロップしない場合はnullを返却する）
   */
  drop(): WAS_ITEM_ID | null {
    for (const dropItem of this.dropItems) {
      const dropRnd = Math.random();
      if (dropItem.amount > 0 && dropRnd < dropItem.probability) {
        dropItem.amount--;
        return dropItem.id;
      }
    }
    return null;
  }

  /**
   * 保持データをjson形式に変換する
   * @returns json形式のデータ
   */
  toJson() {
    return {
      isClear: this.isClear,
      dropItems: this.dropItems,
    };
  }
}
