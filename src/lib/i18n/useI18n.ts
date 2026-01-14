import { browser } from "$app/environment";
import { messages, DEFAULT_LANG } from "./index";
import type { Lang } from "./types";

/**
 * 現在の言語を取得
 */
export function getLang(): Lang {
  if (!browser) return DEFAULT_LANG;

  const stored = localStorage.getItem("lang");
  if (stored === "en" || stored === "ja") return stored;

  return DEFAULT_LANG;
}

/**
 * 翻訳文字列を取得
 * 例: t("home.heroTitle", "ja")
 */
export function t(path: string, lang: Lang): any {
  const keys = path.split(".");
  let current: any = messages[lang];

  for (const key of keys) {
    if (current?.[key] === undefined) return "";
    current = current[key];
  }

  return current;
}

/**
 * 配列翻訳用（features, steps, useCases など）
 */
export function tArray(path: string, lang: Lang): any[] {
  const value = t(path, lang);
  return Array.isArray(value) ? value : [];
}
