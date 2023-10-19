const TBH_ITEM_DEFINES: {
  [key: string]: {
    name: string;
    detail: string;
    visual: {
      id: string;
      width: number;
      height: number;
    };
    price: number;
  };
} = {
  MASK: {
    name: "マスク",
    detail: "ヒーローのコスプレマスク。ヒーローたるもの正体ばれるべからず。",
    visual: {
      id: "HERO_HEAD",
      width: 100,
      height: 100,
    },
    price: 3000,
  },
  MANT: {
    name: "マント",
    detail: "ヒーローのコスプレマント。マントがあっても空は飛べない。",
    visual: {
      id: "HERO_MANT",
      width: 100,
      height: 100,
    },
    price: 10000,
  },
  SUIT_UPPER: {
    name: "スーツ（上）",
    detail: "ヒーローのコスプレスーツ。上半身用。深紅のスーツは情熱の証。",
    visual: {
      id: "HERO_UPPERBODY",
      width: 100,
      height: 100,
    },
    price: 7000,
  },
  SUIT_LOWER: {
    name: "スーツ（下）",
    detail: "ヒーローのコスプレスーツ。下半身用。上下揃わないと変な人。",
    visual: {
      id: "HERO_LOWERBODY",
      width: 100,
      height: 100,
    },
    price: 5000,
  },
};

export default TBH_ITEM_DEFINES;
