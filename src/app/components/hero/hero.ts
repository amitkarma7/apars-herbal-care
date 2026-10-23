import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG, formatPrice } from '../../config/site-config';
import { ProductVisual } from '../product-visual/product-visual';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductVisual],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly brand = SITE_CONFIG.brand;
  protected readonly leaves = [1, 2, 3, 4, 5];
  protected readonly hasPhoto = !!SITE_CONFIG.images.productPhoto;
  protected readonly price = formatPrice(SITE_CONFIG.brand.price);
}
