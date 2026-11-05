// kxsre06: SILENT REVIEW: EXTENDED, "Aries reviews ten claw-machine tries" (60 s vertical, star_talk post, chiptune · A).
// The format lives in ../../kxsre01/srkit.js. No end card, no card transition: hard cut on the last line.
// ♈ Aries, not allowed to talk, reviews an arcade date where ♋ Cancer tries to win it a plush from the claw machine.
//   0.0–3.0    HOOK: Cancer mid-slam on the claw button, the claw mid-drop, Aries mid-silent-scream, TRY 1/10.
//              "Aries can't talk. | *Aries can't win.*" record scratch: "wait for *try ten.*" ◀◀ REWIND
//   3.0–14.0   1 · TRIES 1–3: the claw drops the plush every time. [ silent scream ] [ fists clench ] → 3/10
//   14.0–25.0  2 · TRIES 4–6: Cancer won't give up, more coins. [ eyebrow: *respect* ] → 5/10
//   25.0–36.0  3 · TRIES 7–9: Aries cheers (silently), the arcade crowd gathers. → 8/10
//   36.0–48.5  4 · TRY 10: the claw lifts one tiny star plush; Cancer: "for you." [ a single tear ] → 10/10
//   48.5–60.0  THE VERDICT: Claw skill ★ · Not giving up ★★★★★ · The cheering ★★★★ · The tiny star *mine now* · 10/10.
//              "Ten tries. | One *tiny* star."
import { makeSR, R, box, label, glow, sparkles, hearts, prog, lerp, clamp, ease, pop01, outK, drawStarChar, signStar, drawPixelStar, INK, BONE, GOLD, PINK, RED, CREAM, DATE, REV, INTER } from '../../kxsre01/srkit.js'
import { achievement, achievementCues } from '../../hookkit.js'

const TRIES = [4.5, 7.0, 9.5, 15.5, 18.0, 20.5, 26.5, 29.0, 31.5, 38.5]
const WIN = TRIES[9]
const tryAt = t => t < 3.0 ? 1 : Math.max(1, TRIES.filter(c => t >= c - 0.3).length)
const CAB = { x: 600, top: 330, gl: [470, 370, 260, 330] }   // glass x, y, w, h

/** the claw's state at t: { y (0 top … 1 bottom), open, carry (plush with it), x offset } */
function clawAt(t) {
  let tc = -1e9
  for (const c of [-0.4, ...TRIES]) if (t >= c && c > tc) tc = c
  const u = t - tc
  if (tc === WIN && u >= 0) {
    if (u < 0.8) return { y: ease.inOutQuad(u / 0.8), open: 1, carry: 0, dx: 0 }
    if (u < 1.6) return { y: 1 - ease.inOutQuad((u - 0.8) / 0.8), open: 0, carry: 1, dx: 0 }
    if (u < 2.4) return { y: 0, open: 0, carry: 1, dx: -95 * ease.inOutCubic((u - 1.6) / 0.8) }
    return { y: 0, open: 1, carry: 0, dx: -95 + 95 * clamp((u - 2.6) / 1.5), won: true }
  }
  if (u < 0.8) return { y: ease.inOutQuad(u / 0.8), open: 1, carry: 0, dx: 0 }
  if (u < 1.6) { const k = (u - 0.8) / 0.8; return { y: 1 - ease.inOutQuad(k), open: 0, carry: k < 0.55 ? 1 : 0, drop: k >= 0.55 ? (k - 0.55) / 0.45 : 0, dx: 0 } }
  return { y: 0, open: 1, carry: 0, dx: 0 }
}

function plush(x, cx, cy, s = 1, t = 0) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  drawPixelStar(x, 0, 0, 60, 2, GOLD)
  R(x, INK, -9, -4, 5, 6); R(x, INK, 5, -4, 5, 6); R(x, '#ff8fb1', -14, 4, 6, 4); R(x, '#ff8fb1', 9, 4, 6, 4)
  x.restore()
}

function venue(x, t) {
  R(x, '#191233', -300, 300, 1680, 800); R(x, '#120c26', -300, 960, 1680, 110)
  // neon strips and other cabinets
  for (const [nx, col, rgb] of [[60, PINK, '255,143,177'], [1000, '#7fd0ff', '127,208,255']]) { glow(x, nx, 600, 200, rgb, 0.25); R(x, col, nx - 6, 340, 12, 560) }
  for (const cx of [170, 1030]) { box(x, cx - 90, 440, 180, 560, '#2b2160', { b: 8 }); R(x, '#0b0d22', cx - 70, 470, 140, 130); for (let i = 0; i < 4; i++) R(x, [GOLD, PINK, '#7fd0ff', '#9fe6b0'][i], cx - 60 + (i * 37 + Math.floor(t * 4) * 13) % 120, 490 + i * 25, 14, 14) }
  // the claw machine (centre, above the cast)
  const [gx, gy, gw, gh] = CAB.gl
  box(x, gx - 40, CAB.top, gw + 80, 520, '#e8443a', { b: 8, hi: '#ff6b5a' })
  R(x, GOLD, gx - 40, CAB.top, gw + 80, 24)
  R(x, INK, gx - 6, gy - 6, gw + 12, gh + 12); R(x, '#1a2550', gx, gy, gw, gh)
  // prize pile
  const pile = [[-90, 0, PINK], [-40, -10, '#7fd0ff'], [10, 2, '#9fe6b0'], [60, -8, GOLD], [100, 4, LAV()], [-60, 30, '#f2a65c'], [40, 28, PINK]]
  for (const [px, py, c] of pile) { R(x, INK, gx + gw / 2 + px - 24, gy + gh - 54 + py, 48, 44); R(x, c, gx + gw / 2 + px - 20, gy + gh - 50 + py, 40, 36) }
  const won = t >= WIN + 2.4
  if (!won) plush(x, gx + gw / 2 + 5 + clawAt(t).dx * (clawAt(t).carry ? 1 : 0), gy + gh - 70, 0.9)
  // the claw
  const c = clawAt(t), cxw = gx + gw / 2 + c.dx, cyw = lerp(gy + 20, gy + gh - 110, c.y)
  R(x, '#c9c9d9', cxw - 3, gy, 6, cyw - gy)
  box(x, cxw - 22, cyw, 44, 22, '#c9c9d9', { b: 4 })
  const op = c.open * 18
  for (const d of [-1, 1]) { x.save(); x.translate(cxw + d * 14, cyw + 22); x.rotate(d * (0.3 + op / 60)); R(x, INK, -5, 0, 10, 50); R(x, '#d8dde8', -2, 2, 4, 46); x.restore() }
  if (c.carry && !won) plush(x, cxw, cyw + 62, 0.9)
  if (c.drop > 0) plush(x, cxw, lerp(cyw + 62, gy + gh - 70, c.drop), 0.9)
  // glass shine
  R(x, 'rgba(255,255,255,0.12)', gx + 16, gy + 10, 18, gh - 20)
  glow(x, 540, 820, 520, '200,170,255', 0.1)
}
function LAV() { return '#c9a6ff' }

/** the crowd gathering behind (course 3 on) */
function crowd(x, t, t0) {
  const ids = ['gemini', 'leo', 'virgo', 'libra']
  ids.forEach((id, i) => {
    const k = pop01(t, t0 + 4.8 + i * 0.25, 0.3, 2.2)
    if (k <= 0.01) return
    const S = signStar(id)
    drawStarChar(x, [90, 270, 900, 1010][i], 960, 120, t, { color: S.color, mood: 'happy', look: [i < 2 ? 1 : -1, -1], pop: k, seed: 11 + i, hops: [t0 + 6.0 + i * 0.2, t0 + 7.8, t0 + 8.4] })
  })
}

const ACH = { at: WIN + 2.7, out: [WIN + 5.0, WIN + 5.3], text: 'won a *tiny star.*', y: 1360 }

const EP = makeSR({
  id: 'kxsre06', reviewer: 'aries', date: 'cancer', accent: GOLD,
  hookLine: 'Aries can’t talk. | *Aries can’t win.*',
  promise: 'wait for *try ten.*',
  plate: 'ARIES · CRITIC', cloth: '#2b2160', check: '#3a2d80',
  venue,
  hook: { circle: { x: 345, y: 905, r: 120 } },
  hookFace: (t) => ({ mood: 'wide', brows: { l: 1, r: 1, sl: 0.6, sr: 0.6 }, mouth: 'scream', shake: 5, look: [1, -1] }),
  hookDate: (t) => ({ mood: 'wide', look: [-1, -1], hops: [0.1, 0.4], squash: 0.08 }),
  courses: [
    { title: 'TRIES 1–3',
      shots: [[0, 'wide'], [2.6, 'rev'], [4.0, 'wide'], [7.4, 'tight']],
      cc: [[0.3, '[ supportive silence ]'], [2.6, '[ silent scream ]'], [5.0, '[ fists clench ]'], [7.4, '[ *louder* silent scream ]']],
      face: [[0, 'poker'], [2.6, 'scream'], [3.6, 'clench'], [5.2, 'clench'], [7.4, 'scream']],
      date: (u, t, t0) => ({ mood: u > 2.8 ? 'wide' : 'happy', look: [-1, -1], hops: [t0 + 1.4, t0 + 3.9, t0 + 6.4] }),
      bubbles: [[3.2, 4.4, 'so close!'], [7.6, 8.8, 'one more.']],
      card: '3/10', pis: { at: 1.0, tears: 1, mood: 'wide' },
      cues: [] },
    { title: 'TRIES 4–6',
      shots: [[0, 'wide'], [2.4, 'rev'], [5.0, 'wide'], [7.4, 'rev']],
      cc: [[0.3, '[ counts the coins left ]'], [2.4, '[ eyebrow: *respect* ]'], [5.0, '[ starts hoping ]'], [7.4, '[ leaning in ]']],
      face: [[0, 'squint'], [2.4, 'eyebrow'], [5.0, 'wide'], [7.4, 'tilt']],
      date: (u, t, t0) => ({ mood: 'happy', look: [-1, -1], hops: [t0 + 0.5, t0 + 1.4, t0 + 3.9, t0 + 6.4] }),
      bubbles: [[0.5, 2.3, 'i’m not giving up on this one']],
      draw(x, t, P) { if (P.u < 1.6) sparkles(x, t, DATE.x - 80, 1000, P.t0 + 0.4, 8, 60, 1, [GOLD, BONE]) },
      card: '5/10', pis: { at: 0.6, tears: 2 },
      cues: [['pop', 0.4, 1760, 0.03, 0.3], ['pop', 0.5, 2093, 0.025, 0.3]] },
    { title: 'TRIES 7–9',
      shots: [[0, 'wide'], [3.0, 'rev'], [4.6, 'wide'], [7.6, 'tight']],
      cc: [[0.3, '[ silently cheering ]'], [3.0, '[ *aggressively* silent cheering ]'], [5.6, '[ the crowd joins in ]'], [7.6, '[ so. close. ]']],
      face: [[0, 'cheer'], [4.0, 'cheer'], [6.5, 'scream'], [7.6, 'clench']],
      date: (u, t, t0) => ({ mood: 'happy', look: [-1, -1], hops: [t0 + 1.4, t0 + 3.9, t0 + 6.4] }),
      draw(x, t, P) { crowd(x, t, P.t0) },
      card: '8/10', pis: { at: 0.5, tears: 2 },
      cues: [['pop', 4.85, 880, 0.03, -0.4], ['pop', 5.1, 987.77, 0.03, -0.2], ['pop', 5.35, 1174.66, 0.03, 0.2], ['pop', 5.6, 1318.51, 0.03, 0.4]] },
    { title: 'TRY 10',
      shots: [[0, 'wide'], [2.6, 'rev'], [4.4, 'wide'], [6.2, 'rev'], [7.6, 'tight'], [10.0, 'wide']],
      cc: [[0.3, '[ the last coin ]'], [2.6, '[ holding its breath ]'], [4.4, '[ IT’S UP ]'], [6.2, '[ a tiny star. *for me.* ]'], [7.6, '[ a single tear ]'], [10.0, '[ never letting go ]']],
      face: [[0, 'clench'], [2.6, 'blink'], [4.4, 'scream'], [6.2, 'touched'], [7.6, 'tear'], [10.0, 'grin']],
      date: (u, t, t0) => ({ mood: u > 5.6 ? 'heart' : 'happy', look: u > 5.6 ? [-1, 0] : [-1, -1], hops: [t0 + 1.4, t0 + 4.5, t0 + 4.9, t0 + 5.6] }),
      bubbles: [[5.6, 7.4, 'for you.']],
      draw(x, t, P) {
        crowd(x, t, P.t0 - 6)
        if (P.u > 5.6) { const k = pop01(t, P.t0 + 5.6, 0.3, 2.4); plush(x, lerp(DATE.x - 80, REV.x + 150, ease.inOutCubic(prog(P.u, 5.6, 6.2))), 1110, 1.3 * k, t) }
        if (P.u > 4.4) sparkles(x, t, 600, 600, P.t0 + 4.4, 12, 160, 1)
      },
      card: '10/10', pis: { at: 0.4, tears: 3 },
      cues: [['riser', 1.0, 1.5, 0.03], ['bell', 7.6, 2637.02, 0.026, 1.8, -0.2], ['glitter', 10.0, 10.5]] },
  ],
  table(x, t, P) { if (P.ph === 'verdict' || (P.ph === 'course' && P.i === 3 && P.u > 6.2)) plush(x, REV.x + 150, 1110, 1.3, t) },
  over(tx, t, P) {
    if (P.ph === 'verdict') return
    const n = tryAt(t), last = Math.max(-9, ...TRIES.filter(c => t >= c - 0.3))
    const fl = t < 3 ? 1 : clamp(1 - (t - last + 0.3) / 0.6)
    tx.save(); tx.translate(1010, t < 3 ? 500 : 225); tx.scale(1 + 0.2 * fl, 1 + 0.2 * fl)
    tx.font = `800 44px ${INTER}`; tx.textAlign = 'right'; tx.textBaseline = 'middle'
    const s = `TRY ${n}/10`, w = tx.measureText(s).width + 40
    box(tx, -w, -36, w, 72, fl > 0.3 ? '#2fae6a' : 'rgba(16,9,38,0.92)', { b: 5 })
    tx.fillStyle = BONE; tx.fillText(s, -20, 2)
    tx.restore()
  },
  fx: [{ scene: achievement(ACH), cues: achievementCues(ACH) }],
  verdict: { rows: [['Claw skill', 1], ['Not giving up', 5], ['The cheering', 4], ['The tiny star', '*mine now*']], total: '10/10' },
  verdictDate: (t) => ({ mood: t > 55.3 ? 'heart' : 'happy', look: [-1, 0], hops: [55.3, 55.8, 56.7] }),
  last: 'Ten tries. | One *tiny* star.',
  hookCues: [['tick', 0.05, 0.08], ['pop', 0.1, 880, 0.035, 0]],
  extraCues: TRIES.flatMap((c, i) => [['tick', c - 0.3, 0.07], ['whoosh', c, 0.8, 0.02], ['pop', c + 0.8, 659.25, 0.03, 0], ...(i < 9 ? [['pop', c + 1.25, 440, 0.035, 0]] : [['pop', c + 0.9, 1318.51, 0.04, 0], ['glitter', c + 0.9, c + 1.5]])]),
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, hearts, outK, RED, CREAM, PINK]
