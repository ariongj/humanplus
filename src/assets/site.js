/* Human+ — browser script (no framework). Live opening status, menus, "Lista ime" (lab list),
   booking request and contact message. Every feature checks that its markup exists, so one file serves all pages. */
(function () {
  'use strict';

  var dataEl = document.getElementById('hp-data');
  if (!dataEl) return;
  var D = JSON.parse(dataEl.textContent);
  var T = D.t;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = function (s, o) { return String(s).replace(/\{(\w+)\}/g, function (_, k) { return o[k] != null ? o[k] : ''; }); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };
  var toMin = function (hm) { var p = hm.split(':'); return +p[0] * 60 + +p[1]; };
  var toHM = function (m) { return pad(Math.floor(m / 60)) + ':' + pad(m % 60); };
  var fold = function (s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'dj').replace(/[^a-z0-9]+/g, ' ').trim();
  };
  var store = {
    get: function (k, d) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* private mode */ } },
  };
  var waUrl = function (text) { return 'https://api.whatsapp.com/send?phone=' + D.wa + (text ? '&text=' + encodeURIComponent(text) : ''); };

  /* ---------- Kosovo time ---------- */
  var WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  function kosovoNow() {
    var f = new Intl.DateTimeFormat('en-GB', { timeZone: D.tz, weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    var p = {};
    f.formatToParts(new Date()).forEach(function (x) { p[x.type] = x.value; });
    return { y: +p.year, m: +p.month, d: +p.day, wd: WD.indexOf(p.weekday), min: (+p.hour % 24) * 60 + +p.minute };
  }
  /** Minutes the time zone is ahead of UTC on a given local date (for the calendar file). */
  function tzOffset(y, m, d, hh, mm) {
    var guess = Date.UTC(y, m - 1, d, hh, mm);
    var f = new Intl.DateTimeFormat('en-GB', { timeZone: D.tz, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' });
    var p = {};
    f.formatToParts(new Date(guess)).forEach(function (x) { p[x.type] = x.value; });
    var asLocal = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour % 24, +p.minute);
    return (asLocal - guess) / 60000;
  }

  /* ---------- opening status ---------- */
  function statusNow() {
    var n = kosovoNow();
    var h = D.hours[n.wd];
    if (h && n.min >= toMin(h[0]) && n.min < toMin(h[1])) return { state: 'open', text: T.open_now + ' · ' + fmt(T.open_until, { t: h[1] }), wd: n.wd };
    if (h && n.min < toMin(h[0])) return { state: 'closed', text: T.closed_now + ' · ' + fmt(T.opens_at, { t: h[0] }), wd: n.wd };
    for (var i = 1; i <= 7; i++) {
      var w = (n.wd + i) % 7;
      if (D.hours[w]) return { state: 'closed', text: T.closed_now + ' · ' + fmt(T.opens_day, { d: i === 1 ? T.tomorrow : T.days_on[w], t: D.hours[w][0] }), wd: n.wd };
    }
    return { state: 'closed', text: T.closed_now, wd: n.wd };
  }
  function paintStatus() {
    var s = statusNow();
    $$('[data-status]').forEach(function (el) {
      el.setAttribute('data-state', s.state);
      var t = $('.status-text', el);
      if (t) t.textContent = s.text;
    });
    $$('.hours-row[data-days]').forEach(function (row) {
      var today = row.getAttribute('data-days').split(',').indexOf(String(s.wd)) !== -1;
      row.classList.toggle('is-today', today);
      var tag = $('.hours-today', row);
      if (tag) tag.hidden = !today;
    });
  }
  paintStatus();
  setInterval(paintStatus, 60000);

  /* ---------- toast ---------- */
  var toastEl = $('[data-toast]');
  var toastTimer;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.innerHTML = '<svg class="i" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
    toastEl.lastChild.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.hidden = true; }, 2600);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve) {
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* ignore */ }
      document.body.removeChild(ta);
      resolve();
    });
  }

  /* ---------- header, dialogs, WhatsApp button ---------- */
  var header = $('[data-header]');
  var fab = $('[data-wa-fab]');
  function onScroll() {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle('is-stuck', y > 8);
    if (fab) fab.classList.toggle('is-on', y > 640);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var lastTrigger = null;
  function openDialog(d, trigger) {
    if (!d || d.open) return;
    lastTrigger = trigger || document.activeElement;
    if (typeof d.showModal === 'function') d.showModal(); else d.setAttribute('open', '');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeDialog(d) {
    if (!d) return;
    if (typeof d.close === 'function' && d.open) d.close(); else d.removeAttribute('open');
  }
  $$('dialog.sheet').forEach(function (d) {
    d.addEventListener('close', function () {
      document.documentElement.style.overflow = '';
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
    });
    d.addEventListener('click', function (e) {
      if (e.target === d) closeDialog(d); // backdrop
      if (e.target.closest('[data-close]')) closeDialog(d);
    });
  });
  $$('[data-menu-open]').forEach(function (b) { b.addEventListener('click', function () { openDialog($('#menu'), b); }); });
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-list-open]');
    if (b) { renderList(); openDialog($('#lab-list'), b); }
  });

  /* phones: the language menu in the header closes on Escape and on a click outside it */
  var pick = $('[data-lang-pick]');
  if (pick) {
    document.addEventListener('click', function (e) { if (pick.open && !pick.contains(e.target)) pick.open = false; });
    pick.addEventListener('keydown', function (e) { if (e.key === 'Escape' && pick.open) { pick.open = false; $('summary', pick).focus(); } });
  }

  /* language choice is remembered; the Albanian home page sends returning English / German visitors to their language */
  $$('[data-lang]').forEach(function (a) { a.addEventListener('click', function () { store.set('hp-lang', a.getAttribute('data-lang')); }); });
  (function () {
    var pref = store.get('hp-lang', null);
    var sameSite = document.referrer && document.referrer.indexOf(location.origin) === 0;
    if (D.lang === 'sq' && pref && pref !== 'sq' && !sameSite && document.body.classList.contains('page-home')) {
      var alt = $('.lang-alt[data-lang="' + pref + '"]');
      if (alt) location.replace(alt.href);
    }
  })();

  /* ---------- scroll reveal ---------- */
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach(function (el) {
      var sib = el.parentElement ? Array.prototype.indexOf.call(el.parentElement.children, el) : 0;
      el.style.setProperty('--d', Math.min(sib, 6) * 0.06 + 's');
      io.observe(el);
    });
  } else {
    $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- "Lista ime" — lab test list ---------- */
  // Items are stored as { id, n: name, p: short note }. Curated tests take their name from the page data (so
  // always in the page language); tests from the full catalogue (/analizat/) carry it on their button in every
  // language (data-names / data-notes = { sq, en, de }), so the list follows a language switch.
  var KEY = 'hp-list';
  function langs(el, attr) {
    var o = {};
    try { o = JSON.parse(el.getAttribute(attr + 's') || '{}'); } catch (err) { o = {}; }
    o[D.lang] = el.getAttribute(attr) || o[D.lang] || '';
    return o;
  }
  function item(id, el) {
    if (D.tests[id]) return { id: id, n: D.tests[id][0], p: D.tests[id][1] };
    if (el && el.getAttribute('data-name')) return { id: id, n: langs(el, 'data-name'), p: langs(el, 'data-note') };
    return null;
  }
  // The text to show for an item in the page language (older lists stored plain strings or { sq, en }).
  function tr(v) { return v && typeof v === 'object' ? v[D.lang] || v.en || v.sq || '' : v || ''; }
  function nameOf(x) { return D.tests[x.id] ? D.tests[x.id][0] : tr(x.n); }
  function noteOf(x) { return D.tests[x.id] ? D.tests[x.id][1] : tr(x.p); }
  function load() {
    return store.get(KEY, []).map(function (x) { return typeof x === 'string' ? item(x) : x; })
      .filter(function (x) { return x && x.id && x.n; });
  }
  var list = load();
  function save() { store.set(KEY, list); }
  function has(id) { return list.some(function (x) { return x.id === id; }); }
  function countText(n) { return n === 1 ? T.list_count_one : fmt(T.list_count_many, { n: n }); }
  function listMessage() {
    var lines = list.map(function (x, i) { return (i + 1) + '. ' + nameOf(x); });
    return T.list_msg_hello + '\n' + lines.join('\n') + '\n\n' + T.list_msg_thanks;
  }
  function syncButtons() {
    $$('[data-add]').forEach(function (b) {
      var id = b.getAttribute('data-add');
      var on = has(id);
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      var name = b.getAttribute('data-name') || (D.tests[id] ? D.tests[id][0] : id);
      // The name starts with the visible text ("Shto" / "Në listë"); aria-pressed carries the state.
      b.setAttribute('aria-label', (on ? T.list_added : T.list_add) + ': ' + name);
      var row = b.closest('.test, .cat-row');
      if (row) row.classList.toggle('is-added', on);
    });
    $$('[data-list-count]').forEach(function (c) {
      var prev = c.textContent;
      c.textContent = String(list.length);
      c.classList.toggle('has', list.length > 0);
      if (prev !== String(list.length)) { c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }
    });
    $$('[data-list-count-sr]').forEach(function (c) { c.textContent = '(' + countText(list.length) + ')'; });
    document.documentElement.classList.toggle('has-list-bar', list.length > 0 && !!$('[data-list-bar]'));
    $$('[data-list-bar]').forEach(function (bar) {
      bar.hidden = list.length === 0;
      var tx = $('[data-list-bar-text]', bar);
      if (tx) tx.textContent = countText(list.length);
    });
  }
  function renderList() {
    var empty = $('[data-list-empty]');
    var body = $('[data-list-body]');
    var foot = $('[data-list-foot]');
    if (!body) return;
    var n = list.length;
    empty.hidden = n > 0;
    body.hidden = n === 0;
    foot.hidden = n === 0;
    $('[data-list-summary]').textContent = countText(n);
    var ul = $('[data-list-items]');
    ul.innerHTML = '';
    list.forEach(function (x) {
      var li = document.createElement('li');
      var tx = document.createElement('div');
      tx.className = 'dl-text';
      var st = document.createElement('strong');
      st.textContent = nameOf(x);
      tx.appendChild(st);
      if (noteOf(x)) {
        var sm = document.createElement('small');
        sm.textContent = noteOf(x);
        tx.appendChild(sm);
      }
      var rm = document.createElement('button');
      rm.type = 'button';
      rm.className = 'icon-btn';
      rm.setAttribute('aria-label', fmt(T.list_remove_aria, { name: nameOf(x) }));
      rm.innerHTML = '<svg class="i" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
      rm.addEventListener('click', function () {
        var idx = list.indexOf(x);
        list = list.filter(function (y) { return y.id !== x.id; });
        save(); syncButtons(); renderList();
        var btns = $$('[data-list-items] .icon-btn');
        (btns[Math.min(idx, btns.length - 1)] || $('#lab-list [data-close]')).focus();
      });
      li.appendChild(tx);
      li.appendChild(rm);
      ul.appendChild(li);
    });
    var msg = listMessage();
    var wa = $('[data-list-wa]');
    if (wa) wa.href = waUrl(msg);
    var mail = $('[data-list-mail]');
    if (mail) mail.href = 'mailto:' + D.email + '?subject=' + encodeURIComponent(T.list_mail_subject) + '&body=' + encodeURIComponent(msg);
  }
  function toggle(id, el) {
    if (has(id)) list = list.filter(function (x) { return x.id !== id; });
    else { var it = item(id, el); if (it) list.push(it); }
    save(); syncButtons(); renderList();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-add]');
    if (b) { toggle(b.getAttribute('data-add'), b); return; }
    var p = e.target.closest('[data-add-panel]');
    if (p) {
      p.getAttribute('data-add-panel').split(',').forEach(function (id) { if (!has(id)) { var it = item(id); if (it) list.push(it); } });
      save(); syncButtons(); renderList();
      var label = $('span', p);
      p.classList.add('is-done');
      if (label) label.textContent = p.getAttribute('data-done');
      toast(p.getAttribute('data-done') + ' · ' + countText(list.length));
    }
  });
  var copyBtn = $('[data-list-copy]');
  if (copyBtn) copyBtn.addEventListener('click', function () { copyText(listMessage()).then(function () { toast(T.list_copied); }); });
  var viberBtn = $('[data-list-viber]');
  if (viberBtn) viberBtn.addEventListener('click', function () { copyText(listMessage()).then(function () { toast(T.list_copied); }); });
  var clearBtn = $('[data-list-clear]');
  if (clearBtn) clearBtn.addEventListener('click', function () { list = []; save(); syncButtons(); renderList(); $('#lab-list [data-close]').focus(); });
  window.addEventListener('storage', function (e) { if (e.key === KEY) { list = load(); syncButtons(); renderList(); } });
  syncButtons();

  /* ---------- mini map: Google Maps loads only after the visitor asks for it ---------- */
  // Once asked, the choice is remembered on this device and later maps load when they scroll into view.
  var MAP_KEY = 'hp-map';
  function loadMap(fig) {
    if (fig.classList.contains('is-loaded')) return;
    var src = fig.getAttribute('data-map') || '';
    if (!/^https:\/\/(www\.google\.com\/maps\/embed|maps\.google\.com\/maps)\?/.test(src)) return;
    var f = document.createElement('iframe');
    f.src = src + (src.indexOf('hl=') === -1 ? '&hl=' + D.lang : '');
    f.title = fig.getAttribute('data-map-title') || '';
    f.loading = 'lazy';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.setAttribute('allowfullscreen', '');
    $('[data-map-frame]', fig).appendChild(f);
    fig.classList.add('is-loaded');
  }
  var maps = $$('[data-map]');
  maps.forEach(function (fig) {
    var b = $('[data-map-load]', fig);
    if (b) b.addEventListener('click', function () { store.set(MAP_KEY, true); maps.forEach(loadMap); });
  });
  if (maps.length && store.get(MAP_KEY, false)) {
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { loadMap(en.target); mio.unobserve(en.target); } });
      }, { rootMargin: '200px 0px' });
      maps.forEach(function (fig) { mio.observe(fig); });
    } else maps.forEach(loadMap);
  }

  // Shared with assets/catalogue.js (the full catalogue on /analizat/) and assets/chat.js (the site assistant).
  window.HP = { sync: syncButtons, waUrl: waUrl, fold: fold, fmt: fmt, toast: toast, status: statusNow };

  /* ---------- site assistant: assets/chat.js loads on the first click (warmed up on hover / focus) ---------- */
  var chatBtn = $('[data-chat-open]');
  if (chatBtn) {
    var chatLoad = null;
    var loadChat = function () {
      if (window.HPChat) return Promise.resolve();
      if (!chatLoad) {
        chatLoad = new Promise(function (resolve, reject) {
          var sc = document.createElement('script');
          sc.src = chatBtn.getAttribute('data-chat-src');
          sc.onload = resolve;
          sc.onerror = function () { chatLoad = null; reject(); };
          document.head.appendChild(sc);
        });
      }
      return chatLoad;
    };
    chatBtn.addEventListener('pointerenter', function () { loadChat().catch(function () {}); }, { once: true });
    chatBtn.addEventListener('focus', function () { loadChat().catch(function () {}); }, { once: true });
    chatBtn.addEventListener('click', function () {
      if (window.HPChat && window.HPChat.isOpen()) { window.HPChat.close(); return; }
      loadChat().then(function () { window.HPChat.open(chatBtn); }, function () { location.href = waUrl(''); });
    });
  }

  /* ---------- booking request (/rezervo/) ---------- */
  var bk = $('[data-booking]');
  if (bk) {
    var B = JSON.parse($('#hp-booking').textContent);
    var daysEl = $('[data-days]', bk);
    var timesEl = $('[data-times]', bk);
    var now = kosovoNow();
    var chosen = { day: null };
    // Albanian writes weekdays in lower case inside a sentence ("e hënë, 12 tetor").
    var dateLabel = function (o) { var d = T.days[o.wd]; return (D.lang === 'sq' ? d.toLowerCase() : d) + ', ' + o.d + (D.lang === 'de' ? '. ' : ' ') + T.months[o.m - 1] + ' ' + o.y; };

    // Days: the next open days, starting today (Kosovo time).
    var days = [];
    for (var i = 0; days.length < D.days && i < D.days + 14; i++) {
      var dt = new Date(Date.UTC(now.y, now.m - 1, now.d + i));
      var o = { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate(), wd: dt.getUTCDay(), i: i };
      if (D.hours[o.wd]) days.push(o);
    }
    days.forEach(function (o, k) {
      var id = 'day-' + k;
      var lab = document.createElement('label');
      lab.className = 'day';
      var top = o.i === 0 ? B.today : o.i === 1 ? B.tomorrow : T.days_short[o.wd];
      lab.innerHTML = '<input type="radio" name="day" id="' + id + '" value="' + o.y + '-' + pad(o.m) + '-' + pad(o.d) + '" /><span><small></small><strong></strong><em></em></span>';
      $('small', lab).textContent = top;
      $('strong', lab).textContent = o.d;
      $('em', lab).textContent = T.months[o.m - 1].slice(0, 3);
      $('input', lab).setAttribute('aria-label', dateLabel(o));
      $('input', lab).addEventListener('change', function () { chosen.day = o; renderTimes(); mark(); });
      daysEl.appendChild(lab);
    });

    function renderTimes() {
      timesEl.innerHTML = '';
      var o = chosen.day;
      if (!o) return;
      var h = D.hours[o.wd];
      var start = toMin(h[0]);
      var end = toMin(h[1]) - D.lastSlot;
      var cutoff = o.i === 0 ? kosovoNow().min + 30 : -1;
      var any = false;
      for (var m = start; m <= end; m += D.slot) {
        var lab = document.createElement('label');
        lab.className = 'time';
        lab.innerHTML = '<input type="radio" name="time" value="' + toHM(m) + '" /><span>' + toHM(m) + '</span>';
        if (m < cutoff) $('input', lab).disabled = true; else any = true;
        $('input', lab).addEventListener('change', mark);
        timesEl.appendChild(lab);
      }
      if (!any) {
        timesEl.innerHTML = '';
        var p = document.createElement('p');
        p.className = 'time-empty';
        p.textContent = B.s3_none;
        timesEl.appendChild(p);
      }
      $('#b-time-hint').textContent = dateLabel(o);
    }

    // Preselect a service from ?sherbimi= (the lab pages map to "Lab tests").
    var pre = new URLSearchParams(location.search).get('sherbimi');
    if (pre) {
      if (/^laboratori/.test(pre)) pre = 'analiza';
      var r = $('input[name="service"][value="' + pre + '"]', bk);
      if (r) r.checked = true;
    }

    // Who the appointment is for.
    var ageField = $('[data-age]', bk);
    var nameLabel = $('[data-name-label]', bk);
    $$('input[name="who"]', bk).forEach(function (w) {
      w.addEventListener('change', function () {
        var child = w.value === 'child' && w.checked;
        ageField.hidden = !child;
        nameLabel.textContent = child ? nameLabel.getAttribute('data-child') : nameLabel.getAttribute('data-me');
      });
    });

    function mark() {
      [['b-service', 'service'], ['b-day', 'day'], ['b-time', 'time']].forEach(function (p) {
        var box = $('#' + p[0]);
        var ok = !!$('input[name="' + p[1] + '"]:checked', bk);
        box.classList.toggle('is-done', ok);
        if (ok) { box.classList.remove('is-invalid'); $('#' + p[0] + '-err').hidden = true; }
      });
    }
    $$('input[name="service"]', bk).forEach(function (r) { r.addEventListener('change', mark); });
    mark();

    function setErr(input, box, errEl, msg) {
      if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (box) box.classList.toggle('is-invalid', !!msg);
      errEl.hidden = !msg;
      errEl.textContent = msg || '';
    }
    function validate() {
      var bad = [];
      var svc = $('input[name="service"]:checked', bk);
      setErr(null, $('#b-service'), $('#b-service-err'), svc ? '' : B.err_service);
      if (!svc) bad.push($('input[name="service"]', bk));
      var day = $('input[name="day"]:checked', bk);
      setErr(null, $('#b-day'), $('#b-day-err'), day ? '' : B.err_day);
      if (!day) bad.push($('input[name="day"]', bk));
      var time = $('input[name="time"]:checked', bk);
      setErr(null, $('#b-time'), $('#b-time-err'), time ? '' : B.err_time);
      if (!time) bad.push($('input[name="time"]:not(:disabled)', bk) || $('input[name="day"]', bk));
      var name = $('#b-name');
      var nOk = name.value.trim().length >= 2;
      setErr(name, null, $('#b-name-err'), nOk ? '' : B.err_name);
      if (!nOk) bad.push(name);
      var phone = $('#b-phone');
      var digits = phone.value.replace(/\D/g, '');
      var pOk = digits.length >= 8 && digits.length <= 15 && /^[\d\s+()./-]+$/.test(phone.value.trim());
      setErr(phone, null, $('#b-phone-err'), pOk ? '' : B.err_phone);
      if (!pOk) bad.push(phone);
      $('[data-form-error]', bk).hidden = bad.length === 0;
      return bad;
    }
    $('#b-name').addEventListener('blur', function () { if (this.getAttribute('aria-invalid') === 'true') validate(); });
    $('#b-phone').addEventListener('blur', function () { if (this.getAttribute('aria-invalid') === 'true') validate(); });

    var last = null;
    bk.addEventListener('submit', function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.getAttribute('data-via')) || 'wa';
      var bad = validate();
      if (bad.length) { bad[0].focus(); return; }
      var svc = $('input[name="service"]:checked', bk);
      var who = $('input[name="who"]:checked', bk);
      var whoLabel = who.parentElement.textContent.trim();
      var o = chosen.day;
      var time = $('input[name="time"]:checked', bk).value;
      var f = {
        service: svc.getAttribute('data-label'),
        date: dateLabel(o),
        time: time,
        who: whoLabel,
        name: $('#b-name').value.trim(),
        age: who.value === 'child' ? $('#b-age').value.trim() : '',
        phone: $('#b-phone').value.trim(),
        note: $('#b-note').value.trim(),
      };
      var lines = [
        B.msg_title,
        '',
        B.msg_service + ': ' + f.service,
        B.msg_date + ': ' + f.date,
        B.msg_time + ': ' + f.time,
        B.msg_for + ': ' + f.who,
        B.msg_name + ': ' + f.name,
      ];
      if (f.age) lines.push(B.msg_age + ': ' + f.age);
      lines.push(B.msg_phone + ': ' + f.phone);
      if (f.note) lines.push(B.msg_note + ': ' + f.note);
      lines.push('', B.msg_end);
      var msg = lines.join('\n');
      last = { f: f, o: o, msg: msg };

      if (D.form) {
        try { fetch(D.form, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ _subject: B.msg_title, message: msg, name: f.name, phone: f.phone }) }); } catch (err) { /* WhatsApp stays the main channel */ }
      }
      if (via === 'wa') window.open(waUrl(msg), '_blank', 'noopener');
      else if (via === 'viber') copyText(msg).then(function () { toast(T.list_copied); location.href = 'viber://chat?number=' + encodeURIComponent('+' + D.wa); });
      else location.href = 'mailto:' + D.email + '?subject=' + encodeURIComponent(B.msg_title) + '&body=' + encodeURIComponent(msg);

      var done = $('[data-done]');
      $('[data-done-title]', done).textContent = fmt(B.done_title, { name: f.name.split(' ')[0] });
      $('[data-done-text]', done).textContent = fmt(B.done_text, { service: f.service, date: f.date, time: f.time, phone: f.phone });
      $('[data-done-wa]', done).href = waUrl(msg);
      bk.hidden = true;
      done.hidden = false;
      done.focus();
      window.scrollTo({ top: done.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
    });

    $('[data-done-ics]').addEventListener('click', function () {
      if (!last) return;
      var o = last.o;
      var hm = last.f.time.split(':');
      var off = tzOffset(o.y, o.m, o.d, +hm[0], +hm[1]);
      var start = new Date(Date.UTC(o.y, o.m - 1, o.d, +hm[0], +hm[1]) - off * 60000);
      var end = new Date(start.getTime() + 30 * 60000);
      var stamp = function (d) { return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, ''); };
      var escI = function (s) { return String(s).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/[,;]/g, '\\$&'); };
      var ics = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Human+//Booking request//' + D.lang.toUpperCase(), 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:' + stamp(start) + '-' + Math.random().toString(36).slice(2) + '@humanplusks.com',
        'DTSTAMP:' + stamp(new Date()),
        'DTSTART:' + stamp(start),
        'DTEND:' + stamp(end),
        'SUMMARY:' + escI('Human+ — ' + last.f.service),
        'LOCATION:' + escI('Human+ Qendra Diagnostike, Rruga B, Nr. 16, 10000 Prishtinë'),
        'DESCRIPTION:' + escI(B.ics_note + '\n' + D.phone),
        'STATUS:TENTATIVE',
        'END:VEVENT', 'END:VCALENDAR',
      ].join('\r\n');
      var url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
      var a = document.createElement('a');
      a.href = url;
      a.download = 'human-plus-termin.ics';
      document.body.appendChild(a);
      a.click();
      setTimeout(function () { URL.revokeObjectURL(url); a.remove(); }, 500);
    });

    $('[data-done-new]').addEventListener('click', function () {
      bk.reset();
      chosen.day = null;
      timesEl.innerHTML = '';
      $('#b-time-hint').textContent = B.s3_hint;
      ageField.hidden = true;
      nameLabel.textContent = nameLabel.getAttribute('data-me');
      $$('.step-box', bk).forEach(function (b) { b.classList.remove('is-done', 'is-invalid'); });
      $('[data-done]').hidden = true;
      bk.hidden = false;
      $('input[name="service"]', bk).focus();
    });
  }

  /* ---------- contact message (/kontakt/) ---------- */
  var mf = $('[data-msg-form]');
  if (mf) {
    mf.addEventListener('submit', function (e) {
      e.preventDefault();
      var via = (e.submitter && e.submitter.getAttribute('data-via')) || 'wa';
      var name = $('#m-name').value.trim();
      var phone = $('#m-phone').value.trim();
      var text = $('#m-msg').value.trim();
      var err = $('[data-form-error]', mf);
      $('#m-name').setAttribute('aria-invalid', name ? 'false' : 'true');
      $('#m-msg').setAttribute('aria-invalid', text ? 'false' : 'true');
      if (!name || !text) {
        $('span', err).textContent = mf.getAttribute('data-err');
        err.hidden = false;
        (!name ? $('#m-name') : $('#m-msg')).focus();
        return;
      }
      err.hidden = true;
      var msg = mf.getAttribute('data-hello') + '\n\n' + text + '\n\n— ' + name + (phone ? ' · ' + phone : '');
      if (via === 'wa') window.open(waUrl(msg), '_blank', 'noopener');
      else location.href = 'mailto:' + D.email + '?subject=' + encodeURIComponent(mf.getAttribute('data-subject')) + '&body=' + encodeURIComponent(msg);
    });
  }
})();
