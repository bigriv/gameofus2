import { Ref, ref } from "vue";
import { WIL_SKILL_DEFINES } from "./defines/skill";
import { WilSkill } from "./types/skill";
import { WilCharacter } from "./types/character";
import { WIL_CHARACTER_DEFINES } from "./defines/character";
import { WilPlayer } from "./types/player";
import GOUVisual from "@/composables/types/visuals/GOUVisual";
import { WIL_IMAGE_DEFINES } from "./defines/image";
import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";
import GOUVisualType from "@/composables/types/visuals/GOUVisualType";
import { SequenceId } from "@/composables/utils/id";
import { WIL_SOUND_DEFINES } from "./defines/sound";
import { GOUReadAudio } from "@/composables/types/audio/GOUReadAudio";
import GOUImage from "@/composables/types/visuals/GOUImage";
import { GOULottie } from "@/composables/types/visuals/GOULottie";
import { WilSubEvent } from "./types/event";
import { WIL_SUBEVENT_DEFINES } from "./defines/subevent";

export const useWilInit = () => {
  const initImages = (): { [key: string]: GOUVisual } => {
    let images: { [key: string]: GOUVisual } = {};

    for (const key of Object.keys(WIL_IMAGE_DEFINES)) {
      if (/.*\.[png|svg]/.test(WIL_IMAGE_DEFINES[key])) {
        images[key] = ConstructGOUVisual({
          type: GOUVisualType.IMAGE_SVG,
          path: WIL_IMAGE_DEFINES[key],
          width: 100,
          height: 100,
        });
      } else if (/.*\.json/.test(WIL_IMAGE_DEFINES[key])) {
        images[key] = ConstructGOUVisual({
          type: GOUVisualType.ANIMATION_LOTTIE,
          path: WIL_IMAGE_DEFINES[key],
          width: 100,
          height: 100,
        });
      }
    }

    return images;
  };
  const WIL_IMAGES: { [key: string]: GOUVisual } = initImages();

  const initSounds = (): { [key: string]: GOUReadAudio } => {
    let sounds: { [key: string]: GOUReadAudio } = {};

    for (const key of Object.keys(WIL_SOUND_DEFINES)) {
      sounds[key] = new GOUReadAudio(WIL_SOUND_DEFINES[key]);
    }
    return sounds;
  };
  const WIL_SOUNDS: { [key: string]: GOUReadAudio } = initSounds();

  const initSkills = (): { [key: string]: WilSkill } => {
    let skills: { [key: string]: WilSkill } = {};
    for (const define of WIL_SKILL_DEFINES) {
      skills[define.id] = new WilSkill(define, WIL_IMAGES, WIL_SOUNDS);
    }
    return skills;
  };
  const WIL_SKILLS = initSkills();

  const isLoadedFiles: Ref<boolean> = ref(false);
  const loadFiles = () => {
    for (const key of Object.keys(WIL_IMAGES)) {
      if (WIL_IMAGES[key] instanceof GOUImage) {
        (WIL_IMAGES[key] as GOUImage).load();
      } else if (WIL_IMAGES[key] instanceof GOULottie) {
        (WIL_IMAGES[key] as GOULottie).load();
      }
    }
    for (const key of Object.keys(WIL_SOUNDS)) {
      WIL_SOUNDS[key].load();
    }

    // ロードが完了したかを判定する
    let intervalId = setInterval(() => {
      for (const key of Object.keys(WIL_IMAGES)) {
        if (WIL_IMAGES[key] instanceof GOUImage) {
          if (!(WIL_IMAGES[key] as GOUImage).isLoaded()) {
            return;
          }
        } else if (WIL_IMAGES[key] instanceof GOULottie) {
          if (!(WIL_IMAGES[key] as GOULottie).isLoaded()) {
            return;
          }
        }
      }

      isLoadedFiles.value = true;
      clearInterval(intervalId);
    }, 100);
  };

  const initSubEvents = (): { [key: string]: WilSubEvent } => {
    let events: { [key: string]: WilSubEvent } = {};
    for (let key of Object.keys(WIL_SUBEVENT_DEFINES)) {
      events[key] = new WilSubEvent(
        WIL_SUBEVENT_DEFINES[key],
        WIL_IMAGES,
        WIL_SOUNDS
      );
    }
    return events;
  };
  const WIL_SUB_EVENTS: {
    [key: string]: WilSubEvent;
  } = initSubEvents();

  const characterSequence = new SequenceId();
  const initPlayer = (): WilPlayer => {
    const player = new WilPlayer();

    player.allCharacters = [
      new WilCharacter(
        characterSequence.generateId(),
        WIL_CHARACTER_DEFINES.HERO,
        WIL_SKILLS,
        WIL_IMAGES
      ),
    ];
    return player;
  };
  const player = ref(initPlayer());

  return {
    WIL_IMAGES,
    WIL_SOUNDS,
    WIL_SKILLS,
    WIL_CHARACTER_DEFINES,
    isLoadedFiles,
    loadFiles,
    WIL_SUB_EVENTS,
    characterSequence,
    player,
  };
};
