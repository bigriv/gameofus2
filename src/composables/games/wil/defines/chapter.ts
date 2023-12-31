import { WIL_CHARACTER_ID } from "../enums/character";
import { WIL_SOUND_ID } from "../enums/sound";
import { WIL_CHAPTER_TIMMING } from "../enums/timming";
import { WIL_IMAGE_ID } from "../enums/image";

export type WilChapterDefine = {
  title: string;
  flow: Array<WIL_CHAPTER_TIMMING>;
  battles: Array<{
    playerTeamName: string;
    computerTeamName: string;
    computerLevel: number;
    background: WIL_IMAGE_ID;
    deployBgm?: WIL_SOUND_ID;
    battleBgm?: WIL_SOUND_ID;
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
      bgm?: WIL_SOUND_ID;
      left?: WIL_IMAGE_ID;
      right?: WIL_IMAGE_ID;
    }>
  >;
  updateTeam: Array<{
    in: Array<WIL_CHARACTER_ID>;
    out: Array<WIL_CHARACTER_ID>;
  }>;
};

export const WIL_CHAPTER_1_DEFINE: WilChapterDefine = {
  title: "第１章 聖の国と騎士団",
  flow: [
    WIL_CHAPTER_TIMMING.OPENING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.TRAINING,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.BATTLE,
    WIL_CHAPTER_TIMMING.TALK,
    WIL_CHAPTER_TIMMING.TEAM,
    WIL_CHAPTER_TIMMING.ENDING,
  ],
  battles: [
    {
      playerTeamName: "ヒカル&ボルグ",
      computerTeamName: "魔物の群れ",
      computerLevel: 1,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY_1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE_1,
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
      playerTeamName: "ヒカル&騎士団員",
      computerTeamName: "聖騎士団",
      computerLevel: 1,
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_KINGDOM,
      deployBgm: WIL_SOUND_ID.BGM_DEPLOY_1,
      battleBgm: WIL_SOUND_ID.BGM_BATTLE_1,
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
        talker: "村長",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "ヒカル、今年の収穫もよろしく頼むよ。",
          "若い男ではヒカル一人だからね。頼りにしてるよ。",
        ],
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["はい。任せてください。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: ["（俺はヒカル。聖の国の端の田舎村に住む、ただの農民だ。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "村長",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "そうだ、最近妙なうめき声が聞こえるらしい。",
          "魔物なんか、私が子供のころには見なくなっていたが、一応気をつけてな。",
        ],
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
        message: [
          "わかりました。",
          "でも、村に何かあったら、俺に任せてください。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        message: ["その日の夕方"],
      },
      {
        talker: "村の子供",
        sound: WIL_SOUND_ID.SE_MONSTER,
        bgm: WIL_SOUND_ID.BGM_PINCH_1,
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["きゃー！"],
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["あれは、魔物...？", "少なくとも人間ではないな...。"],
        sound: WIL_SOUND_ID.SE_MONSTER,
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_SHADOW,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["...危ない！"],
        sound: WIL_SOUND_ID.SE_MONSTER,
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_SHADOW,
      },
      {
        message: [""],
        sound: WIL_SOUND_ID.SE_FIGHTING,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["はぁはぁ...。", "もう大丈夫。早く逃げるんだ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "（子供の手前、ああ言ったけど、かなり厳しいな...。）",
          "（このままじゃ、村が...。）",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        sound: WIL_SOUND_ID.SE_MONSTER,
        message: ["...！？", "しまった！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_SHADOW,
      },
      {
        talker: "？？？",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
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
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "俺は聖騎士団の隊長、ボルグ！",
          "今からこの村は聖騎士団が守る！",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["聖騎士団！？", "まさか、なんでこんなところに！？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["そんなことより、君も早く逃げなさい。", "ここは危険だ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["（逃げるか...？でも、この村は...。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "すみません、俺にも戦わせてください！",
          "足手まといにはならないようにします。",
          "この村を、守りたいんです！",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["...いい目だ。", "仕方ない。俺のそばから離れるなよ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["...はい！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        sound: WIL_SOUND_ID.SE_MONSTER,
        message: ["くるぞ！構えろ！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
    ],
    [
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        bgm: WIL_SOUND_ID.BGM_VILLAGE_1,
        message: ["ふう、なんとか凌いだかな...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["それにしても君、やるね。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["ありがとうございます。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "こんなことを頼むのもなんだが、聖騎士団に入ってみないか？",
          "君ほどの強さなら、歓迎するよ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "せっかくのお誘いですが、またいつこの村が襲われるか分からないので...。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "そうか、村を守るためか...。",
          "だが、それならなおさら聖騎士団に入った方がいい。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["それは、どういう...？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "実は、魔物が急に現れだしたのには理由があってね。",
          "最近、焔の国が魔王の封印の一部を解いてしまったようなんだ。",
          "そこから漏れ出した闇の魔素から、魔物が生まれているようなんだ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["そんなことが...。", "でも、どうして焔の国はそんなことを？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "魔王の力を利用して、他の国を支配し、世界の王になろうとしてるのさ。",
          "おっと、少し喋りすぎてしまった。",
          "ま、とにかく焔の国を何とかしないと、この村どころか聖の国自体が危ないんだよ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: ["なるほど...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "さっきの戦いぶり、君の力には期待しているんだ。",
          "そうだ、村が心配なら駐屯兵を配置するように手配しておこう。",
          "徴兵がなければ、今の君が守るよりは安全だろう。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "兵を配置していただけるんですか！？",
          "（ここまで言ってくれるんだ。あんまり気は乗らないけど...。）",
          "分かりました。聖騎士団に入ります。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "よし！よく言ってくれた！",
          "じゃあ、いろいろと準備があるから、一週間後に帝都に来てくれ。",
          "楽しみにしているよ！",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
        message: [
          "...行っちゃった。",
          "一週間後か...。",
          "少しでも役に立てるように、特訓しておくか。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
    ],
    [
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        bgm: WIL_SOUND_ID.BGM_HOLY_CASLE_1,
        message: ["はあ、帝都は広いなあ。えーと、聖騎士団に会うには...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["おや、そこにいるのは、この間の少年じゃないか。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["あなたはあの時の...！"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "俺は聖騎士団隊長、ボルグ！...って前にも自己紹介したっけか？",
          "えーと、君は...",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["ヒカルです。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "ヒカル君、待っていたよ。",
          "じゃあ早速入団試験を始めようか。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["え、入団試験？", "そんなの聞いてないんですが...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "スカウトしたとはいえ、改めて力を確認しておきたいからね。",
          "なに、難しい試験じゃないさ。",
          "聖騎士団相手の三対三の模擬戦に勝ってくれれば良い。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "もちろん聖騎士団側は手加減するし、負けたからって即不合格ってわけじゃないよ。",
          "君の味方二人は聖騎士団の中から見繕うから、好きに使ってくれ。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["試験って、人格とか知能の確認とかは？"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "筆記試験とか倫理試験とかも考えたけど、面倒くさくてね。",
          "剣を交えれば大体わかるだろう。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["（この人、こんなに脳筋だったのか...。）"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "何か失礼なことを考えてそうだけど、まあいいや。",
          "彼らが君の味方、さあ部隊を編成して早速始めようか。",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "騎士兵",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["よろしく"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      },
      {
        talker: "魔導兵",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["よろしく"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["よろしくお願いします。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
    ],
    [
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["はぁはぁ、なんとか勝ててた...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
      {
        talker: "聖騎士団隊長 ボルグ",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: [
          "まさか、本当に勝てるとは思ってなかったよ。",
          "やはり君は俺の期待に応えてくれそうだね。",
          "これから、よろしく！",
        ],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
        right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      },
      {
        talker: "ヒカル",
        background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
        message: ["なんか、疲れた...。"],
        left: WIL_IMAGE_ID.CHARACTER_HERO,
      },
    ],
  ],
  updateTeam: [
    {
      in: [WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER],
      out: [],
    },
    {
      in: [],
      out: [WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER],
    },
    {
      in: [
        WIL_CHARACTER_ID.HOLY_KNIGHTS_SOLDIER,
        WIL_CHARACTER_ID.HOLY_KNIGHTS_MAGICIAN,
      ],
      out: [],
    },
    {
      in: [WIL_CHARACTER_ID.HOLY_KNIGHTS_LEADER],
      out: [],
    },
  ],
};
