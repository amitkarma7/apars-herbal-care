import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SITE_CONFIG } from '../../config/site-config';

/**
 * Product image. Shows the real bottle photograph when `images.productPhoto` is set in
 * site-config.ts; otherwise renders a CSS bottle mockup wrapped in the label artwork.
 */
@Component({
  selector: 'app-product-visual',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './product-visual.css',
  host: { '[class.compact]': 'compact()', '[class.has-photo]': '!!images.productPhoto' },
  template: `
    @if (images.productPhoto) {
      <figure class="frame">
        <picture>
          @if (images.productPhotoWebp) {
            <source type="image/webp" [attr.srcset]="images.productPhotoWebp" sizes="(max-width: 520px) 70vw, 340px" />
          }
          <img
            class="photo"
            [src]="images.productPhoto"
            [alt]="altText"
            [attr.width]="images.productPhotoSize.width"
            [attr.height]="images.productPhotoSize.height"
            [attr.loading]="lazy() ? 'lazy' : null"
            [attr.fetchpriority]="lazy() ? null : 'high'"
            decoding="async"
          />
        </picture>
      </figure>
    } @else {
      <figure class="bottle" role="img" [attr.aria-label]="altText">
        <span class="cap" aria-hidden="true"></span>
        <span class="neck" aria-hidden="true"></span>
        <span class="body" aria-hidden="true">
          <picture>
            <source [srcset]="images.labelFront" type="image/webp" />
            <img
              class="label"
              [src]="images.labelFrontFallback"
              alt=""
              width="355"
              height="1080"
              [attr.loading]="lazy() ? 'lazy' : null"
              [attr.fetchpriority]="lazy() ? null : 'high'"
              decoding="async"
            />
          </picture>
          <span class="glass"></span>
        </span>
      </figure>
    }
  `,
})
export class ProductVisual {
  readonly lazy = input(false);
  readonly compact = input(false);

  protected readonly images = SITE_CONFIG.images;
  protected readonly altText = `${SITE_CONFIG.brand.productName}, ${SITE_CONFIG.brand.netQuantity} bottle, shown with coconut, hibiscus, amla and sesame seeds`;
}
