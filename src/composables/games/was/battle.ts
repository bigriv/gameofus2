import {
  WAS_BATTLE_MOVE,
  WAS_BATTLE_STATUS,
  WAS_SKILL_TYPE,
} from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasPlayerCharacter } from "@/composables/games/was/types/palyerCharacter";
import { WAS_ITEM } from "@/composables/games/was/defines/item";
import { WasItem } from "@/composables/games/was/types/item";
import { WasSkill } from "@/composables/games/was/types/skill";
import { WAS_SKILL } from "@/composables/games/was/defines/skill";
import { WasPhysicalAttackSkill } from "@/composables/games/was/types/phisicalAttackSkill";
import { WasMagicalAttackSkill } from "@/composables/games/was/types/magicalAttackSkill";
import { WasHealSkill } from "@/composables/games/was/types/healSkill";
import { WasBuffSkill } from "@/composables/games/was/types/buffSkill";

type WAS_BATTLE_PROGRESS = {
  message: string;
  // sound: GOUAudio;
  // animation: Function;
};

export const useWasBattle = () => {
  const getMoveDetail = (
    character: WasCharacter
  ): WasSkill | WasItem | null => {
    if (!character.move) {
      return null;
    }
    if (character.move.type == WAS_BATTLE_MOVE.SKILL) {
      if (!character.isUsableSkill(character.move.skillId)) {
        return null;
      }
      const skillDefine = WAS_SKILL[character.move.skillId];
      switch (skillDefine.type) {
        case WAS_SKILL_TYPE.PHISICAL_ATTACK:
          return new WasPhysicalAttackSkill(
            skillDefine.name,
            skillDefine.element,
            skillDefine.cost,
            skillDefine.power,
            skillDefine.beforeEffect,
            skillDefine.effect,
            skillDefine.afterEffect
          );
        case WAS_SKILL_TYPE.MAGICAL_ATTACK:
          return new WasMagicalAttackSkill(
            skillDefine.name,
            skillDefine.element,
            skillDefine.cost,
            skillDefine.power,
            skillDefine.beforeEffect,
            skillDefine.effect,
            skillDefine.afterEffect
          );
        case WAS_SKILL_TYPE.HEAL:
          return new WasHealSkill(
            skillDefine.name,
            skillDefine.element,
            skillDefine.cost,
            skillDefine.power,
            skillDefine.beforeEffect,
            skillDefine.effect,
            skillDefine.afterEffect
          );
        case WAS_SKILL_TYPE.BUFF:
          return new WasBuffSkill(
            skillDefine.name,
            skillDefine.element,
            skillDefine.cost,
            skillDefine.beforeEffect,
            skillDefine.effect,
            skillDefine.afterEffect
          );
      }
    }
    if (character.move.type == WAS_BATTLE_MOVE.ITEM) {
      if (!character.haveItem(character.move.itemId)) {
        return null;
      }
      return new WasItem(
        character.move.itemId,
        WAS_ITEM[character.move.itemId].name,
        WAS_ITEM[character.move.itemId].maxAmount,
        WAS_ITEM[character.move.itemId].passive,
        WAS_ITEM[character.move.itemId].beforeEffect,
        WAS_ITEM[character.move.itemId].effect,
        WAS_ITEM[character.move.itemId].afterEffect
      );
    }
    return null;
  };

  /**
   * 各キャラクターの発動スキル・使用アイテムによって事前処理を行う
   * @param characters 戦闘に参加している全キャラクターのリスト
   */
  const preProcess = (characters: Array<WasCharacter>) => {
    characters.forEach((character) => {
      const moveDetail = getMoveDetail(character);
      if (!moveDetail) {
        return;
      }

      if (moveDetail.beforeEffect instanceof Function) {
        // getMove内でcharacter.moveのnullチェックをしているため、targetに強制アクセスする
        moveDetail.beforeEffect(character, character.move!.target);
      }
    });
  };

  /**
   * 各キャラクターの発動スキル・使用アイテムによって事後処理を行う
   * @param characters 戦闘に参加している全キャラクターのリスト
   */
  const postProcess = (characters: Array<WasCharacter>) => {
    characters.forEach((character) => {
      const moveDetail = getMoveDetail(character);
      if (!moveDetail) {
        return;
      }
      if (moveDetail.afterEffect instanceof Function) {
        // getMove内でcharacter.moveのnullチェックをしているため、targetに強制アクセスする
        moveDetail.afterEffect(character, character.move!.target);
      }
    });
  };

  /**
   * 戦闘に勝利したかを判定する
   * @param player プレイヤーキャラクター
   * @param enemy 敵キャラクター
   * @returns プレイヤーの体力が0以下または敵の体力が0より大きい場合はfalse それ以外はtrue
   */
  const isBattleWin = (player: WasCharacter, enemy: WasCharacter): boolean => {
    if (player.status.life <= 0) {
      return false;
    }
    return enemy.status.life <= 0;
  };

  /**
   * 戦闘に敗北したかを判定する
   * @param player プレイヤーキャラクター
   * @returns プレイヤーの体力が0以下の場合はtrue それ以外はfalse
   */
  const isBattleLose = (player: WasCharacter): boolean => {
    return player.status.life <= 0;
  };

  /**
   * 通常攻撃によるダメージの計算を行う
   * @param attacker 攻撃者
   * @param target 攻撃対象
   * @returns 与えるダメージ
   */
  const calcAttackDamage = (
    attacker: WasCharacter,
    target: WasCharacter
  ): number => {
    let damage =
      attacker.status.attack - Math.floor(target.status.defense * 0.5);
    if (damage < 0) {
      damage = 0;
    }
    // ダメージの10%を最大値とする乱数を加算して返却
    // ダメージが0の場合でも50%の確率でダメージが発生するように1を加算する
    return (
      damage +
      Math.floor(damage * 0.1 * Math.random()) +
      (Math.random() < 0.5 ? 0 : 1)
    );
  };

  /**
   * 戦闘のメイン処理
   * @param player プレイヤー
   * @param enemy 敵キャラ
   * @returns 画面表示用の戦闘の結果
   */
  const battle = (player: WasPlayerCharacter, enemy: WasNonPlayerCharacter) => {
    let status = WAS_BATTLE_STATUS.ANOTHER;
    let progressList = new Array<WAS_BATTLE_PROGRESS>();
    //  スキル・アイテムによる事前処理を実行
    const characters = [player, enemy];
    preProcess(characters);

    // 速さ順に並び変える
    const sortedCharacters = characters.sort(
      (a, b) => a.status.speed - b.status.speed
    );

    let isBattleEnd = false;
    // 速さ順に各キャラクターの行動を実行
    for (const character of sortedCharacters) {
      if (character.status.life <= 0) {
        //  ライフが0のキャラクターは飛ばす
        continue;
      }
      const moveDetail = getMoveDetail(character);
      const target = character.move?.target;
      if (!target) {
        continue;
      }
      if (moveDetail instanceof WasSkill) {
        // スキル使用時の処理
        const skill = moveDetail;
        const useResult = character.useSkill(skill);

        if (!useResult) {
          progressList.push({
            message: `${character.name}は${skill.name}を使おうとしたが、力が出なかった。`,
          });
          continue;
        }
      } else if (moveDetail instanceof WasItem) {
        // アイテム使用時の処理
        const item = moveDetail;
        if (!(item.effect instanceof Function)) {
          progressList.push({
            message: `${character.name}は意味のない行動をした。`,
          });
          continue;
        }

        const useResult = character.useItemInBattle(moveDetail.id);
        if (!useResult) {
          progressList.push({
            message: `${character.name}は${item.name}を使おうとしたが、持っていないかった。`,
          });
          continue;
        }

        progressList.push({
          message: `${character.name}は${item.name}を使用した！`,
        });

        const result = item.effect(character, target);
        if (!result) {
          continue;
        }
        // 結果詰め込み処理
        progressList.push({
          message: result,
        });
      } else {
        // 通常攻撃時の処理
        const damage = calcAttackDamage(character, target);
        target.status.life -= damage;
        if (target.status.life < 0) {
          // 体力がマイナスになった場合はバグ回避のため明示的に0にする
          target.status.life = 0;
        }

        // 結果詰め込み処理
        if (character instanceof WasPlayerCharacter) {
          progressList.push({
            message: `${target.name}に${damage}のダメージを与えた！`,
          });
        } else if (character instanceof WasNonPlayerCharacter) {
          progressList.push({
            message: `${target.name}は${damage}のダメージを受けた。`,
          });
        }
      }

      // 戦闘終了判定
      if (isBattleLose(player)) {
        isBattleEnd = true;
        progressList.push({
          message: "戦闘に敗北した...。",
        });
        status = WAS_BATTLE_STATUS.LOSE;
        break;
      }

      if (isBattleWin(player, enemy)) {
        isBattleEnd = true;
        progressList.push({
          message: "戦闘に勝利した！",
        });
        status = WAS_BATTLE_STATUS.WIN;
        break;
      }
    }

    if (isBattleEnd) {
      //  戦闘が終了している場合は全キャラクターのステータスをリセットする
      characters.forEach((character) => character.resetStatus());
    }
    if (!isBattleEnd) {
      //  戦闘が継続される場合はスキル・アイテムによる事後処理を実行
      postProcess(characters);
    }

    return { status: status, progresses: progressList };
  };

  return {
    battle,
  };
};
