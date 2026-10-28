// st6pisces (75 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 12, the season finale) · story 0–70.6,
//   then the shared end card. A documentary profile of Pisces (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  PISCES, a little daydream bubble over its head (season 3): "sorry, i was somewhere else. …okay. *here.*"
//   TITLE      BEHIND THE SIGN · ♓ PISCES · *the dreamer.* · WATER · RULED BY NEPTUNE & JUPITER / MUTABLE · THE FISH ·
//              FEB 19 – MAR 20 (the ruler moved up a row so the long strip fits)
//   I MYTH     archive footage: in Greek myth Aphrodite and Eros fled the monster Typhon (the storm shadow from EP 10);
//              they became two fish, tied with a cord (hand-tinted gold) so they wouldn't lose each other.
//   II SKY     the real figure: the Circlet (γ κ λ ι θ), ω δ ε μ ν ξ to the knot, Alrescha, then ο up to Alpherg and the
//              northern fish (χ φ υ τ). Alpherg labelled (the brightest) and Alrescha ("the cord"). The March equinox
//              point (RA 0h, Dec 0°) marked: precession moved it into Pisces; it drifts toward Aquarius, hence the "Age of
//              Aquarius" talk. Neptune (found 1846) the modern ruler, Jupiter the traditional. PISCES: "one of them's the
//              god of the *sea.* obviously."
//   III CLOSE  why it daydreams ("real life was *loud.*"), how it loves, Virgo cutaway (tissues on the list), the two
//              daydream cats from season 4 (real now), and what scares it.
//   TAKEAWAY   "Tie a cord. *Don't* let go."  The season closes: the other eleven stars pop into the sky round Pisces,
//              one by one in zodiac order, and a gold cord draws on through all twelve.
//   The ghost rises up between the two cats.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { SIGNS, easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { makeEpisode, drawBits, pixLine, monoText, KID, KID_C, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const TYPHON = [         // the storm-cloud monster (as in EP 10)
  '...cc.....cc....',
  '..cCCc...cCCc...',
  '.cCCCCcccCCCCc..',
  'cCCCCCCCCCCCCCc.',
  'CCCCRCCCCRCCCCCc',
  'CCCCCCCCCCCCCCCC',
  '.CCCCCCCCCCCCCC.',
  'cCCCCCCCCCCCCCc.',
  '.CC.CCCC.CCCC.Cc',
  '.c...CC...CC...c',
  '......c....c....',
]
const GODDESS = [        // Aphrodite, long hair, gown
  '....hhhh....',
  '...hSSSSh...',
  '...hSESSh...',
  '...hSSSSh...',
  '...hhSShh...',
  '..hDDDDDDh..',
  '..SDDDDDDS..',
  '...DDDDDD...',
  '...DDDDDD...',
  '..DDDDDDDD..',
  '..DDDDDDDD..',
  '.DDDDDDDDDD.',
]
const GODDESS_C = { h: '#c8963e', S: '#e8b48a', E: '#2a1a12', D: '#f3ead8' }
const WINGS = ['WW...WW', 'WWW.WWW', '.WW.WW.']
const FISH = [           // a fish, facing right
  '......FFF....',
  '....FFFFFFF..',
  'T..FFFFFFEFF.',
  'TTFFFFFFFFFFF',
  'T..FFFFFFFFF.',
  '....FFFFFFF..',
  '......FFF....',
]
const CAT = ['O...O..', 'OO.OO..', 'OOOOO..', 'OeOeO..', 'OOpOO..', '.OOO...', 'OOOOO..', 'OOOOOO.', 'OOOOO.O', 'OOOOOOO']
const CAT_O = { O: '#f2a65a', e: INK, p: '#ff8fb1' }, CAT_G = { O: '#8a82a8', e: INK, p: '#ff8fb1' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const HEART_C = { H: '#ff4f86', W: '#ffd1de' }

function river(ctx, t, P, y0) {
  ctx.fillStyle = '#4a6a7a'; ctx.fillRect(P.x0, y0, P.x1 - P.x0, P.y1 - y0)
  ctx.fillStyle = '#8ab0c0'
  for (let xx = P.x0; xx < P.x1; xx += 36) { const o = Math.round(Math.sin(xx * 0.05 + t * 2.5) * 6); ctx.fillRect(xx, y0 + 4 + o, 20, 5) }
}
// two fish circling, a cord between them
const fishPos = (t, i) => { const a = t * 0.9 + i * Math.PI; return { x: 540 + Math.cos(a) * 230, y: 930 + Math.sin(a) * 120, a } }
function tableau(ctx, t, { tab, tabAt, P }) {
  if (tab === 0) {
    // Typhon looms (left); Aphrodite and little winged Eros at the river's edge
    ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, 1130, P.x1 - P.x0, P.y1 - 1130)
    river(ctx, t, { ...P, x0: 720 }, 1150)
    const sw = Math.round(Math.sin(t * 1.5) * 10 + clamp((t - tabAt) / 4) * 50)
    drawBits(ctx, TYPHON, { C: '#6a5a4a', c: '#9a8a74', R: '#ff5a3a' }, 250 + sw, 790, 22)
    drawBits(ctx, GODDESS, GODDESS_C, 610, 1030, 16)
    const fl = Math.sin(t * 10) > 0
    drawBits(ctx, fl ? WINGS : WINGS.slice(1), { W: '#f3ead8' }, 730, 1010, 8)
    drawBits(ctx, KID, { ...KID_C, h: '#c8963e' }, 730, 1060, 13)
  } else {
    // two fish, circling, tied together
    river(ctx, t, P, 1180)
    const A = fishPos(t, 0), B = fishPos(t, 1)
    ;[A, B].forEach(f => drawBits(ctx, FISH, { F: '#b8a88a', T: '#8a7a5a', E: '#2a1a12' }, Math.round(f.x), Math.round(f.y), 14, { flip: Math.sin(f.a) > 0 }))
    for (let i = 0; i < 8; i++) { const ph = (t * 0.5 + i / 8) % 1; ctx.fillStyle = '#e8dcc0'; ctx.fillRect(Math.round(200 + i * 90), Math.round(1160 - ph * 500), 8, 8) }
  }
}
function tint(ctx, t, { tab, tabAt }) {
  if (tab === 0) {
    const sw = Math.round(Math.sin(t * 1.5) * 10 + clamp((t - tabAt) / 4) * 50)
    drawBits(ctx, TYPHON.map(r => r.replace(/[^R]/g, '.')), { R: '#ff4a2a' }, 250 + sw, 790, 22, { outline: null })
  } else {
    // the cord, hand-tinted gold, drawn on between the two fish
    const A = fishPos(t, 0), B = fishPos(t, 1), p = ease.outCubic(clamp((t - tabAt - 0.6) / 1.2))
    const ax = A.x - Math.cos(A.a + Math.PI / 2) * 0, ay = A.y
    pixLine(ctx, ax, ay, lerp(ax, B.x, p), lerp(ay, B.y, p), 1, '#f7cf68', { s: 8, step: 14, alpha: 1 })
    if (p >= 1) drawPixelStar(ctx, (A.x + B.x) / 2, (A.y + B.y) / 2, 34, 0, '#f7cf68', '#ffffff')
  }
}

// ── the sky (RA h, Dec °, V mag); the Circlet's RAs are written just below 0h so the figure doesn't wrap
const STARS = [
  { id: 'gamma', ra: -0.7138, dec: 3.282, mag: 3.69 },
  { id: 'kappa', ra: -0.5512, dec: 1.256, mag: 4.94 },
  { id: 'lambda', ra: -0.2996, dec: 1.780, mag: 4.49 },
  { id: 'iota', ra: -0.3342, dec: 5.626, mag: 4.13 },
  { id: 'theta', ra: -0.5341, dec: 6.379, mag: 4.27 },
  { id: 'omega', ra: -0.0115, dec: 6.863, mag: 4.03 },
  { id: 'delta', ra: 0.8114, dec: 7.585, mag: 4.43 },
  { id: 'eps', ra: 1.0491, dec: 7.890, mag: 4.27 },
  { id: 'mu', ra: 1.5030, dec: 6.144, mag: 4.84 },
  { id: 'nu', ra: 1.6905, dec: 5.488, mag: 4.44 },
  { id: 'xi', ra: 1.8925, dec: 3.187, mag: 4.62 },
  { id: 'alrescha', ra: 2.0341, dec: 2.764, mag: 3.82 },
  { id: 'omicron', ra: 1.7565, dec: 9.158, mag: 4.26 },
  { id: 'alpherg', ra: 1.5248, dec: 15.346, mag: 3.62 },
  { id: 'chi', ra: 1.1916, dec: 21.034, mag: 4.66 },
  { id: 'phi', ra: 1.2290, dec: 24.583, mag: 4.65 },
  { id: 'upsilon', ra: 1.3247, dec: 27.264, mag: 4.74 },
  { id: 'tau', ra: 1.1944, dec: 30.090, mag: 4.51 },
  { id: 'eq', ra: 0, dec: 0, mag: 9, hide: true },          // the March equinox point
]
let EP = null
function skyExtras(ctx, t, { pos }) {
  // the knot glows gold while Alrescha is named
  const L0 = EP.LINES.sky[0], k0 = prog(t, L0.t + 0.3, L0.t + 0.8)
  if (k0 > 0) { const a = pos('alrescha'); drawPixelStar(ctx, a.x, a.y, 34 * k0, 0, '#f7cf68', '#ffffff') }
  // the March equinox point, and its slow drift west toward Aquarius
  const L = EP.LINES.sky[1], p = ease.outCubic(prog(t, L.t + 0.4, L.t + 1.0))
  if (p <= 0) return
  const e = pos('eq')
  ctx.save(); ctx.globalAlpha *= p
  ctx.fillStyle = GOLD
  ctx.fillRect(Math.round(e.x) - 14, Math.round(e.y) - 3, 28, 6); ctx.fillRect(Math.round(e.x) - 3, Math.round(e.y) - 14, 6, 28)
  const n = Math.floor((t - L.t - 0.4) / 0.03) + 1
  monoText(ctx, 'MARCH EQUINOX POINT', e.x, e.y + 34, { size: 20, color: GOLD, spacing: 0.08, n })
  const L2 = EP.LINES.sky[2], q = ease.outCubic(prog(t, L2.t + 0.3, L2.t + 1.6))
  if (q > 0) {
    // drifting west (right on the chart), toward Aquarius, under the Circlet
    const ay = e.y + 72
    pixLine(ctx, e.x, e.y + 52, e.x, ay, 1, GOLD, { s: 6, step: 10, alpha: 0.9 })
    pixLine(ctx, e.x, ay, lerp(e.x, 960, q), ay, 1, GOLD, { s: 6, step: 14, alpha: 0.9 })
    if (q > 0.95) { drawBits(ctx, ['X..', 'XX.', 'XXX', 'XX.', 'X..'], { X: GOLD }, 968, ay, 5, { outline: null }); monoText(ctx, 'TOWARD AQUARIUS', 960, ay + 30, { size: 18, color: BONE, spacing: 0.08, align: 'right', n: Math.floor((t - L2.t - 1.6) / 0.03) + 1 }) }
  }
  ctx.restore()
}

// ── the cats (season 4: the daydream cats, real now)
const CATS = [{ x: 190, y: 1090, col: CAT_O, flip: false }, { x: 330, y: 1090, col: CAT_G, flip: true }]
function catsK(t) { const it = EP.T.items[2]; return ease.outCubic(prog(t, it.q + 0.2, it.q + 0.6)) * (1 - prog(t, it.end - 0.3, it.end)) }
function drawCats(ctx, t, k) {
  const a = catsK(t) * k
  if (a <= 0) return
  ctx.save(); ctx.globalAlpha *= a
  CATS.forEach((c, i) => {
    const tail = Math.sin(t * 3 + i) > 0.3
    const bm = tail ? CAT : CAT.map((r, j) => j === 8 ? 'OOOOOO.' : r)
    drawBits(ctx, bm, c.col, c.x, c.y, 18, { flip: c.flip })
  })
  ctx.restore()
}

// ── the daydream bubble over its head (gone for the takeaway: it's here now)
function prop(ctx, t, r, { seg, size }) {
  if (seg === 'take' || seg === 'sky') return
  const c = Math.max(3, Math.round(size / 40))
  const bx = r.x + size * 0.42, by = r.top - size * 0.12
  ctx.fillStyle = INK
  ;[[r.x + size * 0.2, r.top + size * 0.02, 2], [r.x + size * 0.3, r.top - size * 0.04, 3]].forEach(([x, y, s]) => { ctx.fillStyle = INK; ctx.fillRect(Math.round(x - s * c / 2 - 2), Math.round(y - s * c / 2 - 2), s * c + 4, s * c + 4); ctx.fillStyle = '#efe6f8'; ctx.fillRect(Math.round(x - s * c / 2), Math.round(y - s * c / 2), s * c, s * c) })
  const w = 22 * c, h = 15 * c
  ctx.fillStyle = INK; ctx.fillRect(Math.round(bx - w / 2 - 3), Math.round(by - h / 2), w + 6, h); ctx.fillRect(Math.round(bx - w / 2 + c), Math.round(by - h / 2 - 3), w - 2 * c, h + 6)
  ctx.fillStyle = '#efe6f8'; ctx.fillRect(Math.round(bx - w / 2), Math.round(by - h / 2 + c), w, h - 2 * c); ctx.fillRect(Math.round(bx - w / 2 + c), Math.round(by - h / 2), w - 2 * c, h)
  drawBits(ctx, HEART, HEART_C, Math.round(bx), Math.round(by + Math.sin(t * 3) * c * 0.5), c * 1.6)
}

// ── the season closes: all twelve stars in the sky
const RING = { x: 540, y: 1170, rx: 420, ry: 330 }
const ringAt = i => { const a = -Math.PI / 2 + (i + 0.5) * (Math.PI * 2 / 11); return { x: RING.x + Math.cos(a) * RING.rx, y: RING.y + Math.sin(a) * RING.ry } }
function finale(ctx, t, { seg }) {
  if (seg !== 'take') return
  const t0 = EP.T.take[0] + 0.3
  const others = SIGNS.filter(s => s.id !== 'pisces')
  const P = others.map((_, i) => ringAt(i))
  // the cord, drawing on through the ring once every star is up
  const c0 = t0 + others.length * 0.16 + 0.2
  const cp = clamp((t - c0) / 1.6)
  if (cp > 0) {
    const segs = P.length, done = cp * segs
    for (let i = 0; i < segs; i++) {
      const f = clamp(done - i); if (f <= 0) break
      const A = P[i], B = P[(i + 1) % segs]
      pixLine(ctx, A.x, A.y, lerp(A.x, B.x, f), lerp(A.y, B.y, f), 1, GOLD, { s: 7, step: 13, alpha: 1 })
    }
  }
  others.forEach((s, i) => {
    const p = easeOutBack(prog(t, t0 + i * 0.16, t0 + i * 0.16 + 0.35), 2.4)
    if (p <= 0) return
    drawStarChar(ctx, P[i].x, P[i].y, 110, t, { color: s.color, glyph: null, mood: i % 3 === 1 ? 'heart' : 'happy', look: [Math.sign(RING.x - P[i].x) * 0.6, 0], pop: p, seed: 20 + i, glow: 0.8 })
  })
}

const SPEC = {
  id: 'st6pisces', sign: 'pisces', ep: 12, duration: 75, pitch: 783.99,
  cold: [{ text: 'sorry, i was somewhere else. …okay. *here.*', mood: 'sleepy', look: [1, -1] }],
  title: { accent: 'the dreamer.', facts: [['WATER', 'RULED BY NEPTUNE & JUPITER'], ['MUTABLE', 'THE FISH', 'FEB 19 – MAR 20']] },
  myth: {
    head: 'Tied *together.*',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, Aphrodite and Eros fled the monster *Typhon.*' },
      { who: 'stars', tab: 1, text: 'they became two fish, tied by a cord so they wouldn’t lose each *other.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'Two *fish.*',
    map: { name: 'Pisces', stars: STARS, bright: 'alpherg', brightCol: '#cfe2ff',
      lines: [['gamma', 'kappa'], ['kappa', 'lambda'], ['lambda', 'iota'], ['iota', 'theta'], ['theta', 'gamma'], ['iota', 'omega'], ['omega', 'delta'], ['delta', 'eps'], ['eps', 'mu'], ['mu', 'nu'], ['nu', 'xi'], ['xi', 'alrescha'], ['alrescha', 'omicron'], ['omicron', 'alpherg'], ['alpherg', 'chi'], ['chi', 'phi'], ['phi', 'upsilon'], ['phi', 'tau']],
      box: { cx: 540, cy: 870, w: 820, h: 500 },
      labels: [
        { star: 'alpherg', text: 'ALPHERG', sub: 'ITS BRIGHTEST STAR', dx: 60, dy: 30, align: 'left', at: 1.5, size: 34, subSize: 20 },
        { star: 'alrescha', text: 'ALRESCHA', sub: '“THE CORD”', dx: 30, dy: 64, align: 'left', at: 1.9, size: 28, subSize: 20 },
      ] },
    lines: [
      { who: 'stars', text: 'the knot is the star Alrescha. its name means “the *cord.*”' },
      { who: 'stars', text: 'precession has moved the March equinox point into *Pisces.*' },
      { who: 'stars', text: 'it’s drifting toward Aquarius: hence “Age of Aquarius” *talk.*' },
      { who: 'stars', text: 'Neptune, found in 1846, is its modern ruler. Jupiter, the *traditional.*' },
      { text: 'one of them’s the god of the *sea.* obviously.', mood: 'wink' },
    ],
    heroAt: [900, 690],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 12 · MUTABLE WATER',
    cutChyron: 'CUTAWAY · THE PARTNER',
    draw: (ctx, t, { k }) => drawCats(ctx, t, k),
    items: [
      { q: 'Q. Why the | *daydreams?*', lines: [{ text: 'i daydream because real life was *loud.*', mood: 'neutral', look: [0, 1] }] },
      { q: 'Q. How do you | *love?*', lines: [
        { text: 'with my whole imagination. then i let the real you *in.*', mood: 'heart' },
        { who: 'virgo', text: 'it cries at ads. tissues are on the *list* now.' },
      ] },
      { q: 'Q. The *cats?*', lines: [{ text: 'real now. two of them. they sleep on the *dream* side.', mood: 'happy', look: [-1, 1] }] },
      { q: 'Q. What *scares* you?', lines: [{ text: 'that the dream is nicer than the real thing. it *isn’t.*', mood: 'neutral', look: [0, 0] }] },
    ],
  },
  takeaway: { min: 8, text: 'Tie a cord. | *Don’t* let go.', words: 6, top: 300, size: 104, accentSize: 160, byY: 650 },
  hero: { under: finale, prop, state: (t, seg) => seg === 'take' ? { mood: 'heart', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, 1] } : { mood: 'happy' } },
  ghost: { seg: 'personal', item: 2, at: 1.4, x: 260, y: 1170, from: 'below', cell: 3, where: 'rising up between the two cats on the interview floor (III · UP CLOSE, the cats beat)' },
}
EP = makeEpisode(SPEC)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
