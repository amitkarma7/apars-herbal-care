import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { SITE_CONFIG, WHATSAPP_ENABLED, enquiryMailto, orderMessage, whatsappLink } from '../../config/site-config';

type CopyState = 'idle' | 'copied' | 'selected';
type Field = 'name' | 'phone' | 'address' | 'city' | 'pincode' | 'note';

/**
 * Order and contact section. There is no backend: the order form writes a message and opens
 * WhatsApp (or the visitor's email app when no WhatsApp number is configured). The visitor
 * sends it themselves; nothing is stored or sent by this website.
 */
@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly contact = SITE_CONFIG.contact;
  protected readonly brand = SITE_CONFIG.brand;
  protected readonly whatsappEnabled = WHATSAPP_ENABLED;

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
  protected readonly mailto = computed(() =>
    enquiryMailto(`Order: ${this.brand.productName}`, this.message()),
  );
  protected readonly simpleMailto = enquiryMailto(`Enquiry: ${SITE_CONFIG.brand.name}`, 'Hello Apars Herbal Care,\n\n');
  protected readonly simpleWhatsapp = whatsappLink(`Hello ${SITE_CONFIG.brand.name}, I have a question about your hair oil.`);

  protected update(field: Field, event: Event): void {
    this.fields[field].set((event.target as HTMLInputElement | HTMLTextAreaElement).value);
  }

  protected setQuantity(value: number | string): void {
    const n = Math.floor(Number(value));
    this.quantity.set(Number.isFinite(n) ? Math.min(99, Math.max(1, n)) : 1);
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
