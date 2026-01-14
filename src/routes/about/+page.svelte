<script lang="ts">
  import { getLang, t } from "$lib/i18n/useI18n";
  let lang = getLang();
</script>

<section class="max-w-3xl mx-auto px-4 py-16 leading-relaxed">
    <h1 class="text-2xl font-semibold mb-8">
        {t("layout.about", lang)}
    </h1>

    <section class="mb-10">
        <h2 class="text-lg font-semibold mb-2">
            What is sticky-form?
        </h2>
        <p class="text-sm text-gray-700">
            sticky-form is a lightweight web utility designed to reduce repetitive input
            when using Google Forms. It allows selected answers to be remembered locally
            on the same device, so respondents do not need to re-enter the same information
            every time they answer a recurring form.
        </p>
    </section>

    <section class="mb-10">
        <h2 class="text-lg font-semibold mb-2">
            Why we built this
        </h2>
        <p class="text-sm text-gray-700">
            Google Forms is excellent for collecting responses, but it is primarily designed
            for one-time submissions. In real-world use cases such as inspections, internal
            reports, or recurring surveys, the same people are often asked to submit the
            same basic information repeatedly.
        </p>
        <p class="text-sm text-gray-700 mt-3">
            sticky-form was created to solve this friction without requiring accounts,
            backend systems, or changes to existing Google Forms.
        </p>
    </section>

    <section class="mb-10">
        <h2 class="text-lg font-semibold mb-2">
            Intended use cases
        </h2>
        <ul class="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>Recurring surveys for the same participants</li>
            <li>On-site inspections and daily checklists</li>
            <li>Internal reporting forms with fixed basic information</li>
            <li>QR-code based form workflows</li>
        </ul>
    </section>

    <section class="mb-10">
        <h2 class="text-lg font-semibold mb-2">
            Privacy and data handling
        </h2>
        <p class="text-sm text-gray-700">
            sticky-form does not collect, store, or transmit any personal data to external
            servers. All remembered values are stored only in the user’s browser using
            localStorage and never leave the device.
        </p>
        <p class="text-sm text-gray-700 mt-3">
            Form submissions themselves are handled entirely by Google Forms, and are
            subject to Google’s own privacy policy.
        </p>
    </section>

    <section>
        <h2 class="text-lg font-semibold mb-2">
            About the operator
        </h2>
        <p class="text-sm text-gray-700">
            sticky-form is operated by an independent developer focused on building small,
            practical tools that improve everyday workflows.
        </p>
        <p class="text-sm text-gray-700 mt-3">
            For enterprise use cases or custom implementations, please contact us via the
            Contact page.
        </p>
    </section>
</section>
