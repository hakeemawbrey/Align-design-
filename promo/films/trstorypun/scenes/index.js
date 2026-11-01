// trstorypun: STORYTIME: HOW WE MET, "They laughed at my worst joke." (45 s vertical, Star Talk Trends §19.5,
// music: cinematic · Am). Story 0–40.6, then the shared end card. The format look lives in ./story.js (identical in all
// five STORYTIME films). ♐ Sagittarius tells it from the couch; ♓ Pisces cries on the other end. Rewatch bait: the
// JOKE JAR on the windowsill, and the framed photo is the moon, wincing.
//   0.0–5.6    "They laughed at | my *worst* joke."  "I told my *worst* joke. on a first date."
//   5.6–13.9   FLASHBACK, FIRST DATE · 8:15 PM. "The | *joke.*"  A hilltop, a blanket, a telescope. Sagittarius:
//              "why did the star go to school?" ♑ Capricorn, deadpan: "…why?" "to get BRIGHTER." Silence. The moon
//              winces. A tumbleweed rolls through. * chirp *.
//   13.9–18.4  "Silence. | *Total* silence."  "I started planning my *new name.*"
//  18.38       card cut.
//   18.4–27.8  FLASHBACK, 8:16 PM. "Then: | *the snort.*"  snrk… SNORT. Capricorn topples over laughing, HA HA HA
//              bursts out. "that's SO bad. tell me another." Heart eyes; the moon un-winces.
//   27.8–33.4  "Two years | *later.*"  Capricorn pops onto the couch: "I'm still not funny. they *still* laugh." (snrk)
//   33.4       LESSON UNLOCKED: "Find the one | who *laughs.*"  +1 SNORT
//   37.95      "*Still* laughing."
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, outK, r3,
  GOLD, BONE, PINK, INK, MONO, INTER, FR,
} from './story.js'

const ACC = '#ffd84a'
const SAG = { x: 300, y: 1050, s: 230 }, CAP = { x: 660, y: 1050, s: 230 }

// a pixel moon with a face: wince 0 (calm, closed-happy) … 1 (squeezed shut)
function moonFace(x, cx, cy, R, wince, t) {
  const c = R / 7
  for (let j = -7; j <= 7; j++) for (let i = -7; i <= 7; i++) {
    const d = Math.hypot(i, j)
    if (d > 7.2) continue
    x.fillStyle = d > 6.3 ? INK : (i * 3 + j * 5) % 7 === 0 ? '#e6d8b0' : '#f4e8cc'
    x.fillRect(cx + i * c - c / 2, cy + j * c - c / 2, c + 0.5, c + 0.5)
  }
  x.fillStyle = INK
  if (wince > 0.5) { // >  <
    for (const s of [-1, 1]) { const ex = cx + s * 2.5 * c; x.fillRect(ex - c, cy - 1.5 * c, c, c); x.fillRect(ex, cy - 0.8 * c, c, c); x.fillRect(ex - c, cy - 0.1 * c, c, c) }
    x.fillRect(cx - 1.5 * c, cy + 2.4 * c, 3 * c, c * 0.7)
  } else {
    for (const s of [-1, 1]) { const ex = cx + s * 2.5 * c; x.fillRect(ex - c, cy - 0.8 * c, 2 * c, c * 0.7); x.fillRect(ex - 1.4 * c, cy - 1.2 * c, c * 0.6, c * 0.6); x.fillRect(ex + 0.8 * c, cy - 1.2 * c, c * 0.6, c * 0.6) }
    x.fillRect(cx - 1.2 * c, cy + 2.2 * c, 2.4 * c, c * 0.7); x.fillRect(cx - 1.8 * c, cy + 1.6 * c, c * 0.7, c * 0.7); x.fillRect(cx + 1.1 * c, cy + 1.6 * c, c * 0.7, c * 0.7)
    x.fillStyle = 'rgba(255,143,177,0.6)'; x.fillRect(cx - 4.4 * c, cy + 0.6 * c, 1.4 * c, c * 0.8); x.fillRect(cx + 3 * c, cy + 0.6 * c, 1.4 * c, c * 0.8)
  }
}
function hill(x, t, wince) {
  const g = x.createLinearGradient(0, FR.y, 0, 1150); g.addColorStop(0, '#0a1030'); g.addColorStop(1, '#23305e')
  x.fillStyle = g; x.fillRect(FR.x, FR.y, FR.w, FR.h)
  for (let i = 0; i < 40; i++) { const sx = FR.x + ((i * 137) % FR.w), sy = FR.y + 80 + ((i * 89) % 420), a = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.4 + i * 1.7)); x.fillStyle = `rgba(255,246,220,${a.toFixed(2)})`; x.fillRect(sx, sy, i % 5 ? 4 : 6, i % 5 ? 4 : 6) }
  const gl = x.createRadialGradient(810, 640, 20, 810, 640, 220); gl.addColorStop(0, 'rgba(255,240,200,0.3)'); gl.addColorStop(1, 'rgba(255,240,200,0)')
  x.fillStyle = gl; x.fillRect(590, 420, 440, 440)
  moonFace(x, 810, 640, 84, wince, t)
  // the hill
  x.fillStyle = '#1d3a34'
  x.beginPath(); x.moveTo(FR.x, 1300); x.lineTo(FR.x, 1060)
  for (let i = 0; i <= 24; i++) { const u = i / 24; x.lineTo(FR.x + u * FR.w, 1000 + 70 * Math.pow(2 * u - 1, 2)) }
  x.lineTo(FR.x + FR.w, 1300); x.fill()
  x.fillStyle = '#2a5446'; for (let i = 0; i < 30; i++) x.fillRect(FR.x + ((i * 61) % FR.w), 1080 + ((i * 37) % 200), 8, 14)
  // telescope (left)
  x.save(); x.translate(140, 1000); x.rotate(-0.7)
  x.fillStyle = INK; x.fillRect(-14, -84, 28, 120); x.fillStyle = '#9aa3c4'; x.fillRect(-9, -80, 18, 112); x.fillStyle = GOLD; x.fillRect(-14, -90, 28, 10)
  x.restore()
  x.fillStyle = INK; x.fillRect(130, 1010, 8, 120); x.fillRect(110, 1110, 50, 8)
}
function blanket(x) {
  for (let j = 0; j < 3; j++) for (let i = 0; i < 14; i++) { x.fillStyle = (i + j) % 2 ? '#e8444f' : '#f4e8cc'; x.fillRect(190 + i * 50, 1140 + j * 40, 50, 40) }
  x.fillStyle = INK; x.fillRect(186, 1136, 708, 4)
}
const TUMBLE = ['..BBBB..', '.B.BB.B.', 'B.B..B.B', 'BB.BB.BB', 'B.B..B.B', '.B.BB.B.', '..BBBB..']

// ── flashback 1: the joke
const F1 = { q: 0.5, why: 2.2, punch: 3.3, wince: 4.4, tumble: [4.9, 7.6], chirp: [6.0, 8.2] }
function flash1(x, t, lt) {
  hill(x, t, lt > F1.wince ? 1 : 0)
  const punch = lt > F1.punch
  signChar(x, t, 'sagittarius', SAG.x, SAG.y, SAG.s, { mood: lt > F1.wince + 1.2 ? 'wide' : punch ? 'sparkle' : 'happy', look: [1, 0], seed: 4, hops: [5.6 + F1.q, 5.6 + F1.punch, 5.6 + F1.punch + 0.25] })
  signChar(x, t, 'capricorn', CAP.x, CAP.y, CAP.s, { mood: 'neutral', look: [-1, 0], blink: punch ? 0 : undefined, seed: 8, hops: [5.6 + F1.why] })
  blanket(x)
  bubble(x, SAG.x + 40, 820, 'why did the star | go to school?', pop01(lt, F1.q, 0.3, 2.2) * outK(lt, [F1.punch - 0.15, F1.punch]), { size: 34, tail: 'bl' })
  bubble(x, CAP.x - 10, 840, '…why?', pop01(lt, F1.why, 0.3, 2.2) * outK(lt, [F1.wince + 0.6, F1.wince + 0.8]), { size: 38, tail: 'br', col: '#d8e8c8' })
  bubble(x, SAG.x + 60, 820, 'to get | BRIGHTER.', pop01(lt, F1.punch, 0.3, 2.8) * outK(lt, [F1.wince + 1.6, F1.wince + 1.8]), { size: 44, tail: 'bl', col: '#fff2a8' })
  sparkles(x, t, SAG.x, SAG.y - 60, 5.6 + F1.punch, 10, 170, 1, [ACC, BONE])
  // the tumbleweed
  if (lt > F1.tumble[0] && lt < F1.tumble[1]) {
    const p = prog(lt, ...F1.tumble)
    drawBits(x, TUMBLE, { B: '#b08a52' }, lerp(1080, 0, p), 1180 - Math.abs(Math.sin(p * Math.PI * 4)) * 50, 11, { rot: -p * 14 })
  }
  label(x, 540, 900, '* chirp *', Math.sin(Math.PI * prog(lt, ...F1.chirp)), { size: 34, bg: '#9fe6b0', font: MONO, weight: 700, rot: 0.05 })
}

// ── flashback 2: the snort
const F2 = { snrk: 0.8, snort: 1.8, fall: [2.4, 2.9], ha: 2.5, ask: 4.4, heart: 6.0 }
function flash2(x, t, lt) {
  hill(x, t, lt > F2.fall[0] ? 0 : 1)
  const heart = lt > F2.heart
  signChar(x, t, 'sagittarius', SAG.x, SAG.y, SAG.s, { mood: heart ? 'heart' : lt > F2.snort ? 'wide' : 'neutral', look: [1, 0], seed: 4, hops: [18.378 + F2.snort, 18.378 + F2.heart, 18.378 + F2.heart + 0.4] })
  // Capricorn topples over laughing (rotates back onto the blanket, rocks)
  const fall = ease.outBack(prog(lt, ...F2.fall))
  const rock = lt > F2.fall[1] ? 0.06 * Math.sin(lt * 14) : 0
  x.save(); x.translate(CAP.x + 60, 1150); x.rotate(0.95 * fall + rock); x.translate(-(CAP.x + 60), -1150)
  signChar(x, t, 'capricorn', CAP.x, CAP.y, CAP.s, { mood: lt > F2.snort ? 'happy' : 'neutral', look: [-1, 0], seed: 8, squash: lt > F2.snrk && lt < F2.snort ? 0.06 * Math.sin(lt * 30) : 0, hops: [18.378 + F2.snort] })
  x.restore()
  blanket(x)
  label(x, CAP.x - 40, 860, 'snrk', pop01(lt, F2.snrk, 0.25, 2.4) * outK(lt, [F2.snort - 0.1, F2.snort]), { size: 30, bg: BONE, rot: -0.1 })
  label(x, CAP.x - 30, 850, 'SNORT', pop01(lt, F2.snort, 0.25, 3) * outK(lt, [F2.ha + 1.6, F2.ha + 1.8]), { size: 56, bg: ACC, rot: 0.08 })
  for (let i = 0; i < 5; i++) {
    const at = F2.ha + i * 0.22, p = prog(lt, at, at + 1.3)
    if (p <= 0 || p >= 1) continue
    label(x, CAP.x + 40 + Math.sin(i * 2.3) * 120, 1000 - p * 300, 'HA', Math.sin(Math.PI * p) * 1.2, { size: 40, bg: i % 2 ? PINK : GOLD, rot: 0.2 * Math.sin(i * 3) })
  }
  bubble(x, 600, 790, "that's SO bad. | tell me another.", pop01(lt, F2.ask, 0.3, 2.2), { size: 38, tail: 'br', col: '#d8e8c8' })
  if (heart) hearts(x, t, SAG.x, SAG.y - 80, 18.378 + F2.heart + 0.1, { n: 7, life: 2, spread: 200, cell: 8, seed: 2 })
}

// room: the JOKE JAR on the windowsill; the framed photo: the moon, wincing
function room(x) {
  const cx = 250, cy = 735
  x.fillStyle = INK; x.fillRect(cx - 64, cy - 66, 128, 130)
  x.fillStyle = 'rgba(200,230,255,0.35)'; x.fillRect(cx - 58, cy - 60, 116, 118)
  for (let i = 0; i < 9; i++) { x.fillStyle = ['#fff2a8', '#ffb3c8', '#bfe6ff'][i % 3]; x.fillRect(cx - 48 + (i % 3) * 34, cy - 4 + Math.floor(i / 3) * 18, 28, 14) }
  x.fillStyle = '#c98a1f'; x.fillRect(cx - 66, cy - 80, 132, 18)
  label(x, cx, cy - 18, 'JOKES', 1, { size: 20, bg: ACC, rot: -0.06 })
}
function photo(x, cx, cy, w, h, t) {
  x.fillStyle = '#0a1030'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  moonFace(x, cx, cy, 70, 1, t)
}

const F = makeFilm({
  id: 'trstorypun', key: 'Am', seed: 1905, accent: ACC,
  narrator: 'sagittarius', partner: 'capricorn',
  heads: [
    'They laughed at | my *worst* joke.',
    'The | *joke.*',
    'Silence. | *Total* silence.',
    'Then: | *the snort.*',
    'Two years | *later.*',
  ],
  stamps: [null, 'FIRST DATE · 8:15 PM', null, 'FIRST DATE · 8:16 PM', null],
  lines: [
    { t: 1.2, text: 'I told my *worst* joke. on a first date.' },
    { t: 6.0, text: 'I had *one* joke ready.' },
    { t: 9.8, text: 'it was not a *good* joke.' },
    { t: 14.3, text: 'I started planning my *new name.*' },
    { t: 19.0, text: 'then they *snorted.*' },
    { t: 23.4, text: 'and asked for *another one.*' },
    { t: 28.75, text: "I'm still not funny. they *still* laugh." },
  ],
  mood(t) {
    if (t < 3.0) return { mood: 'happy' }
    if (t < 5.6) return { mood: 'wink' }
    if (t < 9.8) return { mood: 'sparkle', look: [-1, -0.4] }
    if (t < 13.93) return { mood: 'wide', look: [-1, -0.4] }
    if (t < 18.38) return { mood: 'squint' }
    if (t < 20.2) return { mood: 'wide', look: [-1, -0.4] }
    if (t < 27.82) return { mood: 'heart' }
    if (t < 37.95) return { mood: 'happy', look: t < 31 ? [1, 0] : undefined }
    return { mood: 'heart' }
  },
  partnerIn: 28.3,
  partnerMood: t => (t < 30.6 ? { mood: 'neutral', look: [-1, 0] } : { mood: 'happy' }),
  partnerHops: [30.6, 30.85, 31.1],
  room, photo,
  flash: [flash1, flash2],
  talk(x, t, K) {
    if (K.pF) label(x, K.pF.x + 60, K.pF.top - 40, 'snrk', pop01(t, 30.6, 0.25, 2.6) * outK(t, [32.6, 32.8]), { size: 34, bg: ACC, rot: 0.1 })
  },
  lesson: { text: 'Find the one | who *laughs.*', chip: '+1 SNORT' },
  last: { text: '*Still* laughing.' },
  music: { breakdown: [10.4], hits: [27.822] },
  cues: [
    ['pop', r3(5.6 + F1.q), 783.99, 0.04, -0.3], ['pop', r3(5.6 + F1.why), 587.33, 0.035, 0.3],
    ['pop', r3(5.6 + F1.punch), 1318.51, 0.05, -0.3], ['pop', r3(5.6 + F1.punch + 0.08), 1567.98, 0.045, -0.3], ['glitter', r3(5.6 + F1.punch), r3(5.6 + F1.punch + 0.3)],
    ['pluck', r3(5.6 + F1.wince), 220, 0.05, 0.8, 0.3],
    ['whoosh', r3(5.6 + F1.tumble[0] + 0.8), 1.2, 0.025], ...[0.4, 1.0, 1.6, 2.2].map(d => ['tick', r3(5.6 + F1.tumble[0] + d), 0.025]),
    ...[0, 0.09, 0.6, 0.69, 1.3, 1.39].map(d => ['pluck', r3(5.6 + F1.chirp[0] + 0.2 + d), 2637, 0.012, 0.1, 0.3]),
    ['pop', r3(18.378 + F2.snrk), 440, 0.03, 0.3], ['pop', r3(18.378 + F2.snort), 330, 0.06, 0.3], ['tom', r3(18.378 + F2.snort), 120, { gain: 0.15, decay: 0.15 }],
    ['whoosh', r3(18.378 + F2.fall[0]), 0.3, 0.03], ['tick', r3(18.378 + F2.fall[1]), 0.05],
    ...[0, 0.22, 0.44, 0.66, 0.88].map((d, i) => ['pop', r3(18.378 + F2.ha + d), [880, 987.77, 1174.66, 1318.51, 1567.98][i], 0.03, 0.3]),
    ['pop', r3(18.378 + F2.ask), 783.99, 0.04, 0.3], ['pluck', r3(18.378 + F2.heart), 1174.66, 0.045, 0.5, -0.3], ['pluck', r3(18.378 + F2.heart + 0.12), 1567.98, 0.04, 0.5, -0.3],
    ['pop', 30.6, 330, 0.04, 0.4],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const T = F.T
export const LINES = F.LINES
