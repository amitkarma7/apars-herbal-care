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
    /** Selling price per bottle in Indian rupees (whole rupees). */
    readonly price: number;
  };
  /** Order terms shown to the customer before they order, and repeated in the WhatsApp message. */
  readonly orderTerms: {
    readonly payment: string;
    readonly returns: string;
    /** Text of the tick box the customer must accept before the order button works. */
    readonly acceptance: string;
  };
  readonly contact: {
    readonly email: string;
    readonly addressLines: readonly string[];
    /**
     * REQUIRED. Orders are taken on WhatsApp only, and every order button sends to this number.
     * International format, digits only, including country code (for example 91XXXXXXXXXX).
     * `npm run build` stops with an error until a valid number is set.
     */
    readonly whatsappNumber: string;
  };
  readonly images: {
    /**
     * Real photograph of the bottle (JPEG or PNG fallback, portrait 9:16).
     * Leave empty to show the CSS bottle mockup wrapped in the label artwork.
     */
    readonly productPhoto: string;
    /** Optional WebP versions of the photo as a srcset string, for faster loading. */
    readonly productPhotoWebp: string;
    /** Pixel size of the photo, used to reserve space while it loads. */
    readonly productPhotoSize: { readonly width: number; readonly height: number };
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
    price: 299,
  },
  orderTerms: {
    payment: 'Prepaid only. Pay in full before dispatch; payment details are shared on WhatsApp.',
    returns: 'Non-returnable. Orders cannot be returned or exchanged once placed.',
    acceptance: 'I understand this is a prepaid, non-returnable item.',
  },
  contact: {
    email: 'aparenterprises11@gmail.com',
    addressLines: ['Gokuldham Colony, Bistan Naka', 'Khargone, Madhya Pradesh', 'India'],
    whatsappNumber: '+919109253347',
  },
  images: {
    productPhoto: '/images/hair-oil-product.jpg',
    productPhotoWebp: '/images/hair-oil-product-600.webp 600w, /images/hair-oil-product-900.webp 900w',
    productPhotoSize: { width: 900, height: 1599 },
    labelFront: '/images/hair-oil-label-front.webp',
    labelFrontFallback: '/images/hair-oil-label-front.jpg',
  },
  seo: {
    siteUrl: 'https://aparsherbal.in/',
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

export interface OrderDetails {
  readonly quantity: string;
  readonly name?: string;
  readonly phone?: string;
  readonly address?: string;
  readonly city?: string;
  readonly pincode?: string;
  readonly note?: string;
}

const INR = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});

/** Formats whole rupees for display, for example 598 → "₹598". */
export function formatPrice(amount: number): string {
  return INR.format(amount);
}

/** Clamps any quantity input to a whole number between 1 and 99. */
export function normaliseQuantity(value: number | string): number {
  const n = Math.floor(Number(value));
  return Number.isFinite(n) ? Math.min(99, Math.max(1, n)) : 1;
}

/** Order total for a quantity of bottles at the configured price. */
export function orderTotal(quantity: number | string): number {
  return normaliseQuantity(quantity) * SITE_CONFIG.brand.price;
}

/** The order message the customer sends on WhatsApp. */
export function orderMessage(order: OrderDetails): string {
  const { brand } = SITE_CONFIG;
  const qty = normaliseQuantity(order.quantity);
  const lines = [
    `Hello ${brand.name}, I would like to place an order.`,
    '',
    `Product: ${brand.productName} (${brand.netQuantity})`,
    `Price: ${formatPrice(brand.price)} per bottle`,
    `Quantity: ${qty} ${qty === 1 ? 'bottle' : 'bottles'}`,
    `Total: ${formatPrice(orderTotal(qty))}`,
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
  lines.push(
    '',
    'I understand this is a prepaid, non-returnable item.',
    'Please share the payment details and delivery time.',
  );
  return lines.join('\n');
}

/** Builds a mailto: link to the brand inbox with a prefilled subject and body. */
export function enquiryMailto(subject: string, body: string): string {
  return `mailto:${SITE_CONFIG.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
