// kine03: IS THIS NORMAL?, "Great date. Zero spark." (19.5 s vertical, star_advice post, music: jazzy · Bb).
// The format lives in ../../kine01/normalkit.js. No end card, no card cut. Hard cut ending.
//   0.00       frame 0: "Nice date. | Felt *nothing.* Broken?" landed; ♍ Virgo mid-shrug at a café table across from a
//              lovely ♉ Taurus date; a spark plug over Virgo's head sputters out.
//   0.60       colour flash + punch: the clipboard slaps in: KIND ✓ FUNNY ✓ ON TIME ✓ ASKED ME QUESTIONS ✓
//   1.6–6.2    "All the boxes. | Zero *spark.*"  A loading bar: "looking for a spark…" stalls at 12%: "Error: spark not
//              found". ♓ Pisces at the next table cries: "they were SO nice".
//   6.3–10.1   NORMAL-O-METER: SO NORMAL.
//  10.2–17.6   THE STARS: "sparks can be *slow.* or it's just not a match." → "curious? one more date. not? a *kind*
//              no."  A candle on the table slowly catches (slow spark); then Virgo's phone: a kind message.
//  17.8–19.5   last line: "Nice is not a reason. | *Curious* is."  Hard cut.
import {
  makeNormal, hook, GOLD, BONE, PINK, INK, RED, MINT, CYAN, INTER, MONO, R, box, drawBits, sparkles, hearts, bubble, label, shadow, glowAt,
  room, miniPhone, pop01, outK, prog, lerp, clamp, ease, r3, signStar,
} from '../../kine01/normalkit.js'

const D = 19.5, FLOOR = 1420
const T = {
  flash: 0.6, clip: 0.62, h0Out: [1.4, 1.6], h1: 1.6, h1Out: [6.05, 6.25], load: 2.9, pisIn: 3.6,
  meter: 6.35, mOut: [9.95, 10.2],
  starsIn: 10.1, l1: 10.35, l2: 13.95, boxClose: 17.55, candle: [10.9, 12.6], phone: 14.6,
  last: 17.75,
}
const LOAD = { at: T.load, len: 2.6, label: 'looking for a spark…', stallAt: 12, error: 'Error: spark not found', y: 820 }
const TAU = signStar('taurus')

function cafe(x, t) {
  room(x, { y: FLOOR, wall: '#2a1c3c', floor: '#3a2a4a' })
  // window with a warm street lamp outside, and a hanging lamp
  box(x, 600, 470, 340, 320, '#1a2550', { b: 8 }); R(x, INK, 766, 470, 8, 320)
  glowAt(x, 840, 560, 120, '255,214,150', 0.4)
}
function table(x, cx, cy, w = 560) {
  box(x, cx - w / 2, cy, w, 34, '#8a6440', { b: 8, hi: '#a87a50' })
  R(x, INK, cx - 14, cy + 40, 28, FLOOR - cy - 40); R(x, '#6b4a2f', cx - 8, cy + 40, 16, FLOOR - cy - 40)
}
function cup(x, cx, cy, col) { box(x, cx - 28, cy - 50, 56, 50, col, { b: 5 }); R(x, INK, cx + 28, cy - 40, 16, 24); R(x, col, cx + 28, cy - 34, 10, 12) }
// the spark plug over Virgo's head: sputters (a few sparks, then a sad puff)
function sparkPlug(x, t, cx, cy, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(1.8 * k, 1.8 * k)
  box(x, -16, -70, 32, 50, BONE, { b: 5 }); box(x, -26, -20, 52, 34, '#8c86a8', { b: 5 }); R(x, INK, -4, 14, 8, 22)
  const sput = t < 0.35 || (Math.sin(t * 31) > 0.4 && t % 1.4 < 0.5)
  if (sput) for (let i = 0; i < 4; i++) drawBits(x, ['.Y.', 'YYY', '.Y.'], { Y: GOLD }, -30 + i * 20 + Math.sin(t * 50 + i) * 8, 48 + (i % 2) * 14, 4)
  x.font = `800 22px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'left'; x.fillText('SPARK?', 34, -40)
  if (sput) {} else { x.globalAlpha = 0.5; drawBits(x, ['.GG.', 'GGGG', '.GG.'], { G: '#8c86a8' }, 18, 50 + 6 * Math.sin(t * 3), 6, { outline: null }) }
  x.restore()
}
function clipboard(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  box(x, -170, -150, 340, 300, '#c8a070', { b: 8 }); R(x, '#f4e8cc', -150, -120, 300, 255); box(x, -50, -170, 100, 36, '#8c86a8', { b: 5 })
  const items = ['KIND', 'FUNNY', 'ON TIME', 'ASKED ME', 'QUESTIONS']
  x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  items.forEach((s, i) => {
    const yy = -88 + i * 46
    x.fillStyle = INK; x.fillText(s, -120, yy)
    if (i !== 3 && t > T.clip + 0.15 + i * 0.12) drawBits(x, ['....M', '...M.', 'M.M..', '.M...'], { M: '#2f9d5a' }, 110, yy, 6, { outline: null })
  })
  x.restore()
}
// the spark monitor: a flat line with a lonely blip
function monitor(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  box(x, -200, -70, 400, 140, '#0b1a12', { b: 8 })
  x.strokeStyle = MINT; x.lineWidth = 5; x.beginPath()
  for (let i = 0; i <= 60; i++) { const px = -180 + i * 6, ph = (i / 60 - (t * 0.6) % 1); const blip = Math.abs(ph) < 0.03 ? -14 * Math.cos(ph * 50) : 0; i ? x.lineTo(px, blip) : x.moveTo(px, blip) }
  x.stroke()
  x.font = `700 20px ${MONO}`; x.fillStyle = MINT; x.textAlign = 'left'; x.fillText('SPARK', -180, -46)
  x.restore()
}
function candle(x, t, cx, cy, lit) {
  box(x, cx - 18, cy - 70, 36, 70, BONE, { b: 5 }); R(x, INK, cx - 2, cy - 84, 4, 14)
  if (lit <= 0) return
  const f = lit * (0.9 + 0.1 * Math.sin(t * 17))
  glowAt(x, cx, cy - 100, 200 * lit, '255,200,120', 0.4 * lit)
  drawBits(x, ['.Y.', 'YOY', 'YOY', '.Y.'], { Y: GOLD, O: '#ff8a3a' }, cx, cy - 104, 7 * f)
}

const EP = makeNormal({
  id: 'kine03', D, ending: 'cut', hero: 'virgo',
  hook: { text: 'Nice date. | Felt *nothing.* Broken?', out: T.h0Out, accentColor: CYAN },
  flashes: [{ t: T.flash, col: '#7fe0ff', a: 0.85, d: 0.18 }],
  fx: [[hook.loadingBar, hook.loadingBarCues, LOAD]],
  heads: [{ text: 'All the boxes. | Zero *spark.*', at: T.h1, out: T.h1Out, size: 96, accent: CYAN, late: 1, lateAt: T.h1 + 0.5 }],
  meter: { at: T.meter, land: 'so', out: T.mOut, cy: 1000 },
  lines: [
    { t: T.l1, text: "sparks can be *slow.* or it's just not a match." },
    { t: T.l2, text: 'curious? one more date. not? a *kind* no.' },
  ],
  box: { y: 1450, close: T.boxClose },
  stars: { in: T.starsIn },
  last: { text: 'Nice is not a reason. | *Curious* is.', at: T.last, lateAt: T.last + 0.5, accent: GOLD, size: 92 },
  punches: [T.flash, T.h1, T.meter + 1.75],
  shakes: [{ t: 0, a: 10 }],
  scene(x, t, S) {
    const date = S.sign('taurus')
    if (t < T.meter) {
      cafe(x, t)
      // the date: lovely, chatty, hearts
      shadow(x, 790, FLOOR, 300)
      date(x, t, { x: 800, y: 1120, s: 350, mood: 'happy', look: [-1, 0], hops: [0.2, 1.0, 1.8, 2.6, 3.4, 4.2, 5.0], seed: 7 })
      // Virgo mid-shrug
      shadow(x, 290, FLOOR, 320)
      const shrug = 0.08 * Math.sin(t * 7)
      S.hero(x, t, { x: 290, y: 1110, s: 370, mood: t < 1.6 ? 'neutral' : t > LOAD.at + 2 ? 'wide' : 'squint', look: [1, 0], squash: -0.05 + shrug, hops: [0.0, T.clip] })
      sparkPlug(x, t, 290, 800 + 10 * Math.sin(t * 2), outK(t, [LOAD.at - 0.2, LOAD.at]))
      table(x, 540, 1230, 700)
      cup(x, 400, 1230, '#ff8fb1'); cup(x, 690, 1230, '#7fd0ff')
      clipboard(x, t, 760, 640, pop01(t, T.clip, 0.3, 2.4) * outK(t, [LOAD.at - 0.3, LOAD.at - 0.1]))
      if (t > LOAD.at) monitor(x, t, 540, 640, 1.4 * pop01(t, LOAD.at + 2.7, 0.3, 2.2) * outK(t, [T.meter - 0.2, T.meter]))
      // Pisces at the next table, sobbing for the date
      S.pis(x, t, { x: 930, y: 1560, s: 170, pop: 1, tears: 3, mood: 'wide', look: [-1, -0.4], tissues: 'left', say: [T.pisIn + 0.4, T.meter - 0.15, 'they were SO nice'], sayDx: -130, saySize: 30 })
      return
    }
    if (t < T.mOut[1]) {
      const k = outK(t, T.mOut), land = T.meter + 1.75
      S.hero(x, t, { x: 230, y: 1560, s: 170, mood: t > land ? 'sparkle' : 'squint', look: [1, -1], pop: k, hops: [land] })
      S.pis(x, t, { x: 850, y: 1560, s: 170, mood: t > land ? 'happy' : 'wide', look: [-1, -1], pop: k, tears: 3, hops: [land, land + 0.4] })
    }
    if (t >= T.mOut[0]) {
      cafe(x, t)
      const k = pop01(t, T.mOut[0] + 0.1, 0.35, 2.1)
      shadow(x, 540, 1300, 300 * k)
      S.hero(x, t, { x: 470, y: 1060, s: 350, pop: k, mood: t > T.phone + 0.8 ? 'happy' : 'neutral', look: t < T.l2 ? [0.4, 0.8] : [1, 0.5], hops: [T.mOut[0] + 0.2, T.candle[1], T.phone + 0.8] })
      table(x, 540, 1200, 760)
      const lit = ease.inOutCubic(prog(t, ...T.candle))
      candle(x, t, 260, 1200, lit)
      if (t > T.candle[0] && t < T.candle[1] + 0.8) label(x, lit < 1 ? 'catching…' : 'slow burn.', 260, 1000, { size: 24, col: GOLD })
      // the kind message
      const pk = pop01(t, T.phone, 0.3, 2.2)
      if (pk > 0.01) {
        x.save(); x.translate(760, 720); x.scale(1.2 * pk, 1.2 * pk); x.rotate(0.06)
        box(x, -150, -110, 300, 220, '#14102a', { b: 8 })
        x.font = `600 22px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'left'
        const msg = ['I had a really nice time.', "I don't feel a spark,", "but I'm glad we met."]
        const n = Math.floor(prog(t, T.phone + 0.2, T.phone + 1.6) * 70)
        let used = 0
        msg.forEach((l, i) => { x.fillText(l.slice(0, Math.max(0, n - used)), -130, -60 + i * 34); used += l.length })
        if (t > T.phone + 1.8) { box(x, 50, 56, 90, 34, '#4f8df0', { b: 4 }); x.font = `800 18px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('SENT', 95, 78) }
        x.restore()
      }
      S.pis(x, t, { x: 180, y: 1560, s: 180, pop: pop01(t, T.mOut[0] + 0.3, 0.35, 2.2), tears: t > T.phone + 1.8 ? 3 : 2, mood: t > T.phone + 1.8 ? 'happy' : 'sparkle', look: [1, -0.4], tissues: 'right', hops: [T.phone + 1.9, T.last + 0.5] })
      S.stars(x, t, { x: 880, y: 1160, s: 150, pop: pop01(t, T.starsIn, 0.35, 2.1), mood: t > T.phone + 1.8 ? 'happy' : 'neutral', look: [-1, -0.3] })
      if (t > T.phone + 1.85) hearts(x, t, T.phone + 1.85, 760, 560, { n: 4 })
    }
  },
  cues: [
    ['tick', 0.0, 0.05], ['pop', 0.05, 1567.98, 0.025, -0.3], ['pop', 0.12, 1318.51, 0.02, -0.3],
    ['whoosh', T.clip - 0.05, 0.3, 0.04], ...[0, 1, 2, 4].map(i => ['pop', r3(T.clip + 0.15 + i * 0.12), 1174.66 + i * 100, 0.035, 0.3]),
    ['pop', T.pisIn + 0.05, 987.77, 0.035, 0.4], ['pluck', T.pisIn + 0.45, 1174.66, 0.03, 0.4, 0.4],
    ...Array.from({ length: 4 }, (_, i) => ['tick', r3(LOAD.at + 2.75 + i * 0.6), 0.03]),
    ['riser', T.candle[0], T.candle[1], 0.02], ['bell', T.candle[1], 1760, 0.025, 1.0, -0.3],
    ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.phone + 0.25 + i * 0.13), 0.02]),
    ['pop', T.phone + 1.8, 1318.51, 0.04, 0.3], ['pluck', T.phone + 1.9, 1567.98, 0.035, 0.5, 0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, sparkles, bubble, miniPhone, clamp, lerp, TAU]
