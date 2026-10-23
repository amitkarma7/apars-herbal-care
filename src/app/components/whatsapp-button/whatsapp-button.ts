import { ChangeDetectionStrategy, Component, DestroyRef, afterNextRender, inject, signal } from '@angular/core';
import { SITE_CONFIG, formatPrice } from '../../config/site-config';

/**
 * Floating order button. It takes the customer to the order form, where they see the total and accept
 * the prepaid, non-returnable terms before WhatsApp opens. It hides while the order form is on screen.
 */
@Component({
  selector: 'app-whatsapp-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './whatsapp-button.css',
  template: `
      <a class="fab" href="#order" [class.away]="formVisible()" [attr.tabindex]="formVisible() ? -1 : null" [attr.aria-hidden]="formVisible() ? 'true' : null">
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.1 5.1 0 0 0 1.1 2.7 11.7 11.7 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3z"
          />
        </svg>
        <span class="label">Order · {{ price }}</span>
      </a>
  `,
})
export class WhatsappButton {
  protected readonly price = formatPrice(SITE_CONFIG.brand.price);
  protected readonly formVisible = signal(false);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const section = document.getElementById('contact');
      if (!section || !('IntersectionObserver' in window)) {
        return;
      }
      const observer = new IntersectionObserver(([entry]) => this.formVisible.set(entry.isIntersecting), {
        threshold: 0.05,
      });
      observer.observe(section);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
