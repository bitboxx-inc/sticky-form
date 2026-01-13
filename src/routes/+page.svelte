<script lang="ts">
  import { getLang, t, tArray } from "$lib/i18n/useI18n";

  let lang = getLang();

  $: features = tArray("home.features", lang);
  $: steps = tArray("home.steps", lang);
  $: useCases = tArray("home.useCases", lang);
</script>

<!-- Hero background -->
<section class="relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>

    <div class="relative max-w-6xl mx-auto px-4 pt-28 pb-32 text-center">
        <h1 class="text-4xl sm:text-5xl font-semibold tracking-tight mb-6">
            {t("home.heroTitle", lang)}
        </h1>

        <p class="text-gray-600 max-w-3xl mx-auto mb-10 text-lg leading-relaxed">
            {t("home.heroDescription", lang)}
        </p>

        <div class="flex justify-center gap-4 flex-wrap">
            <a
                    href={`/new?lang=${lang}`}
                    class="inline-flex items-center justify-center
               rounded-md bg-gray-900 text-white
               px-8 py-4 text-sm font-medium
               hover:bg-gray-800 transition"
            >
                {t("home.ctaCreate", lang)}
            </a>

            <a
                    href={`/docs?lang=${lang}`}
                    class="inline-flex items-center justify-center
               rounded-md border border-gray-300
               px-8 py-4 text-sm font-medium text-gray-700
               hover:bg-gray-50 transition"
            >
                {t("home.ctaDocs", lang)}
            </a>
        </div>
    </div>
</section>

<!-- Main content -->
<section class="max-w-6xl mx-auto px-4 py-28">

    <!-- Problem -->
    <div class="max-w-3xl mx-auto mb-32 text-center">
        <h2 class="text-2xl font-semibold mb-6">
            {t("home.problemTitle", lang)}
        </h2>
        <p class="text-gray-600 leading-relaxed">
            {t("home.problemBody", lang)}
        </p>
    </div>

    <!-- Features -->
    <div class="mb-32">
        <div class="grid gap-8 sm:grid-cols-2">
            {#each features as f}
                <div class="rounded-lg border border-gray-200 bg-white p-8">
                    <h3 class="text-lg font-semibold mb-3">
                        {f.title}
                    </h3>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        {f.body}
                    </p>
                </div>
            {/each}
        </div>
    </div>

    <!-- How it works -->
    <div class="mb-32">
        <h2 class="text-2xl font-semibold mb-14 text-center">
            {t("home.howItWorksTitle", lang)}
        </h2>

        <div class="grid gap-8 sm:grid-cols-3">
            {#each steps as step}
                <div class="rounded-lg border border-gray-200 bg-white p-8">
                    <div class="text-sm font-semibold mb-2">
                        {step.title}
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        {step.body}
                    </p>
                </div>
            {/each}
        </div>
    </div>

    <!-- Use cases -->
    <div class="mb-32">
        <h2 class="text-2xl font-semibold mb-14 text-center">
            {t("home.useCasesTitle", lang)}
        </h2>

        <div class="grid gap-6 sm:grid-cols-2">
            {#each useCases as uc}
                <div class="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-600 leading-relaxed">
                    {uc}
                </div>
            {/each}
        </div>
    </div>

    <!-- Disclaimer -->
    <div class="border-t border-gray-200 pt-10 text-xs text-gray-500 leading-relaxed text-center">
        {t("home.disclaimer", lang)}
    </div>
</section>
