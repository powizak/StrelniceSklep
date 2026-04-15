# Střelnice Sklep - Project Progress

## 1. Project Overview

Střelnice Sklep shooting range website rebuild. Static site with build-time i18n (CZ/EN/DE). 7 pages × 3 languages = 21 HTML files. Zero-dependency Node.js build system.

## 2. Completed Features

- Build system (`build.mjs` — 317 lines, zero dependencies)
- CSS design system (6 files, ~1300 lines)
- TypeScript modules (5 files — navigation, slider, lightbox, cookies, main)
- HTML templates (8 files — layout + 7 page templates)
- i18n translations (3 JSON files, 145+ keys each)
- Images (109 files downloaded from original site)
- MariaDB schema (`schema.sql` — 5 tables)
- SEO: hreflang, unique meta per page, JSON-LD LocalBusiness schema
- Cookie consent banner
- Lightbox gallery
- Hero image slider

## 3. File Structure

```
./.gitignore
./TASK.md
./assets/images/MISSING-IMAGES.txt
./assets/images/faq-gallery-01.jpg
./assets/images/faq-gallery-02.jpg
./assets/images/faq-gallery-03.jpg
./assets/images/faq-gallery-04.jpg
./assets/images/faq-gallery-05.jpg
./assets/images/faq-gallery-06.jpg
./assets/images/faq-gallery-07.jpg
./assets/images/faq-gallery-08.jpg
./assets/images/faq-gallery-09.jpg
./assets/images/faq-gallery-10.jpg
./assets/images/faq-gallery-11.jpg
./assets/images/faq-gallery-12.jpg
./assets/images/faq-gallery-13.jpg
./assets/images/faq-gallery-14.jpg
./assets/images/faq-gallery-15.jpg
./assets/images/faq-icon-11.png
./assets/images/faq-icon-12.png
./assets/images/footer-logo.png
./assets/images/hero-1.png
./assets/images/hero-2.png
./assets/images/hero-3.png
./assets/images/hero-4.png
./assets/images/hero-5.png
./assets/images/hero-6.png
./assets/images/hero-7.png
./assets/images/hero-8.png
./assets/images/icon-target-de.png
./assets/images/icon-target-en.png
./assets/images/icon-target.png
./assets/images/logo.png
./assets/images/package-big-boom-hover.jpg
./assets/images/package-big-boom.jpg
./assets/images/package-ceske-moderni-zbrane-hover.jpg
./assets/images/package-ceske-moderni-zbrane.jpg
./assets/images/package-deco-icon-1.png
./assets/images/package-deco-icon-2.png
./assets/images/package-filmove-zbrane-hover.jpg
./assets/images/package-filmove-zbrane.jpg
./assets/images/package-lehke-kulomety-hover.jpg
./assets/images/package-lehke-kulomety.jpg
./assets/images/package-obri-rana-hover.jpg
./assets/images/package-obri-rana.jpg
./assets/images/package-specialni-jednotky-hover.jpg
./assets/images/package-specialni-jednotky.jpg
./assets/images/package-svetova-valka-hover.jpg
./assets/images/package-svetova-valka.jpg
./assets/images/package-svetove-pistole-hover.jpg
./assets/images/package-svetove-pistole.jpg
./assets/images/package-utocne-pusky-hover.jpg
./assets/images/package-utocne-pusky.jpg
./assets/images/package-vlastni-zbran-hover.jpg
./assets/images/package-vlastni-zbran.jpg
./assets/images/package-vsestranny-operator-hover.jpg
./assets/images/package-vsestranny-operator.jpg
./assets/images/package-vyzbroj-csla-hover.jpg
./assets/images/package-vyzbroj-csla.jpg
./assets/images/package-zbrane-ktere-kazdy-nema-hover.jpg
./assets/images/package-zbrane-ktere-kazdy-nema.jpg
./assets/images/package-zbrane-pdw-hover.jpg
./assets/images/package-zbrane-pdw.jpg
./assets/images/package-zbrane-policie-cr-hover.jpg
./assets/images/package-zbrane-policie-cr.jpg
./assets/images/qr-code.png
./assets/images/range-heading.png
./assets/images/range-main.jpg
./assets/images/weapon-01.jpg
./assets/images/weapon-02.jpg
./assets/images/weapon-03.jpg
./assets/images/weapon-04.jpg
./assets/images/weapon-05.jpg
./assets/images/weapon-06.jpg
./assets/images/weapon-07.jpg
./assets/images/weapon-08.jpg
./assets/images/weapon-09.jpg
./assets/images/weapon-10.jpg
./assets/images/weapon-11.jpg
./assets/images/weapon-12.jpg
./assets/images/weapon-13.jpg
./assets/images/weapon-14.jpg
./assets/images/weapon-15.jpg
./assets/images/weapon-16.jpg
./assets/images/weapon-17.jpg
./assets/images/weapon-18.jpg
./assets/images/weapon-19.jpg
./assets/images/weapon-20.jpg
./assets/images/weapon-21.jpg
./assets/images/weapon-22.jpg
./assets/images/weapon-23.jpg
./assets/images/weapon-24.jpg
./assets/images/weapon-25.jpg
./assets/images/weapon-26.jpg
./assets/images/weapon-27.jpg
./assets/images/weapon-28.jpg
./assets/images/weapon-29.jpg
./assets/images/weapon-30.jpg
./assets/images/weapon-31.jpg
./assets/images/weapon-32.jpg
./assets/images/weapon-33.jpg
./assets/images/weapon-34.jpg
./assets/images/weapon-35.jpg
./assets/images/weapon-36.jpg
./assets/images/weapon-37.jpg
./assets/images/weapon-38.jpg
./assets/images/weapon-39.jpg
./assets/images/weapon-40.jpg
./assets/images/weapon-41.jpg
./assets/images/weapon-42.jpg
./assets/images/weapon-43.jpg
./assets/images/weapon-44.jpg
./build.mjs
./css/base.css
./css/components.css
./css/pages.css
./css/responsive.css
./css/style.css
./css/variables.css
./i18n/cz.json
./i18n/de.json
./i18n/en.json
./i18n/translations.json
./js/cookies.js
./js/cookies.js.map
./js/lightbox.js
./js/lightbox.js.map
./js/main.js
./js/main.js.map
./js/navigation.js
./js/navigation.js.map
./js/slider.js
./js/slider.js.map
./package-lock.json
./package.json
./schema.sql
./templates/balicky.html
./templates/faq.html
./templates/gdpr.html
./templates/index.html
./templates/layout.html
./templates/strelnice.html
./templates/zbrane.html
./templates/zbrojni-prukaz.html
./ts/cookies.ts
./ts/lightbox.ts
./ts/main.ts
./ts/navigation.ts
./ts/slider.ts
./tsconfig.json
```

## 4. Build Instructions

```bash
npm run build:all   # Compile TypeScript + generate HTML
npm run build       # Generate HTML only
npm run build:ts    # Compile TypeScript only
npm run serve       # Serve output/ on port 3000
npm run clean       # Remove output/
```

## 5. Adding a New Language

1. Create `i18n/XX.json` with same key structure as `i18n/cz.json`
2. Add language code to `LANGS` array in `build.mjs`
3. Add `HTML_LANG_MAP` and `HREFLANG_MAP` entries in `build.mjs`
4. Run `npm run build:all`

## 6. Known Limitations

- No runtime i18n — all content baked at build time
- No contact form backend (only frontend)
- No booking system (schema.sql prepared for future)
- Images not optimized (WebP conversion planned)
- No sitemap.xml generation (can be added to build.mjs)
- No robots.txt
- Template engine does not support nested same-type blocks

## 7. Future Work

- WebP image conversion
- Contact form backend
- Booking system implementation using schema.sql
- Sitemap.xml generation
- Google Analytics integration
- Performance optimization (image lazy loading already in place)
