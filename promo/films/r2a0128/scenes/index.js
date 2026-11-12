// r2a0128: star_advice, ADVICE SOLO, "Taurus, you can | want more." (topic: Taurus, you're allowed to want more)
// (~47 s vertical, signs3kit social cut, music: lofi · C). One sign the whole film (makeFilm solo mode, 9 cards):
// a relatable Taurus truth + a warm nudge, one gag each.
//   0.0–3.6    "Taurus, you can | *want more.*"
//   3.6–37.8   same order for years (try the special) · comfy is good (growth can be comfy too: a plant)
//              · asking for a raise (ask for more) · saving everything (treat yourself too) · same walk every day (take the long way)
//              · loyal to everyone (be loyal to you) · a match that's just "fine" (wait for wow) · slow is fine (big dreams can stroll)
//              · you deserve the good blanket
//  37.8        "Steady heart. | *Bigger dreams.*"
//  41.2        CALLBACK: "Tried the special. | *New favourite.*"  Taurus with the special.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const LEAF = '#5fd068', RED = '#e23d4e', CREAM = '#fff4e2', ORANGE = '#ffb34a', BROWN = '#8a4a2e', TERRA = '#d9774a'

function card(x, cx, cy, w, h, col, k, rot = 0) {
  if (k <= 0.01) return false
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  return true
}
// the special: a plate with a big swirly mystery dish
function special(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.ellipse(0, 30, 170, 50, 0, 0, Math.PI * 2); x.fill()
  x.fillStyle = CREAM; x.beginPath(); x.ellipse(0, 24, 158, 40, 0, 0, Math.PI * 2); x.fill()
  const COL = [ORANGE, PINK, LEAF, GOLD]
  for (let i = 0; i < 4; i++) { x.fillStyle = INK; x.beginPath(); x.ellipse(0, 4 - i * 26, 110 - i * 24, 34 - i * 4, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = COL[i]; x.beginPath(); x.ellipse(0, 0 - i * 26, 102 - i * 24, 28 - i * 4, 0, 0, Math.PI * 2); x.fill() }
  x.fillStyle = RED; x.beginPath(); x.arc(0, -108, 14, 0, Math.PI * 2); x.fill()
  x.restore()
}
const POT = ['TTTTTTTTTT', '.TTTTTTTT.', '.TTTTTTTT.', '..TTTTTT..']
function plant(x, t, cx, cy, k, grow) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const h = 60 + 300 * grow
  x.fillStyle = INK; x.fillRect(-9, -h - 4, 18, h + 4); x.fillStyle = '#3f9a4a'; x.fillRect(-5, -h, 10, h)
  const n = Math.floor(1 + grow * 6)
  for (let i = 0; i < n; i++) { const y = -40 - i * 48, s = i % 2 ? 1 : -1; x.save(); x.translate(0, y); x.rotate(s * 0.5 + 0.08 * Math.sin(t * 2 + i)); x.fillStyle = INK; x.beginPath(); x.ellipse(s * 44, 0, 48, 22, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = LEAF; x.beginPath(); x.ellipse(s * 44, 0, 42, 16, 0, 0, Math.PI * 2); x.fill(); x.restore() }
  x.restore()
  drawBits(x, POT, { T: TERRA }, cx, cy + 50 * k, 18 * k)
}
const PIG = ['..P.....P..', '.PPPPPPPPP.', 'PPPKPPPKPPP', 'PPPPPPPPPPP', 'PPPPPNNPPPP', 'PPPPPNNPPPP', '.PPPPPPPPP.', '.PP.....PP.']
const CAKE = ['....R....', '...WWW...', 'PPPPPPPPP', 'WWWWWWWWW', 'PPPPPPPPP', 'WWWWWWWWW']
const BLANKET = ['LLLLLLLLLLLLLL', 'LWLLWLLWLLWLLW', 'LLLLLLLLLLLLLL', 'LLWLLWLLWLLWLL', 'LLLLLLLLLLLLLL', 'LWLLWLLWLLWLLW', 'LLLLLLLLLLLLLL']

const S = 'taurus'
const CAMEOS = [
  // 1 · the same order
  { sign: S, cap: 'Same order for years? | *Try the special.*', mood: lt => lt < 1.2 ? 'squint' : 'wide', look: [1, 0], star: { x: -190 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      label(x, 790, 620, 'USUAL #4,281', pop01(t, P.t0 + 0.2, 0.3, 2), { size: 34, bg: CREAM, rot: -0.04, font: MONO, weight: 700 })
      special(x, t, 790, 910, pop01(t, P.t0 + 0.9, 0.35, 2))
      label(x, 790, 1110, 'TODAY: ???', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
      sparkles(x, t, 790, 860, P.t0 + 1.0, 7, 180, 0.4)
    } },
  // 2 · comfy can grow
  { sign: S, cap: 'Love comfy? | *Growing can be comfy.*', mood: lt => lt < 1.2 ? 'happy' : 'sparkle', look: [1, -1], star: { x: -190 },
    front(x, t, lt, P) {
      plant(x, t, 790, 1000, pop01(t, P.t0 + 0.15, 0.3, 2), ease.outCubic(prog(lt, 0.4, 1.8)))
      label(x, 790, 1140, 'NEW LEAF: YES', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: LEAF, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 3 · work: the raise
  { sign: S, cap: 'Worked hard all year? | *Ask for more.*', mood: lt => lt < 1.2 ? 'neutral' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'i’d like… | more, please.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, col: CREAM, tail: 'bl' })
      bubble(x, 800, 900, 'fair. | done.', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 44, col: MINT, tail: 'br' })
      label(x, 790, 1110, 'WORTH: NOTED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 4 · saving everything
  { sign: S, cap: 'Saving it all for later? | *Treat yourself too.*', mood: lt => lt < 1.2 ? 'squint' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      drawBits(x, PIG, { P: PINK, K: INK, N: '#ff6f9a' }, 720, 900, 20 * pop01(t, P.t0 + 0.15, 0.3, 2))
      drawBits(x, CAKE, { R: RED, W: CREAM, P: PINK }, 900, 960, 16 * pop01(t, P.t0 + 1.0, 0.3, 2.2))
      label(x, 790, 1120, 'TREAT: APPROVED', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 32, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 5 · the same walk
  { sign: S, cap: 'Same walk every day? | Take *the long way.*', mood: lt => lt < 1.3 ? 'neutral' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (card(x, 790, 860, 340, 340, '#cfe8b8', pop01(t, P.t0 + 0.15, 0.3, 2), 0.04)) {
        x.strokeStyle = '#9aa5c4'; x.lineWidth = 14; x.lineCap = 'round'; x.beginPath(); x.moveTo(-120, 120); x.lineTo(120, 120); x.stroke()
        const p = ease.inOutCubic(prog(lt, 0.6, 1.6))
        x.strokeStyle = RED; x.lineWidth = 8; x.setLineDash([16, 12]); x.beginPath(); x.moveTo(-120, 120)
        const pts = [[-120, -40], [-20, -120], [80, -60], [120, 120]]
        let px = -120, py = 120
        pts.forEach(([ax, ay], i) => { const q = clamp(p * 4 - i); x.lineTo(px + (ax - px) * q, py + (ay - py) * q); if (q >= 1) { px = ax; py = ay } else { px = px + (ax - px) * q; py = py + (ay - py) * q } })
        x.stroke(); x.setLineDash([])
        x.fillStyle = LEAF; for (const [a, b] of [[-60, -40], [40, 20], [-90, 40], [60, -120]]) { x.beginPath(); x.arc(a, b, 26, 0, Math.PI * 2); x.fill() }
        x.restore()
      }
      label(x, 790, 1110, 'DETOUR: ALLOWED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 32, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  // 6 · loyal to you
  { sign: S, cap: 'Loyal to everyone? | Be *loyal to you.*', mood: lt => lt < 1.1 ? 'happy' : 'heart', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      if (card(x, 800, 860, 240, 340, '#9fb8e0', pop01(t, P.t0 + 0.15, 0.3, 2), 0)) {
        x.fillStyle = '#cfe0ff'; x.fillRect(-100, -150, 200, 300); x.restore()
        signChar(x, t, S, 800, 860, 150 * pop01(t, P.t0 + 0.4, 0.3, 2), { mood: lt < 1.1 ? 'happy' : 'heart', look: [-1, 0], seed: 44, glyph: false, alpha: 0.85 })
      }
      label(x, 800, 1110, 'TEAM: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
      hearts(x, t, 800, 760, P.t0 + 1.2, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  // 7 · Align: a match that's just fine
  { sign: S, cap: 'A match that’s “fine”? | *Wait for wow.*', mood: lt => lt < 1.3 ? 'sleepy' : 'sparkle', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      label(x, 790, 610, '✦ NEW MATCH', pop01(t, P.t0 + 0.15, 0.3, 2), { size: 32, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
      bubble(x, 790, 820, lt < 1.3 ? 'k. cool.' : 'tell me | everything!!', pop01(t, P.t0 + (lt < 1.3 ? 0.4 : 1.3), 0.25, 2.2), { size: 44, col: lt < 1.3 ? BONE : PINK, tail: 'bl' })
      label(x, 790, 1080, lt < 1.3 ? 'VIBE: FINE' : 'VIBE: WOW', pop01(t, P.t0 + (lt < 1.3 ? 0.8 : 1.5), 0.3, 2.4), { size: 36, bg: lt < 1.3 ? '#9aa5c4' : MINT, rot: 0.04, font: MONO, weight: 700 })
      if (lt > 1.3) sparkles(x, t, 790, 820, P.t0 + 1.35, 8, 200, 0.3)
    } },
  // 8 · slow is fine
  { sign: S, cap: 'Slow is fine. | *Big dreams can stroll.*', mood: 'happy', look: [1, -1], star: { x: -190, y: 40 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.moveTo(-200, 160); x.lineTo(-30, -140); x.lineTo(40, -30); x.lineTo(90, -100); x.lineTo(220, 160); x.fill()
        x.fillStyle = '#7d86a8'; x.beginPath(); x.moveTo(-182, 150); x.lineTo(-30, -122); x.lineTo(40, -14); x.lineTo(90, -84); x.lineTo(204, 150); x.fill()
        x.fillStyle = CREAM; x.beginPath(); x.moveTo(-30, -122); x.lineTo(-62, -64); x.lineTo(2, -64); x.fill()
        x.restore()
      }
      const climb = ease.inOutQuad(prog(lt, 0.4, 2.3))
      signChar(x, t, S, lerp(640, 770, climb), lerp(990, 760, climb), 80 * k, { mood: 'happy', seed: 45, glyph: false })
      label(x, 790, 1110, 'PACE: YOURS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: LEAF, rot: -0.04, font: MONO, weight: 700 })
    } },
  // 9 · the good blanket
  { sign: S, cap: 'You deserve | *the good blanket.*', mood: 'sleepy', star: { x: -100, y: 0 },
    front(x, t, lt, P) {
      const drop = ease.outCubic(prog(lt, 0.3, 0.9))
      drawBits(x, BLANKET, { L: LAV, W: CREAM }, 460, lerp(600, 1090, drop), 26 * pop01(t, P.t0 + 0.3, 0.3, 2))
      label(x, 790, 1150, 'FLUFF: MAXIMUM', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 32, bg: LAV, rot: 0.04, font: MONO, weight: 700 })
      hearts(x, t, 600, 760, P.t0 + 1.4, { n: 4, life: 1.6, spread: 160, cell: 7, seed: 9 })
    } },
]

const F = makeFilm({
  id: 'r2a0128', key: 'C', accent: LEAF, solo: 'taurus', ending: 'callback',
  title: 'Taurus, you can | *want more.*',
  cameos: CAMEOS,
  group: { cap: 'Steady heart. | *Bigger dreams.*', mood: 'heart' },
  last: {
    text: 'Tried the special. | *New favourite.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'taurus', 360, 1040, 340 * k, { mood: lt > 1.5 ? 'heart' : 'wide', look: [1, 0], seed: 40, hops: [t - lt + 1.4] })
      special(x, t, 760, 1110, 1.3 * pop01(t, t - lt + 0.8, 0.35, 2))
      sparkles(x, t, 760, 1000, t - lt + 1.0, 8, 200, 0.4)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
