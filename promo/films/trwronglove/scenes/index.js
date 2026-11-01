// trwronglove: WRONG ANSWERS ONLY, "How do you know it's love?" (20 s vertical, Star Talk Trends §17, music: chiptune · A).
// Story 0–15.6, then the shared end card. The format look lives in ./wrongkit.js (identical in all five).
//   0.0–2.3    hook: the question card "How do you know | it’s *love?*" pops, the tape slaps on, ♊ ♏ ♒ hop "me!".
//   2.3–5.0    ♊ GEMINI "When your thumbs *get tired.*"  Bubbles stream out of Gemini's phone, the thumbs sweat, the
//              TEXTS counter spins to "LOTS"; Gemini: "brb, icing my thumbs".
//   5.0–7.7    ♏ SCORPIO "When they pass *the vibe audit.*"  Sunglasses, a clipboard, four boxes tick (LAUGHS AT MY
//              JOKES… SHARES SNACKS…), a PASSED stamp; the date sweats; Scorpio: "…you may proceed."
//   7.7        card cut.
//   7.7–10.6   ♒ AQUARIUS (the unhinged third) "When the moon *sends a memo.*"  The moon leans in, a paper memo
//              zig-zags down: "MEMO: it's love. — the Moon". Aquarius: "called it."
//   10.6       the turn: Pisces sniffles "*sniff*… the real one?"
//   11.75      PISCES: "When it's *easy*."  13.0 RIGHT ANSWER stamp. In the middle: two stars on a bench sharing one
//              blanket and two cocoas, doing nothing at all, happily.
import { makeWrong, drawStarChar, R, box, bubble, label, shadow, sparkles, hearts, drawBits, starFrame, inSprite, shadesCells, pop01, outK, prog, lerp, clamp, ease, signStar, INK, BONE, GOLD, PINK, RED, MINT, INTER, MONO, PAPER, T } from './wrongkit.js'

const mate = (SIGN, seed) => (x, t, o) => drawStarChar(x, o.x, o.y, o.s, t, { color: SIGN.color, glyph: o.s >= 150 ? SIGN.glyph : null, seed, glow: 1, ...o })
const libra = mate(signStar('libra'), 11), cancer = mate(signStar('cancer'), 13), virgo = mate(signStar('virgo'), 15)
const CHECK = ['.....G', '....GG', 'G..GG.', 'GGGG..', '.GG...']

// ── ANSWER 1: thumbs, tired
function phone(x, cx, cy, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -62, -110, 124, 220, '#2a2148', { b: 7 }); R(x, '#14102a', -50, -94, 100, 180)
  for (let i = 0; i < 4; i++) R(x, i % 2 ? '#4f8df0' : '#3b3466', i % 2 ? -10 : -40, -80 + i * 42, 50, 28)
  x.restore()
}
function ans1(x, t, S) {
  const { u, t0, t1, hero } = S
  const P = { x: 420, y: 960 }
  const tired = u > 1.8
  shadow(x, P.x, 1150, 220)
  const F = starFrame(P.x, P.y, 250, t, { hops: [t0 + 0.3, t0 + 0.6, t0 + 0.9, t0 + 1.2, t0 + 1.5], seed: 3 })
  hero(x, t, { x: P.x, y: P.y, s: 250, mood: tired ? 'sleepy' : 'sparkle', look: [1, 1], hops: tired ? [] : [t0 + 0.3, t0 + 0.6, t0 + 0.9, t0 + 1.2, t0 + 1.5], zzz: false })
  const ph = { x: P.x + 150, y: F.cy + 20 }
  phone(x, ph.x, ph.y, 0.12 + (tired ? 0.25 : 0.04 * Math.sin(t * 30)))
  // thumbs: two little blobs tapping, then sweating
  for (const d of [-1, 1]) {
    const tap = tired ? 0 : 10 * Math.abs(Math.sin(t * 24 + d))
    box(x, ph.x + d * 34 - 14, ph.y + 70 - tap, 28, 34, signStar('gemini').color, { b: 4 })
  }
  if (u > 0.8) for (let i = 0; i < 3; i++) { const p = ((t * 1.6 + i / 3) % 1); drawBits(x, ['.S.', 'SSS', '.S.'], { S: '#8fe3ff' }, ph.x + 80 + i * 18, ph.y + 30 + p * 80, 5, { alpha: 1 - p }) }
  // bubbles streaming up out of the phone
  if (!tired) for (let i = 0; i < 9; i++) {
    const p = ((u * 1.3 + i / 9) % 1)
    const bx = ph.x + Math.sin(i * 2.7) * 140 + 40, by = ph.y - 120 - p * 420
    x.save(); x.globalAlpha = 1 - ease.inQuad(p)
    box(x, bx - 46, by - 18, 92, 36, i % 3 ? '#4f8df0' : '#3b3466', { b: 4 })
    for (let k = 0; k < 3; k++) R(x, BONE, bx - 30 + k * 22, by - 4, 12, 8)
    x.restore()
  }
  // the counter
  const n = Math.floor(prog(u, 0.2, 1.5) * 9999)
  label(x, 'TEXTS SENT', 760, 560, { size: 26, col: '#ffe27a' })
  label(x, u > 1.5 ? 'LOTS' : String(n).padStart(4, '0'), 760, 610, { size: u > 1.5 ? 54 : 46, col: BONE })
  bubble(x, t, 380, 700, t0 + 1.85, t1, 'brb, icing my thumbs', { size: 32, tail: 0.1 })
}

// ── ANSWER 2: the vibe audit
function ans2(x, t, S) {
  const { u, t0, t1, hero } = S
  // the clipboard
  const CX = 330, top = 470
  box(x, CX - 210, top, 420, 520, '#a07850', { b: 7 })
  box(x, CX - 180, top + 40, 360, 450, '#fbf6ea', { b: 4 })
  box(x, CX - 60, top - 22, 120, 44, '#c9d2e6', { b: 5 })
  x.save(); x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.fillStyle = INK; x.fillText('VIBE AUDIT', CX, top + 88); x.restore()
  const items = ['LAUGHS AT', 'MY JOKES', 'SHARES SNACKS', 'TEXTS BACK', 'GOOD VIBES']
  const rows = [['LAUGHS AT MY', 'JOKES'], ['SHARES', 'SNACKS'], ['TEXTS BACK'], ['THE VIBES']]
  rows.forEach((r, i) => {
    const y = top + 140 + i * 82
    box(x, CX - 150, y - 4, 36, 36, BONE, { b: 4 })
    x.save(); x.font = `700 21px ${MONO}`; x.fillStyle = INK; x.textBaseline = 'top'
    r.forEach((ln, j) => x.fillText(ln, CX - 96, y - 2 + j * 24)); x.restore()
    const ck = pop01(t, t0 + 0.55 + i * 0.3, 0.2, 3)
    if (ck > 0.01) drawBits(x, CHECK, { G: '#2fae64' }, CX - 130, y + 12, 7 * ck)
  })
  void items
  const pk = prog(u, 1.85, 1.95)
  if (pk > 0) {
    x.save(); x.translate(CX + 70, top + 440); x.rotate(-0.15); x.scale(lerp(2, 1, ease.outCubic(pk)), lerp(2, 1, ease.outCubic(pk))); x.globalAlpha = clamp(pk * 2)
    x.strokeStyle = '#2fae64'; x.lineWidth = 7; x.strokeRect(-100, -34, 200, 68)
    x.font = `800 42px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#2fae64'; x.fillText('PASSED', 0, 2); x.restore()
  }
  // Scorpio, in sunglasses
  const P = { x: 700, y: 900 }
  shadow(x, P.x, 1150, 200)
  const o = { x: P.x, y: P.y, s: 230, mood: 'neutral', look: [-1, 0], hops: [t0 + 0.3, t0 + 1.95], seed: 7 }
  hero(x, t, o)
  const F = starFrame(o.x, o.y, o.s, t, o)
  inSprite(x, F, () => shadesCells(x, u > 2.0 ? 1 : 0))
  bubble(x, t, 690, 690, t0 + 2.0, t1, '…you may proceed.', { size: 32, tail: 0 })
  // the date: sweating through it
  shadow(x, 920, 1150, 140)
  libra(x, t, { x: 920, y: 1060, s: 160, mood: u > 2.0 ? 'happy' : 'wide', look: [-1, -0.5], hops: [t0 + 2.05] })
  if (u < 2.0) for (let i = 0; i < 2; i++) { const p = ((t * 1.2 + i / 2) % 1); drawBits(x, ['.S.', 'SSS', '.S.'], { S: '#8fe3ff' }, 980 + i * 14, 990 + p * 50, 5, { alpha: 1 - p }) }
}

// ── ANSWER 3: the moon sends a memo
function ans3(x, t, S) {
  const { u, t0, t1, hero } = S
  // a big pixel moon leans in from the top-right
  const mk = ease.outBack(prog(u, 0.0, 0.5))
  const MX = lerp(1200, 820, mk), MY = 520
  x.save(); x.globalCompositeOperation = 'lighter'
  const g = x.createRadialGradient(MX, MY, 40, MX, MY, 260); g.addColorStop(0, 'rgba(255,240,190,0.25)'); g.addColorStop(1, 'rgba(255,240,190,0)')
  x.fillStyle = g; x.fillRect(MX - 260, MY - 260, 520, 520); x.restore()
  drawBits(x, ['...MMMM...', '..MMMMMM..', '.MMMMCMMM.', 'MMCMMMMMMM', 'MMMMMMMCMM', 'MMMMMMMMMM', 'MMMCMMMMMM', '.MMMMMMCM.', '..MMMMMM..', '...MMMM...'], { M: '#fff1c8', C: '#e2cfa6' }, MX, MY, 18, { rot: -0.2 })
  // its little face
  R(x, INK, MX - 50, MY - 10, 14, 14); R(x, INK, MX + 10, MY - 16, 14, 14)
  R(x, INK, MX - 30, MY + 30, 40, 8)
  // the memo zig-zags down
  const fall = prog(u, 0.55, 1.45)
  const land = { x: 430, y: 700 }
  let mx = lerp(MX - 80, land.x, fall) + Math.sin(fall * 9) * 90 * (1 - fall), my = lerp(MY + 80, land.y, ease.inOutQuad(fall))
  const open = ease.outBack(prog(u, 1.45, 1.8))
  if (u > 0.55) {
    x.save(); x.translate(mx, my); x.rotate((1 - fall) * 0.5 * Math.sin(fall * 9)); const sc = lerp(0.45, 1, open); x.scale(sc, sc)
    box(x, -190, -110, 380, 220, PAPER, { b: 6 })
    if (open > 0.2) {
      x.globalAlpha = clamp(open)
      x.font = `700 26px ${MONO}`; x.fillStyle = '#7a3a9a'; x.textAlign = 'left'; x.fillText('MEMO', -160, -66)
      R(x, 'rgba(120,150,210,0.5)', -160, -54, 320, 3)
      x.font = `800 40px ${INTER}`; x.fillStyle = INK; x.fillText('it’s love.', -160, 0)
      x.font = `italic 500 34px 'EB Garamond'`; x.fillStyle = RED; x.textAlign = 'right'; x.fillText('— the Moon', 160, 70)
    }
    x.restore()
  }
  // Aquarius, delighted
  shadow(x, 430, 1150, 200)
  hero(x, t, { x: 430, y: 990, s: 220, mood: u > 1.6 ? 'sparkle' : 'wide', look: [1, -1], hops: [t0 + 0.3, t0 + 1.55, t0 + 1.85] })
  sparkles(x, t, 430, 700, t0 + 1.5, 10, 230, 1, [GOLD, BONE, '#7fd0ff'])
  bubble(x, t, 760, 920, t0 + 2.0, t1, 'called it.', { size: 34, tail: -0.5 })
}

// ── the finale: two stars on a bench, one blanket, two cocoas, nothing happening, happily
function finale(x, t, S) {
  const { ok } = S
  const k = pop01(t, T.undock[0] + 0.15, 0.4, 2.2) * ok
  if (k <= 0.01) return
  x.save(); x.translate(530, 1200); x.scale(1.3 * k, 1.3 * k); x.translate(-530, -1170)
  // bench
  box(x, 330, 1100, 400, 24, '#8a5a3c', { b: 6, hi: '#a8714c' })
  box(x, 350, 1130, 20, 70, '#6b4430', { b: 5 }); box(x, 690, 1130, 20, 70, '#6b4430', { b: 5 })
  box(x, 330, 990, 400, 20, '#8a5a3c', { b: 6 })
  const lean = t > T.right ? 1 : 0
  cancer(x, t, { x: 450 + lean * 12, y: 1010, s: 180, mood: 'happy', look: [1, 0], hops: [T.right + 0.1] })
  virgo(x, t, { x: 615 - lean * 12, y: 1010, s: 180, mood: t > T.right ? 'happy' : 'sleepy', zzz: false, look: [-1, 0], hops: [T.right + 0.15] })
  // the shared blanket over both laps
  box(x, 380, 1060, 300, 46, '#ff8fb1', { b: 5 })
  for (let i = 0; i < 6; i++) R(x, '#ffd0e0', 392 + i * 48, 1070, 22, 26)
  // cocoas
  for (const [mx, d] of [[400, 0], [660, 1]]) {
    box(x, mx - 18, 1030, 36, 34, d ? '#7fd0ff' : GOLD, { b: 4 })
    for (let i = 0; i < 2; i++) { const p = ((t * 0.8 + i / 2 + d * 0.3) % 1); x.save(); x.globalAlpha = 0.6 * (1 - p); R(x, BONE, mx - 6 + Math.sin(p * 6 + i) * 6, 1010 - p * 60, 8, 14); x.restore() }
  }
  x.restore()
  hearts(x, t, T.right + 0.3, 530, 860, { n: 6, spread: 220 })
  sparkles(x, t, 530, 900, T.right + 0.25, 10, 160, 2, [GOLD, PINK, BONE])
}

const EP = makeWrong({
  q: 'How do you know | it’s *love?*', deep: '#b8326a',
  answers: [
    { sign: 'gemini', text: '“When your thumbs | *get tired.*”', draw: ans1,
      cues: [...Array.from({ length: 12 }, (_, i) => ['tick', +(0.3 + i * 0.11).toFixed(3), 0.025]), ['pop', 1.5, 1318.51, 0.04, 0.3], ['pop', 1.85, 587.33, 0.035, -0.2]] },
    { sign: 'scorpio', text: '“When they pass | *the vibe audit.*”', draw: ans2, pis: { look: [-1, -1] },
      cues: [...[0, 1, 2, 3].map(i => ['pop', +(0.55 + i * 0.3).toFixed(3), [880, 987.77, 1174.66, 1318.51][i], 0.035, -0.3]), ['tick', 1.9, 0.07], ['tom', 1.9, 120, { gain: 0.12, decay: 0.12 }], ['pop', 2.0, 659.25, 0.035, 0.1]] },
    { sign: 'aquarius', text: '“When the moon | *sends a memo.*”', draw: ans3,
      cues: [['whoosh', 0.05, 0.4, 0.03], ['pluck', 0.4, 1174.66, 0.03, 0.6, 0.4], ['whoosh', 0.6, 0.8, 0.02], ['tick', 1.45, 0.05], ['pop', 1.5, 1567.98, 0.04, 0], ['glitter', 1.5, 1.9], ['pop', 2.0, 880, 0.035, 0.3]] },
  ],
  hookBubbles: ['ooh!', 'me!!', 'I KNOW'],
  speaker: 'PISCES', askY: 760, ask: '*sniff*… the real one?',
  last: 'When it’s *easy*.',
  finale,
  finaleCues: [['pop', +(T.undock[0] + 0.2).toFixed(3), 1174.66, 0.035, 0], ['pluck', +(T.right + 0.25).toFixed(3), 1567.98, 0.035, 0.6, 0.3]],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, MINT, label]
