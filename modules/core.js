// ─── CORE ────────────────────────────────────────────────────────────────────
// Shared utilities and globals used by all feature modules.
// Always loaded first by the loader.
(function () {

  // ── Configuration ──────────────────────────────────────────────────────────
  window.NVCC = window.NVCC || {};
  window.NVCC.CONFIG = {
    hideLastModified: [
      'customer engagement / test - release ticket'
    ]
  };

  // ── Early postMessage listener ──────────────────────────────────────────────
  // Registered immediately to avoid race conditions where an iframe widget
  // sends nvcc-widget-ready before nvccShowFormOverlay() sets up its listener.
  window.NVCC._widgetReadyCallback = null;
  window.NVCC._widgetReadyQueued   = false;

  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'nvcc-widget-ready') return;
    if (typeof window.NVCC._widgetReadyCallback === 'function') {
      window.NVCC._widgetReadyCallback();
      window.NVCC._widgetReadyCallback = null;
    } else {
      window.NVCC._widgetReadyQueued = true;
    }
  });

  // ── Form overlay ────────────────────────────────────────────────────────────
  window.nvccShowFormOverlay = function () {
    var headerHeight = document.getElementById('divMstrHeader')
      ? document.getElementById('divMstrHeader').offsetHeight
      : 0;

    var overlay = document.createElement('div');
    overlay.id = 'nvcc-form-overlay';
    overlay.style.cssText = [
      'position:fixed',
      'top:' + headerHeight + 'px',
      'left:0',
      'width:100%',
      'height:calc(100% - ' + headerHeight + 'px)',
      'background:#fff',
      'z-index:998',
      'display:flex',
      'align-items:center',
      'justify-content:center'
    ].join(';');
    overlay.innerHTML = [
      '<div style="width:320px;text-align:center;">',
        '<div style="color:#046a38;font-size:15px;font-weight:600;margin-bottom:12px;">Loading form content...</div>',
        '<div style="background:#d4e6da;border-radius:4px;height:8px;overflow:hidden;margin-bottom:6px;">',
          '<div id="nvcc-form-overlay-bar" style="height:100%;width:0%;background:#046a38;border-radius:4px;"></div>',
        '</div>',
        '<div id="nvcc-form-overlay-pct" style="color:#595959;font-size:13px;">0%</div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var barEl = document.getElementById('nvcc-form-overlay-bar');
    var pctEl = document.getElementById('nvcc-form-overlay-pct');
    var displayedPct = 0, targetPct = 0, rafHandle = null;
    var intervalHandle = null, safetyTimeout = null;

    function animatePct() {
      if (displayedPct < targetPct - 0.1) {
        var step = Math.max(0.4, (targetPct - displayedPct) * 0.08);
        displayedPct = Math.min(targetPct, displayedPct + step);
        var r = Math.round(displayedPct);
        barEl.style.width = r + '%';
        pctEl.textContent = r + '%';
        rafHandle = requestAnimationFrame(animatePct);
      } else {
        var r = Math.round(targetPct);
        barEl.style.width = r + '%';
        pctEl.textContent = r + '%';
        displayedPct = targetPct;
        rafHandle = null;
      }
    }

    function setBarPct(p) {
      targetPct = Math.min(100, Math.max(0, p));
      if (!rafHandle) rafHandle = requestAnimationFrame(animatePct);
    }

    function removeOverlay() {
      if (intervalHandle) clearInterval(intervalHandle);
      if (safetyTimeout)  clearTimeout(safetyTimeout);
      setBarPct(100);
      function waitForComplete() {
        if (Math.round(displayedPct) >= 100) {
          setTimeout(function () {
            if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
          }, 300);
        } else {
          requestAnimationFrame(waitForComplete);
        }
      }
      requestAnimationFrame(waitForComplete);
    }

    var phase1Value = 0;
    intervalHandle = setInterval(function () {
      phase1Value += (85 - phase1Value) * 0.08;
      setBarPct(phase1Value);
    }, 180);

    if (window.NVCC._widgetReadyQueued) {
      window.NVCC._widgetReadyQueued = false;
      removeOverlay();
      return;
    }
    window.NVCC._widgetReadyCallback = removeOverlay;

    safetyTimeout = setTimeout(function () {
      window.NVCC._widgetReadyCallback = null;
      removeOverlay();
    }, 10000);
  };

  // Backward-compatible alias
  window.nvccShowUserDetailsOverlay = window.nvccShowFormOverlay;

})();
