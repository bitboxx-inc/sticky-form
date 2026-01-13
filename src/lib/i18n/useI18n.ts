import { get } from "svelte/store";
import { page } from "$app/stores";
import type { Lang } from "./index";
import { messages, DEFAULT_LANG } from "./index";

export function getLang(): Lang {
  const urlLang = get(page).url.searchParams.get("lang");
  if (urlLang === "ja" || urlLang === "en") {
    localStorage.setItem("lang", urlLang);
    return urlLang;
  }

  const stored = localStorage.getItem("lang");
  if (stored === "ja" || stored === "en") return stored;

  return DEFAULT_LANG;
}

// 文字列用
export function t(path: string, lang: Lang): string {
  const keys = path.split(".");
  let cur: any = messages[lang];

  for (const k of keys) {
    cur = cur?.[k];
  }

  return typeof cur === "string" ? cur : "";
}

// 配列用（★追加）
export function tArray(path: string, lang: Lang): string[] {
  const keys = path.split(".");
  let cur: any = messages[lang];

  for (const k of keys) {
    cur = cur?.[k];
  }

  return Array.isArray(cur) ? cur : [];
}
