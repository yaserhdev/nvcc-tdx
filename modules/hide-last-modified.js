// ─── HIDE LAST MODIFIED ──────────────────────────────────────────────────────
(function () {
  var serviceEl = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divService div');
  if (!serviceEl) return;
  var service = serviceEl.textContent.trim().toLowerCase();
  var CONFIG  = (window.NVCC && window.NVCC.CONFIG) || {};
  var list    = CONFIG.hideLastModified || [];
  if (list.some(function (s) { return service.indexOf(s) !== -1; })) {
    var el = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divModified');
    if (el) el.style.display = 'none';
  }
})();
