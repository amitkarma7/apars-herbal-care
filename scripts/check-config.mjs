// Stops the production build when the WhatsApp order number is missing or invalid,
// because the site takes orders on WhatsApp only.
// For a local preview without a number, run: ALLOW_MISSING_WHATSAPP=1 npm run build
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = readFileSync(join(root, 'src/app/config/site-config.ts'), 'utf8');
const number = (config.match(/whatsappNumber:\s*'([^']*)'/)?.[1] ?? '').replace(/\D/g, '');

if (number.length >= 10 && number.length <= 15) {
  console.log(`[config] WhatsApp orders go to +${number}`);
} else if (process.env['ALLOW_MISSING_WHATSAPP'] === '1') {
  console.warn('[config] WARNING: no WhatsApp number set. Order buttons will not work in this build.');
} else {
  console.error(
    '\n[config] Build stopped: this site takes orders on WhatsApp only, but no valid WhatsApp number is set.\n' +
      "         Set contact.whatsappNumber in src/app/config/site-config.ts, for example '919876543210'\n" +
      '         (country code + number, digits only), then run the build again.\n',
  );
  process.exit(1);
}
