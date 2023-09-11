import { NotImplementedError } from "@/composables/types/errors/NotImplementedError";
import { WAS_EVENT_TIMMING } from "./const";
import { WasCharacter } from "./types/character";
import {
  WasNonPlayerCharacter,
} from "./types/nonPlayerCharacter";
import { WasPlayerCharacter } from "./types/palyerCharacter";
import WasArea from "./types/area";
import {
  WAS_BOSS_GOBLIN,
  WAS_DARK_ELF,
  WAS_DORAGON,
  WAS_ELF,
  WAS_GOBLIN,
  WAS_HERO,
  WAS_KRAKEN,
  WAS_PRINCESS,
  WAS_SAHAGIN,
  WAS_SATAN,
  WAS_SLIME,
  WAS_SOLDIER,
} from "./defines/character";
import WasStatus from "./types/status";
import ConstructGOUVisual from "@/composables/types/visuals/ConstructGOUVisual";

export const useWasInit = () => {
  // プレイヤーの初期化
  const initPlayer = (): WasPlayerCharacter => {
    return new WasPlayerCharacter(
      WAS_SATAN.name,
      new WasStatus(WAS_SATAN.initStatus),
      WAS_SATAN.skills,
      WAS_SATAN.items
    );
  };

  // 敵キャラクターの初期化
  const initCharacter = (
    defines: { [key: string]: any },
    isBoss: boolean
  ): { [key: string]: WasNonPlayerCharacter } => {
    let characters: { [key: string]: WasNonPlayerCharacter } = {};
    for (const key of Object.keys(defines)) {
      characters[key] = new WasNonPlayerCharacter(
        defines[key].name,
        ConstructGOUVisual(defines[key].visual),
        defines[key].initStatus,
        isBoss,
        defines[key].dropItem,
        defines[key].persuadItem,
        defines[key].occupySkill,
        defines[key].serif
      );
    }
    return characters;
  };

  // エリアの初期化
  const initArea = (): { [key: string]: WasArea } => {
    throw new NotImplementedError();
  };

  let timming = WAS_EVENT_TIMMING.OPENING;
  let area = null;
  let player = initPlayer();
  let enemy = null;
  const princess = new WasCharacter(
    WAS_PRINCESS.name,
    ConstructGOUVisual(WAS_PRINCESS.visual),
    new WasStatus()
  );
  const WAS_CHARACTER = initCharacter(
    {
      CAVE: WAS_GOBLIN,
      SEA: WAS_SAHAGIN,
      VILLAGE: WAS_ELF,
      MOUNTAIN: WAS_SLIME,
      KINGDOM_CASTLE: WAS_SOLDIER,
    },
    false
  );
  const WAS_BOSS = initCharacter(
    {
      CAVE: WAS_BOSS_GOBLIN,
      SEA: WAS_KRAKEN,
      VILLAGE: WAS_DARK_ELF,
      MOUNTAIN: WAS_DORAGON,
      KINGDOM_CASTLE: WAS_HERO,
    },
    true
  );
  const WAS_AREA = initArea();

  return {
    timming,
    area,
    player,
    enemy,
    princess,
    WAS_CHARACTER,
    WAS_BOSS,
    WAS_AREA,
  };
};
