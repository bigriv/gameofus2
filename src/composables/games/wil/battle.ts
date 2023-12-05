import { WilComputer } from "./types/computer";
import { WilOperator } from "./types/operator";
import { WilPlayer } from "./types/player";

export const useWilBattle = () => {
  const judgeBattleResult = (
    player: WilPlayer,
    enemy: WilComputer
  ): WilOperator | null => {
    if (player.magicStone >= 200) {
      return player;
    }
    if (enemy.magicStone >= 200) {
      return enemy;
    }
    return null;
  };

  return {
    judgeBattleResult,
  };
};
