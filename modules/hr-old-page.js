// ─── HR OL&D PAGE ────────────────────────────────────────────────────────────
(function () {
  if (window.location.pathname.toLowerCase().indexOf('/sbtdclient/413/portal/requests/servicecatalog/category/3374') === -1) return;

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
    '<p class="old-eyebrow" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>Human Resources &mdash; OL&amp;D</p>',
    '<p class="old-intro">Northern Virginia Community College (NOVA) offers educational support programs that allow employees to pursue professional and academic development through <strong>external courses</strong> or <strong>NOVA credit courses</strong>.</p>',
    '<div class="old-callout" role="note"><span class="old-callout-label">&#9889; Quick Decision Guide</span> &mdash; There are <strong>two types of assistance available</strong>:<ul><li><strong>NOVA Credit Courses (Continuous Learning Program)</strong> &mdash; For courses taken at NOVA at no cost</li><li><strong>External Course Tuition Assistance</strong> &mdash; For courses taken outside NOVA</li></ul></div>',
    '<p class="old-submit"><strong>Submit your requests</strong> to Organizational Learning and Development (OL&amp;D) Human Resources team for processing.</p>',
    '<div class="old-section-head">Submit a Request</div>',
    '<div class="old-cards">',
      '<a class="old-card" href="/SBTDClient/413/Portal/Requests/Service/10750/Employee-Educational-Assistance-Request-NOVA-Credit-Course"><div class="old-chip" aria-hidden="true"><span class="fa-solid fa-graduation-cap"></span></div><div class="old-card-title">Educational Assistance &mdash; NOVA Credit Course</div></a>',
      '<a class="old-card" href="/SBTDClient/413/Portal/Requests/Service/10722/Employee-Educational-Assistance-Request-External-Course"><div class="old-chip" aria-hidden="true"><span class="fa-solid fa-building-columns"></span></div><div class="old-card-title">Educational Assistance &mdash; External Course</div></a>',
    '</div>',
  ].join('');

  var divCats = document.getElementById('divCats');
  if (divCats && nativePanel) divCats.insertBefore(customBlock, nativePanel);
  else if (divCats) divCats.insertBefore(customBlock, divCats.firstChild);

  var sidebarButtons = document.createElement('div');
  sidebarButtons.id = 'nvcc-old-sidebar';
  sidebarButtons.innerHTML = [
    '<span><a class="DetailAction" href="/SBTDClient/413/Portal/Requests/Service/10750/Employee-Educational-Assistance-Request-NOVA-Credit-Course"><span class="fa-solid fa-circle-right fa-fw" aria-hidden="true"></span>Educational Assistance - NOVA Credit</a></span>',
    '<span><a class="DetailAction" href="/SBTDClient/413/Portal/Requests/Service/10722/Employee-Educational-Assistance-Request-External-Course"><span class="fa-solid fa-circle-right fa-fw" aria-hidden="true"></span>Educational Assistance - External Courses</a></span>',
    '<span><a class="DetailAction" href="/SBTDClient/413/Portal/Requests/Service/12049/HR-Organizational-Learning-and-Development-Help/Request"><span class="fa-solid fa-circle-right fa-fw" aria-hidden="true"></span>Contact OL&amp;D Team</a></span>',
  ].join('');

  var sidebar = document.getElementById('divCatsSidebar');
  if (sidebar) sidebar.insertBefore(sidebarButtons, sidebar.firstChild);
})();
