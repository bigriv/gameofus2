import { WrongImplementationError } from "@/composables/types/errors/WrongImplementationError";
import { WIL_SKILL_RANGE, WIL_SKILL_TYPE } from "../enums/skill";
import { WilCharacter } from "./character";
import { WilField, WilFieldCell } from "./field";
import { WilSkill } from "./skill";
import { WilBattleEvent, WilDamageEvent } from "./event";
import {
  ANIMATION_EASING_TYPE,
  ANIMATION_TYPE,
  GOUAnimation,
} from "@/composables/types/animations/GOUAnimation";

export abstract class WilOperator {
  moveCharacter?: WilCharacter;
  targetCell?: WilFieldCell;
  selectSkill?: WilSkill;

  resetMove() {
    this.moveCharacter = undefined;
    this.targetCell = undefined;
    this.selectSkill = undefined;
  }

  processBattle(field: WilField): {
    battleEvents: Array<WilBattleEvent>;
    damageEvents: Array<WilDamageEvent>;
  } {
    if (!this.moveCharacter) {
      throw new WrongImplementationError(
        "キャラクター選択されていない状態で戦闘処理が行われました。"
      );
    }
    if (!this.targetCell) {
      throw new WrongImplementationError(
        "対象マスが設定されていない状態で戦闘処理が行われました。"
      );
    }
    let battleEvents = new Array<WilBattleEvent>();
    if (!this.selectSkill) {
      // 発動スキルが設定されていなければ移動処理を行う
      this.moveCharacter.migrate();
      field.migrateCharacter(this.moveCharacter, this.targetCell);
      battleEvents.push(
        new WilBattleEvent({
          message: [`${this.moveCharacter.name}は移動した。`],
        })
      );
      return { battleEvents, damageEvents: [] };
    }

    if (!this.targetCell.character) {
      throw new WrongImplementationError(
        "対象マスにキャラクターが存在しません。"
      );
    }

    // スキルの発動処理
    if (!this.moveCharacter.useSkill(this.selectSkill)) {
      // 発動に失敗した場合の処理
      battleEvents.push(
        new WilBattleEvent({
          message: [`${this.selectSkill.name}の発動に失敗した。`],
        })
      );
      return { battleEvents, damageEvents: [] };
    }

    // FIXME: 仮実装として範囲によらず対象のキャラクターにスキルを適用する
    battleEvents.push(
      new WilBattleEvent({
        message: [
          `${this.moveCharacter.name}は${this.selectSkill.name}を発動した。`,
        ],
      })
    );
    let damageEvents = new Array<WilDamageEvent>();
    const isNeedCalcDamage =
      this.selectSkill.power !== undefined && this.selectSkill.power > 0;
    if (isNeedCalcDamage) {
      let damage = this.calcDamage(
        this.moveCharacter,
        this.targetCell.character,
        this.selectSkill
      );

      // ダメージとして最大10%を加算
      damage += Math.round(Math.random() * damage * 0.1);

      damageEvents.push(new WilDamageEvent(this.targetCell, damage));
      battleEvents.push(
        new WilBattleEvent({
          message: [`${this.targetCell.character.name}に${damage}のダメージ！`],
        })
      );

      this.targetCell.character.status.life -= damage;
      if (this.targetCell.character.status.life <= 0) {
        this.targetCell.character.status.life = 0;
        battleEvents.push({
          message: [`${this.targetCell.character.name}は力尽きた。`],
          func: () => {
            if (this.targetCell && this.targetCell.character) {
              setTimeout(() => {
                if (!this.targetCell || !this.targetCell.character) {
                  return;
                }
                this.targetCell.character.miniVisual.animation =
                  new GOUAnimation(
                    ANIMATION_TYPE.FADEOUT,
                    ANIMATION_EASING_TYPE.EASE,
                    1
                  );
                setTimeout(() => {
                  if (!this.targetCell || !this.targetCell.character) {
                    return;
                  }
                  this.targetCell.character.miniVisual.animation = undefined;
                  this.targetCell.character = undefined;
                }, 900);
              }, 1500);
            }
          },
        });
      }
    }
    if (this.selectSkill.effect) {
      battleEvents.push(this.selectSkill.effect(this.targetCell.character));
    }
    switch (this.selectSkill.range) {
      case WIL_SKILL_RANGE.FRONT:
        break;
      case WIL_SKILL_RANGE.SKIP:
        break;
      case WIL_SKILL_RANGE.AROUND:
        break;
      case WIL_SKILL_RANGE.CROSS:
        break;
      case WIL_SKILL_RANGE.ROW:
        break;
      case WIL_SKILL_RANGE.COLUMN:
        break;
      case WIL_SKILL_RANGE.ALL:
        break;
    }

    return { battleEvents, damageEvents };
  }

  calcDamage(
    activist: WilCharacter,
    target: WilCharacter,
    skill: WilSkill
  ): number {
    const power = (skill.power ?? 0) * 0.01;
    let damage = 0;
    if (skill.type === WIL_SKILL_TYPE.PHISIC) {
      damage = power * activist.status.attack - target.status.defense * 0.5;
    } else if (skill.type === WIL_SKILL_TYPE.MAGIC) {
      damage = power * activist.status.magic - target.status.magic * 0.5;
    }
    if (WilSkill.isWeekness(skill.element, target.element)) {
      damage *= 2;
    }
    if (WilSkill.isResistance(skill.element, target.element)) {
      damage *= 0.5;
    }

    return damage;
  }
}
