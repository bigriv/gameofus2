import { WIL_CHARACTER_ID } from "../enums/character";
import { WilTrainingResult } from "../types/training";
import { WIL_SUB_TALK_DEFINES, WilTalkDefine } from "./talk";

export type WilSubEventDefine = {
  isStartable: (chapter: number, trainingResult: WilTrainingResult) => boolean;
  talk: WilTalkDefine;
};

export const WIL_SUBEVENT_DEFINES: {
  [key: string]: WilSubEventDefine;
} = {
  HERO_1: {
    isStartable: (
      chapter: number,
      trainingResult: WilTrainingResult
    ): boolean => {
      return (
        chapter === 1 && trainingResult.character.isModel(WIL_CHARACTER_ID.HERO)
      );
    },
    talk: WIL_SUB_TALK_DEFINES.HERO_1,
  },
  HERO_2: {
    isStartable: (
      chapter: number,
      trainingResult: WilTrainingResult
    ): boolean => {
      return (
        chapter === 1 &&
        trainingResult.character.isModel(WIL_CHARACTER_ID.HERO) &&
        trainingResult.character.defaultStatus.life >= 110
      );
    },
    talk: WIL_SUB_TALK_DEFINES.HERO_2,
  },
  // HERO_3: {
  //   isStartable: (trainingResult: WilTrainingResult): boolean => {
  //     return (
  //       trainingResult.character.isModel(WIL_CHARACTER_ID.HERO) &&
  //       trainingResult.character.defaultStatus.magic >= 8
  //     );
  //   },
  //   talk: WIL_SUB_TALK_DEFINES.HERO_3,
  // },
};
