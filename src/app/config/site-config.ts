/**
 * Central configuration for the Apars Herbal Care website.
 * Change brand, contact, image and SEO details here; every component reads from this file.
 */

export interface SiteConfig {
  readonly brand: {
    readonly name: string;
    readonly productName: string;
    readonly netQuantity: string;
    readonly tagline: string;
  };
  readonly contact: {
    readonly email: string;
    readonly addressLines: readonly string[];
    /**
     * WhatsApp number in international format, digits only, including country code
     * (for example 91XXXXXXXXXX). Leave empty to hide every WhatsApp button.
     */
    readonly whatsappNumber: string;
  };
  readonly images: {
    /**
     * Path to a real photograph of the bottle (for example /images/hair-oil-product.webp).
     * Leave empty to show the CSS bottle mockup wrapped in the label artwork.
     */
    readonly productPhoto: string;
    /** Label artwork used on the CSS bottle mockup. */
    readonly labelFront: string;
    readonly labelFrontFallback: string;
  };
  readonly seo: {
    /**
     * Public address of the product website, without a trailing slash
     * (for example https://www.aparsherbalcare.in). Leave empty until the domain is confirmed.
     * When set, it drives the canonical link, Open Graph URLs, robots.txt and sitemap.xml.
     */
    readonly siteUrl: string;
    readonly title: string;
    readonly description: string;
    readonly ogImagePath: string;
  };
  readonly developer: {
    readonly name: string;
    readonly url: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  brand: {
    name: 'Apars Herbal Care',
    productName: 'Apars Herbal Care Hair Oil',
    netQuantity: '100 ml',
    tagline: 'Nature’s care for your hair',
  },
  contact: {
    email: 'aparenterprises11@gmail.com',
    addressLines: ['Gokuldham Colony, Bistan Naka', 'Khargone, Madhya Pradesh', 'India'],
    whatsappNumber: '+919109253347',
  },
  images: {
    productPhoto: '',
    labelFront: '/images/hair-oil-label-front.webp',
    labelFrontFallback: '/images/hair-oil-label-front.jpg',
  },
  seo: {
    siteUrl: '',
    title: 'Apars Herbal Care Hair Oil | Handcrafted with Traditional Herbs',
    description:
      'Apars Herbal Care Hair Oil (100 ml) blends coconut oil and cold-pressed sesame oil with bhringraj, amla, brahmi, hibiscus and curry leaves for a traditional hair-oiling ritual.',
    ogImagePath: '/images/og-image.jpg',
  },
  developer: {
    name: 'MyPilot.co.in',
    url: 'https://mypilot.co.in',
  },
};

/** Builds a wa.me link for any number, or null if the number is not 10–15 digits. */
export function buildWhatsappLink(number: string, message: string): string | null {
  const digits = number.replace(/\D/g, '');
  if (digits.length < 10 || digits.length > 15) {
    return null;
  }
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Returns a wa.me link when a valid WhatsApp number is configured, otherwise null. */
export function whatsappLink(message: string): string | null {
  return buildWhatsappLink(SITE_CONFIG.contact.whatsappNumber, message);
}

/** True when a valid WhatsApp number is set, so ordering on WhatsApp is available. */
export const WHATSAPP_ENABLED = whatsappLink('') !== null;

export interface OrderDetails {
  readonly quantity: string;
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly city?: string;
  readonly pincode?: string;
  readonly note?: string;
}

/** The order message sent on WhatsApp (and by email when WhatsApp is not configured). */
export function orderMessage(order: OrderDetails): string {
  const { brand } = SITE_CONFIG;
  const qty = Math.max(1, Math.floor(Number(order.quantity) || 1));
  const lines = [
    `Hello ${brand.name}, I would like to place an order.`,
    '',
    `Product: ${brand.productName} (${brand.netQuantity})`,
    `Quantity: ${qty} ${qty === 1 ? 'bottle' : 'bottles'}`,
  ];
  const optional: [string, string | undefined][] = [
    ['Name', order.name],
    ['Phone', order.phone],
    ['Address', order.address],
    ['City', order.city],
    ['PIN code', order.pincode],
    ['Note', order.note],
  ];
  const filled = optional.filter(([, value]) => value?.trim());
  if (filled.length) {
    lines.push('', ...filled.map(([label, value]) => `${label}: ${value!.trim()}`));
  }
  lines.push('', 'Please confirm the price, payment options and delivery time.');
  return lines.join('\n');
}

/** Builds a mailto: link to the brand inbox with a prefilled subject and body. */
export function enquiryMailto(subject: string, body: string): string {
  return `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
