import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";
import {
  WIL_BATTLE_TIMMING,
  WIL_CHAPTER_TIMMING,
} from "@/composables/games/wil/enums/timming";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WilBattle } from "@/composables/games/wil/types/battle";
import { WilTraining } from "@/composables/games/wil/types/training";
import { WIL_TRAINING_ID } from "@/composables/games/wil/enums/training";
import { WIL_BATTLE_TACTICS } from "@/composables/games/wil/enums/battle";
import { WIL_TALK_DEFINES_CHPATER1 } from "@/composables/games/wil/defines/talks/chapter1";
import { WIL_TALK_DEFINES_CHPATER2 } from "@/composables/games/wil/defines/talks/chapter2";
import { WilTalkDefine } from "@/composables/games/wil/defines/talks";
import { WIL_TALK_DEFINES_TUTORIAL } from "@/composables/games/wil/defines/talks/tutorial";
import { WIL_SUB_TALK_DEFINES } from "@/composables/games/wil/defines/talks/sub";

export type WilChapterDefine = {
  id: number;
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  talks: Array<WilTalkDefine>;
  battles: Array<{
    playerTeamName: string;
    computerTeamName: string;
    tactics: WIL_BATTLE_TACTICS;
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
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  talks: [...WIL_TALK_DEFINES_CHPATER1],
  battles: [
    {
      playerTeamName: "ヒカル&ザーグ",
      computerTeamName: "魔物の群れ",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
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
          event: WIL_TALK_DEFINES_TUTORIAL.BATTLE_SET_CHARACTER_1,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL;
          },
        },
        {
          event: WIL_TALK_DEFINES_TUTORIAL.BATTLE_SET_CHARACTER_2,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.SET_SELECT_CELL;
          },
        },
        {
          event: WIL_TALK_DEFINES_TUTORIAL.BATTLE_START,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.BATTLE_TURN_START;
          },
        },
        {
          event: WIL_TALK_DEFINES_TUTORIAL.BATTLE_SELECT_MOVE,
          isStart: (battle: WilBattle) => {
            return battle.timming === WIL_BATTLE_TIMMING.BATTLE_SELECT_MOVE;
          },
        },
      ],
    },
    {
      playerTeamName: "ヒカル&騎士団員",
      computerTeamName: "聖騎士団",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_HOLY_LAND_CASTLE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
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
          event: WIL_TALK_DEFINES_TUTORIAL.TRAINING,
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

export const WIL_CHAPTER_2_DEFINE: WilChapterDefine = {
  id: 2,
  title: "第２章 氷の王女と同盟",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  talks: [...WIL_TALK_DEFINES_CHPATER2],
  battles: [
    {
      playerTeamName: "聖騎士団",
      computerTeamName: "魔物の群れ",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_ICE_FIELD,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
      deploy: [
        {
          x: 2,
          y: 1,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
        {
          x: 0,
          y: 1,
          character: WIL_CHARACTER_ID.DARK_MONSTER_UNDEAD,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_RABBIT,
        },
        {
          x: 0,
          y: 3,
          character: WIL_CHARACTER_ID.DARK_MONSTER_UNDEAD,
        },
        {
          x: 2,
          y: 3,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
      ],
      talks: [],
    },
    {
      playerTeamName: "聖騎士団",
      computerTeamName: "氷の守護者",
      tactics: WIL_BATTLE_TACTICS.SUPPORT_PRIORITY,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_ICE_LAND,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
      deploy: [
        {
          x: 0,
          y: 1,
          character: WIL_CHARACTER_ID.ICICLE_GURDIANS_DEFENDER,
        },
        {
          x: 2,
          y: 1,
          character: WIL_CHARACTER_ID.ICICLE_GURDIANS_QUEEN,
        },
        {
          x: 0,
          y: 3,
          character: WIL_CHARACTER_ID.ICICLE_GURDIANS_DEFENDER,
        },
        {
          x: 2,
          y: 3,
          character: WIL_CHARACTER_ID.ICICLE_GURDIANS_MAGICIAN,
        },
      ],
    },
    {
      playerTeamName: "聖騎士団&氷の守護者",
      computerTeamName: "氷の魔人",
      tactics: WIL_BATTLE_TACTICS.CONTINUOUS_MOVE,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_ICE_FIELD,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY2,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE2,
      deploy: [
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_ICE_DEMON,
        },
      ],
    },
  ],
  trainings: [
    {
      days: 7,
      talks: [
        {
          event: WIL_SUB_TALK_DEFINES.HERO_3,
          isStart: (training: WilTraining) => {
            for (let result of training.results) {
              if (result.menu.id !== WIL_TRAINING_ID.PHISIC) {
                continue;
              }
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.learned) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES.HERO_4,
          isStart: (training: WilTraining) => {
            for (let result of training.results) {
              if (result.menu.id !== WIL_TRAINING_ID.MAGIC) {
                continue;
              }
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.learned) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES.HERO_5,
          isStart: (training: WilTraining) => {
            for (let result of training.results) {
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (
                result.character.defaultStatus.attack >= 15 &&
                result.character.defaultStatus.defense >= 12
              ) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES.HOLY_KNIGHTS_LEADER_1,
          isStart: (training: WilTraining) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER)
              ) {
                continue;
              }
              if (training.days >= 5) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES.HOLY_KNIGHTS_LEADER_2,
          isStart: (training: WilTraining) => {
            for (let result of training.results) {
              if (result.menu.id !== WIL_TRAINING_ID.PHISIC) {
                continue;
              }
              if (
                !result.character.isModel(WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER)
              ) {
                continue;
              }
              if (result.learned) {
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
      in: [
        WIL_CHARACTER_ID.ICICLE_GURDIANS_QUEEN,
        WIL_CHARACTER_ID.ICICLE_GURDIANS_DEFENDER,
        WIL_CHARACTER_ID.ICICLE_GURDIANS_MAGICIAN,
      ],
      out: [],
    },
  ],
};
