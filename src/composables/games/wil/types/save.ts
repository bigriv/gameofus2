import { WIL_CHAPTER_1_DEFINE, WilChapterDefine } from "../defines/chapter";
import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_SKILL_ID } from "../enums/skill";
import { WilChapter } from "./chapter";
import { WilSubEvent } from "./event";
import { WilPlayer } from "./player";

export class WilSaveUtil {
  private constructor() {}

  static save(
    chapter: WilChapter,
    player: WilPlayer,
    subevents: { [key: string]: WilSubEvent }
  ) {
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
      subevents: new Array<{
        id: string;
        end: Boolean;
      }>(),
    };

    data.chapter = chapter.id;
    data.flow = chapter.getCurrentFlow();

    data.characters = player.allCharacters.map((character) => {
      return {
        model: character.model,
        defaultStatus: character.defaultStatus.toJson(),
        skills: character.skills.map((skill) => skill.id),
      };
    });

    for (const key of Object.keys(subevents)) {
      data.subevents.push({
        id: key,
        end: subevents[key].end,
      });
    }

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
    subevents?: Array<{ id: string; end: boolean }>;
  } {
    const stringJson = localStorage.getItem("gameofus.wil.save");
    if (!stringJson) {
      return {
        chapter: undefined,
        flow: -1,
        characters: [],
        subevents: undefined,
      };
    }
    const json = JSON.parse(stringJson);

    let chapter = undefined;
    if (typeof json.chapter === "number") {
      switch (json.chapter) {
        case 1:
          chapter = WIL_CHAPTER_1_DEFINE;
          break;
      }
    }

    let flow = -1;
    if (typeof json.flow === "number") {
      flow = json.flow;
    }

    let characters = [];
    if (json.characters instanceof Array) {
      characters = json.characters;
    }

    let subevents = [];
    if (json.subevents instanceof Array) {
      subevents = json.subevents;
    }

    return {
      chapter: chapter,
      flow: flow,
      characters: characters,
      subevents: subevents,
    };
  }
}
