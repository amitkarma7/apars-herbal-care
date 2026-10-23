import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { buildWhatsappLink, formatPrice, orderMessage, orderTotal } from './config/site-config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
  });

  it('renders the hero headline', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent).toContain('Strong, Healthy and');
  });

  it('shows all twelve ingredients', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('#ingredients .card').length).toBe(12);
  });

  it('shows the MyPilot copyright with the current year', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const year = new Date().getFullYear();
    expect(el.querySelector('.copyright')?.textContent?.trim()).toBe(`© ${year} MyPilot.co.in. All rights reserved.`);
  });

  it('offers no way to order by email', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelectorAll('#order a[href^="mailto:"]').length).toBe(0);
    expect(el.querySelectorAll('app-product-highlight a[href^="mailto:"]').length).toBe(0);
    expect(el.querySelector('#order .order-btn')?.textContent).toContain('Order on WhatsApp');
  });

  it('sends every other order button to the order form', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-hero .actions .btn-whatsapp')?.getAttribute('href')).toBe('#order');
    expect(el.querySelector('app-product-highlight .btn-whatsapp')?.getAttribute('href')).toBe('#order');
    expect(el.querySelector('app-whatsapp-button .fab')?.getAttribute('href')).toBe('#order');
  });

  it('shows the price on the bottle and in the product section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-hero .seal')?.textContent).toContain('₹299');
    expect(el.querySelector('app-product-highlight .price')?.textContent).toContain('₹299');
  });

  it('updates the total when the quantity changes', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#order .total-amount')?.textContent).toBe('₹299');
    const plus = el.querySelectorAll<HTMLButtonElement>('#order .stepper button')[1];
    plus.click();
    plus.click();
    fixture.detectChanges();
    await fixture.whenStable();
    expect(el.querySelector('#order .total-amount')?.textContent).toBe('₹897');
  });

  it('shows the prepaid, non-returnable terms and keeps ordering locked until accepted', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const terms = el.querySelector('#order .terms')?.textContent ?? '';
    expect(terms).toContain('Prepaid');
    expect(terms).toContain('Non-returnable');
    expect((el.querySelector('#order .order-btn') as HTMLButtonElement).disabled).toBe(true);
    expect(el.querySelector('#order a.order-btn')).toBeNull();
  });

  it('calculates totals and formats rupees', () => {
    expect(orderTotal(1)).toBe(299);
    expect(orderTotal('3')).toBe(897);
    expect(orderTotal(0)).toBe(299);
    expect(orderTotal(500)).toBe(299 * 99);
    expect(formatPrice(1495)).toBe('₹1,495');
  });

  it('writes the order details into the message', () => {
    const msg = orderMessage({ quantity: '3', name: 'Asha', city: 'Indore', pincode: '452001' });
    expect(msg).toContain('Quantity: 3 bottles');
    expect(msg).toContain('Price: ₹299 per bottle');
    expect(msg).toContain('Total: ₹897');
    expect(msg).toContain('prepaid, non-returnable');
    expect(msg).toContain('Name: Asha');
    expect(msg).toContain('City: Indore');
    expect(msg).not.toContain('Phone:');
  });

  it('sends the order message to the configured number', () => {
    const link = buildWhatsappLink('919876543210', orderMessage({ quantity: '2' }));
    expect(link?.startsWith('https://wa.me/919876543210?text=')).toBe(true);
    expect(decodeURIComponent(link!.split('text=')[1])).toContain('Quantity: 2 bottles');
  });

  it('builds a wa.me link only for a valid number', () => {
    expect(buildWhatsappLink('+91 98765 43210', 'hi')).toBe('https://wa.me/919876543210?text=hi');
    expect(buildWhatsappLink('12345', 'hi')).toBeNull();
  });
});
