(function () {

  // ─── EARLY WIDGET MESSAGE LISTENER ───────────────────────────────────────────
  // Registered immediately — before any form detection — to avoid a race
  // condition where the widget iframe sends nvcc-widget-ready before the
  // overlay's own listener is attached. The callback is stored and invoked
  // by nvccShowFormOverlay() when it's ready to receive the signal.
  var _widgetReadyCallback = null;
  var _widgetReadyReceived = false;

  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'nvcc-widget-ready') return;
    _widgetReadyReceived = true;
    if (typeof _widgetReadyCallback === 'function') {
      _widgetReadyCallback();
      _widgetReadyCallback = null;
    }
  });

  // ─── SEARCH BAR ──────────────────────────────────────────────────────────────
  if (
    window.location.pathname.toLowerCase() === "/sbtdclient/413/portal/1836/home-1" ||
    window.location.pathname.toLowerCase() === "/sbtdclient/413/portal/home/" ||
    window.location.pathname.toLowerCase() === "/sbtdclient/413/portal/1944/home-v3"
  ) {
    var searchBox = document.querySelector("div.pull-left.topLevelSearch.input-group");
    if (searchBox) searchBox.style.display = "none";
  }

  // ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
  var style = document.createElement("style");
  style.textContent = [
    '@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600;700&display=swap");',
    ".pull-right > .dropdown-menu { right: 6px !important; }",
    "form.js-entry-form [id^=\"static-\"][data-fieldtype=\"static_content\"] { margin-bottom: 0 !important; }",
    "div.pull-left.topLevelSearch.input-group { margin-top: 6px !important; }",
    "#ctl00_mainNav, #ctl00_ctl00_mainNav, #mainNav { border-bottom-width: 4px !important; }",
    '#ctl00_mainNav .navbar-nav > li > a, #ctl00_mainNav .navbar-nav > li > a:visited, #ctl00_ctl00_mainNav .navbar-nav > li > a, #ctl00_ctl00_mainNav .navbar-nav > li > a:visited, #mainNav .navbar-nav > li > a, #mainNav .navbar-nav > li > a:visited { font-family: "Libre Franklin", "Helvetica Neue", Arial, sans-serif !important; font-weight: 600 !important; font-size: 13.5px !important; letter-spacing: 0.02em !important; color: #fff !important; border-radius: 5px !important; margin: 9px 1px !important; padding: 7px 12px !important; transition: background 0.15s ease, color 0.15s ease !important; }',
    "#ctl00_mainNav .navbar-nav > li > a:hover, #ctl00_mainNav .navbar-nav > li > a:focus, #ctl00_ctl00_mainNav .navbar-nav > li > a:hover, #ctl00_ctl00_mainNav .navbar-nav > li > a:focus, #mainNav .navbar-nav > li > a:hover, #mainNav .navbar-nav > li > a:focus, .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus, .navbar-default .navbar-nav li a:hover, .navbar-default .navbar-nav li a:focus, .themed.tdbar-button-anchored a:hover, .themed.tdbar-button-anchored a:focus, .tdbar .navbar-nav > li > a:hover, .tdbar .navbar-nav > li > a:focus { background-color: transparent !important; background: transparent !important; }",
    "#ctl00_mainNav .navbar-nav > li:not(.active) > a:hover, #ctl00_mainNav .navbar-nav > li:not(.active) > a:focus, #ctl00_ctl00_mainNav .navbar-nav > li:not(.active) > a:hover, #ctl00_ctl00_mainNav .navbar-nav > li:not(.active) > a:focus, #mainNav .navbar-nav > li:not(.active) > a:hover, #mainNav .navbar-nav > li:not(.active) > a:focus { background: rgba(255,255,255,0.12) !important; color: #fff !important; }",
    "#ctl00_mainNav .navbar-nav > .active > a, #ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_mainNav .navbar-nav > .active > a:focus, #ctl00_ctl00_mainNav .navbar-nav > .active > a, #ctl00_ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_ctl00_mainNav .navbar-nav > .active > a:focus, #mainNav .navbar-nav > .active > a, #mainNav .navbar-nav > .active > a:hover, #mainNav .navbar-nav > .active > a:focus, .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:active, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus, .themed.tdbar-button-anchored.active a, .themed.tdbar-button-anchored.active a:hover, .themed.tdbar-button-anchored.active a:focus { background-color: transparent !important; background: transparent !important; font-weight: 600 !important; }",
    "#ctl00_mainNav .navbar-nav > .active > a, #ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_mainNav .navbar-nav > .active > a:focus, #ctl00_ctl00_mainNav .navbar-nav > .active > a, #ctl00_ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_ctl00_mainNav .navbar-nav > .active > a:focus, #mainNav .navbar-nav > .active > a, #mainNav .navbar-nav > .active > a:hover, #mainNav .navbar-nav > .active > a:focus { background: #ffc20d !important; color: #1c4127 !important; font-weight: 700 !important; }",
    ".themed.tdbar-button-anchored:hover, .themed.tdbar-button-anchored a:hover, .themed.tdbar-button-anchored:focus, .themed.tdbar-button-anchored a:focus { background-color: transparent !important; background: transparent !important; }",
  ].join(" ");
  document.head.appendChild(style);

  // ─── NAVSHIM SYNC ────────────────────────────────────────────────────────────
  var header = document.getElementById('divMstrHeader');
  var navShim = document.getElementById('navShim');
  if (header && navShim) {
    var resizeObserver = new ResizeObserver(function () {
      navShim.style.paddingTop = header.offsetHeight + 'px';
    });
    resizeObserver.observe(header);
  }

  // ─── AUTOFOCUS PREVENTION ────────────────────────────────────────────────────
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
      window.jQuery.datepicker._curInst = null;
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
      document.addEventListener(evt, function () {
        userInteracted = true;
      }, { once: true, capture: true });
    });

    var observer = new MutationObserver(function () {
      if (!userInteracted && dpDiv.style.display !== 'none') {
        suppressAutoFocus();
      }
    });

    observer.observe(dpDiv, { attributes: true, attributeFilter: ['style'] });
    setTimeout(function () { observer.disconnect(); }, 3000);
  })();

  // ─── CONFIGURATION ───────────────────────────────────────────────────────────
  var CONFIG = {
    hideLastModified: [
      'customer engagement / test - release ticket'
    ]
  };

  // ─── HIDE LAST MODIFIED ──────────────────────────────────────────────────────
  var serviceEl = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divService div');
  if (serviceEl) {
    var service = serviceEl.textContent.trim().toLowerCase();
    if (CONFIG.hideLastModified.some(function (s) { return service.indexOf(s) !== -1; })) {
      var lastModified = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divModified');
      if (lastModified) lastModified.style.display = 'none';
    }
  }

  // ─── HR OL&D PAGE ────────────────────────────────────────────────────────────
  if (window.location.pathname.toLowerCase().indexOf('/sbtdclient/413/portal/requests/servicecatalog/category/3374') !== -1) {

    var nativePanel = document.getElementById('ctl00_ctl00_cpContent_cpContent_UpdatePanel1');
    if (nativePanel) nativePanel.style.display = 'none';

    var customBlock = document.createElement('div');
    customBlock.id = 'nvcc-old-custom';
    customBlock.innerHTML = [
      '<style>',
        '#nvcc-old-custom { font-family: "Libre Franklin", "Helvetica Neue", Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #1a1a1a; margin-bottom: 8px; }',
        '#nvcc-old-custom .old-eyebrow { display: flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: #946f00; margin-bottom: 10px; }',
        '#nvcc-old-custom .old-intro { margin-bottom: 20px; color: #333; font-size: 14px; }',
        '#nvcc-old-custom .old-callout { background: #fff8e1; border-left: 4px solid #c99600; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; font-size: 13.5px; }',
        '#nvcc-old-custom .old-callout-label { font-weight: 700; color: #1a1a1a; }',
        '#nvcc-old-custom .old-callout ul { margin: 8px 0 0 0; padding-left: 20px; list-style: disc; }',
        '#nvcc-old-custom .old-callout li { margin-bottom: 4px; color: #333; }',
        '#nvcc-old-custom .old-callout li strong { color: #1a1a1a; }',
        '#nvcc-old-custom .old-submit { margin-bottom: 20px; font-size: 14px; color: #333; }',
        '#nvcc-old-custom .old-section-head { font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #046a38; border-bottom: 2px solid #e8f2ec; padding-bottom: 6px; margin-bottom: 12px; }',
        '#nvcc-old-custom .old-cards { display: flex; flex-direction: column; gap: 10px; }',
        '#nvcc-old-custom .old-card { display: flex; align-items: center; gap: 14px; padding: 14px 16px; background: #fff; border: 1px solid #dde3e0; border-left: 4px solid #046a38; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); text-decoration: none; color: #1a1a1a; transition: border-left-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease; }',
        '#nvcc-old-custom .old-card:hover, #nvcc-old-custom .old-card:focus { border-left-color: #ffc20d; box-shadow: 0 4px 12px rgba(0,0,0,0.10); transform: translateY(-2px); text-decoration: none; outline: none; }',
        '#nvcc-old-custom .old-card:focus-visible { outline: 2px solid #046a38; outline-offset: 2px; }',
        '#nvcc-old-custom .old-chip { width: 44px; height: 44px; min-width: 44px; border-radius: 8px; background: #e8f2ec; display: flex; align-items: center; justify-content: center; color: #046a38; font-size: 18px; transition: background 0.2s ease, color 0.2s ease; }',
        '#nvcc-old-custom .old-card:hover .old-chip, #nvcc-old-custom .old-card:focus .old-chip { background: #046a38; color: #fff; }',
        '#nvcc-old-custom .old-card-title { font-weight: 700; font-size: 14px; color: #046a38; line-height: 1.3; }',
        '#nvcc-old-custom .old-card:hover .old-card-title { color: #1c4127; }',
      '</style>',
      '<p class="old-eyebrow" aria-hidden="true">',
        '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>',
        'Human Resources &mdash; OL&amp;D',
      '</p>',
      '<p class="old-intro">Northern Virginia Community College (NOVA) offers educational support programs that allow employees to pursue professional and academic development through <strong>external courses</strong> or <strong>NOVA credit courses</strong>.</p>',
      '<div class="old-callout" role="note">',
        '<span class="old-callout-label">&#9889; Quick Decision Guide</span> &mdash; There are <strong>two types of assistance available</strong>:',
        '<ul>',
          '<li><strong>NOVA Credit Courses (Continuous Learning Program)</strong> &mdash; For courses taken at NOVA at no cost</li>',
          '<li><strong>External Course Tuition Assistance</strong> &mdash; For courses taken outside NOVA</li>',
        '</ul>',
      '</div>',
      '<p class="old-submit"><strong>Submit your requests</strong> to Organizational Learning and Development (OL&amp;D) Human Resources team for processing.</p>',
      '<div class="old-section-head">Submit a Request</div>',
      '<div class="old-cards">',
        '<a class="old-card" href="/SBTDClient/413/Portal/Requests/Service/10750/Employee-Educational-Assistance-Request-NOVA-Credit-Course">',
          '<div class="old-chip" aria-hidden="true"><span class="fa-solid fa-graduation-cap"></span></div>',
          '<div class="old-card-title">Educational Assistance &mdash; NOVA Credit Course</div>',
        '</a>',
        '<a class="old-card" href="/SBTDClient/413/Portal/Requests/Service/10722/Employee-Educational-Assistance-Request-External-Course">',
          '<div class="old-chip" aria-hidden="true"><span class="fa-solid fa-building-columns"></span></div>',
          '<div class="old-card-title">Educational Assistance &mdash; External Course</div>',
        '</a>',
      '</div>',
    ].join('');

    var divCats = document.getElementById('divCats');
    if (divCats && nativePanel) {
      divCats.insertBefore(customBlock, nativePanel);
    } else if (divCats) {
      divCats.insertBefore(customBlock, divCats.firstChild);
    }

    var sidebarButtons = document.createElement('div');
    sidebarButtons.id = 'nvcc-old-sidebar';
    sidebarButtons.innerHTML = [
      '<span><a class="DetailAction" href="/SBTDClient/413/Portal/Requests/Service/10750/Employee-Educational-Assistance-Request-NOVA-Credit-Course"><span class="fa-solid fa-circle-right fa-fw" aria-hidden="true"></span>Educational Assistance - NOVA Credit</a></span>',
      '<span><a class="DetailAction" href="/SBTDClient/413/Portal/Requests/Service/10722/Employee-Educational-Assistance-Request-External-Course"><span class="fa-solid fa-circle-right fa-fw" aria-hidden="true"></span>Educational Assistance - External Courses</a></span>',
      '<span><a class="DetailAction" href="/SBTDClient/413/Portal/Requests/Service/12049/HR-Organizational-Learning-and-Development-Help/Request"><span class="fa-solid fa-circle-right fa-fw" aria-hidden="true"></span>Contact OL&amp;D Team</a></span>',
    ].join('');

    var divCatsSidebar = document.getElementById('divCatsSidebar');
    if (divCatsSidebar) {
      divCatsSidebar.insertBefore(sidebarButtons, divCatsSidebar.firstChild);
    }
  }

  // ─── FORM CONTENT OVERLAY ────────────────────────────────────────────────────
  // Universal loading overlay for any form page that embeds an iframe widget
  // (user details banner, release notes cards, etc.). Shows while the iframe
  // renders its content, then dismisses automatically.
  //
  // Detection: listens for a postMessage of { type: 'nvcc-widget-ready' } sent
  // by the widget iframe once it has finished rendering (content, error, or
  // empty state). This is deterministic regardless of content height or timing.
  // Safety timeout at 10s removes overlay regardless.
  //
  // Usage: window.nvccShowFormOverlay()
  window.nvccShowFormOverlay = function () {
    var headerHeight = document.getElementById('divMstrHeader')
      ? document.getElementById('divMstrHeader').offsetHeight
      : 0;

    var overlay = document.createElement('div');
    overlay.id = 'nvcc-form-overlay';
    overlay.style.cssText = [
      'position: fixed',
      'top: ' + headerHeight + 'px',
      'left: 0',
      'width: 100%',
      'height: calc(100% - ' + headerHeight + 'px)',
      'background: #fff',
      'z-index: 998',
      'display: flex',
      'align-items: center',
      'justify-content: center'
    ].join(';');
    overlay.innerHTML = [
      '<div style="width:320px; text-align:center;">',
        '<div style="color:#046a38; font-size:15px; font-weight:600; margin-bottom:12px;">Loading form content...</div>',
        '<div style="background:#d4e6da; border-radius:4px; height:8px; overflow:hidden; margin-bottom:6px;">',
          '<div id="nvcc-form-overlay-bar" style="height:100%; width:0%; background:#046a38; border-radius:4px;"></div>',
        '</div>',
        '<div id="nvcc-form-overlay-pct" style="color:#595959; font-size:13px;">0%</div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var barEl = document.getElementById('nvcc-form-overlay-bar');
    var pctEl = document.getElementById('nvcc-form-overlay-pct');

    var displayedPct   = 0;
    var targetPct      = 0;
    var rafHandle      = null;
    var intervalHandle = null;
    var safetyTimeout  = null;

    function animatePct() {
      if (displayedPct < targetPct - 0.1) {
        var step = Math.max(0.4, (targetPct - displayedPct) * 0.08);
        displayedPct = Math.min(targetPct, displayedPct + step);
        var rounded = Math.round(displayedPct);
        barEl.style.width = rounded + '%';
        pctEl.textContent = rounded + '%';
        rafHandle = requestAnimationFrame(animatePct);
      } else {
        var rounded = Math.round(targetPct);
        barEl.style.width = rounded + '%';
        pctEl.textContent = rounded + '%';
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

    // Phase 1 — asymptotic crawl to 85% while waiting
    var phase1Value = 0;
    intervalHandle = setInterval(function () {
      phase1Value += (85 - phase1Value) * 0.08;
      setBarPct(phase1Value);
    }, 180);

    // Connect to the early message listener registered at IIFE startup.
    // If the widget already sent nvcc-widget-ready before we got here
    // (race condition on fast connections), _widgetReadyReceived will be
    // true and we dismiss immediately. Otherwise we store the callback
    // for when the message arrives.
    if (_widgetReadyReceived) {
      removeOverlay();
      return;
    }
    _widgetReadyCallback = removeOverlay;

    // Safety timeout — remove after 10s regardless
    safetyTimeout = setTimeout(function () {
      _widgetReadyCallback = null;
      removeOverlay();
    }, 10000);
  };

  // Keep backward-compatible alias in case anything still references the old name
  window.nvccShowUserDetailsOverlay = window.nvccShowFormOverlay;

  // ─── LOTTINGEM.COM TRACKER REMOVAL ───────────────────────────────────────────
  document.querySelectorAll('script[src*="lottingem.com"]').forEach(function (s) {
    s.parentNode.removeChild(s);
  });

  // ─── NOVA CREDIT COURSE FORM — DATE VALIDATION ───────────────────────────────
  // Form ID 12522
  (function () {
    var formIdEl = document.getElementById('FormID');
    if (!formIdEl || formIdEl.value !== '12522') return;

    var START_DATE_ID = 'attribute494';
    var END_DATE_ID   = 'attribute37355';

    var HIDDEN_FIELD_GROUPS = [
      'attribute37356-grp',
      'attribute37357-grp',
      'attribute37358-grp',
      'attribute37359-grp',
      'attribute33862-grp',
      'attribute33865-grp',
      'attribute37360-grp',
    ];

    var validationStyle = document.createElement('style');
    validationStyle.textContent =
      '.nvcc-date-error {' +
        'color: #8b0000;' +
        'background: #fff4f2;' +
        'border-left: 4px solid #8b0000;' +
        'border-radius: 4px;' +
        'padding: 8px 12px;' +
        'margin-top: 6px;' +
        'font-size: 13.5px;' +
        'font-weight: 500;' +
        'line-height: 1.5;' +
      '}';
    document.head.appendChild(validationStyle);

    function disableSubmit() {
      var btn = document.getElementById('btnSubmit');
      if (btn) btn.disabled = true;
    }

    function enableSubmit() {
      var btn = document.getElementById('btnSubmit');
      if (btn) btn.disabled = false;
    }

    function getToday() {
      var d = new Date();
      d.setHours(0, 0, 0, 0);
      return d;
    }

    function parseDate(val) {
      if (!val || !val.trim()) return null;
      var parts = val.trim().split('/');
      if (parts.length !== 3) return null;
      var m = parseInt(parts[0], 10);
      var d = parseInt(parts[1], 10);
      var y = parseInt(parts[2], 10);
      if (isNaN(m) || isNaN(d) || isNaN(y) || y < 1900) return null;
      var date = new Date(y, m - 1, d);
      date.setHours(0, 0, 0, 0);
      if (date.getMonth() !== m - 1) return null;
      return date;
    }

    function businessDaysBetween(from, to) {
      var count = 0;
      var current = new Date(from.getTime());
      current.setDate(current.getDate() + 1);
      while (current <= to) {
        var day = current.getDay();
        if (day !== 0 && day !== 6) count++;
        current.setDate(current.getDate() + 1);
      }
      return count;
    }

    function calendarDaysBetween(from, to) {
      return Math.round((to - from) / (1000 * 60 * 60 * 24));
    }

    function setError(groupId, errorId, message) {
      var group = document.getElementById(groupId);
      if (!group) return;
      var existing = document.getElementById(errorId);
      if (message) {
        if (!existing) {
          var el = document.createElement('div');
          el.id = errorId;
          el.className = 'nvcc-date-error';
          el.setAttribute('role', 'alert');
          el.setAttribute('aria-live', 'polite');
          group.appendChild(el);
          existing = el;
        }
        existing.textContent = message;
      } else {
        if (existing) existing.parentNode.removeChild(existing);
      }
    }

    function clearError(errorId) {
      var el = document.getElementById(errorId);
      if (el && el.parentNode) el.parentNode.removeChild(el);
    }

    function showRemainingFields() {
      HIDDEN_FIELD_GROUPS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = '';
      });
      enableSubmit();
    }

    function hideRemainingFields() {
      HIDDEN_FIELD_GROUPS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      disableSubmit();
    }

    hideRemainingFields();
    enableSubmit();

    // Show universal overlay while user details banner iframe loads
    window.nvccShowFormOverlay();

    function validateStartDate() {
      var startInput = document.getElementById(START_DATE_ID);
      if (!startInput) return;

      var val     = startInput.value;
      var date    = parseDate(val);
      var today   = getToday();
      var errorId = 'nvcc-start-date-error';

      if (!val || !val.trim()) {
        clearError(errorId);
        hideRemainingFields();
        enableSubmit();
        return;
      }

      if (!date) {
        clearError(errorId);
        hideRemainingFields();
        return;
      }

      var calDays = calendarDaysBetween(today, date);
      var bizDays = businessDaysBetween(today, date);

      if (date <= today) {
        setError('attribute494-grp', errorId,
          'Based on the course start date entered, this request is not eligible for approval. ' +
          'Requests must be submitted before the course start date. ' +
          'Please enter a future course start date to continue.');
        hideRemainingFields();
        return;
      }

      if (bizDays < 5) {
        setError('attribute494-grp', errorId,
          'Based on the course start date entered, this request is not eligible for approval. ' +
          'Requests must be submitted at least 5 business days before the course start date.');
        hideRemainingFields();
        return;
      }

      if (calDays > 30) {
        setError('attribute494-grp', errorId,
          'Requests cannot be submitted more than 30 days before the course start date.');
        hideRemainingFields();
        return;
      }

      clearError(errorId);
      showRemainingFields();
      validateEndDate();
    }

    function validateEndDate() {
      var startInput = document.getElementById(START_DATE_ID);
      var endInput   = document.getElementById(END_DATE_ID);
      if (!startInput || !endInput) return;

      var startDate = parseDate(startInput.value);
      var endDate   = parseDate(endInput.value);
      var errorId   = 'nvcc-end-date-error';

      if (!endDate || !startDate) {
        clearError(errorId);
        var firstField = document.getElementById('attribute37356-grp');
        if (firstField && firstField.style.display !== 'none') {
          enableSubmit();
        }
        return;
      }

      if (endDate <= startDate) {
        setError('attribute37355-grp', errorId,
          'Course end date must be after the selected course start date.');
        disableSubmit();
      } else {
        clearError(errorId);
        enableSubmit();
      }
    }

    var startInput = document.getElementById(START_DATE_ID);
    var endInput   = document.getElementById(END_DATE_ID);

    if (startInput) {
      startInput.addEventListener('change', validateStartDate);
      startInput.addEventListener('input',  validateStartDate);
      if (window.jQuery) {
        window.jQuery(startInput).on('change', validateStartDate);
      }
    }

    if (endInput) {
      endInput.addEventListener('change', validateEndDate);
      endInput.addEventListener('input',  validateEndDate);
      if (window.jQuery) {
        window.jQuery(endInput).on('change', validateEndDate);
      }
    }

  })();

  // ─── FORM PREFILL ────────────────────────────────────────────────────────────
  (function () {
    var params = new URLSearchParams(window.location.search);
    var ticketId = params.get('prefill');
    if (!ticketId) return;

    var staticEl = document.querySelector('[data-fieldtype="static_content"] [style*="display: none"]');
    if (!staticEl) return;

    var domConfig;
    try {
      domConfig = JSON.parse(staticEl.textContent.trim());
    } catch (e) {
      return;
    }

    var mapping = domConfig.prefill;
    if (!mapping || !mapping.fields || !mapping.fields.length) return;

    var appIdMatch = document.body.innerHTML.match(/"forAppId":(\d+)/);
    if (!appIdMatch) return;
    var appId = appIdMatch[1];

    var P1_CAP       = 30;
    var P2_START     = 30;
    var displayedPct = 0;
    var targetPct    = 0;
    var rafHandle    = null;
    var phase1Interval = null;

    var headerHeight = document.getElementById('divMstrHeader')
      ? document.getElementById('divMstrHeader').offsetHeight
      : 0;

    var overlay = document.createElement('div');
    overlay.style.cssText = [
      'position: fixed',
      'top: ' + headerHeight + 'px',
      'left: 0',
      'width: 100%',
      'height: calc(100% - ' + headerHeight + 'px)',
      'background: #fff',
      'z-index: 998',
      'display: flex',
      'align-items: center',
      'justify-content: center'
    ].join(';');
    overlay.innerHTML = [
      '<div style="width:320px; text-align:center;">',
        '<div style="color:#046a38; font-size:15px; font-weight:600; margin-bottom:12px;">Prefilling form data...</div>',
        '<div style="background:#d4e6da; border-radius:4px; height:8px; overflow:hidden; margin-bottom:6px;">',
          '<div id="nvcc-prefill-bar" style="height:100%; width:0%; background:#046a38; border-radius:4px;"></div>',
        '</div>',
        '<div id="nvcc-prefill-pct" style="color:#595959; font-size:13px;">0%</div>',
      '</div>'
    ].join('');

    document.body.appendChild(overlay);

    var barEl = document.getElementById('nvcc-prefill-bar');
    var pctEl = document.getElementById('nvcc-prefill-pct');

    function animatePct() {
      if (displayedPct < targetPct - 0.1) {
        var step = Math.max(0.4, (targetPct - displayedPct) * 0.08);
        displayedPct = Math.min(targetPct, displayedPct + step);
        var rounded = Math.round(displayedPct);
        barEl.style.width = rounded + '%';
        pctEl.textContent = rounded + '%';
        rafHandle = requestAnimationFrame(animatePct);
      } else {
        var rounded = Math.round(targetPct);
        barEl.style.width = rounded + '%';
        pctEl.textContent = rounded + '%';
        displayedPct = targetPct;
        rafHandle = null;
      }
    }

    function setBarPct(p) {
      targetPct = Math.min(100, Math.max(0, p));
      if (!rafHandle) rafHandle = requestAnimationFrame(animatePct);
    }

    var phase1Value = 0;
    phase1Interval = setInterval(function () {
      var remaining = P1_CAP - phase1Value;
      phase1Value  += remaining * 0.12;
      setBarPct(phase1Value);
    }, 180);

    var url = '/SBTDNext/Apps/' + appId + '/Tickets/TicketDet?TicketID=' + ticketId;

    fetch(url, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('Ticket fetch failed: ' + res.status);
        return res.text();
      })
      .then(function (html) {
        clearInterval(phase1Interval);
        phase1Interval = null;
        setBarPct(P2_START);

        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var populated = 0;
        var failed = [];
        var total = mapping.fields.length;

        mapping.fields.forEach(function (field) {
          var value = '';

          if (field.ticketAttr === 'title') {
            var titleEl = doc.querySelector('#thTicket_spnTitle');
            if (titleEl) value = titleEl.textContent.trim();

          } else if (field.ticketAttr === 'description') {
            var descEl = doc.querySelector('#divDescription .wrap-text');
            if (descEl) value = descEl.innerHTML.trim();

          } else {
            var attrEl = doc.querySelector('#ctlAttribute' + field.ticketAttr + ' .wrap-text');
            if (attrEl) {
              value = (field.type === 'multiselect')
                ? attrEl.innerHTML.trim()
                : attrEl.textContent.trim();
            }
          }

          if (!value) {
            failed.push(field.ticketAttr);

          } else if (field.ticketAttr === 'description') {
            var editorKey = 'attribute' + field.formAttr + '_Content';
            if (window.CKEDITOR && window.CKEDITOR.instances[editorKey]) {
              window.CKEDITOR.instances[editorKey].setData(value);
              populated++;
            } else {
              failed.push(field.formAttr);
            }

          } else if (field.type === 'radio') {
            var radios = document.querySelectorAll('input[name="attribute' + field.formAttr + '"]');
            var matched = false;
            radios.forEach(function (radio) {
              var label = document.querySelector('label[for="' + radio.id + '"]');
              if (label && label.textContent.trim() === value.trim()) {
                radio.checked = true;
                radio.dispatchEvent(new Event('change', { bubbles: true }));
                matched = true;
              }
            });
            if (matched) { populated++; } else { failed.push(field.formAttr); }

          } else if (field.type === 'multiselect' && field.choices) {
            var lines = value.split(/<br\s*\/?>/i).map(function (s) { return s.trim(); }).filter(Boolean);
            var ids = [];
            lines.forEach(function (line) {
              if (field.choices[line]) ids.push(field.choices[line]);
            });
            if (ids.length && window.jQuery) {
              window.jQuery('#attribute' + field.formAttr).val(ids).trigger('change');
              populated++;
            } else {
              failed.push(field.formAttr);
            }

          } else {
            var input = document.querySelector('#attribute' + field.formAttr);
            if (input) {
              input.value = value;
              input.dispatchEvent(new Event('change', { bubbles: true }));
              populated++;
            } else {
              failed.push(field.formAttr);
            }
          }

          var realPct = (populated + failed.length) / total;
          setBarPct(P2_START + realPct * (100 - P2_START));
        });

        function waitForComplete() {
          if (Math.round(displayedPct) >= 100) {
            setTimeout(function () {
              if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
              showPrefillBanner(ticketId, populated, failed);
            }, 400);
          } else {
            requestAnimationFrame(waitForComplete);
          }
        }
        setBarPct(100);
        requestAnimationFrame(waitForComplete);
      })
      .catch(function (err) {
        clearInterval(phase1Interval);
        if (overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
        showPrefillBanner(ticketId, 0, [], err.message);
      });

    function showPrefillBanner(ticketId, populated, failed, errorMsg) {
      var banner = document.createElement('div');
      banner.style.cssText = [
        'margin: 16px 0',
        'padding: 12px 16px',
        'border-radius: 6px',
        'font-size: 14px',
        'font-weight: 500',
        'border-left: 4px solid'
      ].join(';');

      var ticketLink = 'ticket <a href="/SBTDClient/413/Portal/Requests/TicketRequests/TicketDet?TicketID=' + ticketId + '" target="_blank" style="color: inherit; text-decoration: underline;">#' + ticketId + '</a>';

      if (errorMsg) {
        banner.style.background = '#fff4f2';
        banner.style.borderLeftColor = '#742a2a';
        banner.style.color = '#742a2a';
        banner.innerHTML = 'Could not prefill form: ' + errorMsg;
      } else if (failed.length === 0) {
        banner.style.background = '#e8f2ec';
        banner.style.borderLeftColor = '#046a38';
        banner.style.color = '#1c4127';
        banner.innerHTML = 'Form prefilled from ' + ticketLink + '. Please review before submitting.';
      } else if (populated > 0) {
        banner.style.background = '#fff8e1';
        banner.style.borderLeftColor = '#c99600';
        banner.style.color = '#1c4127';
        banner.innerHTML = 'Form partially prefilled from ' + ticketLink + '. ' + failed.length + ' field(s) could not be populated.';
      } else {
        banner.style.background = '#fff4f2';
        banner.style.borderLeftColor = '#742a2a';
        banner.style.color = '#742a2a';
        banner.innerHTML = 'Prefill failed — no fields could be populated from ' + ticketLink + '.';
      }

      var form = document.querySelector('form.js-entry-form');
      if (form) form.insertBefore(banner, form.firstChild);
    }
  })();

  // ─── RELEASE NOTES FORM ──────────────────────────────────────────────────────
  // Form ID 12356 — Release Notes Updates.
  // The release notes widget is embedded as an iframe in a Static Content field.
  // TDX injects Static Content iframes after the form DOM is ready, so we use a
  // MutationObserver to detect when the iframe appears, then hand off to the
  // universal overlay which watches its height changes for dismissal.
  (function () {
    var formIdEl = document.getElementById('FormID');
    if (!formIdEl || formIdEl.value !== '12356') return;

    // Show universal overlay — dismisses when the release notes widget
    // sends its nvcc-widget-ready postMessage signal.
    window.nvccShowFormOverlay();

  })();

})();