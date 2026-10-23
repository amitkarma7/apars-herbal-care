import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { buildWhatsappLink, orderMessage } from './config/site-config';

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

  it('labels every order button for WhatsApp', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const heroCta = el.querySelector('app-hero .actions .btn-whatsapp');
    expect(heroCta?.textContent).toContain('Order on WhatsApp');
  });

  it('writes the order details into the message', () => {
    const msg = orderMessage({ quantity: '3', name: 'Asha', city: 'Indore', pincode: '452001' });
    expect(msg).toContain('Quantity: 3 bottles');
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
