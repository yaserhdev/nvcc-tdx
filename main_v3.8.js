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
      "color: #fff !important",
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
  var style = document.createElement("style");
  style.textContent = [
    '@import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@400;600;700&display=swap");',
    ".pull-right > .dropdown-menu { right: 6px !important; }",
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

  // ─── CONFIGURATION ───────────────────────────────────────────────────────────
  var CONFIG = {

    hideLastModified: [
      'customer engagement / test - release ticket'
    ],

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
  var serviceEl = document.querySelector('#ctl00_ctl00_cpContent_cpContent_divService div');
  if (serviceEl) {
    var service = serviceEl.textContent.trim().toLowerCase();
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
  // Usage: /SBTDClient/413/Portal/Requests/Service/12357/Test-Release-Ticket/Request?prefill=TICKET_ID
  (function () {
    var params = new URLSearchParams(window.location.search);
    var ticketId = params.get('prefill');
    if (!ticketId) return;

    var formIdEl = document.querySelector('#FormID');
    if (!formIdEl) return;

    var formId = formIdEl.value;
    var mapping = CONFIG.formPrefill && CONFIG.formPrefill[formId];
    if (!mapping) return;

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
            var descEl = doc.querySelector('#divDescription .wrap-text');
            if (descEl) value = descEl.innerHTML.trim();

          } else {
            var attrEl = doc.querySelector('#ctlAttribute' + field.ticketAttr + ' .wrap-text');
            if (attrEl) value = attrEl.textContent.trim();
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