import type { Lang } from "./types";
import en from "./langs/en";
import ja from "./langs/ja";

export const messages: Record<Lang, any> = {
  en,
  ja
};

export const DEFAULT_LANG = "en";