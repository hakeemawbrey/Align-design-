// yr2020video: THEN vs NOW, "Dating in 2020 → 2026" (20 s vertical, STARTALK-THENNOW.md Block F #27,
// music: dreamy · Eb). The format's look lives in ./thennow.js (identical in all five Block F films).
//   0–7.0     THEN (2020, old phone video): a ♉ Taurus star on a video date at a laptop, in a crisp collar and bow
//             tie. The date (♌ Leo, on the laptop screen): "wow, you look fancy!" "oh, this old thing?" The camera
//             tilts down under the desk: moon-print pajama pants and fuzzy slippers ("BELOW THE CAMERA"). Back up.
//             The Leo stands up for a second: heart-print pajama pants. "…same." ♓ Pisces cries on the bed behind.
//             THE STARS: "business up top. *bedtime* below."   Sub: "nice shirt. *pajama pants.*"
//   7.0       card cut; the year sticker flips to 2026.
//   7.0–12.5  NOW (in person, a candlelit table): the same two, dressed up, "you look amazing." "you too." Clink.
//             The camera tilts down under the tablecloth (callback): both in pajama pants and slippers; the slippers
//             bump, a heart. ♓ Pisces watches through the window, sobbing.  THE STARS: "dressed up. *mostly.*"
//             Sub: "in person. *still* pajamas."
//   12.5–15.6 payoff: THE STARS "dates got real. pants *stayed.*"  Last line: "*Comfort* won."
import {
  makeThenNow, drawStarChar, signStar, starFrame, R, speech, hearts, sparkles, drawBits, pisces, pop01, outK, r3, tag,
  hash, INK, BONE, GOLD, PINK, HEART, clamp, lerp, prog, ease,
} from './thennow.js'

const TAU = signStar('taurus'), LEO = signStar('leo')
const TILT = 400      // how far the camera tilts down (world px)

// ── wardrobe: a collar + bow tie on the star, pajama legs + slippers hanging below it (world coords)
function bowtie(x, F, col = '#c8344e') {
  const cx = F.ox, cy = F.oy - 6.4 * F.cell, c = F.cell
  // collar points
  R(x, INK, cx - 5.4 * c, cy - 1.6 * c, 10.8 * c, 2.6 * c); R(x, '#ffffff', cx - 4.8 * c, cy - 1.1 * c, 4.2 * c, 1.6 * c); R(x, '#ffffff', cx + 0.6 * c, cy - 1.1 * c, 4.2 * c, 1.6 * c)
  drawBits(x, ['BB...BB', 'BBB.BBB', 'BBBKBBB', 'BBB.BBB', 'BB...BB'], { B: col, K: '#7a1830' }, cx, cy + 2 * c, c * 0.95)
}
function pajamas(x, F, floorY, { col = '#c9a6ff', dot = '#fff4c8', print = 'moon', slip = '#ffb3cf', wig = 0 } = {}) {
  const c = F.cell
  for (const d of [-1, 1]) {
    const tx = F.ox + d * 9.6 * c, top = F.oy - 3 * c, w = 9 * c, bot = floorY - 34
    R(x, INK, tx - w / 2 - 5, top - 5, w + 10, bot - top + 10)
    R(x, col, tx - w / 2, top, w, bot - top)
    for (let k = 0; top + 22 + k * 40 < bot - 10; k++) {
      const px = tx - w / 2 + 12 + ((k * 23) % Math.max(8, w - 30)), py = top + 22 + k * 40
      if (print === 'moon') { R(x, dot, px, py, 12, 12); R(x, col, px + 5, py - 2, 10, 10) }
      else drawBits(x, ['H.H', 'HHH', '.H.'], { H: dot }, px + 6, py + 4, 4, { outline: null })
    }
    R(x, '#ffffff', tx - w / 2, bot - 14, w, 10)                                    // cuff
    // a fuzzy slipper with two little ears
    const sx = tx + d * 6 + (d > 0 ? wig : -wig)
    R(x, INK, sx - 40, floorY - 40, 80, 44); R(x, slip, sx - 36, floorY - 36, 72, 36); R(x, '#ffe0ec', sx - 20, floorY - 30, 40, 10)
    R(x, INK, sx - 26, floorY - 62, 16, 26); R(x, slip, sx - 22, floorY - 58, 8, 20); R(x, INK, sx + 10, floorY - 62, 16, 26); R(x, slip, sx + 14, floorY - 58, 8, 20)
  }
}
const tiltK = (t, dn, up) => ease.inOutCubic(prog(t, ...dn)) - ease.inOutCubic(prog(t, ...up))

// ── A: 2020, the video date
const A = { fancy: 0.85, old: 2.05, down: [2.75, 3.35], below: 3.4, up: [4.55, 5.0], stand: [5.1, 5.4], same: 5.55, gasp: 5.4 }
function sceneA(x, t) {
  const tk = tiltK(t, A.down, A.up), ty = TILT * tk, z = 1.2 - 0.2 * tk
  x.save(); x.translate(440, 880); x.scale(z, z); x.translate(-440, -880 - ty)
  // room
  R(x, '#5b4a86', 0, 0, 880, 1300)
  for (let i = 0; i < 10; i++) R(x, '#63519a', i * 96 + 30, 0, 8, 1060)
  R(x, '#3a2e5c', 0, 1060, 880, 240); R(x, INK, 0, 1054, 880, 8); for (let i = 0; i < 4; i++) R(x, '#43356a', 0, 1090 + i * 50, 880, 6)
  // the bed (back right) with ♓ Pisces crying at something on a tablet
  R(x, INK, 470, 400, 410, 230); R(x, '#d6c8ff', 478, 470, 402, 150); R(x, '#b1a3e4', 478, 580, 402, 40); R(x, '#8a5a3a', 478, 408, 18, 214)
  pisces(x, t, 690, 420, 170, t > A.same ? 3 : 2, { mood: t > A.same ? 'happy' : 'wide', look: [-1, 1], hops: [A.same + 0.1] })
  R(x, INK, 744, 440, 70, 52); R(x, '#9fe6ff', 750, 446, 58, 40)
  // a lamp + a plant (era-neutral)
  R(x, INK, 92, 330, 80, 90); R(x, '#ffd98a', 98, 336, 68, 78); R(x, INK, 128, 420, 8, 120)
  // the desk (thin top, open underneath)
  R(x, INK, 40, 836, 800, 34); R(x, '#a4785a', 46, 840, 788, 24)
  R(x, INK, 60, 864, 26, 196); R(x, '#8a5a3a', 64, 864, 18, 192); R(x, INK, 794, 864, 26, 196); R(x, '#8a5a3a', 798, 864, 18, 192)
  // the Taurus: shirt up top, pajamas below
  const P0 = { x: 270, y: 700, s: 270 }
  let mood = 'happy', look = [1, 0]
  if (t > A.old - 0.1) mood = 'sparkle'
  if (t > A.down[0]) { mood = 'squint'; look = [1, 1] }
  if (t > A.up[0]) { mood = 'happy'; look = [1, 0] }
  if (t > A.gasp) { mood = 'wide'; look = [1, 0] }
  const opts = { color: TAU.color, glyph: TAU.glyph, mood, look, hops: [A.fancy + 0.4, A.old, A.gasp], seed: 4 }
  const F = starFrame(P0.x, P0.y, P0.s, t, opts)
  pajamas(x, F, 1050, { wig: t > A.below ? 8 * Math.sin(t * 12) : 0 })
  R(x, INK, 40, 836, 800, 34); R(x, '#a4785a', 46, 840, 788, 24)                 // desk edge over the waist
  drawStarChar(x, P0.x, P0.y, P0.s, t, opts)
  bowtie(x, F)
  // the laptop (angled so we see the screen) with the ♌ Leo on it
  const stand = ease.inOutCubic(prog(t, ...A.stand))
  R(x, INK, 470, 600, 300, 230); R(x, '#2b2b3a', 478, 608, 284, 214)
  x.save(); x.beginPath(); x.rect(490, 620, 260, 190); x.clip()
  R(x, '#ffcf8a', 490, 620, 260, 190); R(x, '#e7b373', 490, 760, 260, 50)
  const Lf = { color: LEO.color, glyph: LEO.glyph, mood: t > A.same ? 'happy' : 'sparkle', look: [-1, 0], hops: [A.fancy, A.same], seed: 7 }
  const ly = 735 - 110 * stand
  const LF = starFrame(620, ly, 140, t, Lf)
  if (stand > 0) pajamas(x, LF, ly + 190, { col: '#ffb0c8', dot: '#ffffff', print: 'heart', slip: '#9fe6ff' })
  drawStarChar(x, 620, ly, 140, t, Lf); bowtie(x, LF, '#2a6fd6')
  R(x, INK, 690, 774, 54, 34); R(x, '#5c5470', 694, 778, 46, 26)                  // little self-view
  x.restore()
  R(x, INK, 450, 826, 340, 16); R(x, '#9a9cb0', 454, 828, 332, 10)                 // keyboard base
  // lines
  speech(x, t, 560, 560, A.fancy, 'wow, you look fancy!', { size: 34, tail: 0, life: 1.2 })
  speech(x, t, 300, 470, A.old, 'oh, this old thing?', { size: 36, tail: 0, life: 1.25 })
  speech(x, t, 640, 520, A.same, '…same.', { size: 40, tail: 0, life: 1.4 })
  tag(x, t, 440, 920, A.below, 'BELOW THE CAMERA', { size: 34, life: A.up[0] - A.below, col: '#ffb3cf', rot: -0.03 })
  x.restore()
}

// ── B: 2026, in person
const B = { amazing: 7.55, too: 8.75, clink: 8.95, down: [9.55, 10.15], reveal: 10.2, bump: 10.9, up: [11.65, 12.15] }
function sceneB(x, t) {
  const tk = tiltK(t, B.down, B.up), ty = TILT * tk, z = 1.2 - 0.2 * tk
  x.save(); x.translate(440, 880); x.scale(z, z); x.translate(-440, -880 - ty)
  // a cozy restaurant: wall, a window of city lights, warm sconces, wooden floor
  R(x, '#6e3a52', 0, 0, 880, 1300)
  R(x, '#7a4560', 0, 520, 880, 540); for (let i = 0; i < 9; i++) R(x, '#6a3a52', i * 100 + 40, 520, 6, 540)
  R(x, INK, 300, 80, 280, 260); R(x, '#1c2350', 308, 88, 264, 244)
  for (let i = 0; i < 16; i++) R(x, [GOLD, '#9fe6ff', '#fff3c8'][i % 3], 320 + hash(i) * 240, 140 + hash(i + 5) * 170, 6, 6)
  R(x, INK, 436, 88, 8, 244)
  for (const sx of [130, 750]) { const g = x.createRadialGradient(sx, 220, 0, sx, 220, 170); g.addColorStop(0, 'rgba(255,214,140,0.5)'); g.addColorStop(1, 'rgba(255,214,140,0)'); x.fillStyle = g; x.fillRect(sx - 170, 50, 340, 340); R(x, INK, sx - 18, 196, 36, 48); R(x, '#ffe7a8', sx - 12, 202, 24, 36) }
  R(x, '#3b2430', 0, 1060, 880, 240); R(x, INK, 0, 1054, 880, 8); for (let i = 0; i < 4; i++) R(x, '#4a2e3c', 0, 1090 + i * 50, 880, 6)
  // ♓ Pisces outside the window, nose to the glass, sobbing at the romance
  x.save(); x.beginPath(); x.rect(308, 88, 264, 244); x.clip()
  pisces(x, t, 440, 250, 150, t > B.bump ? 3 : 2, { mood: t > B.bump ? 'happy' : 'sparkle', look: [0, 1], hops: [B.reveal + 0.1, B.bump + 0.1] })
  x.restore(); R(x, INK, 436, 88, 8, 244)
  // the two, dressed up (top), pajamas (bottom)
  const TA = { x: 285, y: 690, s: 250 }, LE = { x: 595, y: 690, s: 250 }
  const top = t > B.reveal ? 'squint' : 'happy'
  const to = { color: TAU.color, glyph: TAU.glyph, mood: t > B.bump ? 'heart' : t > B.amazing ? 'sparkle' : 'happy', look: [1, 0], hops: [B.too, B.clink, B.bump], seed: 4, blush: t > B.amazing ? 1 : undefined }
  const lo = { color: LEO.color, glyph: LEO.glyph, mood: t > B.bump ? 'heart' : top === 'squint' ? 'happy' : 'happy', look: [-1, 0], hops: [B.amazing, B.clink, B.bump], seed: 7, blush: t > B.too ? 1 : undefined }
  const TF = starFrame(TA.x, TA.y, TA.s, t, to), LF = starFrame(LE.x, LE.y, LE.s, t, lo)
  const bump = Math.sin(Math.PI * prog(t, B.bump - 0.2, B.bump + 0.3))
  pajamas(x, TF, 1050, { wig: -18 * bump - 22 })
  pajamas(x, LF, 1050, { col: '#ffb0c8', dot: '#ffffff', print: 'heart', slip: '#9fe6ff', wig: 18 * bump + 22 })
  drawStarChar(x, TA.x, TA.y, TA.s, t, to); bowtie(x, TF)
  drawStarChar(x, LE.x, LE.y, LE.s, t, lo); bowtie(x, LF, '#2a6fd6')
  // the table + tablecloth (drapes to just above the slippers)
  R(x, INK, 140, 800, 600, 30); R(x, '#fffaf0', 144, 804, 592, 22)
  R(x, INK, 152, 826, 576, 106); R(x, '#f3ecdf', 156, 826, 568, 100); for (let i = 0; i < 9; i++) R(x, '#e4d9c4', 176 + i * 64, 826, 10, 100)
  // candle + two water glasses
  R(x, INK, 428, 726, 24, 76); R(x, '#fff3c8', 432, 730, 16, 70)
  const fl = 1 + 0.15 * Math.sin(t * 17)
  drawBits(x, ['.F.', 'FFF', 'FYF', '.F.'], { F: '#ffb347', Y: '#fff1a0' }, 440, 708, 7 * fl, { outline: null })
  const ck = prog(t, B.clink - 0.3, B.clink), cb = prog(t, B.clink, B.clink + 0.3)
  const gOff = 40 * ease.inOutCubic(ck) - 40 * ease.inOutCubic(cb)
  for (const [gx, d] of [[340, 1], [540, -1]]) { const xx = gx + d * gOff; R(x, INK, xx - 20, 730, 40, 72); R(x, '#cfefff', xx - 16, 734, 32, 64); R(x, '#9fd8f0', xx - 16, 764, 32, 34) }
  if (t > B.clink) sparkles(x, t, 440, 740, B.clink, 6, 50, 1, [GOLD, BONE], 18)
  // lines
  speech(x, t, 560, 470, B.amazing, 'you look amazing.', { size: 36, tail: 1, life: 1.15 })
  speech(x, t, 320, 470, B.too, 'you too.', { size: 38, tail: -1, life: 1.0 })
  tag(x, t, 440, 1110, B.reveal, 'UNDER THE TABLE', { size: 34, life: B.up[0] - B.reveal, col: '#ffb3cf', rot: 0.03 })
  if (t > B.bump) hearts(x, t, 440, 1010, B.bump, { n: 6, life: 1.3, cell: 6, spread: 160 })
  sparkles(x, t, 440, 1020, B.bump, 8, 90, 2, [HEART, GOLD, BONE], 20)
  x.restore()
}

const EP = makeThenNow({
  id: 'yr2020video', accent: '#ffb3cf', thing: 'Dating', year: '2020',
  A: { draw: sceneA, date: '05·09·2020', sub: 'nice shirt. *pajama pants.*' },
  B: { draw: sceneB, sub: 'in person. *still* pajamas.' },
  lines: [{ t: 3.0, text: 'business up top. *bedtime* below.' }, { t: 9.25, text: 'dressed up. *mostly.*' }, { t: 12.5, text: 'dates got real. pants *stayed.*' }],
  last: '*Comfort* won.', late: 1,
  cues: () => [
    ['pop', A.fancy, 987.77, 0.035, 0.3], ['pop', A.old, 739.99, 0.035, -0.3],
    ['whoosh', A.down[0], 0.5, 0.035], ['tick', A.below, 0.04], ['pop', A.below + 0.05, 1174.66, 0.03, 0],
    ['pluck', A.below + 0.3, 1318.51, 0.025, 0.3, -0.2], ['pluck', A.below + 0.55, 1174.66, 0.025, 0.3, -0.2],
    ['whoosh', A.up[0], 0.4, 0.03], ['whoosh', A.stand[0], 0.25, 0.025], ['pop', A.gasp, 1318.51, 0.035, -0.2], ['pop', A.same, 587.33, 0.035, 0.3],
    ['pop', B.amazing, 880, 0.035, 0.3], ['pop', B.too, 987.77, 0.035, -0.3],
    ['bell', B.clink, 2637, 0.03, 0.8, 0], ['bell', B.clink + 0.03, 3136, 0.02, 0.6, 0],
    ['whoosh', B.down[0], 0.5, 0.035], ['tick', B.reveal, 0.04], ['pop', B.reveal + 0.05, 1174.66, 0.03, 0],
    ['tom', B.bump, 160, { gain: 0.14, decay: 0.12 }], ['pluck', B.bump + 0.05, 1567.98, 0.04, 0.5, 0], ['glitter', B.bump, B.bump + 0.4],
    ['whoosh', B.up[0], 0.4, 0.03],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
