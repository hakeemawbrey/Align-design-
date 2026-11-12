// r2a0519: star_advice, ADVICE ROLL CALL, "How each sign | *shows gratitude.*" (~62 s vertical, signs3kit social cut,
// music: lofi · E). Twelve signs in zodiac order: one warm, specific line each, with a light visual gag. Ending: lesson.
//   0.0–3.6    "How each sign | *shows gratitude.*"
//   3.6–49.2   ♈ carries everything · ♉ a home-cooked meal · ♊ an eleven-minute voice note · ♋ remembers the tiny thing
//              you said once · ♌ thanks you in front of everyone · ♍ fixes the thing you never mentioned · ♎ a
//              handwritten card · ♏ says it once, means it forever · ♐ brings back a souvenir · ♑ returns the favour,
//              double · ♒ a weird, perfect gift · ♓ cries saying thank you
//  49.2        "Twelve ways | *to say thanks.*"
//  52.4        LESSON: "Gratitude speaks | *every sign.*"  THANKS: RECEIVED
//  58.3        "Say thanks today. | *Even briefly.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ffd27a', GREY = '#9aa5c4', RED = '#e23d4e', DEEP = '#2a2350'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
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

// the three-line hook: shrink the title so it fits the width and stays above the stage card's name tab
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

const BOX = ['BBBBBBBB', 'BbBBBBbB', 'BBBTTBBB', 'BBBBBBBB', 'BbBBBBbB', 'BBBBBBBB']
const POT = ['..S..S..S...', '...S..S.....', 'KKKKKKKKKKKK', '.MMMMMMMMMM.', 'KMMMMMMMMMMK', '.MMMMMMMMMM.', '.MMMMMMMMMM.', '..MMMMMMMM..']
const GIFT = ['...R.R...', '....R....', 'GGGGRGGGG', 'GgGGRGGgG', 'GGGGRGGGG', 'GgGGRGGgG', 'GGGGRGGGG']
const WRENCH = ['.GG...', 'G..G..', 'G..GG.', '.GGGGG', '....GG', '.....G']
const GLOBE = ['..WWWWW..', '.WSSSSSW.', 'WSSsSSsSW', 'WSSSHSSSW', 'WSSHHHSSW', '.WSSSSSW.', '..BBBBB..', '.BBBBBBB.']
const ROCK = ['..RRRRR..', '.RRRRRRR.', 'RRWKRWKRR', 'RRWWRWWRR', 'RRRRRRRRR', '.RRRRRRR.']

function phone(x, cx, cy, k, rot, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-112, -182, 236, 376)
  x.fillStyle = INK; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = DEEP; x.fillRect(-114, -184, 228, 368)
  x.fillStyle = '#140c30'; x.fillRect(-100, -160, 200, 320)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (fn) fn(x)
  x.restore()
}
const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Says thanks | *by carrying everything.*', mood: 'sparkle', look: [1, 0], star: LS, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, BOX, { B: '#c98f2a', b: '#e0a85a', T: '#ffe36a' }, 790 + (i % 2) * 20, 1060 - i * 100, 16 * pop01(t, P.t0 + 0.2 + i * 0.2, 0.3, 2), { rot: (i % 2 ? 1 : -1) * 0.04 })
      L(x, 790, 640, 'BOXES: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: 'taurus', cap: 'Cooks you | *a thank-you dinner.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, POT, { S: '#d8dbe8', K: INK, M: '#ff9a4a' }, 800, 980, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'SERVES: TWELVE', pop01(t, P.t0 + 1.0, 0.3, 2.2), MINT, -0.04, 32)
      L(x, 800, 1150, 'LEFTOVERS: PACKED', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'gemini', cap: 'A voice note. | *Eleven minutes long.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      phone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.fillStyle = PINK; x.font = `700 20px ${MONO}`; x.fillText('YOUR MATCH', 0, -136)
        x.fillStyle = MINT; x.fillRect(-90, -40, 180, 80)
        for (let i = 0; i < 12; i++) { const h = 10 + 26 * Math.abs(Math.sin(i * 1.7 + t * 6)); x.fillStyle = INK; x.fillRect(-80 + i * 14, -h / 2, 8, h) }
        const m = Math.floor(clamp((lt - 0.3) / 1.4) * 11)
        x.fillStyle = BONE; x.font = `700 26px ${MONO}`; x.fillText(`${m}:${String(Math.floor(lt * 37) % 60).padStart(2, '0')}`, 0, 80)
      })
    } },
  { sign: 'cancer', cap: 'Remembers the tiny thing | *you said once.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, GIFT, { R: RED, G: SKYB, g: '#d8f6ff' }, 800, 980, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'YOUR FAVE (SINCE 2019)', pop01(t, P.t0 + 1.0, 0.3, 2.2), PINK, -0.04, 26)
      hearts(x, t, 800, 980, P.t0 + 1.6, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'Thanks you | *in front of everyone.*', mood: 'sparkle', look: [1, 0], star: LS, hops: [1.0],
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 0.3, 0.6))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.25 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(F.x - 40, 500); x.lineTo(F.x + 40, 500); x.lineTo(F.x + 190, 1100); x.lineTo(F.x - 190, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      bubble(x, 790, 720, 'a HUGE shout-out | to my friend!', pop01(t, P.t0 + 0.7, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 790, 1060, 'APPLAUSE: REQUIRED', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Fixes the thing | *you never mentioned.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, WRENCH, { G: '#d8dbe8' }, 800, 940, 26 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: Math.sin(t * 5) * 0.2 })
      L(x, 800, 700, 'SQUEAKY DOOR', pop01(t, P.t0 + 0.7, 0.3, 2.2), GREY, -0.04, 32)
      L(x, 800, 1130, 'SQUEAK: GONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'libra', cap: 'A handwritten card. | *Gorgeous handwriting.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 280, 220, pop01(t, P.t0 + 0.2, 0.3, 2), 0.05, x => {
        x.fillStyle = '#c0306a'; x.font = `italic 600 52px Georgia, serif`; x.fillText('Thank you,', 0, -34)
        x.font = `italic 600 42px Georgia, serif`; x.fillText('dear match ♡', 0, 30)
      }, '#ffd0e0')
      sparkles(x, t, 800, 900, P.t0 + 1.2, 7, 180, 0.4)
      L(x, 800, 1130, 'STAMP: COLOUR-MATCHED', pop01(t, P.t0 + 1.7, 0.3, 2.2), PINK, -0.04, 26)
    } },
  { sign: 'scorpio', cap: 'Says it once. | *Means it forever.*', mood: lt => lt > 1.2 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'thank you.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 46, col: '#ffb3c0', tail: 'bl' })
      L(x, 790, 1000, 'LOYALTY: LIFETIME', pop01(t, P.t0 + 1.3, 0.3, 2.2), '#c97bff', 0.04, 32, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Brings you back | *a souvenir.*', mood: 'sparkle', star: RS, hops: [0.6],
    front(x, t, lt, P) {
      drawBits(x, GLOBE, { W: '#d8f6ff', S: SKYB, s: '#ffffff', H: '#5fd068', B: '#c98f2a' }, 330, 930, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 330, 690, 'FROM: SOMEWHERE FAR', pop01(t, P.t0 + 1.0, 0.3, 2.2), GOLD, -0.04, 26)
      for (let i = 0; i < 6; i++) { const ph = (t * 0.6 + i / 6) % 1; x.fillStyle = '#ffffff'; x.globalAlpha = Math.sin(Math.PI * ph); x.fillRect(270 + i * 22, 850 + ph * 100, 6, 6); x.globalAlpha = 1 }
    } },
  { sign: 'capricorn', cap: 'Remembers the favour. | *Returns it double.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 260, 240, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('FAVOURS', 0, -92)
        x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.fillText('you: 1', -90, -30); if (lt > 1.0) { x.fillStyle = '#2fc79a'; x.fillText('me: 2', -90, 30) }
      })
      L(x, 800, 1130, 'BALANCE: PAID ×2', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Gives a weird gift. | *It’s perfect.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, ROCK, { R: '#9aa5c4', W: '#ffffff', K: INK }, 800, 960, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'HIS NAME IS KEVIN', pop01(t, P.t0 + 1.0, 0.3, 2.2), SKYB, -0.04, 30)
      bubble(x, 800, 1140, 'i love him', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 36, tail: 'bc' })
    } },
  { sign: 'pisces', cap: 'Cries | *saying thank you.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 790, 760, 'you’re just | so KIND', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, col: LAV, tail: 'bl' })
      L(x, 790, 1040, 'TISSUES: 9', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#b7a6ff', 0.04, 32)
    } },
]

const F = makeFilm({
  id: 'r2a0519', key: 'E', accent: ACC, ending: 'lesson',
  title: 'How each sign | *shows gratitude.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve ways | *to say thanks.*', moods: ['sparkle', 'heart', 'happy', 'heart', 'sparkle', 'happy', 'heart', 'heart', 'sparkle', 'happy', 'sparkle', 'wide'] },
  lesson: { text: 'Gratitude speaks | *every sign.*', chip: 'THANKS: RECEIVED' },
  last: {
    text: 'Say thanks today. | *Even briefly.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 10, life: 2.2, spread: 700, cell: 8, seed: 5 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
