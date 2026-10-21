import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SITE_CONFIG, enquiryMailto, orderMessage, whatsappLink } from '../../config/site-config';
import { KEY_HERBS } from '../../data/site-content';
import { ProductVisual } from '../product-visual/product-visual';

@Component({
  selector: 'app-product-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductVisual],
  templateUrl: './product-highlight.html',
  styleUrl: './product-highlight.css',
})
export class ProductHighlight {
  protected readonly brand = SITE_CONFIG.brand;
  protected readonly herbs = KEY_HERBS.map((herb) => herb.name);

  private readonly message = `Hello Apars Herbal Care, I would like to know more about ${SITE_CONFIG.brand.productName} (${SITE_CONFIG.brand.netQuantity}): price, availability and delivery.`;

  protected readonly mailto = enquiryMailto(`Enquiry: ${SITE_CONFIG.brand.productName}`, this.message);
  protected readonly whatsapp = whatsappLink(orderMessage({ quantity: '1' }));
}
