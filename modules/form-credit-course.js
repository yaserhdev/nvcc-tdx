// ─── NOVA CREDIT COURSE FORM — DATE VALIDATION ───────────────────────────────
// Form ID 12522 — Employee Educational Assistance Request (NOVA Credit Course).
(function () {
  function init() {
    var formIdEl = document.getElementById('FormID');
    if (!formIdEl || formIdEl.value !== '12522') return;

    var START_DATE_ID = 'attribute494';
    var END_DATE_ID   = 'attribute37355';
    var HIDDEN_FIELD_GROUPS = [
      'attribute37356-grp', 'attribute37357-grp', 'attribute37358-grp',
      'attribute37359-grp', 'attribute33862-grp', 'attribute33865-grp',
      'attribute37360-grp',
    ];

    var validationStyle = document.createElement('style');
    validationStyle.textContent =
      '.nvcc-date-error{color:#8b0000;background:#fff4f2;border-left:4px solid #8b0000;' +
      'border-radius:4px;padding:8px 12px;margin-top:6px;font-size:13.5px;font-weight:500;line-height:1.5;}';
    document.head.appendChild(validationStyle);

    function disableSubmit() { var b = document.getElementById('btnSubmit'); if (b) b.disabled = true; }
    function enableSubmit()  { var b = document.getElementById('btnSubmit'); if (b) b.disabled = false; }

    function getToday() { var d = new Date(); d.setHours(0,0,0,0); return d; }

    function parseDate(val) {
      if (!val || !val.trim()) return null;
      var parts = val.trim().split('/');
      if (parts.length !== 3) return null;
      var m = parseInt(parts[0], 10), d = parseInt(parts[1], 10), y = parseInt(parts[2], 10);
      if (isNaN(m) || isNaN(d) || isNaN(y) || y < 1900) return null;
      var date = new Date(y, m - 1, d);
      date.setHours(0,0,0,0);
      if (date.getMonth() !== m - 1) return null;
      return date;
    }

    function businessDaysBetween(from, to) {
      var count = 0, current = new Date(from.getTime());
      current.setDate(current.getDate() + 1);
      while (current <= to) { var day = current.getDay(); if (day !== 0 && day !== 6) count++; current.setDate(current.getDate() + 1); }
      return count;
    }

    function calendarDaysBetween(from, to) { return Math.round((to - from) / 86400000); }

    function setError(groupId, errorId, message) {
      var group = document.getElementById(groupId); if (!group) return;
      var existing = document.getElementById(errorId);
      if (message) {
        if (!existing) { var el = document.createElement('div'); el.id = errorId; el.className = 'nvcc-date-error'; el.setAttribute('role','alert'); el.setAttribute('aria-live','polite'); group.appendChild(el); existing = el; }
        existing.textContent = message;
      } else { if (existing) existing.parentNode.removeChild(existing); }
    }

    function clearError(errorId) { var el = document.getElementById(errorId); if (el && el.parentNode) el.parentNode.removeChild(el); }

    function showRemainingFields() { HIDDEN_FIELD_GROUPS.forEach(function(id){ var el=document.getElementById(id); if(el) el.style.display=''; }); enableSubmit(); }
    function hideRemainingFields() { HIDDEN_FIELD_GROUPS.forEach(function(id){ var el=document.getElementById(id); if(el) el.style.display='none'; }); disableSubmit(); }

    hideRemainingFields();
    enableSubmit();

    function validateStartDate() {
      var startInput = document.getElementById(START_DATE_ID); if (!startInput) return;
      var val = startInput.value, date = parseDate(val), today = getToday(), errorId = 'nvcc-start-date-error';
      if (!val || !val.trim()) { clearError(errorId); hideRemainingFields(); enableSubmit(); return; }
      if (!date) { clearError(errorId); hideRemainingFields(); return; }
      var calDays = calendarDaysBetween(today, date), bizDays = businessDaysBetween(today, date);
      if (date <= today) { setError('attribute494-grp', errorId, 'Based on the course start date entered, this request is not eligible for approval. Requests must be submitted before the course start date. Please enter a future course start date to continue.'); hideRemainingFields(); return; }
      if (bizDays < 5)  { setError('attribute494-grp', errorId, 'Based on the course start date entered, this request is not eligible for approval. Requests must be submitted at least 5 business days before the course start date.'); hideRemainingFields(); return; }
      if (calDays > 30) { setError('attribute494-grp', errorId, 'Requests cannot be submitted more than 30 days before the course start date.'); hideRemainingFields(); return; }
      clearError(errorId); showRemainingFields(); validateEndDate();
    }

    function validateEndDate() {
      var startInput = document.getElementById(START_DATE_ID), endInput = document.getElementById(END_DATE_ID);
      if (!startInput || !endInput) return;
      var startDate = parseDate(startInput.value), endDate = parseDate(endInput.value), errorId = 'nvcc-end-date-error';
      if (!endDate || !startDate) { clearError(errorId); var f=document.getElementById('attribute37356-grp'); if(f&&f.style.display!=='none') enableSubmit(); return; }
      if (endDate <= startDate) { setError('attribute37355-grp', errorId, 'Course end date must be after the selected course start date.'); disableSubmit(); }
      else { clearError(errorId); enableSubmit(); }
    }

    var startInput = document.getElementById(START_DATE_ID);
    var endInput   = document.getElementById(END_DATE_ID);
    if (startInput) { startInput.addEventListener('change', validateStartDate); startInput.addEventListener('input', validateStartDate); if (window.jQuery) window.jQuery(startInput).on('change', validateStartDate); }
    if (endInput)   { endInput.addEventListener('change', validateEndDate);   endInput.addEventListener('input', validateEndDate);   if (window.jQuery) window.jQuery(endInput).on('change', validateEndDate); }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
