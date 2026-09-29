# drosmany — Prof. Dr. Husne Qumer Osmany

A static, ten-page bilingual site (five pages, twice, in English and Bangla).
No build step, no framework, no dependencies. Open `index.html` in a browser
and it works; upload the folder to any static host and it works there too.

```
index.html, about.html, practice.html, academics.html, contact.html
                                                English pages, at the root

bn/index.html, bn/about.html, bn/practice.html, bn/academics.html, bn/contact.html
                                                The same five pages, in Bangla

assets/css/styles.css     One stylesheet, both languages
assets/js/main.js         Mobile nav, scroll reveal, the mailto contact form
assets/img/                favicon, her portrait, the Bangla favicon
```

Every page is real, finished HTML — not one page with a script toggling
text. That keeps both languages linkable, shareable and indexable on their
own, and the site works with JavaScript off.

## Language switching

Every header carries a small pill (globe icon) that jumps to the same page
in the other language: `contact.html` ↔ `bn/contact.html`, and so on. Each
page also declares `hreflang` alternates in its `<head>`, so a search engine
offers a Bangladeshi searcher the Bangla page directly rather than the
English one.

To add a page to both languages, copy the pattern of an existing pair and
keep the five filenames identical between `/` and `/bn/` — the switcher
links (`bn/about.html` on the English side, `../about.html` on the Bangla
side) assume that.

## What's on the site

Everything below is real, not placeholder text:

- **Prof. Dr. Husne Qumer Osmany** / অধ্যাপক ডা. হুসনে কমর ওসমানী — her
  portrait is live in the hero and on the About page.
- MBBS, Sir Salimullah Medical College (1991–1998); FCPS in Otolaryngology,
  Sir Salimullah Medical College and BSMMU (2003–2006).
- Career: Lecturer in Anatomy (2010) → Assistant Professor (2013) → Associate
  Professor (2017) → **Professor of Otolaryngology, 2024** — the first
  woman appointed to the post in Bangladesh's government sector. Programme
  Director, Cochlear Implant Programme, Dhaka Medical College Hospital
  (2025).
- Full biography: Dhanmondi, Sir Salimullah Medical College, the choice of
  ENT, the professorship, and what a working week looks like now.
- BMDC registration A28520; memberships; languages.
- Seven publications (2017–2022), each fetched from BanglaJOL and linked to
  the original article — not reconstructed from memory.
- Practice reflects what she actually does: head & neck cancer surgery and
  the Cochlear Implant Programme lead, general ENT procedures follow.
- **Lake View Clinic** — Road 79, Gulshan 2 — Sun, Tue, Thu, 5–7 pm —
  01760-232959, 01330-464290
- **York Hospital** — Road 22, Block K, Banani — Sat, Mon, Wed, 5–7 pm —
  01992-222555, 01992-222777, 01330-464290
- Consultation fees (৳1,500 new / ৳1,000 follow-up), Facebook page, email
  (`info@drosmany.com` — a placeholder address; see "The contact form"
  below).

Nothing on the site is left in `[bracketed placeholder]` form. If a fact
changes, search both the English file and its `bn/` counterpart — nothing
is shared between them at the text level, by design (a real Bangla
sentence, not an auto-translated one, sits in each `bn/` file).

## About the Bangla translation

I translated every page myself, aiming for how she'd actually describe
herself in Bangla rather than a literal rendering of the English (her own
usage from Facebook — *কর্মসূচি পরিচালক*, *কক্লিয়ার ইমপ্লান্ট কার্যক্রম* —
is reused directly). A few deliberate choices, worth knowing if you're
reviewing it:

- Institution names are in Bangla script (ঢাকা মেডিকেল কলেজ). Clinic/hospital
  **brand** names stay in English (Lake View Clinic, York Hospital) — that's
  how Bangladeshis write them regardless of surrounding language.
- MBBS, FCPS, BMDC stay as Latin acronyms — standard practice in Bangla
  medical writing.
- Phone numbers and fee button labels stay in Arabic numerals (dialable,
  unambiguous); years and quantities inside flowing prose use Bangla
  numerals (২০২৪, পঞ্চাশ থেকে ষাটজন).
- Publication citations (titles, authors, journal names) are left in English
  on the Bangla pages too — translating a citation breaks it as a citation.

I'm confident in the grammar and the facts, but I'm not a native speaker.
Before this goes live, it's worth having her (or anyone in the family fluent
in written Bangla) read the `bn/` pages once — mainly for *tone*: whether a
turn of phrase sounds like something she'd actually say. Nothing structural
should need to change, only word choice here and there.

## Renaming

If any spelling needs to change everywhere at once, remember there are two
copies of every name string now — hers, and the Bangla form:

```sh
cd /Users/mourud/Developer/drosmany
# English name, every page (root + bn/)
sed -i '' 's/Husne Qumer Osmany/Husne Kamar Osmany/g' *.html bn/*.html
# Bangla name
sed -i '' 's/হুসনে কমর ওসমানী/<new>/g' *.html bn/*.html
```

## Adding a second photograph

The hero and About-page portraits both currently show the same photo
(`assets/img/portrait.jpg`). A second, different photograph on the About
page (a ward round, a teaching moment, receiving an award) would read
better than the repeat. The swap-in comment is already sitting above the
placeholder in both `about.html` and `bn/about.html`:

```html
<!-- <img src="assets/img/portrait-2.jpg" alt="..."> -->
```

For link previews when the site is shared on Facebook or WhatsApp, add
`assets/img/og-image.jpg` at 1200×630 — nobody has supplied one yet, so
shared links currently fall back to the host's default preview.

## The contact form

A static site has no server, so the form opens the visitor's email client
with the message pre-filled, addressed to `info@drosmany.com`. That address
needs to actually exist — set it up through whoever hosts the `drosmany.com`
domain (most registrars offer email forwarding for free, forwarding
`info@` to a real inbox).

If you'd rather messages arrive without the visitor needing a mail client,
sign up for a form service (Formspree, Web3Forms, or Netlify Forms if you
host there) and give **both** `<form>` elements (English and Bangla) an
`action` attribute:

```html
<form class="form" action="https://formspree.io/f/xxxxxxx" method="POST">
```

`main.js` steps aside automatically as soon as a form has an `action`.

## Publishing it

Any static host will do — the folder is the site, nothing to compile.

- **Netlify / Vercel / Cloudflare Pages** — drag the folder onto their dashboard
- **GitHub Pages** — push the folder, enable Pages on the branch
- **cPanel / shared hosting** — upload the contents to `public_html`, `bn/`
  folder included

Then set the real domain: every page has a `<link rel="canonical">`,
`hreflang` alternates, and `og:` tags using `drosmany.com` as a stand-in.
Change those (in all ten files) if the domain differs.

## Design notes

- **Type** — English pages: Fraunces for headings, Inter for text. Bangla
  pages: Noto Serif Bengali for headings, Noto Sans Bengali for text (Fraunces
  has no Bengali glyphs, so `html[lang="bn"]` retargets the whole type system
  via CSS custom properties — see section 24 of `styles.css`). All loaded
  from Google Fonts with system fallbacks, so the site still reads correctly
  offline.
- **Colour** — deep teal for authority, brass for distinction, warm ivory
  paper. Defined as custom properties at the top of `styles.css`; change
  `--teal-800` and `--brass` and the whole site follows, both languages.
- **No em dashes** — the whole site was passed over once to remove every one,
  replaced with whatever actually suited the sentence (a colon, a comma, a
  parenthetical, or just two sentences instead of one).
- **Emphasis** — the fact that she is the first woman to hold an ENT
  professorship in Bangladesh's *government* sector (a private-sector
  precedent may well exist, which is why the wording is scoped) appears
  repeatedly by design: the hero eyebrow, the badge on the portrait, a
  full-width dark band on the home page, and a flagged entry in the career
  timeline — in both languages.
- The stylesheet is sectioned and numbered as it grew; later sections hold
  later fixes and the Bangla/language-switch additions.

## Accessibility and housekeeping

- Skip link (in the page's own language), visible focus rings, `aria-current`
  on the active nav item, labelled form fields, and correct `lang` attributes
  throughout so screen readers switch voice at the right points.
- `prefers-reduced-motion` is respected — all animation is dropped.
- The site prints cleanly (navigation and calls-to-action are hidden).
- Works without JavaScript; JS only adds the mobile menu, the sticky-header
  state, and the scroll reveals.
- Tested down to 390px wide and up to 1440px, in both languages.
