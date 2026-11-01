// trpackromantic: STARTER PACK, "Hopeless romantic" (20 s vertical, Star Talk Trends §5.3, music: funk · G)
// Story 0–15.6, then the shared end card. The format engine is ./packkit.js (identical in every trpack* film).
//   0.1        "Hopeless romantic | *starter pack*" over four empty slots (slot 4 is a pulsing "?").
//   1.71       1 · "window gazing": ♎ Libra at a moonlit window, chin on the sill, "sigh…" bubbles drifting up.
//   3.93       2 · "love-letter drafts (v14)": writing, crumpling, a growing pile of paper balls; DRAFT v14, v15, v16…
//              THE STARS: "every romantic has *this* exact pack."
//   6.16       3 · "a playlist titled \"us?\"": a pixel music player, bouncing EQ, Libra swaying in sparkle-eyes.
//   8.38       the "?" rattles. THE STARS: "and the *rare* item…"
//   9.49       4 · "…a talk card": Libra and ♌ Leo, a real talk card ("Morning person or night owl?") between them.
//   11.16      card cut → payoff: ♌ "night owl. you? …wait, *same?*" — heart eyes; the card glows.
//   13.2       last line: "*Hopeful*, actually."  Pisces cries behind the box the whole way.
import { makePack, drawBits, bubble, label, star, heart, R, INK, BONE, GOLD, PINK, signStar, prog, ease, lerp, clamp, r3 } from './packkit.js'
import { A } from '../../../src/scenes/common.js'

const LIB = signStar('libra'), LEO = signStar('leo')
const MOON = ['..MMM.', '.MM...', 'MM....', 'MM....', 'MM....', '.MM...', '..MMM.']

// 1 · window gazing
function windowGaze(x, t, lt) {
  // the window
  R(x, INK, 90, 30, 260, 230); R(x, '#c9a06a', 96, 36, 248, 218)
  R(x, '#141a4a', 108, 48, 224, 194)
  for (let i = 0; i < 14; i++) { const a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.3 + i)); R(x, `rgba(255,247,220,${a})`, 112 + (i * 53) % 214, 54 + (i * 37) % 170, 4, 4) }
  drawBits(x, MOON, { M: '#ffe9a8' }, 280, 96, 8)
  R(x, '#c9a06a', 216, 48, 8, 194); R(x, '#c9a06a', 108, 140, 224, 8)
  R(x, INK, 70, 256, 300, 22); R(x, '#a06c48', 74, 258, 292, 16)                         // the sill
  star(x, 220, 300, 160, t, { color: LIB.color, mood: 'sparkle', look: [0.4, -1], seed: 3, glow: 0.8, bob: 3 })
  for (let i = 0; i < 3; i++) {
    const ph = ((Math.max(0, lt) * 0.45 + i / 3) % 1)
    label(x, 'sigh…', 384 + (i % 2) * 14, 240 - ph * 210, { size: 22, col: '#ffd0e6', font: "Inter, sans-serif", weight: 800, alpha: Math.sin(Math.PI * ph) })
  }
}

// 2 · love-letter drafts
function drafts(x, t, lt) {
  R(x, INK, 30, 270, 380, 18); R(x, '#a06c48', 34, 272, 372, 12)                          // the desk
  // the page being written
  x.save(); x.translate(130, 230); x.rotate(-0.08)
  R(x, INK, -60, -42, 120, 80); R(x, '#f6efe2', -56, -38, 112, 72)
  const lines = Math.floor(((Math.max(0, lt) % 0.9) / 0.9) * 4)
  for (let i = 0; i < lines; i++) R(x, '#c42a3f', -46, -28 + i * 15, 70 + (i % 2) * 20, 4)
  heart(x, 40, 20, 2.2)
  x.restore()
  star(x, 120, 158, 140, t, { color: LIB.color, mood: lt % 0.9 > 0.7 ? 'squint' : 'sparkle', look: [0, 1], seed: 3, glow: 0.8 })
  // crumpled balls fly to the pile
  const n = clamp(Math.floor(Math.max(0, lt) / 0.9), 0, 9)
  for (let i = 0; i < n + 1; i++) {
    const t0 = (i + 1) * 0.9 - 0.12, f = i < n ? 1 : clamp(prog(lt, t0 - 0.9 + 0.78, t0))
    if (i === n && f <= 0) continue
    const px = 280 + (i % 4) * 34, py = 252 - Math.floor(i / 4) * 26 - (i % 2) * 6
    const cx = lerp(150, px, f), cy = lerp(220, py, f) - Math.sin(Math.PI * f) * 110
    drawBits(x, ['.WW.', 'WPWW', 'WWPW', '.WW.'], { W: '#f6efe2', P: '#d8c8a8' }, cx, cy, 7, { rot: i * 0.7 + f * 3 })
  }
  label(x, `DRAFT v${14 + n}`, 340, 40, { size: 22, col: GOLD })
}

// 3 · the "us?" playlist
function playlist(x, t, lt) {
  // the player
  R(x, INK, 196, 30, 220, 300); R(x, '#2b2140', 202, 36, 208, 288)
  R(x, '#ff8fb1', 216, 50, 72, 72); heart(x, 252, 86, 4.5, { col: '#ffffff' })
  label(x, 'us?', 300, 70, { size: 34, col: BONE, font: "Inter, sans-serif", weight: 800, align: 'left' })
  label(x, '47 tracks', 300, 104, { size: 16, col: 'rgba(239,230,214,0.7)', align: 'left' })
  for (let i = 0; i < 5; i++) {
    const on = Math.floor(Math.max(0, lt) / 0.6) % 5 === i
    R(x, on ? 'rgba(255,143,177,0.25)' : 'rgba(0,0,0,0)', 210, 136 + i * 30, 192, 26)
    R(x, on ? PINK : 'rgba(239,230,214,0.55)', 220, 144 + i * 30, 18, 10)
    R(x, on ? BONE : 'rgba(239,230,214,0.35)', 246, 146 + i * 30, 90 + (i * 29) % 50, 6)
  }
  // EQ
  for (let i = 0; i < 8; i++) { const h = 8 + 26 * Math.abs(Math.sin(t * (5 + i) + i)); R(x, i % 2 ? GOLD : PINK, 222 + i * 22, 312 - h, 14, h) }
  star(x, 100, 216, 150, t, { color: LIB.color, mood: 'sparkle', look: [1, -1], seed: 3, glow: 0.8, squash: 0.05 * Math.sin(lt * 6.8) })
  for (let i = 0; i < 3; i++) { const ph = ((Math.max(0, lt) * 0.6 + i / 3) % 1); label(x, '♪', 60 + i * 40 + Math.sin(ph * 6) * 10, 140 - ph * 110, { size: 34, col: '#ffd0e6', font: 'serif', alpha: Math.sin(Math.PI * ph) }) }
}

// 4 · the talk card
function card(x, P, cx, cy, w, rot, glow = 0) {
  const im = P.assets.card
  if (!im) return
  const h = w * im.height / im.width
  x.save(); x.translate(cx, cy); x.rotate(rot)
  if (glow > 0) { const g = x.createRadialGradient(0, 0, 0, 0, 0, h * 0.8); g.addColorStop(0, `rgba(255,217,138,${0.45 * glow})`); g.addColorStop(1, 'rgba(255,217,138,0)'); x.fillStyle = g; x.fillRect(-h, -h, 2 * h, 2 * h) }
  x.fillStyle = 'rgba(4,2,12,0.5)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.drawImage(im, -w / 2, -h / 2, w, h)
  x.restore()
}
function talk(x, t, lt, P) {
  R(x, INK, 110, 300, 220, 16); R(x, '#a06c48', 114, 302, 212, 10)
  star(x, 86, 220, 140, t, { color: LIB.color, mood: 'sparkle', look: [1, 0], seed: 3, glow: 0.8, hops: [r3(t - lt + 0.3)] })
  star(x, 356, 220, 140, t, { color: LEO.color, mood: 'happy', look: [-1, 0], seed: 8, glow: 0.8, hops: [r3(t - lt + 0.4)] })
  card(x, P, 220, 186 + 4 * Math.sin(t * 2), 128, 0.06 * Math.sin(t * 1.5))
}
function payoff(x, t, pt, P) {
  const same = pt > P.T.ptimes[0].done - P.T.cut - 0.1          // on "same?!"
  R(x, INK, 110, 306, 220, 16); R(x, '#a06c48', 114, 308, 212, 10)
  const hops = [r3(t - pt + 0.4), ...(same ? [r3(t - pt + P.T.ptimes[0].done - P.T.cut), r3(t - pt + P.T.ptimes[0].done - P.T.cut + 0.45)] : [])]
  star(x, 84, 222, 140, t, { color: LIB.color, glyph: LIB.glyph, mood: same ? 'heart' : 'sparkle', look: [1, 0], seed: 3, glow: 0.9, hops })
  star(x, 358, 222, 140, t, { color: LEO.color, glyph: LEO.glyph, mood: same ? 'heart' : 'neutral', look: [-1, same ? 0 : -1], seed: 8, glow: 0.9, hops })
  card(x, P, 220, 196, 120, -0.04, same ? clamp(prog(pt, 2.0, 2.4)) : 0)
  if (same) for (let i = 0; i < 3; i++) { const ph = ((pt - 2) * 0.5 + i / 3) % 1; heart(x, 160 + i * 60, 110 - ph * 90, 2.6, { alpha: Math.sin(Math.PI * Math.max(0, ph)) }) }
}

const EP = makePack({
  load: async () => ({ card: await new Promise(res => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = A + 'card-talk-2.png' }) }),
  caption: 'Hopeless romantic | *starter pack*', captionAccent: '#ff9fd0',
  items: [
    { label: 'window gazing', tint: '#1e2a5e', draw: windowGaze },
    { label: 'love-letter drafts (v14)', tint: '#4a2440', draw: drafts },
    { label: 'a playlist titled "us?"', tint: '#2a1f55', draw: playlist },
  ],
  twist: { label: '…a talk card', tint: '#4a2a5a', draw: talk, payoff },
  lines: [
    { text: 'every romantic has *this* exact pack.' },
    { text: 'and the *rare* item…' },
  ],
  payoffLine: { speaker: `${LEO.glyph}︎ THE DATE`, color: '#ffc27a', text: 'night owl. you? …wait, *same?*' },
  last: '*Hopeful*, actually.', lastAccent: '#ff9fd0',
  cues: T => [
    // sighs
    ...Array.from({ length: 3 }, (_, i) => ['pluck', r3(T.items[0] + 0.3 + i * 0.74), [493.88, 440, 392][i], 0.025, 0.6, 0.3]),
    // crumples
    ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.items[1] + 0.78 + i * 0.9), 0.04]),
    ...Array.from({ length: 6 }, (_, i) => ['pop', r3(T.items[1] + 0.9 + i * 0.9), 587.33, 0.02, 0.3]),
    // playlist plays
    ['bell', r3(T.items[2] + 0.4), 1174.66, 0.025, 0.8, -0.3], ['bell', r3(T.items[2] + 0.7), 1479.98, 0.022, 0.8, -0.3], ['bell', r3(T.items[2] + 1.0), 1760, 0.02, 1.0, -0.3],
    // "same?!"
    ['pop', r3(T.ptimes[0].done), 1567.98, 0.04, 0], ['bell', r3(T.ptimes[0].done + 0.05), 2349.32, 0.025, 1.0, 0], ['glitter', r3(T.ptimes[0].done), r3(T.ptimes[0].done + 0.5)],
  ],
})
void BONE; void ease

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
