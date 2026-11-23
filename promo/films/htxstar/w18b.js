// Houston Star Talk, worker w18 (party prep): hst435–hst444. Helpers in w18.js.
import { Y, BADGE, Kp, fadeK, sting, ticket, waveHops, title, daySky, bayou, bedroom, rack, mirror, phone, clipboard, thermo, rpg, wear, wearAt, dish, partyTable,
  carBack, routeMap, photoFrame, flash, dayCard, nameTag, closet, stamp, pennant, signChar, sparkles, pop01, label, txt, box, outside, room, FLOOR, clamp, prog, ease,
  GOLD, BONE, PINK, INK, MINT, SKYB, LAV, MONO, SERIF } from './w18.js'
import { skyline, freeway, car, heatSun, sweat, shield, streetSign, overheadSign, taco, kolache, klobasnek, puffer, mural, houses, cones, coffeeShop, slab, inviteCard, calendar, loopMap, BRAKE } from './kit.js'
import { bungalow, blvdNight, forecastCard } from './w18a.js'
import { SIGN_IDS, notes, hearts } from '../signs3kit.js'

const allMood = m => Object.fromEntries(SIGN_IDS.map(id => [id, m]))

// ── hst435 · Virgo made you a Jan 9 checklist (talks to you; cutaways of who failed which item)
const LIST = [['a fit (+ an AC layer)', 2.6], ['a ride, figured out', 3.8], ['water + a snack', 5.8], ['phone: charged', 9.4], ['reply to the group chat', 13.0], ['one small-talk opener', 16.8], ['you, as you are', null]]
const desk = (x, t) => { room(x, { wall: '#2a5a4a', floor: '#3a2a1e', trim: '#1a2a24' }); skyline(x, FLOOR + 40, t, { col: '#1f4a3c', lit: '#cfe3a0', alpha: 0.35 }) }
const vList = (x, lt, t0) => { const p = ease.inOutCubic(clamp((lt + t0 - 2.5) / 0.5)); x.save(); x.translate(540, 820 + 120 * (1 - p)); x.scale(0.76 + 0.24 * p, 0.76 + 0.24 * p); x.translate(-540, -820); clipboard(x, 540, 820, 'YOUR JAN 9 LIST', LIST, lt + t0, { w: 640 }); x.restore() }
const vScene = (dur, t0, says, extra = {}) => ({ dur, set: desk, front: (x, t, lt) => { vList(x, lt, t0); says.forEach(([at, d, text]) => rpg(x, lt, 'VIRGO', text, at, d, { y: text.split('|').length > 2 ? 1170 : 1200, col: MINT })) }, cast: { virgo: [[0, 900, 1150, 150]] }, mood: { virgo: 'squint' }, hops: { virgo: says.map(l => l[0]) }, ...extra })
const flop = (dur, set, id, mood, line, extra = {}) => ({ dur, set, cast: { [id]: [[0, 540, Y, 290]] }, mood: { [id]: mood }, lines: [[0.2, dur - 0.5, id, line]], ...extra })
export const hst435 = {
  hook: 'Virgo made you | a Jan 9 checklist', badge: BADGE, cues: [...sting(880), ['tick', 2.6, 0.1], ['tick', 3.8, 0.1], ['tick', 8.4, 0.1], ['tick', 14.6, 0.1], ['tick', 20.8, 0.1], ['tick', 27.2, 0.1]], endLen: 6.2,
  end: ticket('Checklist complete. Jan 9.', ['virgo', 'gemini', 'pisces', 'scorpio']),
  scenes: [
    vScene(4.6, 0, [[0.1, 1.9, 'you. yes, you. | I made you a list.'], [2.2, 2.3, 'the fit. the ride. | sorted.']], { hops: { virgo: [0.02, 0.5, 1.0, 2.2] } }),
    flop(2.6, (x, t) => bedroom(x, t, { wall: '#5a3a7a' }), 'gemini', 'wink', 'brought two. | still deciding.', { front: (x, t, lt, P) => { wear(x, P, 'gemini', 'bow', GOLD); dish(x, 'bag', 860, Y + 60, 0.8) } }),
    vScene(3.6, 4.6, [[0.2, 3.2, 'water. a snack. | it is Houston.']]),
    flop(2.6, (x, t) => daySky(x, t, { top: '#ff9a3a', bot: '#ffe08a' }), 'aries', 'wide', 'forgot water. | it was 80°.', { front: (x, t) => { heatSun(x, 860, 520, t, 70); sweat(x, 540, 1080, t) } }),
    vScene(3.6, 8.2, [[0.2, 3.2, 'phone: charged. | not 2%.']]),
    flop(2.6, (x, t) => bayou(x, t), 'pisces', 'heart', 'it died while | I watched the sunset', {}),
    vScene(3.6, 11.8, [[0.2, 3.2, 'reply to | the group chat.']]),
    flop(2.6, (x, t) => { room(x, { wall: '#1a1030', floor: '#120a20' }) }, 'scorpio', 'squint', 'seen. | (that counts.)', { front: (x, t, lt, P) => wear(x, P, 'scorpio', 'shades') }),
    vScene(4.0, 15.4, [[0.2, 3.6, "an opener: | 'where'd you go | to high school?'"]]),
    { dur: 5.4, set: desk, front: (x, t, lt) => { clipboard(x, 540, 640, 'LAST ITEM', [['you, as you are', 0.6]], lt, { w: 560 }); rpg(x, lt, 'VIRGO', "everything else is extra. | come as you are. | that's the whole list.", 1.0, 4.3, { y: 1050, col: MINT }) },
      cast: { virgo: [[0, 900, 1000, 150]] }, mood: { virgo: 'heart' }, hops: { virgo: [0.6, 1.0] }, stick: [[0.1, 0.9, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst436 · your ride to Jan 9 is a Sagittarius (the scenic route, with detours across town)
const SG = 'sagittarius'
const bridgeBats = (x, t, lt) => {   // the Waugh bridge at sunset: a bridge over the bayou and a stream of bats
  bayou(x, t); box(x, -20, 980, 1120, 60, '#8f96a0', 6); for (let k = 0; k < 6; k++) box(x, 60 + k * 190, 1040, 40, 180, '#6d7480', 5)
  for (let k = 0; k < 40; k++) { const ph = ((lt * 0.35 + k / 40) % 1), bx = 300 + k * 13 % 400 + ph * 600 - 200, by = 1000 - ph * 700 + Math.sin(k + lt * 6) * 30, w = Math.sin(lt * 18 + k) > 0 ? 14 : 6
    x.fillStyle = INK; x.fillRect(bx - w, by - 3, w * 2, 6); x.fillRect(bx - 3, by - 5, 6, 10) }
}
const raspa = (x, t) => { daySky(x, t, { top: '#4fb0ff', bot: '#fff0b0', city: true }); box(x, 300, 860, 480, 420, '#f4efe4', 8); x.fillStyle = '#ff5a8a'; for (let k = 0; k < 6; k++) x.fillRect(300 + k * 80, 800, 40, 70); box(x, 290, 800, 500, 70, '#ff5a8a', 6); txt(x, 'RASPAS', 540, 838, { size: 50, col: BONE }); box(x, 360, 1000, 360, 120, '#bfe6ff', 5)
  for (let k = 0; k < 3; k++) { const cx = 420 + k * 120; box(x, cx - 30, 1180, 60, 90, BONE, 4); x.fillStyle = ['#ff3a6a', '#3a8aff', '#ffd36b'][k]; x.beginPath(); x.arc(cx, 1180, 40, Math.PI, 0); x.fill() } }
const sideRoad = (x, t, { sunset = true } = {}) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, sunset ? '#4a2a7a' : '#0e0b24'); g.addColorStop(1, sunset ? '#ff8a5a' : '#2a1d52'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR - 290, t, { alpha: 0.8 }); freeway(x, FLOOR - 300, 440, 3, t * 600); x.fillStyle = '#1a1430'; x.fillRect(0, FLOOR + 140, 1080, 800) }
const drive = (dur, lines, extra = {}) => ({ dur, set: (x, t) => sideRoad(x, t, extra.road), front: (x, t, lt, P) => { car(x, 540, FLOOR - 40, '#ff7a3a', { open: true, s: 1.4 }); extra.front?.(x, t, lt, P) }, cast: { [SG]: [[0, 590, FLOOR - 180, 200]], ...(extra.cast || {}) }, mood: { [SG]: 'sparkle', ...(extra.mood || {}) }, lines, ...(extra.more || {}) })
const DET = [[-330, 200, 'YOU'], [-150, -100, 'BAYOU'], [120, 160, 'RASPAS'], [-60, 230, 'BELLAIRE'], [300, -160, 'JAN 9']]
export const hst436 = {
  hook: 'Your ride to Jan 9 | is a Sagittarius', badge: BADGE, cues: [...sting(740), ['whoosh', 0.3, 0.6, 0.02]], endLen: 6.2,
  end: ticket('The scenic route counts. Jan 9.', ['sagittarius', 'virgo', 'aries', 'gemini']),
  scenes: [
    drive(3.0, [[0.3, 2.4, SG, 'hop in! | quick detour first.']], { more: { hops: { [SG]: [0.02, 0.4, 0.8] } } }),
    { dur: 3.0, set: (x, t, lt) => { daySky(x, t, { top: '#8fd0ff', bot: '#e9f6ff', city: false, ground: '#cfe3c0' }); routeMap(x, 540, 980, DET, lt / 3.2, t, { k: Kp(lt, 0.02), title: 'ROUTE: SCENIC' }) }, cast: {}, stick: [[0.4, 2.3, 'ETA: a vibe', PINK]] },
    { dur: 3.6, set: (x, t, lt) => bridgeBats(x, t, lt), cast: { [SG]: [[0, 300, Y, 250]] }, mood: { [SG]: 'wide' }, look: { [SG]: [0.6, -0.8] }, lines: [[0.3, 1.4, SG, 'look! | the bats!'], [1.9, 1.5, SG, 'every sunset. | worth it.']] },
    { dur: 3.4, set: raspa, cast: { [SG]: [[0, 200, Y, 230]] }, mood: { [SG]: 'heart' }, lines: [[0.3, 2.8, SG, "it's 80°. | raspa break."]], hops: { [SG]: [0.3] } },
    { dur: 3.2, set: (x, t) => blvdNight(x, t, ['DUMPLINGS', 'CHAAT', 'BOBA', 'HOT POT']), cast: { [SG]: [[0, 540, Y, 250]] }, mood: { [SG]: 'sparkle' }, lines: [[0.3, 2.6, SG, 'one bite | on Bellaire. one.']] },
    drive(3.4, [[0.2, 1.4, SG, 'what if we | did Galveston?'], [1.8, 1.4, [300, 1250, 100], 'you: | NO.']], { road: { sunset: false } }),
    { dur: 3.2, set: (x, t) => sideRoad(x, t, { sunset: false }), front: (x, t, lt) => { car(x, 540, FLOOR - 40, '#ff7a3a', { open: true, s: 1.4 }); overheadSign(x, 540, 700, 'BETA PARTY', 'EXIT  JAN 9', Kp(lt, 0.05), { gold: true }); if (lt > 1.2) sparkles(x, t, 540, 800, t - lt + 1.2, 12, 340, 6) },
      cast: { [SG]: [[0, 590, FLOOR - 180, 200]] }, mood: { [SG]: 'wink' }, lines: [[1.0, 2.0, SG, 'right on time. | told you.']] },
    { dur: 4.8, set: (x, t, lt) => bridgeBats(x, t, lt + 4), front: (x, t, lt) => rpg(x, lt, 'SAGITTARIUS', 'getting there is | part of the party. | enjoy the ride.', 0.3, 4.3, { y: 1060, col: '#b08aff' }),
      cast: { [SG]: [[0, 540, 820, 250]] }, mood: { [SG]: 'heart' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst437 · the signs fight over the party playlist (each sign takes the aux; screwed sound)
const AUX = [
  ['aries', 'hype songs. | ONLY hype songs.', 'wide'], ['taurus', 'slow jams. | sit down, relax.', 'sleepy'], ['gemini', 'one song. | 40 tabs open.', 'wink'],
  ['cancer', "zydeco, like | grandma's porch.", 'heart'], ['leo', 'a voice memo | of me singing.', 'sparkle'], ['virgo', 'sorted by tempo. | color-coded.', 'squint'],
  ['libra', 'Tejano. | two-step with me?', 'heart'], ['scorpio', 'slowed... | way... down...', 'sleepy'], ['sagittarius', 'everything. | on shuffle.', 'sparkle'],
  ['capricorn', 'smooth jazz. | for focus.', 'squint'], ['aquarius', "a song you | haven't heard.", 'eyeroll'], ['pisces', 'sad songs. | happy crying.', 'heart'],
]
const club = (x, t, hue = 0) => { const cols = ['#1a2a5a', '#3a1a5a', '#1a4a4a', '#4a1a3a']; x.fillStyle = cols[hue % 4]; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR - 200, t, { alpha: 0.4 })
  for (let k = 0; k < 5; k++) { const a = Math.sin(t * 1.3 + k * 1.7) * 0.5; x.save(); x.translate(200 + k * 170, 300); x.rotate(a); x.fillStyle = [`rgba(255,143,177,0.16)`, `rgba(125,255,176,0.16)`, `rgba(242,199,92,0.16)`, `rgba(143,227,255,0.16)`, `rgba(201,166,255,0.16)`][k]; x.beginPath(); x.moveTo(0, 0); x.lineTo(-120, 1100); x.lineTo(120, 1100); x.fill(); x.restore() }
  for (let i = 0; i < 9; i++) for (let j = 0; j < 3; j++) { const on = Math.sin(t * 4 + i * 1.1 + j * 2.3) > 0.3; x.fillStyle = on ? ['#ff8fb1', '#7dffb0', '#ffd36b'][(i + j) % 3] : '#2a2240'; x.fillRect(i * 120, FLOOR + 60 + j * 70, 120, 70) }
  x.fillStyle = INK; x.fillRect(0, FLOOR + 54, 1080, 8) }
export const hst437 = {
  hook: 'The signs fight over | the party playlist', badge: BADGE, cues: [...sting(523.25), ['boom', 0.0, 0.2]], endLen: 6.2,
  end: ticket('The aux is yours. Jan 9.', ['libra', 'cancer', 'scorpio', 'aquarius']),
  scenes: [
    { dur: 2.8, set: (x, t) => club(x, t), front: (x, t, lt) => { dish(x, 'speaker', 540, 1100, 1.3, t); notes(x, t, 540, 900, { n: 6, cell: 7 }) }, cast: Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 90 + (i % 6) * 180, i < 6 ? 1000 : 1250, 140]]])), hops: waveHops(SIGN_IDS, 0.02, 0.05), mood: allMood('sparkle') },
    ...AUX.map(([id, line, mood], i) => ({
      dur: 2.6, title: `${id.toUpperCase()} HAS THE AUX`, set: (x, t) => club(x, t, i), front: (x, t, lt) => { dish(x, 'speaker', 840, 1150, 1.1, id === 'scorpio' ? t * 0.3 : t); notes(x, t * (id === 'scorpio' ? 0.3 : 1), 840, 960, { n: 4, cell: 6, col: [GOLD, PINK, MINT][i % 3] }) },
      cast: { [id]: [[0, 360, Y, 290]] }, mood: { [id]: mood }, hops: { [id]: id === 'scorpio' ? [0.2] : [0.1, 0.7, 1.3, 1.9] }, look: { [id]: [0.7, 0] },
      lines: [[0.2, 2.25, id, line]],
    })),
    { dur: 3.2, set: (x, t) => club(x, t, 1), front: (x, t, lt) => { dish(x, 'speaker', 540, 1100, 1.3, t); const k = Kp(lt, 0.1, 0.35); label(x, 540, 560, 'your party song?', k, { size: 56, bg: GOLD }); label(x, 540, 670, 'comment it', k, { size: 44, bg: PINK, rot: 0.03 }) },
      cast: Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 90 + (i % 6) * 180, i < 6 ? 1000 : 1250, 140]]])), hops: waveHops(SIGN_IDS, 0.1, 0.05), mood: allMood('heart') },
  ],
}

// ── hst438 · Pisces started crying about Jan 9 already (a countdown of happy tears; the Aunties step in)
const P_ = 'pisces'
const day = (n, set, line, extra = {}) => ({ dur: 3.2, set, front: (x, t, lt, P) => { dayCard(x, 860, 560, n, Kp(lt, 0.02), { col: '#7a6aff' }); extra.front?.(x, t, lt, P) }, cast: { [P_]: [[0, 420, Y, 280]], ...(extra.cast || {}) }, mood: { [P_]: 'heart', ...(extra.mood || {}) }, lines: [[0.3, 2.6, P_, line], ...(extra.lines || [])], ...(extra.more || {}) })
export const hst438 = {
  hook: 'Pisces started crying | about Jan 9 already', badge: BADGE, cues: [...sting(622.25), ['bell', 0.1, 1318.5, 0.012, 1.2, 0]], endLen: 6.2,
  end: ticket('Happy tears only. Jan 9.', ['pisces', 'cancer', 'taurus', 'libra']),
  scenes: [
    { dur: 3.0, set: (x, t) => bedroom(x, t, { wall: '#4a3a8a', floor: '#2a2a4a' }), front: (x, t, lt) => { inviteCard(x, 760, 1000, 0.75, t, 1); hearts(x, t, 420, 1100, 0, { n: 6, spread: 200 }) }, cast: { [P_]: [[0, 330, Y, 280]] }, mood: { [P_]: 'heart' }, hops: { [P_]: [0.02, 0.5, 1.0, 1.5] },
      lines: [[0.4, 2.4, P_, "I'm INVITED?"]] },
    day(4, (x, t) => bedroom(x, t, { wall: '#3a4a8a', floor: '#2a2a4a' }), 'a card for | every sign.', { front: (x, t, lt) => { for (let k = 0; k < 6; k++) box(x, 600 + (k % 3) * 120, 1150 + Math.floor(k / 3) * 100, 90, 70, [PINK, GOLD, MINT, SKYB, LAV, BONE][k], 4) } }),
    day(5, (x, t) => { bedroom(x, t, { wall: '#5a3a7a', floor: '#2a2a4a' }); mirror(x, 820, 1000, 260, 480, t) }, "the outfit. | it's so pretty.", { front: (x, t, lt, P) => wear(x, P, P_, 'flower', LAV) }),
    day(6, (x, t) => bedroom(x, t, { wall: '#3a2a5a', floor: '#2a2a4a' }), 'king cake season | started. sob.', { front: (x, t) => dish(x, 'kingcake', 760, 1240, 1.1, t) }),
    day(7, (x, t) => bayou(x, t), 'the bayou sunset. | I cannot.', {}),
    { dur: 3.6, set: (x, t) => room(x, { wall: '#6a4a3a', floor: '#3a2a1e' }), front: (x, t, lt, P) => { dayCard(x, 860, 560, 8, Kp(lt, 0.02), { col: '#7a6aff' }); wear(x, P, 'cancer', 'glasses'); wear(x, P, 'taurus', 'glasses') },
      cast: { [P_]: [[0, 540, Y, 250]], cancer: [[0, 220, Y, 230]], taurus: [[0, 860, Y, 230]] }, mood: { [P_]: 'heart', cancer: 'happy', taurus: 'wink' },
      lines: [[0.2, 1.5, 'cancer', 'drink some | water, baby.'], [1.9, 1.5, 'taurus', "it's a party, | not a goodbye."]] },
    { dur: 3.2, set: (x, t) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#1c1240'); g.addColorStop(1, '#5a2a7a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR + 60, t, { alpha: 0.9 }); outside(x, { ground: '#221b38' }) },
      front: (x, t, lt) => { dayCard(x, 860, 560, 9, Kp(lt, 0.02), { col: GOLD }); if (lt > 0.4) sparkles(x, t, 420, 1100, t - lt + 0.4, 12, 300, 4) }, cast: { [P_]: [[0, 420, Y, 290]] }, mood: { [P_]: 'sparkle' }, hops: { [P_]: [0.4, 0.9, 1.4] },
      lines: [[0.3, 2.6, P_, 'happy tears | only today.']] },
    { dur: 4.6, set: (x, t) => bayou(x, t), front: (x, t, lt) => rpg(x, lt, 'PISCES', 'big feelings are | welcome at parties. | bring yours.', 0.3, 4.1, { y: 1060, col: LAV }),
      cast: { [P_]: [[0, 540, 820, 260]] }, mood: { [P_]: 'heart' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst439 · Capricorn packed for ONE party (the bag gets heavier; Aquarius has notes)
const CP = 'capricorn'
const PACK = [['sweater', 'a sweater. | for the AC.'], ['fan', 'a mini fan. | for outside.'], ['umbrella', 'an umbrella. | just in case.'], ['chips', 'snacks. | for the feeder road.'], ['cooler', 'water. | it is Houston.'], ['tray', 'kolaches. | for the group.']]
const bed = (x, t) => { bedroom(x, t, { wall: '#2a3a5a', floor: '#3a2a2a' }); box(x, 120, 1180, 840, 150, '#c9a6ff', 8); box(x, 120, 1140, 200, 60, BONE, 6) }
const bag = (x, t, n, lt, shut = 0) => { x.save(); x.translate(640, 1120); const sq = shut > 0 ? 1 - 0.1 * Math.sin(Math.PI * clamp(shut)) : 1; x.scale(1.6, 1.6 * sq); dish(x, 'suitcase', 0, 0, 1, t); x.restore()
  if (shut < 1) for (let i = 0; i < n; i++) { const it = PACK[i][0], k = i === n - 1 ? Kp(lt, 0.3) : 1; if (k > 0) dish(x, it, 520 + (i % 3) * 120, 940 - Math.floor(i / 3) * 90, 0.45 * k, t) } }
export const hst439 = {
  hook: 'Capricorn packed | for ONE party', badge: BADGE, cues: [...sting(493.88), ['boom', 0.0, 0.2]], endLen: 6.2,
  end: ticket('Packed. Planned. Jan 9.', ['capricorn', 'aquarius', 'virgo', 'cancer']),
  scenes: [
    { dur: 2.8, set: bed, front: (x, t, lt) => { bag(x, t, 6, 9); clipboard(x, 880, 800, 'JAN 9', [['bag', 0.6]], lt, { w: 260, k: 0.8 }); streetSign(x, 300, 740, 'HOUSTON', { pole: false, k: 0.75 }) }, cast: { [CP]: [[0, 240, Y - 140, 240]] }, mood: { [CP]: 'squint' }, hops: { [CP]: [0.02, 0.5, 1.0, 1.5, 2.0] }, look: { [CP]: [0.8, 0] } },
    ...PACK.map(([it, line], i) => ({ dur: 2.7, set: bed, front: (x, t, lt) => bag(x, t, i + 1, lt), cast: { [CP]: [[0, 240, Y - 140, 240]] }, mood: { [CP]: 'squint' }, look: { [CP]: [0.8, 0] }, hops: { [CP]: [0.3] }, lines: [[0.3, 2.2, CP, line]] })),
    { dur: 3.4, set: bed, front: (x, t, lt) => bag(x, t, 6, 9), cast: { [CP]: [[0, 240, Y - 140, 240]], aquarius: [[0, 1300, Y, 240], [0.5, 880, Y, 240]] }, mood: { [CP]: 'wide', aquarius: 'eyeroll' },
      lines: [[0.6, 1.3, 'aquarius', "it's one | night."], [2.0, 1.3, CP, "it's a | plan."]] },
    { dur: 3.2, set: bed, front: (x, t, lt) => { bag(x, t, 6, 9, prog(lt, 0.3, 1.6)); if (lt > 1.6) sparkles(x, t, 640, 1100, t - lt + 1.6, 10, 260, 7) }, cast: { [CP]: [[0, 240, Y - 140, 240], [0.4, 600, 900, 220], [1.6, 240, Y - 140, 240]] }, mood: { [CP]: lt => lt > 1.6 ? 'sparkle' : 'squint' }, hops: { [CP]: [0.5, 0.8, 1.1, 1.4] },
      lines: [[1.7, 1.4, CP, 'it closed.']], stick: [[0.2, 1.4, 'SIT ON IT', GOLD]] },
    { dur: 4.8, set: bed, front: (x, t, lt) => { bag(x, t, 6, 9, 1); rpg(x, lt, 'CAPRICORN', 'plan the small stuff | so you can relax | when you get there.', 0.3, 4.3, { y: 1020, col: '#8fd0a0' }) },
      cast: { [CP]: [[0, 540, 780, 250]] }, mood: { [CP]: 'happy' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst440 · Taurus has a pre-party food plan (Bellaire, Hillcroft, a 60° pho, boba, "saving room")
const TA = 'taurus'
const stop = (n, set, food, line, extra = {}) => ({ dur: 3.0, set, front: (x, t, lt, P) => { label(x, 840, 560, `STOP ${n}`, Kp(lt, 0.05), { size: 50, bg: GOLD, rot: 0.04 }); dish(x, food, 760, 1220, 1.1, t); extra.front?.(x, t, lt, P) }, cast: { [TA]: [[0, 330, Y, 280]], ...(extra.cast || {}) }, mood: { [TA]: 'heart', ...(extra.mood || {}) }, hops: { [TA]: [0.1, 0.5] }, lines: [[0.3, 2.4, TA, line], ...(extra.lines || [])] })
const kitchen = (x, t) => { room(x, { wall: '#c86a3a', floor: '#5a3a2a' }); box(x, 600, 520, 380, 280, '#f4efe4', 8); txt(x, 'THE PLAN', 790, 560, { size: 38, col: INK }); ['1 · dumplings', '2 · chaat', '3 · pho', '4 · boba', '5 · the party'].forEach((s, i) => txt(x, s, 630, 610 + i * 40, { size: 28, col: INK, align: 'left', font: MONO, weight: 700 })); streetSign(x, 290, 720, 'BELLAIRE BLVD', { pole: false, k: 0.7 }) }
const FOOD_PINS = [[-320, 180, 'HOME'], [-140, 40, 'BELLAIRE'], [20, 170, 'HILLCROFT'], [160, -40, 'PHO'], [240, 200, 'BOBA'], [330, -170, 'JAN 9']]
export const hst440 = {
  hook: 'Taurus has a | pre-party food plan', badge: BADGE, cues: [...sting(554.37)], endLen: 6.2,
  end: ticket('Come hungry. Jan 9.', ['taurus', 'gemini', 'sagittarius', 'cancer']),
  scenes: [
    { dur: 3.0, set: kitchen, front: (x, t) => { dish(x, 'queso', 300, 1330, 0.9, t); taco(x, 780, 1320, 1.2) }, cast: { [TA]: [[0, 330, Y - 60, 280]] }, mood: { [TA]: 'sparkle' }, hops: { [TA]: [0.02, 0.4, 0.8, 1.2, 1.6, 2.0] }, lines: [[0.5, 2.3, TA, 'party at night. | snacks all day.']] },
    { dur: 3.0, set: (x, t, lt) => { daySky(x, t, { top: '#ffb07a', bot: '#ffe8b0', city: false, ground: '#e8d8b0' }); routeMap(x, 540, 980, FOOD_PINS, lt / 3.2, t, { k: Kp(lt, 0.02), title: 'THE FOOD PLAN' }) }, cast: {}, stick: [[0.4, 2.3, 'five stops. one stomach.', PINK]] },
    stop(1, (x, t) => blvdNight(x, t, ['DUMPLINGS', 'BOBA', 'NOODLES', 'KARAOKE']), 'dumplings', 'Bellaire. | the dumplings.'),
    stop(2, (x, t) => { daySky(x, t, { top: '#ff8a5a', bot: '#ffd08a', ground: '#7a5a3a' }); box(x, 560, 700, 440, 300, '#f2c75c', 8); txt(x, 'CHAAT · SWEETS', 780, 760, { size: 40, col: INK }) }, 'chaat', 'Hillcroft. | the chaat. hello.'),
    stop(3, (x, t) => { daySky(x, t, { top: '#8aa0c0', bot: '#d0dae8', ground: '#5a6a7a' }); thermo(x, 880, 900, '60°', 1, { hot: false }) }, 'pho', "pho. it's 60°. | basically winter.", { front: (x, t, lt, P) => wear(x, P, TA, 'scarf', '#c84a4a') }),
    stop(4, (x, t) => blvdNight(x, t, ['BOBA', 'TEA', 'BOBA', 'MORE BOBA']), 'boba', 'boba. | for the road.'),
    { dur: 3.4, set: (x, t) => outside(x, { ground: '#2a2638' }), front: (x, t, lt) => { skyline(x, FLOOR + 60, t, { alpha: 0.6 }); if (lt > 0.3) sparkles(x, t, 540, 900, t - lt + 0.3, 12, 360, 3) },
      cast: { [TA]: [[0, 380, Y, 270]], gemini: [[0, 760, Y, 240]] }, mood: { [TA]: 'happy', gemini: 'eyeroll' }, lines: [[0.2, 1.4, TA, 'saving room | for the party.'], [1.8, 1.4, 'gemini', 'you said that | at stop two.']] },
    { dur: 4.6, set: kitchen, front: (x, t, lt) => rpg(x, lt, 'TAURUS', "eat before you go. | a fed star | is a happy star.", 0.3, 4.1, { y: 1060, col: '#ffb07a' }),
      cast: { [TA]: [[0, 330, 860, 250]] }, mood: { [TA]: 'heart' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst441 · which shoes for Jan 9? the signs vote (boots, sneakers, heels, sandals; ends on a tie and a comment prompt)
export function shoe(x, kind, cx, cy, s = 1, col = '#8a4a2a') {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  if (kind === 'boots') { box(x, -40, -120, 70, 130, col, 6); box(x, -40, -10, 120, 44, col, 6); box(x, -46, 30, 20, 14, INK, 0); for (let k = 0; k < 3; k++) { x.fillStyle = GOLD; x.fillRect(-30 + k * 18, -90, 8, 50) } }
  else if (kind === 'sneakers') { box(x, -70, -30, 140, 50, BONE, 6); box(x, -70, 20, 150, 18, '#ff5a6e', 4); for (let k = 0; k < 3; k++) { x.fillStyle = INK; x.fillRect(-30 + k * 22, -22, 14, 6) } }
  else if (kind === 'heels') { x.fillStyle = INK; x.beginPath(); x.moveTo(-80, 20); x.lineTo(-40, -40); x.lineTo(70, 10); x.lineTo(70, 30); x.closePath(); x.fill(); x.fillStyle = col; x.beginPath(); x.moveTo(-72, 16); x.lineTo(-38, -32); x.lineTo(62, 12); x.lineTo(62, 22); x.closePath(); x.fill(); box(x, -78, 18, 14, 50, col, 4) }
  else if (kind === 'sandals') { box(x, -70, 10, 140, 20, '#c98e5a', 5); x.strokeStyle = INK; x.lineWidth = 10; x.beginPath(); x.moveTo(-30, 10); x.lineTo(0, -30); x.lineTo(30, 10); x.stroke(); x.strokeStyle = PINK; x.lineWidth = 5; x.stroke() }
  x.restore()
}
const SHOES = [['boots', 'BOOTS', '#b0703a', ['sagittarius', 'leo', 'aries'], "boots are out. | it's rodeo season."], ['sneakers', 'SNEAKERS', '#ff5a6e', ['virgo', 'capricorn', 'aquarius'], 'parking is | three blocks away.'],
  ['heels', 'HEELS', PINK, ['libra', 'scorpio', 'gemini'], 'Westheimer bumps? | I can handle it.'], ['sandals', 'SANDALS', '#c98e5a', ['taurus', 'pisces', 'cancer'], "it's 80°. | toes out."]]
const shoeWall = (x, t, lt, votes = [0, 0, 0, 0], hi = -1) => { room(x, { wall: '#2a4a5a', floor: '#3a2a3a' }); SHOES.forEach(([k, name, col], i) => { const cx = 150 + i * 260, cy = 820, on = i === hi; box(x, cx - 110, cy - 130, 220, 260, on ? GOLD : BONE, 7); shoe(x, k, cx, cy - 10, 0.9, col); txt(x, name, cx, cy + 95, { size: 32, col: INK }); for (let v = 0; v < votes[i]; v++) box(x, cx - 75 + v * 55, cy + 150, 40, 40, PINK, 4) }) }
export const hst441 = {
  hook: 'Jan 9 shoes: | the signs vote', badge: BADGE, cues: [...sting(783.99), ['tick', 4.0, 0.1], ['tick', 7.4, 0.1], ['tick', 10.8, 0.1], ['tick', 14.2, 0.1]], endLen: 6.2,
  end: ticket('Any shoes. Just come. Jan 9.', ['sagittarius', 'virgo', 'libra', 'taurus']),
  scenes: [
    { dur: 2.8, set: (x, t, lt) => { shoeWall(x, t, lt, [0, 0, 0, 0], Math.floor(t * 3) % 4); streetSign(x, 540, 590, 'WESTHEIMER', { pole: false, k: 0.8 }) }, cast: Object.fromEntries(SIGN_IDS.map((id, i) => [id, [[0, 90 + (i % 6) * 180, i < 6 ? 1180 : 1330, 130]]])), hops: waveHops(SIGN_IDS, 0.02, 0.06), mood: allMood('wide') },
    ...SHOES.map(([k, name, col, who, line], i) => ({ dur: 3.4, set: (x, t, lt) => shoeWall(x, t, lt, SHOES.map((_, j) => j < i ? 3 : j === i ? Math.min(3, Math.floor(lt / 0.5)) : 0), i),
      cast: Object.fromEntries(who.map((id, j) => [id, [[0, -200 + j * 60, Y, 220], [0.3 + j * 0.3, 260 + j * 280, Y, 220]]])), mood: Object.fromEntries(who.map(id => [id, id === 'pisces' ? 'heart' : 'sparkle'])),
      front: (x, t, lt, P) => { if (k === 'boots') wear(x, P, who[0], 'hat', '#b0703a'); if (k === 'sandals') wear(x, P, who[0], 'shades') }, lines: [[1.2, 2.0, who[0], line]], stick: [[0.2, 1.0, `TEAM ${name}`, col]] })),
    { dur: 3.4, set: (x, t, lt) => shoeWall(x, t, lt, [3, 3, 3, 3]), cast: { gemini: [[0, 540, Y, 280]] }, mood: { gemini: 'wink' }, lines: [[0.4, 2.6, 'gemini', 'a tie? | wear two.']], stick: [[0.1, 1.2, "IT'S A TIE", GOLD]], hops: { gemini: [0.4, 0.9] } },
    { dur: 3.6, set: (x, t, lt) => shoeWall(x, t, lt, [3, 3, 3, 3], Math.floor(t * 2) % 4), front: (x, t, lt) => { const k = Kp(lt, 0.1, 0.35); label(x, 540, 470, 'your pick for Jan 9?', k, { size: 56, bg: GOLD }); label(x, 540, 1260, 'boots · sneakers · heels · sandals', k, { size: 38, bg: PINK, rot: 0.02 }); label(x, 540, 1360, 'comment yours', k, { size: 44, bg: BONE, rot: -0.02 }) }, cast: {} },
  ],
}

// ── hst442 · a Heights Cancer leaves the Heights (nobody leaves the Heights; the comfort zone will be there later)
const CA = 'cancer'
const porch = (x, t) => { daySky(x, t, { top: '#7ab0ff', bot: '#ffe8c0', city: false, ground: '#6a9a4a' }); bungalow(x, 560, FLOOR + 60, t, { col: '#e8a0b0' }); x.fillStyle = '#3a6a2a'; x.beginPath(); x.arc(130, 820, 130, 0, Math.PI * 2); x.fill(); box(x, 115, 900, 30, 460, '#6b3b1f', 5) }
export const hst442 = {
  hook: 'A Heights Cancer | leaves the Heights', badge: BADGE, cues: [...sting(698.46)], endLen: 6.2,
  end: ticket('Leave the porch. Jan 9.', ['cancer', 'taurus', 'virgo', 'pisces']),
  scenes: [
    { dur: 3.0, set: porch, front: (x, t, lt) => streetSign(x, 760, 700, 'THE HEIGHTS', { pole: false, k: 0.9 }), cast: { [CA]: [[0, 330, Y - 20, 260]] }, mood: { [CA]: 'happy' }, hops: { [CA]: [0.02, 0.6, 1.2, 1.8] },
      lines: [[0.6, 2.2, CA, 'nobody leaves | the Heights.']] },
    { dur: 3.2, set: porch, front: (x, t, lt) => inviteCard(x, 760, 760, 0.7, t, Kp(lt, 0.1)), cast: { [CA]: [[0, 330, Y - 20, 260]] }, mood: { [CA]: lt => lt > 1.4 ? 'wide' : 'heart' },
      lines: [[0.3, 1.2, CA, 'a party! | yay!'], [1.6, 1.4, CA, 'that means... | leaving.']] },
    { dur: 3.4, set: porch, cast: { [CA]: [[0, 330, Y - 20, 260]] }, mood: { [CA]: 'heart' }, lines: [[0.2, 1.0, CA, 'bye, porch.'], [1.3, 0.9, CA, 'bye, dog.'], [2.3, 0.9, CA, 'bye, tree.']] },
    { dur: 3.2, set: (x, t) => { bedroom(x, t, { wall: '#8a5a6a', night: false }) }, front: (x, t, lt, P) => { wear(x, P, CA, 'scarf', '#8fe3ff'); dish(x, 'bag', 780, Y + 40, 1, t); for (let k = 0; k < 3; k++) if (lt > 0.5 + k * 0.6) dish(x, ['tray', 'chips', 'sweater'][k], 780 + (k - 1) * 90, Y - 90 - k * 10, 0.4, t) }, cast: { [CA]: [[0, 330, Y, 270]] }, mood: { [CA]: 'squint' },
      lines: [[0.3, 2.6, CA, 'snacks. a sweater. | snacks for the sweater.']] },
    { dur: 3.4, set: (x, t, lt) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#ff9a6a'); g.addColorStop(1, '#ffd8a0'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR - 290, t, { alpha: 0.8 }); freeway(x, FLOOR - 300, 440, 3, t * 500); overheadSign(x, 540, 640, 'NOW LEAVING', 'THE HEIGHTS', Kp(lt, 0.05)) },
      front: (x, t) => car(x, 540, FLOOR - 40, '#e8a0b0', { open: true, s: 1.4 }), cast: { [CA]: [[0, 470, FLOOR - 180, 190]], taurus: [[0, 650, FLOOR - 180, 190]] }, mood: { [CA]: 'wide', taurus: 'happy' },
      lines: [[0.4, 1.3, 'taurus', "it's ten | minutes."], [1.9, 1.3, CA, "it's a | journey."]] },
    { dur: 3.2, set: (x, t, lt) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#2a1d5a'); g.addColorStop(1, '#ff8a7a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR - 290, t, { alpha: 0.9 }); freeway(x, FLOOR - 300, 440, 3, t * 500); shield(x, 880, 620, '610', 0.85) },
      front: (x, t) => car(x, 540, FLOOR - 40, '#e8a0b0', { open: true, s: 1.4 }), cast: { [CA]: [[0, 470, FLOOR - 180, 190]], taurus: [[0, 650, FLOOR - 180, 190]] }, mood: { [CA]: 'sparkle', taurus: 'wink' },
      lines: [[0.4, 2.4, CA, 'the outside world. | it has lights!']] },
    { dur: 4.8, set: porch, front: (x, t, lt) => rpg(x, lt, 'CANCER', 'your comfort zone | will be right there | when you get back.', 0.3, 4.3, { y: 1060, col: '#8fe3ff' }),
      cast: { [CA]: [[0, 330, 860, 250]] }, mood: { [CA]: 'heart' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst443 · Aquarius is coming from the Woodlands (the bubble, the third loop, I-45; distance is a vibe check)
const AQ = 'aquarius'
const pines = (x, t) => { daySky(x, t, { top: '#6ac0e0', bot: '#e8f6e0', city: false, ground: '#4a7a3a' }); for (let k = 0; k < 9; k++) { const cx = 60 + k * 125, h = 380 + (k % 3) * 90; box(x, cx - 12, FLOOR + 60 - 120, 24, 120, '#6b3b1f', 4); for (let j = 0; j < 3; j++) { x.fillStyle = INK; x.beginPath(); x.moveTo(cx - 90 + j * 14, FLOOR - 60 - j * 110); x.lineTo(cx, FLOOR - 60 - j * 110 - h / 2.2); x.lineTo(cx + 90 - j * 14, FLOOR - 60 - j * 110); x.fill(); x.fillStyle = ['#2f6a3a', '#3a7a44', '#4a8a4a'][j]; x.beginPath(); x.moveTo(cx - 80 + j * 14, FLOOR - 66 - j * 110); x.lineTo(cx, FLOOR - 54 - j * 110 - h / 2.2); x.lineTo(cx + 80 - j * 14, FLOOR - 66 - j * 110); x.fill() } } }
const bigMap = (x, t, lt, route) => missionMap(x, t, lt, route)
function missionMap(x, t, lt, route) { x.fillStyle = '#0d1a2a'; x.fillRect(0, 0, 1080, 1920); box(x, 60, 640, 960, 640, '#0b2232', 8); x.save(); x.beginPath(); x.rect(60, 640, 960, 640); x.clip(); loopMap(x, 540, 960, 1.05, t, { dots: [[560, 690, '#7dffb0', 'WOODLANDS'], [560, 960, GOLD, 'INSIDE THE LOOP']], route }); x.restore() }
export const hst443 = {
  hook: 'Aquarius is coming | from the Woodlands', badge: BADGE, cues: [...sting(830.61), ['whoosh', 0.2, 0.6, 0.02]], endLen: 6.2,
  end: ticket('Worth the drive. Jan 9.', ['aquarius', 'gemini', 'capricorn', 'libra']),
  scenes: [
    { dur: 3.0, set: pines, front: (x, t, lt) => streetSign(x, 760, 760, 'THE WOODLANDS', { pole: false, k: 0.8 }), cast: { [AQ]: [[0, 330, Y, 280]] }, mood: { [AQ]: 'sparkle' }, hops: { [AQ]: [0.02, 0.6, 1.2, 1.8] },
      front2: null, lines: [[0.8, 2.0, AQ, 'technically | not Houston.']] },
    { dur: 3.4, set: (x, t, lt) => missionMap(x, t, lt, [[560, 690], [560, 960]]), cast: { [AQ]: [[0, 540, 1350, 170]] }, mood: { [AQ]: 'squint' }, stick: [[0.2, 1.4, 'DISTANCE: A LOT', PINK]],
      lines: [[1.4, 1.8, AQ, 'party math. | hmm.']] },
    { dur: 3.4, set: (x, t, lt) => missionMap(x, t, lt, [[560, 690], [180, 960]]), cast: { [AQ]: [[0, 540, 1350, 170]] }, mood: { [AQ]: 'wide' }, lines: [[0.3, 2.8, AQ, 'option one: | the Grand Parkway.']], stick: [[0.2, 1.4, 'THE THIRD LOOP', GOLD]] },
    { dur: 3.2, set: (x, t) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#3a2a7a'); g.addColorStop(1, '#ff9a6a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR - 290, t, { alpha: 0.8 }); freeway(x, FLOOR - 300, 440, 4, t * 700); shield(x, 880, 620, '45', 0.85) },
      front: (x, t) => car(x, 540, FLOOR - 40, '#5ec8ff', { open: true, s: 1.4 }), cast: { [AQ]: [[0, 590, FLOOR - 180, 200]] }, mood: { [AQ]: 'happy' }, lines: [[0.3, 2.5, AQ, 'option two: | I-45, all the way.']] },
    { dur: 3.0, set: (x, t) => { daySky(x, t, { city: false }); mural(x, t); outside(x, { ground: '#3a2a4a' }) }, cast: { [AQ]: [[0, 540, Y, 260]] }, mood: { [AQ]: 'wink' }, front: (x, t, lt, P) => wear(x, P, AQ, 'headphones', MINT), lines: [[0.3, 2.4, AQ, 'option three: | move inside the Loop.']], stick: [[1.3, 1.5, 'jk', BONE]] },
    { dur: 3.4, set: (x, t) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#0e0b24'); g.addColorStop(1, '#2a1d52'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR - 290, t, { alpha: 0.9 }); freeway(x, FLOOR - 300, 440, 4, t * 300) },
      front: (x, t, lt) => { car(x, 540, FLOOR - 40, '#5ec8ff', { open: true, s: 1.4 }); overheadSign(x, 540, 640, 'BETA PARTY', 'EXIT  JAN 9', Kp(lt, 0.1), { gold: true }); if (lt > 1.0) sparkles(x, t, 540, 760, t - lt + 1.0, 12, 340, 2) },
      cast: { [AQ]: [[0, 590, FLOOR - 180, 200]] }, mood: { [AQ]: 'sparkle' }, lines: [[1.0, 2.0, AQ, 'made it. | road trip vibes.']] },
    { dur: 4.8, set: pines, front: (x, t, lt) => rpg(x, lt, 'AQUARIUS', 'far is just a feeling. | show up anyway. | your people will be there.', 0.3, 4.3, { y: 1060, col: MINT }),
      cast: { [AQ]: [[0, 540, 820, 250]] }, mood: { [AQ]: 'heart' }, stick: [[0.1, 1.5, '★ LESSON UNLOCKED', GOLD]] },
  ],
}

// ── hst444 · Gemini RSVP'd twice. Now: two outfits (the twins argue; you pick; Gemini picks both)
const GE = 'gemini'
const twinRoom = (x, t) => { bedroom(x, t, { wall: '#5a4a1a', floor: '#3a2a1a' }); closet(x, 540, 760, 760, 560, 1, '#8a6a3a'); rack(x, 540, 540, ['#ffd36b', '#7dbf5a', '#ffd36b', '#7dbf5a'], t, { w: 600 }) }
const TW = { gl: [[0, 330, Y, 260]], gr: [[0, 750, Y, 260]] }
const twins = (moodL, moodR, extra = {}) => ({ set: twinRoom, back: (x, t, lt) => { signChar(x, t, GE, 750, Y, 260, { mood: typeof moodR === 'function' ? moodR(lt) : moodR, seed: 11, look: [-0.7, 0], hops: extra.hopsR?.map(h => t - lt + h).filter(h => h <= t) }); extra.wearR?.forEach(([it, c]) => wearAt(x, 750, Y, 260, it, c)) },
  front: (x, t, lt, P) => { extra.wearL?.forEach(([it, c]) => wear(x, P, GE, it, c)); extra.front?.(x, t, lt, P) }, cast: { [GE]: TW.gl }, mood: { [GE]: moodL }, look: { [GE]: [0.7, 0] } })
export const hst444 = {
  hook: "Gemini RSVP'd twice. | Now: two outfits.", badge: BADGE, cues: [...sting(932.33)], endLen: 6.2,
  end: ticket('Twice the fun. Jan 9.', ['gemini', 'libra', 'leo', 'sagittarius']),
  scenes: [
    { dur: 3.0, ...twins('wink', 'wink', { hopsR: [0.3, 0.9, 1.5, 2.1], front: (x, t, lt) => pennant(x, 100, 600, 'BAYOU CITY', t) || phone(x, 540, 1000, lt + 2, [[0, 'R', 'RSVP: yes!'], [0.6, 'R', 'RSVP: yes!']], { w: 380, h: 420, head: 'Jan 9', max: 2, k: 0.9 }) }), hops: { [GE]: [0.02, 0.6, 1.2, 1.8] } },
    { dur: 3.2, ...twins('sparkle', 'eyeroll', { wearL: [['bow', GOLD]], wearR: [], front: (x, t, lt, P) => { const [cx] = P.at(GE); dish(x, 'sweater', 330, 760, 0.01) } }), lines: [[0.3, 2.6, GE, 'the gold one. | obviously.']] },
    { dur: 3.2, ...twins('eyeroll', 'sparkle', { wearL: [['bow', GOLD]], wearR: [['scarf', '#7dbf5a']] }), lines: [[0.3, 2.6, [750, Y, 260], 'the green one. | obviously.']] },
    { dur: 3.0, ...twins('wide', 'wide', { wearL: [['bow', GOLD]], wearR: [['scarf', '#7dbf5a']] }), lines: [[0.2, 1.2, GE, 'gold!'], [0.9, 1.2, [750, Y, 260], 'green!'], [1.6, 1.2, GE, 'GOLD!']] },
    { dur: 4.4, ...twins('happy', 'happy', { wearL: [['bow', GOLD]], wearR: [['scarf', '#7dbf5a']], front: (x, t, lt) => rpg(x, lt, 'GEMINI × 2', 'ok YOU pick. | left or right? | comment it.', 0.3, 3.9, { y: 560, col: '#ffd36b' }) }) },
    { dur: 3.4, ...twins('sparkle', 'sparkle', { hopsR: [0.4, 1.0], wearL: [['bow', GOLD], ['scarf', '#7dbf5a']], wearR: [['bow', GOLD], ['scarf', '#7dbf5a']], front: (x, t, lt) => { if (lt > 0.4) sparkles(x, t, 540, 1100, t - lt + 0.4, 12, 360, 5) } }), lines: [[0.4, 2.6, GE, 'both. | changing in the car.']], hops: { [GE]: [0.4, 1.0] } },
    { dur: 3.4, set: (x, t) => { const g = x.createLinearGradient(0, 0, 0, FLOOR); g.addColorStop(0, '#1c1240'); g.addColorStop(1, '#5a2a7a'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920); skyline(x, FLOOR + 60, t, { alpha: 0.9 }); outside(x, { ground: '#221b38' }) },
      front: (x, t, lt, P) => { overheadSign(x, 540, 640, 'BETA PARTY', 'JAN 9', Kp(lt, 0.05), { gold: true }); if (P.at(GE)[2] > 0) wear(x, P, GE, lt < 1.6 ? 'bow' : 'scarf', lt < 1.6 ? GOLD : '#7dbf5a'); wear(x, P, 'libra', 'flower', PINK) },
      cast: { [GE]: [[0, -200, Y, 240], [0.4, 300, Y, 240], [1.1, 300, Y, 240], [1.5, 1300, Y, 240], [1.55, 1300, Y, 0], [1.6, -200, Y, 0], [1.62, -200, Y, 240], [2.0, 300, Y, 240]], libra: [[0, 760, Y, 240]] }, mood: { [GE]: 'wink', libra: lt => lt > 2.0 ? 'wide' : 'happy' },
      lines: [[0.4, 0.8, GE, 'hi!'], [2.1, 1.1, 'libra', 'wait. | again?']] },
  ],
}
