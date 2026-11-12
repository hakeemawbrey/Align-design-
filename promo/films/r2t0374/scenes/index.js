// r2t0374: star_talk, SOLO (scorpio), "Scorpios at a party | *be like.*" (signs3kit social cut, music: lofi · D). Ending: callback.
//   found the one quiet corner · skipped the small talk, went straight to childhood · someone asked their sign: "guess."
//   · knew all the drama by 8:15 · wore all black to a pastel party · read one palm, now there's a queue
//   · danced once, it's legendary now · made one friend, for life (Pisces) · left without saying goodbye
//   Callback: their new friend is still looking for them.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', CREAM = '#fff4e2', ACC = '#ff5c7a', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const mini = (x, t, id, cx, cy, s, k, mood, seed, extra = {}) => k > 0.01 && signChar(x, t, id, cx, cy, s * k, { mood, seed, glyph: false, ...extra })

/** pastel party confetti */
function confetti(x, t, cx, cy, t0, { n = 20, spread = 380, h = 560, cols = [PINK, MINT, SKYB, '#ffe7a8', LAV] } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.5 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 16, cy - h / 2 + ph * h); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = cols[i % cols.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
/** a notebook page with names and little hearts between them */
function notebook(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-140, -170, 296, 356)
  x.fillStyle = INK; x.fillRect(-152, -186, 304, 364); x.fillStyle = CREAM; x.fillRect(-144, -178, 288, 348)
  x.fillStyle = '#b9dfff'; for (let i = 0; i < 6; i++) x.fillRect(-144, -110 + i * 50, 288, 3)
  x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WHO LIKES WHO', 0, -144)
  const ROWS = [['Sam', 'Jo'], ['Jo', 'Ari'], ['Ari', 'Sam'], ['Max', 'snacks']]
  const n = Math.min(ROWS.length, Math.floor(Math.max(0, lt - 0.3) / 0.3) + 1)
  x.font = `700 26px ${MONO}`
  for (let i = 0; i < n; i++) { const [a, b] = ROWS[i], y = -84 + i * 62; x.fillText(`${a} ♡ ${b}`, 0, y) }
  x.restore()
}
/** a disco ball on a string */
function disco(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-3, -200, 6, 120)
  const c = 14
  for (let j = -4; j <= 4; j++) { const w = Math.round(Math.sqrt(Math.max(0, 22 - j * j))); for (let i = -w; i < w; i++) { x.fillStyle = INK; x.fillRect(i * c - 1, j * c - 1, c + 2, c + 2); x.fillStyle = ((i + j + Math.floor(t * 6)) % 3 + 3) % 3 === 0 ? '#ffffff' : (i + j) % 2 ? '#cfd6ea' : '#9aa5c4'; x.fillRect(i * c, j * c, c - 1, c - 1) } }
  x.restore()
  x.save(); x.globalAlpha = 0.5
  for (let i = 0; i < 8; i++) { const a = t * 1.5 + i * 0.8; drawBits(x, ['.W.', 'WWW', '.W.'], { W: [PINK, MINT, SKYB, GOLD][i % 4] }, cx + Math.cos(a) * 300, cy + 200 + Math.sin(a * 1.3) * 160, 6, { outline: null }) }
  x.restore()
}
/** an open door with a little puff of smoke where someone just was */
function door(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -200, 220, 400); x.fillStyle = '#ffe7a8'; x.fillRect(-100, -190, 200, 390)
  const open = ease.outCubic(prog(lt, 0.3, 0.8))
  x.fillStyle = '#8a4a2e'; x.fillRect(-100, -190, 200 * (1 - open * 0.8), 390)
  x.fillStyle = GOLD; x.fillRect(-100 + 200 * (1 - open * 0.8) - 30, 0, 14, 14)
  x.restore()
}
const PALM = ['..K.K.K..', '.KWKWKWK.', '.KWKWKWKK', '.KWWWWWKWK', 'KKWWWWWWWK', 'KWWWWWWWK.', '.KWWWWWK..', '..KWWWK...']

const S = 'scorpio', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Arrived. Found | *the one quiet corner.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', star: { x: -240, y: -60, s: 240 },
    back(x, t, lt, P) {
      x.save(); x.globalAlpha = 0.5; x.fillStyle = '#0c0820'; x.beginPath(); x.moveTo(120, 480); x.lineTo(520, 480); x.lineTo(120, 1000); x.fill(); x.restore()
      confetti(x, t, 760, 850, P.t0, { spread: 200 })
    },
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'PARTY!!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 44, col: PINK, tail: 'bc' })
      L(x, 380, 1100, 'CORNER: CLAIMED', pop01(t, P.t0 + 1.3, 0.3, 2.4), ACC, -0.04, 32, CREAM)
    } },
  { sign: S, cap: 'No small talk. | *Straight to childhood.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mini(x, t, 'gemini', 830, 1010, 180, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.2 ? 'wide' : 'happy', 12, { look: [-1, 0] })
      bubble(x, 790, 650, 'nice weather!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'br' })
      bubble(x, 520, 760, 'so. your | childhood?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Someone asked their sign. | *“Guess.”*', mood: lt => lt > 1.0 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 660, 'what’s your | sign?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 36, tail: 'br' })
      bubble(x, 660, 880, 'guess.', pop01(t, P.t0 + 0.9, 0.25, 2.4), { size: 60, col: LAV, tail: 'bl' })
      L(x, 790, 1110, '3 HOURS LATER…', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Knew all the drama | *by 8:15.*', mood: lt => lt > 1.4 ? 'wink' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      notebook(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 790, 1100, 'INTEL: COMPLETE', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, -0.04, 32, CREAM)
    } },
  { sign: S, cap: 'Wore all black | to *a pastel party.*', mood: 'neutral', star: ST,
    back(x, t, lt, P) { confetti(x, t, 540, 850, P.t0, { n: 26, spread: 400 }) },
    front(x, t, lt, P) {
      L(x, 790, 640, 'DRESS CODE: PASTEL', pop01(t, P.t0 + 0.3, 0.3, 2), PINK, -0.04, 30)
      mini(x, t, 'libra', 760, 980, 150, pop01(t, P.t0 + 0.6, 0.3, 2), 'happy', 14, { look: [-1, 0] })
      mini(x, t, 'cancer', 900, 1000, 140, pop01(t, P.t0 + 0.8, 0.3, 2), 'happy', 15, { look: [-1, 0] })
      L(x, 380, 1130, 'MOOD: ECLIPSE', pop01(t, P.t0 + 1.5, 0.3, 2.4), INK, 0.04, 30, CREAM)
    } },
  { sign: S, cap: 'Read one palm. | Now there’s *a queue.*', mood: lt => lt > 1.3 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, PALM, { K: INK, W: '#ffd8b8' }, 560, 700, 12 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 })
      const Q = ['aries', 'taurus', 'leo', 'virgo', 'aquarius']
      const n = Math.min(Q.length, Math.floor(Math.max(0, lt - 0.6) / 0.25) + 1)
      for (let i = 0; i < n; i++) mini(x, t, Q[i], 680 + i * 62, 1000 - (i % 2) * 20, 120, pop01(lt, 0.6 + i * 0.25, 0.25, 2), 'sparkle', 20 + i, { look: [-1, 0] })
      L(x, 800, 800, 'WAIT: 2 HOURS', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Danced once. | It’s *legendary now.*', mood: lt => lt > 1.2 ? 'wink' : 'squint', star: ST, hops: [0.6, 1.0, 1.4],
    front(x, t, lt, P) {
      disco(x, t, 790, 760, pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, 'TALKED ABOUT: FOREVER', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 26)
    } },
  { sign: S, cap: 'Made one friend. | *For life.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      mini(x, t, 'pisces', 820, 980, 220, pop01(t, P.t0 + 0.2, 0.35, 2), 'heart', 16, { look: [-1, 0], tears: 2 })
      L(x, 800, 680, 'BEST FRIEND: SIGNED', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 30)
      hearts(x, t, 680, 900, P.t0 + 1.2, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Left without | *saying goodbye.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', star: ST,
    front(x, t, lt, P, F) {
      door(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      if (lt > 1.2) {
        const p = prog(lt, 1.2, 1.7)
        x.save(); x.globalAlpha = 1 - p; for (let i = 0; i < 6; i++) { x.fillStyle = '#cfd6ea'; x.beginPath(); x.arc(380 + Math.cos(i) * 80 * (0.5 + p), 860 + Math.sin(i * 1.7) * 60 * (0.5 + p), 40 * (1 - p * 0.5), 0, Math.PI * 2); x.fill() } x.restore()
      }
      L(x, 790, 1130, 'GONE. 9:30 P.M.', pop01(t, P.t0 + 1.6, 0.3, 2.4), ACC, 0.04, 32, CREAM)
    } },
]

const F = makeFilm({
  id: 'r2t0374', key: 'D', accent: ACC, solo: 'scorpio', ending: 'callback',
  title: 'Scorpios at a party | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Said ten words. | *Knew everything.*', mood: 'squint' },
  last: {
    text: 'Their new friend? | *Still looking.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, 'pisces', 540, 1060, 300 * k, { mood: 'wide', look: [Math.floor(lt * 2) % 2 ? 1 : -1, 0], seed: 9, tears: 3 })
      if (lt > 1.0) bubble(x, 800, 820, 'where’d | they go??', pop01(t, t0 + 1.0, 0.25, 2.2), { size: 38, col: SKYB, tail: 'bl' })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
