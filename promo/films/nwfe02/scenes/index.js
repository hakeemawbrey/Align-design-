// nwfe02: WAIT FOR IT, "Built you in snow." (20 s vertical trial reel, Wait for It Vol. 2 ep 2, music: screwed · C#m)
// Story 0–15.6, then the shared end card. The format look and timing live in ../../nwfe01/scenes/wait.js.
//   0.0–3.8   "Aries is building | *a snowman.*" + "wait for it…". ♈ Aries, mid-pat, slaps snow onto a lumpy pile;
//             ♎ Libra waits on the right. Snow falls. The pile grows a middle and a head.
//   3.95–9.3  "This is | *not going well…*"  Stickers: "it's *leaning*" · "two arms… *now four?*" ·
//             "…is that *a set of scales?!*". The pile leans, sprouts four twig arms, then two snow pans on a twig.
//   9.45      card cut.
//   9.5–13.4  "Who is it? | *You.*"  On the drop the pile puffs into a smooth snow star with Libra's glyph, holding the
//             snow scales level. ♈ ARIES: "it's *you*. the scales took forever."
//   13.45–15.5 "Built you in *snow*."  Libra hugs the snow version, hearts, Pisces fountains.
import { makeEpisode, R, INK, GOLD, BONE, PINK, drawBits, pop01, outK, popOut, r3, plate, sparkles, snowfall, snowBank } from '../../nwfe01/scenes/wait.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { clamp, lerp, prog, ease } from '../../../src/lib.js'

const SX = 560, GROUND = 1205
const SNOW = '#eef6ff', SNOW_D = '#bcd3ee'
const LIBRA = signStar('libra')

function ball(x, cx, cy, r) {
  x.fillStyle = INK; x.beginPath(); x.arc(cx, cy, r + 7, 0, Math.PI * 2); x.fill()
  x.fillStyle = SNOW; x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill()
  x.fillStyle = SNOW_D; x.beginPath(); x.arc(cx + r * 0.25, cy + r * 0.3, r * 0.62, 0, Math.PI * 2); x.fill()
  x.fillStyle = SNOW; x.beginPath(); x.arc(cx - r * 0.1, cy - r * 0.05, r * 0.72, 0, Math.PI * 2); x.fill()
}
function twig(x, x0, y0, ang, len) {
  x.save(); x.translate(x0, y0); x.rotate(ang)
  R(x, INK, -4, -8, len + 8, 16); R(x, '#7a4a2a', 0, -4, len, 8); R(x, '#7a4a2a', len * 0.6, -16, 8, 14)
  x.restore()
}
/** the snow scales: a twig beam with two snow pans; tilt in radians */
function scales(x, cx, cy, tilt, s = 1) {
  x.save(); x.translate(cx, cy); x.scale(s, s)
  R(x, INK, -6, -10, 12, 90); R(x, '#7a4a2a', -3, -6, 6, 84)
  x.rotate(tilt)
  R(x, INK, -96, -8, 192, 16); R(x, '#7a4a2a', -92, -4, 184, 8)
  for (const d of [-1, 1]) {
    x.save(); x.translate(d * 84, 0); x.rotate(-tilt)
    R(x, INK, -2, 0, 4, 40)
    R(x, INK, -40, 36, 80, 22); R(x, SNOW, -36, 40, 72, 14); R(x, SNOW_D, -36, 48, 72, 6)
    x.restore()
  }
  x.restore()
}

function pile(x, t, T) {
  const k = clamp(popOut(t, T.out))
  if (k <= 0.01) return
  const puff = prog(t, T.reveal - 0.05, T.reveal + 0.2)
  const gone = t >= T.reveal + 0.12
  x.save(); x.globalAlpha = k
  // the snowman-in-progress (until the drop)
  if (!gone) {
    const lean = 0.16 * ease.inOutCubic(prog(t, T.stk[0] - 0.2, T.stk[0] + 0.8)) + 0.03 * Math.sin(t * 2.2) * (t > T.stk[0] ? 1 : 0)
    const s = 1 + 0.25 * Math.sin(Math.PI * puff)
    x.save(); x.translate(SX, GROUND); x.rotate(lean); x.scale(s, s); x.translate(-SX, -GROUND)
    const mid = pop01(t, 1.1, 0.35, 2.2), head = pop01(t, 2.5, 0.35, 2.2)
    ball(x, SX, GROUND - 85, 92)
    // a lump stuck on the side (the build gets weirder)
    if (t > T.stk[0]) ball(x, SX + 92, GROUND - 120, 34 * pop01(t, T.stk[0], 0.3, 2.4))
    if (mid > 0.01) ball(x, SX - 8, GROUND - 215, 66 * mid)
    if (head > 0.01) ball(x, SX + 6, GROUND - 315, 48 * head)
    // arms: two, then four
    const a2 = pop01(t, T.stk[1] - 0.6, 0.3, 2.4), a4 = pop01(t, T.stk[1], 0.3, 2.4)
    if (a2 > 0.01) { twig(x, SX - 60, GROUND - 225, Math.PI + 0.4, 110 * a2); twig(x, SX + 50, GROUND - 225, -0.4, 110 * a2) }
    if (a4 > 0.01) { twig(x, SX - 70, GROUND - 175, Math.PI - 0.2, 100 * a4); twig(x, SX + 62, GROUND - 175, 0.2, 100 * a4) }
    // the scales on top
    const sc = pop01(t, T.stk[2], 0.3, 2.4)
    if (sc > 0.01) scales(x, SX + 6, GROUND - 410, -0.25 + 0.05 * Math.sin(t * 3), 0.7 * sc)
    x.restore()
  }
  // the reveal: a smooth snow star with Libra's glyph, holding the scales level
  const rv = pop01(t, T.reveal + 0.05, 0.4, 2.0)
  if (rv > 0.01) {
    R(x, INK, SX - 120, GROUND - 6, 240, 14); R(x, SNOW, SX - 114, GROUND - 4, 228, 8)
    drawStarChar(x, SX + 20, GROUND - 140, 260, t, { color: SNOW, glyph: LIBRA.glyph, mood: 'happy', look: [1, 0], pop: rv, seed: 5, glow: 0.6, bob: 0, blush: 0.6 })
    scales(x, SX - 185, GROUND - 215, 0.03 * Math.sin(t * 2), 0.95 * rv)
  }
  x.restore()
  sparkles(x, t, SX, GROUND - 200, T.reveal + 0.02, 14, 220, 1, ['#ffffff', SNOW_D, GOLD])
}

// Aries pats snow on: a mitten blur + flying snow chunks from its hand toward the pile, all through hook + build
function patting(x, t, T, ctx) {
  if (!ctx.hero || t > T.reveal) return
  const H = ctx.hero
  const ph = (t * 2.6) % 1
  x.save(); x.globalAlpha = clamp(popOut(t, T.out))
  const mx = H.x + 120 + 30 * Math.sin(ph * Math.PI), my = H.F.cy - 10 - 20 * Math.sin(ph * Math.PI * 2)
  R(x, INK, mx - 22, my - 18, 44, 36); R(x, '#ff6262', mx - 18, my - 14, 36, 28); R(x, '#ffffff', mx - 18, my + 6, 36, 8)
  for (let i = 0; i < 3; i++) { const q = (ph + i / 3) % 1; R(x, '#ffffff', lerp(mx + 20, SX - 80, q), my - 50 * Math.sin(Math.PI * q) + 20 * i, 10, 10) }
  x.restore()
}

const EP = makeEpisode({
  id: 'nwfe02', key: 'C#m', seed: 4702,
  hero: { sign: 'aries', lineColor: '#ff9a8a' },
  date: { sign: 'libra' },
  pos: { hero: { x: 215, y: 1075, s: 230 }, date: { x: 905, y: 1090, s: 200 }, pis: { x: 990, y: 700, s: 120 } },
  h0: 'Aries is building | *a snowman.*', h0Accent: '#ff9a8a',
  h1: 'This is | *not going well…*',
  h2: 'Who is it? | *You.*', h2Accent: PINK,
  last: 'Built you in *snow*.', lastAccent: GOLD,
  stickers: ['it’s *leaning*', 'two arms… *now four?*', '…is that *a set of scales?!*'],
  line: { who: 'hero', text: 'it’s *you*. the scales took forever.' },
  focus: { x: SX, y: 980 },
  glow: { x: SX, y: 1000 },
  moods(ph, t, T) {
    if (ph === 'hook') return { mood: 'happy', look: [1, 0.4] }
    if (ph === 'build') return { mood: t > T.stk[1] ? 'squint' : 'happy', look: [1, 0.2] }
    return null
  },
  dateMoods(ph, t, T) {
    if (ph === 'build' && t > T.stk[2]) return { mood: 'wide', look: [-1, -0.6] }
    if (ph === 'reveal' && t > T.reveal + 0.5) return { mood: 'heart', look: [-1, 0] }
    return null
  },
  back(x, t, T) {
    snowBank(x, t, T, 935)
    snowfall(x, t, { n: 30, seed: 5, alpha: 0.55 * clamp(popOut(t, T.out)), y1: 1300, speed: 0.8 })
  },
  mid(x, t, T) { pile(x, t, T) },
  front(x, t, T, ctx) {
    patting(x, t, T, ctx)
    snowfall(x, t, { n: 22, seed: 11, alpha: 0.8 * clamp(popOut(t, T.out)), speed: 1.2 })
    const lk = pop01(t, T.reveal + 0.5, 0.3, 2.4) * outK(t, T.out)
    if (lk > 0.01) plate(x, 'SNOW LIBRA', SX, GROUND + 40, { size: 26, bg: GOLD, alpha: clamp(lk), scale: 0.8 + 0.2 * clamp(lk) })
  },
  cues: T => [
    ...Array.from({ length: 16 }, (_, i) => ['tick', r3(0.1 + i * 0.385), 0.01]),
    ['pop', 1.15, 523.25, 0.03, 0], ['pop', 2.55, 659.25, 0.03, 0],
    ['pop', T.stk[1] - 0.55, 392, 0.03, -0.3], ['pop', T.stk[1] + 0.05, 349.23, 0.03, 0.3], ['pop', T.stk[2] + 0.05, 311.13, 0.03, 0],
    ['whoosh', T.reveal, 0.4, 0.04], ['pop', r3(T.reveal + 0.5), 1567.98, 0.03, 0],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const MUSIC = EP.music
void [BONE, drawBits]
