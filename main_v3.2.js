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
    // Nudge the header search bar down slightly for better vertical alignment
    "div.pull-left.topLevelSearch.input-group { margin-top: 6px !important; }",
    // Thicken the gold bottom border on the navbar (TDX default is too thin)
    "#ctl00_mainNav, #ctl00_ctl00_mainNav, #mainNav { border-bottom-width: 4px !important; }",
    // Base nav link styles — font, weight, size, color, spacing, and pill shape
    '#ctl00_mainNav .navbar-nav > li > a, #ctl00_mainNav .navbar-nav > li > a:visited, #ctl00_ctl00_mainNav .navbar-nav > li > a, #ctl00_ctl00_mainNav .navbar-nav > li > a:visited, #mainNav .navbar-nav > li > a, #mainNav .navbar-nav > li > a:visited { font-family: "Libre Franklin", "Helvetica Neue", Arial, sans-serif !important; font-weight: 600 !important; font-size: 13.5px !important; letter-spacing: 0.02em !important; color: #fff !important; border-radius: 5px !important; margin: 9px 1px !important; padding: 7px 12px !important; transition: background 0.15s ease, color 0.15s ease !important; }',
    // Kill all native TDX hover backgrounds — multiple selectors needed to beat
    // specificity from bootstrap, TDStyles, and the TDX custom theme stylesheet
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

  // ─── CONFIGURATION ───────────────────────────────────────────────────────────
  // Central control panel for all conditional UI logic across the portal.
  // To add a new service or form, just drop its name (lowercase) into the
  // relevant array — no logic changes needed anywhere else.
  var CONFIG = {

    // Services/forms where "Last Modified" should be hidden on ticket detail pages.
    // Matched as a substring against the service field text, so partial names work.
    hideLastModified: [
      'customer engagement / test - release ticket'
    ],

    // Form prefill mappings — triggered by navigating to a form URL with ?prefill=TICKET_ID.
    // Each entry is keyed by the form ID (found in the hidden #FormID input on the form page).
    // appId:  the TDNext application ID the ticket belongs to
    // fields: array mapping ticket attribute keys to form field IDs
    //   Special ticketAttr keys:
    //     'title'       → ticket title (#thTicket_spnTitle)
    //     'description' → ticket description (#divDescription .wrap-text) — rendered into CKEditor
    //   All other ticketAttr values are treated as custom attribute IDs (#ctlAttribute{id} .wrap-text)
    //
    // Usage: /SBTDClient/413/Portal/Requests/Service/12357/Test-Release-Ticket/Request?prefill=TICKET_ID
    formPrefill: {
      '12521': {
        appId: '414',
        fields: [
          { ticketAttr: 'title',       formAttr: '37'    },
          { ticketAttr: 'description', formAttr: '138'   },
          { ticketAttr: '30429',       formAttr: '37189' },
          { ticketAttr: '32329',       formAttr: '37187' }
        ]
      }
    }

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
  // Fetches the corresponding TDNext ticket page, extracts mapped field values,
  // and populates the form fields automatically.
  //
  // Usage: navigate to the form URL with ?prefill=TICKET_ID appended, e.g.:
  // /SBTDClient/413/Portal/Requests/Service/12357/Test-Release-Ticket/Request?prefill=6092907
  (function () {
    var params = new URLSearchParams(window.location.search);
    var ticketId = params.get('prefill');
    if (!ticketId) return;

    var formIdEl = document.querySelector('#FormID');
    if (!formIdEl) return;

    var formId = formIdEl.value;
    var mapping = CONFIG.formPrefill && CONFIG.formPrefill[formId];
    if (!mapping) return;

    // Fetch the TDNext ticket page — same-origin so session cookie carries over
    var url = '/SBTDNext/Apps/' + mapping.appId + '/Tickets/TicketDet?TicketID=' + ticketId;

    fetch(url, { credentials: 'same-origin' })
      .then(function (res) {
        if (!res.ok) throw new Error('Ticket fetch failed: ' + res.status);
        return res.text();
      })
      .then(function (html) {
        var parser = new DOMParser();
        var doc = parser.parseFromString(html, 'text/html');
        var populated = 0;
        var failed = [];

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
            return;
          }

          if (field.ticketAttr === 'description') {
            // CKEditor requires its own API — .value won't work on the textarea
            var editorKey = 'attribute' + field.formAttr + '_Content';
            if (window.CKEDITOR && window.CKEDITOR.instances[editorKey]) {
              window.CKEDITOR.instances[editorKey].setData(value);
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
        });

        showPrefillBanner(ticketId, populated, failed);
      })
      .catch(function (err) {
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
      var ticketLink = '<a href="/SBTDClient/413/Portal/Requests/TicketRequests/TicketDet?TicketID=' + ticketId + '" style="color: inherit; text-decoration: underline;">ticket #' + ticketId + '</a>';

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