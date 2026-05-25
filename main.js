// ===== FINQUES TORRA XICOY — SHARED JS =====

const LANGS = ['ca', 'es', 'en'];
let currentLang = 'ca';

try {
  currentLang = localStorage.getItem('ftx-lang') || 'ca';
} catch(e) {}

function setLang(lang) {
  if (!LANGS.includes(lang)) lang = 'ca';
  currentLang = lang;
  try { localStorage.setItem('ftx-lang', lang); } catch(e) {}

  // Mostrar/amagar elements per idioma
  document.querySelectorAll('[data-lang]').forEach(el => {
    const tag = el.tagName.toLowerCase();
    const isInline = ['span', 'strong', 'em', 'a', 'button'].includes(tag);
    if (el.dataset.lang === lang) {
      el.style.display = isInline ? 'inline' : 'block';
    } else {
      el.style.display = 'none';
    }
  });

  // Botons actius
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Assegurar que els lang-btn sempre es veuen
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.style.display = '';
  });
}

// Mobile menu
function initMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-close');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => overlay.classList.add('open'));
    if (closeBtn) closeBtn.addEventListener('click', () => overlay.classList.remove('open'));
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('open');
    });
  }
}

// Lang buttons
function initLang() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
  setLang(currentLang);
}

// Image gallery
function initGalleries() {
  document.querySelectorAll('.img-gallery').forEach(gallery => {
    const track = gallery.querySelector('.gallery-track');
    const slides = gallery.querySelectorAll('.gallery-slide');
    const dots = gallery.querySelectorAll('.gallery-dot');
    const prev = gallery.querySelector('.gallery-nav.prev');
    const next = gallery.querySelector('.gallery-nav.next');
    if (!track || slides.length <= 1) return;
    let current = 0;
    function goTo(idx) {
      current = (idx + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }
    if (prev) prev.addEventListener('click', () => goTo(current - 1));
    if (next) next.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    goTo(0);
  });
}

// Tabs
function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const panels = group.querySelectorAll('[data-tab-content]');
    panels.forEach((p, i) => { p.style.display = i === 0 ? 'block' : 'none'; });
    group.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        panels.forEach(p => {
          p.style.display = p.dataset.tabContent === btn.dataset.tab ? 'block' : 'none';
        });
      });
    });
  });
}

// Contact form
function initForms() {
  document.querySelectorAll('.contact-form').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const entries = Object.fromEntries(data.entries());
      const subject = encodeURIComponent('Consulta - Finques Torra Xicoy');
      const body = encodeURIComponent(
        Object.entries(entries).map(([k,v]) => `${k}: ${v}`).join('\n')
      );
      window.location.href = `mailto:suarez_torra@icab.cat?subject=${subject}&body=${body}`;
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initLang();
  initGalleries();
  initTabs();
  initForms();
});
