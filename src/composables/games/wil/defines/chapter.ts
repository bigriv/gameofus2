import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_SOUND_ID } from "../enums/sound";
import { WIL_BATTLE_TIMMING, WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WIL_IMAGE_ID } from "../enums/image";
import {
  WIL_MAIN_TALK_DEFINES,
  WIL_SUB_TALK_DEFINES,
  WIL_TUTORIAL_DEFINES,
  WilTalkDefine,
} from "./talk";
import { WilBattle } from "../types/battle";
import { WilTraining } from "../types/training";

export type WilChapterDefine = {
  id: number;
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  talks: Array<WilTalkDefine>;
  battles: Array<{
    playerTeamName: string;
    computerTeamName: string;
    computerLevel: number;
    background: WIL_IMAGE_ID;
    deployBgm?: WIL_SOUND_ID;
    battleBgm?: WIL_SOUND_ID;
    deploy: Array<{
      x: number;
      y: number;
      character: WIL_CHARACTER_ID;
    }>;
    talks?: Array<{
      event: WilTalkDefine;
      isStart: (battle: WilBattle) => boolean;
    }>;
  }>;
  trainings?: Array<{
    days: number;
    talks?: Array<{
      event: WilTalkDefine;
      isStart: (training: WilTraining) => boolean;
    }>;
  }>;
  updateTeam: Array<{
    in: Array<WIL_CHARACTER_ID>;
    out: Array<WIL_CHARACTER_ID>;
  }>;
};

export const WIL_CHAPTER_1_DEFINE: WilChapterDefine = {
  id: 1,
  title: "第１章 聖の国と騎士団",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  talks: [
    WIL_MAIN_TALK_DEFINES.CHAPTER_1_1,
    WIL_MAIN_TALK_DEFINES.CHAPTER_1_2,
    WIL_MAIN_TALK_DEFINES.CHAPTER_1_3,
    WIL_MAIN_TALK_DEFINES.CHAPTER_1_4,
  ],
  battles: [
    {
      playerTeamName: "ヒカル&ザーグ",
      computerTeamName: "魔物の群れ",
      computerLevel: 1,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY_1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE_1,
      deploy: [
        {
          x: 0,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
        {
          x: 1,
          y: 0,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
        {
          x: 1,
          y: 4,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
      ],
      talks: [
        {
          event: WIL_TUTORIAL_DEFINES.BATTLE_SET_CHARACTER_1,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL;
          },
        },
        {
          event: WIL_TUTORIAL_DEFINES.BATTLE_SET_CHARACTER_2,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL;
          },
        },
        {
          event: WIL_TUTORIAL_DEFINES.BATTLE_START,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.BATTLE_TURN_START;
          },
        },
        {
          event: WIL_TUTORIAL_DEFINES.BATTLE_SELECT_MOVE,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE;
          },
        },
      ],
    },
    {
      playerTeamName: "ヒカル&騎士団員",
      computerTeamName: "聖騎士団",
      computerLevel: 1,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_KINGDOM,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY_1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE_1,
      deploy: [
        {
          x: 0,
          y: 1,
          character: WIL_CHARACTER_ID.HOLY_KNIGHTS_SOLDIER,
        },
        {
          x: 1,
          y: 3,
          character: WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER,
        },
        {
          x: 2,
          y: 1,
          character: WIL_CHARACTER_ID.HOLY_KNIGHTS_MAGICIAN,
        },
      ],
    },
  ],
  trainings: [
    {
      days: 7,
      talks: [
        {
          event: WIL_TUTORIAL_DEFINES.TRAINING,
          isStart: (__training: WilTraining) => {
            return true;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES.HERO_1,
          isStart: (training: WilTraining) => {
            if (training.days !== 2) {
              return false;
            }
            for (let result of training.results) {
              if (result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES.HERO_2,
          isStart: (training: WilTraining) => {
            if (training.days !== 5) {
              return false;
            }
            for (let result of training.results) {
              if (result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                return true;
              }
            }
            return false;
          },
        },
      ],
    },
  ],
  updateTeam: [
    {
      in: [WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER],
      out: [],
    },
    {
      in: [],
      out: [WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER],
    },
    {
      in: [
        WIL_CHARACTER_ID.HOLY_KNIGHTS_SOLDIER,
        WIL_CHARACTER_ID.HOLY_KNIGHTS_MAGICIAN,
      ],
      out: [],
    },
    {
      in: [WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER],
      out: [],
    },
  ],
};
