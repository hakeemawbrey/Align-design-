// Align matching algorithm v2 — reference implementation.
// Plain JS, no dependencies. Run: node docs/matching/reference.js
// Tests: node --test docs/matching/reference.test.js
// This is the source of truth for the math in matching-algorithm.md.
// Every tunable number lives in config.default.json (ship it as remote config).

const DEFAULT_CONFIG = require('./config.default.json');

// ─── 1. The 12 signs ─────────────────────────────────────────────
// Store every placement as an index 0–11. Never store sign names in the math.
const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'];
const element = (sign) => ELEMENTS[sign % 4]; // Aries=Fire, Taurus=Earth, Gemini=Air, Cancer=Water, repeat
// Traditional rulers (shared ruler = bonus Spark, "Venus rules you both").
const RULER = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury',
  'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];

// ─── 2. Signs apart ──────────────────────────────────────────────
// Distance around the 12-sign wheel, always 0–6.
function signsApart(a, b) {
  const d = (b - a + 12) % 12;
  return Math.min(d, 12 - d);
}

// ─── 3. Which placements get compared ────────────────────────────
// [personA field, personB field]. Cross pairs are listed in BOTH directions,
// so the result is symmetric (A sees the same meters as B).
const GROUPS = {
  moon: [['moon', 'moon'], ['sun', 'moon'], ['moon', 'sun']],
  love: [['venus', 'mars'], ['mars', 'venus'], ['venus', 'venus']],
  sun: [['sun', 'sun']],
  mercury: [['mercury', 'mercury'], ['mercury', 'moon'], ['moon', 'mercury']],
  rising: [['rising', 'rising'], ['sun', 'rising'], ['rising', 'sun']],
  houses: null, // see houseOverlays()
};
const NEEDS_BIRTH_TIME = new Set(['rising', 'houses']);

// ─── 4. House overlays (whole-sign houses) ───────────────────────
// House number = how many signs a planet is past the owner's Rising, +1. No cusp math.
const houseOf = (planetSign, risingSign) => ((planetSign - risingSign + 12) % 12) + 1;
function houseOverlays(a, b, cfg) {
  const rows = [];
  for (const [owner, guest] of [[a, b], [b, a]]) {
    if (owner.rising == null) continue; // owner has no birth time → no houses for them
    for (const planet of ['sun', 'moon', 'venus']) {
      const house = houseOf(guest[planet], owner.rising);
      rows.push({ group: 'houses', copyKey: `house:${planet}:${house}`, points: cfg.housePoints[house] || [0, 0, 0] });
    }
  }
  return rows;
}

// ─── 5. Read the pair → Spark / Align / Rub meters ───────────────
// Depends only on the two charts, so cache the result per pair (see dev-handoff.md).
const avg = (rows) => [0, 1, 2].map((i) => rows.reduce((s, r) => s + r.points[i], 0) / rows.length);
function readPair(a, b, cfg = DEFAULT_CONFIG) {
  const bothTimes = a.rising != null && b.rising != null;
  let total = [0, 0, 0];
  let usedWeight = 0;
  const groups = {};
  const rows = [];
  for (const [name, pairs] of Object.entries(GROUPS)) {
    let groupRows;
    if (name === 'houses') groupRows = houseOverlays(a, b, cfg);
    else if (NEEDS_BIRTH_TIME.has(name) && !bothTimes) groupRows = [];
    else {
      groupRows = pairs.map(([pa, pb]) => {
        const apart = signsApart(a[pa], b[pb]);
        return { group: name, copyKey: `${[pa, pb].sort().join('-')}:${apart}`, points: cfg.aspectPoints[apart] };
      });
    }
    if (groupRows.length === 0) continue; // group skipped → its weight is redistributed
    const score = avg(groupRows);
    groups[name] = score;
    rows.push(...groupRows);
    total = total.map((t, i) => t + score[i] * cfg.groupWeights[name]);
    usedWeight += cfg.groupWeights[name];
  }
  let [spark, align, rub] = total.map((t) => t / usedWeight);
  let sharedRuler = null;
  if (a.sun !== b.sun && RULER[a.sun] === RULER[b.sun]) {
    spark += cfg.sharedRulerSpark;
    sharedRuler = RULER[a.sun];
  }
  return { spark, align, rub, groups, rows, sharedRuler };
}

// Meter value → dots. Card shows 0–3, S-21 shows 0–5.
function cardDots(v, cfg = DEFAULT_CONFIG) {
  const [one, two, three] = cfg.cardDotThresholds;
  return v >= three ? 3 : v >= two ? 2 : v >= one ? 1 : 0;
}
const detailDots = (v, cfg = DEFAULT_CONFIG) =>
  Math.max(0, Math.min(5, Math.round((v / cfg.detailDotsFullScale) * 5)));

// Card copy: for each meter, the row that scored highest in that meter picks the sentence.
// Keys match copy/card-lines.csv (e.g. "mercury-moon:2"), copy/house-lines.csv, copy/ruler-lines.csv.
function pickCopyKeys(meters, cfg = DEFAULT_CONFIG) {
  const pick = (i) => {
    let best = null;
    for (const r of meters.rows) {
      const score = r.points[i] * cfg.groupWeights[r.group];
      if (score > 0 && (!best || score > best.score)) best = { key: r.copyKey, score };
    }
    return best && best.key;
  };
  return {
    spark: meters.sharedRuler ? `ruler:${meters.sharedRuler}` : pick(0),
    align: pick(1),
    rub: pick(2),
  };
}

// ─── 6. Pull (0–100, never shown) ────────────────────────────────
function pull(viewer, candidate, meters, { phase, now } = {}, cfg = DEFAULT_CONFIG) {
  const P = cfg.pull;
  const base = P.alignWeight * meters.align + P.sparkWeight * meters.spark - P.rubWeight * meters.rub;
  let p = (base / P.scaleDivisor) * 100;
  if (viewer.lookingFor === candidate.lookingFor) p += P.lookingForSame;
  else if ([viewer.lookingFor, candidate.lookingFor].sort().join('|') === 'fun|serious') p += P.lookingForSeriousVsFun;
  if (candidate.photoVerified && candidate.isAlignPlus) p += P.verifiedAlignPlusBump;
  if (phase === 'new' && candidate.joinedAt && now &&
      (now - new Date(candidate.joinedAt)) / 864e5 < P.newUserDays) p += P.newUserNewMoonBump;
  return Math.max(0, Math.min(100, p));
}

// Label = where this Pull ranks inside the viewer's own eligible pool.
function label(percentileFromTop, cfg = DEFAULT_CONFIG) {
  const L = cfg.labelPercentiles;
  if (percentileFromTop <= L.fated) return 'FATED PULL';
  if (percentileFromTop <= L.strong) return 'STRONG PULL';
  if (percentileFromTop <= L.steady) return 'STEADY PULL';
  if (percentileFromTop <= L.slowBurn) return 'SLOW BURN';
  return 'COMET'; // bottom slice: never dealt, Comet pool only
}

// ─── 7. Moon phase → tonight's deck mix (same for every user) ────
// Phase comes from the date only. It changes the MIX of the deck, never anyone's Pull.
const SYNODIC_MONTH = 29.530588853; // days from one New Moon to the next
const KNOWN_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14); // reference New Moon
function moonAge(date) { // days since the last New Moon, 0–29.53
  const days = (date.getTime() - KNOWN_NEW_MOON) / 86400000;
  return ((days % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH;
}
function moonPhase(date) {
  const age = moonAge(date);
  if (age < 1.85 || age >= 27.68) return 'new';
  if (age < 12.91) return 'waxing';
  if (age < 16.61) return 'full';
  return 'waning';
}

// ─── 8. Card type (for the deck mix) ─────────────────────────────
function cardType(meters, cfg = DEFAULT_CONFIG) {
  const D = cfg.deck;
  const strongCore = ['moon', 'love'].some((g) => meters.groups[g] &&
    Math.max(meters.groups[g][0], meters.groups[g][1]) >= D.wildcardMinGroupScore);
  if (cardDots(meters.rub, cfg) >= D.wildcardMinRubDots && strongCore) return 'wild';
  return meters.spark > meters.align ? 'spark' : 'align';
}

// ─── 9. Deal one set of cards ────────────────────────────────────
// candidates: [{ id, sun, moon, pull, type, isAlignPlus, incoming }] — already past Step 1
// filters and with Pull computed. `incoming` = this person already Aligned with the viewer.
// Returns ordered ids. Call again with `alreadyDealt` for the next Align+ set of 15.
function dealSet(candidates, { phase, skyElement, alreadyDealt = new Set() }, cfg = DEFAULT_CONFIG) {
  const D = cfg.deck;
  const mix = cfg.moonPhaseMix[phase];

  // Comet pool = bottom slice of Pull. Never dealt, except incoming Aligns always stay eligible.
  const byPull = [...candidates].sort((x, y) => y.pull - x.pull);
  const cometCount = Math.floor((byPull.length * cfg.cometBottomPercent) / 100);
  const comet = new Set(byPull.slice(byPull.length - cometCount).filter((c) => !c.incoming).map((c) => c.id));
  const pool = byPull.filter((c) => !alreadyDealt.has(c.id) && !comet.has(c.id));

  // Incoming Aligns go first in line (capped), so mutual matches can actually happen.
  const incomingIds = new Set(pool.filter((c) => c.incoming).slice(0, D.incomingMaxPerSet).map((c) => c.id));

  // Rules are relaxed in this order only if the pool is too small to fill the set.
  const relaxOrder = ['quota', 'moonCap', 'sunCap', 'backToBack'];
  for (let level = 0; level <= relaxOrder.length; level++) {
    const off = new Set(relaxOrder.slice(0, level));
    const deck = [];
    const used = new Set();
    const count = (key, val) => deck.filter((c) => c[key] === val).length;
    const typeCount = (t) => deck.filter((c) => c.type === t).length;
    for (let slot = 1; slot <= D.setSize; slot++) {
      let best = null;
      let bestScore = -Infinity;
      for (const c of pool) {
        if (used.has(c.id)) continue;
        if (!off.has('quota') && !incomingIds.has(c.id) && typeCount(c.type) >= mix[c.type]) continue;
        if (!off.has('sunCap') && count('sun', c.sun) >= D.maxPerSun) continue;
        if (!off.has('moonCap') && count('moon', c.moon) >= D.maxPerMoon) continue;
        if (!off.has('backToBack') && deck.length && deck[deck.length - 1].sun === c.sun) continue;
        let score = c.pull + (incomingIds.has(c.id) ? 1000 : 0);
        if (slot <= D.skyTiltSlots && element(c.sun) === skyElement &&
            deck.filter((d) => element(d.sun) === skyElement).length < D.skyTiltMaxCards) score += D.skyTiltBonus;
        if (score > bestScore) { best = c; bestScore = score; }
      }
      if (!best) break;
      deck.push(best);
      used.add(best.id);
    }
    const target = Math.min(D.setSize, pool.length);
    if (deck.length < target && level < relaxOrder.length) continue;
    ensureElements(deck, pool, used, D);
    applyPriority(deck, D);
    placeIncoming(deck, incomingIds, D);
    if (!off.has('backToBack')) fixBackToBack(deck, incomingIds, D);
    return deck.map((c) => c.id);
  }
  return [];
}

// At least D.minElements elements: swap the lowest-Pull card of the most common element
// for the best unused card of a missing element (keeps incoming cards).
function ensureElements(deck, pool, used, D) {
  const present = () => new Set(deck.map((c) => element(c.sun)));
  let guard = 0;
  while (present().size < D.minElements && guard++ < 4) {
    const missing = ELEMENTS.filter((e) => !present().has(e));
    const add = pool.find((c) => !used.has(c.id) && missing.includes(element(c.sun)));
    if (!add) return;
    const counts = {};
    deck.forEach((c) => { counts[element(c.sun)] = (counts[element(c.sun)] || 0) + 1; });
    const common = Object.entries(counts).sort((x, y) => y[1] - x[1])[0][0];
    const victims = deck.filter((c) => element(c.sun) === common && !c.incoming);
    if (!victims.length) return;
    const victim = victims.reduce((lo, c) => (c.pull < lo.pull ? c : lo));
    deck[deck.indexOf(victim)] = add;
    used.add(add.id);
  }
}

// Incoming Aligns sit from slot 3 onward so the user can't tell who already said yes.
function placeIncoming(deck, incomingIds, D) {
  const earliest = D.incomingEarliestSlot - 1;
  for (let i = 0; i < Math.min(earliest, deck.length); i++) {
    if (!incomingIds.has(deck[i].id)) continue;
    const j = deck.findIndex((c, k) => k >= earliest && !incomingIds.has(c.id));
    if (j === -1) continue;
    const [card] = deck.splice(i, 1);
    deck.splice(j, 0, card);
    i--;
  }
}

// Align+ lands earlier, but never more than D.alignPlusMaxInTop5 of them in the top 5.
function applyPriority(deck, D) {
  const topN = Math.min(5, deck.length);
  const inTop = () => deck.slice(0, topN).filter((c) => c.isAlignPlus).length;
  // Too many Align+ already in the top 5 → rebuild the top 5 with the first allowed Align+
  // cards plus the best non-Align+ cards; the bumped Align+ cards go right after slot 5.
  if (inTop() > D.alignPlusMaxInTop5) {
    const top = [];
    const bumped = [];
    const rest = [];
    for (const c of deck) {
      const plusInTop = top.filter((t) => t.isAlignPlus).length;
      if (top.length < topN && (!c.isAlignPlus || plusInTop < D.alignPlusMaxInTop5)) top.push(c);
      else if (top.length < topN && c.isAlignPlus) bumped.push(c);
      else rest.push(c);
    }
    deck.splice(0, deck.length, ...top, ...bumped, ...rest);
  }
  // Room left → pull the best Align+ cards from below into the top 5 (slots 2 and 4 first).
  const below = deck.filter((c, k) => k >= topN && c.isAlignPlus && !c.incoming)
    .slice(0, Math.max(0, D.alignPlusMaxInTop5 - inTop()));
  for (const card of below) {
    const free = [1, 3, 0, 2, 4].find((k) => k < topN && !deck[k].isAlignPlus);
    if (free === undefined) break;
    deck.splice(deck.indexOf(card), 1);
    deck.splice(free, 0, card); // the card it displaced shifts down one slot
  }
}

// Never the same Sun back to back: swap the offending card with any card (earlier or later)
// where both swapped cards then differ from their new neighbours. Incoming Aligns never
// move into the first slots.
function fixBackToBack(deck, incomingIds, D) {
  const earliest = D.incomingEarliestSlot - 1;
  const fits = (card, pos, skip) => [pos - 1, pos + 1].every((n) =>
    n < 0 || n >= deck.length || n === skip || deck[n].sun !== card.sun);
  const allowed = (card, pos) => !(incomingIds.has(card.id) && pos < earliest);
  for (let i = 1; i < deck.length; i++) {
    if (deck[i].sun !== deck[i - 1].sun) continue;
    for (let k = 0; k < deck.length; k++) {
      if (k === i || k === i - 1) continue;
      const a = deck[i], b = deck[k];
      if (!allowed(a, k) || !allowed(b, i)) continue;
      [deck[i], deck[k]] = [b, a];
      const plusTop5 = deck.slice(0, 5).filter((c) => c.isAlignPlus).length;
      if (fits(deck[i], i, -1) && fits(deck[k], k, -1) && plusTop5 <= D.alignPlusMaxInTop5) break;
      [deck[i], deck[k]] = [a, b]; // undo
    }
  }
}

module.exports = {
  DEFAULT_CONFIG, SIGNS, ELEMENTS, element, RULER, signsApart, houseOf, readPair, cardDots, detailDots,
  pickCopyKeys, pull, label, moonAge, moonPhase, cardType, dealSet,
};

// ─── Worked example (matches the doc) ────────────────────────────
if (require.main === module) {
  const S = Object.fromEntries(SIGNS.map((s, i) => [s, i]));
  const you = { sun: S.Taurus, moon: S.Sagittarius, mercury: S.Taurus, venus: S.Taurus, mars: S.Aries, rising: S.Libra, lookingFor: 'serious', photoVerified: true, isAlignPlus: false };
  const juniper = { sun: S.Libra, moon: S.Gemini, mercury: S.Libra, venus: S.Virgo, mars: S.Cancer, rising: S.Aquarius, lookingFor: 'serious', photoVerified: true, isAlignPlus: true };
  const m = readPair(you, juniper);
  const r = (x) => Math.round(x * 100) / 100;
  for (const [g, v] of Object.entries(m.groups)) console.log(g.padEnd(8), 'spark', r(v[0]), 'align', r(v[1]), 'rub', r(v[2]));
  console.log('METERS  spark', r(m.spark), 'align', r(m.align), 'rub', r(m.rub));
  console.log('DOTS    spark', cardDots(m.spark), 'align', cardDots(m.align), 'rub', cardDots(m.rub));
  console.log('COPY   ', pickCopyKeys(m));
  console.log('PULL   ', r(pull(you, juniper, m)));
  const noTime = readPair({ ...you, rising: null }, juniper);
  console.log('NO BIRTH TIME  spark', r(noTime.spark), 'align', r(noTime.align), 'rub', r(noTime.rub), 'pull', r(pull(you, juniper, noTime)));
  for (const d of ['2026-09-11', '2026-09-18', '2026-09-26', '2026-10-03']) {
    const t = new Date(`${d}T23:11:00Z`);
    console.log('MOON', d, moonPhase(t), r(moonAge(t)), DEFAULT_CONFIG.moonPhaseMix[moonPhase(t)].header);
  }
}
