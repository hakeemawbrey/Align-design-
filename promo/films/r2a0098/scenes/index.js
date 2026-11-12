// r2a0098: star_advice, ADVICE SOLO, "Leo, take the compliment | and believe it." (~46 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards): a relatable Leo truth + a warm reframe, one gag each. Ending: callback.
//   0.0–3.6    "Leo, take the praise. | *Believe it.*"
//   3.6–37.8   "this old thing?" (just say thanks) · you hype everyone (let them hype you) · praised at work (screenshot it)
//              · the applause is for you too · deflected with a joke (let it land) · you don't have to earn it twice
//              · your friends mean every word (sticky notes) · bad hair day, still glowing · you light up rooms
//  37.8        "You’re that wonderful. | *Really.*"
//  41.2        CALLBACK: "Nice outfit, Leo. | *“Thank you.”*"  card one, finally answered right.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ORANGE = '#ffb34a', RED = '#e23d4e', CREAM = '#fff4e2'

function card(x, cx, cy, w, h, col, { rot = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = col; x.fillRect(-w / 2, -h / 2, w, h)
  x.restore()
}
function text(x, s, cx, cy, size, col = INK, font = INTER, weight = 800, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.fillStyle = col; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, 0, 0); x.restore()
}
const POM = ['.P.P.P.', 'PPPPPPP', '.PPPPP.', 'PPPPPPP', '.P.P.P.', '...K...', '...K...', '...K...']
const PLANE = ['W.........', 'WWW.......', 'WWWWW.....', 'WWWWWWWW..', 'WWWWWWWWWW', '.GGGGGG...', '..GGG.....']
const TROPHY = ['YYYYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...YYY...', '....Y....', '....Y....', '..KKKKK..', '.KKKKKKK.']
const BULB = ['..YYYYY..', '.YYYYYYY.', 'YYYWYYYYY', 'YYWYYYYYY', 'YYYYYYYYY', '.YYYYYYY.', '..YYYYY..', '...GGG...', '...GGG...', '....G....']
// sun rays behind the star
function rays(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(t * 0.4); x.globalAlpha *= 0.55 * k
  for (let i = 0; i < 12; i++) { x.rotate(Math.PI / 6); x.fillStyle = i % 2 ? GOLD : ORANGE; x.fillRect(150, -14, 120 * k, 28) }
  x.restore()
}

const S = 'leo'
const CAMEOS = [
  { sign: S, cap: '“This old thing?” | *Just say thanks.*', mood: lt => lt > 1.4 ? 'happy' : 'squint', look: [1, 0], star: { x: -180 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'cancer', 820, 990, 190 * k, { mood: 'heart', look: [-1, 0], seed: 19, glyph: false })
      bubble(x, 800, 660, 'love the | outfit!', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 40, tail: 'br' })
      label(x, 420, 640, 'SAY: THANKS', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 34, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You hype everyone. | *Let them hype you.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', star: { x: 0, y: 30, s: 260 }, hops: [1.3],
    front(x, t, lt, P) {
      const pals = [['aries', 300, 1040], ['gemini', 780, 1040]]
      pals.forEach(([id, px, py], i) => {
        const k = pop01(t, P.t0 + 0.4 + i * 0.15, 0.35, 2)
        if (k > 0.01) signChar(x, t, id, px, py, 150 * k, { mood: 'sparkle', seed: 50 + i, glyph: false, hops: [P.t0 + 1.2, P.t0 + 1.9] })
        drawBits(x, POM, { P: i ? PINK : GOLD, K: INK }, px + (i ? -90 : 90), py - 110 + Math.sin(t * 10 + i) * 12, 12 * k)
      })
      label(x, 540, 640, 'GO LEO GO', pop01(t, P.t0 + 1.0, 0.3, 2.4), { size: 42, bg: GOLD, rot: -0.04 })
    } },
  { sign: S, cap: 'Praised at work? | *Screenshot it.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.15, 0.35, 2)
      card(x, 800, 860, 270, 420, '#2a2350', { k, rot: 0.04 })
      bubble(x, 800, 800, 'great job | today!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 36, tail: 'bl', col: SKYB })
      if (lt > 1.1) { x.save(); x.globalAlpha = clamp(1 - (lt - 1.1) * 3); x.fillStyle = '#fff'; x.fillRect(665, 650, 270, 420); x.restore() }
      label(x, 800, 1100, 'SAVED ♡', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 38, bg: PINK, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'The applause | *is for you too.*', mood: lt => lt > 1.0 ? 'heart' : 'wide', star: { x: 0, y: -60, s: 260 }, hops: [1.1],
    front(x, t, lt, P) {
      const ids = ['taurus', 'virgo', 'libra', 'aquarius']
      ids.forEach((id, i) => { const k = pop01(t, P.t0 + 0.3 + i * 0.1, 0.3, 2); if (k > 0.01) signChar(x, t, id, 260 + i * 187, 1080, 120 * k, { mood: 'happy', look: [0, -1], seed: 30 + i, glyph: false, hops: [P.t0 + 0.9 + i * 0.1, P.t0 + 1.6 + i * 0.1] }) })
      label(x, 540, 640, 'CLAP CLAP CLAP', pop01(t, P.t0 + 0.9, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
      sparkles(x, t, 540, 800, P.t0 + 1.4, 8, 200, 0.2)
    } },
  { sign: S, cap: 'Dodged it with a joke? | *Let it land.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.6],
    front(x, t, lt, P, F) {
      const land = ease.outCubic(prog(lt, 0.3, 1.4))
      drawBits(x, PLANE, { W: CREAM, G: '#c9c9d8' }, lerp(880, F.x + 70, land), lerp(620, F.cy - 40, land) + Math.sin(lt * 6) * 20 * (1 - land), 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { sx: -1, rot: 0.3 * (1 - land) })
      label(x, 800, 1020, '“you’re so kind”', pop01(t, P.t0 + 0.6, 0.3, 2.4), { size: 34, bg: BONE, rot: 0.04 })
      hearts(x, t, F.x + 60, F.cy - 60, P.t0 + 1.9, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 3 })
    } },
  { sign: S, cap: 'You don’t have | *to earn it twice.*', mood: 'sparkle', look: [1, 0], star: { x: -180 },
    front(x, t, lt, P) {
      drawBits(x, TROPHY, { Y: GOLD, K: INK }, 800, 840, 28 * pop01(t, P.t0 + 0.2, 0.35, 2))
      sparkles(x, t, 800, 820, P.t0 + 0.8, 7, 180, 0.4)
      label(x, 800, 1100, 'ALREADY YOURS', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Your friends mean it. | *Every word.*', mood: lt => lt > 1.4 ? 'heart' : 'happy', look: [1, 0], star: { x: -190 },
    front(x, t, lt, P) {
      const notes = [['so funny', GOLD, 700, 700, -0.08], ['kindest', PINK, 880, 760, 0.06], ['great taste', SKYB, 720, 900, 0.05], ['best hugs', MINT, 890, 960, -0.05]]
      notes.forEach(([s, c, nx, ny, r], i) => label(x, nx, ny, s, pop01(t, P.t0 + 0.2 + i * 0.3, 0.3, 2.2), { size: 32, bg: c, rot: r }))
      hearts(x, t, 800, 1060, P.t0 + 1.6, { n: 4, life: 1.5, spread: 160, cell: 6, seed: 8 })
    } },
  { sign: S, cap: 'Bad hair day? | *Still glowing.*', mood: lt => lt > 1.1 ? 'sparkle' : 'neutral', star: { x: 0, s: 280 }, hops: [1.2],
    back(x, t, lt, P) { rays(x, t, 540, 880, pop01(t, P.t0 + 0.9, 0.4, 2)) },
    front(x, t, lt, P, F) {
      x.strokeStyle = ORANGE; x.lineWidth = 8; for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(F.x - 60 + i * 30, F.top + 10); x.quadraticCurveTo(F.x - 90 + i * 40, F.top - 60, F.x - 40 + i * 25, F.top - 70 - (i % 2) * 20); x.stroke() }
      label(x, 540, 640, 'GLOW: STILL ON', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 36, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'You light up rooms. | *We checked.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: { x: -180 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const on = lt > 0.9
      if (on) { x.save(); x.globalAlpha = 0.35 * clamp((lt - 0.9) * 3); const g = x.createRadialGradient(800, 820, 10, 800, 820, 260); g.addColorStop(0, '#fff3c0'); g.addColorStop(1, 'rgba(255,243,192,0)'); x.fillStyle = g; x.fillRect(540, 560, 520, 520); x.restore() }
      drawBits(x, BULB, { Y: on ? GOLD : '#6b62a8', W: '#fff', G: '#9aa5c4' }, 800, 820, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      label(x, 800, 1090, 'ROOM: LIT', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 38, bg: GOLD, rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2a0098', key: 'C', accent: ORANGE, solo: S, ending: 'callback',
  title: 'Leo, take the praise. | *Believe it.*',
  cameos: CAMEOS,
  group: { cap: 'You’re that wonderful. | *Really.*', mood: 'heart' },
  last: {
    text: 'Nice outfit, Leo. | *“Thank you.”*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.4, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'leo', 420, 1080, 270 * k, { mood: lt > 1.3 ? 'heart' : 'sparkle', seed: 40, hops: [t - lt + 1.2] })
      const k2 = pop01(t, t - lt + 0.6, 0.45, 1.8)
      if (k2 > 0.01) signChar(x, t, 'cancer', 720, 1110, 190 * k2, { mood: 'heart', look: [-1, 0], seed: 41, glyph: false })
      bubble(x, 420, 830, 'thank you!', pop01(t, t - lt + 1.2, 0.3, 2.2), { size: 44, tail: 'bc' })
      sparkles(x, t, 420, 1060, t - lt + 1.3, 8, 200, 0.2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
