<script lang="ts">
  import { getLang, t } from "$lib/i18n/useI18n";

  let lang = getLang();
</script>

<section class="max-w-3xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-semibold mb-6">
        {t("privacy.title", lang)}
    </h1>

    <p class="text-gray-700 mb-10">
        {t("privacy.intro", lang)}
    </p>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("privacy.section1Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("privacy.section1Body", lang)}
        </p>
    </section>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("privacy.section2Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("privacy.section2Body", lang)}
        </p>
    </section>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("privacy.section3Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("privacy.section3Body", lang)}
        </p>
    </section>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("privacy.section4Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("privacy.section4Body", lang)}
        </p>
    </section>

    <section>
        <h2 class="text-lg font-semibold mb-2">
            {t("privacy.section5Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("privacy.section5Body", lang)}
        </p>
    </section>
</section>
