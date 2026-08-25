/*
 * Claimo site copy
 *
 * Keep user-facing copy here so content can be edited without hunting through
 * the page markup. Elements in index.html use data-string attributes and are
 * populated automatically on page load.
 */
const CLAIMO_STRINGS = {
  siteTitle: "Claimo — Consumer × E-Commerce Grievance Assistance",
  siteDescription: "Your refund shouldn't become a second job. Something went wrong with your order? Tell Claimo. We'll help take it forward.",
  whatsappHelp: "WhatsApp Help",
  avatarAria: "Open Claimo Resolution Guide",
  avatarAlt: "Maya Claimo AI Avatar Guide",
  maya: "Maya",
  liveAi: "LIVE AI",
  askAnything: "Ask me anything →",
  brandBeta: "Beta",
  navProblem: "The Problem",
  navHandle: "What We Handle",
  navHow: "How Claimo Works",
  navPricing: "Pricing",
  navWhy: "Why Claimo",
  getHelp: "Get Help",
  mobileWhatsapp: "Chat on WhatsApp",
  heroTitle: "Your refund shouldn't become a second job.",
  heroSubtitle: "Tell Claimo. We'll help take it forward.",
  consumerTrap: "THE CONSUMER TRAP",
  shoppingFine: "Everything was fine.",
  shoppingNot: "Until it wasn't.",
  section2Alt: "Damaged parcel dispute rejection",

  // Additional copy can be added here as sections are refactored.
};

function applyClaimoStrings(root = document) {
  root.querySelectorAll('[data-string]').forEach((element) => {
    const key = element.dataset.string;
    if (Object.prototype.hasOwnProperty.call(CLAIMO_STRINGS, key)) {
      element.textContent = CLAIMO_STRINGS[key];
    }
  });

  root.querySelectorAll('[data-string-attr]').forEach((element) => {
    const [attribute, key] = element.dataset.stringAttr.split(':');
    if (attribute && key && Object.prototype.hasOwnProperty.call(CLAIMO_STRINGS, key)) {
      element.setAttribute(attribute, CLAIMO_STRINGS[key]);
    }
  });

  if (CLAIMO_STRINGS.siteTitle) document.title = CLAIMO_STRINGS.siteTitle;
  const description = document.querySelector('meta[name="description"]');
  if (description && CLAIMO_STRINGS.siteDescription) {
    description.setAttribute('content', CLAIMO_STRINGS.siteDescription);
  }
}

document.addEventListener('DOMContentLoaded', () => applyClaimoStrings());
