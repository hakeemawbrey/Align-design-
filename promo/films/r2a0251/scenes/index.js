// r2a0251: star_advice, ADVICE SOLO, "Scorpio, have you | eaten today?" (~45 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): a true thing about Scorpio + a warm reframe, one gag each.
//   0.0–3.6    "Scorpio, have you | *eaten today?*"
//   3.6–37.8   nine cards (3.8 s each):
//              skipped lunch to focus, here's a sandwich · deep in research, drink some water · keep it all in, let one
//              feeling out · you guard everyone's secrets, rest too · all or nothing, some is enough · walls up, a friend
//              brought soup · never ask for help, asking is strong · dark playlist, add one happy song · love yourself that hard
//  37.8        "Fed. Rested. | *Still intense.*"  Scorpio comes back, big.
//  41.2        callback: "And that sandwich? | *Every last bite.*"  the lunch plate comes back, empty.
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SCO = '#e23d66', CREAM = '#fff4e2', WOOD = '#c98f2a', GREEN = '#5cc46e'
const S = 'scorpio'

function slab(x, cx, cy, w, h, k, { rot = 0.04, bg = BONE, edge = INK } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(x)
  x.restore()
}
const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

// a plate with a big stacked sandwich (empty: crumbs only)
function sandwich(x, t, cx, cy, k, { empty = false } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 80, 190, 46, 0, 0, 7); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 76, 180, 38, 0, 0, 7); x.fill()
  if (empty) { x.fillStyle = WOOD; for (const [a, b] of [[-70, 70], [-10, 86], [50, 66], [90, 80]]) x.fillRect(a, b, 12, 8); x.restore(); return }
  const layer = (y, h, col, w = 150, wav = 0) => {
    x.fillStyle = INK; x.beginPath(); x.roundRect(-w - 6, y - 6, 2 * w + 12, h + 12, 16); x.fill()
    x.fillStyle = col; x.beginPath(); x.roundRect(-w, y, 2 * w, h, 12); x.fill()
    if (wav) { x.fillStyle = col; for (let i = 0; i < 9; i++) x.beginPath(), x.arc(-w + 16 + i * 34, y + h, 14, 0, Math.PI), x.fill() }
  }
  layer(30, 40, '#e8b060')
  layer(8, 22, GREEN, 160, 1)
  layer(-14, 22, '#e86a5a', 150)
  layer(-36, 22, '#ffd75a', 156)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, -60, 162, 52, 0, Math.PI, 0); x.fill(); x.fillRect(-162, -62, 324, 20)
  x.fillStyle = '#e8b060'; x.beginPath(); x.ellipse(0, -60, 154, 44, 0, Math.PI, 0); x.fill(); x.fillRect(-154, -62, 308, 14)
  x.fillStyle = CREAM; for (const [a, b] of [[-60, -80], [-10, -92], [40, -82], [80, -72]]) x.fillRect(a, b, 10, 6)
  x.fillStyle = BONE; x.fillRect(-4, -150, 8, 90); x.fillStyle = SCO; x.fillRect(-4, -150, 40, 26)
  x.restore()
}
// a laptop with an absurd strip of tabs; a glass of water slides in
function laptop(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-190, -150, 380, 250); x.fillStyle = '#2a2350'; x.fillRect(-180, -140, 360, 230)
  x.fillStyle = '#140c30'; x.fillRect(-168, -110, 336, 190)
  const n = 6 + Math.floor(clamp(lt / 1.2) * 18)
  for (let i = 0; i < n; i++) { const w = 336 / n; x.fillStyle = i % 2 ? '#4a3f86' : '#3d3470'; x.fillRect(-168 + i * w, -132, w - 2, 20) }
  x.fillStyle = '#6b62a8'; for (let r = 0; r < 5; r++) x.fillRect(-150, -80 + r * 30, 220 - (r % 2) * 70, 12)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-230, 100); x.lineTo(230, 100); x.lineTo(250, 130); x.lineTo(-250, 130); x.closePath(); x.fill()
  x.fillStyle = '#8a8aa0'; x.beginPath(); x.moveTo(-222, 104); x.lineTo(222, 104); x.lineTo(238, 124); x.lineTo(-238, 124); x.closePath(); x.fill()
  x.restore()
}
function water(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.moveTo(-56, -100); x.lineTo(56, -100); x.lineTo(44, 100); x.lineTo(-44, 100); x.closePath(); x.fill()
  x.fillStyle = 'rgba(220,240,255,0.9)'; x.beginPath(); x.moveTo(-48, -92); x.lineTo(48, -92); x.lineTo(38, 92); x.lineTo(-38, 92); x.closePath(); x.fill()
  x.fillStyle = SKYB; x.beginPath(); x.moveTo(-44, -40 + 4 * Math.sin(t * 4)); x.lineTo(44, -40 - 4 * Math.sin(t * 4)); x.lineTo(38, 92); x.lineTo(-38, 92); x.closePath(); x.fill()
  x.fillStyle = '#fff'; x.fillRect(-30, -20, 10, 80)
  x.restore()
}
// a jar with a rattling lid; one little heart escapes
function jar(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const shake = lt > 0.5 && lt < 1.3 ? Math.sin(t * 40) * 4 : 0
  const open = ease.outBack(prog(lt, 1.3, 1.6))
  x.fillStyle = INK; x.beginPath(); x.roundRect(-130, -120, 260, 270, 30); x.fill()
  x.fillStyle = 'rgba(200,190,255,0.35)'; x.beginPath(); x.roundRect(-120, -110, 240, 250, 24); x.fill()
  for (let i = 0; i < 5; i++) drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: i % 2 ? PINK : SCO }, -60 + (i % 3) * 60 + shake, 20 + Math.floor(i / 3) * 60, 8)
  x.save(); x.translate(shake, -136 - 40 * open); x.rotate(-0.5 * open)
  x.fillStyle = INK; x.fillRect(-120, -26, 240, 52); x.fillStyle = WOOD; x.fillRect(-112, -18, 224, 36)
  x.restore()
  x.restore()
}
// a vault door with a sleep mask hanging on the handle
function vault(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 170, 0, 7); x.fill()
  x.fillStyle = '#8a8aa0'; x.beginPath(); x.arc(0, 0, 160, 0, 7); x.fill()
  x.fillStyle = '#a9a9bd'; x.beginPath(); x.arc(0, 0, 120, 0, 7); x.fill()
  x.strokeStyle = INK; x.lineWidth = 14
  for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.3; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(a) * 90, Math.sin(a) * 90); x.stroke() }
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 26, 0, 7); x.fill()
  // sleep mask
  x.fillStyle = INK; x.beginPath(); x.roundRect(-96, 40, 192, 70, 34); x.fill()
  x.fillStyle = LAV; x.beginPath(); x.roundRect(-88, 48, 176, 54, 28); x.fill()
  x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.arc(-40, 70, 18, 0.2, Math.PI - 0.2); x.stroke(); x.beginPath(); x.arc(40, 70, 18, 0.2, Math.PI - 0.2); x.stroke()
  x.restore()
}
// a battery that settles at half, and that's fine
function battery(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-170, -80, 340, 160); x.fillRect(170, -36, 30, 72)
  x.fillStyle = '#140c30'; x.fillRect(-160, -70, 320, 140)
  const lvl = lt < 0.6 ? 1 : lerp(1, 0.5, ease.inOutCubic(prog(lt, 0.6, 1.2)))
  const n = Math.round(lvl * 6)
  for (let i = 0; i < n; i++) { x.fillStyle = lvl > 0.9 ? '#ff6a5a' : MINT; x.fillRect(-150 + i * 52, -58, 44, 116) }
  x.restore()
}
// a little brick wall with a door that opens for a friend
function wall(x, t, cx, cy, k, open) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -170, 400, 340)
  for (let r = 0; r < 8; r++) for (let c = 0; c < 6; c++) {
    const off = r % 2 ? 33 : 0
    x.fillStyle = (r + c) % 3 ? '#b8574a' : '#a14a3f'; x.fillRect(-196 + c * 66 + off - 33, -166 + r * 42, 62, 38)
  }
  x.fillStyle = INK; x.fillRect(-200, -170, 4, 340); x.fillRect(196, -170, 4, 340)
  x.fillStyle = INK; x.fillRect(-72, -40, 144, 210)
  x.fillStyle = '#140c30'; x.fillRect(-64, -32, 128, 202)
  x.save(); x.translate(-64, 0); x.scale(1 - 0.85 * open, 1)
  x.fillStyle = WOOD; x.fillRect(0, -32, 128, 202); x.fillStyle = INK; x.fillRect(100, 60, 14, 14)
  x.restore()
  x.restore()
}
// a phone playlist: moody rows, then one sunny row
function playlist(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 300, 420, k, { rot: 0.05, bg: '#2a2350' }, x => {
    txt(x, 'MOODY MIX', 0, -170, 26, LAV, MONO, 700)
    const rows = ['the void, slowly', 'rain on glass', 'midnight again', 'shadows (live)', 'sunshine song!']
    rows.forEach((r, i) => {
      const y = -110 + i * 66, sun = i === 4
      const on = sun && lt > 1.1
      if (sun && lt < 0.9) return
      x.fillStyle = on ? GOLD : '#140c30'; x.fillRect(-130, y - 26, 260, 52)
      txt(x, r, -112, y, 20, on ? INK : '#a9a2d0', MONO, 700, 'left')
    })
  })
}

const CAMEOS = [
  { sign: S, cap: 'Skipped lunch to focus? | *Here’s a sandwich.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: { x: -220 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sandwich(x, t, 780, 950, pop01(t, P.t0 + 0.25, 0.4, 2))
      label(x, 780, 660, 'LUNCH: SERVED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: MINT, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Deep in research again? | *Drink some water.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) {
      laptop(x, t, 770, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      const w = ease.outCubic(prog(lt, 1.0, 1.4))
      if (w > 0) water(x, t, lerp(1100, 870, w), 1060, 0.9)
      label(x, 720, 640, 'TABS: TOO MANY', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 30, bg: BONE, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You keep it all inside. | *Let one feeling out.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      jar(x, t, 790, 930, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      if (lt > 1.4) hearts(x, t, 790, 760, P.t0 + 1.4 * 1.29, { n: 3, life: 1.4, spread: 60, cell: 9, seed: 3 })
      label(x, 790, 1150, 'FEELING: FREED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 30, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You guard everyone’s secrets. | *Rest is allowed.*', mood: lt => lt > 1.1 ? 'sleepy' : 'squint', star: { x: -220 },
    front(x, t, lt, P) {
      vault(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 790, 1130, 'CLOSED FOR NAP', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'All or nothing, always? | *Some is plenty.*', mood: lt => lt > 1.3 ? 'happy' : 'wide', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      battery(x, t, 780, 880, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 780, 1060, '50% IS FINE', pop01(t, P.t0 + 1.3, 0.3, 2.6), { size: 40, bg: MINT, rot: -0.05 })
    } },
  { sign: S, cap: 'Walls up? | *Let the soup in.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: { x: -240 },
    front(x, t, lt, P) {
      const open = ease.outCubic(prog(lt, 0.9, 1.3))
      wall(x, t, 770, 900, 0.85 * pop01(t, P.t0 + 0.2, 0.35, 2), open)
      if (open > 0.3) {
        signChar(x, t, 'cancer', 770, 975, 130, { mood: 'heart', seed: 22, glyph: false, alpha: clamp((open - 0.3) * 2) })
        bubble(x, 790, 640, 'brought soup!', pop01(t, P.t0 + 1.25 * 1.29, 0.25, 2.2), { size: 34, tail: 'bc' })
      } else bubble(x, 790, 640, 'knock knock', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, col: LAV, tail: 'bc' })
    } },
  { sign: S, cap: 'Never ask for help? | *Asking is strong.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.4],
    front(x, t, lt, P) {
      bubble(x, 420, 610, 'a little help?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bc' })
      const k = pop01(t, P.t0 + 1.0, 0.35, 2)
      if (k > 0.01) {
        signChar(x, t, 'taurus', 720, 990, 150 * k, { mood: 'happy', look: [-1, 0], seed: 31, glyph: false, hops: [P.t0 + 1.6] })
        signChar(x, t, 'virgo', 880, 960, 150 * k, { mood: 'sparkle', look: [-1, 0], seed: 32, glyph: false, hops: [P.t0 + 1.8] })
      }
      label(x, 800, 720, 'HELP: ARRIVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your playlist is all moody. | *Add one sunny song.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: { x: -220 }, hops: [1.4, 1.8],
    front(x, t, lt, P) {
      playlist(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      if (lt > 1.1) notes(x, t, 400, 760, { n: 4, cell: 7, col: GOLD, alpha: clamp((lt - 1.1) * 3) })
    } },
  { sign: S, cap: 'You love so hard. | *Love you that hard.*', mood: 'heart', star: { x: 0, y: 10, s: 320 }, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      hearts(x, t, 540, 820, P.t0 + 0.6, { n: 10, life: 2.4, spread: 560, cell: 9, seed: 8 })
      label(x, 540, 1150, 'SELF: ADORED', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: SCO, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0251', key: 'D', accent: SCO, solo: S, ending: 'callback',
  title: 'Scorpio, have you | *eaten today?*',
  cameos: CAMEOS,
  group: { cap: 'Fed. Rested. | *Still intense.*', mood: 'sparkle' },
  last: {
    text: 'And that sandwich? | *Every last bite.*',
    draw(x, t, lt) {
      sandwich(x, t, 700, 1110, 2.0 * pop01(t, t - lt + 0.3, 0.45, 1.8), { empty: true })
      const k = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'scorpio', 330, 1080, 250 * k, { mood: lt > 1.4 ? 'heart' : 'happy', look: [1, 0], seed: 44, hops: [t - lt + 1.4] })
      label(x, 700, 1340, 'CLEAN PLATE CLUB', pop01(t, t - lt + 1.2, 0.3, 2.4), { size: 36, bg: SCO, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
