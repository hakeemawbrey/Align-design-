// r2t0519: THE SIGNS AS… v3, "Zodiacs when they're | early for once | *be like.*" (~57 s vertical, signs3kit social
// cut, music: lofi · D). Twelve signs in zodiac order, each the most extreme version of itself. Ending: callback.
//   0.0–3.6    "Zodiacs when they're | early for once | *be like.*"
//   3.6–49.2   ♈ early by an hour, already left · ♉ took the comfy chair · ♊ early to the wrong café, twice
//              · ♋ saved everyone seats · ♌ early to the date, waits for an entrance · ♍ annoyed you're only on time
//              · ♎ rearranged the table · ♏ picked the corner seat · ♐ early to the airport, wrong year
//              · ♑ early is on time, on time is late · ♒ the time machine works · ♓ early to the first date, cried
//              from pride
//  49.2        "Twelve early birds. | *A true miracle.*"
//  52.6        "Everyone’s here. | *Aries left.*"  (Aries' wait timer comes back)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, notes, signChar, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const PAPER = '#fff4e2', ACC = '#8fe3ff', GREY = '#9aa5c4', RED = '#e23d4e'
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

const CHAIR = ['.CCCCCC.', 'CCcCCcCC', 'CCCCCCCC', 'CCCCCCCC', 'CCCCCCCCCC'.slice(0, 8), 'AACCCCAA', 'AACCCCAA', 'AA....AA', 'AA....AA']
const CHAIR_C = { C: '#ff8fb1', c: '#ffd0e0', A: '#c98f2a' }
const PIN = ['.RRRR.', 'RRWWRR', 'RRWWRR', '.RRRR.', '..RR..', '...R..']
const SEAT = ['BBBBBB', 'BbbbbB', 'BBBBBB', 'K....K', 'K....K']
const VASE = ['.F.F.F.', 'FYFYFYF', '.LLLLL.', '..LLL..', '..VVV..', '.VVVVV.', '.VVVVV.']
const TICKET = ['TTTTTTTTTTTT', 'T..........T', 'T.KKKK.KK..T', 'T..........T', 'TTTTTTTTTTTT']
const MACHINE = ['..KKKKKKK..', '.KMMMMMMMK.', 'KMyMgMrMyMK', 'KMMMMMMMMMK', 'KMMSSSSSMMK', 'KMMSSSSSMMK', 'KMMMMMMMMMK', '.KK.....KK.']
const MACHINE_C = { K: INK, M: '#9aa5c4', y: '#ffe36a', g: MINT, r: RED, S: SKYB }
function clock(x, t, cx, cy, k, hh, mm) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 96, 0, Math.PI * 2); x.fill()
  x.fillStyle = PAPER; x.beginPath(); x.arc(0, 0, 86, 0, Math.PI * 2); x.fill()
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillStyle = INK; x.fillRect(Math.cos(a) * 70 - 4, Math.sin(a) * 70 - 4, 8, 8) }
  const ah = (hh % 12 + mm / 60) / 12 * Math.PI * 2 - Math.PI / 2, am = mm / 60 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ah) * 42, Math.sin(ah) * 42); x.stroke()
  x.lineWidth = 6; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(am) * 64, Math.sin(am) * 64); x.stroke()
  x.restore()
}

const LS = { x: -170 }, RS = { x: 170 }
const CAMEOS = [
  { sign: 'aries', cap: 'Early by an hour. | *Already left.*', mood: lt => lt > 1.3 ? 'squint' : 'sparkle', look: [1, 0], star: LS, hops: [0.5, 1.4],
    front(x, t, lt, P) {
      const m = Math.min(4, Math.floor(clamp((lt - 0.3) / 1.0) * 5))
      L(x, 790, 820, `WAITED: ${m} MIN`, pop01(t, P.t0 + 0.3, 0.3, 2.2), GOLD, -0.04, 40)
      bubble(x, 790, 1020, 'ok bye!', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 44, col: '#ffb3a0', tail: 'bl' })
    } },
  { sign: 'taurus', cap: 'Got there first. | *Took the comfy chair.*', mood: lt => lt > 1.1 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, CHAIR, CHAIR_C, 800, 980, 24 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 690, 'SEAT: TAKEN FOREVER', pop01(t, P.t0 + 1.2, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: 'gemini', cap: 'Early to the wrong café. | *Twice.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, PIN, { R: RED, W: PAPER }, 740, 940, 22 * pop01(t, P.t0 + 0.2, 0.3, 2))
      drawBits(x, PIN, { R: RED, W: PAPER }, 880, 1000, 22 * pop01(t, P.t0 + 1.0, 0.3, 2))
      L(x, 800, 720, lt > 1.0 ? 'WRONG CAFÉ #2' : 'WRONG CAFÉ #1', pop01(t, P.t0 + 0.6, 0.3, 2.2), GOLD, -0.04, 34)
    } },
  { sign: 'cancer', cap: 'Got there early. | *Saved everyone seats.*', mood: lt => lt > 1.2 ? 'heart' : 'happy', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      for (let i = 0; i < 4; i++) drawBits(x, SEAT, { B: '#8fe3ff', b: '#d8f6ff', K: '#6b62a8' }, 680 + (i % 2) * 160, 880 + Math.floor(i / 2) * 150, 16 * pop01(t, P.t0 + 0.2 + i * 0.15, 0.3, 2))
      L(x, 800, 690, 'SAVED: ALL OF THEM', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 28)
    } },
  { sign: 'leo', cap: 'Early to the date. | *Waits for an entrance.*', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: LS,
    back(x, t, lt, P, F) {
      const k = ease.outCubic(prog(lt, 1.0, 1.3))
      if (k > 0.01) { x.save(); x.globalAlpha = 0.28 * k; x.fillStyle = '#fff1b0'; x.beginPath(); x.moveTo(F.x - 40, 500); x.lineTo(F.x + 40, 500); x.lineTo(F.x + 190, 1100); x.lineTo(F.x - 190, 1100); x.fill(); x.restore() }
    },
    front(x, t, lt, P) {
      L(x, 800, 780, 'ENTRANCE: 7:00 SHARP', pop01(t, P.t0 + 0.5, 0.3, 2.2), GOLD, -0.04, 28)
      L(x, 800, 1000, 'ARRIVED: 6:20', pop01(t, P.t0 + 1.4, 0.3, 2.2), LAV, 0.04, 30)
    } },
  { sign: 'virgo', cap: 'Early, as always. | *Annoyed you’re on time.*', mood: 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      clock(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 7, lt * 8)
      L(x, 800, 690, 'YOU: ONLY ON TIME', pop01(t, P.t0 + 1.1, 0.3, 2.2), MINT, -0.04, 28)
    } },
  { sign: 'libra', cap: 'Early for once. | *Rearranged the table.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      const f = ease.inOutCubic(prog(lt, 0.6, 1.2))
      drawBits(x, VASE, { F: PINK, Y: GOLD, L: '#5fd068', V: '#c9a6ff' }, lerp(900, 800, f), 960, 18 * pop01(t, P.t0 + 0.2, 0.3, 2), { rot: lerp(0.25, 0, f) })
      x.save(); x.globalAlpha = pop01(t, P.t0 + 0.2, 0.3, 2); x.fillStyle = '#c98f2a'; x.fillRect(660, 1040, 280, 22); x.fillRect(680, 1060, 16, 90); x.fillRect(904, 1060, 16, 90); x.restore()
      L(x, 800, 700, 'VIBES: FIXED', pop01(t, P.t0 + 1.4, 0.3, 2.2), PINK, -0.04, 34)
    } },
  { sign: 'scorpio', cap: 'Got there early. | *Picked the corner seat.*', mood: lt => lt > 1.1 ? 'squint' : 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, SEAT, { B: '#a8324a', b: '#e0607a', K: '#6b62a8' }, 860, 1020, 28 * pop01(t, P.t0 + 0.2, 0.3, 2))
      L(x, 800, 720, 'VIEW OF EVERYTHING', pop01(t, P.t0 + 1.0, 0.3, 2.2), '#c97bff', -0.04, 28, PAPER)
      L(x, 800, 1150, 'BACK TO THE WALL', pop01(t, P.t0 + 1.7, 0.3, 2.2), GOLD, 0.04, 28)
    } },
  { sign: 'sagittarius', cap: 'Early to the airport. | *Wrong year.*', mood: lt => lt > 1.3 ? 'wide' : 'sparkle', star: RS, hops: [0.5],
    front(x, t, lt, P) {
      card(x, 330, 900, 260, 130, pop01(t, P.t0 + 0.2, 0.3, 2), -0.08, x => { x.fillStyle = SKYB; x.fillRect(-130, -65, 60, 130); x.fillStyle = INK; x.font = `800 30px ${INTER}`; x.fillText('BOARDING', 30, -14); x.font = `700 22px ${MONO}`; x.fillText('GATE 7', 30, 26) })
      L(x, 330, 1080, 'FLIGHT: NEXT MAY', pop01(t, P.t0 + 1.2, 0.3, 2.2), GOLD, 0.04, 30)
      bubble(x, 330, 700, 'worth it', pop01(t, P.t0 + 1.9, 0.25, 2.2), { size: 38, tail: 'br' })
    } },
  { sign: 'capricorn', cap: 'Early is on time. | *On time is late.*', mood: 'neutral', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      clock(x, t, 800, 900, pop01(t, P.t0 + 0.2, 0.3, 2), 6, 30)
      L(x, 800, 690, 'MEETING AT 7', pop01(t, P.t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 32)
      L(x, 800, 1110, 'ARRIVED: 6:30', pop01(t, P.t0 + 1.6, 0.3, 2.2), MINT, 0.04, 32)
    } },
  { sign: 'aquarius', cap: 'Early for once. | *The time machine works.*', mood: lt => lt > 1.2 ? 'sparkle' : 'wide', look: [1, 0], star: LS,
    front(x, t, lt, P) {
      drawBits(x, MACHINE, MACHINE_C, 800, 960, 20 * pop01(t, P.t0 + 0.2, 0.3, 2))
      sparkles(x, t, 800, 940, P.t0 + 1.0, 8, 170, 0.5, [SKYB, MINT, BONE])
      L(x, 800, 690, 'ARRIVED: YESTERDAY', pop01(t, P.t0 + 1.3, 0.3, 2.2), SKYB, -0.04, 30)
    } },
  { sign: 'pisces', cap: 'Early to a first date. | *Cried from pride.*', mood: 'wide', tears: lt => lt < 0.9 ? 1 : 3, look: [1, 0], star: LS,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      L(x, 800, 760, 'EARLY: 10 MIN', pop01(t, P.t0 + 0.4, 0.3, 2.2), GOLD, -0.04, 36)
      bubble(x, 800, 980, 'i’m so proud | of me', pop01(t, P.t0 + 1.2, 0.25, 2.2), { size: 36, col: LAV, tail: 'bl' })
      hearts(x, t, 800, 1100, P.t0 + 1.6, { n: 5, life: 1.6, spread: 180, cell: 7, seed: 2 })
    } },
]

const F = makeFilm({
  id: 'r2t0519', key: 'D', accent: ACC, ending: 'callback',
  title: 'Zodiacs when they’re | early for once | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Twelve early birds. | *A true miracle.*', moods: ['sparkle', 'heart', 'wide', 'heart', 'wink', 'squint', 'sparkle', 'squint', 'wide', 'neutral', 'sparkle', 'wide'] },
  last: {
    text: 'Everyone’s here. | *Aries left.*',
    draw(x, t, lt) {
      const t0 = t - lt, f = ease.inCubic(prog(lt, 1.6, 2.6))
      signChar(x, t, 'aries', lerp(540, 1000, f), 1030, 240 * pop01(t, t0 + 0.4, 0.4, 2), { mood: 'squint', look: [1, 0], seed: 9, hops: [t0 + 1.6, t0 + 2.0, t0 + 2.4], glyph: false })
      L(x, 540, 800, 'WAITED: 4 MIN', pop01(t, t0 + 0.8, 0.3, 2.2), GOLD, -0.04, 44)
    },
  },
})
export const DURATION = F.DURATION
export const SCENES = fitTitleScenes(F.SCENES, 940, 236)
export const CUES = F.CUES
export const T = F.T
