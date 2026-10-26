// Security policy, kept in one place: the Content-Security-Policy every page carries in a <meta> tag (GitHub Pages
// cannot send headers) and the response headers the production .htaccess sends. README → Security.
import crypto from 'node:crypto';
import { SITE } from '../data/site.mjs';

// The only inline script: it swaps the "no-js" class before the stylesheet applies. The CSP allows it by its hash,
// so any other inline script (an injected one) is refused.
export const BOOT_JS = "document.documentElement.className=document.documentElement.className.replace('no-js','js')";
const hash = (s) => `'sha256-${crypto.createHash('sha256').update(s).digest('base64')}'`;

const origin = (u) => {
  try {
    return u ? new URL(u).origin : '';
  } catch {
    return '';
  }
};

/**
 * The page policy. Everything is served by the site itself; the only outside connections are the Google Maps
 * frame (after the visitor asks for it) and the optional form service (SITE.formEndpoint).
 * Styles allow 'unsafe-inline' because the decorative layers and photo crops use style attributes; scripts do not.
 * `header: true` adds the directives a <meta> tag cannot carry (frame-ancestors).
 */
export function csp({ header = false } = {}) {
  const form = origin(SITE.formEndpoint);
  const map = origin(SITE.mapsEmbed);
  const frames = [...new Set([map, 'https://www.google.com', 'https://maps.google.com'].filter(Boolean))];
  return [
    "default-src 'self'",
    `script-src 'self' ${hash(BOOT_JS)}`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    "font-src 'self'",
    `connect-src 'self'${form ? ` ${form}` : ''}`,
    `frame-src ${frames.join(' ')}`,
    "media-src 'none'",
    "object-src 'none'",
    "worker-src 'none'",
    "manifest-src 'self'",
    "base-uri 'self'",
    "form-action 'self'",
    ...(header ? ["frame-ancestors 'none'"] : []),
  ].join('; ');
}

// Browser features the site never uses; the map frame does not get them either.
export const PERMISSIONS_POLICY = 'accelerometer=(), autoplay=(), camera=(), display-capture=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), browsing-topics=()';
export const REFERRER_POLICY = 'strict-origin-when-cross-origin';
