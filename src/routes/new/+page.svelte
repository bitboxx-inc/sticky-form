<script lang="ts">
  import QRCode from "qrcode";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type {
    StickyField,
    StickyFieldType,
    StickyFormMeta
  } from "$lib/types";

  const DRAFT_KEY = "stickyForm:new:draft";

  /* -----------------------------
   * State
   * --------------------------- */
  let lang = getLang();

  let prefillUrl = "";
  let formId: string | null = null;

  // Survey meta
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
    if (isGenerated) {
      isDirty = true;
    }
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
    params.set("lang", lang);

    fields.forEach(f => {
      if (f.id && f.label) {
        params.append(f.id, f.label);
      }
    });

    const url =
      `${location.origin}/forms/${formId}?${params.toString()}`;

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

    <!-- Prefilled URL -->
    <div class="mb-10">
        <label class="block text-sm font-medium mb-1">
            {t("new.prefillLabel", lang)}
        </label>

        <input
                type="text"
                bind:value={prefillUrl}
                on:input={parsePrefillUrl}
                class="w-full rounded-md border px-3 py-2 text-sm"
        />

        <p class="text-xs text-gray-500 mt-2 whitespace-pre-line">
            {t("new.prefillHint", lang)}
        </p>
    </div>

    <!-- Sticky fields -->
    <div class="mb-12">
        <label class="block text-sm font-medium mb-3">
            {t("new.stickyFields", lang)}
        </label>

        <div class="space-y-4">
            {#each fields as field, i}
                <div class="border rounded-md p-3">
                    <div class="flex gap-2 items-center mb-2">
                        <button
                                type="button"
                                on:click={() => removeField(i)}
                                class="text-gray-400 hover:text-red-600 text-lg px-1"
                        >
                            ×
                        </button>

                        <input
                                type="text"
                                placeholder="entry.123456"
                                value={field.id}
                                on:input={(e) => updateField(i, "id", e.currentTarget.value)}
                                class="w-44 rounded-md border px-2 py-1 text-sm"
                        />

                        <input
                                type="text"
                                placeholder={t("new.labelPlaceholder", lang)}
                                value={field.label}
                                on:input={(e) => updateField(i, "label", e.currentTarget.value)}
                                class="flex-1 rounded-md border px-2 py-1 text-sm"
                        />

                        <select
                                value={field.type}
                                on:change={(e) => updateField(i, "type", e.currentTarget.value)}
                                class="rounded-md border px-2 py-1 text-sm"
                        >
                            <option value="text">Text</option>
                            <option value="email">Email</option>
                            <option value="number">Number</option>
                            <option value="radio">Radio</option>
                            <option value="checkbox">Checkbox</option>
                        </select>
                    </div>
                </div>
            {/each}
        </div>

        <button on:click={addField} class="mt-4 text-sm hover:underline">
            + {t("common.addField", lang)}
        </button>
    </div>

    <!-- Generate -->
    <div class="mb-12">
        <button
                on:click={generate}
                class="w-full rounded-md bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-800"
        >
            {isGenerated ? t("new.regenerate", lang) : t("new.generate", lang)}
        </button>

        {#if isGenerated && !isDirty}
            <p class="text-xs text-green-600 mt-2 text-center">
                {t("new.generatedOk", lang)}
            </p>
        {/if}

        {#if isGenerated && isDirty}
            <p class="text-xs text-amber-600 mt-2 text-center">
                {t("new.needsRegenerate", lang)}
            </p>
        {/if}
    </div>

    <!-- Generated result -->
    {#if isGenerated}
        <div class="border-t border-gray-200 pt-8">
            <div class="flex gap-2 mb-6">
                <input
                        type="text"
                        readonly
                        value={generatedUrl}
                        class="flex-1 rounded-md border px-3 py-2 text-sm bg-gray-50"
                />
                <button on:click={copy} class="border px-4 text-sm rounded-md">
                    {t("common.copy", lang)}
                </button>
            </div>

            <div class="flex justify-center">
                <img src={qrDataUrl} alt="QR code" />
            </div>
        </div>
    {/if}

    {#if showToast}
        <div class="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 text-sm rounded-md">
            {t("common.copied", lang) || "Link copied"}
        </div>
    {/if}
</section>
