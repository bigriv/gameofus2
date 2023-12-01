import { ref } from "vue";
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
import { GOUAudio } from "@/composables/types/audio/GOUAudio";

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

  const initSounds = (): { [key: string]: GOUAudio } => {
    return {};
  };
  const WIL_SOUNDS: { [key: string]: GOUAudio } = initSounds();

  const initSkills = (): { [key: string]: WilSkill } => {
    let skills: { [key: string]: WilSkill } = {};
    for (const define of WIL_SKILL_DEFINES) {
      skills[define.id] = new WilSkill(define);
    }
    return skills;
  };
  const WIL_SKILLS = ref(initSkills());

  const characterSequence = new SequenceId();
  const initPlayer = (): WilPlayer => {
    const player = new WilPlayer();

    const getImageAssignedDefine = (define: any) => {
      return Object.assign(JSON.parse(JSON.stringify(define)), {
        visual: WIL_IMAGES[define.visual],
        miniVisual: WIL_IMAGES[define.miniVisual],
      });
    };
    console.log(getImageAssignedDefine(WIL_CHARACTER_DEFINES.HERO));
    player.characters = [
      new WilCharacter(
        characterSequence.generateId(),
        getImageAssignedDefine(WIL_CHARACTER_DEFINES.HERO)
      ),
      new WilCharacter(
        characterSequence.generateId(),
        getImageAssignedDefine(WIL_CHARACTER_DEFINES.HOLY_KNIGHTS_SOLDIER)
      ),
      new WilCharacter(
        characterSequence.generateId(),
        getImageAssignedDefine(WIL_CHARACTER_DEFINES.HOLY_KNIGHTS_MAGICIAN)
      ),
      new WilCharacter(
        characterSequence.generateId(),
        getImageAssignedDefine(WIL_CHARACTER_DEFINES.HOLY_KNIGHTS_LEADER)
      ),
      new WilCharacter(
        characterSequence.generateId(),
        getImageAssignedDefine(WIL_CHARACTER_DEFINES.STORM_SHOOTERS_ARCHER)
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
    characterSequence,
    player,
  };
};
