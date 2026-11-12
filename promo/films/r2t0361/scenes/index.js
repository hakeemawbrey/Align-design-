// r2t0361: star_talk, SOLO, "Your Aries coworker | be like." (~52 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards), ending: lesson.
//   0.0–3.6    "Your Aries coworker | *be like.*"
//   3.6–37.8   replied all before reading it · started the project mid-meeting · raced the elevator (won, barely)
//              · microwave says 1:00, opens at 0:03 · the icebreaker became a tournament · took a day off, emailed by 9am
//              · typed so fast the keyboard quit · new hire? asked their sign first · you had a bad day, they fought the printer
//  37.8        "Already done. | *You're welcome.*"
//  41.0        LESSON UNLOCKED: "Fast is how | they *show up.*"  TEAMWORK: FAST
//  46.9        "The printer | *still fears them.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO, SERIF,
} from '../../signs3kit.js'

const RED = '#ff6b5a', DEEP = '#140c30', GREY = '#9aa5c4', STEEL = '#6b7591'
const M = { font: MONO, weight: 700 }

/** a dark rounded screen/card frame with drop shadow; inner(x) draws in local coords */
function frame(x, cx, cy, W, H, k, rot, bg, inner) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 6, -H / 2 - 6, W + 12, H + 12)
  x.fillStyle = bg; x.fillRect(-W / 2, -H / 2, W, H)
  inner(x, W, H)
  x.restore()
}
const txt = (x, s, X, Y, font, col, align = 'center') => { x.fillStyle = col; x.font = font; x.textAlign = align; x.textBaseline = 'middle'; x.fillText(s, X, Y) }

// an email: "RE: RE: RE: lunch?" with the REPLY ALL button pressed
function email(x, cx, cy, k, lt) {
  frame(x, cx, cy, 360, 330, k, 0.04, BONE, (x, W, H) => {
    x.fillStyle = '#d9d0c0'; x.fillRect(-W / 2, -H / 2, W, 56)
    txt(x, 'INBOX (1)', -W / 2 + 20, -H / 2 + 28, `700 26px ${MONO}`, INK, 'left')
    txt(x, 'RE: RE: RE: RE:', -W / 2 + 20, -H / 2 + 92, `800 30px ${INTER}`, INK, 'left')
    // unread lines
    x.fillStyle = GREY; for (let i = 0; i < 3; i++) x.fillRect(-W / 2 + 20, -H / 2 + 130 + i * 30, i === 2 ? 180 : 300, 10)
    const pressed = lt > 0.7
    x.fillStyle = INK; x.fillRect(-120, 70, 240, 74)
    x.fillStyle = pressed ? RED : '#ffb34a'; x.fillRect(-114, pressed ? 80 : 74, 228, 60)
    txt(x, 'REPLY ALL', 0, pressed ? 110 : 104, `800 34px ${INTER}`, INK)
  })
}
// a laptop with a progress bar already full
function laptop(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-176, -126, 352, 236)
  x.fillStyle = '#2a2350'; x.fillRect(-166, -116, 332, 216)
  txt(x, 'PROJECT.DOC', 0, -76, `700 26px ${MONO}`, BONE)
  const p = ease.outCubic(prog(lt, 0.3, 1.3))
  x.fillStyle = INK; x.fillRect(-130, -20, 260, 40)
  x.fillStyle = MINT; x.fillRect(-124, -14, 248 * p, 28)
  txt(x, p >= 1 ? 'DONE ✓' : `${Math.round(p * 100)}%`, 0, 54, `700 30px ${MONO}`, p >= 1 ? MINT : BONE)
  x.fillStyle = INK; x.fillRect(-206, 110, 412, 34)
  x.fillStyle = GREY; x.fillRect(-200, 114, 400, 24)
  x.restore()
}
// elevator doors with a floor counter that loses to Aries
function elevator(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-150, -210, 300, 420)
  x.fillStyle = STEEL; x.fillRect(-140, -150, 136, 350); x.fillRect(4, -150, 136, 350)
  x.fillStyle = '#8a93ad'; x.fillRect(-130, -140, 20, 330); x.fillRect(14, -140, 20, 330)
  x.fillStyle = DEEP; x.fillRect(-90, -202, 180, 46)
  const fl = Math.min(12, 1 + Math.floor(lt * 3))
  txt(x, `▲ ${fl}`, 0, -178, `700 30px ${MONO}`, '#ffb34a')
  x.restore()
}
// a microwave: 1:00 set, the door already open at 0:57
function microwave(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-182, -112, 372, 240)
  x.fillStyle = INK; x.fillRect(-190, -120, 380, 240)
  x.fillStyle = '#d9d0c0'; x.fillRect(-182, -112, 364, 224)
  const open = lt > 1.0
  // window
  x.fillStyle = INK; x.fillRect(-166, -96, 236, 192)
  x.fillStyle = open ? '#fff1a8' : '#3a3260'; x.fillRect(-158, -88, 220, 176)
  // display
  x.fillStyle = INK; x.fillRect(86, -96, 84, 50)
  const secs = open ? 57 : 60 - Math.floor(lt * 3)
  txt(x, `0:${String(secs).padStart(2, '0')}`, 128, -70, `700 24px ${MONO}`, MINT)
  x.fillStyle = GREY; for (let r = 0; r < 3; r++) for (let c = 0; c < 2; c++) x.fillRect(96 + c * 36, -30 + r * 34, 26, 22)
  x.restore()
}
const TROPHY = [
  'GGGGGGGGGGG',
  'GYYYYYYYYYG',
  'GYYYYYYYYYG',
  '.GYYYYYYYG.',
  '..GYYYYYG..',
  '...GYYYG...',
  '....GYG....',
  '....GYG....',
  '...GGGGG...',
  '..BBBBBBB..',
]
const TROPHY_C = { G: '#c99a2e', Y: GOLD, B: '#8a4a2e' }
// a phone lock screen: 9:00 AM on the day off, an email already sent
function phone(x, cx, cy, k, lt) {
  frame(x, cx, cy, 250, 420, k, 0.06, '#2a2350', (x, W, H) => {
    txt(x, 'DAY OFF', 0, -150, `700 24px ${MONO}`, LAV)
    txt(x, '9:00', 0, -92, `800 72px ${INTER}`, BONE)
    const s = pop01(lt, 0.8, 0.3, 2)
    if (s > 0.01) {
      x.save(); x.translate(0, 36); x.scale(s, s)
      x.fillStyle = INK; x.fillRect(-110, -54, 220, 108)
      x.fillStyle = BONE; x.fillRect(-104, -48, 208, 96)
      txt(x, 'SENT:', -88, -22, `700 22px ${MONO}`, INK, 'left')
      txt(x, '“quick q”', -88, 16, `800 30px ${INTER}`, INK, 'left')
      x.restore()
    }
  })
}
// a keyboard with keys popping off
function keyboard(x, cx, cy, k, lt, t) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.fillRect(-200, -70, 400, 140)
  x.fillStyle = '#d9d0c0'; x.fillRect(-192, -62, 384, 124)
  const gone = new Set([3, 8, 12, 17, 21])
  for (let r = 0; r < 3; r++) for (let c = 0; c < 8; c++) {
    const i = r * 8 + c
    const X = -176 + c * 46, Y = -48 + r * 38
    if (gone.has(i) && lt > 0.6) {
      const ph = Math.min(1, (lt - 0.6 - (i % 4) * 0.1) / 1.0)
      if (ph < 0) { x.fillStyle = GREY; x.fillRect(X, Y, 38, 30); continue }
      const dx = (i % 2 ? 1 : -1) * (60 + i * 6) * ph, dy = -260 * ph + 300 * ph * ph
      x.save(); x.translate(X + 19 + dx, Y + 15 + dy); x.rotate(ph * (i % 2 ? 4 : -4))
      x.fillStyle = INK; x.fillRect(-22, -18, 44, 36); x.fillStyle = BONE; x.fillRect(-19, -15, 38, 30); x.restore()
      x.fillStyle = '#3a3260'; x.fillRect(X, Y, 38, 30)
    } else { x.fillStyle = GREY; x.fillRect(X, Y, 38, 30); x.fillStyle = BONE; x.fillRect(X, Y, 38, 24) }
  }
  x.restore()
}
// a pixel printer with a crumpled jam and a big X
const PRINTER = [
  '...PPPPPPPP...',
  '...PWWWWWWP...',
  'KKKKKKKKKKKKKK',
  'KGGGGGGGGGGGGK',
  'KGGGGGGGGGRGGK',
  'KGGGGGGGGGGGGK',
  'KKKKKKKKKKKKKK',
  '..KWWWWWWWWK..',
  '..KKKKKKKKKK..',
]
const PRINTER_C = { P: BONE, W: '#ffffff', K: '#3a3260', G: '#9aa5c4', R: '#ff6b5a' }

const S = 'aries'
const ST = { x: -170 }
const CAMEOS = [
  { sign: S, cap: 'Replied all | *before reading it.*', mood: lt => lt > 0.8 ? 'wide' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      email(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'SENT IN 0.2 SECONDS', pop01(t, P.t0 + 1.0, 0.3, 2.2), { size: 28, bg: RED, color: BONE, rot: -0.05, ...M })
    } },
  { sign: S, cap: 'Started the project | *mid-meeting.*', mood: lt => lt > 1.3 ? 'wink' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      laptop(x, 770, 900, 0.9 * pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'MEETING: 2 MIN IN', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 30, bg: GOLD, rot: 0.04, ...M })
      if (lt > 1.3) sparkles(x, t, 790, 900, P.t0 + 1.3, 6, 160, 0.4)
    } },
  { sign: S, cap: 'Raced the elevator. | *Won. Barely.*', mood: lt => lt > 1.4 ? 'sparkle' : 'wide', look: [1, 0], star: ST, hops: [0.5, 0.9, 1.3],
    front(x, t, lt, P) {
      elevator(x, 800, 880, pop01(t, P.t0 + 0.15, 0.3, 2), lt)
      label(x, 780, 1140, 'STAIRS: 12 FLOORS', pop01(t, P.t0 + 0.6, 0.3, 2), { size: 30, bg: MINT, rot: -0.04, ...M })
      bubble(x, 420, 590, 'FIRST!', pop01(t, P.t0 + 1.5, 0.25, 2.4), { size: 52, col: GOLD, tail: 'bc' })
    } },
  { sign: S, cap: 'Microwave says 1:00. | Aries opens at *0:03.*', mood: lt => lt > 1.0 ? 'happy' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.4, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      microwave(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      label(x, 790, 640, 'LUNCH: COLD. WORTH IT.', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 26, bg: SKYB, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'Team icebreaker? | Now it’s *a tournament.*', mood: lt => lt > 1.2 ? 'sparkle' : 'squint', look: [1, 0], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.9, 0.3, 2)
      drawBits(x, TROPHY, TROPHY_C, 790, 900, 26 * k)
      label(x, 790, 640, 'ROUND 1 OF 9', pop01(t, P.t0 + 0.3, 0.3, 2), { size: 34, bg: GOLD, rot: -0.05, ...M })
      if (k > 0.9) sparkles(x, t, 790, 900, P.t0 + 1.4, 6, 170, 0.2)
    } },
  { sign: S, cap: 'Took a day off. | *Emailed by 9am.*', mood: lt => lt > 1.1 ? 'wink' : 'sleepy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      phone(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
    } },
  { sign: S, cap: 'Typed so fast | the *keyboard quit.*', mood: lt => lt > 0.6 ? 'wide' : 'squint', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      keyboard(x, 760, 1000, pop01(t, P.t0 + 0.15, 0.3, 2), lt, t)
      label(x, 780, 640, '200 WORDS / MIN', pop01(t, P.t0 + 0.4, 0.3, 2), { size: 32, bg: RED, color: BONE, rot: 0.04, ...M })
    } },
  { sign: S, cap: 'New hire? | Asked their *sign first.*', mood: lt => lt > 1.4 ? 'heart' : 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 780, 660, 'hi! what’s | your sign?', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 44, col: BONE, tail: 'bl' })
      bubble(x, 790, 930, 'it’s my | first hour.', pop01(t, P.t0 + 1.0, 0.25, 2.2), { size: 36, col: LAV, tail: 'br' })
      label(x, 790, 1130, 'PROFILE: LOADING…', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 28, bg: MINT, rot: -0.04, ...M })
    } },
  { sign: S, cap: 'You had a bad day. | They *fought the printer.*', mood: lt => lt > 1.3 ? 'heart' : 'squint', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      const shake = lt < 1.0 ? Math.sin(t * 60) * 6 : 0
      drawBits(x, PRINTER, PRINTER_C, 790 + shake, 900, 24 * k)
      label(x, 790, 1130, 'PRINTER: DEFEATED', pop01(t, P.t0 + 1.1, 0.3, 2.4), { size: 32, bg: GOLD, rot: -0.06, ...M })
      hearts(x, t, 560, 1060, P.t0 + 1.4, { n: 5, life: 1.8, spread: 80, cell: 7, seed: 5 })
    } },
]

const F = makeFilm({
  id: 'r2t0361', key: 'C', accent: RED, solo: 'aries', ending: 'lesson',
  title: 'Your Aries coworker | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Already done. | *You’re welcome.*', mood: 'sparkle' },
  lesson: { text: 'Fast is how | they *show up.*', chip: 'TEAMWORK: FAST' },
  last: {
    text: 'The printer | *still fears them.*',
    draw(x, t, lt) { drawBits(x, PRINTER, PRINTER_C, 540 + (lt < 1.6 ? Math.sin(t * 50) * 4 : 0), 1290, 20 * pop01(t, t - lt + 0.5, 0.35, 2)) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
