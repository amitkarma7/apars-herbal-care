import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG, orderMessage, whatsappLink } from '../../config/site-config';
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
  protected readonly whatsapp = whatsappLink(orderMessage({ quantity: '1' }));
}
