/* Human+ — lab-test catalogue (/analizat/). Loads assets/catalogue-<lang>.json and renders search, category filters,
   expandable details and "Add" buttons for "Lista ime". Uses the helpers site.js shares on window.HP. */
(function () {
  'use strict';

  function init() {
    var cfgEl = document.getElementById('hp-cat');
    var listEl = document.querySelector('[data-cat-list]');
    if (!cfgEl || !listEl || !window.HP) return;
    var C = JSON.parse(cfgEl.textContent);
    var T = C.t;
    var HP = window.HP;
    var $ = function (s, r) { return (r || document).querySelector(s); };
    var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
    var input = $('#tests-q');
    var form = input.form;
    var countEl = $('[data-count]');
    var moreBtn = $('[data-more]');
    var none = $('[data-none]');
    var grid = $('[data-cat-grid]');
    var sortedEl = $('[data-sorted]');
    var PAGE = 40;
    var entries = [];
    var shown = [];
    var limit = PAGE;
    var params = new URLSearchParams(location.search);
    var cat = params.get('kategoria') || '';
    if (params.get('q')) input.value = params.get('q');

    var ICON_PLUS = '<svg class="i" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
    var ICON_CHECK = '<svg class="i" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>';
    var ICON_RIGHT = '<svg class="i" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
    // + that turns into − when a row is open (the vertical bar fades out)
    var ICON_TOGGLE = '<svg class="i cat-plus" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round"><path d="M5 12h14"/><path class="v" d="M12 5v14"/></svg>';
    // The sample icon comes from the page's icon sprite: tubes for blood, a flask for urine, a tube for stool, swabs
    var useEl = document.querySelector('use[href*="icons.svg"]');
    var SPRITE = useEl ? useEl.getAttribute('href').split('#')[0] : '';
    function sampleIcon(x) {
      var s = (x.co || '') + ' ' + (x.sp || '');
      var name = /urin/i.test(s) ? 'flask-round' : /fe[çc]|stool|stuhl/i.test(s) ? 'test-tube' : /strisho|bris|swab|abstrich|tampon/i.test(s) ? 'test-tube-diagonal' : 'test-tubes';
      return SPRITE ? '<svg class="i i-s cat-ico" aria-hidden="true" width="34" height="34"><use href="' + SPRITE + '#' + name + '"/></svg>' : '';
    }

    function el(tag, cls, text) {
      var e = document.createElement(tag);
      if (cls) e.className = cls;
      if (text != null) e.textContent = text;
      return e;
    }
    function detailRow(dl, label, value) {
      if (!value) return;
      dl.appendChild(el('dt', null, label));
      dl.appendChild(el('dd', null, value));
    }

    function row(x) {
      var li = el('li', 'cat-row');
      li.setAttribute('data-id', x.id);
      var main = el('div', 'cat-row-main');
      var tog = el('button', 'cat-toggle');
      tog.type = 'button';
      tog.setAttribute('aria-expanded', 'false');
      tog.setAttribute('aria-controls', 'd-' + x.id);
      tog.insertAdjacentHTML('beforeend', ICON_TOGGLE + sampleIcon(x));
      var text = el('span', 'cat-text');
      text.appendChild(el('span', 'cat-name', x.n));
      // category (and "Panel") in small text under the name
      text.appendChild(el('span', 'cat-chips', (C.cats[x.c[0]] || '') + (x.k ? ' · ' + T.panel : '')));
      tog.appendChild(text);
      main.appendChild(tog);
      li.appendChild(main);

      // right column: the sample ("Marrje gjaku") above the Add button
      var order = el('div', 'cat-order');
      if (x.co) order.appendChild(el('span', 'cat-sample', x.co));

      var add = el('button', 'add-btn add-solid');
      add.type = 'button';
      add.setAttribute('data-add', x.id);
      add.setAttribute('data-name', x.n);
      add.setAttribute('data-note', x.co || x.sp || '');
      // The name and note in every language, so the list follows a language switch.
      if (x.o) add.setAttribute('data-names', JSON.stringify(x.o));
      if (x.oc) add.setAttribute('data-notes', JSON.stringify(x.oc));
      add.setAttribute('aria-pressed', 'false');
      add.innerHTML = '<span class="add-off">' + ICON_PLUS + '</span><span class="add-on">' + ICON_CHECK + '</span>';
      $('.add-off', add).appendChild(document.createTextNode(C.add));
      $('.add-on', add).appendChild(document.createTextNode(C.added));
      order.appendChild(add);
      li.appendChild(order);

      var det = el('div', 'cat-detail');
      det.id = 'd-' + x.id;
      det.hidden = true;
      tog.addEventListener('click', function () {
        var open = tog.getAttribute('aria-expanded') === 'true';
        if (!open && !det.firstChild) fillDetail(det, x);
        tog.setAttribute('aria-expanded', open ? 'false' : 'true');
        det.hidden = open;
        li.classList.toggle('is-open', !open);
      });
      li.appendChild(det);
      return li;
    }

    function fillDetail(det, x) {
      if (x.d) {
        det.appendChild(el('p', 'cat-label', T.desc));
        det.appendChild(el('p', 'cat-desc', x.d));
      }
      var notes = (x.w || []).filter(function (k) { return C.notes && C.notes[k]; });
      if (notes.length) {
        var box = el('div', 'cat-notes');
        box.appendChild(el('p', 'cat-label', T.good));
        notes.forEach(function (k) { box.appendChild(el('p', null, C.notes[k])); });
        det.appendChild(box);
      }
      var dl = el('dl', 'cat-dl');
      detailRow(dl, T.sample, x.sp);
      if (x.co && x.co !== x.sp) detailRow(dl, T.collection, x.co);
      detailRow(dl, T.prep, x.p);
      if (dl.firstChild) det.appendChild(dl);
      if (x.m && x.m.length) {
        det.appendChild(el('p', 'cat-label', T.includes + ' (' + x.m.length + ')'));
        var ul = el('ul', 'cat-comp');
        x.m.forEach(function (m) { ul.appendChild(el('li', null, m)); });
        det.appendChild(ul);
      }
      if (!x.d && !x.p && !x.sp && !(x.m && x.m.length)) det.appendChild(el('p', 'muted', T.no_details));
      if (x.u) {
        var a = el('a', 'link cat-page', T.open_page);
        a.href = C.page + x.u + '/';
        a.insertAdjacentHTML('beforeend', ICON_RIGHT);
        det.appendChild(a);
      }
    }

    function words(q) {
      var f = HP.fold(q);
      return f ? f.split(' ') : [];
    }
    // Every search word must start a word of the entry ("vit" finds "vitamina"); words of one or two
    // letters must match a whole word, so "vitamina d" does not also find "… dhe …".
    function matches(x, ws) {
      if (cat && x.c.indexOf(cat) === -1) return false;
      var hay = ' ' + x.q + ' ';
      for (var i = 0; i < ws.length; i++) {
        var w = ws[i];
        if (hay.indexOf(' ' + w + (w.length <= 2 ? ' ' : '')) === -1) return false;
      }
      return true;
    }
    // Ranking: the name equals / starts with / contains the search, then everything else (stable).
    function rank(x, phrase) {
      var n = HP.fold(x.n);
      if (n === phrase) return 0;
      if (n.indexOf(phrase) === 0) return 1;
      if ((' ' + n).indexOf(' ' + phrase) !== -1) return 2;
      if (x.s && HP.fold(x.s).indexOf(phrase) === 0) return 3;
      return 4;
    }

    function render() {
      var ws = words(input.value);
      shown = entries.filter(function (x) { return matches(x, ws); });
      if (ws.length) {
        var phrase = ws.join(' ');
        shown = shown.map(function (x, i) { return [rank(x, phrase), i, x]; })
          .sort(function (a, b) { return a[0] - b[0] || a[1] - b[1]; })
          .map(function (r) { return r[2]; });
      }
      if (sortedEl) sortedEl.hidden = ws.length > 0;
      listEl.innerHTML = '';
      var frag = document.createDocumentFragment();
      shown.slice(0, limit).forEach(function (x) { frag.appendChild(row(x)); });
      listEl.appendChild(frag);
      var n = shown.length;
      countEl.textContent = cat && !ws.length
        ? HP.fmt(T.count_in, { n: n, c: C.cats[cat] })
        : n === 1 ? T.count_one : HP.fmt(T.count_many, { n: n });
      var rest = n - Math.min(limit, n);
      moreBtn.hidden = rest <= 0;
      moreBtn.textContent = HP.fmt(T.more, { n: Math.min(rest, PAGE) });
      none.hidden = n > 0;
      var nw = $('[data-none-wa]');
      if (nw) nw.href = HP.waUrl(nw.getAttribute('data-msg') + ' ' + input.value.trim() + '?');
      if (grid) grid.hidden = !!(cat || ws.length);
      $$('[data-filters] [data-filter]').forEach(function (b) {
        var on = b.getAttribute('data-filter') === cat;
        b.setAttribute('aria-pressed', on ? 'true' : 'false');
        if (on) showChip(b);
      });
      HP.sync();
      var url = new URL(location.href);
      if (input.value.trim()) url.searchParams.set('q', input.value.trim()); else url.searchParams.delete('q');
      if (cat) url.searchParams.set('kategoria', cat); else url.searchParams.delete('kategoria');
      history.replaceState(null, '', url.pathname + url.search + url.hash);
    }

    /* the category row: arrows for mouse users, fades only on the sides that hide categories */
    var fwrap = $('[data-filters-wrap]');
    var frow = $('[data-filters]');
    var smooth = !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    function edges() {
      if (!fwrap) return;
      var max = frow.scrollWidth - frow.clientWidth;
      fwrap.classList.toggle('can-left', frow.scrollLeft > 2);
      fwrap.classList.toggle('can-right', frow.scrollLeft < max - 2);
    }
    function showChip(b) {
      if (!frow || frow.scrollWidth <= frow.clientWidth) return;
      var left = b.offsetLeft - (frow.clientWidth - b.offsetWidth) / 2;
      frow.scrollTo({ left: Math.max(0, left), behavior: smooth ? 'smooth' : 'auto' });
    }
    if (fwrap) {
      frow.addEventListener('scroll', edges, { passive: true });
      window.addEventListener('resize', edges);
      $$('[data-filters-step]', fwrap).forEach(function (b) {
        b.addEventListener('click', function () { frow.scrollBy({ left: +b.getAttribute('data-filters-step') * frow.clientWidth * 0.7, behavior: smooth ? 'smooth' : 'auto' }); });
      });
      edges();
    }

    var timer;
    input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(function () { limit = PAGE; render(); }, 120); });
    form.addEventListener('submit', function (e) { e.preventDefault(); limit = PAGE; render(); input.blur(); });
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-filter]');
      if (!b) return;
      cat = b.getAttribute('data-filter');
      limit = PAGE;
      render();
      if (b.classList.contains('cat-card')) {
        var top = countEl.getBoundingClientRect().top + window.scrollY - 200;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
    moreBtn.addEventListener('click', function () {
      var first = listEl.children.length;
      limit += PAGE;
      render();
      var next = listEl.children[first];
      if (next) $('.cat-toggle', next).focus();
    });
    var reset = $('[data-reset]');
    if (reset) reset.addEventListener('click', function () { input.value = ''; cat = ''; limit = PAGE; render(); input.focus(); });

    fetch(C.url)
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(function (data) {
        // A–Z, with names that start with a number (1,25-…, 17-OH…) after the letters.
        var digit = /^[0-9]/;
        entries = data.entries.slice().sort(function (a, b) {
          var da = digit.test(a.n), db = digit.test(b.n);
          return da === db ? a.n.localeCompare(b.n, C.lang) : da ? 1 : -1;
        });
        render();
      })
      .catch(function () { countEl.textContent = T.failed; });
  }

  // Deferred scripts run in document order, so this one runs before site.js has set window.HP:
  // start once the document (and every deferred script) is ready.
  if (document.readyState === 'complete') init();
  else document.addEventListener('DOMContentLoaded', init);
})();
