// ===== FINQUES TORRA XICOY — SHARED JS =====

// Language system
const LANGS = ['ca', 'es', 'en'];
let currentLang = localStorage.getItem('ftx-lang') || 'ca';

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('ftx-lang', lang);
  
  // Show/hide lang elements
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.classList.toggle('active', el.dataset.lang === lang);
  });

  // Update lang buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

// Mobile menu
function initMenu() {
  const menuBtn = document.querySelector('.nav-menu-btn');
  const overlay = document.querySelector('.menu-overlay');
  const closeBtn = document.querySelector('.menu-close');

  if (menuBtn && overlay) {
    menuBtn.addEventListener('click', () => overlay.classList.add('open'));
    closeBtn?.addEventListener('click', () => overlay.classList.remove('open'));
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
    
    prev?.addEventListener('click', () => goTo(current - 1));
    next?.addEventListener('click', () => goTo(current + 1));
    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    
    goTo(0);
  });
}

// Tabs
function initTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('[data-tabs]') || btn.closest('.tabs').parentElement;
      const target = btn.dataset.tab;
      
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      group.querySelectorAll('[data-tab-content]').forEach(panel => {
        panel.style.display = panel.dataset.tabContent === target ? 'block' : 'none';
      });
    });
  });
  
  // Init first tab active
  document.querySelectorAll('[data-tabs]').forEach(group => {
    const first = group.querySelector('[data-tab-content]');
    if (first) {
      group.querySelectorAll('[data-tab-content]').forEach((p, i) => {
        p.style.display = i === 0 ? 'block' : 'none';
      });
    }
  });
}

// Contact form (mailto fallback)
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

// Init all
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initLang();
  initGalleries();
  initTabs();
  initForms();
});
