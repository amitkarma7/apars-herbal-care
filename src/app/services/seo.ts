import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SITE_CONFIG } from '../config/site-config';

/**
 * Applies title, description, canonical and Open Graph URL tags from site-config.ts.
 * Absolute URLs (canonical, og:url, og:image) are only written once `seo.siteUrl` is set.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  apply(): void {
    const { seo } = SITE_CONFIG;
    this.title.setTitle(seo.title);
    this.meta.updateTag({ name: 'description', content: seo.description });
    this.meta.updateTag({ property: 'og:title', content: seo.title });
    this.meta.updateTag({ property: 'og:description', content: seo.description });

    const siteUrl = seo.siteUrl.replace(/\/+$/, '');
    if (!/^https:\/\/[^\s/]+/.test(siteUrl)) {
      return;
    }

    this.meta.updateTag({ property: 'og:url', content: `${siteUrl}/` });
    this.meta.updateTag({ property: 'og:image', content: `${siteUrl}${seo.ogImagePath}` });
    this.meta.updateTag({ name: 'twitter:image', content: `${siteUrl}${seo.ogImagePath}` });

    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = `${siteUrl}/`;
  }
}
