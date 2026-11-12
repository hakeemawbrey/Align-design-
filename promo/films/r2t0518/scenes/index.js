// r2t0518: THE SIGNS AS… v3, SOLO film, "Your Capricorn mom | *be like.*" (~43 s vertical, signs3kit social cut,
// music: lofi · G). One sign the whole way: nine situations with a Capricorn mom, each the most extreme (and loving)
// version of the trait. Ending: group.
//   0.0–3.6    "Your Capricorn mom | *be like.*"
//   3.6–37.8   asked about your day, wanted a report · your birthday gift: a savings account · pickup at 3, she's there
//              at 2:15 · owns one fun mug, it says BOSS · the group chat has an agenda · "I'm not mad", opens a
//              spreadsheet · met your match, asked for references · on holiday, brought the laptop · proud of you, tells
//              the whole office
//  37.8        "Strict? A little. | *Proud? Always.*"  (the group beat is the ending)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#7dffb0', GREY = '#9aa5c4', RED = '#e23d4e', DEEP = '#2a2350'
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

const GIFT = ['...R.R...', '....R....', 'GGGGRGGGG', 'GgGGRGGgG', 'GGGGRGGGG', 'GgGGRGGgG', 'GGGGRGGGG']
const PIG = ['..P....P..', '.PPPPPPPP.', 'PPKPPPPKPP', 'PPPPPPPPPS', 'PPPPPPPPPS', '.PPPPPPPP.', '.P.P..P.P.']
const MUG = ['MMMMMMM..', 'MMMMMMMMM', 'MMMMMMM.M', 'MMMMMMM.M', 'MMMMMMMMM', 'MMMMMMM..', '.MMMMM...']
const CAR = ['...BBBBB....', '..BSSBSSB...', 'BBBBBBBBBBBB', 'BBBBBBBBBBBB', '.KK.....KK..']
const LAPTOP = ['.KKKKKKKKKK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KSSSSSSSSK.', '.KKKKKKKKKK.', 'GGGGGGGGGGGG']
const UMB = ['...PPPPP...', '.PPYPPPYPP.', 'PPPPPPPPPPP', '.....K.....', '.....K.....', '.....K.....', '....KK.....']

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
const S = 'capricorn', ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Asked about your day. | *Wanted a report.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 260, 320, pop01(t, P.t0 + 0.2, 0.3, 2), 0.04, x => {
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('DAILY REPORT', 0, -128)
        for (let i = 0; i < 6; i++) { x.fillStyle = INK; x.fillRect(-100, -86 + i * 40, 22, 22); x.fillStyle = GREY; x.fillRect(-64, -80 + i * 40, 150, 10) }
      })
      L(x, 800, 680, 'DUE: 6 PM', pop01(t, P.t0 + 1.0, 0.3, 2.2), RED, -0.04, 36, PAPER)
      L(x, 800, 1130, 'FORMAT: BULLETS', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 30)
    } },
  { sign: S, cap: 'Your birthday gift? | *A savings account.*', mood: lt => lt > 1.1 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const open = lt > 0.9
      if (!open) drawBits(x, GIFT, { R: RED, G: '#5fd068', g: '#9ae58a' }, 800, 960, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      else drawBits(x, PIG, { P: '#ff8fb1', K: INK, S: '#ffd0e0' }, 800, 960, 22 * pop01(t, P.t0 + 0.9 * 3.1 / 2.4, 0.3, 2))
      bubble(x, 800, 690, 'it’s for | your future', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 38, tail: 'bl' })
      L(x, 800, 1140, 'HAPPY BIRTHDAY!', pop01(t, P.t0 + 1.9, 0.3, 2.2), PINK, 0.04, 30)
    } },
  { sign: S, cap: 'Pickup at three? | *She’s there at 2:15.*', mood: 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      drawBits(x, CAR, { B: '#5fd068', S: SKYB, K: INK }, 800, 1010, 26 * pop01(t, P.t0 + 0.2, 0.3, 2))
      const m = 15 + Math.floor(clamp((lt - 0.5) / 1.4) * 44)
      L(x, 800, 760, `2:${String(m).padStart(2, '0')} PM`, pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, -0.04, 48)
      L(x, 800, 1150, 'ENGINE: ALREADY ON', pop01(t, P.t0 + 1.8, 0.3, 2.2), MINT, 0.04, 28)
    } },
  { sign: S, cap: 'Owns one fun mug. | *It says BOSS.*', mood: lt => lt > 1.2 ? 'wink' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      drawBits(x, MUG, { M: BONE }, 800, 940, 26 * k)
      if (k > 0.6 && lt > 0.8) { x.fillStyle = INK; x.font = `800 44px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BOSS', 772, 950) }
      L(x, 800, 680, 'FUN LEVEL: MAX', pop01(t, P.t0 + 1.5, 0.3, 2.2), PINK, -0.04, 32)
    } },
  { sign: S, cap: 'The family group chat | *has an agenda.*', mood: 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 800, 900, pop01(t, P.t0 + 0.2, 0.35, 2), 0.05, x => {
        x.fillStyle = MINT; x.font = `700 20px ${MONO}`; x.fillText('FAMILY', 0, -136)
        x.fillStyle = BONE; x.fillRect(-90, -110, 180, 210)
        x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('AGENDA', 0, -84)
        const rows = ['1. dinner', '2. chores', '3. dinner', '4. AOB']
        rows.forEach((r, i) => { if (lt > 0.4 + i * 0.3) { x.font = `700 22px ${INTER}`; x.textAlign = 'left'; x.fillText(r, -72, -40 + i * 36); x.textAlign = 'center' } })
      })
      L(x, 800, 1150, 'MINUTES: TAKEN', pop01(t, P.t0 + 1.8, 0.3, 2.2), GOLD, -0.04, 30)
    } },
  { sign: S, cap: '“I’m not mad.” | *Opens a spreadsheet.*', mood: lt => lt > 1.0 ? 'squint' : 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      card(x, 800, 900, 290, 250, pop01(t, P.t0 + 0.5, 0.3, 2), -0.04, x => {
        for (let j = 0; j < 5; j++) for (let i = 0; i < 4; i++) { x.fillStyle = j === 0 ? '#5fd068' : (i + j) % 2 ? '#e8f8ea' : '#ffffff'; x.fillRect(-130 + i * 65, -110 + j * 44, 63, 42) }
        x.fillStyle = INK; x.font = `700 18px ${MONO}`; ['WHO', 'WHAT', 'WHEN', 'WHY'].forEach((h, i) => x.fillText(h, -98 + i * 65, -88))
        if (lt > 1.1) { x.fillStyle = RED; x.fillRect(-130, 66, 260, 4) }
      }, '#c9c9d8')
      bubble(x, 800, 670, 'not mad :)', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 40, tail: 'bl' })
    } },
  { sign: S, cap: 'Met your match. | *Asked for references.*', mood: lt => lt > 1.3 ? 'happy' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 800, 900, 250, 330, k, 0.05, x => { x.fillStyle = DEEP; x.fillRect(-110, -150, 220, 190); x.fillStyle = INK; x.font = `800 26px ${INTER}`; x.fillText('YOUR MATCH', 0, 80); x.fillStyle = PINK; x.font = `700 20px ${MONO}`; x.fillText('♌ LEO', 0, 120) })
      if (k > 0.5) signChar(x, t, 'leo', 805, 850, 150 * k, { mood: lt > 1.0 ? 'wide' : 'happy', seed: 31, glyph: false, glow: 0.5 })
      L(x, 800, 660, 'REFERENCES: 3, PLEASE', pop01(t, P.t0 + 1.1, 0.3, 2.2), GOLD, -0.04, 28)
    } },
  { sign: S, cap: 'On holiday. | *Brought the laptop.*', mood: lt => lt > 1.2 ? 'happy' : 'neutral', look: [1, 0], star: ST,
    back(x, t, lt, P) { drawBits(x, UMB, { P: PINK, Y: GOLD, K: '#c98f2a' }, 760, 790, 18 * pop01(t, P.t0 + 0.15, 0.3, 2)) },
    front(x, t, lt, P) {
      drawBits(x, LAPTOP, { K: '#6b62a8', S: SKYB, G: '#9aa5c4' }, 800, 1040, 16 * pop01(t, P.t0 + 0.4, 0.3, 2))
      L(x, 800, 1150, 'OUT OF OFFICE (NOT)', pop01(t, P.t0 + 1.4, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: S, cap: 'Proud of you? | *Tells the whole office.*', mood: lt => lt > 1.0 ? 'heart' : 'happy', look: [1, 0], star: ST, hops: [1.2],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      card(x, 800, 900, 240, 280, pop01(t, P.t0 + 0.2, 0.3, 2), -0.05, x => { x.fillStyle = SKYB; x.fillRect(-100, -120, 200, 180); x.fillStyle = INK; x.font = `800 28px ${INTER}`; x.fillText('MY KID', 0, 100) }, GOLD)
      if (lt > 0.3) signChar(x, t, 'gemini', 800, 860, 130, { mood: 'sparkle', seed: 33, glyph: false, glow: 0.4 })
      bubble(x, 800, 650, 'did i mention…', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 38, col: PINK, tail: 'bc' })
      sparkles(x, t, 800, 880, P.t0 + 1.4, 7, 180, 0.5)
    } },
]

const F = makeFilm({
  id: 'r2t0518', key: 'G', accent: ACC, solo: S, ending: 'group',
  title: 'Your Capricorn mom | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Strict? A little. | *Proud? Always.*', mood: 'heart' },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES)
export const CUES = F.CUES
export const T = F.T
