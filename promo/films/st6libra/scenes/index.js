// st6libra (30 s vertical Align ad, Star Talk season 6 "BEHIND THE SIGN", EP 07) · story 0–25.6, then the shared end card.
//   A documentary profile of Libra, the short one (the season look + beat engine: ../s6.js, copied from st6aries).
//   COLD OPEN  LIBRA, its scale on its head (season 3), the pans wobbling: "myth or sky first? …*you* pick."
//   TITLE      BEHIND THE SIGN · ♎ LIBRA · *the fair one.* · AIR · CARDINAL · RULED BY VENUS / THE SCALES · SEP 23 – OCT 22
//   I MYTH     archive footage: the Greeks saw these stars as the Scorpion's claws (a scorpion, its claws hand-tinted
//              gold); later they became a pair of scales, the only zodiac sign that's an object. The scales hold a Sun
//              and a Moon, level: the September equinox.
//   II SKY     the real figure (Zubeneschamali · Zubenelgenubi · γ · σ · υ · τ). Both claws labelled: the names still
//              mean "northern claw" (the brightest) and "southern claw".
//   III CLOSE  "i'm not indecisive. i'm *afraid* of choosing wrong."  Aries cutaway: "it picked tacos. i've never been
//              *prouder.*" (season 4, EP 019).
//   TAKEAWAY   "Pick me *back.*"  The scale on its head settles level.
//   The ghost rises out of the left pan of the archive-footage scales.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { drawPixelStar } from '../../sky.js'
import { makeEpisode, drawBits, GOLD, BONE } from '../s6.js'
import { drawStarChar } from '../../startalk.js'
import { SIGNS } from '../../wheel.js'

const INK = '#1b1236'
const SCORP = [          // the scorpion, facing left: two open pincers out front, tail curled over its back
  '...................ttt....',
  '..................tt.tt...',
  '..................t...s...',
  '.................tt.......',
  '.CCC............tt........',
  'C...CC.........tt.........',
  '.CCC..a.......tt..........',
  '......aaBBBBBBBt..........',
  '.CCC..aBBBBBBBBB..........',
  'C...CCaBBBBBBBB...........',
  '.CCC...l.l.l.l.l..........',
  '......l.l.l.l.l...........',
]
const SCORP_C = { C: '#b98a52', a: '#8a5a2c', B: '#a8743e', t: '#a8743e', s: '#5a3a1e', l: '#5a3a1e' }
const SUN = ['..y.y..', '.yYYYy.', 'yYYYYYy', '.YYYYY.', 'yYYYYYy', '.yYYYy.', '..y.y..']
const MOON = ['..MMM..', '.MMm...', 'MMm....', 'MMm....', 'MMm....', '.MMm...', '..MMM..']
const PAN = ['PPPPPPPPPPPPP', '.PPPPPPPPPPP.', '..ppppppppp..']

function ground(ctx, P) {
  ctx.fillStyle = '#7a6a52'; ctx.fillRect(P.x0, 1170, P.x1 - P.x0, P.y1 - 1170)
  ctx.fillStyle = '#9a8a6a'; for (let xx = P.x0; xx < P.x1; xx += 24) ctx.fillRect(xx, 1166 + ((xx / 24) % 2) * 4, 12, 8)
}
// the big archive scales: post, beam, two pans (a = beam tilt)
const BIG = { x: 540, y: 760, arm: 270, hang: 210, c: 12 }
function bigScale(ctx, t, a, { left, right }) {
  const { x, y, arm, hang, c } = BIG
  ctx.fillStyle = INK; ctx.fillRect(x - 2.5 * c, y - c, 5 * c, 1170 - y + c)
  ctx.fillStyle = '#c8963e'; ctx.fillRect(x - 1.5 * c, y, 3 * c, 1170 - y)
  ctx.fillStyle = INK; ctx.fillRect(x - 8 * c, 1150, 16 * c, 3 * c)
  ctx.fillStyle = '#a8743e'; ctx.fillRect(x - 7 * c, 1150 + c, 14 * c, c)
  ctx.save(); ctx.translate(x, y); ctx.rotate(a)
  ctx.fillStyle = INK; ctx.fillRect(-arm - c, -1.5 * c, 2 * arm + 2 * c, 3 * c)
  ctx.fillStyle = '#d9b24a'; ctx.fillRect(-arm, -c / 2, 2 * arm, c)
  ctx.restore()
  drawBits(ctx, ['.y.', 'yYy', '.y.'], { y: '#d9b24a', Y: '#fff1c8' }, x, y - 2 * c, c)
  const pans = []
  ;[-1, 1].forEach(s => {
    const ex = x + Math.cos(a) * arm * s, ey = y + Math.sin(a) * arm * s, by = ey + hang
    ctx.fillStyle = '#e8d6b0'
    for (let k = 0; k <= 12; k++) { const f = k / 12; ctx.fillRect(Math.round(lerp(ex, ex - 70, f)) - 2, Math.round(lerp(ey, by - 10, f)), 4, 6); ctx.fillRect(Math.round(lerp(ex, ex + 70, f)) - 2, Math.round(lerp(ey, by - 10, f)), 4, 6) }
    const item = s < 0 ? left : right
    if (item) drawBits(ctx, item[0], item[1], ex, by - 44, 9)
    drawBits(ctx, PAN, { P: '#c8963e', p: '#8a5a2c' }, ex, by, 12)
    pans.push({ x: ex, y: by - 16 })
  })
  return pans
}
const tilt0 = (t, at) => Math.sin((t - at) * 2.4) * 0.2 * Math.exp(-(t - at) * 1.2)
// one narrator line, two pictures: the claws, then (as "later, scales." types) the scales
const scalesAt = (E = EP) => +(E.LINES.myth[0].done - 0.45).toFixed(3)
function tableau(ctx, t, { P }) {
  ground(ctx, P)
  const sw = scalesAt(), tab = t < sw ? 0 : 1, tabAt = sw
  if (tab === 0) {
    // the Scorpion, its claws reaching left; a few stars where the claws are
    const cr = Math.round(Math.sin(t * 3) * 3)
    drawBits(ctx, SCORP, SCORP_C, 580 + cr, 960, 26)
    ;[[250, 770], [250, 1060], [430, 690]].forEach(([sx, sy], i) => { if (Math.sin(t * 3 + i * 2) > -0.3) drawPixelStar(ctx, sx, sy, 26, i % 2, '#fff1c8', '#ffffff') })
  } else {
    // later: scales. a Sun in one pan, a Moon in the other, settling level (the September equinox)
    bigScale(ctx, t, tilt0(t, tabAt), { left: [SUN, { y: '#d9b24a', Y: '#f3e3c3' }], right: [MOON, { M: '#e8dcc0', m: '#b8a88a' }] })
  }
}
function tint(ctx, t) {
  const sw = scalesAt(), tab = t < sw ? 0 : 1, tabAt = sw
  if (tab === 0) {
    // the claws, hand-tinted gold
    const cr = Math.round(Math.sin(t * 3) * 3)
    ctx.save(); ctx.globalAlpha *= 0.75 + 0.2 * Math.sin(t * 4)
    drawBits(ctx, SCORP.map(r => r.replace(/[^C]/g, '.')), { C: '#f7cf68' }, 580 + cr, 960, 26, { outline: null })
    ctx.restore()
  } else {
    const a = tilt0(t, tabAt), { x, y, arm, hang } = BIG
    const ex = x - Math.cos(a) * arm, ey = y - Math.sin(a) * arm
    ctx.save(); ctx.globalAlpha *= 0.85
    drawBits(ctx, SUN, { y: '#f7cf68', Y: '#ffe9a8' }, ex, ey + hang - 44, 9, { outline: null })
    ctx.restore()
  }
}

// ── the sky (RA h, Dec °, V mag)
const STARS = [
  { id: 'beta', ra: 15.2834, dec: -9.383, mag: 2.61 },     // Zubeneschamali
  { id: 'alpha', ra: 14.8480, dec: -16.042, mag: 2.75 },   // Zubenelgenubi
  { id: 'gamma', ra: 15.5921, dec: -14.789, mag: 3.91 },
  { id: 'sigma', ra: 15.0679, dec: -25.282, mag: 3.29 },
  { id: 'upsilon', ra: 15.6170, dec: -28.135, mag: 3.6 },
  { id: 'tau', ra: 15.6443, dec: -29.777, mag: 3.66 },
]

// ── the star's prop: the scale on its head (season 3)
function headScale(ctx, t, r, size, a) {
  const c = Math.max(3, Math.round(size / 46)), px = r.x, tip = r.top + c, py = tip - size * 0.26
  const arm = size * 0.3, hang = size * 0.16
  ctx.fillStyle = INK; ctx.fillRect(px - 2 * c, py - c, 4 * c, tip - py + c)
  ctx.fillStyle = '#f7c948'; ctx.fillRect(px - c, py, 2 * c, tip - py)
  ctx.save(); ctx.translate(px, py); ctx.rotate(a)
  ctx.fillStyle = INK; ctx.fillRect(-arm - c, -1.5 * c, 2 * arm + 2 * c, 3 * c)
  ctx.fillStyle = '#f7c948'; ctx.fillRect(-arm, -c / 2, 2 * arm, c)
  ctx.restore()
  drawBits(ctx, ['.y.', 'yYy', '.y.'], { y: '#f7c948', Y: '#fff1c8' }, px, py - 2 * c, c)
  ;[-1, 1].forEach(s => {
    const ex = px + Math.cos(a) * arm * s, ey = py + Math.sin(a) * arm * s, by = ey + hang
    ctx.fillStyle = 'rgba(255,241,200,0.85)'
    for (let k = 0; k <= 6; k++) { const f = k / 6; ctx.fillRect(Math.round(lerp(ex, ex - 4 * c, f)) - 1, Math.round(lerp(ey, by, f)), 3, 4); ctx.fillRect(Math.round(lerp(ex, ex + 4 * c, f)) - 1, Math.round(lerp(ey, by, f)), 3, 4) }
    drawBits(ctx, ['PPPPPPPPP', '.ppppppp.'], { P: '#f7c948', p: '#c98a1f' }, ex, by + c, c)
  })
}
let EP = null
// the framed photo on the interview set: Aries and Libra, season 4 (tacos, finally)
const TACO = ['..yyyyy..', '.yGrGrGy.', 'yGrGrGrGy', 'yyyyyyyyy']
function drawPhoto(ctx, t, k) {
  const at = EP.T.personal[0] + 0.6, p = clamp((t - at) / 0.35)
  if (p <= 0) return
  const x = 860, y = 1130, w = 210, h = 230
  ctx.save(); ctx.globalAlpha *= k * clamp(p * 2); ctx.translate(x, y + (1 - ease.outCubic(p)) * 60); ctx.rotate(0.08)
  ctx.fillStyle = INK; ctx.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  ctx.fillStyle = '#f3ead8'; ctx.fillRect(-w / 2, -h / 2, w, h)
  ctx.fillStyle = '#2a1f4e'; ctx.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 64)
  drawStarChar(ctx, -40, -30, 92, t, { color: SIGNS[0].color, glyph: null, mood: 'happy', look: [1, 0], seed: 5, glow: 0.5 })
  drawStarChar(ctx, 40, -30, 92, t, { color: SIGNS[6].color, glyph: null, mood: 'heart', look: [-1, 0], seed: 8, glow: 0.5 })
  drawBits(ctx, TACO, { y: '#f2c75c', G: '#6fbf4a', r: '#e8382c' }, 0, 22, 5)
  ctx.font = "700 22px 'Space Mono', monospace"; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = INK
  ctx.fillText('♈︎ + ♎︎ · TACOS', 0, h / 2 - 26)
  ctx.restore()
}
function prop(ctx, t, r, { seg, size }) {
  let a
  if (seg === 'take') { const ta = EP.T.take[0]; a = Math.sin((t - ta) * 9) * 0.3 * Math.exp(-(t - ta) * 2.2) }
  else if (seg === 'cold') a = Math.sin(t * 3.3) * 0.3
  else a = Math.sin(t * 1.7) * 0.14
  headScale(ctx, t, r, size, a)
}

const SPEC = ({
  id: 'st6libra', sign: 'libra', ep: 7, duration: 30, pitch: 932.33,
  cold: [{ text: 'myth or sky first? …*you* pick.', mood: 'squint', look: [1, 0] }],
  title: { accent: 'the fair one.', facts: [['AIR', 'CARDINAL', 'RULED BY VENUS'], ['THE SCALES', 'SEP 23 – OCT 22']] },
  myth: {
    head: 'The only *object.*',
    lines: [
      { who: 'stars', text: 'the Greeks saw its stars as the Scorpion’s claws. later, *scales.*' },
    ],
    tableau, tint,
  },
  sky: {
    head: 'Two *claws.*',
    map: { name: 'Libra', stars: STARS, bright: 'beta', brightCol: '#cfe2ff',
      lines: [['sigma', 'alpha'], ['alpha', 'beta'], ['beta', 'gamma'], ['gamma', 'alpha'], ['gamma', 'upsilon'], ['upsilon', 'tau']],
      box: { cx: 540, cy: 940, w: 700, h: 460 },
      labels: [
        { star: 'beta', text: 'ZUBENESCHAMALI', sub: '“NORTHERN CLAW”', dx: 50, dy: -40, align: 'left', at: 1.3, size: 28, subSize: 20 },
        { star: 'alpha', text: 'ZUBENELGENUBI', sub: '“SOUTHERN CLAW”', dx: 46, dy: 50, align: 'left', at: 1.7, size: 28, subSize: 20 },
      ] },
    lines: [
      { who: 'stars', text: 'their names still mean “the *claws.*”' },
    ],
  },
  personal: {
    chyron: 'SIGN No. 7 · CARDINAL AIR',
    draw: (ctx, t, { k }) => drawPhoto(ctx, t, k),
    items: [
      { q: 'Q. *Indecisive?*', lines: [
        { text: 'i’m not indecisive. i’m *afraid* of choosing wrong.', mood: 'neutral', look: [0, 1] },
      ] },
    ],
  },
  takeaway: { min: 3.8, text: 'Pick me *back.*', words: 3, top: 420, size: 120, accentSize: 190, byY: 820 },
  hero: { prop, state: (t, seg) => seg === 'take' ? { mood: 'heart', look: [0, 0] } : seg === 'sky' ? { mood: 'neutral', look: [-1, -1] } : { mood: 'happy' } },
  ghost: { seg: 'myth', at: 0, x: 0, y: 0, from: 'below', cell: 3, where: 'rising out of the left pan of the archive-footage scales (the Sun pan), I · THE MYTH' },
})
// the ghost sits in the left pan of the big scales, in tableau 2 (placed from a first pass of the schedule)
{
  const tabAt = scalesAt(makeEpisode(SPEC)), at = tabAt + 0.5, a = tilt0(at + 0.75, tabAt)
  SPEC.ghost = { ...SPEC.ghost, t: +at.toFixed(3), x: Math.round(BIG.x - Math.cos(a) * BIG.arm + 50), y: Math.round(BIG.y - Math.sin(a) * BIG.arm + BIG.hang - 14) }
}
EP = makeEpisode(SPEC)

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const GHOST = EP.GHOST
export const T = EP.T
void clamp; void prog; void ease; void GOLD; void BONE
