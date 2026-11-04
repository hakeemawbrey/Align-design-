// nwfe05: WAIT FOR IT, "You said it once." (18 s vertical trial reel, Wait for It Vol. 2 ep 5, music: screwed · F#m)
// Story 0–15.6, then the short end card (2.4 s). No Align card transition (owner change, 4 Nov). The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Capricorn is writing | *a list.*" + "wait for it…". ♑ Capricorn, mid-stroke, writes on a big clipboard;
//             ♌ Leo waits on the right, nervous. Scribbled lines appear one by one.
//   3.95–9.3  "This looks | *very serious…*"  Stickers: "item fourteen: *?*" · "it's *two pages* now" ·
//             "…is that *your name* at the top?!". A second page flips down; LEO is underlined in red at the top.
//   9.45      card cut.
//   9.5–13.4  "The list? | *Gift ideas.*"  On the drop the clipboard turns to us: "THINGS LEO MENTIONED ONCE" ·
//             blue mittens · the cinnamon buns · a star map. ♑ CAPRICORN: "you said it once. I *remembered*."
//   13.45–15.5 "You *said* it once."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, pop01, outK, popOut, r3, sparkles, snowfall, SERIF, INTER } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const CB = { x: 545, y: 1010, w: 300, h: 380 }
const LINE_T = Array.from({ length: 14 }, (_, i) => r3(-0.4 + i * 0.62))
const CROSS = new Set([2, 5, 9])

function clipboard(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const rv = ease.outBack(prog(t, T.reveal, T.reveal + 0.45))
  const sc = 1 + 0.32 * rv
  x.save(); x.globalAlpha = k
  x.translate(CB.x, CB.y - 60 * rv); x.rotate(lerp(-0.06 + 0.015 * Math.sin(t * 1.4), 0, rv)); x.scale(sc, sc)
  const { w, h } = CB
  // the second page peeking out underneath (from the second sticker)
  const p2 = ease.outCubic(prog(t, T.stk[1] - 0.2, T.stk[1] + 0.3)) * (1 - rv)
  if (p2 > 0) { R(x, INK, -w / 2 + 10, -h / 2 + 30, w, h + 30 * p2); R(x, '#f4ead6', -w / 2 + 16, -h / 2 + 36, w - 12, h + 24 * p2 - 12) }
  // board + clip
  R(x, INK, -w / 2 - 8, -h / 2 - 8, w + 16, h + 16); R(x, '#a06a42', -w / 2, -h / 2, w, h)
  R(x, INK, -w / 2 + 16, -h / 2 + 24, w - 32, h - 40); R(x, '#fbf3e2', -w / 2 + 20, -h / 2 + 28, w - 40, h - 48)
  R(x, INK, -50, -h / 2 - 22, 100, 40); R(x, '#c9ccd8', -44, -h / 2 - 16, 88, 28)
  if (rv < 0.5) {
    // the title (scribble, then LEO underlined)
    const lk = prog(t, T.stk[2] - 0.05, T.stk[2] + 0.2)
    R(x, '#7a7a9a', -w / 2 + 34, -h / 2 + 44, 150, 10)
    x.font = `800 30px ${INTER}`; x.textAlign = 'left'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText('LEO', -w / 2 + 196, -h / 2 + 50)
    if (lk > 0) R(x, '#e8344e', -w / 2 + 194, -h / 2 + 66, 70 * lk, 6)
    // scribbled lines, appearing one by one, some crossed out
    LINE_T.forEach((at, i) => {
      if (t < at || i >= 12) return
      const lw = ease.outCubic(prog(t, at, at + 0.3)) * (120 + (i * 53) % 110)
      const ly = -h / 2 + 90 + i * 22
      R(x, '#8a8aa8', -w / 2 + 34, ly, lw, 8)
      if (CROSS.has(i) && t > at + 0.4) R(x, '#e8344e', -w / 2 + 28, ly + 2, lw + 12, 4)
    })
  } else {
    // the readable list
    const a = clamp((rv - 0.5) * 3)
    x.globalAlpha = k * a
    x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK
    x.font = `800 22px ${INTER}`; x.fillText('THINGS LEO', 0, -h / 2 + 52); x.fillText('MENTIONED ONCE', 0, -h / 2 + 78)
    R(x, '#e8344e', -110, -h / 2 + 96, 220, 5)
    x.font = `italic 500 27px ${SERIF}`; x.textAlign = 'left'
    const items = ['blue mittens', 'the cinnamon buns', 'a star map', 'that quiet café']
    items.forEach((s, i) => {
      const ik = clamp(prog(t, T.reveal + 0.35 + i * 0.18, T.reveal + 0.5 + i * 0.18))
      x.save(); x.globalAlpha *= ik
      R(x, GOLD, -w / 2 + 34, -h / 2 + 136 + i * 56, 14, 14)
      x.fillStyle = '#2a2a6a'; x.fillText(s, -w / 2 + 58, -h / 2 + 144 + i * 56)
      x.restore()
    })
  }
  x.restore()
}

// the pen in Capricorn's hand, scribbling at the board (hook + build)
function pen(x, t, T, ctx) {
  if (!ctx.hero || t > T.reveal) return
  const H = ctx.hero
  const px = CB.x - 80 + 60 * Math.sin(t * 7), py = CB.y - 60 + ((t * 0.62) % 1) * 120 + 6 * Math.sin(t * 19)
  x.save(); x.globalAlpha = clamp(popOut(t, T.out))
  x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(H.x + 100, H.F.cy); x.lineTo(px, py); x.stroke()
  x.strokeStyle = '#7a5ac8'; x.lineWidth = 6; x.beginPath(); x.moveTo(H.x + 100, H.F.cy); x.lineTo(px, py); x.stroke()
  R(x, INK, px - 6, py - 6, 12, 12)
  x.restore()
}

const EP = makeEpisode({
  id: 'nwfe05', key: 'F#m', seed: 4705,
  hero: { sign: 'capricorn', lineColor: '#d8c9a8' },
  date: { sign: 'leo' },
  pos: { hero: { x: 190, y: 1080, s: 230 }, date: { x: 910, y: 1090, s: 200 }, pis: { x: 990, y: 700, s: 120 } },
  h0: 'Capricorn is writing | *a list.*', h0Accent: '#d8c9a8',
  h1: 'This looks | *very serious…*',
  h2: 'The list? | *Gift ideas.*', h2Accent: PINK,
  last: 'You *said* it once.', lastAccent: GOLD,
  stickers: ['item fourteen: *?*', 'it’s *two pages* now', '…is that *your name* at the top?!'],
  line: { who: 'hero', text: 'you said it once. I *remembered*.' },
  focus: { x: CB.x, y: 980 },
  glow: { x: CB.x, y: 950 },
  moods(ph, t, T) {
    if (ph === 'hook' || ph === 'build') return { mood: 'squint', look: [1, 0.6] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'hook') return { mood: 'wide', look: [-1, 0], squash: 0.02 * Math.sin(t * 25) }
    if (ph === 'build') return { mood: 'wide', look: [-1, 0.3], squash: 0.03 * Math.sin(t * 25) }
    if (ph === 'reveal' && t > T.reveal + 0.6) return { mood: 'sparkle', look: [-1, 0] }
    return null
  },
  back(x, t, T) { snowfall(x, t, { n: 26, seed: 6, alpha: 0.45 * clamp(popOut(t, T.out)), y1: 940, speed: 0.6 }) },
  mid(x, t, T) { clipboard(x, t, T) },
  front(x, t, T, ctx) {
    pen(x, t, T, ctx)
    sparkles(x, t, CB.x, CB.y - 60, T.reveal + 0.05, 12, 260, 1, [GOLD, BONE, PINK])
  },
  cues: T => [
    ...LINE_T.filter(v => v >= 0 && v < T.reveal).map(v => ['tick', r3(v + 0.05), 0.014]),
    ['whoosh', T.stk[1] - 0.15, 0.3, 0.03], ['pluck', r3(T.stk[2] + 0.05), 311.13, 0.04, 0.5, 0],
    ...[0, 1, 2, 3].map(i => ['pop', r3(T.reveal + 0.4 + i * 0.18), [1046.5, 1174.66, 1318.51, 1567.98][i], 0.028, 0]),
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
