// r2a0508: star_advice ADVICE SOLO (Taurus), "Taurus, you can | share *the last bite.*" (signs3kit, lofi · C). Ending: callback.
//   the snack jar doesn't need a lock · the blanket fort has room for two · lending the hoodie won't ruin it · plans
//   changed, still cozy · try one new dish · you don't have to earn rest · your loyalty is rare · stubborn sometimes,
//   sweet always · slow is still moving.   group: "Soft heart. | Strong snacks."
//   callback: one dumpling, cut in half, "The last bite? | Shared. Mostly."
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
const S = 'taurus', ACC = '#7dffb0'
const JAR = ['..KKKKK..', '.KYYYYYK.', 'KKKKKKKKK', 'KWCWWCWWK', 'KWWCWWCWK', 'KCWWCWWWK', 'KWWCWWCWK', '.KKKKKKK.']
const LOCK = ['.KKK.', 'K...K', 'KKKKK', 'KYYYK', 'KYKYK', 'KKKKK']
const FORT = ['......K......', '.....KPK.....', '....KPPPK....', '...KPPPPPK...', '..KPPPKPPPK..', '.KPPPK.KPPPK.', 'KKKKK...KKKKK']
const HOOD = ['...GGGGG...', '..GG...GG..', '.GGGGGGGGG.', 'GGGGGGGGGGG', 'GG.GGGGG.GG', 'GG.GGWGG.GG', 'GG.GGGGG.GG', '...GGGGG...']
const DISH = ['..P.G.O..', '.PGOPGOP.', 'WWWWWWWWW', '.WWWWWWW.']
const TURTLE = ['...GGGG....', '..GDGGDG...', '.GGGDDGGG.H', 'GDGGGGGDGHH', 'KKKKKKKKKK.', '.L.L..L.L..']
const DUMP = ['...WWWWW...', '..WWBWBWW..', '.WWWWWWWWW.', 'WWWWWWWWWWW', '.WWWWWWWWW.']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#2a2350'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.strokeStyle = MINT; x.lineWidth = 4; x.beginPath(); x.arc(0, 0, r * 0.62, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * 0.2; x.beginPath(); x.moveTo(Math.cos(a) * r * 0.62, Math.sin(a) * r * 0.62); x.lineTo(Math.cos(a) * r, Math.sin(a) * r); x.stroke() }
  x.restore()
  drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: PINK, W: '#fff' }, cx, cy, 9 * k)
}

const CAMEOS = [
  { sign: S, cap: 'The snack jar | *doesn’t need a lock.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, JAR, { K: INK, Y: GOLD, W: '#c4f0ff', C: '#c98f5a' }, 790, 900, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const off = ease.inCubic(prog(lt, 1.0, 1.4))
      drawBits(x, LOCK, { K: INK, Y: GOLD }, 790, 790 + off * 400, 14, { alpha: 1 - off, rot: off * 0.8 })
      L(x, 790, 1130, 'LOCK: OPTIONAL', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: S, cap: 'Your blanket fort | *has room for two.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, FORT, { K: INK, P: PINK }, 790, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 680, 'GUESTS: WELCOME', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 32)
      hearts(x, t, 790, 900, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 7, seed: 3 })
    } },
  { sign: S, cap: 'Lending your hoodie | *won’t ruin it.*', mood: lt => lt > 1.2 ? 'happy' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, HOOD, { G: '#5fd068', W: BONE }, 790, 880, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.05 })
      L(x, 790, 1120, 'RETURN DATE: FRIDAY', pop01(t, P.t0 + 1.2, 0.3, 2.4), BONE, 0.04, 30)
    } },
  { sign: S, cap: 'Plans changed? | *Still cozy.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 820, 300, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.04 }, () => {
        lines(x, ['SATURDAY', 'BIG PARTY'], { size: 34 })
        const c = ease.outCubic(prog(lt, 0.7, 1.0)); x.fillStyle = RED; x.fillRect(-120, 15, 240 * c, 8)
      })
      L(x, 790, 1060, 'NEW PLAN: COUCH', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, 0.04, 36)
    } },
  { sign: S, cap: 'Try one new dish. | *Just one.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      drawBits(x, DISH, { P: PINK, G: '#5fd068', O: '#ffb34a', W: '#ffffff' }, 790, 900, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 690, 'NEW?? OKAY.', pop01(t, P.t0 + 0.6, 0.3, 2.2), BONE, -0.04, 36)
      if (lt > 1.4) L(x, 790, 1110, 'VERDICT: …SECONDS?', pop01(t, t - lt + 1.4, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'You don’t have | *to earn your rest.*', mood: 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 900, 320, 140, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.03, bg: LAV }, () => lines(x, ['PILLOW'], { size: 40 }))
      L(x, 790, 690, 'NAP: DESERVED', pop01(t, P.t0 + 0.9, 0.3, 2.2), MINT, -0.04, 36)
      L(x, 790, 1110, 'GUILT: NONE', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: S, cap: 'Your loyalty? | *Rare and real.*', mood: 'heart', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 790, 860, 320, 200, pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.04 }, () => lines(x, ['SAME FRIENDS', 'SINCE AGE 6'], { size: 30 }))
      L(x, 790, 1100, 'STILL HERE. ALWAYS.', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 30)
      hearts(x, t, 790, 760, P.t0 + 1.0, { n: 5, life: 1.6, spread: 160, cell: 7, seed: 5 })
    } },
  { sign: S, cap: 'Stubborn? Sometimes. | *Sweet? Always.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      chart(x, 790, 860, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1110, 'CHART: MOSTLY SWEET', pop01(t, P.t0 + 1.2, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: S, cap: 'Slow is | *still moving.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, TURTLE, { G: '#5fd068', D: '#3f9e4a', H: '#a8e070', K: INK, L: '#a8e070' }, 700 + 30 * clamp(lt / 2.4) * 6, 920, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 790, 690, 'SPEED: PERFECT', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 34)
      sparkles(x, t, 790, 920, P.t0 + 1.4, 6, 150, 0.2)
    } },
]

const F = makeFilm({
  id: 'r2a0508', key: 'C', accent: ACC, solo: S, ending: 'callback',
  title: 'Taurus, you can | share *the last bite.*',
  cameos: CAMEOS,
  group: { cap: 'Soft heart. | *Strong snacks.*', mood: 'heart' },
  last: {
    text: 'The last bite? | *Shared. Mostly.*',
    draw(x, t, lt) {
      const t0 = t - lt
      const a = pop01(t, t0 + 0.2, 0.45, 1.8), b = pop01(t, t0 + 0.5, 0.45, 1.8)
      if (a > 0.01) signChar(x, t, S, 250, 1060, 240 * a, { mood: lt > 1.5 ? 'heart' : 'squint', seed: 7, look: [1, 0], hops: [t0 + 1.6] })
      if (b > 0.01) signChar(x, t, 'cancer', 830, 1060, 240 * b, { mood: lt > 1.5 ? 'heart' : 'happy', seed: 8, look: [-1, 0], hops: [t0 + 1.7] })
      const sp = ease.outBack(clamp(prog(lt, 1.0, 1.5)))
      const k = pop01(t, t0 + 0.6, 0.4, 2)
      const lo = 540 - sp * 50, ro = 540 + sp * 34
      x.save(); x.beginPath(); x.rect(0, 0, lo + 20, 1920); x.clip(); drawBits(x, DUMP, { W: '#fff4e2', B: '#e8dcc6' }, lo, 1100, 28 * k); x.restore()
      x.save(); x.beginPath(); x.rect(ro + 20, 0, 1080, 1920); x.clip(); drawBits(x, DUMP, { W: '#fff4e2', B: '#e8dcc6' }, ro, 1100, 28 * k); x.restore()
      if (lt > 1.5) L(x, 540, 1280, 'SPLIT: 60 / 40', pop01(t, t0 + 1.5, 0.3, 2.4), MINT, -0.05, 40)
      if (lt > 1.6) hearts(x, t, 540, 900, t0 + 1.6, { n: 6, life: 1.8, spread: 400, cell: 7, seed: 9 })
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
