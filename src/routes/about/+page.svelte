<script lang="ts">
  import { getLang, t } from "$lib/i18n/useI18n";

  let lang = getLang();
</script>

<section class="max-w-3xl mx-auto px-4 py-20">
    <!-- Title -->
    <div class="mb-16">
        <h1 class="text-3xl font-semibold tracking-tight mb-4">
            {t("about.title", lang) ?? "About sticky-form"}
        </h1>

        <p class="text-gray-600 leading-relaxed">
            {t("about.lead", lang) ??
            "sticky-form is a small utility that adds persistence to Google Forms without changing how they work."}
        </p>
    </div>

    <!-- What -->
    <div class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            {t("about.whatTitle", lang) ?? "What is sticky-form?"}
        </h2>

        <p class="text-gray-600 leading-relaxed">
            {t("about.whatBody", lang) ??
            "sticky-form helps Google Forms remember selected answers on a single device. It is designed for situations where the same person answers similar forms repeatedly and should not have to re-enter the same information every time."}
        </p>
    </div>

    <!-- Philosophy -->
    <div class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            {t("about.philosophyTitle", lang) ?? "Design philosophy"}
        </h2>

        <ul class="list-disc list-inside space-y-2 text-gray-600 text-sm leading-relaxed">
            <li>
                {t("about.philosophy1", lang) ??
                "Do not replace Google Forms — extend them."}
            </li>
            <li>
                {t("about.philosophy2", lang) ??
                "No accounts, no backend, no tracking."}
            </li>
            <li>
                {t("about.philosophy3", lang) ??
                "All data stays in the browser’s local storage."}
            </li>
            <li>
                {t("about.philosophy4", lang) ??
                "Works even in restricted or offline-friendly environments."}
            </li>
        </ul>
    </div>

    <!-- Privacy -->
    <div class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            {t("about.privacyTitle", lang) ?? "Privacy-first by design"}
        </h2>

        <p class="text-gray-600 leading-relaxed">
            {t("about.privacyBody", lang) ??
            "sticky-form does not collect, transmit, or store any personal data on servers. All remembered answers are stored locally on the user’s device and are only sent directly to Google Forms when the user submits the form."}
        </p>
    </div>

    <!-- Use cases -->
    <div class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            {t("about.useCasesTitle", lang) ?? "Typical use cases"}
        </h2>

        <ul class="list-disc list-inside space-y-2 text-gray-600 text-sm leading-relaxed">
            <li>{t("about.use1", lang) ?? "On-site inspections and checklists"}</li>
            <li>{t("about.use2", lang) ?? "Recurring internal surveys"}</li>
            <li>{t("about.use3", lang) ?? "Events and exhibitions with repeat visitors"}</li>
            <li>{t("about.use4", lang) ?? "Equipment or facility reporting"}</li>
        </ul>
    </div>

    <!-- Disclaimer -->
    <div class="border-t border-gray-200 pt-8 text-xs text-gray-500 leading-relaxed">
        {t("about.disclaimer", lang) ??
        "sticky-form is an independent project and is not affiliated with or endorsed by Google. Google Forms is a trademark of Google LLC."}
    </div>
</section>
