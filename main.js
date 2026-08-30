/**
 * CV WEB TECH MODERNO — Oscar Octavio Alvarado Cornejo
 * Script principal: Modo Oscuro/Claro, Cambio de Idioma (ES / EN), Sidebar Scrollspy, Acordeón y Descarga Directa de PDFs
 */

let currentLang = 'es';

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initSidebarScrollspy();
  initCollapsibleExperience();
  initCounters();
  initDownloadPdfActions();
  initCopyActions();
});

/* ==========================================================================
   1. GESTOR DE IDIOMA (ESPAÑOL / INGLÉS)
   ========================================================================== */
function initLanguage() {
  const langToggle = document.getElementById('langToggle');
  const savedLang = localStorage.getItem('cv_lang');
  
  // Idioma inicial
  currentLang = savedLang || 'es';
  applyLanguage(currentLang, false);

  if (langToggle) {
    langToggle.addEventListener('click', () => {
      currentLang = currentLang === 'es' ? 'en' : 'es';
      applyLanguage(currentLang, true);
    });
  }
}

function applyLanguage(lang, showNotification = true) {
  const html = document.documentElement;
  html.setAttribute('lang', lang);
  localStorage.setItem('cv_lang', lang);

  const dict = translations[lang];
  if (!dict) return;

  // Actualizar textos simples
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Actualizar textos con formato HTML
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Actualizar botón de idioma
  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) {
    langLabel.textContent = lang === 'es' ? 'EN' : 'ES';
  }

  // Actualizar botón maestro de acordeón
  const allCollapsibles = document.querySelectorAll('.timeline-collapsible');
  const allExpanded = Array.from(allCollapsibles).every(el => el.classList.contains('expanded'));
  const expandAllText = document.getElementById('expandAllText');
  if (expandAllText) {
    expandAllText.textContent = allExpanded ? dict.btn_collapse_all : dict.btn_expand_all;
  }

  // Título de la pestaña
  document.title = lang === 'es'
    ? 'Oscar Octavio Alvarado Cornejo | Desarrollador Junior & Analista QA'
    : 'Oscar Octavio Alvarado Cornejo | Junior Developer & QA Analyst';

  if (showNotification) {
    showToast(dict[`toast_lang_${lang}`]);
  }
}

/* ==========================================================================
   2. SCROLLSPY PARA EL ÍNDICE LATERAL (SIDEBAR)
   ========================================================================== */
function initSidebarScrollspy() {
  const sections = document.querySelectorAll('header#hero, section#experiencia, section#habilidades, div#educacion, section#contacto');
  const sidebarLinks = document.querySelectorAll('.sidebar-link');

  if (!sections.length || !sidebarLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        sidebarLinks.forEach((link) => {
          if (link.getAttribute('data-target') === id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach((section) => observer.observe(section));

  // Clic suave en enlaces de sidebar
  sidebarLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ==========================================================================
   3. ACORDEÓN ULTRA-COMPACTO DE EXPERIENCIA
   ========================================================================== */
function initCollapsibleExperience() {
  const headers = document.querySelectorAll('.compact-exp-header');
  const expandAllBtn = document.getElementById('expandAllExpBtn');

  headers.forEach((header) => {
    header.addEventListener('click', () => {
      const targetId = header.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (!targetEl) return;

      const isExpanded = targetEl.classList.contains('expanded');
      
      if (isExpanded) {
        targetEl.classList.remove('expanded');
        header.setAttribute('aria-expanded', 'false');
      } else {
        targetEl.classList.add('expanded');
        header.setAttribute('aria-expanded', 'true');
      }

      checkMasterExpandButtonState();
    });

    // Accesibilidad por teclado (Enter / Espacio)
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Botón maestro "Expandir Todo / Contraer Todo"
  if (expandAllBtn) {
    expandAllBtn.addEventListener('click', () => {
      const allCollapsibles = document.querySelectorAll('.timeline-collapsible');
      const allHeaders = document.querySelectorAll('.compact-exp-header');
      
      const allExpanded = Array.from(allCollapsibles).every(el => el.classList.contains('expanded'));
      const shouldExpand = !allExpanded;

      allCollapsibles.forEach(el => {
        if (shouldExpand) {
          el.classList.add('expanded');
        } else {
          el.classList.remove('expanded');
        }
      });

      allHeaders.forEach(h => {
        h.setAttribute('aria-expanded', shouldExpand ? 'true' : 'false');
      });

      updateMasterButtonLabel(shouldExpand);
    });
  }
}

function checkMasterExpandButtonState() {
  const allCollapsibles = document.querySelectorAll('.timeline-collapsible');
  const allExpanded = Array.from(allCollapsibles).every(el => el.classList.contains('expanded'));
  updateMasterButtonLabel(allExpanded);
}

function updateMasterButtonLabel(allExpanded) {
  const dict = translations[currentLang] || translations.es;
  const expandAllText = document.getElementById('expandAllText');
  if (expandAllText) {
    expandAllText.textContent = allExpanded ? dict.btn_collapse_all : dict.btn_expand_all;
  }
}

/* ==========================================================================
   4. DESCARGA DIRECTA DE ARCHIVOS PDF (ESPAÑOL / INGLÉS)
   ========================================================================== */
function initDownloadPdfActions() {
  const printCvBtn = document.getElementById('printCvBtn');
  const ctaPrintBtn = document.getElementById('ctaPrintBtn');

  const handleDownloadPdf = (e) => {
    e.preventDefault();
    const isSpanish = currentLang === 'es';
    const pdfUrl = isSpanish ? 'assets/CV_Oscar_Alvarado_ES.pdf' : 'assets/CV_Oscar_Alvarado_EN.pdf';
    const fileName = isSpanish ? 'CV_Oscar_Alvarado_ES.pdf' : 'CV_Oscar_Alvarado_EN.pdf';
    
    // Disparar descarga directa del archivo PDF
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const dict = translations[currentLang] || translations.es;
    showToast(dict.toast_download_pdf);
  };

  if (printCvBtn) printCvBtn.addEventListener('click', handleDownloadPdf);
  if (ctaPrintBtn) ctaPrintBtn.addEventListener('click', handleDownloadPdf);
}

/* ==========================================================================
   5. GESTOR DE TEMA (DARK / LIGHT MODE)
   ========================================================================== */
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('cv_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  setTheme(initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      
      const dict = translations[currentLang] || translations.es;
      showToast(newTheme === 'dark' ? dict.toast_theme_dark : dict.toast_theme_light);
    });
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('cv_theme', theme);
  }
}

/* ==========================================================================
   6. CONTADORES ANIMADOS DE MÉTRICAS
   ========================================================================== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach((counter) => {
          const target = +counter.getAttribute('data-target');
          const duration = 1800;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            const currentValue = Math.floor(easeProgress * target);

            counter.innerText = currentValue.toLocaleString(currentLang === 'es' ? 'es-MX' : 'en-US');

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target.toLocaleString(currentLang === 'es' ? 'es-MX' : 'en-US');
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.15 });

  const metricsSection = document.querySelector('.metrics-grid');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   7. COPIADO AL PORTAPAPELES (EMAIL / TELÉFONO)
   ========================================================================== */
function initCopyActions() {
  const copyEmailBtn = document.getElementById('copyEmailBtn');

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', (e) => {
      const email = 'oscarcornejo654@gmail.com';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          const dict = translations[currentLang] || translations.es;
          showToast(dict.toast_copy_email);
        }).catch(() => {});
      }
    });
  }
}

/* ==========================================================================
   8. TOAST NOTIFICACIÓN FLOTANTE
   ========================================================================== */
let toastTimeout;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}
