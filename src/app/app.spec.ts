import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SITE_CONFIG, buildWhatsappLink, orderMessage, whatsappLink } from './config/site-config';

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

  it('links the enquiry button to the brand email', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const href = el.querySelector('#contact .builder a.btn-primary')?.getAttribute('href') ?? '';
    expect(href.startsWith(`mailto:${SITE_CONFIG.contact.email}?`)).toBe(true);
  });

  it('hides WhatsApp when no number is configured', () => {
    expect(SITE_CONFIG.contact.whatsappNumber).toBe('');
    expect(whatsappLink('hello')).toBeNull();
  });

  it('writes the order details into the message', () => {
    const msg = orderMessage({ quantity: '3', name: 'Asha', city: 'Indore', pincode: '452001' });
    expect(msg).toContain('Quantity: 3 bottles');
    expect(msg).toContain('Name: Asha');
    expect(msg).toContain('City: Indore');
    expect(msg).not.toContain('Phone:');
  });

  it('builds a wa.me link only for a valid number', () => {
    expect(buildWhatsappLink('+91 98765 43210', 'hi')).toBe('https://wa.me/919876543210?text=hi');
    expect(buildWhatsappLink('12345', 'hi')).toBeNull();
  });
});
