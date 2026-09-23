/* eslint-disable max-len */
import { moveInstrumentation } from '../../scripts/scripts.js';

/* Inline icon set (stroke uses currentColor so it inherits the theme). */
const ICONS = {
  processo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  certidao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h9l4 4v14H6z"/><path d="M9 12l2 2 4-4"/></svg>',
  custas: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v10M9.5 9.5h5M9.5 14.5h5"/></svg>',
  servicos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z"/></svg>',
  concursos: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16v12H4z"/><path d="M4 10h16M8 14h4"/></svg>',
  balanca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v18M6 8h12M6 8l-3 6h6zM18 8l-3 6h6z"/></svg>',
  precatorios: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M7 12h.01M17 12h.01"/></svg>',
  balcao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',
  telefone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5c0 9 6 15 15 15v-4l-4-2-2 2c-3-1-5-3-6-6l2-2-2-4H4z"/></svg>',
  documento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M7 3h7l5 5v13H7z"/><path d="M14 3v5h5"/></svg>',
};

const DEFAULT_ICON = ICONS.servicos;

/**
 * loads and decorates the atalhos (quick-links) block
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const nav = document.createElement('nav');
  nav.className = 'atalhos-list';
  nav.setAttribute('aria-label', 'Atalhos de serviços');

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const iconKey = (cells[0]?.textContent || '').trim().toLowerCase();
    const label = (cells[1]?.textContent || '').trim();
    const linkEl = cells[2]?.querySelector('a');
    const href = linkEl?.getAttribute('href') || (cells[2]?.textContent || '').trim() || '#';

    const item = document.createElement('a');
    item.className = 'atalho';
    item.href = href;
    if (label) item.setAttribute('aria-label', label);

    const ic = document.createElement('span');
    ic.className = 'atalho-ic';
    ic.setAttribute('aria-hidden', 'true');
    ic.innerHTML = ICONS[iconKey] || DEFAULT_ICON;

    const text = document.createElement('span');
    text.className = 'atalho-label';
    text.textContent = label;

    item.append(ic, text);
    moveInstrumentation(row, item);
    nav.append(item);
  });

  block.textContent = '';
  block.append(nav);
}
