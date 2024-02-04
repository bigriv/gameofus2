import { WilTalkDefine } from ".";
import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";

export const WIL_TALK_DEFINES_CHPATER2: Array<WilTalkDefine> = [
  [
    {
      sound: WIL_SOUND_ID.SE_FIGHTING,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_VILLAGE_1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: [
        "ヒカル、やるなぁ。聖騎士団に入ってまだそんなに経ってないのに、大したもんだ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: ["ありがとうございます。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "魔導兵",
      message: ["お前、入りたての頃はザーグさんにしごかれてたもんな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["お前こそ、ザーグさんとの訓練で泣きべそかいてたくせに。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "魔導兵",
      message: ["かいてないし。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["でも、ここまで強くなれたのもザーグさんのおかげだよな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "魔導兵",
      message: ["まあそれはある。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["二人とも、ザーグさんを慕ってるんですね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵&魔導兵",
      message: ["いや？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: [
        "ザーグさん、見ての通りめちゃくちゃだから、振り回されてばっかりだよ。この前も...",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["訓練中に私語とは余裕だな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "魔導兵",
      message: ["あ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: [
        "いやいや、ちょっと休憩してただけですよ。ヒカル、そろそろ再開しようか！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["いや、話があるからそのままでいい。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      bgm: WIL_SOUND_ID.BGM_PINCH_1,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "来週、皇帝陛下が氷の国に出向くことになった。",
        "当然我々聖騎士団も護衛として同行することになるから、準備しておくように。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["陛下自ら氷の国に行くなんて、どうしたんですか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "なんでも、焔の国の勢力に対抗するために、氷の国と同盟を組む予定らしい。平和のため、絶対に成立させなければならない同盟だから、陛下が直々に交渉しに行くらしい。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["なるほど。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "帝都の守護のために全員で行くわけにはいかないが、めったにない大仕事だし、ヒカルも来るか？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["いいんですか？ぜひ行かせてください！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["いい返事だ。決まりだ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["改めて言うが、出発は来週だ。各自訓練に勤しむこと。以上！"],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_KINGDOM,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["そろそろ出発だ。準備はいいか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_KINGDOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["はい！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_KINGDOM,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "皇帝",
      message: ["長時間の移動になるけど、みんなよろしく頼むよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "ヒカル",
      message: ["（あれが皇帝陛下か...。優しそうな人だな。）"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_KINGDOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "皇帝",
      message: ["あれ？君は初めて見る顔だね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "ヒカル",
      message: [
        "あ、はい！つい最近入団したヒカルと申します！",
        "命に代えても陛下をお守りします！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BATTLE_KINGDOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      talker: "皇帝",
      message: ["頼りにしているよ、ヒカル君。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["ヒカル、陛下と話せるなんてラッキーだったな！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "ヒカル",
      message: [
        "緊張しました...。",
        "流石に目の前にすると気が引き締まりますね。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_TRAINING_ROOM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: [
        "固くなって肝心なときに動けないなんてやめてくれよ！",
        "まあ氷の国までの道のりは整備されてるし、何か起こるなんてそうそうないだろうけどな！",
      ],
    },
    { message: ["数時間後"] },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      bgm: WIL_SOUND_ID.BGM_SNOWSTORM,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["なんか、寒くなってきましたね...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "氷の国は年中雪で覆われている国だからな。近づくほど寒くなるぞ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["あれ、なんか人影みたいなのが見えませんか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["まさか。こんなところに人間がいるわけ..."],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      sound: WIL_SOUND_ID.SE_MONSTER,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["...あれは魔物だ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "全員、戦闘態勢に入れ！万が一にも皇帝陛下に危害がないようにしろ！",
      ],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      bgm: WIL_SOUND_ID.BGM_SNOWSTORM,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["はぁはぁ、みんな、無事か！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "魔導兵",
      message: ["魔導兵の一部が毒に侵されて氷の国まで持つかどうか...。"],
    },

    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["騎士兵も大多数が負傷してます...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "くそっ、次に襲われたら厳しいな...。氷の国までもう少しだというのに！",
        "しかし、対処しきれない数じゃなかったはずだが...。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: [
        "この寒さだと動きが鈍ってしまいますからね...。しかも雪で視界も悪い...。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "慣れない環境での戦闘は苦しかったか...。帰ったら鍛え直しだな。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: [
        "これ、結構まずいんじゃないですか？引いたとしても安全に帰れる保証はないし...。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "そうだな...。幸い氷の国は治癒魔法に長けている。多少強引にでも突っ切るしかないか。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      sound: WIL_SOUND_ID.SE_MONSTER,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["...ザーグさん！危ない！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      sound: WIL_SOUND_ID.SE_FIGHTING,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル&ザーグ",
      message: ["！？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      talker: "守護兵",
      message: ["大丈夫、か？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      talker: "ザーグ",
      message: ["あなたは？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      talker: "守護兵",
      message: [
        "俺たち、氷の守護者。ここ、氷の国の領地。客人、安全に出迎える。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_MAGICIAN,
      talker: "補助兵",
      message: ["けが人が多いね。治してやろう。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_MAGICIAN,
      message: ["補助兵は癒しの水を発動した。"],
      sound: WIL_SOUND_ID.SE_HEAL1,
    },
    { message: [""] },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      bgm: WIL_SOUND_ID.BGM_ICE_LAND_1,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "助かりました。",
        "本当にありがとうございます。",
        "私は聖騎士団の隊長ザーグです。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      talker: "守護兵",
      message: ["話、聞いてる。王のもと、行く。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      talker: "ザーグ",
      message: ["ありがとうございます。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "ヒカル、俺は陛下に付き添ってフロリア王、フロリア様のところまで行ってくる。その間、みんなをよろしく。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["分かりました。お気をつけて。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "それにしても、危なかったな...。氷の国の人たちが優しくてよかった。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "？？？",
      message: [
        "ふーん、これが聖の国の精鋭？あれくらいの魔物相手で壊滅状態なんて、随分危うい近衛兵ね。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["えーと、あなたは？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "？？？",
      message: ["あなた、一般兵でしょ？そんなのに名乗る名前はないわ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["はぁ...。", "えーと、もしかして王女様とかですか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "氷の国の王女",
      message: ["へぇ、一般兵の分際でよくわかったわね。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: [
        "身なりがとても綺麗だったので。",
        "（あと、なんか偉そうだったし...。）",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "氷の国の王女",
      message: ["ふーん。ところであなたたち、同盟を結びに来たんでしたっけ？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["そうですけど。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "氷の国の王女",
      message: [
        "お父様はお優しいけど、さすがにこの状況を見てなんの条件もなく同盟を結ぶとは思えないわ。どこの国だって、弱い国とは手を組みたくないもの。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: [
        "ちょっと言いすぎじゃないですか。確かに聖騎士団はボロボロですが、それは慣れない環境だったからというだけで...",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ザーグ",
      message: ["そこまでだ、ヒカル。", "レイナ様、うちの兵士が失礼しました。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "まあいいわ。あなたがここにいるってことは、対談は終わったようね。私ももう行くわ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["ザーグさん...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ザーグ",
      message: [
        "ヒカル、相手は一国の王女様だ。発言には気をつけろよ。",
        "それに、レイナ様の言っていたことは事実だ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["それはわかってますが...。でも、それじゃあ同盟は...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ザーグ",
      message: [
        "言っただろ、これの同盟は絶対に成立させなければならない。",
        "そこで陛下は、聖の国の力を示すために氷の国との模擬戦を申し出た。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["模擬戦...ですか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ザーグ",
      message: [
        "模擬戦に勝てば聖の国の力を認め、同盟を組んでくれるよう交渉してくださったのだ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ザーグ",
      message: [
        "模擬戦は少数で行うらしいんだが、さっきの戦闘で負傷者が多い。ヒカル、お前の力も貸してくれ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["はい！任せてください！"],
    },
    { message: ["一時間後"] },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      right: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "フロリア王",
      message: ["では、これから氷の国と聖の国の模擬戦を始める。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      right: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "フロリア王",
      message: ["レイナ、手は抜くなよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "レイナ",
      message: ["もちろんです。お父様。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["（あの王女様も出るのか。絶対に負けられない！）"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      talker: "騎士兵",
      message: ["王女様が相手か。手加減が大変そうだな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "おい、油断するなよ。あれでも氷の国の軍隊を仕切ってるんだ。俺と同じくらいの実力だと思ったほうがいい。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_SOLDIER,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "騎士兵",
      message: ["まじすか...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["皆さん、来ます！"],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      bgm: WIL_SOUND_ID.BGM_ICE_LAND_1,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["...っく！この私が負けるなんて...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "フロリア王",
      message: ["レイナ！大丈夫か！？貴様ら、よくも娘を！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: ["（じゃあどうすりゃ良かったんだよ...。）"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["あなた、思ったより強いのね...。見直したわ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: ["はあ、それはどうも。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "名乗る名がないなんて言って悪かったわ。",
        "私はレイナ。この国の王女よ。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: [
        "ヒカルです。聖騎士団に所属しています。",
        "こちらこそ、失礼な態度をとってすみませんでした。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["あれくらい気にしてないわ。それよりも..."],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "お父様、この方々の強さは証明されました。おとなしく同盟を受け入れましょう。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "フロリア王",
      message: [
        "ムムム。しかし...。",
        "（同盟を結んでしまえば、戦いが増える...。戦いが増えればレイナが危険な目にあってしまう...。）",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "模擬戦で負ければ同盟を受け入れるという条件をのみ、真剣勝負で負けたのは我々です。仕方がありません。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "フロリア王",
      message: ["わ、わかった。では、同盟を..."],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      sound: WIL_SOUND_ID.SE_STONE1,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "フロリア王",
      message: ["！？", "何じゃこの音は！？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["西のほうから聞こえましたわ！", "様子を見に行きましょう。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ザーグ",
      message: ["嫌な予感がする。俺たちも行くぞ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      bgm: WIL_SOUND_ID.BGM_PINCH_1,
      sound: WIL_SOUND_ID.SE_MONSTER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "レイナ",
      message: ["何...あいつ...？", "尋常じゃない魔力を感じるわ...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_LAND,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "皇帝",
      message: [
        "人型の強力な魔物...もしかして魔人というやつではないだろうか。昔、古文書で読んだことがある。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "フロリア王",
      message: ["なんでもよい！守護兵たちよ、やつを追い払うのじゃ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "守護兵",
      message: ["御意。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      sound: WIL_SOUND_ID.SE_EXPLOSION,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "守護兵",
      message: ["無念...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "フロリア王",
      message: ["まさか、我が国の兵が、あんなにあっさり...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "ヒカル",
      message: ["こっちに向かって来てませんか！？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "レイナ",
      message: [
        "冗談じゃないわ！あんなのに来られたらこの国はひとたまりもないわ！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "フロリア王",
      message: [
        "何ということだ！",
        "同盟でもなんでも受け入れるから、なんとかしてくれ！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "ザーグ",
      message: ["言われなくても、なんとかしなきゃ我々も危ないですから...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "ばらばらに戦っても勝機が薄れるだけだわ。",
        "私たちで聖騎士団を全力でサポートしましょう！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_DEFENDER,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "守護兵",
      message: ["次こそは。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_MAGICIAN,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "補助兵",
      message: ["任せな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["くるぞ！総員、配置につけ！"],
    },
  ],
  [
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      bgm: WIL_SOUND_ID.BGM_SNOWSTORM,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "ザーグ",
      message: ["くそっ、どんだけタフなんだ、こいつは！？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "レイナ",
      message: ["まずいわ、もうみんなボロボロよ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "ヒカル",
      message: ["（このまま戦っても状況は悪くなる一方...。一か八か...。）"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "ヒカル",
      message: [
        "提案なんですが、あの顔の宝石みたいなのを全員で攻撃してみませんか？",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["そんなことして何になるのよ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: [
        "あいつの魔法は、すべてあの宝石から放出されているように見えます。",
        "なので、あれさえ壊せば攻撃も回復もされなくなるんじゃないかと・",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["なるほど。理にはかなってるな。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: [
        "だとして、あいつに近づいてそこまでのダメージを与えるなんて、どうやってやるのよ！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "ヒカル",
      message: [
        "俺が囮になります。",
        "あいつの気を引いているうちに、ザーグさんとレイナさんで一気に攻撃してください。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: [
        "そんな危険な役割、新兵のお前にやらせられるか！",
        "囮なら俺がやる！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: [
        "あいつの属性は水。大ダメージを与えるなら雷属性の技を使えるザーグさんの方が適任です。",
        "大丈夫です。守りに専念すれば避けきれない攻撃じゃない。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["...信じるぞ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ヒカル",
      message: ["任せてください。", "...行ってきます！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["レイナ様、俺の合図で一斉に畳みかけましょう。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      right: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "レイナ",
      message: ["分かったわ。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      sound: WIL_SOUND_ID.SE_MONSTER,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      sound: WIL_SOUND_ID.SE_ICE1,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      talker: "ザーグ",
      message: ["今だ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      sound: WIL_SOUND_ID.SE_THUNDER2,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      right: WIL_IMAGE_ID.CHARACTER_DARK_MONSTER_ICE_DEMON,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      sound: WIL_SOUND_ID.SE_MONSTER,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      message: [""],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "フロリア王",
      message: ["倒した...のか？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_ICICLE_GURDIANS_QUEEN,
      talker: "レイナ",
      message: ["やったの？"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      bgm: WIL_SOUND_ID.BGM_BATTLE_WIN2,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_KNIGHTS_LEADER,
      talker: "ザーグ",
      message: ["勝ったぞ！魔人を倒した！！", "ヒカル、お前のおかげだ！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HERO,
      talker: "ヒカル",
      message: [
        "ははは...。ザーグさんの力あってこそです...。上手くいって良かった...。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      right: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "フロリア王",
      message: [
        "しかし、既にあれほどまでの魔物が現れるまで事態進んでいるのか...。",
        "これはもう、わしの我儘を通すわけにはいくまい。",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      right: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "皇帝",
      message: ["ということは...。"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      right: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "フロリア王",
      message: [
        "氷の国は聖の国と同盟を結ぼう！",
        "共に焔の国を抑え、再び魔物のいない平和な世界を取り戻すのじゃ！",
      ],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_ICE_FIELD,
      left: WIL_IMAGE_ID.CHARACTER_HOLY_LAND_EMPEROR,
      right: WIL_IMAGE_ID.CHARACTER_ICE_LAND_KING,
      talker: "皇帝",
      message: ["ありがとうございます！", "みんな、よくやってくれた！"],
    },
    {
      background: WIL_IMAGE_ID.BACKGROUND_BLACK,
      message: [
        "こうして、聖の国は氷の国と同盟を結び、これから始まる焔の国との戦いへと準備を進めるのであった。",
      ],
    },
  ],
];
