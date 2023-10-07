import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import {
  WAS_BATTLE_MOVE,
  WAS_ELEMENT,
  WAS_ITEM_ID,
  WAS_SKILL_ID,
} from "@/composables/games/was/const";
import WAS_SERIF_DEFINE from "@/composables/games/was/defines/serif";
import GOUVisualDefinition from "@/composables/types/visuals/GOUVisualDefinition";
import { WasNonPlayerCharacter } from "@/composables/games/was/types/nonPlayerCharacter";
import { WasCharacter } from "@/composables/games/was/types/character";

type WAS_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: string;
  visual: GOUVisualDefinition;
  initStatus: {
    life: number;
    satiety: number;
    attack?: number;
    defense?: number;
    speed?: number;
    magic?: number;
    element?: WAS_ELEMENT;
  };
  skills?: Array<WAS_SKILL_ID>;
  items?: Array<{ amount: number; id: WAS_ITEM_ID }>;
};
type WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE =
  WAS_PLAYER_CHARACTER_DEFINITION_TYPE & {
    dropItem?: WAS_ITEM_ID | null;
    persuadItem?: WAS_ITEM_ID | null;
    occupySkill?: WAS_SKILL_ID | null;
    serif?: { [key: string]: Array<string> };
    chooseMove: Function;
  };
/**
 * キャラクター定義
 */
const WAS_SATAN: WAS_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "魔王",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/commons/icons/human_red.svg",
    width: 30,
    height: 30,
  },
  initStatus: {
    life: 100,
    satiety: 100,
    attack: 10,
    defense: 10,
    speed: 10,
    magic: 10,
    element: WAS_ELEMENT.DARK,
  },
  skills: [],
  items: [],
};

const WAS_PRINCESS: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "姫",
  initStatus: {
    life: 100,
    satiety: 100,
  },
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Princess.svg",
    width: 150,
    height: 300,
  },
  chooseMove: () => {},
};

const WAS_GOBLIN: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "ゴブリン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Goblin.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 40,
    satiety: 100,
    attack: 10,
    defense: 5,
    speed: 5,
    magic: 0,
    element: WAS_ELEMENT.SOIL,
  },
  dropItem: WAS_ITEM_ID.POWER_LING,
  persuadItem: WAS_ITEM_ID.SATAN_SOUL,
  occupySkill: WAS_SKILL_ID.POWER_ATTACK,
  skills: [WAS_SKILL_ID.POWER_ATTACK],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_GOBLIN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_GOBLIN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_GOBLIN,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    if (self.isUsableSkill(WAS_SKILL_ID.POWER_ATTACK) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.POWER_ATTACK,
        target: enemey,
      };
    }
    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_ELF: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "エルフ",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Elf.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 60,
    satiety: 150,
    attack: 8,
    defense: 8,
    speed: 12,
    magic: 15,
    element: WAS_ELEMENT.NONE,
  },
  dropItem: WAS_ITEM_ID.WING_BOOTS,
  persuadItem: WAS_ITEM_ID.SATAN_SOUL,
  occupySkill: WAS_SKILL_ID.WIND,
  skills: [WAS_SKILL_ID.HEAL, WAS_SKILL_ID.WIND],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_ELF,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_ELF,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_ELF,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    if (self.isUsableSkill(WAS_SKILL_ID.HEAL) && Math.random() < 0.8) {
      if (self.status.life <= self.defaultStatus.life * 0.2) {
        return {
          type: WAS_BATTLE_MOVE.SKILL,
          skillId: WAS_SKILL_ID.HEAL,
          target: self,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.WIND) && Math.random() < 0.7) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.WIND,
        target: enemey,
      };
    }

    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_SAHAGIN: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "サハギン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Sahagin.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 60,
    satiety: 100,
    attack: 15,
    defense: 10,
    speed: 8,
    magic: 8,
    element: WAS_ELEMENT.WATER,
  },
  dropItem: WAS_ITEM_ID.MYSTERIOUS_SHELL,
  persuadItem: WAS_ITEM_ID.POWER_LING,
  occupySkill: WAS_SKILL_ID.SPEED_ATTACK,
  skills: [WAS_SKILL_ID.POWER_ATTACK, WAS_SKILL_ID.SPEED_ATTACK],
  items: [{ amount: 1, id: WAS_ITEM_ID.FISH }],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_SAHAGIN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SAHAGIN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SAHAGIN,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    const item = self.haveItem(WAS_ITEM_ID.FISH);
    if (item && Math.random() < 0.8) {
      if (
        self.status.satiety <= self.defaultStatus.satiety * 0.2 ||
        self.status.life <= self.defaultStatus.life * 0.2
      ) {
        return {
          type: WAS_BATTLE_MOVE.ITEM,
          itemId: WAS_ITEM_ID.FISH,
          target: self,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.POWER_ATTACK) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.POWER_ATTACK,
        target: enemey,
      };
    }

    if (self.isUsableSkill(WAS_SKILL_ID.SPEED_ATTACK) && Math.random() < 0.5) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.SPEED_ATTACK,
        target: enemey,
      };
    }

    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_SLIME: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "スライム",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Slime.svg",
    width: 150,
    height: 150,
  },
  initStatus: {
    life: 20,
    satiety: 100,
    attack: 5,
    defense: 1,
    speed: 5,
    magic: 0,
    element: WAS_ELEMENT.SHINE,
  },
  dropItem: WAS_ITEM_ID.HERB,
  persuadItem: WAS_ITEM_ID.RICE_BALL,
  occupySkill: WAS_SKILL_ID.GARD_ATTACK,
  skills: [WAS_SKILL_ID.GARD_ATTACK],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_SLIME,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SLIME,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SLIME,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    if (self.isUsableSkill(WAS_SKILL_ID.GARD_ATTACK) && Math.random() < 0.7) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.GARD_ATTACK,
        target: enemey,
      };
    }
    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_SOLDIER: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "兵士",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Soldier.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 80,
    satiety: 300,
    attack: 20,
    defense: 18,
    speed: 16,
    magic: 10,
    element: WAS_ELEMENT.NONE,
  },
  dropItem: WAS_ITEM_ID.HOLY_WATER,
  persuadItem: WAS_ITEM_ID.SATAN_SOUL,
  occupySkill: WAS_SKILL_ID.HIGH_HEAL,
  skills: [
    WAS_SKILL_ID.POWER_ATTACK,
    WAS_SKILL_ID.GARD_ATTACK,
    WAS_SKILL_ID.SPEED_ATTACK,
  ],
  items: [{ amount: 3, id: WAS_ITEM_ID.HERB }],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE_SOLDIER,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_SOLDIER,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_SOLDIER,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    const item = self.haveItem(WAS_ITEM_ID.HERB);
    if (item && Math.random() < 0.8) {
      if (self.status.life <= self.defaultStatus.life * 0.2) {
        return {
          type: WAS_BATTLE_MOVE.ITEM,
          itemId: WAS_ITEM_ID.HERB,
          target: self,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.GARD_ATTACK) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.GARD_ATTACK,
        target: enemey,
      };
    }
    if (self.isUsableSkill(WAS_SKILL_ID.POWER_ATTACK) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.POWER_ATTACK,
        target: enemey,
      };
    }
    if (self.isUsableSkill(WAS_SKILL_ID.SPEED_ATTACK) && Math.random() < 0.4) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.SPEED_ATTACK,
        target: enemey,
      };
    }
    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_BOSS_GOBLIN: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "ボスゴブリン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/BossGoblin.svg",
    width: 300,
    height: 400,
  },
  initStatus: {
    life: 80,
    satiety: 200,
    attack: 16,
    defense: 8,
    speed: 8,
    magic: 8,
    element: WAS_ELEMENT.SOIL,
  },
  dropItem: WAS_ITEM_ID.BOSS_GOBLIN_HEAD,
  persuadItem: null,
  occupySkill: WAS_SKILL_ID.SOIL,
  skills: [WAS_SKILL_ID.POWER_ATTACK, WAS_SKILL_ID.SOIL],
  items: [{ amount: 1, id: WAS_ITEM_ID.HERB }],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_BOSS_GOBLIN,
    FACE2: WAS_SERIF_DEFINE.FACE2_BOSS_GOBLIN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_BOSS_GOBLIN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_BOSS_GOBLIN,
    CHAT: WAS_SERIF_DEFINE.CHAT_BOSS_GOBLIN,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    const item = self.haveItem(WAS_ITEM_ID.HERB);
    if (item && Math.random() < 0.8) {
      if (self.status.life <= self.defaultStatus.life * 0.2) {
        return {
          type: WAS_BATTLE_MOVE.ITEM,
          itemId: WAS_ITEM_ID.HERB,
          target: self,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.SOIL) && Math.random() < 0.4) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.SOIL,
        target: enemey,
      };
    }

    if (self.isUsableSkill(WAS_SKILL_ID.POWER_ATTACK) && Math.random() < 0.4) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.POWER_ATTACK,
        target: enemey,
      };
    }

    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_DARK_ELF: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "ダークエルフ",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/DarkElf.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 100,
    satiety: 300,
    attack: 14,
    defense: 12,
    speed: 18,
    magic: 20,
    element: WAS_ELEMENT.DARK,
  },
  dropItem: WAS_ITEM_ID.DARK_ELF_EYE,
  persuadItem: WAS_ITEM_ID.HOLY_WATER,
  occupySkill: WAS_SKILL_ID.DARK_SORD,
  skills: [WAS_SKILL_ID.HEAL, WAS_SKILL_ID.DARK_SORD, WAS_SKILL_ID.WIND],
  items: [{ amount: 1, id: WAS_ITEM_ID.MEAT }],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_DARK_ELF,
    FACE2: WAS_SERIF_DEFINE.FACE2_DARK_ELF,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DARK_ELF,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DARK_ELF,
    CHAT: WAS_SERIF_DEFINE.CHAT_DARK_ELF,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    const meat = self.haveItem(WAS_ITEM_ID.MEAT);
    if (meat && Math.random() < 0.8) {
      if (self.status.satiety <= self.defaultStatus.satiety * 0.2) {
        return {
          type: WAS_BATTLE_MOVE.ITEM,
          itemId: WAS_ITEM_ID.MEAT,
          target: self,
        };
      }
    }
    if (self.isUsableSkill(WAS_SKILL_ID.HEAL) && Math.random() < 0.4) {
      if (self.status.life <= self.defaultStatus.life * 0.2) {
        return {
          type: WAS_BATTLE_MOVE.SKILL,
          skillId: WAS_SKILL_ID.HEAL,
          target: self,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.WIND) && Math.random() < 0.6) {
      if (enemey.status.speed >= self.status.speed) {
        return {
          type: WAS_BATTLE_MOVE.SKILL,
          skillId: WAS_SKILL_ID.WIND,
          target: enemey,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.DARK_SORD) && Math.random() < 0.3) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.DARK_SORD,
        target: enemey,
      };
    }

    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_KRAKEN: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "クラーケン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Kraken.svg",
    width: 300,
    height: 400,
  },
  initStatus: {
    life: 150,
    satiety: 400,
    attack: 16,
    defense: 25,
    speed: 12,
    magic: 18,
    element: WAS_ELEMENT.WATER,
  },
  dropItem: WAS_ITEM_ID.KRAKEN_HAND,
  persuadItem: WAS_ITEM_ID.MYSTERIOUS_SHELL,
  occupySkill: WAS_SKILL_ID.WATER,
  skills: [
    WAS_SKILL_ID.POWER_ATTACK,
    WAS_SKILL_ID.GARD_ATTACK,
    WAS_SKILL_ID.WATER,
  ],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_KRAKEN,
    FACE2: WAS_SERIF_DEFINE.FACE2_KRAKEN,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_KRAKEN,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_KRAKEN,
    CHAT: WAS_SERIF_DEFINE.CHAT_KRAKEN,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    if (self.isUsableSkill(WAS_SKILL_ID.HEAL) && Math.random() < 0.8) {
      if (self.status.life <= self.defaultStatus.life * 0.7) {
        return {
          type: WAS_BATTLE_MOVE.SKILL,
          skillId: WAS_SKILL_ID.HEAL,
          target: self,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.GARD_ATTACK) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.GARD_ATTACK,
        target: enemey,
      };
    }

    if (self.isUsableSkill(WAS_SKILL_ID.POWER_ATTACK) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.POWER_ATTACK,
        target: enemey,
      };
    }

    if (self.isUsableSkill(WAS_SKILL_ID.WATER) && Math.random() < 0.5) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.WATER,
        target: enemey,
      };
    }

    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_DORAGON: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "ドラゴン",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Dragon.svg",
    width: 300,
    height: 300,
  },
  initStatus: {
    life: 200,
    satiety: 500,
    attack: 30,
    defense: 30,
    speed: 30,
    magic: 50,
    element: WAS_ELEMENT.WIND,
  },
  dropItem: WAS_ITEM_ID.DRAGON_WING,
  persuadItem: WAS_ITEM_ID.SUPER_HERB,
  occupySkill: WAS_SKILL_ID.FIRE,
  skills: [WAS_SKILL_ID.POWER_ATTACK, WAS_SKILL_ID.FIRE],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_DRAGON,
    FACE2: WAS_SERIF_DEFINE.FACE2_DRAGON,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_DRAGON,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_DRAGON,
    CHAT: WAS_SERIF_DEFINE.CHAT_DRAGON,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    if (self.isUsableSkill(WAS_SKILL_ID.POWER_ATTACK) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.POWER_ATTACK,
        target: enemey,
      };
    }

    if (self.isUsableSkill(WAS_SKILL_ID.FIRE) && Math.random() < 0.4) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.FIRE,
        target: enemey,
      };
    }

    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

const WAS_HERO: WAS_NON_PLAYER_CHARACTER_DEFINITION_TYPE = {
  name: "勇者",
  visual: {
    type: GOUVisualType.IMAGE_SVG,
    path: "/games/was/characters/Hero.svg",
    width: 150,
    height: 300,
  },
  initStatus: {
    life: 200,
    satiety: 500,
    attack: 40,
    defense: 40,
    speed: 40,
    magic: 40,
    element: WAS_ELEMENT.SHINE,
  },
  dropItem: null,
  persuadItem: WAS_ITEM_ID.DRAGON_WING,
  occupySkill: null,
  skills: [
    WAS_SKILL_ID.THUNDER,
    WAS_SKILL_ID.JUSTICE_SPACIAL,
    WAS_SKILL_ID.JUSTICE_ATTACK,
  ],
  items: [{ amount: 1, id: WAS_ITEM_ID.HOLY_WATER }],
  serif: {
    FACE1: WAS_SERIF_DEFINE.FACE1_HERO,
    FACE2: WAS_SERIF_DEFINE.FACE2_HERO,
    BATTLE_WIN: WAS_SERIF_DEFINE.BATTLE_WIN_HERO,
    PERSUADE_SUCCESS: WAS_SERIF_DEFINE.PERSUADE_SUCCESS_HERO,
  },
  chooseMove: (self: WasNonPlayerCharacter, enemey: WasCharacter) => {
    const holyWater = self.haveItem(WAS_ITEM_ID.HOLY_WATER);
    if (holyWater && Math.random() < 0.8) {
      if (self.status.life <= self.defaultStatus.life * 0.5) {
        return {
          type: WAS_BATTLE_MOVE.ITEM,
          itemId: WAS_ITEM_ID.HOLY_WATER,
          target: self,
        };
      }
    }

    if (
      self.isUsableSkill(WAS_SKILL_ID.JUSTICE_SPACIAL) &&
      Math.random() < 0.8
    ) {
      if (self.status.attack <= self.defaultStatus.attack) {
        return {
          type: WAS_BATTLE_MOVE.SKILL,
          skillId: WAS_SKILL_ID.JUSTICE_SPACIAL,
          target: self,
        };
      }
    }

    if (self.isUsableSkill(WAS_SKILL_ID.THUNDER) && Math.random() < 0.6) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.THUNDER,
        target: enemey,
      };
    }

    if (
      self.isUsableSkill(WAS_SKILL_ID.JUSTICE_ATTACK) &&
      Math.random() < 0.4
    ) {
      return {
        type: WAS_BATTLE_MOVE.SKILL,
        skillId: WAS_SKILL_ID.JUSTICE_ATTACK,
        target: enemey,
      };
    }

    return {
      type: WAS_BATTLE_MOVE.ATTACK,
      target: enemey,
    };
  },
};

export {
  WAS_SATAN,
  WAS_PRINCESS,
  WAS_GOBLIN,
  WAS_SAHAGIN,
  WAS_ELF,
  WAS_SLIME,
  WAS_SOLDIER,
  WAS_BOSS_GOBLIN,
  WAS_KRAKEN,
  WAS_DARK_ELF,
  WAS_DORAGON,
  WAS_HERO,
};
