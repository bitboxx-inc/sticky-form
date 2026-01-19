<script lang="ts">

  import {base} from "$app/paths";
  import {getLang, t} from "$lib/i18n/useI18n";

  // 現在の言語
  let lang = getLang();

  /**
   * base + path + lang を安全に合成する
   * - GitHub Pages 対応
   * - ?lang の二重付与防止
   */
  const withLang = (path: string) => {
    const url = new URL(`${base}${path}`, window.location.origin);
    url.searchParams.set("lang", lang);
    return url.pathname + url.search;
  };
</script>

<footer class="border-t border-gray-200">
    <div
            class="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500
             flex flex-col gap-3 sm:flex-row sm:justify-between"
    >
        <div>
            © {new Date().getFullYear()} <a href="/">Sticky Form</a> by bitboxx
        </div>

        <div class="flex gap-4">
            <a href={withLang("/about")} class="hover:text-gray-800">
                {t("layout.about", lang)}
            </a>
            <a href={withLang("/terms")} class="hover:text-gray-800">
                {t("layout.terms", lang)}
            </a>
            <a href={withLang("/privacy")} class="hover:text-gray-800">
                {t("layout.privacy", lang)}
            </a>
            <a href={withLang("/contact")} class="hover:text-gray-800">
                {t("layout.contact", lang)}
            </a>
        </div>
    </div>
</footer>