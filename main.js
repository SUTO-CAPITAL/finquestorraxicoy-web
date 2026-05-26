// ===== FINQUES TORRA XICOY — SHARED JS =====

const LANGS = ['ca', 'es', 'en'];
let currentLang = 'ca';

try {
  currentLang = localStorage.getItem('ftx-lang') || 'ca';
} catch(e) {}

// Títols i descripcions per pàgina i idioma
const PAGE_META = {
  'index.html': {
    ca: { title: 'Finques Torra Xicoy · Immobiliària a Catalunya', desc: 'Immobiliària familiar amb més de 30 anys d\'experiència. Compra, venda, lloguer i serveis integrals arreu de Catalunya.' },
    es: { title: 'Finques Torra Xicoy · Inmobiliaria en Cataluña',  desc: 'Inmobiliaria familiar con más de 30 años de experiencia. Compra, venta, alquiler y servicios integrales en toda Cataluña.' },
    en: { title: 'Finques Torra Xicoy · Real Estate Catalunya',      desc: 'Family real estate agency with over 30 years of experience. Buying, selling, rental and comprehensive services throughout Catalonia.' }
  },
  'serveis.html': {
    ca: { title: 'Serveis · Finques Torra Xicoy',   desc: 'Serveis integrals immobiliaris: compra, venda, lloguer, valoració, assegurances i assessoria legal a Catalunya.' },
    es: { title: 'Servicios · Finques Torra Xicoy',  desc: 'Servicios integrales inmobiliarios: compra, venta, alquiler, valoración, seguros y asesoría legal en Cataluña.' },
    en: { title: 'Services · Finques Torra Xicoy',   desc: 'Comprehensive real estate services: buying, selling, rental, valuation, insurance and legal advice in Catalonia.' }
  },
  'propietats.html': {
    ca: { title: 'Propietats · Finques Torra Xicoy',   desc: 'Propietats en venda i lloguer a Barcelona i Catalunya. Finques Torra Xicoy.' },
    es: { title: 'Propiedades · Finques Torra Xicoy',   desc: 'Propiedades en venta y alquiler en Barcelona y Cataluña. Finques Torra Xicoy.' },
    en: { title: 'Properties · Finques Torra Xicoy',   desc: 'Properties for sale and rent in Barcelona and Catalonia. Finques Torra Xicoy.' }
  },
  'nosaltres.html': {
    ca: { title: 'Nosaltres · Finques Torra Xicoy', desc: 'Immobiliària familiar amb més de 30 anys d\'experiència en el sector immobiliari de Catalunya.' },
    es: { title: 'Nosotros · Finques Torra Xicoy',  desc: 'Inmobiliaria familiar con más de 30 años de experiencia en el sector inmobiliario de Cataluña.' },
    en: { title: 'About · Finques Torra Xicoy',     desc: 'Family real estate agency with over 30 years of experience in the Catalan property market.' }
  },
  'valoracio.html': {
    ca: { title: 'Valoració gratuïta · Finques Torra Xicoy', desc: 'Obtén una valoració professional i gratuïta del teu immoble en menys de 48 hores.' },
    es: { title: 'Valoración gratuita · Finques Torra Xicoy', desc: 'Obtén una valoración profesional y gratuita de tu inmueble en menos de 48 horas.' },
    en: { title: 'Free valuation · Finques Torra Xicoy',      desc: 'Get a professional, free valuation of your property in less than 48 hours.' }
  },
  'contacte.html': {
    ca: { title: 'Contacte · Finques Torra Xicoy', desc: 'Contacta amb Finques Torra Xicoy. Tel: +34 663 876 778. Email: suarez_torra@icab.cat' },
    es: { title: 'Contacto · Finques Torra Xicoy',  desc: 'Contacta con Finques Torra Xicoy. Tel: +34 663 876 778. Email: suarez_torra@icab.cat' },
    en: { title: 'Contact · Finques Torra Xicoy',   desc: 'Contact Finques Torra Xicoy. Tel: +34 663 876 778. Email: suarez_torra@icab.cat' }
  },
  'legal.html': {
    ca: { title: 'Avís legal · Finques Torra Xicoy', desc: 'Avís legal i política de privacitat de Finques Torra Xicoy.' },
    es: { title: 'Aviso legal · Finques Torra Xicoy', desc: 'Aviso legal y política de privacidad de Finques Torra Xicoy.' },
    en: { title: 'Legal notice · Finques Torra Xicoy', desc: 'Legal notice and privacy policy of Finques Torra Xicoy.' }
  }
};

function setLang(lang) {
  if (!LANGS.includes(lang)) lang = 'ca';
  currentLang = lang;
  try { localStorage.setItem('ftx-lang', lang); } catch(e) {}

  // Mostrar/amagar elements per idioma
  document.querySelectorAll('[data-lang]').forEach(el => {
    const tag = el.tagName.toLowerCase();
    const isInline = ['span', 'strong', 'em', 'a', 'button', 'option'].includes(tag);
    if (el.dataset.lang === lang) {
      el.style.display = isInline ? 'inline' : 'block';
    } else {
      el.style.display = 'none';
    }
  });

  // Botons actius
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.style.display = '';
  });

  // Actualitzar <html lang="">
  document.documentElement.lang = lang;

  // Actualitzar <title> i <meta description> dinàmicament
  const page = location.pathname.split('/').pop() || 'index.html';
  const meta = PAGE_META[page];
  if (meta && meta[lang]) {
    document.title = meta[lang].title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', meta[lang].desc);
  }

  // Arreglar el select de tipus (options amb data-lang no funcionen amb display:none)
  document.querySelectorAll('select').forEach(sel => {
    const opts = sel.querySelectorAll('option[data-lang]');
    if (!opts.length) return;
    // Guardem la primera opció visible anterior
    let hadValue = sel.value;
    opts.forEach(opt => {
      opt.hidden = opt.dataset.lang !== lang;
      opt.disabled = opt.dataset.lang !== lang;
    });
    // Seleccionem la primera opció visible
    const firstVisible = sel.querySelector(`option[data-lang="${lang}"]`);
    if (firstVisible) sel.value = firstVisible.value;
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
