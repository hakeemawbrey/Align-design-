// Houston Star Talk, worker w18 (party prep): hst435–hst444. Helpers in w18.js.
import { Y, BADGE, Kp, fadeK, sting, ticket, waveHops, title, daySky, bayou, bedroom, rack, mirror, phone, clipboard, thermo, rpg, wear, wearAt, dish, partyTable,
  carBack, routeMap, photoFrame, flash, dayCard, nameTag, closet, stamp, signChar, sparkles, pop01, label, txt, box, outside, room, FLOOR, clamp, prog, ease,
  GOLD, BONE, PINK, INK, MINT, SKYB, LAV, MONO, SERIF } from './w18.js'
import { skyline, freeway, car, heatSun, sweat, shield, streetSign, overheadSign, taco, kolache, klobasnek, puffer, mural, houses, cones, coffeeShop, slab, BRAKE } from './kit.js'
import { bungalow, blvdNight, forecastCard } from './w18a.js'
import { SIGN_IDS } from '../signs3kit.js'

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
