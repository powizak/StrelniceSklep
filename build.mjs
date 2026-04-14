#!/usr/bin/env node
/**
 * build.mjs — Zero-dependency static site generator for Střelnice Sklep
 *
 * Reads HTML templates from templates/, translations from i18n/{lang}.json,
 * and generates per-language static HTML pages with SEO markup.
 *
 * Template syntax:
 *   {{i18n.key.path}}            — resolved via dot-notation in translations
 *   {{i18n.key | uppercase}}     — with filter (uppercase, lowercase)
 *   {{#if i18n.key}}...{{/if}}   — conditional block
 *   {{#each i18n.array}}...{{/each}} — loop (use {{this}}, {{this.prop}})
 *   {{{body}}}                   — unescaped HTML injection
 *   {{> partial-name}}           — include templates/partials/name.html
 */

import {
  readFileSync, writeFileSync, mkdirSync,
  existsSync, cpSync, rmSync,
} from 'node:fs';
import { resolve, join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// ─── Config ───────────────────────────────────────────────────────────────────

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;

const LANGS        = ['cz', 'en', 'de'];
const DEFAULT_LANG = 'cz';
const BASE_URL     = 'https://www.strelnicesklep.cz';
const PAGES        = ['index', 'strelnice', 'zbrane', 'balicky', 'faq', 'gdpr', 'zbrojni-prukaz'];

/** Map page slug → i18n nav key */
const PAGE_NAV_KEY = {
  index: 'home', strelnice: 'shootingRange', zbrane: 'weapons',
  balicky: 'packages', faq: 'faq', gdpr: 'gdpr', 'zbrojni-prukaz': 'gunLicense',
};

const LOCALE_MAP    = { cz: 'cs_CZ', en: 'en_US', de: 'de_DE' };
const HTML_LANG_MAP = { cz: 'cs',    en: 'en',    de: 'de'    };
const HREFLANG_MAP  = { cz: 'cs',    en: 'en',    de: 'de'    };

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Resolve a dot-notation path like "i18n.nav.home" on an object. */
function resolvePath(obj, path) {
  if (obj == null || !path) return undefined;
  return path.split('.').reduce((acc, key) => (acc != null ? acc[key] : undefined), obj);
}

/** HTML-escape a string (for {{var}} double-brace output). */
function escapeHtml(val) {
  if (val == null) return '';
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Apply a named filter to a string value. */
function applyFilter(val, filter) {
  if (val == null) return '';
  const s = String(val);
  switch (filter?.trim()) {
    case 'uppercase': return s.toUpperCase();
    case 'lowercase': return s.toLowerCase();
    default:          return s;
  }
}

// ─── Template Engine ──────────────────────────────────────────────────────────

function loadFile(...segments) {
  const p = join(ROOT, ...segments);
  return existsSync(p) ? readFileSync(p, 'utf-8') : null;
}

/**
 * Full template pipeline:
 *   1. Expand partials  {{> name}}
 *   2. Evaluate {{#if}} blocks
 *   3. Expand {{#each}} loops
 *   4. Resolve {{{triple}}} (unescaped) then {{double}} (escaped) variables
 */
function processTemplate(tmpl, ctx) {
  // 1 — Partials (recursive — a partial can include other partials)
  tmpl = tmpl.replace(/\{\{>\s*([\w-]+)\s*\}\}/g, (_, name) => {
    const partial = loadFile('templates', 'partials', `${name}.html`);
    if (!partial) return `<!-- partial missing: ${name} -->`;
    return processTemplate(partial, ctx);
  });

  // 2 — Conditionals
  tmpl = tmpl.replace(
    /\{\{#if\s+([\w.-]+)\}\}([\s\S]*?)\{\{\/if\}\}/g,
    (_, key, content) => (resolvePath(ctx, key) ? content : ''),
  );

  // 3 — Each loops
  tmpl = tmpl.replace(
    /\{\{#each\s+([\w.-]+)\}\}([\s\S]*?)\{\{\/each\}\}/g,
    (_, arrayKey, body) => {
      const arr = resolvePath(ctx, arrayKey);
      if (!Array.isArray(arr)) return '';
      return arr.map(item => {
        let out = body;
        // {{this.prop}} first (before {{this}} to avoid partial overlap)
        out = out.replace(/\{\{this\.([\w.-]+)\}\}/g, (_, prop) =>
          escapeHtml(resolvePath(item, prop)));
        // {{this}} — the current item itself
        out = out.replace(/\{\{this\}\}/g, () => escapeHtml(item));
        return out;
      }).join('');
    },
  );

  // 4a — Triple braces (unescaped raw injection)
  tmpl = tmpl.replace(/\{\{\{\s*([\w.-]+)\s*\}\}\}/g, (_, key) =>
    resolvePath(ctx, key) ?? '',
  );

  // 4b — Double braces (escaped, optional filter via |)
  tmpl = tmpl.replace(
    /\{\{([\w.-]+)(?:\s*\|\s*(\w+))?\}\}/g,
    (_, key, filter) => {
      const val = resolvePath(ctx, key);
      if (val == null) return '';
      return applyFilter(escapeHtml(val), filter);
    },
  );

  return tmpl;
}

// ─── SEO Head Generation ─────────────────────────────────────────────────────

function generateSeoHead(page, lang, translations) {
  const navKey = PAGE_NAV_KEY[page] || page;

  const title = resolvePath(translations, `seo.${navKey}.title`)
             || resolvePath(translations, `nav.${navKey}`)
             || page;
  const desc  = resolvePath(translations, `seo.${navKey}.description`) || '';

  const pageSlug = page === 'index' ? '' : page;
  const langPfx  = lang === DEFAULT_LANG ? '' : `${lang}/`;
  const pageUrl  = `${BASE_URL}/${langPfx}${pageSlug}`;

  const lines = [
    `<title>${escapeHtml(title)} | Střelnice Sklep</title>`,
    `<meta name="description" content="${escapeHtml(desc)}">`,
    `<meta property="og:title" content="${escapeHtml(title)} | Střelnice Sklep">`,
    `<meta property="og:description" content="${escapeHtml(desc)}">`,
    `<meta property="og:image" content="${BASE_URL}/assets/images/hero-1.png">`,
    `<meta property="og:url" content="${pageUrl}">`,
    `<meta property="og:locale" content="${LOCALE_MAP[lang]}">`,
    `<meta property="og:type" content="website">`,
    `<link rel="canonical" href="${pageUrl}">`,
  ];

  // hreflang links for every language
  for (const l of LANGS) {
    const lPfx = l === DEFAULT_LANG ? '' : `${l}/`;
    lines.push(
      `<link rel="alternate" hreflang="${HREFLANG_MAP[l]}" href="${BASE_URL}/${lPfx}${pageSlug}">`,
    );
  }
  lines.push(
    `<link rel="alternate" hreflang="x-default" href="${BASE_URL}/${pageSlug}">`,
  );

  return lines.join('\n    ');
}

// ─── JSON-LD Structured Data ─────────────────────────────────────────────────

function generateJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Střelnice Sklep',
    url: BASE_URL,
    telephone: '+420 777 263 031',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Dukelská 631',
      addressLocality: 'Domažlice',
      postalCode: '344 01',
      addressCountry: 'CZ',
    },
  };
  return `<script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n</script>`;
}

// ─── Context Builder ──────────────────────────────────────────────────────────

function buildContext(page, lang, translations) {
  const isDefault    = lang === DEFAULT_LANG;
  const assetsPrefix = isDefault ? '' : '../';
  const htmlLang     = HTML_LANG_MAP[lang];
  const locale       = LOCALE_MAP[lang];

  // Relative page links (within current language directory)
  const link = {};
  for (const p of PAGES) {
    link[p] = `${p === 'index' ? 'index' : p}.html`;
  }

  // Language switcher links (to *same page* in other languages)
  const langLink = {};
  for (const l of LANGS) {
    if (l === lang) {
      langLink[l] = '';
    } else if (isDefault) {
      langLink[l] = `${l}/${page === 'index' ? 'index' : page}.html`;
    } else if (l === DEFAULT_LANG) {
      langLink[l] = `../${page === 'index' ? 'index' : page}.html`;
    } else {
      langLink[l] = `../${l}/${page === 'index' ? 'index' : page}.html`;
    }
  }

  return {
    i18n: translations,
    lang,
    htmlLang,
    locale,
    page,
    assetsPrefix,
    baseUrl: BASE_URL,
    link,
    langLink,
    seoHead: generateSeoHead(page, lang, translations),
    jsonLd: generateJsonLd(),
  };
}

// ─── Build Pipeline ───────────────────────────────────────────────────────────

function build() {
  console.log('🔨  Building Střelnice Sklep static site…\n');

  const outputDir = join(ROOT, 'output');

  // Clean previous output
  if (existsSync(outputDir)) rmSync(outputDir, { recursive: true, force: true });
  mkdirSync(outputDir, { recursive: true });

  // Load layout template
  const layout = loadFile('templates', 'layout.html');
  if (!layout) {
    console.error('❌  templates/layout.html not found — aborting.');
    process.exit(1);
  }

  // Load all translations
  const translations = {};
  for (const lang of LANGS) {
    const raw = loadFile('i18n', `${lang}.json`);
    if (!raw) {
      console.error(`❌  i18n/${lang}.json not found — aborting.`);
      process.exit(1);
    }
    translations[lang] = JSON.parse(raw);
  }

  let totalPages = 0;

  // ── Generate pages for every language × every page ──
  for (const lang of LANGS) {
    const isDefault = lang === DEFAULT_LANG;
    const langDir   = isDefault ? outputDir : join(outputDir, lang);
    if (!isDefault) mkdirSync(langDir, { recursive: true });

    for (const page of PAGES) {
      const tmpl = loadFile('templates', `${page}.html`);
      if (!tmpl) {
        console.log(`  ⚠  templates/${page}.html missing — skipping`);
        continue;
      }

      // Build context, process page template, then wrap in layout
      const ctx    = buildContext(page, lang, translations[lang]);
      const body   = processTemplate(tmpl, ctx);
      const html   = processTemplate(layout, { ...ctx, body });
      const outPath = join(langDir, `${page}.html`);

      writeFileSync(outPath, html.trim() + '\n', 'utf-8');

      const rel = isDefault ? `${page}.html` : `${lang}/${page}.html`;
      console.log(`  ✅  ${rel}`);
      totalPages++;
    }
  }

  // ── Copy static assets ──
  const assetDirs = [
    { src: 'css', dest: 'css' },
    { src: 'js',  dest: 'js'  },
    { src: 'assets', dest: 'assets' },
  ];

  for (const { src, dest } of assetDirs) {
    const srcPath  = join(ROOT, src);
    const destPath = join(outputDir, dest);
    if (existsSync(srcPath)) {
      cpSync(srcPath, destPath, { recursive: true });
      console.log(`  📁  ${src}/ → output/${dest}/`);
    }
  }

  console.log(`\n✨  Done: ${totalPages} pages × ${LANGS.length} languages → output/\n`);
}

build();
