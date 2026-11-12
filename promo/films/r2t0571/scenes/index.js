// r2t0571: THE SIGNS AS… v3, "Zodiacs finding the perfect gift | *be like.*" (~59 s vertical, signs3kit social cut, music: lofi · C).
// Twelve signs in zodiac order, each the most extreme version of itself while hunting for the perfect gift. Ending: lesson.
//   0.0–3.6    "Zodiacs finding the perfect gift | *be like.*"
//   3.6–49.2   ♈ grabbed the first thing they saw: a traffic cone · ♉ bought you a candle, kept it · ♊ twelve gifts, all
//              half-wrapped · ♋ a scrapbook of your whole life, volume 9 · ♌ the wrapping paper is their own face
//              · ♍ sent you a survey three months early · ♎ still choosing when the store closed · ♏ knew your wish list
//              (you never made one) · ♐ your gift is a postcard from far away · ♑ a gift card plus investing tips
//              · ♒ gave you a rock "from space" · ♓ the card is soggy
//  49.2        "Twelve gifts. | *One traffic cone.*"
//  52.4        LESSON UNLOCKED: "The best gift? | *Being thought of.*"  STATUS: GIFTED
//  58.3        "Aries wants | the *cone back.*"  the cone comes back, bow and all.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#ff8fb1', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

// ── props
const CONE = [
  '.....OO.....',
  '.....OO.....',
  '....OOOO....',
  '....WWWW....',
  '...OOOOOO...',
  '...OOOOOO...',
  '..WWWWWWWW..',
  '..OOOOOOOO..',
  '.OOOOOOOOOO.',
  '.OOOOOOOOOO.',
  'KKKKKKKKKKKK',
  'KKKKKKKKKKKK',
]
const CONE_C = { O: '#ff7a2e', W: '#ffffff', K: '#2a2350' }
const BOW = ['RR...RR', 'RRR.RRR', '.RRRRR.', 'RRR.RRR', 'RR...RR']
const CANDLE = [
  '....F....',
  '...FYF...',
  '...FYF...',
  '....K....',
  '.JJJJJJJ.',
  'JLLLLLLLJ',
  'JLLLLLLLJ',
  'JLLLLLLLJ',
  'JLLLLLLLJ',
  'JLLLLLLLJ',
  '.JJJJJJJ.',
]
const CANDLE_C = { F: ORANGE, Y: '#ffe36a', K: INK, J: '#b7a6ff', L: '#f3e9ff' }
const ROCK = ['..GGGG..', '.GGgGGG.', 'GGGGGgGG', 'GgGGGGGG', 'GGGGgGGG', '.GGGGGG.']
const ROCK_C = { G: GREY, g: '#6b7290' }
const CARD_BM = ['WWWWWWWWWW', 'WPPWWWWWWW', 'WPPWWWWWWW', 'WWWWWWWWWW', 'WKKKKKKKWW', 'WWWWWWWWWW', 'WKKKKKWWWW', 'WWWWWWWWWW']

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
function txt(x, s, px, py, size, col = INK, font = INTER, w = 800) { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(s, px, py) }
// a gift box; wrap: 0 = bare cardboard … 1 = fully wrapped with ribbon
function gift(x, cx, cy, k, { s = 1, box = PINK, ribbon = GOLD, wrap = 1, rot = 0 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k * s, k * s)
  x.fillStyle = INK; x.fillRect(-66, -56, 132, 120)
  x.fillStyle = '#c8935a'; x.fillRect(-58, -48, 116, 104)
  x.fillStyle = box; x.fillRect(-58, -48, 116 * wrap, 104)
  if (wrap > 0.98) { x.fillStyle = ribbon; x.fillRect(-10, -48, 20, 104); x.fillRect(-58, -6, 116, 16); drawBits(x, BOW, { R: ribbon }, 0, -62, 6) }
  x.restore()
}
// wrapping paper printed with tiny Leo faces
function leoWrap(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.04); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-150, -130, 316, 280)
  x.fillStyle = INK; x.fillRect(-160, -142, 320, 284)
  x.fillStyle = '#ffe7a8'; x.fillRect(-152, -134, 304, 268)
  x.save(); x.beginPath(); x.rect(-152, -134, 304, 268); x.clip()
  const n = Math.min(12, Math.floor(Math.max(0, lt - 0.25) / 0.07) + 1)
  for (let i = 0; i < n; i++) {
    const c = i % 4, r = Math.floor(i / 4)
    signChar(x, t, 'leo', -114 + c * 76 + (r % 2) * 20, -84 + r * 86, 70, { mood: i % 3 === 1 ? 'wink' : 'sparkle', seed: 50 + i, glyph: false, glow: 0.4 })
  }
  x.restore()
  x.fillStyle = RED; x.fillRect(-14, -134, 28, 268); x.fillRect(-152, -12, 304, 24)
  drawBits(x, BOW, { R: RED }, 0, -150, 9)
  x.restore()
}

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Grabbed the first thing. | *A traffic cone.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [0.5, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.25, 0.3, 2)
      drawBits(x, CONE, CONE_C, 800, 930, 22 * k)
      drawBits(x, BOW, { R: RED }, 800, 760, 10 * pop01(t, P.t0 + 1.0, 0.3, 2.4))
      L(x, 800, 640, 'SHOPPING TIME: 4 SEC', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 28)
      bubble(x, 800, 1150, 'it’s perfect.', pop01(t, P.t0 + 1.6, 0.25, 2.2), { size: 38, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Bought you a candle. | *Kept it.*', mood: lt => lt > 1.3 ? 'sleepy' : 'heart', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, CANDLE, CANDLE_C, 800, 920, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      x.save(); x.globalAlpha = 0.6
      for (let i = 0; i < 5; i++) { const ph = ((t * 0.5 + i / 5) % 1); x.fillStyle = LAV; x.fillRect(800 + Math.sin(ph * 6 + i) * 60 - 6, 760 - ph * 180, 12, 12) }
      x.restore()
      L(x, 800, 660, 'VANILLA CLOUD', pop01(t, P.t0 + 0.6, 0.3, 2.2), LAV, -0.04, 32)
      L(x, 800, 1150, 'GIFT: RETAINED', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Twelve gifts. | All *half-wrapped.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: LS,
    front(x, t, lt, P) {
      const COLS = [PINK, SKYB, MINT, GOLD, LAV, ORANGE]
      for (let i = 0; i < 6; i++) {
        const c = i % 3, r = Math.floor(i / 3)
        gift(x, 690 + c * 110, 820 + r * 150, pop01(t, P.t0 + 0.2 + i * 0.12, 0.3, 2), { s: 0.72, box: COLS[i], wrap: 0.35 + (i % 3) * 0.18, rot: (i % 2 ? 0.08 : -0.06) })
      }
      L(x, 800, 650, 'WRAPPED: 50%', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, -0.04, 32)
      bubble(x, 800, 1150, 'ooh, a new idea!', pop01(t, P.t0 + 1.8, 0.25, 2.2), { size: 34, tail: 'bl' })
    } },
  { sign: 'cancer', cap: 'A scrapbook of | *your whole life.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      for (let i = 2; i >= 0; i--) card(x, 800 + i * 18, 900 - i * 16, 270, 320, k, 0.04, i ? null : x => {
        x.fillStyle = '#8fe3ff'; x.fillRect(-100, -120, 90, 90); x.fillStyle = '#ffd0e0'; x.fillRect(10, -110, 90, 80)
        x.fillStyle = '#7dffb0'; x.fillRect(-90, -10, 80, 100); x.fillStyle = '#ffe7a8'; x.fillRect(0, 0, 100, 80)
        drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff4f86' }, 50, 120, 6)
      }, ['#5fb4ff', '#fff4e2', '#ff8fb1'][i])
      L(x, 800, 650, 'VOLUME 9 OF 9', pop01(t, P.t0 + 1.2, 0.3, 2.2), SKYB, -0.04, 32)
      if (lt > 1.4) hearts(x, t, 800, 1060, P.t0 + 1.6, { n: 5, life: 1.6, spread: 200, cell: 7, seed: 3 })
    } },
  { sign: 'leo', cap: 'The wrapping paper? | *Their own face.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [1.3],
    front(x, t, lt, P) {
      leoWrap(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      L(x, 800, 1130, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.4, 0.3, 2.2), ORANGE, 0.04, 32)
      sparkles(x, t, 800, 900, P.t0 + 1.4, 7, 200, 0.4)
    } },
  { sign: 'virgo', cap: 'Sent you a survey. | *Three months early.*', mood: 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 300, 380, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        txt(x, 'GIFT SURVEY', 0, -150, 28, INK, MONO, 700)
        const Q = ['Q1: fave colour?', 'Q2: rising sign?', 'Q3: socks or not?', 'Q4: why?']
        const n = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.2) * 4) + 1)
        for (let i = 0; i < n; i++) {
          x.fillStyle = INK; x.fillRect(-126, -100 + i * 66, 22, 22); x.fillStyle = '#fff'; x.fillRect(-122, -96 + i * 66, 14, 14)
          x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'left'; x.fillText(Q[i], -94, -88 + i * 66)
        }
        x.textAlign = 'center'
      })
      L(x, 800, 650, 'QUESTION 1 OF 47', pop01(t, P.t0 + 1.4, 0.3, 2.2), MINT, -0.05, 30)
    } },
  { sign: 'libra', cap: 'Still choosing. | The store *closed.*', mood: lt => lt > 1.6 ? 'wide' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: LS,
    front(x, t, lt, P) {
      const pick = Math.floor(lt * 2) % 2
      gift(x, 700, 940, pop01(t, P.t0 + 0.2, 0.3, 2), { s: 0.95, box: PINK, rot: -0.06 })
      gift(x, 900, 940, pop01(t, P.t0 + 0.35, 0.3, 2), { s: 0.95, box: SKYB, rot: 0.06 })
      if (lt > 0.4 && lt < 1.6) drawBits(x, ['.Y.', 'YYY', '.Y.'], { Y: GOLD }, pick ? 900 : 700, 800, 10)
      bubble(x, 800, 680, 'this one? | or this one?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 34, tail: 'bl' })
      L(x, 800, 1140, 'SORRY, WE’RE CLOSED', pop01(t, P.t0 + 1.7, 0.3, 2.2), RED, 0.04, 28, PAPER)
    } },
  { sign: 'scorpio', cap: 'Knew your wish list. | You *never made one.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 890, 290, 340, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        txt(x, 'YOUR WISH LIST', 0, -136, 26, INK, MONO, 700)
        const n = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.0) * 4) + 1)
        for (let i = 0; i < n; i++) {
          x.fillStyle = GREY; x.fillRect(-80, -84 + i * 60, 190, 14)
          x.strokeStyle = '#2fc79a'; x.lineWidth = 7; x.beginPath(); x.moveTo(-122, -80 + i * 60); x.lineTo(-110, -68 + i * 60); x.lineTo(-92, -94 + i * 60); x.stroke()
        }
      })
      bubble(x, 800, 1140, 'you’re welcome.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      L(x, 800, 650, 'ACCURACY: SPOOKY', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#c97bff', 0.04, 30, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Your gift? | A postcard *from Peru.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [-1, 0], star: RS, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      const f = ease.outCubic(prog(lt, 0.2, 0.9))
      card(x, lerp(160, 300, f), 880, 300, 210, f, -0.07, x => {
        x.fillStyle = SKYB; x.fillRect(-142, -97, 150, 194); x.fillStyle = '#5fd068'; x.fillRect(-142, 20, 150, 77)
        x.fillStyle = '#9aa5c4'; x.beginPath(); x.moveTo(-130, 20); x.lineTo(-80, -50); x.lineTo(-30, 20); x.lineTo(-10, -20); x.lineTo(8, 20); x.fill()
        x.fillStyle = GREY; for (let i = 0; i < 4; i++) x.fillRect(26, -40 + i * 30, 100, 8)
        x.fillStyle = RED; x.fillRect(96, -88, 36, 42)
      })
      L(x, 300, 660, 'WISH YOU WERE HERE', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, 0.04, 28)
      L(x, 300, 1110, 'BACK: UNCLEAR', pop01(t, P.t0 + 1.8, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: 'capricorn', cap: 'A gift card. | *Plus investing tips.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 790, 820, 270, 170, pop01(t, P.t0 + 0.2, 0.3, 2), -0.05, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-135, -85, 270, 170); txt(x, 'GIFT CARD', 0, -30, 34, PAPER); txt(x, '$25', 0, 28, 42, PAPER, MONO, 700)
      }, '#2fc79a')
      card(x, 820, 1040, 250, 170, pop01(t, P.t0 + 0.7, 0.3, 2), 0.05, x => {
        txt(x, 'GROWTH PLAN', 0, -58, 22, INK, MONO, 700)
        const p = clamp((lt - 0.8) / 0.9)
        for (let i = 0; i < 5; i++) if (p * 5 > i) { x.fillStyle = '#2fc79a'; x.fillRect(-90 + i * 38, 64 - (i + 1) * 18, 26, (i + 1) * 18) }
      })
      L(x, 800, 650, 'SPEND WISELY', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Gave you a rock. | It’s *from space.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [1.3],
    front(x, t, lt, P) {
      card(x, 800, 960, 260, 80, pop01(t, P.t0 + 0.2, 0.3, 2), 0, null, '#2a2350')
      drawBits(x, ROCK, ROCK_C, 800, 880, 22 * pop01(t, P.t0 + 0.35, 0.3, 2))
      sparkles(x, t, 800, 880, P.t0 + 0.6, 6, 130, 0.2, [SKYB, MINT, BONE])
      L(x, 800, 660, 'ORIGIN: SPACE', pop01(t, P.t0 + 0.9, 0.3, 2.2), SKYB, -0.04, 32)
      L(x, 800, 1110, '(ALLEGEDLY)', pop01(t, P.t0 + 1.7, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Wrote you a card. | It’s *soggy.*', mood: 'wide', tears: lt => lt < 0.8 ? 2 : 3, look: [1, 1], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2), wet = clamp((lt - 0.4) / 1.2)
      drawBits(x, CARD_BM, { W: PAPER, P: '#ff8fb1', K: GREY }, 800, 900, 26 * k, { rot: 0.05 })
      x.save(); x.globalAlpha = 0.55 * wet * k; x.fillStyle = SKYB
      for (const [a, b, r] of [[-60, -40, 34], [40, 30, 44], [-10, 70, 28], [80, -60, 24]]) { x.beginPath(); x.arc(800 + a, 900 + b, r * wet, 0, 7); x.fill() }
      x.restore()
      L(x, 800, 1140, 'INK: RUNNING', pop01(t, P.t0 + 1.5, 0.3, 2.2), '#b7a6ff', -0.04, 32)
      bubble(x, 800, 660, 'i love you | so much', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0571', key: 'C', accent: ACC, ending: 'lesson',
  title: 'Zodiacs finding the perfect gift | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve gifts. | *One traffic cone.*',
    moods: ['sparkle', 'heart', 'wink', 'heart', 'wink', 'squint', 'neutral', 'squint', 'sparkle', 'happy', 'wide', 'wide'],
  },
  lesson: { text: 'The best gift? | *Being thought of.*', chip: 'STATUS: GIFTED' },
  last: {
    text: 'Aries wants | the *cone back.*',
    draw(x, t, lt) {
      const t0 = t - lt
      drawBits(x, CONE, CONE_C, 540, 1540, 15 * pop01(t, t0 + 0.5, 0.4, 2))
      drawBits(x, BOW, { R: RED }, 540, 1425, 8 * pop01(t, t0 + 0.9, 0.3, 2.4))
      sparkles(x, t, 540, 1500, t0 + 0.9, 7, 160, 0.3)
    },
  },
})
export const DURATION = F.DURATION
// the hook is long: shrink the title so it fits the width and stays above the stage card's name tab
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
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
