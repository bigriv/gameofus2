import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_TRAINING_ID } from "@/composables/games/wil/enums/training";

export const WIL_TRAINING_DEFINES: {
  [key: string]: {
    id: WIL_TRAINING_ID;
    name: string;
    image: WIL_IMAGE_ID;
    minRise: {
      life: number;
      attack: number;
      defense: number;
      magic: number;
      speed: number;
    };
    maxRise: {
      life: number;
      attack: number;
      defense: number;
      magic: number;
      speed: number;
    };
    learnable: {
      phisic: boolean;
      magic: boolean;
    };
  };
} = {
  ATTACK: {
    id: WIL_TRAINING_ID.ATTACK,
    name: "侵攻訓練",
    image: WIL_IMAGE_ID.TRAINING_ATTACK,
    minRise: {
      life: 2,
      attack: 1,
      defense: 0,
      magic: 1,
      speed: 0,
    },
    maxRise: {
      life: 4,
      attack: 3,
      defense: 0,
      magic: 3,
      speed: 0,
    },
    learnable: {
      phisic: false,
      magic: false,
    },
  },
  DEFENSE: {
    id: WIL_TRAINING_ID.DEFENSE,
    name: "防衛訓練",
    image: WIL_IMAGE_ID.TRAINING_DEFENSE,
    minRise: {
      life: 2,
      attack: 0,
      defense: 1,
      magic: 1,
      speed: 0,
    },
    maxRise: {
      life: 4,
      attack: 0,
      defense: 3,
      magic: 3,
      speed: 0,
    },
    learnable: {
      phisic: false,
      magic: false,
    },
  },
  MIGRATION: {
    id: WIL_TRAINING_ID.MIGRATION,
    name: "移動訓練",
    image: WIL_IMAGE_ID.TRAINING_MIGRATION,
    minRise: {
      life: 2,
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 2,
    },
    maxRise: {
      life: 5,
      attack: 0,
      defense: 0,
      magic: 0,
      speed: 4,
    },
    learnable: {
      phisic: false,
      magic: false,
    },
  },
  MAGIC: {
    id: WIL_TRAINING_ID.MAGIC,
    name: "魔導学習",
    image: WIL_IMAGE_ID.TRAINING_MAGIC,
    minRise: {
      life: 0,
      attack: 0,
      defense: 0,
      magic: 1,
      speed: 0,
    },
    maxRise: {
      life: 0,
      attack: 0,
      defense: 0,
      magic: 4,
      speed: 0,
    },
    learnable: {
      phisic: false,
      magic: true,
    },
  },
  PHISIC: {
    id: WIL_TRAINING_ID.PHISIC,
    name: "打込稽古",
    image: WIL_IMAGE_ID.TRAINING_PHISIC,
    minRise: {
      life: 0,
      attack: 1,
      defense: 0,
      magic: 0,
      speed: 0,
    },
    maxRise: {
      life: 3,
      attack: 4,
      defense: 0,
      magic: 0,
      speed: 0,
    },
    learnable: {
      phisic: true,
      magic: false,
    },
  },
};
