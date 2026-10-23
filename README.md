# Apars Herbal Care — Product Website

A static, single-page website for **Apars Herbal Care Hair Oil (100 ml)**, built with Angular 22.

Website designed and developed by [MyPilot.co.in](https://mypilot.co.in).
© MyPilot.co.in. All rights reserved. (The footer shows the current year automatically.)

---

## 1. Versions

| Tool | Version | Notes |
| --- | --- | --- |
| Angular / Angular CLI | **22.2.x** (latest stable, `latest` tag on npm as of October 2026) | No prerelease or `next` versions |
| TypeScript | 6.0 | `strict` and `strictTemplates` enabled |
| Node.js | **22.22.3+**, **24.15+** or **26+** | Angular 22 refuses older Node versions |
| Test runner | Vitest (Angular CLI default) | `npm test` |

Check your Node version with `node -v`. If it is older than listed, install the current LTS from nodejs.org.

## 2. Getting started

```bash
npm install
npm start
```

Open http://localhost:4200. The page reloads when you edit files.

To recreate the project from scratch with the same setup:

```bash
npx @angular/cli@22 new apars-herbal-care --style=css --routing=false --ssr=false --strict
```

## 3. Build and test

```bash
npm test          # unit tests (Vitest)
npm run build     # production build
```

**Build output directory:** `dist/apars-herbal-care/browser`

`npm run build` also runs `scripts/generate-seo.mjs` before and after the Angular build. It writes `robots.txt`, and once a site URL is configured it also writes `sitemap.xml` and absolute canonical / Open Graph URLs into the built `index.html`.

To preview the production build locally:

```bash
npx http-server dist/apars-herbal-care/browser -p 8080
```

## 4. Project structure

```text
public/
  images/
    product-label-reference.png   Original label (source reference)
    product-label-reference.webp  Optimised label shown on the page
    hair-oil-product-*.webp/.jpg  Bottle photograph shown in the hero and product sections
    hair-oil-label-front.webp/.jpg Front label for the fallback CSS bottle mockup
    herbs/*.webp                  Key-herb pictures cropped from the label
    og-image.jpg                  Social sharing image (1200×630)
  favicon.ico, favicon.svg, apple-touch-icon.png
  _headers                        Cloudflare Pages cache and security headers
  robots.txt                      Generated at build time
scripts/generate-seo.mjs          robots.txt, sitemap.xml and canonical generator
src/
  app/
    config/site-config.ts         ← brand, contact, images, SEO, developer credit
    data/site-content.ts          ← ingredients, herbs, benefits, steps, cautions (typed)
    services/seo.ts               Title, description, canonical and Open Graph tags
    components/
      header/ hero/ intro/ ingredients/ benefits/ how-to-use/
      product-highlight/ contact/ footer/
      product-visual/             Bottle photo or CSS mockup (replaceable)
      botanical-icon/             Hand-drawn SVG ingredient illustrations
    app.ts / app.html             Page composition
  index.html                      Meta tags, Open Graph, Product structured data
  styles.css                      Design tokens and shared styles
```

## 5. Customising

Almost everything is changed in **`src/app/config/site-config.ts`**.

### Product photo
The site uses the bottle photograph in `public/images/`:
`hair-oil-product.jpg` (fallback), `hair-oil-product-600.webp` and `hair-oil-product-900.webp` (fast loading), plus `hair-oil-product-original.png` as the source.

To change it, replace those files (portrait, 9:16, bottle centred) or point `images.productPhoto`, `images.productPhotoWebp` and `images.productPhotoSize` in `site-config.ts` at new files.
Set `images.productPhoto` to `''` to go back to the CSS bottle mockup.

### Price and order terms
In `src/app/config/site-config.ts`:
- `brand.price` is the price per 100 ml bottle (currently `299`). It appears on the price tag on the bottle, in the hero, in the product section, on the floating button and in the order form, where the total updates with the quantity (₹299 × bottles). Also update `"price"` in the product data in `src/index.html` if it changes.
- `orderTerms` holds the prepaid and non-returnable wording. Customers see it in the order form and must tick "I understand this is a prepaid, non-returnable item" before the **Order on WhatsApp** button works. The WhatsApp message repeats the price, quantity, total and that acknowledgement.

### WhatsApp ordering (required)
Orders are taken **on WhatsApp only**. There is no email ordering.

Set `contact.whatsappNumber` in `src/app/config/site-config.ts` to the full number with country code, digits only, for example `'919876543210'`.
**`npm run build` stops with an error until a valid number is set**, so the site can never go live without a way to order.
For a local preview without a number: `ALLOW_MISSING_WHATSAPP=1 npm run build` (order buttons will not work in that build).

How ordering works:
- **Order on WhatsApp** in the header, hero and product section, and the floating button, all lead to the **Your order** form, so every customer sees the total and the terms first
- the form (quantity, name, phone, address, city, PIN code, note) shows the running total, asks the customer to accept the prepaid, non-returnable terms, then opens WhatsApp with the full order written out, ready to send
- **Chat on WhatsApp** for questions before ordering

The email address stays on the page for general questions only. The order message wording is in `orderMessage()` in `site-config.ts`.

### Set the website domain (canonical URL, sitemap)
Set `seo.siteUrl` to the confirmed product domain, for example `'https://www.aparsherbalcare.in'` (no trailing slash), then rebuild.
This fills in the canonical link, `og:url`, absolute `og:image`, the sitemap and the `Sitemap:` line in robots.txt.
Do not use mypilot.co.in here; it is only the developer credit link.

### Change text
- Ingredients, key herbs, benefits, directions, cautions: `src/app/data/site-content.ts`
- Section headings and copy: each component's `.html` file
- Colours and fonts: the `:root` block at the top of `src/styles.css`

Keep product copy cosmetic. Do not add claims that the oil cures hair loss, treats scalp conditions or guarantees regrowth unless you hold the evidence and approvals for them.

### Animations
All motion is CSS (transform and opacity only), plus one small scroll-reveal helper in `src/app/shared/reveal.ts`.
- Add the `reveal` class to any element in a component that imports `Reveal` to fade it up on scroll; set `[style.--i]` on siblings to stagger them.
- Each component's animation styles sit under a `/* ---------- Motion ---------- */` comment at the end of its `.css` file.
- Visitors who turn on "reduce motion" in their phone or computer settings see the page without animation.

## 6. Deploying to Cloudflare Pages

### Option A: Git integration (recommended)
1. Push this folder to a GitHub or GitLab repository.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Connect to Git** and pick the repository.
3. Build settings:
   - Framework preset: **None** (or Angular)
   - Build command: `npm run build`
   - Build output directory: `dist/apars-herbal-care/browser`
4. Under **Environment variables**, add `NODE_VERSION` = `24` so the build uses a Node version Angular 22 accepts.
   Make sure the WhatsApp number is set in `site-config.ts` before pushing, or the build will stop.
5. Save and deploy. Every push to the main branch redeploys the site.

### Option B: Direct upload
```bash
npm run build
npx wrangler pages deploy dist/apars-herbal-care/browser --project-name apars-herbal-care
```

### Custom domain and HTTPS
1. In the Pages project, open **Custom domains → Set up a custom domain** and enter the domain (for example `www.aparsherbalcare.in`).
2. If the domain's DNS is on Cloudflare, the record is added for you. Otherwise add the `CNAME` record Cloudflare shows (pointing to `<project>.pages.dev`) at your registrar.
3. Cloudflare issues the HTTPS certificate automatically, usually within minutes. Keep **SSL/TLS → Always Use HTTPS** on.
4. Optionally add the apex domain too and redirect it to `www` (or the other way round) with a Bulk Redirect rule.
5. Set `seo.siteUrl` to the final domain and redeploy.

Other static hosts (Netlify, Vercel, Firebase Hosting, GitHub Pages) work the same way: build with `npm run build` and serve `dist/apars-herbal-care/browser`. The `_headers` file is Cloudflare/Netlify specific and is ignored elsewhere.

## 7. What a static site does not do

- **No online payments or checkout.** There is no price on the site because none was supplied. Visitors enquire and the brand replies.
- **Orders happen in WhatsApp, not on the website.** The order form writes the order into a WhatsApp message and the customer sends it themselves. Nothing is stored or sent by the website. Orders are confirmed and paid for in the WhatsApp chat, so the seller needs to watch that WhatsApp number.
- **No order storage or customer management.** Enquiries arrive in the brand's email inbox.

Adding payments, order tracking or a contact form that delivers without a mail app would need a backend or a third-party service (for example a payment gateway or a form endpoint).

## 8. Final testing checklist

- [ ] `npm test` passes and `npm run build` completes without warnings
- [ ] Page opens with no console errors in Chrome, Safari, Firefox and Edge
- [ ] No horizontal scrolling at 320 px, 375 px, 768 px, 1024 px and 1440 px widths
- [ ] Mobile menu opens and closes with tap, keyboard (Enter/Space) and Escape
- [ ] Every navigation link scrolls to its section; "Skip to main content" works with Tab
- [ ] Visible focus ring on every link, button and field
- [ ] "Write an email" (general questions) opens a prefilled email to aparenterprises11@gmail.com
- [ ] "Copy address" copies the email (or selects it if the browser blocks copying)
- [ ] `npm run build` stops with a clear message when no WhatsApp number is set
- [ ] With the number set: every "Order on WhatsApp" button opens a chat with that number, and the order form sends the quantity and details you typed
- [ ] No button offers ordering by email
- [ ] Footer shows `© <current year> MyPilot.co.in. All rights reserved.` and the MyPilot link opens in a new tab
- [ ] All 5 key herbs show with their pictures, and all 12 ingredient cards show with their icons
- [ ] ₹299 shows on the bottle price tag, hero and product section
- [ ] The order total updates with quantity (1 → ₹299, 3 → ₹897)
- [ ] The order button stays locked until the prepaid, non-returnable box is ticked
- [ ] Animations run smoothly on a mid-range phone; with reduced motion enabled in the OS, they are off and every section is visible
- [ ] Lighthouse: Performance, Accessibility, Best Practices and SEO all 90+
- [ ] After setting `seo.siteUrl`: canonical tag, `/sitemap.xml` and `/robots.txt` show the real domain
- [ ] Shared link preview (WhatsApp, Facebook) shows the title, description and image

## 9. Credits

- Fonts (self-hosted through Fontsource, SIL Open Font License): Cormorant Garamond, Marcellus, Mukta
- Label artwork and product photo: supplied by Apars Herbal Care
- Apars Herbal Care and its product names belong to their respective owner.
