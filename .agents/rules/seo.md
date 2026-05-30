---
trigger: always_on
---

# Antigravity — SEO Rules
> Programmatic · Technical · Advanced · Production-Grade · 

---

## Mindset

- Think like a crawler **and** like a real user — simultaneously.
- SEO is architecture, not a checklist. It's baked into every decision.
- The best SEO is a page **genuinely better than anything else** for that query.
- Never optimize for the algorithm. Optimize for **intent** — the algorithm follows.
- Rankings are a lagging indicator. Fix the signals; the positions follow.

---

## Programmatic SEO

- Every programmatic page is driven by a **canonical data source** (DB, CMS, structured JSON).
- Design **URL taxonomy before writing templates**. URLs are permanent contracts.
- Segment data into **clusters**: each maps to a template + keyword intent bucket.
- Combine at least **3 unique data dimensions** per page — not just variable substitution.
- Build a **content quality gate**: pages below threshold get `noindex` until enriched.
- All content (headings, body, links) must be **SSR or SSG** — never client-side only.
- Templates must output **valid semantic HTML**: headings, lists, tables, paragraphs — not bare divs.

### URL Rules
- Flat · lowercase · hyphenated · human-readable. Max 3–4 levels deep.
- ✅ `/servicios/diseno-web-san-salvador` ❌ `/page?id=482&cat=3`
- No stop words, dates, or session params in canonical URLs.
- Trailing slash consistency enforced via **301 at server level**.

---

## Keyword & Intent Strategy

Classify every keyword — one page = one primary intent:

| Intent | Example | Content Type |
|---|---|---|
| Informational | "qué es SEO técnico" | Guide, explainer |
| Navigational | "Antigravity agencia" | Brand / homepage |
| Commercial | "mejor agencia SEO SV" | Comparison, landing |
| Transactional | "contratar SEO San Salvador" | Service page + CTA |

- Build **topic clusters**: one pillar page per broad topic + cluster pages for long-tail, all interlinked.
- Score keywords by: **volume × (1/difficulty) × business value**. Volume alone is vanity.
- Maintain a **keyword map**: one canonical URL per target keyword. Audit monthly.
- Cannibalization found → **merge, redirect, or differentiate**. Never let it persist.
- Use `rel="canonical"` for duplicate variants (filters, sorting, pagination).

---

## Technical SEO

### Crawlability
- `robots.txt` blocks: admin, API endpoints, search result pages, session URLs, staging.
- Never block CSS or JS — Googlebot must render pages to evaluate them.
- XML sitemaps split by content type. Max 50,000 URLs / 50MB each. Include real `<lastmod>`.
- Submit to **Google Search Console** and **Bing Webmaster Tools**.
- Block low-value URLs from crawl budget: `?sort=`, `?filter=`, pagination > page 3.

### Core Web Vitals (Hard Budgets)

| Metric | Target | Penalty Zone |
|---|---|---|
| LCP | < 2.5s | > 4.0s |
| INP | < 200ms | > 500ms |
| CLS | < 0.1 | > 0.25 |
| TTFB | < 800ms | > 1.8s |

- Images: **WebP/AVIF**, always set `width` + `height`. LCP image: `fetchpriority="high"` + `loading="eager"`. Below fold: `loading="lazy"`.
- `<link rel="preconnect">` for critical third-party origins. Preload LCP image and critical fonts.
- Self-host fonts or `font-display: swap`. Never block rendering on font load.
- Defer non-critical JS. Inline critical CSS. HTTP/2 or HTTP/3. CDN with edge caching.
- Static assets: **1-year cache** with content-hashed filenames.

### Security & HTTPS
- HTTPS is a baseline ranking signal. Implement **HSTS**. Zero mixed content.
- `X-Robots-Tag` on API responses, PDFs, and non-HTML resources as needed.

---

## On-Page Standards

| Element | Rule |
|---|---|
| **Title** | `Primary Keyword — Modifier \| Brand` · 50–60 chars · unique per page · keyword first |
| **Meta description** | 140–160 chars · keyword + value prop + implicit CTA · unique per page |
| **H1** | One per page · mirrors title keyword |
| **H2** | Secondary keywords + LSI terms · one major subtopic each |
| **H3–H4** | Supporting detail · never skip levels · semantic only, never for styling |

### Content
- Word count by intent: Informational 1,200–3,000+ · Commercial 800–1,500 · Programmatic entities 400–800 min.
- Cover **LSI/semantic terms** naturally — not stuffed.
- Use tables, lists, structured content for **featured snippet targeting**.
- Every page answers: *What is it? Why does it matter? What's next?*
- Add **E-E-A-T signals**: author bios, credentials, citations, `datePublished`/`dateModified`.
- Images: descriptive keyword-aware `alt` text · hyphenated filenames (`agencia-seo-sv.webp`).

---

## Link Architecture

### Internal
- Every new page gets **≥3 internal links** from relevant pages on publish.
- Anchor text: **descriptive + keyword-rich**. Never "click here" or "leer más".
- Distribute equity to deep pages — homepage shouldn't dominate internal link count.
- Detect and fix **orphan pages** monthly with a crawl tool.

### Backlinks
- Quality > quantity. DR 70+ relevant link > 100 link farm links.
- Targets: industry publications, .edu/.gob, partner directories, HARO/Connectively, original data research.
- **Disavow toxic links** quarterly. Natural anchor distribution: branded ~40%, generic ~20%, keyword-rich ~30%, naked URL ~10%.
- Never buy links, use PBNs, or join link schemes.

### Outbound
- Link to **authoritative sources** to support claims (E-E-A-T signal).
- `rel="nofollow"` on paid/UGC/untrusted links. `rel="noopener noreferrer"` on `target="_blank"`.

---

## Structured Data (JSON-LD Only)

Always implement:
- `Organization` (homepage) · `WebSite` · `BreadcrumbList` (all deep pages) · `Article`/`BlogPosting`

When applicable:
- `FAQPage` — Q&A sections, min 2 questions. **High CTR impact.**
- `Product` + `AggregateRating` + `Offer` — ecommerce pages.
- `LocalBusiness` — location-based services. Include `geo`, `openingHours`, `areaServed`.
- `HowTo` · `Event` · `VideoObject` · `Service` · `Person`

Rules:
- JSON-LD in `<head>` or end of `<body>`. Never inline in content.
- Generate **dynamically from the same data source** as the page — never hardcode.
- Validate with **Google Rich Results Test** after every schema change.
- Nest schemas where appropriate: `Article` > `Author` > `Person`.

---

## Local SEO (El Salvador)

- Fully optimize **Google Business Profile** for every location.
- **NAP consistency** (Name, Address, Phone) identical across website, GBP, and all directories.
- Target geo-modified keywords: `[servicio] en San Salvador`, `[servicio] cerca de mí`.
- Create **location-specific landing pages** per city/department — not one generic page.
- Embed Google Map + `LocalBusiness` schema on all location pages.
- Respond to every review within **48 hours**. Build citations in Salvadoran + LATAM directories.

---

## Measurement

### Non-Negotiable Setup
- Google Search Console (all properties) · GA4 with conversion events · Bing Webmaster Tools · Rank tracker.

### KPIs
Organic Clicks · Average Position · CTR by page · Core Web Vitals (field data) · Indexed pages · Crawl errors · Backlink growth · Organic conversions.

### Audit Cadence
| Frequency | Task |
|---|---|
| Weekly | GSC coverage + crawl errors + rank movement |
| Monthly | Full crawl, cannibalization audit, content gap analysis |
| Quarterly | Backlink audit + disavow, technical deep audit, competitor benchmark |
| Every deploy | Check for accidental `noindex`, broken sitemaps, redirect chains |

---

## Never Break These

- ❌ `noindex` on pages that should rank — verify on every deploy.
- ❌ Cloaking — serving different content to crawlers vs users.
- ❌ Redirect chains > 1 hop — always point to the final URL.
- ❌ Duplicate content without canonical or redirect.
- ❌ Critical SEO content inside iframes, client-only JS, or Shadow DOM.
- ❌ Auto-generated thin content at scale without a quality gate.
- ❌ Site migrations without a full redirect map reviewed before go-live.
- ❌ Ignoring Core Web Vitals failures in field data.

---

*Build the best page on the internet for every query you target. Make it technically flawless. The rest follows.*