import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG, formatPrice } from '../../config/site-config';
import { KEY_HERBS } from '../../data/site-content';
import { ProductVisual } from '../product-visual/product-visual';
import { Reveal } from '../../shared/reveal';

@Component({
  selector: 'app-product-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal, ProductVisual],
  templateUrl: './product-highlight.html',
  styleUrl: './product-highlight.css',
})
export class ProductHighlight {
  protected readonly brand = SITE_CONFIG.brand;
  protected readonly hasPhoto = !!SITE_CONFIG.images.productPhoto;
  protected readonly herbs = KEY_HERBS.map((herb) => herb.name);

  protected readonly price = formatPrice(SITE_CONFIG.brand.price);
}
