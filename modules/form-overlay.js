// ─── FORM OVERLAY — AUTO DETECT ──────────────────────────────────────────────
// On any form page that contains an iframe inside the form DOM, automatically
// shows the universal overlay. Dismisses when any widget iframe sends the
// nvcc-widget-ready postMessage signal via window.top.
//
// No per-form configuration needed — works on any form with an embedded
// iframe widget (user details banner, release notes cards, etc.).
(function () {
  function init() {
    var form = document.querySelector('form.js-entry-form');
    if (!form) return;
    if (!form.querySelector('iframe')) return;
    window.nvccShowFormOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
