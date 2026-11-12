// r2t0573: THE SIGNS AS… v3, "Zodiacs when someone answers with a question | *be like.*" (~57 s vertical, signs3kit social cut, music: lofi · G).
// Twelve signs in zodiac order, each the most extreme version of itself when a question gets answered with a question. Ending: callback.
//   0.0–3.6    "Zodiacs when someone answers with a question | *be like.*"
//   3.6–49.2   ♈ asked again, but louder · ♉ ordered food, just for themself · ♊ answered with three more questions
//              · ♋ "are you mad?" twelve times · ♌ made it about Leo, somehow · ♍ rephrased it as a numbered list
//              · ♎ "you?" "no, you?" it's a loop · ♏ already knew, it was a test · ♐ left mid-question
//              · ♑ scheduled a meeting to discuss it · ♒ answered with a deeper question · ♓ thought it was poetry, cried
//  49.2        "Twelve questions. | *Zero answers.*"
//  52.6        CALLBACK: "Cancer checked | *one more time.*"  the "are you mad?" bubble comes back, count 13.
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#8fe3ff', RED = '#e23d4e', ORANGE = '#ffb34a', BROWN = '#8a4a2e', GREY = '#9aa5c4'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })

const QM = ['.QQQ.', 'Q...Q', '...Q.', '..Q..', '..Q..', '.....', '..Q..']
const MEGA = ['.......KK', '.....KKYK', '...KKYYYK', 'KKKYYYYYK', 'KYYYYYYYK', 'KKKYYYYYK', '...KKYYYK', '.....KKYK', '.......KK']
const BAG = ['..K....K..', '..K....K..', 'BBBBBBBBBB', 'BBBBBBBBBB', 'BBBWWWWBBB', 'BBBWWWWBBB', 'BBBBBBBBBB', 'BBBBBBBBBB']
const DUST = ['..WW.WW..', '.WWWWWWW.', 'WWWWWWWWW', '.WWWWWWW.']

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
function txt(x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Asked again, | *but louder.*', mood: lt => lt > 0.9 ? 'wide' : 'neutral', look: [1, 0], star: LS, hops: [0.9, 1.4],
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'why do you ask?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      drawBits(x, MEGA, { K: INK, Y: RED }, 640, 920, 16 * pop01(t, P.t0 + 0.8, 0.3, 2.2), { sx: -1 })
      bubble(x, 830, 920, 'WHAT. TIME. | IS IT.', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 44, col: '#ffd0c0', tail: 'bl' })
      L(x, 800, 1140, 'PATIENCE: 0 SEC', pop01(t, P.t0 + 1.7, 0.3, 2.2), ORANGE, 0.04, 30)
    } },
  { sign: 'taurus', cap: 'Ordered food. | *Just for themself.*', mood: lt => lt > 1.3 ? 'heart' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'what do YOU | want to eat?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      const d = ease.outCubic(prog(lt, 0.8, 1.2))
      if (lt > 0.8) drawBits(x, BAG, { K: BROWN, B: '#c8935a', W: PAPER }, 800, lerp(760, 950, d), 18)
      L(x, 800, 1140, 'DECIDED: ALONE', pop01(t, P.t0 + 1.6, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'gemini', cap: 'Answered with | *three more questions.*', mood: lt => Math.floor(lt * 2.6) % 2 ? 'wink' : 'sparkle', look: lt => [Math.floor(lt * 2.6) % 2 ? 1 : -1, 0], star: LS,
    front(x, t, lt, P) {
      const n = 1 + Math.min(8, Math.floor(Math.max(0, lt - 0.3) / 0.18))
      for (let i = 0; i < n; i++) { const c = i % 3, r = Math.floor(i / 3); drawBits(x, QM, { Q: [GOLD, SKYB, PINK, MINT, LAV][i % 5] }, 700 + c * 100, 760 + r * 140 + Math.sin(t * 3 + i) * 6, 11, { rot: (i % 2 ? 0.14 : -0.1) }) }
      L(x, 800, 1150, `QUESTIONS: ${n}`, pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.04, 32)
    } },
  { sign: 'cancer', cap: '“Are you mad?” | *Twelve times.*', mood: lt => lt > 1.4 ? 'wide' : 'neutral', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const n = 1 + Math.min(11, Math.floor(Math.max(0, lt - 0.3) / 0.13))
      for (let i = 0; i < Math.min(n, 4); i++) bubble(x, 790 + (i % 2) * 30, 650 + i * 110, 'are you mad?', 1, { size: 32, col: SKYB, tail: 'bl' })
      L(x, 800, 1150, `ASKED: ${n}×`, pop01(t, P.t0 + 0.3, 0.3, 2.2), PINK, 0.04, 34)
    } },
  { sign: 'leo', cap: 'Made it about Leo. | *Somehow.*', mood: lt => lt > 1.0 ? 'sparkle' : 'happy', look: [1, 0], star: LS, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'why do you ask?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, col: LAV, tail: 'br' })
      bubble(x, 790, 900, 'great question. | speaking of me…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, tail: 'bl' })
      sparkles(x, t, 790, 900, P.t0 + 1.1, 7, 200, 0.3)
      L(x, 800, 1130, 'TOPIC: LEO (AGAIN)', pop01(t, P.t0 + 1.8, 0.3, 2.2), ORANGE, 0.04, 28)
    } },
  { sign: 'virgo', cap: 'Rephrased it | *as a numbered list.*', mood: 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 900, 300, 360, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        txt(x, 'MY QUESTION:', 0, -140, 26, INK, MONO, 700)
        const Q = ['1. dinner?', '2. when?', '3. where?', '4. yes or no.']
        const n = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.2) * 4) + 1)
        for (let i = 0; i < n; i++) txt(x, Q[i], -120, -80 + i * 60, 30, i === 3 ? RED : INK, INTER, 800, 'left')
      })
      L(x, 800, 660, 'ANSWER IN ORDER', pop01(t, P.t0 + 1.5, 0.3, 2.2), MINT, -0.05, 30)
    } },
  { sign: 'libra', cap: '“You?” “No, you?” | *It’s a loop.*', mood: lt => Math.floor(lt * 2) % 2 ? 'happy' : 'neutral', look: lt => [Math.floor(lt * 2) % 2 ? 1 : -1, 0], star: LS,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'taurus', 830, 1010, 170 * k, { mood: 'neutral', look: [-1, 0], seed: 15, glyph: false })
      const side = Math.floor(lt * 2) % 2
      bubble(x, side ? 820 : 620, 690, side ? 'no, you pick?' : 'you pick?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, col: side ? BONE : PINK, tail: side ? 'bc' : 'bl' })
      L(x, 800, 1160, 'FIRST DATE: HOUR 3', pop01(t, P.t0 + 1.6, 0.3, 2.2), PINK, 0.04, 28)
    } },
  { sign: 'scorpio', cap: 'Already knew. | *It was a test.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 880, 260, 300, pop01(t, P.t0 + 0.2, 0.3, 2), -0.04, x => {
        txt(x, 'TEST', 0, -110, 34, INK, MONO, 700)
        x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-90, -50 + i * 50, 180, 14)
        if (lt > 1.0) { x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.stroke(); txt(x, '?', 0, 110, 44, RED, INTER, 800) }
      })
      bubble(x, 800, 1140, 'interesting.', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      L(x, 800, 660, 'GRADING YOU', pop01(t, P.t0 + 0.8, 0.3, 2.2), '#c97bff', 0.04, 30, PAPER)
    } },
  { sign: 'sagittarius', cap: 'Left the chat. | *Mid-question.*', mood: 'sparkle', look: [1, 0], star: LS, hideStar: true,
    front(x, t, lt, P) {
      const f = ease.inCubic(prog(lt, 0.5, 1.1))
      if (f < 0.99) signChar(x, t, 'sagittarius', lerp(380, 900, f), 960, 300, { mood: f > 0 ? 'sparkle' : 'happy', look: [1, 0], seed: 9, hops: [P.t0 + 0.2], alpha: 1 - f, pop: 1 - 0.5 * f })
      bubble(x, 520, 680, 'why do you—', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
      if (lt > 1.0) drawBits(x, DUST, { W: '#d8dbe8' }, 600, 1060, 16, { alpha: 1 - prog(lt, 1.6, 2.4) })
      L(x, 540, 1150, 'GONE. VERY GONE.', pop01(t, P.t0 + 1.5, 0.3, 2.2), GOLD, -0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Scheduled a meeting | *to discuss it.*', mood: lt => lt > 1.4 ? 'happy' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 880, 310, 260, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = '#2fc79a'; x.fillRect(-155, -130, 310, 54); txt(x, 'INVITE', 0, -102, 28, PAPER, MONO, 700)
        txt(x, 'RE: your question', 0, -36, 28, INK); txt(x, 'Tue 9:00 · 60 min', 0, 14, 26, '#4a4470', MONO, 700)
        if (lt > 1.0) { x.fillStyle = '#2fc79a'; x.fillRect(-90, 60, 180, 48); txt(x, 'ACCEPT', 0, 84, 28, PAPER, MONO, 700) }
      })
      L(x, 800, 1110, 'AGENDA ATTACHED', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Answered with | *a deeper question.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, -1], star: LS,
    front(x, t, lt, P) {
      bubble(x, 800, 660, 'what’s for dinner?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 32, col: PINK, tail: 'br' })
      bubble(x, 790, 900, 'but what IS | dinner, really?', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1130, 'PHILOSOPHY HOUR', pop01(t, P.t0 + 1.8, 0.3, 2.2), BONE, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Thought it was poetry. | *Cried.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 800, 680, 'why do you ask?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      bubble(x, 800, 920, 'that’s so | deep…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 40, col: SKYB, tail: 'bl' })
      L(x, 800, 1130, 'SAVED AS A QUOTE', pop01(t, P.t0 + 1.8, 0.3, 2.2), '#b7a6ff', -0.04, 30)
    } },
]

const F = makeFilm({
  id: 'r2t0573', key: 'G', accent: ACC, ending: 'callback',
  title: 'Zodiacs when someone | answers with a question | *be like.*',
  cameos: CAMEOS,
  group: {
    cap: 'Twelve questions. | *Zero answers.*',
    moods: ['wide', 'heart', 'wink', 'neutral', 'sparkle', 'squint', 'neutral', 'squint', 'sparkle', 'happy', 'wide', 'wide'],
  },
  last: {
    text: 'Cancer checked | *one more time.*',
    draw(x, t, lt) {
      const t0 = t - lt, k = pop01(t, t0 + 0.3, 0.45, 1.8)
      if (k <= 0.01) return
      signChar(x, t, 'cancer', 540, 1200, 360 * k, { mood: lt > 1.6 ? 'heart' : 'neutral', look: [0, -1], seed: 33, hops: [t0 + 1.6] })
      bubble(x, 560, 900, 'are you mad?', pop01(t, t0 + 0.9, 0.25, 2.2), { size: 60, col: SKYB, tail: 'bl' })
      L(x, 540, 1460, 'ASKED: 13×', pop01(t, t0 + 1.4, 0.3, 2.4), PINK, -0.04, 44)
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
