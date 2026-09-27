// Golden tests for the matching algorithm. Run: node --test docs/matching/reference.test.js
// The production implementation must pass the same cases with the same numbers.
const test = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const M = require('./reference.js');

const S = Object.fromEntries(M.SIGNS.map((s, i) => [s, i]));
const close = (a, b, eps = 0.01) => assert.ok(Math.abs(a - b) < eps, `${a} ≈ ${b}`);
const you = { sun: S.Taurus, moon: S.Sagittarius, mercury: S.Taurus, venus: S.Taurus, mars: S.Aries, rising: S.Libra, lookingFor: 'serious', photoVerified: true, isAlignPlus: false };
const juniper = { sun: S.Libra, moon: S.Gemini, mercury: S.Libra, venus: S.Virgo, mars: S.Cancer, rising: S.Aquarius, lookingFor: 'serious', photoVerified: true, isAlignPlus: true };

// Small seeded RNG so random tests are repeatable.
function rng(seed) { return () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296); }
function randomChart(rand, withTime = true) {
  const s = () => Math.floor(rand() * 12);
  return { sun: s(), moon: s(), mercury: s(), venus: s(), mars: s(), rising: withTime ? s() : null };
}

test('signs apart: 0..6, symmetric', () => {
  assert.strictEqual(M.signsApart(S.Aries, S.Aries), 0);
  assert.strictEqual(M.signsApart(S.Aries, S.Leo), 4);
  assert.strictEqual(M.signsApart(S.Aries, S.Libra), 6);
  assert.strictEqual(M.signsApart(S.Pisces, S.Aries), 1);
  for (let a = 0; a < 12; a++) for (let b = 0; b < 12; b++) {
    assert.strictEqual(M.signsApart(a, b), M.signsApart(b, a));
    assert.ok(M.signsApart(a, b) >= 0 && M.signsApart(a, b) <= 6);
  }
});

test('elements and rulers follow the table', () => {
  assert.deepStrictEqual([0, 1, 2, 3].map(M.element), ['Fire', 'Earth', 'Air', 'Water']);
  assert.strictEqual(M.element(S.Sagittarius), 'Fire');
  assert.strictEqual(M.RULER[S.Taurus], M.RULER[S.Libra]);
});

test('whole-sign houses', () => {
  assert.strictEqual(M.houseOf(S.Libra, S.Libra), 1);
  assert.strictEqual(M.houseOf(S.Aries, S.Libra), 7);
  assert.strictEqual(M.houseOf(S.Virgo, S.Libra), 12);
});

test('worked example: You × Juniper (golden numbers)', () => {
  const m = M.readPair(you, juniper);
  close(m.spark, 0.89); close(m.align, 0.77); close(m.rub, 0.85);
  assert.deepStrictEqual([m.spark, m.align, m.rub].map((v) => M.cardDots(v)), [1, 1, 1]);
  close(M.pull(you, juniper, m), 49, 0.5);
  assert.deepStrictEqual(M.pickCopyKeys(m), { spark: 'ruler:Venus', align: 'venus-venus:4', rub: 'rising-sun:3' });
});

test('no birth time drops Rising and partial Houses', () => {
  const m = M.readPair({ ...you, rising: null }, juniper);
  assert.ok(!('rising' in m.groups));
  close(m.spark, 0.70); close(m.align, 0.67); close(m.rub, 0.82);
  close(M.pull(you, juniper, m), 40.8, 0.5);
  const none = M.readPair({ ...you, rising: null }, { ...juniper, rising: null });
  assert.ok(!('houses' in none.groups));
});

test('readPair is symmetric for 500 random pairs', () => {
  const rand = rng(7);
  for (let i = 0; i < 500; i++) {
    const a = randomChart(rand, rand() > 0.2), b = randomChart(rand, rand() > 0.2);
    const ab = M.readPair(a, b), ba = M.readPair(b, a);
    close(ab.spark, ba.spark, 1e-9); close(ab.align, ba.align, 1e-9); close(ab.rub, ba.rub, 1e-9);
  }
});

test('verified bump only for Align+', () => {
  const m = M.readPair(you, juniper);
  const free = M.pull(you, { ...juniper, isAlignPlus: false }, m);
  close(M.pull(you, juniper, m) - free, 3, 1e-9);
});

test('looking for: same +8, serious vs fun −10 either way', () => {
  const m = M.readPair(you, juniper);
  const base = M.pull({ ...you, lookingFor: 'exploring' }, { ...juniper, lookingFor: 'serious', isAlignPlus: false }, m);
  close(M.pull(you, { ...juniper, isAlignPlus: false }, m) - base, 8, 1e-9);
  close(M.pull({ ...you, lookingFor: 'fun' }, { ...juniper, isAlignPlus: false }, m) - base, -10, 1e-9);
  close(M.pull(you, { ...juniper, lookingFor: 'fun', isAlignPlus: false }, m) - base, -10, 1e-9);
});

test('labels by percentile', () => {
  assert.strictEqual(M.label(3), 'FATED PULL');
  assert.strictEqual(M.label(20), 'STRONG PULL');
  assert.strictEqual(M.label(40), 'STEADY PULL');
  assert.strictEqual(M.label(90), 'SLOW BURN');
  assert.strictEqual(M.label(99), 'COMET');
});

test('moon phase matches real dates', () => {
  assert.strictEqual(M.moonPhase(new Date('2026-09-11T23:11:00Z')), 'new');
  assert.strictEqual(M.moonPhase(new Date('2026-09-26T23:11:00Z')), 'full');
  for (const mix of Object.values(M.DEFAULT_CONFIG.moonPhaseMix)) assert.strictEqual(mix.align + mix.spark + mix.wild, 15);
});

// Build a realistic nightly pool for one viewer.
function pool(n, seed, extra = () => ({})) {
  const rand = rng(seed);
  const viewer = { ...randomChart(rand), lookingFor: 'serious' };
  return Array.from({ length: n }, (_, i) => {
    const c = { id: `u${i}`, ...randomChart(rand, rand() > 0.15), lookingFor: ['serious', 'exploring', 'fun'][i % 3], photoVerified: rand() > 0.5, isAlignPlus: rand() > 0.8, ...extra(i, rand) };
    const m = M.readPair(viewer, c);
    return { ...c, pull: M.pull(viewer, c, m), type: M.cardType(m) };
  });
}
function checkDeck(ids, cands) {
  const deck = ids.map((id) => cands.find((c) => c.id === id));
  const D = M.DEFAULT_CONFIG.deck;
  assert.strictEqual(new Set(ids).size, ids.length, 'no duplicates');
  for (let i = 1; i < deck.length; i++) assert.notStrictEqual(deck[i].sun, deck[i - 1].sun, `same sun back to back at ${i}`);
  const per = (k) => Object.values(deck.reduce((acc, c) => ({ ...acc, [c[k]]: (acc[c[k]] || 0) + 1 }), {}));
  assert.ok(Math.max(...per('sun')) <= D.maxPerSun, 'sun cap');
  assert.ok(Math.max(...per('moon')) <= D.maxPerMoon, 'moon cap');
  assert.ok(new Set(deck.map((c) => M.element(c.sun))).size >= D.minElements, 'elements');
  assert.ok(deck.slice(0, 5).filter((c) => c.isAlignPlus).length <= D.alignPlusMaxInTop5, 'Align+ top 5 cap');
  return deck;
}

test('deal: 15 cards obey every variety rule, 50 random cities', () => {
  for (let seed = 1; seed <= 50; seed++) {
    const cands = pool(300, seed);
    const ids = M.dealSet(cands, { phase: 'waxing', skyElement: 'Fire' });
    assert.strictEqual(ids.length, 15);
    checkDeck(ids, cands);
  }
});

test('deal: incoming Aligns are always dealt, never in slots 1–2, max 5', () => {
  for (let seed = 1; seed <= 30; seed++) {
    const cands = pool(300, seed, (i) => ({ incoming: i % 40 === 0 })); // 8 incoming
    const deck = checkDeck(M.dealSet(cands, { phase: 'full', skyElement: 'Water' }), cands);
    const inc = deck.map((c, i) => [c, i]).filter(([c]) => c.incoming);
    assert.strictEqual(inc.length, 5);
    assert.ok(inc.every(([, i]) => i >= 2), 'incoming not in slots 1–2');
  }
});

test('deal: Align+ sets of 15 never repeat a card until the pool runs out', () => {
  const cands = pool(100, 3);
  const dealt = new Set();
  let sets = 0;
  for (;;) {
    const ids = M.dealSet(cands, { phase: 'new', skyElement: 'Air', alreadyDealt: dealt });
    if (!ids.length) break;
    ids.forEach((id) => { assert.ok(!dealt.has(id), 'repeat'); dealt.add(id); });
    sets++;
  }
  assert.ok(sets >= 5, `dealt ${sets} sets`);
  assert.strictEqual(dealt.size, 100 - Math.floor(100 * 0.03), 'everyone except the Comet pool');
});

test('deal: small pool still deals what exists', () => {
  const cands = pool(9, 11);
  assert.strictEqual(M.dealSet(cands, { phase: 'waning', skyElement: 'Earth' }).length, 9);
});

test('copy files cover every key the algorithm can produce', () => {
  const read = (f) => fs.readFileSync(path.join(__dirname, 'copy', f), 'utf8').trim().split('\n').slice(1).map((l) => l.split(',')[0]);
  const keys = new Set([...read('card-lines.csv'), ...read('house-lines.csv'), ...read('ruler-lines.csv')]);
  const rand = rng(99);
  for (let i = 0; i < 3000; i++) {
    const m = M.readPair(randomChart(rand, rand() > 0.2), randomChart(rand, rand() > 0.2));
    for (const k of Object.values(M.pickCopyKeys(m))) if (k) assert.ok(keys.has(k), `missing copy for ${k}`);
  }
});

// Minimal CSV reader (quoted fields) for copy templates.
function readCopy() {
  const out = {};
  for (const f of ['card-lines.csv', 'house-lines.csv', 'ruler-lines.csv']) {
    const lines = fs.readFileSync(path.join(__dirname, 'copy', f), 'utf8').trim().split('\n');
    const head = lines[0].split(',');
    for (const l of lines.slice(1)) {
      const cells = []; let cur = ''; let q = false;
      for (let i = 0; i < l.length; i++) {
        const c = l[i];
        if (q) { if (c === '"' && l[i + 1] === '"') { cur += '"'; i++; } else if (c === '"') q = false; else cur += c; }
        else if (c === '"') q = true; else if (c === ',') { cells.push(cur); cur = ''; } else cur += c;
      }
      cells.push(cur);
      const row = Object.fromEntries(head.map((h, i) => [h, cells[i]]));
      out[row.key] = row.card_line;
    }
  }
  return out;
}

test('card lines name the real placements, from each viewer’s side', () => {
  const T = readCopy();
  const render = (viewer, other, name) => Object.fromEntries(Object.entries(M.pickCopy(M.readPair(viewer, other)))
    .map(([k, v]) => [k, M.renderLine(T[v.key], v.vars, name)]));
  assert.deepStrictEqual(render(you, juniper, 'Juniper'), {
    spark: "Your Taurus and Juniper's Libra Suns are both traditionally ruled by Venus. You may share a taste for romance.",
    align: "Your Venus in Taurus and Juniper's in Virgo share an element, so values in love tend to line up.",
    rub: "Your Sun in Taurus squares Juniper's Rising in Aquarius. First impressions may not tell the whole story.",
  });
  assert.strictEqual(render(juniper, you, 'Sam').rub,
    "Your Rising in Aquarius squares Sam's Sun in Taurus. First impressions may not tell the whole story.");
});

test('every rendered card line is complete and fits the card (≤ 125 chars)', () => {
  const T = readCopy();
  const rand = rng(21);
  for (let i = 0; i < 5000; i++) {
    const m = M.readPair(randomChart(rand, rand() > 0.2), randomChart(rand, rand() > 0.2));
    for (const v of Object.values(M.pickCopy(m))) {
      if (!v) continue;
      const line = M.renderLine(T[v.key], v.vars, 'Juniper');
      assert.ok(!/[{}]/.test(line), `unfilled token: ${line}`);
      assert.ok(line.length <= 125, `too long (${line.length}): ${line}`);
    }
  }
});
