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
    hair-oil-label-front.webp/.jpg Front label used on the CSS bottle mockup
    herbs/*.webp                  Key-herb roundels cropped from the label
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

### Use a real product photo
1. Save the photo as `public/images/hair-oil-product.webp` (portrait, about 600×900 px).
2. Set `images.productPhoto: '/images/hair-oil-product.webp'`.

The CSS bottle mockup is replaced everywhere automatically.

### Turn on WhatsApp ordering
Set `contact.whatsappNumber` in `src/app/config/site-config.ts` to the full number with country code, digits only, for example `'919876543210'`, then rebuild.

Once a valid number is set, the site switches to WhatsApp ordering everywhere:
- a floating **Order on WhatsApp** button on every screen
- **Order on WhatsApp** as the main button in the hero and product sections
- the **Your order** form (quantity, name, phone, address, city, PIN code, note) opens WhatsApp with the order written out, ready to send
- a **Chat on WhatsApp** link for questions

While the number is empty or invalid, every WhatsApp button stays hidden and the order form sends by email instead.
The message text is built by `orderMessage()` in the same file if you want to change its wording.

### Set the website domain (canonical URL, sitemap)
Set `seo.siteUrl` to the confirmed product domain, for example `'https://www.aparsherbalcare.in'` (no trailing slash), then rebuild.
This fills in the canonical link, `og:url`, absolute `og:image`, the sitemap and the `Sitemap:` line in robots.txt.
Do not use mypilot.co.in here; it is only the developer credit link.

### Change text
- Ingredients, key herbs, benefits, directions, cautions: `src/app/data/site-content.ts`
- Section headings and copy: each component's `.html` file
- Colours and fonts: the `:root` block at the top of `src/styles.css`

Keep product copy cosmetic. Do not add claims that the oil cures hair loss, treats scalp conditions or guarantees regrowth unless you hold the evidence and approvals for them.

## 6. Deploying to Cloudflare Pages

### Option A: Git integration (recommended)
1. Push this folder to a GitHub or GitLab repository.
2. In the Cloudflare dashboard, open **Workers & Pages → Create → Pages → Connect to Git** and pick the repository.
3. Build settings:
   - Framework preset: **None** (or Angular)
   - Build command: `npm run build`
   - Build output directory: `dist/apars-herbal-care/browser`
4. Under **Environment variables**, add `NODE_VERSION` = `24` so the build uses a Node version Angular 22 accepts.
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
- **No form submissions to a server.** The order form writes the order into a WhatsApp chat (or an email, if WhatsApp is not configured) and the customer sends it themselves. Nothing is stored or sent by the website. Orders are confirmed and paid for in the WhatsApp chat.
- **No order storage or customer management.** Enquiries arrive in the brand's email inbox.

Adding payments, order tracking or a contact form that delivers without a mail app would need a backend or a third-party service (for example a payment gateway or a form endpoint).

## 8. Final testing checklist

- [ ] `npm test` passes and `npm run build` completes without warnings
- [ ] Page opens with no console errors in Chrome, Safari, Firefox and Edge
- [ ] No horizontal scrolling at 320 px, 375 px, 768 px, 1024 px and 1440 px widths
- [ ] Mobile menu opens and closes with tap, keyboard (Enter/Space) and Escape
- [ ] Every navigation link scrolls to its section; "Skip to main content" works with Tab
- [ ] Visible focus ring on every link, button and field
- [ ] Email buttons open a prefilled email to aparenterprises11@gmail.com
- [ ] "Copy address" copies the email (or selects it if the browser blocks copying)
- [ ] WhatsApp buttons are hidden while no number is configured
- [ ] With a number set: the floating button, hero and product buttons open WhatsApp, and the order form sends the quantity and details you typed
- [ ] Footer shows `© <current year> MyPilot.co.in. All rights reserved.` and the MyPilot link opens in a new tab
- [ ] All 12 ingredients and 5 key herbs show with correct names
- [ ] With reduced motion enabled in the OS, animations are off
- [ ] Lighthouse: Performance, Accessibility, Best Practices and SEO all 90+
- [ ] After setting `seo.siteUrl`: canonical tag, `/sitemap.xml` and `/robots.txt` show the real domain
- [ ] Shared link preview (WhatsApp, Facebook) shows the title, description and image

## 9. Credits

- Fonts (self-hosted through Fontsource, SIL Open Font License): Cormorant Garamond, Marcellus, Mukta
- Label artwork and herb illustrations: from the Apars Herbal Care product label
- Apars Herbal Care and its product names belong to their respective owner.
