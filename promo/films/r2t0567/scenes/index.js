// r2t0567: THE SIGNS AS… v3, "Forgot a name? | Zodiacs *be like.*" (topic: zodiacs forgetting someone's name) (signs3kit social cut, music: lofi · E).
// Twelve signs in zodiac order, each the most extreme version of itself when a name slips. Ending: lesson.
//   ♈ called them "champ" for six years · ♉ remembers their order, not their name · ♊ introduced them three ways
//   · ♋ forgot the name, remembers their dog's birthday · ♌ forgot their name, signed their own autograph
//   · ♍ made a spreadsheet, name column blank · ♎ calls everyone "gorgeous" · ♏ pretended to know, zero suspicion
//   · ♐ asked their sign first, name later · ♑ calls them by their job title · ♒ forgot the name, knows their moon sign
//   · ♓ forgot their name, cried about it twice.
//   group "Twelve signs. | *Zero names.*"  lesson "Forgot a name? Just ask. | *They'll smile.*"  last "Hi, um… | *you!*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const ACC = '#8fe3ff', PAPER = '#fff4e2', RED = '#e23d4e', ORANGE = '#ffb34a'
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
// a plain grey "someone" star (the person whose name nobody remembers)
function someone(x, t, cx, cy, s, k, mood = 'happy', look) {
  if (k <= 0.01) return null
  return signChar(x, t, 'capricorn', cx, cy, s * k, { mood, look, seed: 77, glyph: false, glow: 0.4 })
}
const SANDWICH = ['..BBBBBBBB..', '.BBBBBBBBBB.', 'GGGGGGGGGGGG', 'CCCCCCCCCCCC', 'RRRRRRRRRRRR', '.BBBBBBBBBB.']
const SANDWICH_C = { B: '#e0a56a', G: '#5fd068', C: '#ffd23a', R: '#e23d4e' }
const DOG = ['K.........K.', 'KK.......KK.', 'KKKKKKKKKK..', 'KWKKKKWKK...', 'KKKNKKKKK...', '.KKKKKKKKKKK', '..KKKKKKKKKK', '..K.K...K.K.']
const DOG_C = { K: '#c98f5a', W: INK, N: INK }
const SHADES = ['KKKKK.KKKKK', 'KSSSKKKSSSK', 'KSSSK.KSSSK', '.KKK...KKK.']
const SHADES_C = { K: INK, S: '#6b62a8' }
const TIE = ['.RRR.', '..R..', '.RRR.', 'RRRRR', '.RRR.', '..R..']
const WHEEL = ['#ff6b5a', '#5fd068', '#ffd23a', '#8fe3ff', '#ffb34a', '#7dffb0', '#ff8fb1', '#c97bff', '#ff9a4a', '#9aa5c4', '#6fc3ff', '#b7a6ff']
function chart(x, cx, cy, r, k, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k); x.rotate(t * 0.3)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { x.fillStyle = WHEEL[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, r, (i / 12) * Math.PI * 2, ((i + 1) / 12) * Math.PI * 2); x.closePath(); x.fill() }
  x.fillStyle = '#140c30'; x.beginPath(); x.arc(0, 0, r * 0.6, 0, Math.PI * 2); x.fill()
  x.rotate(-t * 0.3); drawBits(x, ['..MMM.', '.MM...', 'MM....', 'MM....', '.MM...', '..MMM.'], { M: GOLD }, 0, 0, 10)
  x.restore()
}

const LS = { x: -180 }
const CAMEOS = [
  { sign: 'aries', cap: 'Called them “champ.” | *For six years.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS, hops: [1.2],
    front(x, t, lt, P) {
      someone(x, t, 820, 940, 190, pop01(t, P.t0 + 0.2, 0.35, 2), 'happy', [-1, 0])
      bubble(x, 600, 640, 'HEY, CHAMP!', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 40, tail: 'bl' })
      L(x, 820, 1120, 'NAME: ???  YEARS: 6', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 28)
    } },
  { sign: 'taurus', cap: 'Remembers their order. | *Not their name.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, SANDWICH, SANDWICH_C, 790, 860, 24 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 680, 'EXTRA PICKLES, NO ONION', pop01(t, P.t0 + 0.6, 0.3, 2.2), MINT, -0.04, 24)
      L(x, 790, 1070, 'NAME: SANDWICH PERSON', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 26)
    } },
  { sign: 'gemini', cap: 'Introduced them | *three different ways.*', mood: lt => lt > 1.5 ? 'wide' : 'sparkle', look: [1, 0], star: LS, hops: [0.6, 1.1],
    front(x, t, lt, P) {
      someone(x, t, 820, 980, 170, pop01(t, P.t0 + 0.2, 0.35, 2), lt > 1.5 ? 'squint' : 'happy', [-1, 0])
      bubble(x, 660, 600, 'this is Sam', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 30, tail: 'bl' })
      bubble(x, 860, 690, 'I mean Tim', pop01(t, P.t0 + 0.9, 0.25, 2.2), { size: 30, tail: 'bl', col: LAV })
      bubble(x, 700, 780, 'Jo? Joey?', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 30, tail: 'bl', col: '#ffe7a8' })
    } },
  { sign: 'cancer', cap: 'Forgot the name. | Knows *their dog’s birthday.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, DOG, DOG_C, 790, 900, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      L(x, 790, 680, 'BISCUIT: MAY 3RD', pop01(t, P.t0 + 0.7, 0.3, 2.2), PINK, -0.04, 30)
      L(x, 790, 1100, 'OWNER: NO IDEA', pop01(t, P.t0 + 1.4, 0.3, 2.4), BONE, 0.04, 30)
      hearts(x, t, 640, 900, P.t0 + 1.0, { n: 4, life: 1.4, spread: 120, cell: 6, seed: 2 })
    } },
  { sign: 'leo', cap: 'Forgot their name. | Signed *their own* autograph.', mood: lt => lt > 1.1 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [1.2],
    front(x, t, lt, P) {
      card(x, 790, 860, 330, 240, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.fillStyle = '#6b62a8'; x.font = `700 24px ${MONO}`; x.fillText('TO: ________', 0, -60)
        const w = clamp((lt - 0.5) / 0.9)
        x.save(); x.beginPath(); x.rect(-150, -20, 300 * w, 110); x.clip()
        x.fillStyle = INK; x.font = `italic 600 64px Georgia, serif`; x.fillText('Love, Leo', 0, 30); x.restore()
      })
      sparkles(x, t, 790, 860, P.t0 + 1.4, 7, 190, 0.3)
      L(x, 790, 1080, 'YOU’RE WELCOME', pop01(t, P.t0 + 1.5, 0.3, 2.4), GOLD, -0.04, 30)
    } },
  { sign: 'virgo', cap: 'Made a spreadsheet. | Name column: *blank.*', mood: lt => lt > 1.4 ? 'wide' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 790, 860, 360, 330, pop01(t, P.t0 + 0.2, 0.35, 2), 0.04, x => {
        x.fillStyle = MINT; x.fillRect(-180, -165, 360, 56)
        x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.fillText('NAME', -110, -137); x.fillText('FACTS', 70, -137)
        x.fillRect(-40, -165, 4, 330)
        for (let r = 0; r < 4; r++) { x.fillRect(-180, -105 + r * 66, 360, 3) }
        x.font = `700 20px ${MONO}`; x.fillStyle = INK
        ;['likes jazz', 'two cats', 'oat milk', 'b. june'].forEach((s, r) => { if (lt > 0.5 + r * 0.2) x.fillText(s, 70, -72 + r * 66) })
        x.fillStyle = RED; x.font = `800 40px ${INTER}`; if (lt > 1.4) x.fillText('?', -110, -72)
      })
    } },
  { sign: 'libra', cap: 'Calls everyone | *“gorgeous.”* Safe forever.', mood: lt => lt > 1.0 ? 'wink' : 'sparkle', look: [1, 0], star: LS, hops: [1.0],
    front(x, t, lt, P) {
      bubble(x, 790, 640, 'hi gorgeous!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 40, tail: 'bl', col: '#ffd0e0' })
      const k = pop01(t, P.t0 + 0.6, 0.35, 2)
      someone(x, t, 700, 960, 150, k, 'heart', [-1, 0]); if (k > 0.01) signChar(x, t, 'taurus', 880, 960, 150 * k, { mood: 'heart', look: [-1, 0], seed: 33, glyph: false, glow: 0.4 })
      L(x, 790, 1120, 'NAMES NEEDED: 0', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, -0.04, 30)
    } },
  { sign: 'scorpio', cap: 'Pretended to know. | *Nobody suspects a thing.*', mood: 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P, F) {
      drawBits(x, SHADES, SHADES_C, F.x, F.cy - 4, 12 * pop01(t, P.t0 + 0.3, 0.3, 2))
      bubble(x, 790, 660, 'good to see you… | you.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      someone(x, t, 840, 1000, 150, pop01(t, P.t0 + 0.4, 0.35, 2), lt > 1.2 ? 'heart' : 'happy', [-1, 0])
      L(x, 760, 830, 'CONFIDENCE: 100', pop01(t, P.t0 + 1.4, 0.3, 2.4), LAV, 0.04, 26)
    } },
  { sign: 'sagittarius', cap: 'Asked their sign first. | *Name? Later.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS, hops: [0.5, 1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      bubble(x, 760, 640, 'what’s your sign?!', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 34, tail: 'bl' })
      someone(x, t, 830, 960, 170, pop01(t, P.t0 + 0.5, 0.35, 2), 'wide', [-1, 0])
      L(x, 830, 1120, 'NAME: TBD', pop01(t, P.t0 + 1.4, 0.3, 2.4), GOLD, 0.04, 32)
    } },
  { sign: 'capricorn', cap: 'Calls them by | their *job title.*', mood: 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const F2 = someone(x, t, 830, 960, 180, pop01(t, P.t0 + 0.2, 0.35, 2), 'happy', [-1, 0])
      if (F2) drawBits(x, TIE, { R: RED }, 830, F2.cy + 70, 9)
      bubble(x, 720, 650, 'morning, Accounting.', pop01(t, P.t0 + 0.6, 0.25, 2.2), { size: 32, tail: 'bl' })
      L(x, 830, 1120, 'WORKS FINE', pop01(t, P.t0 + 1.4, 0.3, 2.4), MINT, 0.04, 30)
    } },
  { sign: 'aquarius', cap: 'Forgot the name. | Knows *their moon sign.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      chart(x, 790, 850, 150, pop01(t, P.t0 + 0.2, 0.35, 2), t)
      L(x, 790, 1080, 'MOON IN PISCES. NAME: ?', pop01(t, P.t0 + 1.3, 0.3, 2.4), LAV, -0.04, 26)
    } },
  { sign: 'pisces', cap: 'Forgot their name. | *Cried about it. Twice.*', mood: 'squint', tears: 3, look: [1, 0], star: LS,
    front(x, t, lt, P) {
      card(x, 800, 820, 260, 160, pop01(t, P.t0 + 0.3, 0.35, 2), -0.05, x => {
        x.fillStyle = '#e23d4e'; x.fillRect(-130, -80, 260, 50)
        x.fillStyle = PAPER; x.font = `800 26px ${INTER}`; x.fillText('HELLO my name is', 0, -54)
        x.fillStyle = INK; x.font = `800 54px ${INTER}`; x.fillText('?????', 0, 24)
      })
      L(x, 800, 1060, 'TISSUES: 2 BOXES', pop01(t, P.t0 + 1.4, 0.3, 2.4), SKYB, 0.04, 30)
    } },
]

// keep the hook on two lines: shrink the title block so it stays on two lines above the name tab
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
  id: 'r2t0567', key: 'E', accent: ACC, ending: 'lesson',
  title: 'Forgot a name? | Zodiacs *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve signs. | *Zero names.*', moods: ['sparkle', 'happy', 'wide', 'heart', 'wink', 'squint', 'wink', 'squint', 'sparkle', 'neutral', 'happy', 'sleepy'] },
  lesson: { text: 'Forgot a name? Just ask. | *They’ll smile.*', chip: 'NAME: SAVED' },
  last: { text: 'Hi, um… | *you!*' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
