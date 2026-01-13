<script lang="ts">
  import { getLang, t, tArray } from "$lib/i18n/useI18n";

  let lang = getLang();

  $: features = tArray("home.features", lang);
  $: steps = tArray("home.steps", lang);
  $: useCases = tArray("home.useCases", lang);
</script>

<section class="max-w-5xl mx-auto px-4 py-20">
    <!-- Hero -->
    <div class="text-center mb-24">
        <h1 class="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">
            {t("home.heroTitle", lang)}
        </h1>

        <p class="text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            {t("home.heroDescription", lang)}
        </p>

        <div class="flex justify-center gap-4">
            <a
                    href={`/new?lang=${lang}`}
                    class="inline-flex items-center justify-center rounded-md bg-gray-900 text-white px-6 py-3 text-sm font-medium hover:bg-gray-800"
            >
                {t("home.ctaCreate", lang)}
            </a>

            <a
                    href={`/docs?lang=${lang}`}
                    class="inline-flex items-center justify-center rounded-md border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
                {t("home.ctaDocs", lang)}
            </a>
        </div>
    </div>

    <!-- Problem -->
    <div class="mb-24 max-w-3xl mx-auto">
        <h2 class="text-xl font-semibold mb-4">
            {t("home.problemTitle", lang)}
        </h2>
        <p class="text-gray-600 text-sm leading-relaxed">
            {t("home.problemBody", lang)}
        </p>
    </div>

    <!-- Features -->
    <div class="grid gap-10 sm:grid-cols-2 mb-24">
        {#each features as f}
            <div>
                <h2 class="text-lg font-semibold mb-2">{f.title}</h2>
                <p class="text-gray-600 text-sm leading-relaxed">{f.body}</p>
            </div>
        {/each}
    </div>

    <!-- How it works -->
    <div class="mb-24">
        <h2 class="text-xl font-semibold mb-10 text-center">
            {t("home.howItWorksTitle", lang)}
        </h2>

        <div class="grid gap-10 sm:grid-cols-3 text-sm">
            {#each steps as step}
                <div>
                    <div class="font-semibold mb-1">{step.title}</div>
                    <p class="text-gray-600 leading-relaxed">{step.body}</p>
                </div>
            {/each}
        </div>
    </div>

    <!-- Use cases -->
    <div class="mb-24">
        <h2 class="text-xl font-semibold mb-10 text-center">
            {t("home.useCasesTitle", lang)}
        </h2>

        <ul class="grid gap-4 sm:grid-cols-2 text-sm text-gray-600 leading-relaxed">
            {#each useCases as uc}
                <li>• {uc}</li>
            {/each}
        </ul>
    </div>

    <!-- Disclaimer -->
    <div class="border-t border-gray-200 pt-10 text-xs text-gray-500 leading-relaxed">
        {t("home.disclaimer", lang)}
    </div>
</section>
