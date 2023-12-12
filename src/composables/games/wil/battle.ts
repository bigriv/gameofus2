import { WilField } from "./types/field";
import { WIL_BATTLE_TEAM } from "./enums/battle";

export const useWilBattle = () => {
  /**
   * 戦闘の終了判定を行う
   * @param field 盤面
   * @returns 勝利プレイヤー（戦闘が終了しない場合はnull）
   */
  const judgeBattleResult = (field: WilField): WIL_BATTLE_TEAM | null => {
    if (field.getPlayerCharacters().length <= 0) {
      return WIL_BATTLE_TEAM.COMPUTER;
    }
    if (field.getComputerCharacters().length <= 0) {
      return WIL_BATTLE_TEAM.PLAYER;
    }
    return null;
  };

  return {
    judgeBattleResult,
  };
};
