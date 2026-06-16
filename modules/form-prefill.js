// ─── FORM PREFILL ────────────────────────────────────────────────────────────
// Triggered when URL contains ?prefill=TICKET_ID.
(function () {
  var params   = new URLSearchParams(window.location.search);
  var ticketId = params.get('prefill');
  if (!ticketId) return;

  function init() {
    var staticEl = document.querySelector('[data-fieldtype="static_content"] [style*="display: none"]');
    if (!staticEl) return;

    var domConfig;
    try { domConfig = JSON.parse(staticEl.textContent.trim()); } catch (e) { return; }

    var mapping = domConfig.prefill;
    if (!mapping || !mapping.fields || !mapping.fields.length) return;

    var appIdMatch = document.body.innerHTML.match(/"forAppId":(\d+)/);
    if (!appIdMatch) return;
    var appId = appIdMatch[1];

    var P1_CAP = 30, P2_START = 30, displayedPct = 0, targetPct = 0;
    var rafHandle = null, phase1Interval = null;
    var headerHeight = document.getElementById('divMstrHeader') ? document.getElementById('divMstrHeader').offsetHeight : 0;

    var overlay = document.createElement('div');
    overlay.style.cssText = ['position:fixed','top:'+headerHeight+'px','left:0','width:100%','height:calc(100% - '+headerHeight+'px)','background:#fff','z-index:998','display:flex','align-items:center','justify-content:center'].join(';');
    overlay.innerHTML = '<div style="width:320px;text-align:center;"><div style="color:#046a38;font-size:15px;font-weight:600;margin-bottom:12px;">Prefilling form data...</div><div style="background:#d4e6da;border-radius:4px;height:8px;overflow:hidden;margin-bottom:6px;"><div id="nvcc-prefill-bar" style="height:100%;width:0%;background:#046a38;border-radius:4px;"></div></div><div id="nvcc-prefill-pct" style="color:#595959;font-size:13px;">0%</div></div>';
    document.body.appendChild(overlay);

    var barEl = document.getElementById('nvcc-prefill-bar');
    var pctEl = document.getElementById('nvcc-prefill-pct');

    function animatePct() {
      if (displayedPct < targetPct - 0.1) { var step = Math.max(0.4,(targetPct-displayedPct)*0.08); displayedPct=Math.min(targetPct,displayedPct+step); var r=Math.round(displayedPct); barEl.style.width=r+'%'; pctEl.textContent=r+'%'; rafHandle=requestAnimationFrame(animatePct); }
      else { var r=Math.round(targetPct); barEl.style.width=r+'%'; pctEl.textContent=r+'%'; displayedPct=targetPct; rafHandle=null; }
    }
    function setBarPct(p) { targetPct=Math.min(100,Math.max(0,p)); if(!rafHandle) rafHandle=requestAnimationFrame(animatePct); }

    var phase1Value = 0;
    phase1Interval = setInterval(function () { var rem=P1_CAP-phase1Value; phase1Value+=rem*0.12; setBarPct(phase1Value); }, 180);

    fetch('/SBTDNext/Apps/' + appId + '/Tickets/TicketDet?TicketID=' + ticketId, { credentials: 'same-origin' })
      .then(function (res) { if (!res.ok) throw new Error('Ticket fetch failed: ' + res.status); return res.text(); })
      .then(function (html) {
        clearInterval(phase1Interval); phase1Interval = null; setBarPct(P2_START);
        var doc = new DOMParser().parseFromString(html, 'text/html');
        var populated = 0, failed = [], total = mapping.fields.length;

        mapping.fields.forEach(function (field) {
          var value = '';
          if (field.ticketAttr === 'title') { var el=doc.querySelector('#thTicket_spnTitle'); if(el) value=el.textContent.trim(); }
          else if (field.ticketAttr === 'description') { var el=doc.querySelector('#divDescription .wrap-text'); if(el) value=el.innerHTML.trim(); }
          else { var el=doc.querySelector('#ctlAttribute'+field.ticketAttr+' .wrap-text'); if(el) value=(field.type==='multiselect')?el.innerHTML.trim():el.textContent.trim(); }

          if (!value) { failed.push(field.ticketAttr); }
          else if (field.ticketAttr === 'description') { var k='attribute'+field.formAttr+'_Content'; if(window.CKEDITOR&&window.CKEDITOR.instances[k]){window.CKEDITOR.instances[k].setData(value);populated++;}else{failed.push(field.formAttr);} }
          else if (field.type === 'radio') { var radios=document.querySelectorAll('input[name="attribute'+field.formAttr+'"]'),matched=false; radios.forEach(function(r){var l=document.querySelector('label[for="'+r.id+'"]');if(l&&l.textContent.trim()===value.trim()){r.checked=true;r.dispatchEvent(new Event('change',{bubbles:true}));matched=true;}}); if(matched){populated++;}else{failed.push(field.formAttr);} }
          else if (field.type === 'multiselect' && field.choices) { var lines=value.split(/<br\s*\/?>/i).map(function(s){return s.trim();}).filter(Boolean),ids=[]; lines.forEach(function(line){if(field.choices[line])ids.push(field.choices[line]);}); if(ids.length&&window.jQuery){window.jQuery('#attribute'+field.formAttr).val(ids).trigger('change');populated++;}else{failed.push(field.formAttr);} }
          else { var input=document.querySelector('#attribute'+field.formAttr); if(input){input.value=value;input.dispatchEvent(new Event('change',{bubbles:true}));populated++;}else{failed.push(field.formAttr);} }

          setBarPct(P2_START + ((populated+failed.length)/total) * (100-P2_START));
        });

        setBarPct(100);
        (function waitForComplete() {
          if (Math.round(displayedPct) >= 100) { setTimeout(function(){ if(overlay&&overlay.parentNode)overlay.parentNode.removeChild(overlay); showPrefillBanner(ticketId,populated,failed); },400); }
          else { requestAnimationFrame(waitForComplete); }
        })();
      })
      .catch(function (err) { clearInterval(phase1Interval); if(overlay&&overlay.parentNode)overlay.parentNode.removeChild(overlay); showPrefillBanner(ticketId,0,[],err.message); });

    function showPrefillBanner(ticketId, populated, failed, errorMsg) {
      var banner = document.createElement('div');
      banner.style.cssText = 'margin:16px 0;padding:12px 16px;border-radius:6px;font-size:14px;font-weight:500;border-left:4px solid';
      var link = 'ticket <a href="/SBTDClient/413/Portal/Requests/TicketRequests/TicketDet?TicketID='+ticketId+'" target="_blank" style="color:inherit;text-decoration:underline;">#'+ticketId+'</a>';
      if (errorMsg)            { banner.style.background='#fff4f2'; banner.style.borderLeftColor='#742a2a'; banner.style.color='#742a2a'; banner.innerHTML='Could not prefill form: '+errorMsg; }
      else if (!failed.length) { banner.style.background='#e8f2ec'; banner.style.borderLeftColor='#046a38'; banner.style.color='#1c4127'; banner.innerHTML='Form prefilled from '+link+'. Please review before submitting.'; }
      else if (populated > 0)  { banner.style.background='#fff8e1'; banner.style.borderLeftColor='#c99600'; banner.style.color='#1c4127'; banner.innerHTML='Form partially prefilled from '+link+'. '+failed.length+' field(s) could not be populated.'; }
      else                     { banner.style.background='#fff4f2'; banner.style.borderLeftColor='#742a2a'; banner.style.color='#742a2a'; banner.innerHTML='Prefill failed — no fields could be populated from '+link+'.'; }
      var form = document.querySelector('form.js-entry-form');
      if (form) form.insertBefore(banner, form.firstChild);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
