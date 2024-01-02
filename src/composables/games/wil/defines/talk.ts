import { WIL_IMAGE_ID } from "../enums/image";
import { WIL_SOUND_ID } from "../enums/sound";

export type WilTalkDefine = Array<{
  talker?: string;
  background?: WIL_IMAGE_ID;
  message?: Array<string>;
  sound?: WIL_SOUND_ID;
  bgm?: WIL_SOUND_ID;
  left?: WIL_IMAGE_ID;
  right?: WIL_IMAGE_ID;
}>;

/**
 * メインイベントの会話イベント定義
 */
export const WIL_MAIN_TALK_DEFINES: {
  [key: string]: WilTalkDefine;
} = {
  CHAPTER_1_1: [
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
        "魔王が封印されている限り、魔物は減り、平和が続くだろうと勇者は語ったそうだ。",
        "実際、ここ数百年で、魔物の目撃情報はほとんどない。",
      ],
    },
    {
      message: [
        "だが、世界の覇権を手にしようとしている焔の国が、魔王の力を利用するため、その封印の一部を解いてしまった。",
        "封印の一部が解かれたことにより、平和だった世界に再び魔物が現れ、各所で暴れだしている。",
      ],
    },
    {
      talker: "村長",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE,
      bgm: WIL_SOUND_ID.BGM_VILLAGE_1,
      message: [
        "ヒカル、今年の収穫もよろしく頼むよ。",
        "若い男はヒカル一人だからね。頼りにしてるよ。",
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
      left: WIL_IMAGE_ID.CHARACTER_HERO,
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
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_SHADOW,
    },
    {
      talker: "ヒカル",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
      message: ["あれは、魔物...？", "少なくとも人間ではないな...。"],
      sound: WIL_SOUND_ID.SE_MONSTER,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
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
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
      message: [
        "俺は聖騎士団の隊長、ザーグ！",
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
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
      message: ["...いい目だ。", "仕方ない。俺から離れるなよ！"],
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
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
      sound: WIL_SOUND_ID.SE_MONSTER,
      message: ["くるぞ！構えろ！"],
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
    },
  ],
  CHAPTER_1_2: [
    {
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
      bgm: WIL_SOUND_ID.BGM_VILLAGE_1,
      message: ["ふう、なんとか凌いだかな...。"],
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
    },
    {
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
      message: [
        "実は、魔物が急に現れだしたのには理由があってね。",
        "最近、焔の国が魔王の封印の一部を解いてしまったようなんだ。",
        "漏れ出した魔王の魔力から、魔物が生まれ出しているらしい。",
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
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_VILLAGE_EVENING,
      message: [
        "さっきの戦いぶり、君の力には期待しているんだ。",
        "そうだ、村が心配なら駐屯兵を配置するように手配しておこう。",
        "徴兵がなければ常駐できるだろうし、今の君が守るよりは安全だろう。",
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
      talker: "聖騎士団隊長 ザーグ",
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
  CHAPTER_1_3: [
    {
      talker: "ヒカル",
      background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
      bgm: WIL_SOUND_ID.BGM_HOLY_CASLE_1,
      message: ["はあ、帝都は広いなあ。えーと、聖騎士団に会うには...。"],
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
      message: [
        "俺は聖騎士団隊長、ザーグ！...って前にも自己紹介したっけか？",
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
      talker: "聖騎士団隊長 ザーグ",
      background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
      message: ["ヒカル君、待っていたよ。", "じゃあ早速入団試験を始めようか。"],
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
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
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
      talker: "聖騎士団隊長 ザーグ",
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
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
    },
  ],
  CHAPTER_1_4: [
    {
      talker: "ヒカル",
      background: WIL_IMAGE_ID.BACKGROUND_KINGDOM,
      message: ["はぁはぁ、なんとか勝てた...。"],
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "聖騎士団隊長 ザーグ",
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
};

/**
 * サブイベントの会話イベント定義
 */
export const WIL_SUB_TALK_DEFINES: {
  [key: string]: WilTalkDefine;
} = {
  HERO_1: [
    {
      talker: "ヒカル",
      message: ["なるほど、聖騎士団の特訓は大きく分けて5種類あるのか。"],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      bgm: WIL_SOUND_ID.BGM_VILLAGE_1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "侵攻訓練は攻めること、防衛訓練は守ることに焦点を当てた訓練で、",
        "移動訓練は体力をつけて素早く行動できるようになるための訓練。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "魔導訓練では新しい魔法を覚えられて、",
        "打込稽古では剣技を学んだりできるみたいだ。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "バランスよく鍛えるか、特化して鍛えるか、自分に合った鍛え方をしないとな...。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "そういえば、魔法や剣技は素質がないと使えないって話をどこかで聞いたな。",
        "剣技はともかく、俺って魔法の素質あるのかな...？",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
  ],
  HERO_2: [
    {
      talker: "ヒカル",
      message: ["前にザーグさんと戦ったとき、魔物が陣形をとっていたな。"],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      bgm: WIL_SOUND_ID.BGM_VILLAGE_1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: ["戦う時の位置って何か意味があるのかな？"],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "ああ、当然だけど、目の前に味方がいたら剣では攻撃できないか。",
        "逆に、敵の前に別の敵がいたら攻撃が届かないな。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "そういえば、ザーグさんが使っていた雷の技は、近くにいると感電しそうだったな。",
        "もしかして、技によって攻撃が影響する範囲が変わったりするとか？",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: ["戦う時の立ち位置、意外と重要かもな...。"],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
  ],
  HERO_3: [
    {
      talker: "ヒカル",
      message: ["学んでみて改めて思うけど、魔法って不思議な力だな。"],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      bgm: WIL_SOUND_ID.BGM_VILLAGE_1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "魔法を使うには魔法の源となる力『魔素』を体の中で練りこむ必要があるらしい。",
        "魔素は見ることも触ることもできないから、練りこむって言われてもイメージが難しいんだよな。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "それと、人には生まれた持った属性があって、その属性にあった魔法しか覚えられないみたいだ。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "属性には相性があって、弱点をつけたり、抵抗があったりするらしい。",
        "ザーグさんは雷の技を使えたし、雷属性なのかな。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "えーと、雷属性は水属性に強く、土属性に弱いのか。",
        "これから聖騎士団に入るんだし、覚えておいたほうが良さそうだ。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "そういえば、俺の属性って...光？",
        "あんまり聞いたことないし、本にも詳しく書いてないな...。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
  ],
};
