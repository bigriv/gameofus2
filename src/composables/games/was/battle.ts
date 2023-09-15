import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WAS_BATTLE_MOVE, WAS_BATTLE_STATUS } from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasPlayerCharacter } from "@/composables/games/was/types/palyerCharacter";

type WAS_BATTLE_PROGRESS = {
  message: string;
  // sound: GOUAudio;
  // animation: Function;
};

export const useWasBattle = () => {
  /**
   * 各キャラクターの発動スキル・使用アイテムによって事前処理を行う
   * @param characters 戦闘に参加している全キャラクターのリスト
   */
  const preProcess = (characters: Array<WasCharacter>) => {
    characters.forEach((character) => {
      if (!character.move) {
        return;
      }
      let move = null;
      if (character.move.type == WAS_BATTLE_MOVE.SKILL) {
        move = character.getSkill(character.move.skillId);
        // 満腹度が足りていない場合はスキップ
        if (character.status.satiety < (move?.cost ?? 0)) {
          return;
        }
      }
      if (character.move.type == WAS_BATTLE_MOVE.ITEM) {
        move = character.getItem(character.move.itemId);
      }
      if (!move) {
        return;
      }

      if (move.beforeEffect instanceof Function) {
        move.beforeEffect(character, character.move.target);
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
    let damage = attacker.status.attack - target.status.defense;
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
      if (!character.move) {
        throw new WrongImplementationError("Character move is not set.");
      }
      if (character.move.type == WAS_BATTLE_MOVE.ITEM) {
        // アイテム使用時の処理
        const item = character.getItem(character.move.itemId);
        if (!item) {
          throw new WrongImplementationError(
            `Item is not found. itemId: ${character.move.itemId}`
          );
        }
        if (!(item.effect instanceof Function)) {
          progressList.push({
            message: `${item.name}は今使っても効果がない。`,
          });
          continue;
        }
        progressList.push({
          message: `${character.name}は${item.name}を使用した！`,
        });

        const result = item.effect(character, character.move.target);
        if (!result.length) {
          continue;
        }
        // 結果詰め込み処理
        progressList.push({
          message: result,
        });
      } else if (character.move.type == WAS_BATTLE_MOVE.SKILL) {
        // スキル使用時の処理
        const skill = character.getSkill(character.move.skillId);
        if (!skill) {
          throw new WrongImplementationError(
            `Skill is not found. skillId: ${character.move.skillId}`
          );
        }

        // コストの消費
        if (character.status.satiety < skill.cost) {
          progressList.push({
            message: `${character.name}は${skill.name}を発動する力が出ない。`,
          });
          continue;
        }
        character.status.satiety -= skill.cost;
        progressList.push({
          message: `${character.name}は${skill.name}を発動した！`,
        });

        // ダメージ計算
        const target = character.move.target;
        const damage = skill.calcDamage(character, target);
        target.status.life -= damage;
        if (damage < 0) {
          // ダメージがマイナスの場合は回復処理を行う
          if (target.status.life > target.defaultStatus.life) {
            // 体力が初期値を超えた場合は初期値を入れなおす
            target.status.life = target.defaultStatus.life;
          }

          // 結果詰め込み処理
          progressList.push({
            message: `${target.name}は体力を${-damage}回復した`,
          });
        } else {
          // ダメージがプラスの場合は攻撃処理を行う
          if (target.status.life < 0) {
            // 体力がマイナスになった場合はバグ回避のため明示的に0にする
            target.status.life = 0;
          }

          // 結果詰め込み処理
          if (character instanceof WasPlayerCharacter) {
            progressList.push({
              message: `${character.move.target.name}に${damage}のダメージを与えた！`,
            });
          } else if (character instanceof WasNonPlayerCharacter) {
            progressList.push({
              message: `${character.move.target.name}は${damage}のダメージを受けた。`,
            });
          }
        }

        // 追加効果処理
        if (!(skill.effect instanceof Function)) {
          continue;
        }
        const result = skill.effect(character, target);
        if (!result.length) {
          continue;
        }
        // 結果詰め込み処理
        progressList.push({
          message: result,
        });
      } else if (character.move?.type == WAS_BATTLE_MOVE.ATTACK) {
        // 通常攻撃時の処理
        const damage = calcAttackDamage(character, character.move.target);
        character.move.target.status.life -= damage;
        if (character.move.target.status.life < 0) {
          // 体力がマイナスになった場合はバグ回避のため明示的に0にする
          character.move.target.status.life = 0;
        }

        // 結果詰め込み処理
        if (character instanceof WasPlayerCharacter) {
          progressList.push({
            message: `${character.move.target.name}に${damage}のダメージを与えた！`,
          });
        } else if (character instanceof WasNonPlayerCharacter) {
          progressList.push({
            message: `${character.move.target.name}は${damage}のダメージを受けた。`,
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
      characters.forEach((character) => {
        if (!character.move) {
          return;
        }
        let move = null;
        if (character.move.type == WAS_BATTLE_MOVE.SKILL) {
          move = character.getSkill(character.move.skillId);
          // 満腹度が足りていない場合はスキップ
          if (character.status.satiety < (move?.cost ?? 0)) {
            return;
          }
        }
        if (character.move.type == WAS_BATTLE_MOVE.ITEM) {
          move = character.getItem(character.move.itemId);
        }
        if (!move) {
          return;
        }
        if (move.afterEffect instanceof Function) {
          move.afterEffect(character, character.move.target);
        }
      });
    }

    return { status: status, progresses: progressList };
  };

  return {
    battle,
  };
};
