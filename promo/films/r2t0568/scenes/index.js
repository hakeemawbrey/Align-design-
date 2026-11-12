// r2t0568: THE SIGNS AS… v3, "Crush says hi? | Zodiacs *be like.*" (topic: zodiacs when their crush says hi)
// (signs3kit social cut, music: lofi · G). Twelve signs in zodiac order, each the most extreme version of itself.
// Ending: card (lesson, then the last line over the Aries + Libra match card).
//   ♈ said hi back before they finished · ♉ froze mid-bite for an hour · ♊ said hi, then eleven more things
//   · ♋ replayed the hi all night · ♌ hair flip, slow motion · ♍ drafted a reply, four revisions
//   · ♎ picked a couple name by the second hi · ♏ played it cool, screamed in the car · ♐ waved so hard the lamp fell
//   · ♑ added it to the five-year plan · ♒ said "greetings," then left · ♓ cried, happy tears, mostly.
//   group "One hi. | *Twelve meltdowns.*"  lesson "A little hi means a lot. | *Say it back.*"
//   last "Aries + Libra: | *both said hi first.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ff8fb1', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
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
// the crush: a little star waving
function crush(x, t, cx, cy, s, k, mood = 'happy') {
  if (k <= 0.01) return null
  return signChar(x, t, 'gemini', cx, cy, s * k, { mood, look: [-1, 0], seed: 88, glyph: false, glow: 0.5 })
}
const FORK = ['G.G.G', 'G.G.G', 'GGGGG', '.GGG.', '..G..', '..G..', '..G..', '..G..', '..G..']
const TAPE = [
  'KKKKKKKKKKKKKKKK',
  'KWWWWWWWWWWWWWWK',
  'KWKKKKWWWWKKKKWK',
  'KWK..KWWWWK..KWK',
  'KWKKKKWWWWKKKKWK',
  'KWWWWWWWWWWWWWWK',
  'KKKKKKKKKKKKKKKK',
]
const TAPE_C = { K: '#2a2350', W: '#8fe3ff' }
const CAR = [
  '....BBBBBBB.....',
  '...BWWWBWWWB....',
  '..BWWWWBWWWWB...',
  'BBBBBBBBBBBBBBBB',
  'BBBBBBBBBBBBBBYB',
  'BBBBBBBBBBBBBBBB',
  '..KKK......KKK..',
  '..KKK......KKK..',
]
const CAR_C = { B: '#e23d4e', W: '#bfe9ff', Y: GOLD, K: INK }
const LAMP = ['.YYYYY.', 'YYYYYYY', 'YYYYYYY', '...K...', '...K...', '...K...', '...K...', '..KKK..', '.KKKKK.']
const LAMP_C = { Y: '#ffd23a', K: '#6b62a8' }
const UFO = ['....GGG....', '...GSSSG...', '.MMMMMMMMM.', 'MMyMMyMMyMM', '.MMMMMMMMM.']
const UFO_C = { G: '#8fe3ff', S: '#d8f6ff', M: '#9aa5c4', y: '#ffe36a' }

const LS = { x: -180 }
const CAMEOS = [
  { sign: 'aries', cap: 'Said hi back | *before they finished.*', mood: lt => lt > 0.6 ? 'sparkle' : 'wide', look: [1, 0], star: LS, hops: [0.5],
    front(x, t, lt, P) {
      crush(x, t, 830, 980, 170, pop01(t, P.t0 + 0.15, 0.35, 2), lt > 1.0 ? 'wide' : 'happy')
      bubble(x, 860, 780, 'h—', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 36, tail: 'bc', col: LAV })
      bubble(x, 580, 620, 'HI!!! HELLO!!', pop01(t, P.t0 + 0.45, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Froze mid-bite. | *For an hour.*', mood: 'wide', look: [1, 0], star: LS,
    front(x, t, lt, P, F) {
      drawBits(x, FORK, { G: '#c9c9d8' }, F.x + 120, F.cy + 30, 11 * pop01(t, P.t0 + 0.1, 0.3, 2), { rot: -0.6 })
      crush(x, t, 840, 980, 150, pop01(t, P.t0 + 0.3, 0.35, 2))
      bubble(x, 850, 810, 'hi!', pop01(t, P.t0 + 0.5, 0.25, 2.2), { size: 32, tail: 'bc', col: LAV })
      L(x, 760, 640, 'CHEWING: PAUSED', pop01(t, P.t0 + 1.2, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'gemini', cap: 'Said hi. | Then *eleven more things.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: LS, hops: [0.5, 1.0, 1.5],
    front(x, t, lt, P) {
      const W = ['hi!', 'love your shoes', 'did you see the moon', 'wait, what’s your sign', 'I have a cat now', 'okay bye!']
      W.forEach((w, i) => bubble(x, 760 + (i % 2) * 40, 600 + i * 92, w, pop01(t, P.t0 + 0.3 + i * 0.25, 0.22, 2.2), { size: 26, tail: 'bl', col: i % 2 ? LAV : BONE }))
    } },
  { sign: 'cancer', cap: 'Replayed the hi | *all night.*', mood: lt => lt > 1.2 ? 'heart' : 'sleepy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, TAPE, TAPE_C, 790, 860, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const n = 1 + Math.floor(clamp((lt - 0.4) / 1.6) * 46)
      L(x, 790, 680, `REPLAY #${n}`, pop01(t, P.t0 + 0.5, 0.3, 2.2), PINK, 0.04, 36)
      L(x, 790, 1070, '3:12 AM', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 32)
    } },
  { sign: 'leo', cap: 'Hair flip. | *Slow motion. Mid-hallway.*', mood: lt => lt > 0.9 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [0.9],
    front(x, t, lt, P, F) {
      x.save(); x.strokeStyle = 'rgba(239,230,214,0.5)'; x.lineWidth = 6
      for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(F.x - 160 - i * 20, F.cy - 80 + i * 40); x.lineTo(F.x - 230 - i * 20, F.cy - 80 + i * 40); x.stroke() }
      x.restore()
      sparkles(x, t, F.x, F.cy, P.t0 + 1.1, 8, 170, 0.2)
      L(x, 800, 680, 'SLOW-MO: ON', pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, 0.05, 36)
      crush(x, t, 840, 990, 150, pop01(t, P.t0 + 0.6, 0.35, 2), lt > 1.3 ? 'heart' : 'wide')
    } },
  { sign: 'virgo', cap: 'Drafted a reply. | *Four revisions.*', mood: lt => lt > 1.5 ? 'happy' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 790, 850, 340, 330, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = MINT; x.fillRect(-170, -165, 340, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('REPLY DRAFTS', 0, -137)
        x.textAlign = 'left'; x.font = `700 24px ${MONO}`
        ;['hello there,', 'hey!! :)', 'oh hi, didn’t see', 'hi.'].forEach((s, i) => {
          if (lt < 0.4 + i * 0.3) return
          const y = -70 + i * 60; x.fillStyle = INK; x.fillText(s, -140, y)
          if (i < 3) { x.fillStyle = RED; x.fillRect(-146, y - 3, x.measureText(s).width + 12, 6) }
        })
      })
      L(x, 790, 1100, 'FINAL: “hi.”', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, -0.04, 32)
    } },
  { sign: 'libra', cap: 'Picked a couple name | *by the second hi.*', mood: lt => lt > 1.2 ? 'heart' : 'sparkle', look: [1, 0], star: LS, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 790, 680, 'LIBRA + GEMINI', pop01(t, P.t0 + 0.3, 0.3, 2.2), LAV, -0.04, 32)
      L(x, 790, 780, '= LIBRINI', pop01(t, P.t0 + 0.9, 0.3, 2.4), PINK, 0.04, 44)
      crush(x, t, 820, 1010, 150, pop01(t, P.t0 + 0.4, 0.35, 2), 'wide')
      hearts(x, t, 660, 1040, P.t0 + 1.2, { n: 5, life: 1.6, spread: 120, cell: 7, seed: 3 })
    } },
  { sign: 'scorpio', cap: 'Played it cool. | *Screamed in the car.*', mood: lt => lt > 1.0 ? 'wide' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const shake = lt > 1.0 ? Math.sin(t * 40) * 6 : 0
      drawBits(x, CAR, CAR_C, 800 + shake, 920, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      bubble(x, 800, 690, lt > 1.0 ? 'AAAAAAAA!!' : 'oh. hey.', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: lt > 1.0 ? 44 : 32, tail: 'bc' })
      L(x, 800, 1100, 'COOL: 100%', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, -0.04, 30)
    } },
  { sign: 'sagittarius', cap: 'Waved so hard | *the lamp fell over.*', mood: lt => lt > 1.1 ? 'wide' : 'sparkle', look: [1, 0], star: LS, hops: [0.4, 0.8],
    front(x, t, lt, P) {
      const fall = ease.outBounce ? ease.outBounce(prog(lt, 0.9, 1.4)) : ease.outCubic(prog(lt, 0.9, 1.4))
      drawBits(x, LAMP, LAMP_C, 820 + fall * 40, 920 + fall * 70, 20 * pop01(t, P.t0 + 0.2, 0.35, 2), { rot: fall * 1.4 })
      L(x, 760, 650, 'HIIII!!', pop01(t, P.t0 + 0.4, 0.3, 2.2), ORANGE, -0.05, 44)
      L(x, 800, 1130, 'LAMP: FINE. MOSTLY.', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 28)
    } },
  { sign: 'capricorn', cap: 'Added it to | the *five-year plan.*', mood: 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 790, 850, 350, 330, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => {
        x.fillStyle = '#9aa5c4'; x.fillRect(-175, -165, 350, 56); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText('THE PLAN', 0, -137)
        x.textAlign = 'left'; x.font = `700 24px ${MONO}`
        ;['2026: promotion', '2027: house', '2028: say hi back', '2031: wedding?'].forEach((s, i) => { if (lt > 0.4 + i * 0.3) { x.fillStyle = i >= 2 ? '#c4307a' : INK; x.fillText(s, -150, -70 + i * 60) } })
      })
      L(x, 790, 1100, 'ON SCHEDULE', pop01(t, P.t0 + 1.7, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Said “greetings.” | *Then left.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      bubble(x, 760, 650, 'greetings.', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl' })
      const up = ease.inCubic(prog(lt, 1.2, 2.2))
      drawBits(x, UFO, UFO_C, 830 - up * 60, 900 - up * 280, 18 * pop01(t, P.t0 + 0.6, 0.35, 2))
      x.save(); x.globalAlpha = 0.25 * (1 - up); x.fillStyle = '#ffe36a'; x.beginPath(); x.moveTo(790, 940); x.lineTo(870, 940); x.lineTo(910, 1120); x.lineTo(750, 1120); x.fill(); x.restore()
      L(x, 830, 1120, 'NAILED IT', pop01(t, P.t0 + 1.6, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried. | *Happy tears. Mostly.*', mood: 'heart', tears: 3, look: [1, 0], star: LS,
    front(x, t, lt, P) {
      crush(x, t, 830, 980, 160, pop01(t, P.t0 + 0.2, 0.35, 2), 'wide')
      bubble(x, 830, 800, 'hi…?', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, tail: 'bc', col: LAV })
      L(x, 760, 640, 'TEARS: JOYFUL', pop01(t, P.t0 + 1.3, 0.3, 2.4), SKYB, -0.04, 30)
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
  id: 'r2t0568', key: 'G', accent: ACC, ending: 'card',
  title: 'Crush says hi? | Zodiacs *be like.*',
  cameos: CAMEOS,
  card: { a: 'aries', b: 'libra', chip: 'IT’S A MATCH' },
  group: { cap: 'One hi. | *Twelve meltdowns.*', moods: ['sparkle', 'wide', 'wide', 'heart', 'wink', 'squint', 'heart', 'wide', 'sparkle', 'neutral', 'happy', 'heart'] },
  lesson: { text: 'A little hi means a lot. | *Say it back.*', chip: 'CRUSH: CRUSHING' },
  last: { text: 'Aries + Libra: | *both said hi first.*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
