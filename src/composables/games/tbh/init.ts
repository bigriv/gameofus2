import { Ref, ref } from "vue";
import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";
import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import GOUFrame from "@/composables/types/visuals/GOUFrame";
import GOUImage from "@/composables/types/visuals/GOUImage";
import GOUPosition from "@/composables/types/GOUPosition";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import { TbhItem } from "@/composables/games/tbh/types/item";
import { TbhPlayer } from "@/composables/games/tbh/types/player";
import { TbhStatus } from "@/composables/games/tbh/types/status";
import { TbhCharacter } from "@/composables/games/tbh/types/character";
import TBH_ITEM_DEFINES from "@/composables/games/tbh/defines/item";
import { TBH_ITEM_ID } from "@/composables/games/tbh/enums/item";
import {
  TBH_BOSS,
  TBH_HERO,
  TBH_MONSTER,
  TBH_SHOPPER,
  TBH_YANKEE,
} from "@/composables/games/tbh/defines/character";
import { TBH_SOUND_DEFINES } from "@/composables/games/tbh/defines/sound";
import { TBH_IMAGE_DEFINES } from "@/composables/games/tbh/defines/image";

export const useTbhInit = () => {
  const isLoadedFiles: Ref<boolean> = ref(false);
  const initSounds = (): { [key: string]: GOUReadAudio } => {
    let sounds: { [key: string]: GOUReadAudio } = {};

    for (const key of Object.keys(TBH_SOUND_DEFINES)) {
      sounds[key] = new GOUReadAudio(TBH_SOUND_DEFINES[key]);
    }
    return sounds;
  };
  const initImages = (): { [key: string]: GOUVisual } => {
    let images: { [key: string]: GOUVisual } = {};

    for (const key of Object.keys(TBH_IMAGE_DEFINES)) {
      images[key] = ConstructGOUVisual({
        type: GOUVisualType.IMAGE_SVG,
        path: TBH_IMAGE_DEFINES[key],
        width: 100,
        height: 100,
      });
    }
    return images;
  };

  const initItems = (): { [key: string]: TbhItem } => {
    let items: { [key: string]: TbhItem } = {};
    for (const key of Object.keys(TBH_ITEM_DEFINES)) {
      if (!Object.values(TBH_ITEM_ID).includes(key as TBH_ITEM_ID)) {
        console.error(`key:'${key}' is undefined in item ids.`);
        continue;
      }

      const visual = TBH_IMAGES[TBH_ITEM_DEFINES[key].visual.id];
      visual.width = TBH_ITEM_DEFINES[key].visual.width;
      visual.height = TBH_ITEM_DEFINES[key].visual.height;
      items[key] = new TbhItem({
        id: key as TBH_ITEM_ID,
        name: TBH_ITEM_DEFINES[key].name,
        detail: TBH_ITEM_DEFINES[key].detail,
        visual: visual,
        price: TBH_ITEM_DEFINES[key].price,
      });
    }
    return items;
  };

  const initPlayer = (): TbhPlayer => {
    const visual = new GOUFrame(100, 100);
    const head = TBH_IMAGES.NORMAL_HEAD;
    head.width = 100;
    head.height = 100 / 3;
    head.zIndex = 2;
    head.setPosition(new GOUPosition(0, 0));
    visual.setChild("head", head);

    const upper_body = TBH_IMAGES.NORMAL_UPPERBODY;
    upper_body.width = 100;
    upper_body.height = 100 / 3;
    upper_body.zIndex = 2;
    upper_body.setPosition(new GOUPosition(0, 100 / 3));
    visual.setChild("upper_body", upper_body);

    const lower_body = TBH_IMAGES.NORMAL_LOWERBODY;
    lower_body.width = 100;
    lower_body.height = 100 / 3;
    lower_body.zIndex = 2;
    lower_body.setPosition(new GOUPosition(0, (100 / 3) * 2));
    visual.setChild("lower_body", lower_body);

    return new TbhPlayer({
      stamina: 100,
      justice: 0,
      visual: visual,
      money: 1000,
      status: new TbhStatus(TBH_HERO.initStatus),
    });
  };

  const initCharacters = (): { [key: string]: TbhCharacter } => {
    const charactersDefines: {
      [key: string]: {
        visual: {
          id: string;
        };
        initStatus?: {
          power: number;
          life: number;
        };
      };
    } = {
      SHOPPER: TBH_SHOPPER,
      YANKEE: TBH_YANKEE,
      MONSTER: TBH_MONSTER,
      BOSS: TBH_BOSS,
    };
    let characters: { [key: string]: TbhCharacter } = {};

    for (const key of Object.keys(charactersDefines)) {
      const define = charactersDefines[key];
      const visual = TBH_IMAGES[define.visual.id];
      visual.width = 100;
      visual.height = 100;
      characters[key] = new TbhCharacter({
        visual: visual,
        status: new TbhStatus(define.initStatus),
      });
    }
    return characters;
  };
  const TBH_SOUNDS: { [key: string]: GOUReadAudio } = initSounds();
  const TBH_IMAGES: { [key: string]: GOUVisual } = initImages();
  const TBH_ITEMS = initItems();
  const TBH_CHARACTERS = initCharacters();
  const player = ref(initPlayer());

  const loadFiles = () => {
    for (const key of Object.keys(TBH_IMAGES)) {
      (TBH_IMAGES[key] as GOUImage).load();
    }
    for (const key of Object.keys(TBH_SOUNDS)) {
      TBH_SOUNDS[key].load();
    }

    // ロードが完了したかを判定する
    let intervalId = setInterval(() => {
      for (const key of Object.keys(TBH_IMAGES)) {
        if (!(TBH_IMAGES[key] as GOUImage).isLoaded()) {
          return;
        }
      }

      for (const key of Object.keys(TBH_SOUNDS)) {
        if (!TBH_SOUNDS[key].isLoaded()) {
          return;
        }
      }
      isLoadedFiles.value = true;
      clearInterval(intervalId);
    }, 100);
  };

  return {
    isLoadedFiles,
    TBH_SOUNDS,
    TBH_IMAGES,
    TBH_ITEMS,
    TBH_CHARACTERS,
    player,
    loadFiles,
  };
};
