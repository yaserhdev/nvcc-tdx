// ─── AUTOFOCUS FIX ───────────────────────────────────────────────────────────
(function () {
  var suppressAutoFocus = function () {
    var focused = document.activeElement;
    if (focused && focused !== document.body && focused !== document.documentElement) {
      focused.blur();
    }
    var dpDiv = document.getElementById('ui-datepicker-div');
    if (dpDiv) dpDiv.style.display = 'none';
    if (window.jQuery && window.jQuery.datepicker) {
      try { window.jQuery.datepicker._hideDatepicker(); } catch (e) {}
      window.jQuery.datepicker._lastInput = null;
      window.jQuery.datepicker._curInst   = null;
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', suppressAutoFocus);
  } else {
    suppressAutoFocus();
  }
  window.addEventListener('load', suppressAutoFocus);
  setTimeout(suppressAutoFocus, 100);
  setTimeout(suppressAutoFocus, 300);
  setTimeout(suppressAutoFocus, 600);

  (function () {
    var dpDiv = document.getElementById('ui-datepicker-div');
    if (!dpDiv || !window.MutationObserver) return;
    var userInteracted = false;
    ['mousedown', 'keydown', 'touchstart'].forEach(function (evt) {
      document.addEventListener(evt, function () { userInteracted = true; }, { once: true, capture: true });
    });
    var observer = new MutationObserver(function () {
      if (!userInteracted && dpDiv.style.display !== 'none') suppressAutoFocus();
    });
    observer.observe(dpDiv, { attributes: true, attributeFilter: ['style'] });
    setTimeout(function () { observer.disconnect(); }, 3000);
  })();
})();
