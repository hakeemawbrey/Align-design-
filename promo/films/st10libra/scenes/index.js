// st10libra (60 s vertical, Star Talk season 10 "Little Stars", S10 E07) · story 0–55.6, then the end card.
//   HOOK   "Libra can't pick a *lunch* table."  AGE 7: the cafeteria as a giant scale, tipping between two tables of friends,
//          kid Libra in the middle with its tray.
//   WANT   ◀◀ AGE 1, the high chair: the Moon offers peas or carrots, and Baby Libra takes *both*.  ▶ AGE 7: "i want
//          *everyone* to be happy."
//   TRY    It steps left (ARIES: "sit *here!*"), the right table droops (CANCER: "oh. *ok.*"); it steps right (ARIES: "*aw.*").
//          It sits on the floor in the middle: "my soup is *cold*."  It splits its sandwich: "half here, half *there?*"
//          "i can't *pick*."
//   TURN   Saturn, on lunch duty, sits down beside it: "know what the *equinox* does?"  The window: day and night, half and
//          half. ★ REAL SKY: at the equinoxes, day and night are about equal everywhere on Earth. SATURN: "your season starts
//          near the *September* one."  LIBRA: "they don't pick… they *share*."
//   WIN    Libra pushes one table, Aries jumps up and pushes the other ("i'll *push!*"), KA-CHUNK: one long table, and the
//          scale over the room goes level. ARIES: "saved you the *middle*." A hug.
//   END    growUp in the middle seat: today's Libra, today's Aries beside it. "Make *room* for everyone."
//   Rhyme: frame 0 is Libra under a tipping scale between two tables; the last shot is Libra under a level scale at one.
//   Rewatch bait: the menu board says TODAY: THAI · SUSHI (adult Libra's 40-minute dinner dilemma in starlibra). Ghost:
//   baby ghost, cell 2, peeking from under the left table's cloth.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSaturn } from '../../st5cast.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, ageCaption, ageCaptionCues, drawMoonNurse, growUp, growUpCues, KIDS_FONTS } from '../../st10kids.js'
import { cafeteria, lunchTable, scaleBeam, tray, highChair, spoon, equinoxWindow, vhs, frost } from './kit.js'

export const DURATION = 60
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c'
const LI = signStar('libra'), AR = signStar('aries')
const MOON_TAG = '☾ THE MOON', LIB = '♎ LIBRA', ARI = '♈ ARIES', CAN = '♋ CANCER', SAT = '♄ SATURN'

const T = {
  hookOut: 2.8, rew: 3.0, moon: 3.6, both: 6.0, caf: 8.4, left: 11.8, sad: 14.0, right: 16.2, mid: 18.8, cold: 20.6,
  split: 23.2, cant: 26.4, sat: 29.4, win: 32.0, back: 36.0, huh: 38.6, push: 41.6, chunk: 45.0, seat: 45.6, hug: 48.4,
  grow: 50.2, last: 52.0, lastOut: [55.1, 55.35], fade: [55.2, 55.6], ghost: 13.0,
}
const CUTS = [T.caf, T.mid, T.win, T.back, T.seat]
const PUNCH = [
  { at: T.cold, out: T.split - 0.1, zoom: 1.5, x: 540, y: 1470 },
  { at: T.chunk, out: T.chunk + 0.5, zoom: 1.15, x: 540, y: 1420 },
]
const AGES = [
  { at: -1, out: T.rew, text: 'AGE 7' },
  { at: T.rew + 0.6, out: T.caf - 0.1, text: 'AGE 1' },
  { at: T.caf + 0.3, out: T.grow - 0.1, text: 'AGE 7' },
]
const SAY = [
  { text: 'peas… or *carrots?*', at: T.moon + 0.2, out: T.both - 0.1, who: 'moon' },
  { text: '*both?*', at: T.both, out: T.caf - 0.2, who: 'lib', size: 54 },
  { text: 'i want *everyone* to be happy.', at: T.caf + 0.4, out: T.left - 0.1, who: 'lib' },
  { text: 'sit *here!*', at: T.left + 0.2, out: T.sad - 0.1, who: 'ari' },
  { text: 'oh. *ok.*', at: T.sad + 0.2, out: T.right - 0.1, who: 'can' },
  { text: '*aw.*', at: T.right + 0.4, out: T.mid - 0.2, who: 'ari' },
  { text: 'my soup is *cold*.', at: T.cold + 0.2, out: T.split - 0.1, who: 'lib' },
  { text: 'half here, half *there?*', at: T.split + 0.3, out: T.cant - 0.1, who: 'lib' },
  { text: 'i can’t *pick*.', at: T.cant + 0.2, out: T.sat - 0.1, who: 'lib' },
  { text: 'know what the *equinox* does?', at: T.sat + 0.4, out: T.win - 0.1, who: 'sat' },
  { text: 'your season starts near the *September* one.', at: T.back + 0.2, out: T.huh - 0.1, who: 'sat' },
  { text: 'they don’t pick… they *share*.', at: T.huh, out: T.push - 0.1, who: 'lib' },
  { text: 'i’ll *push!*', at: T.push + 0.4, out: T.chunk - 0.1, who: 'ari' },
  { text: 'saved you the *middle*.', at: T.seat + 0.4, out: T.hug - 0.1, who: 'ari' },
]
const FACT = { text: 'At the equinoxes, day and night are about equal everywhere on Earth.', at: T.win + 0.4, dur: 3.2, x: 540, y: 1430, w: 820, label: '★ REAL SKY' }
export const GHOST = { at: T.ghost, x: 230, y: 1610, where: 'baby ghost peeking up from under the left lunch table’s cloth' }

// the two tables' centres: apart until the push, then together
const HALF = 140
function tablesX(t) {
  const k = ease.inOutCubic(prog(t, T.push + 0.8, T.chunk))
  return [lerp(220, 400, k), lerp(860, 680, k)]
}
// the scale's tilt (radians, + = right end down)
function tilt(t) {
  if (t < T.caf) return 0.13 * Math.sin(t * 2.4 + 0.7)
  if (t < T.left) return 0.06 * Math.sin(t * 2)
  if (t < T.right) return lerp(0, -0.22, ease.outBack(prog(t, T.left, T.left + 0.6)))
  if (t < T.mid) return lerp(-0.22, 0.22, ease.outBack(prog(t, T.right, T.right + 0.6)))
  if (t < T.chunk) return 0.16 * Math.sin(t * 3.1)
  return 0.16 * Math.sin(T.chunk * 3.1) * Math.exp(-(t - T.chunk) * 4) * Math.cos((t - T.chunk) * 14)
}
// Libra's spot
function libra(t) {
  if (t < T.left) return [540, 1320, 'stand']
  if (t < T.right) return [lerp(540, 410, ease.outCubic(prog(t, T.left, T.left + 0.5))), 1320, 'stand']
  if (t < T.mid) return [lerp(410, 670, ease.outCubic(prog(t, T.right, T.right + 0.5))), 1320, 'stand']
  if (t < T.push) return [540, 1420, 'floor']
  if (t < T.seat) { const [, R] = tablesX(t); return [lerp(540, R + HALF + 50, ease.outCubic(prog(t, T.push, T.push + 0.6))), 1350, 'push'] }
  return [545, 1330, 'seat']
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Libra can’t pick | a *lunch* table.', out: T.hookOut, accentColor: GOLD, top: 250 })
  const last = popText(root, 'Make *room* for | everyone.', { top: 300, size: 118, accentSize: 168, lineHeight: 1.18, at: T.last, gap: 0.12, accentColor: GOLD, wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.72 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }
  function anchor(t, who) {
    const [L, R] = tablesX(t), [lx, ly] = libra(t)
    if (t < T.caf) return who === 'moon' ? [250, 950] : [560, 1000]
    if (who === 'ari') return t >= T.seat ? [415, 1240] : t >= T.push ? [L - HALF - 40, 1230] : [L - 70, 1250]
    if (who === 'can') return [R - 70, 1250]
    if (who === 'sat') return [820, 1200]
    return [lx, ly - (ly > 1400 ? 140 : 160)]
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)

      const baby = t >= T.rew && t < T.caf, win = t >= T.win && t < T.back
      if (baby) {
        // ── ◀◀ AGE 1 · the high chair: peas or carrots
        drawNursery(x, t, { glow: 0.7, cribs: false })
        highChair(x, t, 560, 1240)
        const took = ease.outCubic(prog(t, T.both, T.both + 0.5))
        const b = drawBabyStar(x, 560, 1070, 270, t, { sign: 'libra', age: 'baby', bib: true, mood: t < T.both ? 'wide' : 'laugh', look: t < T.both ? [Math.sin(t * 5) > 0 ? -1 : 1, 0.2] : [0, 0], hops: [T.both + 0.05, T.both + 0.6], seed: 7 })
        const mk = ease.outCubic(prog(t, T.rew + 0.3, T.rew + 0.8))
        drawMoonNurse(x, lerp(-140, 230, mk), 900, 105, t, { mood: t < T.both ? 'happy' : 'wink', look: [1, 0.3] })
        spoon(x, t, lerp(330, b.x - 130, took), lerp(1010, b.y + 40, took), '#7ad04a', -0.5 + took * 0.3)
        spoon(x, t, lerp(790, b.x + 130, took), lerp(1010, b.y + 40, took), '#ff9a3a', 0.5 - took * 0.3)
      } else if (win) {
        // ── the window: half day, half night
        equinoxWindow(x, t, T.win)
      } else {
        // ── AGE 7 · the cafeteria under a giant scale
        cafeteria(x, t)
        const [L, R] = tablesX(t), joined = t >= T.chunk
        scaleBeam(x, t, { tilt: tilt(t), level: joined ? prog(t, T.chunk, T.chunk + 0.4) : 0, L, R })
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 2 })
        const sad = t >= T.sad && t < T.right ? 'right' : t >= T.right && t < T.push ? 'left' : null
        const seated = t >= T.seat
        // the kids: Aries + Leo at the left table, Cancer + Taurus at the right
        const ariPush = t >= T.push && t < T.seat
        const ax = seated ? 415 : ariPush ? L - HALF - 40 : L - 70
        const kids = [
          { sign: 'leo', x: seated ? 285 : L + 70, side: 'left', seed: 21 },
          { sign: 'aries', x: ax, side: 'left', seed: 22, push: ariPush },
          { sign: 'cancer', x: seated ? 670 : R - 70, side: 'right', seed: 23 },
          { sign: 'taurus', x: seated ? 805 : R + 70, side: 'right', seed: 24 },
        ]
        if (t < T.grow + 0.75) for (const k of kids) {
          const droop = sad === k.side
          const mood = seated ? 'happy' : k.push ? 'determined' : droop ? (k.sign === 'cancer' ? 'cry' : 'pout') : t >= T.left && t < T.right && k.side === 'left' ? 'laugh' : 'happy'
          drawBabyStar(x, k.x, k.push ? 1340 : 1350, 200, t, { sign: k.sign, age: 'kid', mood, look: [k.side === 'left' ? 1 : -1, 0], seed: k.seed, squash: droop ? 0.12 : 0, hops: k.sign === 'aries' ? [T.left + 0.25, T.push + 0.45, T.seat + 0.45] : k.sign === 'cancer' ? [T.sad + 0.25] : [T.chunk + 0.1] })
        }
        else {
          drawStarChar(x, 405, 1330, 230, t, { color: AR.color, glyph: AR.glyph, mood: 'heart', look: [1, 0], seed: 22 })
          for (const [s, px, sd] of [['leo', 250, 21], ['cancer', 700, 23], ['taurus', 850, 24]]) { const c = signStar(s); drawStarChar(x, px, 1350, 180, t, { color: c.color, glyph: null, mood: 'happy', seed: sd }) }
        }
        lunchTable(x, t, L, 1470, HALF)
        lunchTable(x, t, R, 1470, HALF)
        // Libra + its tray
        const [lx, ly, pose] = libra(t)
        const mood = t < T.left ? (t < T.caf ? 'wide' : 'sparkle') : t < T.mid ? 'wide' : t < T.cant ? 'pout' : t < T.sat ? 'cry' : t < T.huh ? 'neutral' : t < T.push ? 'sparkle' : pose === 'push' ? 'determined' : 'happy'
        const sway = t < T.caf ? Math.sin(t * 2.4 + 0.7) * 26 : 0
        const g = growUp(x, t, { sign: 'libra', at: T.grow, x: lx + sway, y: ly, size: pose === 'seat' ? 260 : 290, look: pose === 'seat' ? [-1, 0] : [0, 0], seed: 7, caption: ['AGE 7', 'TODAY'], mood, kidOpts: { squash: pose === 'floor' ? 0.14 : 0, hops: [T.left, T.right, T.huh + 0.1, T.chunk + 0.05, T.seat + 0.1] } })
        if (pose !== 'push' && t < T.grow) tray(x, t, g.x, g.y + (pose === 'floor' ? 70 : 110), { warm: t < T.mid ? 1 : t >= T.seat ? 1 : 0, split: t >= T.split && t < T.seat ? prog(t, T.split, T.split + 0.9) : 0, L, R })
        if (t >= T.cold && t < T.split) frost(x, t, g.x, g.y + 70)
        if (t >= T.sat && t < T.win) drawSaturn(x, lerp(1200, 820, ease.outCubic(prog(t, T.sat, T.sat + 0.5))), 1350, 280, t, { mood: 'happy', look: [-1, 0.3], seed: 9 })
        if (t >= T.back && t < T.push) drawSaturn(x, 820, 1350, 280, t, { mood: 'happy', look: [-1, 0.3], seed: 9, pointer: true })
        if (t >= T.hug && t < T.grow) for (let i = 0; i < 3; i++) { const p = ((t - T.hug) * 0.6 + i / 3) % 1; drawPixelStar(x, 480 + (i - 1) * 60, 1160 - p * 160, 12, i % 2, '#ff8fb1', '#ffd0e0') }
        if (t >= T.chunk && t < T.chunk + 0.8) { x.save(); x.font = "800 64px Inter, sans-serif"; x.textAlign = 'center'; x.fillStyle = '#1b1236'; x.fillText('KA-CHUNK!', 695, 1665); x.fillStyle = '#ffd36e'; x.fillText('KA-CHUNK!', 690, 1660); x.restore() }
      }
      x.restore()

      vhs(x, t, { rewAt: T.rew, playAt: T.caf })
      topScrim(t)
      for (const s of SAY) { const [ax, ay] = anchor(s.at + 0.01, s.who); speechBubble(x, t, { text: s.text, at: s.at, out: s.out, x: ax, y: ay, size: s.size ?? 46, w: 600, name: s.who === 'moon' ? MOON_TAG : s.who === 'sat' ? SAT : s.who === 'ari' ? ARI : s.who === 'can' ? CAN : LIB, color: s.who === 'moon' ? '#f4ead8' : s.who === 'sat' ? '#e8c37a' : s.who === 'ari' ? AR.color : s.who === 'can' ? '#3fb6f0' : LI.color, side: s.who === 'moon' ? 0.3 : s.who === 'ari' ? 0.4 : s.who === 'can' || s.who === 'sat' ? -0.4 : 0 }) }
      factChip(x, t, FACT)
      for (const a of AGES) if (t < a.out) { x.save(); x.globalAlpha = 1 - prog(t, a.out - 0.25, a.out); ageCaption(x, t, { text: a.text, at: a.at, x: 250, y: 1690 }); x.restore() }   // (out: null — st10kids' own pop-out calls ease.inBack, which lib.js lacks)
      drawCrayonFrame(x, t)
      if (cam.flash > 0) { x.save(); x.globalAlpha = 0.4 * cam.flash; x.fillStyle = '#fff4dc'; x.fillRect(0, 0, 1080, 1920); x.restore() }
      const f = prog(t, ...T.fade)
      endC.style.opacity = String(ease.inOutQuad(f))
      if (f > 0) drawSky(ex, t, SKY_H)
      hook.update(t)
      last.update(t, 1 - ease.inQuad(prog(t, ...T.lastOut)))
      drawGrain(gx, t)
    },
  }
}

const CARD_CUTS = [{ t: T.win, kind: 'flip' }, { t: T.seat, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E07' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const PITCH = { lib: 830.61, moon: 440, sat: 392, ari: 987.77, can: 659.25 }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: PITCH[s.who] })),
  ...AGES.filter(a => a.at > 0).flatMap(a => ageCaptionCues(a.at)),
  // the VHS rewind and play
  ['whoosh', T.rew, 0.5, 0.05], ...[0, 0.08, 0.16, 0.24].map(d => ['tick', r3(T.rew + d), 0.02]), ['pop', T.caf, 1760, 0.03, 0],
  ['pop', T.both + 0.1, 1318.51, 0.04, -0.3], ['pop', T.both + 0.2, 1760, 0.04, 0.3],
  // the scale tipping
  ['tom', T.left + 0.1, 130.81, { gain: 0.16 }], ['tom', T.right + 0.1, 164.81, { gain: 0.16 }],
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.split + 0.2, 0.4, 0.04], ['pop', T.split + 0.6, 880, 0.03, -0.6], ['pop', T.split + 0.75, 880, 0.03, 0.6],
  ['glitter', T.win, T.win + 1.2], ...factChipCues(FACT.at, FACT),
  ['riser', T.push + 0.6, T.chunk, 0.05], ['boom', T.chunk, 0.3], ['crash', T.chunk + 0.02, { gain: 0.04 }],
  ['bell', T.chunk + 0.3, 1108.73, 0.03, 1.8, 0], ['glitter', T.seat, T.seat + 1.0],
  ...growUpCues(T.grow),
  ...[0, 0.12, 0.24, 0.36].map((d, i) => ['pop', r3(T.last + d), [554.37, 659.25, 830.61, 1108.73][i], 0.038, 0]), ['pluck', T.last + 0.36, 1108.73, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
