// Align matching algorithm v2 — reference implementation.
// Plain JS, no dependencies. Run: node docs/matching/reference.js
// This is the source of truth for the math in matching-algorithm.md.
// Every number marked TUNE is a starting value, not a law.

// ─── 1. The 12 signs ─────────────────────────────────────────────
// Store every placement as an index 0–11. Never store sign names in the math.
const SIGNS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const ELEMENTS = ['Fire', 'Earth', 'Air', 'Water'];
const element = (sign) => ELEMENTS[sign % 4]; // Aries=Fire, Taurus=Earth, Gemini=Air, Cancer=Water, repeat
// Traditional rulers (shared ruler = bonus Spark, "Venus rules you both").
const RULER = ['Mars', 'Venus', 'Mercury', 'Moon', 'Sun', 'Mercury',
  'Venus', 'Mars', 'Jupiter', 'Saturn', 'Saturn', 'Jupiter'];

// ─── 2. Signs apart → aspect → meter points ──────────────────────
// Distance around the 12-sign wheel, always 0–6.
function signsApart(a, b) {
  const d = (b - a + 12) % 12;
  return Math.min(d, 12 - d);
}
// [spark, align, rub] points for each distance. TUNE
const ASPECT_POINTS = {
  0: [3, 1, 0], // Conjunction  — same sign
  1: [0, 0, 1], // Semi-sextile — neighbours, a little awkward
  2: [0, 2, 0], // Sextile      — easy, friendly
  3: [0, 0, 3], // Square       — friction
  4: [0, 3, 0], // Trine        — same element, effortless
  5: [0, 0, 2], // Quincunx     — mismatched
  6: [2, 0, 1], // Opposition   — magnetic tension
};

// ─── 3. Which placements get compared, grouped, with weights ─────
// [personA field, personB field]. Every cross pair is listed in BOTH directions,
// so the result is symmetric (A sees the same meters as B).
const GROUPS = {
  moon: { weight: 25, pairs: [['moon', 'moon'], ['sun', 'moon'], ['moon', 'sun']] },
  love: { weight: 20, pairs: [['venus', 'mars'], ['mars', 'venus'], ['venus', 'venus']] },
  sun: { weight: 15, pairs: [['sun', 'sun']] },
  mercury: { weight: 10, pairs: [['mercury', 'mercury'], ['mercury', 'moon'], ['moon', 'mercury']] },
  rising: { weight: 15, pairs: [['rising', 'rising'], ['sun', 'rising'], ['rising', 'sun']], needsBirthTime: true },
  houses: { weight: 15, needsBirthTime: true }, // see houseOverlays()
};

// ─── 4. House overlays (whole-sign houses) ───────────────────────
// House number = how many signs a planet is past your Rising, +1. No cusp math.
const houseOf = (planetSign, risingSign) => ((planetSign - risingSign + 12) % 12) + 1;
// [spark, align, rub] for landing in these houses. Every other house = 0. TUNE
const HOUSE_POINTS = {
  1: [3, 0, 0], // self / first impression → attraction
  5: [2, 1, 0], // romance, fun
  7: [0, 3, 0], // partnership
  8: [2, 0, 1], // intimacy, intensity
};
function houseOverlays(a, b) {
  const checks = [];
  for (const [owner, guest] of [[a, b], [b, a]]) {
    if (owner.rising == null) continue; // owner has no birth time → no houses for them
    for (const p of ['sun', 'moon', 'venus']) {
      checks.push(HOUSE_POINTS[houseOf(guest[p], owner.rising)] || [0, 0, 0]);
    }
  }
  return checks;
}

// ─── 5. Read the pair → Spark / Align / Rub meters (0–3) ─────────
const avg = (rows) => [0, 1, 2].map((i) => rows.reduce((s, r) => s + r[i], 0) / rows.length);
function readPair(a, b) {
  const bothTimes = a.rising != null && b.rising != null;
  let total = [0, 0, 0];
  let usedWeight = 0;
  const groups = {};
  for (const [name, g] of Object.entries(GROUPS)) {
    let rows;
    if (name === 'houses') rows = houseOverlays(a, b);
    else if (g.needsBirthTime && !bothTimes) rows = [];
    else rows = g.pairs.map(([pa, pb]) => ASPECT_POINTS[signsApart(a[pa], b[pb])]);
    if (rows.length === 0) continue; // group skipped → its weight is redistributed
    const score = avg(rows);
    groups[name] = score;
    total = total.map((t, i) => t + score[i] * g.weight);
    usedWeight += g.weight;
  }
  let [spark, align, rub] = total.map((t) => t / usedWeight);
  if (a.sun !== b.sun && RULER[a.sun] === RULER[b.sun]) spark += 0.5; // shared ruler bonus. TUNE
  return { spark, align, rub, groups };
}

// Meter value → dots. Card shows 0–3, S-21 shows 0–5. TUNE thresholds
const cardDots = (v) => (v >= 1.4 ? 3 : v >= 0.9 ? 2 : v >= 0.4 ? 1 : 0);
const detailDots = (v) => Math.max(0, Math.min(5, Math.round((v / 2) * 5)));

// ─── 6. Pull (0–100, never shown) ────────────────────────────────
const LOOKING_FOR = { // TUNE
  same: 8, // serious+serious, fun+fun, exploring+exploring
  'serious|fun': -10,
  'fun|serious': -10,
};
function pull(viewer, candidate, meters) {
  const base = meters.align + 0.8 * meters.spark - 0.4 * meters.rub; // TUNE
  let p = (base / 3) * 100;
  if (viewer.lookingFor === candidate.lookingFor) p += LOOKING_FOR.same;
  else p += LOOKING_FOR[`${viewer.lookingFor}|${candidate.lookingFor}`] || 0;
  if (candidate.photoVerified) p += 3; // TUNE
  return Math.max(0, Math.min(100, p));
}

// Label = where this Pull ranks inside the viewer's own eligible pool.
function label(percentileFromTop) {
  if (percentileFromTop <= 5) return 'FATED PULL';
  if (percentileFromTop <= 25) return 'STRONG PULL';
  if (percentileFromTop <= 60) return 'STEADY PULL';
  if (percentileFromTop <= 97) return 'SLOW BURN';
  return 'COMET'; // bottom 3%: never dealt, Comet pool only
}

module.exports = { SIGNS, element, RULER, signsApart, houseOf, readPair, cardDots, detailDots, pull, label };

// ─── Worked example (matches the doc) ────────────────────────────
if (require.main === module) {
  const S = Object.fromEntries(SIGNS.map((s, i) => [s, i]));
  const you = { sun: S.Taurus, moon: S.Sagittarius, mercury: S.Taurus, venus: S.Taurus, mars: S.Aries, rising: S.Libra, lookingFor: 'serious', photoVerified: true };
  const juniper = { sun: S.Libra, moon: S.Gemini, mercury: S.Libra, venus: S.Virgo, mars: S.Cancer, rising: S.Aquarius, lookingFor: 'serious', photoVerified: true };
  const m = readPair(you, juniper);
  const r = (x) => Math.round(x * 100) / 100;
  for (const [g, v] of Object.entries(m.groups)) console.log(g.padEnd(8), 'spark', r(v[0]), 'align', r(v[1]), 'rub', r(v[2]));
  console.log('METERS  spark', r(m.spark), 'align', r(m.align), 'rub', r(m.rub));
  console.log('DOTS    spark', cardDots(m.spark), 'align', cardDots(m.align), 'rub', cardDots(m.rub));
  console.log('PULL   ', r(pull(you, juniper, m)));
  const noTime = readPair({ ...you, rising: null }, juniper);
  console.log('NO BIRTH TIME  spark', r(noTime.spark), 'align', r(noTime.align), 'rub', r(noTime.rub), 'pull', r(pull(you, juniper, noTime)));
}
