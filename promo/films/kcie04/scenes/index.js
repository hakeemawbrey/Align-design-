// kcie04: CAUGHT IN 4K, "Cancer saved a 'gn' screenshot" (short, loop, music: dreamy · Eb). Rows: m02.md #4
// World time w:
//   0.0  in bed, 11:58 PM. The crush texts "gn :)". Cancer: heart eyes.   1.2 ZOOM 400% on the smiley.
//   2.4  the folder "PROOF THEY LIKE ME" (47 screenshots).   3.8 Cancer PRINTS it.   5.0 frames it on the wall (a gallery:
//        "lol", "ok!", "haha", now "gn :)").   6.3 Pisces comes in, sees the frame and weeps: "it’s got a smiley".
//   7.5  the crush again: "sweet dreams :)". SCREENSHOT (white flash), folder → 48.  8.3 = the freeze (frame 0). Loops.
import {
  makeCaught, room, furn, phone, star, pisces, bubble, sticker, label, box, R, sparkles, hearts,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, RED, SKYB, INTER,
} from '../../kcie01/caughtkit.js'

const C = 8.3
const CAN = { x: 330, y: 1250, s: 330 }, PH = { cx: 780, cy: 930, w: 400, h: 700 }, PIS = { x: 880, y: 1530, s: 190 }
const FRAMES = [[120, 600, 'lol'], [300, 560, 'ok!'], [470, 610, 'haha'], [210, 790, 'hi :)'], [400, 800, 'gn :)']]
const MSGS = [{ w: 0.4, side: 'L', text: 'gn :)' }, { w: 7.5, side: 'L', text: 'sweet dreams :)' }]

function folder(x, w, { sx, sy, sw, sh }) {
  R(x, '#1d1640', sx, sy, sw, 84); label(x, 'PROOF THEY LIKE ME', sx + sw / 2, sy + 44, { size: 24, col: GOLD, shadow: false })
  const n = w > 7.6 ? 48 : 47
  for (let i = 0; i < 20; i++) { const cx = sx + 26 + (i % 4) * 84, cy = sy + 110 + Math.floor(i / 4) * 110; box(x, cx, cy, 64, 90, i === 19 && n === 48 ? GOLD : '#efe6d6', { b: 3 }); R(x, '#3d7cf0', cx + 8, cy + 14, 40, 10); R(x, '#c9bfa8', cx + 8, cy + 34, 30, 10) }
  label(x, `${n} SCREENSHOTS`, sx + sw / 2, sy + sh - 40, { size: 26, col: BONE, shadow: false })
}
function zoom(x, w, { sx, sy, sw, sh }) {
  R(x, '#efe6d6', sx, sy, sw, sh)
  const k = 1 + 0.15 * Math.sin(w * 6)
  label(x, ':)', sx + sw / 2, sy + sh / 2 - 40, { size: 220 * k, col: INK, font: INTER, weight: 800, shadow: false })
  label(x, 'ZOOM 400%', sx + sw / 2, sy + sh - 60, { size: 30, col: RED, shadow: false })
}

function world(x, w) {
  room(x, 'bedroom', { fy: 1460 })
  // the wall gallery of framed texts (the newest one appears at 5.0)
  FRAMES.forEach(([fx, fy, txt], i) => {
    const k = i < 4 ? 1 : pop01(w, 5.0, 0.3, 2.4)
    if (k <= 0.01) return
    x.save(); x.translate(fx, fy); x.scale(k, k); x.rotate((i % 2 ? 0.04 : -0.03))
    furn.frame(x, 0, 0, 150, 130, '#f6f3ea')
    box(x, -50, -22, 100, 44, i === 4 ? '#ffd6e6' : '#efe6d6', { b: 3 }); label(x, txt, 0, 0, { size: 24, col: INK, font: INTER, weight: 800, shadow: false })
    x.restore()
  })
  if (w > 5.0 && w < 6.2) sparkles(x, w, 400, 800, 5.05, 10, 140, 1)
  // the printer on the desk (left), printing at 3.8
  box(x, 90, 1070, 300, 26, '#7a5234', { b: 6 })
  box(x, 150, 970, 180, 100, '#d9d4e6', { b: 6, hi: '#efeaf8' }); R(x, INK, 170, 990, 140, 10)
  const pr = clamp(prog(w, 3.9, 4.8)), fly = ease.inOutCubic(prog(w, 4.9, 5.05))
  if (w > 3.9 && w < 5.05) {
    const px = lerp(240, 400, fly), py = lerp(970 - 110 * pr, 800, fly)
    x.save(); x.translate(px, py); x.rotate(-0.6 * fly)
    box(x, -50, -60, 100, 120, '#ffffff', { b: 3 }); label(x, 'gn :)', 0, 0, { size: 24, col: INK, font: INTER, weight: 800, shadow: false })
    x.restore()
  }
  // the bed + Cancer under the blanket
  furn.bed(x, 40, 1400, 640, '#6aa3d8')
  let mood = 'sparkle', look = [1, -0.4]
  if (w > 0.45 && w < 1.2) { mood = 'heart'; look = undefined }
  if (w > 1.2 && w < 2.4) { mood = 'wide'; look = [1, -0.6] }
  if (w > 3.8 && w < 5.2) { mood = 'happy'; look = [1, -0.2] }
  if (w > 5.2 && w < 7.5) { mood = 'heart'; look = undefined }
  if (w > 7.5) { mood = 'wide'; look = [1, -0.5] }
  star(x, w, 'cancer', { ...CAN, mood, look, hops: [0.5, 0.75, 1.0, 2.45, 3.85, 5.05, 5.3, 7.55], seed: 5, blush: w > 0.45 })
  box(x, 40, 1395, 640, 90, '#8fc2ef', { b: 6, hi: '#b7d8f6' })        // the blanket over the bottom of the star
  if (w > 0.45 && w < 1.3) hearts(x, w, 0.5, CAN.x, CAN.y - 160, { n: 6 })
  // the phone
  const scr = w > 1.2 && w < 2.4 ? zoom : (w > 2.4 && w < 3.8) || w > 7.9 ? folder : null
  phone(x, w, { ...PH, rot: -0.05 + 0.015 * Math.sin(w * 2), title: '♡ them', msgs: MSGS, screen: scr, fs: 34 })
  // the SCREENSHOT flash (7.85…): white on the phone, a shutter frame
  const fl = w > 7.85 ? Math.max(0, 1 - (w - 7.85) / 1.2) : 0
  if (fl > 0) { x.save(); x.globalAlpha = 0.85 * fl; x.fillStyle = '#ffffff'; x.fillRect(PH.cx - 220, PH.cy - 370, 440, 740); x.restore(); label(x, 'SCREENSHOT SAVED', PH.cx, PH.cy - 420, { size: 30, col: GOLD, alpha: clamp(fl * 3) }) }
  // Pisces arrives and weeps at the frame
  const pk = pop01(w, 6.3, 0.35, 2)
  if (pk > 0.01) { pisces(x, w, { ...PIS, pop: pk, mood: 'sparkle', look: [-1, -1], tears: w > 6.8 ? 3 : 2, hops: [6.4, 6.9, 7.2] }); bubble(x, w, PIS.x - 70, PIS.y - 200, 6.8, C + 3, 'it’s got a|SMILEY', { size: 34, col: '#bfe9ff', tail: 0.4 }) }
  // stickers for each step
  sticker(x, w, 540, 520, 2.45, 3.7, 'the *archive*', { size: 46, col: GOLD, rot: -0.04 })
  sticker(x, w, 300, 1150, 3.85, 4.9, 'step 2: *print it*', { size: 46, col: GOLD, rot: 0.04 })
  sticker(x, w, 600, 1000, 5.05, 6.2, 'step 3: *frame it*', { size: 46, col: GOLD, rot: -0.03 })
}

const EP = makeCaught({
  id: 'kcie04', sign: 'cancer', name: 'Cancer',
  hook: 'Screenshotting *‘gn’* | for the archive.', hookColor: '#c7d3ff',
  earlier: '11 MINUTES EARLIER', clock0: '23:58', clockScale: 80,
  catches: [{ s: 0, c: C, circle: () => ({ x: CAN.x, y: CAN.y - 30, rx: 215, ry: 220, lx: 60, ly: 1050, labelSide: 1 }) }],
  frame: { z: 1.1, fx: 540, fy: 1000 },
  ending: 'loop', last: 'The smiley stays | in the *archive.*', lastColor: '#c7d3ff',
  world,
  cues: [
    ['pop', 0.4, 987.77, 0.05, 0.3], ['pop', 0.5, 1318.51, 0.04, 0.3], ['pluck', 0.55, 1567.98, 0.04, 0.6, -0.3], ['glitter', 0.5, 0.9],
    ['riser', 1.2, 1.6, 0.03], ['pop', 1.6, 1760, 0.04, 0.3], ['whoosh', 2.4, 0.3, 0.04], ['tick', 2.45, 0.05],
    ...Array.from({ length: 12 }, (_, i) => ['tick', +(3.9 + i * 0.075).toFixed(3), 0.035]), ['pop', 4.85, 659.25, 0.04, 0],
    ['whoosh', 4.9, 0.25, 0.04], ['tom', 5.05, 140, { gain: 0.2, decay: 0.15 }], ['bell', 5.1, 1760, 0.03, 1.0, -0.3], ['glitter', 5.05, 5.5],
    ['pop', 6.3, 880, 0.04, 0.4], ['pluck', 6.8, 1174.66, 0.035, 0.6, 0.4],
    ['pop', 7.5, 987.77, 0.05, 0.3], ['tick', 7.85, 0.1], ['pop', 7.86, 2093, 0.04, 0.3], ['whoosh', 7.86, 0.2, 0.05],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [PINK, SKYB, outK]
