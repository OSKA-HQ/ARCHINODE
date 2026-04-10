/* ===== ARCHINODE Language Toggle (KR / EN) ===== */
(function() {
  // Default language
  let currentLang = localStorage.getItem('archinode-lang') || 'en';

  // Apply language on load
  document.addEventListener('DOMContentLoaded', function() {
    applyLanguage(currentLang);
    updateLangButton(currentLang);
  });

  // Toggle language function (global)
  window.toggleLang = function(e) {
    if (e) e.preventDefault();
    currentLang = currentLang === 'en' ? 'ko' : 'en';
    localStorage.setItem('archinode-lang', currentLang);
    applyLanguage(currentLang);
    updateLangButton(currentLang);
  };

  function applyLanguage(lang) {
    // Update all elements with data-en and data-ko attributes
    document.querySelectorAll('[data-en][data-ko]').forEach(function(el) {
      const text = el.getAttribute('data-' + lang);
      if (text !== null) {
        // Check if element has child elements we should preserve
        if (el.querySelector('i, svg, img, span.logo-sub')) {
          // Replace only the first text node
          const nodes = el.childNodes;
          for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].nodeType === Node.TEXT_NODE && nodes[i].textContent.trim()) {
              nodes[i].textContent = text;
              break;
            }
          }
        } else {
          el.textContent = text;
        }
      }
    });

    // Update elements with data-en-html and data-ko-html (for innerHTML)
    document.querySelectorAll('[data-en-html][data-ko-html]').forEach(function(el) {
      const html = el.getAttribute('data-' + lang + '-html');
      if (html !== null) {
        el.innerHTML = html;
      }
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-en-placeholder][data-ko-placeholder]').forEach(function(el) {
      const ph = el.getAttribute('data-' + lang + '-placeholder');
      if (ph !== null) {
        el.placeholder = ph;
      }
    });

    // Update html lang attribute
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
  }

  function updateLangButton(lang) {
    var btns = document.querySelectorAll('.lang-switch');
    btns.forEach(function(btn) {
      if (lang === 'ko') {
        btn.innerHTML = '<strong>KR</strong> / EN';
      } else {
        btn.innerHTML = 'KR / <strong>EN</strong>';
      }
    });
  }
})();
