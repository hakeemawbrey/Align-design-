// Houston Star Talk, worker w18 (party prep): hst445–hst452. Helpers in w18.js.
import { Y, BADGE, Kp, fadeK, sting, ticket, waveHops, title, daySky, bayou, bedroom, rack, mirror, phone, clipboard, thermo, rpg, wear, wearAt, dish, partyTable,
  carBack, routeMap, photoFrame, flash, dayCard, nameTag, closet, stamp, pennant, signChar, sparkles, pop01, label, txt, box, outside, room, FLOOR, clamp, prog, ease,
  GOLD, BONE, PINK, INK, MINT, SKYB, LAV, MONO, SERIF } from './w18.js'
import { skyline, freeway, car, heatSun, sweat, shield, streetSign, overheadSign, taco, kolache, klobasnek, puffer, mural, houses, cones, slab, inviteCard, BRAKE } from './kit.js'
import { bungalow, blvdNight } from './w18a.js'
import { SIGN_IDS, hearts } from '../signs3kit.js'

const allMood = m => Object.fromEntries(SIGN_IDS.map(id => [id, m]))
const nightCity = (x, t, top = '#1c1240', bot = '#5a2a7a') => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, top); g.addColorStop(1, bot); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR + 60, t, { alpha: 0.9 }); outside(x, { ground: '#221b38' }) }

// ── hst445 · Scorpio's party prep is classified (noir case files; the twist is a card for everyone)
const SC = 'scorpio'
const noir = (x, t) => { x.fillStyle = '#0c0a14'; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 7; k++) { x.fillStyle = 'rgba(255,240,200,0.05)'; x.fillRect(0, 400 + k * 130, 1080, 50) } x.save(); x.globalAlpha = 0.5; skyline(x, 760, t, { col: '#141026', lit: '#a08a5a' }); x.restore(); box(x, 0, 740, 1080, 30, '#2a1a10', 0)
  const g = x.createRadialGradient(540, 1000, 40, 540, 1000, 520); g.addColorStop(0, 'rgba(255,230,170,0.28)'); g.addColorStop(1, 'rgba(255,230,170,0)'); x.fillStyle = g; x.fillRect(0, 400, 1080, 1100); box(x, 0, FLOOR + 40, 1080, 30, '#3a2418', 0); x.fillStyle = '#1a120c'; x.fillRect(0, FLOOR + 70, 1080, 900) }
const folder = (x, cx, cy, tab, lines, k = 1, open = 0) => { if (k <= 0) return; x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k); box(x, -260, -170, 520, 340, '#c9a56a', 7); box(x, -260, -210, 200, 50, '#c9a56a', 6); txt(x, tab, -160, -184, { size: 28, col: INK, font: MONO, weight: 700 })
  lines.forEach((l, i) => txt(x, l, -220, -90 + i * 62, { size: 38, col: INK, align: 'left', font: MONO, weight: 700 })); x.save(); x.rotate(-0.25); box(x, -30, 60, 290, 70, 'rgba(0,0,0,0)', 0); x.strokeStyle = BRAKE; x.lineWidth = 7; x.strokeRect(-20, 60, 270, 64); txt(x, 'CLASSIFIED', 115, 94, { size: 36, col: BRAKE, font: MONO, weight: 700 }); x.restore(); x.restore() }
const FILES = [['FILE 01', ['OUTFIT:', 'black.', 'also black.']], ['FILE 02', ['ARRIVAL:', 'unannounced.', 'already there.']], ['FILE 03', ['BRINGING:', 'a vibe.', '(and a dip)']]]
export const hst445 = {
  hook: "Scorpio's party prep | is classified", badge: BADGE, cues: [...sting(415.3), ['boom', 0.0, 0.3]], endLen: 6.2,
  end: ticket('Say hi. Jan 9.', ['scorpio', 'pisces', 'gemini', 'leo']),
  scenes: [
    { dur: 3.0, set: noir, front: (x, t, lt, P) => { wear(x, P, SC, 'shades'); folder(x, 760, 1240, 'FILE 00', ['JAN 9'], 0.6) }, cast: { [SC]: [[0, 330, Y - 40, 300]] }, mood: { [SC]: 'squint' }, hops: { [SC]: [0.02, 1.2] }, lines: [[1.0, 1.8, SC, "you didn't | see me."]] },
    ...FILES.map(([tab, lines], i) => ({ dur: 3.2, set: noir, front: (x, t, lt, P) => { folder(x, 540, 980, tab, lines, Kp(lt, 0.05)); wear(x, P, SC, 'shades') }, cast: { [SC]: [[0, 880, 1330, 170]] }, mood: { [SC]: 'squint' }, hops: { [SC]: [0.1] } })),
    { dur: 3.2, set: noir, front: (x, t, lt, P) => wear(x, P, SC, 'shades'), cast: { [SC]: [[0, 300, Y - 40, 260]], gemini: [[0, 780, Y - 40, 240]] }, mood: { [SC]: 'squint', gemini: 'wide' },
      lines: [[0.2, 1.3, 'gemini', 'what are | you wearing?'], [1.7, 1.3, SC, '...black.']] },
    { dur: 3.2, set: noir, front: (x, t, lt, P) => { wear(x, P, SC, 'shades'); wear(x, P, 'leo', 'crown') }, cast: { [SC]: [[0, 300, Y - 40, 260]], leo: [[0, 780, Y - 40, 240]] }, mood: { [SC]: 'squint', leo: 'sparkle' },
      lines: [[0.2, 1.3, 'leo', 'and what time | are you coming?'], [1.7, 1.3, SC, 'I was never | not there.']] },
    { dur: 3.6, set: noir, front: (x, t, lt) => { const k = Kp(lt, 0.4); if (k > 0) { x.save(); x.translate(540, 900); x.scale(k, k); box(x, -240, -160, 480, 320, PINK, 8); txt(x, 'for the group:', 0, -70, { size: 40, col: INK }); txt(x, 'glad you exist.', 0, 0, { size: 50, col: INK, font: SERIF, weight: 500, italic: true }); txt(x, '- S', 120, 80, { size: 40, col: INK }); x.restore() } },
      cast: { [SC]: [[0, 300, Y - 40, 230]], pisces: [[0, 800, Y - 40, 230]] }, mood: { [SC]: 'heart', pisces: 'heart' }, stick: [[0.1, 1.2, 'FILE 04: DECLASSIFIED', GOLD]], lines: [[1.6, 1.6, 'pisces', 'Scorpio. | (sobbing)']] },
    { dur: 4.8, set: noir, front: (x, t, lt, P) => { wear(x, P, SC, 'shades'); rpg(x, lt, 'SCORPIO', 'mysterious is fine. | but say hi. | people want to know you.', 0.3, 4.3, { y: 1060, col: BRAKE }) },
      cast: { [SC]: [[0, 540, 820, 250]] }, mood: { [SC]: 'wink' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst446 · Aries is ready. It's Jan 2. (a week of being ready; pace yourself)
const AR = 'aries'
const aDay = (n, set, line, extra = {}) => ({ dur: 3.0, set, front: (x, t, lt, P) => { dayCard(x, 860, 560, n, Kp(lt, 0.02), { col: BRAKE }); wear(x, P, AR, 'cap', '#ff5a3a'); extra.front?.(x, t, lt, P) }, cast: { [AR]: [[0, 400, Y, 280]], ...(extra.cast || {}) }, mood: { [AR]: 'sparkle', ...(extra.mood || {}) }, hops: { [AR]: extra.hops || [0.2, 0.6, 1.0, 1.4, 1.8, 2.2] }, lines: [[0.3, 2.4, AR, line], ...(extra.lines || [])] })
export const hst446 = {
  hook: "Aries is ready. | It's Jan 2.", badge: BADGE, cues: [...sting(880)], endLen: 6.2,
  end: ticket('Ready? Jan 9.', ['aries', 'capricorn', 'sagittarius', 'leo']),
  scenes: [
    { dur: 3.0, set: (x, t) => { room(x, { wall: '#c84a3a', floor: '#4a2a1e' }); box(x, 700, 560, 260, 780, '#6b3b1f', 8); x.fillStyle = GOLD; x.fillRect(730, 950, 18, 40); pennant(x, 110, 700, 'H-TOWN', t) }, front: (x, t, lt, P) => { dayCard(x, 830, 700, 2, 1, { col: BRAKE }); wear(x, P, AR, 'cap', '#ff5a3a') }, cast: { [AR]: [[0, 400, Y, 290]] }, mood: { [AR]: 'sparkle' }, hops: waveHops([AR], 0.02, 0)[AR].concat([0.4, 0.8, 1.2, 1.6, 2.0, 2.4]), lines: [[0.8, 2.0, AR, 'READY!']] },
    aDay(3, (x, t) => bayou(x, t), 'ran the bayou trail. | warmed up.', { front: (x, t) => sweat(x, 400, 1060, t) }),
    aDay(5, (x, t) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#ffb07a'); g.addColorStop(1, '#ffe8c0'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR - 290, t, { alpha: 0.6 }); freeway(x, FLOOR - 300, 440, 3, 0) }, 'in the car. | just in case.', { front: (x, t) => car(x, 400, FLOOR - 40, '#ff5a3a', { open: true, s: 1.4 }), cast: { [AR]: [[0, 450, FLOOR - 180, 200]] }, hops: [0.2, 1.2, 2.2] }),
    aDay(7, (x, t) => bedroom(x, t, { wall: '#3a2a5a' }), 'zzz... | ready... zzz', { mood: { [AR]: 'sleepy' }, hops: [] }),
    { dur: 3.4, set: (x, t) => bedroom(x, t, { wall: '#3a2a5a' }), front: (x, t, lt, P) => { dayCard(x, 860, 560, 8, 1, { col: BRAKE }); wear(x, P, AR, 'cap', '#ff5a3a'); clipboard(x, 760, 960, 'JAN 9', [['tomorrow', 0.6]], lt, { w: 280, k: 0.8 }) }, cast: { [AR]: [[0, 300, Y, 260]], capricorn: [[0, 560, Y, 230]] }, mood: { [AR]: lt => lt > 1.7 ? 'wide' : 'sleepy', capricorn: 'squint' },
      lines: [[0.2, 1.3, 'capricorn', "it's | tomorrow."], [1.7, 1.4, AR, 'TOMORROW?!']], hops: { [AR]: [1.7, 1.9, 2.1, 2.3] } },
    { dur: 3.2, set: (x, t, lt) => { nightCity(x, t); overheadSign(x, 540, 640, 'BETA PARTY', 'JAN 9', Kp(lt, 0.05), { gold: true }) }, front: (x, t, lt, P) => { dayCard(x, 860, 900, 9, Kp(lt, 0.3), { col: GOLD }); wear(x, P, AR, 'cap', '#ff5a3a'); if (lt > 0.8) sparkles(x, t, 400, 1150, t - lt + 0.8, 12, 300, 4) },
      cast: { [AR]: [[0, -200, Y, 270], [0.6, 400, Y, 270]] }, mood: { [AR]: 'sparkle' }, lines: [[0.9, 2.0, AR, 'FIRST!']] },
    { dur: 4.8, set: (x, t) => bayou(x, t), front: (x, t, lt, P) => { wear(x, P, AR, 'cap', '#ff5a3a'); rpg(x, lt, 'ARIES', 'excited is good. | pace yourself. | the fun lasts all night.', 0.3, 4.3, { y: 1060, col: '#ff8a5a' }) },
      cast: { [AR]: [[0, 540, 820, 250]] }, mood: { [AR]: 'heart' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst447 · practice your party small talk, by sign (Houston openers)
const OPENERS = [
  ['aries', "hi! I'm Aries! | hi!", 'sparkle'], ['taurus', "what's your | breakfast taco order?", 'heart'], ['gemini', 'inside or outside | the Loop?', 'wink'],
  ['cancer', 'where are you | from originally?', 'happy'], ['leo', 'so. | do you like my outfit?', 'sparkle'], ['virgo', "where'd you go | to high school?", 'squint'],
  ['libra', 'flour or corn? | (no wrong answer)', 'heart'], ['scorpio', "what's your | rising sign?", 'squint'], ['sagittarius', 'have you seen | the bayou bats?', 'wide'],
  ['capricorn', 'how was the drive? | (20 minutes, right?)', 'happy'], ['aquarius', 'kolache or | klobasnek? defend it.', 'eyeroll'], ['pisces', 'how are you? | like, really?', 'heart'],
]
const stage = (x, t, i) => { const cols = ['#2a5a8a', '#5a2a6a', '#2a6a5a', '#7a4a2a']; x.fillStyle = cols[i % 4]; x.fillRect(0, 0, 1080, 1920); for (let k = 0; k < 10; k++) { x.fillStyle = 'rgba(255,255,255,0.05)'; x.fillRect(k * 120, 0, 60, 1920) } skyline(x, FLOOR + 60, t, { alpha: 0.35 }); outside(x, { ground: '#221b38' })
  box(x, 700, 560, 300, 200, BONE, 7); txt(x, 'PRACTICE', 850, 610, { size: 34, col: INK, font: MONO, weight: 700 }); txt(x, 'ROUND', 850, 660, { size: 34, col: INK, font: MONO, weight: 700 }); txt(x, String(i + 1), 850, 720, { size: 50, col: BRAKE }) }
export const hst447 = {
  hook: 'Practice your party | small talk, by sign', badge: BADGE, cues: [...sting(659.25)], endLen: 6.2,
  end: ticket('Say hi to us. Jan 9.', ['cancer', 'virgo', 'gemini', 'pisces']),
  scenes: [
    { dur: 2.8, set: (x, t) => { stage(x, t, 0); streetSign(x, 540, 640, 'HOUSTON', { pole: false, k: 0.85, sub: 'SMALL TALK 101' }) }, cast: Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 90 + (i % 6) * 180, i < 6 ? 1080 : 1280, 150]]])), hops: waveHops(SIGN_IDS, 0.02, 0.06), mood: allMood('happy') },
    ...OPENERS.map(([id, line, mood], i) => ({ dur: 2.6, set: (x, t) => stage(x, t, i), cast: { [id]: [[0, 380, Y, 290]] }, mood: { [id]: mood }, look: { [id]: [0, 0.2] }, hops: { [id]: [0.1] }, lines: [[0.2, 2.25, id, line]], front: (x, t, lt) => label(x, 380, Y + 180, id.toUpperCase(), 1, { size: 30, bg: BONE, rot: 0, font: MONO, weight: 700 }) })),
    { dur: 3.2, set: (x, t) => stage(x, t, 2), front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); label(x, 540, 560, 'your go-to opener?', k, { size: 56, bg: GOLD }); label(x, 540, 670, 'comment it', k, { size: 44, bg: PINK, rot: 0.03 }) },
      cast: Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 90 + (i % 6) * 180, i < 6 ? 1080 : 1280, 150]]])), hops: waveHops(SIGN_IDS, 0.1, 0.05), mood: allMood('heart') },
  ],
}

// ── hst448 · your hair vs Houston humidity, by sign (a humidity meter that only reads YES)
const HAIR = [
  ['aries', 'stepped outside. | it is over.', [['frizz', '#ff7a3a']], 'wide'], ['taurus', 'a hat. | problem solved.', [['hat', '#8a5a3a']], 'happy'],
  ['gemini', 'half up, | half down. both frizz.', [['frizz', '#ffd36b'], ['bow', PINK]], 'wink'], ['leo', 'the mane | has doubled.', [['frizz', '#e0a030'], ['crown', GOLD]], 'sparkle'],
  ['virgo', 'three products. | humidity: four.', [['frizz', '#7dbf5a']], 'squint'], ['libra', 'a scarf. | it is a look now.', [['scarf', PINK], ['flower', GOLD]], 'heart'],
  ['sagittarius', 'embracing it. | big hair, big night.', [['frizz', '#b08aff']], 'sparkle'], ['pisces', "it's not rain. | I'm just emotional.", [['frizz', '#9a8aff']], 'heart'],
]
const muggy = (x, t, i) => { const cols = [['#7ab0c0', '#e8f0d0'], ['#8ab0a0', '#f0e8c0'], ['#a0a0c0', '#f0d8c0'], ['#80b0b0', '#f0f0d0']][i % 4]; daySky(x, t, { top: cols[0], bot: cols[1], ground: '#5a7a4a' }); for (let k = 0; k < 12; k++) { const ph = (t * 0.2 + k / 12) % 1; x.fillStyle = 'rgba(255,255,255,0.18)'; x.beginPath(); x.arc((k * 97) % 1080, 1200 - ph * 700, 30 + (k % 3) * 12, 0, Math.PI * 2); x.fill() } }
const meter = (x, cx, cy, lt, k = 1) => { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -130, -110, 260, 220, '#1c3a4a', 7); txt(x, 'HUMIDITY', 0, -70, { size: 30, col: BONE, font: MONO, weight: 700 }); const a = -Math.PI + Math.min(Math.PI, Math.PI * (0.7 + 0.3 * Math.abs(Math.sin(lt * 3)))); x.strokeStyle = BONE; x.lineWidth = 8; x.beginPath(); x.arc(0, 40, 80, Math.PI, 0); x.stroke(); x.strokeStyle = BRAKE; x.lineWidth = 8; x.beginPath(); x.moveTo(0, 40); x.lineTo(Math.cos(a) * 70, 40 + Math.sin(a) * 70); x.stroke(); txt(x, 'YES', 0, 80, { size: 34, col: GOLD, font: MONO, weight: 700 }); x.restore() }
export const hst448 = {
  hook: 'Your hair vs Houston | humidity, by sign', badge: BADGE, cues: [...sting(739.99)], endLen: 6.2,
  end: ticket('Come as you are, frizz and all.', ['leo', 'sagittarius', 'pisces', 'libra']),
  scenes: [
    { dur: 2.8, set: (x, t) => muggy(x, t, 0), front: (x, t, lt, P) => { meter(x, 860, 780, lt + 1); HAIR.slice(0, 4).forEach(([id, , w]) => w.forEach(([it, c]) => wear(x, P, id, it, c))) },
      cast: Object.fromEntries(HAIR.slice(0, 4).map(([id], i) => [id, [[0, 150 + i * 200, Y, 190]]])), hops: waveHops(HAIR.slice(0, 4).map(h => h[0]), 0.02, 0.1), mood: Object.fromEntries(HAIR.slice(0, 4).map(([id]) => [id, 'wide'])) },
    ...HAIR.map(([id, line, w, mood], i) => ({ dur: 3.0, set: (x, t) => muggy(x, t, i), front: (x, t, lt, P) => { meter(x, 860, 640, lt, Kp(lt, 0.02)); w.forEach(([it, c]) => { if (it !== 'frizz' || lt > 0.5) wear(x, P, id, it, c) }); sweat(x, P.at(id)[0], P.at(id)[1] - 150, t, 2) },
      cast: { [id]: [[0, 380, Y, 290]] }, mood: { [id]: mood }, hops: { [id]: [0.5] }, lines: [[0.6, 2.2, id, line]] })),
    { dur: 3.2, set: (x, t) => muggy(x, t, 1), front: (x, t, lt, P) => { HAIR.slice(4).forEach(([id, , w]) => w.forEach(([it, c]) => wear(x, P, id, it, c))); const k = Kp(lt, 0.1, 0.35); label(x, 540, 560, 'your humidity hair plan?', k, { size: 52, bg: GOLD }); label(x, 540, 670, 'comment your sign', k, { size: 44, bg: PINK, rot: 0.03 }) },
      cast: Object.fromEntries(HAIR.slice(4).map(([id], i) => [id, [[0, 150 + i * 200, Y, 190]]])), hops: waveHops(HAIR.slice(4).map(h => h[0]), 0.1, 0.1), mood: Object.fromEntries(HAIR.slice(4).map(([id]) => [id, 'heart'])) },
  ],
}

// ── hst449 · the signs pick a pre-party photo spot (a mural, the bats, paddle boats, the skyline; then the group photo)
const spotScene = (dur, set, ids, cap, line, extra = {}) => ({ dur, set, front: (x, t, lt, P) => { photoFrame(x, 540, 980, 860, 760, Kp(lt, 0.02), cap); flash(x, lt, 1.6); extra.front?.(x, t, lt, P) }, cast: Object.fromEntries(ids.map((id, i) => [id, [[0, 540 + (i - (ids.length - 1) / 2) * 250, 1130, 230]]])),
  mood: Object.fromEntries(ids.map(id => [id, lt => lt > 1.6 ? 'happy' : 'sparkle'])), hops: Object.fromEntries(ids.map((id, i) => [id, [1.6 + i * 0.05]])), lines: [[0.2, 1.3, ids[0], line]], ...extra.more })
const paddle = (x, t) => { daySky(x, t, { top: '#7ac0ff', bot: '#e0f4ff', city: true, ground: '#4a8a5a' }); x.fillStyle = '#5ab0d0'; x.fillRect(0, 1000, 1080, 380); for (let k = 0; k < 3; k++) { const cx = 220 + k * 320 + Math.sin(t + k) * 20; box(x, cx - 90, 1220, 180, 50, ['#ffd36b', PINK, MINT][k], 5); box(x, cx - 50, 1180, 100, 40, BONE, 4) } }
export const hst449 = {
  hook: 'Your pre-party | photo spot, by sign', badge: BADGE, cues: [...sting(587.33), ['bell', 1.6 + 2.8, 1568, 0.01, 0.6, 0]], endLen: 6.2,
  end: ticket('Save us a spot in the photo. Jan 9.', ['leo', 'libra', 'aquarius', 'sagittarius']),
  scenes: [
    { dur: 2.8, set: (x, t) => { daySky(x, t, { city: false }); mural(x, t); outside(x, { ground: '#3a2a4a' }) }, cast: Object.fromEntries(['leo', 'libra', 'aquarius', 'sagittarius', 'capricorn'].map((id, i) => [id, [[0, 130 + i * 205, Y, 180]]])), hops: waveHops(['leo', 'libra', 'aquarius', 'sagittarius', 'capricorn'], 0.02, 0.1), mood: allMood('sparkle') },
    spotScene(3.4, (x, t) => { daySky(x, t, { city: false }); mural(x, t); outside(x, { ground: '#3a2a4a' }) }, ['aquarius'], 'the mural', 'a Montrose mural. | obviously.', { front: (x, t, lt, P) => wear(x, P, 'aquarius', 'headphones', MINT) }),
    spotScene(3.4, (x, t, lt) => { bayou(x, t); box(x, -20, 980, 1120, 60, '#8f96a0', 6); for (let k = 0; k < 30; k++) { const ph = ((lt * 0.35 + k / 30) % 1), bx = 200 + (k * 37) % 600 + ph * 300, by = 960 - ph * 520 + Math.sin(k + lt * 6) * 24, w = Math.sin(lt * 18 + k) > 0 ? 12 : 5; x.fillStyle = INK; x.fillRect(bx - w, by - 3, w * 2, 6) } }, ['sagittarius'], 'bats at sunset', 'the bridge! | at bat o’clock!'),
    spotScene(3.4, paddle, ['libra', 'pisces'], 'paddle boats', 'paddle boats. | so romantic.'),
    spotScene(3.4, (x, t) => { nightCity(x, t, '#0e0b24', '#3a2a6a') }, ['capricorn'], 'the skyline', 'skyline. | from the bayou. classic.'),
    spotScene(3.4, (x, t) => { nightCity(x, t, '#2a1a4a', '#6a2a5a'); }, ['leo'], 'just me', 'any spot. | I am the spot.', { front: (x, t, lt, P) => { wear(x, P, 'leo', 'crown'); wear(x, P, 'leo', 'shades') } }),
    { dur: 3.6, set: (x, t) => { daySky(x, t, { city: false }); mural(x, t); outside(x, { ground: '#3a2a4a' }) }, front: (x, t, lt, P) => { photoFrame(x, 540, 1000, 960, 640, Kp(lt, 0.02), 'all of us · Jan 9'); flash(x, lt, 2.0); wear(x, P, 'leo', 'crown') },
      cast: Object.fromEntries(['aquarius', 'sagittarius', 'libra', 'pisces', 'capricorn', 'leo'].map((id, i) => [id, [[0, 160 + i * 150, 1150 - (i % 2) * 60, 170]]])), mood: allMood('happy'), hops: waveHops(['aquarius', 'sagittarius', 'libra', 'pisces', 'capricorn', 'leo'], 1.9, 0.03),
      stick: [[0.2, 1.6, 'ok, everyone: cheese', GOLD]] },
    { dur: 3.0, set: (x, t) => nightCity(x, t), front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); label(x, 540, 560, 'your Houston photo spot?', k, { size: 52, bg: GOLD }); label(x, 540, 670, 'comment it', k, { size: 44, bg: PINK, rot: 0.03 }) },
      cast: Object.fromEntries(['aquarius', 'sagittarius', 'libra', 'pisces', 'capricorn', 'leo'].map((id, i) => [id, [[0, 130 + i * 165, Y, 160]]])), mood: allMood('heart'), hops: waveHops(['aquarius', 'sagittarius', 'libra', 'pisces', 'capricorn', 'leo'], 0.1, 0.05) },
  ],
}
