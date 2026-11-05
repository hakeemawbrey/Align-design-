// klne12: LONG DISTANCE NOTES, "A Day Apart: Auckland to Edinburgh" (60 s vertical, star_advice post, dreamy · F). Long.
// Kit: ../../klne01/ldnkit.js. Auckland (NZDT in summer, UTC+13) ↔ Edinburgh (GMT): Auckland is 13 hours ahead, so it
// reaches the new year 13 hours first. December: summer in Auckland, winter in Edinburgh. Hard cut.
//   0.0  frame 0: Auckland 8 AM, beach sun: ♒ Aquarius mid-cartwheel; Edinburgh 7 PM, snow: ♍ Virgo mid-sneeze in a scarf.
//        "Summer for you. | *Snow* for them."  · 2.3 promise "13 hours apart. two New Years. | *wait* for it."
//   ch.1 SWAP YOUR WEATHER (5.0)  a beach photo one way, a snow photo back
//   ch.2 A LIST FOR LATER (16.0)  THE STARS: plan something you'll do together · a "next year" list fills on the seam
//   ch.3 AUCKLAND MIDNIGHT (27.0) countdown on a call: Auckland's new year; Virgo cheers at 11 AM
//   ch.4 EDINBURGH MIDNIGHT (38.0) 13 hours later, Virgo alone in the snow with a sparkler · THE STARS: you can be there twice
//   ch.5 SURPRISE (48.6) 3-2-1 … the seam slides away: Aquarius is there. The hug in the snow. Pisces (Virgo's neighbour) sobs.
//  57.4  "Two New Years. | *One* hug."
import { makeLDN, card, fly, R, box, label, bubble, hearts, sparkles, drawBits, GOLD, INK, INTER, pop01, prog, lerp, ease } from '../../klne01/ldnkit.js'
import { countdown, countdownCues } from '../../hookkit.js'
import { confetti } from '../../klde01/m23kit.js'

const C = { w: 5.0, l: 16.0, a: 27.0, e: 38.0, s: 48.6 }
const T = { beach: 5.8, snow: 7.8, line1: 16.6, i1: 19.0, i2: 20.4, i3: 21.8, call: 27.6, cheer: 30.2, alone: 38.8, line2: 41.0, merge: [52.4, 53.8], hug: 54.0, last: 57.4 }
const CDA = { at: 28.2, from: 3, gap: 0.6, go: 'HAPPY NEW YEAR!', y: 820 }
const CDE = { at: 50.2, from: 3, gap: 0.6, go: null, y: 820 }
const ph = (txt, bg, art) => (x, px, py) => { card(x, px, py, 200, 170, bg, { rot: -0.05 }); art(x, px, py - 14); label(x, txt, px, py + 60, { size: 22, col: INK, font: INTER, weight: 800 }) }
const beachArt = (x, px, py) => { R(x, '#7fd0ff', px - 80, py - 50, 160, 50); R(x, '#f2d79a', px - 80, py, 160, 30) }
const snowArt = (x, px, py) => { R(x, '#bfe2f2', px - 80, py - 50, 160, 80); for (let i = 0; i < 8; i++) R(x, '#ffffff', px - 70 + i * 20, py - 40 + (i % 3) * 22, 8, 8) }
const sparkler = (x, cx, cy, t) => { R(x, INK, cx - 3, cy, 6, 70); for (let i = 0; i < 10; i++) { const a = i * 0.63 + t * 8, r = 20 + 16 * ((i * 7 + Math.floor(t * 20)) % 3); R(x, i % 2 ? GOLD : '#ffffff', cx + Math.cos(a) * r - 3, cy + Math.sin(a) * r - 3, 6, 6) } }
const EP = makeLDN({
  id: 'klne12', len: 60, ending: 'cut', music: { style: 'dreamy', key: 'F', seed: 2332 },
  hook: 'Summer for you. | *Snow* for them.',
  L: { sign: 'aquarius', city: 'Auckland', min0: 8 * 60 },
  R: { sign: 'virgo', city: 'Edinburgh', offset: -780, weather: 'snow' },
  jumps: [[C.l - 0.4, 240], [C.a - 0.4, 719], [CDA.at + 1.8, 1], [C.e - 0.4, 779], [CDE.at + 1.8, 1]],
  sets: [[0, 'street', 'street', {}], [C.l - 0.2, 'room', 'room', {}], [C.e - 0.2, 'room', 'street', {}]],
  badgeAt: 0.6, gap: '13 HOURS APART', gapAt: 1.0, gapOut: [2.1, 2.3], hookOut: [2.0, 2.2],
  lines: [{ t: T.line1, text: 'make a list of things you’ll do *together.*' }, { t: T.line2, text: 'you can be there twice: once on a call, once *in person.*' }],
  boxes: [{ from: 0, to: 1, close: 23.4 }, { from: 1, to: 2, close: 46.8 }],
  long: { promise: '13 hours apart. two New Years. | *wait* for it.', promiseOut: 4.7, mergeTo: 'R', chapters: [{ t: C.w, text: 'SWAP YOUR WEATHER' }, { t: C.l, text: 'A LIST FOR LATER' }, { t: C.a, text: 'AUCKLAND MIDNIGHT' }, { t: C.e, text: 'EDINBURGH MIDNIGHT' }, { t: C.s, text: 'SURPRISE' }], merge: T.merge },
  pose(t, side) {
    const hk = ease.inOutCubic(prog(t, T.merge[0], T.hug))
    if (side === 'L') {
      if (t > C.e - 0.2 && t < T.merge[0] - 0.4) return { hide: true }
      const cart = t < 0.8
      return { x: t > T.merge[0] - 0.4 ? lerp(-150, 450, ease.outCubic(prog(t, T.merge[0] - 0.4, T.hug))) : 250, y: 1140, s: 250, mood: cart ? 'wide' : t > T.hug ? 'heart' : t > CDA.at + 2.4 && t < C.e ? 'sparkle' : 'happy', look: [1, 0], squash: cart ? 0.12 * Math.sin(t * 26) : 0, hops: [0, 0.3, 0.6, T.beach, T.i1, CDA.at + 2.4, CDA.at + 2.8, T.hug, T.hug + 0.4], free: t > T.merge[0] - 0.4 }
    }
    let mood = 'happy'
    if (t < 0.8) mood = 'squint'; else if (t > CDA.at + 2.4 && t < C.e) mood = 'sparkle'
    else if (t > C.e && t < T.merge[0]) mood = 'neutral'
    else if (t > T.merge[0]) mood = t > T.hug ? 'heart' : 'wide'
    return { x: lerp(820, 630, hk), y: 1140, s: 240, mood, look: t > T.merge[0] ? [-1, 0] : [-1, 0], squash: t < 0.4 ? -0.1 : 0, hops: [0.15, T.snow, T.i2, T.cheer, T.cheer + 0.4, T.hug, T.hug + 0.4], free: t > T.merge[0] }
  },
  pis: { side: 'R', x: 990, y: 1250, s: 110, look: [-1, -0.4], tears: t => (t > T.hug ? 3 : 2), mood: t => (t > T.hug ? 'happy' : 'wide'), hops: [T.cheer, T.hug] },
  draw(x, t, S) {
    if (t < 1.0) label(x, 'ACHOO!', 840, 880, { size: 50, col: '#cfeeff', font: INTER, weight: 800, rot: 0.12 })
    if (t < C.l) S.clip('L', () => { R(x, '#f2d79a', 0, 1268, 540, 120); R(x, '#7fd0ff', 0, 1200, 540, 60) })
    fly(x, t, T.beach, T.beach + 1.1, 280, 880, 800, 880, ph('beach day!', '#bfe8ff', beachArt))
    if (t > T.beach + 1.1 && t < C.l - 0.4) ph('beach day!', '#bfe8ff', beachArt)(x, 800, 880)
    fly(x, t, T.snow, T.snow + 1.1, 800, 880, 280, 880, ph('snow day!', '#e8f0ff', snowArt))
    if (t > T.snow + 1.1 && t < C.l - 0.4) ph('snow day!', '#e8f0ff', snowArt)(x, 280, 880)
    // the list for later, on the seam
    if (t > T.i1 - 0.4 && t < C.a - 0.4) {
      const k = pop01(t, T.i1 - 0.4, 0.35, 2); x.save(); x.translate(540, 760); x.scale(k, k); card(x, 0, 0, 500, 300, '#fff8e0')
      label(x, 'NEXT YEAR, TOGETHER', 0, -110, { size: 30, col: '#c42a3f', font: INTER, weight: 800 })
      ;[[T.i1, '♒ build a snow star'], [T.i2, '♍ swim in December'], [T.i3, '♒♍ both New Years']].forEach(([a, s2], i) => { const q = pop01(t, a, 0.25, 2.4); if (q > 0.01) label(x, `${i + 1}. ${s2}`, -210, -40 + i * 60, { size: 28 * q, col: INK, align: 'left', font: INTER, weight: 800, maxW: 420 }) })
      x.restore()
    }
    // Auckland midnight on a call
    if (t > C.a - 0.2 && t < C.e - 0.4) { x.save(); x.globalCompositeOperation = 'lighter'; x.strokeStyle = 'rgba(127,224,255,0.7)'; x.lineWidth = 8; x.setLineDash([24, 16]); x.lineDashOffset = -t * 120; x.beginPath(); x.moveTo(400, 1050); x.quadraticCurveTo(540, 980, 680, 1050); x.stroke(); x.restore() }
    confetti(x, t, CDA.at + 2.4, 270, 900, { n: 30 }); confetti(x, t, T.cheer, 820, 900, { n: 20 })
    bubble(x, t, 820, 780, T.cheer, C.e - 0.4, ['happy new year!', '(it’s 11 a.m. here)'], { size: 30 })
    // Edinburgh midnight: alone with a sparkler… then the surprise
    if (t > C.e && t < T.merge[1] + 4) sparkler(x, 900, 980, t)
    bubble(x, t, 820, 780, T.alone, C.s - 0.4, ['one more midnight', 'to go.'], { size: 30, col: '#d9d4ea' })
    if (t > C.e && t < T.merge[0]) S.clip('L', () => label(x, 'zzz', 270, 1100, { size: 40, col: '#cfeeff' }))
    confetti(x, t, T.hug, 540, 900, { n: 44, life: 2.6 })
    hearts(x, t, T.hug, 540, 1000, { n: 10, spread: 300 }); sparkles(x, t, 540, 1000, T.hug, 14, 260, 1)
  },
  scenes: [countdown(CDA), countdown(CDE)],
  cues: [...countdownCues(CDA), ...countdownCues(CDE)],
  last: { t: T.last, text: 'Two New Years. | *One* hug.', size: 94 },
  sections: { drop: 0.6, breakdown: [C.e], lift: [T.merge[0]], outroAt: T.last + 0.5 },
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES,
  ...[T.beach, T.snow].flatMap(a => [['whoosh', a, 0.5, 0.045], ['pop', a + 1.1, 1318.51, 0.045, 0]]), ...[T.i1, T.i2, T.i3].map((a, i) => ['pop', a, [987.77, 1174.66, 1318.51][i], 0.05, 0]),
  ['glitter', CDA.at + 2.4, CDA.at + 3], ['bell', T.cheer, 1760, 0.04, 1, 0.3], ['glitter', C.e, C.e + 1.5], ['glitter', T.hug, T.hug + 0.8], ['pluck', T.hug, 783.99, 0.05, 0.8, 0], ['pluck', T.hug + 0.15, 987.77, 0.05, 0.8, 0]]
export const MUSIC = EP.music
void [box, drawBits]
