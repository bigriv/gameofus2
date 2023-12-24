import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";
import { WIL_CONDITION_ID } from "../enums/condition";
import { WIL_ELEMENT } from "../enums/element";
import {
  WIL_SKILL_ID,
  WIL_SKILL_RANGE,
  WIL_SKILL_TARGET,
  WIL_SKILL_TYPE,
} from "../enums/skill";
import { WilBattleMoveResult } from "../types/battle";
import { WilCharacter } from "../types/character";
import { WilFieldCell } from "../types/field";
import { WilSkill } from "../types/skill";
import { WilStatus } from "../types/status";
import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_SOUND_ID } from "../enums/sound";

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
  learnRate: number;
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
    learnRate: 90,
  },
  {
    id: WIL_SKILL_ID.CHARGE_ATTACK,
    name: "チャージアタック",
    description: "強めの近接攻撃。",
    cost: 120,
    power: 120,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    learnRate: 70,
  },
  {
    id: WIL_SKILL_ID.ONE_LINE,
    name: "一閃",
    description: "縦一列に近接攻撃。",
    cost: 140,
    power: 125,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    element: WIL_ELEMENT.NONE,
    learnRate: 30,
  },
  {
    id: WIL_SKILL_ID.SHOT,
    name: "ショット",
    description: "通常の投擲攻撃",
    cost: 100,
    power: 100,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    learnRate: 90,
  },
  {
    id: WIL_SKILL_ID.PIERCING_SHOT,
    name: "貫通矢",
    description: "対象を貫通して後ろにいる敵にも攻撃。",
    cost: 105,
    power: 100,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    element: WIL_ELEMENT.NONE,
    learnRate: 50,
  },
  {
    id: WIL_SKILL_ID.AROW_RAIN,
    name: "アローレイン",
    description: "相手フィールドに矢の雨を降らせる。",
    cost: 100,
    power: 140,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.NONE,
    learnRate: 30,
  },
  {
    id: WIL_SKILL_ID.HEAL,
    name: "ヒール",
    description: "味方一人を中回復する。",
    cost: 100,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    learnRate: 50,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      let heal = __activest.status.magic * 1.2;
      // 最大値の10%を加算
      heal = Math.round(heal * 1.1);
      if (
        target.character!.status.life + heal >
        target.character!.defaultStatus.life
      ) {
        target.character!.status.life = target.character!.defaultStatus.life;
      } else {
        target.character!.status.life += heal;
      }

      return [
        new WilBattleMoveResult({
          message: [`${target.character!.name}の体力が${heal}回復した！`],
        }),
      ];
    },
  },
  {
    id: WIL_SKILL_ID.CLEAR,
    name: "クリア",
    description: "味方一人の状態異常を健康にする。",
    cost: 100,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.NONE,
    learnRate: 30,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.HEALTH)];
    },
  },
  {
    id: WIL_SKILL_ID.LIGHT_SWORD,
    name: "光剣",
    description: "光属性の魔素を纏って切り付ける。",
    cost: 110,
    power: 110,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    learnRate: 70,
  },
  {
    id: WIL_SKILL_ID.SACRED_CROSS,
    name: "聖十字",
    description: "光属性の魔素を纏って対象と四方の敵を切り付ける。",
    cost: 130,
    power: 120,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.SHINE,
    learnRate: 40,
  },
  {
    id: WIL_SKILL_ID.CREATE_SACRED_DANCING,
    name: "聖剣煌舞",
    description: "聖剣を創造し、すべての敵に飛ばす。",
    cost: 180,
    power: 150,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
    learnRate: 10,
  },
  {
    id: WIL_SKILL_ID.SHINE_BALL,
    name: "シャインボール",
    description: "光属性の魔法攻撃。",
    cost: 110,
    power: 110,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    learnRate: 80,
  },
  {
    id: WIL_SKILL_ID.SHINE_RAZER,
    name: "シャインレーザー",
    description: "貫通する光属性の魔法攻撃。",
    cost: 125,
    power: 120,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    element: WIL_ELEMENT.SHINE,
    learnRate: 50,
  },
  {
    id: WIL_SKILL_ID.SACRED_RAY,
    name: "セイクリッドレイ",
    description: "光属性の魔法攻撃で相手フィールドすべてを包む。",
    cost: 150,
    power: 130,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
    learnRate: 20,
  },
  {
    id: WIL_SKILL_ID.SANCTUARY,
    name: "サンクチュアリ",
    description: "味方すべてを神聖状態にする。",
    cost: 130,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ALLY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.SHINE,
    learnRate: 10,
    effect: (
      __activest: WilCharacter,
      target: WilFieldCell
    ): WilBattleMoveResult[] => {
      return [target.character!.overwriteCondition(WIL_CONDITION_ID.HOLY)];
    },
  },
  {
    id: WIL_SKILL_ID.CREATE_SACRED_SWORD,
    name: "聖剣創造",
    description: "聖剣を生成し、その加護を受ける。",
    cost: 100,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.SELF,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.SHINE,
    learnRate: 10,
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
  },
  {
    id: WIL_SKILL_ID.POISON_NAIL,
    name: "毒爪",
    description: "毒を纏った爪で切り付ける。中確率で被毒状態にする。",
    cost: 100,
    power: 80,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.DARK,
    learnRate: 70,
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
  },
  {
    id: WIL_SKILL_ID.SHADOW_SHOT,
    name: "影射ち",
    description: "闇属性の投擲攻撃。",
    cost: 70,
    power: 70,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.DARK,
    learnRate: 70,
  },
  {
    id: WIL_SKILL_ID.SHADOW_BALL,
    name: "シャドウボール",
    description: "闇属性の魔法攻撃。",
    cost: 110,
    power: 110,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.DARK,
    learnRate: 80,
  },
  {
    id: WIL_SKILL_ID.BLACK_LINE,
    name: "黒閃",
    description: "対象と同じ縦列の敵に闇属性の魔法攻撃。",
    cost: 100,
    power: 115,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ROW,
    element: WIL_ELEMENT.DARK,
    learnRate: 50,
  },
  {
    id: WIL_SKILL_ID.BLACK_METEOR,
    name: "ブラックメテオ",
    description: "闇属性の魔素の塊を落とす攻撃魔法。中確率で被毒状態にする。",
    cost: 150,
    power: 200,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.ALL,
    element: WIL_ELEMENT.DARK,
    learnRate: 10,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
  },
  {
    id: WIL_SKILL_ID.SMOG,
    name: "毒ガス",
    description: "対象と周囲の敵を高確率で被毒状態にする。",
    cost: 90,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    element: WIL_ELEMENT.DARK,
    learnRate: 60,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [target.character!.overwriteCondition(WIL_CONDITION_ID.POISON)];
      }
      return [];
    },
  },
  {
    id: WIL_SKILL_ID.INVITE_DEATH,
    name: "死への誘い",
    description: "対象に闇の魔素を送り込み、絶命させる。",
    cost: 90,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.DARK,
    learnRate: 10,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (
        WilSkill.isSuccessOverwriteCondition(WilSkill.MEDIUM_CONDITION_RATE)
      ) {
        target.character!.status.life = 0;
        return [
          new WilBattleMoveResult({
            message: [`${target.character!.name}は死へと引きずり込まれた。`],
            characterAnimation: new GOUAnimation(
              ANIMATION_TYPE.FADEOUT,
              ANIMATION_EASING_TYPE.EASE,
              1
            ),
            character: target.character,
          }),
        ];
      }
      return [];
    },
  },
  {
    id: WIL_SKILL_ID.THUNDER_SWORD,
    name: "サンダーソード",
    description: "雷を纏って切り付ける。隣接する敵に感電。",
    cost: 130,
    power: 120,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 60,
  },
  {
    id: WIL_SKILL_ID.THUNDER_NEEDLE,
    name: "雷針",
    description: "痺れる針で一突きする。高確率で麻痺状態にする。",
    cost: 80,
    power: 100,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 60,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
  },
  {
    id: WIL_SKILL_ID.LIGHTNING,
    name: "電光石火",
    description: "雷鳴の速さで近づいて攻撃。",
    cost: 80,
    power: 100,
    type: WIL_SKILL_TYPE.CLOSE_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 50,
  },
  {
    id: WIL_SKILL_ID.RAILGUN,
    name: "レールガン",
    description: "雷属性で高火力の投擲攻撃。",
    cost: 120,
    power: 120,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 60,
  },
  {
    id: WIL_SKILL_ID.THUNDER_SHOT,
    name: "サンダーショット",
    description: "雷属性の投擲攻撃。隣接する敵に感電。中確率で麻痺状態にする。",
    cost: 90,
    power: 80,
    type: WIL_SKILL_TYPE.SHOOT_PHISIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 40,
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
  },
  {
    id: WIL_SKILL_ID.THUNDER_BALL,
    name: "サンダーボール",
    description: "雷属性の魔法攻撃。低確率で麻痺状態にする。",
    cost: 120,
    power: 100,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.SOLO,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 70,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.LOW_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
  },
  {
    id: WIL_SKILL_ID.PIERCING_SHOT,
    name: "雷光",
    description: "貫通する雷で魔法攻撃。",
    cost: 125,
    power: 120,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.COLUMN,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 50,
  },
  {
    id: WIL_SKILL_ID.SPARK,
    name: "スパーク",
    description: "弾ける雷で魔法攻撃。",
    cost: 120,
    power: 100,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.AROUND,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 40,
  },
  {
    id: WIL_SKILL_ID.THUNDER_VOLT,
    name: "サンダーボルト",
    description: "激しい雷で魔法攻撃。隣接する敵に感電。",
    cost: 150,
    power: 140,
    type: WIL_SKILL_TYPE.ATTACK_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 20,
  },
  {
    id: WIL_SKILL_ID.ELECTROMAGNETIC_WAVE,
    name: "電磁波",
    description: "高確率で麻痺状態にする。隣接する敵に感電。",
    cost: 80,
    type: WIL_SKILL_TYPE.SUPPORT_MAGIC,
    target: WIL_SKILL_TARGET.ENEMY,
    range: WIL_SKILL_RANGE.CROSS,
    element: WIL_ELEMENT.THUNDER,
    learnRate: 50,
    effect: (__activest: WilCharacter, target: WilFieldCell) => {
      if (WilSkill.isSuccessOverwriteCondition(WilSkill.HIGH_CONDITION_RATE)) {
        return [
          target.character!.overwriteCondition(WIL_CONDITION_ID.PARALYSIS),
        ];
      }
      return [];
    },
  },
];
