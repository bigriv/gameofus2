import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { TBH_ITEM_ID } from "@/composables/games/tbh/enums/item";

export class TbhItem {
  id: TBH_ITEM_ID;
  visual: GOUVisual;
  name: string;
  detail: string;
  price: number;

  constructor(define: {
    id: TBH_ITEM_ID;
    visual: GOUVisual;
    name: string;
    detail: string;
    price: number;
  }) {
    this.id = define.id;
    this.visual = define.visual;
    this.name = define.name;
    this.detail = define.detail;
    this.price = define.price;
  }
}
