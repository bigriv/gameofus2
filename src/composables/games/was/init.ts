import { NotImplementedError } from "@/composables/types/errors/NotImplementedError";
import { WAS_EVENT_TIMMING } from "./const";
import { WasCharacter } from "./types/character";
import { WasNonPlayerCharacter } from "./types/nonPlayerCharacter";
import { WasPlayerCharacter } from "./types/palyerCharacter";
import WasArea from "./types/area";
import { WAS_SATAN } from "./defines/character";
import WasStatus from "./types/status";

export const useWasInit = () => {
  const initPlayer = (): WasPlayerCharacter => {
    return new WasPlayerCharacter(
      WAS_SATAN.name,
      new WasStatus(WAS_SATAN.initStatus),
      WAS_SATAN.skills,
      WAS_SATAN.items
    );
  };
  const initCharacter = (): { [key: string]: WasCharacter } => {
    const characters = [
        
    ]
    throw new NotImplementedError();
  };
  const initBoss = (): { [key: string]: WasNonPlayerCharacter } => {
    throw new NotImplementedError();
  };
  const initArea = (): { [key: string]: WasArea } => {
    throw new NotImplementedError();
  };

  let timming = WAS_EVENT_TIMMING.OPENING;
  let area = null;
  let player = initPlayer();
  let enemy = null;
  const WAS_CHARACTER = initCharacter();
  const WAS_BOSS = initBoss();
  const WAS_AREA = initArea();

  return {
    timming,
    area,
    player,
    enemy,
    WAS_CHARACTER,
    WAS_BOSS,
    WAS_AREA,
  };
};
