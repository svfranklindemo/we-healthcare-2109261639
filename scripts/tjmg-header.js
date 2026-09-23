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
