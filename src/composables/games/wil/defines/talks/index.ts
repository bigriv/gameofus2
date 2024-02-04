import { WIL_IMAGE_ID } from "@/composables/games/wil/enums/image";
import { WIL_SOUND_ID } from "@/composables/games/wil/enums/sound";

export type WilTalkDefine = Array<{
  talker?: string;
  background?: WIL_IMAGE_ID;
  message?: Array<string>;
  sound?: WIL_SOUND_ID;
  bgm?: WIL_SOUND_ID;
  left?: WIL_IMAGE_ID;
  right?: WIL_IMAGE_ID;
}>;
