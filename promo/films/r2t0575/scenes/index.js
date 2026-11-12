// r2t0575: THE SIGNS AS… v3, SOLO film, "Aries on their birthday | *be like.*" (~46 s vertical, signs3kit social cut, music: lofi · F)
// One sign the whole way through: nine birthday moments, each the most extreme (and lovable) Aries version. Ending: group.
//   0.0–3.6    "Aries on their birthday | *be like.*"
//   3.6–37.8   nine cards: countdown started in January · opened every gift at once · blew out the candles, and yours
//              · party at 8, Aries arrived at 6 · ran a birthday race, nobody else did · challenged the cake, cake lost
//              · every match texted, replied in caps · the party hat stayed on for a week · birthday's over? countdown restarts
//  37.8        "Birthday energy: | *maximum.*"  confetti, and the countdown sign flips back to 364. (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff6b5a', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const ST = { x: -170 }
const S = 'aries'

function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }
function sheet(x, cx, cy, w, h, k, rot, fn, bg = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 7, -h / 2 - 7, w + 14, h + 14)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(); x.restore()
}
const CAKE = ['..F...F..', '..W...W..', '..W...W..', 'PPPPPPPPP', 'PpPPpPPpP', 'CCCCCCCCC', 'CCCCCCCCC', 'KKKKKKKKK']
const CAKE_C = { F: ORANGE, W: SKYB, P: PINK, p: '#ffd0e0', C: PAPER, K: LAV }
const OUT_C = { ...CAKE_C, F: '#140c30' }
const HAT = ['....Y....', '...PPP...', '...PYP...', '..PPPPP..', '..PYPPY..', '.PPPPPPP.', '.PPYPPYP.', 'PPPPPPPPP']
const FORK = ['G.G.G', 'G.G.G', 'GGGGG', '..G..', '..G..', '..G..', '..G..']
const PLATE = ['..WWWWWWWWW..', '.WWWWWWWWWWW.', 'WWWWWWWWWWWWW', '.WWWWWWWWWWW.']

function smoke(x, t, cx, cy, t0) {
  if (t < t0) return
  x.save()
  for (let i = 0; i < 6; i++) { const ph = ((t - t0) * 0.8 + i / 6) % 1; x.globalAlpha = 0.55 * (1 - ph); x.fillStyle = '#d8dbe8'; x.fillRect(cx + (i % 3 - 1) * 40 + Math.sin(ph * 6 + i) * 10, cy - ph * 120, 12, 12) }
  x.restore()
}
function confetti(x, t, cx, cy, t0, { n = 24, spread = 380, h = 600 } = {}) {
  const lt = t - t0
  if (lt <= 0) return
  const COLS = [GOLD, PINK, MINT, SKYB, ORANGE, LAV]
  for (let i = 0; i < n; i++) {
    const ph = (lt * 0.5 + i * 0.137) % 1
    x.save(); x.translate(cx + Math.sin(i * 2.71) * spread + Math.sin(t * 2 + i) * 18, cy - h / 2 + ph * h); x.rotate(t * 3 + i); x.globalAlpha = Math.sin(Math.PI * ph)
    x.fillStyle = COLS[i % COLS.length]; x.fillRect(-9, -5, 18, 10); x.restore()
  }
}
// the countdown sign (card one, and the group beat)
function countdown(x, cx, cy, k, n, rot = 0.04) {
  sheet(x, cx, cy, 280, 220, k, rot, () => {
    x.fillStyle = ACC; x.fillRect(-140, -110, 280, 54); txt(x, 'BIRTHDAY IN', 0, -82, 26, PAPER, MONO, 700)
    txt(x, String(n), 0, 0, 80, INK, MONO, 700); txt(x, 'DAYS', 0, 70, 26, '#4a4470', MONO, 700)
  })
}

const CAMEOS = [
  { sign: S, cap: 'The countdown started | *in January.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [0.6, 1.2, 1.8],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 214 - Math.floor(clamp((lt - 0.3) / 1.6) * 3)
      countdown(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), n)
      L(x, 790, 1100, 'REMINDERS: DAILY', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Opened every gift. | *At once.*', mood: lt => lt > 0.8 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 1.0],
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
      for (let i = 0; i < 14; i++) {
        const a = i / 14 * Math.PI * 2, f = ease.outCubic(prog(lt, 0.5, 1.2))
        x.save(); x.translate(800 + Math.cos(a) * 200 * f, 900 + Math.sin(a) * 160 * f); x.rotate(a + t * 2 * f)
        x.fillStyle = INK; x.fillRect(-26, -18, 52, 36); x.fillStyle = COLS[i % 6]; x.fillRect(-22, -14, 44, 28); x.restore()
      }
      L(x, 800, 660, 'GIFTS: 9 · TIME: 4 SEC', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 28)
    } },
  { sign: S, cap: 'Blew out the candles. | *And yours.*', mood: lt => lt > 1.0 ? 'wink' : 'wide', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const a = lt > 0.6, b = lt > 1.1
      drawBits(x, CAKE, a ? OUT_C : CAKE_C, 690, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, CAKE, b ? OUT_C : { ...CAKE_C, P: SKYB, p: '#d8f6ff' }, 900, 960, 20 * pop01(t, P.t0 + 0.3, 0.3, 2))
      if (a) smoke(x, t, 690, 860, P.t0 + 0.6 * 3.1 / 2.4)
      if (b) smoke(x, t, 900, 860, P.t0 + 1.1 * 3.1 / 2.4)
      bubble(x, 830, 680, 'hey, that’s mi—', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bc' })
      L(x, 800, 1110, 'CANDLES: ALL OF THEM', pop01(t, P.t0 + 1.9, 0.3, 2.4), ORANGE, 0.04, 28)
    } },
  { sign: S, cap: 'Party starts at 8. | *Aries arrived at 6.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      if (k > 0.01) {
        x.save(); x.translate(800, 820); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill(); x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, 98, 0, 7); x.fill()
        x.fillStyle = INK; x.save(); x.rotate(Math.PI); x.fillRect(-6, -70, 12, 70); x.restore(); x.fillRect(-4, -84, 8, 84)
        txt(x, '6:00', 0, 50, 26, RED, MONO, 700); x.restore()
      }
      bubble(x, 800, 1070, 'where is | everyone?!', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: S, cap: 'Started a birthday race. | *Nobody else ran.*', mood: lt => lt > 1.3 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -220 }, hops: [0.4, 0.8, 1.2, 1.6],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      sheet(x, 700, 900, 16, 300, k, 0, null, PAPER); sheet(x, 940, 900, 16, 300, k, 0, null, PAPER)
      if (lt < 1.2) { x.fillStyle = RED; x.fillRect(708, 800, 224, 12) }
      else { x.fillStyle = RED; x.fillRect(708, 800, 60, 12); x.fillRect(872, 800, 60, 12) }
      txt(x, 'FINISH', 820, 760, 32, PAPER, MONO, 700)
      L(x, 820, 1100, 'PLACE: 1ST (OF 1)', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Challenged the cake. | *Cake lost.*', mood: lt => lt > 1.4 ? 'sleepy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const left = 1 - clamp((lt - 0.3) / 1.0)
      drawBits(x, PLATE, { W: PAPER }, 800, 1000, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      if (left > 0.05) drawBits(x, CAKE, OUT_C, 800, 1000 - 60, 15 * left)
      drawBits(x, FORK, { G: '#d8dbe8' }, 660, 900, 13 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: -0.5 + Math.sin(t * 14) * 0.15 * (left > 0.05 ? 1 : 0) })
      L(x, 800, 690, 'ROUND 1: ARIES', pop01(t, P.t0 + 0.5, 0.3, 2.4), ACC, -0.04, 32)
      L(x, 800, 1130, 'CAKE: DEFEATED', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 32)
    } },
  { sign: S, cap: 'Every match texted. | *Replied in caps.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      sheet(x, 790, 870, 260, 400, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, () => {
        x.fillStyle = '#140c30'; x.fillRect(-114, -180, 228, 360)
        x.fillStyle = PINK; x.fillRect(-96, -150, 150, 50); txt(x, 'hbd! ✦', -21, -124, 26, INK)
        if (lt > 0.8) { x.fillStyle = ACC; x.fillRect(-60, -80, 160, 110); txt(x, 'THANK', 20, -50, 34, PAPER); txt(x, 'YOU!!!!', 20, -4, 34, PAPER) }
        if (lt > 1.4) { x.fillStyle = PINK; x.fillRect(-96, 50, 150, 50); txt(x, 'hbd!! ✦', -21, 76, 26, INK) }
      }, '#2a2350')
      L(x, 790, 1120, 'VOLUME: MAX', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: S, cap: 'The party hat stayed on. | *For a week.*', mood: 'sparkle', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P, F) {
      drawBits(x, HAT, { Y: GOLD, P: PINK }, F.x - 20, F.top - 60, 15 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      const d = 1 + Math.min(6, Math.floor(Math.max(0, lt - 0.4) / 0.25))
      L(x, 800, 850, `DAY ${d}: STILL ON`, pop01(t, P.t0 + 0.4, 0.3, 2.4), LAV, 0.04, 36)
      L(x, 800, 1040, 'AT WORK. AT THE GYM.', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'Birthday’s over? | *Countdown restarts.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      countdown(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt > 1.0 ? 364 : 0, -0.04)
      L(x, 790, 1100, 'NEXT ONE: PLANNED', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
      sparkles(x, t, 790, 860, P.t0 + 1.3, 7, 180, 0.3)
    } },
]

const F = makeFilm({
  id: 'r2t0575', key: 'F', accent: ACC, solo: 'aries', ending: 'group',
  title: 'Aries on their birthday | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Birthday energy: | *maximum.*', mood: 'sparkle',
  },
})
// solo films don't call group.draw, so the group beat's gag is drawn on the content canvas after each update
function groupDraw(x, t, lt) {
      const t0 = t - lt
      confetti(x, t, 540, 900, t0 + 0.8)
      drawBits(x, HAT, { Y: GOLD, P: PINK }, 520, 640, 16 * pop01(t, t0 + 1.0, 0.3, 2), { rot: -0.15 })
      L(x, 540, 1300, 'COUNTDOWN: 364 DAYS', pop01(t, t0 + 2.0, 0.3, 2.4), GOLD, -0.04, 36)
}
export const DURATION = F.DURATION
async function build(stage) {
  const sc = await F.SCENES[0](stage)
  const box = sc.root.children[1]
  const cx = box.children[0].getContext('2d')
  // the hook is long: widen the title box so each ' | ' line stays on one line, then scale it to the safe width
  Object.assign(box.children[1].style, { left: '-160px', width: '1400px', transformOrigin: '50% 0', transform: 'scale(0.76)' })
  const up = sc.update
  sc.update = t => { up(t); if (t >= F.T.group && t < F.STORY_END) { cx.save(); cx.globalAlpha = 1 - prog(t, F.STORY_END - 0.5, F.STORY_END - 0.05); groupDraw(cx, t, t - F.T.group); cx.restore() } }
  return sc
}
export const SCENES = [build]
export const CUES = F.CUES
export const T = F.T
