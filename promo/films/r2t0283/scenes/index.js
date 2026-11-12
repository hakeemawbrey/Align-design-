// r2t0283: star_talk, SOLO (virgo), "Virgos as your boss | be like." (~48 s vertical, signs3kit social cut, lofi · G)
// One Virgo, nine boss moments, each the most extreme (and well-meaning) Virgo version.
//   0.0–3.6    "Virgos as | your boss *be like.*"
//   3.6–37.8   nine cards: one typo, a meeting · forty sticky notes of feedback · colour-coded the colour codes · "quick
//              chat", 47 slides · straightened your desk while you talked · cut the cake with a ruler · "great job" with
//              footnotes · on holiday, still sent the agenda · proofread your birth chart
//  37.8        "Strict? | *Secretly proud.*"
//  41.0        LESSON UNLOCKED: "Picky means they | *believe in you.*"  STATUS: MENTORED
//  46.9        "Great work. | *Now fix the font.*"
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import { makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO } from '../../signs3kit.js'
import { card, txt, phone, chart, CREAM, RED, GREY, DEEP, GREEN, WOOD, ORANGE } from './props.js'

const ACC = '#a8f0c0'
const ST = { x: -170 }
const NOTE_COLS = [GOLD, PINK, MINT, SKYB, LAV, ORANGE]
const CAKE = ['PPPPPPPPPPPP', 'PWPWPWPWPWPW', 'PPPPPPPPPPPP', 'SSSSSSSSSSSS', 'SWSSWSSWSSWS', 'SSSSSSSSSSSS']
const CAKE_C = { P: PINK, W: '#fff', S: '#c98f6a' }

/** an email card with one word circled in red */
function email(x, cx, cy, k, lt) {
  card(x, cx, cy, 340, 260, k, { bg: CREAM, rot: -0.03 }, () => {
    x.fillStyle = LAV; x.fillRect(-170, -130, 340, 50)
    txt(x, 'RE: update', 0, -104, { size: 28, font: MONO, weight: 700 })
    txt(x, 'Thanks for', -140, -40, { size: 30, align: 'left', weight: 700 })
    txt(x, 'the reprot!', -140, 10, { size: 30, align: 'left', weight: 700 })
    txt(x, '— you', -140, 70, { size: 26, align: 'left', weight: 700, color: '#6b62a8' })
    if (lt > 0.6) { x.strokeStyle = RED; x.lineWidth = 6; x.beginPath(); x.ellipse(-20, 10, 70 * clamp((lt - 0.6) / 0.2), 30, -0.05, 0, Math.PI * 2 * clamp((lt - 0.6) / 0.3)); x.stroke() }
  })
}
/** a document slowly buried in sticky notes */
function stickies(x, cx, cy, k, lt) {
  card(x, cx, cy, 300, 380, k, { bg: '#ffffff', rot: 0.03 }, () => {
    x.fillStyle = '#c3cbe0'; for (let i = 0; i < 9; i++) x.fillRect(-120, -150 + i * 34, 200 + (i % 3) * 20, 10)
    const n = Math.floor(clamp((lt - 0.4) / 1.4) * 16)
    for (let i = 0; i < n; i++) {
      const px = -110 + ((i * 73) % 220), py = -150 + ((i * 131) % 300)
      x.save(); x.translate(px, py); x.rotate(((i * 37) % 7 - 3) * 0.05)
      x.fillStyle = INK; x.fillRect(-36, -36, 72, 72); x.fillStyle = NOTE_COLS[i % NOTE_COLS.length]; x.fillRect(-32, -32, 64, 64)
      x.fillStyle = INK; x.fillRect(-20, -10, 40, 5); x.fillRect(-20, 4, 28, 5)
      x.restore()
    }
  })
}
/** a calendar grid of coloured blocks plus a legend for the legend */
function colourCal(x, cx, cy, k, lt) {
  card(x, cx, cy, 340, 360, k, { bg: CREAM, rot: -0.03 }, () => {
    txt(x, 'WEEK', 0, -150, { size: 28, font: MONO, weight: 700 })
    const C = [RED, ORANGE, GOLD, GREEN, SKYB, LAV, PINK]
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5; c++) {
      if (lt < 0.3 + (r * 5 + c) * 0.04) continue
      x.fillStyle = C[(r * 2 + c) % C.length]; x.fillRect(-150 + c * 60, -115 + r * 54, 52, 46)
    }
    txt(x, 'key → see key #2', 0, 130, { size: 22, font: MONO, weight: 700, color: '#6b62a8' })
  })
}
/** a slide deck */
function slides(x, cx, cy, k, n) {
  card(x, cx, cy, 380, 250, k, { bg: '#ffffff', rot: 0.03 }, () => {
    x.fillStyle = MINT; x.fillRect(-190, -125, 380, 54)
    txt(x, 'QUICK CHAT', 0, -97, { size: 30, font: MONO, weight: 700 })
    x.fillStyle = LAV; x.fillRect(-150, -40, 120, 120); x.fillStyle = GOLD; x.fillRect(-150, 10, 120, 70)
    x.fillStyle = '#c3cbe0'; for (let i = 0; i < 4; i++) x.fillRect(0, -40 + i * 32, 140, 12)
    txt(x, `${n} / 47`, 120, 100, { size: 24, font: MONO, weight: 700 })
  })
}

const CAMEOS = [
  { sign: 'virgo', cap: 'One typo in your email. | *Meeting at nine.*', mood: lt => lt > 1.2 ? 'squint' : 'neutral', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      email(x, 790, 830, pop01(t, P.t0 + 0.2, 0.35, 2), lt)
      label(x, 790, 1060, 'MEETING: 9:00', pop01(t, P.t0 + 1.3, 0.3, 2.4), { size: 36, bg: RED, color: '#fff4e2', rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Feedback on your work? | *Forty sticky notes.*', mood: 'sparkle', look: [1, 0], star: ST,
    front(x, t, lt, P) { stickies(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'virgo', cap: 'Colour-coded | the *colour codes.*', mood: lt => lt > 1.3 ? 'sparkle' : 'happy', look: [1, 0], star: ST, hops: [1.4],
    front(x, t, lt, P) { colourCal(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), lt) } },
  { sign: 'virgo', cap: 'Asked for a "quick chat." | *Brought slides.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      const n = 1 + Math.floor(clamp((lt - 0.6) / 1.4) * 2)
      slides(x, 790, 860, pop01(t, P.t0 + 0.2, 0.35, 2), n)
      label(x, 790, 650, '“this won’t take long”', pop01(t, P.t0 + 0.9, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.04 })
    } },
  { sign: 'virgo', cap: 'Straightened your desk | *while you talked.*', mood: lt => lt > 1.4 ? 'sparkle' : 'squint', look: [1, 1], star: ST,
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.35, 2)
      card(x, 790, 1010, 380, 60, k, { bg: WOOD, rot: 0 })
      const a = ease.inOutCubic(prog(lt, 0.7, 1.4))
      const C = [RED, GOLD, SKYB, MINT, PINK]
      for (let i = 0; i < 5; i++) {
        const ang = lerp([0.6, -0.4, 1.1, -0.9, 0.3][i], 0, a), px = lerp(680 + [0, 70, 30, 150, 110][i] * 1.4, 680 + i * 55, a)
        if (k > 0.01) { x.save(); x.translate(px, 900); x.rotate(ang); x.fillStyle = INK; x.fillRect(-12, -82, 24, 164); x.fillStyle = C[i]; x.fillRect(-8, -78, 16, 156); x.restore() }
      }
      bubble(x, 600, 640, '…so anyway', pop01(t, P.t0 + 0.4, 0.25, 2.2), { size: 32, col: LAV, tail: 'br' })
      label(x, 860, 680, 'ALIGNED.', pop01(t, P.t0 + 1.5, 0.3, 2.4), { size: 36, bg: MINT, rot: 0.05, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Office birthday cake? | *Cut with a ruler.*', mood: 'sparkle', look: [1, 1], star: ST, hops: [1.3],
    front(x, t, lt, P) {
      drawBits(x, CAKE, CAKE_C, 790, 990, 22 * pop01(t, P.t0 + 0.2, 0.35, 2))
      const r = ease.outBack(prog(lt, 0.6, 1.0))
      if (r > 0.01) card(x, 790, lerp(700, 900, r), 300, 44, 1, { bg: GOLD, rot: 0 }, () => { x.fillStyle = INK; for (let i = 0; i < 13; i++) x.fillRect(-140 + i * 23, -22, 4, i % 2 ? 12 : 22) })
      if (lt > 1.1) { x.fillStyle = INK; for (let i = 1; i < 6; i++) x.fillRect(658 + i * 44, 924, 4, 132 * clamp((lt - 1.1) / 0.4)) }
      label(x, 790, 1150, 'EXACTLY 4.4 CM', pop01(t, P.t0 + 1.5, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.03, font: MONO, weight: 700 })
    } },
  { sign: 'virgo', cap: 'Said "great job!" | *with footnotes.*', mood: 'happy', look: [1, 0], star: ST,
    front(x, t, lt, P) {
      bubble(x, 790, 680, 'great job!*', pop01(t, P.t0 + 0.3, 0.25, 2.2), { size: 48, col: MINT, tail: 'bl' })
      card(x, 800, 960, 340, 210, pop01(t, P.t0 + 0.9, 0.35, 2), { bg: CREAM, rot: 0.03 }, () => {
        ;['*see notes', '**and slide 9', '***still great!'].forEach((s, i) => { if (lt > 1.0 + i * 0.25) txt(x, s, -150, -60 + i * 56, { size: 28, align: 'left', font: MONO, weight: 700 }) })
      })
    } },
  { sign: 'virgo', cap: 'On holiday. | *Still sent the agenda.*', mood: lt => lt > 1.2 ? 'sparkle' : 'happy', look: [1, 0], star: ST,
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    back(x, t, lt, P) { x.save(); x.globalAlpha = 0.45 * clamp(lt / 0.5); x.fillStyle = '#ffd27a'; x.beginPath(); x.arc(860, 640, 90, 0, Math.PI * 2); x.fill(); x.restore() },
    front(x, t, lt, P) {
      phone(x, 790, 900, pop01(t, P.t0 + 0.2, 0.35, 2), { head: 'FROM: THE BEACH', headCol: SKYB, lines: [['AGENDA (v4)', GOLD, pop01(t, P.t0 + 0.5, 0.25, 2)], ['1. sunscreen', MINT, pop01(t, P.t0 + 0.8, 0.25, 2)], ['2. your report', PINK, pop01(t, P.t0 + 1.1, 0.25, 2)], ['3. relax (10 min)', LAV, pop01(t, P.t0 + 1.4, 0.25, 2)]], size: 22 })
    } },
  { sign: 'virgo', cap: 'Your birth chart? | *They proofread it.*', mood: lt => lt > 1.2 ? 'squint' : 'happy', look: [1, 0], star: ST, hops: [1.6],
    front(x, t, lt, P) {
      chart(x, 790, 880, 170, pop01(t, P.t0 + 0.2, 0.35, 2), t, 0.1)
      if (lt > 0.7) { x.save(); x.strokeStyle = RED; x.lineWidth = 8; x.beginPath(); x.arc(860, 810, 44, 0, Math.PI * 2 * clamp((lt - 0.7) / 0.3)); x.stroke(); x.restore() }
      label(x, 790, 1110, 'NOTE: SEE ME', pop01(t, P.t0 + 1.2, 0.3, 2.4), { size: 34, bg: RED, color: '#fff4e2', rot: -0.04, font: MONO, weight: 700 })
    } },
]

const F = makeFilm({
  id: 'r2t0283', key: 'G', accent: ACC, solo: 'virgo', ending: 'lesson',
  title: 'Virgos as | your boss *be like.*',
  cameos: CAMEOS,
  group: { cap: 'Strict? | *Secretly proud.*', mood: 'sparkle' },
  lesson: { text: 'Picky means they | *believe in you.*', chip: 'STATUS: MENTORED' },
  last: { text: 'Great work. | *Now fix the font.*' },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
