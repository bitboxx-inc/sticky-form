<script lang="ts">
  import { page } from "$app/stores";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type { StickyField } from "$lib/types";

  let lang = getLang();
  let formId = "";

  // meta (from URL)
  let title = "";
  let description = "";
  let author = "";

  // fields & values
  let fields: StickyField[] = [];
  let values: Record<string, any> = {};

  /* -----------------------------
   * React to URL / params
   * --------------------------- */
  $: {
    formId = $page.params.formId;

    const params = $page.url.searchParams;
    lang = (params.get("lang") as "en" | "ja") || lang;

    title = params.get("t") || t("forms.defaultTitle", lang);
    description = params.get("d") || "";
    author = params.get("a") || "";

    parseFields(params);
    restoreAnswers();
  }

  /* -----------------------------
   * Storage keys
   * --------------------------- */
  function answersKey() {
    return `stickyForm:answers:${formId}`;
  }

  /* -----------------------------
   * Field parsing
   * --------------------------- */
  function parseFields(params: URLSearchParams) {
    const parsed: StickyField[] = [];

    params.forEach((value, key) => {
      if (!key.startsWith("entry.")) return;

      parsed.push({
        id: key,
        label: value,
        type: "text"
      });
    });

    // restore type / options from meta if exists
    const raw = localStorage.getItem(`stickyForm:meta:${formId}`);
    if (raw) {
      try {
        const meta = JSON.parse(raw);
        fields = parsed.map((f) => {
          const m = meta.fields?.find((x) => x.id === f.id);
          return m ? { ...f, ...m } : f;
        });
        return;
      } catch {}
    }

    fields = parsed;
  }

  /* -----------------------------
   * Answer persistence
   * --------------------------- */
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

  /* -----------------------------
   * Submit
   * --------------------------- */
  function submit() {
    saveAnswers();

    const params = new URLSearchParams();

    fields.forEach((f) => {
      const v = values[f.id];
      if (!v) return;

      if (Array.isArray(v)) {
        v.forEach((x) => params.append(f.id, x));
      } else {
        params.append(f.id, v);
      }
    });

    const target =
      `https://docs.google.com/forms/d/e/${formId}/viewform?` +
      params.toString();

    window.location.href = target;
  }
</script>

<section class="max-w-xl mx-auto px-4 py-16">
    <!-- Header -->
    <div class="mb-10 text-center">
        <h1 class="text-2xl font-semibold mb-2">{title}</h1>

        {#if description}
            <p class="text-sm text-gray-600 mb-2">{description}</p>
        {/if}

        {#if author}
            <p class="text-xs text-gray-500">{author}</p>
        {/if}
    </div>

    <!-- Notice -->
    <p class="text-sm text-gray-600 mb-8 text-center">
        {t("forms.description", lang) ??
        "Your answers will be remembered on this device. You will be redirected to Google Forms after submitting."}
    </p>

    <!-- Fields -->
    <div class="space-y-6 mb-10">
        {#each fields as field}
            <div>
                <label class="block text-sm font-medium mb-2">
                    {field.label}
                </label>

                {#if field.type === "text"}
                    <input
                            type="text"
                            bind:value={values[field.id]}
                            on:input={saveAnswers}
                            class="w-full rounded-md border px-3 py-2 text-sm"
                    />
                {/if}

                {#if field.type === "email"}
                    <input
                            type="email"
                            bind:value={values[field.id]}
                            on:input={saveAnswers}
                            class="w-full rounded-md border px-3 py-2 text-sm"
                    />
                {/if}

                {#if field.type === "number"}
                    <input
                            type="number"
                            bind:value={values[field.id]}
                            on:input={saveAnswers}
                            class="w-full rounded-md border px-3 py-2 text-sm"
                    />
                {/if}

                {#if field.type === "radio"}
                    <div class="space-y-2">
                        {#each field.options ?? [] as opt}
                            <label class="flex items-center gap-2 text-sm">
                                <input
                                        type="radio"
                                        name={field.id}
                                        value={opt}
                                        checked={values[field.id] === opt}
                                        on:change={() => {
                    values[field.id] = opt;
                    saveAnswers();
                  }}
                                />
                                {opt}
                            </label>
                        {/each}
                    </div>
                {/if}

                {#if field.type === "checkbox"}
                    <div class="space-y-2">
                        {#each field.options ?? [] as opt}
                            <label class="flex items-center gap-2 text-sm">
                                <input
                                        type="checkbox"
                                        checked={(values[field.id] ?? []).includes(opt)}
                                        on:change={(e) => {
                    const checked = e.currentTarget.checked;
                    values[field.id] ||= [];
                    values[field.id] = checked
                      ? [...values[field.id], opt]
                      : values[field.id].filter((v) => v !== opt);
                    saveAnswers();
                  }}
                                />
                                {opt}
                            </label>
                        {/each}
                    </div>
                {/if}
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
