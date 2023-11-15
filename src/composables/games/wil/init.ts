import { ref } from "vue";
import { WIL_SKILL_DEFINES } from "./defines/skill";
import { WilSkill } from "./types/skill";
import { WilCharacter } from "./types/character";
import { WIL_CHARACTER_DEFINES } from "./defines/character";

export const useWilInit = () => {
  const initSkills = (): { [key: string]: WilSkill } => {
    let skills: { [key: string]: WilSkill } = {};
    for (const define of WIL_SKILL_DEFINES) {
      skills[define.id] = new WilSkill(define);
    }
    return skills;
  };

  const initCharacters = (): { [key: string]: WilCharacter } => {
    let characters: { [key: string]: WilCharacter } = {};
    for (const define of WIL_CHARACTER_DEFINES) {
      characters[define.id] = new WilCharacter(define);
    }
    return characters;
  };

  const WIL_SKILLS = ref(initSkills());
  const WIL_CHARACTERS = ref(initCharacters());
  return {
    WIL_SKILLS,
    WIL_CHARACTERS,
  };
};
