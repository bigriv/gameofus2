import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_SOUND_ID } from "../enums/sound";
import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WIL_IMAGE_ID } from "../enums/image";

export const WIL_CHAPTER_DEFINES: Array<{
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  enemys: Array<{
    name: string;
    deploy: Array<{
      x: number;
      y: number;
      character: WIL_CHARACTER_ID;
    }>;
  }>;
  talks: Array<Array<{
    talker?: string;
    message?: Array<string>;
    sound?: WIL_SOUND_ID;
    left?: WIL_IMAGE_ID;
    right?: WIL_IMAGE_ID;
  }>>;
}> = [
  {
    title: "第１章 聖の国と騎士団",
    flow: [
      WIL_CHAPTER_TIMMING.OPENING,
      WIL_CHAPTER_TIMMING.TALK,
      WIL_CHAPTER_TIMMING.BATTLE,
      WIL_CHAPTER_TIMMING.TALK,
      WIL_CHAPTER_TIMMING.ENDING,
    ],
    enemys: [
      {
        name: "魔物の群れ",
        deploy: [
          {
            x: 0,
            y: 0,
            character: WIL_CHARACTER_ID.HERO,
          },
        ],
      },
    ],
    talks: [
      [
        {
          talker: "主人公",
          message: ["俺は主人公。", "しがない田舎に住む青年だ。"],
          left: WIL_IMAGE_ID.CHARACTER_HERO,
          right: WIL_IMAGE_ID.CHARACTER_HERO,
        },
      ],
    ],
  },
];
