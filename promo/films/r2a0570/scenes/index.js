// r2a0570: star_advice, ADVICE ROLL CALL, "Each sign's heart | *in one sentence.*" (topic: each sign's | heart in one sentence) (signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order: one warm, specific line per sign and one light visual gag. Ending: lesson.
//   ♈ brave first, soft right after · ♉ loves you slowly, then forever · ♊ talks a lot, listens even more
//   · ♋ feels it all, gives it all back · ♌ wants the spotlight so they can share it · ♍ fixes things because they care
//   · ♎ wants everyone to feel welcome · ♏ loves deep, trusts slowly · ♐ wants to see the world with you in it
//   · ♑ says I love you with a plan · ♒ different on purpose, loyal for life · ♓ cries at everything, loves everything.
//   group "Twelve signs. | *Twelve big hearts.*"  lesson "Every sign loves. | *In its own way.*"  last "Which one | *is yours?*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const HEART = ['.HH.HH.', 'HHHHHHH', 'HWHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const HC = { H: '#ff4f86', W: '#fff' }

function card(x, cx, cy, w, h, k, rot, fn, face = PAPER) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  x.fillStyle = INK; x.fillRect(-w / 2 - 5, -h / 2 - 5, w + 10, h + 10)
  x.fillStyle = face; x.fillRect(-w / 2, -h / 2, w, h)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
const FLAME = ['...F...', '..FFF..', '.FFYFF.', 'FFYYYFF', 'FFYYYFF', '.FFFFF.']
const SNAIL = ['....SSSS....', '...SsSSsS...', '..SSsHHsSS..', '..SSHHHHSS..', '..SSsHHsSS..', 'B..SSSSSS...', 'BB.BBBBBBBBB', '.BBBBBBBBBBB']
const SNAIL_C = { S: '#e0a56a', s: '#b5713a', H: '#ff4f86', B: '#b9e6a0' }
const TAPE = ['..GGGG..', '.GGGGGG.', 'GGG..GGG', 'GG....GG', 'GGG..GGG', '.GGGGGG.', '..GGGG..']
const MAT = ['RRRRRRRRRRRRRR', 'RrrrrrrrrrrrrR', 'RrrrrrrrrrrrrR', 'RRRRRRRRRRRRRR']
const LOCK = ['..KKKK..', '.K....K.', '.K....K.', 'YYYYYYYY', 'YYYHHYYY', 'YYHHHHYY', 'YYYHHYYY', 'YYYYYYYY']
const SOCK = ['.AAA', '.AAA', '.ABA', '.AAA', 'AAAA', 'AAAA', 'AAA.']

const LS = { x: -190 }
const CAMEOS = [
  { sign: 'aries', cap: 'Brave first. | *Soft right after.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const m = ease.inOutCubic(prog(lt, 0.8, 1.3))
      drawBits(x, FLAME, { F: '#ff6b5a', Y: GOLD }, 790, 860, 26 * pop01(t, P.t0 + 0.2, 0.35, 2) * (1 - m))
      drawBits(x, HEART, HC, 790, 860, 24 * m)
      L(x, 790, 1080, 'BRAVE → SOFT', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 34)
    } },
  { sign: 'taurus', cap: 'Loves you slowly. | *Then forever.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, SNAIL, SNAIL_C, 760 + lt * 30, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 680, 'SPEED: SLOW', pop01(t, P.t0 + 0.7, 0.3, 2.2), MINT, -0.05, 30)
      L(x, 790, 1080, 'LOYALTY: FOREVER', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Talks a lot. | *Listens even more.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: LS, hops: [0.5],
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'okay, and then?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      bubble(x, 830, 800, 'tell me everything.', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 32, tail: 'bl', col: LAV })
      L(x, 790, 1060, 'EARS: WIDE OPEN', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'cancer', cap: 'Feels it all. | *Gives it all back.*', mood: 'heart', look: [1, 0], star: LS,
    front(x, t, lt, P, F) {
      const u = (lt * 0.8) % 1, a = u * Math.PI * 2
      drawBits(x, HEART, HC, 700 + Math.cos(a) * -170 + 0, 860 + Math.sin(a) * 120, 14 * pop01(t, P.t0 + 0.3, 0.3, 2))
      const k = pop01(t, P.t0 + 0.5, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'pisces', 850, 950, 200 * k, { mood: 'heart', look: [-1, 0], seed: 12, glyph: false, glow: 0.4, tears: 2 })
      L(x, 790, 680, 'LOVE: RETURNED ×2', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'leo', cap: 'Wants the spotlight | *so they can share it.*', mood: 'sparkle', look: [1, 0], star: LS,
    back(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.5, 1.6)
      x.save(); x.globalAlpha = 0.25 * clamp(k); x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(480, 480); x.lineTo(640, 480); x.lineTo(980, 1160); x.lineTo(240, 1160); x.fill(); x.restore()
    },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.8, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'virgo', 820, 960, 170 * k, { mood: 'wide', look: [-1, 0], seed: 21, glyph: false, glow: 0.6 })
      bubble(x, 800, 700, 'you too! come up!', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 32, tail: 'bl' })
    } },
  { sign: 'virgo', cap: 'Fixes things | *because they care.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const fixed = ease.outCubic(prog(lt, 0.7, 1.3))
      drawBits(x, HEART, HC, 760 - (1 - fixed) * 30, 870, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.3 * (1 - fixed) })
      drawBits(x, HEART, HC, 820 + (1 - fixed) * 30, 870, 14 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: 0.3 * (1 - fixed), alpha: 0.0001 + (1 - fixed) })
      drawBits(x, TAPE, { G: '#c9c9d8' }, 900, 1000, 10 * pop01(t, P.t0 + 0.5, 0.3, 2))
      L(x, 790, 680, 'FIXED WITH LOVE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'libra', cap: 'Wants everyone | *to feel welcome.*', mood: 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, MAT, { R: '#ff8fb1', r: '#ffd0e0' }, 790, 1030, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      x.save(); x.globalAlpha = clamp(pop01(t, P.t0 + 0.4, 0.3, 2)); x.fillStyle = INK; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('WELCOME, ALL', 790, 1032); x.restore()
      const k = pop01(t, P.t0 + 0.9, 0.35, 2)
      if (k > 0.01) for (const [id, cx, s] of [['taurus', 700, 51], ['aquarius', 820, 52], ['scorpio', 920, 53]]) signChar(x, t, id, cx, 900, 110 * k, { mood: 'happy', look: [-1, 0], seed: s, glyph: false, glow: 0.4 })
    } },
  { sign: 'scorpio', cap: 'Loves deep. | *Trusts slowly.*', mood: lt => lt > 1.4 ? 'heart' : 'squint', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const open = ease.outCubic(prog(lt, 1.1, 1.5))
      x.save(); x.translate(0, -open * 30); drawBits(x, ['..KKKK..', '.K....K.', '.K....K.'], { K: '#c9c9d8' }, 790, 760, 22 * pop01(t, P.t0 + 0.2, 0.35, 2)); x.restore()
      drawBits(x, LOCK.slice(3), { Y: GOLD, H: '#ff4f86' }, 790, 880, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 1080, 'WORTH THE WAIT', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, -0.04, 32)
    } },
  { sign: 'sagittarius', cap: 'Wants to see the world | *with you in it.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) {
        x.save(); x.translate(790, 860); x.scale(k, k)
        x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 158, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#6fc3ff'; x.beginPath(); x.arc(0, 0, 150, 0, Math.PI * 2); x.fill()
        x.fillStyle = '#5fd068'; for (const [a, b, w, h] of [[-80, -60, 90, 60], [30, -20, 110, 70], [-40, 70, 70, 50]]) { x.beginPath(); x.ellipse(a + Math.sin(t) * 6, b, w / 2, h / 2, 0.3, 0, Math.PI * 2); x.fill() }
        x.restore()
        drawBits(x, HEART, HC, 750, 830, 7 * k); drawBits(x, HEART, HC, 840, 880, 7 * k)
      }
      L(x, 790, 1080, 'PASSENGER: YOU', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Says “I love you” | *with a plan.*', mood: lt => lt > 1.4 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 320, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = '#5fd068'; x.fillRect(-165, -160, 330, 58); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('THE PLAN', 0, -131)
        x.textAlign = 'left'; x.font = `700 26px ${MONO}`
        ;['1. you', '2. you, again', '3. dinner (you)'].forEach((s, i) => { if (lt > 0.4 + i * 0.35) x.fillText(s, -130, -60 + i * 64) })
      })
      L(x, 790, 1090, 'ON SCHEDULE: FOREVER', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, -0.04, 26)
    } },
  { sign: 'aquarius', cap: 'Different on purpose. | *Loyal for life.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, SOCK, { A: '#6fc3ff', B: PAPER }, 720, 870, 22 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: -0.15 })
      drawBits(x, SOCK, { A: '#ffd23a', B: '#ff4f86' }, 870, 870, 22 * pop01(t, P.t0 + 0.4, 0.35, 2), { rot: 0.15, sx: -1 })
      L(x, 790, 1080, 'A PAIR. KIND OF.', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, 0.04, 32)
    } },
  { sign: 'pisces', cap: 'Cries at everything. | *Loves everything.*', mood: 'heart', tears: 3, look: [1, 0], star: LS,
    front(x, t, lt, P) {
      hearts(x, t, 790, 1000, P.t0 + 0.4, { n: 8, life: 2.4, spread: 300, cell: 9, seed: 6 })
      L(x, 790, 680, 'CRIED AT: A SUNSET, A DOG, YOU', pop01(t, P.t0 + 0.9, 0.3, 2.4), SKYB, -0.04, 22)
      L(x, 790, 1090, 'HEART: HUGE', pop01(t, P.t0 + 1.6, 0.3, 2.4), PINK, 0.04, 32)
    } },
]

// keep the hook on two lines: shrink the title block if it runs wide
function fitTitleScenes(SCENES, maxW = 940, maxH = 268) {
  const build0 = SCENES[0]
  return [async stage => {
    const r = await build0(stage)
    const tb = [...r.root.querySelectorAll('div')].find(d => d.style.top === '150px')
    if (tb) {
      const prev = tb.style.display; tb.style.display = 'block'
      const scale = k => { tb.style.fontSize = (parseFloat(getComputedStyle(tb).fontSize) * k) + 'px'; for (const n of tb.childNodes) if (n.style && n.style.fontSize) n.style.fontSize = (parseFloat(n.style.fontSize) * k) + 'px' }
      let widest = 0, cur = 0
      for (const n of tb.childNodes) {
        if (n.nodeName === 'BR') { widest = Math.max(widest, cur); cur = 0; continue }
        cur += n.offsetWidth + 0.24 * (parseFloat(n.style?.fontSize) || 92)
      }
      widest = Math.max(widest, cur)
      if (widest > maxW) scale((maxW - 8) / widest)
      for (let i = 0; i < 8 && tb.offsetHeight > maxH; i++) scale(0.94)
      tb.style.display = prev
    }
    return r
  }]
}

const F = makeFilm({
  id: 'r2a0570', key: 'G', accent: ACC, ending: 'lesson',
  title: 'Each sign’s heart | *in one sentence.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Twelve big hearts.*', moods: ['heart', 'heart', 'sparkle', 'heart', 'sparkle', 'heart', 'sparkle', 'heart', 'heart', 'heart', 'sparkle', 'heart'] },
  lesson: { text: 'Every sign loves. | *In its own way.*', chip: 'HEARTS: 12/12' },
  last: { text: 'Which one | *is yours?*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
