<script lang="ts">
  import { page } from "$app/stores";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type { StickyField, StickyFormMeta } from "$lib/types";

  let lang = getLang();
  let formId = "";

  // Survey meta
  let title = "";
  let description = "";
  let author = "";

  // Fields & answers
  let fields: StickyField[] = [];
  let values: Record<string, any> = {};

  const unsubscribe = page.subscribe(($page) => {
    formId = $page.params.formId;

    const params = $page.url.searchParams;

    // language
    lang = (params.get("lang") as "en" | "ja") || lang;

    // load meta (URL -> localStorage -> default)
    loadMetaFromUrl(params);
    loadMetaFromStorage();

    // fields
    parseFields(params);

    // restore answers
    restoreAnswers();
  });

  /* ----------------------------------
   * Keys
   * -------------------------------- */
  function metaKey() {
    return `stickyForm:meta:${formId}`;
  }

  function answersKey() {
    return `stickyForm:answers:${formId}`;
  }

  /* ----------------------------------
   * Meta
   * -------------------------------- */
  function loadMetaFromUrl(params: URLSearchParams) {
    title =
      params.get("t") ??
      t("forms.defaultTitle", lang) ??
      "Survey";

    description = params.get("d") ?? "";
    author = params.get("a") ?? "";
  }

  function loadMetaFromStorage() {
    // URL が優先なので、足りない部分だけ補完
    const raw = localStorage.getItem(metaKey());
    if (!raw) return;

    try {
      const meta = JSON.parse(raw) as StickyFormMeta;

      if (!title && meta.title) title = meta.title;
      if (!description && meta.description) description = meta.description;
      if (!author && meta.author) author = meta.author;
    } catch {
      // ignore
    }
  }

  /* ----------------------------------
   * Fields
   * -------------------------------- */
  function parseFields(params: URLSearchParams) {
    fields = [];

    params.forEach((value, key) => {
      if (key.startsWith("entry.")) {
        fields.push({
          id: key,
          label: value,
          type: "text"
        });
      }
    });
  }

  /* ----------------------------------
   * Answers
   * -------------------------------- */
  function restoreAnswers() {
    const raw = localStorage.getItem(answersKey());
    if (!raw) return;

    try {
      values = JSON.parse(raw);
    } catch {
      values = {};
    }
  }

  function saveAnswers() {
    localStorage.setItem(answersKey(), JSON.stringify(values));
  }

  /* ----------------------------------
   * Submit
   * -------------------------------- */
  function submit() {
    saveAnswers();

    const params = new URLSearchParams();

    fields.forEach((f) => {
      const v = values[f.id];
      if (v !== undefined && v !== "") {
        params.append(f.id, v);
      }
    });

    const target =
      `https://docs.google.com/forms/d/e/${formId}/viewform?` +
      params.toString();

    window.location.href = target;
  }

  $: unsubscribe;
</script>

<section class="max-w-xl mx-auto px-4 py-16">
    <!-- Header -->
    <div class="mb-10 text-center">
        <h1 class="text-2xl font-semibold mb-2">
            {title}
        </h1>

        {#if description}
            <p class="text-sm text-gray-600 mb-2">
                {description}
            </p>
        {/if}

        {#if author}
            <p class="text-xs text-gray-500">
                {author}
            </p>
        {/if}
    </div>

    <!-- Notice -->
    <p class="text-sm text-gray-600 mb-8 text-center">
        {t("forms.description", lang) ??
        "Your answers will be remembered on this device. After confirming, you will be redirected to Google Forms."}
    </p>

    <!-- Fields -->
    <div class="space-y-6 mb-10">
        {#each fields as field}
            <div>
                <label class="block text-sm font-medium mb-1">
                    {field.label}
                </label>

                <input
                        type="text"
                        bind:value={values[field.id]}
                        on:input={saveAnswers}
                        class="w-full rounded-md border px-3 py-2 text-sm"
                />
            </div>
        {/each}
    </div>

    <!-- Submit -->
    <button
            on:click={submit}
            class="w-full rounded-md bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-800"
    >
        {t("forms.submit", lang) ?? "Continue to Google Forms"}
    </button>

    <p class="text-xs text-gray-500 mt-4 text-center">
        {t("forms.redirectNotice", lang) ??
        "You will be redirected to Google Forms. Your answers will be pre-filled."}
    </p>
</section>
