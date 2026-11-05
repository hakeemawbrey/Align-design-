// klge16 · Your Sign's Love Glitch · "Virgo.exe: Fix-It Mode" (LONG, 64 s vertical, star_advice post, hard cut).
//   0.0   frame 0: VIRGO.EXE is fixing your date. Virgo mid-swing of a giant red pen over its date, red marks
//         everywhere; the promise: "wait for the patch notes". 0.5 whip onto the pen.
//   CH 1  THE GLITCH (3.0): the laugh gets a note ("20% quieter?"), the shirt gets a sticky ("tuck?"), the playlist
//         gets crossed out. NOTES counter climbs.
//   CH 2  WHERE IT COMES FROM (18.5): ★ astrology says: Virgo is ruled by Mercury. THE STARS: noticing details is the
//         gift. 25.5 flashback: Virgo at the mirror, red-penning itself.
//   CH 3  WHAT IT COSTS (32.0): the date goes quiet ("…should i just not talk?"); error: FUN 0 %; Pisces cries;
//         Virgo runs out of battery.
//   CH 4  PATCH NOTES (45.5): VIRGO.EXE 2.0 installs; notes: notice, don't correct · let one thing stay messy · say
//         what you like about them. 56.2 the pen goes down: "i love your laugh." The date laughs, Virgo laughs too.
//   61.0  last line "You're *finished* enough.", held to the cut at 64.0.
import { makeGlitch, R, box, label, bubble, meter, hearts, sparkles, sticker, drawBits, HEART, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const CH = [3.0, 18.5, 32.0, 45.5]
const MIRROR = [25.5, 31.9], PENDOWN = 56.2
const VX = 290, VY = 1190, DX = 770, DY = 1190
// the red marks on the date, appearing over chapter 1 (cleared at the patch)
const MARKS = [
  { at: -1, kind: 'circle', x: DX, y: DY - 20, r: 110 },
  { at: -1, kind: 'arrow', x: DX - 150, y: DY - 160 },
  { at: 4.0, kind: 'note', x: DX + 10, y: 900, text: 'laugh: 20% quieter?' },
  { at: 8.6, kind: 'note', x: DX + 40, y: 1340, text: 'tuck?' },
  { at: 9.6, kind: 'circle', x: DX + 10, y: DY + 70, r: 70 },
  { at: 13.4, kind: 'cross', x: 0, y: 0 },
]
function pen(x, t, px, py, rot) {
  x.save(); x.translate(px, py); x.rotate(rot)
  R(x, INK, -16, -200, 32, 290); R(x, RED, -10, -194, 20, 220); R(x, '#f4e8d8', -10, 26, 20, 40); R(x, INK, -5, 66, 10, 24)
  x.restore()
}
function mark(x, t, M) {
  const k = pop01(t, M.at, 0.25, 2.4)
  if (k <= 0.01) return
  x.save(); x.strokeStyle = RED; x.lineWidth = 9; x.lineCap = 'round'
  if (M.kind === 'circle') { x.beginPath(); x.ellipse(M.x, M.y, M.r, M.r * 0.8, -0.2, 0, Math.PI * 2 * Math.min(1, k)); x.stroke() }
  else if (M.kind === 'arrow') { x.globalAlpha = Math.min(1, k); x.beginPath(); x.moveTo(M.x - 80, M.y - 60); x.lineTo(M.x, M.y); x.moveTo(M.x - 30, M.y - 4); x.lineTo(M.x, M.y); x.lineTo(M.x - 8, M.y - 30); x.stroke() }
  else if (M.kind === 'note') { x.restore(); x.save(); x.translate(M.x, M.y); x.rotate(0.06); x.scale(k, k); x.font = `800 26px ${INTER}`; const w = x.measureText(M.text).width + 30; box(x, -w / 2, -26, w, 52, '#fff3a8', { b: 4 }); label(x, M.text, 0, 1, { size: 26, col: RED, font: INTER, weight: 800 }) }
  x.restore()
}
function playlist(x, t) {
  const k = pop01(t, 12.6, 0.3, 2.2) * outK(t, [17.6, 17.9])
  if (k <= 0.01) return
  x.save(); x.translate(540, 760); x.scale(k, k)
  box(x, -260, -150, 520, 300, '#120d26', { b: 6 }); R(x, '#2fc79a', -260, -150, 520, 54); label(x, 'RAE’S ROAD-TRIP MIX', 0, -122, { size: 24, col: INK })
  const songs = ['track 1 · the loud one', 'track 2 · the sad one', 'track 3 · 11 minutes long']
  songs.forEach((s, i) => {
    label(x, s, -230, -60 + i * 70, { size: 28, align: 'left', col: BONE, font: INTER, weight: 800 })
    const c = prog(t, 13.4 + i * 0.6, 13.7 + i * 0.6)
    if (c > 0) R(x, RED, -236, -64 + i * 70, 460 * c, 7)
  })
  sticker(x, t, 'no.', 190, 110, 15.4, 17.6, { col: RED, ink: '#fff', size: 40, rot: 0.1 })
  x.restore()
}
function notesCounter(x, t) {
  if (t >= CH[3] + 2.5) return
  const n = t < 3 ? 6 : Math.min(31, 6 + Math.floor((t - 3) * 1.4))
  box(x, 820, 620, 160, 70, RED, { b: 4 }); label(x, `NOTES: ${n}`, 900, 656, { size: 26, col: BONE, font: INTER, weight: 900 })
}
function mirrorScene(x, t, K) {
  R(x, '#1d1640', 70, 556, 940, 880)
  // the mirror (Virgo + its reflection)
  box(x, 520, 640, 380, 640, '#9ad0e8', { b: 10 }); R(x, 'rgba(255,255,255,0.25)', 540, 660, 60, 600)
  K.hero(x, t, 710, 1040, 230, { mood: 'squint', look: [-1, 0], alpha: 0.85, seed: 3 })
  K.hero(x, t, 300, 1180, 260, { mood: 'squint', look: [1, -0.3] })
  pen(x, t, 430, 1100, 0.6 + Math.sin(t * 6) * 0.08)
  // the self-checklist
  const items = ['hair', 'posture', 'that text’s tone', 'that laugh']
  box(x, 110, 640, 340, 300, '#fff3a8', { b: 5 })
  label(x, 'ME: TO FIX', 280, 668, { size: 24, col: INK })
  items.forEach((it, i) => {
    label(x, it, 140, 720 + i * 54, { size: 28, align: 'left', col: INK, font: INTER, weight: 800 })
    if (t > MIRROR[0] + 0.8 + i * 0.9) label(x, '✗', 410, 720 + i * 54, { size: 36, col: RED, font: INTER, weight: 900 })
  })
}

function scene(x, t, K) {
  if (t >= MIRROR[0] && t < MIRROR[1]) return mirrorScene(x, t, K)
  const patched = t >= CH[3] + 2.5
  R(x, '#1b1438', 70, 556, 940, 880)
  // café: a window with string lights + the table
  for (let i = 0; i < 12; i++) { const on = Math.floor(t * 3 + i) % 3; R(x, on ? '#ffd98a' : '#a08a5a', 110 + i * 76, 590 + Math.sin(i) * 8, 14, 14) }
  box(x, 120, 1300, 840, 34, '#8a5a3a', { b: 6 }); R(x, INK, 200, 1334, 16, 102); R(x, INK, 860, 1334, 16, 102)
  // two cups
  box(x, 440, 1250, 50, 50, '#f4f0fa', { b: 4 }); box(x, 590, 1250, 50, 50, '#f4f0fa', { b: 4 })
  // the date (Sagittarius star)
  const quiet = t >= CH[2] && !patched
  K.star(x, t, 'sagittarius', DX, DY, 250, { mood: t > PENDOWN + 0.4 ? 'happy' : quiet ? 'neutral' : t < 3 ? 'wide' : t > 8.2 && t < 9.6 ? 'wide' : 'happy', look: quiet ? [0, 1] : [-1, 0], seed: 6, hops: [4.0, 4.3, PENDOWN + 0.5, PENDOWN + 0.8, PENDOWN + 1.1] })
  if (!patched) { for (const M of MARKS) if (M.kind !== 'cross') mark(x, t, M) }
  // Virgo with the pen
  const tired = t >= 40.3 && !patched
  K.hero(x, t, VX, VY, 260, { mood: patched ? (t > PENDOWN + 0.4 ? 'happy' : 'neutral') : tired ? 'sleepy' : t > 32.6 && t < 37.5 ? 'wide' : 'squint', look: [1, 0], squash: tired ? 0.1 : 0, hops: [4.0, 8.6, 9.6, 13.4, 14.0, 14.6, PENDOWN + 0.4, PENDOWN + 0.8] })
  if (!patched || t < PENDOWN + 0.5) {
    const drop = ease.inCubic(prog(t, PENDOWN, PENDOWN + 0.4))
    const sw = t < 3 ? -0.9 + Math.sin(t * 9) * 0.25 : 0.7 + Math.sin(t * 4) * 0.12
    pen(x, t, lerp(VX + 170, VX + 200, drop), lerp(1060, 1300, drop), lerp(sw, 1.5, drop))
  }
  playlist(x, t)
  notesCounter(x, t)
  if (tired) { meter(x, t, 110, 660, 70, 200, lerp(0.5, 0.05, prog(t, 40.3, 44)), { title: 'ENERGY' }); for (let i = 0; i < 2; i++) { if (Math.floor(t * 2 + i) % 2) { R(x, '#8fd8ff', VX + 110 + i * 20, 1040 + i * 30, 12, 18) } } }
  bubble(x, t, DX, 960, 3.5, 5.6, 'HAHAHA', { size: 40, col: '#e8d8ff' })
  bubble(x, t, DX, 960, 32.9, 36.5, '…should i just not talk?', { size: 28, col: '#e8d8ff', maxW: 360 })
  bubble(x, t, VX + 40, 960, PENDOWN + 0.3, 59.5, 'i love your laugh.', { size: 32 })
  bubble(x, t, DX, 960, PENDOWN + 1.2, 60.5, 'HAHAHA!!', { size: 44, col: '#e8d8ff' })
  if (t > PENDOWN + 1.2) { hearts(x, t, PENDOWN + 1.2, 540, 1060, { n: 8 }); sparkles(x, t, DX, 1100, PENDOWN + 1.2, 12, 180, 2) }
}

const F = makeGlitch({
  id: 'klge16', sign: 'virgo', len: 64, ending: 'cut',
  hook: 'VIRGO.EXE is *fixing* your date.',
  promise: 'wait for the *patch notes* ↓',
  err: { msg: ['Date: delightful.', 'Virgo: "just small notes!"'], out: 2.75 },
  notResp: [[-1, 2.7], [35.0, 37.0]],
  hits: [
    { kind: 'whip', at: 0.5, x: VX + 170, y: 1000, z: 0.4, hold: 0.5 }, { kind: 'shake', at: 4.0, dur: 0.3, amp: 10 }, { kind: 'whip', at: 8.6, x: DX, y: 1300, z: 0.3, hold: 0.8 },
    { kind: 'scratch', at: 15.4, dur: 0.6 }, { kind: 'flash', at: MIRROR[0], col: '#9ad0e8' }, { kind: 'flash', at: MIRROR[1], col: '#9ad0e8' },
    { kind: 'whip', at: 33.0, x: DX, y: 1100, z: 0.35, hold: 1.2 }, { kind: 'glitch', at: 35.0, dur: 0.5 }, { kind: 'shake', at: 40.4, dur: 0.4, amp: 12 }, { kind: 'flash', at: PENDOWN, col: GOLD },
  ],
  chapters: [{ at: CH[0], n: 1, text: 'THE GLITCH' }, { at: CH[1], n: 2, text: 'WHERE IT COMES FROM' }, { at: CH[2], n: 3, text: 'WHAT IT COSTS' }, { at: CH[3], n: 4, text: 'PATCH NOTES' }],
  caps: [
    { at: 5.8, out: 12.4, text: 'it starts *small*' },
    { at: 12.6, out: 17.9, text: 'then it’s the *playlist*' },
    { at: 21.2, out: 25.2, text: '★ astrology says: Virgo is ruled by *Mercury*', size: 56 },
    { at: 25.9, out: 31.7, text: 'and the pen points at *you* too' },
    { at: 40.3, out: 45.2, text: 'fixing everyone is *exhausting*' },
    { at: 56.6, out: 60.6, text: 'after the patch:' },
  ],
  errs: [{ at: 35.0, out: 37.0, msg: ['DATE: GOING QUIET.', 'Fun: 0%.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 37.4, out: 40.0, text: 'they just wanted a nice night *sob*', tears: 3 }],
  stars: [{ t: 19.2, text: 'noticing details is your *gift.*' }, { t: 22.0, text: 'you notice because you *care.*' }],
  box: [{ open: 18.95, close: 25.2 }],
  patch: { at: CH[3] + 0.5, ver: '2.0', name: 'VIRGO.EXE 2.0', dur: 1.6, out: 48.8 },
  notes: { at: 48.9, out: 56.0, ver: '2.0', gap: 1.9, items: ['notice, don’t *correct.*', 'let one thing stay *messy.*', 'say what you *like* about them.'] },
  last: { at: 61.0, text: 'You’re *finished* enough.' },
  scene, accent: '#b8406e',
  cues: [['pop', 4.0, 783.99, 0.05, 0.3], ['pop', 8.6, 783.99, 0.05, 0.3], ['pop', 9.6, 659.25, 0.04, 0.3], ['tick', 13.4, 0.05], ['tick', 14.0, 0.05], ['tick', 14.6, 0.05], ['vinyl', MIRROR[0], MIRROR[1], { gain: 0.01 }], ...[0, 1, 2, 3].map(i => ['tick', +(MIRROR[0] + 0.8 + i * 0.9).toFixed(2), 0.06]), ['pop', 32.9, 523.25, 0.04, 0.3], ['tom', PENDOWN + 0.4, 90, { gain: 0.2 }], ['pop', PENDOWN + 0.3, 880, 0.04, -0.3], ['bell', PENDOWN + 1.2, 1318.51, 0.05, 1.2, 0], ['glitter', PENDOWN + 1.2, PENDOWN + 2.2]],
  music: { style: 'lofi', key: 'Am', seed: 1816, drop: 3.0, breakdown: [MIRROR[0], 37.4], lift: [CH[3], PENDOWN] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
