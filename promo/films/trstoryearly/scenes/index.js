// trstoryearly: STORYTIME: HOW WE MET, "We were both twenty minutes early." (45 s vertical, Star Talk Trends §19.4,
// music: cinematic · Gm). Story 0–40.6, then the shared end card. The format look lives in ./story.js (identical in all
// five STORYTIME films). ♍ Virgo tells it from the couch; ♓ Pisces cries on the other end. Rewatch bait: the clock on
// the living-room wall has a sticker: "+20 MIN".
//   0.0–5.6    "We were both | *twenty minutes* early."  "I got there early. to look *chill.*"
//   5.6–13.9   FLASHBACK, FIRST DATE · 6:40 PM. "6:40 PM. | *Act natural.*"  A café on a night street. Virgo hides
//              behind a lamppost (much thinner than Virgo). PLAN: ACT NATURAL. Across the street, behind a tree:
//              a ♊ Gemini, also hiding. Both duck. Both fake-check their phones. Both walk off around the block… and
//              pass each other, looking very hard at the sky (LAP 2).
//   13.9–18.4  "We both walked | *around the block.*"  "twice. we passed each other *twice.*"
//  18.38       card cut.
//   18.4–27.8  FLASHBACK, 6:58 PM. "The | *confession.*"  Both reach the café door at once, BONK. "just got here!" ×2.
//              Silence. Gemini: "…since 6:40, actually." Virgo: "6:38." They crack up; the door swings open, warm light.
//   27.8–33.4  "Now we're early | *to everything.*"  Gemini pops onto the couch: "brunch is at noon. we leave at *ten.*"
//   33.4       LESSON UNLOCKED: "Eager is | *nothing to hide.*"  +20 MINUTES
//   37.95      "*Early*, together."
import { prog, ease, lerp, clamp } from '../../../src/lib.js'
import {
  makeFilm, drawBits, sparkles, hearts, bubble, label, signChar, pop01, outK, r3,
  GOLD, BONE, PINK, INK, MONO, INTER, FR,
} from './story.js'

const ACC = '#6fe0c0'
const PHONE = ['KKKK', 'KBBK', 'KBBK', 'KBBK', 'KKKK']

// ── the street: night sky, rooftops, the café (striped awning, warm window, door), a lamppost (left), a tree (right)
function street(x, t, door = 0) {
  const g = x.createLinearGradient(0, FR.y, 0, 1150); g.addColorStop(0, '#0e1636'); g.addColorStop(1, '#2a2458')
  x.fillStyle = g; x.fillRect(FR.x, FR.y, FR.w, FR.h)
  for (let i = 0; i < 26; i++) { const sx = FR.x + ((i * 137) % FR.w), sy = FR.y + 90 + ((i * 71) % 220), a = 0.4 + 0.6 * Math.abs(Math.sin(t * 1.2 + i)); x.fillStyle = `rgba(255,246,220,${a.toFixed(2)})`; x.fillRect(sx, sy, 4, 4) }
  x.fillStyle = '#f4e8cc'; x.fillRect(880, 560, 40, 40); x.fillStyle = '#0e1636'; x.fillRect(892, 552, 34, 34)
  // rooftops
  x.fillStyle = '#1a1438'
  for (const [l, w, h] of [[FR.x, 200, 360], [FR.x + 190, 160, 300], [FR.x + 720, 240, 340], [FR.x + 820, 140, 420]]) x.fillRect(l, 1150 - h, w, h)
  x.fillStyle = 'rgba(255,214,150,0.5)'
  for (const [wx, wy] of [[110, 860], [160, 930], [830, 880], [900, 800], [960, 940]]) x.fillRect(wx, wy, 22, 28)
  // the café
  const L = 370, R = 710, top = 720
  x.fillStyle = INK; x.fillRect(L - 8, top - 8, R - L + 16, 1150 - top + 8)
  x.fillStyle = '#5a3a2e'; x.fillRect(L, top, R - L, 1150 - top)
  for (let i = 0; i < 8; i++) { x.fillStyle = i % 2 ? BONE : ACC; x.fillRect(L - 20 + i * 47.5, top + 60, 47.5, 54) }
  x.fillStyle = INK; x.fillRect(L - 20, top + 112, R - L + 40, 8)
  x.fillStyle = '#f4e8cc'; x.font = `800 40px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CAFÉ', 540, top + 32)
  // window + door
  x.fillStyle = INK; x.fillRect(L + 20, top + 150, 150, 160); x.fillStyle = '#ffd98a'; x.fillRect(L + 28, top + 158, 134, 144)
  x.fillStyle = '#e8b85a'; x.fillRect(L + 28, top + 230, 134, 6)
  const dx = 580, dw = 110, dh = 260, dy = 1150 - dh
  x.fillStyle = INK; x.fillRect(dx - 6, dy - 6, dw + 12, dh + 6)
  x.fillStyle = '#ffe9b0'; x.fillRect(dx, dy, dw, dh)
  if (door > 0) { const gl = x.createRadialGradient(dx + dw / 2, dy + dh / 2, 10, dx + dw / 2, dy + dh / 2, 340); gl.addColorStop(0, `rgba(255,220,150,${(0.55 * door).toFixed(3)})`); gl.addColorStop(1, 'rgba(255,220,150,0)'); x.fillStyle = gl; x.fillRect(dx - 340, dy - 300, dw + 680, 640) }
  x.fillStyle = '#7a4a34'; x.fillRect(dx, dy, dw * (1 - 0.8 * door), dh)
  x.fillStyle = GOLD; x.fillRect(dx + dw * (1 - 0.8 * door) - 22, dy + 130, 10, 10)
  // sidewalk
  x.fillStyle = '#3a3460'; x.fillRect(FR.x, 1150, FR.w, 150)
  x.fillStyle = 'rgba(255,255,255,0.06)'; for (let i = 0; i < FR.w; i += 90) x.fillRect(FR.x + i, 1150, 4, 150)
  x.fillStyle = INK; x.fillRect(FR.x, 1146, FR.w, 6)
}
function lamppost(x) {
  const px = 210
  const gl = x.createRadialGradient(px, 760, 0, px, 760, 260); gl.addColorStop(0, 'rgba(255,230,160,0.35)'); gl.addColorStop(1, 'rgba(255,230,160,0)')
  x.fillStyle = gl; x.fillRect(px - 260, 500, 520, 520)
  x.fillStyle = INK; x.fillRect(px - 10, 760, 20, 400)
  x.fillStyle = '#3a3460'; x.fillRect(px - 6, 760, 12, 396)
  drawBits(x, ['.KKKK.', 'KYYYYK', 'KYYYYK', '.KKKK.'], { K: INK, Y: '#ffe9a8' }, px, 745, 14, { outline: null })
}
function tree(x) {
  x.fillStyle = INK; x.fillRect(800, 900, 28, 260); x.fillStyle = '#6b4a2a'; x.fillRect(806, 900, 16, 256)
  drawBits(x, ['..GGGG..', '.GGGGGG.', 'GGGGgGGG', 'GGgGGGGG', 'GGGGGGgG', '.GGGGGG.', '..GGGG..'], { G: '#2f7a52', g: '#3fae6a' }, 814, 830, 26)
}

// ── flashback 1: the stakeout
const F1 = { plan: 1.0, spot: 2.4, duck: [3.4, 4.3], phone: [4.5, 6.0], exit: [6.0, 6.7], lap: [7.0, 8.3] }
function flash1(x, t, lt) {
  street(x, t)
  const duck = Math.sin(Math.PI * prog(lt, ...F1.duck)) * 40
  const ex = ease.inCubic(prog(lt, ...F1.exit))
  const ph = lt > F1.phone[0] && lt < F1.phone[1]
  // Gemini behind the tree (drawn before the tree's foliage? no: peeking from behind the trunk, in front of it)
  const gIn = pop01(lt, 2.0, 0.3, 2)
  const gx = lerp(810, 1150, ex), vx = lerp(200, -120, ex)
  if (lt < F1.exit[1]) {
    signChar(x, t, 'gemini', gx, 1045 + duck, 200, { mood: lt > F1.spot ? (ph ? 'squint' : 'wide') : 'neutral', look: ph ? [0, 1] : [-1, 0], pop: gIn, seed: 8, hops: [5.6 + 2.1, 5.6 + F1.duck[0], 5.6 + F1.exit[0]] })
    tree(x)
  } else tree(x)
  lamppost(x)
  if (lt < F1.exit[1]) {
    const vF = signChar(x, t, 'virgo', vx, 1045 + duck, 200, { mood: lt > F1.spot ? (ph ? 'squint' : 'wide') : 'squint', look: ph ? [0, 1] : lt > F1.spot ? [1, 0] : [1, 0], seed: 4, hops: [5.6 + 0.4, 5.6 + F1.duck[0], 5.6 + F1.exit[0]] })
    // the lamppost "hides" Virgo (a thin pole in front of a wide star)
    x.fillStyle = INK; x.fillRect(200 - 10, 900, 20, 260); x.fillStyle = '#3a3460'; x.fillRect(200 - 6, 900, 12, 256)
    if (ph) {
      drawBits(x, PHONE, { K: INK, B: '#7fd0ff' }, vF.x + 70, vF.cy + 40, 9)
      drawBits(x, PHONE, { K: INK, B: '#7fd0ff' }, gx - 70, vF.cy + 40, 9)
    }
  }
  label(x, 250, 820, 'PLAN: ACT NATURAL', pop01(lt, F1.plan, 0.3, 2.2) * outK(lt, [F1.spot - 0.2, F1.spot]), { size: 30, bg: ACC, rot: -0.06 })
  label(x, 700, 760, '!?', pop01(lt, F1.spot, 0.25, 2.8) * outK(lt, [F1.duck[0], F1.duck[0] + 0.2]), { size: 56, bg: GOLD, rot: 0.1 })
  // lap 2: they pass each other, both staring at the sky
  if (lt > F1.lap[0]) {
    const p = prog(lt, ...F1.lap)
    signChar(x, t, 'virgo', lerp(1150, -100, p), 1080, 190, { mood: 'squint', look: [0, -1], seed: 4, hops: [0, 0.3, 0.6, 0.9, 1.2].map(d => 5.6 + F1.lap[0] + d) })
    signChar(x, t, 'gemini', lerp(-100, 1150, p), 1090, 190, { mood: 'squint', look: [0, -1], seed: 8, hops: [0.15, 0.45, 0.75, 1.05].map(d => 5.6 + F1.lap[0] + d) })
    label(x, 540, 640, 'LAP 2', pop01(lt, F1.lap[0] + 0.1, 0.3, 2.4), { size: 44, bg: BONE, rot: -0.05 })
  }
}

// ── flashback 2: the confession
const F2 = { walk: [0.2, 0.9], bonk: 0.9, said: 1.4, saidOut: 3.3, since: 3.6, mine: 5.1, laugh: 6.3, door: [6.8, 7.6] }
function flash2(x, t, lt) {
  street(x, t, ease.inOutCubic(prog(lt, ...F2.door)))
  lamppost(x); tree(x)
  const w = ease.outCubic(prog(lt, ...F2.walk))
  const rb = Math.exp(-Math.max(0, lt - F2.bonk) * 6) * (lt > F2.bonk ? 30 : 0)
  const laugh = lt > F2.laugh
  const vx = lerp(-100, 430, w) - rb, gx = lerp(1180, 660, w) + rb
  const hopL = [F2.bonk, F2.mine, F2.laugh, F2.laugh + 0.3, F2.laugh + 0.6].map(d => 18.378 + d)
  signChar(x, t, 'virgo', vx, 1070, 220, { mood: laugh ? 'happy' : lt > F2.since ? 'wide' : lt > F2.bonk ? 'wide' : 'neutral', look: [1, 0], seed: 4, hops: hopL, squash: lt > F2.bonk && lt < F2.bonk + 0.2 ? 0.12 : 0 })
  signChar(x, t, 'gemini', gx, 1070, 220, { mood: laugh ? 'happy' : lt > F2.mine ? 'wide' : lt > F2.bonk ? 'wide' : 'neutral', look: [-1, 0], seed: 8, hops: hopL.map(h => h + 0.12), squash: lt > F2.bonk && lt < F2.bonk + 0.2 ? 0.12 : 0 })
  sparkles(x, t, 545, 960, 18.378 + F2.bonk, 8, 70, 1, [GOLD, BONE])
  label(x, 545, 900, 'BONK', pop01(lt, F2.bonk, 0.2, 2.8) * outK(lt, [F2.bonk + 0.5, F2.bonk + 0.7]), { size: 40, bg: GOLD })
  const so = outK(lt, [F2.saidOut, F2.saidOut + 0.2])
  bubble(x, 300, 830, 'just got here!', pop01(lt, F2.said, 0.3, 2.2) * so, { size: 34, tail: 'br' })
  bubble(x, 790, 830, 'just got here!', pop01(lt, F2.said + 0.05, 0.3, 2.2) * so, { size: 34, tail: 'bl', col: '#fff2b8' })
  bubble(x, 760, 760, '…since 6:40, | actually.', pop01(lt, F2.since, 0.3, 2.2), { size: 36, tail: 'bl', col: '#fff2b8' })
  bubble(x, 330, 700, '6:38.', pop01(lt, F2.mine, 0.3, 2.8), { size: 48, tail: 'br' })
  if (laugh) hearts(x, t, 545, 960, 18.378 + F2.laugh + 0.1, { n: 8, life: 2, spread: 260, cell: 8, seed: 6 })
}

// the room: a wall clock with a "+20 MIN" sticker; the framed photo: the café door at night
function room(x, t) {
  const cx = 600, cy = 600
  for (let j = -5; j <= 5; j++) for (let i = -5; i <= 5; i++) { const d = Math.hypot(i, j); if (d < 5.5) { x.fillStyle = d > 4.5 ? INK : '#f4e8cc'; x.fillRect(cx + i * 11 - 5.5, cy + j * 11 - 5.5, 11, 11) } }
  const h = 6.8 + t * 0.002
  const ha = (h / 12) * Math.PI * 2 - Math.PI / 2, ma = (h % 1) * Math.PI * 2 - Math.PI / 2
  x.strokeStyle = INK; x.lineCap = 'square'
  x.lineWidth = 8; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ha) * 26, cy + Math.sin(ha) * 26); x.stroke()
  x.lineWidth = 5; x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ma) * 40, cy + Math.sin(ma) * 40); x.stroke()
  label(x, cx + 10, cy + 84, '+20 MIN', 1, { size: 22, bg: ACC, rot: 0.08 })
}
function photo(x, cx, cy, w, h) {
  x.fillStyle = '#1a1438'; x.fillRect(cx - w / 2, cy - h / 2, w, h)
  x.fillStyle = '#5a3a2e'; x.fillRect(cx - 70, cy - 40, 140, 140)
  for (let i = 0; i < 5; i++) { x.fillStyle = i % 2 ? BONE : ACC; x.fillRect(cx - 80 + i * 32, cy - 50, 32, 26) }
  x.fillStyle = '#ffe9b0'; x.fillRect(cx - 18, cy + 20, 40, 80)
}

const F = makeFilm({
  id: 'trstoryearly', key: 'Gm', seed: 1904, accent: ACC,
  narrator: 'virgo', partner: 'gemini',
  heads: [
    'We were both | *twenty minutes* early.',
    '6:40 PM. | *Act natural.*',
    'We both walked | *around the block.*',
    'The | *confession.*',
    "Now we're early | *to everything.*",
  ],
  stamps: [null, 'FIRST DATE · 6:40 PM', null, 'FIRST DATE · 6:58 PM', null],
  lines: [
    { t: 1.2, text: 'I got there early. to look *chill.*' },
    { t: 6.0, text: 'hiding behind a *lamppost.*' },
    { t: 9.7, text: 'then I saw them. *also* hiding.' },
    { t: 14.2, text: 'we passed each other. *twice.*' },
    { t: 19.0, text: "we both said: *“just got here!”*" },
    { t: 23.4, text: 'they got there at *6:40.*' },
    { t: 28.75, text: 'brunch is at noon. we leave at *ten.*' },
  ],
  mood(t) {
    if (t < 3.0) return { mood: 'happy' }
    if (t < 5.6) return { mood: 'wink' }
    if (t < 9.7) return { mood: 'squint', look: [-1, -0.4] }
    if (t < 13.93) return { mood: 'wide', look: [-1, -0.4] }
    if (t < 18.38) return { mood: 'eyeroll' }
    if (t < 23.4) return { mood: 'wide', look: [-1, -0.4] }
    if (t < 27.82) return { mood: 'happy', look: [-1, -0.4] }
    if (t < 37.95) return { mood: 'sparkle', look: t < 31 ? [1, 0] : undefined }
    return { mood: 'heart' }
  },
  partnerIn: 28.3,
  partnerMood: t => (t < 31 ? { mood: 'happy', look: [-1, 0] } : { mood: 'sparkle' }),
  partnerHops: [30.2, 30.5],
  room, photo,
  flash: [flash1, flash2],
  talk(x, t, K) {
    if (K.pF) label(x, K.pF.x + 40, K.pF.top - 50, '10:02 AM', pop01(t, 30.0, 0.3, 2.4) * outK(t, [33.2, 33.4]), { size: 30, bg: ACC, rot: 0.08, font: MONO, weight: 700 })
  },
  lesson: { text: 'Eager is | *nothing to hide.*', chip: '+20 MINUTES' },
  last: { text: '*Early,* together.' },
  music: { breakdown: [13.933], hits: [27.822] },
  cues: [
    ['pop', r3(5.6 + F1.plan), 987.77, 0.035, -0.3], ['pop', r3(5.6 + F1.spot), 1318.51, 0.05, 0.3], ['pop', r3(5.6 + F1.spot + 0.08), 1567.98, 0.04, 0.3],
    ['whoosh', r3(5.6 + F1.duck[0]), 0.3, 0.03], ['tick', r3(5.6 + F1.duck[0] + 0.3), 0.05],
    ['tick', r3(5.6 + F1.phone[0]), 0.03], ['tick', r3(5.6 + F1.phone[0] + 0.5), 0.02], ['tick', r3(5.6 + F1.phone[0] + 1.0), 0.02],
    ['whoosh', r3(5.6 + F1.exit[0]), 0.4, 0.035], ['whoosh', r3(5.6 + F1.lap[0] + 0.6), 0.5, 0.04], ['pop', r3(5.6 + F1.lap[0] + 0.1), 880, 0.035, 0],
    ['tom', r3(18.378 + F2.bonk), 140, { gain: 0.22, decay: 0.18 }], ['pop', r3(18.378 + F2.bonk), 1318.51, 0.04, 0],
    ['pop', r3(18.378 + F2.said), 880, 0.035, -0.3], ['pop', r3(18.378 + F2.said + 0.05), 880, 0.035, 0.3],
    ['pop', r3(18.378 + F2.since), 783.99, 0.04, 0.3], ['pop', r3(18.378 + F2.mine), 1174.66, 0.05, -0.3],
    ...[0, 0.15, 0.3, 0.45].map((d, i) => ['pop', r3(18.378 + F2.laugh + d), [880, 987.77, 1174.66, 1318.51][i], 0.035, 0]),
    ['bell', r3(18.378 + F2.door[0]), 1567.98, 0.03, 1.0, 0.2], ['glitter', r3(18.378 + F2.door[0]), r3(18.378 + F2.door[1])],
    ['pop', 30.05, 1046.5, 0.035, 0.4],
  ],
})
export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
export const MUSIC = F.MUSIC
export const T = F.T
export const LINES = F.LINES
