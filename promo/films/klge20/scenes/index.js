// klge20 · Your Sign's Love Glitch · "Pisces.exe: Lost in You" (LONG, 84 s vertical, star_advice post, hard cut).
//   0.0   frame 0: PISCES.EXE merged into someone else. Pisces mid-dissolve into its partner (an Aries star), half
//         see-through and tinted orange, crying; its own folders (MY ART · MY SWIMS · MY FRIENDS) being deleted.
//         Promise: wait for the patch notes.
//   CH 1  THE GLITCH (3.0): Pisces adopts their playlist, their friends, their gym days; its own folders go to the
//         trash one by one, and its colour drifts toward theirs.
//   CH 2  WHERE IT COMES FROM (22.0): ★ astrology says: Pisces is co-ruled by Neptune and Jupiter. THE STARS: empathy
//         is the gift; you can feel with someone without becoming them. Memories: Pisces painting, Pisces swimming.
//   CH 3  WHAT IT COSTS (41.0): "what do YOU want to do this weekend?" → "…whatever you want?" → "i don't know
//         anymore." Error: USER PROFILE NOT FOUND. Pisces sobs in two windows.
//   CH 4  PATCH NOTES (61.0): PISCES.EXE 2.0; notes: keep one thing that's only yours · see your friends · bring your
//         world into theirs. The folders restore; Pisces paints again; the partner: "can i paint with you?" "YES."
//   80.5  last line "Keep your *own* ocean.", held to the cut at 84.0.
import { makeGlitch, R, box, label, bubble, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const CH = [3.0, 22.0, 41.0, 61.0]
const PIS = '#7c74f0', ARI = '#f0603a'
const PX = 330, PY = 1200, AX = 760, AY = 1200
const RESTORE = 72.0, JOIN = 74.5
const ADOPT = [{ at: 4.0, mine: 'MY ART', theirs: 'their playlist ✓' }, { at: 9.0, mine: 'MY SWIMS', theirs: 'their friends ✓' }, { at: 14.0, mine: 'MY FRIENDS', theirs: 'their gym days ✓' }]
const hex = n => Math.round(clamp(n, 0, 255)).toString(16).padStart(2, '0')
const mixCol = (a, b, k) => { const A = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), B = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16)); return '#' + A.map((v, i) => hex(lerp(v, B[i], k))).join('') }
const tintAt = t => t < 3 ? 0.45 : t < CH[3] ? clamp(0.1 + ADOPT.filter(a => t > a.at + 1).length * 0.15) : lerp(0.55, 0, ease.inOutQuad(prog(t, RESTORE, RESTORE + 1.2)))
function folderRow(x, t) {
  // Pisces' own folders: deleted over ch 1 (frame 0: mid-delete), restored at RESTORE
  ADOPT.forEach((a, i) => {
    const fx = 150 + i * 150, fy = 640
    const gone = t < 3 ? (i === 0 ? 0.5 : 0) : t < RESTORE ? prog(t, a.at + 0.6, a.at + 1.2) : 1 - prog(t, RESTORE + i * 0.4, RESTORE + 0.4 + i * 0.4)
    if (gone >= 1) return
    x.save(); x.globalAlpha = 1 - gone; x.translate(fx + gone * 40, fy + gone * 80); x.scale(1 - gone * 0.6, 1 - gone * 0.6)
    box(x, -50, -20, 40, 16, '#7fb0e8', { b: 3 }); box(x, -50, -8, 100, 70, '#7fb0e8', { b: 4 }); label(x, a.mine, 0, 80, { size: 18, col: BONE, stroke: INK })
    x.restore()
  })
  // the trash can
  box(x, 600, 620, 70, 80, '#5a5470', { b: 4 }); R(x, INK, 594, 610, 82, 10)
  if (t >= RESTORE + 0.2) ADOPT.forEach((_, i) => { if (t > RESTORE + 0.4 + i * 0.4) sticker(x, t, 'restored ✓', 150 + i * 150, 760, RESTORE + 0.4 + i * 0.4, 79.5, { col: MINT, size: 18, rot: 0 }) })
}
function adoptedList(x, t) {
  if (t < 3.5 || t >= RESTORE) return
  ADOPT.forEach((a, i) => {
    if (t < a.at) return
    const k = pop01(t, a.at, 0.25, 2.4)
    x.save(); x.translate(860, 650 + i * 56); x.scale(k, k); box(x, -130, -22, 260, 44, '#ffd8c8', { b: 3 }); label(x, a.theirs, 0, 1, { size: 20, col: INK, font: INTER, weight: 800 }); x.restore()
  })
}
function memory(x, t, at, out, kind, px, py) {
  const k = pop01(t, at, 0.3, 2.2) * outK(t, [out - 0.2, out])
  if (k <= 0.01) return
  x.save(); x.translate(px, py); x.scale(k, k)
  box(x, -170, -150, 340, 300, '#f4ede0', { b: 5 }); R(x, kind === 'art' ? '#2a2448' : '#3a7ac8', -150, -130, 300, 220)
  if (kind === 'art') { box(x, 20, -110, 110, 140, '#f4f0fa', { b: 3 }); for (let i = 0; i < 4; i++) R(x, [PINK, GOLD, '#7fd0f0', MINT][i], 34 + i * 22, -90 + (i % 2) * 40, 18, 40) }
  else for (let i = 0; i < 4; i++) for (let j = 0; j < 6; j++) R(x, '#9fd8ff', -140 + j * 50 + ((Math.floor(t * 4) + i) % 2) * 20, -100 + i * 50, 30, 6)
  x.restore()
  if (k > 0.5) K1.star(x, t, 'pisces', px - 60, py + 30, 150 * Math.min(1, k), { mood: 'happy', seed: 6, glyph: null })
  label(x, kind === 'art' ? 'before: painting' : 'before: swimming', px, py + 128, { size: 22, col: INK, font: INTER, weight: 800, alpha: k })
}
let K1 = null
function easel(x, t, px, py) { R(x, INK, px - 6, py - 160, 12, 220); box(x, px - 90, py - 200, 180, 150, '#f4f0fa', { b: 4 }); const p = prog(t, RESTORE + 1.4, 79); for (let i = 0; i < 6; i++) if (p * 6 > i) R(x, [PINK, GOLD, '#7fd0f0', MINT, '#ff8fb1', '#c9a6ff'][i], px - 70 + (i % 3) * 46, py - 180 + Math.floor(i / 3) * 60, 40, 46) }

function scene(x, t, K) {
  K1 = K
  R(x, '#141038', 70, 556, 940, 880); R(x, '#241c44', 70, 1330, 940, 106)
  folderRow(x, t)
  adoptedList(x, t)
  memory(x, t, 32.4, 36.6, 'art', 330, 930)
  memory(x, t, 36.4, 40.6, 'swim', 740, 930)
  const painting = t >= RESTORE + 1.0
  if (painting) easel(x, t, 540, 1180)
  // the partner (Aries star)
  K.star(x, t, 'aries', painting ? AX + 40 : AX, AY, 240, { mood: t > JOIN ? 'happy' : t > 42 && t < 47 ? 'neutral' : 'happy', look: [-1, 0], seed: 4, hops: [4.0, 9.0, 14.0, 42.0, JOIN, JOIN + 1.2] })
  // Pisces: dissolving into the partner, tinted toward its colour
  const tint = tintAt(t)
  const merge = t < 3 ? 0.5 : t < CH[3] ? clamp(ADOPT.filter(a => t > a.at + 1).length * 0.12) : lerp(0.36, 0, prog(t, RESTORE, RESTORE + 1.2))
  const px = lerp(PX, AX - 120, merge)
  x.save(); x.globalAlpha = 1 - merge * 0.9
  K.hero(x, t, px, PY, 260, { color: mixCol(PIS, ARI, tint), mood: painting ? (t > JOIN + 1.1 ? 'heart' : 'happy') : t > 46 && t < 61 ? 'wide' : 'sparkle', look: [1, 0], tears: painting ? 2 : t > 46 && t < 61 ? 3 : 2, hops: [4.6, 9.6, 14.6, 43.5, 46.0, JOIN + 1.1] })
  x.restore()
  if (t < 3) { x.save(); x.globalAlpha = 0.5; for (let i = 0; i < 8; i++) R(x, ['#b0a8ff', '#ffb090'][i % 2], px + 60 + i * 18, PY - 80 + Math.sin(t * 6 + i) * 40, 12, 12); x.restore() }
  if (painting) { R(x, INK, PX + 150, 1080, 10, 90); R(x, PINK, PX + 146, 1070, 18, 18) }
  if (t > JOIN) { R(x, INK, AX - 110, 1080, 10, 90); R(x, GOLD, AX - 114, 1070, 18, 18) }
  bubble(x, t, AX - 40, 950, 42.0, 45.4, 'what do YOU want to do this weekend?', { size: 28, col: '#ffe0d0', maxW: 380 })
  bubble(x, t, PX + 40, 940, 43.6, 45.8, '…whatever you want?', { size: 30 })
  bubble(x, t, PX + 40, 940, 46.0, 49.6, 'i don’t know anymore.', { size: 30 })
  bubble(x, t, AX - 30, 950, JOIN, 77.6, 'can i paint with you?', { size: 30, col: '#ffe0d0', maxW: 360 })
  bubble(x, t, PX + 30, 920, JOIN + 1.1, 79.4, 'YES.', { size: 44 })
  if (t > JOIN + 1.1) { hearts(x, t, JOIN + 1.1, 540, 1000, { n: 8 }); sparkles(x, t, 540, 1000, JOIN + 1.2, 14, 220, 1, [PINK, GOLD, '#7fd0f0']) }
}

const F = makeGlitch({
  id: 'klge20', sign: 'pisces', len: 84, ending: 'cut',
  hook: 'PISCES.EXE merged into *someone else.*',
  promise: 'wait for the *patch notes* ↓',
  err: { msg: ['Deleting: MY ART…', 'Becoming: them. 50%.'], out: 2.75 },
  notResp: [[-1, 2.7], [48.0, 50.0]],
  hits: [
    { kind: 'whip', at: 0.5, x: 520, y: 1100, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: 4.8, dur: 0.4, g: 0.5 }, { kind: 'glitch', at: 9.8, dur: 0.4, g: 0.5 }, { kind: 'glitch', at: 14.8, dur: 0.4, g: 0.5 }, { kind: 'scratch', at: 18.2, dur: 0.7 },
    { kind: 'flash', at: 32.4, col: '#7fb0e8' }, { kind: 'whip', at: 46.0, x: PX + 100, y: 1050, z: 0.35, hold: 1.4 }, { kind: 'glitch', at: 48.0, dur: 0.6 }, { kind: 'flash', at: RESTORE, col: MINT }, { kind: 'flash', at: JOIN + 1.1, col: GOLD },
  ],
  chapters: [{ at: CH[0], n: 1, text: 'THE GLITCH' }, { at: CH[1], n: 2, text: 'WHERE IT COMES FROM' }, { at: CH[2], n: 3, text: 'WHAT IT COSTS' }, { at: CH[3], n: 4, text: 'PATCH NOTES' }],
  caps: [
    { at: 5.6, out: 20.6, text: 'the glitch: *becoming* the person you love' },
    { at: 24.4, out: 31.6, text: '★ astrology says: Pisces is co-ruled by *Neptune* and *Jupiter*', size: 52 },
    { at: 32.2, out: 40.6, text: 'remember who you were *before?*' },
    { at: 54.0, out: 60.6, text: 'losing yourself isn’t *closeness*' },
    { at: RESTORE + 0.2, out: 80.0, text: 'after the patch:' },
  ],
  errs: [{ at: 48.0, out: 50.0, msg: ['USER PROFILE NOT FOUND.', 'Hobbies: 0.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 50.4, out: 53.6, text: 'i’m crying in two windows *sob*', tears: 3 }],
  stars: [{ t: 22.6, text: 'empathy is your *gift.*' }, { t: 25.4, text: 'you can feel with someone without *becoming* them.' }],
  box: [{ open: 22.35, close: 31.6 }],
  patch: { at: CH[3] + 0.5, ver: '2.0', name: 'PISCES.EXE 2.0', dur: 1.5, out: 64.2 },
  notes: { at: 64.3, out: 71.8, ver: '2.0', gap: 2.0, items: ['keep one thing that’s *only yours.*', 'see your *friends.*', 'bring your world *into* theirs.'] },
  last: { at: 80.5, text: 'Keep your *own* ocean.' },
  trayCry: t => t > 46 && t < 61 ? 3 : 2,
  scene, accent: '#5a4ad0',
  cues: [...ADOPT.flatMap(a => [['pop', a.at, 659.25, 0.04, 0.3], ['whoosh', +(a.at + 0.6).toFixed(2), 0.5, 0.04], ['tick', +(a.at + 1.2).toFixed(2), 0.06]]), ['pop', 42.0, 659.25, 0.04, 0.3], ['pop', 43.6, 523.25, 0.04, -0.3], ['pop', 46.0, 466.16, 0.04, -0.3], ...[0, 1, 2].map(i => ['bell', +(RESTORE + 0.4 + i * 0.4).toFixed(2), 1046.5 + i * 130, 0.04, 0.8, 0]), ['pop', JOIN, 783.99, 0.04, 0.3], ['bell', JOIN + 1.1, 1567.98, 0.05, 1.4, 0], ['glitter', JOIN + 1.1, JOIN + 2.4]],
  music: { style: 'dreamy', key: 'E', seed: 1820, drop: 3.0, breakdown: [32.4, 50.4], lift: [CH[3], RESTORE] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
