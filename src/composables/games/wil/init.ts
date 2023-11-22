import { ref } from "vue";
import { WIL_SKILL_DEFINES } from "./defines/skill";
import { WilSkill } from "./types/skill";
import { WilCharacter } from "./types/character";
import { WIL_CHARACTER_DEFINES } from "./defines/character";
import { WilPlayer } from "./types/player";

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

  const initPlayer = (): WilPlayer => {
    const player = new WilPlayer();
    player.characters = [
      WIL_CHARACTERS.value.HERO,
      WIL_CHARACTERS.value.HOLY_KNIGHTS_SOLDIER,
      WIL_CHARACTERS.value.HOLY_KNIGHTS_MAGICIAN,
      WIL_CHARACTERS.value.HOLY_KNIGHTS_LEADER,
      WIL_CHARACTERS.value.HOLY_KNIGHTS_ARCHER,
    ];
    return player
  };
  const WIL_SKILLS = ref(initSkills());
  const WIL_CHARACTERS = ref(initCharacters());
  const player = ref(initPlayer());

  return {
    WIL_SKILLS,
    WIL_CHARACTERS,
    player,
  };
};
