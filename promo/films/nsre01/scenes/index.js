// nsre01: SILENT REVIEW, "Silent review: a hand-knitted hat." (18 s vertical trial reel, Silent Review Vol. 2 ep 1,
// music: jazzy · C). Story 0–15.6, then the shared end card. The format look lives in ./silentkit.js (the Vol. 2 kit,
// imported by all 12 episodes).
// ♍ Virgo, the strictest critic in the house, reviews a lumpy hand-knitted hat from ♈ Aries. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a hand-knitted hat.*" Virgo poker-faced behind the desk; Aries is mid-slide with
//              the hat (one ear flap clearly longer) and ducks behind the desk. CC "[ respectful silence ]".
//   2.1–5.0    REACTION 1: eyebrow up, a loupe sweeps the stitches: "[ inspects the stitches ]" → a hole sparkles:
//              "[ counts: *one dropped* ]".
//   5.0–7.9    REACTION 2: "[ slow, forgiving nod ]" → an arrow pops at the long flap, brows shoot up:
//              "[ notices one flap is *longer* ]". (Aries peeks: "?")
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the tag flips over: "made for V". "[ finds the tag ]" → "[ a single tear ]" →
//              the hat leaves the desk and pops onto Virgo's head: "[ puts it on. *immediately.* ]"
//   11.4–15.5  THE VERDICT: Stitching ★★ · Warmth ★★★★★ · Made by them *priceless* · TOTAL 10/10.
//              "*Never* taking it off." Virgo keeps the hat on; Aries heart-eyed; Pisces sobbing.
import { makeSilent, R, box, drawBits, sparkles, label, HEART, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl, arrowDown, pop01 } from './silentkit.js'

const B = T.beats
const RED_K = '#e8344e', RED_D = '#b52a3f', BLUE = '#4fb3d9', BLUE_D = '#2f86ad', CREAM = '#fff6ea'
const ON_HEAD = B[2][0] + 2.45            // the hat leaves the desk for Virgo's head

/** the hat in local coords (0, 0 = band centre), scale 1 ≈ 250 px wide */
function hat(x, { flapPulse = 0, tag = 0, hole = 0, t = 0 } = {}) {
  // ear flaps (the left one is much longer), with braided tassels
  const flap = (fx, len) => {
    R(x, INK, fx - 26, 44, 52, len + 8); R(x, RED_K, fx - 20, 44, 40, len - 4)
    R(x, INK, fx - 8, 40 + len, 16, 52); R(x, CREAM, fx - 4, 44 + len, 8, 44)
  }
  x.save(); x.translate(-82, 0); x.scale(1 + 0.12 * flapPulse, 1 + 0.12 * flapPulse); flap(0, 112); x.restore()
  flap(84, 52)
  // dome: a rounded beanie built from stepped rows (widest at the band), a lumpy white stripe
  const rows = [[-64, 250, 66], [-100, 222, 38], [-132, 180, 34], [-158, 120, 28], [-176, 64, 20]]
  for (const [y, w, h] of rows) R(x, INK, -w / 2 - 6, y - 6, w + 12, h + 12)
  for (const [y, w, h] of rows) R(x, RED_K, -w / 2, y, w, h)
  for (const [y, w] of rows.slice(1)) R(x, RED_D, -w / 2, y, 8, 26)
  for (let i = 0; i < 9; i++) R(x, '#ffffff', -110 + i * 25, -50 + (i % 3) * 4 - (i === 6 ? 6 : 0), 20, 14)
  // the dropped stitch (a little hole)
  R(x, INK, 36, -96, 16, 14); R(x, '#5a1f2c', 39, -93, 10, 8)
  if (hole > 0) sparkles(x, t, 44, -89, hole, 6, 34, 1, [GOLD, BONE])
  // pompom
  R(x, INK, -46, -246, 92, 80); R(x, CREAM, -40, -240, 80, 68); R(x, '#ffffff', -32, -234, 24, 18); R(x, '#e9dcc6', 4, -200, 30, 20)
  const W0 = 250
  // band with ribs
  R(x, INK, -W0 / 2 - 8, -2, W0 + 16, 54); R(x, BLUE, -W0 / 2 - 2, 4, W0 + 4, 42)
  for (let i = 0; i < 16; i++) R(x, BLUE_D, -W0 / 2 + 4 + i * 16, 6, 5, 38)
  // the tag on a little string at the right of the band: blank side, then it flips to "made for V"
  if (tag >= 0) {
    R(x, INK, 118, 26, 30, 4)
    const fw = Math.abs(Math.cos(Math.PI * clamp(tag)))   // flip width
    const showText = tag > 0.5
    x.save(); x.translate(178, 44); x.rotate(-0.08); x.scale(Math.max(0.06, fw), 1)
    R(x, INK, -36, -22, 72, 44); R(x, showText ? CREAM : '#e4d6bd', -32, -18, 64, 36)
    x.restore()
  }
}

function desk(x, t, P, S) {
  if (S.gift <= 0) return
  const away = t >= ON_HEAD && t < T.out[1]
  const g = giftPos(S)
  if (!away) {
    x.save(); x.translate(g.x, g.y - 30); x.rotate(g.rot); x.scale(0.78, 0.78)
    x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-130, 30, 280, 40)
    const flipT = ease.inOutCubic(prog(t, B[2][0] + 0.35, B[2][0] + 0.75))
    hat(x, { t, tag: flipT, hole: P.i === 0 ? B[0][0] + 1.75 : -9, flapPulse: P.i === 1 ? Math.max(0, Math.sin((t - B[1][0] - 1.9) * 9)) * (t > B[1][0] + 1.9 && t < B[1][0] + 2.5 ? 1 : 0) : 0 })
    x.restore()
    // the tag's message, big and readable, once it has flipped
    const mk = pop01(t, B[2][0] + 0.7, 0.3, 2.2) * (1 - clamp(prog(t, ON_HEAD - 0.15, ON_HEAD)))
    if (mk > 0.01) {
      x.save(); x.translate(g.x + 150, g.y - 140); x.rotate(-0.06); x.scale(mk, mk)
      box(x, -120, -38, 240, 76, CREAM, { b: 6 })
      scrawl(x, 'made for V', 0, 2, { size: 40, col: RED_D })
      drawBits(x, HEART, { H: RED }, 104, -30, 4)
      x.restore()
    }
  } else sparkles(x, t, g.x, g.y - 60, ON_HEAD, 10, 120, 2, [RED_K, GOLD, BONE])
  // the loupe on the stitches (reaction 1)
  if (P.i === 0) {
    const lk = clamp(prog(P.u, 1.4, 1.6)) * (1 - clamp(prog(P.u, 2.7, 2.85)))
    if (lk > 0.01) {
      const lx = lerp(430, 575, ease.inOutQuad(prog(P.u, 1.5, 2.1))), ly = 1110 + 10 * Math.sin(P.u * 7)
      x.save(); x.globalAlpha = lk
      x.save(); x.translate(lx, ly); x.rotate(0.7); R(x, INK, 46, -12, 92, 24); R(x, '#6b4a2f', 50, -7, 84, 14); x.restore()
      x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 6; x.strokeStyle = GOLD; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(200,235,255,0.22)'; x.beginPath(); x.arc(lx, ly, 48, 0, Math.PI * 2); x.fill()
      x.restore()
    }
  }
  // the arrow at the long flap (reaction 2)
  if (P.i === 1) {
    const ak = pop01(t, B[1][0] + 1.9, 0.25, 2.4) * (1 - clamp(prog(P.u, 2.7, 2.85)))
    arrowDown(x, t, g.x - 64, 1180, ak, GOLD)
    if (ak > 0.01) label(x, 'LONGER', g.x - 64, 1086 - 8 * Math.abs(Math.sin(t * 7)), { size: 26, col: GOLD, alpha: clamp(ak) })
  }
}

/** the hat on Virgo's head, in sprite cells (the star's top point is at ~(18, 1)) */
function wear(ctx, t, P) {
  if (t < ON_HEAD) return
  const k = ease.outBack(prog(t, ON_HEAD, ON_HEAD + 0.3))
  ctx.save(); ctx.translate(18, 6.5); ctx.scale(0.046 * k, 0.046 * k); ctx.translate(0, -40)
  hat(ctx, { t, tag: -1 })
  ctx.restore()
  void P
}

const EP = makeSilent({
  id: 'nsre01', reviewer: 'virgo', giver: 'aries', gift: 'a hand-knitted hat.', accent: PINK,
  hookCC: '[ respectful silence ]', plate: 'VIRGO · CRITIC',
  beats: [
    { cc: [[0.75, '[ inspects the stitches ]'], [1.75, '[ counts: *one dropped* ]']], cues: STD_CUES[0] },
    { cc: [[0.45, '[ slow, forgiving nod ]'], [1.9, '[ notices one flap is *longer* ]']], cues: STD_CUES[1] },
    { cc: [[0.45, '[ finds the tag ]'], [1.65, '[ a single tear ]'], [2.45, '[ puts it on. *immediately.* ]']],
      cues: [...STD_CUES[2], ['pop', 2.45, 1567.98, 0.035, 0], ['glitter', 2.45, 2.8]] },
  ],
  face: stdFace({ inspect: [1.5, 2.8] }),
  wear,
  desk,
  score: { rows: [['Stitching', 2], ['Warmth', 5], ['Made by them', '*priceless*']], total: '10/10' },
  last: '*Never* taking it off.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
