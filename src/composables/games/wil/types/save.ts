import { WilChapterDefine } from "@/composables/games/wil/defines/chapter";
import { WIL_CHARACTER_ID } from "@/composables/games/wil/enums/character";
import { WIL_SKILL_ID } from "@/composables/games/wil/enums/skill";
import { WilChapter } from "@/composables/games/wil/types/chapter";
import { WilPlayer } from "@/composables/games/wil/types/player";

export class WilSaveUtil {
  private constructor() {}

  static save(chapter: WilChapter, player: WilPlayer) {
    const data = {
      chapter: 1,
      flow: -1,
      characters: new Array<{
        model: WIL_CHARACTER_ID;
        defaultStatus: {
          life: number;
          attack: number;
          defense: number;
          speed: number;
          magic: number;
        };
        skills: Array<WIL_SKILL_ID>;
      }>(),
    };

    data.chapter = chapter.id;
    data.flow = chapter.getCurrentFlow();

    data.characters = player.allCharacters.map((character) => {
      return {
        model: character.model,
        defaultStatus: character.defaultStatus.toJson(),
        skills: character.skills,
      };
    });

    localStorage.setItem("gameofus.wil.save", JSON.stringify(data));
  }

  static load(): {
    chapter?: WilChapterDefine;
    flow: number;
    characters: Array<{
      model: WIL_CHARACTER_ID;
      defaultStatus: {
        life: number;
        attack: number;
        defense: number;
        speed: number;
        magic: number;
      };
      skills: Array<WIL_SKILL_ID>;
    }>;
  } {
    const stringJson = localStorage.getItem("gameofus.wil.save");
    if (!stringJson) {
      return {
        chapter: undefined,
        flow: -1,
        characters: [],
      };
    }
    const json = JSON.parse(stringJson);

    let chapter = undefined;
    if (typeof json.chapter === "number") {
      chapter = WilChapter.getChapterDefine(json.chapter);
    }

    let flow = -1;
    if (typeof json.flow === "number") {
      flow = json.flow;
    }

    let characters = [];
    if (json.characters instanceof Array) {
      characters = json.characters;
    }

    return {
      chapter: chapter,
      flow: flow,
      characters: characters,
    };
  }
}
