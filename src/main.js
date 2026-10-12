import { site } from "./config.js";
import { copy } from "./i18n.js";
import "./styles.css";

const STORAGE_KEY = "photolock-lang";
const page = document.body.dataset.page || "index";

const pageHref = {
  privacy: "./privacy.html",
  terms: "./terms.html",
  support: "./support.html",
};

function preferredLanguage() {
  const query = new URLSearchParams(location.search).get("lang");
  if (query === "zh" || query === "en") return query;
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "zh" || saved === "en") return saved;
  return navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
}

function textWithLinks(template, lang) {
  const fragment = document.createDocumentFragment();
  const pattern = /\{(email|privacy|terms|support|date)\}/g;
  let cursor = 0;
  for (const match of template.matchAll(pattern)) {
    fragment.append(template.slice(cursor, match.index));
    fragment.append(tokenNode(match[1], lang));
    cursor = match.index + match[0].length;
  }
  fragment.append(template.slice(cursor));
  return fragment;
}

function tokenNode(token, lang) {
  if (token === "date") {
    return document.createTextNode(lang === "zh" ? site.effectiveDateZh : site.effectiveDateEn);
  }
  if (token === "email") {
    const link = document.createElement("a");
    link.href = `mailto:${site.contactEmail}`;
    link.textContent = site.contactEmail;
    return link;
  }
  const labels = {
    privacy: lang === "zh" ? "《隐私政策》" : "Privacy Policy",
    terms: lang === "zh" ? "《使用条款》" : "Terms of Use",
    support: lang === "zh" ? "支持页面" : "Support page",
  };
  const link = document.createElement("a");
  link.href = pageHref[token];
  link.textContent = labels[token];
  return link;
}

function fillText(langPack) {
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = valueAt(langPack, node.dataset.i18n);
    if (typeof value === "string") node.textContent = value;
  });
}

function valueAt(pack, path) {
  return path.split(".").reduce((current, key) => current?.[key], pack);
}

function renderDocument(lang) {
  const doc = copy[lang][page];
  const root = document.getElementById("doc");
  if (!doc || !root) return;
  root.replaceChildren();
  const h1 = document.createElement("h1");
  h1.textContent = doc.h1;
  const updated = document.createElement("p");
  updated.className = "updated";
  updated.append(textWithLinks(doc.updated, lang));
  root.append(h1, updated);
  doc.sections.forEach((section) => {
    const h2 = document.createElement("h2");
    h2.textContent = section.h;
    root.append(h2);
    section.p.forEach((paragraph) => {
      const p = document.createElement("p");
      p.append(textWithLinks(paragraph, lang));
      root.append(p);
    });
  });
}

function apply(lang) {
  const pack = copy[lang];
  document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
  localStorage.setItem(STORAGE_KEY, lang);
  fillText(pack);
  renderDocument(lang);

  const pageCopy = pack[page];
  if (pageCopy?.title) document.title = pageCopy.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && pageCopy?.description) description.setAttribute("content", pageCopy.description);

  document.querySelectorAll(".lang").forEach((group) => {
    group.setAttribute("aria-label", pack.langLabel);
  });
  document.querySelectorAll("[data-lang-set]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.langSet === lang));
  });
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.documentElement.classList.remove("i18n-pending");
}

document.querySelectorAll("[data-lang-set]").forEach((button) => {
  button.addEventListener("click", () => {
    const lang = button.dataset.langSet;
    const url = new URL(location.href);
    url.searchParams.set("lang", lang);
    history.replaceState(null, "", url);
    apply(lang);
  });
});

apply(preferredLanguage());
