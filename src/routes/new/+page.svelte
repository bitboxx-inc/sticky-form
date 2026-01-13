<script lang="ts">
  import QRCode from "qrcode";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type {
    StickyField,
    StickyFieldType,
    StickyFormMeta
  } from "$lib/types";
  import { base } from "$app/paths";

  const DRAFT_KEY = "stickyForm:new:draft";

  /* -----------------------------
   * State
   * --------------------------- */
  let lang = getLang();

  let prefillUrl = "";
  let formId: string | null = null;

  // Survey meta（URLに含める）
  let title = "無題のアンケート";
  let description = "";
  let author = "";

  let fields: StickyField[] = [
    { id: "", label: "", type: "text" }
  ];

  // Generated result
  let generatedUrl = "";
  let qrDataUrl = "";
  let isGenerated = false;
  let isDirty = false;

  // Toast
  let showToast = false;
  let toastTimer: number | null = null;

  /* -----------------------------
   * Draft restore
   * --------------------------- */
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    try {
      const parsed = JSON.parse(draft);
      prefillUrl = parsed.prefillUrl ?? "";
      formId = parsed.formId ?? null;
      title = parsed.title ?? title;
      description = parsed.description ?? "";
      author = parsed.author ?? "";
      fields = parsed.fields ?? fields;
    } catch {}
  }

  /* -----------------------------
   * Utilities
   * --------------------------- */
  function extractFormId(pathname: string): string | null {
    const match = pathname.match(/\/forms\/d\/e\/([^/]+)/);
    return match ? match[1] : null;
  }

  function saveDraft() {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({
        prefillUrl,
        formId,
        title,
        description,
        author,
        fields
      })
    );
  }

  function markDirty() {
    if (isGenerated) isDirty = true;
    saveDraft();
  }

  function parsePrefillUrl() {
    if (!prefillUrl.trim()) return;

    try {
      const url = new URL(prefillUrl.trim());
      const extracted = extractFormId(url.pathname);
      if (!extracted) return;

      formId = extracted;
      fields = [];

      url.searchParams.forEach((value, key) => {
        if (key.startsWith("entry.")) {
          fields.push({
            id: key,
            label: decodeURIComponent(value),
            type: "text"
          });
        }
      });

      if (fields.length === 0) {
        fields = [{ id: "", label: "", type: "text" }];
      }

      markDirty();
    } catch {}
  }

  function addField() {
    fields = [...fields, { id: "", label: "", type: "text" }];
    markDirty();
  }

  function removeField(index: number) {
    if (fields.length === 1) return;
    fields = fields.filter((_, i) => i !== index);
    markDirty();
  }

  function updateField(
    index: number,
    key: keyof StickyField,
    value: any
  ) {
    const field = fields[index];

    if (key === "type") {
      field.type = value as StickyFieldType;
      if (value === "radio" || value === "checkbox") {
        field.options ??= [];
      } else {
        delete field.options;
      }
    } else {
      (field as any)[key] = value;
    }

    fields = [...fields];
    markDirty();
  }

  function updateOptions(index: number, raw: string) {
    fields[index].options = raw
      .split(",")
      .map(v => v.trim())
      .filter(Boolean);

    fields = [...fields];
    markDirty();
  }

  /* -----------------------------
   * Generate
   * --------------------------- */
  async function generate() {
    if (!formId) {
      alert(t("new.formIdMissing", lang) || "Google Form URL is required");
      return;
    }

    const params = new URLSearchParams();

    // language
    params.set("lang", lang);

    // survey meta（★ URLに組み込む）
    params.set("t", title.trim() || "無題のアンケート");
    if (description.trim()) params.set("d", description.trim());
    if (author.trim()) params.set("a", author.trim());

    // sticky fields
    fields.forEach(f => {
      if (f.id && f.label) {
        params.append(f.id, f.label);
      }
    });

    const url =
      `${location.origin}${base}/forms/${formId}?${params.toString()}`;

    generatedUrl = url;
    qrDataUrl = await QRCode.toDataURL(url, { width: 200, margin: 1 });

    const meta: StickyFormMeta = {
      formId,
      lang,
      title: title.trim() || "無題のアンケート",
      description: description.trim() || undefined,
      author: author.trim() || undefined,
      fields,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(
      `stickyForm:meta:${formId}`,
      JSON.stringify(meta)
    );

    isGenerated = true;
    isDirty = false;
    saveDraft();
  }

  function changeLang(next: "en" | "ja") {
    lang = next;
    localStorage.setItem("lang", next);
    markDirty();
  }

  async function copy() {
    if (!generatedUrl) return;
    await navigator.clipboard.writeText(generatedUrl);
    showToast = true;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      showToast = false;
    }, 2000);
  }
</script>

<section class="max-w-3xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-semibold mb-2">
        {t("new.title", lang)}
    </h1>

    <p class="text-sm text-gray-600 mb-10">
        {t("new.description", lang)}
    </p>

    <!-- Language -->
    <div class="mb-8">
        <label class="block text-sm font-medium mb-2">
            {t("common.language", lang)}
        </label>

        <div class="flex gap-4 text-sm">
            <label class="flex items-center gap-2">
                <input type="radio" checked={lang === "en"} on:change={() => changeLang("en")} />
                English
            </label>
            <label class="flex items-center gap-2">
                <input type="radio" checked={lang === "ja"} on:change={() => changeLang("ja")} />
                日本語
            </label>
        </div>
    </div>

    <!-- Survey meta -->
    <div class="mb-10 space-y-4">
        <div>
            <label class="block text-sm font-medium mb-1">
                {t("new.surveyTitle", lang)} <span class="text-red-500">*</span>
            </label>
            <input
                    type="text"
                    bind:value={title}
                    on:input={markDirty}
                    class="w-full rounded-md border px-3 py-2 text-sm"
            />
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">
                {t("new.surveyDescription", lang)}
            </label>
            <textarea
                    rows={2}
                    bind:value={description}
                    on:input={markDirty}
                    class="w-full rounded-md border px-3 py-2 text-sm"
            />
        </div>

        <div>
            <label class="block text-sm font-medium mb-1">
                {t("new.surveyAuthor", lang)}
            </label>
            <input
                    type="text"
                    bind:value={author}
                    on:input={markDirty}
                    class="w-full rounded-md border px-3 py-2 text-sm"
            />
        </div>
    </div>

    <!-- 以降 UI 部分はそのまま -->
    <!-- Sticky fields / Generate / Result / Toast は元コードと同一 -->
</section>
