<script lang="ts">
  import { getLang, t } from "$lib/i18n/useI18n";

  let lang = getLang();
</script>

<section class="max-w-3xl mx-auto px-4 py-16">
    <h1 class="text-2xl font-semibold mb-6">
        {t("terms.title", lang)}
    </h1>

    <p class="text-gray-700 mb-10">
        {t("terms.intro", lang)}
    </p>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("terms.section1Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("terms.section1Body", lang)}
        </p>
    </section>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("terms.section2Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("terms.section2Body", lang)}
        </p>
    </section>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("terms.section3Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("terms.section3Body", lang)}
        </p>
    </section>

    <section class="mb-8">
        <h2 class="text-lg font-semibold mb-2">
            {t("terms.section4Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("terms.section4Body", lang)}
        </p>
    </section>

    <section>
        <h2 class="text-lg font-semibold mb-2">
            {t("terms.section5Title", lang)}
        </h2>
        <p class="text-gray-700">
            {t("terms.section5Body", lang)}
        </p>
    </section>
</section>
