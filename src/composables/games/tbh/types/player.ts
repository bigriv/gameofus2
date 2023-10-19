import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUPosition from "@/composables/types/GOUPosition";
import { TbhCharacter } from "@/composables/games/tbh/types/character";
import { TbhStatus } from "@/composables/games/tbh/types/status";
import { TbhItem } from "@/composables/games/tbh/types/item";
import { TBH_ITEM_ID } from "@/composables/games/tbh/enums/item";

export class TbhPlayer extends TbhCharacter {
  stamina: number;
  justice: number;
  money: number;
  items: Array<TbhItem>;

  constructor(define: {
    stamina: number;
    justice: number;
    visual: GOUVisual;
    status?: TbhStatus;
    money?: number;
  }) {
    super({ visual: define.visual, status: define.status });
    this.stamina = define.stamina;
    this.justice = define.justice;
    this.money = define.money ?? 0;
    this.items = [];
  }

  fluctuateStatus(fluctuation: {
    stamina?: number;
    power?: number;
    justice?: number;
    life?: number;
    money?: number;
  }) {
    if (!fluctuation.stamina || this.stamina + fluctuation.stamina <= 100) {
      this.stamina += fluctuation?.stamina ?? 0;
    } else {
      this.stamina = 100;
    }
    this.defaultStatus.life += fluctuation?.life ?? 0;
    this.status.life += fluctuation?.life ?? 0;
    this.defaultStatus.power += fluctuation?.power ?? 0;
    this.status.power += fluctuation?.power ?? 0;

    if (!fluctuation.justice || this.justice + fluctuation.justice <= 100) {
      this.justice += fluctuation?.justice ?? 0;
    } else {
      this.justice = 100;
    }
    if (!fluctuation.money || this.money + fluctuation.money >= 0) {
      this.money += fluctuation?.money ?? 0;
    } else {
      this.money = 0;
    }
  }

  addItem(items: Array<TbhItem>) {
    console.log(items);
    this.items.push(...items);
    for (const item of items) {
      console.log(item.id, TBH_ITEM_ID.SUIT_LOWER);

      if (item.id == TBH_ITEM_ID.MANT) {
        item.visual.width = 100;
        item.visual.height = (100 / 3) * 2;
        item.visual.zIndex = 1;
        item.visual.setPosition(new GOUPosition(0, 100 / 3));
        this.visual.setChild("mant", item.visual);
      } else if (item.id == TBH_ITEM_ID.MASK) {
        item.visual.width = 100;
        item.visual.height = 100 / 3;
        item.visual.zIndex = 2;
        item.visual.setPosition(new GOUPosition(0, 0));
        this.visual.setChild("head", item.visual);
      } else if (item.id == TBH_ITEM_ID.SUIT_UPPER) {
        item.visual.width = 100;
        item.visual.height = 100 / 3;
        item.visual.zIndex = 2;
        item.visual.setPosition(new GOUPosition(0, 100 / 3));
        this.visual.setChild("upper_body", item.visual);
      } else if (item.id == TBH_ITEM_ID.SUIT_LOWER) {
        item.visual.width = 100;
        item.visual.height = 100 / 3;
        item.visual.zIndex = 2;
        item.visual.setPosition(new GOUPosition(0, (100 / 3) * 2));
        this.visual.setChild("lower_body", item.visual);
      }
    }
    console.log(this.visual);
  }
}
