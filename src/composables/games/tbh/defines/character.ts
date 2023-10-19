type TBH_CHARACTER_DEFINITION_TYPE = {
  visual: {
    id: string;
  };
  initStatus?: {
    power: number;
    life: number;
  };
};

// 主人公のデフォルト
const TBH_HERO: TBH_CHARACTER_DEFINITION_TYPE = {
  visual: {
    id: "HERO",
  },
  initStatus: {
    power: 5,
    life: 100,
  },
};

// 店員
const TBH_SHOPPER: TBH_CHARACTER_DEFINITION_TYPE = {
  visual: {
    id: "SHOPPER",
  },
};

// ヤンキー
const TBH_YANKEE: TBH_CHARACTER_DEFINITION_TYPE = {
  visual: {
    id: "YANKEE",
  },
  initStatus: {
    power: 10,
    life: 100,
  },
};

// モンスター
const TBH_MONSTER: TBH_CHARACTER_DEFINITION_TYPE = {
  visual: {
    id: "MONSTER",
  },
  initStatus: {
    power: 20,
    life: 200,
  },
};

// ボス
const TBH_BOSS: TBH_CHARACTER_DEFINITION_TYPE = {
  visual: {
    id: "PIERO",
  },
  initStatus: {
    power: 30,
    life: 300,
  },
};

export { TBH_HERO, TBH_SHOPPER, TBH_YANKEE, TBH_MONSTER, TBH_BOSS };
