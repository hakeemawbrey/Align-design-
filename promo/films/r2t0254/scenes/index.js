// r2t0254: star_talk, SOLO, "Gemini coworkers | be like." (~50 s vertical, signs3kit social cut, music: lofi · D)
// One sign the whole way through (makeFilm solo mode, 9 cards): the Gemini at work, each habit pushed to the extreme.
//   0.0–3.6    "Gemini coworkers | *be like.*"
//   3.6–37.8   nine cards (3.8 s each):
//              in every group chat · two coffees, one per personality · came to fix the printer, stayed for gossip
//              · "quick question" ran the meeting long · three projects before lunch · knows everyone's sign and their
//              moon · out of office, still answering · new hobby every Monday · quiet office? not anymore
//  37.8        "Chaotic. | *Office favourite.*"  Gemini comes back, big.
//  41.0        LESSON: "Every office needs | a *Gemini.* Honestly."  STATUS: MORALE UP
//  46.9        "Tag your | *Gemini coworker.*"
import { clamp, prog, ease, lerp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, notes,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GEM = '#f2cf4a', CREAM = '#fff4e2', RED = '#e23d4e', WOOD = '#c98f2a', BROWN = '#7a4a2e'
const S = 'gemini'

function slab(x, cx, cy, w, h, k, { rot = 0.04, bg = BONE, edge = INK } = {}, fn) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 10, -h / 2 + 12, w, h)
  x.fillStyle = edge; x.fillRect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16)
  x.fillStyle = bg; x.fillRect(-w / 2, -h / 2, w, h)
  if (fn) fn(x)
  x.restore()
}
const txt = (x, s, px, py, size, col = INK, font = INTER, w = 800, align = 'center') => { x.fillStyle = col; x.font = `${w} ${size}px ${font}`; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, px, py) }

function mug(x, t, cx, cy, k, col, word) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.strokeStyle = INK; x.lineWidth = 22; x.beginPath(); x.arc(78, 0, 40, -1.2, 1.2); x.stroke()
  x.strokeStyle = col; x.lineWidth = 10; x.beginPath(); x.arc(78, 0, 40, -1.2, 1.2); x.stroke()
  x.fillStyle = INK; x.fillRect(-84, -90, 168, 186); x.fillStyle = col; x.fillRect(-76, -82, 152, 170)
  x.fillStyle = BROWN; x.fillRect(-76, -82, 152, 20)
  txt(x, word, 0, 10, 30, INK, MONO, 700)
  for (let i = 0; i < 3; i++) { const ph = (t * 0.8 + i / 3) % 1; x.fillStyle = `rgba(255,255,255,${0.45 * Math.sin(Math.PI * ph)})`; x.fillRect(-40 + i * 34 + Math.sin(t * 3 + i) * 6, -110 - ph * 70, 10, 26) }
  x.restore()
}
function printer(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-160, -90, 320, 180); x.fillStyle = '#c9c9d8'; x.fillRect(-152, -82, 304, 164)
  x.fillStyle = '#8a8aa0'; x.fillRect(-120, -60, 240, 16)
  x.fillStyle = INK; x.fillRect(-110, 90, 220, 12)
  x.fillStyle = RED; x.fillRect(100, -40, 24, 16)
  // a jammed page sticking out, crumpled
  x.fillStyle = INK; x.save(); x.translate(0, -100); x.rotate(-0.15); x.fillRect(-84, -64, 168, 72); x.fillStyle = CREAM; x.fillRect(-78, -58, 156, 60); x.restore()
  x.restore()
}
function clockFace(x, t, cx, cy, k, spin) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 110, 0, 7); x.fill(); x.fillStyle = CREAM; x.beginPath(); x.arc(0, 0, 98, 0, 7); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * 80 - 4, Math.sin(a) * 80 - 4, 8, 8) }
  x.save(); x.rotate(spin); x.fillRect(-4, -76, 8, 76); x.restore()
  x.save(); x.rotate(spin / 12); x.fillRect(-6, -50, 12, 50); x.restore()
  x.restore()
}
function folder(x, cx, cy, k, col, tag) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-110, -70, 220, 150); x.fillRect(-110, -92, 90, 30)
  x.fillStyle = col; x.fillRect(-102, -62, 204, 134); x.fillRect(-102, -84, 76, 26)
  txt(x, tag, 0, 10, 26, INK, MONO, 700)
  x.restore()
}
// a little desk chart board: everyone's sign
function signBoard(x, t, cx, cy, k, lt) {
  slab(x, cx, cy, 340, 360, k, { rot: 0.03, bg: '#2a2350' }, x => {
    txt(x, 'THE OFFICE CHART', 0, -150, 22, GEM, MONO, 700)
    const rows = [['DANA', '♈︎', '☾ ♋︎'], ['RAJ', '♑︎', '☾ ♓︎'], ['MO', '♎︎', '☾ ♌︎'], ['BOSS', '♏︎', '☾ ♉︎']]
    rows.forEach((r, i) => {
      if (lt < 0.3 + i * 0.25) return
      const y = -90 + i * 66
      x.fillStyle = '#140c30'; x.fillRect(-150, y - 26, 300, 52)
      txt(x, r[0], -130, y, 22, BONE, MONO, 700, 'left'); txt(x, r[1], 40, y, 30, GEM, "'Segoe UI Symbol', 'Noto Sans Symbols', serif", 400); txt(x, r[2], 110, y, 24, LAV, "'Segoe UI Symbol', 'Noto Sans Symbols 2', 'Noto Sans Symbols', serif", 400)
    })
  })
}
function hobby(x, t, cx, cy, k, i) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  if (i === 0) { // yarn ball and needles
    x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 90, 0, 7); x.fill(); x.fillStyle = PINK; x.beginPath(); x.arc(0, 0, 80, 0, 7); x.fill()
    x.strokeStyle = '#ff6a9a'; x.lineWidth = 6; for (let j = 0; j < 4; j++) { x.beginPath(); x.arc(0, 0, 70 - j * 16, 0.3 + j, 2.8 + j); x.stroke() }
    x.fillStyle = INK; x.save(); x.rotate(0.6); x.fillRect(-6, -150, 12, 200); x.restore(); x.save(); x.rotate(-0.6); x.fillRect(-6, -150, 12, 200); x.restore()
  } else if (i === 1) { // paint palette
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 130, 96, 0, 0, 7); x.fill(); x.fillStyle = WOOD; x.beginPath(); x.ellipse(0, 0, 120, 86, 0, 0, 7); x.fill()
    const c = [RED, GEM, MINT, SKYB, LAV]; c.forEach((cc, j) => { x.fillStyle = cc; x.beginPath(); x.arc(-70 + j * 36, -30 + (j % 2) * 24, 18, 0, 7); x.fill() })
    x.fillStyle = '#140c30'; x.beginPath(); x.arc(50, 40, 22, 0, 7); x.fill()
  } else { // ukulele-ish
    x.rotate(-0.5)
    x.fillStyle = INK; x.beginPath(); x.ellipse(0, 50, 80, 70, 0, 0, 7); x.fill(); x.fillRect(-16, -170, 32, 170)
    x.fillStyle = WOOD; x.beginPath(); x.ellipse(0, 50, 70, 60, 0, 0, 7); x.fill(); x.fillStyle = '#a8731f'; x.fillRect(-10, -164, 20, 160)
    x.fillStyle = INK; x.beginPath(); x.arc(0, 40, 20, 0, 7); x.fill()
  }
  x.restore()
}

const CAMEOS = [
  { sign: S, cap: 'In every | *group chat.* Even yours.', mood: lt => lt > 1.2 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      const names = ['#marketing', '#lunch-club', '#plants', '#gossip', '#HR (??)', '#your-team']
      names.forEach((n, i) => label(x, 770 + (i % 2 ? 40 : -40), 600 + i * 92, n, pop01(t, P.t0 + 0.25 + i * 0.2, 0.25, 2.2), { size: 32, bg: [GEM, MINT, PINK, LAV, SKYB, BONE][i], rot: i % 2 ? 0.05 : -0.05, font: MONO, weight: 700 }))
    } },
  { sign: S, cap: 'Two coffees. | *One per personality.*', mood: lt => Math.floor(lt * 2.4) % 2 ? 'wink' : 'happy', look: [1, 0], star: { x: -220 }, hops: [1.3],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      mug(x, t, 660, 920, 0.95 * pop01(t, P.t0 + 0.2, 0.35, 2), GEM, 'ME')
      mug(x, t, 880, 920, 0.95 * pop01(t, P.t0 + 0.6, 0.35, 2), LAV, 'ALSO ME')
    } },
  { sign: S, cap: 'Came to fix the printer. | *Stayed for the gossip.*', mood: lt => lt > 1.0 ? 'wide' : 'happy', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      printer(x, t, 780, 1010, 0.9 * pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      bubble(x, 790, 640, 'wait. WHO??', pop01(t, P.t0 + 1.0, 0.25, 2.4), { size: 44, tail: 'bl' })
      label(x, 790, 1150, 'STILL JAMMED', pop01(t, P.t0 + 1.6, 0.3, 2.4), { size: 28, bg: RED, color: CREAM, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: '“Quick question.” | *Meeting ran two hours.*', mood: 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      bubble(x, 420, 610, 'quick question!', pop01(t, P.t0 + 0.2, 0.25, 2.2), { size: 34, tail: 'bc' })
      clockFace(x, t, 790, 860, pop01(t, P.t0 + 0.5, 0.35, 2), lt * 9)
      bubble(x, 790, 1100, 'and ANOTHER thing', pop01(t, P.t0 + 1.4, 0.25, 2.2), { size: 32, col: LAV, tail: 'bl' })
    } },
  { sign: S, cap: 'Started three projects. | *Before lunch.*', mood: lt => lt > 1.3 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 },
    front(x, t, lt, P) {
      folder(x, 760, 1060, pop01(t, P.t0 + 0.2, 0.3, 2), MINT, 'PROJECT A')
      folder(x, 800, 900, pop01(t, P.t0 + 0.5, 0.3, 2), PINK, 'PROJECT B')
      folder(x, 770, 740, pop01(t, P.t0 + 0.8, 0.3, 2), SKYB, 'PROJECT Ω')
      label(x, 780, 600, 'IT’S 10:42 AM', pop01(t, P.t0 + 1.4, 0.3, 2.4), { size: 30, bg: GEM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Knows everyone’s sign. | *And their moon.*', mood: lt => lt > 1.4 ? 'wink' : 'happy', look: [1, 0], star: { x: -230 },
    front(x, t, lt, P) { signBoard(x, t, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: S, cap: 'Out of office. | *Still answering.*', mood: 'sparkle', look: [1, 0], star: { x: -220, y: 40 },
    back(x, t, lt, P) {
      // a beach umbrella behind them
      const k = pop01(t, P.t0 + 0.1, 0.35, 2)
      if (k > 0.01) { x.save(); x.translate(320, 760); x.scale(k, k); x.fillStyle = INK; x.fillRect(-6, 0, 12, 260); x.beginPath(); x.moveTo(-180, 10); x.quadraticCurveTo(0, -150, 180, 10); x.closePath(); x.fill(); x.fillStyle = PINK; x.beginPath(); x.moveTo(-168, 2); x.quadraticCurveTo(0, -136, 168, 2); x.closePath(); x.fill(); x.fillStyle = CREAM; x.fillRect(-60, -60, 40, 60); x.fillRect(30, -60, 40, 60); x.restore() }
    },
    front(x, t, lt, P) {
      label(x, 780, 640, 'OOO: BEACH', pop01(t, P.t0 + 0.4, 0.3, 2.4), { size: 32, bg: SKYB, rot: -0.04, font: MONO, weight: 700 })
      const msgs = ['re: hi!', 're: re: hi!', 'one more thing', 'lol yes']
      msgs.forEach((m, i) => bubble(x, 800 + (i % 2 ? 30 : -30), 760 + i * 100, m, pop01(t, P.t0 + 0.8 + i * 0.25, 0.25, 2.2), { size: 30, tail: i % 2 ? 'br' : 'bl' }))
    } },
  { sign: S, cap: 'New hobby | *every Monday.*', mood: lt => lt > 1.6 ? 'wink' : 'sparkle', look: [1, 0], star: { x: -220 }, hops: [0.8, 1.6],
    front(x, t, lt, P) {
      const i = Math.min(2, Math.floor(lt / 0.75))
      hobby(x, t, 790, 900, 1.35 * pop01(t, P.t0 + 0.05 + i * 0.75, 0.3, 2), i)
      label(x, 790, 640, ['WEEK 1: KNITTING', 'WEEK 2: PAINTING', 'WEEK 3: UKULELE'][i], pop01(t, P.t0 + 0.15 + i * 0.75, 0.25, 2.2), { size: 28, bg: GEM, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Quiet office? | *Not anymore.*', mood: 'sparkle', look: [1, 0], star: { x: -200 }, hops: [0.4, 1.0, 1.6],
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      if (k > 0.01) signChar(x, t, 'capricorn', 830, 1000, 180 * k, { mood: lt > 0.9 ? 'eyeroll' : 'neutral', look: [-1, 0], seed: 21, glyph: false })
      const words = ['GOOD MORNING!', 'guess what', 'okay so', 'lunch??']
      words.forEach((w, i) => bubble(x, [460, 780, 520, 820][i], [620, 640, 760, 770][i], w, pop01(t, P.t0 + 0.6 + i * 0.25, 0.25, 2.2), { size: 30, tail: 'bc', col: i % 2 ? LAV : BONE }))
    } },
]

const F = makeFilm({
  id: 'r2t0254', key: 'D', accent: GEM, solo: S, ending: 'lesson',
  title: 'Gemini coworkers | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Chaotic. | *Office favourite.*', mood: 'wink' },
  lesson: { text: 'Every office needs | a *Gemini.* Honestly.', chip: 'STATUS: MORALE UP' },
  last: { text: 'Tag your | *Gemini coworker.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
