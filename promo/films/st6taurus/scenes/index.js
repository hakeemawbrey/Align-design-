// st6taurus (60 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 02) · story 0–55.6, then the shared end card.
//   A documentary profile of Taurus (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  TAURUS, in its quilt cape with a bowl of popcorn: "you want the story? sit down. this takes a *minute.*"
//   TITLE      BEHIND THE SIGN · ♉ TAURUS · *the steady one.* · EARTH · FIXED · RULED BY VENUS / THE BULL · APR 20 – MAY 20
//   I MYTH     archive footage: in Greek myth Zeus becomes a gentle white bull in a meadow where Europa picks flowers,
//              then swims her across the sea to Crete.
//   II SKY     the real figure (the Hyades V, the horns to Elnath and ζ Tau). Aldebaran labelled: the bull's red eye.
//              The Pleiades (on the shoulder) and the Hyades (the V of the face) draw in: two real clusters ride along.
//   III CLOSE  why so slow ("i'm slow because i'm *sure.*"), how it loves (food and touch), what scares it (change it
//              didn't choose), Scorpio cutaway (the last kolache, season 4), and what it wishes someone asked.
//   TAKEAWAY   "I don't rush. I *stay.*"
//   The ghost leans out from behind the star chart's right edge, beside the Pleiades.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, pixLine, monoText, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'

// ── pixel bitmaps
const BULL = [
  '......................H.',
  '.................H...HH.',
  '.................HH.HH..',
  '..................WWWW..',
  '....WWWWWWWWWWWWWWWWEWW.',
  '.tWWWWWWWWWWWWWWWWWWWWWn',
  't.WWWWWWWWWwWWWWWWWWWWnn',
  't.WWWWWWWWWWWWWWWWW.WW..',
  '..WWWWWwWWWWWWWWWWW.....',
  '..WWWWWWWWWWWWWWWWW.....',
  '..LL.LL.......LL.LL.....',
  '..LL.LL.......LL.LL.....',
  '..hh.hh.......hh.hh.....',
]
const BULL_C = { H: '#e8dcc0', W: '#fbf7ee', w: '#d9d2c8', E: '#1b1236', n: '#e7b7a8', t: '#d9d2c8', L: '#efe9dd', h: '#6a5440' }
const EUROPA = [
  '..hhh..',
  '.hSSSh.',
  '.hSESh.',
  '.hSSSh.',
  '.hDDDh.',
  'SDDDDDS',
  '..DDD..',
  '.DDDDD.',
  'DDDDDDD',
  '.S...S.',
]
const EUROPA_C = { h: '#4a2e1a', S: '#e8b48a', E: '#2a1a12', D: '#d8c6e8' }
const FLOWER = ['.P.', 'PYP', '.P.', '.g.', '.g.']
const FLOWER_C = { P: '#ff8fb1', Y: '#f7c948', g: '#5f8a4a' }
const ISLAND = [
  '..........GGGG..........',
  '.......GGGGGGGGGG.......',
  '....GGGGGGGgGGGGGGGG....',
  '..rrrrGGGGGGGGGGGrrrrr..',
  'rrrrrrrrrrrrrrrrrrrrrrrr',
]
const ISLAND_C = { G: '#7a9a5a', g: '#a8c47a', r: '#a07a52' }
const CORN = ['.WWW.', 'WWYWW', 'WWWWW', '.WYW.']
const BOWL = ['RRRRRRRRRRR', 'RWRRRRRRRWR', '.RRRRRRRRR.', '..RRRRRRR..', '...rrrrr...']
const QUILT = ['#e9b24a', '#c75b3a', '#f3e2c0', '#8bbf7a', '#e07a5f', '#f7d488']

function waves(ctx, t, y0, P, { col = '#3f6f9a', hi = '#9fd0e8' } = {}) {
  ctx.fillStyle = col; ctx.fillRect(P.x0, y0 + 20, P.x1 - P.x0, P.y1 - y0)
  for (let xx = P.x0; xx < P.x1; xx += 12) {
    const h = Math.round(10 + 8 * Math.sin(xx * 0.03 + t * 2.4) + 5 * Math.sin(xx * 0.071 - t * 1.7))
    ctx.fillStyle = col; ctx.fillRect(xx, y0 + 20 - h, 12, h)
    ctx.fillStyle = hi; ctx.fillRect(xx, y0 + 20 - h, 12, 6)
  }
}

// ── the myth: two tableaux
function tableau(ctx, t, { tab, tabAt, P }) {
  if (tab === 0) {
    // a meadow: Europa with flowers, the white bull walking up, gentle, a heart floating
    ctx.fillStyle = '#6f8f4f'; ctx.fillRect(P.x0, 1110, P.x1 - P.x0, P.y1 - 1110)
    ctx.fillStyle = '#8fb06a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1104 + ((xx / 24) % 2) * 4, 12, 8)
    for (let i = 0; i < 9; i++) drawBits(ctx, FLOWER, FLOWER_C, P.x0 + 50 + i * 95, 1150 + (i % 3) * 36, 8, { outline: null })
    drawBits(ctx, EUROPA, EUROPA_C, 300, 1010, 14)
    drawBits(ctx, FLOWER, FLOWER_C, 368, 990, 10, { outline: null })
    const p = clamp((t - tabAt) / 3)
    const bx = lerp(900, 660, ease.outCubic(p))
    drawBits(ctx, BULL, BULL_C, Math.round(bx), 1010 + Math.round(Math.abs(Math.sin(t * 5)) * -4 * (1 - p)), 14, { flip: true })
  } else {
    // across the sea to Crete: the bull swims, Europa on its back
    waves(ctx, t, 1060, P)
    drawBits(ctx, ISLAND, ISLAND_C, 830, 1052, 12)
    const p = clamp((t - tabAt) / 5)
    const bx = lerp(260, 560, ease.inOutQuad(p)), by = 1030 + Math.sin(t * 2.6) * 8
    ctx.save(); ctx.beginPath(); ctx.rect(P.x0, P.y0, P.x1 - P.x0, 1076 - P.y0); ctx.clip()
    drawBits(ctx, BULL, BULL_C, Math.round(bx), Math.round(by), 14)
    drawBits(ctx, EUROPA, EUROPA_C, Math.round(bx - 40), Math.round(by - 130), 12)
    ctx.restore()
    // the wake
    for (let i = 0; i < 5; i++) { ctx.fillStyle = '#d6ecf5'; ctx.fillRect(Math.round(bx - 190 - i * 40), 1078 + (i % 2) * 10, 26 - i * 3, 6) }
  }
}
function tint(ctx, t, { tab }) {
  // hand-tinted: the flowers stay pink
  if (tab === 0) for (let i = 0; i < 9; i++) drawBits(ctx, ['.P.', 'PYP', '.P.'], { P: '#ff8fb1', Y: '#f7c948' }, 0 + 116 + 50 + i * 95, 1150 + (i % 3) * 36 - 8, 8, { outline: null, alpha: 0.75 })
  else for (let i = 0; i < 3; i++) if (Math.sin(t * 4 + i * 2) > 0.6) drawPixelStar(ctx, 760 + i * 70, 990 - i * 20, 18, 1, '#fff1c8', '#ffffff')
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'aldebaran', ra: 4.5987, dec: 16.51, mag: 0.85 },
  { id: 'elnath', ra: 5.4382, dec: 28.61, mag: 1.65 },
  { id: 'zeta', ra: 5.6274, dec: 21.14, mag: 3.0 },
  { id: 'gamma', ra: 4.3299, dec: 15.63, mag: 3.65 },
  { id: 'delta', ra: 4.3823, dec: 17.54, mag: 3.76 },
  { id: 'eps', ra: 4.4769, dec: 19.18, mag: 3.53 },
  { id: 'theta', ra: 4.4783, dec: 15.87, mag: 3.4 },
  { id: 'lambda', ra: 4.0109, dec: 12.49, mag: 3.4 },
  { id: 'pleiades', ra: 3.7914, dec: 24.11, mag: 3, hide: true },
]
const PLEIADES = [[0, 0], [-22, -8], [-36, 6], [18, -12], [10, 16], [-12, 20], [30, 6]]
let EP = null
function skyExtras(ctx, t, { pos }) {
  const L = EP.LINES.sky[1]
  const p = prog(t, L.t, L.t + 0.6)
  if (p <= 0) return
  const pl = pos('pleiades')
  ctx.save(); ctx.globalAlpha *= ease.outCubic(p)
  const g = ctx.createRadialGradient(pl.x, pl.y, 0, pl.x, pl.y, 80)
  g.addColorStop(0, 'rgba(150,190,255,0.35)'); g.addColorStop(1, 'rgba(150,190,255,0)')
  ctx.fillStyle = g; ctx.fillRect(pl.x - 80, pl.y - 80, 160, 160)
  PLEIADES.forEach(([dx, dy], i) => drawPixelStar(ctx, pl.x + dx * 1.3, pl.y + dy * 1.3, i ? 18 : 24, i % 2 + 1, '#cfe2ff', '#ffffff'))
  monoText(ctx, 'PLEIADES', pl.x, pl.y + 72, { size: 28, color: '#bcd6ff', spacing: 0.1, n: Math.floor((t - L.t) / 0.035) + 1 })
  // the Hyades: the V of the face
  const v = ['gamma', 'delta', 'eps', 'theta'].map(pos)
  const cx = v.reduce((a, s) => a + s.x, 0) / 4, cy = v.reduce((a, s) => a + s.y, 0) / 4
  const q = ease.outCubic(prog(t, L.t + 0.8, L.t + 1.6))
  ctx.fillStyle = '#bcd6ff'
  for (let i = 0; i < 28 * q; i++) { const a = i / 28 * Math.PI * 2; ctx.fillRect(Math.round(cx + Math.cos(a) * 92 - 2), Math.round(cy + Math.sin(a) * 92 - 2), 5, 5) }
  if (q > 0.2) monoText(ctx, 'HYADES', cx + 40, cy + 130, { size: 28, color: '#bcd6ff', spacing: 0.1, n: Math.floor((t - L.t - 0.9) / 0.035) + 1 })
  ctx.restore()
}

// ── the cape (behind) and the popcorn (in front)
function under(ctx, t, { x, y, size }) {
  const c = Math.max(4, Math.round(size / 26)), half = Math.round(0.6 * size / c), top = y - 0.12 * size, bottom = y + 0.5 * size
  for (let i = -half; i < half; i++) {
    const u = Math.abs((i + 0.5) / half)
    const y0 = Math.round((top + u * u * 0.18 * size) / c) * c
    const yb = bottom - Math.round((Math.sin(i * 1.3 + t * 2) * 0.5 + 0.5) * 1.2) * c
    for (let yy = y0, j = 0; yy < yb; yy += c, j++) {
      const edge = yy === y0 || i === -half || i === half - 1 || yy + c >= yb
      let col = QUILT[(Math.floor((i + 40) / 3) * 2 + Math.floor(j / 3) * 3) % QUILT.length]
      if (edge) col = INK
      ctx.fillStyle = col; ctx.fillRect(x + i * c, yy, c + 0.5, c + 0.5)
    }
  }
}
function prop(ctx, t, r, { seg, size }) {
  if (seg === 'sky') return
  const k = size / 320, bx = r.x - 0.36 * size, by = r.y + 0.36 * size
  drawBits(ctx, BOWL, { R: '#d6453a', W: '#fff1d6', r: '#8f2a25' }, Math.round(bx), Math.round(by), 9 * k)
  for (let i = 0; i < 5; i++) drawBits(ctx, CORN, { W: '#fff6dc', Y: '#f7c948' }, Math.round(bx + (i - 2) * 20 * k), Math.round(by - 40 * k - (i % 2) * 12 * k), 6 * k, { outline: '#6b4a2a' })
}

EP = makeEpisode({
  id: 'st6taurus', sign: 'taurus', ep: 2, duration: 60, pitch: 698.46,
  cold: [{ text: 'you want the story? sit down. this takes a *minute.*', mood: 'happy' }],
  title: { accent: 'the steady one.', facts: [['EARTH', 'FIXED', 'RULED BY VENUS'], ['THE BULL', 'APR 20 – MAY 20']] },
  myth: {
    head: 'The *white* bull.',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, Zeus became a gentle white bull. Europa climbed on…' },
      { who: 'stars', tab: 1, text: '…and he swam her across the sea to *Crete.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'The bull’s *eye.*',
    map: { name: 'Taurus', stars: STARS, bright: 'aldebaran', brightCol: '#ff9a5c',
      lines: [['gamma', 'delta'], ['delta', 'eps'], ['eps', 'elnath'], ['gamma', 'theta'], ['theta', 'aldebaran'], ['aldebaran', 'zeta'], ['gamma', 'lambda']],
      box: { cx: 540, cy: 900, w: 780, h: 560 },
      labels: [{ star: 'aldebaran', text: 'ALDEBARAN', sub: 'α TAURI · THE RED EYE', dx: -20, dy: 120, align: 'right', at: 1.3 }] },
    lines: [
      { who: 'stars', text: 'Aldebaran, the brightest star in Taurus, is the bull’s red *eye.*' },
      { who: 'stars', text: 'two star clusters ride along: the Pleiades and the Hyades.' },
      { text: 'i bring my friends everywhere. *obviously.*', mood: 'happy' },
    ],
    heroAt: [904, 1238],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 2 · FIXED EARTH',
    cutChyron: 'CUTAWAY · THE PARTNER',
    items: [
      { q: 'Q. Why so | *slow?*', lines: [{ text: 'i’m slow because i’m *sure.*', mood: 'happy' }] },
      { q: 'Q. How do you | *love?*', lines: [
        { text: 'i feed you. i hold your hand. that’s the whole *speech.*', mood: 'heart' },
        { who: 'scorpio', text: 'it shared the last kolache with me. that’s *love.*' },
      ] },
      { q: 'Q. What *scares* you?', lines: [{ text: 'change i didn’t *choose.* a heads-up helps. a lot.', mood: 'neutral', look: [0, 1] }] },
      { q: 'Q. What do you wish | we’d *ask?*', lines: [{ text: '“are *you* okay?” i’m always the steady one.', mood: 'sparkle' }] },
    ],
  },
  takeaway: { text: 'I don’t rush. | I *stay.*', words: 4, top: 380, size: 116, accentSize: 190, byY: 800 },
  hero: { under, prop, state: (t, seg) => seg === 'take' ? { mood: 'happy', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, -1] } : { mood: 'happy' } },
  ghost: { seg: 'sky', at: 6.2, x: 1010, y: 720, from: 'left', cell: 3, where: 'leaning out from behind the star chart’s right edge, level with the Pleiades (II · THE SKY)' },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void BONE; void GOLD; void pixLine
