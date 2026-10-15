/* Human+ — site assistant (loaded by site.js the first time the chat button is used).
   Answers only from assets/chat-<lang>.json (built from the site's own data) and the lab catalogue; anything else
   goes to reception on WhatsApp. The chat sends nothing anywhere: the conversation stays in this tab
   (sessionStorage) until the visitor taps WhatsApp, a phone number or e-mail. It never interprets results. */
(function () {
  'use strict';

  var HP = window.HP;
  var dlg = document.getElementById('chat');
  if (!HP || !dlg || window.HPChat) return;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var log = $('[data-chat-log]', dlg);
  var form = $('[data-chat-form]', dlg);
  var input = $('#chat-input', dlg);
  var fab = $('[data-chat-open]');
  var C = null;
  var T = null;
  var CAT = null;
  var catLoad = null;
  var mode = '';
  var trigger = null;
  var KEY = 'hp-chat-' + document.documentElement.lang;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  // From 560 px the chat is a panel beside the page (the page stays usable); below, it fills the screen.
  var wide = function () { return window.matchMedia('(min-width: 560px)').matches; };
  var fine = function () { return window.matchMedia('(pointer: fine)').matches; };
  var session = {
    get: function () { try { return sessionStorage.getItem(KEY) || ''; } catch (e) { return ''; } },
    set: function (v) { try { sessionStorage.setItem(KEY, v); } catch (e) { /* private mode */ } },
    clear: function () { try { sessionStorage.removeItem(KEY); } catch (e) { /* private mode */ } },
  };

  /* ---------- DOM helpers (text always via textContent) ---------- */
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function svg(name, size, isBrand) {
    var NS = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('class', isBrand ? 'i' : 'i i-s');
    s.setAttribute('width', size || 18);
    s.setAttribute('height', size || 18);
    s.setAttribute('aria-hidden', 'true');
    if (isBrand) s.setAttribute('fill', 'currentColor');
    var u = document.createElementNS(NS, 'use');
    u.setAttribute('href', C.sprite + '#' + (isBrand ? 'b-' : '') + name);
    s.appendChild(u);
    return s;
  }
  function p(text) { return el('p', '', text); }
  /** A row of link buttons: [label, href, icon, kind] — kind "wa" (WhatsApp green), "main" (brand green), "brand" (brand icon). */
  function actions(list) {
    var row = el('div', 'chat-actions');
    list.forEach(function (a) {
      if (!a) return;
      var link = el('a', 'chat-btn' + (a[3] === 'wa' ? ' chat-btn-wa' : a[3] === 'main' ? ' chat-btn-main' : ''));
      link.href = a[1];
      if (/^https?:/.test(a[1]) && a[1].indexOf(location.origin) !== 0) { link.target = '_blank'; link.rel = 'noopener'; }
      if (a[2]) link.appendChild(svg(a[2], 16, a[3] === 'wa' || a[3] === 'brand'));
      link.appendChild(document.createTextNode(a[0]));
      row.appendChild(link);
    });
    return row;
  }
  function quick(keys) {
    var row = el('div', 'chat-quick');
    keys.forEach(function (k) {
      var b = el('button', 'chat-chip', T['q_' + k]);
      b.type = 'button';
      b.setAttribute('data-q', k);
      row.appendChild(b);
    });
    return row;
  }
  function chips(list) {
    var row = el('div', 'chat-quick');
    list.forEach(function (c) {
      var b = el('button', 'chat-chip', c[0]);
      b.type = 'button';
      b.setAttribute('data-q', c[1]);
      row.appendChild(b);
    });
    return row;
  }
  var wa = function (text) { return HP.waUrl(text || ''); };
  var tel = function () { return 'tel:' + C.phones[0][1]; };

  /* ---------- the conversation ---------- */
  function scrollDown() { log.scrollTop = log.scrollHeight; }
  function save() {
    while (log.children.length > 60) log.removeChild(log.firstChild);
    session.set(log.innerHTML);
  }
  function retireChips() {
    // only the newest suggestions stay clickable, so an old menu cannot be answered twice
    Array.prototype.forEach.call(log.querySelectorAll('.chat-quick'), function (q) { q.parentNode.removeChild(q); });
  }
  function user(text) {
    retireChips();
    var m = el('div', 'chat-msg chat-user');
    m.appendChild(el('span', 'sr-only', T.you + ': '));
    m.appendChild(document.createTextNode(text));
    log.appendChild(m);
    scrollDown();
  }
  function bot(parts) {
    var m = el('div', 'chat-msg chat-bot');
    m.appendChild(el('span', 'sr-only', T.bot + ': '));
    parts.forEach(function (x) { if (x) m.appendChild(x); });
    log.appendChild(m);
    HP.sync();
    scrollDown();
    save();
  }
  /** Shows answers one after another, with a short "typing" pause unless motion is reduced. */
  function reply(answers, follow) {
    var wait = reduce ? 0 : 280;
    var typing = el('div', 'chat-typing');
    typing.appendChild(el('span', 'sr-only', T.searching));
    typing.appendChild(el('i'));
    typing.appendChild(el('i'));
    typing.appendChild(el('i'));
    log.appendChild(typing);
    scrollDown();
    log.setAttribute('aria-busy', 'true');
    Promise.all(answers.map(function (a) { return Promise.resolve(a); })).then(function (list) {
      setTimeout(function () {
        if (typing.parentNode) typing.parentNode.removeChild(typing);
        log.removeAttribute('aria-busy');
        list.forEach(function (parts) { if (parts && parts.length) bot(parts); });
        var next = typeof follow === 'function' ? follow() : follow;
        if (next && next.length) { log.appendChild(quick(next)); scrollDown(); save(); }
      }, wait);
    });
  }

  /* ---------- answers ---------- */
  function hello() { return [p(T.hello)]; }
  function hours() {
    var s = HP.status();
    var dl = el('dl', 'chat-hours');
    C.hours.forEach(function (r) {
      var row = el('div');
      row.appendChild(el('dt', '', r[0]));
      row.appendChild(el('dd', '', r[1]));
      dl.appendChild(row);
    });
    var st = el('p', 'status chat-status');
    st.setAttribute('data-state', s.state);
    st.appendChild(el('span', 'status-dot'));
    st.appendChild(document.createTextNode(s.text));
    return [st, p(T.hours_intro), dl, actions([[T.book_btn, C.urls.book, 'calendar-check', 'main'], [T.call_btn, tel(), 'phone']])];
  }
  function where() {
    return [p(T.where.replace('{addr}', C.addr)), actions([[T.directions, C.dir, 'route', 'main'], [T.show_map, C.urls.map, 'map'], [T.open_maps, C.maps, 'external-link']])];
  }
  function contact() {
    var ul = el('ul', 'chat-list');
    C.phones.forEach(function (ph) {
      var li = el('li');
      var a = el('a', '', ph[0]);
      a.href = 'tel:' + ph[1];
      li.appendChild(a);
      li.appendChild(el('small', '', ' · ' + ph[2]));
      ul.appendChild(li);
    });
    var mail = el('li');
    var m = el('a', '', C.email);
    m.href = 'mailto:' + C.email;
    mail.appendChild(m);
    ul.appendChild(mail);
    var out = [p(T.contact), ul, actions([[T.wa_btn, wa(), 'whatsapp', 'wa'], ['Viber', 'viber://chat?number=' + encodeURIComponent(C.viber), 'viber', 'brand']])];
    if (C.socials.length) {
      out.push(p(T.follow));
      out.push(actions(C.socials.map(function (s) { return [s[1], s[2], s[0], 'brand']; })));
    }
    return out;
  }
  function faqById(id) { for (var i = 0; i < C.faq.length; i++) if (C.faq[i].id === id) return C.faq[i]; return null; }
  function faqAnswer(f, extra) {
    var out = [el('p', 'chat-q', f.q), p(f.a)];
    return out.concat(extra || []).concat([actions([[T.faq_more, f.url, 'circle-help']])]);
  }
  function price() {
    var f = faqById('cmimi');
    var list = el('button', 'chat-btn chat-btn-main');
    list.type = 'button';
    list.setAttribute('data-list-open', '');
    list.appendChild(svg('test-tubes', 16));
    list.appendChild(document.createTextNode(T.list_btn));
    var row = actions([[T.wa_btn, wa(), 'whatsapp', 'wa']]);
    row.insertBefore(list, row.firstChild);
    return f ? [p(f.a), row] : [p(T.fallback), row];
  }
  function results() { var f = faqById('rezultatet'); return f ? [p(f.a)] : [p(T.fallback)]; }
  function interpret() { return [p(T.interpret), actions([[T.book_btn, C.urls.book, 'calendar-check', 'main'], [T.call_btn, tel(), 'phone']])]; }
  function emergency() {
    var m = [p(T.emergency), actions([[T.call_112, 'tel:112', 'phone', 'main'], [T.call_194, 'tel:194', 'phone']])];
    m[0].className = 'chat-alert';
    return m;
  }
  function book() { return [p(T.book), actions([[T.book_btn, C.urls.book, 'calendar-check', 'main'], [T.wa_btn, wa(), 'whatsapp', 'wa'], [T.call_btn, tel(), 'phone']])]; }
  function prep() {
    return [p(T.prep), chips(C.prep.filter(function (x) { return x.k !== 'none'; }).map(function (x) { return [x.title, 'prep:' + x.k]; })), actions([[T.prep_more, C.urls.prep, 'clipboard-list']])];
  }
  function prepTopic(k) {
    for (var i = 0; i < C.prep.length; i++) if (C.prep[i].k === k) return [el('p', 'chat-q', C.prep[i].title), p(C.prep[i].text), actions([[T.prep_more, C.prep[i].url, 'clipboard-list']])];
    return prep();
  }
  function linkList(items) {
    var ul = el('ul', 'chat-links');
    items.forEach(function (it) {
      var li = el('li');
      var a = el('a', '', it[0]);
      a.href = it[1];
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }
  function panels() { return [p(T.panels), linkList(C.panels), actions([[T.panels_all, C.urls.panels, 'clipboard-list']])]; }
  function services() { return [p(T.services), linkList(C.services.map(function (s) { return [s.name, s.url]; })), actions([[T.book_btn, C.urls.book, 'calendar-check', 'main']])]; }
  function service(s) {
    return [el('p', 'chat-q', s.name), p(s.short), actions([[T.service_book, C.urls.book + '?sherbimi=' + encodeURIComponent(s.slug), 'calendar-check', 'main'], [T.service_more, s.url, 'arrow-right']])];
  }
  function fallback(text) { return [p(T.fallback), actions([[T.wa_btn, wa(T.wa_question.replace('{q}', text)), 'whatsapp', 'wa'], [T.call_btn, tel(), 'phone']])]; }

  /* ---------- lab catalogue search ---------- */
  function catalogue() {
    if (CAT) return Promise.resolve(CAT);
    if (!catLoad) {
      catLoad = fetch(C.catalogue).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (d) {
        CAT = d.entries.map(function (x) {
          var nf = HP.fold(x.n);
          return { x: x, nf: nf, nw: nf.split(' '), aw: (nf + ' ' + HP.fold(x.s || '') + ' ' + (x.q || '')).split(' ') };
        });
        return CAT;
      });
      catLoad.catch(function () { catLoad = null; });
    }
    return catLoad;
  }
  var stem = function (t) { return t.length > 5 ? t.slice(0, t.length - 2) : t; };
  var wordHit = function (pfx, w) { return pfx.length <= 2 ? w === pfx : w.indexOf(pfx) === 0; };
  function findTests(r) {
    var toks = r.split(' ').filter(Boolean).map(stem);
    if (!toks.length) return [];
    var out = [];
    CAT.forEach(function (c) {
      var s = 0;
      if (c.nf === r) s = 100;
      else if (c.nf.indexOf(r) === 0) s = 80;
      else if (toks.every(function (t) { return c.nw.some(function (w) { return wordHit(t, w); }); })) s = 60;
      else if (toks.every(function (t) { return c.aw.some(function (w) { return wordHit(t, w); }); })) s = 35;
      else if (toks.length >= 3) {
        // all words but one ("full blood count" → "Complete blood count (CBC)")
        var n = toks.filter(function (t) { return c.aw.some(function (w) { return wordHit(t, w); }); }).length;
        if (n >= toks.length - 1) s = 20;
      }
      if (s) out.push([s - Math.min(c.nf.length, 90) / 100, c.x]);
    });
    out.sort(function (a, b) { return b[0] - a[0]; });
    return out.map(function (o) { return o[1]; });
  }
  function firstSentence(s) {
    var m = String(s || '').match(/^.*?[.!?](\s|$)/);
    var out = (m ? m[0] : String(s || '')).trim();
    return out.length > 150 ? out.slice(0, 147).replace(/\s+\S*$/, '') + '…' : out;
  }  // the preparation in one sentence; skip an opening sentence that only names the sample ("Gjak venoz.")
  var SAMPLE_ONLY = /^(?=[^.;:]{0,40}\.$)(?=.*(venoz|venous|venös|serum|plazm|plasma|kapilar|capillary|kapillar))/i;
  var prepSentence = function (p) {
    var one = firstSentence(p);
    var rest = String(p || '').slice(one.length).trim();
    return SAMPLE_ONLY.test(one) && rest ? firstSentence(rest) : one;
  };

  function testCard(x) {
    var card = el('div', 'chat-test');
    var a = el('a', 'chat-test-name', x.n);
    a.href = C.urls.tests + x.u + '/';
    card.appendChild(a);
    var note = x.co || x.sp || '';
    if (note) {
      var s = el('p', 'chat-test-meta');
      s.appendChild(el('strong', '', T.sample + ': '));
      s.appendChild(document.createTextNode(note));
      card.appendChild(s);
    }
    if (x.p) {
      var pr = el('p', 'chat-test-meta');
      pr.appendChild(el('strong', '', T.prep_label + ': '));
      pr.appendChild(document.createTextNode(prepSentence(x.p)));
      card.appendChild(pr);
    }
    var add = el('button', 'add-btn chat-add');
    add.type = 'button';
    add.setAttribute('data-add', x.id);
    add.setAttribute('data-name', x.n);
    add.setAttribute('data-note', note);
    if (x.o) add.setAttribute('data-names', JSON.stringify(x.o));
    if (x.oc) add.setAttribute('data-notes', JSON.stringify(x.oc));
    add.setAttribute('aria-pressed', 'false');
    var off = el('span', 'add-off');
    off.appendChild(svg('plus', 16));
    off.appendChild(document.createTextNode(T.add));
    var on = el('span', 'add-on');
    on.appendChild(svg('check', 16));
    on.appendChild(document.createTextNode(T.added));
    add.appendChild(off);
    add.appendChild(on);
    card.appendChild(add);
    return card;
  }
  /** Promise of message parts for a test question; `strict` = the visitor asked to find a test. */
  function testAnswer(r, text, strict) {
    return catalogue().then(function () {
      var hits = findTests(r);
      if (!hits.length) return strict ? [p(T.tests_none.replace('{q}', text))].concat(fallback(text).slice(1)) : null;
      var parts = [p(T.tests_found)];
      hits.slice(0, 3).forEach(function (x) { parts.push(testCard(x)); });
      if (hits.length > 3) parts.push(actions([[T.tests_more.replace('{n}', hits.length), C.urls.tests + '?q=' + encodeURIComponent(text), 'search']]));
      return parts;
    }, function () { return [p(T.load_error)].concat(fallback(text).slice(1)); });
  }

  /* ---------- understanding a question ---------- */
  function has(f, ws, kw) {
    if (kw.indexOf(' ') !== -1) return (' ' + f + ' ').indexOf(' ' + kw) !== -1;
    if (kw.length <= 3) return ws.indexOf(kw) !== -1;
    for (var i = 0; i < ws.length; i++) if (ws[i].indexOf(kw) === 0) return true;
    return false;
  }
  function matches(f, ws, list) { return list.filter(function (kw) { return has(f, ws, kw); }); }
  /** What is left of the question once the matched keywords and small words are removed (used as a test name). */
  function rest(ws, used) {
    var inPhrase = {};
    used.forEach(function (kw) { if (kw.indexOf(' ') !== -1) kw.trim().split(' ').forEach(function (w) { inPhrase[w] = 1; }); });
    return ws.filter(function (w) {
      if (C.stop.indexOf(w) !== -1 || inPhrase[w]) return false;
      return !used.some(function (kw) { return kw.indexOf(' ') === -1 && (kw.length <= 3 ? w === kw : w.indexOf(kw) === 0); });
    }).join(' ');
  }
  function bestFaq(ws, skip) {
    var q = ws.filter(function (w) { return w.length >= 3 && C.stop.indexOf(w) === -1; });
    if (!q.length) return null;
    var best = null;
    var top = 0;
    C.faq.forEach(function (f) {
      if (skip[f.id]) return;
      var fw = HP.fold(f.q).split(' ').filter(function (w) { return w.length >= 3; });
      var n = 0;
      q.forEach(function (w) { var s = stem(w); if (fw.some(function (x) { var sx = stem(x); return x.indexOf(s) === 0 || (sx.length >= 4 && s.indexOf(sx) === 0); })) n++; });
      if (n > top) { top = n; best = f; }
    });
    return top >= 2 || (top === 1 && q.length === 1) ? best : null;
  }

  function route(text) {
    var f = HP.fold(text);
    var ws = f.split(' ').filter(Boolean);
    var I = C.intents;
    var used = [];
    if (mode === 'test') { mode = ''; return { a: [testAnswer(f, text, true)], next: ['prep', 'price', 'book'] }; }
    if (matches(f, ws, I.emergency).length) return { a: [emergency()], next: [] };
    if (matches(f, ws, I.result).length && matches(f, ws, I.meaning).length) return { a: [interpret()], next: ['book', 'contact'] };
    var hit = {};
    ['hours', 'where', 'contact', 'book', 'price', 'results', 'prep', 'panels', 'services', 'greet', 'thanks'].forEach(function (k) {
      var m = matches(f, ws, I[k]);
      if (m.length) { hit[k] = 1; used = used.concat(m); }
    });
    var depts = C.services.filter(function (s) {
      var m = matches(f, ws, s.w);
      used = used.concat(m);
      return m.length > 0;
    });
    var out = [];
    var next = [];
    if (hit.hours) { out.push(hours()); next.push('where', 'book'); }
    if (hit.where) { out.push(where()); next.push('hours'); }
    if (hit.contact) { out.push(contact()); }
    if (hit.book) { out.push(book()); }
    if (hit.price) { out.push(price()); next.push('test'); }
    if (hit.results && !hit.price) { out.push(results()); }
    depts.slice(0, 2).forEach(function (s) { out.push(service(s)); });
    if (hit.services && !depts.length) out.push(services());
    if (hit.panels) out.push(panels());
    var skip = { cmimi: hit.price, rezultatet: hit.results, termin: hit.book };
    // A question from the FAQ only when nothing above answered it (no doubled answers).
    var faq = out.length ? null : bestFaq(ws, skip);
    if (faq) out.push(faqAnswer(faq));
    var r = rest(ws, used);
    var answered = out.length;
    var onlyHelpers = !hit.hours && !hit.where && !hit.contact && !hit.panels && !hit.services && !depts.length && !faq;
    var tests = r.replace(/ /g, '').length >= 2 && onlyHelpers ? testAnswer(r, text, false) : null;
    var menu = false;
    // Said when no test matched either: the preparation types, a greeting / thanks, or "ask reception".
    var generic = function () {
      if (hit.prep && !faq) return prep();
      if (answered) return null;
      menu = true;
      if (hit.thanks) return [p(T.thanks)];
      if (hit.greet) return hello();
      return fallback(text);
    };
    if (tests) {
      out.push(tests.then(function (parts) { return parts || generic(); }));
      next.push('prep', 'book');
    } else {
      var g = generic();
      if (g) out.push(g);
    }
    if (!next.length) next = ['book', 'contact'];
    next = next.filter(function (k, i) { return next.indexOf(k) === i; }).slice(0, 4);
    return { a: out, next: function () { return menu ? MENU : next; } };
  }
  var MENU = ['hours', 'where', 'test', 'prep', 'price', 'book', 'results', 'contact'];

  var ACTIONS = {
    hours: function () { return { a: [hours()], next: ['where', 'book', 'contact'] }; },
    where: function () { return { a: [where()], next: ['hours', 'book', 'contact'] }; },
    test: function () { mode = 'test'; setTimeout(function () { input.focus(); }, 0); return { a: [[p(T.test_ask)]], next: [] }; },
    prep: function () { return { a: [prep()], next: ['test', 'book'] }; },
    price: function () { return { a: [price()], next: ['test', 'book'] }; },
    book: function () { return { a: [book()], next: ['hours', 'where'] }; },
    results: function () { return { a: [results()], next: ['contact', 'book'] }; },
    services: function () { return { a: [services()], next: ['book', 'panels'] }; },
    panels: function () { return { a: [panels()], next: ['price', 'book'] }; },
    contact: function () { return { a: [contact()], next: ['hours', 'where'] }; },
  };

  function ask(text) {
    text = String(text || '').trim().slice(0, 200);
    if (!text) return;
    user(text);
    var r = route(text);
    reply(r.a, r.next);
  }
  function pick(key, label) {
    user(label);
    // the chip that was clicked is gone: keep the keyboard in the chat
    if (fine()) input.focus({ preventScroll: true }); else log.focus({ preventScroll: true });
    if (key.indexOf('prep:') === 0) { reply([prepTopic(key.slice(5))], ['test', 'book']); return; }
    var r = (ACTIONS[key] || ACTIONS.contact)();
    reply(r.a, r.next);
  }
  function greet() {
    log.innerHTML = '';
    mode = '';
    bot(hello());
    log.appendChild(quick(MENU));
    save();
  }

  /* ---------- window ---------- */
  function isOpen() { return dlg.open; }
  function open(from) {
    trigger = from || document.activeElement;
    if (!dlg.open) {
      if (wide() || typeof dlg.showModal !== 'function') { if (typeof dlg.show === 'function') dlg.show(); else dlg.setAttribute('open', ''); }
      else dlg.showModal();
    }
    document.documentElement.classList.add('chat-open');
    if (fab) fab.setAttribute('aria-expanded', 'true');
    var start = function () {
      if (!log.children.length) {
        var saved = session.get();
        if (saved) { log.innerHTML = saved; HP.sync(); } else greet();
      }
      scrollDown();
      if (wide() && fine()) input.focus(); else $('#chat-title', dlg).focus();
    };
    if (C) start();
    else {
      fetch(dlg.getAttribute('data-chat')).then(function (r) { return r.json(); }).then(function (d) { C = d; T = d.t; start(); }, function () {
        log.textContent = '';
        log.appendChild(el('p', 'chat-alert', document.documentElement.lang === 'sq' ? 'Biseda nuk u ngarkua.' : document.documentElement.lang === 'de' ? 'Der Chat wurde nicht geladen.' : 'The chat did not load.'));
      });
    }
  }
  function close() {
    if (typeof dlg.close === 'function' && dlg.open) dlg.close(); else dlg.removeAttribute('open');
  }
  dlg.addEventListener('close', function () {
    document.documentElement.classList.remove('chat-open');
    if (fab) fab.setAttribute('aria-expanded', 'false');
    if (trigger && document.contains(trigger)) trigger.focus();
  });
  dlg.addEventListener('cancel', function (e) { e.preventDefault(); close(); });
  // Escape closes the chat wherever the focus is — unless another window (the list, the menu) is open on top.
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape' || !dlg.open) return;
    var other = document.querySelector('dialog.sheet[open]');
    if (other) return;
    e.preventDefault();
    close();
  });
  $('[data-chat-close]', dlg).addEventListener('click', close);
  $('[data-chat-restart]', dlg).addEventListener('click', function () { if (!C) return; session.clear(); greet(); input.focus(); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!C) return;
    var v = input.value;
    input.value = '';
    ask(v);
  });
  log.addEventListener('click', function (e) {
    var b = e.target.closest('[data-q]');
    if (b && C) { pick(b.getAttribute('data-q'), b.textContent); return; }
    // a link inside the chat to this page's own section: close the chat on phones so the page is visible
    var a = e.target.closest('a[href]');
    if (a && !wide() && a.target !== '_blank' && !/^(tel|mailto|viber):/.test(a.getAttribute('href'))) close();
  });

  window.HPChat = { open: open, close: close, isOpen: isOpen };
})();
