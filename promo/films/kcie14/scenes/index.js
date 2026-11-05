// kcie14: CAUGHT IN 4K, "Taurus stayed dressed for cancelled plans" (short, loop, music: jazzy · F). Rows: m02.md #14
// World time w:
//   0.0  the getting-ready montage: OUTFIT 1 (no), OUTFIT 2 (no), OUTFIT 3 + the good shoes (YES). Mirror, sparkles.
//   3.6  BZZT: "so sorry!! can we do next week?"  Taurus deflates… 4.6 and refuses to change: cooks dinner in the outfit,
//        5.8 takes a selfie with the plant. Pisces (the plant's neighbour on the shelf) cries at how good they look.
//   7.4  Taurus strikes a pose on the couch.  7.9 = the freeze (frame 0). Last line: "This outfit is going out. With me."
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, MINT, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const C = 7.9
const OUTFITS = [[0.1, '#7fb3e8', 'NO.'], [1.1, '#f29a4a', 'NOPE.'], [2.1, '#c8283c', 'YES.']]
const PIS = { x: 880, y: 1000, s: 150 }
const TAU = w => {
  if (w < 3.6) return { x: 380, y: 1230, s: 320 }
  if (w < 4.6) return { x: 380, y: 1250, s: 320 }
  if (w < 5.8) return { x: lerp(380, 640, ease.inOutCubic(prog(w, 4.6, 4.9))), y: 1240, s: 300 }
  if (w < 7.4) return { x: lerp(640, 420, ease.inOutCubic(prog(w, 5.8, 6.1))), y: 1240, s: 300 }
  return { x: lerp(420, 360, ease.inOutCubic(prog(w, 7.4, 7.7))), y: lerp(1240, 1170, ease.inOutCubic(prog(w, 7.4, 7.7))), s: 320 }
}
const outfitAt = w => { let o = OUTFITS[0]; for (const f of OUTFITS) if (w >= f[0]) o = f; return o }

function outfit(x, T, w, col) {
  // a little scarf + a bow tie in the outfit colour (drawn on the sprite)
  box(x, T.x - T.s * 0.32, T.y + T.s * 0.05, T.s * 0.64, T.s * 0.1, col, { b: 4 })
  box(x, T.x + T.s * 0.12, T.y + T.s * 0.1, T.s * 0.1, T.s * 0.22, col, { b: 4 })
  if (col === '#c8283c') { R(x, INK, T.x - 70, T.y + T.s * 0.5 - 6, 50, 26); R(x, INK, T.x + 20, T.y + T.s * 0.5 - 6, 50, 26); R(x, GOLD, T.x - 64, T.y + T.s * 0.5, 38, 14); R(x, GOLD, T.x + 26, T.y + T.s * 0.5, 38, 14) }   // the good shoes
}

function world(x, w) {
  room(x, 'living', { fy: 1440 })
  // the mirror (left) during the montage, the stove (right) for dinner
  box(x, 60, 420, 220, 640, '#f2c75c', { b: 6 }); R(x, '#cfe8f6', 80, 440, 180, 600); R(x, '#ffffff', 100, 470, 24, 120)
  box(x, 700, 1100, 300, 340, '#e6e2d6', { b: 6, hi: '#f6f3ea' }); for (const bx of [740, 880]) { R(x, INK, bx, 1110, 80, 14) }
  if (w > 4.7 && w < 5.9) { box(x, 760, 1050, 120, 60, '#4a4f5c', { b: 5 }); for (let i = 0; i < 3; i++) R(x, 'rgba(255,255,255,0.5)', 780 + i * 30, 1000 - ((w * 60 + i * 20) % 60), 10, 30) }
  // the shelf with the plant and Pisces
  box(x, 700, 1090 - 0, 0, 0, BONE)
  box(x, 660, 1080 - 20, 380, 20, '#7a5234', { b: 5 })
  furn.plant(x, 740, 1060, 0.9)
  pisces(x, w, { ...PIS, y: 980, mood: 'sparkle', look: [-1, 0.6], tears: w > 2.2 ? 3 : 2, hops: [2.2, 2.5, 6.0, 6.3] })
  bubble(x, w, PIS.x - 40, 820, 2.3, 3.5, 'STUNNING', { size: 32, col: '#bfe9ff', tail: 0.3 })
  bubble(x, w, PIS.x - 40, 820, 6.0, C + 3, 'you look SO good', { size: 30, col: '#bfe9ff', tail: 0.3 })
  // the couch for the final pose
  if (w > 7.3) furn.couch(x, 160, 1380, 460, '#9a7be0')
  // Taurus
  const T = TAU(w), O = outfitAt(w)
  let mood = 'happy', look = [-1, -0.3]
  if (w < 3.6) { mood = w % 1 > 0.6 && O[2] !== 'YES.' ? 'squint' : 'sparkle'; look = [-1, -0.2] }
  if (w > 3.6 && w < 4.6) { mood = 'wide'; look = [1, -0.4] }
  if (w > 4.2 && w < 4.6) mood = 'squint'
  if (w > 4.6) { mood = 'happy'; look = [1, 0] }
  if (w > 5.8 && w < 7.4) { mood = 'wink'; look = undefined }
  if (w > 7.4) { mood = 'sparkle'; look = [0, 0] }
  star(x, w, 'taurus', { ...T, mood, look, hops: [0.15, 1.15, 2.15, 2.4, 3.65, 4.65, 5.85, 7.45], seed: 9, squash: w > 3.8 && w < 4.5 ? 0.12 : 0 })
  outfit(x, T, w, O[1])
  // the montage stickers
  OUTFITS.forEach(([t0, , verdict], i) => sticker(x, w, 540, 560, t0 + 0.05, t0 + 0.95, `OUTFIT ${i + 1}: *${verdict}*`, { size: 48, col: i === 2 ? GOLD : BONE, rot: [-0.04, 0.04, -0.03][i] }))
  if (w > 2.1 && w < 3.4) sparkles(x, w, T.x, T.y, 2.15, 14, 260, 1)
  // the cancel text
  if (w > 3.6 && w < 4.7) { const k = pop01(w, 3.6, 0.25, 2) * outK(w, [4.5, 4.7]); phone(x, w, { cx: 700, cy: 760, w: 380, h: 420, rot: 0.06, title: '♡ them', alpha: clamp(k), msgs: [{ w: 3.62, side: 'L', text: 'so sorry!! can we do next week?' }], fs: 30 }) }
  if (w > 4.6 && w < 5.8) { sticker(x, w, 540, 560, 4.65, 5.75, 'dinner, *in the outfit*', { size: 46, col: GOLD }); box(x, T.x + 120, T.y - 120, 120, 20, '#8a8f9c', { b: 4 }); R(x, INK, T.x + 230, T.y - 116, 70, 10) }
  // the selfie with the plant
  if (w > 5.8 && w < 7.4) {
    sticker(x, w, 540, 560, 5.85, 7.3, 'selfie *with the plant*', { size: 46, col: GOLD, rot: 0.03 })
    const fl = w > 6.4 && w < 6.55 ? 1 : 0
    box(x, T.x + 150, T.y - 260, 90, 160, '#2a2148', { b: 5 }); R(x, fl ? '#ffffff' : '#7fd0ff', T.x + 160, T.y - 248, 70, 136)
    if (fl) { x.save(); x.globalAlpha = 0.5; x.fillStyle = '#fff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
  }
  if (w > 7.45) { hearts(x, w, 7.5, T.x, T.y - 150, { n: 5 }); sparkles(x, w, T.x, T.y, 7.5, 12, 240, 3) }
}

const EP = makeCaught({
  id: 'kcie14', sign: 'taurus', name: 'Taurus',
  hook: 'Plans cancelled. | Staying *dressed anyway.*', hookColor: '#ff9a7a',
  earlier: '1 HOUR EARLIER', clock0: '18:40', clockScale: 420,
  catches: [{ s: 0, c: C, circle: w => { const T = TAU(w); return { x: T.x, y: T.y + 10, rx: 220, ry: 220, lx: 60, ly: 1530, labelSide: 1 } } }],
  frame: { z: 1.08, fx: 540, fy: 1020 },
  ending: 'loop', last: 'This outfit is going out. | *With me.*', lastColor: '#ff9a7a',
  world,
  cues: [
    ...OUTFITS.flatMap(([t0], i) => [['whoosh', t0, 0.25, 0.04], ['pop', t0 + 0.1, [523.25, 587.33, 783.99][i], 0.045, 0], ['tom', t0 + 0.5, [150, 140, 100][i], { gain: 0.18, decay: 0.18 }]]),
    ['glitter', 2.15, 2.7], ['bell', 2.2, 1760, 0.03, 1.0, 0], ['pluck', 2.35, 1318.51, 0.035, 0.5, 0.5],
    ['tick', 3.6, 0.06], ['tick', 3.67, 0.06], ['pop', 3.62, 987.77, 0.05, 0.3], ['pop', 4.0, 392, 0.04, 0], ['pop', 4.15, 349.23, 0.04, 0],
    ['pop', 4.65, 880, 0.04, 0], ...Array.from({ length: 6 }, (_, i) => ['tick', +(4.9 + i * 0.12).toFixed(2), 0.03]),
    ['pop', 5.85, 1174.66, 0.04, 0], ['tick', 6.4, 0.1], ['pop', 6.42, 2093, 0.03, 0.2], ['pluck', 6.05, 1567.98, 0.035, 0.5, 0.5],
    ['whoosh', 7.4, 0.3, 0.04], ['glitter', 7.5, 7.9],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, RED, MINT, SKYB]
