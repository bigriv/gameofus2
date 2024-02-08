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
import { WilBattleMoveResult } from "@/composables/games/wil/types/battle";
import { WilCharacter } from "@/composables/games/wil/types/character";
import { WilField, WilFieldCell } from "@/composables/games/wil/types/field";
import { WilSkill } from "@/composables/games/wil/types/skill";
import { WilStatus } from "@/composables/games/wil/types/status";

export type WilSkillDefine = {
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
    __target: WilFieldCell,
    __allyField: WilField,
    __enemyField: WilField
  ) => Array<WilBattleMoveResult>;
  target: WIL_SKILL_TARGET;
  range: WIL_SKILL_RANGE;
  element: WIL_ELEMENT;
  isLearnable: (character: WilCharacter) => boolean;
};

export const WIL_SKILL_DEFINES: Array<WilSkillDefine> = [
  {
    id: WIL_SKILL_ID.SLASH,
    name: "スラッシュ",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 100,
    cost: 100,
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    isLearnable: (__character: WilCharacter): boolean => {
      return true;
    },
    description: "通常の近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.POWER_ATTACK,
    name: "強撃",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 120,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_BLOW,
    sound: WIL_SOUND_ID.SE_BLOW2,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 17;
    },
    description: "強めの近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.PIERCING_SHOT,
    name: "貫通矢",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    power: 100,
    cost: 105,
    animation: WIL_IMAGE_ID.SKILL_ARROW_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 15 &&
        character.defaultStatus.speed >= 15
      );
    },
    description: "対象を貫通して後ろにいる敵にも攻撃。",
  },
  {
    id: WIL_SKILL_ID.ARROW_RAIN,
    name: "アローレイン",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 100,
    cost: 140,
    animation: WIL_IMAGE_ID.SKILL_ARROW_VERTICAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 120 &&
        character.defaultStatus.attack >= 21
      );
    },
    description: "全体に矢の雨で攻撃。",
  },
  {
    id: WIL_SKILL_ID.REGENERATION,
    name: "再生",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 70,
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): WilBattleMoveResult[] => {
      return [
        target.character!.overwriteCondition(WIL_CONDITION_ID.REGENERATION),
      ];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "自身を活性状態にする。",
  },
  {
    id: WIL_SKILL_ID.REPAIR,
    name: "修復",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      return [
        target.character!.overwriteCondition(WIL_CONDITION_ID.REGENERATION),
      ];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "味方一人を活性状態にする。",
  },
  {
    id: WIL_SKILL_ID.PRODUCE,
    name: "製造",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 150,
    animation: WIL_IMAGE_ID.SKILL_SUMMON,
    sound: WIL_SOUND_ID.SE_WARP,
    effect: (
      __activest: WilCharacter,
      __target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      // TODO: 人工兵召喚処理
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "自分の一マス前方に人工兵を召喚する。埋まっている場合は不発。",
  },
  {
    id: WIL_SKILL_ID.SUMMON_FIRE_DEMON,
    name: "火の魔人召喚",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 50,
    animation: WIL_IMAGE_ID.SKILL_SUMMON,
    sound: WIL_SOUND_ID.SE_WARP,
    effect: (
      __activest: WilCharacter,
      __target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      // TODO: 魔人召喚処理
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "自分フィールドに火の魔人を配置する。配置場所は固定。",
  },
  {
    id: WIL_SKILL_ID.SUMMON_ICE_DEMON,
    name: "氷の魔人召喚",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 50,
    animation: WIL_IMAGE_ID.SKILL_SUMMON,
    sound: WIL_SOUND_ID.SE_WARP,
    effect: (
      __activest: WilCharacter,
      __target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      // TODO: 魔人召喚処理
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "自分フィールドに氷の魔人を配置する。配置場所は固定。",
  },
  {
    id: WIL_SKILL_ID.SUMMON_WIND_DEMON,
    name: "風の魔人召喚",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 50,
    animation: WIL_IMAGE_ID.SKILL_SUMMON,
    sound: WIL_SOUND_ID.SE_WARP,
    effect: (
      __activest: WilCharacter,
      __target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      // TODO: 魔人召喚処理
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "自分フィールドに風の魔人を配置する。配置場所は固定。",
  },
  {
    id: WIL_SKILL_ID.SUMMON_SOIL_DEMON,
    name: "土の魔人召喚",
    element: WIL_ELEMENT.NONE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 50,
    animation: WIL_IMAGE_ID.SKILL_SUMMON,
    sound: WIL_SOUND_ID.SE_WARP,
    effect: (
      __activest: WilCharacter,
      __target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      // TODO: 魔人召喚処理
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "自分フィールドに土の魔人を配置する。配置場所は固定。",
  },
  {
    id: WIL_SKILL_ID.SHINE_SWORD,
    name: "光剣",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 14 &&
        character.defaultStatus.magic >= 12
      );
    },
    description: "光属性の魔素を纏って切り付ける。",
  },
  {
    id: WIL_SKILL_ID.SACRED_CROSS,
    name: "聖十字",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    power: 120,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_CROSS_SLASH,
    sound: WIL_SOUND_ID.SE_CROSS_SLASH,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 24 &&
        character.defaultStatus.magic >= 18
      );
    },
    description: "光属性の魔素を纏って対象と四方の敵を切り付ける。",
  },
  {
    id: WIL_SKILL_ID.WHITE_LINE,
    name: "白閃",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 125,
    cost: 140,
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 28 &&
        character.defaultStatus.speed >= 22
      );
    },
    description: "縦一列に近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.SHINE_BALL,
    name: "シャインボール",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_SHINE_CIRCLE,
    sound: WIL_SOUND_ID.SE_HOLY1,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 12;
    },
    description: "光属性の魔法攻撃。",
  },
  {
    id: WIL_SKILL_ID.SHINE_RAZER,
    name: "シャインレーザー",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    power: 120,
    cost: 125,
    animation: WIL_IMAGE_ID.SKILL_SHINE_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_BEAM1,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.speed >= 20 &&
        character.defaultStatus.magic >= 24
      );
    },
    description: "光属性の貫通する魔法攻撃。",
  },
  {
    id: WIL_SKILL_ID.SACRED_RAY,
    name: "セイクリッドレイ",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 130,
    cost: 160,
    animation: WIL_IMAGE_ID.SKILL_SHINE_VERTICAL,
    sound: WIL_SOUND_ID.SE_HOLY1,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 150 &&
        character.defaultStatus.magic >= 40
      );
    },
    description: "	光属性の魔法攻撃で相手フィールドすべてを包む。",
  },
  {
    id: WIL_SKILL_ID.HEAL,
    name: "ヒール",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 100,
    animation: WIL_IMAGE_ID.SKILL_HEAL,
    sound: WIL_SOUND_ID.SE_HEAL1,
    effect: (
      activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
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
      return (
        character.defaultStatus.life >= 115 &&
        character.defaultStatus.magic >= 18
      );
    },
    description: "味方一人を中回復する。",
  },
  {
    id: WIL_SKILL_ID.SANCTUARY,
    name: "サンクチュアリ",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.ALL,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_SANCTUARY,
    sound: WIL_SOUND_ID.SE_HOLY2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.HOLY)];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.speed >= 22 &&
        character.defaultStatus.magic >= 28
      );
    },
    description: "味方すべてを神聖状態にする。",
  },
  {
    id: WIL_SKILL_ID.CREATE_SACRED_SWORD,
    name: "聖剣創造",
    element: WIL_ELEMENT.SHINE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 100,
    animation: WIL_IMAGE_ID.SKILL_SACRED_SWORD,
    sound: WIL_SOUND_ID.SE_HOLY2,
    effect: (
      activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (!target.character) {
        return [];
      }

      // 能力値上昇
      const rise = new WilStatus({
        life: 0,
        attack: target.character.defaultStatus.attack * 0.1,
        defense: target.character.defaultStatus.defense * 0.1,
        magic: target.character.defaultStatus.magic * 0.1,
        speed: target.character.defaultStatus.speed * 0.1,
      });
      target.character.status = WilStatus.add(target.character.status, rise);

      // 体力回復
      const heal = WilSkill.calcHeal(
        activest.defaultStatus.life / 2,
        target.character
      );
      target.character.status.life += heal;

      return [
        new WilBattleMoveResult({
          message: [`${target.character.name}の全ステータスが上昇した！`],
        }),
        new WilBattleMoveResult({
          message: [`${target.character.name}の体力が${heal}回復した！`],
        }),
      ];
    },
    isLearnable: (character: WilCharacter): boolean => {
      const ave =
        (character.defaultStatus.attack +
          character.defaultStatus.defense +
          character.defaultStatus.speed +
          character.defaultStatus.magic) /
        4;
      return character.defaultStatus.life >= 140 && ave >= 35;
    },
    description: "聖剣を生成し、その加護を受ける。",
  },
  {
    id: WIL_SKILL_ID.POISON_NAIL,
    name: "毒爪",
    element: WIL_ELEMENT.DARK,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 80,
    cost: 100,
    animation: WIL_IMAGE_ID.SKILL_DARK_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "闇属性の魔素を持った爪で近接攻撃。中確率で被毒状態にする。",
  },
  {
    id: WIL_SKILL_ID.SHADOW_BALL,
    name: "シャドウボール",
    element: WIL_ELEMENT.DARK,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_DARK_CIRCLE,
    sound: WIL_SOUND_ID.SE_DARK1,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "闇属性の魔法攻撃。",
  },
  {
    id: WIL_SKILL_ID.BLACK_LINE,
    name: "黒閃",
    element: WIL_ELEMENT.DARK,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 100,
    cost: 115,
    animation: WIL_IMAGE_ID.SKILL_DARK_VERTICAL,
    sound: WIL_SOUND_ID.SE_DARK1,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "対象と同じ列の敵に闇属性の魔法攻撃。",
  },
  {
    id: WIL_SKILL_ID.BLACK_METEOR,
    name: "ブラックメテオ",
    element: WIL_ELEMENT.DARK,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 140,
    cost: 180,
    animation: WIL_IMAGE_ID.SKILL_BLACK_METEOR,
    sound: WIL_SOUND_ID.SE_EXPLOSION,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "闇属性の魔素の塊を落とす攻撃魔法。中確率で被毒状態にする。",
  },
  {
    id: WIL_SKILL_ID.HOPELESS,
    name: "ホープレス",
    element: WIL_ELEMENT.DARK,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 100,
    cost: 180,
    animation: WIL_IMAGE_ID.SKILL_HOPELESS,
    sound: WIL_SOUND_ID.SE_DARK2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (!target.character) {
        return [];
      }
      if (target.character.condition === WIL_CONDITION_ID.HOLY) {
        return [];
      }
      target.character.stack += 50;
      return [
        new WilBattleMoveResult({
          message: [`${target.character.name}はひるんだ。（スタック数増加）`],
        }),
      ];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "相手を絶望へと引きずりこむ攻撃。スタック数を増加させる。",
  },
  {
    id: WIL_SKILL_ID.SMOG,
    name: "毒ガス",
    element: WIL_ELEMENT.DARK,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    cost: 90,
    animation: WIL_IMAGE_ID.SKILL_POISON,
    sound: WIL_SOUND_ID.SE_POISON1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "対象と周囲の敵を高確率で被毒状態にする。",
  },
  {
    id: WIL_SKILL_ID.BLACK_HOLE,
    name: "ブラックホール",
    element: WIL_ELEMENT.DARK,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_BLACK_HOLE,
    sound: WIL_SOUND_ID.SE_DARK2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (!target.character) {
        return [];
      }

      // 最前列のキャラクターには何もしない
      if (target.x > 0) {
        return [];
      }

      for (let i = 0; i <= WilField.HEIGHT; i++) {
        // 上から順に最前列の空いているマスを探索
        const newCell = enemyField.getCell(0, i);
        if (!newCell.character) {
          // 空いているマスがあればそのマスに対象キャラクターを移動する
          enemyField.migrateCharacter(target.character, newCell);
          return [
            new WilBattleMoveResult({
              message: [`${target.character.name}は最前線に引き寄せられた。`],
            }),
          ];
        }
      }

      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "敵全員を最前列に引き寄せる。",
  },
  {
    id: WIL_SKILL_ID.THUNDER_SWORD,
    name: "サンダーソード",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    power: 120,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_VERTICAL,
    sound: WIL_SOUND_ID.SE_THUNDER2,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 14 &&
        character.defaultStatus.speed >= 12
      );
    },
    description: "対象と隣接する敵に雷属性の近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.THUNDER_NEEDLE,
    name: "雷針",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 50,
    cost: 100,
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 20 &&
        character.defaultStatus.speed >= 24
      );
    },
    description: "高確率で麻痺状態にする近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.RAIZIN,
    name: "雷刃",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    power: 150,
    cost: 180,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_VERTICAL,
    sound: WIL_SOUND_ID.SE_THUNDER2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.LOW_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 38 &&
        character.defaultStatus.speed >= 32
      );
    },
    description: "激しい雷を纏った刃で切り付ける。低確率で麻痺状態にする。",
  },
  {
    id: WIL_SKILL_ID.THUNDER_SHOT,
    name: "サンダーショット",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    power: 80,
    cost: 90,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 20 &&
        character.defaultStatus.speed >= 16
      );
    },
    description: "対象と隣接する敵に雷属性の投擲攻撃。",
  },
  {
    id: WIL_SKILL_ID.RAILGUN,
    name: "レールガン",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 120,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_BEAM1,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 32 &&
        character.defaultStatus.speed >= 28
      );
    },
    description: "雷属性で高火力の投擲攻撃。",
  },
  {
    id: WIL_SKILL_ID.THUNDER_BALL,
    name: "サンダーボール",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 100,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
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
        character.defaultStatus.speed >= 8 &&
        character.defaultStatus.magic >= 10
      );
    },
    description: "雷属性の魔法攻撃。中確率で麻痺状態にする。",
  },
  {
    id: WIL_SKILL_ID.RAIKOU,
    name: "雷光",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    power: 120,
    cost: 125,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_BEAM1,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.speed >= 18 &&
        character.defaultStatus.magic >= 20
      );
    },
    description: "貫通する雷で攻撃。",
  },
  {
    id: WIL_SKILL_ID.SPARK,
    name: "スパーク",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 100,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 28;
    },
    description: "弾ける雷で攻撃。",
  },
  {
    id: WIL_SKILL_ID.THUNDER_VOLT,
    name: "サンダーボルト",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    power: 140,
    cost: 150,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_VERTICAL,
    sound: WIL_SOUND_ID.SE_THUNDER2,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "激しい雷で魔法攻撃。隣接する敵に感電。",
  },
  {
    id: WIL_SKILL_ID.ELECTROMAGNETIC_WAVE,
    name: "電磁波",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    cost: 80,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.speed >= 12 &&
        character.defaultStatus.magic >= 14
      );
    },
    description: "対象と隣接する敵を高確率で麻痺状態にする。",
  },
  {
    id: WIL_SKILL_ID.LIGHTNING,
    name: "電光石火",
    element: WIL_ELEMENT.THUNDER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 50,
    animation: WIL_IMAGE_ID.SKILL_THUNDER_CIRCLE,
    sound: WIL_SOUND_ID.SE_THUNDER1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.FAST)];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.speed >= 18 &&
        character.defaultStatus.magic >= 20
      );
    },
    description: "雷を身にまとい、自身を加速状態にする。",
  },
  {
    id: WIL_SKILL_ID.SNOW_BLADE,
    name: "スノーブレード",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_ICE_HEXAGON,
    sound: WIL_SOUND_ID.SE_ICE1,
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 12;
    },
    description: "水属性の近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.WATER_SLASH,
    name: "水面切り",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 110,
    cost: 135,
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.LOW_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 22 &&
        character.defaultStatus.speed >= 20 &&
        character.defaultStatus.speed >= 24
      );
    },
    description: "水属性の攻撃で敵一列を切り付ける。低確率で衰弱状態にする。",
  },
  {
    id: WIL_SKILL_ID.GLACIER,
    name: "グレイシア",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    power: 130,
    cost: 155,
    animation: WIL_IMAGE_ID.SKILL_ICE_HEXAGON,
    sound: WIL_SOUND_ID.SE_ICE1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
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
        character.defaultStatus.attack >= 28 &&
        character.defaultStatus.defense >= 26 &&
        character.defaultStatus.speed >= 32
      );
    },
    description: "貫通する水属性の攻撃でを切り付ける。中確率で衰弱状態にする。",
  },
  {
    id: WIL_SKILL_ID.ICE_SHOT,
    name: "アイスショット",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_ICE_HEXAGON,
    sound: WIL_SOUND_ID.SE_ICE1,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "水属性の投擲攻撃。",
  },
  {
    id: WIL_SKILL_ID.WARTER_CANNON,
    name: "水砲",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 110,
    cost: 150,
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_WATER1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "水属性の投擲攻撃。中確率で衰弱状態にする。",
  },
  {
    id: WIL_SKILL_ID.BUBBLE_BALL,
    name: "バブルボール",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 100,
    cost: 140,
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_WATER1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
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
        character.defaultStatus.defense >= 16 &&
        character.defaultStatus.magic >= 20
      );
    },
    description: "水属性の魔法攻撃。中確率で衰弱状態にする。",
  },
  {
    id: WIL_SKILL_ID.BLIZZARD,
    name: "ブリザード",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 80,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_RAIN,
    sound: WIL_SOUND_ID.SE_RAIN1,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 135 &&
        character.defaultStatus.magic >= 30
      );
    },
    description: "敵全体に氷の粒を降らせる魔法攻撃。",
  },
  {
    id: WIL_SKILL_ID.ICEBERG,
    name: "アイスバーグ",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 120,
    cost: 155,
    animation: WIL_IMAGE_ID.SKILL_ICE_VERTICAL,
    sound: WIL_SOUND_ID.SE_ICE1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.LOW_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.defense >= 30 &&
        character.defaultStatus.speed >= 34 &&
        character.defaultStatus.magic >= 36
      );
    },
    description: "敵一列を攻撃する水属性の魔法。低確率で衰弱状態にする。",
  },
  {
    id: WIL_SKILL_ID.HEAL_WATER,
    name: "癒しの水",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_HEAL1,
    effect: (
      activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
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
        target.character.overwriteCondition(WIL_CONDITION_ID.HEALTH),
      ];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 110 &&
        character.defaultStatus.magic >= 15
      );
    },
    description: "味方一人の体力を中回復し、状態異常を健康にする。",
  },
  {
    id: WIL_SKILL_ID.CLEAR_WATER,
    name: "清めの水",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 100,
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_HEAL2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.HOLY)];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.magic >= 24;
    },
    description: "味方一人を神聖状態にする。",
  },
  {
    id: WIL_SKILL_ID.SQUALL,
    name: "スコール",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_RAIN,
    sound: WIL_SOUND_ID.SE_RAIN1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 130 &&
        character.defaultStatus.defense >= 24 &&
        character.defaultStatus.magic >= 30
      );
    },
    description: "敵全体に強い雨を降らせ、高確率で衰弱状態にする。",
  },
  {
    id: WIL_SKILL_ID.SUPER_WATER,
    name: "超神水",
    element: WIL_ELEMENT.WATER,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 150,
    animation: WIL_IMAGE_ID.SKILL_WATER_CIRCLE,
    sound: WIL_SOUND_ID.SE_HEAL1,
    effect: (
      activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (!target.character) {
        return [];
      }

      const heal = WilSkill.calcHeal(
        activest.defaultStatus.life,
        target.character
      );
      target.character.status.life += heal;
      return [
        new WilBattleMoveResult({
          message: [`${target.character.name}の体力が完全に回復した！`],
        }),
      ];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 145 &&
        character.defaultStatus.magic >= 40
      );
    },
    description: "味方一人の体力を完全に回復する。",
  },
  {
    id: WIL_SKILL_ID.SWING,
    name: "スイング",
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 80,
    cost: 90,
    animation: WIL_IMAGE_ID.SKILL_BLOW,
    sound: WIL_SOUND_ID.SE_BLOW2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (!target.character) {
        return [];
      }

      const result = [
        new WilBattleMoveResult({
          message: [`${target.character.name}は後ろに弾き飛ばされた。`],
        }),
      ];
      if (target.x + 1 >= WilField.WIDTH) {
        return [];
      }
      // 真後ろ→上後ろ→下後ろの優先順位で空いているマスを探す
      // 真後ろのマス
      let newCell = enemyField.getCell(target.x + 1, target.y);
      // 下後ろのマス
      if (newCell.character && target.y + 1 >= 0) {
        newCell = enemyField.getCell(target.x + 1, target.y + 1);
      }
      // 上後ろのマス
      if (newCell.character && target.y - 1 >= 0) {
        newCell = enemyField.getCell(target.x + 1, target.y - 1);
      }

      // 後ろに空いているマスがあれば移動処理を実施する
      if (!newCell.character) {
        enemyField.migrateCharacter(target.character, newCell);
        return result;
      }

      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return character.defaultStatus.attack >= 24;
    },
    description: "土属性の近接攻撃。対象を後ろのマスに移動させる。",
  },
  {
    id: WIL_SKILL_ID.HEAVY_ROCK,
    name: "ヘビーロック",
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_STONE_CIRCLE,
    sound: WIL_SOUND_ID.SE_BLOW3,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
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
        character.defaultStatus.attack >= 26 &&
        character.defaultStatus.speed >= 22
      );
    },
    description: "土属性の近接攻撃。中確率で麻痺状態にする。",
  },
  {
    id: WIL_SKILL_ID.SAND_SLASH,
    name: "砂塵斬り",
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 120,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_SAND_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "鋭い砂で敵を切り裂く。",
  },
  {
    id: WIL_SKILL_ID.SAND_STORM,
    name: "砂嵐",
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 80,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_SAND_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "相手全体を砂の粒子で攻撃。高確率で鈍足状態にする。",
  },
  {
    id: WIL_SKILL_ID.ROCK_BUSTER,
    name: "ロックバスター",
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 120,
    cost: 120,
    animation: WIL_IMAGE_ID.SKILL_STONE_CIRCLE,
    sound: WIL_SOUND_ID.SE_BLOW3,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "土属性の魔法攻撃。威力が高い。",
  },
  {
    id: WIL_SKILL_ID.EARTHQUAKE,
    name: "アースクエイク",
    element: WIL_ELEMENT.SOIL,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 110,
    cost: 160,
    animation: WIL_IMAGE_ID.SKILL_STONE_VERTICAL,
    sound: WIL_SOUND_ID.SE_STONE1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "相手フィールドを揺らす土属性の魔法。高確率で鈍足状態にする。",
  },
  {
    id: WIL_SKILL_ID.FAST_SLASH,
    name: "疾風切り",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 100,
    cost: 80,
    animation: WIL_IMAGE_ID.SKILL_SLASH,
    sound: WIL_SOUND_ID.SE_SLASH,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "素早く敵を切りつける風属性の攻撃。必要スタック数が少ない。",
  },
  {
    id: WIL_SKILL_ID.WIND_SLASH,
    name: "かまいたち",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    power: 100,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_WIND_SLASH,
    sound: WIL_SOUND_ID.SE_WIND1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.WEATHERING),
        ];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "風属性の近接攻撃。中確率で風化状態にする。",
  },
  {
    id: WIL_SKILL_ID.WIND_ARROW,
    name: "風切矢",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 110,
    cost: 90,
    animation: WIL_IMAGE_ID.SKILL_TORNADO_VERTICAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 18 &&
        character.defaultStatus.speed >= 20
      );
    },
    description: "風属性の投擲攻撃。必要スタック数が少ない。",
  },
  {
    id: WIL_SKILL_ID.ARROW_STORM,
    name: "アローストーム",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 100,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_ARROW_VERTICAL,
    sound: WIL_SOUND_ID.SE_ARROW,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 130 &&
        character.defaultStatus.attack >= 24 &&
        character.defaultStatus.speed >= 26
      );
    },
    description: "相手全体に矢の嵐を巻き起こす風属性の投擲攻撃。",
  },
  {
    id: WIL_SKILL_ID.JET_ARROW,
    name: "ジェットアロー",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 130,
    cost: 165,
    animation: WIL_IMAGE_ID.SKILL_TORNADO_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_WIND1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.WEATHERING),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 32 &&
        character.defaultStatus.speed >= 38
      );
    },
    description: "鋭い風を纏った矢を放つ投擲攻撃。高確率で風化状態にする。",
  },
  {
    id: WIL_SKILL_ID.AIR_CUTTER,
    name: "エアカッター",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 80,
    cost: 100,
    animation: WIL_IMAGE_ID.SKILL_WIND_SLASH,
    sound: WIL_SOUND_ID.SE_WIND2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.WEATHERING),
        ];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.speed >= 12 &&
        character.defaultStatus.magic >= 14
      );
    },
    description: "風属性の魔法攻撃。中確率で風化状態にする。",
  },
  {
    id: WIL_SKILL_ID.CYCLONE,
    name: "サイクロン",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 90,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_TORNADO_VERTICAL,
    sound: WIL_SOUND_ID.SE_WIND1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.DEBILITY),
        ];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "風属性の魔法攻撃。中確率で衰弱状態にする。",
  },
  {
    id: WIL_SKILL_ID.TEMPEST,
    name: "テンペスト",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    power: 110,
    cost: 160,
    animation: WIL_IMAGE_ID.SKILL_TORNADO_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_WIND1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.life >= 145 &&
        character.defaultStatus.defense >= 32 &&
        character.defaultStatus.speed >= 38
      );
    },
    description: "風属性の魔法攻撃。中確率で鈍足状態にする。",
  },
  {
    id: WIL_SKILL_ID.HEADWIND,
    name: "向かい風",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 80,
    animation: WIL_IMAGE_ID.SKILL_WIND_FRONT,
    sound: WIL_SOUND_ID.SE_WIND2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.SLOW)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "敵一人を高確率で鈍足状態にする。",
  },
  {
    id: WIL_SKILL_ID.TAILWIND,
    name: "追い風",
    element: WIL_ELEMENT.WIND,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 90,
    animation: WIL_IMAGE_ID.SKILL_WIND_BEHIND,
    sound: WIL_SOUND_ID.SE_WIND2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.FAST)];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "味方一人を加速状態にする。",
  },
  {
    id: WIL_SKILL_ID.RED_LINE,
    name: "赤閃",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    power: 100,
    cost: 115,
    animation: WIL_IMAGE_ID.SKILL_FIRE_VERTICAL,
    sound: WIL_SOUND_ID.SE_SLASH,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "敵一列に攻撃する炎属性の近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.BAKUEN,
    name: "爆炎",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 120,
    cost: 140,
    animation: WIL_IMAGE_ID.SKILL_EXPLOSION,
    sound: WIL_SOUND_ID.SE_EXPLOSION,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "広範囲に影響を及ぼす炎属性の近接攻撃。",
  },
  {
    id: WIL_SKILL_ID.GOKUEN,
    name: "獄炎",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    power: 140,
    cost: 165,
    animation: WIL_IMAGE_ID.SKILL_FIRE_HORIZONTAL,
    sound: WIL_SOUND_ID.SE_FIRE2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.BURN)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "後ろの敵まで燃やす炎属性の近接攻撃。中確率で火傷状態にする。",
  },
  {
    id: WIL_SKILL_ID.SATAN_FRAME,
    name: "魔炎",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 200,
    cost: 220,
    animation: WIL_IMAGE_ID.SKILL_FIRE_CIRCLE,
    sound: WIL_SOUND_ID.SE_FIRE2,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.BURN)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "炎属性の近接攻撃。高火力なうえに高確率で火傷状態にする。",
  },
  {
    id: WIL_SKILL_ID.FIRE_SHOT,
    name: "火弾",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 90,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_FIRE_CIRCLE,
    sound: WIL_SOUND_ID.SE_FIRE1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.BURN)];
      }
      return [];
    },
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 26 &&
        character.defaultStatus.speed >= 24
      );
    },
    description: "炎属性の投擲攻撃。中確率で火傷状態にする。",
  },
  {
    id: WIL_SKILL_ID.BURST,
    name: "バースト",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    power: 120,
    cost: 140,
    animation: WIL_IMAGE_ID.SKILL_EXPLOSION,
    sound: WIL_SOUND_ID.SE_FIRE2,
    isLearnable: (character: WilCharacter): boolean => {
      return (
        character.defaultStatus.attack >= 34 &&
        character.defaultStatus.attack >= 32
      );
    },
    description: "炎属性の投擲攻撃。高火力。",
  },
  {
    id: WIL_SKILL_ID.FIRE_BALL,
    name: "ファイアボール",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    power: 90,
    cost: 110,
    animation: WIL_IMAGE_ID.SKILL_FIRE_CIRCLE,
    sound: WIL_SOUND_ID.SE_FIRE1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.BURN)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "炎属性の魔法攻撃。中確率で火傷状態にする。",
  },
  {
    id: WIL_SKILL_ID.CROSS_FIRE,
    name: "クロスファイア",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    power: 120,
    cost: 130,
    animation: WIL_IMAGE_ID.SKILL_FIRE_VERTICAL,
    sound: WIL_SOUND_ID.SE_FIRE2,
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "炎属性の魔法攻撃。隣接する敵にもダメージを与える。",
  },
  {
    id: WIL_SKILL_ID.DEMON_FIRE,
    name: "鬼火",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 80,
    animation: WIL_IMAGE_ID.SKILL_FIRE_CIRCLE,
    sound: WIL_SOUND_ID.SE_FIRE1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.BURN)];
      }
      return [];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "敵一人を高確率で火傷状態にする。",
  },
  {
    id: WIL_SKILL_ID.LIGHT_FIRE,
    name: "灯火",
    element: WIL_ELEMENT.FIRE,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    cost: 90,
    animation: WIL_IMAGE_ID.SKILL_FIRE_CIRCLE,
    sound: WIL_SOUND_ID.SE_FIRE1,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell,
      __allyField: WilField,
      __enemyField: WilField
    ): Array<WilBattleMoveResult> => {
      return [
        target.character!.overwriteCondition(WIL_CONDITION_ID.REGENERATION),
      ];
    },
    isLearnable: (__character: WilCharacter): boolean => {
      return false;
    },
    description: "味方一人を活性状態にする。",
  },
];
