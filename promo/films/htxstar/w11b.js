// Houston Star Talk · worker w11 · MOVIE TRAILERS (hst273–hst285). Engine: starrace/ep.js; props: kit.js + w11kit.js.
// Grammar: letterbox + grain, a busy Houston opening shot, "THIS JANUARY" title cards, voice-over subtitles, a made-up
// rating card, the release card (JAN 9, only at the Houston beta party), then the party ticket. No studio/rating marks.
import { clamp, prog, ease } from '../../src/lib.js'
import { FLOOR, box, txt, table } from '../starrace/ep.js'
import { label, sparkles, hearts, notes, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, MINT, SKYB, LAV } from '../signs3kit.js'
import { skyline, car, freeway, sweat, heatSun, shimmer, partyCard, taco, BRAKE, overheadSign, streetSign, shield, loopMap, puffer, inviteCard, soupPot, coffeeShop, houses, mural, kolache, klobasnek, phoneFlash } from './kit.js'
import { Y, BADGE, Kp, fadeK, mono, night, duskSky, bayou, bats, bridge, shop, curtains, spotlight, stage, partyRoom, lobby, parkingLot, boba, paddleBoat, mosquito, cape, cowboyHat, readingGlasses, clipboardOn, tumbleweed, boot, radioDish, viewfinder, tacoStandMansion, yearbook, bars, grain, tint, tcard, ratingCard, releaseCard, laurel, castCard, vo, flare, phoneChat } from './w11kit.js'

// trailer sting: a low boom + bell on frame 0 (the calm mix keeps toms and bells)
const TSTING = [['tom', 0.0, 55, { gain: 0.34, decay: 0.9 }], ['bell', 0.02, 1046.5, 0.03, 1.6, 0], ['glitter', 0.0, 0.7]]
const hit = t0 => ['tom', t0, 60, { gain: 0.3, decay: 0.7 }]
const cin = (extra, a = 0.06) => (x, t, lt, P) => { extra?.(x, t, lt, P); grain(x, t, a); bars(x) }
const card = (lines, o = {}) => ({ dur: o.dur ?? 2.0, set: (x, t, lt) => tcard(x, t, lt, lines, o), cast: {} })
const rate = (r, why, dur = 2.6) => ({ dur, set: (x, t, lt) => ratingCard(x, t, lt, r, why), cast: {} })
const rel = (sub, dur = 2.6) => ({ dur, set: (x, t, lt) => releaseCard(x, t, lt, { sub }), cast: {} })
const cuts = (n, lt, d) => Math.min(n - 1, Math.floor(lt / d))   // a quick-cut montage index
// scene times for the cue list: a hit on each title card
const hitsAt = (scenes, pred) => { let a = 0; const out = []; for (const s of scenes) { if (pred(s)) out.push(hit(a + 0.05)); a += s.dur } return out }
const T = (o) => { o.cues = [...TSTING, ...hitsAt(o.scenes, s => s.cast && !Object.keys(s.cast).length), ...(o.cues || [])]; o.badge = BADGE; o.endLen = 6.2; return o }

// ── hst273 · In a city with three loops… (epic romance)
const e273 = T({
  hook: 'In a city with | three loops… | one love',
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Cross every loop. Jan 9.', stars: ['taurus', 'scorpio', 'libra', 'pisces'] }),
  scenes: [
    { dur: 3.6, set: (x, t) => { duskSky(x, '#120c2a', '#3a1d52', '#c2557a'); skyline(x, FLOOR - 140, t, { alpha: 0.9 }); freeway(x, FLOOR - 150, 400, 4, t * 500); for (let k = 0; k < 4; k++) car(x, (k * 330 + t * 420) % 1400 - 160, FLOOR - 60 + (k % 2) * 160, ['#e05a3a', '#5ec8ff', '#f2c75c', '#ff8fb1'][k], { s: 0.8, brake: k % 2 }) },
      front: cin((x, t, lt) => vo(x, lt, 'You think you know | Houston dating…', 2.7)), cast: { taurus: [[0, 540, 980, 220]] }, mood: { taurus: 'squint' }, hops: { taurus: [0.05, 0.5] },
      lines: [[0.4, 2.0, 'taurus', 'you ready | for this?']] },
    { dur: 3.4, set: (x, t) => { night(x, t, '#2a2430'); tacoStandMansion(x, t) }, front: cin((x, t, lt) => vo(x, lt, 'where a taco stand | lives next to a mansion…', 0.2)),
      cast: { taurus: [[0, 240, 1000, 180]] }, mood: { taurus: 'heart' } },
    card(['THIS JANUARY']),
    { dur: 3.6, set: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.6 }); freeway(x, FLOOR - 160, 600, 3, t * 400); overheadSign(x, 540, 640, 'BELTWAY 8', 'FROM PEARLAND', 1) },
      front: cin((x, t, lt) => { car(x, 540, FLOOR + 120, '#8fd36b', { open: true }); vo(x, lt, 'one Taurus | from Pearland…', 2.0) }), cast: { taurus: [[0, 520, FLOOR + 5, 190]] }, mood: { taurus: 'sparkle' },
      lines: [[0.3, 1.5, 'taurus', "it's a | pear-fect night."]] },
    { dur: 3.6, set: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.7 }); freeway(x, FLOOR - 160, 600, 3, t * 600); shield(x, 860, 560, '610', 1.1) },
      front: cin((x, t, lt, P) => { car(x, 540, FLOOR + 120, '#8fd36b', { open: true }); const [cx, cy, s] = P.at('taurus'); sweat(x, cx + s * 0.4, cy - s * 0.4, t, 3); vo(x, lt, '…will cross | every loop.', 1.8) }), cast: { taurus: [[0, 520, FLOOR + 5, 190]] }, mood: { taurus: 'wide' },
      lines: [[0.3, 1.4, 'taurus', 'inside | the Loop?!']] },
    card(['FOR LOVE.']),
    { dur: 3.6, set: (x, t) => { mural(x, t); x.fillStyle = '#2a2440'; x.fillRect(0, FLOOR + 60, 1080, 600) }, front: cin(),
      cast: { scorpio: [[0, 760, Y, 250]], taurus: [[0, 260, Y, 220]] }, mood: { scorpio: lt => lt > 0.6 ? 'wide' : 'squint', taurus: 'heart' }, hops: { scorpio: [0.6] },
      lines: [[0.8, 1.4, 'scorpio', 'you drove | from Pearland?'], [2.4, 1.1, 'taurus', 'for you.']] },
    { dur: 3.4, set: (x, t, lt) => { const i = cuts(3, lt, 1.15); if (i === 0) { duskSky(x, '#2a1d52', '#c2557a', '#ffb36b'); bayou(x, t); bridge(x, FLOOR - 40); bats(x, t, 1, { cy: FLOOR - 120 }) } else if (i === 1) { duskSky(x, '#5ec8ff', '#9fe0ff', '#dff6ff'); bayou(x, t, { col: '#3a7a5a' }); paddleBoat(x, 380, FLOOR + 60, '#ff8fb1', t); paddleBoat(x, 720, FLOOR + 80, '#5ec8ff', t) } else { night(x, t); for (let k = 0; k < 3; k++) kolache(x, 300 + k * 240, 1100, 1.3) } },
      front: cin((x, t, lt) => vo(x, lt, 'this winter…', 0.2)), cast: { scorpio: [[0, 380, 900, 160]], taurus: [[0, 700, 900, 160]] }, mood: { scorpio: 'heart', taurus: 'heart' } },
    rate('RATED H', 'for Humidity, Highways | and Heart'),
    rel('crossing every loop'),
  ],
})

// ── hst274 · This January, you're the main character
const e274 = T({
  hook: "This January, you're | the main character",
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Your movie. Jan 9.', stars: ['leo', 'virgo', 'sagittarius', 'pisces'] }),
  scenes: [
    { dur: 3.6, set: (x, t) => { duskSky(x, '#2a1d52', '#e0607a', '#ffc46b'); skyline(x, FLOOR + 60, t); flare(x, 820, 600, t, 0.5) }, front: cin((x, t) => viewfinder(x, t), 0.04),
      cast: { leo: [[0, 540, 1050, 260]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.5] },
      lines: [[0.4, 1.6, 'leo', 'yes, YOU. | main character.'], [2.2, 1.3, 'leo', 'roll | camera.']] },
    card(['THIS JANUARY']),
    { dur: 3.4, set: (x, t) => partyRoom(x, t), front: cin((x, t, lt) => castCard(x, lt, 'LEO', 'your hype friend')),
      cast: { leo: [[0, 540, 1100, 280]] }, mood: { leo: 'heart' }, hops: { leo: [0.4, 0.8, 1.2] },
      lines: [[0.3, 2.6, 'leo', 'you look | AMAZING.']] },
    { dur: 3.6, set: (x, t) => { night(x, t); streetSign(x, 800, 620, 'MIDTOWN', { k: 1 }) }, front: cin((x, t, lt, P) => { clipboardOn(x, P, 'virgo'); castCard(x, lt, 'VIRGO', 'the one who made a plan') }),
      cast: { virgo: [[0, 440, 1100, 260]] }, mood: { virgo: 'squint' },
      lines: [[0.3, 1.5, 'virgo', 'I made | you a plan.'], [2.0, 1.4, 'virgo', 'parking | included.']] },
    { dur: 3.6, set: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.6 }); freeway(x, FLOOR - 160, 600, 3, t * 300); overheadSign(x, 540, 640, 'FEEDER RD', 'EXIT NOW', 1) },
      front: cin((x, t, lt) => { car(x, 540, FLOOR + 120, '#f2c75c', { open: true }); castCard(x, lt, 'SAGITTARIUS', 'your ride (running late)') }), cast: { sagittarius: [[0, 520, FLOOR + 5, 190]] }, mood: { sagittarius: 'sparkle' },
      lines: [[0.3, 1.3, 'sagittarius', 'five | minutes!'], [1.8, 1.0, 'sagittarius', '…twenty.']] },
    { dur: 3.4, set: (x, t) => { x.fillStyle = '#1a1033'; x.fillRect(0, 0, 1080, 1920); spotlight(x, 540, 1300, 420) }, front: cin((x, t, lt) => castCard(x, lt, 'PISCES', 'someone who cries at trailers')),
      cast: { pisces: [[0, 540, 1100, 270]] }, mood: { pisces: 'heart' },
      lines: [[0.4, 2.4, 'pisces', "it's so | beautiful *sniff*"]] },
    card(['ONE NIGHT.']),
    { dur: 3.8, set: (x, t, lt) => { partyRoom(x, t); spotlight(x, 540, 1300, 360, 'rgba(242,199,92,0.22)'); if (lt > 1.6) { label(x, 540, 1180, 'YOU', Kp(lt, 1.6), { size: 70, bg: GOLD }); sparkles(x, t, 540, 1150, t - lt + 1.6, 12, 260, 4) } }, front: cin(),
      cast: { leo: [[0, 160, 1250, 180]], virgo: [[0, 330, 1300, 160]], sagittarius: [[0, 750, 1300, 160]], pisces: [[0, 920, 1250, 180]] }, mood: { leo: 'sparkle', virgo: 'happy', sagittarius: 'sparkle', pisces: 'heart' }, hops: { leo: [1.7], virgo: [1.8], sagittarius: [1.9], pisces: [2.0] },
      lines: [[0.2, 1.3, 'leo', 'and the | lead role…'], [1.7, 1.8, 'pisces', '…is you!']] },
    { dur: 2.6, set: (x, t, lt) => { x.fillStyle = '#05040a'; x.fillRect(0, 0, 1080, 1920); txt(x, 'STARRING', 540, 700, { size: 44, col: BONE, font: MONO, weight: 700 }); txt(x, 'YOU', 540, 840, { size: 200, col: GOLD, font: SERIF, weight: 500 }); txt(x, 'LEO · VIRGO · SAGITTARIUS · PISCES', 540, 1010, { size: 40, col: BONE }); grain(x, t, 0.05) }, cast: {} },
    rate('RATED YOU', 'for Main-Character Energy', 2.4),
    rel('starring you', 2.4),
  ],
})

// ── hst275 · The cold day is coming for you (horror parody: 55°)
const e275 = (() => {
  const dark = (x, t) => { x.fillStyle = '#0a0a14'; x.fillRect(0, 0, 1080, 1920); houses(x, FLOOR + 60, t); x.fillStyle = 'rgba(10,10,20,0.55)'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#1a1a24'; x.fillRect(0, FLOOR + 60, 1080, 600); const on = Math.sin(t * 13) > -0.6 ? 1 : 0.2; box(x, 880, 700, 16, 650, '#5a5a6a', 4); x.fillStyle = `rgba(255,240,200,${(0.25 * on).toFixed(2)})`; x.beginPath(); x.moveTo(888, 700); x.lineTo(700, FLOOR + 60); x.lineTo(1080, FLOOR + 60); x.fill() }
  const therm = (x, t, cx, cy, s = 1) => { box(x, cx - 130 * s, cy - 70 * s, 260 * s, 140 * s, '#101820', 6); txt(x, '55°', cx, cy, { size: 100 * s, col: SKYB, font: MONO, weight: 700 }); x.save(); x.globalAlpha = 0.3 + 0.3 * Math.sin(t * 4); x.strokeStyle = SKYB; x.lineWidth = 6; x.strokeRect(cx - 140 * s, cy - 80 * s, 280 * s, 160 * s); x.restore() }
  const coat = (x, cx, top, col) => { box(x, cx - 70, top, 140, 260, col, 6); for (let k = 0; k < 4; k++) { x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(cx - 70, top + 50 + k * 50, 140, 8) } box(x, cx - 6, top - 40, 12, 40, '#8f96a0', 3) }
  return T({
    hook: 'The cold day is | coming for you',
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Coat optional. Jan 9.', stars: ['cancer', 'gemini', 'aries', 'capricorn'] }),
    cues: [['swell', 0.5, 3.4, { gain: 0.03, f0: 200, f1: 1200 }]],
    scenes: [
      { dur: 3.6, set: (x, t) => dark(x, t), front: cin((x, t, lt) => therm(x, t, 300, 820), 0.08), cast: { cancer: [[0, 640, Y, 240]] }, mood: { cancer: 'wide' }, hops: { cancer: [0.05] },
        lines: [[0.4, 1.4, 'cancer', 'you feel | that?'], [2.1, 1.3, 'cancer', '…a breeze.']] },
      { dur: 3.4, set: (x, t, lt) => { x.fillStyle = '#120c10'; x.fillRect(0, 0, 1080, 1920); const o = clamp(lt / 1.6) * 300; box(x, 240 - o, 420, 300, 900, '#4a3020', 8); box(x, 540 + o, 420, 300, 900, '#4a3020', 8); if (o > 40) for (let k = 0; k < 4; k++) coat(x, 330 + k * 140, 520, ['#e05a3a', '#2b5fb0', '#5a3a8a', '#1f7a4a'][k]) },
        front: cin((x, t, lt) => vo(x, lt, 'Every year… | it comes back.', 0.3), 0.08), cast: {} },
      card(['THIS JANUARY'], { col: BRAKE, flicker: true }),
      { dur: 3.6, set: (x, t) => dark(x, t), front: cin((x, t, lt, P) => puffer(x, P, 'gemini', '#5a3a8a'), 0.08), cast: { gemini: [[0, 540, Y, 250]] }, mood: { gemini: 'wide' },
        lines: [[0.3, 1.4, 'gemini', "it's | 55 degrees."]], stick: [[1.9, 1.5, 'BEANIE DETECTED', SKYB]] },
      { dur: 3.6, set: (x, t) => { x.fillStyle = '#1a1420'; x.fillRect(0, 0, 1080, 1920); shop(x, 540, FLOOR + 60, 'PHO', { col: '#8a5a3a', awn: '#d9402a', open: 'OPEN' }); soupPot(x, 840, 1180, t) },
        front: cin(null, 0.08), cast: { aries: [[0, 160, Y + 40, 170]], taurus: [[0, 330, Y + 40, 170]], virgo: [[0, 500, Y + 40, 170]], libra: [[0, 670, Y + 40, 170]] }, mood: { aries: 'wide', taurus: 'sleepy', virgo: 'squint', libra: 'neutral' },
        lines: [[0.4, 2.4, 'aries', 'the soup line… | it never ends.']] },
      { dur: 3.4, set: (x, t) => dark(x, t), front: cin((x, t, lt) => phoneFlash(x, 820, 1000, t, '55°', lt), 0.08), cast: { capricorn: [[0, 420, Y, 240]] }, mood: { capricorn: 'squint' },
        lines: [[0.3, 1.4, 'capricorn', 'posting it. | for proof.']] },
      card(['NOBODY IS SAFE…', '…FROM THE PUFFERS'], { col: BRAKE, size: 80, dur: 2.4 }),
      { dur: 3.8, set: (x, t) => { duskSky(x, '#ff8a3c', '#ffb347', '#ffe08a'); heatSun(x, 860, 520, t, 90); shimmer(x, 500, 900, t); x.fillStyle = '#6a5a4a'; x.fillRect(0, FLOOR + 60, 1080, 600) },
        front: cin((x, t, lt, P) => { for (const id of ['cancer', 'gemini']) { puffer(x, P, id, id === 'cancer' ? '#e05a3a' : '#5a3a8a'); const [cx, cy, s] = P.at(id); sweat(x, cx + s * 0.4, cy - s * 0.4, t, 3) } vo(x, lt, 'by Thursday…', 0.2, 1.4) }), cast: { cancer: [[0, 320, Y, 230]], gemini: [[0, 760, Y, 230]] }, mood: { cancer: 'wide', gemini: 'wide' },
        lines: [[1.8, 1.8, 'cancer', "it's 81 | again."]] },
      rate('RATED B', 'for Beanies, Broth | and one (1) Breeze'),
      rel('coat optional'),
    ],
  })
})()

// ── hst276 · Two signs, two sides of Houston (romcom: Third Ward × Bellaire Blvd)
const e276 = (() => {
  const split = (x, t) => { x.fillStyle = '#3a1d42'; x.fillRect(0, 0, 540, 1920); x.save(); x.beginPath(); x.rect(0, 0, 540, 1920); x.clip(); mural(x, t); x.restore(); x.fillStyle = '#20304a'; x.fillRect(540, 0, 540, 1920); for (let k = 0; k < 5; k++) { const lx = 600 + k * 100, ly = 520 + Math.sin(t * 2 + k) * 10; x.fillStyle = INK; x.fillRect(lx - 2, 420, 4, ly - 420); box(x, lx - 30, ly, 60, 80, BRAKE, 4); x.fillStyle = GOLD; x.fillRect(lx - 30, ly + 34, 60, 8) } x.fillStyle = INK; x.fillRect(532, 0, 16, 1920); mono(x, 'THIRD WARD', 270, 1420, 40, GOLD); mono(x, 'BELLAIRE BLVD', 810, 1420, 40, SKYB) }
  const park = (x, t) => { duskSky(x, '#5ec8ff', '#9fe0ff', '#dff6ff'); bayou(x, t, { col: '#3a7a6a', top: FLOOR - 120 }) }
  return T({
    hook: 'Two signs, two sides | of Houston. One date.',
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Both sides of town. Jan 9.', stars: ['aries', 'libra', 'cancer', 'pisces'] }),
    scenes: [
      { dur: 3.6, set: (x, t) => split(x, t), front: cin((x, t, lt) => { notes(x, t, 270, 900, { n: 4, seed: 2 }); boba(x, 900, 1180, 0.9) }, 0.04), cast: { aries: [[0, 270, 1150, 220]], libra: [[0, 810, 1150, 220]] }, mood: { aries: 'sparkle', libra: 'heart' }, hops: { aries: [0.05], libra: [0.2] },
        lines: [[0.4, 2.2, 'libra', 'you ever fall | for the other | side of town?']] },
      card(['THIS JANUARY']),
      { dur: 3.6, set: (x, t) => park(x, t), front: cin((x, t, lt) => { const b = clamp(lt / 1.0); paddleBoat(x, 140 + 240 * b, FLOOR + 40, '#ff8fb1', t); paddleBoat(x, 940 - 240 * b, FLOOR + 40, '#5ec8ff', t) }),
        cast: { aries: [[0, 140, FLOOR - 80, 150], [1.0, 380, FLOOR - 80, 150]], libra: [[0, 940, FLOOR - 80, 150], [1.0, 700, FLOOR - 80, 150]] }, mood: { aries: lt => lt > 1 ? 'wide' : 'sparkle', libra: lt => lt > 1 ? 'squint' : 'happy' },
        lines: [[1.1, 1.1, 'aries', 'my bad!'], [2.2, 1.4, 'libra', 'you steer like | the 610.']], stick: [[1.0, 1.0, 'BUMP', GOLD]] },
      card(['TWO SIDES OF TOWN']),
      { dur: 3.6, set: (x, t) => { x.fillStyle = '#20304a'; x.fillRect(0, 0, 1080, 1920); streetSign(x, 540, 520, 'BELLAIRE BLVD', { k: 1, pole: false }); for (let k = 0; k < 8; k++) { x.fillStyle = [BRAKE, GOLD][k % 2]; x.fillRect(80 + k * 130, 640 + Math.sin(t * 2 + k) * 8, 60, 70) } x.fillStyle = '#2a2a40'; x.fillRect(0, FLOOR + 60, 1080, 600) },
        front: cin((x, t) => boba(x, 540, 1150, 1)), cast: { libra: [[0, 260, Y, 220]], aries: [[0, 820, Y, 220]] }, mood: { libra: 'sparkle', aries: 'wide' },
        lines: [[0.3, 1.4, 'aries', 'how many | stops?'], [1.9, 1.4, 'libra', 'eleven. | pace yourself.']] },
      { dur: 3.6, set: (x, t) => { mural(x, t); x.fillStyle = '#3a2440'; x.fillRect(0, FLOOR + 60, 1080, 600) }, front: cin((x, t) => notes(x, t, 540, 900, { n: 6, seed: 4 })),
        cast: { aries: [[0, 380, Y, 230]], libra: [[0, 760, Y, 210]] }, mood: { aries: 'heart', libra: 'heart' }, hops: { aries: [0.4, 0.9, 1.4], libra: [2.2, 2.6] },
        lines: [[0.3, 1.8, 'aries', 'this is where | I learned | to dance.'], [2.3, 1.2, 'libra', 'show me.']] },
      { dur: 3.4, set: (x, t) => { x.fillStyle = '#1a1033'; x.fillRect(0, 0, 1080, 1920); shield(x, 300, 620, '59', 1.2); shield(x, 780, 620, '288', 1.2); txt(x, 'VS', 540, 620, { size: 80, col: GOLD }) },
        front: cin(), cast: { libra: [[0, 300, Y, 220]], aries: [[0, 780, Y, 220]] }, mood: { libra: 'squint', aries: 'squint' },
        lines: [[0.2, 1.2, 'libra', 'take 59.'], [1.6, 1.4, 'aries', '288. | trust me.']] },
      card(['ONE NIGHT'], { dur: 1.8 }),
      { dur: 3.4, set: (x, t, lt) => { partyRoom(x, t); if (lt > 1.4) hearts(x, t, 540, 900, t - lt + 1.4, { n: 8, seed: 6 }) }, front: cin(),
        cast: { aries: [[0, 100, Y, 220], [1.2, 420, Y, 220]], libra: [[0, 980, Y, 220], [1.2, 660, Y, 220]] }, mood: { aries: 'heart', libra: 'heart' },
        lines: [[1.3, 1.0, 'libra', 'you came!'], [2.3, 1.0, 'aries', 'took 59.']] },
      rate('RATED HTX', 'for Hand-holding, Boba | and a Route Debate'),
      rel('both sides of town'),
    ],
  })
})()

// ── hst277 · Your mission: find parking in Rice Village (action)
const e277 = (() => {
  const street = (x, t) => { night(x, t, '#2a2a3a'); streetSign(x, 860, 560, 'RICE VILLAGE', { k: 0.8 }); for (let k = 0; k < 5; k++) { box(x, k * 230 - 20, FLOOR - 40, 180, 60, ['#5a5a6a', '#7a4a3a', '#3a5a7a', '#6a6a4a', '#4a3a6a'][k], 5) } }
  return T({
    hook: 'One driver. One spot. | Rice Village.',
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Park once. Walk. Jan 9.', stars: ['sagittarius', 'aries', 'virgo', 'pisces'] }),
    scenes: [
      { dur: 3.6, set: (x, t) => street(x, t), front: cin((x, t) => { car(x, 540 + Math.sin(t * 2) * 30, FLOOR + 140, '#e05a3a', { open: true, brake: 1 }); flare(x, 900, 400, t, 0.35) }), cast: { sagittarius: [[0, 520, FLOOR + 25, 190]] }, mood: { sagittarius: 'squint' }, hops: { sagittarius: [0.05, 0.4] },
        lines: [[0.4, 1.4, 'sagittarius', 'you think | you can park?'], [2.0, 1.4, 'sagittarius', 'think | again.']] },
      card(['THIS JANUARY']),
      { dur: 3.4, set: (x, t) => { x.fillStyle = '#0d1426'; x.fillRect(0, 0, 1080, 1920); box(x, 140, 420, 800, 520, '#0b2232', 8); for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(125,255,176,0.25)'; x.fillRect(140, 470 + k * 80, 800, 3) } const b = Math.sin(t * 6) > 0; x.fillStyle = b ? MINT : '#2a5a40'; x.beginPath(); x.arc(640, 660, 22, 0, Math.PI * 2); x.fill(); mono(x, 'SPOT SIGHTED · 2 BLOCKS', 540, 880, 34, MINT) },
        front: cin(), cast: { virgo: [[0, 540, 1250, 230]] }, mood: { virgo: 'squint' },
        lines: [[0.3, 1.4, 'virgo', 'spot | sighted.'], [1.9, 1.3, 'virgo', 'GO. | GO.']] },
      { dur: 3.8, set: (x, t, lt) => { street(x, t); const g = 0.4 + 0.4 * Math.sin(t * 5); x.fillStyle = `rgba(242,199,92,${g.toFixed(2)})`; x.fillRect(420, FLOOR + 80, 260, 120) },
        front: cin((x, t, lt) => { const sl = lt < 1.6 ? lt : 1.6 + (lt - 1.6) * 0.25; car(x, -150 + sl * 260, FLOOR + 140, '#e05a3a', { open: true }); const a = clamp((lt - 0.8) / 0.8); car(x, 1250 - a * 700, FLOOR + 140, '#5ec8ff', { flip: true, open: true }); if (lt > 1.6) tint(x, 'rgba(40,60,120,0.18)') }),
        cast: { sagittarius: [[0, -170, FLOOR + 25, 170], [1.6, 246, FLOOR + 25, 170], [3.8, 300, FLOOR + 25, 170]], aries: [[0, 1230, FLOOR + 25, 170], [0.8, 1230, FLOOR + 25, 170], [1.6, 530, FLOOR + 25, 170]] }, mood: { sagittarius: 'wide', aries: 'sparkle' },
        lines: [[1.7, 1.9, 'sagittarius', 'NOOOO…']], stick: [[1.7, 1.6, 'SLOW MOTION', BONE]] },
      card(['NO SPOT IS SAFE']),
      { dur: 3.4, set: (x, t) => { street(x, t); box(x, 470, FLOOR + 80, 140, 120, '#3a3a4a', 4); box(x, 420, 760, 240, 120, BONE, 6); txt(x, 'COMPACT', 540, 800, { size: 40, col: INK }); txt(x, 'ONLY', 540, 845, { size: 40, col: INK }) },
        front: cin(), cast: { sagittarius: [[0, 800, Y - 40, 220]] }, mood: { sagittarius: 'squint' },
        lines: [[0.3, 1.2, 'sagittarius', 'how | compact?'], [1.8, 1.4, 'sagittarius', 'I can | fold.']] },
      { dur: 3.4, set: (x, t) => street(x, t), front: cin((x, t, lt) => { car(x, 540 + Math.cos(lt * 3) * 380, FLOOR + 140, '#e05a3a', { open: true, flip: Math.sin(lt * 3) > 0 }); label(x, 540, 640, 'LAP ' + (3 + Math.floor(lt * 1.5)), 1, { size: 60, bg: GOLD, font: MONO, weight: 700 }); vo(x, lt, 'one driver… | seven laps…', 0.4) }),
        cast: { sagittarius: [[0, 540, FLOOR + 25, 170]] }, mood: { sagittarius: 'eyeroll' } },
      { dur: 3.8, set: (x, t) => { duskSky(x, '#ff8a3c', '#ffb347', '#ffe08a'); heatSun(x, 860, 480, t, 80); shimmer(x, 500, 900, t); x.fillStyle = '#6a5a4a'; x.fillRect(0, FLOOR + 60, 1080, 600) },
        front: cin((x, t, lt, P) => { const [cx, cy, s] = P.at('sagittarius'); sweat(x, cx + s * 0.4, cy - s * 0.4, t, 3) }),
        cast: { sagittarius: [[0, 120, Y, 220], [2.0, 380, Y, 220]], pisces: [[0, 800, Y, 220]] }, mood: { sagittarius: 'squint', pisces: 'wide' },
        lines: [[0.3, 1.4, 'pisces', 'you walked?'], [2.0, 1.6, 'sagittarius', 'parked | four blocks away.']] },
      rate('RATED P', 'for Parallel Parking | (attempted)'),
      rel('park once. walk.'),
    ],
  })
})()

// ── hst278 · The crew. The plan. The last kolache. (heist parody, for you)
const e278 = (() => {
  const bakery = (x, t, open = false) => { night(x, t, '#22202e'); shop(x, 540, FLOOR + 60, 'KOLACHES', { col: '#c98e5a', awn: '#f2c75c', open: open ? 'OPEN 5AM' : 'CLOSED' }) }
  const freeze = (x, lt, name, role, cx) => { const k = Kp(lt, 0.4); if (k > 0) { label(x, cx, 1590, name, k, { size: 46, bg: GOLD }); txt(x, role, cx, 1655, { size: 36, col: BONE, font: SERIF, weight: 500, italic: true }) } }
  return T({
    hook: 'The crew. The plan. | The last kolache.',
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Sweet or sausage? Jan 9.', stars: ['virgo', 'gemini', 'taurus', 'capricorn'] }),
    scenes: [
      { dur: 3.6, set: (x, t) => bakery(x, t), front: cin((x, t, lt) => { box(x, 620, 1060, 380, 260, '#2b5fb0', 6); x.strokeStyle = BONE; x.lineWidth = 3; for (let k = 0; k < 5; k++) { x.strokeRect(650 + k * 60, 1090, 50, 60) } kolache(x, 900, 1250, 0.6) }), cast: { virgo: [[0, 380, Y, 240]] }, mood: { virgo: 'squint' }, hops: { virgo: [0.05, 0.4] },
        lines: [[0.4, 1.6, 'virgo', 'the last | kolache…'], [2.2, 1.3, 'virgo', '…is for | you.']] },
      card(['THIS JANUARY']),
      { dur: 3.4, set: (x, t) => { x.fillStyle = '#2a2240'; x.fillRect(0, 0, 1080, 1920) }, front: cin((x, t, lt) => { freeze(x, lt, 'VIRGO', 'the planner', 300); freeze(x, lt - 1.2, 'GEMINI', 'the talker', 780) }),
        cast: { virgo: [[0, 300, 1150, 240]], gemini: [[0, 780, 1150, 240]] }, mood: { virgo: 'squint', gemini: 'sparkle' }, hops: { gemini: [1.6, 1.8, 2.0] },
        lines: [[1.6, 1.4, 'gemini', 'I know | the owner.']] },
      { dur: 3.4, set: (x, t) => { x.fillStyle = '#2a2240'; x.fillRect(0, 0, 1080, 1920) }, front: cin((x, t, lt) => { freeze(x, lt, 'CAPRICORN', 'the alarm clock', 300); freeze(x, lt - 1.2, 'TAURUS', 'the appetite', 780) }),
        cast: { capricorn: [[0, 300, 1150, 240]], taurus: [[0, 780, 1150, 240]] }, mood: { capricorn: 'squint', taurus: 'heart' },
        lines: [[0.4, 1.0, 'capricorn', '4:45 AM.'], [1.7, 1.4, 'taurus', "I'm just | hungry."]] },
      { dur: 3.6, set: (x, t) => bakery(x, t, true), front: cin((x, t, lt) => { box(x, 760, 520, 260, 120, '#101820', 6); txt(x, lt < 1.6 ? '4:59' : '5:00', 890, 582, { size: 70, col: BRAKE, font: MONO, weight: 700 }) }),
        cast: { capricorn: [[0, 180, Y + 30, 170]], virgo: [[0, 340, Y + 30, 170]], gemini: [[0, 500, Y + 30, 170]], taurus: [[0, 660, Y + 30, 170]] }, mood: { capricorn: 'squint', virgo: 'squint', gemini: 'sleepy', taurus: 'wide' }, hops: { taurus: [1.6, 1.8] },
        lines: [[0.3, 1.2, 'capricorn', "we're | first."], [1.9, 1.4, 'taurus', "it's | OPEN."]] },
      card(['ONE BOX.', 'ONE CHANCE.'], { size: 90 }),
      { dur: 3.8, set: (x, t) => { x.fillStyle = '#3a2a20'; x.fillRect(0, 0, 1080, 1920); box(x, 140, 820, 800, 360, '#bfe6ff', 8); x.fillStyle = 'rgba(255,255,255,0.3)'; x.fillRect(170, 840, 40, 320); klobasnek(x, 540, 1060, 1.3); x.fillStyle = '#6b3b1f'; x.fillRect(0, FLOOR + 60, 1080, 600) },
        front: cin(), cast: { taurus: [[0, 260, 650, 200]], virgo: [[0, 820, 650, 200]] }, mood: { taurus: 'heart', virgo: lt => lt > 1.6 ? 'wide' : 'squint' },
        lines: [[0.3, 1.3, 'taurus', "it's… | the sausage one."], [1.8, 1.8, 'virgo', "that's a | KLOBASNEK."]], stick: [[2.0, 1.6, 'TECHNICALLY', PINK]] },
      { dur: 3.2, set: (x, t) => { x.fillStyle = '#2a2240'; x.fillRect(0, 0, 1080, 1920) }, front: cin(), cast: { gemini: [[0, 300, Y, 230]], virgo: [[0, 780, Y, 230]] }, mood: { gemini: 'sparkle', virgo: 'eyeroll' },
        lines: [[0.2, 1.2, 'gemini', 'still | counts.'], [1.6, 1.4, 'virgo', 'it does | NOT.']] },
      { dur: 3.4, set: (x, t, lt) => { night(x, t, '#22202e'); if (lt > 0.4) sparkles(x, t, 540, 760, t - lt + 0.4, 12, 260, 5) }, front: cin((x, t, lt) => klobasnek(x, 540, 760 - 30 * Math.sin(lt * 3), 1.5 + 0.2 * clamp(lt))),
        cast: { taurus: [[0, 540, Y + 40, 230]] }, mood: { taurus: 'heart' },
        lines: [[0.3, 1.4, 'taurus', 'for you.'], [1.8, 1.4, 'taurus', "don't tell | Virgo."]] },
      rate('RATED K', 'for Kolache, Klobasnek | and Konfusion'),
      rel('sweet or sausage'),
    ],
  })
})()

// ── hst279 · Dating in Houston 2: this time, it's humid (sequel)
const e279 = T({
  hook: "Dating in Houston 2: | this time, it's humid",
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Part two starts Jan 9.', stars: ['gemini', 'leo', 'cancer', 'aquarius'] }),
  scenes: [
    { dur: 3.6, set: (x, t, lt) => { duskSky(x, '#0a0a1a', '#2a1d52', '#5a3a8a'); skyline(x, FLOOR + 60, t, { alpha: 0.8 }); x.save(); x.translate(540, 760); x.scale(1 + 0.04 * lt, 1 + 0.04 * lt); txt(x, '2', 0, 0, { size: 420, col: '#c0c8d8', font: SERIF, weight: 500 }); x.restore(); flare(x, 640, 640, t, 0.4) },
      front: cin(), cast: { gemini: [[0, 540, 1250, 240]] }, mood: { gemini: 'sparkle' }, hops: { gemini: [0.05, 0.5] },
      lines: [[0.4, 1.6, 'gemini', 'you survived | part one?'], [2.2, 1.3, 'gemini', 'cute.']] },
    { dur: 3.4, set: (x, t) => { x.fillStyle = '#5a4030'; x.fillRect(0, 0, 1080, 1920); box(x, 300, 520, 480, 200, BONE, 8); txt(x, 'BRUNCH', 540, 580, { size: 56, col: INK }); txt(x, 'WAIT: 90 MIN', 540, 660, { size: 50, col: BRAKE, font: MONO, weight: 700 }) },
      front: cin((x, t, lt) => { tint(x, 'rgba(160,110,60,0.25)'); vo(x, lt, 'Last time… | a 90-minute brunch wait.', 0.2) }), cast: { gemini: [[0, 300, Y, 200]], cancer: [[0, 780, Y, 200]] }, mood: { gemini: 'sleepy', cancer: 'sleepy' } },
    card(['THIS JANUARY']),
    { dur: 3.6, set: (x, t) => { duskSky(x, '#ffb36b', '#ffd9a0', '#fff0d0'); bayou(x, t, { top: FLOOR + 40, col: '#3a6a7a' }); skyline(x, FLOOR - 200, t, { alpha: 0.35 }) },
      front: cin((x, t, lt, P) => { const [cx, cy, s] = P.at('leo'); sweat(x, cx + s * 0.4, cy - s * 0.4, t, 4) }), cast: { leo: [[0, 140, Y - 40, 220], [3.6, 900, Y - 40, 220]] }, mood: { leo: 'wide' },
      lines: [[0.3, 1.4, 'leo', 'run club | dates now.'], [2.0, 1.4, 'leo', "I'm | melting."]], stick: [[0.2, 1.4, '6 AM · BAYOU TRAIL', BONE]] },
    { dur: 3.4, set: (x, t) => { x.fillStyle = '#3a7a5a'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = BONE; x.fillRect(80, FLOOR - 40, 920, 8); box(x, 520, 700, 40, 620, BONE, 4); x.strokeStyle = 'rgba(255,255,255,0.6)'; x.lineWidth = 3; for (let k = 0; k < 8; k++) { x.beginPath(); x.moveTo(520, 720 + k * 70); x.lineTo(560, 720 + k * 70); x.stroke() } const bx = 540 + Math.sin(t * 4) * 340; box(x, bx - 14, 640 - Math.abs(Math.cos(t * 4)) * 200, 28, 28, '#f2e05c', 4) },
      front: cin(), cast: { aquarius: [[0, 240, Y, 220]], cancer: [[0, 840, Y, 220]] }, mood: { aquarius: 'sparkle', cancer: 'happy' }, hops: { aquarius: [0.5, 1.5, 2.5], cancer: [1.0, 2.0] },
      lines: [[0.3, 1.4, 'cancer', 'pickleball?'], [1.9, 1.3, 'aquarius', "I'm | in."]] },
    card(['THE STAKES ARE HIGHER.']),
    card(['THE HUMIDITY', 'IS HIGHER.'], { size: 90 }),
    { dur: 3.6, set: (x, t) => { x.fillStyle = '#e8e0d0'; x.fillRect(0, 0, 1080, 1920); box(x, 300, 460, 480, 360, '#c98e5a', 12); x.fillStyle = '#5ec8ff'; x.fillRect(330, 490, 420, 300); x.fillStyle = '#f2c75c'; x.beginPath(); x.arc(540, 640, 90, 0, Math.PI * 2); x.fill(); x.fillStyle = '#b0a898'; x.fillRect(0, FLOOR + 60, 1080, 600) },
      front: cin(), cast: { cancer: [[0, 280, Y, 210]], gemini: [[0, 800, Y, 210]] }, mood: { cancer: 'sparkle', gemini: 'wide' },
      lines: [[0.3, 1.4, 'cancer', "it's free | Thursday!"], [1.9, 1.4, 'gemini', 'two | tickets?']] },
    { dur: 3.6, set: (x, t) => partyRoom(x, t), front: cin(), cast: { gemini: [[0, 300, Y, 230]], libra: [[0, 780, Y, 230]] }, mood: { gemini: 'heart', libra: 'heart' }, hops: { gemini: [1.6], libra: [1.7] },
      lines: [[0.3, 1.3, 'libra', 'part two?'], [1.8, 1.6, 'gemini', 'part two.']] },
    rate('RATED 2', 'for Twice the Humidity'),
    rel('the sequel starts at the party'),
  ],
})

// ── hst280 · Houston: the musical. Starring your sign.
const e280 = T({
  hook: 'A Houston musical, | starring your sign.',
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Sing it with us. Jan 9.', stars: ['leo', 'libra', 'cancer', 'pisces'] }),
  scenes: [
    { dur: 3.6, set: (x, t, lt) => { stage(x, t); skyline(x, FLOOR + 50, t, { alpha: 0.4 }); spotlight(x, 540, FLOOR + 60, 420) }, front: cin((x, t, lt) => { curtains(x, 0.5 + clamp(lt / 1.2) * 0.5, t); notes(x, t, 540, 900, { n: 5, seed: 1 }) }, 0.03),
      cast: { leo: [[0, 540, Y, 260]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.5, 1.0, 1.5] },
      lines: [[0.4, 2.4, 'leo', '♪ this one’s | for YOU, | Houston ♪']] },
    card(['THIS JANUARY…', 'A MUSICAL'], { size: 90 }),
    { dur: 3.6, set: (x, t) => { x.fillStyle = '#2a1040'; x.fillRect(0, 0, 1080, 1920); box(x, 140, 440, 800, 420, '#101820', 8); x.fillStyle = '#2b5fb0'; x.fillRect(160, 460, 760, 380); mono(x, 'KARAOKE · BELLAIRE', 540, 520, 34, GOLD); const u = (t * 0.4) % 1; txt(x, 'feeder road, take me home', 540, 700, { size: 44, col: BONE }); x.fillStyle = GOLD; x.fillRect(230, 740, 620 * u, 8); x.fillStyle = '#3a2050'; x.fillRect(0, FLOOR + 60, 1080, 600) },
      front: cin((x, t) => notes(x, t, 540, 1000, { n: 4, seed: 3 })), cast: { taurus: [[0, 540, Y, 240]] }, mood: { taurus: 'heart' }, hops: { taurus: [0.3, 0.9, 1.5, 2.1] },
      lines: [[0.3, 2.8, 'taurus', '♪ feeder road, | take me home ♪']] },
    { dur: 3.6, set: (x, t) => partyRoom(x, t, { wall: '#2a1a10' }), front: cin(),
      cast: { libra: [[0, 380, Y, 210], [0.9, 540, Y - 60, 210], [1.8, 700, Y, 210], [2.7, 540, Y + 40, 210], [3.6, 380, Y, 210]], sagittarius: [[0, 700, Y, 210], [0.9, 540, Y + 40, 210], [1.8, 380, Y, 210], [2.7, 540, Y - 60, 210], [3.6, 700, Y, 210]] }, mood: { libra: 'heart', sagittarius: 'sparkle' },
      lines: [[0.2, 1.3, 'sagittarius', 'two-step?'], [1.7, 1.4, 'libra', 'you lead.']], stick: [[0.2, 3.2, 'TWO-STEP', GOLD]] },
    { dur: 3.4, set: (x, t) => partyRoom(x, t, { wall: '#10202a' }), front: cin((x, t, lt, P) => { const [cx, cy, s] = P.at('cancer'); const sq = 1 + 0.25 * Math.sin(t * 6); box(x, cx - s * 0.5 * sq, cy + s * 0.1, s * sq, s * 0.4, BRAKE, 5); for (let k = 0; k < 6; k++) { x.fillStyle = INK; x.fillRect(cx - s * 0.45 * sq + k * s * 0.18 * sq, cy + s * 0.1, 4, s * 0.4) } box(x, cx - s * 0.62 * sq, cy + s * 0.06, s * 0.14, s * 0.48, BONE, 4); notes(x, t, cx, cy - 200, { n: 4, seed: 6 }) }),
      cast: { cancer: [[0, 540, Y - 80, 260]] }, mood: { cancer: 'sparkle' }, hops: { cancer: [0.3, 0.7, 1.1, 1.5, 1.9, 2.3] },
      lines: [[0.3, 2.6, 'cancer', 'zydeco | Sunday!']] },
    { dur: 3.6, set: (x, t) => { x.fillStyle = '#100a1a'; x.fillRect(0, 0, 1080, 1920); spotlight(x, 540, FLOOR + 60, 340, 'rgba(201,166,255,0.2)') }, front: cin(),
      cast: { pisces: [[0, 540, Y, 250]] }, mood: { pisces: 'heart' },
      lines: [[0.3, 2.9, 'pisces', '♪ a ballad about | parking ♪ *sniff*']], stick: [[0.2, 1.4, 'THE POWER BALLAD', LAV]] },
    card(['ONE NIGHT ONLY']),
    { dur: 3.8, set: (x, t, lt) => { stage(x, t); spotlight(x, 300, FLOOR + 60, 300); spotlight(x, 780, FLOOR + 60, 300); if (lt > 1.6) sparkles(x, t, 540, 900, t - lt + 1.6, 16, 420, 7) }, front: cin((x, t) => notes(x, t, 540, 800, { n: 6, seed: 9 })),
      cast: { leo: [[0, 160, Y, 180]], libra: [[0, 350, Y, 180]], taurus: [[0, 540, Y, 180]], cancer: [[0, 730, Y, 180]], pisces: [[0, 920, Y, 180]] }, mood: { leo: 'sparkle', libra: 'heart', taurus: 'heart', cancer: 'sparkle', pisces: 'heart' },
      hops: { leo: [0.4, 1.2, 2.0, 2.8], libra: [0.4, 1.2, 2.0, 2.8], taurus: [0.4, 1.2, 2.0, 2.8], cancer: [0.4, 1.2, 2.0, 2.8], pisces: [0.4, 1.2, 2.0, 2.8] },
      lines: [[1.6, 2.0, 'taurus', '♪ JAN 9! ♪']] },
    rate('RATED ♪', 'for Two-stepping | and one (1) Power Ballad'),
    rel('sing it with us'),
  ],
})

// ── hst281 · Boots are coming out. Are you ready? (western)
const e281 = (() => {
  const west = (x, t) => { duskSky(x, '#5a2a1a', '#d9703a', '#ffc46b'); skyline(x, FLOOR - 60, t, { col: '#3a1d1a', alpha: 0.7 }); x.fillStyle = '#a8703a'; x.fillRect(0, FLOOR + 60, 1080, 600) }
  return T({
    hook: 'The boots are out. | Are you ready?',
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Boots on. Jan 9.', stars: ['taurus', 'leo', 'sagittarius', 'aquarius'] }),
    scenes: [
      { dur: 3.6, set: (x, t) => { west(x, t); streetSign(x, 800, 780, 'WESTHEIMER', { k: 0.8 }) }, front: cin((x, t, lt, P) => { tumbleweed(x, -100 + ((t * 260) % 1300), FLOOR + 30 - Math.abs(Math.sin(t * 5)) * 60, t); cowboyHat(x, P, 'taurus') }),
        cast: { taurus: [[0, 380, Y, 250]] }, mood: { taurus: 'squint' }, hops: { taurus: [0.05, 0.4] },
        lines: [[0.4, 1.4, 'taurus', 'you hear | that?'], [2.1, 1.2, 'taurus', '…boots.']] },
      card(['THIS JANUARY'], { col: '#ffc46b' }),
      { dur: 3.6, set: (x, t, lt) => { x.fillStyle = '#2a1a10'; x.fillRect(0, 0, 1080, 1920); box(x, 160, 420, 760, 900, '#4a3020', 8); x.fillStyle = 'rgba(255,240,200,0.15)'; x.fillRect(200, 460, 680, 820); const up = clamp((lt - 0.4) / 0.8); boot(x, 460, 1200 - 120 * up, 1.4); boot(x, 680, 1200 - 120 * up, 1.4, '#6a3a1a'); if (up > 0.5) for (let k = 0; k < 12; k++) { x.fillStyle = `rgba(220,200,160,${(0.5 * (1 - (lt - 1.2) / 2)).toFixed(2)})`; x.fillRect(420 + (k * 53) % 300, 1000 - (k * 37) % 200 - (lt - 1.2) * 60, 14, 14) } },
        front: cin(), cast: { leo: [[0, 820, 760, 200]] }, mood: { leo: 'sparkle' },
        lines: [[1.2, 2.0, 'leo', 'boots are | coming out.']] },
      card(['RODEO SEASON.'], { col: '#ffc46b' }),
      { dur: 3.6, set: (x, t) => { partyRoom(x, t, { wall: '#2a1a10' }); box(x, 760, 420, 220, 110, '#101820', 6); txt(x, 'HIGH NOON', 870, 476, { size: 34, col: GOLD, font: MONO, weight: 700 }) },
        front: cin((x, t, lt, P) => { cowboyHat(x, P, 'leo', '#2a1a10'); cowboyHat(x, P, 'taurus'); vo(x, lt, 'two stars. | one dance floor.', 0.3) }),
        cast: { leo: [[0, 140, Y, 210]], taurus: [[0, 940, Y, 210]] }, mood: { leo: 'squint', taurus: 'squint' } },
      { dur: 3.4, set: (x, t, lt) => { x.fillStyle = '#d9703a'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = INK; x.fillRect(536, 0, 8, 1920) }, front: cin(),
        cast: { leo: [[0, 270, 1000, 440]], taurus: [[0, 810, 1000, 440]] }, mood: { leo: 'squint', taurus: 'squint' },
        lines: [[0.3, 1.2, 'leo', 'draw…'], [1.6, 1.6, 'taurus', '…your best | two-step.']] },
      { dur: 3.8, set: (x, t, lt) => { partyRoom(x, t, { wall: '#2a1a10' }); if (lt > 0.4) sparkles(x, t, 540, 1100, t - lt + 0.4, 12, 360, 3) }, front: cin((x, t, lt, P) => { cowboyHat(x, P, 'sagittarius'); cowboyHat(x, P, 'aquarius', '#5a7ab0') }),
        cast: { leo: [[0, 420, Y, 200], [0.9, 540, Y - 40, 200], [1.8, 660, Y, 200], [2.7, 540, Y + 30, 200], [3.6, 420, Y, 200]], taurus: [[0, 660, Y, 200], [0.9, 540, Y + 30, 200], [1.8, 420, Y, 200], [2.7, 540, Y - 40, 200], [3.6, 660, Y, 200]], sagittarius: [[0, 140, 900, 150]], aquarius: [[0, 940, 900, 150]] },
        mood: { leo: 'sparkle', taurus: 'heart', sagittarius: 'sparkle', aquarius: 'wide' }, hops: { sagittarius: [0.6, 1.2, 1.8], aquarius: [1.0, 2.0] },
        lines: [[0.4, 1.4, 'sagittarius', 'YEEHAW!'], [2.2, 1.4, 'aquarius', 'they… | tied?']] },
      { dur: 3.4, set: (x, t, lt) => { west(x, t); hearts(x, t, 540, 1000, t - lt + 0.8, { n: 6, seed: 7 }) }, front: cin((x, t, lt, P) => { cowboyHat(x, P, 'leo', '#2a1a10'); cowboyHat(x, P, 'taurus') }),
        cast: { leo: [[0, 380, Y, 230]], taurus: [[0, 700, Y, 230]] }, mood: { leo: 'heart', taurus: 'heart' },
        lines: [[0.3, 1.2, 'leo', 'partners?'], [1.7, 1.4, 'taurus', 'partners.']] },
      rate('RATED YEEHAW', 'for Boots, Brims | and Boot-scootin'),
      rel('boots on'),
    ],
  })
})()

// ── hst282 · A quiet film about you texting first (indie)
const e282 = (() => {
  const dusk = (x, t) => { duskSky(x, '#3a3a6a', '#b07a9a', '#f0c0a0'); skyline(x, FLOOR - 120, t, { alpha: 0.45, col: '#4a3a5a' }); bayou(x, t, { col: '#5a6a8a' }) }
  return T({
    hook: 'A quiet film about | you, texting first',
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Text first. Jan 9.', stars: ['pisces', 'scorpio', 'cancer', 'aries'] }),
    scenes: [
      { dur: 3.8, set: (x, t) => dusk(x, t), front: cin((x, t, lt) => { tint(x, 'rgba(255,220,200,0.08)'); box(x, 640, 1040, 70, 120, INK, 4); x.fillStyle = '#bfe6ff'; x.fillRect(648, 1050, 54, 96) }, 0.08),
        cast: { pisces: [[0, 470, 1100, 240]] }, mood: { pisces: 'neutral' }, hops: { pisces: [0.05] },
        lines: [[0.4, 2.8, 'pisces', 'you ever type it… | and delete it?']] },
      { dur: 3.0, set: (x, t, lt) => { x.fillStyle = '#05040a'; x.fillRect(0, 0, 1080, 1920); laurel(x, 540, 760, ['OFFICIAL SELECTION', 'The Group Chat', 'Film Festival'], clamp(lt / 0.4)); grain(x, t, 0.05) }, cast: {} },
      { dur: 3.6, set: (x, t) => { x.fillStyle = '#2a2440'; x.fillRect(0, 0, 1080, 1920) }, front: cin((x, t, lt) => { const s = 'want to see the bats?', n = Math.min(s.length, Math.floor(lt * 9)); phoneChat(x, 540, 900, t, [['r', s.slice(0, n) + (Math.sin(t * 6) > 0 ? '|' : ' ')]], { s: 1.1, head: 'SCORPIO' }); vo(x, lt, 'This January…', 2.4) }, 0.08), cast: {} },
      { dur: 3.6, set: (x, t) => dusk(x, t), front: cin((x, t, lt) => vo(x, lt, 'one Pisces | learned to go first.', 0.4), 0.08),
        cast: { pisces: [[0, 140, 1100, 200], [3.6, 760, 1100, 200]] }, mood: { pisces: 'happy' } },
      { dur: 3.2, set: (x, t, lt) => { x.fillStyle = '#05040a'; x.fillRect(0, 0, 1080, 1920); const a = clamp(lt / 0.4), b = clamp((lt - 1.2) / 0.4); x.save(); x.globalAlpha = a; txt(x, '"I cried twice."', 540, 720, { size: 70, col: BONE, font: SERIF, weight: 500, italic: true }); txt(x, '★★★★★  CANCER', 540, 810, { size: 40, col: GOLD, font: MONO, weight: 700 }); x.restore(); x.save(); x.globalAlpha = b; txt(x, '"Just text them."', 540, 1020, { size: 70, col: BONE, font: SERIF, weight: 500, italic: true }); txt(x, '★★★★★  ARIES', 540, 1110, { size: 40, col: GOLD, font: MONO, weight: 700 }); x.restore(); grain(x, t, 0.05) }, cast: {} },
      { dur: 3.8, set: (x, t, lt) => { duskSky(x, '#2a1d52', '#c2557a', '#ffb36b'); bayou(x, t); bridge(x, FLOOR - 40); bats(x, t, clamp(lt / 1.2), { cy: FLOOR - 120 }) }, front: cin(null, 0.06),
        cast: { scorpio: [[0, 1180, 1120, 200], [1.4, 760, 1120, 200]], pisces: [[0, 320, 1120, 200]] }, mood: { scorpio: 'happy', pisces: 'wide' },
        lines: [[1.5, 1.8, 'scorpio', 'I got | your text.']] },
      { dur: 3.6, set: (x, t, lt) => { duskSky(x, '#2a1d52', '#c2557a', '#ffb36b'); bayou(x, t); bridge(x, FLOOR - 40); bats(x, t, 1, { cy: FLOOR - 120 }) }, front: cin(null, 0.06),
        cast: { pisces: [[0, 430, 1120, 200]], scorpio: [[0, 650, 1120, 200]] }, mood: { pisces: 'heart', scorpio: 'heart' },
        lines: [[0.3, 1.4, 'pisces', "there's | so many *sniff*"], [1.9, 1.5, 'scorpio', 'you went | first.']] },
      card(['GO FIRST.'], { col: BONE }),
      rate('RATED F', 'for Feelings'),
      rel('text first'),
    ],
  })
})()

// ── hst283 · Space City is sending you a signal (sci-fi)
const e283 = (() => {
  const sky = (x, t) => { x.fillStyle = '#05040c'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 80; k++) { const a = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.3 + k)); x.fillStyle = `rgba(239,230,214,${a.toFixed(2)})`; x.fillRect((k * 173) % 1080, (k * 97) % 1200, 4, 4) } skyline(x, FLOOR + 60, t, { alpha: 0.8 }); x.fillStyle = '#12101c'; x.fillRect(0, FLOOR + 60, 1080, 600) }
  const NINE = [[0, 0], [1, -0.4], [2, 0], [2, 1], [1, 1.3], [0, 1], [0, 0], [2, 1], [2, 2.4], [1, 3], [0, 2.6]]
  return T({
    hook: 'Space City is | sending you a signal',
    end: (x, t, lt) => partyCard(x, t, lt, { line: 'Signal received. Jan 9.', stars: ['aquarius', 'capricorn', 'gemini', 'scorpio'] }),
    cues: [['chip', 7.0, 1568, 0.1, { gain: 0.02 }], ['chip', 7.3, 1568, 0.3, { gain: 0.02 }], ['chip', 16.0, 1318.5, 0.1, { gain: 0.02 }], ['chip', 16.3, 1318.5, 0.1, { gain: 0.02 }]],
    scenes: [
      { dur: 3.6, set: (x, t) => { sky(x, t); radioDish(x, 760, FLOOR + 60, t) }, front: cin(), cast: { aquarius: [[0, 300, Y, 230]] }, mood: { aquarius: 'wide' }, hops: { aquarius: [0.05, 0.4] },
        lines: [[0.4, 1.4, 'aquarius', 'you hear | it too?'], [2.1, 1.3, 'aquarius', 'listen.']] },
      card(['THIS JANUARY'], { col: MINT }),
      { dur: 3.6, set: (x, t) => { x.fillStyle = '#0b1420'; x.fillRect(0, 0, 1080, 1920); box(x, 120, 440, 840, 440, '#0b2232', 8); x.strokeStyle = MINT; x.lineWidth = 6; x.beginPath(); for (let i = 0; i <= 80; i++) { const u = i / 80, v = Math.sin(u * 40 + t * 8) * Math.exp(-((u - 0.5) ** 2) * 10) * 140; i ? x.lineTo(150 + u * 780, 660 + v) : x.moveTo(150 + u * 780, 660 + v) } x.stroke(); mono(x, 'ORIGIN: HOUSTON, TX', 540, 840, 34, MINT) },
        front: cin(), cast: { aquarius: [[0, 540, 1250, 230]] }, mood: { aquarius: 'squint' },
        lines: [[0.3, 1.5, 'aquarius', "it's coming | from…"], [2.0, 1.4, 'aquarius', '…Houston.']] },
      { dur: 3.6, set: (x, t) => { sky(x, t); houses(x, FLOOR + 60, t * 6) }, front: cin(), cast: { gemini: [[0, 540, 800, 230]] }, mood: { gemini: 'wide' },
        lines: [[0.3, 1.5, 'gemini', 'every porch light | in the Heights…'], [2.0, 1.4, 'gemini', '…is | blinking.']] },
      card(['THE SIGNAL IS CLEAR'], { col: MINT }),
      { dur: 3.6, set: (x, t, lt) => { x.fillStyle = '#0b1420'; x.fillRect(0, 0, 1080, 1920); box(x, 120, 440, 840, 440, '#0b2232', 8); const s = 'J A N  9', n = Math.min(s.length, Math.floor(lt * 4)); txt(x, s.slice(0, n), 540, 660, { size: 140, col: GOLD, font: MONO, weight: 700 }) },
        front: cin(), cast: { capricorn: [[0, 540, 1250, 230]] }, mood: { capricorn: lt => lt > 2 ? 'wide' : 'squint' },
        lines: [[0.3, 1.2, 'capricorn', 'it says…'], [2.3, 1.2, 'capricorn', 'Jan 9.']] },
      { dur: 3.6, set: (x, t) => sky(x, t), front: cin((x, t, lt) => inviteCard(x, 540, 760, 1, t, Kp(lt, 0.4))), cast: { scorpio: [[0, 540, Y, 230]] }, mood: { scorpio: 'sparkle' },
        lines: [[1.4, 1.8, 'scorpio', "it's an | invitation."]] },
      { dur: 3.8, set: (x, t, lt) => { sky(x, t); const u = clamp(lt / 2.2), n = Math.floor(u * (NINE.length - 1)); x.strokeStyle = GOLD; x.lineWidth = 6; x.beginPath(); NINE.slice(0, n + 1).forEach(([a, b], i) => { const px = 400 + a * 140, py = 380 + b * 160; i ? x.lineTo(px, py) : x.moveTo(px, py) }); x.stroke(); NINE.slice(0, n + 1).forEach(([a, b]) => { x.fillStyle = BONE; x.fillRect(400 + a * 140 - 8, 380 + b * 160 - 8, 16, 16) }) },
        front: cin(), cast: { aquarius: [[0, 300, Y, 200]], gemini: [[0, 780, Y, 200]] }, mood: { aquarius: 'heart', gemini: 'heart' },
        lines: [[2.3, 1.4, 'aquarius', 'they want | us there.']] },
      rate('RATED S', 'for Signals, Stars | and Small Talk'),
      rel('signal received'),
    ],
  })
})()

// ── hst284 · Every Houston date asks one question (drama)
const e284 = T({
  hook: 'Every Houston date | asks one question',
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Ask a new question. Jan 9.', stars: ['sagittarius', 'virgo', 'cancer', 'taurus'] }),
  scenes: [
    { dur: 3.8, set: (x, t) => { night(x, t); coffeeShop(x, 540, FLOOR + 60); table(x, 540, 640) }, front: cin(), cast: { sagittarius: [[0, 540, Y - 140, 260]] }, mood: { sagittarius: 'squint' }, hops: { sagittarius: [0.05, 0.4] },
      lines: [[0.4, 3.0, 'sagittarius', "so… where'd | you go to | high school?"]] },
    card(['THIS JANUARY']),
    card(['ONE QUESTION.'], { dur: 1.8 }),
    { dur: 3.6, set: (x, t, lt) => yearbook(x, t, ['aries', 'virgo', 'leo', 'sagittarius', 'pisces', 'gemini'], clamp(lt / 1.2)), front: cin((x, t, lt) => { tint(x, 'rgba(160,110,60,0.2)'); vo(x, lt, 'Every answer… | reveals everything.', 1.2) }), cast: {} },
    { dur: 3.8, set: (x, t) => { night(x, t, '#3a2a20'); box(x, 60, FLOOR - 300, 960, 360, '#8a6a4a', 8); for (let k = 0; k < 6; k++) box(x, 100 + k * 160, FLOOR - 300, 20, 360, BONE, 3) },
      front: cin((x, t, lt, P) => { readingGlasses(x, P, 'cancer'); readingGlasses(x, P, 'taurus') }), cast: { cancer: [[0, 320, Y - 60, 230]], taurus: [[0, 760, Y - 60, 230]] }, mood: { cancer: 'wide', taurus: 'squint' },
      lines: [[0.3, 1.5, 'cancer', 'your cousin | went there!'], [2.0, 1.6, 'taurus', 'I know | your auntie.']] },
    { dur: 3.6, set: (x, t, lt) => { x.fillStyle = '#1a1033'; x.fillRect(0, 0, 1080, 1920); const P = [[300, 500], [780, 480], [540, 700], [240, 900], [840, 880], [540, 1040]]; x.strokeStyle = PINK; x.lineWidth = 4; for (let i = 0; i < P.length; i++) for (let j = i + 1; j < P.length; j++) if (lt > (i + j) * 0.12) { x.beginPath(); x.moveTo(...P[i]); x.lineTo(...P[j]); x.stroke() } P.forEach(([a, b], i) => signChar(x, t, ['aries', 'leo', 'libra', 'capricorn', 'aquarius', 'gemini'][i], a, b, 120, { glyph: false, seed: 50 + i })) },
      front: cin((x, t, lt, P) => clipboardOn(x, P, 'virgo')), cast: { virgo: [[0, 540, 1300, 200]] }, mood: { virgo: 'squint' },
      lines: [[1.4, 2.0, 'virgo', 'everyone here | is connected.']] },
    card(['RIVAL SCHOOLS?'], { col: BRAKE }),
    { dur: 3.6, set: (x, t, lt) => { night(x, t); coffeeShop(x, 540, FLOOR + 60); if (lt > 1.6) hearts(x, t, 540, 900, t - lt + 1.6, { n: 6, seed: 2 }) }, front: cin(),
      cast: { sagittarius: [[0, 280, Y, 220]], virgo: [[0, 800, Y, 220]] }, mood: { sagittarius: 'wide', virgo: lt => lt > 1.6 ? 'heart' : 'wide' },
      lines: [[0.3, 1.3, 'sagittarius', 'we were | rivals?'], [1.8, 1.6, 'virgo', 'and now | we’re here.']] },
    rate('RATED HS', 'for High School Questions'),
    rel('ask a new question'),
  ],
})

// ── hst285 · Houston needs a hero. You need a plus-one. (superhero)
const e285 = T({
  hook: 'Every hero needs a | plus-one. Got yours?',
  end: (x, t, lt) => partyCard(x, t, lt, { line: 'Bring your plus-one. Jan 9.', stars: ['leo', 'virgo', 'pisces', 'aries'] }),
  scenes: [
    { dur: 3.6, set: (x, t) => { duskSky(x, '#05040c', '#1a1338', '#3a1d52'); skyline(x, FLOOR + 260, t); box(x, 300, 1260, 480, 700, '#1a1338', 6) }, back: (x, t, lt, P) => cape(x, P, 'leo', t), front: cin((x, t, lt, P) => { flare(x, 820, 380, t, 0.35) }),
      cast: { leo: [[0, 540, 1110, 260]] }, mood: { leo: 'squint' }, hops: { leo: [0.05, 0.5] },
      lines: [[0.4, 1.4, 'leo', "you're going | alone?"], [2.1, 1.4, 'leo', 'not | anymore.']] },
    card(['THIS JANUARY']),
    { dur: 3.6, set: (x, t) => { night(x, t); bayou(x, t, { top: FLOOR + 80 }) }, front: cin((x, t, lt) => { if (lt < 1.4) mosquito(x, 200 + lt * 220, 900, t, 2); vo(x, lt, "bitten by Houston's | official bird…", 0.2, 1.4) }),
      cast: { leo: [[0, 540, Y - 60, 240]] }, mood: { leo: lt => lt > 1.4 ? 'wide' : 'happy' }, hops: { leo: [1.4] },
      lines: [[1.6, 1.6, 'leo', 'ow. | …I feel | different.']] },
    { dur: 3.4, set: (x, t, lt) => { night(x, t, '#2a2a3a'); streetSign(x, 820, 560, 'MONTROSE', { k: 0.8 }); const g = 0.4 + 0.4 * Math.sin(t * 6); x.fillStyle = `rgba(242,199,92,${g.toFixed(2)})`; x.fillRect(360, FLOOR + 80, 300, 130) },
      front: cin((x, t, lt, P) => { car(x, -100 + 610 * ease.outCubic(clamp(lt / 1.4)), FLOOR + 140, '#e05a3a'); }), cast: { leo: [[0, 860, Y - 120, 200]] }, mood: { leo: 'sparkle' },
      lines: [[1.6, 1.6, 'leo', 'parking. | first try.']], stick: [[0.2, 1.4, 'POWER: PARKING', GOLD]] },
    { dur: 3.4, set: (x, t) => lobby(x, t), back: (x, t, lt, P) => cape(x, P, 'leo', t), front: cin((x, t, lt, P) => { const [cx, cy, s] = P.at('virgo'); if (lt > 1.2) box(x, cx - s * 0.4, cy + s * 0.2, s * 0.8, s * 0.22, '#5a7ab0', 5) }),
      cast: { leo: [[0, 300, Y, 220]], virgo: [[0, 780, Y, 220]] }, mood: { leo: 'sparkle', virgo: lt => lt > 1.2 ? 'heart' : 'wide' },
      lines: [[0.3, 1.2, 'virgo', 'so | cold…'], [1.6, 1.6, 'leo', 'spare | sweater.']], stick: [[0.2, 1.2, 'POWER: SWEATER', SKYB]] },
    { dur: 3.4, set: (x, t) => { skyline(x, FLOOR - 150, t, { alpha: 0.6 }); freeway(x, FLOOR - 160, 600, 3, t * 400); overheadSign(x, 540, 640, 'TEXAS U-TURN', 'NEXT LEFT', 1) },
      front: cin((x, t, lt) => car(x, 540, FLOOR + 120, '#e05a3a', { open: true, flip: lt > 1.4 })), cast: { leo: [[0, 520, FLOOR + 5, 190]] }, mood: { leo: 'sparkle' },
      lines: [[1.5, 1.6, 'leo', 'U-turn. | flawless.']], stick: [[0.2, 1.2, 'POWER: THE U-TURN', PINK]] },
    card(['EVERY HERO', 'NEEDS A PLUS-ONE'], { size: 84, dur: 2.4 }),
    { dur: 3.8, set: (x, t, lt) => { partyRoom(x, t); if (lt > 1.0) sparkles(x, t, 540, 1100, t - lt + 1.0, 16, 380, 3) }, back: (x, t, lt, P) => cape(x, P, 'leo', t), front: cin(),
      cast: { leo: [[0, 540, 300, 260], [1.0, 540, Y - 40, 260]], pisces: [[0, 160, Y, 170]], aries: [[0, 920, Y, 170]] }, mood: { leo: 'heart', pisces: 'heart', aries: 'sparkle' }, hops: { pisces: [1.2, 1.8], aries: [1.3, 1.9] },
      lines: [[1.2, 2.2, 'leo', "I'm your | plus-one."]] },
    rate('RATED +1', 'for Plus-one Guaranteed'),
    rel('bring your plus-one'),
  ],
})

export const W11B = { hst273: e273, hst274: e274, hst275: e275, hst276: e276, hst277: e277, hst278: e278, hst279: e279, hst280: e280, hst281: e281, hst282: e282, hst283: e283, hst284: e284, hst285: e285 }
