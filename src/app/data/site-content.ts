/**
 * Product content taken from the Apars Herbal Care Hair Oil label.
 * Copy uses cosmetic language only: no medical, therapeutic or guaranteed-result claims.
 */

export type BotanicalIcon =
  | 'coconut'
  | 'sesame'
  | 'castor'
  | 'bhringraj'
  | 'amla'
  | 'brahmi'
  | 'hibiscus'
  | 'curry-leaves'
  | 'fenugreek'
  | 'aloe'
  | 'neem'
  | 'vitamin-e';

export interface Ingredient {
  readonly name: string;
  readonly localName?: string;
  readonly description: string;
  readonly icon: BotanicalIcon;
  readonly kind: 'Base oil' | 'Herb' | 'Extract' | 'Vitamin';
}

export interface KeyHerb {
  readonly name: string;
  readonly hindiNote: string;
  readonly description: string;
  readonly image: string;
  readonly alt: string;
}

export type BenefitIcon = 'routine' | 'condition' | 'shine' | 'ritual' | 'drop';

export interface Benefit {
  readonly title: string;
  readonly description: string;
  readonly icon: BenefitIcon;
}

export interface UsageStep {
  readonly title: string;
  readonly description: string;
}

export interface NavLink {
  readonly label: string;
  readonly fragment: string;
}

export const NAV_LINKS: readonly NavLink[] = [
  { label: 'Home', fragment: 'home' },
  { label: 'Ingredients', fragment: 'ingredients' },
  { label: 'Benefits', fragment: 'benefits' },
  { label: 'How to Use', fragment: 'how-to-use' },
  { label: 'Contact', fragment: 'contact' },
];

export const INGREDIENTS: readonly Ingredient[] = [
  {
    name: 'Coconut Oil',
    localName: 'Nariyal tel',
    description: 'The base of the blend and the oil most Indian homes reach for when oiling hair.',
    icon: 'coconut',
    kind: 'Base oil',
  },
  {
    name: 'Sesame Oil',
    localName: 'Til tel',
    description: 'Cold-pressed and traditionally used as a warming massage oil for the scalp.',
    icon: 'sesame',
    kind: 'Base oil',
  },
  {
    name: 'Castor Oil',
    localName: 'Arandi tel',
    description: 'A rich, thick oil that adds body to the blend and coats the lengths of the hair.',
    icon: 'castor',
    kind: 'Base oil',
  },
  {
    name: 'Bhringraj',
    localName: 'False daisy',
    description: 'A herb with a long place in traditional Indian hair-oil preparations.',
    icon: 'bhringraj',
    kind: 'Herb',
  },
  {
    name: 'Amla',
    localName: 'Indian gooseberry',
    description: 'A familiar fruit in traditional hair-care recipes across India.',
    icon: 'amla',
    kind: 'Herb',
  },
  {
    name: 'Brahmi',
    localName: 'Water hyssop',
    description: 'A small-leaved herb traditionally added to scalp-massage oils.',
    icon: 'brahmi',
    kind: 'Herb',
  },
  {
    name: 'Hibiscus',
    localName: 'Gudhal',
    description: 'Flowers and leaves have long been used in home hair-care preparations.',
    icon: 'hibiscus',
    kind: 'Herb',
  },
  {
    name: 'Curry Leaves',
    localName: 'Kadi patta',
    description: 'A kitchen leaf that also appears in many traditional hair-oil recipes.',
    icon: 'curry-leaves',
    kind: 'Herb',
  },
  {
    name: 'Fenugreek',
    localName: 'Methi',
    description: 'Seeds traditionally steeped into hair-care oils and pastes.',
    icon: 'fenugreek',
    kind: 'Herb',
  },
  {
    name: 'Aloe Vera Extract',
    localName: 'Gwarpatha',
    description: 'A light plant extract widely used in cosmetic hair and skin care.',
    icon: 'aloe',
    kind: 'Extract',
  },
  {
    name: 'Neem',
    localName: 'Nimba',
    description: 'A traditional botanical often found in scalp-care routines.',
    icon: 'neem',
    kind: 'Herb',
  },
  {
    name: 'Vitamin E',
    localName: 'Tocopherol',
    description: 'An antioxidant that helps keep the oil blend fresh.',
    icon: 'vitamin-e',
    kind: 'Vitamin',
  },
];

export const KEY_HERBS: readonly KeyHerb[] = [
  {
    name: 'Bhringraj',
    hindiNote: 'भृंगराज',
    description: 'Traditionally used in hair-care preparations.',
    image: '/images/herbs/bhringraj.webp',
    alt: 'Illustration of bhringraj leaves and small white flowers',
  },
  {
    name: 'Amla',
    hindiNote: 'आंवला',
    description: 'A traditional botanical ingredient.',
    image: '/images/herbs/amla.webp',
    alt: 'Illustration of green amla fruits',
  },
  {
    name: 'Brahmi',
    hindiNote: 'ब्राह्मी',
    description: 'Featured in traditional hair-care practices.',
    image: '/images/herbs/brahmi.webp',
    alt: 'Illustration of round brahmi leaves on a stem',
  },
  {
    name: 'Hibiscus',
    hindiNote: 'गुड़हल',
    description: 'Traditionally used in hair-care preparations.',
    image: '/images/herbs/hibiscus.webp',
    alt: 'Illustration of a red hibiscus flower',
  },
  {
    name: 'Curry Leaves',
    hindiNote: 'कड़ी पत्ता',
    description: 'A familiar ingredient in traditional hair-care routines.',
    image: '/images/herbs/curry-leaves.webp',
    alt: 'Illustration of a sprig of curry leaves',
  },
];

export const BENEFITS: readonly Benefit[] = [
  {
    title: 'Supports your routine',
    description: 'A simple pre-wash oil that fits into a regular weekly hair-care routine.',
    icon: 'routine',
  },
  {
    title: 'Conditions hair',
    description: 'Helps condition hair and improve how it looks and feels.',
    icon: 'condition',
  },
  {
    title: 'Smooth, shiny look',
    description: 'Helps hair look smoother and shinier after washing.',
    icon: 'shine',
  },
  {
    title: 'A traditional ritual',
    description: 'Brings back the familiar herbal hair-oiling massage, made with herbs in every bottle.',
    icon: 'ritual',
  },
  {
    title: 'Made for oil lovers',
    description: 'For anyone who prefers an oil-based, herb-infused hair-care ritual.',
    icon: 'drop',
  },
];

export const USAGE_STEPS: readonly UsageStep[] = [
  {
    title: 'Apply',
    description: 'Apply an appropriate amount of oil to your hair and scalp.',
  },
  {
    title: 'Massage',
    description: 'Massage gently with your fingertips, working through the scalp.',
  },
  {
    title: 'Leave on',
    description: 'Leave it on for 1–2 hours, or overnight, as directed on the label.',
  },
  {
    title: 'Wash',
    description: 'Wash out with a mild shampoo.',
  },
];

/** Directions exactly as printed in Hindi on the label. */
export const LABEL_DIRECTIONS_HINDI: readonly string[] = [
  'बालों और स्कैल्प पर पर्याप्त मात्रा में तेल लगाएं और हल्के हाथों से मसाज करें।',
  'कम से कम 1-2 घंटे या रातभर के लिए छोड़ दें।',
  'फिर माइल्ड शैम्पू से धो लें।',
];

export const CAUTIONS: readonly string[] = [
  'For external use only.',
  'Avoid contact with eyes. If contact occurs, rinse thoroughly with water.',
  'Keep out of reach of children.',
  'Store in a cool, dry place away from direct sunlight.',
  'Natural herbs may cause slight variation in colour and fragrance between batches.',
  'Check the product label for complete instructions and precautions.',
];
