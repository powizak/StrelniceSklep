# Střelnice Sklep

**Moderní statický vícejazyčný web střelnice**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-green)

Kompletní přestavba webu [strelnicesklep.cz](https://www.strelnicesklep.cz/) jako statický vícejazyčný web s build-time i18n systémem. Žádné frameworky, žádné runtime závislosti, žádné build nástroje. Čistý TypeScript + HTML/CSS/JS.

---

## O projektu

Střelnice Sklep je krytá střelnice v historickém objektu pivovaru v Domažlicích. Tento repozitář obsahuje kompletní zdrojový kód jejího nového webu.

Hlavní princip je jednoduchý: šablony s `{{i18n.klic}}` placeholdery se při buildu spojí s JSON překlady a výsledkem jsou čistě statické HTML soubory. Žádný runtime překlad, žádná databáze, žádný JavaScript na serveru.

**Klíčová čísla:**

- 7 stránek x 3 jazyky = 21 statických HTML souborů
- 145+ překladových klíčů v každém jazyce (čeština, angličtina, němčina)
- 317 řádků build skriptu, nulové npm runtime závislosti
- 109 obrázků, 6 CSS souborů, 5 TypeScript modulů

**Proč statický web?**

Rychlost, bezpečnost, jednoduchost nasazení. Každá stránka je hotový HTML soubor, který webový server rovnou pošle klientovi. Žádné renderování na serveru, žádná databáze k útoku, žádné pomalé API volání. SEO je vyřešeno při buildu: správné `<html lang>`, hreflang odkazy, JSON-LD strukturovaná data, unikátní meta tagy pro každou stránku v každém jazyce.

---

## Architektura

Celý web je postavený na principu build-time internacionalizace. Šablony obsahují placeholdery, překlady jsou v JSON souborech a build skript je spojí do výsledných HTML stránek.

```
templates/*.html  +  i18n/*.json  →  build.mjs  →  output/*.html
```

**Tok zpracování:**

1. `build.mjs` načte všechny šablony z `templates/` a překlady z `i18n/`
2. Pro každý jazyk a každou stránku se sestaví kontext (překlady, odkazy, SEO tagy)
3. Šablona stránky se zpracuje (nahrazení proměnných, podmínky, cykly, partialy)
4. Výsledek se vloží do layoutu a zapíše do `output/`
5. CSS, JS a assets se zkopírují do `output/`

**Struktura výstupu:**

```
output/
├── index.html          ← čeština (kořen)
├── strelnice.html
├── zbrane.html
├── ...
├── en/                 ← angličtina (podadresář)
│   ├── index.html
│   ├── strelnice.html
│   └── ...
├── de/                 ← němčina (podadresář)
│   ├── index.html
│   └── ...
├── css/
├── js/
└── assets/
```

Čeština je na kořenové úrovni (`/`), angličtina v `/en/`, němčina v `/de/`.

**Template engine:**

Build skript obsahuje vlastní jednoduchý template engine s těmito funkcemi:

| Syntax | Popis |
|---|---|
| `{{i18n.klic}}` | Escapovaný výstup, resolvený přes tečkovou notaci |
| `{{i18n.klic \| uppercase}}` | Výstup s filtrem (`uppercase`, `lowercase`) |
| `{{{body}}}` | Neescapovaný výstup (pro HTML obsah) |
| `{{#if i18n.klic}}...{{/if}}` | Podmíněný blok |
| `{{#each i18n.pole}}...{{/each}}` | Cyklus přes pole (přístup přes `{{this}}`, `{{this.vlastnost}}`) |
| `{{> nazev-partialu}}` | Vložení partial šablony z `templates/partials/nazev-partialu.html` |

---

## Struktura projektu

```
StrelniceSklep/
├── build.mjs              ← Build skript (317 řádků, nulové závislosti)
├── package.json           ← NPM konfigurace (jen TypeScript jako devDependency)
├── tsconfig.json          ← TypeScript config (strict mode, ES2020)
├── schema.sql             ← MariaDB schéma pro budoucí backend
│
├── templates/             ← HTML šablony (8 souborů)
│   ├── layout.html        ← Společný layout (header, nav, footer, cookies, lightbox)
│   ├── index.html         ← Homepage (hero slider, feature tiles, intro)
│   ├── strelnice.html     ← Střelnice (info, vybavení, historie)
│   ├── zbrane.html        ← Zbraně (galerie s lightboxem)
│   ├── balicky.html       ← Balíčky (15 balíčků s hover obrázky)
│   ├── faq.html           ← FAQ (4 sekce + galerie)
│   ├── gdpr.html          ← Ochrana osobních údajů
│   ├── zbrojni-prukaz.html← Zbrojní průkaz (5krokový průvodce)
│   └── partials/          ← Částečné šablony (volitelné)
│
├── i18n/                  ← Překlady (3 soubory, 145+ klíčů každý)
│   ├── cz.json            ← Čeština (výchozí jazyk)
│   ├── en.json            ← Angličtina
│   └── de.json            ← Němčina
│
├── css/                   ← Styly (6 souborů)
│   ├── style.css          ← Vstupní bod (importuje ostatní)
│   ├── variables.css      ← Design tokeny (barvy, typografie, spacing)
│   ├── base.css           ← Reset, typografie, základní layout
│   ├── components.css     ← Komponenty (tlačítka, karty, formuláře)
│   ├── pages.css          ← Styly pro konkrétní stránky
│   └── responsive.css     ← Media queries
│
├── ts/                    ← TypeScript zdrojáky (5 modulů)
│   ├── main.ts            ← Vstupní bod (inicializace všech modulů)
│   ├── navigation.ts      ← Responzivní navigace (hamburger menu)
│   ├── slider.ts          ← Hero slider s autoplay
│   ├── lightbox.ts        ← Lightbox galerie (klávesové ovládání)
│   └── cookies.ts         ← Cookie consent banner
│
├── js/                    ← Kompilovaný JavaScript (z ts/)
│   ├── main.js
│   ├── navigation.js
│   ├── slider.js
│   ├── lightbox.js
│   └── cookies.js
│
├── assets/                ← Statické soubory
│   └── images/            ← 109 obrázků (hero, zbraně, balíčky, ikony, galerie)
│
└── output/                ← Vygenerovaný web (gitignored)
    ├── *.html             ← 21 HTML stránek (7 x 3 jazyky)
    ├── css/
    ├── js/
    └── assets/
```

---

## Instalace a spuštění

**Požadavky:** Node.js 18+ (používá ESM moduly a `cpSync` z `node:fs`).

```bash
git clone https://github.com/powizak/StrelniceSklep.git
cd StrelniceSklep
npm install
npm run build:all
npm run serve
```

Po spuštění `npm run serve` je web dostupný na `http://localhost:3000`.

**NPM skripty:**

| Příkaz | Popis |
|---|---|
| `npm run build` | Spustí pouze build.mjs (generování HTML z šablon) |
| `npm run build:ts` | Zkompiluje TypeScript z `ts/` do `js/` |
| `npm run build:all` | TypeScript kompilace + HTML generování (plný build) |
| `npm run serve` | Naservíruje `output/` na portu 3000 |
| `npm run clean` | Smaže obsah `output/` |

Pro běžný vývoj stačí `npm run build:all` po změně šablon, překladů nebo TypeScriptu.

---

## Jak to funguje

Build pipeline v `build.mjs` funguje v těchto krocích:

### 1. Načtení překladů

Pro každý jazyk v poli `LANGS` (`['cz', 'en', 'de']`) se načte odpovídající JSON soubor z `i18n/`. JSON obsahuje všechny texty webu strukturované podle sekcí: `seo`, `nav`, `footer`, `home`, `shootingRange`, `weapons`, `packages`, `faq`, `gdpr`, `gunLicense`, `cookies`.

### 2. Načtení šablon

Načte se `templates/layout.html` (společný layout s headerem, navigací, footerem, cookie bannerym a lightboxem) a pro každou stránku odpovídající šablona z `templates/`.

### 3. Generování stránek

Pro každou kombinaci jazyk x stránka:

1. **Sestavení kontextu** funkce `buildContext()` připraví všechny proměnné dostupné v šabloně
2. **Zpracování stránky** funkce `processTemplate()` nahradí všechny placeholdery v šabloně stránky
3. **Zabalení do layoutu** výsledek se vloží do layoutu jako `{{{body}}}`
4. **Zápis souboru** hotové HTML se zapíše do příslušného adresáře v `output/`

### 4. Kopírování statických souborů

Adresáře `css/`, `js/` a `assets/` se zkopírují do `output/` pomocí `cpSync`.

### Proměnné dostupné v šablonách

Při zpracování šablony máte k dispozici tyto proměnné:

| Proměnná | Popis | Příklad |
|---|---|---|
| `i18n` | Kompletní objekt překladů pro aktuální jazyk | `{{i18n.nav.home}}` |
| `lang` | Kód aktuálního jazyka | `cz`, `en`, `de` |
| `htmlLang` | HTML lang atribut | `cs`, `en`, `de` |
| `assetsPrefix` | Prefix cesty k assets (prázdný pro CZ, `../` pro EN/DE) | `""`, `"../"` |
| `link` | Objekt s relativními odkazy na stránky v aktuálním jazyce | `{{link.strelnice}}` |
| `langLink` | Objekt s odkazy pro přepínač jazyků (odkaz na stejnou stránku v jiném jazyce) | `{{langLink.en}}` |
| `seoHead` | Automaticky generované SEO meta tagy (title, description, OG, hreflang, canonical) | `{{{seoHead}}}` |
| `jsonLd` | Automaticky generovaný JSON-LD LocalBusiness schema | `{{{jsonLd}}}` |
| `body` | Obsah stránky (pouze v layout.html) | `{{{body}}}` |
| `page` | Slug aktuální stránky | `index`, `strelnice`, `zbrane`... |
| `baseUrl` | Základní URL webu | `https://www.strelnicesklep.cz` |

---

## Přidání nového jazyka

Přidání dalšího jazyka (např. francouzština) vyžaduje tyto kroky:

### 1. Vytvoření překladového souboru

Zkopírujte existující překladový soubor a přeložte všechny klíče:

```bash
cp i18n/cz.json i18n/fr.json
```

Upravte `i18n/fr.json` a přeložte všech 145+ klíčů. Struktura JSON musí zůstat zachována.

### 2. Registrace jazyka v build skriptu

V `build.mjs` přidejte nový jazyk do konfigurace:

```javascript
const LANGS = ['cz', 'en', 'de', 'fr'];

const LOCALE_MAP    = { cz: 'cs_CZ', en: 'en_US', de: 'de_DE', fr: 'fr_FR' };
const HTML_LANG_MAP = { cz: 'cs',    en: 'en',    de: 'de',    fr: 'fr'    };
const HREFLANG_MAP  = { cz: 'cs',    en: 'en',    de: 'de',    fr: 'fr'    };
```

### 3. Build a test

```bash
npm run build:all
npm run serve
```

Nový jazyk bude dostupný na `http://localhost:3000/fr/`. Build automaticky vygeneruje 7 stránek v novém jazyce, přidá hreflang odkazy do všech existujících stránek a zkopíruje statické soubory.

---

## SEO

Web má kompletní SEO podporu, vše generované při buildu:

**Technické SEO:**
- Správný `<html lang>` atribut na každé stránce (`cs`, `en`, `de`)
- Unikátní `<title>` a `<meta description>` pro každou stránku v každém jazyce
- Kanonické URL (`<link rel="canonical">`)
- hreflang alternativní odkazy na každé stránce pro všechny jazyky + `x-default`

**Open Graph:**
- `og:title`, `og:description`, `og:image`, `og:url`
- `og:locale` odpovídající jazyku stránky (`cs_CZ`, `en_US`, `de_DE`)
- `og:type` nastavený na `website`

**Strukturovaná data:**
- JSON-LD `LocalBusiness` schema na každé stránce s názvem, adresou a telefonem

**Přístupnost a výkon:**
- Sémantické HTML5 s jedním `<h1>` na stránku
- Skip-to-content odkaz pro navigaci klávesnicí
- `loading="lazy"` na obrázcích pod foldem
- `loading="eager"` na prvním hero slidu

---

## Technologie

| Vrstva | Technologie |
|---|---|
| HTML | HTML5 sémantické značkování |
| CSS | CSS3 s custom properties, grid, flexbox |
| JavaScript | TypeScript (strict mode, ES2020 target) |
| Build | Node.js ESM skript, nulové závislosti |
| Fonty | Google Fonts: Bebas Neue, Barlow, Work Sans |
| Ikony | Font Awesome 6.5.1 (CDN) |

CSS je rozdělené do 6 souborů podle účelu: design tokeny (`variables.css`), reset a typografie (`base.css`), komponenty (`components.css`), stránky (`pages.css`), responzivita (`responsive.css`) a vstupní bod (`style.css`), který je všechny importuje.

TypeScript se kompiluje pomocí `tsc` do `js/` adresáře. Konfigurace vyžaduje strict mode, kontrolu nepoužitých lokálních proměnných i parametrů.

Build skript používá výhradně Node.js built-in moduly: `node:fs` pro čtení a zápis souborů, `node:path` pro cesty a `node:url` pro konverzi `import.meta.url`.

---

## Stránky

Web obsahuje 7 stránek, každá v 3 jazykových mutacích:

**Homepage** (`index.html`) -- Hlavní stránka s hero sliderem (8 fotografií s autoplay), dlaždicemi nabídek s odkazy na podstránky a úvodním textem o střelnici.

**Střelnice** (`strelnice.html`) -- Informace o střelnici, vybavení (tři palebná stanoviště, 25 metrů, automatické terče), historie objektu z roku 1341 a bezdrátový video přenos.

**Zbraně** (`zbrane.html`) -- Galerie zbraní s lightboxem. Historické i moderní zbraně, pistole, revolvery, samopaly, útočné pušky.

**Balíčky** (`balicky.html`) -- 15 střeleckých balíčků s obrázky a hover efektem. Od rekreační střelby po speciální balíčky (Big Boom, Speciální jednotky, Světová válka).

**FAQ** (`faq.html`) -- Čtyři sekce často kladených dotazů s fotografickou galerií střelnice.

**GDPR** (`gdpr.html`) -- Podmínky ochrany osobních údajů společnosti West Bohemian Armament Company, s.r.o.

**Zbrojní průkaz** (`zbrojni-prukaz.html`) -- Pětikrokový průvodce získáním zbrojního průkazu, od základních požadavků po složení zkoušky.

---

## Databázové schéma

Soubor `schema.sql` obsahuje připravené MariaDB schéma pro budoucí backend. Momentálně se nepoužívá, ale je připravené pro napojení rezervačního systému a kontaktního formuláře.

**Tabulky:**

| Tabulka | Popis |
|---|---|
| `packages` | Střelecké balíčky s vícejazyčným názvem a popisem, obrázky a řazením |
| `bookings` | Rezervace navázané na balíčky, se statusem (`pending`, `confirmed`, `cancelled`, `completed`) |
| `contacts` | Zprávy z kontaktního formuláře |
| `page_views` | Statistiky návštěvnosti s hashem IP adresy |
| `opening_hours` | Otevírací doba podle dnů v týdnu |

---

## Nasazení

Nasazení je jednoduché, protože `output/` obsahuje čistě statické soubory:

1. Spusťte plný build: `npm run build:all`
2. Nahrajte celý obsah `output/` na web server (Apache, Nginx, cokoliv co umí servírovat soubory)
3. Hotovo

**Webový server nepotřebuje** žádné server-side zpracování. Žádné PHP, Node.js, Python ani databáze. Jen statické HTML, CSS, JS a obrázky.

**Doporučená konfigurace web serveru:**

- Nastavte `index.html` jako výchozí soubor v podadresářích
- Povolte gzip/brotli kompresi pro HTML, CSS a JS
- Nastavte cache hlavičky pro statické soubory (CSS, JS, obrázky)

---

## Plánovaná vylepšení

- Konverze obrázků do WebP formátu pro rychlejší načítání
- Backend kontaktního formuláře
- Rezervační systém (`schema.sql` je připravený)
- Automatické generování `sitemap.xml`
- Vytvoření `robots.txt`
- Integrace Google Analytics
- Další optimalizace výkonu (critical CSS, preload fontů)

---

## Licence

ISC
