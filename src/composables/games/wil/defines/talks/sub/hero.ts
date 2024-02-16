import { WilTalkDefine } from "@/composables/games/wil/defines/talks/index";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";

export const WIL_SUB_TALK_DEFINES_HERO: Array<WilTalkDefine> = [
  [
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
        "打込稽古では魔法以外の技を学んだりできるみたいだ。",
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
        "そういえば、魔法や技は素質がないと使えるようにならないって話をどこかで聞いたな。",
        "魔法って使ったことないけど、素質あるかな...？",
      ],
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_VILLAGE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
    },
  ],
  [
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
  [
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
      left: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["なんか、調子のいい人だなぁ...。"],
    },
  ],
  [
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
      left: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      talker: "ヒカル",
      message: ["(癖のある人だなぁ...。)"],
    },
  ],
  [
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
      message: ["(あ、これってまさか...。)"],
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
      left: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["(この人、よく隊長になれたな...。)"],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["お嬢様は気難しい"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      bgm: WIL_SOUND_ID.BGM_ICE_LAND1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["ヒカル、ちょっと来なさい。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["何でしょうか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["あなた、聖騎士団に入ってどのくらい？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["一、二週間くらいでしょうか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["たったそれだけ！？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["はい。やっぱり、まだ未熟なところが多いですよね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["今のは二週間程度でそこまで強くなっていることに驚いたのよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "男の子は力が付きやすくていいわね。私も男に生まれていれば、この国を引っ張れるだけの威厳が出たのに...。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["俺はレイナさんは女の子の方がいいと思いますけど。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["どうして？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: [
        "えーと、レイナさんの剣技ってしなやかで美しいなと持ってたんですけど、それってレイナさんが女性だからこそ出せる良さなのかって...。聖騎士団の人たちって結構力任せなところが多いので、参考になるんですよね。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN_SHY,
      talker: "レイナ",
      message: [
        "そ、そう？たしかに、力に頼らない剣技は磨いてきたつもりだけど、そんな風に褒められたのは初めてだわ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN_SHY,
      talker: "レイナ",
      message: [
        "おかげで少し自信が出たわ。い、いつでも私に教えを請いに来ていいのよ！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO_SMILE,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN_SHY,
      talker: "ヒカル",
      message: ["ぜひ、お願いします！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      talker: "ヒカル",
      message: [
        "(男になってこれ以上厳しくなったら誰もついていけないなんて、口が裂けても言えないな...。)",
      ],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["なんだか親しみやすい"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      bgm: WIL_SOUND_ID.BGM_WINDBLOW,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["ジョットさん、これはどこにもってけばいいですか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: ["ああ、それは後で倉庫に持ってくから、そこに置いといてくれ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: ["悪いな、復興の手伝いまでさせて。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["いえ、少しでも早く復興してほしいですから。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: ["お前、歳いくつだ？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["17です。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: ["俺と同じか。てっきり年上かと思ってたぜ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["え、なんで？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: [
        "いや、王族のレイナ相手に物怖じしてなかったし、それなりに聖騎士としての歴が長いのかと思ってな。てか、今タメ口じゃなかったか？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["あ、ごめん。同い年だと思うと緩んじゃって...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: ["...わざとか？一応俺も王族だからな？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["わざとじゃないって。ほんとごめん。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: ["...もう諦めるよ。けど、あんまり舐めた口きくんじゃねぇぞ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["ああ、よろしく！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: ["..."],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_HERO_SMILE,
      right: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ヒカル",
      message: ["(なんだか親しみやすい人だなぁ。)"],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["まるで小動物"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      bgm: WIL_SOUND_ID.BGM_WINDBLOW,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["シノブちゃん、調子はどう？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: ["あなたですか。", "残念ながら、大分元気になりました。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO_SMILE,
      talker: "ヒカル",
      message: ["それは良かった。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: ["なんで助けたんですか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["うーん、なんか放っておけなかったから。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: ["それだけですか。甘い人ですね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "そうだ、自己紹介してなかったよね。俺はヒカル。聖騎士団の隊員なんだ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: ["名前など教えられても、元気になったので去りますよ？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["そっか...。気を付けてね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: ["命を救ってもらった恩は覚えておきます。では。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_INSIDE,
      message: ["1時間後"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_OUTSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["あれ？シノブちゃん、どうしてここに？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_OUTSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: ["国に見捨てられたので帰れないのを忘れてました...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_OUTSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["それで立ち竦んでたんだ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_OUTSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: ["...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_OUTSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "えーと、俺と一緒に聖の国に来る？",
        "俺の住んでた村なら安全に暮らせると思うし、どうするか決まるまでとりあえずってことで。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_OUTSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "シノブ",
      message: [
        "とりあえずですからね。決して焔の国を裏切ったわけではないですからね！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_STORM_LAND_OUTSIDE,
      left: WIL_IMAGE_ID.CHARACTER_INFERNITY_SAMURAIS_THUNDER_SPY,
      right: WIL_IMAGE_ID.CHARACTER_HERO_SMILE,
      talker: "ヒカル",
      message: ["(なんか小動物みたいで守ってあげたくなるな...。)"],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["ザーグとの思い出"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      bgm: WIL_SOUND_ID.BGM_ICE_LAND1,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "ザーグさん...。すごくお世話になったな...。",
        "でも、思えば二、三週間しか関わってなかったのか...。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "魔導兵",
      message: ["おいヒカル、俺は五年はお世話になったぞ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      talker: "ヒカル",
      message: ["なんで張り合ってくるんですか...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "騎士兵",
      message: ["俺は八年世話になったよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      talker: "ヒカル",
      message: ["そ、そうですか...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "騎士兵",
      message: [
        "俺が入隊したての頃、魔法が使えない俺に、「剣技を鍛えれば誰よりも強くなれる、とにかく体を鍛えまくれ！」って励ましてくれたんだよなあ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HERO_SMILE,
      talker: "ヒカル",
      message: ["それはいい話ですね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "魔導兵",
      message: [
        "いい話と言えば、聖騎士団たるもの明るいものを食うべしとか言って、ご飯にシチューをかけて食べてたよ。パンじゃなくてお米にかけてるあたり。すごい人だったよ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      talker: "ヒカル",
      message: [
        "張り合った割にいい話関係ないじゃないですか。ただの面白エピソードですよね。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "魔導兵",
      message: ["ヒカル、俺が何も考えずにこんな話をすると思ってるのか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO_SURPRISED,
      talker: "ヒカル",
      message: [
        "あ...。",
        "(暗い雰囲気を和ませるためにわざと笑い話を入れたのか...。)",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "魔導兵",
      message: [
        "あの人は面白エピソードの宝庫だぞ。こういう流れじゃないと蔵出しできないだろ！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HERO_WORRIERED,
      talker: "ヒカル",
      message: ["..."],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["聖剣"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      bgm: WIL_SOUND_ID.BGM_ICE_LAND1,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "よし、これで棒ができた...。",
        "次はこのまま薄く伸ばすイメージで...",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "レイナ",
      message: ["ヒカル、何やってるのよ？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["あ、レイナさん。実は魔法で剣を作れないか試してたんですよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "レイナ",
      message: [
        "武器や防具を作る魔法なんて聞いたことないわ。そんなことできるの？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "前に氷の魔人と戦ったとき、とっさに盾を作ったじゃないですか。あの要領でできるじゃないかと思ったんですよ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "レイナ",
      message: ["そんなこともあったわね。折角だから見てってもいいかしら？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["構いませんよ。あんまり面白くないと思いますけど。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["(さっきの薄く延ばした棒の端を鋭していく感じで...。)"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["(...よし！)"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      sound: WIL_SOUND_ID.SE_HOLY2,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      message: ["ヒカルは聖剣創造を発動した。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN_SURPRISED,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "レイナ",
      message: ["すごいわ...完璧に剣ね...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["心なしか、力がみなぎってくる感じがします...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "レイナ",
      message: [
        "もしかしたら光属性の魔素が良い影響を与えてるのかもしれないわね。まさに聖剣って感じだわ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["聖剣...。かっこいいですね！この魔法、気に入りました。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "(それにしても、全く新しい魔法を創ってすぐに使いこなすなんて、信じられないわ...。)",
      ],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["聖剣"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_HOLY_CASLE1,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "よし、これで棒ができた...。",
        "次はこのまま薄く伸ばすイメージで...",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ジョット",
      message: ["ヒカル、何やってんだ？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["あ、ジョットさん。実は魔法で剣を作れないか試してたんですよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ジョット",
      message: [
        "武器や防具を作る魔法なんて聞いたことないな。そんなことできんのか？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "前に氷の魔人と戦ったとき、とっさに盾を作ったことがあって、あの要領でできるじゃないかと思ったんですよ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ジョット",
      message: ["へえ、そんなことがあったのか。折角だから見せてくれよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["いいですよ。あんまり面白くないと思いますけど。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["(さっきの薄く延ばした棒の端を鋭していく感じで...。)"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["(...よし！)"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      sound: WIL_SOUND_ID.SE_HOLY2,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      message: ["ヒカルは聖剣創造を発動した。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE_SURPIRSED,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ジョット",
      message: ["すげえな...！本当に剣じゃねえか...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["なんだか、力がみなぎってくる感じがします...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ジョット",
      message: ["ふーん。よくわかねえけど、神々しくて聖剣って感じがするな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["聖剣...。かっこいいですね！この魔法、気に入りました。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_STORM_SHOOTERS_PRINCE,
      talker: "ジョット",
      message: [
        "(にしても、新しい魔法を創ってすぐ使いこなすなんて、あいつ何者なんだ...？)",
      ],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      talker: "サブイベント",
      message: ["戦う理由"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_VILLAGE1,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["はぁ、疲れた...。封印魔法、難しいな...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "俺が封印魔法を覚えたら、ついに最後の戦いか...。",
        "長いようで短い道のりだったな。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "まさか、俺が魔王を封印する最終手段になるなんて、思ってもみなかった。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "そもそも、俺が聖騎士団に入ったのって、村を守るためだったのに、ザーグさんに誘われて国を守ることになって、陛下の命令で世界を守ることになって...。",
        "一気に人生の山場が来たって感じだな。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "もし、魔王が復活して俺が封印に失敗したら、陛下も、ジョットさんも、シノブちゃんも、レイナさんも...。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "そんなことはさせない。世界を、みんなを守る。",
        "それが今、俺の戦う理由だ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["...よし、もう少し頑張ろう！"],
    },
  ],
];
