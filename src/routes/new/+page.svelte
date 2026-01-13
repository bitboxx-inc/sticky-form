<script lang="ts">
  import QRCode from "qrcode";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type { StickyField, StickyFieldType, StickyFormMeta } from "$lib/types";
  import { base } from "$app/paths";

  const DRAFT_KEY = "stickyForm:new:draft";

  let lang = getLang();

  let prefillUrl = "";
  let formId: string | null = null;

  // Survey meta（URLに必ず含める）
  let title = "無題のアンケート";
  let description = "";
  let author = "";

  let fields: StickyField[] = [{ id: "", label: "", type: "text" }];

  let generatedUrl = "";
  let qrDataUrl = "";
  let isGenerated = false;
  let isDirty = false;

  let showToast = false;
  let toastTimer: number | null = null;

  /* -----------------------------
   * Draft restore
   * --------------------------- */
  const draft = localStorage.getItem(DRAFT_KEY);
  if (draft) {
    try {
      const d = JSON.parse(draft);
      prefillUrl = d.prefillUrl ?? "";
      formId = d.formId ?? null;
      title = d.title ?? title;
      description = d.description ?? "";
      author = d.author ?? "";
      fields = d.fields ?? fields;
    } catch {}
  }

  function extractFormId(path: string): string | null {
    const m = path.match(/\/forms\/d\/e\/([^/]+)/);
    return m ? m[1] : null;
  }

  function saveDraft() {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ prefillUrl, formId, title, description, author, fields })
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

      const next: StickyField[] = [];

      url.searchParams.forEach((v, k) => {
        if (!k.startsWith("entry.")) return;
        next.push({ id: k, label: decodeURIComponent(v), type: "text" });
      });

      fields = next;
      markDirty();
    } catch {}
  }

  function addField() {
    fields = [...fields, { id: "", label: "", type: "text" }];
    markDirty();
  }

  function removeField(i: number) {
    fields = fields.filter((_, idx) => idx !== i);
    markDirty();
  }

  function updateField(i: number, key: keyof StickyField, val: any) {
    const f = fields[i];

    if (key === "type") {
      f.type = val as StickyFieldType;
      if (val === "radio" || val === "checkbox") {
        f.options ??= [];
      } else {
        delete f.options;
      }
    } else {
      (f as any)[key] = val;
    }

    fields = [...fields];
    markDirty();
  }

  /* -----------------------------
   * Generate URL & QR
   * --------------------------- */
  async function generate() {
    if (!formId) {
      alert(t("new.formIdMissing", lang) || "Google Forms URL is required");
      return;
    }

    const params = new URLSearchParams();

    params.set("lang", lang);
    params.set("t", title || "無題のアンケート");
    if (description) params.set("d", description);
    if (author) params.set("a", author);

    fields.forEach((f) => {
      if (!f.id || !f.label) return;

      // 元の entry（Google Forms 用）
      params.append(f.id, f.label);

      // sticky-form 用メタ
      params.append(`${f.id}__type`, f.type);

      if ((f.type === "radio" || f.type === "checkbox") && f.options?.length) {
        params.append(`${f.id}__opts`, f.options.join(","));
      }
    });

    const url = `${location.origin}${base}/forms/${formId}?${params.toString()}`;

    generatedUrl = url;
    qrDataUrl = await QRCode.toDataURL(url, { width: 200, margin: 1 });

    const meta: StickyFormMeta = {
      formId,
      title,
      description,
      author,
      fields,
      lang,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(`stickyForm:meta:${formId}`, JSON.stringify(meta));

    isGenerated = true;
    isDirty = false;
    saveDraft();
  }

  async function copy() {
    await navigator.clipboard.writeText(generatedUrl);
    showToast = true;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => (showToast = false), 2000);
  }
</script>

<section class="max-w-3xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-semibold mb-2">
        {t("new.title", lang)}
    </h1>

    <p class="text-sm text-gray-600 mb-10">
        {t("new.description", lang)}
    </p>

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
            {t("new.prefillLabel", lang)} <span class="text-red-500">*</span>
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
                    {#if field.type === "radio" || field.type === "checkbox"}
                        <input
                                type="text"
                                placeholder={t("new.optionsPlaceholder", lang) || "Options (comma separated)"}
                                value={(field.options ?? []).join(", ")}
                                on:input={(e) => {
                                  field.options = e.currentTarget.value
                                    .split(",")
                                    .map(v => v.trim())
                                    .filter(Boolean);
                                  fields = [...fields];
                                  markDirty();
                                }}
                                class="w-full rounded-md border px-2 py-1 text-sm"
                        />

                        <p class="text-xs text-gray-500 mt-1">
                            {t("new.optionsHint", lang) ||
                            "Enter the same option labels as defined in Google Forms."}
                        </p>
                    {/if}
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
                <img src={qrDataUrl} alt="QR code"/>
            </div>
        </div>
    {/if}

    {#if showToast}
        <div
                class="fixed bottom-6 left-1/2 -translate-x-1/2
             bg-gray-900 text-white
             px-4 py-2 text-sm rounded-md"
        >
            {t("common.copied", lang) || "Link copied"}
        </div>
    {/if}
</section>
