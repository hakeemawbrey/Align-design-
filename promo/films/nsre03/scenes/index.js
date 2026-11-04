// nsre03: SILENT REVIEW, "Silent review: a calendar for next year." (18 s vertical trial reel, Silent Review Vol. 2
// ep 3, music: jazzy · E). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♑ Capricorn, who lives by a schedule, reviews a handmade calendar from ♊ Gemini. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a calendar for next year.*" Gemini is mid-slide with a spiral-bound calendar.
//   2.1–5.0    REACTION 1: "[ flips to the first page ]" → a loupe over the little plans: "[ eyebrow: *noted* ]".
//   5.0–7.9    REACTION 2: "[ approving nod ]" → the pages riffle, a doodled plan on every month: "[ every month has a *plan* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the last page: "whatever you want. I'm in." "[ reads the last page ]" →
//              "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Organisation ★★★★★ · Weekends ★★★★★ · Next year *sorted* · TOTAL 10/10. "*Booked*. Happily."
import { makeSilent, R, box, sparkles, hearts, drawBits, HEART, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl, INTER } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const DOODLE = ['#ff8fb1', '#5fd0c0', GOLD, '#9fd8ff', '#c7a6ff', '#9fe6b0']

/** which page is showing: −1 = cover, 0…11 = month, 12 = the last page */
function pageAt(t) {
  if (t < B[0][0] + 0.5) return -1
  if (t < B[1][0] + 1.85) return 0
  if (t < B[1][0] + 2.85) return Math.min(11, 1 + Math.floor((t - B[1][0] - 1.85) / 0.09))
  if (t < B[2][0] + 0.35) return 11
  return 12
}

function calendar(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const W = 300, H = 230
  x.save(); x.translate(g.x, g.y - 30); x.rotate(g.rot)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-W / 2 + 10, -H / 2 + 14, W, H)
  box(x, -W / 2, -H / 2, W, H, '#fbf3e2', { b: 6 })
  // spiral
  for (let i = 0; i < 9; i++) { R(x, INK, -W / 2 + 22 + i * 32, -H / 2 - 16, 10, 26); R(x, '#c9ccd8', -W / 2 + 24 + i * 32, -H / 2 - 14, 6, 22) }
  const pg = pageAt(t)
  x.textAlign = 'center'; x.textBaseline = 'middle'
  if (pg === -1) {
    R(x, '#5fd0c0', -W / 2 + 6, -H / 2 + 6, W - 12, H - 12)
    x.font = `800 34px ${INTER}`; x.fillStyle = INK; x.fillText('NEXT YEAR', 0, -20)
    drawBits(x, HEART, { H: RED }, 0, 34, 6)
  } else if (pg <= 11) {
    R(x, RED, -W / 2 + 6, -H / 2 + 6, W - 12, 40)
    x.font = `800 26px ${INTER}`; x.fillStyle = '#ffffff'; x.fillText(MONTHS[pg], 0, -H / 2 + 27)
    for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
      const cx = -W / 2 + 22 + c * 38, cy = -H / 2 + 62 + r * 38
      R(x, '#e4d8c2', cx, cy, 30, 30)
      // a plan on a weekend square of every month
      if (c >= 5 && (r + pg) % 3 === 1) { R(x, DOODLE[(pg + r) % DOODLE.length], cx + 3, cy + 3, 24, 24); drawBits(x, HEART, { H: RED }, cx + 15, cy + 15, 2.4, { outline: null }) }
    }
  } else {
    R(x, '#ffe7f0', -W / 2 + 6, -H / 2 + 6, W - 12, H - 12)
    scrawl(x, 'whatever you want.', 0, -36, { size: 36, col: '#2a2a6a' })
    scrawl(x, 'I’m in.', 0, 14, { size: 44, col: RED })
    drawBits(x, HEART, { H: RED }, 0, 66, 5)
  }
  x.restore()
  // the loupe over the plans (reaction 1)
  if (P.i === 0) {
    const lk = clamp(prog(P.u, 1.45, 1.65)) * (1 - clamp(prog(P.u, 2.7, 2.85)))
    if (lk > 0.01) {
      const lx = lerp(560, 640, ease.inOutQuad(prog(P.u, 1.5, 2.6))), ly = 1160 + 10 * Math.sin(P.u * 7)
      x.save(); x.globalAlpha = lk
      x.save(); x.translate(lx, ly); x.rotate(0.7); R(x, INK, 46, -12, 92, 24); R(x, '#6b4a2f', 50, -7, 84, 14); x.restore()
      x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 6; x.strokeStyle = GOLD; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(200,235,255,0.22)'; x.beginPath(); x.arc(lx, ly, 48, 0, Math.PI * 2); x.fill()
      x.restore()
    }
  }
  if (P.i === 1) sparkles(x, t, g.x, g.y - 40, B[1][0] + 2.85, 10, 150, 1, [GOLD, PINK, BONE])
  if (P.i === 2) hearts(x, t, B[2][0] + 0.5, g.x, g.y - 140, { n: 4, cell: 5, spread: 80, rise: 120 })
}

const EP = makeSilent({
  id: 'nsre03', reviewer: 'capricorn', giver: 'gemini', gift: 'a calendar for next year.', accent: PINK,
  hookCC: '[ checks the time ]', plate: 'CAPRICORN · CRITIC',
  beats: [
    { cc: [[0.45, '[ flips to the first page ]'], [1.75, '[ eyebrow: *noted* ]']], cues: [...STD_CUES[0], ['whoosh', 0.48, 0.2, 0.03]] },
    { cc: [[0.45, '[ approving nod ]'], [1.9, '[ every month has a *plan* ]']], cues: [...STD_CUES[1], ...Array.from({ length: 11 }, (_, i) => ['tick', +(1.85 + i * 0.09).toFixed(3), 0.025])] },
    { cc: [[0.45, '[ reads the last page ]'], [1.65, '[ a single tear ]']], cues: [...STD_CUES[2], ['whoosh', 0.33, 0.2, 0.03]] },
  ],
  face: stdFace({ inspect: [1.5, 2.8] }),
  desk: calendar,
  score: { rows: [['Organisation', 5], ['Weekends', 5], ['Next year', '*sorted*']], total: '10/10' },
  last: '*Booked*. Happily.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
