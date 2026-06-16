(function () {

  // ─── FEATURE FLAGS ───────────────────────────────────────────────────────────
  // Set any flag to false to disable that feature without touching module files.
  var FLAGS = {
    globalStyles:    true,   // Navbar styles, Libre Franklin, navshim sync
    searchBarHide:   true,   // Hide search bar on home pages
    autofocusFix:    true,   // Prevent datepicker autofocus on load
    hideLastModified:true,   // Hide last modified on certain ticket pages
    hrOldPage:       true,   // HR OL&D custom category page injection
    formOverlay:     true,   // Auto-show overlay on any form with an iframe
    formCreditCourse:true,   // NOVA credit course date validation (form 12522)
    formPrefill:     false,  // ?prefill=TICKET_ID URL prefill system
  };

  var BASE = 'https://cdn.jsdelivr.net/gh/yaserhdev/nvcc-tdx@main/modules/';
  var v    = '?v=' + Date.now();

  function load(src) {
    var s = document.createElement('script');
    s.src = src;
    document.head.appendChild(s);
  }

  // ─── CORE — always loaded ─────────────────────────────────────────────────
  load(BASE + 'core.js' + v);

  // ─── FEATURE MODULES ─────────────────────────────────────────────────────
  if (FLAGS.globalStyles)     load(BASE + 'global-styles.js'      + v);
  if (FLAGS.searchBarHide)    load(BASE + 'search-bar-hide.js'    + v);
  if (FLAGS.autofocusFix)     load(BASE + 'autofocus-fix.js'      + v);
  if (FLAGS.hideLastModified) load(BASE + 'hide-last-modified.js' + v);
  if (FLAGS.hrOldPage)        load(BASE + 'hr-old-page.js'        + v);
  if (FLAGS.formOverlay)      load(BASE + 'form-overlay.js'       + v);
  if (FLAGS.formCreditCourse) load(BASE + 'form-credit-course.js' + v);
  if (FLAGS.formPrefill)      load(BASE + 'form-prefill.js'       + v);

})();
