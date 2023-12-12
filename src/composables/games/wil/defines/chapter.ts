import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_SOUND_ID } from "../enums/sound";
import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WIL_IMAGE_ID } from "../enums/image";

type WiChapterDefine = {
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  battles: Array<{
    name: string;
    background: WIL_IMAGE_ID;
    deploy: Array<{
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
};

export const WIL_CHAPTER_1_DEFINE: WiChapterDefine = {
  title: "第１章 聖の国と騎士団",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  battles: [
    {
      name: "魔物の群れ",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
      deploy: [
        {
          x: 0,
          y: 2,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
        {
          x: 1,
          y: 0,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
        {
          x: 1,
          y: 4,
          character: WIL_CHARACTER_ID.DARK_MONSTER_SHADOW,
        },
      ],
    },
    {
      name: "聖騎士団",
      background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
      deploy: [
        {
          x: 0,
          y: 1,
          character: WIL_CHARACTER_ID.HOLY_KNIGHTS_SOLDIER,
        },
        {
          x: 1,
          y: 2,
          character: WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER,
        },
        {
          x: 2,
          y: 3,
          character: WIL_CHARACTER_ID.HOLY_KNIGHTS_MAGICIAN,
        },
      ],
    },
  ],
  talks: [
    [
      {
        message: ["かつてこの世界には、魔物が蔓延っていた。"],
      },
      {
        message: [
          "だが、その昔、聖剣を持った勇者が魔王を倒し、五体に分割して封印した。",
        ],
      },
      {
        message: [
          "魔王の五体は、氷の国、嵐の国、毒の国、焔の国、そして聖の国の五つの国で管理されている。",
        ],
      },
      {
        message: [
          "魔王が封印されている限り、魔物は減り、平和が続くと勇者は語ったそうだ。",
          "実際、ここ数百年で、魔物の目撃情報はほとんどない。",
        ],
      },
      {
        message: [
          "だが、世界の覇権を手にしようとしている焔の国が、魔王の力を利用するため、その封印の一部を解いてしまったらしい。",
          "封印の一部が解かれたことにより、平和だった世界に再び魔物が現れ、各所で暴れだしている。",
        ],
      },
      {
        talker: "？？？",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["...なるほど。それで最近は聖騎士団の動きが活発なのか。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["（俺はレイ。聖の国の端の田舎村に住む、ただの農民だ。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "もし、この村に魔物が襲ってきたとしたら...。",
          "この村にいるのは、隣のじいちゃんばあちゃん、最高でも10歳の子供とその母親たち。",
          "子供たちの父親は大体出稼ぎに出てるから、あとは犬、猫、牛...。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "戦えそうなのは俺と、村長(50歳)くらいか...。",
          "ちょっと鍛えておこうかな...。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        message: ["半月後。"],
      },
      {
        talker: "村の子供",
        sound: WIL_SOUND_ID.SE_MONSTER,
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["きゃー！"],
      },
      {
        talker: "子供の母親",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["魔物よー！"],
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["まさか、本当に！？", "すぐに助けに行かなきゃ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "レイ",
        sound: WIL_SOUND_ID.SE_FIGHTING,
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["はぁはぁ...。", "もう大丈夫。早く逃げるんだ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["（子供の手前、ああ言ったけど、かなり厳しいな...。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        sound: WIL_SOUND_ID.SE_MONSTER,
        message: ["...！？", "しまった！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "？？？",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        sound: WIL_SOUND_ID.SE_GARD,
        message: [
          "おっと、危ない。",
          "よくここまで持ちこたえたな。",
          "もう大丈夫だ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "俺は聖騎士団の団長、ザーグ！",
          "今からこの村は聖騎士団が守る！",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["聖騎士団！？", "まさか、なんでこんなところに！？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["そんなことより、君も早く逃げなさい。", "ここは危険だ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["（逃げるか...？でも、この村は...。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "すみません、俺にも戦わせてください！",
          "足手まといにはならないようにします。",
          "この村を、守りたいんです！",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["...いい目だ。", "仕方ない。俺のそばから離れるなよ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["...はい！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        sound: WIL_SOUND_ID.SE_MONSTER,
        message: ["くるぞ！構えろ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
    ],
    [
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["ふう、なんとか凌いだかな...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["それにしても君、やるね。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["ありがとうございます。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["（鍛えておいてよかった...！）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["こんなことを頼むのもなんだが、聖騎士団に入ってみないか？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "実は焔の国の侵攻に備えて、戦力を拡大していてね。",
          "君程の力なら歓迎するよ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "せっかくのお誘いですが、またいつこの村が襲われるか分からないので...。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "それならなおさら聖騎士団に入った方がいい。この先、戦争が続くかもしれないからね。",
          "もし負ければ、この村どころか、国の安全さえ保証できない。君の力で聖の国を勝利に導くのが平和への一番の近道だと思うよ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "まあ、すぐにとは言わない。",
          "気が向いたら聖騎士団を訪ねてくれ。いつでも歓迎するよ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["（村の皆を守るためには...。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        message: ["1週間後。"],
      },
    ],
    [
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["はあ、帝都は広いなあ。えーと、聖騎士団に会うには...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["おや、そこにいるのは、この間の少年じゃないか。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["あなたはあの時の...！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "俺は聖騎士団団長、ザーグ！...って前にも自己紹介したっけか？",
          "えーと、君は...",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["レイです。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["レイ君、聖騎士団に入る気になったのかな？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "はい。聖騎士として強くなれば、今度は一人でも村の皆を守れるようになると思って。",
          "それに、聖騎士として働いたお金があれば、用心棒も雇えるかもしれないですから。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "なるほどね。まあ動機は何であれ、戦力になってくれればいいさ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["じゃあ、早速入団試験だ。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["入団試験？", "そんなの聞いてないんですが...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "スカウトしたとはいえ、改めて力を確認しておきたいからね。",
          "なに、こちらにも準備があるからね、今すぐにというわけではないさ。",
          "試験は7日後に行うから、それまで訓練しておくといい。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["じゃあ、7日後にまた会おう。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "行っちゃった。マイペースな人だな...。",
          "7日間か、どうやって鍛えよう...。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
    ],
    [
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["しっかり鍛えたし、大丈夫なはずだ。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "やあ、レイ君。準備はできてそうだね。",
          "それじゃあ入団試験を始めよう。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "試験内容は簡単。聖騎士団相手の三対三の模擬戦に勝てば良い。",
          "君の味方二人は聖騎士団の中から見繕うから、好きに使ってくれ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["以上。", "な、簡単だろ？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["それだけですか？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "そうだ。筆記試験とか倫理試験とかも考えたけど、面倒くさくてね。",
          "剣を交えれば大体わかるだろう。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "レイ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["（この人、こんなに脳筋だったのか...。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団団長 ザーグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "何か失礼なことを考えてそうだけど、まあいいや。",
          "彼らが君の味方、さあ部隊を編成して早速始めようか。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
    ],
  ],
};
