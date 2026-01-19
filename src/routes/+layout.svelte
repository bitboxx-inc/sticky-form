<script lang="ts">
  import "../app.css";
  import { getLang, t } from "$lib/i18n/useI18n";
  import { base } from "$app/paths";
  import Footer from "$lib/components/Footer.svelte";

  // 現在の言語
  let lang = getLang();

  const currentPath = new URL(window.location.href).pathname as string;

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

  /**
   * 言語切り替え
   * - localStorage 保存
   * - 現在 URL の ?lang のみ差し替え
   */
  function changeLang(next: "en" | "ja") {
    lang = next;
    localStorage.setItem("lang", next);

    const url = new URL(window.location.href);
    url.searchParams.set("lang", next);
    window.location.href = url.pathname + url.search;
  }
</script>

<div class="min-h-screen flex flex-col bg-white text-gray-900">
    <!-- Header -->
    {#if !currentPath.startsWith('/forms/')}
        <header class="border-b border-gray-200">
            <div class="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                <!-- Logo -->
                <a href={withLang("/")} class="font-semibold text-lg tracking-tight">
                    Sticky form
                </a>

                <!-- Navigation -->
                <nav class="flex items-center gap-6 text-sm text-gray-600">
                    <a href={withLang("/docs")} class="hover:text-gray-900">
                        {t("layout.docs", lang)}
                    </a>

                    <a href={withLang("/new")} class="hover:text-gray-900">
                        {t("layout.create", lang)}
                    </a>

                    <a href={withLang("/privacy")} class="hover:text-gray-900">
                        {t("layout.privacy", lang)}
                    </a>

                    <!-- Language switch -->
                    <div class="flex items-center gap-2 ml-2">
                        <button
                                on:click={() => changeLang("en")}
                                class="text-xs px-2 py-1 rounded border hover:bg-gray-100"
                                class:font-semibold={lang === "en"}
                        >
                            EN
                        </button>
                        <button
                                on:click={() => changeLang("ja")}
                                class="text-xs px-2 py-1 rounded border hover:bg-gray-100"
                                class:font-semibold={lang === "ja"}
                        >
                            JA
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    {/if}

    <!-- Main -->
    <main class="flex-1">
        <slot />
    </main>

    <!-- Footer -->
    <Footer/>
</div>
