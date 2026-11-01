// yrpisces: THEN vs NOW, "Pisces at the movies in 2016 / 2026" (20 s vertical, Star Talk Then vs Now §12, music: lofi · Bb)
// The format's look lives in ./thennow.js (identical in all five Block C films).
//   0–6.85    2016 (old phone video, "10·21·2016"): a reaction shot in a dark cinema, the film playing in a little screen
//             above them (a tiny robot gives another robot a flower). ♓ Pisces sniffs, hides behind the popcorn
//             ("I'm fine. it's allergies."), then cries into it: SOGGY. ♑ Capricorn checks a chunky old phone:
//             "…it's a robot movie." and hands over a crumpled receipt. HONK.
//   6.85      card cut; the year sticker flips to 2026.
//   6.85–12.3 2026: same seats. Pisces came prepared: a tissue box marked "FOR 2". The robot gives the flower… and
//             Capricorn cries first. Pisces: "…are you crying?" Capricorn: "it's the ROBOT." Both fountain, tissues fly,
//             their hands meet in the box.
//   12.3–15.6 THE STARS: "Capricorn cried *first.* noted."  Last line: "Cried. *In stereo*."
import {
  makeThenNow, star, pisces, speech, sfxWord, hearts, sparkles, drawBits, R, r3, lerp, prog, ease, clamp, pop01,
  INK, BONE, GOLD, PINK, HEART, MONO, INTER,
} from './thennow.js'

const CAP = 'capricorn'
const PX = 320, CX = 760, SY = 1000, SS = 250

// ── the little movie on the screen (local time m from its start)
const ROBOT = ['.XXXXX.', 'XWWWWWX', 'XWEWEWX', 'XWWWWWX', '.XXXXX.', '..XBX..', '.XBBBX.', 'X.BBB.X', '..X.X..']
function movie(x, m, now) {
  const sx = 250, sy = 452, sw = 580, sh = 300
  R(x, INK, sx - 14, sy - 14, sw + 28, sh + 28); R(x, '#0c0820', sx - 6, sy - 6, sw + 12, sh + 12)
  x.save(); x.beginPath(); x.rect(sx, sy, sw, sh); x.clip()
  R(x, '#2a3a7a', sx, sy, sw, sh); R(x, '#3c5aa0', sx, sy + 150, sw, 40); R(x, '#3e7a4e', sx, sy + 220, sw, 80)
  for (let i = 0; i < 9; i++) R(x, '#e8e4ff', sx + 30 + i * 61, sy + 30 + (i * 37) % 90, 4, 4)
  const walk = ease.inOutQuad(prog(m, 0.2, 1.4)), bend = Math.sin(Math.PI * prog(m, 1.4, 1.9)), carry = ease.inOutQuad(prog(m, 1.9, 2.9))
  const ax = sx + lerp(70, 220, walk) + lerp(0, 160, carry), bx = sx + 470
  const has = m > 1.7
  // the flower (in the ground, then carried, then given)
  const fx = has ? ax + 30 : sx + 260, fy = has ? sy + 200 - bend * 6 : sy + 222
  drawBits(x, ['.P.', 'PYP', '.P.', '.G.', 'GG.', '.G.'], { P: '#ff7eb6', Y: GOLD, G: '#5fd38a' }, m > 2.95 ? bx - 34 : fx, m > 2.95 ? sy + 200 : fy, 6)
  const bob = Math.abs(Math.sin(m * 9)) * (walk > 0 && walk < 1 || carry > 0 && carry < 1 ? 6 : 0)
  drawBits(x, ROBOT, { X: INK, W: '#c9d3e6', E: '#1b1236', B: '#8fa0c0' }, ax, sy + 196 - bob + bend * 8, 7)
  drawBits(x, ROBOT, { X: INK, W: '#e6c9d3', E: m > 3.0 ? '#ff4f86' : '#1b1236', B: '#c08fa0' }, bx, sy + 196, 7)
  if (m > 3.05) {
    const k = pop01(m, 3.05, 0.3, 3)
    drawBits(x, ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: HEART }, (ax + bx) / 2, sy + 90 - (m - 3.05) * 10, 7 * k)
  }
  x.restore()
  // projector glow on the room
  const g = x.createRadialGradient(540, 620, 60, 540, 900, 760)
  g.addColorStop(0, `rgba(150,180,255,${now ? 0.16 : 0.2})`); g.addColorStop(1, 'rgba(150,180,255,0)')
  x.fillStyle = g; x.fillRect(0, 380, 1080, 1100)
}
function room(x, now) {
  R(x, now ? '#140f2a' : '#1c1020', 0, 0, 1080, 1920)
  // side wall sconces
  for (const wx of [70, 1010]) { R(x, INK, wx - 22, 600, 44, 60); R(x, now ? '#ffcf8a' : '#ffb070', wx - 16, 606, 32, 48) }
  // row of seats behind (the background audience row)
  for (let i = 0; i < 6; i++) { R(x, INK, 30 + i * 180, 860, 150, 130); R(x, now ? '#3a1a3e' : '#4a1c26', 36 + i * 180, 866, 138, 118); R(x, now ? '#4a2450' : '#5a2430', 36 + i * 180, 866, 138, 14) }
}
function seats(x, now) {
  const red = now ? '#a8345e' : '#b3343e', dk = now ? '#7a2346' : '#82242c'
  for (const cx of [PX, CX]) { R(x, INK, cx - 170, 1170, 340, 290); R(x, red, cx - 162, 1178, 324, 274); R(x, dk, cx - 162, 1178, 324, 26); R(x, dk, cx - 6, 1210, 12, 230) }
  // the armrest in the middle
  R(x, INK, 476, 1200, 128, 260); R(x, '#3a2a4a', 484, 1208, 112, 244); R(x, '#4f3a62', 484, 1208, 112, 20)
  R(x, INK, 0, 1450, 1080, 470); R(x, now ? '#1a1330' : '#22141c', 0, 1458, 1080, 470)
}
function popcorn(x, t, cx, cy, soggy = 0, k = 1) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  for (let i = 0; i < 9; i++) { const px = -58 + (i % 5) * 28, py = -120 - Math.floor(i / 5) * 22; R(x, INK, px - 4, py - 4, 34, 32); R(x, soggy > 0.5 ? '#d8cfa0' : '#fff6cc', px, py, 26, 24) }
  R(x, INK, -74, -104, 148, 150); for (let i = 0; i < 5; i++) R(x, i % 2 ? '#fffaf0' : '#e0384e', -68 + i * 27.2, -98, 27.2, 138)
  if (soggy > 0) for (let i = 0; i < 4; i++) { const ph = (t * 1.3 + i * 0.27) % 1; x.save(); x.globalAlpha = soggy; R(x, '#8fe3ff', -50 + i * 32, 40 + ph * 60, 8, 12); x.restore() }
  x.restore()
}
function tissueBox(x, t, cx, cy, k, pulls = []) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.scale(k, k)
  R(x, INK, -84, -70, 168, 112); R(x, '#9fe6ff', -78, -64, 156, 100); R(x, '#7fd0f0', -78, -64, 156, 16)
  x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('FOR 2', 0, -6)
  R(x, INK, -30, -78, 60, 14)
  // the tissue peeking out
  R(x, INK, -22, -112, 44, 40); R(x, '#ffffff', -18, -108, 36, 36)
  x.restore()
  // tissues flying up
  for (const [t0, dir] of pulls) {
    const tt = t - t0
    if (tt < 0 || tt > 1.1) continue
    const p = tt / 1.1
    drawBits(x, ['WWWW', 'WWWWW', '.WWWW', 'WWW.'], { W: '#ffffff' }, cx + dir * 260 * ease.outCubic(p), cy - 100 - 260 * Math.sin(Math.PI * p * 0.8), 9, { rot: dir * p * 3, alpha: 1 - ease.inQuad(p) })
  }
}
function chunkyPhone(x, cx, cy, k) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(-0.15); x.scale(k, k)
  const g = x.createRadialGradient(0, -30, 10, 0, -30, 220); g.addColorStop(0, 'rgba(200,230,255,0.35)'); g.addColorStop(1, 'rgba(200,230,255,0)'); x.fillStyle = g; x.fillRect(-240, -260, 480, 460)
  R(x, INK, -50, -92, 100, 184); R(x, '#3a3a44', -44, -86, 88, 172); R(x, '#cfe6ff', -36, -66, 72, 110)
  x.font = `700 18px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.fillText('9:41 PM', 0, -30)
  R(x, INK, -11, 54, 22, 22); R(x, '#5a5a66', -7, 58, 14, 14)
  x.restore()
}

// ── A: 2016
const A = { movie: 0.3, sniff: 1.0, hide: [1.6, 1.9], fine: 1.85, cry: 3.0, unhide: [3.35, 3.6], phone: 3.85, robot: 4.0, receipt: [4.95, 5.35], honk: 5.65 }
function sceneA(x, t) {
  room(x, false)
  movie(x, t - A.movie, false)
  // Pisces and Capricorn
  const hide = ease.inOutCubic(prog(t, ...A.hide)) - ease.inOutCubic(prog(t, ...A.unhide))
  const pt = t > A.cry ? 3 : t > A.fine ? 2 : t > A.sniff ? 1 : 0
  let pm = 'sparkle', pl = [0, -1]
  if (t > A.sniff) pm = 'wide'
  if (t > A.honk) { pm = 'squint'; pl = undefined }
  pisces(x, t, PX, SY, SS, pt, { mood: pm, look: pl, glyph: true, glow: 1, hops: [A.sniff, A.cry, A.honk], seed: 6 })
  let cm = 'neutral', cl = [0, -1]
  if (t > A.cry) { cm = 'wide'; cl = [-1, 0] }
  if (t > A.phone) { cm = 'neutral'; cl = [0, 1] }
  if (t > A.receipt[0]) { cm = 'neutral'; cl = [-1, 0] }
  star(x, t, CX, SY, SS, CAP, { mood: cm, look: cl, seed: 9, hops: [A.robot, A.receipt[0]] })
  seats(x, false)
  // the popcorn: on the armrest, then held up as a hiding place, then soggy
  const soggy = clamp((t - A.cry) * 2)
  popcorn(x, t, lerp(540, PX + 10, hide), lerp(1210, 1150, hide), soggy)
  if (t > A.cry + 0.2) sfxWord(x, t, 470, 900, A.cry + 0.2, 'SOGGY', { size: 58, col: '#8fe3ff', rot: -0.12, life: 1.6 })
  sfxWord(x, t, PX - 110, 820, A.sniff, 'sniff.', { size: 44, col: BONE, rot: -0.1, life: 0.8 })
  // the chunky phone, then the receipt
  chunkyPhone(x, CX + 150, 1160, pop01(t, A.phone, 0.25, 2) * (1 - prog(t, A.receipt[0] - 0.2, A.receipt[0])))
  if (t > A.receipt[0]) {
    const p = ease.outCubic(prog(t, ...A.receipt))
    drawBits(x, ['WWWWW', 'W.W.W', 'WWWWW', 'W...W', 'WWWWW', 'W.W.W'], { W: '#f4ecd8' }, lerp(CX - 60, PX + 70, p), lerp(1100, 1080, p) - 60 * Math.sin(Math.PI * p), 9, { rot: 0.3 + p })
  }
  sfxWord(x, t, PX + 40, 830, A.honk, 'HONK', { size: 64, col: GOLD, rot: -0.14, life: 1.1 })
  speech(x, t, 360, 760, A.fine, 'I’m fine. it’s allergies.', { size: 42, tail: -1, life: 1.15 })
  speech(x, t, 700, 760, A.robot, '…it’s a robot movie.', { size: 42, tail: 1, life: 1.3 })
}

// ── B: 2026
const B = { box: 7.25, prep: 7.4, movie: 7.5, capCry: 9.0, ask: 9.5, robot: 10.15, both: 10.75, pull: [10.95, 11.25, 11.55, 11.85], hands: 11.3 }
function sceneB(x, t) {
  room(x, true)
  movie(x, t - B.movie, true)
  const ct = t > B.both ? 3 : t > B.ask ? 2 : t > B.capCry ? 1 : 0
  const pt = t > B.both ? 3 : 0
  let pm = 'happy', pl = [0, -1]
  if (t > B.movie) pm = 'sparkle'
  if (t > B.capCry + 0.3) { pm = 'wide'; pl = [1, 0] }
  if (t > B.both) { pm = 'happy'; pl = undefined }
  if (t > B.hands) pm = 'heart'
  pisces(x, t, PX, SY, SS, pt, { mood: pm, look: pl, glyph: true, glow: 1.15, hops: [B.prep, B.ask, B.both, B.hands], seed: 6 })
  let cm = 'neutral', cl = [0, -1]
  if (t > B.capCry) { cm = 'wide'; cl = [0, -1] }
  if (t > B.robot) { cm = 'squint'; cl = undefined }
  if (t > B.both) cm = 'happy'
  if (t > B.hands) cm = 'heart'
  star(x, t, CX, SY, SS, CAP, { mood: cm, look: cl, seed: 9, tears: ct, glow: 1.15, hops: [B.robot, B.both + 0.05, B.hands] })
  seats(x, true)
  tissueBox(x, t, 540, 1200, pop01(t, B.box, 0.3, 2.4), B.pull.map((p, i) => [p, i % 2 ? 1 : -1]))
  if (t > B.hands) hearts(x, t, 540, 1050, B.hands, { n: 7, life: 1.8, cell: 6, spread: 300 })
  sparkles(x, t, 540, 1100, B.hands, 10, 120, 1, [HEART, GOLD, '#9fe6ff'], 22)
  speech(x, t, 340, 760, B.prep, 'came prepared.', { size: 46, tail: -1, life: 1.3 })
  speech(x, t, 380, 760, B.ask, '…are you crying?', { size: 44, tail: -1, life: 0.85, col: '#ffe1ec' })
  speech(x, t, 740, 760, B.robot, 'it’s the ROBOT.', { size: 48, tail: 1, life: 1.5, col: '#fff1c8' })
  if (t > B.both) sfxWord(x, t, 540, 860, B.both + 0.1, 'in stereo', { size: 50, col: '#9fe6ff', rot: -0.06, life: 1.4 })
}

const EP = makeThenNow({
  id: 'yrpisces', thing: 'Pisces at the movies', then: 2016, date: '10·21·2016', accent: '#9fe6ff',
  A: { draw: sceneA }, B: { draw: sceneB },
  line: 'Capricorn cried *first.* noted.',
  last: 'Cried. *In stereo*.',
  cues: () => [
    ['pluck', A.sniff, 659.25, 0.03, 0.4, -0.3], ['whoosh', A.hide[0], 0.25, 0.025], ['pop', A.fine, 880, 0.035, -0.3],
    ['pop', r3(A.cry + 0.2), 523.25, 0.04, 0], ['pluck', r3(A.cry + 0.3), 392, 0.03, 0.5, 0],
    ['tick', A.phone, 0.04], ['pop', A.robot, 784, 0.035, 0.3], ['whoosh', A.receipt[0], 0.3, 0.03],
    ['tom', A.honk, 180, { gain: 0.18, decay: 0.15 }], ['pop', A.honk, 330, 0.04, -0.2],
    ['pop', B.box, 1046.5, 0.04, 0], ['pop', B.prep, 880, 0.035, -0.3],
    ['pluck', B.capCry, 659.25, 0.03, 0.4, 0.3], ['pop', B.ask, 987.77, 0.035, -0.3], ['pop', B.robot, 1174.66, 0.04, 0.3],
    ['pluck', B.both, 783.99, 0.04, 0.5, -0.2], ['pluck', r3(B.both + 0.05), 987.77, 0.04, 0.5, 0.2],
    ...B.pull.map((p, i) => ['whoosh', p, 0.2, 0.02 + 0.004 * i]),
    ['pluck', B.hands, 1567.98, 0.04, 0.5, 0], ['glitter', B.hands, r3(B.hands + 0.4)],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void PINK
