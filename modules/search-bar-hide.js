// ─── SEARCH BAR HIDE ─────────────────────────────────────────────────────────
(function () {
  var path = window.location.pathname.toLowerCase();
  if (
    path === '/sbtdclient/413/portal/1836/home-1' ||
    path === '/sbtdclient/413/portal/home/'       ||
    path === '/sbtdclient/413/portal/1944/home-v3'
  ) {
    var el = document.querySelector('div.pull-left.topLevelSearch.input-group');
    if (el) el.style.display = 'none';
  }
})();
