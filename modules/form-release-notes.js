// ─── RELEASE NOTES FORM ──────────────────────────────────────────────────────
// Form ID 12519 — Release Notes Updates.
// Shows the universal overlay while the release notes iframe widget loads.
// Overlay dismisses when the widget sends its nvcc-widget-ready postMessage.
(function () {
  function init() {
    var formIdEl = document.getElementById('FormID');
    if (!formIdEl || formIdEl.value !== '12519') return;
    window.nvccShowFormOverlay();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
