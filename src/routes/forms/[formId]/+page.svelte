<script lang="ts">
  import { page } from "$app/stores";
  import { getLang, t } from "$lib/i18n/useI18n";
  import type { StickyField } from "$lib/types";
  import AdSlot from "$lib/components/AdSlot.svelte";

  let lang = getLang();
  let formId = "";

  // meta (from URL)
  let title = "";
  let description = "";
  let author = "";

  // fields & values
  let fields: StickyField[] = [];
  let values: Record<string, any> = {};

  // storage state
  let storageAvailable = true;
  let storageErrorMessage = "";

  /* -----------------------------
   * Storage availability check
   * --------------------------- */
  function detectStorageAvailability() {
    try {
      const key = "__storage_test__";
      localStorage.setItem(key, "1");
      localStorage.removeItem(key);
      storageAvailable = true;
      storageErrorMessage = "";
    } catch {
      storageAvailable = false;
      storageErrorMessage =
        lang === "ja"
          ? "このブラウザでは入力内容を保存できません。プライベートブラウザをOFFにしてください。"
          : "This browser does not allow saving answers. Please disable private/incognito mode.";
    }
  }

  /* -----------------------------
   * React to URL / params
   * --------------------------- */
  $: {
    const params = $page.url.searchParams;

    formId = $page.params.formId;
    lang = (params.get("lang") as "en" | "ja") || lang;

    detectStorageAvailability();

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
      if (!key.startsWith("entry.") || key.includes("__")) return;

      const type =
        (params.get(`${key}__type`) as StickyField["type"]) ?? "text";

      const optsRaw = params.get(`${key}__opts`);
      const options =
        optsRaw ? optsRaw.split(",").map(v => v.trim()).filter(Boolean) : undefined;

      parsed.push({
        id: key,
        label: value,
        type,
        options
      });
    });

    const raw = localStorage.getItem(`stickyForm:meta:${formId}`);
    if (raw) {
      try {
        const meta = JSON.parse(raw);
        fields = parsed.map((f) => {
          const m = meta.fields?.find((x) => x.id === f.id);
          return m ? { ...f, ...m, type: f.type, options: f.options } : f;
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
    if (!storageAvailable) return;

    const raw = localStorage.getItem(answersKey());
    if (!raw) return;

    try {
      values = JSON.parse(raw);
    } catch {
      values = {};
    }
  }

  function saveAnswers() {
    if (!storageAvailable) return;

    try {
      localStorage.setItem(answersKey(), JSON.stringify(values));
    } catch {
      storageAvailable = false;
    }
  }

  /* -----------------------------
   * Submit
   * --------------------------- */
  function submit() {
    if (!storageAvailable) {
      alert(
        lang === "ja"
          ? "この環境では入力内容を保存できません。必要であれば通常モードで開き直してください。"
          : "Your answers cannot be saved in this browser mode."
      );
    }

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

  function resetAnswers() {
    const ok = confirm(
      t("forms.resetConfirm", lang) ??
      "Clear all saved answers for this form on this device?"
    );

    if (!ok) return;

    localStorage.removeItem(answersKey());
    values = {};
  }
</script>

<section class="max-w-2xl mx-auto px-4 py-16">

    <!-- Hero -->
    <div class="mb-10">
        <h1 class="text-2xl font-semibold mb-2">
            {title}
        </h1>

        {#if description}
            <p class="text-sm text-gray-600">
                {description}
            </p>
        {/if}

        {#if author}
            <p class="text-xs text-gray-400 mt-1">
                {author}
            </p>
        {/if}
    </div>

    <!-- Storage warning -->
    {#if !storageAvailable}
        <div class="mb-8 rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
            <p class="font-medium mb-1">
                {lang === "ja" ? "保存ができない環境です" : "Saving is not available"}
            </p>
            <p>
                {storageErrorMessage}
            </p>
        </div>
    {/if}

    <!-- Form card -->
    <div class="rounded-lg border bg-white p-6 space-y-6 mb-10">
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
                      : values[field.id].filter(v => v !== opt);
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
            class="w-full max-w-md mx-auto block rounded-md bg-gray-900 text-white py-3 text-sm font-medium hover:bg-gray-800"
    >
        {t("forms.submit", lang) ?? "Continue to Google Forms"}
    </button>

    <p class="text-xs text-gray-500 mt-4 text-center">
        {t("forms.redirectNotice", lang) ??
        "You will be redirected to Google Forms. Your answers will be pre-filled."}
    </p>

    <!-- Reset -->
    <button
            on:click={resetAnswers}
            class="mt-8 text-xs text-gray-400 hover:text-red-600 underline block mx-auto"
    >
        {t("forms.reset", lang) ?? "Reset saved answers"}
    </button>

    <!-- Info card -->
    <div class="mt-10 rounded-lg border bg-gray-50 p-5 text-sm text-gray-700">
        <p class="font-medium mb-2">
            {lang === "ja" ? "このフォームについて" : "About this form"}
        </p>

        <ul class="space-y-1 text-gray-600">
            <li>
                • {lang === "ja"
              ? "入力内容はこの端末に保存されます"
              : "Your answers are stored on this device"}
            </li>
            <li>
                • {lang === "ja"
              ? "次回以降、自動で入力されます"
              : "Previously entered values are restored automatically"}
            </li>
            <li>
                • {lang === "ja"
              ? "データは外部に送信されません"
              : "No data is sent to any server"}
            </li>
        </ul>
    </div>

<!--    &lt;!&ndash; Ad &ndash;&gt;-->
<!--    <div class="mb-10">-->
<!--        <AdSlot />-->
<!--    </div>-->

</section>
