export type Lang = "en" | "ja";

export const DEFAULT_LANG: Lang = "en";

export const messages = {
  en: {
    common: {
      language: "Language",
      copy: "Copy",
      addField: "Add another field"
    },

    layout: {
      docs: "Docs",
      create: "Create",
      privacy: "Privacy",
      about: "About",
      terms: "Terms",
      contact: "Contact",
      github: "GitHub"
    },

    new: {
      title: "Create a sticky form",
      description:
        "Configure which Google Form fields should be remembered on the respondent’s device.",
      surveyTitle: "Survey Title",
      surveyDescription: "Survey Description (Optional)",
      surveyAuthor: "Survey Author (Optional)",
      prefillLabel: "Google Forms prefilled URL",
      prefillHint:
        "Entry IDs and labels will be extracted automatically if available.\n" +
        "The values prefilled in the Google Form are used as the initial labels.\n" +
        "Entry IDs should not be changed.\n" +
        "You can edit the labels as needed to make them clearer for respondents.\n",
      stickyFields: "Sticky fields",
      stickyHint:
        "Left: Google Forms field ID. Right: Label shown to respondents.",
      generatedUrl: "Generated URL",
      scanHint: "Scan to open the sticky form",
      labelPlaceholder: "Label shown to respondents",
      optionsPlaceholder: "Options (comma separated)",
      optionsHint: "Use the same option labels as defined in Google Forms.",
      generate: "Generate link & QR",
      regenerate: "Regenerate link & QR",
      generatedOk: "Link and QR code are up to date.",
      needsRegenerate: "Settings have changed. Please regenerate."
    },

    forms: {
      title: "Survey",
      defaultTitle: "Survey",
      description:
        "Your answers will be remembered on this device. You will be redirected to Google Forms after submitting.",
      submit: "Continue to Google Forms",
      redirectNotice:
        "You will be redirected to Google Forms. Your answers will be pre-filled.",
      continue: "Continue to Google Forms",
      disclaimer:
        "This service is not affiliated with Google. Google Forms is a trademark of Google LLC."
    },

    docs: {
      title: "Documentation",
      intro:
        "sticky-form is a small utility that helps Google Forms remember selected fields on a device.",
      section1Title: "How it works",
      section1Body:
        "sticky-form stores selected answers in your browser and restores them the next time you open the form.",
      section2Title: "How to create a sticky form",
      steps: [
        "Open your Google Form.",
        "Create a prefilled URL using Google Forms.",
        "Paste the prefilled URL into sticky-form.",
        "Select which fields should be remembered.",
        "Share the generated URL or QR code."
      ],
      section3Title: "Notes",
      notes: [
        "Data is stored only in the browser (localStorage).",
        "No data is sent to any server.",
        "This works per device and per browser.",
        "After entering information, you will be redirected to Google Forms."
      ]
    },

    privacy: {
      title: "Privacy Policy",
      intro:
        "sticky-form respects your privacy and is designed to minimize the collection of personal data.",
      section1Title: "Information We Do Not Collect",
      section1Body:
        "sticky-form does not collect, store, or transmit any personal information to its servers. All data is stored locally in your browser.",
      section2Title: "Local Storage",
      section2Body:
        "Selected form values are stored in your browser's localStorage to restore them on future visits. This data never leaves your device.",
      section3Title: "Third-Party Services",
      section3Body:
        "sticky-form redirects users to Google Forms for form submission. Google may collect information according to its own privacy policy.",
      section4Title: "Advertising",
      section4Body:
        "This site may display advertisements provided by Google AdSense. Google may use cookies or similar technologies to show relevant ads.",
      section5Title: "Changes",
      section5Body:
        "This privacy policy may be updated from time to time. Any changes will be posted on this page."
    },

    terms: {
      title: "Terms of Service",
      intro:
        "These Terms of Service govern the use of sticky-form.",
      section1Title: "Use of the Service",
      section1Body:
        "sticky-form is provided for convenience. You may use the service at your own discretion and responsibility.",
      section2Title: "No Warranty",
      section2Body:
        "The service is provided \"as is\" without any warranties, express or implied. We do not guarantee that the service will be error-free or uninterrupted.",
      section3Title: "Limitation of Liability",
      section3Body:
        "sticky-form shall not be liable for any damages arising from the use or inability to use the service.",
      section4Title: "Third-Party Services",
      section4Body:
        "sticky-form integrates with third-party services such as Google Forms. We are not responsible for the content or behavior of those services.",
      section5Title: "Changes to the Terms",
      section5Body:
        "These terms may be updated from time to time. Continued use of the service constitutes acceptance of the updated terms."
    },


    home: {
      heroTitle: "Make Google Forms sticky.",
      heroDescription:
        "sticky-form is a lightweight utility that helps Google Forms remember previously entered values on the same device. It eliminates repetitive input for recurring surveys — without login, without backend, and without modifying your existing forms.",

      problemTitle: "The problem with recurring forms",
      problemBody:
        "Google Forms works great for one-time surveys. But when you need responses from the same person multiple times, respondents are forced to re-enter the same basic information — such as name, email, location, or device ID. This repetition creates friction and often leads to lower completion rates.",

      features: [
        {
          title: "Remember selected fields",
          body:
            "Choose which Google Form fields should be remembered on the device. Once entered, values are automatically restored on the next visit."
        },
        {
          title: "No login, no backend",
          body:
            "sticky-form runs entirely in the browser using local storage. No accounts, no servers, and no personal data collection."
        },
        {
          title: "QR-code friendly workflows",
          body:
            "Designed for QR-code based usage such as on-site inspections, daily checklists, and recurring questionnaires."
        },
        {
          title: "Works with existing forms",
          body:
            "Use your current Google Forms as-is. sticky-form adds a memory layer without modifying your forms."
        }
      ],

      howItWorksTitle: "How it works",
      steps: [
        {
          title: "Create",
          body:
            "Paste your Google Form URL and specify which fields should be sticky. A shareable link and QR code are generated instantly."
        },
        {
          title: "Answer",
          body:
            "Users open the link or scan the QR code and answer the form as usual. Selected values are saved locally on the device."
        },
        {
          title: "Reuse",
          body:
            "On the next visit, previously entered values are pre-filled automatically. No retyping required."
        }
      ],

      useCasesTitle: "Typical use cases",
      useCases: [
        "Repeated surveys for the same participants",
        "On-site equipment inspection forms",
        "Event or exhibition feedback via QR codes",
        "Facility or store checklists on shared devices",
        "Internal reporting forms with fixed basic information"
      ],

      ctaCreate: "Create a sticky form",
      ctaDocs: "Read docs",

      disclaimer:
        "sticky-form is an independent tool and is not affiliated with or endorsed by Google. Google Forms is a trademark of Google LLC. All data is stored locally in your browser and never transmitted to any server."
    },

    "contact": {
      "title": "Contact",
      "description": "Get in touch with us regarding enterprise use or custom solutions.",
      "enterprise": "If you are considering using sticky-form in an enterprise environment, such as internal systems, large-scale operations, or organization-wide surveys, please contact us.",
      "custom": "We also provide consultation for custom implementations, feature extensions, and integration with existing workflows.",
      "emailLabel": "Contact email",
      "note": "Please note that we may not be able to respond to all inquiries, but we will review each message carefully."
    }
  },

  ja: {
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
        "本サービスは Google とは提携していません。Google Forms は Google LLC の商標です。"
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

    "contact": {
      "title": "お問い合わせ",
      "description": "Enterprise 利用や個別カスタマイズに関するお問い合わせはこちらからお願いいたします。",
      "enterprise": "sticky-form を企業内システム、組織利用、大規模なアンケート運用などでご検討されている場合は、下記までお問い合わせください。",
      "custom": "既存業務フローへの組み込み、機能追加、個別要件に応じたカスタマイズについてもご相談を承っています。",
      "emailLabel": "お問い合わせ先メールアドレス",
      "note": "内容によってはご返信までお時間をいただく場合、またはご回答できない場合がございます。あらかじめご了承ください。"
    }
  }
} as const;
