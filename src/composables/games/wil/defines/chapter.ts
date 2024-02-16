import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";
import {
  WIL_BATTLE_TIMMING,
  WIL_CHAPTER_TIMMING,
} from "@/composables/games/wil/enums/timming";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_TRAINING_ID } from "@/composables/games/wil/enums/training";
import { WIL_BATTLE_TACTICS } from "@/composables/games/wil/enums/battle";
import { WIL_SKILL_ID } from "@/composables/games/wil/enums/skill";
import { WilTalkDefine } from "@/composables/games/wil/defines/talks";
import { WIL_TALK_DEFINES_CHPATER1 } from "@/composables/games/wil/defines/talks/chapter1";
import { WIL_TALK_DEFINES_CHPATER2 } from "@/composables/games/wil/defines/talks/chapter2";
import { WIL_TALK_DEFINES_CHPATER3 } from "@/composables/games/wil/defines/talks/chapter3";
import { WIL_TALK_DEFINES_CHPATER4 } from "@/composables/games/wil/defines/talks/chapter4";
import { WIL_TALK_DEFINES_CHPATER5 } from "@/composables/games/wil/defines/talks/chapter5";
import { WIL_TALK_DEFINES_TUTORIAL } from "@/composables/games/wil/defines/talks/tutorial";
import { WIL_SUB_TALK_DEFINES_HERO } from "@/composables/games/wil/defines/talks/sub/hero";
import { WIL_SUB_TALK_DEFINES_HOLY_KNIGHTS_LEADER } from "@/composables/games/wil/defines/talks/sub/hoy_knights_leader";
import { WIL_SUB_TALK_DEFINES_ICICLE_GURDIANS_QUEEN } from "@/composables/games/wil/defines/talks/sub/icicle_gurdians_queen";
import { WIL_SUB_TALK_DEFINES_STORM_SHOOTERS_PRINCE } from "@/composables/games/wil/defines/talks/sub/storm_shooters_prince";
import { WIL_SUB_TALK_DEFINES_INFERNITY_SAMURAIS_THUNDER_SPY } from "@/composables/games/wil/defines/talks/sub/infernity_samurais_thunder_spy";
import { WilBattle } from "@/composables/games/wil/types/battle";
import { WilTraining } from "@/composables/games/wil/types/training";

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
  trainings: Array<{
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

export const WIL_CHAPTER_DEBUG_DEFINE: WilChapterDefine = {
  id: 0,
  title: "デバッグ",
  flow: [WIL_CHAPTER_TIMMING.BATTLE],
  talks: [],
  battles: [
    {
      playerTeamName: "デバッグチームA",
      computerTeamName: "デバッグチームB",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_FIRE_LAND_CATSLE,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      deploy: [],
    },
  ],
  trainings: [],
  updateTeam: [],
};

export const WIL_CHAPTER_1_DEFINE: WilChapterDefine = {
  id: 1,
  title: "第１章 聖の国と騎士団",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.SAVE,
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
          x: 1,
          y: 1,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
        {
          x: 1,
          y: 3,
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
          event: WIL_SUB_TALK_DEFINES_HERO[0],
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
          event: WIL_SUB_TALK_DEFINES_HERO[1],
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
  title: "第２章 氷の守護者",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.SAVE,
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
          event: WIL_SUB_TALK_DEFINES_HERO[2],
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
          event: WIL_SUB_TALK_DEFINES_HERO[3],
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
          event: WIL_SUB_TALK_DEFINES_HERO[4],
          isStart: (training: WilTraining) => {
            for (let result of training.results) {
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.character.defaultStatus.life >= 125) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_HOLY_KNIGHTS_LEADER[0],
          isStart: (training: WilTraining) => {
            if (training.days >= 5) {
              return false;
            }
            for (let result of training.results) {
              if (
                !result.character.isModel(WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER)
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 145) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_HOLY_KNIGHTS_LEADER[1],
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

export const WIL_CHAPTER_3_DEFINE: WilChapterDefine = {
  id: 3,
  title: "第３章 嵐の中で",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  talks: [...WIL_TALK_DEFINES_CHPATER3],
  battles: [
    {
      playerTeamName: "連合軍",
      computerTeamName: "魔物の群れ",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_STORM_LAND_OUTSIDE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
      deploy: [
        {
          x: 0,
          y: 0,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SCORPION,
        },
        {
          x: 2,
          y: 0,
          character: WIL_CHARACTER_ID.DARK_MONSTER_LIZARD,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_LIZARD,
        },
        {
          x: 0,
          y: 4,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SCORPION,
        },
        {
          x: 2,
          y: 4,
          character: WIL_CHARACTER_ID.DARK_MONSTER_LIZARD,
        },
      ],
    },
    {
      playerTeamName: "連合軍",
      computerTeamName: "シノブ隊",
      tactics: WIL_BATTLE_TACTICS.SUPPORT_PRIORITY,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_STORM_LAND_INSIDE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
      deploy: [
        {
          x: 1,
          y: 0,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 0,
          y: 1,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 0,
          y: 3,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 1,
          y: 4,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 2,
          y: 2,
          character: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_THUNDER_SPY,
        },
      ],
    },
    {
      playerTeamName: "連合軍",
      computerTeamName: "スイゲツ隊",
      tactics: WIL_BATTLE_TACTICS.SUMMON_PRIORITY,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_STORM_LAND_INSIDE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY3,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE3,
      deploy: [
        {
          x: 1,
          y: 0,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 0,
          y: 2,
          character: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_WATER_SOLDIER,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 2,
          y: 2,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_MEMBER,
        },
        {
          x: 1,
          y: 4,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
      ],
    },
  ],
  trainings: [
    {
      days: 3,
      talks: [
        {
          event: WIL_SUB_TALK_DEFINES_HERO[5],
          isStart: (training) => {
            for (let result of training.results) {
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.character.defaultStatus.life >= 140) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_HOLY_KNIGHTS_LEADER[2],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER)
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 155) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_ICICLE_GURDIANS_QUEEN[0],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.ICICLE_GURDIANS_QUEEN
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 140) {
                return true;
              }
            }
            return false;
          },
        },
      ],
    },
    {
      days: 5,
      talks: [
        {
          event: WIL_SUB_TALK_DEFINES_HERO[6],
          isStart: (training) => {
            for (let result of training.results) {
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.character.defaultStatus.life >= 155) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_HERO[7],
          isStart: (training) => {
            for (let result of training.results) {
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (training.days >= 3) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_ICICLE_GURDIANS_QUEEN[1],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.ICICLE_GURDIANS_QUEEN
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 155) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_STORM_SHOOTERS_PRINCE[0],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.STORM_SHOOTERS_PRINCE
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 165) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_STORM_SHOOTERS_PRINCE[1],
          isStart: (training) => {
            for (let result of training.results) {
              if (result.menu.id !== WIL_TRAINING_ID.PHISIC) {
                continue;
              }
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.STORM_SHOOTERS_PRINCE
                )
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
      in: [],
      out: [WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER],
    },
    {
      in: [
        WIL_CHARACTER_ID.STORM_SHOOTERS_PRINCE,
        WIL_CHARACTER_ID.STORM_SHOOTERS_ARCHER,
      ],
      out: [],
    },
  ],
};

export const WIL_CHAPTER_4_DEFINE: WilChapterDefine = {
  id: 4,
  title: "第４章 防衛 三国同盟",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  talks: [...WIL_TALK_DEFINES_CHPATER4],
  battles: [
    {
      playerTeamName: "連合軍",
      computerTeamName: "スイゲツ隊",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_ICE_FIELD,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
      deploy: [
        {
          x: 0,
          y: 0,
          character: WIL_CHARACTER_ID.DARK_MONSTER_UNDEAD,
        },
        {
          x: 2,
          y: 0,
          character: WIL_CHARACTER_ID.DARK_MONSTER_RABBIT,
        },
        {
          x: 1,
          y: 1,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_WATER_SOLDIER,
        },
        {
          x: 1,
          y: 3,
          character: WIL_CHARACTER_ID.SMOG_LABORATORY_ANDROID,
        },
        {
          x: 0,
          y: 4,
          character: WIL_CHARACTER_ID.DARK_MONSTER_UNDEAD,
        },
        {
          x: 2,
          y: 4,
          character: WIL_CHARACTER_ID.DARK_MONSTER_RABBIT,
        },
      ],
    },
    {
      playerTeamName: "連合軍",
      computerTeamName: "サジン",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_ICE_LAND,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE1,
      deploy: [
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_SAND_SPY,
        },
      ],
    },
    {
      playerTeamName: "連合軍",
      computerTeamName: "魔人の群れ",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_ICE_LAND,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY2,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE2,
      deploy: [
        {
          x: 1,
          y: 0,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SOIL_DEMON,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_FIRE_DEMON,
        },
        {
          x: 1,
          y: 4,
          character: WIL_CHARACTER_ID.DARK_MONSTER_WIND_DEMON,
        },
      ],
    },
  ],
  trainings: [
    {
      days: 7,
      talks: [
        {
          event: WIL_SUB_TALK_DEFINES_HERO[8],
          isStart: (training) => {
            if (training.days > 3) {
              return false;
            }
            for (let result of training.results) {
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.character.defaultStatus.life >= 165) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_HERO[9],
          isStart: (training) => {
            for (let result of training.results) {
              if (result.menu.id !== WIL_TRAINING_ID.MAGIC) {
                continue;
              }
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.learned?.id === WIL_SKILL_ID.CREATE_SACRED_SWORD) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_ICICLE_GURDIANS_QUEEN[2],
          isStart: (training) => {
            for (let result of training.results) {
              if (result.menu.id !== WIL_TRAINING_ID.PHISIC) {
                continue;
              }
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.ICICLE_GURDIANS_QUEEN
                )
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
        {
          event: WIL_SUB_TALK_DEFINES_STORM_SHOOTERS_PRINCE[2],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.STORM_SHOOTERS_PRINCE
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 170) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_INFERNITY_SAMURAIS_THUNDER_SPY[0],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.INFERNITY_SAMURAIS_THUNDER_SPY
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 165) {
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
      in: [WIL_CHARACTER_ID.INFERNITY_SAMURAIS_THUNDER_SPY],
      out: [],
    },
  ],
};

export const WIL_CHAPTER_5_DEFINE: WilChapterDefine = {
  id: 5,
  title: "第５章 終結",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.SAVE,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  talks: [...WIL_TALK_DEFINES_CHPATER5],
  battles: [
    {
      playerTeamName: "連合軍",
      computerTeamName: "獄炎武士団",
      tactics: WIL_BATTLE_TACTICS.RANDOM,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_FIRE_LAND_CATSLE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY3,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE3,
      deploy: [
        {
          x: 0,
          y: 0,
          character: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_WIND_SOLDIER,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_KING,
        },
        {
          x: 0,
          y: 4,
          character: WIL_CHARACTER_ID.INFERNITY_SAMURAIS_SAND_SPY,
        },
      ],
    },
    {
      playerTeamName: "連合軍",
      computerTeamName: "魔王軍",
      tactics: WIL_BATTLE_TACTICS.CONTINUOUS_MOVE,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_FIRE_LAND_CATSLE,
      deployBgm: WIL_SOUND_ID.BGM_PINCH3,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE4,
      deploy: [
        {
          x: 0,
          y: 1,
          character: WIL_CHARACTER_ID.DARK_MONSTER_THUNDER_SOLDIER,
        },
        {
          x: 0,
          y: 3,
          character: WIL_CHARACTER_ID.DARK_MONSTER_WATER_SOLDIER,
        },
        {
          x: 2,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SATAN,
        },
      ],
    },
    {
      playerTeamName: "連合軍",
      computerTeamName: "真・魔王軍",
      tactics: WIL_BATTLE_TACTICS.SUMMON_PRIORITY,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_FIRE_LAND_SHODDY_CATSLE,
      deployBgm: WIL_SOUND_ID.BGM_PINCH3,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE5,
      deploy: [
        {
          x: 2,
          y: 1,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_HEAD,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_LEFT_HAND,
        },
        {
          x: 2,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_RIGHT_HAND,
        },
        {
          x: 1,
          y: 3,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_LEFT_FOOT,
        },
        {
          x: 2,
          y: 3,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SUPER_SATAN_RIGHT_FOOT,
        },
      ],
    },
  ],
  trainings: [
    {
      days: 7,
      talks: [
        {
          event: WIL_SUB_TALK_DEFINES_HERO[10],
          isStart: (training) => {
            for (let result of training.results) {
              if (result.menu.id !== WIL_TRAINING_ID.MAGIC) {
                continue;
              }
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.learned?.id === WIL_SKILL_ID.CREATE_SACRED_SWORD) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_HERO[11],
          isStart: (training) => {
            for (let result of training.results) {
              if (!result.character.isModel(WIL_CHARACTER_ID.HERO)) {
                continue;
              }
              if (result.character.defaultStatus.life >= 180) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_ICICLE_GURDIANS_QUEEN[3],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.ICICLE_GURDIANS_QUEEN
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 170) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_STORM_SHOOTERS_PRINCE[3],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.STORM_SHOOTERS_PRINCE
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 180) {
                return true;
              }
            }
            return false;
          },
        },
        {
          event: WIL_SUB_TALK_DEFINES_INFERNITY_SAMURAIS_THUNDER_SPY[1],
          isStart: (training) => {
            for (let result of training.results) {
              if (
                !result.character.isModel(
                  WIL_CHARACTER_ID.INFERNITY_SAMURAIS_THUNDER_SPY
                )
              ) {
                continue;
              }
              if (result.character.defaultStatus.life >= 180) {
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
      in: [WIL_CHARACTER_ID.INFERNITY_SAMURAIS_KING],
      out: [],
    },
  ],
};
