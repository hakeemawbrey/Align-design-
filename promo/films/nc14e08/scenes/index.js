// nc14e08: CUFFING SEASON, "Libra can't pick between two scarves" (40 s vertical, Season 14 ep 8, music: cinematic · Eb).
// Story 0–35.6, then the shared end card. The show look lives in ../../nc14e01/scenes/cuffkit.js.
//   0.0–8.0    "Libra can't pick | a *scarf.*"  Frame 0: Libra at the mirror mid-swap, a red scarf on, a blue one held up.
//              The swap loops; the clock sticker jumps 7:02 → 7:18 → 7:31. Libra: "both are *so* me."
//   8.0–17.0   "Also can't pick | a *person.*"  Two texts land at once: TAURUS "cocoa friday?", AQUARIUS "movie night
//              friday?". Libra's eyes ping-pong. It polls the group chat: WHICH ONE? The bars fill… TIE.
//              Pisces sobs: "they're BOTH so nice".
//  17.0        card cut.
//  17.0–27.0   "No vote. | Just a *pause.*"  The room goes still. THE STARS: "you don't need a vote." → "you need a *pause*."
//              → "which one do you keep *reaching* for?"  Libra's claw keeps drifting to the blue scarf (×7).
//  27.0–35.6   "Kind | and *clear.*"  Blue scarf on. To Taurus: "I want to be honest: I see us as friends." Taurus:
//              "thank you for telling me. friends!"  To Aquarius: "yes to movie night."
//              THE STARS: "You already know. *You keep reaching for it.*"
import {
  makeCuff, R, box, bubble, label, shadow, glow, sparkles, hearts, phone, scarfCells, inSprite, starFrame,
  pop01, outK, popOut, prog, lerp, clamp, ease, easeOutBack, INK, BONE, GOLD, ICE, PINK, RED, MINT, signStar,
} from '../../nc14e01/scenes/cuffkit.js'

const T = {
  h0Out: [7.8, 8.0], clocks: [3.4, 5.4], both: 6.0,
  b2: 8.0, h1: 8.15, h1Out: [16.8, 17.0], tx: [8.7, 9.1], poll: [11.2, 11.5], bars: [11.6, 13.8], tie: 14.0, pisSob: 14.6,
  cut: 17.0, h2: 17.15, h2Out: [26.8, 27.0], reach: [23.2, 23.9, 24.6, 25.3, 25.9, 26.4],
  b4: 27.0, h3: 27.15, sends: [27.5, 28.8], replies: [28.4], last: 29.6,
}
const SP = 'THE STARS'
const B2 = [
  { t: 17.4, speaker: SP, text: "you don't need a *vote*." },
  { t: 19.2, speaker: SP, text: 'you need a *pause*.' },
  { t: 20.9, speaker: SP, text: 'which one do you keep *reaching* for?' },
]
const B3 = [{ t: T.last, speaker: SP, text: 'You already know. *You keep reaching for it.*' }]
const RED_S = '#e8344e', BLUE_S = '#38c4ec'

function bedroom(x, t, still = 0) {
  R(x, still ? '#2a2440' : '#33203f', 0, 520, 1080, 900)
  for (let i = 0; i < 10; i++) R(x, still ? '#2e2846' : '#3a2547', i * 112, 520, 56, 900)
  // the mirror
  box(x, 300, 600, 480, 640, '#c9a27a', { b: 8, hi: '#e0bf9a' }); R(x, '#5a6a9c', 330, 630, 420, 580)
  R(x, 'rgba(255,255,255,0.18)', 360, 650, 40, 520); R(x, 'rgba(255,255,255,0.12)', 420, 650, 18, 520)
  R(x, '#3d2a2a', 0, 1400, 1080, 520); R(x, '#4f3632', 0, 1400, 1080, 12)
  void t
}
function heldScarf(x, cx, cy, col, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -26, -10, 52, 240); R(x, col, -20, -4, 40, 228)
  for (let i = 0; i < 5; i++) R(x, BONE, -20, 30 + i * 40, 40, 6)
  for (let i = 0; i < 4; i++) R(x, INK, -18 + i * 12, 224, 6, 22)
  x.restore()
}
function clockSticker(x, t, txt, bump) {
  x.save(); x.translate(880, 640); x.rotate(0.06); x.scale(1 + bump, 1 + bump)
  box(x, -120, -42, 240, 84, BONE, { b: 6 }); label(x, txt, 0, 2, { size: 40, col: RED, font: 'Inter, sans-serif', weight: 800 })
  x.restore()
}

function scene(x, t, K) {
  const ok = popOut(t, K.OUT)
  const still = t > T.cut && t < T.b4 ? 1 : 0
  bedroom(x, t, still)
  if (t < T.b2) {
    // the swap loop (mid-swap at frame 0)
    const ph = Math.floor((t + 0.3) / 0.6) % 2
    const on = ph ? BLUE_S : RED_S, held = ph ? RED_S : BLUE_S
    const sw = ((t + 0.3) % 0.6) / 0.6
    shadow(x, 540, 1400, 260)
    const r = K.star(x, t, 'libra', { x: 540, y: 1220, s: 270, mood: t > T.both ? 'sparkle' : 'neutral', look: [Math.sin(t * 5) * 0.8, 0], scarf: on, hops: Array.from({ length: 14 }, (_, i) => i * 0.6 - 0.3 + 0.05), seed: 7 })
    heldScarf(x, 790, 1020 - 40 * Math.sin(Math.PI * sw), held, 0.2 - 0.3 * Math.sin(Math.PI * sw))
    void r
    const txt = t < T.clocks[0] ? '7:02 PM' : t < T.clocks[1] ? '7:18 PM' : '7:31 PM'
    const bump = 0.2 * Math.max(...T.clocks.map(c => (t > c && t < c + 0.2) ? 1 - (t - c) / 0.2 : 0))
    clockSticker(x, t, txt, bump)
    bubble(x, t, 540, 960, T.both, T.b2 - 0.15, 'both are *so* me.'.replace(/\*/g, ''), { size: 40 })
    K.pisces(x, t, { x: 150, y: 1610, s: 140, pop: pop01(t, 1.8, 0.3, 2), scarf: ICE }, 1, 'wide', [1, -0.6])
    return
  }
  if (t < T.cut) {
    const ok2 = outK(t, [T.cut - 0.2, T.cut])
    const lk = t < T.poll[0] ? (Math.floor(t * 3) % 2 ? 1 : -1) : 0
    K.star(x, t, 'libra', { x: 540, y: 1230, s: 250, pop: ok2, mood: t > T.tie ? 'wide' : 'neutral', look: [lk, 0], scarf: RED_S, hops: [T.tx[0], T.tx[1], T.poll[0], T.tie], seed: 7 })
    const P = [['taurus', 190, 'cocoa friday?'], ['aquarius', 890, 'movie night friday?']]
    P.forEach(([id, cx, m], i) => {
      const k = easeOutBack(prog(t, T.tx[i], T.tx[i] + 0.3), 1.6) * ok2
      if (k <= 0.01) return
      x.save(); x.translate(cx, 900); x.scale(k, k); x.translate(-cx, -900)
      phone(x, t, cx, 720, 300, 380, { title: `${signStar(id).glyph}︎ ${id.toUpperCase()}`, size: 28, msgs: [{ at: T.tx[i] + 0.15, side: 'L', text: m }] })
      x.restore()
    })
    // the poll
    if (t > T.poll[0]) {
      const k = easeOutBack(prog(t, ...T.poll), 1.6) * ok2
      x.save(); x.translate(540, 700); x.scale(k, k)
      box(x, -260, -110, 520, 220, '#2a1f55', { b: 7 })
      label(x, 'WHICH ONE?', 0, -76, { size: 34, col: GOLD, font: 'Inter, sans-serif', weight: 800 })
      const f = ease.inOutCubic(prog(t, ...T.bars))
      const wob = t < T.bars[1] ? 0.15 * Math.sin(t * 9) : 0
      ;[['♉︎ cocoa', 0.5 + wob, '#e9b24a'], ['♒︎ movie', 0.5 - wob, BLUE_S]].forEach(([lb, v, c], j) => {
        label(x, lb, -170, -16 + j * 62, { size: 24, col: BONE })
        R(x, '#14102a', -90, -34 + j * 62, 320, 36); R(x, c, -90, -34 + j * 62, 320 * v * f, 36)
        label(x, Math.round(50 * f + (wob * (j ? -100 : 100)) * f) + '%', 200, -16 + j * 62, { size: 22, col: BONE })
      })
      x.restore()
      if (t > T.tie) { const sk = easeOutBack(prog(t, T.tie, T.tie + 0.25), 2.6); x.save(); x.translate(760, 840); x.rotate(-0.15); x.scale(sk, sk); box(x, -90, -46, 180, 92, RED, { b: 7 }); label(x, 'TIE.', 0, 2, { size: 52, col: BONE, font: 'Inter, sans-serif', weight: 800 }); x.restore() }
    }
    K.pisces(x, t, { x: 160, y: 1600, s: 160, pop: pop01(t, T.b2 + 0.4, 0.3, 2) * ok2, scarf: ICE }, t > T.pisSob ? 3 : 2, 'sparkle', [1, -0.6])
    bubble(x, t, 330, 1440, T.pisSob, T.cut - 0.1, "they're BOTH so nice", { size: 30, col: '#e6e2ff' })
    return
  }
  // the pause: the room goes still; Libra's claw keeps drifting to the blue scarf
  if (t < T.b4) {
    K.stars(x, t, { x: 540, y: 690, s: 190, pop: pop01(t, T.cut + 0.2, 0.4, 2) * outK(t, [T.b4 - 0.2, T.b4]), mood: 'neutral', look: [0, 0.7], hops: K.hopsFor(SP), glow: 0.8 })
    const breathe = 0.05 * Math.sin(t * 1.6)
    K.star(x, t, 'libra', { x: 540, y: 1220, s: 250, mood: t > T.reach[0] ? 'sparkle' : 'sleepy', zzz: false, look: t > T.reach[0] ? [1, 0.3] : [0, 0], squash: breathe, scarf: RED_S, hops: T.reach, seed: 7 })
    heldScarf(x, 280, 1060, RED_S, -0.1)
    heldScarf(x, 800, 1060 - (t > T.reach[0] ? 30 * Math.abs(Math.sin((t - T.reach[0]) * 4)) : 0), BLUE_S, 0.1)
    const n = T.reach.filter(r => t > r).length
    if (n) { label(x, `reached for it: ${Math.min(7, n + 1)} times`, 850, 1370, { size: 28, col: BLUE_S }); sparkles(x, t, 800, 1100, T.reach[n - 1], 8, 120, n, [BLUE_S, BONE]) }
    label(x, 'PAUSE', 120, 640, { size: 30, col: BONE, alpha: 0.7 * (Math.floor(t * 2) % 2) })
    R(x, BONE, 70, 612, 10, 30); R(x, BONE, 86, 612, 10, 30)
    K.pisces(x, t, { x: 130, y: 1330, s: 130, scarf: ICE }, 2, 'sparkle', [1, -0.6])
    return
  }
  // kind and clear
  const fin = ease.inOutCubic(prog(t, T.b4, T.b4 + 0.6))
  K.star(x, t, 'libra', { x: 540, y: 1260, s: 240, pop: ok, mood: t > T.sends[1] + 0.4 ? 'heart' : 'happy', look: [0, -0.6], scarf: BLUE_S, hops: [T.b4 + 0.2, ...T.sends, T.sends[1] + 0.4], seed: 7 })
  const P = [['taurus', 200, [{ at: T.sends[0], side: 'R', text: 'I want to be honest: I see us as friends.', col: '#9a5aa8' }, { at: T.replies[0], side: 'L', text: 'thank you for telling me. friends!' }]],
    ['aquarius', 880, [{ at: T.sends[1], side: 'R', text: 'yes to movie night.', col: '#9a5aa8' }]]]
  P.forEach(([id, cx, msgs]) => {
    const k = easeOutBack(prog(t, T.b4 + 0.1, T.b4 + 0.45), 1.6) * ok
    if (k <= 0.01) return
    x.save(); x.translate(cx, 900); x.scale(k, k); x.translate(-cx, -900)
    phone(x, t, cx, 640, 340, 520, { title: `${signStar(id).glyph}︎ ${id.toUpperCase()}`, size: 26, msgs })
    x.restore()
  })
  hearts(x, t, T.sends[1] + 0.3, 760, 1100, { n: 6 })
  K.pisces(x, t, { x: 140, y: 1330, s: 140, pop: ok * fin, scarf: ICE }, 3, 'sparkle', [1, -0.6])
}

const EP = makeCuff({
  id: 'nc14e08', duration: 40, ep: 8,
  heads: [
    { text: "Libra can't pick | a *scarf.*", at: -1.2, out: T.h0Out, size: 104, accent: '#f08ae6' },
    { text: "Also can't pick | a *person.*", at: T.h1, out: T.h1Out, size: 100 },
    { text: 'No vote. | Just a *pause.*', at: T.h2, out: T.h2Out, size: 104, accent: GOLD },
    { text: 'Kind | and *clear.*', at: T.h3, out: [35.0, 35.3], size: 108, accent: BLUE_S },
  ],
  boxes: [
    { lines: B2, open: 17.2, close: 26.6, y: 1540 },
    { lines: B3, open: T.last - 0.22, close: 34.9, y: 1540 },
  ],
  snow: (t) => t > T.cut && t < T.b4 ? 0.1 : 0.35,
  cuts: [T.b2, { t: T.cut, kind: 'flip' }, T.b4],
  flashes: [T.b2, T.b4],
  ghost: { x: 750, y: 630, at: 4.6, from: 'right', cell: 3 },
  draw(x, t, K) { scene(x, t, K) },
  cues: [
    ...Array.from({ length: 13 }, (_, i) => ['whoosh', +(i * 0.6 + 0.3).toFixed(3), 0.18, 0.018]),
    ...T.clocks.flatMap(c => [['tick', c, 0.07], ['pop', +(c + 0.05).toFixed(3), 1318.51, 0.035, 0.4]]), ['pop', T.both, 987.77, 0.04, 0],
    ...T.tx.map((c, i) => ['pop', c, [880, 1174.66][i], 0.045, i ? 0.5 : -0.5]),
    ['whoosh', T.poll[0], 0.4, 0.035], ['riser', T.bars[0], T.bars[1], 0.02],
    ['boom', T.tie, 0.25], ['tom', T.tie, 90, { gain: 0.25, decay: 0.3 }], ['pluck', T.pisSob, 659.25, 0.03, 0.5, -0.4],
    ...T.reach.map((r, i) => ['pluck', r, [1174.66, 1318.51, 1567.98][i % 3], 0.03, 0.4, 0.4]),
    ...T.sends.map((s, i) => ['pop', s, [739.99, 1174.66][i], 0.045, i ? 0.5 : -0.5]), ['pop', T.replies[0], 880, 0.04, -0.5],
    ['glitter', T.sends[1] + 0.3, T.sends[1] + 0.7],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [glow, scarfCells, inSprite, starFrame, MINT, PINK, clamp, lerp]
