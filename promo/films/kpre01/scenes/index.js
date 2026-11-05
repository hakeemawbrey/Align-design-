// kpre01: PISCES REACTS, "They laughed at the terrible pun" (9 s vertical trial reel, star_advice, music: chiptune · C).
// Loop. The look lives in ./reactkit.js (shared by kpre01–06).
//   0.00   frame 0: a café at night. Pisces (front table) mid-sob, tears jetting, its teacup rattling; behind it Gemini
//          sparkle-eyed and Libra mid-laugh. Hook: "They laughed at the *pun.*"
//   0.38   record scratch, freeze, red scribble on Pisces · 0.72 rewind "◀◀ 8 SECONDS EARLIER"
//   1.12   the moment: Gemini and Libra sip · Gemini: "i'm a little TEA-rrified." · a beat of silence (Libra deadpan,
//          Pisces braces) · Libra SNORT-laughs, really laughs (HA! HA!) · Gemini goes heart-eyed, blushing
//   5.32   Pisces breaks: "THEY LAUGHED." fountains · 5.82 last line "Laughing at the bad pun? *Marry* them."
//   8.55   the loop eases back into frame 0.
import { makeReact, R, box, shadow, bubble, drawStarChar, signStar, drawBits, sparkles, pop01, outK, prog, clamp, lerp, ease, INK, BONE, GOLD, PINK, INTER } from './reactkit.js'

const GEM = signStar('gemini'), LIB = signStar('libra')
const U = { pun: 0.35, deadpan: 1.45, snort: 2.05, heart: 3.0, END: 4.2 }

function set(x, c) {
  // warm café wall, a night window, two pendant lamps
  R(x, '#2c1d3c', 0, 0, 1080, 1920)
  R(x, '#3a2850', 0, 520, 1080, 960)
  for (let i = 0; i < 9; i++) R(x, 'rgba(255,255,255,0.025)', i * 130, 520, 60, 900)
  box(x, 300, 560, 480, 300, '#121032', { b: 10 })
  R(x, '#1d1a4a', 300, 560, 480, 150)
  for (let i = 0; i < 14; i++) { const sx = 320 + ((i * 97) % 440), sy = 580 + ((i * 53) % 250), tw = 0.5 + 0.5 * Math.sin(c * 3 + i); x.globalAlpha = tw; R(x, '#fff6d8', sx, sy, 6, 6) }
  x.globalAlpha = 1
  R(x, INK, 534, 560, 12, 300); R(x, INK, 300, 704, 480, 10)
  for (const lx of [210, 870]) {
    R(x, INK, lx - 3, 380, 6, 200)
    box(x, lx - 50, 580, 100, 46, '#e6a64a', { b: 6 })
    x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(lx, 640, 10, lx, 640, 320); g.addColorStop(0, 'rgba(255,200,120,0.28)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(lx - 320, 320, 640, 640); x.restore()
  }
  // floor
  R(x, '#1e1530', 0, 1480, 1080, 440); R(x, INK, 0, 1474, 1080, 10)
  for (let i = 0; i < 8; i++) R(x, 'rgba(255,255,255,0.04)', i * 150 - 40, 1440 + (i % 2) * 80, 120, 18)
}

function cup(x, cx, cy, col, rattle = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rattle)
  box(x, -28, -40, 56, 44, col, { b: 5 }); R(x, INK, 28, -32, 16, 6); R(x, INK, 38, -32, 6, 26); R(x, INK, 28, -12, 16, 6)
  box(x, -42, 4, 84, 10, BONE, { b: 4 })
  x.restore()
}

function moment(x, c, u) {
  // the back table
  shadow(x, 540, 1235, 680, 0.3)
  box(x, 200, 1090, 680, 34, '#7a4f3a', { b: 6, hi: 'rgba(255,255,255,0.18)' })
  R(x, INK, 520, 1124, 40, 110); R(x, '#5a3a2a', 528, 1124, 24, 110)
  cup(x, 400, 1086, '#f2a3b8'); cup(x, 680, 1086, '#9fd8ff')
  // Gemini: the pun, then heart-eyes
  const gm = u < U.pun ? 'happy' : u < U.deadpan ? 'sparkle' : u < U.snort ? 'wide' : u < U.heart ? 'happy' : 'heart'
  drawStarChar(x, 290, 945, 300, c, { color: GEM.color, glyph: GEM.glyph, mood: gm, look: [1, 0], seed: 4, blush: u > U.snort ? 1 : undefined, squash: u > U.snort && u < U.heart ? 0.05 * Math.sin(c * 18) : 0 })
  // Libra: deadpan, then the snort-laugh (keeps laughing)
  const laughing = u >= U.snort
  const lm = u < U.deadpan ? 'neutral' : u < U.snort ? 'squint' : 'happy'
  drawStarChar(x, 790, 945, 300, c, { color: LIB.color, glyph: LIB.glyph, mood: lm, look: [-1, 0], seed: 9, squash: laughing ? 0.09 * Math.sin(c * 26) : 0, bob: laughing ? 14 : undefined })
  // the pun bubble
  if (u >= U.pun && u < U.snort + 0.4) bubble(x, u, 360, 690, U.pun, U.snort + 0.2, 'i’m a little TEA-rrified.', { size: 50, tail: -0.4 })
  // the silence: "…"
  if (u >= U.deadpan && u < U.snort) { x.save(); x.globalAlpha = Math.sin(Math.PI * prog(u, U.deadpan, U.snort)); x.font = `800 60px ${INTER}`; x.fillStyle = BONE; x.textAlign = 'center'; x.fillText('…', 790, 740); x.restore() }
  // SNRK! then HA! HA! (looping while it laughs)
  if (laughing) {
    const sk = pop01(u, U.snort, 0.22, 3) * outK(u, [U.snort + 0.7, U.snort + 0.9])
    if (sk > 0.01) { x.save(); x.translate(830, 690); x.rotate(0.15); x.scale(sk, sk); x.font = `900 76px ${INTER}`; x.textAlign = 'center'; x.lineWidth = 14; x.strokeStyle = INK; x.strokeText('SNRK!', 0, 0); x.fillStyle = GOLD; x.fillText('SNRK!', 0, 0); x.restore() }
    for (let i = 0; i < 3; i++) {
      const ph = (((c * 1.4 + i / 3) % 1) + 1) % 1
      if (u < U.snort + 0.6) continue
      x.save(); x.globalAlpha = Math.sin(Math.PI * ph); x.font = `900 ${44 + i * 6}px ${INTER}`; x.textAlign = 'center'; x.lineWidth = 10; x.strokeStyle = INK
      const hx = 800 + [-150, 130, 20][i] + Math.sin(ph * 6) * 10, hy = 770 - ph * 160
      x.strokeText('HA!', hx, hy); x.fillStyle = BONE; x.fillText('HA!', hx, hy); x.restore()
    }
    sparkles(x, u, 790, 900, U.snort, 10, 170, 2, [GOLD, BONE, PINK])
  }
  if (u >= U.heart) {
    for (let i = 0; i < 4; i++) { const ph = (((c * 0.9 + i / 4) % 1) + 1) % 1; drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 290 + Math.sin(ph * 5 + i) * 70, 790 - ph * 190, 7, { alpha: Math.sin(Math.PI * ph) }) }
  }
}

// Pisces's front table (over Pisces's lower half), cup rattling while it sobs
function front(x, c, u) {
  box(x, 480, 1500, 640, 36, '#8a5a40', { b: 7, hi: 'rgba(255,255,255,0.16)' })
  R(x, INK, 960, 1536, 40, 300); R(x, '#5a3a2a', 968, 1536, 24, 300)
  const sob = u >= U.END
  cup(x, 580, 1494, '#c9a6ff', sob ? 0.12 * Math.sin(c * 40) : 0)
}

const EP = makeReact({
  id: 'kpre01', D: 9, loop: true, END: U.END, accent: '#ffd23a',
  hook: 'They laughed | at the *pun.*',
  set, moment, front,
  pis: { x: 800, y: 1340, s: 400, look: [-1, -0.6] },
  react: [[0, 0, 'neutral'], [U.pun + 0.5, 0, 'squint'], [U.deadpan, 1, 'wide'], [U.snort, 2, 'wide'], [U.heart, 2, 'sparkle']],
  line: { text: 'THEY LAUGHED.', x: 400, y: 1180, size: 56, col: '#ffe9a8', tail: 0.6 },
  last: 'Laughing at the bad pun? *Marry* them.',
  cues: T => [
    ['pop', T.u(U.pun), 987.77, 0.04, -0.3], ['pop', T.u(U.pun) + 0.12, 1174.66, 0.03, -0.3],
    ['tick', T.u(U.deadpan), 0.03], ['pluck', T.u(U.deadpan) + 0.25, 2637, 0.01, 0.1, 0.3], ['pluck', T.u(U.deadpan) + 0.34, 2637, 0.01, 0.1, 0.3],
    ['pop', T.u(U.snort), 330, 0.07, 0.3], ['clap', T.u(U.snort) + 0.05, { gain: 0.12, pan: 0.3 }], ['glitter', T.u(U.snort), T.u(U.snort) + 0.4],
    ['pop', T.u(U.snort) + 0.6, 1318.51, 0.03, 0.3], ['pop', T.u(U.snort) + 0.9, 1567.98, 0.03, 0.35], ['pop', T.u(U.snort) + 1.2, 1318.51, 0.03, 0.3],
    ['pluck', T.u(U.heart), 1174.66, 0.04, 0.5, -0.3], ['pluck', T.u(U.heart) + 0.12, 1567.98, 0.035, 0.5, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const TIMES = EP.T
void [lerp, ease, clamp]
