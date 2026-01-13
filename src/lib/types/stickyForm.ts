// フィールドの入力タイプ
export type StickyFieldType =
  | "text"
  | "email"
  | "number"
  | "radio"
  | "checkbox";

// Sticky-form が扱う 1 フィールド
export interface StickyField {
  /** Google Forms entry ID (e.g. entry.123456) */
  id: string;

  /** Label shown to respondents */
  label: string;

  /** Field input type */
  type: StickyFieldType;

  /** Options for radio / checkbox */
  options?: string[];

  /** Stored value (runtime only) */
  value?: string | string[];
}

// /new で作られる「フォーム設計情報」
export type StickyFormMeta = {
  formId: string;
  lang: "en" | "ja";
  title: string;
  description?: string;
  author?: string;
  fields: StickyField[];
  updatedAt: string;
};

