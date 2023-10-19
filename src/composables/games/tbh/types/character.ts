import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { TbhStatus } from "@/composables/games/tbh/types/status";

export class TbhCharacter {
  visual: GOUVisual;
  status: TbhStatus;
  defaultStatus: TbhStatus;

  constructor(define: { visual: GOUVisual; status?: TbhStatus }) {
    this.visual = define.visual;
    this.status = define.status ?? new TbhStatus();
    this.defaultStatus = new TbhStatus(this.status.toJson());
  }

  resetStatus() {
    this.status.power = this.defaultStatus.power;
    this.status.life = this.defaultStatus.life;
  }
}
