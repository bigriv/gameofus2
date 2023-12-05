import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_SOUND_ID } from "../enums/sound";
import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WIL_IMAGE_ID } from "../enums/image";

export const WIL_CHAPTER_DEFINES: Array<{
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  battles: Array<{
    name: string;
    background: WIL_IMAGE_ID;
    enemy: Array<{
      x: number;
      y: number;
      character: WIL_CHARACTER_ID;
    }>;
  }>;
  talks: Array<
    Array<{
      talker?: string;
      background?: WIL_IMAGE_ID;
      message?: Array<string>;
      sound?: WIL_SOUND_ID;
      left?: WIL_IMAGE_ID;
      right?: WIL_IMAGE_ID;
    }>
  >;
}> = [
  {
    title: "第１章 聖の国と騎士団",
    flow: [
      WIL_CHAPTER_TIMMING.OPENING,
      WIL_CHAPTER_TIMMING.TALK,
      WIL_CHAPTER_TIMMING.BATTLE,
      WIL_CHAPTER_TIMMING.TALK,
      WIL_CHAPTER_TIMMING.TRAINING,
      WIL_CHAPTER_TIMMING.ENDING,
    ],
    battles: [
      {
        name: "魔物の群れ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        enemy: [
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
          background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
          message: ["俺は主人公。", "しがない田舎に住む青年だ。"],
          left: WIL_IMAGE_ID.CHARACTER_HERO,
        },
        {
          talker: "騎士団長",
          background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
          message: ["やあ、私は聖騎士団の隊長をやっている者だ。"],
          left: WIL_IMAGE_ID.CHARACTER_HERO,
          right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
        },
        {
          talker: "騎士団長",
          background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
          message: ["力を試してやろう。勝負だ！"],
          left: WIL_IMAGE_ID.CHARACTER_HERO,
          right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
        },
      ],
      [
        {
          talker: "騎士団長",
          background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
          message: ["君は強いな。ぜひ一緒に戦ってくれ！"],
          left: WIL_IMAGE_ID.CHARACTER_HERO,
          right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
        },
        {
          talker: "騎士団長",
          background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
          message: ["早速特訓だ！"],
          left: WIL_IMAGE_ID.CHARACTER_HERO,
          right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
        },
      ],
      [
        {
          talker: "騎士団長",
          background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
          message: ["特訓お疲れ様！", "君も今日から聖騎士団の一員だ！"],
          left: WIL_IMAGE_ID.CHARACTER_HERO,
          right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
        },
      ],
    ],
  },
];
