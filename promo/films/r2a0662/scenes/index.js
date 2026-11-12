// r2a0662: star_advice, ADVICE SOLO (capricorn), "Capricorn, you're allowed | *to say no.*" (signs3kit social cut, music: lofi · F).
// Nine cards: a relatable Capricorn truth + a warm reframe, one light visual gag each. Ending: callback.
//   extra shift again (a NO stamp on the calendar) · the inbox never sleeps, you can (out of office) · everyone's rock?
//   rocks rest too (a rock on a tiny pillow) · five plans, pick one or none · no reason owed (“no, thank you ♡”)
//   · Saturday is yours (a reserved sign) · 11pm phone, face down · the guilt passes (a raincloud drifts off)
//   · the right match respects your no (a kind chat)
//   group "Your no | *protects your yes.*"   last "Even rocks | *take naps.*" (the resting rock, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const SG = 'capricorn', ST = { x: -170 }
const ACC = '#8fe3c8', CREAM = '#fff4e2', RED = '#e23d4e', BROWN = '#8a4a2e', SLATE = '#9aa5c4'
const L = (x, cx, cy, text, k, bg, rot = -0.04, size = 32) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700 })
function box(x, cx, cy, w, h, k, rot, fn, bg = '#2a2350') {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  fn && fn(); x.restore()
}
function phone(x, cx, cy, k, head, headCol, lines, { size = 28, w = 340, h = 470, rot = 0.04 } = {}) {
  box(x, cx, cy, w, h, k, rot, () => {
    x.fillStyle = '#140c30'; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, h - 28)
    x.fillStyle = headCol; x.fillRect(-w / 2 + 14, -h / 2 + 14, w - 28, 48)
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -h / 2 + 39)
    x.font = `800 ${size}px ${INTER}`
    lines.forEach(([txt, col, kk, mine], i) => {
      if (kk <= 0.01) return
      const tw = x.measureText(txt).width + 26, by = -h / 2 + 110 + i * (size + 40), bx = mine ? w / 2 - 26 - tw / 2 : -w / 2 + 26 + tw / 2
      x.save(); x.translate(bx, by); x.scale(kk, kk)
      x.fillStyle = col; x.fillRect(-tw / 2, -size * 0.8, tw, size * 1.6)
      x.fillStyle = INK; x.fillText(txt, 0, 2); x.restore()
    })
  })
}
const ROCK = ['...RRRR...', '.RRRrRRRR.', 'RRrRRRRRRR', 'RRRRRRrRRR', 'RRRRRRRRRR', '.RRRRRRRR.']
const PILLOW = ['.PPPPPPPPPPPP.', 'PPPPPPPPPPPPPP', 'PPPWPPPPPPPPPP', 'PPPPPPPPPPPPPP', '.PPPPPPPPPPPP.']
function restingRock(x, t, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  drawBits(x, PILLOW, { P: LAV, W: '#fff' }, 0, 50, 14)
  drawBits(x, ROCK, { R: SLATE, r: '#6f7896' }, 0, 0, 16)
  x.fillStyle = INK; x.fillRect(-40, -6, 22, 6); x.fillRect(18, -6, 22, 6)   // closed eyes
  x.font = `800 34px ${INTER}`; x.textAlign = 'center'
  for (let i = 0; i < 3; i++) { const ph = (t * 0.6 + i / 3) % 1; x.globalAlpha = Math.sin(Math.PI * ph); x.fillStyle = BONE; x.fillText('z', 70 + ph * 50, -50 - ph * 90) }
  x.restore()
}
const CLOUD = ['..CCCC.....', '.CCCCCCCC..', 'CCCCCCCCCCC', 'CCCCCCCCCCC', '.CCCCCCCCC.']
const SUN = ['...Y...', '.Y.Y.Y.', '..YYY..', 'YYYYYYY', '..YYY..', '.Y.Y.Y.', '...Y...']

const CAMEOS = [
  { sign: SG, cap: 'Extra shift *again?* | “No” is a full sentence.', mood: lt => lt > 1.3 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      box(x, 790, 860, 320, 300, pop01(t, P.t0 + 0.15, 0.3, 2), 0.03, () => {
        x.fillStyle = CREAM; x.fillRect(-146, -136, 292, 272)
        x.fillStyle = RED; x.fillRect(-146, -136, 292, 50); x.fillStyle = CREAM; x.font = `800 28px ${INTER}`; x.fillText('THIS WEEK', 0, -111)
        for (let d = 0; d < 7; d++) { x.fillStyle = d === 6 ? '#ffe7a8' : '#d9d2c4'; x.fillRect(-136 + d * 40, -60, 34, 150); x.fillStyle = INK; x.font = `700 16px ${MONO}`; x.fillText('SHIFT', -119 + d * 40, 20, 34) }
      })
      const sk = pop01(t, P.t0 + 1.2, 0.25, 2.8)
      if (sk > 0.01) label(x, 800, 880, 'NO.', sk, { size: 96, bg: RED, color: CREAM, rot: -0.15, font: MONO, weight: 700 })
    } },
  { sign: SG, cap: 'Your inbox *never sleeps.* | You can.', mood: lt => lt > 1.2 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) box(x, 790 + (i % 2 ? 16 : -16), 960 - i * 70, 260, 150, pop01(t, P.t0 + 0.15 + i * 0.1, 0.3, 2), (i % 2 ? 0.05 : -0.05), () => {
        x.strokeStyle = INK; x.lineWidth = 6; x.beginPath(); x.moveTo(-130, -75); x.lineTo(0, 10); x.lineTo(130, -75); x.stroke()
      }, BONE)
      L(x, 790, 1110, 'OUT OF OFFICE ✓', pop01(t, P.t0 + 1.3, 0.3, 2.4), MINT, -0.04, 32)
    } },
  { sign: SG, cap: 'Everyone’s *rock?* | Rocks rest too.', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      restingRock(x, t, 790, 880, pop01(t, P.t0 + 0.2, 0.35, 2) * 1.5)
      L(x, 790, 660, 'ON BREAK', pop01(t, P.t0 + 1.1, 0.3, 2.2), LAV, 0.05, 36)
    } },
  { sign: SG, cap: 'Said yes to five plans? | *Pick one.* Or none.', mood: lt => lt > 1.5 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const plans = ['BRUNCH', 'MOVING HELP', 'BIRTHDAY', 'BOOK CLUB', 'GROUP DINNER']
      const cut = clamp((lt - 1.0) / 0.8) * 4
      plans.forEach((p, i) => {
        const gone = i >= 1 && i <= cut
        L(x, 790 + (i % 2 ? 24 : -24), 650 + i * 100, p, pop01(t, P.t0 + 0.15 + i * 0.12, 0.3, 2) * (gone ? 0.0001 + (1 - clamp(cut - i + 1)) : 1), [GOLD, PINK, SKYB, MINT, LAV][i], (i % 2 ? 0.04 : -0.04), 30)
      })
      L(x, 790, 1130, 'SOFA: BOOKED', pop01(t, P.t0 + 2.0, 0.3, 2.4), BONE, -0.03, 28)
    } },
  { sign: SG, cap: 'You don’t owe *a reason.* | Just a kind no.', mood: 'happy', look: [1, 0], star: ST, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'can you…?', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 38, col: SLATE, tail: 'br' })
      bubble(x, 760, 960, 'no, thank you ♡', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 44, col: MINT, tail: 'bl' })
      L(x, 790, 1120, 'EXPLANATION: OPTIONAL', pop01(t, P.t0 + 1.7, 0.3, 2.4), GOLD, -0.04, 24)
    } },
  { sign: SG, cap: 'Saturday is *yours.* | Keep it that way.', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      box(x, 790, 860, 260, 280, pop01(t, P.t0 + 0.15, 0.3, 2), -0.04, () => {
        x.fillStyle = CREAM; x.fillRect(-116, -126, 232, 252)
        x.fillStyle = ACC; x.fillRect(-116, -126, 232, 60); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.fillText('SATURDAY', 0, -96)
        x.font = `800 120px ${INTER}`; x.fillText('♡', 0, 30)
      })
      L(x, 790, 1110, 'RESERVED: ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), PINK, -0.04, 34)
      hearts(x, t, 790, 720, P.t0 + 1.3, { n: 4, life: 1.4, spread: 140, cell: 6, seed: 4 })
    } },
  { sign: SG, cap: 'Work text at 11pm? | *Face down.*', mood: lt => lt > 1.3 ? 'sleepy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const flip = ease.inOutCubic(prog(lt, 0.8, 1.2))
      box(x, 790, 880, 300 , 420 * Math.max(0.02, Math.abs(1 - 2 * flip)), pop01(t, P.t0 + 0.15, 0.3, 2), 0.04, () => {
        if (flip < 0.5) { x.fillStyle = SKYB; x.fillRect(-130, -60, 260, 120); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('quick thing?', 0, 0) }
        else { x.fillStyle = '#1b1236'; x.fillRect(-60, -20, 120, 40) }
      }, flip < 0.5 ? '#2a2350' : '#4a3a8a')
      L(x, 790, 650, '11:04 PM', pop01(t, P.t0 + 0.3, 0.3, 2.2), BONE, 0.05, 34)
      L(x, 790, 1110, 'TOMORROW-YOU’S PROBLEM', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 24)
    } },
  { sign: SG, cap: 'Guilt after a no? | It *passes.* Promise.', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, -1], star: ST,
    front(x, t, lt, P) {
      const go = ease.inOutCubic(prog(lt, 0.8, 1.8))
      drawBits(x, CLOUD, { C: SLATE }, lerp(760, 900, go), 720, 22 * pop01(t, P.t0 + 0.15, 0.3, 2), { alpha: 1 - go })
      if (go < 0.4) for (let i = 0; i < 4; i++) { const ph = (t * 1.5 + i / 4) % 1; x.fillStyle = SKYB; x.fillRect(lerp(760, 900, go) - 80 + i * 50, 780 + ph * 120, 8, 22) }
      drawBits(x, SUN, { Y: GOLD }, 780, 900, 22 * clamp((lt - 1.4) * 3))
      L(x, 790, 1110, 'FORECAST: CLEAR', pop01(t, P.t0 + 1.8, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: SG, cap: 'The right match | *respects your no.*', mood: lt => lt > 1.5 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      phone(x, 770, 870, pop01(t, P.t0 + 0.15, 0.3, 2), 'MATCH ♉︎', PINK, [
        ['friday?', PINK, pop01(t, P.t0 + 0.4, 0.2, 2.2), false],
        ['need a quiet night', ACC, pop01(t, P.t0 + 0.9, 0.2, 2.2), true],
        ['of course! rest ♡', PINK, pop01(t, P.t0 + 1.5, 0.2, 2.2), false],
      ])
      hearts(x, t, 480, 760, P.t0 + 1.6, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2a0662', key: 'F', accent: ACC, solo: SG, ending: 'callback',
  title: 'Capricorn, you’re | allowed *to say no.*',
  cameos: CAMEOS,
  group: { cap: 'Your no | *protects your yes.*', mood: 'heart' },
  last: {
    text: 'Even rocks | *take naps.*',
    draw(x, t, lt) {
      const k = pop01(t, t - lt + 0.5, 0.4, 2)
      if (k > 0.01) signChar(x, t, SG, 360, 1040, 400 * k, { mood: 'sleepy', seed: 5 })
      restingRock(x, t, 760, 1090, pop01(t, t - lt + 0.9, 0.4, 2) * 2)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
