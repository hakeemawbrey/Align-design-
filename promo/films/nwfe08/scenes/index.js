// nwfe08: WAIT FOR IT, "Ran for you." (18 s vertical trial reel, Wait for It Vol. 2 ep 8, music: screwed · Am)
// Story 0–15.6, then the short end card (2.4 s). No Align card transition (owner change, 4 Nov). The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Sagittarius is in | *the queue.*" + "wait for it…". ♐ Sag bounces in a snowy queue for the ice rink
//             (rope posts, a sign); ♍ Virgo shivers beside it.
//   3.95–9.3  "And then it | *just left…*"  Sag sprints off the left edge. Stickers: "Sag has *left the queue*" ·
//             "Virgo, *alone*, in snow" · "…it's not *coming back?!*". Virgo's breath puffs, the snow thickens.
//   9.45      card cut.
//   9.5–13.4  "Where'd it go? | *For cocoa.*"  On the drop Sag skids back in with two steaming cups.
//             ♐ SAG: "you looked *cold*. so I ran."
//   13.45–15.5 "Ran *for* you."  Hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, pop01, outK, popOut, r3, plate, sparkles, snowfall, snowBank } from '../../nwfe01/scenes/wait.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const LEAVE = [4.0, 4.55]
const BACK = (T) => [T.reveal - 0.05, T.reveal + 0.35]
const heroDX = (t, T) => {
  if (t < LEAVE[0]) return 0
  const [b0, b1] = BACK(T)
  if (t < b0) return -460 * ease.inCubic(prog(t, ...LEAVE))
  const p = prog(t, b0, b1)
  return lerp(-460, 0, ease.outBack(p, 1.6))
}

function queue(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  x.save(); x.globalAlpha = k
  // rope posts + a velvet-ish rope behind the two stars
  const posts = [80, 380, 680, 1000]
  for (let i = 0; i < posts.length - 1; i++) {
    x.strokeStyle = INK; x.lineWidth = 14; x.beginPath(); x.moveTo(posts[i], 1010)
    x.quadraticCurveTo((posts[i] + posts[i + 1]) / 2, 1070, posts[i + 1], 1010); x.stroke()
    x.strokeStyle = '#c94f6d'; x.lineWidth = 7; x.beginPath(); x.moveTo(posts[i], 1010)
    x.quadraticCurveTo((posts[i] + posts[i + 1]) / 2, 1070, posts[i + 1], 1010); x.stroke()
  }
  for (const px of posts) { R(x, INK, px - 12, 990, 24, 200); R(x, GOLD, px - 7, 995, 14, 190); R(x, INK, px - 22, 1182, 44, 16); R(x, '#c9ccd8', px - 18, 1184, 36, 10) }
  // the sign
  R(x, INK, 530, 760, 14, 180); R(x, '#7a4a2a', 534, 760, 6, 176)
  R(x, INK, 420, 700, 236, 80); R(x, '#eef6ff', 426, 706, 224, 68)
  x.font = "800 30px Inter, Arial, sans-serif"; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('ICE RINK', 538, 741)
  R(x, '#eef6ff', 420, 690, 236, 14)
  x.restore()
}

function cups(x, t, T, ctx) {
  if (!ctx.hero || t < BACK(T)[0]) return
  const k = clamp(popOut(t, T.out))
  const H = ctx.hero
  const cup = (cx, cy, c) => {
    R(x, INK, cx - 30, cy - 40, 60, 74); R(x, c, cx - 24, cy - 34, 48, 62); R(x, '#ffffff', cx - 24, cy - 22, 48, 10)
    R(x, '#7a4a2a', cx - 20, cy - 36, 40, 8)
    R(x, INK, cx + 26, cy - 22, 18, 34); R(x, c, cx + 30, cy - 18, 8, 26)
  }
  x.save(); x.globalAlpha = k
  const lift = 6 * Math.sin(t * 4)
  cup(H.x - 110, H.F.cy + 20 + lift, '#5aa8e0')
  cup(H.x + 120, H.F.cy + 20 - lift, '#ff8fb1')
  for (let i = 0; i < 6; i++) {
    const ph = (t * 0.9 + i / 6) % 1, sx = i < 3 ? H.x - 110 : H.x + 120
    x.save(); x.globalAlpha = k * 0.75 * Math.sin(Math.PI * ph)
    R(x, '#ffffff', sx - 14 + (i % 3) * 12 + 6 * Math.sin(t * 3 + i), H.F.cy - 30 - ph * 100, 12, 12)
    x.restore()
  }
  x.restore()
  // the skid: snow spray as it lands
  const sk = prog(t, BACK(T)[0] + 0.2, BACK(T)[0] + 0.7)
  if (sk > 0 && sk < 1) for (let i = 0; i < 8; i++) { x.save(); x.globalAlpha = (1 - sk); R(x, '#ffffff', H.x - 120 - i * 18 - sk * 60, H.y + 110 - Math.sin(Math.PI * sk) * (30 + i * 8), 10, 10); x.restore() }
}

function speedLines(x, t, T, ctx) {
  // the dash off-screen
  const p = prog(t, LEAVE[0], LEAVE[1] + 0.3)
  if (p <= 0 || p >= 1) return
  x.save(); x.globalAlpha = 1 - p
  for (let i = 0; i < 6; i++) R(x, '#ffffff', ctx.P.hero.x + heroDX(t, T) + 90 + i * 30, ctx.P.hero.y - 80 + i * 26, 120, 6)
  x.restore()
  plate(x, 'BRB', 120, 900, { size: 30, bg: GOLD, alpha: Math.sin(Math.PI * p), rot: -0.1 })
}

const EP = makeEpisode({
  id: 'nwfe08', key: 'Am', seed: 4708,
  hero: { sign: 'sagittarius', lineColor: '#d6b4ff' },
  date: { sign: 'virgo' },
  pos: { hero: { x: 230, y: 1080, s: 225 }, date: { x: 860, y: 1090, s: 210 }, pis: { x: 990, y: 700, s: 120 } },
  heroDX,
  h0: 'Sagittarius is in | *the queue.*', h0Accent: '#d6b4ff',
  h1: 'And then it | *just left…*',
  h2: 'Where’d it go? | *For cocoa.*', h2Accent: PINK,
  last: 'Ran *for* you.', lastAccent: GOLD,
  stickers: ['Sag has *left the queue*', 'Virgo, *alone*, in snow', '…it’s not *coming back?!*'],
  line: { who: 'hero', text: 'you looked *cold*. so I ran.' },
  focus: { x: 620, y: 1000 },
  glow: { x: 540, y: 1000 },
  heroHops: [0.3, 0.9, 1.5, 2.1, 2.7, 3.3],
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'happy', look: [1, 0] }
    if (ph === 'build') return { mood: 'squint', look: [-1, 0] }
    if (ph === 'reveal' && t < T.reveal + 0.5) return { mood: 'wide', look: [1, 0] }
    return null
  },
  dateMoods(ph, t, T) {
    const shiver = 0.035 * Math.sin(t * 38)
    if (ph === 'hook') return { mood: 'squint', look: [-1, 0], squash: shiver }
    if (ph === 'build') return { mood: t > T.stk[1] ? 'wide' : 'neutral', look: [-1, 0], squash: shiver * 1.3 }
    if (ph === 'reveal' && t > T.reveal + 0.6) return { mood: 'heart', look: [-1, 0] }
    return null
  },
  back(x, t, T) {
    snowBank(x, t, T, 935)
    queue(x, t, T)
    const heavy = 1 + 1.2 * ease.inOutQuad(prog(t, 4, 9))
    snowfall(x, t, { n: Math.round(26 * heavy), seed: 12, alpha: 0.55 * clamp(popOut(t, T.out)), y1: 1300, speed: 0.8 })
  },
  front(x, t, T, ctx) {
    speedLines(x, t, T, ctx)
    cups(x, t, T, ctx)
    // Virgo's breath puffs in the cold (until the cocoa arrives)
    const D = ctx.P.date, cold = outK(t, [T.reveal + 0.4, T.reveal + 0.8])
    for (let i = 0; i < 3; i++) { const ph = (t * 0.9 + i / 3) % 1; x.save(); x.globalAlpha = cold * 0.7 * Math.sin(Math.PI * ph); R(x, '#ffffff', D.x - 80 - ph * 50, D.y - 10 - ph * 70, 18 + ph * 20, 14 + ph * 14); x.restore() }
    snowfall(x, t, { n: 20, seed: 13, alpha: 0.8 * clamp(popOut(t, T.out)), speed: 1.2 })
    sparkles(x, t, 230, 1060, T.reveal + 0.35, 10, 170, 2, [GOLD, '#ffffff', PINK])
  },
  cues: T => [
    ...[0.3, 0.9, 1.5, 2.1, 2.7, 3.3].map(v => ['pop', r3(v + 0.05), 523.25, 0.015, -0.4]),
    ['whoosh', LEAVE[0], 0.55, 0.05], ['pop', r3(LEAVE[0] + 0.2), 1567.98, 0.025, -0.8],
    ['whoosh', r3(T.reveal - 0.05), 0.4, 0.05], ['tick', r3(T.reveal + 0.3), 0.05], ['pop', r3(T.reveal + 0.4), 1046.5, 0.035, -0.3],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [BONE]
