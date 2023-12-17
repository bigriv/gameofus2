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

export const useWilInit = () => {
  const initImages = (): { [key: string]: GOUVisual } => {
    let images: { [key: string]: GOUVisual } = {};

    for (const key of Object.keys(WIL_IMAGE_DEFINES)) {
      images[key] = ConstructGOUVisual({
        type: GOUVisualType.IMAGE_SVG,
        path: WIL_IMAGE_DEFINES[key],
        width: 100,
        height: 100,
      });
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
      skills[define.id] = new WilSkill(define);
    }
    return skills;
  };
  const WIL_SKILLS = ref(initSkills());

  const isLoadedFiles: Ref<boolean> = ref(false);
  const loadFiles = () => {
    for (const key of Object.keys(WIL_IMAGES)) {
      (WIL_IMAGES[key] as GOUImage).load();
    }
    for (const key of Object.keys(WIL_SOUNDS)) {
      WIL_SOUNDS[key].load();
    }

    // ロードが完了したかを判定する
    let intervalId = setInterval(() => {
      for (const key of Object.keys(WIL_IMAGES)) {
        if (!(WIL_IMAGES[key] as GOUImage).isLoaded()) {
          return;
        }
      }

      isLoadedFiles.value = true;
      clearInterval(intervalId);
    }, 100);
  };

  const characterSequence = new SequenceId();
  const initPlayer = (): WilPlayer => {
    const player = new WilPlayer();

    player.allCharacters = [
      new WilCharacter(
        characterSequence.generateId(),
        WIL_CHARACTER_DEFINES.HERO,
        WIL_SKILLS.value,
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
    characterSequence,
    player,
  };
};
