<script lang="ts">
  import {getLang, t, tArray} from "$lib/i18n/useI18n";

  let lang = getLang();

  // 配列系は script 側で受ける
  $: steps = tArray("docs.steps", lang);
  $: notes = tArray("docs.notes", lang);
</script>

<section class="max-w-3xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-semibold mb-6">
        {t("docs.title", lang)}
    </h1>

    <p class="text-gray-700 mb-10">
        {t("docs.intro", lang)}
    </p>

    <!-- How it works -->
    <section class="mb-10">
        <h2 class="text-lg font-semibold mb-2">
            {t("docs.section1Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("docs.section1Body", lang)}
        </p>
    </section>

    <!-- How to create -->
    <section class="mb-10">
        <h2 class="text-lg font-semibold mb-3">
            {t("docs.section2Title", lang)}
        </h2>
        <ol class="list-decimal list-inside space-y-2 text-gray-700">
            {#each steps as step}
                <li>{step}</li>
            {/each}
        </ol>
    </section>

    <!-- Notes -->
    <section>
        <h2 class="text-lg font-semibold mb-3">
            {t("docs.section3Title", lang)}
        </h2>
        <ul class="list-disc list-inside space-y-2 text-gray-700">
            {#each notes as note}
                <li>{note}</li>
            {/each}
        </ul>
    </section>
</section>
