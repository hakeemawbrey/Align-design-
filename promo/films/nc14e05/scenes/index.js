// nc14e05: CUFFING SEASON, "Cancer has the soup ready" (30 s vertical, Season 14 ep 5, music: jazzy · Bb).
// Story 0–25.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–6.6    "Cancer made soup | for a *hypothetical* person."  Frame 0: a warm kitchen, Cancer mid-stir at a giant
//              steaming pot. A tag pops on the pot: FOR: SOMEONE (TBD). Two bowls get set out, one marked "?".
//              Cancer: "it's ready whenever they exist."
//   6.6–13.4   "Ready to care. | *Not* ready to ask."  Scorpio walks past the window; Cancer dives behind the counter, then
//              peeks. CANCER: "what if they don't even *like* soup?"  Pisces cries into a bowl.
//  13.4        card cut.
//  13.4–19.6   "They can't taste | a *secret.*"  THE STARS: "the soup is love." → "but nobody can taste a *secret*."
//              A talk card lands on the counter: "What's your comfort meal?"  Cancer's eyes light up.
//  19.6–25.6   "Open the | *door.*"  Cancer opens the front door to Scorpio, bowl in claws: "I made too much soup. on
//              purpose. want some?"  Scorpio: "…for me?" (heart eyes)
//              THE STARS: "Don't just make the soup. *Say who it's for.*"
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, windowFrame, drawSnow, talkCard, snowGround,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, CREAM,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [6.4, 6.6], tag: 1.4, bowls: [2.8, 3.4],
  b2: 6.6, h1: 6.75, h1Out: [13.2, 13.4], walk: [7.2, 11.2], duck: 7.9, peek: 9.6,
  cut: 13.4, h2: 13.55, h2Out: [19.4, 19.6], card: [16.9, 17.5], idea: 17.9,
  b4: 19.6, h3: 19.75, door: [19.7, 20.2], ask: 20.1, forMe: 21.3, last: 22.0,
}
const SP = 'THE STARS', CA = '♋︎ CANCER'
const B1 = [{ t: 10.3, speaker: CA, color: '#8fd8ff', text: "what if they don't even *like* soup?" }]
const B2 = [
  { t: 13.8, speaker: SP, text: 'the soup is *love*.' },
  { t: 15.3, speaker: SP, text: 'but nobody can taste a *secret*.' },
]
const B3 = [{ t: T.last, speaker: SP, text: "Don't just make the soup. *Say who it's for.*" }]

function bowl(x, cx, cy, s, col, { full = 1, mark = null } = {}) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-74, -10); x.lineTo(74, -10); x.lineTo(50, 44); x.lineTo(-50, 44); x.closePath(); x.fill()
  x.fillStyle = col; x.beginPath(); x.moveTo(-66, -4); x.lineTo(66, -4); x.lineTo(45, 38); x.lineTo(-45, 38); x.closePath(); x.fill()
  if (full) R(x, '#e7a24a', -64, -12, 128, 10)
  x.restore()
  if (mark) label(x, mark, cx, cy + 10 * s, { size: 34 * s, col: INK, font: 'Inter, sans-serif', weight: 800 })
}
function pot(x, t, cx, cy, s, stir) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  // steam
  x.save(); x.globalAlpha = 0.5
  for (let i = 0; i < 6; i++) { const ph = (t * 0.5 + i / 6) % 1; R(x, '#f4f0ff', -120 + i * 48 + 14 * Math.sin(t * 2 + i), -150 - ph * 240, 22, 34 * (1 - ph)) }
  x.restore()
  box(x, -170, -110, 340, 210, '#5a6a8c', { b: 8, hi: '#7a8cb0' })
  R(x, INK, -200, -80, 30, 22); R(x, INK, 170, -80, 30, 22)
  R(x, '#e7a24a', -164, -110, 328, 22)
  // the ladle
  x.save(); x.translate(0, -100); x.rotate(-0.5 + 0.35 * Math.sin(stir)); R(x, INK, -8, -220, 16, 230); R(x, '#a0a8c0', -4, -216, 8, 222); x.restore()
  x.restore()
}
function kitchen(x, t, K, scorpioX) {
  R(x, '#3a2433', 0, 520, 1080, 900)
  for (let i = 0; i < 8; i++) for (let j = 0; j < 5; j++) R(x, (i + j) % 2 ? '#43293b' : '#3d2536', i * 140, 540 + j * 90, 136, 86)
  windowFrame(x, 800, 760, 360, 300)
  x.save(); x.beginPath(); x.rect(620, 610, 360, 300); x.clip()
  drawSnow(x, t, 0.9, 1)
  if (scorpioX !== null) K.star(x, t, 'scorpio', { x: scorpioX, y: 830, s: 200, mood: 'neutral', look: [1, 0], scarf: INK, stripe: RED, hops: [7.6, 8.2, 8.8, 9.4, 10.0, 10.6], seed: 12 })
  x.restore()
  R(x, '#6b4a2f', 794, 610, 12, 300); R(x, '#6b4a2f', 620, 754, 360, 12)
  // counter
  box(x, 0, 1300, 1080, 60, '#c9a27a', { b: 8, hi: '#e0bf9a' }); R(x, '#6b4a2f', 0, 1368, 1080, 560)
  for (let i = 0; i < 4; i++) box(x, 40 + i * 270, 1420, 230, 380, '#7b5634', { b: 6 })
}

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  if (t < T.b4) {
    const scX = t > T.walk[0] && t < T.walk[1] ? lerp(560, 1060, prog(t, ...T.walk)) : null
    kitchen(x, t, K, scX)
    pot(x, t, 380, 1180, 1.0, t * 4)
    // Cancer: stirring (frame 0 mid-stir), ducks, peeks
    const duck = t > T.duck && t < T.peek + 2.2 ? ease.outCubic(prog(t, T.duck, T.duck + 0.25)) * (t > T.peek ? lerp(1, 0.38, ease.outCubic(prog(t, T.peek, T.peek + 0.3))) : 1) * (1 - ease.inOutCubic(prog(t, T.peek + 1.8, T.peek + 2.2))) : 0
    const cy = lerp(1170, 1420, duck)
    const cm = t < T.duck ? 'happy' : t < T.peek ? 'wide' : t < T.cut ? 'neutral' : t < T.idea ? 'neutral' : 'sparkle'
    K.star(x, t, 'cancer', { x: 700, y: cy, s: 250, mood: cm, look: t > T.peek && t < T.cut ? [1, -0.6] : [-1, 0.2], scarf: '#f4f0ff', hops: [0.2, 0.9, 1.6, T.bowls[0], T.bowls[1], T.idea], seed: 8 })
    // re-cover the counter front over a ducking Cancer
    if (duck > 0) { box(x, 0, 1300, 1080, 60, '#c9a27a', { b: 8, hi: '#e0bf9a' }); R(x, '#6b4a2f', 0, 1368, 1080, 560); for (let i = 0; i < 4; i++) box(x, 40 + i * 270, 1420, 230, 380, '#7b5634', { b: 6 }) }
    // the tag + bowls
    const tk = easeOutBack(prog(t, T.tag, T.tag + 0.35), 2.2)
    if (tk > 0.01) { x.save(); x.translate(380, 1160); x.rotate(0.05 * Math.sin(t * 2)); x.scale(tk, tk); R(x, INK, -2, -70, 4, 40); box(x, -150, -40, 300, 76, CREAM, { b: 5 }); label(x, 'FOR: SOMEONE (TBD)', 0, -2, { size: 26, col: RED }); x.restore() }
    T.bowls.forEach((b, i) => { const k = easeOutBack(prog(t, b, b + 0.3), 2); if (k > 0.01) bowl(x, 840 + i * 150, 1285, 0.8 * k, i ? ICE : PINK, { mark: i ? '?' : null }) })
    bubble(x, t, 700, 930, 4.4, T.b2 - 0.15, "it's ready whenever they exist.", { size: 32 })
    if (t > T.walk[0] + 0.6 && t < T.duck + 0.5) label(x, 'SCORPIO SPOTTED', 800, 960, { size: 28, col: RED })
    // Pisces, bowl in hand, crying into it
    if (t > T.b2 - 0.1 || t > 2.0) {
      const pk = pop01(t, 2.0, 0.3, 2) * (t > T.cut ? outK(t, [T.b4 - 0.2, T.b4]) : 1)
      K.pisces(x, t, { x: 140, y: 1170, s: 150, pop: pk, scarf: ICE }, t > T.b2 ? 3 : 1, 'sparkle', [1, 0.3])
      if (pk > 0.01) bowl(x, 140, 1270, 0.55, MINT)
    }
    // THE STARS, the talk card
    if (t > T.cut) {
      K.stars(x, t, { x: 540, y: 700, s: 200, pop: pop01(t, T.cut + 0.15, 0.4, 2) * outK(t, [T.b4 - 0.2, T.b4]), mood: t > T.idea ? 'happy' : 'neutral', look: [0.5, 0.6], hops: K.hopsFor(SP) })
      const c = ease.outCubic(prog(t, ...T.card))
      if (t > T.card[0]) { talkCard(x, K.img.talk, lerp(1250, 480, c), lerp(800, 1170, c), 200, lerp(0.9, -0.08, c)); sparkles(x, t, 480, 1170, T.card[1], 10, 150, 1) }
      if (t > T.idea) label(x, '!', 700, 960, { size: 90, col: GOLD, font: 'Inter, sans-serif', weight: 800, alpha: clamp(prog(t, T.idea, T.idea + 0.15)) })
    }
    return
  }
  // the front door
  R(x, '#3a2433', 0, 520, 1080, 900)
  const d = ease.inOutCubic(prog(t, ...T.door))
  x.save(); x.beginPath(); x.rect(500, 700, 460, 700); x.clip()
  R(x, '#1d2550', 500, 700, 460, 700); drawSnow(x, t, 1, 1); snowGround(x, 1330)
  K.star(x, t, 'scorpio', { x: 740, y: 1180, s: 250, pop: ok, mood: t > T.forMe ? 'heart' : t > T.ask ? 'wide' : 'neutral', look: [-1, 0], scarf: INK, stripe: RED, hops: [T.forMe, T.forMe + 0.4], seed: 12 })
  x.restore()
  box(x, 488, 688, 484, 18, '#6b4a2f', { b: 6 }); box(x, 488, 688, 18, 712, '#6b4a2f', { b: 6 }); box(x, 954, 688, 18, 712, '#6b4a2f', { b: 6 })
  // the door swings open (narrows to its hinge)
  const dw = 460 * (1 - d)
  if (dw > 4) { box(x, 960 - dw, 706, dw, 694, '#9b3b48', { b: 6 }); R(x, GOLD, 960 - dw + 24, 1060, 16, 16) }
  R(x, '#4a2f2a', 0, 1400, 1080, 520)
  K.star(x, t, 'cancer', { x: 360, y: 1190, s: 250, pop: ok, mood: t > T.forMe ? 'heart' : 'happy', look: [1, 0], scarf: '#f4f0ff', hops: [T.b4 + 0.3, T.ask, T.ask + 0.6, T.forMe + 0.1], seed: 8 })
  bowl(x, 500, 1290, 0.9, PINK)
  bubble(x, t, 360, 900, T.ask, 23.0, 'I made too much soup. on purpose.', { size: 30 })
  bubble(x, t, 360, 990, T.ask + 0.8, 23.0, 'want some?', { size: 36, col: '#d6f0ff' })
  bubble(x, t, 760, 820, T.forMe, 25.2, '…for me?', { size: 40, col: '#ffd0dc' })
  hearts(x, t, T.forMe + 0.1, 560, 1080, { n: 7 })
  K.pisces(x, t, { x: 140, y: 1600, s: 140, pop: ok, scarf: ICE }, 3, 'sparkle', [1, -0.6])
}

const EP = makeCuff({
  id: 'nc14e05', duration: 30, ep: 5,
  images: { talk: 'card-talk-5.png' },
  heads: [
    { text: 'Cancer made soup | for a *hypothetical* person.', at: -1.2, out: T.h0Out, size: 80, accent: '#8fd8ff' },
    { text: 'Ready to care. | *Not* ready to ask.', at: T.h1, out: T.h1Out, size: 92 },
    { text: "They can't taste | a *secret.*", at: T.h2, out: T.h2Out, size: 96, accent: GOLD },
    { text: 'Open the | *door.*', at: T.h3, out: [25.0, 25.3], size: 108, accent: PINK },
  ],
  boxes: [
    { lines: B1, open: 10.1, close: 13.1, y: 1540 },
    { lines: B2, open: 13.6, close: 18.9, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 25.15, y: 1540 },
  ],
  snow: 0.3,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2, T.b4],
  ghost: { x: 380, y: 1070, at: 3.6, from: 'below', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ...Array.from({ length: 6 }, (_, i) => ['tick', +(0.3 + i * 0.8).toFixed(3), 0.015]),
    ['pop', T.tag, 1174.66, 0.045, -0.3], ['tick', T.tag + 0.05, 0.04],
    ...T.bowls.map((b, i) => ['pop', b, [880, 987.77][i], 0.04, 0.4]), ['pop', 4.4, 739.99, 0.03, 0.2],
    ['whoosh', T.duck, 0.3, 0.05], ['tom', T.duck + 0.2, 110, { gain: 0.18, decay: 0.2 }], ['pluck', T.peek, 659.25, 0.035, 0.4, 0.3],
    ['whoosh', T.card[0], 0.45, 0.04], ['pluck', T.card[1], 1318.51, 0.04, 0.6, 0], ['glitter', T.card[1], T.card[1] + 0.4],
    ['bell', T.idea, 1760, 0.03, 1, 0.2],
    ['whoosh', T.door[0], 0.5, 0.04], ['pop', T.ask, 880, 0.035, -0.3], ['pop', T.ask + 0.8, 1174.66, 0.04, -0.3],
    ['pluck', T.forMe, 1174.66, 0.045, 0.5, 0.3], ['pluck', T.forMe + 0.12, 1567.98, 0.04, 0.5, 0.3], ['glitter', T.forMe, T.forMe + 0.4],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [shadow, glow]
