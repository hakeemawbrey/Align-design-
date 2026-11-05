// klge07 · Your Sign's Love Glitch · "Cancer.exe: Care Overload" (23 s vertical, star_advice post, loop).
//   0.0   frame 0: CANCER.EXE is caring too hard. Cancer mid-juggle (soup, a scarf, a to-do list, an umbrella) in front
//         of its date; GIVE-O-METER 200 %, battery low. 0.5 whip onto the juggling.
//   3.0   the glitch: giving everything, taking nothing. Soup → the date, the scarf → the date, "i booked your dentist!"
//   6.3   the date: "can i get YOU anything?" Cancer: "no no i'm fine!"   7.8 error: battery 1 %.
//   9.4   Pisces pops out of the tray, crying.   11.4 THE STARS: "let them take care of you *too.*"   13.9 patch 1.7.
//   15.8  the date slides over a mug of tea; Cancer: "…yes please." Blush, the battery fills.
//   20.0  last line "Let someone *carry you* too."   22.55 loop back into frame 0.
import { makeGlitch, R, box, label, bubble, meter, hearts, sparkles, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const TEA = 15.8
const CX = 330, CY = 1180, DX = 800, DY = 1180
// juggled items: [give time (Infinity = keeps juggling), kind]
const ITEMS = [[3.6, 'soup'], [4.6, 'scarf'], [5.5, 'list'], [99, 'umbrella']]
function item(x, kind, px, py, rot = 0) {
  x.save(); x.translate(px, py); x.rotate(rot)
  if (kind === 'soup') { box(x, -40, -10, 80, 34, '#f4f0fa', { b: 4 }); R(x, '#f0a040', -34, -10, 68, 10); for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.6)', -20 + i * 18, -34 - i * 4, 6, 18) }
  else if (kind === 'scarf') { for (let i = 0; i < 6; i++) box(x, -60 + i * 20, -12, 20, 24, i % 2 ? '#e86a8a' : '#f4f0fa', { b: 2 }) }
  else if (kind === 'list') { box(x, -32, -42, 64, 84, '#fff3a8', { b: 4 }); for (let i = 0; i < 4; i++) R(x, '#7a3a9a', -22, -28 + i * 18, 44 - (i % 2) * 14, 5) }
  else if (kind === 'umbrella') { x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 48, Math.PI, 0); x.fill(); x.fillStyle = '#3fb6f0'; x.beginPath(); x.arc(0, 0, 42, Math.PI, 0); x.fill(); R(x, INK, -3, 0, 6, 50); R(x, INK, -3, 46, 18, 6) }
  else if (kind === 'tea') { box(x, -34, -30, 60, 60, '#f2c75c', { b: 4 }); R(x, INK, 26, -18, 18, 6); R(x, INK, 38, -18, 6, 30); R(x, INK, 26, 6, 18, 6); for (let i = 0; i < 2; i++) R(x, 'rgba(255,255,255,0.6)', -14 + i * 20, -60 - i * 6, 6, 22) }
  x.restore()
}
function battery(x, t, v) {
  const X = 820, Y = 620
  box(x, X, Y, 140, 64, '#1a1338', { b: 5 }); R(x, INK, X + 140, Y + 18, 14, 28)
  const low = v < 0.2
  R(x, low ? (Math.sin(t * 14) > 0 ? RED : '#ff9aa8') : MINT, X + 6, Y + 6, Math.max(6, 128 * v), 52)
  label(x, `${Math.round(v * 100)}%`, X + 70, Y + 33, { size: 26, col: BONE, stroke: INK })
}

function scene(x, t, K) {
  R(x, '#1a1438', 70, 556, 940, 880)
  // the table
  box(x, 560, 1260, 420, 40, '#8a5a3a', { b: 6 }); R(x, INK, 600, 1300, 16, 136); R(x, INK, 920, 1300, 16, 136)
  const tea = t >= TEA
  // the date (Virgo star) at the table
  K.star(x, t, 'virgo', DX, DY - 20, 250, { mood: t > 6.3 && t < 7.8 ? 'wide' : tea ? 'happy' : 'neutral', look: [-1, 0], seed: 3, hops: [6.3, TEA, 16.5] })
  // given items pile up on the table
  ITEMS.forEach(([g, kind], i) => {
    if (t < g || tea) return
    const p = ease.inOutCubic(prog(t, g, g + 0.45))
    const sx = CX + Math.cos(t * 4 + i * 1.57) * 170, sy = CY - 180 + Math.sin(t * 4 + i * 1.57) * 120
    const tx = 680 + i * 90, ty = 1236
    item(x, kind, lerp(sx, tx, p), lerp(sy, ty, p) - Math.sin(Math.PI * p) * 160)
  })
  if (tea) ITEMS.slice(0, 3).forEach(([, kind], i) => item(x, kind, 680 + i * 90, 1236))
  // Cancer
  const giving = !tea
  K.hero(x, t, CX, CY, 300, { mood: tea ? (t > 16.4 ? 'heart' : 'wide') : t > 7.8 && t < 9.4 ? 'sleepy' : t > 6.9 ? 'squint' : 'sparkle', look: [1, -0.6], squash: giving ? -0.06 : 0, hops: [3.6, 4.6, 5.5, 6.9, 16.4], blush: tea })
  // juggling orbit (items not yet given)
  if (giving) ITEMS.forEach(([g, kind], i) => { if (t < g) item(x, kind, CX + Math.cos(t * 4 + i * 1.57) * 170, CY - 180 + Math.sin(t * 4 + i * 1.57) * 120, Math.sin(t * 6 + i) * 0.4) })
  else item(x, 'umbrella', CX - 170, 1300, -0.3)
  // the tea, slid across the table to Cancer
  if (tea) { const p = ease.outCubic(prog(t, TEA + 0.2, TEA + 0.8)); item(x, 'tea', lerp(DX - 100, CX + 140, p), lerp(1236, 1200, p)) }
  // bubbles
  bubble(x, t, CX, 760, 3.6, 4.5, 'i made soup!', { size: 32 })
  bubble(x, t, CX, 760, 4.6, 5.4, 'it’s cold, take this!', { size: 32 })
  bubble(x, t, CX, 760, 5.5, 6.3, 'i booked your dentist!', { size: 32 })
  bubble(x, t, DX - 40, 880, 6.3, 7.7, 'can i get YOU anything?', { size: 30, col: '#d8f4ff', maxW: 360 })
  bubble(x, t, CX, 760, 6.9, 7.7, 'no no i’m fine!!', { size: 32 })
  bubble(x, t, CX + 40, 800, 16.4, 19.6, '…yes please.', { size: 34, col: '#ffe0ea' })
  // meters
  const care = tea ? lerp(2, 1, prog(t, TEA, TEA + 1)) : 2
  meter(x, t, 110, 640, 70, 200, care, { title: 'GIVE' })
  label(x, `${Math.round(care * 100)}%`, 145, 870, { size: 24, col: care > 1 ? '#ff9aa8' : MINT, stroke: INK })
  const bat = tea ? lerp(0.01, 0.9, ease.inOutQuad(prog(t, TEA + 0.6, 19))) : t < 3 ? 0.18 : lerp(0.18, 0.01, prog(t, 3, 7.8))
  battery(x, t, bat)
  if (t > 16.4) hearts(x, t, 16.4, CX, 1000, { n: 6 })
}

const F = makeGlitch({
  id: 'klge07', sign: 'cancer', len: 23, ending: 'loop',
  hook: 'CANCER.EXE is caring *too hard.*',
  err: { msg: ['Care given: 200%.', 'Care received: 0%.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.8, 9.3]],
  hits: [{ kind: 'whip', at: 0.5, x: CX, y: 1000, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: 7.8, dur: 0.45 }, { kind: 'flash', at: TEA, col: '#ffd98a' }],
  caps: [{ at: 3.0, out: 7.6, text: 'the glitch: giving *everything*, taking nothing' }],
  errs: [{ at: 7.8, out: 9.3, msg: ['BATTERY: 1%.', 'Own needs: unspoken.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.4, out: 11.3, text: 'let them love you back!! *sob*', tears: 3 }],
  stars: [{ t: 11.45, text: 'let them take care of you *too.*' }],
  box: { close: 13.9 },
  patch: { at: 13.9, ver: '1.7', name: 'LET SOMEONE CARE FOR YOU', dur: 1.0, out: 15.7 },
  last: { at: 20.0, text: 'Let someone *carry you* too.' },
  scene, accent: '#2a7ab0',
  cues: [3.6, 4.6, 5.5].flatMap(t => [['whoosh', t, 0.3, 0.04], ['pop', +(t + 0.45).toFixed(2), 783.99, 0.04, 0.3]]).concat([['pop', 6.3, 659.25, 0.04, 0.4], ['pop', 6.9, 987.77, 0.04, -0.4], ['whoosh', TEA + 0.2, 0.5, 0.04], ['bell', 16.4, 1318.51, 0.04, 1, 0], ['glitter', 16.4, 17.2]]),
  music: { style: 'dreamy', key: 'Eb', seed: 1807, drop: 3.0, breakdown: [9.4], lift: [TEA] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
