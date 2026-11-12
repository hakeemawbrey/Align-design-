// r2t0286: star_talk, SOLO, "Virgos making plans | *be like.*" (~51 s vertical, signs3kit social cut, music: lofi · C)
// One sign the whole film (makeFilm solo mode, 9 cards). Ending: lesson.
//   0.0–3.6    "Virgos making plans | *be like.*"  One big Virgo pops in, then dives away.
//   3.6–37.8   nine plans, each pushed to the extreme:
//              trip itinerary, version 14 · planned being spontaneous (8:15 sharp) · colour-coded the colour key
//              · plan B, plan C… plan Q · you cancelled, they had a page for that · matched, sent an agenda
//              · weekend away, every sock labelled · your surprise party has a run sheet · napped two minutes late
//  37.8        "A plan | *for the plan.*"
//  41.0        LESSON: "They plan because | they *care.*"  ITINERARY: LOVED
//  46.9        "See you at | *10:41 sharp.*" (the itinerary's arrival time, paid off)
import { prog, lerp, ease, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, pop01,
  GOLD, BONE, PINK, INK, MINT, LAV, SKYB, INTER, MONO,
} from '../../signs3kit.js'

const GREEN = '#7ed99a', RED = '#e23d4e', ORANGE = '#ffb34a'

// ── props
/** a sheet of paper (clipboard optional) with a header and rows of mono text that appear one by one */
function sheet(x, cx, cy, k, lt, { w = 330, h = 420, head = '', headCol = MINT, rows = [], at = 0.4, gap = 0.18, clip = true, rot = 0.04, size = 24 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-w / 2 + 8, -h / 2 + 10, w, h)
  if (clip) { x.fillStyle = INK; x.fillRect(-w / 2 - 12, -h / 2 - 12, w + 24, h + 24); x.fillStyle = '#c98f5a'; x.fillRect(-w / 2 - 6, -h / 2 - 6, w + 12, h + 12) }
  x.fillStyle = INK; x.fillRect(-w / 2 - 4, -h / 2 - 4, w + 8, h + 8)
  x.fillStyle = '#fff8ea'; x.fillRect(-w / 2, -h / 2, w, h)
  if (clip) { x.fillStyle = INK; x.fillRect(-56, -h / 2 - 26, 112, 40); x.fillStyle = '#9aa5c4'; x.fillRect(-48, -h / 2 - 20, 96, 28) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  if (head) { x.fillStyle = headCol; x.fillRect(-w / 2 + 16, -h / 2 + 22, w - 32, 48); x.fillStyle = INK; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.fillText(head, 0, -h / 2 + 47); x.textAlign = 'left' }
  rows.forEach((r, i) => {
    const a = clamp((lt - at - i * gap) / 0.15)
    if (a <= 0) return
    x.globalAlpha = a
    const [txt, col] = Array.isArray(r) ? r : [r, INK]
    x.fillStyle = col; x.font = `700 ${size}px ${MONO}`; x.fillText(txt, -w / 2 + 22, -h / 2 + 104 + i * (size + 16))
    x.globalAlpha = 1
  })
  x.restore()
}

/** a month calendar: a grid of colour-coded days, plus a legend that is ALSO colour-coded */
function calendar(x, cx, cy, k, lt) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.03); x.scale(k, k)
  const W = 340, H = 300
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-W / 2 + 8, -H / 2 + 10, W, H)
  x.fillStyle = INK; x.fillRect(-W / 2 - 5, -H / 2 - 5, W + 10, H + 10)
  x.fillStyle = '#fff8ea'; x.fillRect(-W / 2, -H / 2, W, H)
  x.fillStyle = RED; x.fillRect(-W / 2, -H / 2, W, 50)
  x.fillStyle = '#fff8ea'; x.font = `700 26px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('MONTH', 0, -H / 2 + 26)
  const COLS = [MINT, PINK, SKYB, GOLD, LAV, ORANGE]
  const n = Math.floor(clamp((lt - 0.3) / 1.0) * 28)
  for (let d = 0; d < 28; d++) {
    const cxx = -W / 2 + 20 + (d % 7) * 44, cyy = -H / 2 + 66 + Math.floor(d / 7) * 54
    x.fillStyle = '#e8dcc6'; x.fillRect(cxx, cyy, 38, 46)
    if (d < n) { x.fillStyle = COLS[(d * 5 + Math.floor(d / 3)) % 6]; x.fillRect(cxx, cyy, 38, 46) }
  }
  x.restore()
}

/** the stack of backup plans: cards fan out and the top letter counts A → Q */
function plans(x, t, cx, cy, k, lt) {
  if (k <= 0.01) return
  const n = Math.min(16, Math.floor(Math.max(0, lt - 0.35) / 0.09))        // 0 → A … 16 → Q
  x.save(); x.translate(cx, cy); x.scale(k, k)
  const COLS = [MINT, PINK, SKYB, GOLD, LAV]
  for (let i = Math.min(4, n); i >= 0; i--) {
    x.save(); x.translate(i * 16, -i * 14); x.rotate(0.05 - i * 0.05)
    x.fillStyle = INK; x.fillRect(-124, -154, 248, 308)
    x.fillStyle = COLS[(n - i + 50) % 5]; x.fillRect(-118, -148, 236, 296)
    if (i === 0) {
      x.fillStyle = INK; x.font = `700 34px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('PLAN', 0, -78)
      x.font = `800 150px ${INTER}`; x.fillText(String.fromCharCode(65 + n), 0, 42)
    }
    x.restore()
  }
  x.restore()
}

const SOCK = ['.WWWW.', '.WWWW.', '.SSSS.', '.SSSS.', '.SSSS.', '.SSSS.', '.SSSSSS', '.SSSSSSS', '..SSSSS']
/** a little hanging tag with a word on it */
function tag(x, cx, cy, k, text, bg) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.12); x.scale(k, k)
  x.font = `700 22px ${MONO}`; const w = x.measureText(text).width + 22
  x.strokeStyle = BONE; x.lineWidth = 3; x.beginPath(); x.moveTo(0, -30); x.lineTo(0, -14); x.stroke()
  x.fillStyle = INK; x.fillRect(-w / 2 - 3, -17, w + 6, 40); x.fillStyle = bg; x.fillRect(-w / 2, -14, w, 34)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(text, 0, 4)
  x.restore()
}

/** a phone with a match chat: bubbles appear in turn */
function phone(x, cx, cy, k, { head = '', headCol = MINT, lines = [] } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(0.05); x.scale(k, k)
  x.fillStyle = 'rgba(6,4,18,0.45)'; x.fillRect(-122, -192, 256, 400)
  x.fillStyle = INK; x.fillRect(-134, -204, 268, 408)
  x.fillStyle = '#2a2350'; x.fillRect(-124, -194, 248, 388)
  x.fillStyle = '#140c30'; x.fillRect(-112, -170, 224, 340)
  if (head) { x.fillStyle = headCol; x.fillRect(-100, -156, 200, 46); x.fillStyle = INK; x.font = `700 22px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(head, 0, -132) }
  x.textAlign = 'left'; x.textBaseline = 'middle'
  lines.forEach(([txt, col, kk], i) => {
    if (kk <= 0.01) return
    x.save(); x.translate(-96, -76 + i * 52); x.scale(kk, kk)
    x.font = `700 22px ${MONO}`; const w = x.measureText(txt).width + 22
    x.fillStyle = col; x.fillRect(0, -20, w, 40); x.fillStyle = INK; x.fillText(txt, 11, 2)
    x.restore()
  })
  x.restore()
}

/** a round wall clock, hands at h:m */
function clock(x, cx, cy, r, k, h, m) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, r + 8, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#fff8ea'; x.beginPath(); x.arc(0, 0, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; x.fillRect(Math.cos(a) * r * 0.82 - 4, Math.sin(a) * r * 0.82 - 4, 8, 8) }
  const am = m / 60 * Math.PI * 2 - Math.PI / 2, ah = (h % 12 + m / 60) / 12 * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'round'
  x.lineWidth = 10; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(ah) * r * 0.5, Math.sin(ah) * r * 0.5); x.stroke()
  x.lineWidth = 6; x.strokeStyle = RED; x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.cos(am) * r * 0.78, Math.sin(am) * r * 0.78); x.stroke()
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 9, 0, Math.PI * 2); x.fill()
  x.restore()
}

const S = 'virgo'
const CAMEOS = [
  { sign: S, cap: 'Made the trip itinerary. | *Version 14.*', mood: lt => lt > 1.6 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      sheet(x, 790, 880, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { head: 'ITINERARY', rows: ['10:41 ARRIVE', '10:43 BREATHE', '10:44 BRUNCH', '11:52 WALK (FUN)', '12:10 RECAP'], at: 0.4, gap: 0.16 })
      label(x, 800, 600, 'v14 · FINAL · FINAL', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 30, bg: GOLD, rot: -0.05, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Planned being spontaneous. | *8:15 sharp.*', mood: lt => lt > 1.3 ? 'sparkle' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.4],
    front(x, t, lt, P) {
      clock(x, 790, 820, 150, pop01(t, P.t0 + 0.2, 0.3, 2), 8, 10 + Math.min(5, Math.floor(Math.max(0, lt - 0.4) * 4)))
      label(x, 790, 1100, 'SPONTANEITY: 8:15–8:30', pop01(t, P.t0 + 1.3, 0.3, 2.2), { size: 28, bg: PINK, rot: 0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Colour-coded the calendar. | Then *the key.*', mood: lt => lt > 1.7 ? 'happy' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      calendar(x, 790, 790, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      sheet(x, 790, 1060, pop01(t, P.t0 + 1.4, 0.3, 2.2), lt, { w: 330, h: 230, clip: false, rot: -0.06, size: 24, rows: [['■ KEY FOR THE KEY', '#3d8fd8'], ['■ MINT = MINT', '#2f9a5a'], ['■ PINK = PINK', '#d84f86']], at: 1.5, gap: 0.12 })
    } },
  { sign: S, cap: 'Plan B. Plan C. | Plan *Q.*', mood: lt => lt > 1.9 ? 'wink' : 'wide', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      plans(x, t, 780, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt)
      if (lt > 1.9) sparkles(x, t, 780, 860, P.t0 + 1.9, 6, 170, 0.3)
    } },
  { sign: S, cap: 'Cancelled at six? | They had *a page for that.*', mood: lt => lt > 1.4 ? 'wink' : 'neutral', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      bubble(x, 760, 620, 'so sorry, | can’t make it!', pop01(t, P.t0 + 0.25, 0.25, 2.2), { size: 34, tail: 'br' })
      sheet(x, 800, 960, pop01(t, P.t0 + 0.9, 0.3, 2), lt, { w: 320, h: 260, clip: false, head: 'IF CANCELLED', headCol: GOLD, rows: ['→ SEE PAGE 3', '→ SOUP + SHOW', '→ ALREADY BOOKED'], at: 1.1, gap: 0.18, rot: 0.05 })
    } },
  { sign: S, cap: 'Matched with you. | Sent *an agenda.*', mood: lt => lt > 1.6 ? 'heart' : 'happy', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const k = pop01(t, P.t0 + 0.2, 0.3, 2)
      phone(x, 790, 860, k, { head: 'IT’S A MATCH', headCol: PINK, lines: [
        ['hi!', BONE, pop01(t, P.t0 + 0.5, 0.25, 2.2)],
        ['AGENDA:', GOLD, pop01(t, P.t0 + 0.9, 0.25, 2.2)],
        ['1. coffee 2:00', MINT, pop01(t, P.t0 + 1.15, 0.25, 2.2)],
        ['2. walk 2:45', MINT, pop01(t, P.t0 + 1.4, 0.25, 2.2)],
        ['3. Q&A 3:10', MINT, pop01(t, P.t0 + 1.65, 0.25, 2.2)],
      ] })
      hearts(x, t, 560, 760, P.t0 + 2.0, { n: 4, life: 1.4, spread: 120, cell: 7, seed: 4 })
    } },
  { sign: S, cap: 'Weekend away. | *Labelled* every sock.', mood: lt => lt > 1.6 ? 'sparkle' : 'squint', look: [1, 0], star: { x: -170 },
    front(x, t, lt, P) {
      const COLS = [[MINT, 'SAT AM'], [PINK, 'SAT PM'], [SKYB, 'SUN AM'], [GOLD, 'SUN PM']]
      COLS.forEach(([c, txt], i) => {
        const k = pop01(t, P.t0 + 0.25 + i * 0.25, 0.3, 2)
        const sx = 640 + (i % 2) * 190, sy = 760 + Math.floor(i / 2) * 260
        drawBits(x, SOCK, { W: BONE, S: c }, sx, sy, 16 * k, { rot: 0.08 * (i % 2 ? 1 : -1) })
        tag(x, sx + 40, sy + 60, pop01(t, P.t0 + 0.6 + i * 0.25, 0.3, 2.2), txt, BONE)
      })
    } },
  { sign: S, cap: 'Your surprise party. | Has *a run sheet.*', mood: lt => lt > 1.5 ? 'happy' : 'neutral', look: [1, 0], star: { x: -170 }, hops: [1.6],
    front(x, t, lt, P) {
      sheet(x, 790, 860, pop01(t, P.t0 + 0.2, 0.3, 2), lt, { head: 'SURPRISE!', headCol: PINK, rows: ['7:00 LIGHTS OFF', '7:01 HIDE', '7:02 “SURPRISE!”', '7:03 ACT NATURAL', '7:04 CAKE'], at: 0.4, gap: 0.16 })
      label(x, 790, 1130, 'REHEARSED: 3×', pop01(t, P.t0 + 1.4, 0.3, 2.2), { size: 32, bg: MINT, rot: -0.04, font: MONO, weight: 700 })
    } },
  { sign: S, cap: 'Scheduled a nap. | Was *two minutes late.*', mood: lt => lt > 1.2 ? 'squint' : 'sleepy', look: [1, 0], star: { x: -170 },
    keyCue: t0 => ['pluck', t0 + 1.2, 1318.51, 0.02, 0.5, 0],
    front(x, t, lt, P) {
      clock(x, 790, 800, 140, pop01(t, P.t0 + 0.2, 0.3, 2), 3, lt > 1.0 ? 2 : 0)
      label(x, 790, 1060, lt > 1.0 ? 'NAP: 3:02 (LATE)' : 'NAP: 3:00', pop01(t, P.t0 + 0.5, 0.3, 2), { size: 32, bg: lt > 1.0 ? RED : LAV, color: lt > 1.0 ? BONE : INK, rot: 0.04, font: MONO, weight: 700 })
      bubble(x, 520, 600, 'unacceptable.', pop01(t, P.t0 + 1.5, 0.25, 2.2), { size: 38, col: LAV, tail: 'bl' })
    } },
]

const F = makeFilm({
  id: 'r2t0286', key: 'C', accent: GREEN, solo: 'virgo', ending: 'lesson',
  title: 'Virgos making plans | *be like.*',
  cameos: CAMEOS,
  group: { cap: 'A plan | *for the plan.*', mood: 'sparkle' },
  lesson: { text: 'They plan because | they *care.*', chip: 'ITINERARY: LOVED' },
  last: {
    text: 'See you at | *10:41 sharp.*',
    draw(x, t, lt) { hearts(x, t, 540, 1250, t - lt + 0.3, { n: 8, life: 2.2, spread: 700, cell: 8, seed: 3 }) },
  },
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const T = F.T
