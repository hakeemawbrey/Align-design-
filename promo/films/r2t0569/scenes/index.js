// r2t0569: THE SIGNS AS… v3, "Exam tomorrow? | Zodiacs *be like.*" (topic: zodiacs before an exam)
// (signs3kit social cut, music: lofi · D). Twelve signs in zodiac order, each the most extreme version of itself. Ending: lesson.
//   ♈ finished in four minutes, wrong test · ♉ brought snacks, studied the snacks · ♊ studied two subjects at once,
//   neither · ♋ made everyone a care package · ♌ asked if there's a talent portion · ♍ twelve highlighters
//   · ♎ studied in a café for the aesthetic · ♏ checked the teacher's sign, planned accordingly · ♐ exam at 9,
//   flight at 10 · ♑ been studying since last semester · ♒ invented a new formula mid-exam · ♓ cried, then aced it.
//   group "Twelve signs. | *One pencil.*"  lesson "You studied. You tried. | *That's enough.*"  last "Good luck! | *Even you, Aries.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#ffd23a', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
const L = (x, cx, cy, text, k, bg = GOLD, rot = -0.04, size = 32, color = INK) => label(x, cx, cy, text, k, { size, bg, rot, font: MONO, weight: 700, color })
const SYM = "'Segoe UI Symbol', 'Noto Sans Symbols', serif"

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
// a test paper with a title and n filled lines
function paper(x, cx, cy, k, rot, head, n, extra) {
  card(x, cx, cy, 320, 380, k, rot, x => {
    x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.fillText(head, 0, -150)
    x.fillRect(-130, -125, 260, 3)
    for (let i = 0; i < 6; i++) { x.fillStyle = i < n ? '#6b62a8' : 'rgba(27,18,54,0.18)'; x.fillRect(-130, -90 + i * 44, 200 - (i % 3) * 40, 10) }
    if (extra) extra(x)
  })
}
const CHIPS = ['.YYYYYY.', 'YYRRRRYY', 'YRYYYYRY', 'YRYRRYRY', 'YRYYYYRY', 'YYRRRRYY', '.YYYYYY.']
const BOOK = ['BBBBBBBB', 'BWWWWWWB', 'BWBBBBWB', 'BWWWWWWB', 'BWBBBBWB', 'BWWWWWWB', 'BBBBBBBB']
const BOX = ['RRRRRRRRRR', 'RRRRYYRRRR', 'BBBBYYBBBB', 'BBBBYYBBBB', 'BBBBYYBBBB', 'BBBBYYBBBB', 'BBBBBBBBBB']
const BOX_C = { R: '#ff8fb1', Y: GOLD, B: '#8fe3ff' }
const PEN = ['CC', 'BB', 'BB', 'BB', 'BB', 'BB', 'BB', 'KK']
const CUP = ['.LLLLLLL..', 'LLLLLLLLL.', '.CCCCCCC..', '.CWWWWWCHH', '.CWWWWWC.H', '.CCCCCCCHH', '.CCCCCCC..', '..CCCCC...']
const CUP_C = { L: '#6b62a8', C: '#e0a56a', W: PAPER, H: '#e0a56a' }
const SUIT = ['...KKKK...', '...K..K...', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', 'RRRRRRRRRR', 'RYRRRRRRYR', 'RRRRRRRRRR', '.K......K.']
const SUIT_C = { K: INK, R: '#c97bff', Y: GOLD }

const LS = { x: -180 }
const CAMEOS = [
  { sign: 'aries', cap: 'Finished in four minutes. | *Wrong test.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: LS, hops: [0.5],
    front(x, t, lt, P) {
      paper(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, 'CHEMISTRY', 6)
      L(x, 620, 640, 'DONE! 4:02', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.05, 34)
      L(x, 790, 1080, 'EXAM TODAY: HISTORY', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 28, PAPER)
    } },
  { sign: 'taurus', cap: 'Brought snacks. | *Studied the snacks.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, CHIPS, { Y: '#ffd23a', R: '#e0a56a' }, 700 + i * 90, 900 - (i % 2) * 40, 12 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 790, 700, 'CHAPTER 1: CHIPS', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 30)
      L(x, 790, 1080, 'NOTES: UNOPENED', pop01(t, P.t0 + 1.5, 0.3, 2.4), LAV, 0.04, 30)
    } },
  { sign: 'gemini', cap: 'Studied two subjects at once. | *Learned neither.*', mood: lt => lt > 1.4 ? 'wide' : 'sparkle', look: [1, 0], star: LS, hops: [0.6, 1.2],
    front(x, t, lt, P) {
      drawBits(x, BOOK, { B: '#ff8fb1', W: PAPER }, 700, 860 + Math.sin(t * 5) * 14, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: -0.15 })
      drawBits(x, BOOK, { B: '#8fe3ff', W: PAPER }, 890, 860 - Math.sin(t * 5) * 14, 18 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.15 })
      L(x, 700, 700, 'MATH', pop01(t, P.t0 + 0.4, 0.3, 2.2), PINK, -0.05, 30); L(x, 890, 700, 'FRENCH', pop01(t, P.t0 + 0.6, 0.3, 2.2), SKYB, 0.05, 30)
      bubble(x, 790, 1060, 'bonjour = 7?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 34, tail: 'bc' })
    } },
  { sign: 'cancer', cap: 'Made everyone | *a care package.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      for (let i = 0; i < 3; i++) drawBits(x, BOX, BOX_C, 680 + i * 110, 920 - i * 30, 11 * pop01(t, P.t0 + 0.2 + i * 0.25, 0.3, 2))
      L(x, 790, 700, 'TEA, SOCKS, GOOD LUCK NOTE', pop01(t, P.t0 + 1.0, 0.3, 2.4), PINK, -0.04, 24)
      hearts(x, t, 620, 1010, P.t0 + 1.2, { n: 4, life: 1.4, spread: 100, cell: 6, seed: 4 })
      L(x, 790, 1090, 'OWN STUDYING: 0', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 30)
    } },
  { sign: 'leo', cap: 'Asked if there’s | a *talent portion.*', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [1.1],
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'is there a | talent part?', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 38, tail: 'bl' })
      signChar(x, t, 'virgo', 850, 990, 150 * pop01(t, P.t0 + 0.6, 0.35, 2), { mood: 'squint', look: [-1, 0], seed: 12, glyph: false, glow: 0.4 })
      L(x, 850, 1130, 'TEACHER: NO.', pop01(t, P.t0 + 1.4, 0.3, 2.4), RED, 0.04, 30, PAPER)
      sparkles(x, t, 400, 820, P.t0 + 1.0, 6, 150, 0.4)
    } },
  { sign: 'virgo', cap: 'Color-coded the notes. | *Twelve highlighters.*', mood: lt => lt > 1.5 ? 'sparkle' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const COLS = ['#ff6b5a', '#ffb34a', '#ffd23a', '#7dffb0', '#5fd068', '#8fe3ff', '#6fc3ff', '#c9a6ff', '#c97bff', '#ff8fb1', '#ff4f86', '#9aa5c4']
      const n = Math.floor(clamp((lt - 0.2) / 1.2) * 12)
      for (let i = 0; i < n; i++) drawBits(x, PEN, { C: COLS[i], B: COLS[i], K: INK }, 610 + i * 32, 870 + (i % 2) * 14, 10)
      L(x, 790, 690, `${n}/12 COLOURS`, pop01(t, P.t0 + 0.3, 0.3, 2.2), MINT, -0.04, 32)
      L(x, 790, 1080, 'STUDIED: THE LEGEND', pop01(t, P.t0 + 1.6, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'libra', cap: 'Studied in a café. | *For the aesthetic.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, CUP, CUP_C, 720, 900, 16 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, BOOK, { B: '#ff8fb1', W: PAPER }, 880, 920, 14 * pop01(t, P.t0 + 0.4, 0.3, 2), { rot: 0.1 })
      L(x, 790, 690, 'PAGES READ: 0', pop01(t, P.t0 + 0.9, 0.3, 2.2), LAV, -0.04, 30)
      L(x, 790, 1080, 'PHOTOS TAKEN: 31', pop01(t, P.t0 + 1.5, 0.3, 2.4), PINK, 0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Checked the teacher’s sign. | *Planned accordingly.*', mood: 'squint', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 790, 840, 300, 320, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.fillStyle = '#2a2350'; x.fillRect(-150, -160, 300, 320)
        x.fillStyle = '#7dffb0'; x.font = `700 120px ${SYM}`; x.fillText('♑︎', 0, -40)
        x.fillStyle = BONE; x.font = `700 24px ${MONO}`; x.fillText('TEACHER:', 0, 60); x.fillText('CAPRICORN', 0, 96)
      })
      L(x, 790, 1080, 'STRATEGY: ARRIVE EARLY', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, -0.04, 26)
    } },
  { sign: 'sagittarius', cap: 'Exam at nine. | *Flight at ten.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS, hops: [0.6, 1.3],
    front(x, t, lt, P) {
      drawBits(x, SUIT, SUIT_C, 790, 880, 20 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 680, '9:00 EXAM', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.05, 32)
      L(x, 790, 1100, '10:00 GATE 12', pop01(t, P.t0 + 1.2, 0.3, 2.4), LAV, 0.05, 32)
    } },
  { sign: 'capricorn', cap: 'Been studying | *since last semester.*', mood: 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const d = 100 + Math.floor(clamp((lt - 0.3) / 1.5) * 43)
      card(x, 790, 860, 300, 300, pop01(t, P.t0 + 0.2, 0.35, 2), -0.04, x => {
        x.fillStyle = '#5fd068'; x.fillRect(-150, -150, 300, 70); x.fillStyle = INK; x.font = `700 28px ${MONO}`; x.fillText('STUDY LOG', 0, -114)
        x.font = `800 66px ${INTER}`; x.fillText(`DAY ${d}`, 0, 30)
      })
      L(x, 790, 1090, 'READY SINCE MAY', pop01(t, P.t0 + 1.5, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Invented a new formula. | *Mid-exam.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 790, 850, 380, 260, pop01(t, P.t0 + 0.2, 0.35, 2), 0.03, x => {
        x.fillStyle = '#1d3a2a'; x.fillRect(-190, -130, 380, 260)
        const w = clamp((lt - 0.5) / 0.8)
        x.save(); x.beginPath(); x.rect(-180, -120, 360 * w, 240); x.clip()
        x.fillStyle = PAPER; x.font = `700 56px ${INTER}`; x.fillText('E = ', -60, 0); x.font = `700 60px ${SYM}`; x.fillText('♒︎', 50, 0); x.font = `700 44px ${INTER}`; x.fillText('c²', 120, -10)
        x.restore()
      })
      L(x, 790, 1060, 'TEACHER: INTRIGUED', pop01(t, P.t0 + 1.5, 0.3, 2.4), SKYB, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Cried all night. | *Then aced it.*', mood: lt => lt > 1.5 ? 'heart' : 'squint', tears: 3, look: [1, 0], star: LS,
    front(x, t, lt, P) {
      paper(x, 790, 850, pop01(t, P.t0 + 0.2, 0.35, 2), -0.05, 'FINAL EXAM', 6, x => {
        if (lt > 1.3) { x.fillStyle = RED; x.font = `800 90px ${INTER}`; x.fillText('A+', 80, 110) }
      })
      sparkles(x, t, 870, 960, P.t0 + 1.3 * 1.29, 7, 120, 0.4)
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
  id: 'r2t0569', key: 'D', accent: ACC, ending: 'lesson',
  title: 'Exam tomorrow? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *One pencil.*', moods: ['sparkle', 'heart', 'wide', 'heart', 'wink', 'squint', 'sparkle', 'squint', 'sparkle', 'neutral', 'happy', 'heart'] },
  lesson: { text: 'You studied. You tried. | *That’s enough.*', chip: 'STRESS: LOWER' },
  last: { text: 'Good luck! | *Even you, Aries.*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
