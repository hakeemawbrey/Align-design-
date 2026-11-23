// Houston Star Talk · w19 traffic skits (hst453–hst464). Short stories on Houston roads, each with a twist,
// a ★ LESSON UNLOCKED beat and the Jan 9 party ticket. Props: w19.js and kit.js. Engine: starrace/ep.js.
import {
  FLOOR, box, txt, label, sparkles, signChar, GOLD, BONE, PINK, INK, MONO, SERIF, SKYB, MINT, skyline, car, freeway, shield, overheadSign, streetSign, BRAKE, HGREEN,
  clamp, prog, ease, Y, Kp, PAL, CA, CB, SEAT, sky, ground, road, rideP, jam, dash, dashFront, gps, chat, train, roadWork, parkingLot, tree, wavy, lesson, plate, bigText, stamp, skit, sunShade, shades,
} from './w19.js'
import { houses, coffeeShop, mural, kolache, taco } from './kit.js'
import { clock } from '../starrace/ep.js'
import { notes } from '../signs3kit.js'

const JAM = ['#7a5ab0', '#3a8f6a', '#c0603a', '#3a6ab0', '#b0a03a', '#8a3a6a']
/** a driving scene: o.cars = { sign: carColour } rides under each star; o.jam draws a far lane of brake lights */
const drv = o => ({
  dur: o.dur, title: o.title, stick: o.stick, lines: o.lines, mood: o.mood, hops: o.hops, look: o.look, cast: o.cast,
  set: (x, t, lt) => { road(x, t, o.pal, { num: o.num, scroll: (o.speed ?? 40) * t, sign: o.sign, sub: o.sub, sun: o.sun }); if (o.jam !== false) jam(x, t, 1185, o.jamCols || JAM, { s: 0.55, speed: o.jamSpeed ?? 8 }); o.set2?.(x, t, lt) },
  front: (x, t, lt, P) => { for (const [id, col] of Object.entries(o.cars || {})) rideP(x, P, id, col, t, { brake: o.brake ?? 0.8, bump: o.bump?.(lt) || 0 }); o.front?.(x, t, lt, P) },
})
const seat = (cx, cy = CA, s = 230) => [0, cx, cy - SEAT * s / 190, s]
const lessonScene = (dur, pal, text, cast, mood, extra) => ({ dur, set: (x, t, lt) => { sky(x, pal); skyline(x, FLOOR + 60, t, { col: pal.city }); ground(x, pal); extra?.(x, t, lt) }, front: (x, t, lt) => lesson(x, t, lt, text), cast, mood, hops: Object.fromEntries(Object.keys(cast).map((id, i) => [id, [0.1 + i * 0.15, 1.4 + i * 0.15]])) })

// ── hst453 · POV: you're the one who lets everyone merge (Libra on 59)
const merge = skit({
  hook: 'POV: you let | everyone merge', close: 'Merge into Jan 9.', endStars: ['libra', 'scorpio', 'gemini', 'virgo'],
  scenes: [
    drv({ dur: 3.2, pal: PAL.dusk, num: '59', speed: 30, cast: { libra: [seat(560)] }, cars: { libra: '#ff8fb1' }, mood: { libra: 'happy' }, hops: { libra: [0.05, 0.6] },
      lines: [[0.4, 2.6, 'libra', 'hey you, | yes, merge!']] }),
    drv({ dur: 3.4, pal: PAL.dusk, num: '59', speed: 20, cast: { libra: [seat(380)], aries: [[0, 1300, CB - SEAT * 230 / 190, 230], [1.0, 760, CA - SEAT * 230 / 190, 230]] }, cars: { libra: '#ff8fb1', aries: '#e0503a' }, mood: { libra: 'happy', aries: 'sparkle' },
      lines: [[1.1, 1.0, 'aries', 'thanks!'], [2.2, 1.1, 'libra', 'of course!']] }),
    drv({ dur: 3.4, pal: PAL.dusk, num: '59', speed: 15, cast: { libra: [seat(380)], gemini: [[0, 1300, CB - SEAT * 230 / 190, 230], [0.8, 760, CA - SEAT * 230 / 190, 230]] }, cars: { libra: '#ff8fb1', gemini: '#f2c75c' }, mood: { libra: 'happy', gemini: 'wink' },
      lines: [[0.9, 1.0, 'gemini', 'thank you!'], [2.1, 1.2, 'gemini', 'and my | other half!']] }),
    drv({ dur: 3.4, pal: PAL.dusk, num: '59', speed: 10, cast: { libra: [seat(380)], cancer: [[0, 1300, CB - SEAT * 230 / 190, 230], [0.8, 760, CA - SEAT * 230 / 190, 230]] }, cars: { libra: '#ff8fb1', cancer: '#5ec8ff' }, mood: { libra: 'happy', cancer: 'heart' },
      lines: [[0.9, 1.2, 'cancer', 'bless you, | baby!'], [2.2, 1.1, 'libra', 'anytime!']], stick: [[0.1, 3.2, 'CARS LET IN: SO MANY', GOLD]] }),
    drv({ dur: 3.6, pal: PAL.night, num: '59', speed: 0, jamSpeed: 0, cast: { libra: [seat(540)] }, cars: { libra: '#ff8fb1' }, mood: { libra: lt => lt < 1.8 ? 'happy' : 'wide' },
      front: (x, t, lt) => stamp(x, '6:40 PM', BRAKE), lines: [[0.3, 1.4, 'libra', 'still being | polite...'], [1.9, 1.5, 'libra', 'my exit was | a while ago.']] }),
    drv({ dur: 3.6, pal: PAL.night, num: '59', speed: 0, jamSpeed: 0, cast: { libra: [seat(380)], virgo: [seat(780, CB)] }, cars: { libra: '#ff8fb1', virgo: '#7dbf5a' }, mood: { libra: 'wide', virgo: 'squint' },
      lines: [[0.3, 1.6, 'virgo', 'you can say | no, you know.'], [2.1, 1.3, 'libra', "I'm | learning!"]] }),
    drv({ dur: 3.8, pal: PAL.night, num: '59', speed: 10, cast: { libra: [seat(380)], scorpio: [[0, 1300, CB - SEAT * 230 / 190, 230], [0.8, 760, CB - SEAT * 230 / 190, 230]] }, cars: { libra: '#ff8fb1', scorpio: '#6a3ab0' }, mood: { libra: lt => lt > 2.6 ? 'heart' : 'wide', scorpio: 'wink' },
      lines: [[1.0, 1.4, 'scorpio', 'you let me in | at 5:12.'], [2.6, 1.2, 'scorpio', 'I noticed.']], stick: [[0.1, 1.0, '★ TWIST', PINK]] }),
    { dur: 3.8, set: (x, t) => { dash(x, t, PAL.night) }, front: (x, t, lt) => { dashFront(x, t); chat(x, 760, 780, lt, [['l', 'coffee? feeder road?', 0.2], ['r', 'after you.', 1.2], ['l', 'no, after YOU.', 2.2]], { k: 1.25 * Kp(lt, 0.02) }) },
      cast: { libra: [[0, 330, 1210, 260]] }, mood: { libra: 'heart' }, hops: { libra: [1.3, 2.4] } },
    lessonScene(3.6, PAL.dusk, 'kindness | gets noticed.', { libra: [[0, 400, Y, 240]], scorpio: [[0, 680, Y, 240]] }, { libra: 'heart', scorpio: 'heart' }),
  ],
})

// ── more props (traffic only)
const S2 = 230 / 190
const at = (cx, cy = CA) => [cx, cy - SEAT * S2, 230]
/** a minivan carrying up to three stars (call in front; stars sit at cx-170, cx, cx+170 at size 170) */
function van(x, cx, cy, col) { box(x, cx - 320, cy - 40, 640, 90, col, 7); for (const wx of [-200, 200]) { x.fillStyle = INK; x.beginPath(); x.arc(cx + wx, cy + 50, 36, 0, Math.PI * 2); x.fill(); x.fillStyle = '#8f96a0'; x.beginPath(); x.arc(cx + wx, cy + 50, 15, 0, Math.PI * 2); x.fill() } x.fillStyle = '#fff3c4'; x.fillRect(cx + 300, cy - 28, 14, 18); x.fillStyle = BRAKE; x.fillRect(cx - 326, cy - 30, 14, 22) }
/** an elevated freeway with a feeder road under it */
function feeder(x, t, p, { scroll = 0 } = {}) {
  sky(x, p); skyline(x, 760, t, { col: p.city, alpha: 0.9 })
  for (const px of [160, 540, 920]) box(x, px - 30, 900, 60, 360, '#8a8698', 6)
  freeway(x, 760, 150, 2, scroll * 0.2); box(x, 0, 900, 1080, 30, '#5a566a', 0)
  freeway(x, FLOOR - 40, 420, 2, scroll); x.fillStyle = p.ground; x.fillRect(0, FLOOR + 380, 1080, 600)
  box(x, 790, 560, 250, 70, HGREEN, 5); txt(x, 'FEEDER RD', 915, 596, { size: 34, col: BONE })
}
function stand(x, cx, base, word, col = '#ff8fb1') { box(x, cx - 150, base - 220, 300, 220, '#f4efe4', 6); box(x, cx - 170, base - 270, 340, 60, col, 6); txt(x, word, cx, base - 240, { size: 38, col: INK }); for (let k = 0; k < 4; k++) { x.fillStyle = k % 2 ? col : BONE; x.fillRect(cx - 150 + k * 75, base - 210, 75, 30) } }
function bats(x, t, n = 14) { for (let k = 0; k < n; k++) { const ph = (t * 0.25 + k / n) % 1, px = ph * 1300 - 100, py = 380 + (k * 47) % 360 + Math.sin(t * 6 + k) * 20, f = Math.sin(t * 20 + k) > 0 ? 10 : -6; x.fillStyle = INK; x.beginPath(); x.moveTo(px - 22, py + f); x.lineTo(px, py); x.lineTo(px + 22, py + f); x.lineTo(px, py + 6); x.fill() } }
function beach(x, t, p) { sky(x, p); x.fillStyle = '#8a6a3a'; x.fillRect(0, 900, 1080, 400); for (let k = 0; k < 8; k++) { const y = 920 + k * 45; x.fillStyle = 'rgba(255,240,210,0.25)'; x.fillRect(((k * 170 + t * 40) % 1300) - 200, y, 220, 6) } x.fillStyle = '#e8d2a0'; x.fillRect(0, 1300, 1080, 620); x.fillStyle = INK; x.fillRect(0, 1296, 1080, 8); for (let k = 0; k < 3; k++) { const gx = ((k * 360 + t * 70) % 1300) - 100, gy = 520 + k * 60; x.strokeStyle = BONE; x.lineWidth = 6; x.beginPath(); x.moveTo(gx - 26, gy); x.quadraticCurveTo(gx - 12, gy - 16, gx, gy); x.quadraticCurveTo(gx + 12, gy - 16, gx + 26, gy); x.stroke() } }
/** Leo's pompadour: mess 0 (perfect) .. 1 (wild) */
function hair(x, P, id, mess) { const [cx, cy, s] = P.at(id), top = cy - s * 0.5; x.save(); x.translate(cx, top); x.rotate(mess * 0.5 * Math.sin(P.t * 3)); for (let k = 0; k < 5; k++) { const a = -0.6 + k * 0.3 + mess * Math.sin(k * 2.3) * 0.9; x.fillStyle = INK; x.beginPath(); x.ellipse(Math.cos(a - Math.PI / 2) * 30, -30 + Math.sin(a - Math.PI / 2) * 30, 22, 46, a, 0, Math.PI * 2); x.fill(); x.fillStyle = '#ffb347'; x.beginPath(); x.ellipse(Math.cos(a - Math.PI / 2) * 30, -30 + Math.sin(a - Math.PI / 2) * 30, 16, 40, a, 0, Math.PI * 2); x.fill() } x.restore() }
function blinker(x, P, id, t) { if (Math.floor(t * 3) % 2) return; const [cx, cy, s] = P.at(id); x.fillStyle = '#ffb347'; x.beginPath(); x.arc(cx + 130 * s / 190, cy + SEAT * s / 190 - 20, 16, 0, Math.PI * 2); x.fill() }
const night2 = (x, t, p) => { sky(x, p); skyline(x, FLOOR + 60, t, { col: p.city }); ground(x, p) }

// ── hst454 · Your GPS said 20 minutes. It lied. (Virgo on 290)
const gpsLied = skit({
  hook: "Your GPS said | '20 minutes.' It lied.", close: 'Leave early for Jan 9.', endStars: ['virgo', 'capricorn', 'taurus', 'leo'],
  scenes: [
    { dur: 3.4, set: (x, t) => dash(x, t, PAL.noon, { scroll: t * 300 }), front: (x, t, lt) => { dashFront(x, t); gps(x, 780, 760, '20 MIN', t, { k: Kp(lt, 0.02), col: MINT }) },
      cast: { virgo: [[0, 330, 1210, 260]] }, mood: { virgo: 'happy' }, hops: { virgo: [0.05, 0.5] }, lines: [[0.4, 2.8, 'virgo', 'date at 7. | GPS says 20.']] },
    drv({ dur: 3.4, pal: PAL.noon, num: '290', speed: 10, jamSpeed: 2, set2: (x, t) => roadWork(x, t, 1160), cast: { virgo: [at(380)] }, cars: { virgo: '#7dbf5a' }, mood: { virgo: 'squint' },
      front: (x, t, lt) => gps(x, 860, 420, '35 MIN', t, { k: 0.55, col: '#ff9a2a' }), lines: [[0.3, 2.8, 'virgo', 'construction. | since forever.']] }),
    { dur: 3.4, set: (x, t, lt) => { sky(x, PAL.noon); skyline(x, FLOOR - 200, t, { col: PAL.noon.city }); ground(x, PAL.noon, FLOOR - 100); train(x, t, lt, { base: FLOOR - 40 }) }, front: (x, t, lt, P) => { rideP(x, P, 'virgo', '#7dbf5a', t, { brake: 1 }); gps(x, 860, 420, '48 MIN', t, { k: 0.55 }) },
      cast: { virgo: [at(760, CB)] }, mood: { virgo: 'wide' }, lines: [[0.4, 2.6, 'virgo', 'a train. | of course.']] },
    drv({ dur: 3.4, pal: PAL.gold, sign: 'TEXAS U-TURN', sub: 'MISSED YOUR EXIT?', speed: 60, cast: { virgo: [at(300), [1.6, 300, CA - SEAT * S2, 230], [2.6, 760, CA - SEAT * S2, 230]] }, cars: { virgo: '#7dbf5a' }, mood: { virgo: 'squint' },
      lines: [[0.3, 1.3, 'virgo', 'missed it.'], [1.8, 1.4, 'virgo', 'U-turn. | fine.']] }),
    { dur: 3.6, set: (x, t) => dash(x, t, PAL.dusk, { scroll: t * 40 }), front: (x, t, lt) => { dashFront(x, t); gps(x, 780, 760, '1 HR', t, { k: 1 }) },
      cast: { virgo: [[0, 330, 1210, 260]] }, mood: { virgo: 'wide' }, lines: [[0.3, 3.0, 'virgo', 'Houston is | an hour from | Houston.']], stick: [[0.2, 3.2, 'ETA: 1 HOUR', BRAKE]] },
    { dur: 3.6, set: (x, t) => { night2(x, t, PAL.dusk); coffeeShop(x, 760, FLOOR + 60) }, cast: { virgo: [[0, 1250, Y, 240], [0.7, 320, Y, 240]] }, mood: { virgo: 'wide' },
      lines: [[0.9, 2.4, 'virgo', "I'm SO sorry, | I'm SO late—"]] },
    { dur: 3.8, set: (x, t) => { night2(x, t, PAL.dusk); coffeeShop(x, 760, FLOOR + 60) }, cast: { virgo: [[0, 320, Y, 240]], capricorn: [[0, 1250, Y, 240], [0.6, 700, Y, 240]] }, mood: { virgo: lt => lt > 2.2 ? 'happy' : 'wide', capricorn: 'wide' },
      lines: [[0.7, 1.4, 'capricorn', 'I JUST | got here.'], [2.3, 1.3, 'virgo', 'the 290?'], [2.9, 0.9, 'capricorn', 'the 290.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    lessonScene(3.6, PAL.dusk, 'leave early. | forgive late.', { virgo: [[0, 400, Y, 240]], capricorn: [[0, 680, Y, 240]] }, { virgo: 'heart', capricorn: 'heart' }),
  ],
})

// ── hst455 · Gemini texted 'five minutes away.' From Cypress.
const fiveMin = skit({
  hook: "Gemini said 'five | minutes.' From Cypress.", close: 'Real ETA: Jan 9.', endStars: ['gemini', 'pisces', 'sagittarius', 'cancer'],
  scenes: [
    { dur: 3.4, set: (x, t) => dash(x, t, PAL.rose, { scroll: t * 300 }), front: (x, t, lt) => { dashFront(x, t); chat(x, 760, 720, lt + 0.6, [['r', 'almost there! 5 min', 0.4]], { k: Kp(lt, 0.02) }) },
      cast: { gemini: [[0, 330, 1210, 260]] }, mood: { gemini: 'wink' }, hops: { gemini: [0.05, 0.5] }, lines: [[0.5, 2.7, 'gemini', "you've sent this. | don't lie."]] },
    drv({ dur: 3.6, pal: PAL.rose, speed: 120, jam: false, set2: (x, t) => streetSign(x, 760, 700, 'KUYKENDAHL', { pole: false }), cast: { gemini: [at(360)] }, cars: { gemini: '#f2c75c' }, mood: { gemini: 'squint' },
      lines: [[0.3, 1.5, 'gemini', 'Kirk-en-doll? | Kuy-ken-dahl?'], [2.0, 1.4, 'gemini', 'both. | Gemini.']], stick: [[0.1, 1.2, 'STILL IN CYPRESS', GOLD]] }),
    drv({ dur: 3.4, pal: PAL.rose, num: '290', speed: 30, cast: { gemini: [at(360)], sagittarius: [at(760, CB)] }, cars: { gemini: '#f2c75c', sagittarius: '#c9a6ff' }, mood: { gemini: 'wink', sagittarius: 'squint' },
      lines: [[0.3, 1.4, 'gemini', 'still "5 | minutes."'], [1.9, 1.4, 'sagittarius', 'you said that | an hour ago.']] }),
    { dur: 3.6, set: (x, t) => dash(x, t, PAL.plum, { scroll: t * 200 }), front: (x, t, lt) => { dashFront(x, t); chat(x, 760, 720, lt, [['l', 'omw!! 5 min!', 0.5]], { k: Kp(lt, 0.02) }) },
      cast: { pisces: [[0, 330, 1210, 260]] }, mood: { pisces: 'wide' }, lines: [[1.3, 2.1, 'pisces', "I'm in | Pearland."]], stick: [[0.1, 3.3, 'MEANWHILE · ON 288', PINK]] },
    drv({ dur: 3.6, pal: PAL.plum, sign: 'MIDTOWN', sub: 'NEXT EXIT', speed: 80, jam: false, cast: { gemini: [at(320)], pisces: [at(760, CB)] }, cars: { gemini: '#f2c75c', pisces: '#8fe3ff' }, mood: { gemini: 'wide', pisces: 'wide' },
      lines: [[0.4, 1.3, 'gemini', 'is that...'], [2.0, 1.4, 'pisces', 'is that | my date?']], stick: [[0.1, 1.1, '★ TWIST', GOLD]] }),
    { dur: 3.8, set: (x, t) => { night2(x, t, PAL.plum); coffeeShop(x, 540, FLOOR - 200) }, cast: { gemini: [[0, 330, Y, 240]], pisces: [[0, 750, Y, 240]] }, mood: { gemini: lt => lt > 2 ? 'happy' : 'wink', pisces: 'heart' },
      lines: [[0.3, 1.4, 'gemini', '"5 minutes," | huh?'], [2.0, 1.5, 'pisces', 'from | Pearland.']] },
    lessonScene(3.6, PAL.plum, 'say the real ETA. | they will wait.', { gemini: [[0, 400, Y, 240]], pisces: [[0, 680, Y, 240]] }, { gemini: 'heart', pisces: 'heart' }),
  ],
})

// ── hst456 · Taurus will never take the freeway. (feeder road vs freeway)
const fdr = o => ({ ...o, set: (x, t, lt) => { feeder(x, t, o.pal, { scroll: t * (o.speed ?? 40) }); o.set2?.(x, t, lt) }, front: (x, t, lt, P) => { for (const [id, col] of Object.entries(o.cars || {})) rideP(x, P, id, col, t, { brake: o.brake ?? 0 }); o.front?.(x, t, lt, P) } })
const UP = 870 - SEAT * S2 * 0.8, upSeat = cx => [0, cx, UP, 190]
const feederRun = skit({
  hook: 'Taurus will never | take the freeway', close: 'Feeder road to Jan 9.', endStars: ['taurus', 'aries', 'libra', 'cancer'],
  scenes: [
    fdr({ dur: 3.4, pal: PAL.gold, cast: { aries: [upSeat(780)], taurus: [at(300)] }, cars: { aries: '#e0503a', taurus: '#c98e4a' }, mood: { aries: 'sparkle', taurus: 'happy' }, hops: { taurus: [0.05, 0.6], aries: [0.15] },
      lines: [[0.3, 1.4, 'aries', 'race you | to Montrose!'], [1.9, 1.4, 'taurus', 'feeder road. | always.']] }),
    fdr({ dur: 3.4, pal: PAL.gold, speed: 0, set2: (x, t) => stand(x, 760, FLOOR + 40, 'TACOS'), cast: { taurus: [at(300)] }, cars: { taurus: '#c98e4a' }, mood: { taurus: 'heart' },
      front: (x, t) => taco(x, 420, 1060, 1.2), lines: [[0.3, 2.8, 'taurus', 'breakfast | taco stop.']] }),
    fdr({ dur: 3.4, pal: PAL.gold, speed: 0, brake: 1, cast: { aries: [upSeat(540)] }, cars: { aries: '#e0503a' }, mood: { aries: 'wide' }, front: (x, t) => stamp(x, 'FREEWAY: STOPPED', BRAKE),
      lines: [[0.3, 2.8, 'aries', 'why is it | STOPPED?!']] }),
    fdr({ dur: 3.4, pal: PAL.gold, speed: 0, set2: (x, t) => stand(x, 760, FLOOR + 40, 'RASPAS', '#5ec8ff'), cast: { taurus: [at(300)] }, cars: { taurus: '#c98e4a' }, mood: { taurus: 'sparkle' },
      lines: [[0.3, 2.8, 'taurus', 'raspa stand. | obviously.']] }),
    fdr({ dur: 3.2, pal: PAL.dusk, speed: 0, brake: 1, cast: { aries: [upSeat(540)] }, cars: { aries: '#e0503a' }, mood: { aries: 'squint' },
      lines: [[0.3, 2.6, 'aries', 'I can SEE | the exit!']] }),
    { dur: 3.6, set: (x, t) => mural(x, t), cast: { taurus: [[0, 320, Y, 240]], aries: [[0, 1250, Y, 240], [1.6, 760, Y, 240]] }, mood: { taurus: 'happy', aries: 'wide' },
      lines: [[0.3, 1.2, 'taurus', 'oh hey.'], [1.8, 1.5, 'aries', 'HOW?!']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.6, set: (x, t) => mural(x, t), cast: { taurus: [[0, 320, Y, 240]], aries: [[0, 760, Y, 240]] }, mood: { taurus: 'wink', aries: 'heart' },
      front: (x, t) => taco(x, 540, 1180, 1.3), lines: [[0.3, 1.5, 'taurus', 'slow is | a route too.'], [2.0, 1.3, 'taurus', 'taco?']] },
    lessonScene(3.6, PAL.gold, 'your pace | is a real pace.', { taurus: [[0, 400, Y, 240]], aries: [[0, 680, Y, 240]] }, { taurus: 'heart', aries: 'heart' }),
  ],
})

// ── hst457 · Missed your exit? Aries has a plan. (chiptune game levels)
const uturn = skit({
  hook: 'Missed your exit? | Aries has a plan.', close: 'Final level: Jan 9.', endStars: ['aries', 'leo', 'virgo', 'aquarius'],
  cues: [['pop', 6.9, 1318, 0.02, 0], ['pop', 13.7, 1318, 0.02, 0]],
  scenes: [
    drv({ dur: 3.4, pal: PAL.lime, sign: 'BETA PARTY', sub: 'EXIT JAN 9', speed: 260, jam: false, cast: { aries: [[0, 200, CA - SEAT * S2, 230], [2.8, 1300, CA - SEAT * S2, 230]] }, cars: { aries: '#e0503a' }, mood: { aries: lt => lt > 1.4 ? 'wide' : 'sparkle' }, hops: { aries: [0.05, 0.5] },
      lines: [[0.3, 1.1, 'aries', 'my exit!'], [1.5, 1.2, 'aries', 'wait—']], stick: [[0.1, 3.2, 'LEVEL 1', MINT]] }),
    drv({ dur: 3.4, pal: PAL.lime, sign: 'TEXAS U-TURN', sub: 'NEXT LIGHT', speed: 100, jam: false, cast: { aries: [at(300), [1.4, 760, CA - SEAT * S2, 230], [2.4, 300, CB - SEAT * S2, 230]] }, cars: { aries: '#e0503a' }, mood: { aries: 'sparkle' },
      front: (x, t, lt) => { if (lt > 1.4) sparkles(x, t, 540, 1300, t - lt + 1.4, 10, 300, 4) }, lines: [[0.3, 1.1, 'aries', 'Texas | U-turn!']], stick: [[1.4, 1.8, 'POWER-UP', GOLD]] }),
    drv({ dur: 3.4, pal: PAL.lime, sign: 'BETA PARTY', sub: 'EXIT JAN 9', speed: 260, jam: false, cast: { aries: [[0, 200, CA - SEAT * S2, 230], [2.6, 1300, CA - SEAT * S2, 230]], leo: [at(760, CB)] }, cars: { aries: '#e0503a', leo: '#ffb347' }, mood: { aries: 'wide', leo: 'wink' },
      lines: [[0.3, 1.1, 'aries', 'AGAIN?!'], [1.6, 1.5, 'leo', 'nice loop, | Aries.']], stick: [[0.1, 3.2, 'LEVEL 2', MINT]] }),
    drv({ dur: 3.2, pal: PAL.lime, sign: 'TEXAS U-TURN', sub: 'NEXT LIGHT', speed: 100, jam: false, cast: { aries: [at(300), [1.2, 760, CA - SEAT * S2, 230], [2.2, 300, CB - SEAT * S2, 230]] }, cars: { aries: '#e0503a' }, mood: { aries: 'squint' },
      lines: [[0.3, 1.0, 'aries', 'I AM | the U-turn.']], stick: [[1.2, 1.8, 'COMBO x2', GOLD]] }),
    drv({ dur: 3.8, pal: PAL.lime, sign: 'BETA PARTY', sub: 'EXIT JAN 9', speed: 40, jam: false, cast: { aries: [at(360)], virgo: [at(800, CB)] }, cars: { aries: '#e0503a', virgo: '#7dbf5a' }, mood: { aries: 'squint', virgo: 'squint' },
      front: (x, t, lt, P) => blinker(x, P, 'aries', t), lines: [[0.3, 1.5, 'virgo', 'try: slow down. | signal.'], [2.1, 1.4, 'aries', 'slow?! | ...ok.']], stick: [[0.1, 1.2, 'LEVEL 3', MINT]] }),
    drv({ dur: 3.6, pal: PAL.gold, sign: 'BETA PARTY', sub: 'EXIT JAN 9', speed: 40, jam: false, cast: { aries: [at(360), [1.0, 360, CA - SEAT * S2, 230], [2.4, 900, CA - SEAT * S2 - 260, 180]] }, cars: { aries: '#e0503a' }, mood: { aries: 'heart' },
      front: (x, t, lt, P) => { blinker(x, P, 'aries', t); if (lt > 2.2) sparkles(x, t, 800, 1000, t - lt + 2.2, 12, 260, 5) }, lines: [[0.3, 1.2, 'aries', 'blinker on...']], stick: [[2.2, 1.4, 'EXIT MADE!', GOLD]] }),
    { dur: 3.6, set: (x, t, lt) => { night2(x, t, PAL.night); bigText(x, lt, ['HIGH SCORE', 'patience: unlocked'], { y: 760, col: MINT, size: 100 }) }, cast: { aries: [[0, 540, Y, 270]] }, mood: { aries: 'sparkle' }, hops: { aries: [0.3, 1.2, 2.0] },
      lines: [[1.4, 2.0, 'aries', 'took 3 tries. | worth it.']] },
    lessonScene(3.6, PAL.lime, 'slow down. | that is how | you arrive.'.replace(' | you arrive.', ' you arrive.'), { aries: [[0, 400, Y, 240]], virgo: [[0, 680, Y, 240]] }, { aries: 'heart', virgo: 'happy' }),
  ],
})

// ── hst458 · Cancer packed snacks for a 12-minute drive (Beltway 8 carpool)
const VAN = ['cancer', 'virgo', 'sagittarius'], vanCast = (cx, cy = 1300) => Object.fromEntries(VAN.map((id, i) => [id, [[0, cx - 170 + i * 170, cy - 95, 170]]]))
const vn = o => ({ ...o, cast: { ...vanCast(o.vx ?? 480), ...(o.extra || {}) }, set: (x, t, lt) => { road(x, t, o.pal, { num: o.num, scroll: (o.speed ?? 0) * t, sign: o.sign, sub: o.sub }); jam(x, t, 1185, JAM, { s: 0.55, speed: o.speed ? 6 : 0 }) }, front: (x, t, lt, P) => { van(x, o.vx ?? 480, 1300, '#5ec8ff'); o.front?.(x, t, lt, P) } })
const snacks = skit({
  hook: 'Cancer packed snacks | for a 12-minute drive', close: 'Pack snacks. Jan 9.', endStars: ['cancer', 'virgo', 'sagittarius', 'aries'],
  scenes: [
    { dur: 3.4, set: (x, t) => { sky(x, PAL.mint); houses(x, FLOOR + 40, t); ground(x, PAL.mint) }, front: (x, t) => { box(x, 620, 1200, 240, 130, '#ff8fb1', 7); box(x, 600, 1180, 280, 30, BONE, 5) },
      cast: { cancer: [[0, 360, Y, 250]], sagittarius: [[0, 1250, Y, 210], [0.8, 900, Y, 210]] }, mood: { cancer: 'heart', sagittarius: 'wide' }, hops: { cancer: [0.05, 0.6] },
      lines: [[0.3, 1.6, 'cancer', 'you need | a cooler. trust.'], [2.1, 1.2, 'sagittarius', 'for 12 | minutes?']] },
    vn({ dur: 3.4, pal: PAL.mint, sign: 'BELTWAY 8', sub: '12 MIN', speed: 120, lines: [[0.3, 1.4, 'virgo', 'we do not | need snacks.'], [2.0, 1.2, 'cancer', 'mm-hm.']], mood: { cancer: 'wink', virgo: 'squint', sagittarius: 'happy' } }),
    vn({ dur: 3.4, pal: PAL.dusk, sign: 'BELTWAY 8', sub: '12 MIN', speed: 0, front: (x, t) => stamp(x, '1 HR LATER', BRAKE), mood: { cancer: 'happy', virgo: 'sleepy', sagittarius: 'wide' }, lines: [[0.4, 2.6, 'sagittarius', 'so... | about those | snacks.']] }),
    vn({ dur: 3.4, pal: PAL.dusk, speed: 0, front: (x, t, lt) => { const k = Kp(lt, 0.3); if (k > 0) kolache(x, 310, 1100, k * 1.2) }, mood: { cancer: 'heart', virgo: 'wide', sagittarius: 'heart' }, lines: [[0.4, 1.3, 'cancer', 'kolache?'], [1.9, 1.4, 'virgo', "it's still | warm?!"]] }),
    vn({ dur: 3.4, pal: PAL.dusk, speed: 0, mood: { cancer: 'wink', virgo: 'heart', sagittarius: 'sparkle' }, lines: [[0.3, 1.5, 'cancer', 'grapes. tacos. | wet wipes.'], [2.0, 1.2, 'virgo', 'marry me.']] }),
    vn({ dur: 3.8, pal: PAL.night, speed: 0, vx: 420, extra: { aries: [at(900, CB)] }, front: (x, t, lt, P) => { rideP(x, P, 'aries', '#e0503a', t, { brake: 1 }) }, mood: { cancer: 'heart', virgo: 'happy', sagittarius: 'happy', aries: 'wide' },
      lines: [[0.4, 1.4, 'aries', 'is that... | a kolache?'], [2.1, 1.4, 'cancer', 'take two, | baby.']], stick: [[0.1, 3.4, '★ TWIST: CANCER FEEDS THE FREEWAY', GOLD]] }),
    lessonScene(3.6, PAL.mint, 'care looks like | packed snacks.', { cancer: [[0, 400, Y, 240]], aries: [[0, 680, Y, 240]] }, { cancer: 'heart', aries: 'heart' }),
  ],
})

// ── hst459 · Scorpio knows a shortcut. Don't ask. (night, the Heights side streets, the bayou bats)
const shortcut = skit({
  hook: "Scorpio knows a shortcut. | Don't ask.", close: 'Shortcut to Jan 9.', endStars: ['scorpio', 'aquarius', 'gemini', 'pisces'],
  scenes: [
    drv({ dur: 3.4, pal: PAL.plum, num: '610', speed: 0, jamSpeed: 0, cast: { scorpio: [at(420)] }, cars: { scorpio: '#6a3ab0' }, mood: { scorpio: 'wink' }, hops: { scorpio: [0.05, 0.6] },
      lines: [[0.3, 2.8, 'scorpio', 'hold on. | I know a way.']] }),
    { dur: 3.4, set: (x, t) => { sky(x, PAL.plum); houses(x, FLOOR - 60, t); x.fillStyle = '#2a2638'; x.fillRect(0, FLOOR - 60, 1080, 500); ground(x, PAL.plum, FLOOR + 440) },
      front: (x, t, lt, P) => rideP(x, P, 'scorpio', '#6a3ab0', t), cast: { scorpio: [[0, -200, CA - SEAT * S2, 230], [2.6, 1300, CA - SEAT * S2, 230]] }, mood: { scorpio: 'wink' },
      lines: [[0.3, 2.4, 'scorpio', "you didn't | see this."]] },
    { dur: 3.4, set: (x, t) => parkingLot(x, t, PAL.plum, { trees: [180] }), front: (x, t, lt, P) => rideP(x, P, 'scorpio', '#6a3ab0', t), cast: { scorpio: [[0, 1300, 1500 - SEAT * S2, 230], [2.8, -200, 1500 - SEAT * S2, 230]] }, mood: { scorpio: 'squint' },
      lines: [[0.3, 2.2, 'scorpio', 'through the lot. | slowly.']] },
    { dur: 3.6, set: (x, t) => { bayou(x, t, PAL.dusk); bats(x, t) }, front: (x, t, lt, P) => rideP(x, P, 'scorpio', '#6a3ab0', t), cast: { scorpio: [at(540, 1500)] }, mood: { scorpio: 'heart' },
      lines: [[0.3, 2.8, 'scorpio', 'the bats | approve.']], stick: [[0.2, 1.6, 'BAYOU · SUNSET', GOLD]] },
    { dur: 3.8, set: (x, t) => { night2(x, t, PAL.night); coffeeShop(x, 540, FLOOR - 220) }, front: (x, t, lt, P) => { rideP(x, P, 'scorpio', '#6a3ab0', t); rideP(x, P, 'aquarius', '#5ee0ff', t, { flip: true }) },
      cast: { scorpio: [[0, -200, 1500 - SEAT * S2, 230], [1.0, 280, 1500 - SEAT * S2, 230]], aquarius: [[0, 1300, 1500 - SEAT * S2, 230], [1.0, 800, 1500 - SEAT * S2, 230]] }, mood: { scorpio: 'wide', aquarius: 'wide' },
      lines: [[1.2, 1.3, 'aquarius', 'you know | this way?'], [2.5, 1.2, 'scorpio', 'YOU know | this way?']], stick: [[0.1, 1.0, '★ TWIST', PINK]] },
    { dur: 3.8, set: (x, t) => { night2(x, t, PAL.night); coffeeShop(x, 540, FLOOR - 220) }, front: (x, t, lt) => chat(x, 540, 860, lt, [['l', 'trade shortcuts?', 0.3], ['r', 'only with you.', 1.4]], { k: Kp(lt, 0.1) }),
      cast: { scorpio: [[0, 200, Y + 40, 220]], aquarius: [[0, 880, Y + 40, 220]] }, mood: { scorpio: 'heart', aquarius: 'heart' } },
    lessonScene(3.6, PAL.plum, 'let someone | into your world.', { scorpio: [[0, 400, Y, 240]], aquarius: [[0, 680, Y, 240]] }, { scorpio: 'heart', aquarius: 'heart' }, (x, t) => bats(x, t, 8)),
  ],
})

// ── hst460 · Leo vs. the Westheimer bumps
const wh = (o) => ({ ...o, set: (x, t, lt) => { sky(x, o.pal); skyline(x, FLOOR - 160, t, { col: o.pal.city }); freeway(x, FLOOR - 160, 600, 2, t * 80); x.fillStyle = o.pal.ground; x.fillRect(0, FLOOR + 440, 1080, 480); streetSign(x, 760, 640, 'WESTHEIMER', { pole: false }); for (let k = 0; k < 4; k++) { const bx = ((k * 300 - t * 80) % 1200 + 1200) % 1200 - 60; box(x, bx, FLOOR + 140, 80, 14, '#4a4656', 3) } },
  front: (x, t, lt, P) => { rideP(x, P, 'leo', '#ffb347', t, { bump: Math.abs(Math.sin(lt * (o.shake ?? 9))) * (o.amp ?? 30) }); hair(x, P, 'leo', o.mess ?? 0) }, cast: { leo: [at(360)], ...(o.cast || {}) } })
const bumps = skit({
  hook: 'Leo vs. the | Westheimer bumps', close: 'Come as you are. Jan 9.', endStars: ['leo', 'sagittarius', 'libra', 'taurus'],
  scenes: [
    { dur: 3.2, set: (x, t) => dash(x, t, PAL.noon, { scroll: t * 200 }), front: (x, t, lt, P) => { dashFront(x, t, { mirror: 'MIRROR' }); hair(x, P, 'leo', 0) }, cast: { leo: [[0, 330, 1210, 260]] }, mood: { leo: 'sparkle' }, hops: { leo: [0.05, 0.5] },
      lines: [[0.3, 2.6, 'leo', 'you see | this hair? | perfect.']] },
    wh({ dur: 3.2, pal: PAL.noon, mess: 0.15, amp: 18, mood: { leo: 'happy' }, lines: [[0.3, 2.6, 'leo', 'bump one. | fine.']] }),
    wh({ dur: 3.2, pal: PAL.noon, mess: 0.45, amp: 30, mood: { leo: 'squint' }, lines: [[0.3, 2.6, 'leo', 'bump two. | still fine.']] }),
    wh({ dur: 3.4, pal: PAL.gold, mess: 1, amp: 46, shake: 14, mood: { leo: 'wide' }, lines: [[0.3, 2.8, 'leo', 'ALL | the bumps.']], stick: [[0.2, 2.4, 'WESTHEIMER: 1 · LEO: 0', BRAKE]] }),
    { dur: 3.4, set: (x, t) => { night2(x, t, PAL.dusk); coffeeShop(x, 760, FLOOR + 60) }, front: (x, t, lt, P) => hair(x, P, 'leo', 1), cast: { leo: [[0, 320, Y, 250]] }, mood: { leo: 'wide' },
      lines: [[0.3, 2.6, 'leo', "don't | look at me."]] },
    { dur: 3.8, set: (x, t) => { night2(x, t, PAL.dusk); coffeeShop(x, 760, FLOOR + 60) }, front: (x, t, lt, P) => hair(x, P, 'leo', 1), cast: { leo: [[0, 320, Y, 250]], sagittarius: [[0, 1250, Y, 240], [0.6, 760, Y, 240]] }, mood: { leo: lt => lt > 2.4 ? 'heart' : 'wide', sagittarius: 'heart' },
      lines: [[0.8, 1.4, 'sagittarius', 'wait. | I LOVE this.'], [2.4, 1.2, 'leo', 'you... | do?']], stick: [[0.1, 1.0, '★ TWIST', PINK]] },
    { dur: 3.4, set: (x, t) => { night2(x, t, PAL.dusk); coffeeShop(x, 760, FLOOR + 60) }, front: (x, t, lt, P) => hair(x, P, 'leo', 1), cast: { leo: [[0, 320, Y, 250]], sagittarius: [[0, 760, Y, 240]] }, mood: { leo: 'sparkle', sagittarius: 'heart' },
      lines: [[0.3, 2.6, 'leo', "it's a look | now."]], stick: [[0.2, 2.8, 'NEW LOOK: WESTHEIMER', GOLD]] },
    lessonScene(3.6, PAL.dusk, 'they like you, | not just the hair.', { leo: [[0, 400, Y, 240]], sagittarius: [[0, 680, Y, 240]] }, { leo: 'heart', sagittarius: 'heart' }),
  ],
})
bumps.scenes[7].front = (x, t, lt, P) => { lesson(x, t, lt, 'they like you, | not just the hair.'); hair(x, P, 'leo', 1) }

// ── hst461 · POV: you cry on the Gulf Freeway (Pisces to Galveston)
const gulf = skit({
  hook: 'POV: you cry | on the Gulf Freeway', close: 'Bring tissues. Jan 9.', endStars: ['pisces', 'cancer', 'aries', 'scorpio'],
  scenes: [
    drv({ dur: 3.4, pal: PAL.dusk, num: '45', speed: 120, jam: false, sun: true, cast: { pisces: [at(420)] }, cars: { pisces: '#8fe3ff' }, mood: { pisces: 'heart' }, hops: { pisces: [0.05, 0.6] },
      front: (x, t) => notes(x, t, 420, 1050, { n: 5 }), lines: [[0.3, 2.8, 'pisces', 'this song. | this sunset.']] }),
    drv({ dur: 3.4, pal: PAL.dusk, num: '45', speed: 120, jam: false, cast: { pisces: [at(320)], aries: [at(800, CB)] }, cars: { pisces: '#8fe3ff', aries: '#e0503a' }, mood: { pisces: 'heart', aries: 'wide' },
      lines: [[0.3, 1.3, 'aries', 'you ok?!'], [1.8, 1.4, 'pisces', 'happy | tears!']] }),
    drv({ dur: 3.4, pal: PAL.gold, sign: 'GALVESTON', sub: 'KEEP LEFT', speed: 160, jam: false, cast: { pisces: [at(420)] }, cars: { pisces: '#8fe3ff' }, mood: { pisces: 'sparkle' },
      lines: [[0.3, 2.8, 'pisces', 'the beach! | almost!']] }),
    { dur: 3.6, set: (x, t) => beach(x, t, PAL.gold), cast: { pisces: [[0, 540, Y + 140, 260]] }, mood: { pisces: 'wide' }, lines: [[0.3, 2.9, 'pisces', 'the water | is... brown.']] },
    { dur: 3.6, set: (x, t) => beach(x, t, PAL.gold), cast: { pisces: [[0, 540, Y + 140, 260]] }, mood: { pisces: 'heart' }, hops: { pisces: [1.0, 1.6, 2.2] },
      lines: [[0.3, 2.9, 'pisces', 'and I | LOVE it.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] },
    { dur: 3.6, set: (x, t) => beach(x, t, PAL.dusk), front: (x, t, lt) => { if (lt > 0.8) { box(x, 300, 1440, 480, 60, '#ff8fb1', 6) } }, cast: { pisces: [[0, 400, Y + 140, 240]], cancer: [[0, 1250, Y + 140, 240], [0.7, 700, Y + 140, 240]] }, mood: { pisces: 'heart', cancer: 'heart' },
      lines: [[0.9, 1.4, 'cancer', 'there’s my | crier.'], [2.4, 1.1, 'pisces', 'hi!!']] },
    { dur: 3.4, set: (x, t) => beach(x, t, PAL.dusk), cast: { pisces: [[0, 400, Y + 140, 240]], cancer: [[0, 700, Y + 140, 240]] }, mood: { pisces: 'heart', cancer: 'happy' },
      lines: [[0.3, 2.8, 'cancer', 'brown water. | big heart.']], stick: [[0.2, 2.8, 'GALVESTON: PERFECT', GOLD]] },
    lessonScene(3.6, PAL.dusk, "love what's | actually there.", { pisces: [[0, 400, Y, 240]], cancer: [[0, 680, Y, 240]] }, { pisces: 'heart', cancer: 'heart' }),
  ],
})

// ── hst462 · Capricorn left at 4am to beat traffic
const sunrise = { top: '#3a4a9a', bot: '#ffb07a', city: '#2a2a5a', ground: '#4a4060' }
const early = skit({
  hook: 'Capricorn left at 4am | to beat traffic', close: 'Arrive early. Jan 9.', endStars: ['capricorn', 'aries', 'virgo', 'gemini'],
  scenes: [
    { dur: 3.2, set: (x, t) => { x.fillStyle = '#141030'; x.fillRect(0, 0, 1080, 1920); x.fillStyle = '#221b48'; x.fillRect(0, FLOOR + 60, 1080, 800); clock(x, 540, 720, Math.floor(t * 2) % 2 ? '3:58' : '3:58 AM', BRAKE) },
      cast: { capricorn: [[0, 540, Y, 260]] }, mood: { capricorn: 'squint' }, hops: { capricorn: [0.05, 0.4, 0.8] }, lines: [[0.4, 2.5, 'capricorn', 'meeting at 9. | leaving now.']] },
    drv({ dur: 3.2, pal: PAL.night, num: '10', speed: 300, jam: false, cast: { capricorn: [at(420)] }, cars: { capricorn: '#3a9a6a' }, mood: { capricorn: 'sparkle' }, front: (x, t) => stamp(x, '4:12 AM', MINT),
      lines: [[0.3, 2.6, 'capricorn', 'empty freeway. | as planned.']] }),
    { dur: 3.2, set: (x, t) => parkingLot(x, t, PAL.night, { trees: [880] }), front: (x, t, lt, P) => { rideP(x, P, 'capricorn', '#3a9a6a', t); stamp(x, '4:40 AM', MINT) }, cast: { capricorn: [at(420, 1520)] }, mood: { capricorn: 'happy' },
      lines: [[0.3, 2.6, 'capricorn', 'four hours | early. good.']] },
    { dur: 3.2, set: (x, t) => parkingLot(x, t, PAL.dawn, { trees: [880] }), front: (x, t, lt, P) => { rideP(x, P, 'capricorn', '#3a9a6a', t); stamp(x, '4:58 AM', MINT) }, cast: { capricorn: [at(420, 1520)] }, mood: { capricorn: 'sleepy' },
      lines: [[0.3, 2.6, 'capricorn', 'very | early.']] },
    { dur: 3.6, set: (x, t) => parkingLot(x, t, sunrise, { trees: [880] }), front: (x, t, lt, P) => rideP(x, P, 'capricorn', '#3a9a6a', t), cast: { capricorn: [at(420, 1520)], aries: [[0, 1300, 1180, 200], [1.2, 760, 1180, 200], [3.4, -200, 1180, 200]] }, mood: { capricorn: 'wide', aries: 'sparkle' },
      lines: [[1.0, 1.5, 'aries', 'morning! | loop two!']], stick: [[0.1, 1.0, '★ TWIST', PINK]] },
    { dur: 3.8, set: (x, t) => { sky(x, sunrise); heatSun(x, 540, FLOOR - 40, t, 120); ground(x, sunrise, FLOOR + 60) }, cast: { capricorn: [[0, 380, Y, 240]], aries: [[0, 1250, Y, 230], [0.6, 720, Y, 230]] }, mood: { capricorn: 'heart', aries: 'heart' },
      lines: [[0.7, 1.4, 'aries', 'you up | this early too?'], [2.3, 1.3, 'capricorn', 'always.']] },
    { dur: 3.4, set: (x, t) => { sky(x, sunrise); heatSun(x, 540, FLOOR - 140, t, 120); ground(x, sunrise, FLOOR + 60) }, cast: { capricorn: [[0, 380, Y, 240]], aries: [[0, 720, Y, 230]] }, mood: { capricorn: 'happy', aries: 'wink' },
      lines: [[0.3, 2.8, 'aries', 'same time | tomorrow?']], stick: [[0.2, 2.8, '5 AM · EVERY DAY SINCE', GOLD]] },
    lessonScene(3.6, sunrise, 'early people | find each other.', { capricorn: [[0, 400, Y, 240]], aries: [[0, 680, Y, 240]] }, { capricorn: 'heart', aries: 'heart' }),
  ],
})

// ── hst463 · If you drive for fun, this is your sign (Sagittarius on the "third loop")
const thirdLoop = skit({
  hook: 'If you drive for fun, | this is your sign', close: 'Road trip to Jan 9.', endStars: ['sagittarius', 'libra', 'taurus', 'aquarius'],
  scenes: [
    drv({ dur: 3.4, pal: PAL.lime, speed: 200, jam: false, sign: 'GRAND PKWY', sub: 'ALL OF IT', cast: { sagittarius: [at(400)] }, cars: { sagittarius: '#c9a6ff' }, mood: { sagittarius: 'sparkle' }, hops: { sagittarius: [0.05, 0.6] },
      lines: [[0.3, 2.8, 'sagittarius', 'no plans? | perfect.']] }),
    { dur: 3.4, set: (x, t) => dash(x, t, PAL.lime, { scroll: t * 300 }), front: (x, t, lt) => { dashFront(x, t); gps(x, 780, 760, '???', t, { col: '#c9a6ff', note: 'TO:' }) }, cast: { sagittarius: [[0, 330, 1210, 260]] }, mood: { sagittarius: 'wink' },
      lines: [[0.3, 2.8, 'sagittarius', 'the third | loop. all | of it.']] },
    drv({ dur: 3.2, pal: PAL.lime, speed: 200, jam: false, set2: (x) => streetSign(x, 760, 700, 'KATY', { pole: false }), cast: { sagittarius: [at(400)] }, cars: { sagittarius: '#c9a6ff' }, mood: { sagittarius: 'happy' },
      lines: [[0.3, 2.6, 'sagittarius', 'hi, | everyone’s cousin!']], stick: [[0.1, 2.8, 'STOP 1: KATY', GOLD]] }),
    drv({ dur: 3.2, pal: PAL.gold, speed: 200, jam: false, set2: (x) => streetSign(x, 760, 700, 'THE WOODLANDS', { pole: false }), cast: { sagittarius: [at(400)] }, cars: { sagittarius: '#c9a6ff' }, mood: { sagittarius: 'wink' },
      lines: [[0.3, 2.6, 'sagittarius', 'technically | Houston!']], stick: [[0.1, 2.8, 'STOP 2', GOLD]] }),
    { dur: 3.2, set: (x, t) => { night2(x, t, PAL.dusk); stand(x, 760, FLOOR + 60, 'KOLACHES', GOLD) }, front: (x) => kolache(x, 330, 1020, 1.1), cast: { sagittarius: [[0, 330, Y, 240]] }, mood: { sagittarius: 'heart' },
      lines: [[0.3, 2.6, 'sagittarius', 'snack stop. | the sweet one.']], stick: [[0.1, 2.8, 'STOP 3', GOLD]] },
    drv({ dur: 3.4, pal: PAL.night, speed: 200, jam: false, cast: { sagittarius: [at(400)] }, cars: { sagittarius: '#c9a6ff' }, mood: { sagittarius: 'sleepy' }, front: (x) => stamp(x, '9:30 PM', MINT),
      lines: [[0.3, 2.8, 'sagittarius', 'and... | back home.']] }),
    { dur: 3.8, set: (x, t) => { sky(x, PAL.night); houses(x, FLOOR + 40, t); ground(x, PAL.night) }, cast: { sagittarius: [[0, 1250, Y, 240], [0.5, 720, Y, 240]], libra: [[0, 330, Y, 240]] }, mood: { sagittarius: 'happy', libra: lt => lt > 2.4 ? 'heart' : 'squint' },
      lines: [[0.6, 1.2, 'libra', 'where were | you?'], [1.9, 0.9, 'sagittarius', 'everywhere.'], [2.9, 0.9, 'libra', 'take me | next time.']], stick: [[0.1, 1.0, '★ TWIST', PINK]] },
    lessonScene(3.6, PAL.night, 'sometimes the drive | is the date.', { sagittarius: [[0, 400, Y, 240]], libra: [[0, 680, Y, 240]] }, { sagittarius: 'heart', libra: 'heart' }),
  ],
})

// ── hst464 · Stuck on 288? Aquarius started a sing-along.
const choirCars = { aquarius: '#5ee0ff', leo: '#ffb347', capricorn: '#3a9a6a', taurus: '#c98e4a' }
const ch = o => drv({ pal: PAL.teal, num: '288', speed: 0, jamSpeed: 0, ...o, front: (x, t, lt, P) => { if (o.notes) for (const id of Object.keys(o.cast)) { const [cx, cy] = P.at(id); notes(x, t, cx, cy - 150, { n: 3 }) } o.front2?.(x, t, lt, P) } })
const choir = skit({
  hook: 'Stuck on 288? | Aquarius started a choir.', close: 'The real party: Jan 9.', endStars: ['aquarius', 'capricorn', 'leo', 'taurus'],
  scenes: [
    ch({ dur: 3.4, cast: { aquarius: [at(420)] }, cars: { aquarius: choirCars.aquarius }, mood: { aquarius: 'squint' }, hops: { aquarius: [0.05, 0.6] }, lines: [[0.3, 2.8, 'aquarius', 'stuck? | you too?']] }),
    ch({ dur: 3.4, cast: { aquarius: [at(420)] }, cars: { aquarius: choirCars.aquarius }, mood: { aquarius: 'sparkle' }, lines: [[0.3, 2.8, 'aquarius', 'ok. windows | down, everyone.']] }),
    ch({ dur: 3.4, notes: true, cast: { aquarius: [at(300)], leo: [at(780, CB)] }, cars: { aquarius: choirCars.aquarius, leo: choirCars.leo }, mood: { aquarius: 'happy', leo: 'sparkle' }, lines: [[0.3, 1.3, 'leo', 'what song?!'], [1.8, 1.4, 'aquarius', 'the slow one.']] }),
    ch({ dur: 3.4, notes: true, cast: { aquarius: [at(300)], capricorn: [at(780, CB)] }, cars: { aquarius: choirCars.aquarius, capricorn: choirCars.capricorn }, mood: { aquarius: 'happy', capricorn: 'squint' }, lines: [[0.3, 1.3, 'capricorn', 'I do not | sing.'], [1.9, 1.3, 'aquarius', 'you do | now.']] }),
    ch({ dur: 3.6, notes: true, cast: { aquarius: [at(250)], leo: [at(800)], taurus: [at(540, CB)] }, cars: choirCars, mood: { aquarius: 'happy', leo: 'sparkle', taurus: 'heart' }, lines: [[0.3, 2.6, 'taurus', 'this is | nice, actually.']], stick: [[0.2, 3.2, 'THE 288 CHOIR', GOLD]] }),
    ch({ dur: 3.8, notes: true, speed: 0, jamSpeed: 120, cast: { capricorn: [at(300)], aquarius: [at(780, CB)] }, cars: { capricorn: choirCars.capricorn, aquarius: choirCars.aquarius }, mood: { capricorn: 'heart', aquarius: 'wide' },
      lines: [[0.4, 1.3, 'aquarius', 'traffic’s | moving!'], [2.0, 1.5, 'capricorn', 'one more | verse.']], stick: [[0.1, 1.2, '★ TWIST', PINK]] }),
    lessonScene(3.6, PAL.teal, 'make it fun | where you are.', { aquarius: [[0, 400, Y, 240]], capricorn: [[0, 680, Y, 240]] }, { aquarius: 'heart', capricorn: 'heart' }, (x, t) => notes(x, t, 540, 1000, { n: 6 })),
  ],
})

export const W19T = { hst453: merge, hst454: gpsLied, hst455: fiveMin, hst456: feederRun, hst457: uturn, hst458: snacks, hst459: shortcut, hst460: bumps, hst461: gulf, hst462: early, hst463: thirdLoop, hst464: choir }
