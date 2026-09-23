/* eslint-disable max-len */
/*
 * TJMG header enhancement — adds two static bars around the existing header
 * without touching header.js:
 *   bar 1 = utility strip (top), bar 3 = navy institutional nav (bottom).
 * Content is static (not authorable) by design. Scoped to the red-theme site.
 */

const UTIL_LINKS = [
  ['Alto Contraste', '#'],
  ['Transparência', '#'],
  ['Fale com o TJMG', '#'],
  ['Acessibilidade', '#'],
];

const NAV_LINKS = [
  ['Cidadão', '#'],
  ['Profissionais do Direito', '#'],
  ['Comunicação', '#'],
  ['Links Rápidos', '#'],
];

/* Social icons (static) for the maroon header, right-aligned. */
const SOCIAL = [
  ['YouTube', '#', '<svg viewBox="0 0 24 24"><path d="M23 12s0-3.5-.45-5.18a2.62 2.62 0 0 0-1.84-1.85C18.9 4.5 12 4.5 12 4.5s-6.9 0-8.71.47A2.62 2.62 0 0 0 1.45 6.82C1 8.5 1 12 1 12s0 3.5.45 5.18a2.62 2.62 0 0 0 1.84 1.85C5.1 19.5 12 19.5 12 19.5s6.9 0 8.71-.47a2.62 2.62 0 0 0 1.84-1.85C23 15.5 23 12 23 12zM9.75 15.5v-7l6 3.5z"/></svg>'],
  ['Instagram', '#', '<svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58 0 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58 0-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.16 15.58 2.16 15.2 2.16 12s0-3.58.07-4.85C2.38 3.92 3.9 2.38 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>'],
  ['Facebook', '#', '<svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/></svg>'],
  ['X', '#', '<svg viewBox="0 0 24 24"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.46l8.6-9.83L0 1.15h7.6l5.24 6.93zm-1.29 19.5h2.04L6.48 3.24H4.29z"/></svg>'],
  ['LinkedIn', '#', '<svg viewBox="0 0 24 24"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg>'],
];

function makeBar(className, tag, links, ariaLabel) {
  const bar = document.createElement(tag);
  bar.className = className;
  if (ariaLabel) bar.setAttribute('aria-label', ariaLabel);
  const inner = document.createElement('div');
  inner.className = 'tjmg-bar-inner';
  links.forEach(([label, href]) => {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    inner.append(a);
  });
  bar.append(inner);
  return bar;
}

function addSocial(header) {
  const nav = header.querySelector('.nav-wrapper nav') || header.querySelector('nav');
  if (!nav || nav.querySelector('.tjmg-social')) return;
  const group = document.createElement('div');
  group.className = 'tjmg-social';
  SOCIAL.forEach(([label, href, svg]) => {
    const a = document.createElement('a');
    a.href = href;
    a.setAttribute('aria-label', label);
    a.innerHTML = svg;
    group.append(a);
  });
  nav.append(group);
}

function enhance() {
  const header = document.querySelector('header');
  if (!header || !header.querySelector('.nav-wrapper')) return false;
  if (header.querySelector('.tjmg-utilbar')) return true; // already done

  header.insertBefore(
    makeBar('tjmg-utilbar', 'div', UTIL_LINKS),
    header.firstChild,
  );
  header.append(
    makeBar('tjmg-navybar', 'nav', NAV_LINKS, 'Navegação institucional'),
  );
  addSocial(header);
  return true;
}

export default function initTjmgHeader() {
  if (!document.body.classList.contains('red-theme')) return;
  if (enhance()) return;
  const obs = new MutationObserver(() => {
    if (enhance()) obs.disconnect();
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  // safety: stop observing after 15s regardless
  setTimeout(() => obs.disconnect(), 15000);
}

initTjmgHeader();
