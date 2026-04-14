# TASK: Rebuild Střelnice Sklep website

## Context

You are working in: `/home/admin/Work/DevTest/StrelniceSklep/`
A git repo has been initialized here.

## Original website
- URL: https://www.strelnicesklep.cz/
- Host: Apache/mod_hanicka (PHP + MariaDB)

## What to build

Rebuild this website in **modern TypeScript + HTML/CSS/JS** (vanilla TS, no heavy frameworks).
The site should be **trilingual: CZ / DE / EN** (all three languages on one page, as the original does).

## Original content (scraped from the site)

### Pages
- **/** (Homepage) - Hero section, intro, 3 key features (firing positions, weapons, gun license info), contact info
- **/strelnice** - About the shooting range, 25m indoor range with 3 firing positions, automatic moving targets, video transmission, bar, parking
- **/zbrane** - Weapons gallery with photo links
- **/balicky** - Shooting packages list (Vlastní zbraň, Obří rána, Speciální jednotky, Výzbroj ČSLA, Útočné pušky, Světové pistole, České moderní zbraně, Filmové zbraně, Big Boom, Lehké kulomety, Zbraně policie ČR, Zbraně které každý nemá, II.světová válka, Zbraně PDW, Všestranný operátor)
- **/faq** - FAQ about instructors, own weapons, shooting conditions, minimum age for children
- **/gdpr** - GDPR / privacy policy page
- **/zbrojni-prukaz** - Gun license page

### Business info
- **Name:** Střelnice Sklep
- **Address:** Dukelská 631, 344 01 Domažlice
- **Company:** West Bohemian Armament Company, s.r.o., Náměstí Republiky 6, 346 01 Horšovský Týn
- **IČO:** 176 63 806
- **Phone:** +420 777 263 031
- **Contact person:** p. Karel Hrabík
- **Historical building:** Former brewery U Svaté studny from 1341

### Structure requirements
- Clean folder structure (assets/, css/, js/, pages/, i18n/)
- SEO: proper meta tags (title, description, OG tags), semantic HTML, structured data (JSON-LD)
- All texts in 3 languages (CZ primary, DE, EN)
- Use original images from: https://www.strelnicesklep.cz/element/simple/prezentace/uploaded/* (download all)
- Logo: https://www.strelnicesklep.cz/element/simple/logo/uploaded/7/1/e35571a50da01514.png/245x93_o.png
- Fix current errors: broken links, missing meta tags, accessibility issues

## Tech constraints
- **Target hosting:** Apache/PHP + MariaDB (standard Czech hosting)
- Output: static HTML/CSS/JS/TS files that work on Apache with PHP for any dynamic needs
- Use modern CSS (CSS variables, flexbox/grid, responsive design)
- TypeScript compiled to JS for interactivity
- MariaDB for future dynamic features (booking system, etc.) - prepare schema

## Process

1. First run `/start-work` to activate Prometheus planning mode
2. Prometheus will interview you about requirements - answer and say "make it a plan" when ready
3. Let Prometheus create a detailed implementation plan
4. Then implement page by page

## Your output

When you finish (or need input), write a summary to:
`/home/admin/Work/DevTest/StrelniceSklep/PROGRESS.md`

Include:
- What you completed
- What you're working on
- Any questions or decisions needed
- File structure created

Then notify the parent agent (Hermes) by writing "TASK_UPDATE:" followed by brief status to stdout.
