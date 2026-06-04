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
  var signIn =
    document.querySelector("#btnUserProfileMenu") ||
    document.querySelector("button.settings-button.dropdown-toggle") ||
    document.querySelector('div[title="Sign In"] a');
  if (signIn) {
    signIn.style.cssText = [
      "display: inline-flex",
      "align-items: center",
      "gap: 6px",
      "padding: 7px 16px",
      "background: #046a38",
      "color: #fff !important", // !important needed to override TDX global a:hover color rule
      "font-weight: 600",
      "font-size: 14px",
      "border-radius: 6px",
      "border: none",
      "cursor: pointer",
      "text-decoration: none",
      "transition: background 0.2s ease",
      "white-space: nowrap",
    ].join(";");
    signIn.addEventListener("mouseenter", function () {
      signIn.style.background = "#1c4127";
    });
    signIn.addEventListener("mouseleave", function () {
      signIn.style.background = "#046a38";
    });
  }

  // ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
  // Injected as a <style> tag so pseudo-selectors and cascade overrides work.
  // TDX renders the navbar with different IDs depending on the page context:
  //   - Standard portal pages:       #ctl00_mainNav
  //   - Service Catalog / KB pages:  #ctl00_ctl00_mainNav  (extra nesting level)
  //   - Dashboard pages:             #mainNav              (different master page)
  // All three are targeted in every rule below.
  var style = document.createElement("style");
  style.textContent = [
    // Load Libre Franklin — matches the font used across all custom portal pages
    '@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600;700&display=swap");',
    // Align profile dropdown to the right edge of the button
    ".pull-right > .dropdown-menu { right: 6px !important; }",
    // Remove margin from the hidden config static content widget
    "form.js-entry-form [id^=\"static-\"][data-fieldtype=\"static_content\"] { margin-bottom: 0 !important; }",
    // Nudge the header search bar down slightly for better vertical alignment
    "div.pull-left.topLevelSearch.input-group { margin-top: 6px !important; }",
    // Thicken the gold bottom border on the navbar (TDX default is too thin)
    "#ctl00_mainNav, #ctl00_ctl00_mainNav, #mainNav { border-bottom-width: 4px !important; }",
    // Base nav link styles — font, weight, size, color, spacing, and pill shape
    '#ctl00_mainNav .navbar-nav > li > a, #ctl00_mainNav .navbar-nav > li > a:visited, #ctl00_ctl00_mainNav .navbar-nav > li > a, #ctl00_ctl00_mainNav .navbar-nav > li > a:visited, #mainNav .navbar-nav > li > a, #mainNav .navbar-nav > li > a:visited { font-family: "Libre Franklin", "Helvetica Neue", Arial, sans-serif !important; font-weight: 600 !important; font-size: 13.5px !important; letter-spacing: 0.02em !important; color: #fff !important; border-radius: 5px !important; margin: 9px 1px !important; padding: 7px 12px !important; transition: background 0.15s ease, color 0.15s ease !important; }',
    // Kill all native TDX hover backgrounds
    "#ctl00_mainNav .navbar-nav > li > a:hover, #ctl00_mainNav .navbar-nav > li > a:focus, #ctl00_ctl00_mainNav .navbar-nav > li > a:hover, #ctl00_ctl00_mainNav .navbar-nav > li > a:focus, #mainNav .navbar-nav > li > a:hover, #mainNav .navbar-nav > li > a:focus, .navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus, .navbar-default .navbar-nav li a:hover, .navbar-default .navbar-nav li a:focus, .themed.tdbar-button-anchored a:hover, .themed.tdbar-button-anchored a:focus, .tdbar .navbar-nav > li > a:hover, .tdbar .navbar-nav > li > a:focus { background-color: transparent !important; background: transparent !important; }",
    // Custom hover — subtle white overlay pill on non-active items
    "#ctl00_mainNav .navbar-nav > li:not(.active) > a:hover, #ctl00_mainNav .navbar-nav > li:not(.active) > a:focus, #ctl00_ctl00_mainNav .navbar-nav > li:not(.active) > a:hover, #ctl00_ctl00_mainNav .navbar-nav > li:not(.active) > a:focus, #mainNav .navbar-nav > li:not(.active) > a:hover, #mainNav .navbar-nav > li:not(.active) > a:focus { background: rgba(255,255,255,0.12) !important; color: #fff !important; }",
    // Kill native active state backgrounds before applying our own
    "#ctl00_mainNav .navbar-nav > .active > a, #ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_mainNav .navbar-nav > .active > a:focus, #ctl00_ctl00_mainNav .navbar-nav > .active > a, #ctl00_ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_ctl00_mainNav .navbar-nav > .active > a:focus, #mainNav .navbar-nav > .active > a, #mainNav .navbar-nav > .active > a:hover, #mainNav .navbar-nav > .active > a:focus, .navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:active, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus, .themed.tdbar-button-anchored.active a, .themed.tdbar-button-anchored.active a:hover, .themed.tdbar-button-anchored.active a:focus { background-color: transparent !important; background: transparent !important; font-weight: 600 !important; }",
    // Active state — gold pill with dark green text
    "#ctl00_mainNav .navbar-nav > .active > a, #ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_mainNav .navbar-nav > .active > a:focus, #ctl00_ctl00_mainNav .navbar-nav > .active > a, #ctl00_ctl00_mainNav .navbar-nav > .active > a:hover, #ctl00_ctl00_mainNav .navbar-nav > .active > a:focus, #mainNav .navbar-nav > .active > a, #mainNav .navbar-nav > .active > a:hover, #mainNav .navbar-nav > .active > a:focus { background: #ffc20d !important; color: #1c4127 !important; font-weight: 700 !important; }",
    // Final catch-all to suppress any remaining TDX hover backgrounds
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
    // indexOf rather than exact match so partial strings work (e.g. service name
    // only, without needing to specify every individual form under it).
    if (CONFIG.hideLastModified.some(function (s) { return service.indexOf(s) !== -1; })) {
      var lastModified = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divModified');
      if (lastModified) lastModified.style.display = 'none';
    }
  }

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
  //     'radio'       → matches label text to find and check the correct radio button
  //     'multiselect' → requires a "choices" map of display text → Select2 choice ID
  //
  //   appId is read automatically from the TDX inline form config (forAppId).
  //   No CDN script changes needed to add prefill to a new form.
  (function () {
    var params = new URLSearchParams(window.location.search);
    var ticketId = params.get('prefill');
    if (!ticketId) return;

    // Read form-level config from the hidden static content widget
    var staticEl = document.querySelector('[data-fieldtype="static_content"] [style*="display: none"]');
    if (!staticEl) return;

    var domConfig;
    try {
      domConfig = JSON.parse(staticEl.textContent.trim());
    } catch (e) {
      return; // malformed JSON — bail silently
    }

    var mapping = domConfig.prefill;
    if (!mapping || !mapping.fields || !mapping.fields.length) return;

    // Read appId from the TDX inline form config already on the page —
    // avoids needing to specify it manually in the form widget JSON
    var appIdMatch = document.body.innerHTML.match(/"forAppId":(\d+)/);
    if (!appIdMatch) return;
    var appId = appIdMatch[1];

    // ── Progress bar state ────────────────────────────────────────────────────
    var P1_CAP   = 30;  // phase 1 asymptotic cap
    var P2_START = 30;  // phase 2 picks up from here
    var displayedPct   = 0;
    var targetPct      = 0;
    var rafHandle      = null;
    var phase1Interval = null;

    // ── Loading overlay ───────────────────────────────────────────────────────
    // position:fixed offset by the actual rendered header height so the overlay
    // always starts exactly where the navbar ends — independent of any layout
    // shifts the form container may experience during load.
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

    // rAF loop — smoothly interpolates displayedPct toward targetPct.
    // Steps at max(0.4, gap * 0.08) so it's fast when far, slow near target.
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

    // Phase 1 — asymptotic crawl toward 30% while fetch is in flight.
    // Adds 12% of remaining gap each tick so it slows naturally and never
    // falsely completes before real data arrives.
    var phase1Value = 0;
    phase1Interval = setInterval(function () {
      var remaining = P1_CAP - phase1Value;
      phase1Value  += remaining * 0.12;
      setBarPct(phase1Value);
    }, 180);

    // Fetch the TDNext ticket page — same-origin so session cookie carries over.
    // appId is read from the TDX inline config so it's always correct regardless
    // of which application the ticket belongs to.
    var url = '/SBTDNext/Apps/' + appId + '/Tickets/TicketDet?TicketID=' + ticketId;

    fetch(url, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('Ticket fetch failed: ' + res.status);
        return res.text();
      })
      .then(function (html) {
        // Phase 2 — real progress. Clear phase 1 and map field completion to 30→100%.
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
            // Preserve HTML so CKEditor renders formatting correctly
            var descEl = doc.querySelector('#divDescription .wrap-text');
            if (descEl) value = descEl.innerHTML.trim();

          } else {
            var attrEl = doc.querySelector('#ctlAttribute' + field.ticketAttr + ' .wrap-text');
            if (attrEl) value = attrEl.textContent.trim();
          }

          if (!value) {
            failed.push(field.ticketAttr);

          } else if (field.ticketAttr === 'description') {
            // CKEditor requires its own API — .value won't work on the textarea
            var editorKey = 'attribute' + field.formAttr + '_Content';
            if (window.CKEDITOR && window.CKEDITOR.instances[editorKey]) {
              window.CKEDITOR.instances[editorKey].setData(value);
              populated++;
            } else {
              failed.push(field.formAttr);
            }

          } else if (field.type === 'radio') {
            // Radio buttons store display text on the ticket — match label text
            // to find the correct input and check it
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
            // Multi-select uses Select2 — the ticket stores display text (e.g.
            // "Contractors\nStaff") but the form needs numeric choice IDs.
            // The "choices" map in the field config provides the text → ID lookup.
            // jQuery is always available on TDX form pages (loaded globally by TDX).
            var lines = value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
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
              // Trigger change so any TDX field watchers pick up the new value
              input.dispatchEvent(new Event('change', { bubbles: true }));
              populated++;
            } else {
              failed.push(field.formAttr);
            }
          }

          // Advance bar after each field — maps 0→total to P2_START→100%
          var realPct = (populated + failed.length) / total;
          setBarPct(P2_START + realPct * (100 - P2_START));
        });

        // Wait for bar to visually reach 100% before removing overlay —
        // ensures 100% is seen for a moment before the overlay disappears
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

      // Clickable link to the originating ticket in the client portal
      var ticketLink = 'ticket <a href="/SBTDClient/413/Portal/Requests/TicketRequests/TicketDet?TicketID=' + ticketId + '" target="_blank" style="color: inherit; text-decoration: underline;">#' + ticketId + '</a>';

      if (errorMsg) {
        banner.style.background = '#fff4f2';
        banner.style.borderLeftColor = '#742a2a';
        banner.style.color = '#742a2a';
        banner.innerHTML = 'Could not prefill form: ' + errorMsg;
      } else if (failed.length === 0) {
        // Green — all fields populated successfully
        banner.style.background = '#e8f2ec';
        banner.style.borderLeftColor = '#046a38';
        banner.style.color = '#1c4127';
        banner.innerHTML = 'Form prefilled from ' + ticketLink + '. Please review before submitting.';
      } else if (populated > 0) {
        // Gold — partial success
        banner.style.background = '#fff8e1';
        banner.style.borderLeftColor = '#c99600';
        banner.style.color = '#1c4127';
        banner.innerHTML = 'Form partially prefilled from ' + ticketLink + '. ' + failed.length + ' field(s) could not be populated.';
      } else {
        // Red — nothing populated
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