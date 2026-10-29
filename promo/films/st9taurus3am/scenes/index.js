// st9taurus3am (32 s vertical, Star Talk season 9 "A Day in the Life", S9 E10, 3 AM) · story 0–27.6, then the end card.
//   "A Taurus at 3 AM, *wide* awake."  The E06 bedroom, dark. A notification glows: the corner café is closing Friday.
//   "my *café?*" (its season-6 fear: change it didn't choose). It gets up and holds the monstera, which has grown a leaf
//   every episode: "you’ve changed pots *twice.*" "and you *grew.*" In the window, the Bull's face, the V of the Hyades;
//   fact chip: Aldebaran, the Bull's red eye. "maybe new can be… *nice?*" — a brand-new leaf unfurls. Back in bed, the
//   plant on the nightstand, a NEW CAFÉ LIST in Notes, and sleep. Last shot = frame 0's framing, eyes closed now.
//   "Change can be *cozy,* too."
//   Rewatch bait: the plant has 7 leaves here (3 in E06), the new one unfurls on screen. Ghost: behind the robe.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawRecFrame, drawClock, clockTrack, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, phoneScreen, phoneCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawTaurusHome, drawMonstera } from '../../st9taurushome.js'

export const DURATION = 32
const KEY = 'Cm'
const STORY_END = DURATION - ENDCARD_LEN         // 27.6
const GOLD = '#f2c75c', BONE = '#efe6d6', INK = '#1b1236'
const TA = signStar('taurus')

const T = {
  hookOut: 2.75, ping: 2.9, up: 6.2, sky: 10.4, nice: 13.4, leaf: 14.2, bed: 16.8, sleep: 20.4,
  ghost: 12.0, last: 23.2, lastOut: [27.0, 27.25], fade: [27.2, 27.6],
}
const CUTS = [T.up, T.bed]
const PUNCH = [{ at: T.sky, out: T.nice - 0.1, zoom: 1.45, x: 350, y: 720 }]
const CLOCK = [{ at: 0, from: '3:12 AM' }, { at: T.nice, dur: 0.6, from: '3:12 AM', to: '3:40 AM' }, { at: 19.5, dur: 0.6, from: '3:40 AM', to: '3:52 AM' }]
const PING = [{ from: 'Corner Café', text: 'we’re closing friday. thank you for six years.', at: T.ping }]
const LIST = [
  { text: 'NEW CAFÉ LIST', at: 17.1 },
  { text: '1. the one by the park', at: 17.9 },
  { text: '2. the bakery with the cat', at: 18.9 },
]
const SAY = [
  { text: 'my *café?*', at: 4.0, out: 5.85 },
  { text: 'you’ve changed pots *twice.*', at: 6.6, out: 8.45 },
  { text: 'and you *grew.*', at: 8.6, out: 10.25 },
  { text: 'maybe new can be… *nice?*', at: 13.45, out: 15.3 },
]
const STAMPS = [
  { at: 3.2, out: T.up - 0.15, time: '3:12 AM', text: 'a change i didn’t *choose*' },
  { at: 14.4, out: T.bed - 0.15, time: '3:40 AM', text: 'new leaf. *literally.*' },
  { at: T.sleep + 0.2, out: T.last - 0.1, time: '3:52 AM', text: '*asleep,* finally' },
]
const FACT = { text: 'Aldebaran is the Bull’s red eye.', at: T.sky + 0.2, dur: 2.5, y: 1694, label: '★ REAL SKY' }
export const GHOST = { at: T.ghost, x: 1044, y: 760, where: 'peeking out from behind the pink robe on its hook, right edge, bedroom' }

// the Bull's face in the window: the V of the Hyades, Aldebaran at the tip of its lower arm (red)
const HYADES = [[300, 640, 2], [350, 668, 2], [400, 700, 3], [355, 740, 2], [300, 776, 6]]
function bullFace(x, t, k) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  x.strokeStyle = 'rgba(207,224,255,0.45)'; x.lineWidth = 3; x.beginPath()
  x.moveTo(300, 640); x.lineTo(350, 668); x.lineTo(400, 700); x.lineTo(355, 740); x.lineTo(300, 776); x.stroke()
  HYADES.forEach(([a, b, s], i) => {
    const red = i === 4
    if (red) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(a, b, 0, a, b, 70); g.addColorStop(0, 'rgba(255,110,70,0.5)'); g.addColorStop(1, 'rgba(255,110,70,0)'); x.fillStyle = g; x.fillRect(a - 70, b - 70, 140, 140); x.restore() }
    drawPixelStar(x, a, b, 10 + s * 4 + 2 * Math.sin(t * 3 + i), i % 2, red ? '#ff7a4a' : '#cfe0ff', red ? '#ffd0b0' : '#ffffff')
  })
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "500 30px Inter"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'A Taurus at 3 AM, | *wide* awake.', out: T.hookOut, accentColor: GOLD })
  const stamps = STAMPS.map(s => stampCaption(root, { ...s, top: 1560 }))
  const last = popText(root, 'Change can be | *cozy,* too.', { top: 290, size: 112, accentSize: 156, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: GOLD, wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 820)
    g.addColorStop(0, `rgba(10,6,24,${0.7 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 820)
  }
  function duvet() { x.fillStyle = '#7fa37f'; x.fillRect(420, 1086, 380, 156); x.fillStyle = '#9cc29a'; x.fillRect(420, 1086, 380, 18); for (let i = 0; i < 6; i++) { x.fillStyle = '#6a8f6a'; x.fillRect(432 + i * 60, 1140, 30, 12) } }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ck = clockTrack(t, CLOCK)
      const holding = t >= T.up && t < T.bed, inBed = !holding
      drawSky(x, t, SKY_H)
      daySky(x, t, { hour: 3 })
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      bullFace(x, t, 0.3 + 0.7 * prog(t, T.sky - 0.2, T.sky + 0.5) * (1 - 0.6 * prog(t, T.bed, T.bed + 1)))
      drawTaurusHome(x, t, { room: 'bedroom', ep: 5, dark: 1, plant: false })
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.4, from: 'right', cell: 3 })
      if (inBed) {
        // the plant: by the bed at first, on the nightstand after
        if (t < T.up) drawMonstera(x, 110, 1262, 6, t, { s: 0.9 })
        else drawMonstera(x, 300, 1112, 7, t, { s: 0.55 })
        const asleep = t >= T.sleep
        const mood = t < T.ping ? 'wide' : t < T.up ? (t < 4.0 ? 'wide' : 'neutral') : asleep ? 'sleepy' : t < 19.5 ? 'happy' : 'neutral'
        drawStarChar(x, 660, 995, 320, t, { color: TA.color, glyph: TA.glyph, mood, look: t < T.up ? [-1, 0.6] : [-1, 0.4], hops: [T.ping + 0.05, 4.05, T.bed + 0.2], seed: 14, squash: asleep ? 0.12 : 0, bob: asleep ? 2 : undefined, glow: 0.8, blink: t < T.up ? false : undefined })
        duvet()
      } else {
        // up, holding the monstera in the window light
        const k = ease.outCubic(prog(t, T.up, T.up + 0.4))
        const r = drawStarChar(x, lerp(600, 380, k), 1120, 300, t, { color: TA.color, glyph: TA.glyph, mood: t < T.nice ? 'sparkle' : t < T.leaf ? 'neutral' : 'happy', look: t > T.sky && t < T.nice ? [-0.6, -1] : [1, 0.3], hops: [6.65, 8.65, T.leaf + 0.1], seed: 14, glow: 0.9 })
        drawMonstera(x, r.x + 150, r.y + 160, 7, t, { leafAt: T.leaf, s: 0.62 })
        // moonlight on it
        x.save(); x.globalCompositeOperation = 'lighter'; const gg = x.createRadialGradient(r.x, r.y, 0, r.x, r.y, 320); gg.addColorStop(0, 'rgba(150,170,255,0.18)'); gg.addColorStop(1, 'rgba(150,170,255,0)'); x.fillStyle = gg; x.fillRect(r.x - 320, r.y - 320, 640, 640); x.restore()
      }
      x.restore()

      if (t > T.ping - 0.2 && t < T.up) phoneScreen(x, t, { x: 800, y: 1220, w: 400, h: 560, app: 'chat', title: 'notifications', lines: PING, clock: '3:12', pop: ease.outCubic(prog(t, T.ping - 0.2, T.ping + 0.1)) * (1 - prog(t, T.up - 0.25, T.up)), rot: 0.04, accent: '#7fa37f', size: 30 })
      if (t > T.bed + 0.1 && t < T.sleep + 0.3) phoneScreen(x, t, { x: 840, y: 1220, w: 380, h: 560, app: 'notes', title: 'Notes', lines: LIST, clock: '3:44', pop: ease.outCubic(prog(t, T.bed + 0.1, T.bed + 0.4)) * (1 - prog(t, T.sleep, T.sleep + 0.3)), rot: 0.05, size: 28 })
      topScrim(t)
      drawClock(x, t, { ...ck, sign: 'taurus' })
      for (const s of SAY) { const inb = s.at < T.up || s.at > T.bed; speechBubble(x, t, { ...s, x: inb ? 640 : 380, y: inb ? 870 : 950, name: '♉ TAURUS', color: TA.color, side: inb ? -0.3 : 0.3 }) }
      factChip(x, t, FACT)
      drawRecFrame(x, t, { battery: 0.2 })
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.4 * cam.flash; x.fillStyle = '#e8eeff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      for (const s of stamps) s.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.bed, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E10' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['pop', T.ping, 1567.98, 0.04, 0.3], ['pop', T.ping + 0.08, 2093, 0.03, 0.3],
  ...SAY.flatMap(s => speechCues(s.at, { pitch: 622.25 })),
  ...STAMPS.flatMap(s => stampCues(s.at, { gain: 0.028 })),
  ...CLOCK.slice(1).flatMap(c => clockCues(c.at, c.dur, { gain: 0.018 })),
  ['whoosh', T.up, 0.5, 0.03],
  ['glitter', T.sky, T.sky + 0.9], ...factChipCues(FACT.at, FACT),
  ['tick', T.ghost + 0.05, 0.015],
  ['glitter', T.leaf, T.leaf + 0.9], ['bell', T.leaf + 0.1, 1567.98, 0.035, 1.8, -0.2], ['bell', T.leaf + 0.4, 2093, 0.025, 1.8, -0.2],
  ...phoneCues(LIST, { app: 'notes' }),
  ['bell', T.sleep + 0.2, 783.99, 0.02, 2.4, 0], ['bell', T.sleep + 0.8, 1046.5, 0.018, 2.4, 0],
  ...[0, 0.1, 0.2, 0.3].map((d, i) => ['pop', r3(T.last + d), [783.99, 932.33, 1046.5, 1244.51][i], 0.038, 0]), ['pluck', T.last + 0.3, 1244.51, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
