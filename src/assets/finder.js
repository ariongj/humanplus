/* Human+ — "Cila paketë ju përshtatet?" on /paketat/. Suggests check-ups from the visitor's answers; nothing is sent.
   The panels and texts come from #hp-finder (src/lib/finder.mjs); "Add" uses site.js (data-add-panel). */
(function () {
  'use strict';

  var form = document.querySelector('[data-finder]');
  var out = document.querySelector('[data-finder-result]');
  var status = document.querySelector('[data-finder-status]');
  var dataEl = document.getElementById('hp-finder');
  // Runs before site.js (deferred scripts go in document order); "Add" is handled by site.js once it has loaded.
  if (!form || !out || !dataEl) return;
  var D = JSON.parse(dataEl.textContent);
  var T = D.t;
  var P = D.panels;
  var useEl = document.querySelector('use[href*="icons.svg"]');
  var SPRITE = useEl ? useEl.getAttribute('href').split('#')[0] : '';

  // What each interest suggests (panel ids in src/data/tests.mjs). "routine" adds the general check-up for the profile.
  var RULES = {
    tired: ['vitamina', 'anemi', 'tiroide'],
    sugar: ['diabet'],
    heart: ['zemra'],
    thyroid: ['tiroide'],
    kidney: ['veshkat'],
    liver: ['melcia'],
    joints: ['reumatizem', 'autoimun'],
    stomach: ['stomaku'],
    allergy: ['alergji'],
    bones: ['kockat'],
    hormones: ['hormonet'],
    pregnancy: ['shtatzani'],
    surgery: ['operacion'],
    infections: ['infeksione'],
    child_tired: ['femije', 'anemi'],
    child_stomach: ['stomaku'],
  };
  var FOR_WOMEN = ['hormones', 'pregnancy'];
  function general(who, sex, age) {
    if (who === 'child') return 'femije';
    if (sex === 'f') return 'grua';
    if (sex === 'm' && age === 'o40') return 'burre';
    return 'baze';
  }

  function value(name) { var c = form.querySelector('input[name="' + name + '"]:checked'); return c ? c.value : ''; }
  function chosen() { return Array.prototype.map.call(form.querySelectorAll('input[name="c"]:checked'), function (c) { return c.value; }); }

  /** Shows the questions that fit: no step 2 for a child, no cycle / pregnancy for a man. */
  function fit() {
    var child = value('who') === 'child';
    var man = value('sex') === 'm';
    form.querySelector('[data-adult]').hidden = child;
    var num = form.querySelector('[data-step3]');
    if (num) num.textContent = child ? '2' : '3';
    Array.prototype.forEach.call(form.querySelectorAll('.finder-chip'), function (chip) {
      var who = chip.getAttribute('data-for');
      var input = chip.querySelector('input');
      var show = (who === 'both' || (who === 'child') === child) && !(man && !child && FOR_WOMEN.indexOf(input.value) !== -1);
      chip.hidden = !show;
      if (!show) input.checked = false;
    });
  }

  function suggest() {
    var cs = chosen();
    var base = general(value('who'), value('sex'), value('age'));
    var ids = [];
    cs.forEach(function (c) { (RULES[c] || []).forEach(function (id) { if (ids.indexOf(id) === -1) ids.push(id); }); });
    if ((cs.indexOf('routine') !== -1 || !ids.length) && ids.indexOf(base) === -1) ids.unshift(base);
    return { ids: ids.slice(0, 5), vague: !cs.length };
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function svg(name, size, brand) {
    var NS = 'http://www.w3.org/2000/svg';
    var s = document.createElementNS(NS, 'svg');
    s.setAttribute('class', brand ? 'i' : 'i i-s');
    s.setAttribute('width', size);
    s.setAttribute('height', size);
    s.setAttribute('aria-hidden', 'true');
    if (brand) s.setAttribute('fill', 'currentColor');
    var u = document.createElementNS(NS, 'use');
    u.setAttribute('href', SPRITE + '#' + (brand ? 'b-' : '') + name);
    s.appendChild(u);
    return s;
  }

  function card(id) {
    var p = P[id];
    var li = el('li', 'finder-card');
    var tile = el('span', 'tile tile-brand');
    tile.appendChild(svg(p.i, 22));
    li.appendChild(tile);
    var body = el('div', 'finder-card-body');
    var a = el('a', 'finder-card-name', p.n);
    a.href = '#paketa-' + id;
    body.appendChild(a);
    body.appendChild(el('p', 'finder-card-for', p.f));
    body.appendChild(el('p', 'finder-card-tests', p.t.split(',').length + ' ' + T.tests + ' · ' + p.l));
    var acts = el('div', 'finder-card-actions');
    var add = el('button', 'btn btn-soft btn-sm');
    add.type = 'button';
    add.setAttribute('data-add-panel', p.t);
    add.setAttribute('data-done', T.added);
    add.appendChild(svg('plus', 16));
    add.appendChild(el('span', '', T.add));
    acts.appendChild(add);
    var ask = el('a', 'btn btn-ghost btn-sm');
    ask.href = p.w;
    ask.target = '_blank';
    ask.rel = 'noopener';
    ask.appendChild(svg('whatsapp', 16, true));
    ask.appendChild(document.createTextNode(T.ask));
    acts.appendChild(ask);
    body.appendChild(acts);
    li.appendChild(body);
    return li;
  }

  function render() {
    fit();
    var r = suggest();
    out.textContent = '';
    out.appendChild(el('h3', 'finder-result-title', T.result));
    if (r.vague) out.appendChild(el('p', 'finder-result-more', T.result_more));
    var ul = el('ul', 'finder-cards');
    r.ids.forEach(function (id) { if (P[id]) ul.appendChild(card(id)); });
    out.appendChild(ul);
    // screen readers hear only the names, not every card again
    if (status) status.textContent = T.result + ': ' + r.ids.filter(function (id) { return P[id]; }).map(function (id) { return P[id].n; }).join(', ') + '.';
  }

  form.addEventListener('change', render);
  render();
})();
