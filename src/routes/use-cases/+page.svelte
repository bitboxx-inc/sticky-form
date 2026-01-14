<script lang="ts">
  import { getLang, t } from "$lib/i18n/useI18n";

  let lang = getLang();
</script>

<section class="max-w-4xl mx-auto px-4 py-20">
    <!-- Header -->
    <header class="mb-16 text-center">
        <h1 class="text-3xl font-semibold tracking-tight mb-4">
            Sticky Form のユースケース
        </h1>

        <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Sticky Form は、Google Forms を使ったアンケートや入力作業を
            「何度も同じ内容を入力する手間」から解放するための軽量ツールです。
            実際の利用シーンをいくつか紹介します。
        </p>
    </header>

    <!-- Use case 1 -->
    <section class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            定期アンケート・社内調査
        </h2>

        <p class="text-gray-600 leading-relaxed">
            社内満足度調査や定例アンケートでは、部署名・職種・拠点など
            毎回変わらない項目を何度も入力する必要があります。
            Sticky Form を使えば、これらの項目を一度入力するだけで、
            次回以降は自動的に入力済みの状態でアンケートを開始できます。
        </p>

        <p class="text-gray-600 leading-relaxed mt-3">
            回答者の入力負荷を下げることで、回答率や入力精度の向上にもつながります。
        </p>
    </section>

    <!-- Use case 2 -->
    <section class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            イベント・ワークショップの受付
        </h2>

        <p class="text-gray-600 leading-relaxed">
            勉強会や展示会、ワークショップなどでは、
            同じ参加者が複数回アンケートに回答するケースがよくあります。
            Sticky Form を使えば、氏名や所属、メールアドレスなどの
            基本情報を端末に保存したまま、次のアンケートに進めます。
        </p>

        <p class="text-gray-600 leading-relaxed mt-3">
            QRコードで配布できるため、スマートフォンでの受付にも適しています。
        </p>
    </section>

    <!-- Use case 3 -->
    <section class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            現場点検・フィールドワーク
        </h2>

        <p class="text-gray-600 leading-relaxed">
            工事現場や設備点検、研究調査など、
            同じ作業者が複数回フォーム入力を行う現場では、
            入力の繰り返しが大きな負担になります。
        </p>

        <p class="text-gray-600 leading-relaxed mt-3">
            Sticky Form は端末ごとに入力内容を保持するため、
            作業者名や担当エリアなどを毎回入力する必要がありません。
            現場作業のスピードと正確性を両立できます。
        </p>
    </section>

    <!-- Use case 4 -->
    <section class="mb-14">
        <h2 class="text-xl font-semibold mb-3">
            学校・教育・研究用途
        </h2>

        <p class="text-gray-600 leading-relaxed">
            授業アンケートや研究調査では、学年やクラス、研究グループなど
            共通項目の入力が頻繁に発生します。
            Sticky Form を使うことで、学生や調査協力者の入力負担を軽減できます。
        </p>

        <p class="text-gray-600 leading-relaxed mt-3">
            個人情報はブラウザ内にのみ保存され、
            外部サーバーに送信されないため、安心して利用できます。
        </p>
    </section>

    <!-- Privacy -->
    <section class="border-t border-gray-200 pt-10 text-sm text-gray-500 leading-relaxed">
        <p>
            Sticky Form は入力内容をサーバーに保存しません。
            すべてのデータは利用者のブラウザ内にのみ保持され、
            送信時にのみ Google Forms に転送されます。
        </p>
    </section>
</section>
