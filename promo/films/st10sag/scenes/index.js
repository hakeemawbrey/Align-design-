// st10sag (60 s vertical, Star Talk season 10 "Little Stars", S10 E09) · story 0–55.6, then the end card.
//   HOOK   "Baby Sag escaped the *playpen*."  Frame 0: the Star Nursery, baby Sag mid-leap over the cloud playpen's rail,
//          its (already packed) hiking backpack on. AGE 1 ½. The Moon dozes in the rocking chair.
//   WANT   AGE 5, the Academy yard, on a stick-horse centaur: "i want to see *everything!*" The crayon map of
//          THE GREAT EXPEDITION: the sandbox desert, the swing jungle, slide mountain… and "???" behind the slide.
//   TRY    the desert (Taurus, in the sand: "it's a *sandbox.*"), the swing jungle, the summit of slide mountain, a flag
//          and a whoosh down… then behind the slide at dusk, alone, the map upside down: "where's… *home?*"
//   TURN   the Moon (night nurse) finds it: "*found* you." A hug. ★ IN THE MYTH: Chiron the wise centaur was a
//          teacher who raised young heroes; one story links him to the Archer. "explore. but bring a *buddy.*"
//   WIN    the next day with Gemini on a jump-rope buddy line, slide mountain together, then back to the nursery:
//          "you came *back.*" Sag hops back INTO the playpen (frame 0's leap, reversed) and growUp turns it into today's
//          Sag, sitting in the cloud crib with the same backpack. "Explore. Then come *home*."
//   Rewatch bait: the map's corner says "LISBON?" (st9sagwork), and the baby's backpack is adult Sag's (st9saghome).
//   Ghost: a baby ghost (cell 2) pops out of a sand dune in the desert.
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
import { hookPOV, hookPOVCues, daySky, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawBackpack } from '../../st9saghome.js'
import { drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, growUp, growUpCues, ageCaption, ageCaptionCues, drawMoonNurse, drawCloudCrib, drawHomeVideo, NURSERY, KIDS_FONTS } from '../../st10kids.js'
import { ageCaptionSafe, drawSlide, drawSwings, swingSeat, drawSandbox, drawStickHorse, drawCrayonMap, crayonText, burst, r3, PLAY_FONTS } from '../../st10play.js'

export const DURATION = 60
const KEY = 'Fm'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c'
const SG = signStar('sagittarius'), GE = signStar('gemini'), TA = signStar('taurus')

export const T = {
  hookOut: 2.75, yard: 6.6, mapAt: 9.0, desert: 12.2, swings: 17.0, slide: 21.4, flag: 22.9, down: 24.9, behind: 25.6,
  moon: 30.0, hug: 32.2, chip: 36.0, win: 42.0, top2: 44.6, home: 46.6, leap: 48.7, grow: 49.8, last: 51.9,
  ghost: 14.9, lastOut: [55.0, 55.25], fade: [55.2, 55.6],
}
const CUTS = [T.yard, T.desert, T.swings, T.slide, T.behind, T.win, T.top2, T.home]
const PUNCH = [
  { at: 19.0, out: 21.2, zoom: 1.3, x: 640, y: 1100 },
  { at: T.hug, out: 34.0, zoom: 1.22, x: 640, y: 1100 },
]
const SAY = [
  { text: 'ba! *bye!*', at: 2.9, out: 4.6, who: 'sag' },
  { text: '…*sag?*', at: 4.8, out: 6.45, who: 'moon' },
  { text: 'i want to see *everything!*', at: 6.9, out: 8.85, who: 'sag' },
  { text: 'the great *expedition!*', at: 10.2, out: 12.05, who: 'sag' },
  { text: 'it’s a *sandbox.*', at: 14.3, out: 16.4, who: 'taurus' },
  { text: 'the *jungle* is huge!', at: 18.0, out: 20.0, who: 'sag' },
  { text: 'i *conquered* it!', at: 23.0, out: 24.8, who: 'sag' },
  { text: 'where’s… *home?*', at: 26.6, out: 29.4, who: 'sag' },
  { text: '*found* you.', at: 30.5, out: 32.15, who: 'moon' },
  { text: 'i went *too* far.', at: 34.1, out: 35.85, who: 'sag' },
  { text: 'the archer’s a *teacher*, you know.', at: 35.95, out: 38.3, who: 'moon' },
  { text: 'explore. but bring a *buddy.*', at: 38.45, out: 40.3, who: 'moon' },
  { text: 'i know a *buddy!*', at: 40.4, out: 41.95, who: 'sag' },
  { text: '*expedition* two!', at: 42.5, out: 44.45, who: 'gemini' },
  { text: 'now let’s go *tell* it!', at: 44.8, out: 46.5, who: 'sag' },
  { text: 'you came *back.*', at: 46.95, out: 48.65, who: 'moon' },
]
const WHO = {
  sag: { name: '♐ SAG', color: SG.color, pitch: 783.99 },
  moon: { name: '☾ THE MOON', color: '#d9d0ff', pitch: 523.25 },
  taurus: { name: '♉ TAURUS', color: TA.color, pitch: 392 },
  gemini: { name: '♊ GEMINI', color: GE.color, pitch: 987.77 },
}
const TAGS = [
  { text: 'AGE 1 ½', at: 0, out: 6.45 },
  { text: 'AGE 5', at: 6.75, out: 11.9 },
  { text: 'AGE 5', sub: 'day 1: the desert', at: 12.35, out: 16.85 },
  { text: 'AGE 5', sub: 'the swing jungle', at: 17.15, out: 21.25 },
  { text: 'AGE 5', sub: 'slide mountain', at: 21.55, out: 25.45 },
  { text: 'AGE 5', sub: 'behind the slide', at: 25.8, out: 29.6 },
  { text: 'AGE 5', sub: 'the next day', at: 42.15, out: 46.45 },
]
const FACT = { text: 'The wise centaur Chiron was a teacher who raised young heroes. One story links him to the Archer.', at: T.chip, dur: 4.3, y: 330, label: '★ IN THE MYTH', w: 860 }
export const GHOST = { at: T.ghost, x: 860, y: 1236, where: 'pops up out of the right-hand sand dune, sandbox desert (a baby ghost, cell 2)' }

const MARKS = [
  { x: 0.16, y: 0.78, icon: 'home', label: 'CLASS' },
  { x: 0.3, y: 0.42, icon: 'x', label: 'SANDBOX DESERT', ly: 42 },
  { x: 0.58, y: 0.62, icon: 'x', label: 'SWING JUNGLE' },
  { x: 0.74, y: 0.3, icon: 'flag', label: 'SLIDE MTN', ly: 30 },
  { x: 0.88, y: 0.72, icon: '?', label: 'BEHIND???', color: '#7c74f0' },
  { x: 0.88, y: 0.92, icon: null, label: 'lisbon?', size: 18, color: '#9a8fb8' },
]
const MARKS2 = [
  { x: 0.16, y: 0.78, icon: 'heart', label: 'HOME', color: '#ff4f86' },
  { x: 0.3, y: 0.42, icon: 'x', label: 'SANDBOX DESERT', ly: 42 },
  { x: 0.58, y: 0.62, icon: 'x', label: 'SWING JUNGLE' },
  { x: 0.74, y: 0.3, icon: 'flag', label: 'SLIDE MTN', ly: 30 },
  { x: 0.16, y: 0.78, icon: null, label: '' },
  { x: 0.82, y: 0.86, icon: null, label: 'BUDDY: ♊ GEMINI ✓', size: 24, color: '#c49a10' },
]

// a base camera per set: the yard is framed tighter so the kids read big (bubbles are mapped through it)
function zoomAt(t) {
  if (t < T.yard || t >= T.home) return { z: 1.08, cx: 540, cy: 1250 }
  if (t >= T.win && t < T.top2) return { z: 1.12, cx: 540, cy: 1300 }
  return { z: 1.22, cx: 540, cy: 1230 }
}
const gallop = (t, t0, t1, every = 0.32) => { const h = []; for (let s = t0; s < t1; s += every) h.push(+s.toFixed(3)); return h }
const HOPS_DESERT = gallop(T.desert + 0.1, T.swings - 0.2)
const HOPS_WIN = gallop(T.win + 0.1, T.top2 - 0.2, 0.3)

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, ...PLAY_FONTS, "800 112px Inter", "italic 500 156px 'EB Garamond'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Baby Sag escaped | the *playpen*.', out: T.hookOut, top: 330, accentColor: '#c9a2ff' })
  const last = popText(root, 'Explore. Then | come *home*.', { top: 300, size: 116, accentSize: 160, lineHeight: 1.2, at: T.last, gap: 0.1, accentColor: '#c9a2ff', wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function kidSag(t, X, Y, size, o = {}) {
    // the kid wears adult Sag's backpack (rewatch bait), drawn behind it
    const { horse = false, horseRot = -0.45, pack = true, ...rest } = o
    if (pack) drawBackpack(x, X + size * 0.36, Y + size * 0.02 + Math.sin(t * 2.1) * 3, Math.max(3, Math.round(size / 30)), t)
    const r = drawBabyStar(x, X, Y, size, t, { sign: 'sagittarius', age: 'kid', seed: 9, ...rest })
    if (horse) drawStickHorse(x, X + size * 0.3, (r?.y ?? Y) + size * 0.08, Math.max(5, size / 30), t, { rot: horseRot, color: '#c98a4a', mane: '#c9a2ff' })
    return r || { x: X, y: Y, size, top: Y - size / 2 }
  }
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.66 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.4 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }
  const pos = {}      // where each speaker stands this frame (bubble anchors)

  function nursery(t, end) {
    drawNursery(x, t, { cribs: false, night: end ? 0.35 : 0.15 })
    const [cx0, cy0] = NURSERY.cribs[0], CRIB_W = 250
    drawCloudCrib(x, NURSERY.cribs[2][0], NURSERY.cribs[2][1], CRIB_W, t)
    drawCloudCrib(x, NURSERY.cribs[2][0], NURSERY.cribs[2][1], CRIB_W, t, { front: true })
    drawCloudCrib(x, cx0, cy0, CRIB_W, t)
    const inCrib = cy0 - 236 * 0.55
    if (!end) {
      // the Moon dozing at her station, top right; she wakes at "…sag?"
      const m = drawMoonNurse(x, 850, 830, 96, t, { mood: t < 4.75 ? 'sleepy' : 'wide', look: [-1, 0.4], hops: [4.8], seed: 4 })
      pos.moon = [m.x - 30, m.top - 6]
      // the leap: frame 0 is mid-air above the crib's rail, heading right
      const p = prog(t, -0.4, 0.9), lx = lerp(cx0, 640, p), ly = lerp(inCrib, 1310, p) - Math.sin(Math.PI * clamp(p)) * 270
      const run = prog(t, 4.45, 5.2)
      const bx = lerp(lx, 1280, ease.inCubic(run))
      drawBackpack(x, bx + 70, ly + 4, 4, t)
      const b = drawBabyStar(x, bx, ly, 236, t, { sign: 'sagittarius', age: 'baby', mood: t < 0.9 ? 'happy' : t < 4.4 ? 'sparkle' : 'happy', look: [1, -0.2], hops: [0.9, 1.6, 2.3, 2.95, 3.6, 4.2], seed: 9 })
      pos.sag = [bx, (b?.top ?? ly - 118) - 6]
      if (t < 0.95) for (let i = 0; i < 4; i++) { x.fillStyle = 'rgba(255,255,255,0.6)'; x.fillRect(lx - 150 - i * 34, ly - 40 + i * 26, 60 - i * 10, 6) }
      drawCloudCrib(x, cx0, cy0, CRIB_W, t, { front: true })
    } else {
      // home again: the kids run in, Sag hops back INTO the crib (leaping left), growUp, today's Sag in the cloud crib
      const m = drawMoonNurse(x, 830, 760, 96, t, { mood: t < T.leap + 0.6 ? 'happy' : 'wink', look: [-1, 0.4], hops: [46.95, T.grow + 1.5], seed: 4, lamp: true })
      pos.moon = [m.x - 30, m.top - 6]
      const runIn = ease.outCubic(prog(t, T.home, T.home + 0.7))
      drawBabyStar(x, lerp(1260, 860, runIn), 1310, 220, t, { sign: 'gemini', age: 'kid', mood: 'happy', look: [-1, 0], hops: [T.home + 0.75, T.leap + 0.3, T.grow + 1.6], seed: 3 })
      const p = prog(t, T.leap, T.leap + 0.9)
      const sx = t < T.leap ? lerp(1300, 620, runIn) : lerp(620, cx0, p)
      const sy = t < T.leap ? 1300 : lerp(1300, inCrib, p) - Math.sin(Math.PI * p) * 270
      if (t < T.grow) { const r = kidSag(t, sx, sy, 236, { mood: t < T.leap ? 'happy' : 'sparkle', look: [-1, 0], hops: [T.home + 0.75, 47.6] }); pos.sag = [r.x, r.top] }
      else {
        if (t > T.grow + 0.8) drawBackpack(x, cx0 + 90, inCrib - 10 + Math.sin(t * 2.1) * 3, 6, t)
        growUp(x, t, { sign: 'sagittarius', at: T.grow, x: cx0, y: inCrib - 14, size: 270, look: [1, -0.2], seed: 9 })
      }
      drawCloudCrib(x, cx0, cy0, CRIB_W, t, { front: true })
    }
  }

  function yard(t) {
    drawAcademy(x, t, { room: 'yard' })
    const k = ease.outBack ? 1 : 1
    void k
    drawCrayonMap(x, t, { x: 540, y: 820, w: 800, h: 520, route: ease.inOutQuad(prog(t, T.mapAt + 0.4, T.desert - 0.4)), marks: MARKS, pop: easeOutBack(prog(t, T.mapAt, T.mapAt + 0.35), 1.8) })
    const r = kidSag(t, 540, 1350, 270, { horse: true, mood: t < T.mapAt ? 'sparkle' : 'happy', look: t < T.mapAt ? [0, -0.4] : [0, -1], hops: [T.yard + 0.35, 7.6, 10.25, 11.0] })
    pos.sag = [r.x, r.top]
  }

  function desert(t, win) {
    daySky(x, t, { hour: 13, alpha: 0.6 })
    drawAcademy(x, t, { room: 'yard' })
    drawSandbox(x, t, 40, 1160, 1000, 400, { heat: 1 })
    drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 2 })
    // Taurus, in the sand, unbothered, with a bucket
    const ta = drawBabyStar(x, win ? 150 : 250, 1300, 200, t, { sign: 'taurus', age: 'kid', mood: win ? 'happy' : t < 14.3 ? 'neutral' : 'squint', look: [1, -0.2], hops: win ? [42.6, 43.4] : [14.35], seed: 5 })
    pos.taurus = [win ? 150 : 250, (ta?.top ?? 1200) - 4]
    const bk = win ? 200 : 318
    x.fillStyle = '#1b1236'; x.fillRect(bk, 1340, 66, 62); x.fillStyle = '#3fb6f0'; x.fillRect(bk + 6, 1346, 54, 50)
    if (!win) {
      const p = prog(t, T.desert, T.swings - 0.1)
      const r = kidSag(t, lerp(520, 900, ease.inOutQuad(p)), 1240, 240, { horse: true, mood: 'happy', look: [1, 0], hops: HOPS_DESERT })
      pos.sag = [r.x, r.top]
    } else {
      // expedition two: Sag + Gemini galloping, a jump rope between them (the buddy line)
      const p = prog(t, T.win, T.top2 - 0.1), bx = lerp(600, 800, ease.inOutQuad(p))
      const g = drawBabyStar(x, bx - 230, 1260, 220, t, { sign: 'gemini', age: 'kid', mood: 'happy', look: [1, 0], hops: HOPS_WIN.map(h => h + 0.15), seed: 3 })
      if (g) drawStickHorse(x, bx - 230 + 66, g.y + 18, 7, t, { rot: -0.45, color: '#e0b25a', mane: '#f2cf4a' })
      const r = kidSag(t, bx + 50, 1240, 240, { horse: true, mood: 'happy', look: [-0.6, 0], hops: HOPS_WIN })
      pos.sag = [r.x, r.top]; pos.gemini = [bx - 230, (g?.top ?? 1140) - 4]
      x.save(); x.strokeStyle = '#1b1236'; x.lineWidth = 12; x.beginPath(); x.moveTo(bx - 170, 1290); x.quadraticCurveTo(bx - 90, 1350 + Math.sin(t * 8) * 10, bx - 10, 1290); x.stroke()
      x.strokeStyle = '#ff6fa8'; x.lineWidth = 6; x.stroke(); x.restore()
      drawCrayonMap(x, t, { x: 540, y: 690, w: 760, h: 480, route: 1, marks: MARKS2, title: 'EXPEDITION TWO', pop: easeOutBack(prog(t, T.win + 0.05, T.win + 0.4), 1.8) * (1 - ease.inCubic(prog(t, 44.25, 44.55))) })
    }
  }

  function swings(t) {
    daySky(x, t, { hour: 14, alpha: 0.6 })
    drawAcademy(x, t, { room: 'yard' })
    // jungle: crayon vines over the swing set
    drawSwings(x, t, 430, 820, 16, { swing: 1.7 })
    const s = swingSeat(t, 430, 820, 16, 1, 1.7)
    const r = kidSag(t, s.x, s.y - 112, 230, { mood: Math.sin(t * 2.6 + 1.7) > 0 ? 'happy' : 'sparkle', look: [Math.sign(Math.cos(t * 2.6 + 1.7)), 0] })
    pos.sag = [r.x, r.top]
    for (let i = 0; i < 6; i++) { const vx = 120 + i * 170, sw = Math.sin(t * 1.3 + i) * 10; x.strokeStyle = '#2fa05a'; x.lineWidth = 10; x.beginPath(); x.moveTo(vx, 560); x.quadraticCurveTo(vx + sw + 30, 700, vx + sw, 860 + (i % 3) * 40); x.stroke(); x.fillStyle = '#5fd07a'; for (let k = 0; k < 4; k++) x.fillRect(vx + sw * k / 4 + (k % 2 ? 8 : -26), 620 + k * 60, 20, 12) }
    crayonText(x, 'WHEEE!', 820 + Math.sin(t * 2.6) * 30, 1520, { size: 76, color: '#ff6fa8', rot: -0.12, seed: 4, alpha: prog(t, 17.6, 17.9) })
  }

  function slide(t, win) {
    daySky(x, t, { hour: win ? 15 : 16, alpha: 0.6 })
    drawAcademy(x, t, { room: 'yard' })
    drawSlide(x, 230, 1520, 11, t, { color: '#ff7a59' })
    const top = 1520 - 34 * 11 - 2 * 11                  // the platform's top
    const flagK = win ? 1 : easeOutBack(prog(t, T.flag, T.flag + 0.35), 2)
    if (flagK > 0) { x.save(); x.translate(380, top); x.scale(1, flagK); x.fillStyle = '#1b1236'; x.fillRect(-5, -150, 12, 150); x.fillStyle = win ? '#ff6fa8' : '#2fc79a'; x.fillRect(5, -150, 90, 56); x.restore(); if (win) crayonText(x, '♥♥', 425, top - 122, { size: 34, color: '#fff', seed: 2 }) }
    burst(x, t, 380, top - 120, T.flag, 10, 120)
    if (!win) {
      let sx, sy
      if (t < T.slide + 1.2) { const p = ease.inOutQuad(prog(t, T.slide, T.slide + 1.2)); sx = 260 + 30 * p; sy = lerp(1400, top - 115, p) }
      else if (t < T.down) { sx = lerp(290, 330, prog(t, T.slide + 1.2, T.slide + 1.5)); sy = top - 115 }
      else { const p = ease.inQuad(prog(t, T.down, T.behind - 0.05)); sx = lerp(360, 760, p); sy = lerp(top - 100, 1440, p) }
      const r = kidSag(t, sx, sy, 210, { mood: t < T.flag ? 'squint' : t < T.down ? 'happy' : 'wide', look: [1, 0], hops: [T.flag + 0.05, 23.1, 23.7] })
      pos.sag = [r.x, r.top]
    } else {
      const g = drawBabyStar(x, 300, top - 110, 190, t, { sign: 'gemini', age: 'kid', mood: 'happy', look: [1, 0], hops: [T.top2 + 0.2], seed: 3 })
      const r = kidSag(t, 470, top - 116, 200, { mood: 'happy', look: [-1, 0], hops: [T.top2 + 0.1, 44.9, 45.5] })
      void g; pos.sag = [r.x, r.top]
    }
  }

  function behind(t) {
    const dusk = prog(t, T.behind, T.behind + 1.6)
    daySky(x, t, { hour: lerp(17, 19.5, dusk) })
    drawAcademy(x, t, { room: 'yard' })
    x.fillStyle = `rgba(16,10,44,${0.25 + 0.3 * dusk})`; x.fillRect(0, 0, 1080, 1920)
    // the slide from behind: a dark silhouette, left foreground
    x.save(); x.globalAlpha = 0.95; x.filter = 'brightness(0.35) saturate(0.6)'; drawSlide(x, -120, 1600, 14, t, { color: '#7a4a6a' }); x.restore()
    const moonIn = ease.outCubic(prog(t, T.moon, T.moon + 0.7))
    const hugK = prog(t, T.hug, T.hug + 0.35) * (1 - prog(t, 33.7, 34.05))
    const sx = lerp(640, 600, hugK), sy = lerp(1300, 1190, hugK)
    // the map, upside down, then dropped while it hugs
    if (t < T.hug) drawCrayonMap(x, t, { x: 760, y: 1440, w: 240, h: 170, route: 1, marks: MARKS, pop: 1, rot: Math.PI - 0.2, title: 'THE GREAT EXPEDITION' })
    else drawCrayonMap(x, t, { x: 760, y: 1460, w: 240, h: 170, route: 1, marks: MARKS, pop: 1, rot: 0.1, title: 'THE GREAT EXPEDITION' })
    if (moonIn > 0) {
      const m = drawMoonNurse(x, lerp(1000, 760, moonIn), lerp(300, 980, moonIn), 112, t, { mood: t < 34.0 ? 'happy' : 'neutral', look: [-1, 0.6], lamp: true, hops: [30.5, 35.95, 38.45], seed: 4 })
      pos.moon = [m.x, m.top - 6]
    }
    const lost = t < T.moon + 0.3
    const r = kidSag(t, sx, sy, 230, { horse: !hugK, horseRot: -0.2, mood: lost ? (t < 26.4 ? 'wide' : 'neutral') : t < T.hug ? 'sparkle' : hugK > 0.5 ? 'happy' : 'happy', look: lost ? [Math.sin(t * 1.1), -0.2] : [1, -0.6], hops: [26.65, T.moon + 0.4, T.hug, 34.15, 40.45, 41.0], bob: lost ? 1 : undefined })
    pos.sag = [r.x, r.top]
    // a single tear while lost
    if (t > 27.2 && t < T.moon + 0.4) { const p = ((t - 27.2) % 1.2) / 1.2; x.fillStyle = '#9fd8ff'; x.fillRect(r.x - 40, r.y + 6 + p * 60, 10, 14) }
    if (hugK > 0.4) burst(x, t, 680, 1080, T.hug + 0.2, 10, 150, ['#ff6fa8', '#ffd6ec', GOLD])
    // the moonlight finding it
    if (moonIn > 0) { x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(sx, sy, 0, sx, sy, 420); g.addColorStop(0, `rgba(255,236,190,${0.22 * moonIn})`); g.addColorStop(1, 'rgba(255,236,190,0)'); x.fillStyle = g; x.fillRect(sx - 420, sy - 420, 840, 840); x.restore() }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)
      const Z = zoomAt(t)
      x.translate(Z.cx, Z.cy); x.scale(Z.z, Z.z); x.translate(-Z.cx, -Z.cy)
      for (const k in pos) delete pos[k]
      if (t < T.yard) nursery(t, false)
      else if (t < T.desert) yard(t)
      else if (t < T.swings) desert(t, false)
      else if (t < T.slide) swings(t)
      else if (t < T.behind) slide(t, false)
      else if (t < T.win) behind(t)
      else if (t < T.top2) desert(t, true)
      else if (t < T.home) slide(t, true)
      else nursery(t, true)
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
      for (const g of TAGS) ageCaptionSafe(ageCaption, x, t, { ...g, y: 1650, color: '#d9b8ff' })
      drawHomeVideo(x, t, { alpha: t < T.hookOut ? 0 : 1 - prog(t, T.last - 0.3, T.last) })
      factChip(x, t, FACT)
      drawCrayonFrame(x, t)
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.4 * cam.flash; x.fillStyle = '#fff4fb'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [T.yard, T.desert, T.swings, T.slide, T.behind, T.win, T.home]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E09' }), cardCuts(CARD_CUTS)]

const gallopCues = hs => hs.flatMap((h, i) => [['tick', r3(h), 0.02], ['pop', r3(h + 0.12), i % 2 ? 392 : 349.23, 0.012, 0]])
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: WHO[s.who].pitch })),
  ...TAGS.filter(g => g.at > 0).flatMap(g => ageCaptionCues(g.at)),
  ['whoosh', 0.05, 0.4, 0.03], ['pop', 0.9, 659.25, 0.03, 0], ['whoosh', 4.5, 0.5, 0.03],
  ['glitter', T.mapAt, T.mapAt + 0.8], ['pop', T.mapAt + 0.05, 1046.5, 0.03, 0],
  ...gallopCues(HOPS_DESERT), ...gallopCues(HOPS_WIN),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', 17.6, 0.6, 0.025], ['whoosh', 18.8, 0.6, 0.025], ['whoosh', 20.0, 0.6, 0.025],
  ['bell', T.flag, 1046.5, 0.035, 1.6, 0], ['bell', T.flag + 0.12, 1318.51, 0.028, 1.6, 0], ['glitter', T.flag, T.flag + 0.7],
  ['whoosh', T.down, 0.7, 0.04], ['pop', T.behind - 0.1, 261.63, 0.03, 0],
  ['bell', T.moon + 0.1, 523.25, 0.03, 2.6, 0.2], ['glitter', T.moon, T.moon + 1.2],
  ['bell', T.hug + 0.15, 783.99, 0.03, 2.2, 0], ['bell', T.hug + 0.3, 1046.5, 0.025, 2.2, 0], ['glitter', T.hug + 0.1, T.hug + 1],
  ...factChipCues(FACT.at, FACT),
  ['whoosh', T.leap, 0.5, 0.03], ['pop', T.leap + 0.9, 659.25, 0.03, 0],
  ...growUpCues(T.grow),
  ...[0, 0.1, 0.2, 0.3].map((d, i) => ['pop', r3(T.last + d), [698.46, 830.61, 932.33, 1046.5][i], 0.038, 0]), ['pluck', T.last + 0.35, 1046.5, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
