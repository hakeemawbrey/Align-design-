// Houston Star Talk · w19 weather skits (hst465–hst476). Houston weather as short stories (two seasons, the one cold
// day, humidity, oak pollen, mosquitoes, love bugs, arctic AC), each with a twist, a ★ LESSON UNLOCKED beat and the
// Jan 9 party ticket. No disasters. Props: w19.js and kit.js. Engine: starrace/ep.js.
import {
  FLOOR, box, txt, label, sparkles, GOLD, BONE, PINK, INK, MONO, SERIF, SKYB, MINT, skyline, car, heatSun, BRAKE, HGREEN,
  clamp, prog, ease, Y, Kp, PAL, sky, ground, dash, dashFront, chat, parkingLot, tree, pollen, wavy, mosquitoes, loveBugs, thermo, forecastPhone, office, patio, bayou, pollenCar,
  glasses, layers, shades, bowl, sunShade, lesson, bigText, stamp, skit,
} from './w19.js'
import { houses } from './kit.js'
import { room } from '../starrace/ep.js'
import { notes, hearts } from '../signs3kit.js'

const hop2 = ids => Object.fromEntries(ids.map((id, i) => [id, [0.05 + i * 0.12, 0.6 + i * 0.12]]))
const city = (x, t, p) => { sky(x, p); skyline(x, FLOOR + 60, t, { col: p.city }); ground(x, p) }
const lessonScene = (dur, pal, text, cast, mood, extra) => ({ dur, set: (x, t, lt) => { city(x, t, pal); extra?.(x, t, lt) }, front: (x, t, lt) => lesson(x, t, lt, text), cast, mood, hops: hop2(Object.keys(cast)) })
const two = (a, b, s = 240) => ({ [a]: [[0, 360, Y, s]], [b]: [[0, 720, Y, s]] })
const enter = (id, from = 1250, to = 720, s = 240, at = 0.6) => ({ [id]: [[0, from, Y, s], [at, to, Y, s]] })
const home = (x, t, wall = '#3a2a5a') => { room(x, { wall, floor: '#5a3a2a' }); box(x, 700, 420, 280, 340, '#bfe6ff', 10); x.save(); x.beginPath(); x.rect(700, 420, 280, 340); x.clip(); x.translate(700, 420); x.scale(0.26, 0.26); skyline(x, 1300, t, { col: '#3a4f7a', alpha: 1 }); x.restore(); x.fillStyle = INK; x.fillRect(836, 420, 8, 340); x.fillRect(700, 586, 280, 8) }

// weather-only props
function win(x, t, l = 700, tp = 760, w = 280, h = 340) { box(x, l, tp, w, h, '#bfe6ff', 10); x.save(); x.beginPath(); x.rect(l, tp, w, h); x.clip(); x.translate(l, tp); x.scale(w / 1080, w / 1080); skyline(x, h * 1080 / w, t, { col: '#3a4f7a', alpha: 1 }); x.restore(); x.fillStyle = INK; x.fillRect(l + w / 2 - 4, tp, 8, h); x.fillRect(l, tp + h / 2 - 4, w, 8) }
function drizzle(x, t, a = 0.7) { for (let k = 0; k < 80; k++) { const px = (k * 131) % 1080, py = ((k * 97) + t * 900) % 1600 + 200; x.fillStyle = `rgba(160,200,255,${a})`; x.fillRect(px, py, 4, 26) } }
function umbrella(x, P, id, col = '#ff8fb1') { const [cx, cy, s] = P.at(id); const top = cy - s * 0.95; x.fillStyle = INK; x.beginPath(); x.arc(cx, top + 8, s * 0.62, Math.PI, 0); x.fill(); x.fillStyle = col; x.beginPath(); x.arc(cx, top, s * 0.58, Math.PI, 0); x.fill(); box(x, cx - 4, top, 8, s * 0.5, '#8f96a0', 3) }
function coat(x, cx, cy, k = 1, col = '#e05a3a') { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); box(x, -10, -200, 20, 30, '#8f96a0', 3); box(x, -110, -170, 220, 300, col, 7); for (let q = 0; q < 4; q++) { x.fillStyle = 'rgba(0,0,0,0.18)'; x.fillRect(-110, -110 + q * 62, 220, 8) } box(x, -150, -160, 40, 220, col, 6); box(x, 110, -160, 40, 220, col, 6); x.restore() }
function mitts(x, cx, cy) { for (const d of [-90, 90]) { box(x, cx + d - 40, cy - 50, 80, 100, '#ff9a3c', 6); box(x, cx + d - 40, cy + 40, 80, 24, BONE, 4) } }
function clipboard(x, P, id, k = 1) { const [cx, cy, s] = P.at(id); box(x, cx + s * 0.35, cy - s * 0.1, s * 0.4, s * 0.52, '#c98e4a', 5); box(x, cx + s * 0.39, cy - s * 0.04, s * 0.32, s * 0.42, BONE, 0); for (let q = 0; q < 4; q++) { x.fillStyle = INK; x.fillRect(cx + s * 0.42, cy + q * s * 0.08, s * 0.24 * (q < Math.ceil(4 * k) ? 1 : 0.2), 4) } }
function bag(x, cx, cy, k = 1, items = 0) { if (k <= 0) return; x.save(); x.translate(cx, cy); x.scale(k, k); const C = ['#ffd36b', '#e05a3a', '#5ec8ff', '#7dbf5a', '#c9a6ff', '#ff8fb1']; for (let q = 0; q < items; q++) box(x, -150 + q * 52, -150 - (q % 2) * 40, 46, 110, C[q % 6], 4); box(x, -180, -90, 360, 220, '#6b3b1f', 8); box(x, -60, -130, 120, 30, '#4a2a14', 5); x.restore() }
function frost(x, P, id) { const [cx, cy, s] = P.at(id); for (const d of [-1, 1]) { x.fillStyle = '#e8f6ff'; x.beginPath(); x.moveTo(cx + d * s * 0.2 - 8, cy + s * 0.02); x.lineTo(cx + d * s * 0.2 + 8, cy + s * 0.02); x.lineTo(cx + d * s * 0.2, cy + s * 0.26); x.fill() } }
function thermostat(x, cx, cy, deg, col = '#5ec8ff') { box(x, cx - 90, cy - 110, 180, 220, '#e8eef6', 7); x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, 70, 0, Math.PI * 2); x.fill(); txt(x, deg, cx, cy, { size: 52, col, font: MONO, weight: 700 }) }
function flash(x, lt, at) { const d = lt - at; if (d > 0 && d < 0.3) { x.fillStyle = `rgba(255,255,255,${(0.3 * (1 - d / 0.3)).toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) } }
function camera(x, P, id) { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.4, cy - s * 0.15, s * 0.5, s * 0.34, INK, 4); x.fillStyle = '#8fe3ff'; x.beginPath(); x.arc(cx - s * 0.15, cy + s * 0.02, s * 0.1, 0, Math.PI * 2); x.fill() }
function blanket(x, P, id, col = '#ff8fb1') { const [cx, cy, s] = P.at(id); box(x, cx - s * 0.48, cy - s * 0.05, s * 0.96, s * 0.5, col, 6); for (let q = 0; q < 4; q++) { x.fillStyle = 'rgba(255,255,255,0.35)'; x.fillRect(cx - s * 0.44 + q * s * 0.24, cy + s * 0.02, s * 0.1, s * 0.1) } }
function phoStand(x, cx, base) { box(x, cx - 220, base - 300, 440, 300, '#c0304a', 8); box(x, cx - 240, base - 360, 480, 70, '#f2c75c', 6); txt(x, 'NOODLE SOUP', cx, base - 325, { size: 40, col: INK }); box(x, cx - 160, base - 230, 320, 140, '#ffe9a8', 5) }

// ── hst465 · POV: your date said 'dress warm' (Libra, the 55° morning, 81° by 3pm)
const dressWarm = skit({
  hook: "POV: your date | said 'dress warm'", close: 'Bring layers. Jan 9.', endStars: ['libra', 'taurus', 'cancer', 'pisces'],
  scenes: [
    { dur: 3.4, set: (x, t) => city(x, t, PAL.grey), front: (x, t, lt) => forecastPhone(x, 760, 860, [['8AM', 'cold', '55°'], ['NOON', 'cloud', '64°'], ['3PM', 'sun', '81°']], lt, { k: Kp(lt, 0.02) * 0.85 }),
      cast: { libra: [[0, 300, Y, 250]] }, mood: { libra: 'wide' }, hops: { libra: [0.05, 0.5, 1.0] }, lines: [[0.4, 2.8, 'libra', 'you saw | 55° too?']] },
    { dur: 3.2, set: (x, t) => home(x, t), front: (x, t, lt, P) => layers(x, P, 'libra', 1), cast: { libra: [[0, 400, Y, 260]] }, mood: { libra: 'happy' }, lines: [[0.3, 2.6, 'libra', 'layer one.']] },
    { dur: 3.4, set: (x, t) => home(x, t), front: (x, t, lt, P) => layers(x, P, 'libra', 1 + Math.floor(clamp(lt / 2) * 3)), cast: { libra: [[0, 400, Y, 260]] }, mood: { libra: 'sparkle' }, hops: { libra: [0.6, 1.3, 2.0] },
      lines: [[0.3, 2.8, 'libra', 'scarf. beanie. | gloves.']], stick: [[0.2, 3.0, 'COLD FRONT MODE', SKYB]] },
    { dur: 3.6, set: (x, t) => bayou(x, t, PAL.grey), front: (x, t, lt, P) => layers(x, P, 'libra', 4), cast: { libra: [[0, 330, Y + 150, 240]], ...enter('taurus', 1250, 760, 240) }, mood: { libra: 'wide', taurus: 'happy' },
      lines: [[0.8, 1.4, 'libra', 'you wore | SHORTS?'], [2.3, 1.2, 'taurus', "it's | Houston."]] },
    { dur: 3.6, set: (x, t) => { bayou(x, t, PAL.noon); heatSun(x, 860, 420, t, 80); wavy(x, t, 900, 500) }, front: (x, t, lt, P) => { layers(x, P, 'libra', Math.max(1, 4 - Math.floor(lt))); stamp(x, '3:00 PM · 81°', BRAKE) },
      cast: { libra: [[0, 330, Y + 150, 240]], taurus: [[0, 760, Y + 150, 240]] }, mood: { libra: 'squint', taurus: 'wink' }, lines: [[0.3, 2.9, 'libra', 'taking off | layer three...']] },
    { dur: 3.8, set: (x, t) => { bayou(x, t, PAL.noon); heatSun(x, 860, 420, t, 80) }, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('taurus'); for (let q = 0; q < 3; q++) box(x, cx - 120, cy + 40 - q * 34, 240, 30, ['#e05a3a', '#2b5fb0', '#f2c75c'][q], 4) },
      cast: { libra: [[0, 330, Y + 150, 240]], taurus: [[0, 760, Y + 150, 240]] }, mood: { libra: 'heart', taurus: 'happy' },
      lines: [[0.3, 1.5, 'taurus', "I'll carry | them."], [2.1, 1.4, 'libra', 'oh. | OH.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    lessonScene(3.6, PAL.noon, 'dress in layers. | date a coat-holder.', two('libra', 'taurus'), { libra: 'heart', taurus: 'heart' }),
  ],
})

// ── hst466 · Step outside. Your glasses: gone. (Virgo in the humidity)
const fogged = skit({
  hook: 'Step outside. | Your glasses: gone.', close: 'See you clearly. Jan 9.', endStars: ['virgo', 'aquarius', 'gemini', 'leo'],
  scenes: [
    { dur: 3.2, set: (x, t) => { office(x, t, { snow: 0.3 }); win(x, t, 720, 820, 300, 360) }, front: (x, t, lt, P) => glasses(x, P, 'virgo', 0), cast: { virgo: [[0, 540, Y, 270]] }, mood: { virgo: 'happy' }, hops: { virgo: [0.05, 0.5] },
      lines: [[0.3, 2.6, 'virgo', 'cool inside. | heading out.']] },
    { dur: 3.4, set: (x, t) => { city(x, t, PAL.haze); wavy(x, t, 700, 700, 0.25) }, front: (x, t, lt, P) => glasses(x, P, 'virgo', clamp(lt / 0.6)), cast: { virgo: [[0, 540, Y, 270]] }, mood: { virgo: 'wide' },
      lines: [[0.8, 2.4, 'virgo', "I can't | see. at all."]], stick: [[0.1, 3.0, 'HUMIDITY', SKYB]] },
    { dur: 3.6, set: (x, t) => { patio(x, t, PAL.haze); wavy(x, t, 700, 700, 0.2) }, front: (x, t, lt, P) => glasses(x, P, 'virgo', 1), cast: { virgo: [[0, 250, Y, 250], [1.0, 560, Y, 250]], aquarius: [[0, 820, Y, 240]] }, mood: { virgo: 'heart', aquarius: 'wide' },
      lines: [[1.0, 1.3, 'virgo', 'there | you are!'], [2.4, 1.1, 'aquarius', 'hi...?']] },
    { dur: 3.6, set: (x, t) => patio(x, t, PAL.haze), front: (x, t, lt, P) => glasses(x, P, 'virgo', 1 - clamp(lt / 1.2)), cast: { virgo: [[0, 560, Y, 250]], aquarius: [[0, 820, Y, 240]] }, mood: { virgo: lt => lt > 1.2 ? 'wide' : 'heart', aquarius: 'happy' },
      lines: [[1.2, 1.2, 'virgo', 'you are not | my date.'], [2.5, 1.0, 'aquarius', 'nope!']] },
    { dur: 3.6, set: (x, t) => patio(x, t, PAL.dusk), front: (x, t, lt, P) => glasses(x, P, 'virgo', 0), cast: { virgo: [[0, 400, Y, 250]], aquarius: [[0, 720, Y, 240]], gemini: [[0, 1250, Y - 200, 200], [0.6, 900, Y - 200, 200]] }, mood: { virgo: 'wide', aquarius: 'sparkle', gemini: 'happy' },
      lines: [[0.7, 1.2, 'gemini', 'over here!'], [2.1, 1.4, 'aquarius', 'can I | join you two?']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.6, set: (x, t) => patio(x, t, PAL.dusk), front: (x, t, lt, P) => glasses(x, P, 'virgo', 0), cast: { virgo: [[0, 300, Y, 230]], gemini: [[0, 560, Y, 230]], aquarius: [[0, 820, Y, 230]] }, mood: { virgo: 'heart', gemini: 'happy', aquarius: 'heart' }, hops: hop2(['virgo', 'gemini', 'aquarius']),
      lines: [[0.3, 2.8, 'virgo', 'humidity: | 1. friends: 2.']], stick: [[0.2, 3.0, 'NEW FRIEND UNLOCKED', GOLD]] },
    lessonScene(3.6, PAL.dusk, 'let the day | surprise you.', two('virgo', 'aquarius'), { virgo: 'heart', aquarius: 'heart' }),
  ],
})
fogged.scenes[6].front = (x, t, lt, P) => { lesson(x, t, lt, 'let the day | surprise you.'); glasses(x, P, 'virgo', 0) }

// ── hst467 · Oak pollen season. Taurus has a plan.
const lot = (x, t, p, a = 1) => { parkingLot(x, t, p, { trees: [] }); tree(x, 180, 1200, { pollen: a, s: 0.9 }); tree(x, 920, 1200, { pollen: a, s: 0.9 }); pollen(x, t, 0.8 * a) }
const pollenNote = skit({
  hook: 'Oak pollen season. | Taurus has a plan.', close: 'Say it plainly. Jan 9.', endStars: ['taurus', 'cancer', 'virgo', 'gemini'],
  scenes: [
    { dur: 3.4, set: (x, t) => lot(x, t, PAL.lime), front: (x, t) => pollenCar(x, 640, 1560, '', 0, { col: '#c98e4a', s: 1.6 }), cast: { taurus: [[0, 300, Y + 60, 240]] }, mood: { taurus: 'wide' }, hops: { taurus: [0.05, 0.6] },
      lines: [[0.3, 2.8, 'taurus', 'your car | is yellow too?']] },
    { dur: 3.2, set: (x, t) => lot(x, t, PAL.lime, 1.4), front: (x, t) => pollenCar(x, 640, 1560, '', 0, { col: '#c98e4a', s: 1.6 }), cast: { taurus: [[0, 300, Y + 60, 240]] }, mood: { taurus: lt => lt > 1.2 ? 'squint' : 'wide' }, hops: { taurus: [1.2] },
      lines: [[0.3, 0.9, 'taurus', 'ah...'], [1.3, 1.6, 'taurus', 'ACHOO.']] },
    { dur: 3.6, set: (x, t) => lot(x, t, PAL.lime), front: (x, t, lt) => pollenCar(x, 640, 1560, 'JAN 9?', clamp((lt - 0.6) / 1.8), { col: '#c98e4a', s: 1.6 }), cast: { taurus: [[0, 300, Y + 60, 240]] }, mood: { taurus: 'sparkle' },
      lines: [[0.3, 2.8, 'taurus', 'a message | for my crush.']] },
    { dur: 3.6, set: (x, t) => lot(x, t, PAL.gold), front: (x, t) => pollenCar(x, 640, 1560, 'JAN 9?', 1, { col: '#c98e4a', s: 1.6 }), cast: { cancer: [[0, -200, Y + 60, 240], [1.0, 300, Y + 60, 240]] }, mood: { cancer: lt => lt > 1.4 ? 'heart' : 'happy' },
      lines: [[1.2, 2.2, 'cancer', 'is this... | for me?']], stick: [[0.1, 1.0, 'NEXT MORNING', BONE]] },
    { dur: 3.8, set: (x, t) => lot(x, t, PAL.gold), front: (x, t, lt) => { pollenCar(x, 330, 1600, 'JAN 9?', 1, { col: '#c98e4a', s: 1.15 }); pollenCar(x, 780, 1600, 'YES', clamp((lt - 0.5) / 1.2), { col: '#5ec8ff', s: 1.15 }) },
      cast: { cancer: [[0, 780, Y - 40, 230]], taurus: [[0, 330, Y - 40, 230]] }, mood: { cancer: 'heart', taurus: lt => lt > 1.8 ? 'heart' : 'wide' },
      lines: [[1.9, 1.6, 'taurus', 'on YOUR car?!']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.4, set: (x, t) => lot(x, t, PAL.dusk), front: (x, t) => { pollenCar(x, 330, 1600, 'JAN 9?', 1, { col: '#c98e4a', s: 1.15 }); pollenCar(x, 780, 1600, 'YES', 1, { col: '#5ec8ff', s: 1.15 }) },
      cast: { cancer: [[0, 780, Y - 40, 230]], taurus: [[0, 330, Y - 40, 230]] }, mood: { cancer: 'happy', taurus: 'happy' }, lines: [[0.3, 2.8, 'cancer', 'never washing | these cars.']] },
    lessonScene(3.6, PAL.dusk, 'say it plainly. | even in pollen.', two('taurus', 'cancer'), { taurus: 'heart', cancer: 'heart' }, (x, t) => pollen(x, t, 0.5)),
  ],
})

// ── hst468 · Office AC: Antarctica mode (Cancer, Pisces's frozen tears, Capricorn at the thermostat)
const arctic = skit({
  hook: 'Office AC: | Antarctica mode.', close: 'Bring a sweater. Jan 9.', endStars: ['pisces', 'cancer', 'capricorn', 'sagittarius'],
  scenes: [
    { dur: 3.4, set: (x, t) => { office(x, t); win(x, t, 740, 820, 280, 340) }, front: (x, t, lt, P) => layers(x, P, 'cancer', 2, ['#ff8fb1', '#c9a6ff']), cast: { cancer: [[0, 400, Y, 270]] }, mood: { cancer: 'wink' }, hops: { cancer: [0.05, 0.5] },
      lines: [[0.3, 2.8, 'cancer', 'you brought | a sweater too?']] },
    { dur: 3.4, set: (x, t) => office(x, t), front: (x, t, lt, P) => frost(x, P, 'pisces'), cast: { pisces: [[0, 540, Y, 270]] }, mood: { pisces: 'wide' },
      lines: [[0.3, 2.8, 'pisces', 'my tears | are FROZEN.']], stick: [[0.2, 3.0, 'OUTSIDE: 90° · INSIDE: THIS', SKYB]] },
    { dur: 3.6, set: (x, t) => office(x, t), front: (x, t, lt, P) => { layers(x, P, 'cancer', 2, ['#ff8fb1', '#c9a6ff']); if (lt > 1.4) blanket(x, P, 'pisces') }, cast: { cancer: [[0, 330, Y, 250]], pisces: [[0, 760, Y, 250]] }, mood: { cancer: 'heart', pisces: lt => lt > 1.4 ? 'heart' : 'wide' },
      lines: [[0.3, 1.3, 'cancer', 'blanket, | baby.'], [1.9, 1.4, 'pisces', 'thank | you.']] },
    { dur: 3.4, set: (x, t) => { office(x, t, { snow: 0.6 }); thermostat(x, 800, 900, '64°') }, cast: { capricorn: [[0, 480, Y, 260]] }, mood: { capricorn: 'squint' },
      lines: [[0.3, 2.8, 'capricorn', 'I like it | crisp.']], stick: [[0.1, 1.4, 'WHO DID THIS', BRAKE]] },
    { dur: 3.6, set: (x, t) => { office(x, t, { snow: 0.6 }); thermostat(x, 800, 900, '64°') }, front: (x, t, lt, P) => frost(x, P, 'capricorn'), cast: { capricorn: [[0, 480, Y, 260]] }, mood: { capricorn: 'wide' }, hops: { capricorn: [1.4, 1.6, 1.8, 2.0] },
      lines: [[0.3, 1.1, 'capricorn', '...'], [1.4, 1.9, 'capricorn', "ok. I'm | freezing too."]], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.6, set: (x, t) => { patio(x, t, PAL.gold); heatSun(x, 860, 380, t, 80) }, cast: { cancer: [[0, 250, Y, 220]], pisces: [[0, 540, Y, 220]], capricorn: [[0, 830, Y, 220]] }, mood: { cancer: 'happy', pisces: 'heart', capricorn: 'sparkle' }, hops: hop2(['cancer', 'pisces', 'capricorn']),
      lines: [[0.3, 1.3, 'pisces', 'warm | tears!'], [1.9, 1.4, 'capricorn', 'thawing. | as a team.']], stick: [[0.1, 3.4, 'LUNCH OUTSIDE', GOLD]] },
    lessonScene(3.6, PAL.gold, 'say what you need. | (bring a sweater.)', two('capricorn', 'pisces'), { capricorn: 'happy', pisces: 'heart' }),
  ],
})

// ── hst469 · Mosquitoes love you? Scorpio, same. (patio at dusk, Leo's bug spray)
const skeeters = skit({
  hook: 'Bitten again? | Scorpio, same.', close: 'Green flags only. Jan 9.', endStars: ['scorpio', 'leo', 'libra', 'aries'],
  scenes: [
    { dur: 3.4, set: (x, t) => patio(x, t, PAL.dusk), front: (x, t, lt, P) => { const [cx, cy] = P.at('scorpio'); mosquitoes(x, t, cx, cy - 40, 5, 170) }, cast: { scorpio: [[0, 540, Y, 270]] }, mood: { scorpio: 'squint' }, hops: { scorpio: [0.05, 0.5, 1.0] },
      lines: [[0.3, 2.8, 'scorpio', 'you too? | every time?']] },
    { dur: 3.4, set: (x, t) => patio(x, t, PAL.dusk), front: (x, t, lt, P) => { const [cx, cy] = P.at('scorpio'); mosquitoes(x, t, cx, cy - 40, 6, 170) }, cast: { scorpio: [[0, 330, Y, 250]], leo: [[0, 760, Y, 250]] }, mood: { scorpio: 'wide', leo: 'sparkle' },
      lines: [[0.3, 1.4, 'leo', "they don't | touch me."], [1.9, 1.4, 'scorpio', 'must be | nice.']] },
    { dur: 3.4, set: (x, t) => patio(x, t, PAL.plum), front: (x, t, lt, P) => { const [cx, cy] = P.at('scorpio'); mosquitoes(x, t, cx, cy - 40, 9, 200) }, cast: { scorpio: [[0, 330, Y, 250]], leo: [[0, 760, Y, 250]] }, mood: { scorpio: 'squint', leo: 'happy' }, hops: { scorpio: [0.4, 0.9, 1.4, 1.9] },
      lines: [[0.3, 2.8, 'scorpio', "Houston's | city bird."]] },
    { dur: 3.4, set: (x, t) => patio(x, t, PAL.plum), front: (x, t, lt, P) => { const [cx, cy] = P.at('scorpio'); mosquitoes(x, t, cx, cy - 40, 14, 240) }, cast: { scorpio: [[0, 330, Y, 250]], leo: [[0, 760, Y, 250]] }, mood: { scorpio: 'wide', leo: 'wide' },
      lines: [[0.3, 2.8, 'scorpio', "I'm the | main course."]], stick: [[0.1, 3.0, 'MOSQUITOES: 14 · SCORPIO: 0', BRAKE]] },
    { dur: 3.8, set: (x, t) => patio(x, t, PAL.plum), front: (x, t, lt, P) => { const [cx, cy] = P.at('scorpio'), n = Math.max(0, 14 - Math.floor(lt * 7)); mosquitoes(x, t, cx, cy - 40, n, 240 + lt * 200); const [lx, ly, ls] = P.at('leo'); box(x, lx + ls * 0.3, ly - ls * 0.1, 50, 120, '#7dbf5a', 5); box(x, lx + ls * 0.3 + 10, ly - ls * 0.1 - 24, 30, 26, BONE, 4) },
      cast: { scorpio: [[0, 330, Y, 250]], leo: [[0, 760, Y, 250]] }, mood: { scorpio: lt => lt > 2 ? 'heart' : 'wide', leo: 'wink' },
      lines: [[0.3, 1.5, 'leo', 'I came | prepared.'], [2.1, 1.4, 'scorpio', 'bug spray? | for ME?']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.4, set: (x, t) => patio(x, t, PAL.plum), cast: { scorpio: [[0, 330, Y, 250]], leo: [[0, 760, Y, 250]] }, mood: { scorpio: 'heart', leo: 'heart' },
      lines: [[0.3, 2.8, 'scorpio', 'green flag. | huge.']], stick: [[0.2, 3.0, 'GREEN FLAG: BUG SPRAY', MINT]] },
    lessonScene(3.6, PAL.plum, 'small care | is big care.', two('scorpio', 'leo'), { scorpio: 'heart', leo: 'heart' }),
  ],
})

// ── hst470 · One cold day a year. Leo was ready.
const sun0 = { top: '#8ab0d8', bot: '#e6eef6', city: '#4a5a7a', ground: '#7a7e8a' }
const coldFit = skit({
  hook: 'One cold day a year. | Leo was ready.', close: 'Wear the fit. Jan 9.', endStars: ['leo', 'aries', 'gemini', 'capricorn'],
  scenes: [
    { dur: 3.4, set: (x, t) => home(x, t, '#4a2a3a'), front: (x, t, lt) => coat(x, 760, 1040, 1 + 0.03 * Math.sin(t * 4), '#c9a6ff'), cast: { leo: [[0, 330, Y, 260]] }, mood: { leo: 'heart' }, hops: { leo: [0.05, 0.6] },
      lines: [[0.3, 2.8, 'leo', 'you own a coat | for one day too?']] },
    { dur: 3.4, set: (x, t) => home(x, t, '#4a2a3a'), front: (x, t, lt) => forecastPhone(x, 760, 880, [['THU', 'cold', '52°'], ['FRI', 'sun', '78°']], lt, { k: 0.85 }), cast: { leo: [[0, 300, Y, 250]] }, mood: { leo: 'sparkle' }, hops: { leo: [1.0, 1.4, 1.8] },
      lines: [[0.3, 2.8, 'leo', "it's | happening."]] },
    { dur: 3.4, set: (x, t) => city(x, t, sun0), front: (x, t, lt, P) => { layers(x, P, 'leo', 4, ['#c9a6ff', '#2b5fb0', '#f2c75c', '#c9a6ff']); shades(x, P, 'leo') }, cast: { leo: [[0, 540, Y, 280]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.3, 1.0] },
      lines: [[0.4, 2.6, 'leo', 'the fit.']], stick: [[0.1, 3.0, 'COLD FRONT · 10 AM', SKYB]] },
    { dur: 3.6, set: (x, t) => city(x, t, sun0), front: (x, t, lt, P) => { layers(x, P, 'leo', 4, ['#c9a6ff', '#2b5fb0', '#f2c75c', '#c9a6ff']); shades(x, P, 'leo'); camera(x, P, 'aries'); flash(x, lt, 1.0); flash(x, lt, 2.2) },
      cast: { leo: [[0, 360, Y, 260]], aries: [[0, 800, Y, 220]] }, mood: { leo: 'wink', aries: 'sparkle' }, lines: [[0.3, 1.4, 'aries', 'work it!'], [1.9, 1.4, 'leo', 'always.']] },
    { dur: 3.6, set: (x, t) => { city(x, t, PAL.noon); heatSun(x, 860, 380, t, 80) }, front: (x, t, lt, P) => { layers(x, P, 'leo', 4 - Math.floor(clamp(lt / 3) * 3), ['#c9a6ff', '#2b5fb0', '#f2c75c', '#c9a6ff']); thermo(x, 860, 900, `${52 + Math.round(clamp(lt / 3) * 25)}°`, { k: 0.7 }); stamp(x, '2:00 PM') },
      cast: { leo: [[0, 400, Y, 260]] }, mood: { leo: 'wide' }, lines: [[0.3, 2.9, 'leo', "it's... | leaving?!"]] },
    { dur: 3.6, set: (x, t) => { city(x, t, PAL.dusk) }, front: (x, t, lt) => chat(x, 740, 920, lt, [['l', 'posting all winter', 0.4], ['r', 'the one day. iconic.', 1.4]], { k: Kp(lt, 0.1) }),
      cast: { leo: [[0, 300, Y, 250]] }, mood: { leo: 'sparkle' }, lines: [[0.3, 1.0, 'leo', 'four hours.'], [1.6, 1.6, 'leo', 'so many | photos.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    lessonScene(3.6, PAL.dusk, 'enjoy it | while it lasts.', two('leo', 'aries'), { leo: 'heart', aries: 'heart' }),
  ],
})

// ── hst471 · Four seasons by noon. Gemini is ready.
const pal471 = [{ top: '#6a8ab8', bot: '#cfe0f0', city: '#3a4a6a', ground: '#5a6070' }, PAL.noon, PAL.grey, PAL.haze]
const fits = [['#2b5fb0', '#e05a3a', '#f2c75c'], ['#7dffb0'], ['#ffd36b', '#5ec8ff'], ['#ff8fb1']]
const seasons = skit({
  hook: '4 seasons by noon. | Gemini is ready.', close: 'Ready for any weather. Jan 9.', endStars: ['gemini', 'sagittarius', 'libra', 'cancer'],
  scenes: [
    ...[['7 AM · 50°', 'coat. | obviously.', 3, 0], ['10 AM · 79°', 'shorts. | obviously.', 1, 1], ['1 PM · DRIZZLE', 'umbrella. | sure.', 2, 2], ['4 PM · STICKY', 'tank top. | why not.', 1, 3]].map(([st, line, n, i]) => ({
      dur: 3.4, set: (x, t) => { city(x, t, pal471[i]); if (i === 1) heatSun(x, 860, 380, t, 80); if (i === 2) drizzle(x, t); if (i === 3) wavy(x, t, 800, 600, 0.25) },
      front: (x, t, lt, P) => { layers(x, P, 'gemini', n, fits[i]); if (i === 2) umbrella(x, P, 'gemini'); if (i === 1) shades(x, P, 'gemini') },
      cast: { gemini: [[0, 540, Y, 280]] }, mood: { gemini: ['wide', 'sparkle', 'squint', 'happy'][i] }, hops: { gemini: [0.05, 0.5] },
      lines: [[0.3, 2.8, 'gemini', i === 0 ? 'you check | the weather? cute.' : line]], stick: [[0.1, 3.0, st, [SKYB, GOLD, BONE, PINK][i]]],
    })),
    { dur: 3.6, set: (x, t) => city(x, t, PAL.dusk), front: (x, t, lt, P) => { layers(x, P, 'gemini', 1, ['#ff8fb1']); layers(x, P, 'sagittarius', 1, ['#c9a6ff']) }, cast: { gemini: [[0, 360, Y, 250]], ...enter('sagittarius') }, mood: { gemini: 'happy', sagittarius: 'wide' },
      lines: [[0.8, 1.4, 'sagittarius', 'four outfits? | by noon?'], [2.3, 1.1, 'gemini', 'and two | moods.']] },
    { dur: 3.8, set: (x, t) => { city(x, t, PAL.dusk); bag(x, 540, 1460, 1, 6) }, front: (x, t, lt, P) => umbrella(x, P, 'gemini', '#ffd36b'), cast: { gemini: [[0, 360, Y, 250]], sagittarius: [[0, 720, Y, 250]] }, mood: { gemini: 'wink', sagittarius: 'heart' },
      lines: [[0.3, 1.5, 'gemini', 'I brought | one for you.'], [2.1, 1.4, 'sagittarius', 'every | season?']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    lessonScene(3.6, PAL.dusk, 'adapting | is a love language.', two('gemini', 'sagittarius'), { gemini: 'heart', sagittarius: 'heart' }),
  ],
})

// ── hst472 · Capricorn vs. the last shady spot
const shadeLot = (x, t, p) => { parkingLot(x, t, p, { trees: [] }); tree(x, 540, 1320, { s: 1.1 }); heatSun(x, 880, 360, t, 70); wavy(x, t, 1200, 500, 0.2) }
const shady = skit({
  hook: 'Capricorn vs. | the last shady spot', close: 'Save me some shade. Jan 9.', endStars: ['capricorn', 'aries', 'taurus', 'virgo'],
  scenes: [
    { dur: 3.4, set: (x, t) => shadeLot(x, t, PAL.gold), front: (x, t, lt) => car(x, 1100 - ((lt * 380) % 1400), 1620, '#3a9a6a', {}), cast: { capricorn: [[0, 260, Y + 60, 240]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05, 0.5] },
      lines: [[0.3, 2.8, 'capricorn', 'you know | the spot.']] },
    { dur: 3.4, set: (x, t) => shadeLot(x, t, PAL.gold), front: (x, t, lt) => stamp(x, 'LAP 3', MINT), cast: { capricorn: [[0, -200, Y + 60, 230], [1.4, 1300, Y + 60, 230], [3.2, 260, Y + 60, 230]] }, mood: { capricorn: 'squint' },
      lines: [[0.3, 2.8, 'capricorn', 'circling. | patiently.']] },
    { dur: 3.4, set: (x, t) => shadeLot(x, t, PAL.gold), cast: { aries: [[0, 1300, Y + 60, 240], [0.8, 820, Y + 60, 240]] }, mood: { aries: 'sparkle' },
      lines: [[0.9, 2.4, 'aries', "that shade? | mine."]], stick: [[0.1, 1.2, 'CHALLENGER', BRAKE]] },
    { dur: 3.6, set: (x, t) => shadeLot(x, t, PAL.gold), cast: { capricorn: [[0, 260, Y + 60, 240], [1.2, 400, Y + 60, 240]], aries: [[0, 820, Y + 60, 240], [1.2, 680, Y + 60, 240]] }, mood: { capricorn: 'squint', aries: 'squint' },
      lines: [[1.3, 1.0, 'capricorn', '...'], [2.3, 1.1, 'aries', '...']], stick: [[0.1, 1.2, 'STANDOFF', GOLD]] },
    { dur: 3.8, set: (x, t) => shadeLot(x, t, PAL.gold), cast: { capricorn: [[0, 400, Y + 60, 240]], aries: [[0, 680, Y + 60, 240]] }, mood: { capricorn: lt => lt > 2 ? 'heart' : 'happy', aries: 'heart' },
      lines: [[0.3, 1.6, 'capricorn', 'half each? | front wheels?'], [2.1, 1.4, 'aries', '...deal.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.6, set: (x, t) => shadeLot(x, t, PAL.dusk), front: (x, t) => { car(x, 330, 1620, '#3a9a6a', { s: 1.1 }); car(x, 750, 1620, '#e0503a', { s: 1.1, flip: true }) }, cast: { capricorn: [[0, 430, Y + 30, 220]], aries: [[0, 650, Y + 30, 220]] }, mood: { capricorn: 'heart', aries: 'heart' },
      lines: [[0.3, 2.8, 'aries', 'see you | in the shade.']], stick: [[0.1, 3.0, 'SHADE: SHARED', MINT]] },
    lessonScene(3.6, PAL.dusk, 'share the shade.', two('capricorn', 'aries'), { capricorn: 'heart', aries: 'heart' }, (x, t) => tree(x, 540, FLOOR + 60, { s: 0.8, shade: false })),
  ],
})

// ── hst473 · 68° in Houston? That's soup weather. (Pisces)
const soup = skit({
  hook: "68° in Houston? | That's soup weather.", close: 'Cozy season: Jan 9.', endStars: ['pisces', 'taurus', 'cancer', 'sagittarius'],
  scenes: [
    { dur: 3.4, set: (x, t) => city(x, t, PAL.grey), front: (x, t, lt) => thermo(x, 820, 900, '68°', { k: Kp(lt, 0.02), hot: false }), cast: { pisces: [[0, 360, Y, 270]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.05, 0.5, 1.0] },
      lines: [[0.3, 2.8, 'pisces', 'you feel | that chill?']] },
    { dur: 3.4, set: (x, t) => { city(x, t, PAL.grey); phoStand(x, 760, FLOOR + 60) }, cast: { pisces: [[0, 300, Y, 250]] }, mood: { pisces: 'sparkle' },
      lines: [[0.3, 2.8, 'pisces', 'soup. | it is time.']], stick: [[0.1, 3.0, 'BELLAIRE BLVD', GOLD]] },
    { dur: 3.4, set: (x, t) => { city(x, t, PAL.grey); phoStand(x, 760, FLOOR + 60) }, cast: { pisces: [[0, 200, Y, 220]], taurus: [[0, 1250, Y, 220], [0.5, 430, Y, 220]], cancer: [[0, 1350, Y, 220], [0.9, 640, Y, 220]] }, mood: { pisces: 'happy', taurus: 'heart', cancer: 'heart' },
      lines: [[0.7, 1.2, 'taurus', 'same | idea!'], [2.0, 1.2, 'cancer', 'whole city | had it.']] },
    { dur: 3.6, set: (x, t) => { city(x, t, PAL.dusk) }, front: (x, t, lt) => { box(x, 80, 1340, 920, 40, '#7a4a2c', 6); bowl(x, 300, 1330, t, 0.8); bowl(x, 540, 1330, t, 0.8); bowl(x, 780, 1330, t, 0.8); stamp(x, '68°... 75°', BRAKE) },
      cast: { pisces: [[0, 300, 1160, 200]], taurus: [[0, 540, 1160, 200]], cancer: [[0, 780, 1160, 200]] }, mood: { pisces: 'heart', taurus: 'squint', cancer: 'happy' },
      lines: [[0.3, 2.9, 'taurus', 'is it | getting warmer?']] },
    { dur: 3.8, set: (x, t) => city(x, t, PAL.dusk), front: (x, t, lt) => { box(x, 80, 1340, 920, 40, '#7a4a2c', 6); bowl(x, 300, 1330, t, 0.8); bowl(x, 540, 1330, t, 0.8); bowl(x, 780, 1330, t, 0.8); stamp(x, '80°', BRAKE) },
      cast: { pisces: [[0, 300, 1160, 200]], taurus: [[0, 540, 1160, 200]], cancer: [[0, 780, 1160, 200]] }, mood: { pisces: 'heart', taurus: 'heart', cancer: 'heart' },
      lines: [[0.3, 1.4, 'pisces', 'second bowl?'], [2.0, 1.5, 'cancer', 'obviously.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.4, set: (x, t) => city(x, t, PAL.dusk), cast: { pisces: [[0, 540, Y, 270]] }, mood: { pisces: 'heart' }, hops: { pisces: [0.4, 1.0, 1.6] },
      lines: [[0.3, 2.8, 'pisces', 'best day | of the year.']] },
    lessonScene(3.6, PAL.dusk, 'make your own | cozy season.', two('pisces', 'cancer'), { pisces: 'heart', cancer: 'heart' }),
  ],
})

// ── hst474 · Love bug season. Aquarius took notes.
const lb = (x, t, p, n = 6) => { city(x, t, p); loveBugs(x, t, 540, 700, n, 380) }
const lovebug = skit({
  hook: 'Love bug season. | Aquarius took notes.', close: 'Stick together. Jan 9.', endStars: ['aquarius', 'libra', 'leo', 'virgo'],
  scenes: [
    { dur: 3.4, set: (x, t) => lb(x, t, PAL.lime), front: (x, t, lt, P) => clipboard(x, P, 'aquarius', 0.25), cast: { aquarius: [[0, 420, Y, 270]] }, mood: { aquarius: 'squint' }, hops: { aquarius: [0.05, 0.5] },
      lines: [[0.3, 2.8, 'aquarius', 'you see them? | always two.']] },
    { dur: 3.4, set: (x, t) => lb(x, t, PAL.lime, 8), front: (x, t, lt, P) => clipboard(x, P, 'aquarius', 0.5), cast: { aquarius: [[0, 420, Y, 270]] }, mood: { aquarius: 'wide' },
      lines: [[0.3, 2.8, 'aquarius', 'note: they | never let go.']], stick: [[0.1, 3.0, 'FIELD NOTES', MINT]] },
    { dur: 3.4, set: (x, t) => { city(x, t, PAL.lime); car(x, 760, 1500, '#5ee0ff', { s: 1.2 }); loveBugs(x, t, 760, 1420, 4, 140) }, front: (x, t, lt, P) => clipboard(x, P, 'aquarius', 0.75), cast: { aquarius: [[0, 280, Y, 250]] }, mood: { aquarius: 'squint' },
      lines: [[0.3, 2.8, 'aquarius', 'on my car. | together. bold.']] },
    { dur: 3.6, set: (x, t) => lb(x, t, PAL.gold, 10), front: (x, t, lt, P) => clipboard(x, P, 'aquarius', 1), cast: { aquarius: [[0, 420, Y, 270]] }, mood: { aquarius: lt => lt > 1.6 ? 'heart' : 'wide' },
      lines: [[0.3, 1.3, 'aquarius', 'conclusion:'], [1.7, 1.7, 'aquarius', 'I should | text them.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.8, set: (x, t) => city(x, t, PAL.gold), front: (x, t, lt) => chat(x, 720, 820, lt, [['r', 'want to stick together?', 0.3], ['l', 'yes. less sticky.', 1.6]], { k: Kp(lt, 0.05) }), cast: { aquarius: [[0, 260, Y, 240]] }, mood: { aquarius: lt => lt > 1.6 ? 'heart' : 'squint' } },
    { dur: 3.4, set: (x, t) => lb(x, t, PAL.dusk, 4), cast: { aquarius: [[0, 360, Y, 250]], ...enter('libra') }, mood: { aquarius: 'heart', libra: 'heart' },
      lines: [[0.8, 2.2, 'libra', 'hi. | no bugs, please.']] },
    lessonScene(3.6, PAL.dusk, 'notice what | you want.', two('aquarius', 'libra'), { aquarius: 'heart', libra: 'heart' }, (x, t) => loveBugs(x, t, 540, 500, 3, 300)),
  ],
})

// ── hst475 · Your steering wheel in October: lava (Aries)
const lava = skit({
  hook: 'Your steering wheel | in October: lava', close: 'Stay cool. Jan 9.', endStars: ['aries', 'capricorn', 'leo', 'sagittarius'],
  scenes: [
    { dur: 3.4, set: (x, t) => { parkingLot(x, t, PAL.gold, { trees: [] }); heatSun(x, 860, 380, t, 90); wavy(x, t, 1000, 600, 0.25) }, front: (x, t) => { car(x, 640, 1560, '#e0503a', { s: 1.6 }); thermo(x, 900, 900, '97°', { k: 0.55 }) },
      cast: { aries: [[0, 260, Y + 60, 240]] }, mood: { aries: 'wide' }, hops: { aries: [0.05, 0.5] }, lines: [[0.3, 2.8, 'aries', 'you know | this car.']] },
    { dur: 3.4, set: (x, t) => dash(x, t, PAL.gold), front: (x, t, lt) => { dashFront(x, t); wavy(x, t, 1300, 300, 0.4) }, cast: { aries: [[0, 360, 1210, 260]] }, mood: { aries: lt => lt > 1 ? 'wide' : 'happy' }, hops: { aries: [1.0, 1.2, 1.4] },
      lines: [[0.3, 0.8, 'aries', 'ok...'], [1.2, 1.9, 'aries', 'HOT. | HOT. HOT.']] },
    { dur: 3.4, set: (x, t) => dash(x, t, PAL.gold), front: (x, t) => { dashFront(x, t); mitts(x, 360, 1420) }, cast: { aries: [[0, 360, 1210, 260]] }, mood: { aries: 'squint' },
      lines: [[0.3, 2.8, 'aries', 'oven mitts. | no notes.']] },
    { dur: 3.4, set: (x, t) => dash(x, t, PAL.gold), front: (x, t, lt) => { dashFront(x, t, { mirror: 'AC: MAX' }); mitts(x, 360, 1420) }, cast: { aries: [[0, 360, 1210, 260]] }, mood: { aries: 'wide' },
      lines: [[0.3, 2.8, 'aries', 'the BUCKLE. | why.']] },
    { dur: 3.6, set: (x, t) => { parkingLot(x, t, PAL.gold, { trees: [880] }); heatSun(x, 860, 380, t, 90) }, front: (x, t, lt) => { car(x, 560, 1560, '#e0503a', { s: 1.4 }); stamp(x, '2-MIN DRIVE', MINT); if (lt > 1.2) { for (let k = 0; k < 6; k++) { x.fillStyle = 'rgba(190,230,255,0.8)'; x.fillRect(300 + k * 40, 1300 - ((lt * 200 + k * 30) % 200), 8, 30) } } },
      cast: { aries: [[0, 560, 1360, 220]] }, mood: { aries: lt => lt > 1.2 ? 'wide' : 'happy' }, lines: [[0.3, 0.9, 'aries', 'here!'], [1.3, 2.0, 'aries', 'NOW the AC | is cold?!']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.6, set: (x, t) => { parkingLot(x, t, PAL.dusk, { trees: [880] }) }, front: (x, t, lt) => { car(x, 560, 1560, '#3a9a6a', { s: 1.4 }); sunShade(x, 560, 1440, Kp(lt, 0.8)) }, cast: { aries: [[0, 250, Y + 60, 230]], capricorn: [[0, 1250, Y + 60, 230], [0.5, 830, Y + 60, 230]] }, mood: { aries: 'heart', capricorn: 'wink' },
      lines: [[0.6, 1.4, 'capricorn', 'windshield | shade, friend.'], [2.2, 1.2, 'aries', 'genius.']] },
    lessonScene(3.6, PAL.dusk, 'cool down | before you react.', two('aries', 'capricorn'), { aries: 'heart', capricorn: 'happy' }),
  ],
})

// ── hst476 · How to dress for Jan 9 in Houston (Sagittarius packs for every season; Virgo checks the list)
const ITEMS = ['shorts', 'a puffer', 'an umbrella', 'a sweater (AC)', 'bug spray', 'sunglasses']
const packing = skit({
  hook: 'How to dress for | Jan 9 in Houston', close: 'Pack for every season. Jan 9.', endStars: ['sagittarius', 'virgo', 'leo', 'pisces'],
  scenes: [
    { dur: 3.4, set: (x, t) => home(x, t, '#2a3a5a'), front: (x, t, lt) => { bag(x, 760, 1300, 1, 1); forecastPhone(x, 760, 760, [['JAN 9', 'cloud', '??°']], lt, { k: 0.7 }) }, cast: { sagittarius: [[0, 300, Y, 260]] }, mood: { sagittarius: 'squint' }, hops: { sagittarius: [0.05, 0.5] },
      lines: [[0.3, 2.8, 'sagittarius', 'you too? | no idea?']] },
    ...[0, 2, 4].map(i => ({ dur: 3.2, set: (x, t) => home(x, t, '#2a3a5a'), front: (x, t, lt, P) => { bag(x, 600, 1300, 1, i + 1 + Math.floor(clamp(lt / 1.6) * 2)); clipboard(x, P, 'virgo', (i + 2) / 6) },
      cast: { sagittarius: [[0, 300, Y, 250]], virgo: [[0, 900, Y, 210]] }, mood: { sagittarius: ['happy', 'sparkle', 'wink'][i / 2], virgo: 'squint' },
      lines: [[0.3, 1.3, 'sagittarius', `${ITEMS[i]}...`], [1.6, 1.4, 'sagittarius', `...${ITEMS[i + 1]}.`]] })),
    { dur: 3.4, set: (x, t) => home(x, t, '#2a3a5a'), front: (x, t, lt, P) => { bag(x, 600, 1300, 1.1 + 0.05 * Math.sin(t * 6), 6); clipboard(x, P, 'virgo', 1) }, cast: { sagittarius: [[0, 300, Y, 250]], virgo: [[0, 900, Y, 210]] }, mood: { sagittarius: 'heart', virgo: 'happy' },
      lines: [[0.3, 2.8, 'virgo', 'every season: | packed.']], stick: [[0.1, 3.0, 'HOUSTON BAG: READY', GOLD]] },
    { dur: 3.8, set: (x, t) => { sky(x, PAL.plum); skyline(x, FLOOR + 60, t, { col: PAL.plum.city }); ground(x, PAL.plum) }, front: (x, t, lt) => { bag(x, 230, 1470, 0.55, 6); bag(x, 540, 1470, 0.55, 6); bag(x, 850, 1470, 0.55, 6) },
      cast: { sagittarius: [[0, 230, Y - 40, 220]], leo: [[0, 1250, Y - 40, 220], [0.5, 540, Y - 40, 220]], pisces: [[0, 1350, Y - 40, 220], [0.9, 850, Y - 40, 220]] }, mood: { sagittarius: lt => lt > 1.6 ? 'wide' : 'happy', leo: 'wink', pisces: 'heart' },
      lines: [[1.0, 1.3, 'leo', 'nice bag.'], [2.4, 1.2, 'pisces', 'same bag!']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    lessonScene(3.6, PAL.plum, 'come ready | for anything.', two('sagittarius', 'virgo'), { sagittarius: 'heart', virgo: 'heart' }),
  ],
})

export const W19W = { hst465: dressWarm, hst466: fogged, hst467: pollenNote, hst468: arctic, hst469: skeeters, hst470: coldFit, hst471: seasons, hst472: shady, hst473: soup, hst474: lovebug, hst475: lava, hst476: packing }
