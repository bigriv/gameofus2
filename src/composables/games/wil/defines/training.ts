import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_TRAINING_ID } from "../enums/training";

export const WIL_TRAINING_DEFINES: {
  [key: string]: {
    id: WIL_TRAINING_ID;
    name: string;
    image: WIL_IMAGE_ID;
    maxRise: {
      life: number;
      attack: number;
      defense: number;
      magic: number;
      speed: number;
    };
    learnRate: {
      phisic: number;
      magic: number;
    };
  };
} = {
  ATTACK: {
    id: WIL_TRAINING_ID.ATTACK,
    name: "侵攻訓練",
    image: WIL_IMAGE_ID.TRAINING_ATTACK,
    maxRise: {
      life: 0,
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 0,
    },
    learnRate: {
      phisic: 0,
      magic: 0,
    },
  },
  DEFENSE: {
    id: WIL_TRAINING_ID.DEFENSE,
    name: "防衛訓練",
    image: WIL_IMAGE_ID.TRAINING_DEFENSE,
    maxRise: {
      life: 0,
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 0,
    },
    learnRate: {
      phisic: 0,
      magic: 0,
    },
  },
  MIGRATION: {
    id: WIL_TRAINING_ID.MIGRATION,
    name: "移動訓練",
    image: WIL_IMAGE_ID.TRAINING_MIGRATION,
    maxRise: {
      life: 0,
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 0,
    },
    learnRate: {
      phisic: 0,
      magic: 0,
    },
  },
  MAGIC: {
    id: WIL_TRAINING_ID.MAGIC,
    name: "魔導学習",
    image: WIL_IMAGE_ID.TRAINING_MAGIC,
    maxRise: {
      life: 0,
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 0,
    },
    learnRate: {
      phisic: 0,
      magic: 0,
    },
  },
  PHISIC: {
    id: WIL_TRAINING_ID.PHISIC,
    name: "肉体強化",
    image: WIL_IMAGE_ID.TRAINING_PHISIC,
    maxRise: {
      life: 0,
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 0,
    },
    learnRate: {
      phisic: 0,
      magic: 0,
    },
  },
};
