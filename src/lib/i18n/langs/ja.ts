const ja = {
  common: {
    language: "言語",
    copy: "コピー",
    addField: "項目を追加"
  },

  layout: {
    docs: "ドキュメント",
    create: "作成",
    privacy: "プライバシー",
    about: "このサイトについて",
    terms: "利用規約",
    contact: "お問い合わせ",
    github: "GitHub"
  },

  new: {
    title: "sticky フォームを作成",
    description:
      "回答者の端末に入力内容を記憶する Google フォーム用リンクを作成します。",
    surveyTitle: "フォームのタイトル",
    surveyDescription: "説明 (任意)",
    surveyAuthor: "作者 (任意)",
    prefillLabel: "Google フォームの事前入力 URL",
    prefillHint:
      "事前入力 URL があれば、項目 ID とラベルを自動取得します。\n" +
      "事前入力されている値は、初期のラベルとして使用されます。\n" +
      "entry ID は変更しないでください。\n" +
      "ラベルは、回答者に分かりやすい名称に必要に応じて編集できます。\n",
    stickyFields: "記憶する項目",
    stickyHint:
      "左：Google フォームの項目 ID（entry ID）／右：回答者に表示されるラベル",
    generatedUrl: "生成された URL",
    scanHint: "QRコードを読み取ってフォームを開きます",
    labelPlaceholder: "回答者に表示されるラベル",
    optionsPlaceholder: "選択肢（カンマ区切り）",
    optionsHint: "Google フォームと同じ選択肢ラベルを入力してください。",
    generate: "リンクとQRコードを生成",
    regenerate: "リンクとQRコードを再生成",
    generatedOk: "リンクとQRコードは最新です。",
    needsRegenerate: "設定が変更されています。再生成してください。"
  },

  forms: {
    title: "タイトル",
    defaultTitle: "フォーム",
    description:
      "この端末では入力内容が記憶されます。送信後、Googleフォームに移動します。",
    submit: "Googleフォームへ進む",
    redirectNotice:
      "このあと Google フォームに移動し、入力内容が自動で反映されます。",
    continue: "Google フォームへ進む",
    disclaimer:
      "本サービスは Google とは提携していません。Google Forms は Google LLC の商標です。",
    reset: "保存された入力をリセット",
    resetConfirm:
      "この端末に保存されている入力内容をすべて削除しますか？"
  },

  docs: {
    title: "ドキュメント",
    intro:
      "sticky-form は、Google フォームの一部の入力内容を端末に記憶させるための小さなユーティリティです。",
    section1Title: "仕組み",
    section1Body:
      "sticky-form は、指定された入力内容をブラウザに保存し、次回フォームを開いたときに自動で復元します。",
    section2Title: "sticky フォームの作り方",
    steps: [
      "Google フォームを開きます。",
      "Google フォームの事前入力 URL を作成します。",
      "その URL を sticky-form に貼り付けます。",
      "記憶させたい項目を選択します。",
      "生成された URL または QR コードを共有します。"
    ],
    section3Title: "注意点",
    notes: [
      "データはブラウザ内（localStorage）のみに保存されます。",
      "サーバーには一切送信されません。",
      "端末・ブラウザごとに動作します。",
      "入力後は Google フォームに移動して送信します。"
    ]
  },

  privacy: {
    title: "プライバシーポリシー",
    intro:
      "sticky-form は、利用者のプライバシーを尊重し、個人情報の収集を最小限に抑える設計になっています。",
    section1Title: "収集しない情報について",
    section1Body:
      "sticky-form は、個人情報をサーバーに収集・保存・送信することはありません。すべてのデータは利用者のブラウザ内にのみ保存されます。",
    section2Title: "ローカルストレージの利用",
    section2Body:
      "選択された入力内容は、次回以降に復元するため、ブラウザの localStorage に保存されます。このデータが外部に送信されることはありません。",
    section3Title: "第三者サービスについて",
    section3Body:
      "フォームの送信は Google フォーム上で行われます。Google による情報の取り扱いについては、Google のプライバシーポリシーをご確認ください。",
    section4Title: "広告について",
    section4Body:
      "本サイトでは Google AdSense による広告が表示される場合があります。Google は、関連性の高い広告を表示するために Cookie 等を使用することがあります。",
    section5Title: "ポリシーの変更",
    section5Body:
      "本プライバシーポリシーは、必要に応じて変更されることがあります。変更内容は本ページに掲載されます。"
  },

  terms: {
    title: "利用規約",
    intro:
      "本利用規約は、sticky-form の利用条件を定めるものです。",
    section1Title: "サービスの利用",
    section1Body:
      "sticky-form は利便性向上のために提供されています。利用者は自己の判断と責任において本サービスを利用するものとします。",
    section2Title: "保証の否認",
    section2Body:
      "本サービスは現状有姿で提供され、正確性や継続性についていかなる保証も行いません。",
    section3Title: "責任の制限",
    section3Body:
      "本サービスの利用または利用不能により生じたいかなる損害についても、sticky-form は責任を負いません。",
    section4Title: "第三者サービス",
    section4Body:
      "sticky-form は Google フォーム等の第三者サービスと連携しますが、それらの内容や挙動について責任を負いません。",
    section5Title: "規約の変更",
    section5Body:
      "本利用規約は必要に応じて変更されることがあります。変更後も本サービスを利用した場合、変更に同意したものとみなされます。"
  },

  home: {
    heroTitle: "Make Google Forms sticky.",
    heroDescription:
      "sticky-form は、同じ端末で入力された Google フォームの値を記憶する軽量ツールです。ログイン不要、バックエンド不要、既存のフォームを変更することなく、繰り返し入力の手間をなくします。",

    problemTitle: "繰り返し使うフォームの課題",
    problemBody:
      "Google フォームは単発のアンケートには最適ですが、同じ人に何度も回答してもらう場合、氏名やメールアドレスなどの基本情報を毎回入力させる必要があります。この繰り返しは回答の負担となり、完了率の低下につながります。",

    features: [
      {
        title: "必要な項目だけを記憶",
        body:
          "記憶させたい項目を選択できます。一度入力された値は、次回以降自動的に復元されます。"
      },
      {
        title: "ログイン不要・サーバー不要",
        body:
          "sticky-form はブラウザ内だけで動作します。アカウント登録や個人情報の収集は行いません。"
      },
      {
        title: "QR コード運用に最適",
        body:
          "現地調査、日次チェック、定期アンケートなど、QR コードを使った運用に向いています。"
      },
      {
        title: "既存フォームをそのまま利用",
        body:
          "今ある Google フォームを変更する必要はありません。記憶機能だけを後付けします。"
      }
    ],

    howItWorksTitle: "使い方",
    steps: [
      {
        title: "作成",
        body:
          "Google フォームの URL を貼り付け、記憶させたい項目を指定します。共有用リンクと QR コードが生成されます。"
      },
      {
        title: "回答",
        body:
          "利用者はリンクを開くか QR コードを読み取り、通常どおりフォームに回答します。"
      },
      {
        title: "再利用",
        body:
          "次回以降は、以前入力した値が自動で入力され、変更点だけに集中できます。"
      }
    ],

    useCasesTitle: "主なユースケース",
    useCases: [
      "同じ回答者への定期アンケート",
      "設備点検や保守チェックフォーム",
      "イベント・展示会での QR アンケート",
      "店舗・施設のチェックリスト",
      "基本情報が固定の社内報告フォーム"
    ],

    ctaCreate: "sticky フォームを作成",
    ctaDocs: "ドキュメントを見る",

    disclaimer:
      "sticky-form は Google とは無関係の独立したツールです。Google Forms は Google LLC の商標です。すべてのデータはブラウザ内にのみ保存され、外部に送信されることはありません。"
  },

  contact: {
    title: "お問い合わせ",
    description:
      "Enterprise 利用や個別カスタマイズに関するお問い合わせはこちらからお願いいたします。",
    enterprise:
      "sticky-form を企業内システム、組織利用、大規模なアンケート運用などでご検討されている場合は、下記までお問い合わせください。",
    custom:
      "既存業務フローへの組み込み、機能追加、個別要件に応じたカスタマイズについてもご相談を承っています。",
    emailLabel: "お問い合わせ先メールアドレス",
    note:
      "内容によってはご返信までお時間をいただく場合、またはご回答できない場合がございます。あらかじめご了承ください。"
  }
} as const;

export default ja;
