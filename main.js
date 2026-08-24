/**
 * CV WEB TECH MODERNO — Oscar Octavio Alvarado Cornejo
 * Script principal: Modo Oscuro/Claro, Cambio de Idioma (ES / EN), Contadores de Métricas, Filtros de Skills y Descarga a PDF
 */

let currentLang = 'es';

document.addEventListener('DOMContentLoaded', () => {
  initLanguage();
  initTheme();
  initCounters();
  initSkillsFilter();
  initPrintActions();
  initCopyActions();
});

/* ==========================================================================
   1. GESTOR DE IDIOMA (ESPAÑOL / INGLÉS)
   ========================================================================== */
function initLanguage() {
  const langToggle = document.getElementById('langToggle');
  const savedLang = localStorage.getItem('cv_lang');
  
  // Idioma inicial (guardado o español por defecto)
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

  // Actualizar textos con formato HTML (etiquetas fuertes, pills, etc.)
  document.querySelectorAll('[data-i18n-html]').forEach((el) => {
    const key = el.getAttribute('data-i18n-html');
    if (dict[key]) {
      el.innerHTML = dict[key];
    }
  });

  // Actualizar botón de idioma (indica al que cambiará al hacer click)
  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) {
    langLabel.textContent = lang === 'es' ? 'EN' : 'ES';
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
   2. GESTOR DE TEMA (DARK / LIGHT MODE)
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
   3. CONTADORES ANIMADOS DE MÉTRICAS
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
            
            // Curva easeOutExpo
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
  }, { threshold: 0.2 });

  const metricsSection = document.querySelector('.metrics-grid');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   4. FILTRADO INTERACTIVO DE HABILIDADES
   ========================================================================== */
function initSkillsFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hidden');
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ==========================================================================
   5. ACCIÓN DE DESCARGA / IMPRESIÓN DE PDF
   ========================================================================== */
function initPrintActions() {
  const printCvBtn = document.getElementById('printCvBtn');
  const ctaPrintBtn = document.getElementById('ctaPrintBtn');

  const handlePrint = () => {
    const dict = translations[currentLang] || translations.es;
    showToast(dict.toast_pdf_prep);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  if (printCvBtn) printCvBtn.addEventListener('click', handlePrint);
  if (ctaPrintBtn) ctaPrintBtn.addEventListener('click', handlePrint);
}

/* ==========================================================================
   6. COPIADO AL PORTAPAPELES (EMAIL / TELÉFONO)
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
   7. TOAST NOTIFICACIÓN FLOTANTE
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
