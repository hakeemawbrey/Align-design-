// nsre02: SILENT REVIEW, "Silent review: a homemade snow globe." (20 s vertical trial reel, Silent Review Vol. 2 ep 2,
// music: jazzy · D). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♏ Scorpio, intense and unreadable, reviews a homemade snow globe from ♒ Aquarius. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a homemade snow globe.*" Libra is mid-slide with the globe; ducks behind the desk.
//   2.1–5.0    REACTION 1: one eyebrow at the glitter: "[ suspicious of the glitter ]" → the globe gives one hard shake:
//              "[ shakes it. *once.* ]" (the glitter storms).
//   5.0–7.9    REACTION 2: "[ slow nod ]" → brows shoot up as the glitter settles like real snow: "[ watches it *snow* ]".
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): inside, two tiny stars (Scorpio's and Aquarius's colours) stand side by side and glow:
//              "[ spots the two *tiny stars* inside ]" → "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Glitter ★★★★★ · Tiny us ★★★★★ · Shaken *me too* · TOTAL 10/10. "*Shook*. Deeply."
import { makeSilent, R, box, sparkles, hearts, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, T, stdFace, STD_CUES, giftPos, drawStarChar, signStar } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const SHAKE = B[0][0] + 1.75
const SCO = signStar('scorpio'), LIB = signStar('aquarius')

function globe(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const sh = t > SHAKE && t < SHAKE + 0.5 ? 14 * Math.sin((t - SHAKE) * 50) * (1 - (t - SHAKE) / 0.5) : 0
  const cx = g.x + sh, cy = g.y - 20
  x.save(); x.translate(cx, cy); x.rotate(g.rot * 0.5)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-100, 40, 210, 30)
  // base
  box(x, -96, 10, 192, 56, '#8a5a3a', { b: 6, hi: '#b07a4f' })
  R(x, GOLD, -60, 30, 120, 10)
  // glass
  const r = 96
  x.fillStyle = INK; x.beginPath(); x.arc(0, -r + 16, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = '#1e2a5a'; x.beginPath(); x.arc(0, -r + 16, r, 0, Math.PI * 2); x.fill()
  x.save(); x.beginPath(); x.arc(0, -r + 16, r, 0, Math.PI * 2); x.clip()
  // snow floor + the two tiny stars
  R(x, '#eef6ff', -r, -14, 2 * r, 40)
  const glowK = P.i === 2 || P.ph === 'score' ? 1 : 0
  drawStarChar(x, -30, -46, 58, t, { color: SCO.color, mood: glowK ? 'happy' : 'neutral', look: [1, 0], seed: 2, glow: 0.4 + glowK, bob: 1.5 })
  drawStarChar(x, 30, -46, 58, t, { color: LIB.color, mood: glowK ? 'happy' : 'neutral', look: [-1, 0], seed: 4, glow: 0.4 + glowK, bob: 1.5 })
  // glitter: a storm after the shake, settling slowly like snow
  const since = t - SHAKE
  for (let i = 0; i < 34; i++) {
    const seed = (i * 97) % 100 / 100
    let gx, gy
    if (since < 0) { gx = -r + 10 + (i * 53) % (2 * r - 20); gy = -6 + (i % 3) * 6 }
    else {
      const fall = clamp((since - 0.4) / (3.2 + seed * 2))
      const swirl = Math.max(0, 1 - since / 1.2)
      gx = Math.sin(i * 1.7 + since * 6 * swirl + seed * 6) * (r - 14) * (0.4 + 0.6 * seed)
      gy = lerp(-r * 1.6 + seed * 60, -10 + (i % 3) * 6, ease.inOutQuad(fall))
    }
    R(x, i % 3 ? '#ffffff' : (i % 2 ? GOLD : PINK), gx, gy, 6, 6)
  }
  x.restore()
  // glass shine
  R(x, 'rgba(255,255,255,0.35)', -60, -r - 40, 18, 46); R(x, 'rgba(255,255,255,0.25)', -70, -r + 12, 12, 24)
  x.restore()
  if (P.i === 2) {
    sparkles(x, t, cx, cy - 60, B[2][0] + 0.45, 10, 90, 1, [GOLD, PINK, BONE])
    hearts(x, t, B[2][0] + 0.6, cx, cy - 110, { n: 3, cell: 5, spread: 40, rise: 90 })
  }
}

const EP = makeSilent({
  id: 'nsre02', reviewer: 'scorpio', giver: 'aquarius', gift: 'a homemade snow globe.', accent: PINK,
  hookCC: '[ unreadable stare ]', plate: 'SCORPIO · CRITIC',
  beats: [
    { cc: [[0.75, '[ suspicious of the glitter ]'], [1.75, '[ shakes it. *once.* ]']], cues: [...STD_CUES[0], ['whoosh', 1.75, 0.3, 0.04], ['glitter', 1.8, 2.6]] },
    { cc: [[0.45, '[ slow nod ]'], [1.9, '[ watches it *snow* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ spots the two *tiny stars* ]'], [1.65, '[ a single tear ]']], cues: STD_CUES[2] },
  ],
  face: stdFace({ inspect: [0.6, 1.7] }),
  desk: globe,
  score: { rows: [['Glitter', 5], ['Tiny us', 5], ['Shaken', '*me too*']], total: '10/10' },
  last: '*Shook*. Deeply.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [lerp, prog]
