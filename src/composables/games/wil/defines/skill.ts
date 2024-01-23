import { WIL_CONDITION_ID } from "@/composables/games/wil/enums/condition";
import { WIL_ELEMENT } from "@/composables/games/wil/enums/element";
import {
  WIL_SKILL_ID,
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "@/composables/games/wil/enums/skill";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WilBattleMoveResult } from "@/composables/games/wil/types/battle";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilFieldCell } from "@/composables/games/wil/types/field";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilStatus } from "@/composables/games/wil/types/status";

export const WIL_SKILL_DEFINES: Array<{
  id: WIL_SKILL_ID;
  name: string;
  description: string; // 30文字まで
  animation?: WIL_IMAGE_ID;
  sound?: WIL_SOUND_ID;
  type: WIL_SKILL_TYPE;
  cost: number;
  power?: number;
  effect?: (
    __activest: WilCharacter,
    __target: WilFieldCell
  ) => Array<WilBattleMoveResult>;
  target: WIL_SKILL_TARGET;
  range: WIL_SKILL_RANGE;
  element: WIL_ELEMENT;
  isLearnable: (character: WilCharacter) => boolean;
}> = [
  {
    id: WIL_SKILL_ID.SLASH,
    name: "スラッシュ",
    description: "通常の近接攻撃。",
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    cost: 100,
    power: 100,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    isLearnable: (__character: WilCharacter): boolean => {
      return true;
    },
  },
  {
    id: WIL_SKILL_ID.POWER_ATTACK,
    name: "強撃",
    description: "強めの近接攻撃。",
    animation: WIL_IMAGE_ID.SKILL_BLOW,
    sound: WIL_SOUND_ID.SE_BLOW2,
    cost: 120,
    power: 120,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 17;
    },
  },
  {
    id: WIL_SKILL_ID.SHOT,
    name: "ショット",
    description: "通常の投擲攻撃",
    animation: WIL_IMAGE_ID.SKILL_ARROW_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    cost: 100,
    power: 100,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    isLearnable: (__character: WilCharacter): boolean => {
      return true;
    },
  },
  {
    id: WIL_SKILL_ID.PIERCING_SHOT,
    name: "貫通矢",
    description: "対象を貫通して後ろにいる敵にも攻撃。",
    animation: WIL_IMAGE_ID.SKILL_ARROW_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    cost: 105,
    power: 100,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    element: WIL_ELEMENT.NONE,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 17;
    },
  },
  {
    id: WIL_SKILL_ID.AROW_RAIN,
    name: "アローレイン",
    description: "相手フィールドに矢の雨を降らせる。",
    animation: WIL_IMAGE_ID.SKILL_ARROW_VERTICAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    cost: 100,
    power: 140,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.NONE,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 15 &&
        character.defaultStatus.speed >= 28
      );
    },
  },
  {
    id: WIL_SKILL_ID.REGENERATION,
    name: "再生",
    description: "自身を活性状態にする。",
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL1,
    cost: 70,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.REGENERATION)];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
  },
  {
    id: WIL_SKILL_ID.LIGHT_SWORD,
    name: "光剣",
    description: "光属性の魔素を纏って切り付ける。",
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    cost: 110,
    power: 110,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 14 &&
        character.defaultStatus.magic >= 12
      );
    },
  },
  {
    id: WIL_SKILL_ID.SACRED_CROSS,
    name: "聖十字",
    description: "光属性の魔素を纏って対象と四方の敵を切り付ける。",
    animation: WIL_IMAGE_ID.SKILL_CROSS_SLASH,
    sound: WIL_SOUND_ID.SE_CROSS_SLASH,
    cost: 130,
    power: 120,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.SHINE,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 24 &&
        character.defaultStatus.speed >= 15 &&
        character.defaultStatus.magic >= 18
      );
    },
  },
  {
    id: WIL_SKILL_ID.ONE_LINE,
    name: "白閃",
    description: "縦一列に近接攻撃。",
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    cost: 140,
    power: 125,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    element: WIL_ELEMENT.SHINE,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 18 &&
        character.defaultStatus.speed > 12
      );
    },
  },
  {
    id: WIL_SKILL_ID.CREATE_SACRED_DANCING,
    name: "聖剣煌舞",
    description: "聖剣を創造し、すべての敵に飛ばす。",
    // TODO:アニメーション・SE追加
    cost: 180,
    power: 150,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 40 &&
        character.defaultStatus.magic >= 35
      );
    },
  },
  {
    id: WIL_SKILL_ID.SHINE_BALL,
    name: "シャインボール",
    description: "光属性の魔法攻撃。",
    animation: WIL_IMAGE_ID.SKILL_SHINE_CIRCLE,
    sound: WIL_SOUND_ID.SE_HOLY1,
    cost: 110,
    power: 110,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 12;
    },
  },
  {
    id: WIL_SKILL_ID.SHINE_RAZER,
    name: "シャインレーザー",
    description: "貫通する光属性の魔法攻撃。",
    animation: WIL_IMAGE_ID.SKILL_SHINE_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_BEAM1,
    cost: 125,
    power: 120,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    element: WIL_ELEMENT.SHINE,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 130 &&
        character.defaultStatus.magic >= 24
      );
    },
  },
  {
    id: WIL_SKILL_ID.SACRED_RAY,
    name: "セイクリッドレイ",
    description: "光属性の魔法攻撃で相手フィールドすべてを包む。",
    animation: WIL_IMAGE_ID.SKILL_SHINE_VERTICAL,
    sound: WIL_SOUND_ID.SE_HOLY1,
    cost: 150,
    power: 130,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 150 &&
        character.defaultStatus.magic >= 30
      );
    },
  },
  {
    id: WIL_SKILL_ID.HEAL,
    name: "ヒール",
    description: "味方一人を中回復する。",
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL1,
    cost: 100,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    effect: (
      activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      if (!target.character) {
        return [];
      }

      const heal = WilSkill.calcHeal(
        activest.status.magic * 3,
        target.character
      );
      target.character.status.life += heal;
      return [
        new WilBattleMoveResult({
          message: [`${target.character.name}の体力が${heal}回復した！`],
        }),
      ];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 17;
    },
  },
  {
    id: WIL_SKILL_ID.CLEAR,
    name: "クリア",
    description: "味方一人の状態異常を健康にする。",
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL1,
    cost: 100,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.HEALTH)];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 24;
    },
  },
  {
    id: WIL_SKILL_ID.SANCTUARY,
    name: "サンクチュアリ",
    description: "味方すべてを神聖状態にする。",
    // TODO:アニメーション・SE追加
    cost: 130,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.HOLY)];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.defense >= 25 &&
        character.defaultStatus.magic >= 30
      );
    },
  },
  {
    id: WIL_SKILL_ID.CREATE_SACRED_SWORD,
    name: "聖剣創造",
    description: "聖剣を生成し、その加護を受ける。",
    // TODO:アニメーション・SE追加
    cost: 100,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      const result = [
        target.character!.overwriteCondition(WIL_CONDITION_ID.HOLY),
      ];
      const rise = new WilStatus({
        life: 0,
        attack: target.character!.defaultStatus.attack * 0.1,
        defense: target.character!.defaultStatus.defense * 0.1,
        magic: target.character!.defaultStatus.magic * 0.1,
        speed: target.character!.defaultStatus.speed * 0.1,
      });
      target.character!.status = WilStatus.add(target.character!.status, rise);
      result.push(
        new WilBattleMoveResult({
          message: [`${target.character!.name}の全ステータスが10%上昇した！`],
        })
      );
      return result;
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.defense >= 25 &&
        character.defaultStatus.magic >= 30
      );
    },
  },
  {
    id: WIL_SKILL_ID.POISON_NAIL,
    name: "毒爪",
    description: "毒を纏った爪で切り付ける。中確率で被毒状態にする。",
    animation: WIL_IMAGE_ID.SKILL_DARK_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    cost: 100,
    power: 80,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.DARK,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 10 &&
        character.defaultStatus.magic >= 7
      );
    },
  },
  {
    id: WIL_SKILL_ID.SHADOW_SHOT,
    name: "影射ち",
    description: "闇属性の投擲攻撃。",
    animation: WIL_IMAGE_ID.SKILL_ARROW_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    cost: 70,
    power: 70,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.DARK,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 10 &&
        character.defaultStatus.magic >= 7
      );
    },
  },
  {
    id: WIL_SKILL_ID.SHADOW_BALL,
    name: "シャドウボール",
    description: "闇属性の魔法攻撃。",
    animation: WIL_IMAGE_ID.SKILL_DARK_CIRCLE,
    sound: WIL_SOUND_ID.SE_DARK1,
    cost: 110,
    power: 110,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.DARK,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 12;
    },
  },
  {
    id: WIL_SKILL_ID.BLACK_LINE,
    name: "黒閃",
    description: "対象と同じ縦列の敵に闇属性の魔法攻撃。",
    animation: WIL_IMAGE_ID.SKILL_DARK_VERTICAL,
    sound: WIL_SOUND_ID.SE_DARK1,
    cost: 100,
    power: 115,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    element: WIL_ELEMENT.DARK,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 18 &&
        character.defaultStatus.magic >= 15
      );
    },
  },
  {
    id: WIL_SKILL_ID.BLACK_METEOR,
    name: "ブラックメテオ",
    description: "闇属性の魔素の塊を落とす攻撃魔法。中確率で被毒状態にする。",
    // TODO:アニメーション・SE追加
    cost: 150,
    power: 200,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.DARK,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 200 &&
        character.defaultStatus.magic >= 40
      );
    },
  },
  {
    id: WIL_SKILL_ID.SMOG,
    name: "毒ガス",
    description: "対象と周囲の敵を高確率で被毒状態にする。",
    animation: WIL_IMAGE_ID.SKILL_POISON,
    sound: WIL_SOUND_ID.SE_POISON1,
    cost: 90,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    element: WIL_ELEMENT.DARK,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 120 &&
        character.defaultStatus.magic >= 15
      );
    },
  },
  {
    id: WIL_SKILL_ID.THUNDER_SWORD,
    name: "サンダーソード",
    description: "雷を纏って切り付ける。隣接する敵に感電。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_VERTICAL,
    sound: WIL_SOUND_ID.SE_THUNDER2,
    cost: 130,
    power: 120,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 14 &&
        character.defaultStatus.magic >= 12
      );
    },
  },
  {
    id: WIL_SKILL_ID.THUNDER_NEEDLE,
    name: "雷針",
    description: "痺れる針で一突きする。高確率で麻痺状態にする。",
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    cost: 80,
    power: 100,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      if (
        !character.isModel(WIL_CHARACTER_ID.INFERNITY_SAMURAIS_LIGHTNING_SPY)
      ) {
        return false;
      }
      return (
        character.defaultStatus.attack >= 15 &&
        character.defaultStatus.speed >= 15 &&
        character.defaultStatus.magic >= 15
      );
    },
  },
  {
    id: WIL_SKILL_ID.RAIZIN,
    name: "雷刃",
    description: "激しい雷を纏った刃で切り付ける。低確率で麻痺状態にする。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_VERTICAL,
    sound: WIL_SOUND_ID.SE_THUNDER2,
    cost: 150,
    power: 180,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 30 &&
        character.defaultStatus.magic >= 25 &&
        character.defaultStatus.magic >= 25
      );
    },
  },
  {
    id: WIL_SKILL_ID.RAILGUN,
    name: "レールガン",
    description: "雷属性で高火力の投擲攻撃。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_BEAM1,
    cost: 120,
    power: 120,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 14 &&
        character.defaultStatus.magic >= 16
      );
    },
  },
  {
    id: WIL_SKILL_ID.THUNDER_SHOT,
    name: "サンダーショット",
    description: "雷属性の投擲攻撃。隣接する敵に感電。中確率で麻痺状態にする。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    cost: 90,
    power: 80,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 20 &&
        character.defaultStatus.defense >= 15 &&
        character.defaultStatus.magic >= 15
      );
    },
  },
  {
    id: WIL_SKILL_ID.THUNDER_BALL,
    name: "サンダーボール",
    description: "雷属性の魔法攻撃。低確率で麻痺状態にする。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    cost: 120,
    power: 100,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.LOW_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 12;
    },
  },
  {
    id: WIL_SKILL_ID.PIERCING_SHOT,
    name: "雷光",
    description: "貫通する雷で魔法攻撃。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    cost: 125,
    power: 120,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    element: WIL_ELEMENT.THUNDER,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 100 &&
        character.defaultStatus.attack >= 15 &&
        character.defaultStatus.magic >= 24
      );
    },
  },
  {
    id: WIL_SKILL_ID.SPARK,
    name: "スパーク",
    description: "弾ける雷で魔法攻撃。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    cost: 120,
    power: 100,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    element: WIL_ELEMENT.THUNDER,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 110 &&
        character.defaultStatus.magic >= 28
      );
    },
  },
  {
    id: WIL_SKILL_ID.THUNDER_VOLT,
    name: "サンダーボルト",
    description: "激しい雷で魔法攻撃。隣接する敵に感電。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_VERTICAL,
    sound: WIL_SOUND_ID.SE_THUNDER2,
    cost: 150,
    power: 140,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 130 &&
        character.defaultStatus.magic >= 35
      );
    },
  },
  {
    id: WIL_SKILL_ID.ELECTROMAGNETIC_WAVE,
    name: "電磁波",
    description: "高確率で麻痺状態にする。隣接する敵に感電。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    cost: 80,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 90 &&
        character.defaultStatus.magic >= 16
      );
    },
  },
  {
    id: WIL_SKILL_ID.LIGHTNING,
    name: "電光石火",
    description: "雷を纏い、雷鳴の速さで動けるようにする。",
    animation: WIL_IMAGE_ID.SKILL_THUNDER_VERTICAL,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    cost: 50,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.FAST)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      if (
        !character.isModel(WIL_CHARACTER_ID.INFERNITY_SAMURAIS_LIGHTNING_SPY)
      ) {
        return false;
      }
      return (
        character.defaultStatus.speed >= 18 &&
        character.defaultStatus.magic >= 20
      );
    },
  },
  {
    id: WIL_SKILL_ID.SNOW_BLADE,
    name: "スノーブレード",
    description: "水属性の近接攻撃。",
    animation: WIL_IMAGE_ID.SKILL_ICE_HEXAGON,
    sound: WIL_SOUND_ID.SE_ICE1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 110,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 14 &&
        character.defaultStatus.magic >= 12
      );
    },
  },
  {
    id: WIL_SKILL_ID.WATER_SLASH,
    name: "水面切り",
    description: "水属性の攻撃で敵一列を切り付ける。低確率で衰弱状態にする。",
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 110,
    cost: 135,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.LOW_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      if (
        !character.isModel(WIL_CHARACTER_ID.INFERNITY_SAMURAIS_WATER_SOLDIER)
      ) {
        return false;
      }
      return (
        character.defaultStatus.attack >= 18 &&
        character.defaultStatus.speed >= 15
      );
    },
  },
  {
    id: WIL_SKILL_ID.GLACIER,
    name: "グレイシア",
    description: "貫通する水属性の攻撃でを切り付ける。中確率で衰弱状態にする。",
    animation: WIL_IMAGE_ID.SKILL_ICE_HEXAGON,
    sound: WIL_SOUND_ID.SE_ICE1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    power: 130,
    cost: 155,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 14 &&
        character.defaultStatus.magic >= 24
      );
    },
  },
  {
    id: WIL_SKILL_ID.ICE_SHOT,
    name: "アイスショット",
    description: "水属性の投擲攻撃。",
    animation: WIL_IMAGE_ID.SKILL_ICE_HEXAGON,
    sound: WIL_SOUND_ID.SE_ARROW,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 110,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 12 &&
        character.defaultStatus.speed >= 14 &&
        character.defaultStatus.magic >= 10
      );
    },
  },
  {
    id: WIL_SKILL_ID.WATER_CANNON,
    name: "水砲",
    description: "水属性の投擲攻撃。中確率で衰弱状態にする。",
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_WATER1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 110,
    cost: 150,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 18 &&
        character.defaultStatus.magic >= 18
      );
    },
  },
  {
    id: WIL_SKILL_ID.BUBBLE_BALL,
    name: "バブルボール",
    description: "水属性の魔法攻撃。中確率で衰弱状態にする。",
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_WATER1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 100,
    cost: 140,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 19;
    },
  },
  {
    id: WIL_SKILL_ID.HEAT_WATER,
    name: "熱湯",
    description: "水属性の魔法攻撃。中確率で火傷状態にする。",
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_WATER1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 100,
    cost: 120,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.BURN)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 26;
    },
  },
  {
    id: WIL_SKILL_ID.BLIZZARD,
    name: "ブリザード",
    description: "敵全体に氷の粒を降らせる魔法攻撃。",
    animation: WIL_IMAGE_ID.SKILL_RAIN,
    sound: WIL_SOUND_ID.SE_RAIN1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 80,
    cost: 110,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.defense >= 24 &&
        character.defaultStatus.magic >= 25
      );
    },
  },
  {
    id: WIL_SKILL_ID.ICEBERG,
    name: "アイスバーグ",
    description: "敵一列を攻撃する水属性の魔法。低確率で衰弱状態にする。",
    animation: WIL_IMAGE_ID.SKILL_ICE_VERTICAL,
    sound: WIL_SOUND_ID.SE_ICE1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 120,
    cost: 155,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.LOW_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 160 &&
        character.defaultStatus.magic >= 30
      );
    },
  },
  {
    id: WIL_SKILL_ID.HEAL_WATER,
    name: "癒しの水",
    description: "味方一人の体力を中回復し、状態異常を健康にする。",
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 120,
    effect: (activest: WilCharacter, target: WilFieldCell) => {
      if (!target.character) {
        return [];
      }

      const heal = WilSkill.calcHeal(
        activest.status.magic * 3,
        target.character
      );
      target.character.status.life += heal;
      const results = [
        new WilBattleMoveResult({
          message: [`${target.character.name}の体力が${heal}回復した！`],
        }),
      ];
      const overwriteHealth = target.character.overwriteCondition(
        WIL_CONDITION_ID.HEALTH
      );

      if (overwriteHealth) {
        results.push(overwriteHealth);
      }

      return results;
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 110 &&
        character.defaultStatus.magic >= 12
      );
    },
  },
  {
    id: WIL_SKILL_ID.CLEAR_WATER,
    name: "清めの水",
    description: "味方一人を神聖状態にする。",
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL2,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 100,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (!target.character) {
        return [];
      }
      return [target.character.overwriteCondition(WIL_CONDITION_ID.HOLY)];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 120 &&
        character.defaultStatus.magic >= 28
      );
    },
  },
  {
    id: WIL_SKILL_ID.SQUALL,
    name: "スコール",
    description: "敵全体に強い雨を降らせ、中確率で衰弱状態にする。",
    animation: WIL_IMAGE_ID.SKILL_RAIN,
    sound: WIL_SOUND_ID.SE_RAIN1,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    cost: 110,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 120 &&
        character.defaultStatus.defense >= 24 &&
        character.defaultStatus.magic >= 30
      );
    },
  },
  {
    id: WIL_SKILL_ID.SUPER_WATER,
    name: "超神水",
    description: "味方一人の体力を完全に回復する。",
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL3,
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 150,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (!target.character) {
        return [];
      }
      const heal = WilSkill.calcHeal(
        target.character.defaultStatus.life,
        target.character
      );
      return [
        new WilBattleMoveResult({
          message: [`${target.character.name}の体力が${heal}回復した！`],
        }),
      ];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 140 &&
        character.defaultStatus.defense >= 25 &&
        character.defaultStatus.magic >= 35
      );
    },
  },
  {
    id: WIL_SKILL_ID.SWING,
    name: "スイング",
    description: "土属性の近接攻撃。後ろのマスが空いていれば移動させる。",
    animation: WIL_IMAGE_ID.SKILL_BLOW,
    sound: WIL_SOUND_ID.SE_BLOW1,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 80,
    cost: 90,
    // TODO: マス移動実装
    // effect: (__activest: WilCharacter, __target: WilFieldCell) => {},
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 19;
    },
  },
  {
    id: WIL_SKILL_ID.HEAVY_ROCK,
    name: "ヘビーロック",
    description: "土属性の近接攻撃。中確率で衰弱状態にする。",
    animation: WIL_IMAGE_ID.SKILL_STONE_CIRCLE,
    sound: WIL_SOUND_ID.SE_BLOW3,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 130,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 26;
    },
  },
  {
    id: WIL_SKILL_ID.SAND_SLASH,
    name: "砂塵斬り",
    description: "鋭い砂で敵を切り裂く。",
    animation: WIL_IMAGE_ID.SKILL_SAND_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 120,
    cost: 120,
    isLearnable: (character: WilCharacter): boolean => {
      if (!character.isModel(WIL_CHARACTER_ID.INFERNITY_SAMURAIS_SAND_SPY)) {
        return false;
      }
      return (
        character.defaultStatus.attack >= 28 &&
        character.defaultStatus.speed >= 24
      );
    },
  },
  {
    id: WIL_SKILL_ID.MUD_SHOT,
    name: "マッドショット",
    description: "土属性の投擲攻撃。中確率で鈍足状態にする。",
    animation: WIL_IMAGE_ID.SKILL_MUD_CIRCLE,
    sound: WIL_SOUND_ID.SE_WATER1,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 100,
    cost: 120,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 16 &&
        character.defaultStatus.speed >= 14
      );
    },
  },
  {
    id: WIL_SKILL_ID.THROW_STONE,
    name: "投石",
    description: "土属性の投擲攻撃。",
    animation: WIL_IMAGE_ID.SKILL_STONE_CIRCLE,
    sound: WIL_SOUND_ID.SE_BLOW3,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 120,
    cost: 120,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 30;
    },
  },
  {
    id: WIL_SKILL_ID.SAND_STORM,
    name: "砂嵐",
    description: "相手全体を砂の粒子で攻撃。高確率で鈍足状態にする。",
    animation: WIL_IMAGE_ID.SKILL_SAND_SLASH,
    sound: WIL_SOUND_ID.SE_WIND1,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 80,
    cost: 130,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      if (!character.isModel(WIL_CHARACTER_ID.INFERNITY_SAMURAIS_SAND_SPY)) {
        return false;
      }
      return (
        character.defaultStatus.speed >= 30 &&
        character.defaultStatus.magic >= 24
      );
    },
  },
  {
    id: WIL_SKILL_ID.MUD_BOM,
    name: "泥爆弾",
    description: "土属性の魔法攻撃。中確率で鈍足状態にする。",
    animation: WIL_IMAGE_ID.SKILL_MUD_CIRCLE,
    sound: WIL_SOUND_ID.SE_WATER1,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 110,
    cost: 150,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 12 &&
        character.defaultStatus.magic >= 14
      );
    },
  },
  {
    id: WIL_SKILL_ID.ROCK_BUSTER,
    name: "ロックバスター",
    description: "土属性の魔法攻撃。威力が高い。",
    animation: WIL_IMAGE_ID.SKILL_STONE_CIRCLE,
    sound: WIL_SOUND_ID.SE_BLOW3,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 120,
    cost: 120,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 22 &&
        character.defaultStatus.magic >= 28
      );
    },
  },
  {
    id: WIL_SKILL_ID.EARTHQUAKE,
    name: "アースクエイク",
    description: "相手フィールドを揺らす土属性の魔法。高確率で鈍足状態にする。",
    animation: WIL_IMAGE_ID.SKILL_STONE_VERTICAL,
    sound: WIL_SOUND_ID.SE_STONE1,
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 110,
    cost: 160,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.defense >= 24 &&
        character.defaultStatus.magic >= 34
      );
    },
  },
];
