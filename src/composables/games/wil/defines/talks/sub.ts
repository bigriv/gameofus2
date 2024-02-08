import { WilTalkDefine } from ".";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";

/**
 * サブイベントの会話イベント定義
 */
export const WIL_SUB_TALK_DEFINES: {
  [key: string]: WilTalkDefine;
} = {
  HERO_1: [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["聖騎士団の訓練"],
    },
    {
      talker: "ヒカル",
      message: ["なるほど、聖騎士団の特訓は大きく分けて5種類あるのか。"],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
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
        "魔導学習では新しい魔法を覚えられて、",
        "打込稽古では剣技を学んだりできるみたいだ。",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
    {
      talker: "ヒカル",
      message: [
        "バランスよく鍛えるか、集中して鍛えるか、自分に合った鍛え方をしないとな...。",
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
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["戦闘と陣形"],
    },
    {
      talker: "ヒカル",
      message: ["前にザーグさんと戦ったとき、魔物が陣形をとっていたな。"],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
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
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["ヒカルと騎士兵"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["はぁ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["ヒカル、気合入ってるな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["お疲れ様です。新しい技を試したくて。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["ヒカルって、どこかで剣術とか習ってたのか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["いえ、特には。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: [
        "まじか。筋良すぎだろ。",
        "俺なんて、子供のころから帝都の剣術教室に通ってたのに。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["剣術教室なんてあるんですね。それで太刀筋が綺麗なのか...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["え、俺の太刀筋って綺麗？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["はい。なんというか、無駄がないって感じがします。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: [
        "そうかそうか！剣術のことなら、いつでも俺に聞いてくれよ！はっはっは！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["なんか、調子のいい人だなぁ...。"],
    },
  ],
  HERO_4: [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["ヒカルと魔導兵"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "えーと、魔法には属性があって、雷属性は水属性に強く、土属性に弱いのか。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "魔導兵",
      message: ["ヒカル、勉強熱心だな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "ヒカル",
      message: [
        "お疲れ様です。",
        "魔法って初めて覚えたんですけど、奥が深いですね。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "魔導兵",
      message: [
        "そうだろう。あの脳筋のザーグさんでさえ魔法を勉強してるんだぞ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "ヒカル",
      message: ["それはどういう自慢ですか...？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "魔導兵",
      message: [
        "解釈はお任せします。",
        "ヒカルは魔法の良さはどこにあると思う？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "ヒカル",
      message: [
        "えーと、何もないところから攻撃を生み出せるところ...とかですか？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "魔導兵",
      message: ["あっさ。", "別に無から生み出してるわけじゃないんだよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "魔導兵",
      message: [
        "魔法は生物が生まれながらに持つ『魔素』をもとに生成されるのは知ってるよね？つまり無から生まれているように見えて実は元となる物質があるわけだ。まあ物質といっても見ることも触ることもできないから無といっても過言ではないんだけど。とはいえ『魔素をもとにした生成技術』が魔法である以上、無から攻撃を生みだしているとは言えないよね。そもそも...",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "ヒカル",
      message: ["（癖のある人だなぁ...。）"],
    },
  ],
  HERO_5: [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["ヒカルとザーグ"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["ヒカル、聖騎士団には慣れたか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["はい、皆さんとても良くしてくれるので、だいぶ慣れてきました。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["それは良かった。そうだ、たまには俺と試合でもしてみるか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["いいんですか！？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["もちろんだ、遠慮はいらない。全力でかかってこい！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["はい！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      sound: WIL_SOUND_ID.SE_FIGHTING,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["はあはぁ。やっぱりザーグさんは強いですね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "いやいや、入団数日でこれだけ戦えるんだから、ヒカルもたいしたもんだよ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: [
        "ありがとうございます。ザーグさんはどうやって強くなったんですか？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "よく聞いてくれた。俺は強くなるために三つのことを意識しているんだ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["三つのこと？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["まず第一に訓練。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["（あ、これってまさか...。）"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["二に訓練。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["..."],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["三四に訓練、五に訓練！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["全部訓練なうえに、五つに増えてるじゃないですか！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["はっはっは。細かいことは気にするな！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["あの人、よく隊長になれたな...。"],
    },
  ],
  HOLY_KNIGHTS_LEADER_1: [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["隊長の仕事"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "今日の訓練はここまで！",
        "俺は隊長業務があるから、後片付けよろしく！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["あー疲れた。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "魔導兵",
      message: ["もう動けん。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "ザーグさん、隊長業務って言ってましたけど、何やってるんでしょうか？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: [
        "あーあれね。隊長になると、俺たちみたいな下の人間だけじゃなくて、上と話したりするらしいよ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["上っていうと...？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: [
        "主に皇帝陛下だな。陛下の外出予定を聞いて護衛の準備をしたりとか、聖騎士団の予算の調整したりとか色々話してるみたいだ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["そんなこともやるんですね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["ああ見えて意外と頭脳労働もしてるんだよなぁ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      bgm: WIL_SOUND_ID.BGM_HOLY_CASLE1,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "陛下！来年度の聖騎士団の予算ですが、今年度と同じでよいですか！？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "皇帝",
      message: [
        "えーと、聖騎士団には頑張ってもらってるし、焔の国との決戦もあるだろうから、予算は増やしたほうが良いんじゃないかな？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "ザーグ",
      message: [
        "なるほど！じゃあ増やしましょう！それと、陛下の外出予定ですが...",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "皇帝",
      message: [
        "まとめといたから護衛よろしくね。あと、この日は氷の国までの遠出になるから、いつもより多めに人を割いてもらえると助かるよ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "ザーグ",
      message: ["わかりました！できるだけ人員を割くようにします！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "皇帝",
      message: ["...分かってると思うけど、国を守るための人は残しておいてね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      message: ["...皇帝陛下が有能だった。"],
    },
  ],
  HOLY_KNIGHTS_LEADER_2: [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["ザーグと騎士兵"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["おい、ちょっと手伝ってくれないか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["何ですか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["新技を思いついてね。試しに受けてみてほしいんだ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["げ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["なーに手加減はするよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["ほんとですかぁ？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["部下を痛めつけるようなことするわけないじゃないか。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["...ちょっとだけですよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      sound: WIL_SOUND_ID.SE_EXPLOSION,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["...手加減の意味知ってますか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "悪い悪い！",
        "ちょっと気合が入りすぎてしまった！まあ、いい練習になったよ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["次はこの技なんだけど...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["もう勘弁してください。"],
    },
  ],
};