import { WilCharacter } from "./types/character";
import { WilField } from "./types/field";
import { WIL_BATTLE_TEAM } from "./enums/battle";
import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";

export const useWilBattle = () => {
  /**
   * 戦闘の終了判定を行う
   * @param player プレイヤー
   * @param enemy 相手プレイヤー
   * @returns 勝利プレイヤー（戦闘が終了しない場合はnull）
   */
  const judgeBattleResult = (field: WilField): WIL_BATTLE_TEAM | null => {
    if (field.getPlayerCharacters().length <= 0) {
      return WIL_BATTLE_TEAM.ENEMY;
    }
    if (field.getEnemyCharacters().length <= 0) {
      return WIL_BATTLE_TEAM.PLAYER;
    }
    return null;
  };

  /**
   * プレイヤーと戦闘相手の最速行動可能キャラクターを比較して、次のターンプレイヤーを取得する
   * @param playerFastCharacter プレイヤーの最速行動可能キャラクター
   * @param enemyFastCharacter 戦闘相手の最速行動可能キャラクター
   * @returns 次の戦闘タイミング
   */
  const getMoveTurn = (
    field: WilField,
    fastCharacter: WilCharacter
  ): WIL_BATTLE_TEAM => {
    if (
      field
        .getPlayerCharacters()
        .find((character) => character.id === fastCharacter.id)
    ) {
      return WIL_BATTLE_TEAM.PLAYER;
    }
    if (
      field
        .getEnemyCharacters()
        .find((character) => character.id === fastCharacter.id)
    ) {
      return WIL_BATTLE_TEAM.ENEMY;
    }

    throw new WrongImplementationError("Couldn't get a move player.");
  };

  return {
    judgeBattleResult,
    getMoveTurn,
  };
};
