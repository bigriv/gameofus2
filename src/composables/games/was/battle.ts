import { WAS_ELEMENT } from "./const";
import { WAS_SKILL_TYPE } from "./skill";
import { WasCharacter } from "./types/character";
import { WasNonPlayerCharacter } from "./types/nonPlayerCharacter";
import { WasPlayerCharacter } from "./types/palyerCharacter";

enum WAS_BATTLE_MOVE {
  ATTACK,
  SKILL,
  ITEM,
}

enum WAS_BATTLE_STATUS {
  WIN,
  LOSE,
  ANOTHER,
}
type WAS_BATTLE_PROGRESS = {
  message: string;
  // sound: GOUAudio;
  // animation: Function;
};
/**
 * 戦闘のUtilクラス
 */
class WasBattleUtil {
  /**
   * １ターンを処理する
   * @param characters 戦闘に参加している全キャラクター（戦闘不能のキャラクターを含めて良い）
   * @returns 各行動の結果リスト
   */
  static mainFlow(
    player: WasPlayerCharacter,
    enemy: WasNonPlayerCharacter
  ): { status: WAS_BATTLE_STATUS; progresses: Array<WAS_BATTLE_PROGRESS> } {
    let status = WAS_BATTLE_STATUS.ANOTHER;
    let progressList: Array<WAS_BATTLE_PROGRESS> = [];
    //  スキル・アイテムによる事前処理を実行
    const characters = [player, enemy];
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

    // 速さ順に並び変える
    const sortedCharacters = characters.sort(
      (a, b) => a.status.speed - b.status.speed
    );

    // TODO: debug処理削除
    console.debug(
      "sortedCharacters",
      sortedCharacters,
      sortedCharacters.map((c) => c.status.speed)
    );

    let isBattleEnd = false;
    // 速さ順に各キャラクターの行動を実行
    for (const character of sortedCharacters) {
      if (character.status.life <= 0) {
        //  ライフが0のキャラクターは飛ばす
        continue;
      }
      if (!character.move) {
        console.warn(`character move is not set.`);
        continue;
      }
      if (character.move.type == WAS_BATTLE_MOVE.ITEM) {
        const item = character.getItem(character.move.itemId);
        if (!item) {
          console.warn(`item is not found. itemId: ${character.move.itemId}`);
          continue;
        }
        //アイテム使用時の処理
        if (!(item.effect instanceof Function)) {
          progressList.push({
            message: `${item.name}は今使っても効果がない。`,
          });
          continue;
        }
        const result = item.effect(character, character.move.target);
        if (!result.length) {
          continue;
        }
        // 結果詰め込み処理
        progressList.push({
          message: result,
        });
      } else if (character.move.type == WAS_BATTLE_MOVE.SKILL) {
        const skill = character.getSkill(character.move.skillId);
        if (!skill) {
          console.warn(
            `skill is not found. skillId: ${character.move.skillId}`
          );
          continue;
        }

        // コストの消費
        if (character.status.satiety < skill.cost) {
          progressList.push({
            message: `${character.move.target.name}は${skill.name}を発動する力が出ない。`,
          });
          continue;
        }
        character.status.satiety -= skill.cost;

        // スキル使用時の処理
        // ダメージ計算(パワーが設定されてないスキルはサポートスキルのためダメージ計算をスキップ)
        if (skill.power !== undefined) {
          const damage = this.calcSkillDamage(
            character,
            character.move.target,
            skill
          );
          character.move.target.status.life -= damage;
          if (character.move.target.status.life < 0) {
            // 体力がマイナスになった場合はバグ回避のため明示的に0にする
            character.move.target.status.life = 0;
          }
          // 結果詰め込み処理
          if (character.move.target instanceof WasPlayerCharacter) {
            progressList.push({
              message: `${character.move.target.name}は${damage}のダメージを受けた。`,
            });
          } else if (character.move.target instanceof WasNonPlayerCharacter) {
            progressList.push({
              message: `${character.move.target.name}に${damage}のダメージを与えた！`,
            });
          }
        }

        if (!(skill.effect instanceof Function)) {
          continue;
        }
        const result = skill.effect(character, character.move.target);
        if (!result.length) {
          continue;
        }
        // 結果詰め込み処理
        progressList.push({
          message: result,
        });
      } else if (character.move?.type == WAS_BATTLE_MOVE.ATTACK) {
        // 通常攻撃時の処理
        const damage = this.calcAttackDamage(character, character.move.target);
        character.move.target.status.life -= damage;
        if (character.move.target.status.life < 0) {
          // 体力がマイナスになった場合はバグ回避のため明示的に0にする
          character.move.target.status.life = 0;
        }

        // 結果詰め込み処理
        if (character.move.target instanceof WasPlayerCharacter) {
          progressList.push({
            message: `${character.move.target.name}は${damage}のダメージを受けた。`,
          });
        } else if (character.move.target instanceof WasNonPlayerCharacter) {
          progressList.push({
            message: `${character.move.target.name}に${damage}のダメージを与えた！`,
          });
        }
      }

      // 戦闘終了判定
      if (
        this.isBattleWin(
          characters.find((c) => c instanceof WasPlayerCharacter),
          characters.find((c) => c instanceof WasNonPlayerCharacter)
        )
      ) {
        isBattleEnd = true;
        progressList.push({
          message: "戦闘に勝利した！",
        });
        status = WAS_BATTLE_STATUS.WIN;
        break;
      }
      if (
        this.isBattleLose(
          characters.find((c) => c instanceof WasPlayerCharacter)
        )
      ) {
        isBattleEnd = true;
        progressList.push({
          message: "戦闘に敗北した...",
        });
        status = WAS_BATTLE_STATUS.LOSE;
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
  }

  /**
   * 戦闘に勝利したかを判定する
   * @param player プレイヤーキャラクター
   * @param enemy 敵キャラクター
   * @returns プレイヤーの体力が0以下または敵の体力が0より大きい場合はfalse それ以外はtrue
   */
  static isBattleWin(player?: WasCharacter, enemy?: WasCharacter): boolean {
    if (!player) {
      // 空が入ってきた場合は実装誤りのためWarnを出力する
      console.warn("Player is empty in isBattleWin method");
      return false;
    }
    if (!enemy) {
      // 空が入ってきた場合は実装誤りのためWarnを出力する
      console.warn("enemy is empty in isBattleWin method");
      return false;
    }
    if (player.status.life <= 0) {
      return false;
    }
    return enemy.status.life <= 0;
  }

  /**
   * 戦闘に敗北したかを判定する
   * @param player プレイヤーキャラクター
   * @returns プレイヤーの体力が0以下の場合はtrue それ以外はfalse
   */
  static isBattleLose(player?: WasCharacter): boolean {
    if (!player) {
      console.warn("Player is empty in isBattleLose method");
      return false;
    }
    return player.status.life <= 0;
  }
  /**
   * スキルによるダメージの計算を行う
   * @param activist 発動者
   * @param target 対象
   * @param power 技の威力
   * @returns 与えるダメージ(威力が負の場合はすべて0として扱い、小数点以下は切り捨てる)
   */
  private static calcSkillDamage = (
    activist: WasCharacter,
    target: WasCharacter,
    skill: WAS_SKILL_TYPE
  ): number => {
    const power = skill.power ?? 0;
    if (power < 0) {
      return 0;
    }
    let damage = activist.status.magic * power * 0.01;
    // 属性の弱点判定
    if (this.isWeekness(skill.element, target.status.element)) {
      damage *= 1.5;
    }
    // 属性の抵抗判定
    if (this.isWeekness(target.status.element, skill.element)) {
      damage *= 0.5;
    }
    damage = Math.floor(damage) - target.status.defense;
    if (damage < 0) {
      damage = 0;
    }
    // ダメージの1%を最大値とする乱数を加算して返却
    // ダメージが0の場合でも50%の確率でダメージが発生するように1を加算する
    return (
      damage +
      Math.floor(damage * 0.01 * Math.random()) +
      (Math.random() % 2 == 0 ? 0 : 1)
    );
  };

  /**
   * 通常攻撃によるダメージの計算を行う
   * @param attacker 攻撃者
   * @param target 攻撃対象
   * @returns 与えるダメージ
   */
  private static calcAttackDamage = (
    attacker: WasCharacter,
    target: WasCharacter
  ): number => {
    let damage = attacker.status.attack - target.status.defense;
    // ダメージの10%を最大値とする乱数を加算して返却
    // ダメージが0の場合でも50%の確率でダメージが発生するように1を加算する
    return (
      damage +
      Math.floor(damage * 0.1 * Math.random()) +
      (Math.random() < 0.5 ? 0 : 1)
    );
  };

  /**
   * 相手の属性が弱点か判定する
   * @param target 判定する対象
   * @param enemy 相手の属性
   * @returns 弱点属性の場合はtrue それ以外はfalse
   */
  private static isWeekness = (
    target: WAS_ELEMENT,
    enemy: WAS_ELEMENT
  ): boolean => {
    switch (target) {
      case WAS_ELEMENT.NONE:
        return false;
      case WAS_ELEMENT.FIRE:
        return enemy == WAS_ELEMENT.WATER;
      case WAS_ELEMENT.WATER:
        return enemy == WAS_ELEMENT.THUNDER;
      case WAS_ELEMENT.THUNDER:
        return enemy == WAS_ELEMENT.SOIL;
      case WAS_ELEMENT.SOIL:
        return enemy == WAS_ELEMENT.WIND;
      case WAS_ELEMENT.WIND:
        return enemy == WAS_ELEMENT.FIRE;
      case WAS_ELEMENT.DARK:
        return enemy == WAS_ELEMENT.SHINE;
      case WAS_ELEMENT.SHINE:
        return enemy == WAS_ELEMENT.DARK;
    }
    return false;
  };
}
export { WAS_BATTLE_MOVE, WAS_BATTLE_STATUS, WasBattleUtil };
