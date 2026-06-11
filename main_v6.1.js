(function () {

  // ─── SEARCH BAR ──────────────────────────────────────────────────────────────
  // Hide the header search bar on home pages only — these pages have their own
  // dedicated search bar in the content, so the header one is redundant.
  if (
    window.location.pathname.toLowerCase() === "/sbtdclient/413/portal/1836/home-1" ||
    window.location.pathname.toLowerCase() === "/sbtdclient/413/portal/home/" ||
    window.location.pathname.toLowerCase() === "/sbtdclient/413/portal/1944/home-v3"
  ) {
    var searchBox = document.querySelector("div.pull-left.topLevelSearch.input-group");
    if (searchBox) searchBox.style.display = "none";
  }

  // ─── PROFILE / SIGN IN BUTTON ────────────────────────────────────────────────
  // TDX renders this button differently depending on auth state and page type:
  //   - Signed in (standard pages):  #btnUserProfileMenu
  //   - Signed in (dashboard pages): button.settings-button.dropdown-toggle (no ID)
  //   - Signed out:                  div[title="Sign In"] a
  // We try each selector in order and style whichever one exists.
  // var signIn =
  //   document.querySelector("#btnUserProfileMenu") ||
  //   document.querySelector("button.settings-button.dropdown-toggle") ||
  //   document.querySelector('div[title="Sign In"] a');
  // if (signIn) {
  //   signIn.style.cssText = [
  //     "display: inline-flex !important",
  //     "align-items: center",
  //     "gap: 6px",
  //     "padding: 7px 16px !important",
  //     "background: #046a38 !important",
  //     "color: #fff !important",
  //     "font-weight: 600",
  //     "font-size: 14px",
  //     "border-radius: 6px !important",
  //     "border: none",
  //     "cursor: pointer",
  //     "text-decoration: none",
  //     "transition: background 0.2s ease",
  //     "white-space: nowrap",
  //   ].join(";");
  //   signIn.addEventListener("mouseenter", function () {
  //     signIn.style.setProperty('background', '#1c4127', 'important');
  //   });
  //   signIn.addEventListener("mouseleave", function () {
  //     signIn.style.setProperty('background', '#046a38', 'important');
  //   });
  // }

  // ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
  // Injected as a <style> tag so pseudo-selectors and cascade overrides work.
  // TDX renders the navbar with different IDs depending on the page context:
  //   - Standard portal pages:       #ctl00_mainNav
  //   - Service Catalog / KB pages:  #ctl00_ctl00_mainNav  (extra nesting level)
  //   - Dashboard pages:             #mainNav              (different master page)
  // All three are targeted in every rule below.
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
  // TDX sets #navShim padding-top on load to compensate for the fixed header,
  // but a brief timing gap between initial render and the load event causes
  // visible content shift. ResizeObserver watches #divMstrHeader for any height
  // changes (fonts loading, sandbox banner, CKEditor toolbar, etc.) and syncs
  // the shim immediately instead of waiting for TDX's load event handler.
  var header = document.getElementById('divMstrHeader');
  var navShim = document.getElementById('navShim');
  if (header && navShim) {
    var resizeObserver = new ResizeObserver(function () {
      navShim.style.paddingTop = header.offsetHeight + 'px';
    });
    resizeObserver.observe(header);
  }

  // ─── AUTOFOCUS PREVENTION ────────────────────────────────────────────────────
  // TDX auto-focuses the first field on load; if it's a datepicker, jQuery UI
  // opens the calendar. The catch: jQuery UI tracks the opened input in its
  // internal $.datepicker._lastInput, and its _showDatepicker() ignores clicks
  // on an input that equals _lastInput (to prevent reopen-on-close). So simply
  // hiding the div leaves _lastInput pointing at the field, and the first click
  // is a no-op — the user has to click away (which resets _lastInput) then back.
  // Fix: hide the calendar, blur the input, AND reset jQuery UI's internal state
  // so the very first click opens the calendar normally.
  var suppressAutoFocus = function () {
    var focused = document.activeElement;
    if (focused && focused !== document.body && focused !== document.documentElement) {
      focused.blur();
    }

    var dpDiv = document.getElementById('ui-datepicker-div');
    if (dpDiv) dpDiv.style.display = 'none';

    // Reset jQuery UI datepicker internal state — without this the first click
    // on the auto-focused field is ignored (jQuery UI thinks it's still "open").
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

  // Delayed passes catch datepicker opened by async content (iframes, late init)
  setTimeout(suppressAutoFocus, 100);
  setTimeout(suppressAutoFocus, 300);
  setTimeout(suppressAutoFocus, 600);

  // Safety net: if the calendar opens before any user interaction, suppress it
  // (also resetting jQuery UI state so the next click works).
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
  // Central control panel for portal-wide conditional logic.
  // Form-level configuration (e.g. prefill mappings) lives on each form itself
  // via a hidden static content widget — see FORM PREFILL section below.
  var CONFIG = {

    // Services/forms where "Last Modified" should be hidden on ticket detail pages.
    // Matched as a substring against the service field text, so partial names work.
    hideLastModified: [
      'customer engagement / test - release ticket'
    ]

  };

  // ─── HIDE LAST MODIFIED ──────────────────────────────────────────────────────
  // On ticket detail pages, TDX always shows a "Last Modified" timestamp.
  // For certain services this is irrelevant or confusing for end users, so we
  // suppress it based on the service/form combination in the CONFIG above.
  var serviceEl = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divService div');
  if (serviceEl) {
    var service = serviceEl.textContent.trim().toLowerCase();
    if (CONFIG.hideLastModified.some(function (s) { return service.indexOf(s) !== -1; })) {
      var lastModified = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divModified');
      if (lastModified) lastModified.style.display = 'none';
    }
  }

  // ─── HR OL&D PAGE ────────────────────────────────────────────────────────────
  // Replaces the native TDX services list on the Organizational Learning and
  // Development category page with a custom styled content block. The native
  // list is hidden; custom HTML is injected before it in the same column.
  //
  // URL: /SBTDClient/413/Portal/Requests/ServiceCatalog/Category/3374/
  // Uses indexOf to match regardless of the slug TDX appends to the path.
  // Cards and sidebar buttons link to the respective service pages.
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

    // Inject shortcut buttons into the sidebar (#divCatsSidebar).
    // These mirror TDX's native DetailAction button style (same class, same icon
    // family) so they blend with the existing New Service / New Category buttons
    // that dev/admin users see above them.
    // All users see these; devs additionally see the native TDX buttons above.
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

  // ─── USER DETAILS OVERLAY ────────────────────────────────────────────────────
  // Shows a loading overlay with a progress bar while the user details banner
  // iframe finishes rendering. Reusable — call nvccShowUserDetailsOverlay() on
  // any form page that includes the user details banner.
  //
  // Detection: the banner iframe starts with a fixed inline height set by TDX,
  // then gets resized by the banner's own resize script after each state change.
  // We count height changes and dismiss on the second — first = loading state,
  // second = final content/error/auth-refresh state.
  //
  // Progress: asymptotic crawl to 85% while waiting, completes to 100% on
  // detection. Safety timeout at 8s removes the overlay regardless.
  window.nvccShowUserDetailsOverlay = function () {
    var headerHeight = document.getElementById('divMstrHeader')
      ? document.getElementById('divMstrHeader').offsetHeight
      : 0;

    var overlay = document.createElement('div');
    overlay.id = 'nvcc-ud-overlay';
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
        '<div style="color:#046a38; font-size:15px; font-weight:600; margin-bottom:12px;">Getting user details...</div>',
        '<div style="background:#d4e6da; border-radius:4px; height:8px; overflow:hidden; margin-bottom:6px;">',
          '<div id="nvcc-ud-bar" style="height:100%; width:0%; background:#046a38; border-radius:4px;"></div>',
        '</div>',
        '<div id="nvcc-ud-pct" style="color:#595959; font-size:13px;">0%</div>',
      '</div>'
    ].join('');
    document.body.appendChild(overlay);

    var barEl = document.getElementById('nvcc-ud-bar');
    var pctEl = document.getElementById('nvcc-ud-pct');

    var displayedPct   = 0;
    var targetPct      = 0;
    var rafHandle      = null;
    var intervalHandle = null;
    var safetyTimeout  = null;
    var observers      = [];
    var observed       = [];

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
      observers.forEach(function (mo) { mo.disconnect(); });
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

    // Phase 1 — asymptotic crawl to 85%
    var phase1Value = 0;
    intervalHandle = setInterval(function () {
      phase1Value += (85 - phase1Value) * 0.08;
      setBarPct(phase1Value);
    }, 180);

    // Watch iframes for height changes. The banner iframe goes through two
    // height changes: initial (TDX hardcoded) → loading state → final content.
    // We dismiss on the second change (heightChangeCount >= 2).
    function watchIframes() {
      document.querySelectorAll('iframe').forEach(function (iframe) {
        if (observed.indexOf(iframe) !== -1) return;
        observed.push(iframe);

        var initialHeight  = iframe.style.height || '';
        var heightChangeCount = 0;
        var lastSeenHeight = initialHeight;
        var debounceTimer  = null;

        var mo = new MutationObserver(function () {
          var currentHeight = iframe.style.height || '';
          if (currentHeight !== lastSeenHeight && parseInt(currentHeight) > 0) {
            heightChangeCount++;
            lastSeenHeight = currentHeight;
            if (heightChangeCount >= 2) {
              if (debounceTimer) clearTimeout(debounceTimer);
              debounceTimer = setTimeout(function () {
                mo.disconnect();
                removeOverlay();
              }, 300);
            }
          }
        });

        mo.observe(iframe, { attributes: true, attributeFilter: ['style'] });
        observers.push(mo);
      });
    }

    watchIframes();
    setTimeout(watchIframes, 200);
    setTimeout(watchIframes, 500);

    // Safety timeout — remove after 8s regardless
    safetyTimeout = setTimeout(removeOverlay, 8000);
  };

  // ─── NOVA CREDIT COURSE FORM — DATE VALIDATION ───────────────────────────────
  // Form ID 12522 — Employee Educational Assistance Request (NOVA Credit Course).
  // Rules:
  //   - On load: hide all fields except Start Date and End Date. Submit button
  //     starts enabled so TDX native required validation works on empty submit.
  //   - Start Date must fall within a valid window:
  //       • Must be a future date (> today)
  //       • Must be at least 5 business days (Mon–Fri) from today
  //       • Must be no more than 30 calendar days from today
  //   - When start date is invalid: remaining fields hidden, submit disabled.
  //   - When start date is valid: remaining fields revealed, submit enabled.
  //   - End Date must be after Start Date. When end date error is active,
  //     submit is disabled; cleared when end date is corrected.
  //   - All error messages are injected inline, ARIA-live, role="alert" for
  //     screen reader compatibility (WCAG 2.1 AA).
  (function () {
    var formIdEl = document.getElementById('FormID');
    if (!formIdEl || formIdEl.value !== '12522') return;

    // ── Field IDs ────────────────────────────────────────────────────────────
    var START_DATE_ID = 'attribute494';   // Start Date (TDX built-in)
    var END_DATE_ID   = 'attribute37355'; // End Date (custom attribute)

    // Fields hidden until a valid start date is entered.
    // Submit button (divButtons) is NOT in this list — it stays visible always.
    // Excludes Start Date and End Date groups which are always visible.
    // Excludes static field headings which are not inputs.
    var HIDDEN_FIELD_GROUPS = [
      'attribute37356-grp',   // Course Title
      'attribute37357-grp',   // Course Prefix
      'attribute37358-grp',   // Course Number
      'attribute37359-grp',   // Credit Hours
      'attribute33862-grp',   // Campus
      'attribute33865-grp',   // Time of Coursework
      'attribute37360-grp',   // Tuition Cost
    ];

    // ── Inject CSS for error messages ────────────────────────────────────────
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

    // ── Submit button helpers ─────────────────────────────────────────────────
    function disableSubmit() {
      var btn = document.getElementById('btnSubmit');
      if (btn) btn.disabled = true;
    }

    function enableSubmit() {
      var btn = document.getElementById('btnSubmit');
      if (btn) btn.disabled = false;
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

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

    // Count business days (Mon–Fri) from today (exclusive) to target date (inclusive)
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

    // Show remaining fields and enable submit
    function showRemainingFields() {
      HIDDEN_FIELD_GROUPS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = '';
      });
      enableSubmit();
    }

    // Hide remaining fields and disable submit
    function hideRemainingFields() {
      HIDDEN_FIELD_GROUPS.forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.style.display = 'none';
      });
      disableSubmit();
    }

    // ── Initial state ─────────────────────────────────────────────────────────
    // Hide fields but leave submit enabled — empty fields will trigger TDX's
    // own required validation if the user tries to submit without a date.
    hideRemainingFields();
    enableSubmit();

    // Show user details overlay while banner iframe loads
    window.nvccShowUserDetailsOverlay();

    // ── Start Date validation ─────────────────────────────────────────────────
    function validateStartDate() {
      var startInput = document.getElementById(START_DATE_ID);
      if (!startInput) return;

      var val     = startInput.value;
      var date    = parseDate(val);
      var today   = getToday();
      var errorId = 'nvcc-start-date-error';

      // Empty — clear error, hide fields, re-enable so TDX validation can fire
      if (!val || !val.trim()) {
        clearError(errorId);
        hideRemainingFields();
        enableSubmit();
        return;
      }

      // Unparseable — clear error, hide fields, disable
      if (!date) {
        clearError(errorId);
        hideRemainingFields();
        return;
      }

      var calDays = calendarDaysBetween(today, date);
      var bizDays = businessDaysBetween(today, date);

      // Rule 1: date is today or in the past
      if (date <= today) {
        setError('attribute494-grp', errorId,
          'Based on the course start date entered, this request is not eligible for approval. ' +
          'Requests must be submitted before the course start date. ' +
          'Please enter a future course start date to continue.');
        hideRemainingFields();
        return;
      }

      // Rule 2: less than 5 business days away
      if (bizDays < 5) {
        setError('attribute494-grp', errorId,
          'Based on the course start date entered, this request is not eligible for approval. ' +
          'Requests must be submitted at least 5 business days before the course start date.');
        hideRemainingFields();
        return;
      }

      // Rule 3: more than 30 calendar days away
      if (calDays > 30) {
        setError('attribute494-grp', errorId,
          'Requests cannot be submitted more than 30 days before the course start date.');
        hideRemainingFields();
        return;
      }

      // Valid start date — reveal fields and re-run end date check
      clearError(errorId);
      showRemainingFields();
      validateEndDate();
    }

    // ── End Date validation ───────────────────────────────────────────────────
    function validateEndDate() {
      var startInput = document.getElementById(START_DATE_ID);
      var endInput   = document.getElementById(END_DATE_ID);
      if (!startInput || !endInput) return;

      var startDate = parseDate(startInput.value);
      var endDate   = parseDate(endInput.value);
      var errorId   = 'nvcc-end-date-error';

      if (!endDate || !startDate) {
        clearError(errorId);
        // Re-enable if start date is valid (fields visible); empty end date
        // is not an error — TDX required validation will catch it on submit
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

    // ── Event listeners ───────────────────────────────────────────────────────
    // TDX datepickers fire both 'change' (jQuery UI selection) and 'input'
    // (manual keyboard entry). Listen to both on the raw input elements.
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
  // Triggered when a form URL contains ?prefill=TICKET_ID.
  // Configuration lives on the form itself via a hidden static content widget
  // containing a JSON object. The script reads the widget, extracts the prefill
  // config, fetches the TDNext ticket page, and populates the form fields.
  //
  // To enable prefill on any form:
  //   1. Add a Static Content field to the form in TDX (check "Visible for Client Portal")
  //   2. Set the content to a hidden div containing JSON:
  //      <div style="display:none;">
  //        {
  //          "prefill": {
  //            "fields": [
  //              { "ticketAttr": "title",       "formAttr": "37"    },
  //              { "ticketAttr": "description", "formAttr": "138"   },
  //              { "ticketAttr": "30429",       "formAttr": "37189" },
  //              { "ticketAttr": "16339", "formAttr": "16339", "type": "radio" },
  //              { "ticketAttr": "37351", "formAttr": "37351", "type": "multiselect",
  //                "choices": { "Contractors": "172367", "Staff": "172368" } }
  //            ]
  //          }
  //        }
  //      </div>
  //   3. Navigate to the form with ?prefill=TICKET_ID appended to the URL
  //
  //   Special ticketAttr keys:
  //     'title'       → ticket title (#thTicket_spnTitle on TDNext)
  //     'description' → ticket description (#divDescription .wrap-text) — populates CKEditor
  //   All other ticketAttr values = custom attribute IDs (#ctlAttribute{id} .wrap-text)
  //
  //   Field types (optional, defaults to plain text input):
  //     'radio'       → matches label text to find and check the correct radio button.
  //                     No choices map needed — label text is matched directly.
  //     'multiselect' → requires a "choices" map of display text → Select2 choice ID.
  //                     TDNext stores multi-select values separated by <br> tags;
  //                     the script reads innerHTML and splits on <br> to get each value.
  //
  //   appId is read automatically from the TDX inline form config (forAppId).
  //   No CDN script changes needed to add prefill to a new form.
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

})();