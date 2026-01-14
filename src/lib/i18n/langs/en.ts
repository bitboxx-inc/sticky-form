const en = {
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
      "This service is not affiliated with Google. Google Forms is a trademark of Google LLC.",
    reset: "Reset saved answers",
    resetConfirm:
      "Clear all saved answers for this form on this device?"
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

  contact: {
    title: "Contact",
    description:
      "Get in touch with us regarding enterprise use or custom solutions.",
    enterprise:
      "If you are considering using sticky-form in an enterprise environment, such as internal systems, large-scale operations, or organization-wide surveys, please contact us.",
    custom:
      "We also provide consultation for custom implementations, feature extensions, and integration with existing workflows.",
    emailLabel: "Contact email",
    note:
      "Please note that we may not be able to respond to all inquiries, but we will review each message carefully."
  }
} as const;

export default en;
