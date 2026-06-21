'use strict';

const I18N_STORAGE_KEY = 'anon-language';
const DEFAULT_LANG = 'vi-VN';

const TEXT_SELECTORS = [
  '.menu-title',
  '.banner-title',
  '.banner-subtitle',
  '.banner-btn',
  '.category-item-title',
  '.category-btn',
  '.sidebar-title',
  '.showcase-heading',
  '.title',
  '.showcase-title',
  '.showcase-category',
  '.product-name',
  '.add-cart-btn',
  '.countdown-desc',
  '.display-text',
  '.showcase-desc',
  '.showcase-badge',
  '.testimonial-name',
  '.testimonial-title',
  '.testimonial-desc',
  '.discount',
  '.cta-title',
  '.cta-text',
  '.cta-btn',
  '.service-title',
  '.service-desc',
  '.blog-category',
  '.blog-title',
  '.footer-category-title',
  '.category-box-title',
  '.footer-category-link',
  '.nav-title',
  '.footer-nav-link',
  '.newsletter-title',
  '.btn-newsletter',
  '.toast-message',
  '.toast-title',
  '.submenu-title',
  '.dropdown-item > a',
  '.panel-list-item > a',
  '.dropdown-panel-list > .menu-title > a'
].join(', ');

const PLACEHOLDER_SELECTORS = {
  '.search-field': 'Enter your product name...',
  '.email-field': 'Email Address'
};

const TITLE_SELECTORS = {
  '.stock[title="Available Stock"]': 'Available Stock'
};

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function getStoredLanguage() {
  return localStorage.getItem(I18N_STORAGE_KEY) || DEFAULT_LANG;
}

function setStoredLanguage(lang) {
  localStorage.setItem(I18N_STORAGE_KEY, lang);
}

function saveOriginalText(el) {
  if (!el.dataset.i18nOriginal) {
    el.dataset.i18nOriginal = normalizeText(el.textContent);
  }
}

function saveOriginalHtml(el) {
  if (!el.dataset.i18nOriginalHtml) {
    el.dataset.i18nOriginalHtml = el.innerHTML.trim();
  }
}

function translateText(el, lang) {
  saveOriginalText(el);
  const original = el.dataset.i18nOriginal;

  if (lang === 'en-US') {
    el.textContent = original;
    return;
  }

  const map = TRANSLATIONS[lang];
  if (map && map[original]) {
    el.textContent = map[original];
  }
}

function translateHtml(el, lang, htmlKey) {
  saveOriginalHtml(el);

  if (lang === 'en-US') {
    el.innerHTML = el.dataset.i18nOriginalHtml;
    return;
  }

  const map = HTML_TRANSLATIONS[lang];
  if (map && map[htmlKey]) {
    el.innerHTML = map[htmlKey];
  }
}

function translatePlaceholders(lang) {
  Object.entries(PLACEHOLDER_SELECTORS).forEach(([selector, key]) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.dataset.i18nPlaceholder) {
        el.dataset.i18nPlaceholder = el.placeholder;
      }

      if (lang === 'en-US') {
        el.placeholder = el.dataset.i18nPlaceholder;
      } else {
        const map = TRANSLATIONS[lang];
        el.placeholder = (map && map[key]) || el.dataset.i18nPlaceholder;
      }
    });
  });
}

function translateTitles(lang) {
  Object.entries(TITLE_SELECTORS).forEach(([selector, key]) => {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.dataset.i18nTitle) {
        el.dataset.i18nTitle = el.title;
      }

      if (lang === 'en-US') {
        el.title = el.dataset.i18nTitle;
      } else {
        const map = TRANSLATIONS[lang];
        el.title = (map && map[key]) || el.dataset.i18nTitle;
      }
    });
  });
}

function translatePage(lang) {
  document.querySelectorAll(TEXT_SELECTORS).forEach((el) => {
    if (el.querySelector(TEXT_SELECTORS)) return;
    translateText(el, lang);
  });

  const htmlMap = [
    ['.header-alert-news p', 'header-alert'],
    ['.newsletter-desc', 'newsletter-desc'],
    ['.slider-item:nth-child(1) .banner-text', 'banner-text-1'],
    ['.slider-item:nth-child(2) .banner-text', 'banner-text-2'],
    ['.slider-item:nth-child(3) .banner-text', 'banner-text-3'],
    ['.toast-meta', 'toast-meta'],
    ['.copyright', 'copyright'],
    ['.blog-card:nth-child(1) .blog-meta', 'blog-meta-1'],
    ['.blog-card:nth-child(2) .blog-meta', 'blog-meta-2'],
    ['.blog-card:nth-child(3) .blog-meta', 'blog-meta-3'],
    ['.blog-card:nth-child(4) .blog-meta', 'blog-meta-4'],
    ['.product-featured .showcase-container:nth-child(1) .showcase-status .wrapper p:first-child', 'sold-1'],
    ['.product-featured .showcase-container:nth-child(1) .showcase-status .wrapper p:last-child', 'avail-1'],
    ['.product-featured .showcase-container:nth-child(2) .showcase-status .wrapper p:first-child', 'sold-2'],
    ['.product-featured .showcase-container:nth-child(2) .showcase-status .wrapper p:last-child', 'avail-2']
  ];

  htmlMap.forEach(([selector, key]) => {
    const el = document.querySelector(selector);
    if (el) translateHtml(el, lang, key);
  });

  translatePlaceholders(lang);
  translateTitles(lang);

  document.documentElement.lang = lang.startsWith('vi') ? 'vi' : 'en';
  document.title = lang === 'vi-VN'
    ? 'Anon - Website Thương mại điện tử'
    : 'Anon - eCommerce Website';

  const langSelect = document.querySelector('select[name="language"]');
  if (langSelect) langSelect.value = lang;
}

function initLanguageSwitcher() {
  const langSelect = document.querySelector('select[name="language"]');

  if (langSelect) {
    langSelect.addEventListener('change', (e) => {
      const lang = e.target.value;
      setStoredLanguage(lang);
      translatePage(lang);
    });
  }

  document.querySelectorAll('[data-lang]').forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = link.dataset.lang;
      setStoredLanguage(lang);
      translatePage(lang);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const lang = getStoredLanguage();
  translatePage(lang);
  initLanguageSwitcher();
});
