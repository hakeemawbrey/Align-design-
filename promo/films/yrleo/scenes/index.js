// yrleo: THEN vs NOW, "Leo dating in 2016 / 2026" (20 s vertical, Star Talk Then vs Now, Block A #5, music: pop · G)
// The format's look lives in ./thennow.js (identical in yraries, yrtaurus, yrgemini, yrcancer, yrleo).
//   0–6.71    2016, a candlelit dinner (old-phone grade, "09·30·2016"). ♌ Leo (side-swept bangs) brought the selfie
//             stick. Pose · FLASH. Pose · FLASH (the stick swings past ♐ Sagittarius' face). Third: a "group shot"…
//             the preview slides in: all Leo, one purple corner of the date. Sagittarius: "am I in… any of these?"
//             Leo: "one more!" ♓ Pisces cries at the next table.
//   6.71      card cut; the year sticker flips to 2026.
//   6.71–12.8 2026, the same table, a spotlight on Leo. Leo raises the phone for a selfie… then turns it around and
//             films the date laughing ("HAHA stop—"). The preview fills with Sagittarius laughing; Leo watches them,
//             not the screen, heart-eyed: "no, keep going." The spotlight widens to fit both.
//   12.8–15.6 the 2016 polaroid next to 2026; THE STARS: "best shot: *them, laughing.*"; last "*Spotlight*: shared."
import {
  makeThenNow, drawStarChar, signStar, R, speech, hearts, sparkles, drawBits, pisces, starFrame, bangs,
  pop01, outK, r3, INK, BONE, GOLD, PINK, MONO, INTER, HEART, SW, SH, lerp, prog, ease, easeOutBack, clamp,
} from './thennow.js'

const LEO = signStar('leo'), SAG = signStar('sagittarius')

function dining(x, t, now) {
  R(x, now ? '#2f2a5c' : '#4a2632', 0, 0, SW, 1060)
  for (let i = 0; i < 8; i++) R(x, now ? '#3a3470' : '#5a2e3c', 40 + i * 120, 0, 60, 640)
  R(x, now ? '#d9c8ff' : '#a8805a', 0, 640, SW, 420)
  R(x, INK, 0, 634, SW, 8)
  // back table + ♓
  R(x, INK, 380, 560, 140, 14); R(x, '#fffaf0', 384, 563, 132, 8)
}
function frontTable(x, t, now) {
  R(x, INK, 120, 905, 660, 170); R(x, '#fffaf0', 126, 911, 648, 160); R(x, now ? '#ffd1e3' : '#e8c9b0', 126, 970, 648, 12)
  // candle
  R(x, INK, 438, 835, 24, 76); R(x, '#fff1c8', 442, 839, 16, 72)
  const f = 0.85 + 0.15 * Math.sin(t * 13)
  x.save(); x.globalAlpha = f; drawBits(x, ['.Y.', 'YOY', 'YOY', '.Y.'], { Y: GOLD, O: '#ff8a3a' }, 450, 819, 7, { outline: null }); x.restore()
  const g = x.createRadialGradient(450, 790, 4, 450, 790, 160); g.addColorStop(0, 'rgba(255,200,120,0.35)'); g.addColorStop(1, 'rgba(255,200,120,0)')
  x.fillStyle = g; x.fillRect(290, 630, 320, 320)
}
function flash(x, t, t0, cx, cy) {
  const k = t - t0
  if (k < 0 || k > 0.45) return
  const a = Math.exp(-k * 9)
  const g = x.createRadialGradient(cx, cy, 0, cx, cy, 420); g.addColorStop(0, `rgba(255,255,255,${a})`); g.addColorStop(1, 'rgba(255,255,255,0)')
  x.fillStyle = g; x.fillRect(0, 0, SW, SH)
  x.fillStyle = `rgba(255,255,255,${0.35 * a})`; x.fillRect(0, 0, SW, SH)
}
function phone(x, cx, cy, rot, flipK = 1) {
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(flipK, 1)
  R(x, INK, -34, -56, 68, 112); R(x, '#3b3846', -28, -50, 56, 100); R(x, '#9fd8ff', -22, -42, 44, 76)
  x.restore()
}

// ── THEN: the selfie stick
const A = { poses: [1.25, 2.4, 3.55], snaps: [1.55, 2.7, 3.85], preview: [4.1, 4.4], inThese: 4.75, oneMore: 5.65 }
function sceneA(x, t) {
  dining(x, t, false)
  pisces(x, t, 450, 510, 104, t > A.snaps[1] ? 3 : 1, { mood: t > A.snaps[1] ? 'sparkle' : 'neutral', look: [0, 1], seed: 6 })
  // the stick's angle per pose (pose 2 swings across the date's face)
  const ang = t < A.poses[0] ? -2.2 : t < A.poses[1] ? lerp(-2.2, -1.6, ease.outBack(prog(t, A.poses[0], A.poses[0] + 0.3))) : t < A.poses[2] ? lerp(-1.6, -0.7, ease.outBack(prog(t, A.poses[1], A.poses[1] + 0.35))) : lerp(-0.7, -1.95, ease.outBack(prog(t, A.poses[2], A.poses[2] + 0.3)))
  const LX = 270, LY = 760, L = 360
  const hx = LX + 60, hy = LY - 10
  const px = hx + Math.cos(ang) * L, py = hy + Math.sin(ang) * L
  let sm = 'happy', sl = [-1, 0]
  if (t > A.poses[1] + 0.1 && t < A.poses[2]) { sm = 'squint'; sl = [-1, -1] }
  if (t > A.poses[2]) { sm = 'neutral'; sl = [-1, -1] }
  if (t > A.preview[1]) { sm = 'wide'; sl = [-1, -1] }
  drawStarChar(x, 650, 770, 250, t, { color: SAG.color, glyph: SAG.glyph, mood: sm, look: sl, seed: 9, hops: [A.inThese] })
  // Leo poses (a different face each pose)
  const moods = ['wink', 'sparkle', 'happy']
  const pi = t < A.poses[0] ? -1 : t < A.poses[1] ? 0 : t < A.poses[2] ? 1 : 2
  const lm = pi < 0 ? 'happy' : moods[pi]
  const lh = [...A.poses, A.oneMore]
  drawStarChar(x, LX, LY, 250, t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: [1, -1], seed: 4, hops: lh, squash: pi === 1 ? -0.06 : 0 })
  bangs(x, starFrame(LX, LY, 250, t, { hops: lh, seed: 4 }))
  // the stick
  x.save(); x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(hx, hy); x.lineTo(px, py); x.stroke()
  x.strokeStyle = '#9a96a6'; x.lineWidth = 7; x.beginPath(); x.moveTo(hx, hy); x.lineTo(px, py); x.stroke(); x.restore()
  phone(x, px, py, ang + Math.PI / 2)
  frontTable(x, t, false)
  for (const s of A.snaps) flash(x, t, s, px, py)
  // the preview: all Leo, one purple corner
  const pk = easeOutBack(prog(t, ...A.preview), 1.5)
  if (pk > 0.01) {
    x.save(); x.translate(lerp(1100, 700, pk), 250); x.rotate(0.05); x.scale(pk, pk)
    R(x, INK, -140, -170, 280, 340); R(x, '#fffaf0', -132, -162, 264, 324); R(x, '#5a2e3c', -116, -146, 232, 232)
    x.save(); x.beginPath(); x.rect(-116, -146, 232, 232); x.clip()
    drawStarChar(x, -10, -20, 300, t, { color: LEO.color, mood: 'wink', look: [0, 0], seed: 4, tips: false })
    drawStarChar(x, 150, 70, 160, t, { color: SAG.color, mood: 'neutral', seed: 9, tips: false })
    x.restore()
    x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('pic 48 of 48', 0, 130)
    x.restore()
  }
  speech(x, t, 650, 560, A.inThese, 'am I in…\nany of these?', { size: 36, tail: 1, life: 1.45 })
  speech(x, t, 250, 520, A.oneMore, 'one more!', { size: 42, tail: -1, life: 1.0, col: '#fff3c8' })
}

// ── NOW: the camera turns around
const B = { raise: 7.15, turn: [8.05, 8.45], laugh: 8.5, haha: 8.7, rec: 8.5, keep: 10.35, widen: [11.15, 11.75] }
function spotlight(x, cx, w, a) {
  x.save(); x.globalCompositeOperation = 'screen'
  const g = x.createLinearGradient(0, 0, 0, 1000); g.addColorStop(0, `rgba(255,236,170,${0.5 * a})`); g.addColorStop(1, `rgba(255,236,170,${0.12 * a})`)
  x.fillStyle = g; x.beginPath(); x.moveTo(cx - 40, -10); x.lineTo(cx + 40, -10); x.lineTo(cx + w, 960); x.lineTo(cx - w, 960); x.closePath(); x.fill()
  x.restore()
}
function sceneB(x, t) {
  dining(x, t, true)
  pisces(x, t, 450, 510, 104, t > B.keep ? 3 : 1, { mood: t > B.keep ? 'happy' : 'sparkle', look: [0, 1], seed: 6 })
  const wd = ease.inOutCubic(prog(t, ...B.widen))
  spotlight(x, lerp(270, 450, wd), lerp(170, 430, wd), 1)
  // ♐ laughs (bouncy hops), ♌ watches them
  const laughing = t > B.laugh
  const sH = laughing ? Array.from({ length: 12 }, (_, i) => r3(B.laugh + i * 0.36)) : []
  drawStarChar(x, 650, 770, 250, t, { color: SAG.color, glyph: SAG.glyph, mood: laughing ? 'happy' : 'neutral', look: laughing ? undefined : [-1, 0], seed: 9, hops: sH })
  let lm = 'wink', ll = [0, 0]
  if (t > B.turn[0]) { lm = 'happy'; ll = [1, 0] }
  if (t > B.haha + 0.6) { lm = 'heart'; ll = undefined }
  drawStarChar(x, 270, 760, 250, t, { color: LEO.color, glyph: LEO.glyph, mood: lm, look: ll, seed: 4, hops: [B.raise, B.turn[0], B.keep] })
  // the phone in Leo's hand: held up, then turned around to face the date
  const tk = prog(t, ...B.turn)
  const flipK = Math.cos(Math.PI * tk) // 1 → −1 (it turns around)
  const pr = ease.outBack(prog(t, B.raise, B.raise + 0.3))
  phone(x, lerp(330, 420, pr), lerp(760, 640, pr), lerp(0.3, 0, pr), Math.abs(flipK) < 0.08 ? 0.08 : flipK)
  frontTable(x, t, true)
  // the preview: first Leo (selfie), then the date laughing, recording
  const vk = pop01(t, B.raise + 0.15, 0.3, 2)
  if (vk > 0.01) {
    const VX = 450, VY = 270, VW = 330, VH = 300
    x.save(); x.translate(VX, VY); x.scale(vk, vk)
    R(x, INK, -VW / 2 - 8, -VH / 2 - 8, VW + 16, VH + 16); R(x, BONE, -VW / 2 - 3, -VH / 2 - 3, VW + 6, VH + 6); R(x, '#3a3470', -VW / 2, -VH / 2, VW, VH)
    x.save(); x.beginPath(); x.rect(-VW / 2, -VH / 2, VW, VH); x.clip()
    const sw = Math.abs(flipK) < 0.3 && tk > 0 && tk < 1
    if (tk < 0.5) drawStarChar(x, 0, 30, 260, t, { color: LEO.color, mood: 'wink', look: [0, 0], seed: 4, tips: false })
    else {
      drawStarChar(x, 0, 30, 260, t, { color: SAG.color, mood: 'happy', seed: 9, hops: sH, tips: false })
      if (laughing) { x.font = `800 34px ${INTER}`; x.fillStyle = GOLD; x.textAlign = 'center'; x.fillText('ha', -110 + 8 * Math.sin(t * 9), -90); x.fillText('ha', 110, -70 + 6 * Math.sin(t * 11)) }
    }
    if (sw) { x.fillStyle = 'rgba(255,255,255,0.5)'; x.fillRect(-VW / 2, -VH / 2, VW, VH) }
    x.restore()
    if (t > B.rec) {
      const s = Math.floor((t - B.rec) * 1.6)
      x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.fillStyle = Math.floor(t * 2) % 2 ? '#ff4f4f' : '#ff9a9a'
      x.fillText(`● REC 0:${String(s).padStart(2, '0')}`, -VW / 2 + 14, -VH / 2 + 30)
    }
    x.restore()
  }
  speech(x, t, 680, 560, B.haha, 'HAHA stop—', { size: 40, tail: 1, life: 1.4, col: '#efe4ff' })
  speech(x, t, 250, 560, B.keep, 'no, keep going.', { size: 38, tail: -1, life: 1.6, col: '#fff3c8' })
  if (t > B.haha + 0.6) hearts(x, t, 300, 640, B.haha + 0.6, { n: 6, life: 1.6, cell: 6, spread: 120 })
  sparkles(x, t, 450, 700, B.widen[1], 12, 300, 1, [GOLD, PINK, BONE], 24)
}

const EP = makeThenNow({
  id: 'yrleo', thing: 'Leo dating in', then: '2016', stamp: '09·30·2016', accent: '#ffb04a',
  A: { draw: sceneA }, B: { draw: sceneB },
  lines: [
    { t: 0.95, text: '2016: a selfie stick on *every* date.' },
    { t: 9.3, text: 'same camera. *better subject.*' },
    { t: 12.92, text: 'best shot: *them, laughing.*' },
  ],
  last: '*Spotlight*: | shared.',
  cues: () => [
    ...A.poses.map(p => ['whoosh', p, 0.25, 0.03]),
    ...A.snaps.flatMap(s => [['tick', r3(s - 0.03), 0.07], ['pop', s, 1864.66, 0.035, -0.2], ['tick', r3(s + 0.05), 0.05]]),
    ['whoosh', A.preview[0], 0.3, 0.035], ['pop', A.preview[1], 1046.5, 0.035, 0.3],
    ['pop', A.inThese, 659.25, 0.035, 0.4], ['pop', A.oneMore, 1174.66, 0.04, -0.3],
    ['pop', B.raise, 880, 0.035, -0.3], ['whoosh', B.turn[0], 0.4, 0.04], ['tick', B.turn[1], 0.05], ['pop', B.rec, 1318.51, 0.03, 0],
    ...[0, 1, 2, 3, 4].map(i => ['pop', r3(B.haha + i * 0.18), 1046.5 + (i % 2) * 260, 0.025, 0.4]),
    ['pluck', r3(B.haha + 0.6), 1567.98, 0.04, 0.5, -0.3], ['pop', B.keep, 783.99, 0.035, -0.3],
    ['riser', B.widen[0], B.widen[1], 0.03], ['bell', B.widen[1], 2093, 0.03, 1.0, 0], ['glitter', B.widen[1], r3(B.widen[1] + 0.4)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
