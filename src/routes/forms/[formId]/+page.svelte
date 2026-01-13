<script lang="ts">
  import { page } from "$app/stores";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type { StickyField, StickyFormMeta } from "$lib/types";

  let lang = getLang();
  let formId = "";

  let title = "";
  let description = "";
  let author = "";

  let fields: StickyField[] = [];
  let values: Record<string, any> = {};

  const unsubscribe = page.subscribe(($page) => {
    formId = $page.params.formId;
    const p = $page.url.searchParams;

    lang = (p.get("lang") as "en" | "ja") || lang;

    // URL first
    title = p.get("t") ?? "Survey";
    description = p.get("d") ?? "";
    author = p.get("a") ?? "";

    loadMeta();
    restoreAnswers();
    applyUrlPrefill(p);
  });

  function metaKey() {
    return `stickyForm:meta:${formId}`;
  }

  function answersKey() {
    return `stickyForm:answers:${formId}`;
  }

  function loadMeta() {
    const raw = localStorage.getItem(metaKey());
    if (!raw) return;

    try {
      const meta = JSON.parse(raw) as StickyFormMeta;
      fields = meta.fields ?? fields;
      if (!title) title = meta.title;
      if (!description) description = meta.description ?? "";
      if (!author) author = meta.author ?? "";
    } catch {}
  }

  function restoreAnswers() {
    const raw = localStorage.getItem(answersKey());
    if (!raw) return;
    try {
      values = JSON.parse(raw);
    } catch {}
  }

  function applyUrlPrefill(p: URLSearchParams) {
    p.forEach((v, k) => {
      if (k.startsWith("entry.") && values[k] == null) {
        values[k] = v;
      }
    });
  }

  function saveAnswers() {
    localStorage.setItem(answersKey(), JSON.stringify(values));
  }

  function submit() {
    saveAnswers();
    const p = new URLSearchParams();
    fields.forEach(f => {
      if (values[f.id]) p.append(f.id, values[f.id]);
    });

    window.location.href =
      `https://docs.google.com/forms/d/e/${formId}/viewform?` + p;
  }

  $: unsubscribe;
</script>

<svelte:head>
    <title>{title} | Sticky form</title>
    <meta name="robots" content="noindex, nofollow" />
    <meta name="googlebot" content="noindex, nofollow" />
    <meta name="description" content={description} />
</svelte:head>

<section class="max-w-xl mx-auto px-4 py-16">
    <div class="text-center mb-10">
        <h1 class="text-2xl font-semibold">{title}</h1>
        {#if description}<p class="text-sm text-gray-600">{description}</p>{/if}
        {#if author}<p class="text-xs text-gray-500">{author}</p>{/if}
    </div>

    <p class="text-sm text-gray-600 mb-8 text-center">
        {t("forms.description", lang)}
    </p>

    <div class="space-y-6 mb-10">
        {#each fields as f}
            <div>
                <label class="block text-sm font-medium mb-1">{f.label}</label>
                <input
                        type="text"
                        bind:value={values[f.id]}
                        on:input={saveAnswers}
                        class="w-full rounded-md border px-3 py-2 text-sm"
                />
            </div>
        {/each}
    </div>

    <button
            on:click={submit}
            class="w-full rounded-md bg-gray-900 text-white py-3 text-sm font-medium"
    >
        {t("forms.submit", lang)}
    </button>
</section>
