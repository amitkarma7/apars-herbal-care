import { ChangeDetectionStrategy, Component, ElementRef, computed, isDevMode, signal, viewChild } from '@angular/core';
import {
  SITE_CONFIG,
  enquiryMailto,
  formatPrice,
  normaliseQuantity,
  orderMessage,
  orderTotal,
  whatsappLink,
} from '../../config/site-config';
import { Reveal } from '../../shared/reveal';

type CopyState = 'idle' | 'copied' | 'selected';
type Field = 'name' | 'phone' | 'address' | 'city' | 'pincode' | 'note';

/**
 * Order and contact section. Orders are taken on WhatsApp only: the order form writes the
 * order into a WhatsApp message that the visitor sends themselves. Nothing is stored or sent
 * by this website. Email remains available for general questions, not for orders.
 */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Reveal],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly contact = SITE_CONFIG.contact;
  protected readonly brand = SITE_CONFIG.brand;
  protected readonly devMode = isDevMode();
  protected readonly terms = SITE_CONFIG.orderTerms;
  protected readonly unitPrice = formatPrice(SITE_CONFIG.brand.price);

  protected readonly quantity = signal(1);
  protected readonly fields = {
    name: signal(''),
    phone: signal(''),
    address: signal(''),
    city: signal(''),
    pincode: signal(''),
    note: signal(''),
  } satisfies Record<Field, ReturnType<typeof signal<string>>>;
  protected readonly copyState = signal<CopyState>('idle');
  /** The customer must accept the prepaid, non-returnable terms before ordering. */
  protected readonly termsAccepted = signal(false);
  protected readonly total = computed(() => formatPrice(orderTotal(this.quantity())));

  private readonly emailText = viewChild.required<ElementRef<HTMLElement>>('emailText');

  protected readonly message = computed(() =>
    orderMessage({
      quantity: String(this.quantity()),
      name: this.fields.name(),
      phone: this.fields.phone(),
      address: this.fields.address(),
      city: this.fields.city(),
      pincode: this.fields.pincode(),
      note: this.fields.note(),
    }),
  );

  protected readonly whatsapp = computed(() => whatsappLink(this.message()));
  protected readonly simpleMailto = enquiryMailto(`Question: ${SITE_CONFIG.brand.name}`, 'Hello Apars Herbal Care,\n\n');
  protected readonly simpleWhatsapp = whatsappLink(`Hello ${SITE_CONFIG.brand.name}, I have a question about your hair oil.`);

  protected update(field: Field, event: Event): void {
    this.fields[field].set((event.target as HTMLInputElement | HTMLTextAreaElement).value);
  }

  protected setQuantity(value: number | string): void {
    this.quantity.set(normaliseQuantity(value));
  }

  protected setTermsAccepted(event: Event): void {
    this.termsAccepted.set((event.target as HTMLInputElement).checked);
  }

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.contact.email);
      this.copyState.set('copied');
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(this.emailText().nativeElement);
      selection?.removeAllRanges();
      selection?.addRange(range);
      this.copyState.set('selected');
    }
    setTimeout(() => this.copyState.set('idle'), 2500);
  }
}
