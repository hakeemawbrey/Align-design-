// r2t0402: THE SIGNS AS… v3, BELIKE, "“Guess what?” | Zodiacs be like." (~62 s vertical, signs3kit social cut, music:
// lofi · E). The format look lives in ../../signs3kit.js. Ending: lesson.
//   0.0–3.6    the hook; the twelve line up, then dive into the pip row.
//   3.6–49.2   one reaction per sign (3.8 s each), pushed to the extreme:
//              ♈ forty guesses in one second · ♉ is it food? · ♊ already told six people · ♋ already baked a cake
//              · ♌ is it about me? (spotlight) · ♍ asked for sources (clipboard) · ♎ too many options to guess
//              · ♏ knew yesterday (case closed) · ♐ already planning the trip (map) · ♑ hopes it's a spreadsheet
//              · ♒ guessed aliens (UFO) · ♓ crying already, doesn't know why
//  49.2        "One “guess what.” | *Twelve meltdowns.*"
//  52.4        LESSON: "Good news is better | when *you share it.*"  NEWS: SHARED
//  58.3        "Meanwhile, Aries: | *still guessing.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const RED = '#e23d4e', ORANGE = '#ffb34a', PAPER = '#fff4e2', GREEN = '#5fd068'

const CAKE = [
  '..F...F...F..',
  '..C...C...C..',
  '..C...C...C..',
  'PPPPPPPPPPPPP',
  'PWPPWPPWPPWPP',
  'BBBBBBBBBBBBB',
  'BBBBBBBBBBBBB',
  'PPPPPPPPPPPPP',
  'BBBBBBBBBBBBB',
  'DDDDDDDDDDDDD',
]
const CAKE_C = { F: GOLD, C: SKYB, P: PINK, W: '#fff', B: PAPER, D: '#c3cbe0' }
const FORK = [
  'X.X.X',
  'X.X.X',
  'X.X.X',
  'XXXXX',
  '.XXX.',
  '..X..',
  '..X..',
  '..X..',
  '..X..',
  '..X..',
]
const UFO = [
  '.....GGG.....',
  '....GgggG....',
  '...GgggggG...',
  '.SSSSSSSSSSS.',
  'SSYSSYSSYSSYS',
  '.SSSSSSSSSSS.',
  '...L.....L...',
]
const UFO_C = { G: '#9ae58a', g: '#d8ffd0', S: '#c3cbe0', Y: GOLD, L: SKYB }

// a clipboard with lines that tick in
function clipboard(x, cx, cy, k, lt, lines) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-136, -176, 272, 352)
  x.fillStyle = '#c98f2a'; x.fillRect(-130, -170, 260, 340)
  x.fillStyle = PAPER; x.fillRect(-112, -140, 224, 296)
  x.fillStyle = '#9aa5c4'; x.fillRect(-46, -186, 92, 34)
  x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach((l, i) => { if (lt < 0.5 + i * 0.35) return; x.strokeStyle = INK; x.lineWidth = 3; x.strokeRect(-94, -100 + i * 66 - 13, 26, 26); x.fillText(l, -56, -100 + i * 66) })
  x.restore()
}
// a manila case folder stamped CLOSED
function caseFile(x, cx, cy, k, stamp) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.05); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-156, -126, 312, 252); x.fillRect(-150, -150, 120, 34)
  x.fillStyle = '#e8c47a'; x.fillRect(-150, -120, 300, 240); x.fillRect(-144, -144, 108, 30)
  x.fillStyle = '#6b4a1e'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('THE NEWS', 0, -70)
  if (stamp > 0.01) {
    x.save(); x.rotate(-0.18); x.scale(1 + 0.6 * (1 - stamp), 1 + 0.6 * (1 - stamp)); x.globalAlpha = stamp
    x.strokeStyle = RED; x.lineWidth = 7; x.strokeRect(-120, -10, 240, 76)
    x.fillStyle = RED; x.font = `800 44px ${INTER}`; x.fillText('KNOWN', 0, 28)
    x.restore()
  }
  x.restore()
}
// a folded map with a dotted route that draws itself
function routeMap(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.04); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -126, 352, 252)
  const cols = ['#bfe8a8', '#a8d8f0', '#bfe8a8', '#a8d8f0']
  for (let i = 0; i < 4; i++) { x.fillStyle = cols[i]; x.fillRect(-170 + i * 85, -120, 85, 240) }
  x.fillStyle = 'rgba(27,18,54,0.12)'; for (let i = 1; i < 4; i++) x.fillRect(-170 + i * 85 - 2, -120, 4, 240)
  const pts = [[-140, 80], [-80, 20], [-10, 60], [50, -30], [120, -70]]
  const p = clamp((lt - 0.4) / 1.2) * (pts.length - 1)
  x.fillStyle = RED
  for (let s = 0; s < Math.floor(p * 6); s++) { const u = s / 6, a = Math.floor(u), f = u - a; if (a >= pts.length - 1) break; x.fillRect(lerp(pts[a][0], pts[a + 1][0], f) - 5, lerp(pts[a][1], pts[a + 1][1], f) - 5, 10, 10) }
  if (p >= pts.length - 1.05) { x.fillStyle = INK; x.fillRect(108, -98, 26, 26); x.fillStyle = GOLD; x.fillRect(112, -94, 18, 18) }
  x.restore()
}
// a tiny spreadsheet whose cells fill in
function sheet(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-166, -136, 332, 272)
  x.fillStyle = '#ffffff'; x.fillRect(-160, -130, 320, 260)
  x.fillStyle = GREEN; x.fillRect(-160, -130, 320, 44)
  x.fillStyle = '#fff'; x.font = `800 26px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('NEWS.XLS', 0, -108)
  const n = Math.floor(clamp((lt - 0.4) / 1.4) * 20)
  for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) {
    const px = -150 + c * 76, py = -76 + r * 40
    x.strokeStyle = '#c3cbe0'; x.lineWidth = 2; x.strokeRect(px, py, 76, 40)
    if (r * 4 + c < n) { x.fillStyle = r === 0 ? '#9ae58a' : '#e8f6e0'; x.fillRect(px + 6, py + 12, 64, 16) }
  }
  x.restore()
}
// a spotlight cone from the top of the panel
function spotlight(x, cx, k) {
  if (k <= 0.01) return
  x.save(); x.globalAlpha = 0.32 * k
  const g = x.createLinearGradient(0, 480, 0, 1180); g.addColorStop(0, 'rgba(255,241,200,0.9)'); g.addColorStop(1, 'rgba(255,241,200,0)')
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, 480); x.lineTo(cx + 40, 480); x.lineTo(cx + 200, 1180); x.lineTo(cx - 200, 1180); x.fill()
  x.restore()
}

const STAR = { x: -170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Aries guessed forty times. | *In one second.*', mood: 'wide', look: [1, 0], star: STAR, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const G = ['a puppy?', 'you won?', 'you moved?', 'a race?', 'pizza?', 'a TWIN?']
      G.forEach((g, i) => bubble(x, 700 + (i % 2) * 150, 610 + i * 88, g, pop01(t, P.t0 + 0.3 + i * 0.22, 0.2, 2.2), { size: 30, tail: i % 2 ? 'br' : 'bl' }))
      label(x, 800, 1160, 'GUESSES: 40', pop01(t, P.t0 + 1.7, 0.3, 2.2), { size: 34, bg: RED, color: PAPER, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: 'taurus', cap: 'Taurus asked one thing: | *is it food?*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, FORK, { X: '#d8dbe8' }, 820, 960, 18 * pop01(t, P.t0 + 0.3, 0.3, 2), { rot: 0.25 + 0.05 * Math.sin(t * 6) })
      bubble(x, 760, 660, 'is it | FOOD?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 48, tail: 'bl' })
    } },
  { sign: 'gemini', cap: 'Gemini already knew. | Told *six people.*', mood: lt => Math.floor(lt * 3) % 2 ? 'wink' : 'sparkle', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      const n = Math.min(6, Math.floor(clamp((lt - 0.4) / 1.4) * 6) + 1)
      for (let i = 0; i < n; i++) label(x, 790, 640 + i * 82, `✉ SENT TO #${i + 1}`, pop01(t, P.t0 + 0.4 + i * 0.23, 0.25, 2.2), { size: 28, bg: i % 2 ? SKYB : GOLD, rot: (i % 2 ? 0.04 : -0.04), font: MONO, weight: 700 })
    } },
  { sign: 'cancer', cap: 'Cancer already baked | *a cake.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 980, 20 * pop01(t, P.t0 + 0.25, 0.3, 2))
      label(x, 790, 700, 'CONGRATS ON… ANYTHING!', pop01(t, P.t0 + 1.1, 0.3, 2.2), { size: 28, bg: PINK, rot: -0.04 })
      sparkles(x, t, 790, 900, P.t0 + 1.2, 7, 180, 0.3)
    } },
  { sign: 'leo', cap: 'Leo, instantly: | “is it *about me?*”', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.9],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { spotlight(x, 370, pop01(t, P.t0 + 0.2, 0.4, 1.6)) },
    front(x, t, lt, P) {
      bubble(x, 780, 700, 'is it | about ME?', pop01(t, P.t0 + 0.8, 0.25, 2.2), { size: 46, tail: 'bl' })
      label(x, 790, 1060, 'SPOTLIGHT: ON', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 34, bg: GOLD, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Virgo asked | for *sources.*', mood: 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      clipboard(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt, ['WHO?', 'WHEN?', 'PROOF?', 'CITE IT'])
    } },
  { sign: 'libra', cap: 'Libra couldn’t guess. | *Too many options.*', mood: lt => Math.floor(lt * 2.5) % 2 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2.5) % 2 ? 1 : -1, 0], star: STAR,
    front(x, t, lt, P) {
      label(x, 700, 650, 'GOOD NEWS?', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 32, bg: MINT, rot: -0.05 })
      label(x, 860, 780, 'BAD NEWS?', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 32, bg: LAV, rot: 0.05 })
      label(x, 720, 910, 'BOTH??', pop01(t, P.t0 + 0.9, 0.3, 2), { size: 32, bg: PINK, rot: -0.04 })
      label(x, 800, 1100, 'DECIDING… 3 HRS', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 30, bg: GOLD, rot: 0.03, font: MONO, weight: 700 })
    } },
  { sign: 'scorpio', cap: 'Scorpio knew. | *Yesterday.*', mood: 'squint', look: [1, 0], star: STAR,
    front(x, t, lt, P) {
      caseFile(x, 790, 900, pop01(t, P.t0 + 0.2, 0.3, 2), ease.outCubic(prog(lt, 1.0, 1.25)))
      bubble(x, 800, 660, 'old news.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'sagittarius', cap: 'Sagittarius heard “trip.” | *Already planned it.*', mood: 'sparkle', look: [1, 0], star: STAR, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      routeMap(x, 790, 920, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      bubble(x, 780, 660, 'it wasn’t | a trip.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Capricorn hoped | for *a spreadsheet.*', mood: lt => lt > 1.4 ? 'sparkle' : 'neutral', look: [1, 0], star: STAR, hops: [1.6],
    front(x, t, lt, P) {
      sheet(x, 790, 900, pop01(t, P.t0 + 0.25, 0.3, 2), lt)
      hearts(x, t, 790, 760, P.t0 + 1.7, { n: 4, life: 1.4, spread: 160, cell: 7, seed: 2 })
    } },
  { sign: 'aquarius', cap: 'Aquarius guessed *aliens.* | Every time.', mood: 'wide', look: [1, -1], star: STAR, hops: [1.2],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.3, 0.35, 2)
      drawBits(x, UFO, UFO_C, 800, 700 + Math.sin(t * 3) * 14, 20 * k)
      if (k > 0.5) { x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#9ae58a'; x.beginPath(); x.moveTo(760, 760); x.lineTo(840, 760); x.lineTo(900, 1100); x.lineTo(700, 1100); x.fill(); x.restore() }
      label(x, 800, 1130, 'GUESS #1: ALIENS', pop01(t, P.t0 + 1.2, 0.3, 2.2), { size: 30, bg: MINT, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'pisces', cap: 'Pisces is crying. | *Doesn’t know why yet.*', mood: lt => lt > 1.2 ? 'heart' : 'wide', look: [1, 0], star: STAR, tears: lt => lt > 0.5 ? 3 : 1, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 780, 680, 'whatever it is, | i’m SO happy', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 34, col: SKYB, tail: 'bl' })
      hearts(x, t, 760, 960, P.t0 + 1.2, { n: 6, life: 1.8, spread: 260, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0402', key: 'E', accent: GOLD, ending: 'lesson',
  title: '“Guess what?” | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'One “guess what.” | *Twelve meltdowns.*' },
  lesson: { text: 'Good news is better | when *you share it.*', chip: 'NEWS: SHARED' },
  last: {
    text: 'Meanwhile, Aries: | *still guessing.*',
    draw(x, t, lt) {
      // Aries is first in the group photo (top-left): the guesses keep coming from there
      ;['a llama?', 'a castle?!'].forEach((g, i) => bubble(x, 230 + i * 70, 960 - i * 110, g, pop01(t, t - lt + 0.9 + i * 0.8, 0.25, 2.2), { size: 34, tail: 'bl' }))
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
