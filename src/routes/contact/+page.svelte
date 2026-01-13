<script lang="ts">
  import { getLang, t } from "$lib/i18n/useI18n";

  let lang = getLang();
</script>

<section class="max-w-3xl mx-auto px-4 py-20">
    <!-- Title -->
    <h1 class="text-2xl font-semibold mb-4">
        {t("contact.title", lang)}
    </h1>

    <p class="text-sm text-gray-600 mb-10">
        {t("contact.description", lang)}
    </p>

    <!-- Main content -->
    <div class="space-y-6 text-sm text-gray-700 leading-relaxed">
        <p>
            {t("contact.enterprise", lang)}
        </p>

        <p>
            {t("contact.custom", lang)}
        </p>

        <div class="border rounded-md bg-gray-50 p-4">
            <p class="font-medium mb-1">
                {t("contact.emailLabel", lang)}
            </p>
            <p class="text-gray-900">
                <a
                        href="mailto:contact@bitboxx.co.jp"
                        class="underline hover:text-gray-700"
                >
                    contact@bitboxx.co.jp
                </a>
            </p>
        </div>

        <p class="text-xs text-gray-500">
            {t("contact.note", lang)}
        </p>
    </div>
</section>
