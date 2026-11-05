// klne11: LONG DISTANCE NOTES, "A Day Apart: Paris to Montreal" (60 s vertical, star_advice post, jazzy · Eb). Long.
// Kit: ../../klne01/ldnkit.js. Paris (CET, UTC+1) ↔ Montreal (EST, UTC−5): Paris is 6 hours ahead. Hard cut.
//   0.0  frame 0: Paris 6 PM, ♉ Taurus mid-gasp, a croissant flying; Montreal noon, ♎ Libra mid-slip on the ice.
//        "Six hours behind and | *missing* you."  · 2.3 promise "a day apart. | the *ending,* though."
//   ch.1 SNOW FOR YOU (5.0)  Libra's snow photo lands in Taurus's evening; a sunset comes back
//   ch.2 THE MIX-UP  (16.0)  "sure." reads cold → THE STARS: tone gets lost in text. call. → "sure meant YES! I was on the bus."
//   ch.3 SAME SOUP   (27.0)  on a call, both cook the same soup: Taurus's dinner, Libra's lunch
//   ch.4 GOODNIGHT   (38.0)  Taurus's goodnight voice note plays in Montreal's dusk · THE STARS: rituals make distance smaller
//   ch.5 THE TABLE   (48.6)  three weeks later: a café table across the seam, the seam slides away, one table;
//        Pisces (the server) brings two croissants and cries.
//  57.4  "Six hours, | *one* table for two."
import { makeLDN, phone, card, fly, R, box, label, bubble, hearts, sparkles, drawBits, GOLD, INK, INTER, pop01, prog, lerp, ease } from '../../klne01/ldnkit.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { inSprite, tearsCells, starFrame } from '../../klde01/m23kit.js'

const C = { s: 5.0, m: 16.0, p: 27.0, g: 38.0, t: 48.6 }
const T = { snap: 5.6, snow: 6.2, sunset: 8.4, sure: 16.6, frown: 17.6, line1: 18.6, call: 22.0, yes: 22.8, laugh: 24.6, cook: 27.6, carrot: 29.4, done: 32.0, line2: 41.4, gn: 38.6, play: 40.0, later: 49.0, merge: [51.6, 53.0], serve: 53.6, last: 57.4 }
const ph = (txt, bg, art) => (x, px, py) => { card(x, px, py, 200, 170, bg, { rot: -0.05 }); art(x, px, py - 14); label(x, txt, px, py + 60, { size: 22, col: INK, font: INTER, weight: 800 }) }
const snowArt = (x, px, py) => { R(x, '#bfe2f2', px - 80, py - 50, 160, 80); for (let i = 0; i < 8; i++) R(x, '#ffffff', px - 70 + i * 20, py - 40 + (i % 3) * 22, 8, 8); R(x, '#ffffff', px - 80, py + 18, 160, 12) }
const sunArt = (x, px, py) => { R(x, '#ff9a6a', px - 80, py - 50, 160, 80); x.fillStyle = '#ffe58a'; x.beginPath(); x.arc(px, py + 20, 26, Math.PI, 0); x.fill() }
const pot = (x, cx, cy, t) => { box(x, cx - 80, cy - 50, 160, 100, '#5a5478', { b: 7 }); R(x, '#ff9a3a', cx - 70, cy - 46, 140, 16); for (let i = 0; i < 3; i++) { const p = ((t * 0.8 + i / 3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, '#ffffff', cx - 40 + i * 36 + 6 * Math.sin(t * 3 + i), cy - 70 - p * 120, 16, 24); x.restore() } }
const CROISSANT = ['..CCCC..', '.CDCCDC.', 'CCDCCDCC', '.CC..CC.']
const PIS = signStar('pisces')
const EP = makeLDN({
  id: 'klne11', len: 60, ending: 'cut', music: { style: 'jazzy', key: 'Eb', seed: 2331 },
  hook: 'Six hours behind and | *missing* you.',
  L: { sign: 'taurus', city: 'Paris', min0: 18 * 60 },
  R: { sign: 'libra', city: 'Montreal', offset: -360, weather: 'snow' },
  jumps: [[C.m - 0.4, 45], [C.p - 0.4, 60], [C.g - 0.4, 180]],
  sets: [[0, 'room', 'street', {}], [C.p - 0.2, 'room', 'room', {}], [C.t - 0.2, 'street', 'street', {}]],
  badgeAt: 0.6, gap: '6 HOURS APART', gapAt: 1.0, gapOut: [2.1, 2.3], hookOut: [2.0, 2.2],
  lines: [{ t: T.line1, text: 'tone gets lost in text. when it feels off, *call.*' }, { t: T.line2, text: 'little rituals make the distance *smaller.*' }],
  boxes: [{ from: 0, to: 1, close: 21.8 }, { from: 1, to: 2, close: 46.6 }],
  long: { promise: 'a day apart. | the *ending,* though.', promiseOut: 4.7, chapters: [{ t: C.s, text: 'SNOW FOR YOU' }, { t: C.m, text: 'THE MIX-UP' }, { t: C.p, text: 'SAME SOUP' }, { t: C.g, text: 'GOODNIGHT' }, { t: C.t, text: 'THE TABLE' }], merge: T.merge },
  pose(t, side) {
    const sit = ease.inOutCubic(prog(t, T.merge[0], T.merge[1]))
    if (side === 'L') {
      let mood = 'happy'
      if (t < 0.7) mood = 'wide'; else if (t < C.m) mood = t > T.snow ? 'sparkle' : 'neutral'
      else if (t < C.p) mood = t < T.frown ? 'neutral' : t < T.yes ? 'squint' : 'happy'
      else if (t > C.t) mood = t > T.serve ? 'heart' : 'sparkle'
      return { x: lerp(250, 400, sit), y: 1140, s: 250, mood, look: [1, 0], hops: [0, T.snow, T.sunset, T.call, T.laugh, T.cook, T.carrot, T.done, T.gn, T.serve], squash: t < 0.5 ? -0.12 : 0, free: t > T.merge[0],
        prop: (x, F) => { if (t > T.sure - 0.3 && t < C.p) phone(x, F.ox + 140, F.oy - F.base - 30, { s: 0.55, rot: 0.15, glow: 1, lines: t < T.call ? ['sure.'] : ['on a call'] }) } }
    }
    let mood = 'happy', rot = 0
    if (t < 0.8) mood = 'wide'; else if (t < C.m) mood = 'sparkle'
    else if (t < C.p) mood = t < T.yes ? 'neutral' : 'happy'
    else if (t > C.g && t < C.t) mood = t > T.play ? 'heart' : 'neutral'
    else if (t > C.t) mood = t > T.serve ? 'heart' : 'sparkle'
    return { x: lerp(820, 680, sit), y: 1140, s: 240, mood, look: [-1, 0], squash: t < 0.8 ? 0.14 * Math.sin(t * 18) : 0, hops: [0.2, T.snap, T.yes, T.laugh, T.carrot, T.play, T.serve], free: t > T.merge[0],
      prop: (x, F) => { if (t > T.snap - 0.3 && t < T.snap + 0.6) phone(x, F.ox - 140, F.oy - F.base - 60, { s: 0.5, rot: -0.15, glow: 1 }); void rot } }
  },
  draw(x, t, S) {
    if (t < 1.0) drawBits(x, CROISSANT, { C: '#e0a050', D: '#b87830' }, 350 + t * 120, 900 - t * 240, 14, { rot: t * 6 })
    if (t < 1.0) label(x, 'whoa!', 860, 900, { size: 46, col: '#cfeeff', font: INTER, weight: 800, rot: 0.15 })
    fly(x, t, T.snow - 0.4, T.snow + 0.7, 800, 900, 280, 880, ph('snow for you!', '#e8f0ff', snowArt))
    if (t > T.snow + 0.7 && t < C.m - 0.4) ph('snow for you!', '#e8f0ff', snowArt)(x, 280, 880)
    fly(x, t, T.sunset, T.sunset + 1.1, 280, 880, 800, 880, ph('sunset for you', '#ffd6e0', sunArt))
    if (t > T.sunset + 1.1 && t < C.m - 0.4) ph('sunset for you', '#ffd6e0', sunArt)(x, 800, 880)
    bubble(x, t, 270, 790, T.frown, T.call - 0.1, ['“sure.” …with a', 'PERIOD?'], { size: 30, col: '#ffd6e0' })
    if (t > T.call && t < C.p - 0.3) { x.save(); x.globalCompositeOperation = 'lighter'; x.strokeStyle = 'rgba(127,224,255,0.7)'; x.lineWidth = 8; x.setLineDash([24, 16]); x.lineDashOffset = -t * 120; x.beginPath(); x.moveTo(400, 1050); x.quadraticCurveTo(540, 980, 680, 1050); x.stroke(); x.restore() }
    bubble(x, t, 820, 780, T.yes, C.p - 0.4, ['sure meant YES!', 'I was on the bus.'], { size: 30 })
    if (t > T.laugh && t < C.p - 0.4) label(x, 'HA!', 330, 930, { size: 46, col: GOLD, font: INTER, weight: 800, rot: -0.1 })
    if (t > C.p - 0.2 && t < C.g - 0.4) { pot(x, 270, 1300, t); pot(x, 810, 1300, t); label(x, 'DINNER', 270, 1390, { size: 26, col: GOLD }); label(x, 'LUNCH', 810, 1390, { size: 26, col: GOLD }) }
    bubble(x, t, 820, 800, T.carrot, T.done, 'add the carrots!', { size: 32 })
    bubble(x, t, 270, 800, T.carrot + 1, T.done + 1.5, 'done! same minute!', { size: 30, col: '#ffe9a8' })
    hearts(x, t, T.done, 540, 1100, { n: 8, spread: 300 })
    fly(x, t, T.gn, T.gn + 1.1, 300, 900, 800, 900, (x2, px, py) => card(x2, px, py, 240, 90, '#ffffff', { text: '▶ goodnight ♡', size: 28 }))
    bubble(x, t, 820, 800, T.play, C.t - 0.4, ['it’s only 9 here.', 'still counts.'], { size: 30 })
    if (t > T.later - 0.1 && t < T.merge[0] + 0.2) { const k = pop01(t, T.later, 0.3, 2.4); x.save(); x.translate(540, 760); x.scale(k, k); card(x, 0, 0, 420, 90, GOLD, { text: '3 WEEKS LATER', size: 40, rot: -0.04 }); x.restore() }
    // the café table across the seam
    if (t > C.t - 0.2) { const k = pop01(t, C.t + 0.4, 0.35, 2); x.save(); x.translate(540, 1250); x.scale(k, k); box(x, -260, -24, 520, 36, '#f4ecd8', { b: 7 }); R(x, INK, -12, 12, 24, 160); R(x, INK, -90, 160, 180, 14); x.restore() }
    if (t > T.serve - 0.6) {
      const p = ease.outCubic(prog(t, T.serve - 0.6, T.serve)), px = lerp(1150, 900, p)
      const o = { color: PIS.color, glyph: PIS.glyph, mood: t > T.serve + 0.4 ? 'happy' : 'sparkle', look: [-1, 0], seed: 6, hops: [T.serve, T.serve + 0.6] }
      drawStarChar(x, px, 1060, 150, t, o); const F = starFrame(px, 1060, 150, t, o); inSprite(x, F, () => tearsCells(x, t, 3))
      drawBits(x, CROISSANT, { C: '#e0a050', D: '#b87830' }, 500, 1215, 10); drawBits(x, CROISSANT, { C: '#e0a050', D: '#b87830' }, 590, 1215, 10)
    }
    // Pisces also cries in Paris's window across the street in every chapter (a neighbour)
    if (t < T.merge[0]) S.clip('L', () => { const o = { color: PIS.color, glyph: PIS.glyph, mood: 'wide', look: [1, 0], seed: 6 }; drawStarChar(x, 470, 1250, 90, t, o); inSprite(x, starFrame(470, 1250, 90, t, o), () => tearsCells(x, t, 2)) })
    sparkles(x, t, 540, 1150, T.serve, 12, 220, 1)
  },
  last: { t: T.last, text: 'Six hours, | *one* table for two.', size: 88 },
  sections: { drop: 0.6, breakdown: [C.p], lift: [C.t], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES,
  ['whoosh', 0, 0.4, 0.04], ['tick', T.snap, 0.08], ...[T.snow - 0.4, T.sunset, T.gn].flatMap(a => [['whoosh', a, 0.5, 0.045], ['pop', a + 1.1, 1318.51, 0.045, 0]]),
  ['pop', T.sure, 440, 0.05, -0.3], ...[0, 0.6].flatMap(d => [['pop', T.call + d, 1318.51, 0.04, 0.3], ['pop', T.call + d + 0.12, 1046.5, 0.04, 0.3]]), ['pop', T.yes, 1567.98, 0.05, 0.3],
  ['pop', T.carrot, 987.77, 0.04, 0.3], ['bell', T.done, 1760, 0.04, 1, 0], ['pop', T.later, 880, 0.05, 0], ['pluck', T.serve, 659.25, 0.04, 0.5, 0.3], ['pluck', T.serve + 0.14, 587.33, 0.04, 0.5, 0.3]]
export const MUSIC = EP.music
