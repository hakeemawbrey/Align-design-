// r2a0507: star_advice ADVICE SOLO (Aquarius), "Aquarius, you can | change *your mind.*" (signs3kit, lofi · F). Ending: callback.
//   bored of hobby #9? allowed · a new opinion is growth · new hair again, love it · said yes, meant no: say so kindly
//   · moved the couch a fourth time · a new plan is still your path · left the club, started a weirder one · your chart
//   says you contain multitudes · changing isn't flaky, it's how you grow.
//   group: "Evolving. | On purpose."   callback: the couch again, "The couch? | Right back."
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const CREAM = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREEN = '#5fd068'
const ST = { x: -170 }
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
function card(x, cx, cy, w, h, k, { rot = 0.04, bg = CREAM } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn()
  x.restore()
}
/** text lines centred inside a card (call from card's fn) */
function lines(x, arr, { size = 26, color = INK, lh = 1.35, font = MONO, weight = 700, dy = 0 } = {}) {
  x.fillStyle = color; x.font = `${weight} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  arr.forEach((s, i) => x.fillText(s, 0, dy + (i - (arr.length - 1) / 2) * size * lh))
}
/** a phone with a screen; fn draws on the screen in phone-local coords (screen 200×340 centred) */
function phone(x, cx, cy, k, fn, { rot = 0.04, scale = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * scale, k * scale)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -192, 240, 400)
  x.fillStyle = INK; x.fillRect(-126, -206, 252, 412)
  x.fillStyle = '#3a3360'; x.fillRect(-120, -200, 240, 400)
  x.fillStyle = '#1b1236'; x.fillRect(-104, -176, 208, 352)
  if (fn) fn()
  x.restore()
}
const S = 'aquarius', ACC = '#8fe3ff'
const COUCH = ['..BBBBBBBBBB..', '..BLLLLLLLLB..', 'BBBLLLLLLLLBBB', 'BBBBBBBBBBBBBB', 'BBLLLLLLLLLLBB', 'BBBBBBBBBBBBBB', '.K..........K.']
const COUCH_C = { B: '#ff8fb1', L: '#ffb8cf', K: INK }
const FLY = ['PP.....PP', 'PPP...PPP', 'PYPP.PPYP', 'PPPPKPPPP', '.PPPKPPP.', '.PP.K.PP.', 'PP..K..PP', 'P.......P']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = SKYB; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.2; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  const cols = [PINK, GOLD, MINT, LAV, '#ffb34a']
  cols.forEach((c, i) => { const a = i * 1.3 + t * 0.4; x.fillStyle = c; x.fillRect(Math.cos(a) * r * 0.35 - 10, Math.sin(a) * r * 0.35 - 10, 20, 20) })
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'Bored of hobby nine? | *Allowed.*', mood: lt => lt > 1.3 ? 'happy' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 330, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 }, () => {
        lines(x, ['HOBBIES', '', 'KNITTING  x', 'UKULELE   x', 'SOURDOUGH x', 'JUGGLING  ?'], { size: 24, dy: 0 })
      })
      L(x, 790, 1120, 'HOBBY #10: LOADING', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'New opinion today? | *That’s growth.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'I now disagree | with past me.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      L(x, 790, 960, 'OPINION: UPDATED', pop01(t, P.t0 + 1.1, 0.3, 2.4), GOLD, -0.04, 32)
      sparkles(x, t, 790, 960, P.t0 + 1.15, 6, 140, 0.3)
    } },
  { sign: S, cap: 'New hair. Again. | *Looks amazing.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const cols = [SKYB, MINT, PINK, LAV, GOLD], c = cols[Math.min(4, Math.floor(lt / 0.45))]
      card(x, 790, 860, 220, 220, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05, bg: c }, () => lines(x, ['DYE'], { size: 54 }))
      L(x, 790, 680, 'HAIR: V.7', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, -0.04, 38)
      L(x, 790, 1100, 'STILL YOU', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 34)
    } },
  { sign: S, cap: 'Said yes, meant no? | *Say so kindly.*', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 760, 690, 'actually, can I | skip this one?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 32, col: BONE, tail: 'bl' })
      bubble(x, 830, 900, 'of course!', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 46, col: MINT, tail: 'br' })
      L(x, 790, 1110, 'FRIENDSHIP: FINE', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'Moved the couch. | *Fourth time.* Fine.', mood: 'wide', look: [1, 0], star: ST, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const m = Math.sin(clamp(prog(lt, 0.4, 2.0)) * Math.PI * 3) * 60
      drawBits(x, COUCH, COUCH_C, 790 + m, 950, 18 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 690, 'LAYOUT V.4', pop01(t, P.t0 + 0.8, 0.3, 2.2), SKYB, -0.04, 38)
      L(x, 790, 1130, 'VIBES: IMPROVED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: S, cap: 'New plan? | Still *your path.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 300, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04, bg: '#ffe7a8' }, () => {
        const pts = [[-120, 110], [-60, 40], [-110, -20], [10, -40], [40, 60], [120, -100]], d = clamp(prog(lt, 0.4, 1.6)) * (pts.length - 1)
        x.fillStyle = RED
        for (let i = 0; i < pts.length - 1; i++) for (let s = 0; s < 1; s += 0.2) { if (i + s > d) break; x.fillRect(lerp(pts[i][0], pts[i + 1][0], s) - 5, lerp(pts[i][1], pts[i + 1][1], s) - 5, 10, 10) }
        x.fillStyle = INK; x.font = `800 50px ${INTER}`; x.textAlign = 'center'; x.fillText('x', 120, -86)
      })
      L(x, 790, 1110, 'ROUTE: UPDATED', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Left the club. | Started *a weirder one.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 760, 320, 150, pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.05, bg: LAV }, () => lines(x, ['MOTH', 'FAN CLUB'], { size: 40 }))
      drawBits(x, FLY, { P: '#c9b6a0', Y: GOLD, K: INK }, 790, 960, 14 * pop01(t, P.t0 + 1.0, 0.3, 2.2), { rot: 0.1 * Math.sin(t * 5) })
      L(x, 790, 1130, 'MEMBERS: 3 (ALL COOL)', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Your chart says | *you contain multitudes.*', mood: lt => lt > 1.2 ? 'wink' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1110, 'ALL OF IT: YOU', pop01(t, P.t0 + 1.2, 0.3, 2.4), SKYB, -0.04, 34)
    } },
  { sign: S, cap: 'Changing isn’t flaky. | It’s *how you grow.*', mood: 'heart', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) {
      drawBits(x, FLY, { P: SKYB, Y: PINK, K: INK }, 790, 860 - 20 * Math.sin(t * 3), 22 * pop01(t, P.t0 + 0.4, 0.35, 2), { sx: 0.8 + 0.2 * Math.abs(Math.sin(t * 6)) })
      L(x, 790, 1110, 'VERSION: NEWEST', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 34)
      sparkles(x, t, 790, 860, P.t0 + 0.5, 8, 170, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0507', key: 'F', accent: ACC, solo: S, ending: 'callback',
  title: 'Aquarius, you can | change *your mind.*',
  cameos: CAMEOS,
  group: { cap: 'Evolving. | *On purpose.*', mood: 'sparkle' },
  last: {
    text: 'The couch? | *Right back.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const k = pop01(t, t0 + 0.2, 0.45, 1.8)
      if (k > 0.01) signChar(x, t, S, 370, 1060, 250 * k, { mood: lt > 1.5 ? 'wink' : 'happy', seed: 7, look: [1, 0], hops: [t0 + 1.6] })
      const m = 80 * (1 - ease.outBack(clamp(prog(lt, 0.6, 1.3))))
      drawBits(x, COUCH, COUCH_C, 720 + m, 1100, 22 * pop01(t, t0 + 0.5, 0.4, 2))
      if (lt > 1.4) L(x, 720, 960, 'LAYOUT V.5 = V.1', pop01(t, t0 + 1.4, 0.3, 2.4), SKYB, -0.05, 34)
      if (lt > 1.6) sparkles(x, t, 720, 1100, t0 + 1.6, 8, 170, 0.3)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
