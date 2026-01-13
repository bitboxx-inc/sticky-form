<script lang="ts">
  import { page } from "$app/stores";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type { StickyField, StickyFormMeta } from "$lib/types";

  let lang = getLang();
  let formId = "";

  // meta
  let title = "";
  let description = "";
  let author = "";

  // fields & values
  let fields: StickyField[] = [];
  let values: Record<string, any> = {};

  const unsubscribe = page.subscribe(($page) => {
    formId = $page.params.formId;

    const params = $page.url.searchParams;
    lang = (params.get("lang") as "en" | "ja") || lang;

    loadMeta();
    parseFields(params);
    restoreAnswers();
  });

  function metaKey() {
    return `stickyForm:meta:${formId}`;
  }

  function answersKey() {
    return `stickyForm:answers:${formId}`;
  }

  function loadMeta() {
    const raw = localStorage.getItem(metaKey());
    if (!raw) {
      title = t("forms.defaultTitle", lang) || "Survey";
      description = "";
      author = "";
      return;
    }

    try {
      const meta = JSON.parse(raw) as StickyFormMeta;
      title = meta.title || t("forms.defaultTitle", lang);
      description = meta.description || "";
      author = meta.author || "";
    } catch {
      title = t("forms.defaultTitle", lang) || "Survey";
      description = "";
      author = "";
    }
  }

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

  function submit() {
    saveAnswers();

    const params = new URLSearchParams();
    fields.forEach((f) => {
      if (values[f.id]) {
        params.append(f.id, values[f.id]);
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
        {t("forms.description", lang) ||
        "Your answers will be remembered on this device. You will be redirected to Google Forms after submitting."}
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
        {t("forms.submit", lang) || "Continue to Google Forms"}
    </button>

    <p class="text-xs text-gray-500 mt-4 text-center">
        {t("forms.redirectNotice", lang) ||
        "You will be redirected to Google Forms. Your answers will be pre-filled."}
    </p>
</section>

