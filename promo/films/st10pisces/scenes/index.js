// st10pisces (60 s vertical, Star Talk season 10 "Little Stars", S10 E12 · THE SEASON CLOSE) · story 0–55.6, end card.
//   HOOK   "Pisces has an imaginary *friend*."  Frame 0: the Academy classroom, kid Pisces at its desk waving to a crayon-
//          outline fish floating beside it (Fish). AGE 6.
//   (flashback) AGE 1, the nursery: the first daydream bubble, a fish. "who are you *talking* to?" "*fish.*"
//   WANT   "this is *Fish.*" "i want you all to *see* him."
//   TRY    Saturn at the chalkboard: "pisces… *2 + 2?*" The class melts into an underwater daydream, Fish swimming big.
//          "…*fish?*" Aries: "there’s *nothing* there." Pisces hugs the air where Fish is.
//   TURN   Recess, on the bench. Virgo: "can i *see* Fish?" Pisces draws him in a picture book, then a second fish tied to
//          him by a cord. ★ IN THE MYTH: Aphrodite and Eros became two fish tied by a cord so they wouldn't lose each
//          other. "now Fish has a *friend.*" Virgo takes its hand: "so do *you.*"
//   WIN    Every kid draws its own imaginary friend and the drawings come alive: THE IMAGINARY FRIEND PARADE.
//   CLOSE  Graduation at the Zodiac Academy: all twelve kids in caps on the stage, the caps fly, then all twelve growUp
//          morphs at once. Today's twelve stand where the kids stood; Fish, coloured in now, floats by Pisces.
//          "Share your *dreams*. They grow."
//   The rhyme: frame 0 is Pisces with an outline Fish no one else sees; the last shot is grown-up Pisces with Fish in
//   full colour, and everyone's friends floating over the stage. Rewatch bait: Fish's cord-tied partner has the grey
//   cat's stripes (adult Pisces's two cats, season 4), and the class's "2 + 2" board says "= FISH" after the daydream.
//   Ghost: a baby ghost (cell 2) peeks out from behind the stage's left curtain at graduation.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { drawSaturn } from '../../st5cast.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse, drawCloudCrib, drawHomeVideo, drawStoryPage, confetti, NURSERY, KIDS_FONTS } from '../../st10kids.js'
import { ageCaptionSafe, crayonText, drawDoodle, burst, r3, PLAY_FONTS } from '../../st10play.js'

export const DURATION = 60
const KEY = 'Db'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c', INK = '#1b1236', FISH = '#ff8f4a'
const PI = signStar('pisces'), VI = signStar('virgo'), AR = signStar('aries')
const ALL = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces']
// each sign's imaginary friend, for the parade (a doodle kind + its crayon)
const FRIENDS = {
  aries: ['ram', '#f0603a'], taurus: ['cow', '#e9b24a'], gemini: ['bird', '#f2cf4a'], cancer: ['crab', '#3fb6f0'], leo: ['lion', '#f39a3a'],
  virgo: ['heart', '#ef5c94'], libra: ['star', '#e163d6'], scorpio: ['scorpion', '#e23d66'], sagittarius: ['star', '#a35cf0'],
  capricorn: ['goat', '#2fc79a'], aquarius: ['robot', '#38c4ec'], pisces: ['fish', FISH],
}

export const T = {
  hookOut: 2.75, flash: 3.0, cls: 7.2, quiz: 12.4, dream: 14.4, wake: 18.0, recess: 24.2, draw: 26.6, cord: 29.0,
  parade: 34.8, grad: 43.8, caps: 47.6, grow: 49.8, last: 52.0,
  ghost: 45.2, lastOut: [55.0, 55.25], fade: [55.2, 55.6],
}
const CUTS = [T.flash, T.cls, T.recess, T.parade, T.grad]
const PUNCH = [
  { at: T.wake, out: 19.9, zoom: 1.25, x: 540, y: 1100 },
  { at: 33.0, out: 34.7, zoom: 1.18, x: 540, y: 1250 },
]
const SAY = [
  { text: 'who are you *talking* to?', at: 3.5, out: 5.3, who: 'moon' },
  { text: '*fish.*', at: 5.5, out: 7.05, who: 'pisces' },
  { text: 'this is *Fish.*', at: 7.5, out: 9.3, who: 'pisces' },
  { text: 'i want you all to *see* him.', at: 9.5, out: 12.2, who: 'pisces' },
  { text: 'pisces… *2 + 2?*', at: 12.6, out: 14.35, who: 'saturn' },
  { text: '…*fish?*', at: 18.1, out: 19.85, who: 'pisces' },
  { text: 'there’s *nothing* there.', at: 20.0, out: 21.95, who: 'aries' },
  { text: 'can i *see* Fish?', at: 24.6, out: 26.5, who: 'virgo' },
  { text: 'now Fish has a *friend.*', at: 30.9, out: 32.85, who: 'pisces' },
  { text: 'so do *you.*', at: 33.0, out: 34.65, who: 'virgo' },
  { text: 'they’re *real* now!', at: 38.6, out: 40.6, who: 'pisces' },
]
const WHO = {
  pisces: { name: '♓ PISCES', color: PI.color, pitch: 987.77 },
  moon: { name: '☾ THE MOON', color: '#d9d0ff', pitch: 523.25 },
  saturn: { name: '♄ SATURN', color: '#e9c46a', pitch: 349.23 },
  aries: { name: '♈ ARIES', color: AR.color, pitch: 880 },
  virgo: { name: '♍ VIRGO', color: VI.color, pitch: 783.99 },
}
const TAGS = [
  { text: 'AGE 6', at: 0, out: 2.85 },
  { text: 'AGE 1', sub: 'the first daydream', at: 3.15, out: 7.05 },
  { text: 'AGE 6', sub: 'class', at: 7.35, out: 14.3 },
  { text: 'AGE 6', sub: 'recess', at: 24.35, out: 28.8 },
  { text: 'AGE 6', sub: 'the parade', at: 34.95, out: 43.6 },
  { text: 'GRADUATION', sub: 'the zodiac academy', at: 44.0, out: 49.6 },
]
const FACT = { text: 'Aphrodite and Eros became two fish tied by a cord so they wouldn’t lose each other.', at: T.cord + 0.3, dur: 4.2, y: 330, label: '★ IN THE MYTH', w: 860 }
export const GHOST = { at: T.ghost, x: 130, y: 800, where: 'peeks out from behind the stage’s left curtain at graduation (a baby ghost, cell 2)' }

function cap(x, cx, top, s, t, toss = 0, i = 0) {
  // a mortarboard on the top tip; toss 0…1 throws it up and spins it
  const up = toss > 0 ? Math.sin(Math.PI * clamp(toss)) * 360 : 0, rot = toss * Math.PI * 3 * (i % 2 ? 1 : -1)
  x.save(); x.translate(cx + (toss > 0 ? Math.sin(i * 2.3) * 60 * toss : 0), top + 6 - up); x.rotate(rot)
  x.fillStyle = INK; x.fillRect(-14 * s, -3 * s, 28 * s, 6 * s); x.fillRect(-8 * s, 0, 16 * s, 8 * s)
  x.fillStyle = '#3a2a6e'; x.fillRect(-13 * s, -2 * s, 26 * s, 4 * s); x.fillRect(-7 * s, 1 * s, 14 * s, 6 * s)
  x.fillStyle = GOLD; x.fillRect(0, -1 * s, 1.4 * s, 1.4 * s); x.fillRect(9 * s, -1 * s, 1.2 * s, 9 * s); x.fillRect(8 * s, 7 * s, 3 * s, 3 * s)
  x.restore()
}
function bubbles(x, t, k, x0 = 0, w = 1080) {
  if (k <= 0) return
  x.save(); x.globalAlpha = k
  for (let i = 0; i < 26; i++) {
    const bx = x0 + ((i * 97) % w) + Math.sin(t * 2 + i) * 14, by = 1700 - ((t * 140 + i * 173) % 1500), r = 8 + (i % 4) * 6
    x.strokeStyle = 'rgba(220,245,255,0.8)'; x.lineWidth = 4; x.beginPath(); x.arc(bx, by, r, 0, Math.PI * 2); x.stroke()
    x.fillStyle = 'rgba(255,255,255,0.7)'; x.fillRect(bx - r * 0.4, by - r * 0.5, 4, 4)
  }
  x.restore()
}
/** Fish's cord-tied partner: a fish doodle with the grey cat's stripes (rewatch bait) */
function fishPair(x, t, ax, ay, bx, by, s, k = 1, fillK = 0) {
  if (k <= 0) return
  x.save(); x.globalAlpha *= k
  x.strokeStyle = '#ff4f86'; x.lineWidth = 6; x.setLineDash([12, 8]); x.beginPath(); x.moveTo(ax + s * 0.9, ay); x.quadraticCurveTo((ax + bx) / 2, Math.max(ay, by) + 80 + Math.sin(t * 2) * 12, bx - s * 0.9, by); x.stroke(); x.setLineDash([])
  drawDoodle(x, t, 'fish', bx, by, s, { color: '#8c8aa8', fill: fillK, flip: true })
  for (let i = 0; i < 3; i++) { x.fillStyle = '#5a5876'; x.fillRect(bx - s * 0.2 + i * s * 0.25, by - s * 0.35, s * 0.06, s * 0.7) }
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, ...PLAY_FONTS, "800 112px Inter", "italic 500 156px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Pisces has an | imaginary *friend*.', out: T.hookOut, top: 330, accentColor: '#b9b2ff' })
  const last = popText(root, 'Share your *dreams*. | They grow.', { top: 300, size: 108, accentSize: 150, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: '#b9b2ff', wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const pos = {}
  const fishAt = (t, cx, cy, s, o = {}) => drawDoodle(x, t, 'fish', cx + Math.sin(t * 1.7) * 18, cy + Math.sin(t * 2.3) * 14, s, { color: FISH, ...o })

  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.66 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.4 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }

  function classroom(t) {
    drawAcademy(x, t, { room: 'class' })
    // the chalk sum (after the daydream it says "= FISH", rewatch bait)
    if (t >= T.quiz - 0.3) crayonText(x, t < T.wake + 2.5 ? '2 + 2 = ?' : '2 + 2 = FISH', 540, 690, { size: 60, color: '#fffaf0', seed: 3, weight: 700 })
    const dream = prog(t, T.dream, T.dream + 0.6) * (1 - prog(t, T.wake - 0.2, T.wake + 0.2))
    const sa = drawSaturn(x, lerp(1300, 880, ease.outCubic(prog(t, T.quiz - 0.5, T.quiz))), 1000, 240, t, { mood: t < T.wake ? 'neutral' : 'squint', look: [-1, 0.4], pointer: t > T.quiz && t < T.dream, hops: [12.65], seed: 4 })
    pos.saturn = [sa.x, sa.top]
    const ar = drawBabyStar(x, 230, 1030, 170, t, { sign: 'aries', age: 'kid', mood: t > 19.9 && t < 22 ? 'eyeroll' : t > T.wake ? 'laugh' : 'neutral', look: [1, 0.3], seed: 1, hops: [20.05] })
    pos.aries = [ar.x, ar.top]
    drawBabyStar(x, 830, 1240, 160, t, { sign: 'leo', age: 'kid', mood: t > T.wake && t < 22 ? 'laugh' : 'neutral', look: [-1, 0], seed: 5 })
    const sad = t > 22.0
    const pi = drawBabyStar(x, 520, 1240, 250, t, { sign: 'pisces', age: 'kid', mood: t < T.flash ? 'happy' : dream > 0.5 ? 'sleepy' : sad ? 'cry' : t < T.quiz ? 'sparkle' : 'neutral', look: t < T.quiz ? [1, -0.3] : [0, -0.6], seed: 12, hops: [7.55, 9.55, 18.15], zzz: false })
    pos.pisces = [pi.x, pi.top]
    // Fish beside it (outline only: nobody else sees him)
    if (dream < 0.9) fishAt(t, sad ? 640 : 760, sad ? 1170 : 1080, 120, { alpha: 1 - dream })
    // the hug of the air
    if (sad) crayonText(x, '♥', 700, 1060 - Math.sin(t * 3) * 8, { size: 44, color: '#ff8fb1', seed: 2, alpha: 0.8 })
    // the underwater daydream
    if (dream > 0) {
      x.save(); x.globalAlpha = dream
      const g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, 'rgba(40,110,200,0.75)'); g.addColorStop(1, 'rgba(20,40,120,0.85)')
      x.fillStyle = g; x.fillRect(0, 0, 1080, 1920)
      for (let i = 0; i < 7; i++) { const sx = 60 + i * 160; x.strokeStyle = '#3fbf8a'; x.lineWidth = 16; x.beginPath(); x.moveTo(sx, 1920); for (let k = 1; k < 8; k++) x.lineTo(sx + Math.sin(t * 2 + k + i) * 24, 1920 - k * 80); x.stroke() }
      const fx = lerp(-200, 1280, prog(t, T.dream, T.wake)), fy = 900 + Math.sin(t * 2) * 80
      drawDoodle(x, t, 'fish', fx, fy, 260, { color: FISH, fill: 1, lw: 16 })
      drawBabyStar(x, 540, 1240, 250, t, { sign: 'pisces', age: 'kid', mood: 'sparkle', look: [Math.sign(fx - 540), -0.5], seed: 12 })
      x.restore()
      bubbles(x, t, dream)
    }
  }

  function flashback(t) {
    drawNursery(x, t, { cribs: false, night: 0.3 })
    const [cx, cy] = NURSERY.cribs[1]
    drawCloudCrib(x, cx, cy, 300, t)
    const b = drawBabyStar(x, cx, cy - 165, 260, t, { sign: 'pisces', age: 'baby', pacifier: t < 5.4, mood: t < 5.5 ? 'sparkle' : 'happy', look: [1, -1], hops: [5.55], seed: 12 })
    pos.pisces = [b.x, b.top]
    drawCloudCrib(x, cx, cy, 300, t, { front: true })
    // the first daydream: a thought bubble with a fish in it
    const k = easeOutBack(prog(t, T.flash + 0.2, T.flash + 0.6), 1.8)
    if (k > 0) {
      x.save(); x.translate(760, 820); x.scale(k, k)
      for (const [dx, dy, r] of [[-170, 210, 16], [-130, 160, 26]]) { x.fillStyle = INK; x.beginPath(); x.arc(dx, dy, r + 5, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4fb'; x.beginPath(); x.arc(dx, dy, r, 0, Math.PI * 2); x.fill() }
      x.fillStyle = INK; x.beginPath(); x.ellipse(0, 0, 175, 125, 0, 0, Math.PI * 2); x.fill(); x.fillStyle = '#fff4fb'; x.beginPath(); x.ellipse(0, 0, 168, 118, 0, 0, Math.PI * 2); x.fill()
      drawDoodle(x, t, 'fish', Math.sin(t * 2) * 20, 0, 90, { color: FISH, fill: 0.6 })
      x.restore()
    }
    const m = drawMoonNurse(x, 230, 760, 90, t, { mood: t < 5.5 ? 'wide' : 'happy', look: [1, 0.5], hops: [3.55], seed: 4 })
    pos.moon = [m.x + 20, m.top - 6]
    bubbles(x, t, 0.5, 600, 400)
  }

  function recess(t) {
    drawAcademy(x, t, { room: 'yard' })
    // the bench
    x.fillStyle = INK; x.fillRect(150, 1300, 780, 34); x.fillRect(190, 1330, 24, 120); x.fillRect(866, 1330, 24, 120)
    x.fillStyle = '#c98a4a'; x.fillRect(156, 1304, 768, 22)
    // the picture book: Fish coloured in, then his cord-tied partner
    const open = easeOutBack(prog(t, T.draw, T.draw + 0.5), 1.4)
    if (open > 0) drawStoryPage(x, t, { x: 540, y: 820, w: 840, h: 520, open, title: 'FISH', art: (c, w, h, tt) => {
      drawDoodle(c, tt, 'fish', w * 0.3, h * 0.55, 150, { color: FISH, fill: prog(tt, T.draw + 0.6, T.draw + 2) })
      const k2 = prog(tt, T.cord, T.cord + 0.6)
      if (k2 > 0) { c.save(); c.globalAlpha = k2; fishPair(c, tt, w * 0.3, h * 0.55, w * 0.72, h * 0.5, 130, 1, prog(tt, T.cord + 0.4, T.cord + 1.4)); c.restore() }
    } })
    const vIn = ease.outCubic(prog(t, T.recess + 0.1, T.recess + 0.6))
    const hold = prog(t, 33.0, 33.3)
    const v = drawBabyStar(x, lerp(1240, 740, vIn), 1200, 230, t, { sign: 'virgo', age: 'kid', mood: t < 30.8 ? 'sparkle' : 'happy', look: [-1, 0.2], seed: 6, hops: [24.65, 33.05] })
    pos.virgo = [v.x, v.top]
    const p = drawBabyStar(x, 380, 1200, 240, t, { sign: 'pisces', age: 'kid', mood: t < T.draw ? 'neutral' : t < 33 ? 'happy' : 'heart', look: [1, -0.4], seed: 12, hops: [T.draw + 0.1, 30.95] })
    pos.pisces = [p.x, p.top]
    // the crayon in its hand, scribbling, then the held hands (the emotional beat)
    if (t > T.draw && t < 33) { x.fillStyle = INK; x.fillRect(470, 1170 - Math.abs(Math.sin(t * 14)) * 12, 22, 70); x.fillStyle = FISH; x.fillRect(474, 1174 - Math.abs(Math.sin(t * 14)) * 12, 14, 62) }
    if (hold > 0) { x.fillStyle = INK; x.fillRect(480, 1250, 160 * hold, 22); x.fillStyle = '#ffd6a0'; x.fillRect(484, 1254, 152 * hold, 14); crayonText(x, '♥', 560, 1190 - Math.sin(t * 4) * 6, { size: 52, color: '#ff4f86', seed: 4, alpha: hold }) }
    burst(x, t, 560, 1200, 33.1, 10, 160, ['#ff6fa8', '#ffd6ec', GOLD])
  }

  function paradeScene(t) {
    drawAcademy(x, t, { room: 'yard' })
    crayonText(x, 'THE IMAGINARY FRIEND PARADE', 540, 760, { size: 48, color: '#ffd36e', seed: 6, rot: -0.03, alpha: prog(t, T.parade + 0.2, T.parade + 0.5) })
    // twelve doodles march across, left → right, in two lanes; they colour in as they pass the middle
    const order = ['pisces', 'virgo', 'leo', 'aries', 'taurus', 'cancer', 'gemini', 'capricorn', 'aquarius', 'scorpio', 'libra', 'sagittarius']
    order.forEach((id, i) => {
      const [kind, col] = FRIENDS[id]
      const sp = 150, start = T.parade + 0.3 + i * 0.55
      const px = -160 + (t - start) * sp * 1.4, lane = i % 2
      if (px < -200 || px > 1300) return
      const py = (lane ? 1060 : 900) - Math.abs(Math.sin((t - start) * 5)) * 26
      drawDoodle(x, t, kind, px, py, id === 'pisces' ? 120 : 90, { color: col, fill: clamp((px - 200) / 300), flip: false })
      if (id === 'pisces') fishPair(x, t, px, py, px - 210, py + 30, 90, 1, clamp((px - 200) / 300))
    })
    // the class watching from the front: Pisces + Virgo hand in hand in the middle
    const row = ['aries', 'taurus', 'gemini', 'pisces', 'virgo', 'leo', 'cancer']
    row.forEach((id, i) => {
      const big = id === 'pisces' || id === 'virgo'
      const r = drawBabyStar(x, 90 + i * 150, big ? 1330 : 1380, big ? 220 : 170, t, { sign: id, age: 'kid', mood: 'happy', look: [0, -1], seed: i + 2, hops: [T.parade + 0.4 + i * 0.3, 38.7] })
      if (id === 'pisces') pos.pisces = [r.x, r.top]
    })
    x.fillStyle = INK; x.fillRect(530, 1370, 90, 20); x.fillStyle = '#ffd6a0'; x.fillRect(534, 1374, 82, 12)
    if (t > 40.5) confetti(x, t, { x: 540, y: 900, at: 40.6, n: 40, spread: 460 })
  }

  // graduation: all twelve in caps, the caps fly, all twelve grow up at once
  const FRONT = ['libra', 'scorpio', 'sagittarius', 'pisces', 'capricorn', 'aquarius'], FX = [110, 270, 430, 610, 790, 960]
  const SLOTS = ALL.map(id => { const f = FRONT.indexOf(id); return f >= 0 ? { id, x: FX[f], y: 1270 } : { id, x: 115 + ALL.indexOf(id) * 170, y: 1070 } })
  function graduation(t) {
    drawAcademy(x, t, { room: 'stage', light: 1, banner: false })
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'left', cell: 2 })
    crayonText(x, '★ CLASS OF ★ ★ ★ ★', 540, 660, { size: 58, color: '#ffd36e', seed: 8, rot: -0.02 })
    const toss = prog(t, T.caps, T.caps + 1.4)
    for (const [i, s] of SLOTS.entries()) {
      const size = s.id === 'pisces' ? 230 : 185
      const enter = ease.outCubic(prog(t, T.grad + i * 0.08, T.grad + 0.4 + i * 0.08))
      const y = s.y + (1 - enter) * 500
      let r
      if (t < T.grow) r = drawBabyStar(x, s.x, y, size * 0.82, t, { sign: s.id, age: 'kid', mood: t > T.caps ? 'laugh' : 'happy', look: [0, -0.4], seed: i + 1, hops: [T.caps] })
      else r = growUp(x, t, { sign: s.id, at: T.grow + (i % 3) * 0.03, x: s.x, y: s.y, size, look: [0, -0.2], seed: i + 1 })
      if (t < T.caps + 1.4) cap(x, r.x, r.top, size / 80, t, toss, i)
    }
    if (t > T.caps) confetti(x, t, { x: 540, y: 900, at: T.caps + 0.6, n: 50, spread: 520 })
    // after growUp: everyone's imaginary friend floats over the stage, Fish in full colour by Pisces
    const after = prog(t, T.grow + 1.2, T.grow + 2.2)
    if (after > 0) {
      ALL.filter(id => id !== 'pisces').forEach((id, i) => { const [kind, col] = FRIENDS[id]; drawDoodle(x, t, kind, 100 + i * 88, 860 + (i % 2) * 50 + Math.sin(t * 2 + i) * 10, 46, { color: col, fill: 1, alpha: after * 0.9 }) })
      const ps = SLOTS[11]
      drawDoodle(x, t, 'fish', ps.x + 10 + Math.sin(t * 1.7) * 10, ps.y + 200, 110, { color: FISH, fill: 1, alpha: after })
    }
    // Saturn (the principal) and the Moon in the front row
    drawSaturn(x, 900, 1600, 200, t, { mood: 'happy', look: [-1, -1], seed: 4, hops: [T.caps + 0.1, T.grow + 1.6] })
    drawMoonNurse(x, 180, 1600, 80, t, { mood: 'happy', look: [1, -1], seed: 4, hops: [T.caps + 0.2, T.grow + 1.7] })
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const Z = t >= T.grad ? { z: 1.0, cx: 540, cy: 1250 } : { z: 1.1, cx: 540, cy: 1250 }
      x.translate(Z.cx, Z.cy); x.scale(Z.z, Z.z); x.translate(-Z.cx, -Z.cy)
      for (const k in pos) delete pos[k]
      if (t < T.flash || (t >= T.cls && t < T.recess)) classroom(t)
      else if (t < T.cls) flashback(t)
      else if (t < T.parade) recess(t)
      else if (t < T.grad) paradeScene(t)
      else graduation(t)
      x.restore()
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      topScrim(t)
      for (const s of SAY) {
        if (t < s.at - 0.05 || t > s.out + 0.4) continue
        const w = WHO[s.who], p0 = pos[s.who]
        if (!p0) continue
        const p = [Z.cx + (p0[0] - Z.cx) * Z.z, Z.cy + (p0[1] - Z.cy) * Z.z]
        speechBubble(x, t, { text: s.text, at: s.at, out: s.out, x: clamp(p[0], 160, 920), y: Math.max(560, p[1]), name: w.name, color: w.color, side: p[0] > 700 ? -0.4 : p[0] < 380 ? 0.4 : 0, size: 46, w: 640 })
      }
      for (const g of TAGS) ageCaptionSafe(ageCaption, x, t, { ...g, y: 1650, color: '#c9c4ff' })
      factChip(x, t, FACT)
      drawHomeVideo(x, t, { alpha: t < T.hookOut ? 0 : 1 - prog(t, T.last - 0.3, T.last) })
      drawCrayonFrame(x, t)
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.4 * cam.flash; x.fillStyle = '#f4f2ff'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [T.flash, T.cls, T.recess, T.parade, T.grad]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E12' }), cardCuts(CARD_CUTS)]

export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: WHO[s.who].pitch })),
  ...TAGS.filter(g => g.at > 0).flatMap(g => ageCaptionCues(g.at)),
  ['glitter', T.flash + 0.2, T.flash + 1.0], ['bell', T.flash + 0.3, 1396.91, 0.025, 2, 0],
  ['tick', T.quiz - 0.3, 0.02], ['tick', T.quiz - 0.2, 0.02],
  ['whoosh', T.dream, 1.2, 0.035], ['glitter', T.dream, T.dream + 3.4], ...[0, 0.6, 1.2, 1.8, 2.4].map(d => ['pop', r3(T.dream + 0.4 + d), 523.25 + d * 120, 0.018, 0]),
  ['pop', T.wake, 1567.98, 0.04, 0], ['whoosh', T.wake - 0.2, 0.4, 0.03],
  ['bell', 22.1, 392, 0.022, 2.4, 0],
  ['whoosh', T.draw, 0.4, 0.025], ...[0, 0.3, 0.6, 0.9, 1.2].map(d => ['tick', r3(T.draw + 0.6 + d), 0.014]),
  ['glitter', T.cord, T.cord + 1.2], ['bell', T.cord + 0.2, 1046.5, 0.025, 2.2, 0], ...factChipCues(FACT.at, FACT),
  ['bell', 33.1, 698.46, 0.03, 2.2, 0], ['bell', 33.25, 1046.5, 0.025, 2.2, 0],
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.parade + 0.5 + i * 0.55), [523.25, 587.33, 698.46, 783.99, 880, 1046.5][i % 6], 0.02, (i % 2 ? 0.2 : -0.2)]),
  ['glitter', 40.6, 42.0], ['pop', 40.6, 1396.91, 0.03, 0],
  ['bell', T.grad + 0.1, 1046.5, 0.03, 2.4, 0], ...Array.from({ length: 12 }, (_, i) => ['tick', r3(T.grad + i * 0.08), 0.012]),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.caps, 0.6, 0.04], ['glitter', T.caps + 0.6, T.caps + 2], ['boom', T.caps + 0.6, 0.1],
  ...growUpCues(T.grow),
  ...[0, 0.1, 0.2, 0.3].map((d, i) => ['pop', r3(T.last + d), [698.46, 830.61, 932.33, 1108.73][i], 0.038, 0]), ['pluck', T.last + 0.35, 1108.73, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
