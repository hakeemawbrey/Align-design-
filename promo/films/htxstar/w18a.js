// Houston Star Talk, worker w18 (party prep): hst429–hst436. Helpers in w18.js.
import { Y, BADGE, Kp, fadeK, sting, ticket, waveHops, title, daySky, bayou, bedroom, rack, mirror, phone, clipboard, thermo, rpg, wear, wearAt, dish, partyTable,
  carBack, routeMap, photoFrame, flash, dayCard, nameTag, closet, stamp, signChar, sparkles, pop01, label, txt, box, outside, room, FLOOR, clamp, prog, ease,
  GOLD, BONE, PINK, INK, MINT, SKYB, LAV, MONO, SERIF } from './w18.js'
import { skyline, freeway, car, heatSun, sweat, shield, streetSign, overheadSign, taco, kolache, klobasnek, puffer, mural, houses, cones, BRAKE } from './kit.js'
import { SIGN_IDS } from '../signs3kit.js'

const crowd = (y1 = Y - 210, y2 = Y, s = 150) => Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 120 + (i % 6) * 168, i < 6 ? y1 : y2, s]]]))
const allMood = m => Object.fromEntries(SIGN_IDS.map(id => [id, m]))

// ── hst429 · your sign's outfit for an 80° January party (outfit list, a mirror per sign)
const FITS = [
  ['aries', ['cap'], '#ff5a3a', 'athleisure. | jogged here.'],
  ['taurus', ['sweater'], '#c98e5a', "cozy sweater. | it's 80°. don't care."],
  ['gemini', ['bow', 'shades'], '#ffd36b', 'two outfits. | changing in the car.'],
  ['cancer', ['scarf'], '#8fe3ff', 'a cardigan | for the arctic AC.'],
  ['leo', ['crown', 'chain'], GOLD, 'gold. | head to toe.'],
  ['virgo', ['tie'], '#7dbf5a', 'ironed. lint-rolled. | twice.'],
  ['libra', ['flower'], PINK, 'still deciding. | three in the car.'],
  ['scorpio', ['shades'], INK, 'all black. | in 80°. worth it.'],
  ['sagittarius', ['hat', 'boots'], '#b0703a', 'boots are out. | rodeo season.'],
  ['capricorn', ['tie'], '#2b5fb0', 'blazer. | straight from work.'],
  ['aquarius', ['headphones'], MINT, 'thrifted in Montrose. | one of one.'],
  ['pisces', ['flower'], LAV, 'dressed for the vibe. | crying already.'],
]
const RACK = ['#ff8fb1', '#ffd36b', '#7dffb0', '#8fe3ff', '#c9a6ff', '#ff9a3c', '#efe6d6']
const fitRoom = (x, t) => { bedroom(x, t, { wall: '#4a2a5a', floor: '#3a2a3e' }) }
export const hst429 = {
  hook: "Your sign's outfit for | an 80° January party", badge: BADGE, cues: sting(988), endLen: 6.2,
  end: ticket('Wear the fit. Jan 9.', ['leo', 'scorpio', 'libra', 'pisces']),
  scenes: [
    { dur: 2.8, set: (x, t) => { fitRoom(x, t); rack(x, 540, 640, RACK, t) }, cast: crowd(), hops: waveHops(SIGN_IDS, 0.02, 0.06), mood: allMood('sparkle'),
      front: (x, t, lt, P) => FITS.forEach(([id, items, col]) => items.forEach(it => wear(x, P, id, it, col))) },
    ...FITS.map(([id, items, col, line], i) => ({
      dur: 2.6,
      set: (x, t) => { fitRoom(x, t); rack(x, 540, 470, RACK, t, { pick: i % RACK.length, pickK: 1 }); mirror(x, 790, 1060, 280, 520, t) },
      back: (x, t, lt) => { const s = 180; x.save(); x.beginPath(); x.rect(668, 818, 244, 484); x.clip(); signChar(x, t, id, 790, 1150, s, { mood: 'wink', pop: 1, seed: 9, look: [-0.6, 0], tears: id === 'pisces' ? 2 : 0 }); items.forEach(it => wearAt(x, 790, 1150, s, it, col)); x.restore() },
      front: (x, t, lt, P) => { items.forEach(it => wear(x, P, id, it, col)); nameTag(x, id, 330, Y + 175) },
      cast: { [id]: [[0, 330, Y, 280]] }, mood: { [id]: id === 'pisces' ? 'heart' : id === 'scorpio' ? 'squint' : 'sparkle' }, look: { [id]: [0.8, 0] }, hops: { [id]: [0.05] },
      lines: [[0.2, 2.25, id, line]],
    })),
    { dur: 3.2, set: (x, t) => { fitRoom(x, t); rack(x, 540, 640, RACK, t) }, cast: crowd(), mood: allMood('happy'), hops: waveHops(SIGN_IDS, 0.1, 0.05),
      front: (x, t, lt, P) => { FITS.forEach(([id, items, col]) => items.forEach(it => wear(x, P, id, it, col))); const k = Kp(lt, 0.1, 0.35); if (k > 0) { label(x, 540, 560, 'your fit for Jan 9?', k, { size: 56, bg: GOLD, rot: -0.03 }); label(x, 540, 670, 'comment your sign', k, { size: 44, bg: PINK, rot: 0.02 }) } } },
  ],
}

// ── hst430 · POV: you're in the group chat for Jan 9 (phone + reaction cutaways)
const CHAT = [
  [-0.5, 'L', 'Jan 9. | who is in?', 'CAPRICORN'], [0.3, 'L', 'IN', 'ARIES'], [1.0, 'L', 'in. obviously.', 'LEO'], [1.7, 'L', 'in | in', 'GEMINI'],
  [3.0, 'R', 'in! what do | we wear?'], [3.9, 'L', 'ok so I have | 4 options', 'LIBRA'], [4.8, 'L', "it's 80°. | shorts.", 'TAURUS'], [5.6, 'L', 'bring a sweater. | the AC is arctic', 'CANCER'],
  [9.0, 'L', 'I made a | carpool doc', 'VIRGO'], [9.8, 'L', 'I live in | the Woodlands', 'AQUARIUS'], [10.6, 'L', 'I can drive! | (scenic route)', 'SAGITTARIUS'], [11.4, 'L', 'no.', 'VIRGO'],
  [15.0, 'L', '...', 'SCORPIO'], [15.6, 'L', "I'll be there.", 'SCORPIO'], [16.3, 'L', 'I love y’all | so much', 'PISCES'], [17.0, 'L', 'crying', 'PISCES'],
  [20.4, 'R', 'who is bringing | food?'], [21.2, 'L', 'first crawfish | of the season', 'SAGITTARIUS'], [22.0, 'L', 'queso. | non-negotiable.', 'TAURUS'], [22.8, 'L', "I'm bringing | me.", 'LEO'],
  [26.4, 'L', 'so: Jan 9. | everyone is in.', 'CAPRICORN'], [27.2, 'R', 'see y’all there'], [27.9, 'L', 'see y’all | see y’all', 'GEMINI'],
]
const chatBg = (x, t) => { const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#2a1a5a'); g.addColorStop(1, '#5a2a6a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 18; k++) { x.fillStyle = 'rgba(255,255,255,0.06)'; x.fillRect((k * 173 + t * 20) % 1080, (k * 311) % 1920, 10, 10) } skyline(x, 1490, t, { col: '#3a2470', alpha: 0.9 }) }
const chatScene = (dur, [a, b] = ['capricorn', 'gemini'], extra = {}) => ({ dur, set: (x, t) => { chatBg(x, t); phone(x, 540, 1040, t, CHAT, { w: 640, h: 860, head: 'the stars (12)', max: 4 }) },
  cast: { [a]: [[0, 125, 1390, 150]], [b]: [[0, 955, 1390, 150]] }, mood: { [a]: 'squint', [b]: 'wink' }, hops: { [a]: [0.02, 1.0, 2.0, 3.0, 4.0, 5.0], [b]: [0.3, 1.5, 2.5, 3.5, 4.5] }, ...extra })
const cut = (dur, set, cast, mood, lines, more = {}) => ({ dur, set, cast, mood, lines, ...more })
export const hst430 = {
  hook: "POV: you're in | the Jan 9 group chat", badge: BADGE, cues: [...sting(784), ...CHAT.map(m => ['pop', m[0], m[1] === 'R' ? 1046.5 : 659.25, 0.012, 0])], endLen: 6.2,
  end: ticket('Group chat says: Jan 9.', ['capricorn', 'gemini', 'pisces', 'taurus']),
  scenes: [
    chatScene(6.4),
    cut(2.6, (x, t) => bedroom(x, t, { wall: '#2a4a6a', floor: '#3a2a3e' }), { cancer: [[0, 540, Y, 320]] }, { cancer: 'heart' }, [[0.2, 2.2, 'cancer', 'I packed you | one too.']],
      { front: (x, t, lt, P) => { wear(x, P, 'cancer', 'scarf', '#8fe3ff'); dish(x, 'sweater', 860, Y + 40, 0.9) }, hops: { cancer: [0.05] } }),
    chatScene(3.2, ['libra', 'taurus']),
    cut(2.6, (x, t) => daySky(x, t, { top: '#ff9a6a', bot: '#ffd8a0' }), { virgo: [[0, 300, Y, 250]], sagittarius: [[0, 780, Y, 250]] }, { virgo: 'squint', sagittarius: 'sparkle' },
      [[0.1, 1.2, 'virgo', 'no scenic | routes.'], [1.35, 1.2, 'sagittarius', 'but the | bats!']], { hops: { sagittarius: [1.35, 1.8] } }),
    chatScene(5.4, ['scorpio', 'pisces']),
    cut(2.6, (x, t) => bayou(x, t), { pisces: [[0, 400, Y, 260]], taurus: [[0, 700, Y, 240]] }, { pisces: 'heart', taurus: 'happy' },
      [[0.2, 1.1, 'pisces', 'I just | love y’all'], [1.4, 1.1, 'taurus', 'we know, | baby.']], { front: (x, t, lt, P) => wear(x, P, 'taurus', 'shades', INK) }),
    chatScene(3.2, ['sagittarius', 'leo']),
    cut(2.8, (x, t) => { room(x, { wall: '#5a2a2a', floor: '#3a1a1a' }); sparkles(x, t, 540, 900, 0, 10, 360, 4) }, { leo: [[0, 540, Y, 330]] }, { leo: 'sparkle' }, [[0.2, 2.4, 'leo', "you're | welcome."]],
      { front: (x, t, lt, P) => { wear(x, P, 'leo', 'crown'); wear(x, P, 'leo', 'chain') }, hops: { leo: [0.05, 0.6] } }),
    chatScene(4.0, ['aries', 'gemini']),
  ],
}

// ── shared little sets for w18a
export function bungalow(x, cx, base, t, { col = '#7aa6c9' } = {}) {   // a Heights bungalow with a porch and a dog in a bandana
  box(x, cx - 300, base - 330, 600, 330, col, 8); x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 340, base - 330); x.lineTo(cx, base - 520); x.lineTo(cx + 340, base - 330); x.fill(); x.fillStyle = '#c95a4a'; x.beginPath(); x.moveTo(cx - 316, base - 336); x.lineTo(cx, base - 504); x.lineTo(cx + 316, base - 336); x.fill()
  box(x, cx - 330, base - 60, 660, 60, '#e9e2d0', 6); for (const px of [-300, -100, 100, 300]) box(x, cx + px - 12, base - 300, 24, 240, '#f4efe4', 4)
  box(x, cx - 220, base - 260, 120, 110, '#ffd36b', 5); box(x, cx + 60, base - 260, 120, 200, '#6b3b1f', 5)
  const dx = cx + 230, dy = base - 100, wag = Math.sin(t * 12) * 8   // the dog
  box(x, dx - 50, dy - 30, 100, 50, '#c98e5a', 5); box(x, dx + 40, dy - 70, 50, 50, '#c98e5a', 5); box(x, dx - 40, dy + 18, 16, 26, '#c98e5a', 3); box(x, dx + 20, dy + 18, 16, 26, '#c98e5a', 3)
  box(x, dx - 70, dy - 30 + wag, 24, 12, '#c98e5a', 3); x.fillStyle = BRAKE; x.beginPath(); x.moveTo(dx + 40, dy - 22); x.lineTo(dx + 90, dy - 22); x.lineTo(dx + 65, dy + 4); x.fill(); x.fillStyle = INK; x.fillRect(dx + 70, dy - 56, 8, 8)
}
export function blvdNight(x, t, signs = ['BOBA', 'PHO', 'DUMPLINGS', 'KARAOKE']) {   // Bellaire Blvd at night: lit storefront signs (generic words)
  x.fillStyle = '#120c2a'; x.fillRect(0, 0, 1080, FLOOR + 60); skyline(x, FLOOR - 220, t, { alpha: 0.5 })
  signs.forEach((s, i) => { const cx = 150 + (i % 2) * 520 + (i > 1 ? 260 : 0) - (i > 1 ? 130 : 0), cy = 760 + (i > 1 ? 230 : 0), on = Math.sin(t * 3 + i * 2) > -0.6; x.save(); if (on) { x.shadowColor = [PINK, MINT, GOLD, SKYB][i]; x.shadowBlur = 30 } box(x, cx - 170, cy - 60, 340, 120, '#1c1240', 6); x.shadowBlur = 0; txt(x, s, cx, cy + 4, { size: s.length > 6 ? 46 : 60, col: on ? [PINK, MINT, GOLD, SKYB][i] : '#4a4060' }); x.restore() })
  outside(x, { ground: '#2a2638' })
}
const carFront = (x, cx, cy, col, sc = 1.4) => { x.save(); x.translate(cx, cy); x.scale(sc, sc); box(x, -300, -60, 600, 180, col, 8); x.fillStyle = '#ff3a4e'; x.fillRect(-286, -30, 90, 40); x.fillRect(196, -30, 90, 40); box(x, -90, 10, 180, 50, BONE, 4); txt(x, 'JAN 9', 0, 36, { size: 34, col: INK, font: MONO, weight: 700 }); for (const wx of [-230, 230]) box(x, wx - 40, 120, 80, 50, INK, 0); x.restore() }

// ── hst431 · POV: you're driving five signs to Jan 9 (ride share, pickups across town)
const RIDERS = ['taurus', 'aquarius', 'sagittarius', 'gemini', 'libra']
const inCar = (n, y = 1010) => Object.fromEntries(RIDERS.slice(0, n).map((id, i) => [id, [[0, 300 + i * 120, y, 165]]]))
const road = (x, t, { sunset = true, jam = false } = {}) => {
  const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, sunset ? '#3a2a6a' : '#0e0b24'); g.addColorStop(1, sunset ? '#ff9a6a' : '#2a1d52'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
  skyline(x, 960, t, { alpha: 0.85 }); x.fillStyle = '#2a2638'; x.fillRect(0, 960, 1080, 960)
  for (let k = 0; k < 6; k++) { const ph = ((t * (jam ? 0.2 : 1.4)) + k / 6) % 1, y = 980 + ph * ph * 440, w = 8 + ph * 30; x.fillStyle = BONE; x.fillRect(540 - w / 2, y, w, 20 + ph * 60) }
  if (jam) for (let k = 0; k < 4; k++) { const cx = 180 + k * 240, b = 0.6 + 0.4 * Math.sin(t * 3 + k); x.fillStyle = INK; x.fillRect(cx - 60, 980, 120, 50); x.fillStyle = `rgba(255,58,78,${b.toFixed(2)})`; x.fillRect(cx - 54, 994, 26, 16); x.fillRect(cx + 28, 994, 26, 16) }
}
const ride = (n, extra = {}) => ({ set: (x, t) => { road(x, t, extra.road || {}); carBack(x, 540, 1150, '#7a5cff', t, { s: 1.4 }) }, front: (x, t, lt, P) => { carFront(x, 540, 1150, '#7a5cff'); extra.front?.(x, t, lt, P) }, cast: inCar(n), ...extra.more })
const PINS = [[-330, -170, 'YOU'], [-200, 40, 'HEIGHTS'], [-20, -120, 'MONTROSE'], [80, 180, 'BELLAIRE'], [300, 230, 'PEARLAND'], [320, -150, 'JAN 9']]
export const hst431 = {
  hook: "POV: you're driving | five signs to Jan 9", badge: BADGE, cues: [...sting(698), ['tick', 3.4, 0.1], ['tick', 3.6, 0.1]], endLen: 6.2,
  end: ticket('Five stars for the driver.', ['taurus', 'gemini', 'sagittarius', 'libra']),
  scenes: [
    { dur: 2.8, ...ride(5, { more: { mood: { taurus: 'happy', aquarius: 'sparkle', sagittarius: 'wide', gemini: 'wink', libra: 'heart' }, hops: waveHops(RIDERS, 0.02, 0.12) } }) },
    { dur: 3.0, set: (x, t, lt) => { daySky(x, t, { top: '#8fd0ff', bot: '#e9f6ff', city: false, ground: '#cfe3c0' }); routeMap(x, 540, 990, PINS, lt / 3, t, { k: Kp(lt, 0.02), title: 'TONIGHT: 5 PICKUPS' }) }, cast: {},
      stick: [[0.5, 2.3, 'route: the whole city', PINK]] },
    { dur: 3.4, set: (x, t) => { daySky(x, t, { top: '#ff9a6a', bot: '#ffd8a0', city: false, ground: '#6a8f4a' }); bungalow(x, 540, FLOOR + 60, t) }, cast: { taurus: [[0, 300, Y - 10, 230]] }, mood: { taurus: lt => lt < 1.6 ? 'sleepy' : 'wink' },
      front: (x, t, lt, P) => { streetSign(x, 640, 520, 'THE HEIGHTS', { pole: false, k: Kp(lt, 0.05) }) }, lines: [[0.2, 1.4, 'taurus', 'five more | minutes.'], [1.8, 1.4, 'taurus', "I'm outside. | (I'm inside.)"]] },
    { dur: 3.0, set: (x, t) => { daySky(x, t, { city: false }); mural(x, t); outside(x, { ground: '#3a2a4a' }) }, cast: { aquarius: [[0, 540, Y, 250]] }, mood: { aquarius: 'sparkle' }, front: (x, t, lt, P) => wear(x, P, 'aquarius', 'headphones', MINT),
      lines: [[0.2, 2.5, 'aquarius', 'quick stop at | the vintage shop?']], stick: [[1.2, 1.5, 'MONTROSE', GOLD]] },
    { dur: 3.2, set: (x, t) => blvdNight(x, t), cast: { sagittarius: [[0, -150, Y, 250], [0.8, 540, Y, 250]] }, mood: { sagittarius: 'sparkle' },
      front: (x, t, lt, P) => { const [cx, cy] = P.at('sagittarius'); for (let k = 0; k < 5; k++) dish(x, 'boba', cx - 200 + k * 100, cy + 150, 0.6) }, lines: [[1.0, 2.0, 'sagittarius', 'got everyone | a boba!']] },
    { dur: 3.2, set: (x, t) => { daySky(x, t, { top: '#ffb07a', bot: '#ffe3a6', city: false }); houses(x, FLOOR + 60, t) }, cast: { gemini: [[0, 400, Y, 230]] }, mood: { gemini: 'wink' },
      front: (x, t, lt) => { streetSign(x, 760, 560, 'PEARLAND', { pole: false, k: Kp(lt, 0.05) }) }, lines: [[0.2, 2.7, 'gemini', "you're a | pear-fect driver."]], hops: { gemini: [0.2, 1.4] } },
    { dur: 3.4, ...ride(5, { more: { mood: { taurus: 'eyeroll', aquarius: 'eyeroll', sagittarius: 'squint', gemini: 'wide', libra: 'heart' }, lines: [[0.2, 1.3, 'libra', 'can I pick | the song?'], [1.7, 1.4, 'gemini', 'last time | took an hour']] } }) },
    { dur: 3.2, ...ride(5, { road: { sunset: false, jam: true }, front: (x, t, lt) => shield(x, 900, 620, '610', 0.8), more: { mood: { taurus: 'happy', aquarius: 'sleepy', sagittarius: 'happy', gemini: 'wink', libra: 'happy' }, lines: [[0.2, 1.3, 'taurus', '20 minutes | away!'], [1.6, 1.4, 'gemini', 'without | traffic.']] } }) },
    { dur: 3.4, set: (x, t, lt) => { road(x, t, { sunset: false }); overheadSign(x, 540, 700, 'BETA PARTY', 'EXIT  JAN 9', Kp(lt, 0.05), { gold: true }); carBack(x, 540, 1150, '#7a5cff', t, { s: 1.4 }) }, front: (x, t, lt) => { carFront(x, 540, 1150, '#7a5cff'); if (lt > 1.4) sparkles(x, t, 540, 900, t - lt + 1.4, 12, 360, 5) },
      cast: inCar(5), mood: Object.fromEntries(RIDERS.map(id => [id, 'heart'])), hops: waveHops(RIDERS, 1.4, 0.08), lines: [[1.4, 1.8, 'sagittarius', 'thank you, | driver!']] },
  ],
}

// ── hst432 · what your sign brings to the Jan 9 party (a table that fills up)
const BRINGS = [
  ['aries', 'cooler', 'ice. | I got here first.'], ['taurus', 'queso', 'queso. | the big one.'], ['gemini', 'chips', 'chips AND | a second dip.'],
  ['cancer', 'pot', "grandma's recipe. | enough for 40."], ['leo', 'cake', 'a cake. | with my face on it.'], ['virgo', 'tray', 'kolaches. | labeled. alphabetized.'],
  ['libra', 'gift', 'a hostess gift. | wrapped twice.'], ['scorpio', 'bag', 'a mystery bag. | do not ask.'], ['sagittarius', 'crawfish', 'crawfish! | tiny. it’s January.'],
  ['capricorn', 'umbrella', 'napkins, plates, | a backup plan.'], ['aquarius', 'speaker', 'a speaker. | my own playlist.'], ['pisces', 'kingcake', "king cake! | it's so pretty"],
]
const SLOT = i => [170 + (i % 6) * 148, i < 6 ? 1120 : 1245]
const yard = (x, t) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#2a2a6a'); g.addColorStop(1, '#ff8a7a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, 1000, t, { alpha: 0.7 }); dish(x, 'lights', 540, 720, 2, t); x.fillStyle = '#3a5a3a'; x.fillRect(0, 1000, 1080, 920) }
const spread = (x, t, n, popAt = null) => { partyTable(x, 540, 1170, 980, '#c84a6a'); BRINGS.slice(0, n).forEach(([id, d], i) => { const [sx, sy] = SLOT(i), k = popAt != null && i === n - 1 ? Kp(popAt, 0.0, 0.3) : 1; if (k > 0) dish(x, d, sx, sy, 0.55 * k, t) }) }
export const hst432 = {
  hook: 'What your sign | brings to Jan 9', badge: BADGE, cues: sting(587.33), endLen: 6.2,
  end: ticket('Bring yourself. Jan 9.', ['taurus', 'sagittarius', 'virgo', 'pisces']),
  scenes: [
    { dur: 2.8, set: (x, t) => yard(x, t), front: (x, t, lt) => spread(x, t, 12), cast: Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 100 + i * 80, 960 + (i % 2) * 40, 130]]])), hops: waveHops(SIGN_IDS, 0.02, 0.07), mood: allMood('sparkle') },
    ...BRINGS.map(([id, d, line], i) => ({
      dur: 2.6, title: id.toUpperCase(), set: (x, t) => yard(x, t), front: (x, t, lt) => spread(x, t, i + 1, lt - 0.55),
      cast: { [id]: [[0, 1250, 1010, 240], [0.5, 540, 1010, 240]] }, mood: { [id]: id === 'scorpio' ? 'squint' : id === 'pisces' ? 'heart' : 'happy' }, look: { [id]: [0, 0.4] },
      lines: [[0.6, 1.95, id, line]],
    })),
    { dur: 3.0, set: (x, t) => yard(x, t), front: (x, t, lt) => { spread(x, t, 12); const k = Kp(lt, 0.1, 0.35); label(x, 540, 560, 'what are YOU bringing?', k, { size: 54, bg: GOLD }); label(x, 540, 660, 'comment it', k, { size: 44, bg: PINK, rot: 0.03 }) },
      cast: Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 100 + i * 80, 960 + (i % 2) * 40, 130]]])), hops: waveHops(SIGN_IDS, 0.1, 0.05), mood: allMood('heart') },
  ],
}

// ── hst433 · POV: you checked the forecast for Jan 9 (Libra changes the fit with every update; talks to you)
export function forecastCard(x, cx, cy, temp, word, k, icon = 'sun', t = 0) {
  if (k <= 0) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -230, -170, 460, 340, '#1c3a6a', 8); x.fillStyle = '#2b5fb0'; x.fillRect(-230, -170, 460, 64); txt(x, 'FORECAST · JAN 9', 0, -138, { size: 30, col: BONE, font: MONO, weight: 700 })
  txt(x, temp, 60, 10, { size: 120, col: BONE }); txt(x, word, 0, 120, { size: 40, col: GOLD, font: MONO, weight: 700 })
  if (icon === 'sun') { for (let q = 0; q < 8; q++) { const a = q * Math.PI / 4 + t; x.fillStyle = '#ffd36b'; x.fillRect(-130 + Math.cos(a) * 62 - 8, 10 + Math.sin(a) * 62 - 8, 16, 16) } x.fillStyle = '#ffc24a'; x.beginPath(); x.arc(-130, 10, 42, 0, Math.PI * 2); x.fill() }
  else if (icon === 'cloud') { x.fillStyle = BONE; for (const [dx, dy, r] of [[-160, 20, 34], [-120, 0, 44], [-80, 20, 34]]) { x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() } }
  else if (icon === 'drop') { for (let q = 0; q < 3; q++) { const ph = (t * 1.5 + q / 3) % 1; x.fillStyle = SKYB; x.fillRect(-170 + q * 40, -30 + ph * 80, 16, 24) } }
  else if (icon === 'snow') { x.fillStyle = SKYB; x.fillRect(-140, -10, 20, 20); txt(x, 'AC', -130, 50, { size: 30, col: SKYB, font: MONO, weight: 700 }) }
  x.restore()
}
const libraRoom = (x, t) => { bedroom(x, t, { wall: '#c86a8a', floor: '#6a3a4a', night: false }); closet(x, 220, 820, 300, 520, 1, '#8a5a6a') }
const L = 'libra', LP = [[0, 560, 1000, 300]]
export const hst433 = {
  hook: "POV: you checked the | forecast for Jan 9", badge: BADGE, cues: [...sting(659.25), ['tick', 3.0, 0.08], ['tick', 6.4, 0.08], ['tick', 9.8, 0.08], ['tick', 13.2, 0.08]], endLen: 6.2,
  end: ticket('Layers. Then Jan 9.', ['libra', 'cancer', 'aquarius', 'leo']),
  scenes: [
    { dur: 3.0, set: (x, t) => libraRoom(x, t), front: (x, t, lt) => forecastCard(x, 780, 760, '72°', 'NICE?', 1, 'sun', t), cast: { libra: LP }, mood: { libra: 'sparkle' }, hops: { libra: [0.02, 0.7, 1.4, 2.1] },
      lines: [[0.4, 2.4, L, 'hi. you too? | planning the fit?']] },
    { dur: 3.4, set: (x, t) => libraRoom(x, t), front: (x, t, lt, P) => { forecastCard(x, 780, 600, '55°', 'COLD FRONT', Kp(lt, 0.05), 'cloud', t); if (lt > 1.2) puffer(x, P, L, '#5a8aff') }, cast: { libra: LP }, mood: { libra: lt => lt > 1.2 ? 'happy' : 'wide' },
      lines: [[0.4, 0.9, L, '55?!'], [1.5, 1.7, L, 'puffer coat. | finally.']] },
    { dur: 3.4, set: (x, t) => libraRoom(x, t), front: (x, t, lt, P) => { forecastCard(x, 780, 600, '81°', 'NEVER MIND', Kp(lt, 0.05), 'sun', t); if (lt < 1.2) puffer(x, P, L, '#5a8aff'); else { wear(x, P, L, 'shades'); wear(x, P, L, 'fan', PINK) } }, cast: { libra: LP }, mood: { libra: lt => lt < 1.2 ? 'wide' : 'wink' },
      lines: [[0.3, 0.9, L, '81.'], [1.4, 1.8, L, 'puffer: | returned.']] },
    { dur: 3.4, set: (x, t) => libraRoom(x, t), front: (x, t, lt, P) => { forecastCard(x, 780, 600, '81°', 'HUMID', Kp(lt, 0.05), 'drop', t); wear(x, P, L, 'frizz', '#7a4a2a'); sweat(x, 560, 860, t) }, cast: { libra: LP }, mood: { libra: 'eyeroll' },
      lines: [[0.3, 2.8, L, 'my hair | has a forecast too.']] },
    { dur: 3.4, set: (x, t) => libraRoom(x, t), front: (x, t, lt, P) => { forecastCard(x, 780, 600, '64°', 'INDOORS: ARCTIC', Kp(lt, 0.05), 'snow', t); if (lt > 1.4) wear(x, P, L, 'sweater', '#5a8a6a') }, cast: { libra: LP }, mood: { libra: lt => lt > 1.4 ? 'happy' : 'squint' },
      lines: [[0.3, 1.1, L, 'and the AC?'], [1.5, 1.7, L, 'a sweater. | obviously.']] },
    { dur: 3.6, set: (x, t) => libraRoom(x, t), front: (x, t, lt, P) => { wear(x, P, L, 'sweater', '#5a8a6a'); wear(x, P, L, 'scarf', PINK); wear(x, P, L, 'shades'); wear(x, P, L, 'flower', GOLD); if (lt > 0.4) sparkles(x, t, 560, 950, t - lt + 0.4, 10, 260, 2) }, cast: { libra: LP }, mood: { libra: 'sparkle' }, hops: { libra: [0.4, 1.0] },
      lines: [[0.3, 2.9, L, 'the answer: | layers.']], stick: [[0.4, 2.8, 'Houston weather: undecided', GOLD]] },
    { dur: 5.2, set: (x, t) => libraRoom(x, t), front: (x, t, lt, P) => { wear(x, P, L, 'flower', GOLD); rpg(x, lt, 'LIBRA', 'dress in layers. | then wear the one that | feels like you.', 0.2, 4.8, { y: 1120 }) },
      cast: { libra: [[0, 560, 860, 300]] }, mood: { libra: 'heart' }, stick: [[0.1, 1.6, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst434 · Get ready with Leo: 3 hours, 1 mirror (GRWM parody, house music)
const leoRoom = (x, t) => { bedroom(x, t, { wall: '#6a2a3a', floor: '#3a1a2a' }); mirror(x, 800, 880, 300, 620, t); for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3 + t * 0.4; x.fillStyle = 'rgba(255,240,200,0.9)'; x.beginPath(); x.arc(800 + Math.cos(a) * 200, 880 + Math.sin(a) * 330, 14, 0, Math.PI * 2); x.fill() } }
const leoRefl = (items = [], mood = 'sparkle', extra) => (x, t, lt) => { x.save(); x.beginPath(); x.rect(668, 588, 264, 584); x.clip(); signChar(x, t, 'leo', 800, 1000, 200, { mood, seed: 7, look: [-0.5, 0] }); items.forEach(([it, c]) => wearAt(x, 800, 1000, 200, it, c)); extra?.(x, t, lt); x.restore() }
const LEO = [[0, 330, Y, 290]]
const hourTag = h => (x, t, lt) => stamp(x, `HOUR ${h}`, 540, 300, GOLD)
export const hst434 = {
  hook: 'Get ready with Leo: | 3 hours, 1 mirror', badge: BADGE, cues: [...sting(1046.5), ['boom', 0.0, 0.25]], endLen: 6.2,
  end: ticket('Ready when you are. Jan 9.', ['leo', 'virgo', 'gemini', 'sagittarius']),
  scenes: [
    { dur: 2.8, set: leoRoom, back: leoRefl([['crown', GOLD]], 'wink'), front: (x, t, lt, P) => { wear(x, P, 'leo', 'crown') }, cast: { leo: LEO }, mood: { leo: 'sparkle' }, hops: { leo: [0.02, 0.5, 1.0, 1.5, 2.0] }, look: { leo: [0.8, 0] } },
    { dur: 3.2, set: leoRoom, back: leoRefl([], 'happy', (x, t) => { x.fillStyle = 'rgba(125,200,120,0.6)'; x.fillRect(730, 900, 140, 120) }), front: (x, t, lt, P) => { hourTag(1)(x, t, lt); const [cx, cy, s] = P.at('leo'); x.fillStyle = 'rgba(125,200,120,0.6)'; x.fillRect(cx - s * 0.3, cy - s * 0.18, s * 0.6, s * 0.4) }, cast: { leo: LEO }, mood: { leo: 'sleepy' },
      lines: [[0.3, 2.6, 'leo', 'step one: | the glow.']] },
    { dur: 3.4, set: leoRoom, back: leoRefl([['frizz', '#e0a030']], 'wide'), front: (x, t, lt, P) => { hourTag(1)(x, t, lt); wear(x, P, 'leo', 'frizz', '#e0a030') }, cast: { leo: LEO }, mood: { leo: 'wide' },
      lines: [[0.2, 1.4, 'leo', 'stepped outside | for one second.'], [1.8, 1.4, 'leo', 'humidity: | 1. Leo: 0.']] },
    { dur: 3.0, set: leoRoom, back: leoRefl([['sweater', '#c98e5a']], 'eyeroll'), front: (x, t, lt, P) => { hourTag(2)(x, t, lt); wear(x, P, 'leo', 'sweater', '#c98e5a') }, cast: { leo: LEO }, mood: { leo: 'eyeroll' },
      lines: [[0.2, 2.5, 'leo', 'fit one: | too cozy.']] },
    { dur: 3.0, set: leoRoom, back: leoRefl([['tie', '#2b5fb0']], 'squint'), front: (x, t, lt, P) => { hourTag(2)(x, t, lt); wear(x, P, 'leo', 'tie', '#2b5fb0') }, cast: { leo: LEO }, mood: { leo: 'squint' },
      lines: [[0.2, 2.5, 'leo', 'fit two: | too office.']] },
    { dur: 3.4, set: leoRoom, back: leoRefl([['crown', GOLD], ['chain', GOLD], ['shades', INK]], 'sparkle'), front: (x, t, lt, P) => { hourTag(3)(x, t, lt); wear(x, P, 'leo', 'crown'); wear(x, P, 'leo', 'chain'); wear(x, P, 'leo', 'shades'); if (lt > 0.4) sparkles(x, t, 330, 1150, t - lt + 0.4, 12, 280, 3) }, cast: { leo: LEO }, mood: { leo: 'sparkle' }, hops: { leo: [0.4, 0.9] },
      lines: [[0.4, 2.8, 'leo', 'fit three: | THAT is the one.']] },
    { dur: 3.2, set: (x, t) => { room(x, { wall: '#3a3a6a', floor: '#2a2a4a' }); box(x, 380, 520, 320, 820, '#8a5a3a', 8); x.fillStyle = GOLD; x.fillRect(640, 920, 16, 40) }, cast: { virgo: [[0, 540, Y, 260]] }, mood: { virgo: 'squint' }, front: (x, t, lt, P) => clipboard(x, 860, 1000, 'LEAVING', [['now', null]], lt, { w: 260 }),
      lines: [[0.2, 1.3, 'virgo', 'Leo. | we leave in 5.'], [1.6, 1.4, [540, 420, 120], 'make it 50!']], hops: { virgo: [0.2] } },
    { dur: 5.2, set: leoRoom, back: leoRefl([['crown', GOLD], ['chain', GOLD]], 'wink'), front: (x, t, lt, P) => { wear(x, P, 'leo', 'crown'); wear(x, P, 'leo', 'chain'); rpg(x, lt, 'LEO', 'and you? | you look great too. | come as you are.', 0.3, 4.8, { y: 1120, col: GOLD }) },
      cast: { leo: [[0, 330, 860, 280]] }, mood: { leo: 'heart' }, look: { leo: [0, 0.3] }, stick: [[0.1, 1.6, '★ LESSON UNLOCKED', GOLD]] },
  ],
}
