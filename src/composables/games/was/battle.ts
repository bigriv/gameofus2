import {
  WAS_BATTLE_MOVE,
  WAS_BATTLE_STATUS,
} from "@/composables/games/was/const";
import { WasCharacter } from "@/composables/games/was/types/character";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasPlayer } from "@/composables/games/was/types/player";
import { WasItem } from "@/composables/games/was/types/item";
import { WasSkill } from "@/composables/games/was/types/skill";
import { GOUAudio } from "@/composables/types/audio/GOUAudio";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { GOULottie } from "@/composables/types/visuals/GOULottie";

type WAS_BATTLE_PROGRESS = {
  target?: WasCharacter;
  message?: string;
  sound?: GOUAudio;
  animation?: GOULottie;
};

export const useWasBattle = (
  ITEMS: { [key: string]: WasItem },
  SKILLS: { [key: string]: WasSkill }
) => {
  const ATTACK_SOUND = new GOUReadAudio(
    "/games/commons/sounds/effects/blow1.mp3"
  );
  const ATTACK_ANIMATION = new GOULottie(
    "/games/was/animations/effects/attack.json",
    100,
    100,
    false,
    2
  );
  ATTACK_SOUND.load();
  ATTACK_ANIMATION.load();
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
      return SKILLS[character.move.skillId];
    }
    if (character.move.type == WAS_BATTLE_MOVE.ITEM) {
      if (!character.haveItem(character.move.itemId)) {
        return null;
      }
      return ITEMS[character.move.itemId];
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
      attacker.status.attack - Math.floor(target.status.defense * 0.3);
    if (damage < 0) {
      damage = 0;
    }
    // ダメージの30%を最大値とする乱数を加算して返却
    // ダメージが0の場合でも50%の確率でダメージが発生するように1を加算する
    damage +=
      Math.round(damage * 0.3 * Math.random()) + (Math.random() < 0.5 ? 0 : 1);

    return damage;
  };

  /**
   * 戦闘時のスキルの使用処理を行う
   * @param character スキルを使用するキャラクター
   * @param target スキルの対象になるキャラクター
   * @param skill 使用するスキル
   * @returns 表示用の経過リスト
   */
  const mainProcessSkill = (
    character: WasCharacter,
    target: WasCharacter,
    skill: WasSkill
  ): Array<WAS_BATTLE_PROGRESS> => {
    const useResult = character.useSkill(skill);
    const progressList = [];
    if (!useResult) {
      return [
        {
          message: `${character.name}は${skill.name}を使おうとしたが、力が出なかった。`,
        },
      ];
    }

    progressList.push({
      message: `${character.name}は${skill.name}を発動した！`,
    });
    progressList.push({
      target: target,
      animation: skill.animation,
      sound: skill.sound,
    });

    if (skill.power > 0) {
      // ダメージ計算
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
          message: `${target.name}は体力を${-damage}回復した。`,
        });
      } else {
        // ダメージがプラスの場合は攻撃処理を行う
        if (target.status.life < 0) {
          // 体力がマイナスになった場合はバグ回避のため明示的に0にする
          target.status.life = 0;
        }

        // 結果詰め込み処理
        if (character instanceof WasPlayer) {
          progressList.push({
            message: `${target.name}に${damage}のダメージを与えた！`,
          });
        } else if (character instanceof WasNonPlayerCharacter) {
          progressList.push({
            message: `${target.name}は${damage}のダメージを受けた。`,
          });
        }
      }
    }

    // 追加効果処理
    if (!(skill.effect instanceof Function)) {
      return progressList;
    }
    const result = skill.effect(character, target);
    if (result?.length > 0) {
      // 結果詰め込み処理
      progressList.push({
        message: result,
      });
    }
    return progressList;
  };

  /**
   * 戦闘時のアイテム使用処理を行う
   * @param character アイテム使用するキャラクター
   * @param target アイテム使用の対象となるキャラクター
   * @param item 使用するアイテム
   * @returns 表示用の経過リスト
   */
  const mainProcessItem = (
    character: WasCharacter,
    target: WasCharacter,
    item: WasItem
  ): Array<WAS_BATTLE_PROGRESS> => {
    const progressList = [];
    if (!(item.effect instanceof Function)) {
      progressList.push({
        message: `${character.name}は意味のない行動をした。`,
      });
      return progressList;
    }

    const useResult = character.useItem(item.id);
    if (!useResult) {
      progressList.push({
        message: `${character.name}は${item.name}を使おうとしたが、持っていなかった。`,
      });
      return progressList;
    }

    progressList.push({
      message: `${character.name}は${item.name}を使用した！`,
    });

    const result = item.effect(character, target);
    if (!result) {
      return progressList;
    }
    // 結果詰め込み処理
    progressList.push({
      message: result,
    });
    return progressList;
  };

  /**
   * 戦闘時の通常攻撃処理を行う
   * @param character 攻撃を行うキャラクター
   * @param target 攻撃対象のキャラクター
   * @returns 表示用の経過リスト
   */
  const mainProcessAttack = (
    character: WasCharacter,
    target: WasCharacter
  ): Array<WAS_BATTLE_PROGRESS> => {
    const progressList = [];
    progressList.push(
      { message: `${character.name}の攻撃！` },
      { target: target, sound: ATTACK_SOUND, animation: ATTACK_ANIMATION }
    );

    const damage = calcAttackDamage(character, target);
    target.status.life -= damage;
    if (target.status.life < 0) {
      // 体力がマイナスになった場合はバグ回避のため明示的に0にする
      target.status.life = 0;
    }

    // 結果詰め込み処理
    if (character instanceof WasPlayer) {
      progressList.push({
        message: `${target.name}に${damage}のダメージを与えた！`,
      });
    } else if (character instanceof WasNonPlayerCharacter) {
      progressList.push({
        message: `${target.name}は${damage}のダメージを受けた。`,
      });
    }
    return progressList;
  };
  /**
   * 戦闘のメイン処理
   * @param player プレイヤー
   * @param enemy 敵キャラ
   * @returns 画面表示用の戦闘の結果
   */
  const battle = (player: WasPlayer, enemy: WasNonPlayerCharacter) => {
    let status = WAS_BATTLE_STATUS.ANOTHER;
    let progressList = new Array<WAS_BATTLE_PROGRESS>();
    //  スキル・アイテムによる事前処理を実行
    const characters = [player, enemy];
    preProcess(characters);

    // 速さ順に並び変える
    const sortedCharacters = characters.sort(
      (a, b) => b.status.speed - a.status.speed
    );
    console.log(sortedCharacters);
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
        progressList.push(...mainProcessSkill(character, target, skill));
      } else if (moveDetail instanceof WasItem) {
        // アイテム使用時の処理
        const item = moveDetail;
        progressList.push(...mainProcessItem(character, target, item));
      } else {
        // 通常攻撃時の処理
        progressList.push(...mainProcessAttack(character, target));
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
