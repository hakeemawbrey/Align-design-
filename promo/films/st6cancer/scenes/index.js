// st6cancer (45 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 04) · story 0–40.6, then the shared end card.
//   A documentary profile of Cancer (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  CANCER, its crab shell (season 3/4) behind it like a cowl: "come in. it's *soft* in here."
//   TITLE      BEHIND THE SIGN · ♋ CANCER · *the soft shell.* · WATER · CARDINAL · RULED BY THE MOON / THE CRAB · JUN 21 – JUL 22
//   I MYTH     archive footage: in Greek myth a crab pinches Heracles as he fights the many-headed Hydra; he crushes it,
//              and Hera, who sent it, puts it in the sky (the crab rises and becomes stars).
//   II SKY     the faint real figure (Altarf · Asellus Australis · Asellus Borealis · Acubens · ι Cnc); Altarf labelled
//              as the brightest, the Beehive Cluster (M44, Praesepe) glowing between the Aselli. The Tropic of Cancer:
//              named when the June-solstice Sun stood here, about 2,000 years ago.
//   III CLOSE  "the shell isn't to keep you out. it's because i feel *everything.*"  How it loves: it remembers.
//              Capricorn cutaway: "it remembers i get *cold* in restaurants." (the jacket, season 4)
//   TAKEAWAY   "Be gentle. I *remember.*"
//   The ghost hangs upside down under the star chart's bottom edge.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, monoText, HEROFIG, HEROFIG_C, GOLD, BONE } from '../s6.js'

const INK = '#1b1236'
const HYDRA = [
  'G..........G.......G..',
  'GG...G....GG..G...GG..',
  '.G..GG....G..GG...G...',
  '.GG.G....GG..G...GG...',
  '..GGG....G..GG..GG....',
  '...GG...GG..G..GG.....',
  '....GG..G..GG.GG......',
  '.....GGGGGGGGGG.......',
  '....GGGGGGGGGGGG......',
  '...GGGgGGGGgGGGGG.....',
  '..GGGGGGGGGGGGGGGGGt..',
  '..GgGGGGgGGGGGgGGGGtt.',
  '...GGGGGGGGGGGGGGG..t.',
]
const HYDRA_C = { G: '#5f8a4a', g: '#8ab86a', t: '#5f8a4a' }
const HEAD = ['GGG', 'GEG', 'Gr.']
const HEAD_C = { G: '#7aa85a', E: '#f2c75c', r: '#ff5c5c' }
const CRAB = [
  'C.........C',
  'CC.......CC',
  '.C.......C.',
  '..CCCCCCC..',
  '.CCECCCECC.',
  'CCCCCCCCCCC',
  '.CCCCCCCCC.',
  'L.L.....L.L',
]
const CRAB_C = { C: '#e06a4a', E: '#1b1236', L: '#a8462e' }
const HYDRA_HEADS = [[0, 0], [11, 0], [19, 0], [5, 1], [14, 1]]

function ground(ctx, P) {
  ctx.fillStyle = '#6a6048'; ctx.fillRect(P.x0, 1160, P.x1 - P.x0, P.y1 - 1160)
  ctx.fillStyle = '#5a7a8a'; ctx.fillRect(P.x0, 1200, P.x1 - P.x0, 30)             // the marsh water
  ctx.fillStyle = '#8aa8b8'; for (let xx = P.x0; xx < P.x1; xx += 40) ctx.fillRect(xx, 1206, 20, 4)
}
function tableau(ctx, t, { tab, tabAt, P }) {
  ground(ctx, P)
  if (tab === 0) {
    // Heracles (left) swings at the Hydra (right); the crab scuttles in and pinches his heel
    const swing = Math.sin(t * 5) * 0.12
    drawBits(ctx, HEROFIG, HEROFIG_C, 340, 1066, 14, { rot: swing * 0.3 })
    const hx = 760, hy = 1080, c = 12
    drawBits(ctx, HYDRA, HYDRA_C, hx, hy, c)
    HYDRA_HEADS.forEach(([i, j], n) => {
      const bob = Math.round(Math.sin(t * 4 + n) * 6)
      drawBits(ctx, HEAD, HEAD_C, hx - 11 * c + i * c + c / 2, hy - 6.5 * c + j * c - c * 1.2 + bob, c, { flip: n % 2 === 1 })
    })
    const p = clamp((t - tabAt - 0.6) / 1.4)
    const cx = lerp(640, 400, ease.outCubic(p)), pinch = p >= 1 && Math.sin(t * 9) > 0
    drawBits(ctx, CRAB, CRAB_C, Math.round(cx), 1146 - (pinch ? 6 : 0), 9)
    if (pinch) drawPixelStar(ctx, 380, 1130, 26, 1, '#fff1c8', '#ffffff')
  } else {
    // Hera puts it in the sky: the crab rises and dissolves into five stars
    drawBits(ctx, HEROFIG, HEROFIG_C, 340, 1066, 14)
    const p = ease.inOutQuad(clamp((t - tabAt) / 2.4))
    const cy = lerp(1150, 760, p)
    ctx.save(); ctx.globalAlpha *= 1 - clamp((p - 0.6) / 0.4)
    drawBits(ctx, CRAB, CRAB_C, 560, Math.round(cy), 7 + 5 * p)
    ctx.restore()
    if (p > 0.55) {
      const q = clamp((p - 0.55) / 0.45)
      ;[[-70, 30], [0, 0], [60, 40], [0, -70], [10, -130]].forEach(([dx, dy], i) => {
        ctx.save(); ctx.globalAlpha *= q; drawPixelStar(ctx, 560 + dx, 760 + dy, i === 0 ? 40 : 30, i % 2, '#fff1c8', '#ffffff'); ctx.restore()
      })
    }
  }
}
function tint(ctx, t, { tab, tabAt }) {
  if (tab !== 1) return
  const p = ease.inOutQuad(clamp((t - tabAt) / 2.4))
  if (p < 0.55) return
  const q = clamp((p - 0.55) / 0.45)
  ctx.save(); ctx.globalCompositeOperation = 'lighter'
  const g = ctx.createRadialGradient(560, 740, 0, 560, 740, 190)
  g.addColorStop(0, `rgba(63,182,240,${0.4 * q})`); g.addColorStop(1, 'rgba(63,182,240,0)')
  ctx.fillStyle = g; ctx.fillRect(370, 550, 380, 380); ctx.restore()
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'altarf', ra: 8.2753, dec: 9.19, mag: 3.5 },
  { id: 'acubens', ra: 8.9748, dec: 11.86, mag: 4.25 },
  { id: 'delta', ra: 8.7448, dec: 18.15, mag: 3.94 },
  { id: 'gamma', ra: 8.7215, dec: 21.47, mag: 4.66 },
  { id: 'iota', ra: 8.7782, dec: 28.76, mag: 4.0 },
  { id: 'm44', ra: 8.6700, dec: 19.67, mag: 3.7, hide: true },
]
let EP = null
function skyExtras(ctx, t, { at, pos }) {
  const m = pos('m44'), p = ease.outCubic(prog(t, at + 1.4, at + 2.2))
  if (p > 0) {
    ctx.save(); ctx.globalAlpha *= p
    const g = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, 80)
    g.addColorStop(0, 'rgba(200,220,255,0.45)'); g.addColorStop(1, 'rgba(200,220,255,0)')
    ctx.fillStyle = g; ctx.fillRect(m.x - 80, m.y - 80, 160, 160)
    const r = [[0, 0], [-20, -10], [16, -14], [-8, 16], [22, 10], [-26, 8], [6, -26], [28, -4], [-14, -24], [12, 22]]
    r.forEach(([dx, dy], i) => drawPixelStar(ctx, m.x + dx * 1.3, m.y + dy * 1.3, i < 3 ? 16 : 12, 2, '#e6eeff', '#ffffff'))
    monoText(ctx, 'BEEHIVE CLUSTER', m.x - 70, m.y - 4, { size: 30, color: '#bcd6ff', spacing: 0.08, align: 'right', n: Math.floor((t - at - 1.4) / 0.035) + 1 })
    monoText(ctx, 'M44 · PRAESEPE', m.x - 70, m.y + 32, { size: 22, color: BONE, spacing: 0.08, align: 'right', n: Math.floor((t - at - 1.9) / 0.035) + 1, alpha: 0.85 })
    ctx.restore()
  }
  // the Tropic of Cancer: the June-solstice Sun's spot, a gold Sun pinned on the chart
  const L = EP.LINES.sky[1], q = ease.outCubic(prog(t, L.t, L.t + 0.8))
  if (q <= 0) return
  const y = 1214
  ctx.save(); ctx.globalAlpha *= q
  ctx.fillStyle = GOLD; for (let xx = 120; xx < 120 + 840 * q; xx += 22) ctx.fillRect(xx, y, 12, 4)
  monoText(ctx, 'TROPIC OF CANCER', 120, y - 26, { size: 24, color: GOLD, spacing: 0.1, align: 'left', n: Math.floor((t - L.t) / 0.035) + 1 })
  ctx.restore()
}

// ── the shell (behind the star, like a cowl) + little claws
const PINCER = ['.CC..', 'CCC.C', 'CCCCC', '.CCC.']
function under(ctx, t, { x, y, size, seg }) {
  if (seg === 'sky') return
  const c = Math.max(4, Math.round(size / 30)), RX = 21, RY = 17, cy = y + 0.2 * size
  const SPOTS = [[-12, 10], [-4, 15], [7, 13], [15, 6], [-17, 4], [2, 8]]
  for (let j = -1; j <= RY + 1; j++) for (let i = -RX - 1; i <= RX; i++) {
    const inside = (a, b) => { const u = (a + 0.5) / RX, v = (b + 0.5) / RY; return b >= 0 && u * u + v * v <= 1 }
    const on = inside(i, j), edge = !on && (inside(i + 1, j) || inside(i - 1, j) || inside(i, j + 1) || inside(i, j - 1))
    if (!on && !edge) continue
    let col = INK
    if (on) {
      const u = (i + 0.5) / RX, v = (j + 0.5) / RY, lit = -u * 0.6 + v * 0.8
      col = lit > 0.75 ? '#ffd2b0' : lit > 0.3 ? '#ff9a6e' : lit > -0.2 ? '#f2734f' : '#c4483a'
      for (const [si, sj] of SPOTS) if ((i - si) ** 2 + (j - sj) ** 2 <= 2.2) col = '#ffe3cc'
    }
    ctx.fillStyle = col; ctx.fillRect(x + i * c, cy - (j + 1) * c, c + 0.5, c + 0.5)
  }
}
function prop(ctx, t, r, { seg, size }) {
  if (seg === 'sky') return
  const c = Math.max(3, Math.round(size / 40)), snap = Math.sin(t * 3) > 0.7 ? 0.2 : 0
  drawBits(ctx, PINCER, { C: '#f2734f' }, r.x - 0.56 * size, r.y - 0.05 * size, c * 1.4, { flip: true, rot: -0.3 - snap })
  drawBits(ctx, PINCER, { C: '#f2734f' }, r.x + 0.56 * size, r.y - 0.05 * size, c * 1.4, { rot: 0.3 + snap })
}

EP = makeEpisode({
  id: 'st6cancer', sign: 'cancer', ep: 4, duration: 45, pitch: 783.99,
  cold: [{ text: 'come in. it’s *soft* in here.', mood: 'sparkle' }],
  title: { accent: 'the soft shell.', facts: [['WATER', 'CARDINAL', 'RULED BY THE MOON'], ['THE CRAB', 'JUN 21 – JUL 22']] },
  myth: {
    head: 'The *loyal* crab.',
    lines: [
      { who: 'stars', tab: 0, text: 'in Greek myth, Hera’s crab pinched Heracles as he fought the Hydra.' },
      { who: 'stars', tab: 1, text: 'he crushed it. Hera put it in the *sky.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'The *Beehive.*',
    map: { name: 'Cancer', stars: STARS, bright: 'altarf', brightCol: '#ffcf8a',
      lines: [['altarf', 'delta'], ['delta', 'acubens'], ['delta', 'gamma'], ['gamma', 'iota']],
      box: { cx: 600, cy: 820, w: 560, h: 440, rot: 0 },
      labels: [{ star: 'altarf', text: 'ALTARF', sub: 'β CANCRI · BRIGHTEST', dx: -70, dy: -50, align: 'right', at: 1.2 }] },
    lines: [
      { who: 'stars', text: 'Cancer is faint, but it holds the Beehive star *cluster.*' },
      { who: 'stars', text: 'the Tropic of Cancer: the June Sun stood here about 2,000 years ago.' },
    ],
    heroAt: [904, 1238],
    extras: skyExtras,
  },
  personal: {
    chyron: 'SIGN No. 4 · RULED BY THE MOON',
    cutChyron: 'CUTAWAY · THE PARTNER',
    items: [
      { q: 'Q. Why the | *shell?*', lines: [{ text: 'it isn’t to keep you out. it’s because i feel *everything.*', mood: 'neutral', look: [0, 1] }] },
      { q: 'Q. How do you | *love?*', lines: [
        { text: 'i remember. your coffee order. your bad *day.*', mood: 'heart' },
        { who: 'capricorn', text: 'it remembers i get *cold* in restaurants.' },
      ] },
    ],
  },
  takeaway: { min: 3.6, text: 'Be gentle. | I *remember.*', words: 3, top: 400, size: 116, accentSize: 180, byY: 800 },
  hero: { under, prop, state: (t, seg) => seg === 'take' ? { mood: 'sparkle', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, -1] } : { mood: 'happy' } },
  ghost: { seg: 'sky', at: 4.2, x: 330, y: 1290, from: 'above', cell: 3, where: 'hanging upside down under the star chart’s bottom edge, left (II · THE SKY)' },
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void lerp
