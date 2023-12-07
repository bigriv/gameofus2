import { Ref, reactive, ref } from "vue";
import { WilCharacter } from "./types/character";
import { WilPlayer } from "./types/player";
import { WilStatus } from "./types/status";
import { WilTraining } from "./types/training";
import { WIL_TRAINING_ID } from "./enums/training";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_IMAGE_ID } from "./enums/image";

export const useWilTraining = (
  images: { [key: string]: GOUVisual },
  player: WilPlayer
) => {
  const TRAINING_DAYS = 7;
  const day = ref(0);
  const playerCharacters: Ref<Array<WilCharacter>> = ref(
    [...player.allCharacters].sort()
  );
  const trainingPlans: {
    [key: string]: {
      training: WilTraining;
      character?: WilCharacter;
      next?: WIL_TRAINING_ID;
    };
  } = reactive({
    ATTACK: {
      training: new WilTraining({
        id: WIL_TRAINING_ID.ATTACK,
        name: "侵攻訓練",
        image: images[WIL_IMAGE_ID.TRAINING_ATTACK],
      }),
      character: undefined,
      next: WIL_TRAINING_ID.DEFENSE,
    },
    DEFENSE: {
      training: new WilTraining({
        id: WIL_TRAINING_ID.DEFENSE,
        name: "防衛訓練",
        image: images[WIL_IMAGE_ID.TRAINING_DEFENSE],
      }),
      character: undefined,
      next: WIL_TRAINING_ID.MIGRATION,
    },
    MIGRATION: {
      training: new WilTraining({
        id: WIL_TRAINING_ID.MIGRATION,
        name: "移動訓練",
        image: images[WIL_IMAGE_ID.TRAINING_MIGRATION],
      }),
      character: undefined,
      next: WIL_TRAINING_ID.MAGIC,
    },
    MAGIC: {
      training: new WilTraining({
        id: WIL_TRAINING_ID.MAGIC,
        name: "魔導学習",
        image: images[WIL_IMAGE_ID.TRAINING_MAGIC],
      }),
      character: undefined,
      next: WIL_TRAINING_ID.PHISIC,
    },
    PHISIC: {
      training: new WilTraining({
        id: WIL_TRAINING_ID.PHISIC,
        name: "肉体強化",
        image: images[WIL_IMAGE_ID.TRAINING_PHISIC],
      }),
      character: undefined,
      next: undefined,
    },
  });

  const training = (character: WilCharacter, training: WilTraining) => {
    training.before = character.defaultStatus.deepCopy();

    // 訓練処理を実行
    training.proccess();

    // 結果を反映
    character.defaultStatus = WilStatus.add(
      character.defaultStatus,
      training.rise
    );
    if (training.learned && !character.skills.includes(training.learned)) {
      character.skills.push(training.learned);
    }
  };

  const endDay = () => {
    for (const key of Object.keys(trainingPlans)) {
      const character = trainingPlans[key].character;
      if (character) {
        // 元々配置されていたキャラをリストに追加
        playerCharacters.value.push(character);
        playerCharacters.value = playerCharacters.value.sort(
          (a: WilCharacter, b: WilCharacter) => a.id.localeCompare(b.id)
        );
      }

      trainingPlans[key].character = undefined;
      trainingPlans[key].training.reset();
    }
    day.value++;
  };

  return {
    TRAINING_DAYS,
    day,
    playerCharacters,
    trainingPlans,
    training,
    endDay,
  };
};
