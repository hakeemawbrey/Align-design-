// nsre07: SILENT REVIEW, "Silent review: a framed photo." (20 s vertical trial reel, Silent Review Vol. 2 ep 7,
// music: jazzy · Bb). Story 0–15.6, then the shared end card. The format look lives in ../../nsre01/scenes/silentkit.js.
// ♋ Cancer, keeper of memories, reviews a framed photo from ♏ Scorpio. Not one word is spoken.
//   0.0–2.1    hook: "Silent review: | *a framed photo.*" Scorpio is mid-slide with a wooden frame.
//   2.1–5.0    REACTION 1: "[ examines the frame ]" (a loupe on the corners) → "[ corners: *straight* ]".
//   5.0–7.9    REACTION 2: "[ slow nod ]" → in the photo the snow starts to fall, brows up: "[ recognises *the day* ]".
//              (the photo: the two of them, small, in the first snow)
//   7.9        card cut.
//   7.9–11.4   REACTION 3 (the twist): the frame turns over: on the back, "my favourite day". "[ turns it over ]" →
//              "[ a single tear ]".
//   11.4–15.5  THE VERDICT: Frame ★★★★ · The day ★★★★★ · The back *got me* · TOTAL 10/10. "*Framed* the feeling."
import { makeSilent, R, box, sparkles, hearts, drawBits, HEART, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, T, stdFace, STD_CUES, giftPos, scrawl, drawStarChar, signStar } from '../../nsre01/scenes/silentkit.js'

const B = T.beats
const CAN = signStar('cancer'), SCO = signStar('scorpio')
const FLIP = [B[2][0] + 0.3, B[2][0] + 0.7]

function frame(x, t, P, S) {
  if (S.gift <= 0) return
  const g = giftPos(S)
  const W = 300, H = 230
  const fl = prog(t, ...FLIP)
  const sx = Math.abs(Math.cos(Math.PI * fl)), back = fl > 0.5
  x.save(); x.translate(g.x, g.y - 50); x.rotate(g.rot); x.scale(Math.max(0.04, sx), 1)
  x.fillStyle = 'rgba(6,4,18,0.35)'; x.fillRect(-W / 2 + 12, -H / 2 + 14, W, H)
  if (!back) {
    box(x, -W / 2, -H / 2, W, H, '#b07a4f', { b: 6, hi: '#c98e5e', lo: '#8a5a3a' })
    R(x, INK, -W / 2 + 22, -H / 2 + 22, W - 44, H - 44)
    // the photo: night sky, snow on the ground, the two of them small
    R(x, '#2a2f6a', -W / 2 + 26, -H / 2 + 26, W - 52, H - 52)
    R(x, '#eef6ff', -W / 2 + 26, 30, W - 52, H / 2 - 56)
    drawStarChar(x, -38, 6, 74, t, { color: CAN.color, mood: 'happy', look: [1, 0], seed: 2, glow: 0.3, bob: 0 })
    drawStarChar(x, 38, 6, 74, t, { color: SCO.color, mood: 'happy', look: [-1, 0], seed: 4, glow: 0.3, bob: 0 })
    // snow in the photo: still until reaction 2, then it falls
    const fall = P.i >= 1 && t > B[1][0] + 1.9 ? t - B[1][0] - 1.9 : 0
    x.save(); x.beginPath(); x.rect(-W / 2 + 26, -H / 2 + 26, W - 52, H - 52); x.clip()
    for (let i = 0; i < 18; i++) { const fx = -W / 2 + 34 + (i * 47) % (W - 68), fy = -H / 2 + 30 + (((i * 31) + fall * 40) % (H - 60)); R(x, '#ffffff', fx, fy, 5, 5) }
    x.restore()
  } else {
    box(x, -W / 2, -H / 2, W, H, '#8a5a3a', { b: 6 })
    R(x, '#c9a27a', -W / 2 + 16, -H / 2 + 16, W - 32, H - 32)
    R(x, INK, -14, -H / 2 + 26, 28, 10)
    box(x, -110, -40, 220, 90, '#fbf3e2', { b: 5 })
    scrawl(x, 'my favourite day', 0, -2, { size: 32, col: '#2a2a6a' })
    drawBits(x, HEART, { H: RED }, 0, 30, 3.5)
  }
  x.restore()
  if (P.i === 0) {
    const lk = clamp(prog(P.u, 0.4, 0.6)) * (1 - clamp(prog(P.u, 2.7, 2.85)))
    if (lk > 0.01) {
      const lx = lerp(410, 670, ease.inOutQuad(prog(P.u, 0.5, 2.5))), ly = lerp(1020, 1220, Math.round(prog(P.u, 0.5, 2.5) * 2) % 2) + 10 * Math.sin(P.u * 7)
      x.save(); x.globalAlpha = lk
      x.save(); x.translate(lx, ly); x.rotate(0.7); R(x, INK, 46, -12, 92, 24); R(x, '#6b4a2f', 50, -7, 84, 14); x.restore()
      x.lineWidth = 12; x.strokeStyle = INK; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.lineWidth = 6; x.strokeStyle = GOLD; x.beginPath(); x.arc(lx, ly, 54, 0, Math.PI * 2); x.stroke()
      x.fillStyle = 'rgba(200,235,255,0.22)'; x.beginPath(); x.arc(lx, ly, 48, 0, Math.PI * 2); x.fill()
      x.restore()
    }
  }
  if (P.i === 1) sparkles(x, t, g.x, g.y - 60, B[1][0] + 1.9, 10, 170, 1, ['#ffffff', GOLD, BONE])
  if (P.i === 2) hearts(x, t, B[2][0] + 0.8, g.x, g.y - 170, { n: 4, cell: 5, spread: 100, rise: 110 })
}

const EP = makeSilent({
  id: 'nsre07', reviewer: 'cancer', giver: 'scorpio', gift: 'a framed photo.', accent: PINK,
  hookCC: '[ already a little misty ]', plate: 'CANCER · CRITIC',
  beats: [
    { cc: [[0.45, '[ examines the frame ]'], [1.75, '[ corners: *straight* ]']], cues: STD_CUES[0] },
    { cc: [[0.45, '[ slow nod ]'], [1.9, '[ recognises *the day* ]']], cues: STD_CUES[1] },
    { cc: [[0.3, '[ turns it over ]'], [1.65, '[ a single tear ]']], cues: [...STD_CUES[2], ['whoosh', 0.3, 0.35, 0.03]] },
  ],
  face: stdFace({ inspect: [0.5, 2.6] }),
  desk: frame,
  score: { rows: [['Frame', 4], ['The day', 5], ['The back', '*got me*']], total: '10/10' },
  last: '*Framed* the feeling.',
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
