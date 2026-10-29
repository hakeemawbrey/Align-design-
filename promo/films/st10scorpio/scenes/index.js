// st10scorpio (60 s vertical, Star Talk season 10 "Little Stars", S10 E08) · story 0–55.6, then the end card.
//   HOOK   "Baby Scorpio *hides* in the nursery."  AGE 1: two eyes peeking out of a dark dust cloud in the corner, one
//          pink sock sticking out the bottom.
//   WANT   The Moon (night nurse): "playtime, little one!" (it ducks back in). To us: "it wants a friend. a *sure* one."
//   TRY    DAY 1: kid Taurus toddles over with a bowl of peas: "peekaboo?" Nothing. The tally board counts the days: DAY 2
//          (a picture book read aloud: "same time *tomorrow*."), DAY 9 (a KEEP OUT sign; Taurus builds a block tower), DAY 33
//          (Taurus naps; the eyes come out to look, then duck), DAY 61 ("i brought *peas* again." and a crayon "…maybe"
//          under KEEP OUT), DAY 87 (THE MOON: "why do you keep *coming?*" TAURUS: "it's my friend. it just doesn't *know*
//          yet.")
//   TURN   The Moon puts on infrared goggles and the picture goes infrared: inside the cloud, Scorpio glows. "in *infrared*,
//          i can see you." ★ REAL SKY: stars are born hidden inside dark clouds of dust; many can only be seen in infrared
//          until they shine through. SCORPIO: "…hiding is *normal?*"
//   WIN    DAY 100. Taurus, back turned, peas. Scorpio slides out and taps it: "boo." Taurus jumps, laughs: "*hi*. i waited."
//          The hug. AGE 5, the Academy yard: Scorpio walks in half behind Taurus, holding its hand.
//   END    growUp: kid Scorpio → today's Scorpio, today's Taurus beside it. "Hidden isn't *alone*."
//   Rhyme: frame 0 is one pair of eyes in the dark; the last shot is two stars side by side in the light.
//   Rewatch bait: the one pink sock (adult Scorpio's secret pink sock, st9scorpioam) is there from frame 0 to the end, and
//   the peas are Baby Taurus's one food (S10 E02). Ghost: baby ghost, cell 2, rising from behind the block tower.
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
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawBabyStar, drawNursery, drawAcademy, drawCrayonFrame, ageCaption, ageCaptionCues, drawMoonNurse, growUp, growUpCues, KIDS_FONTS } from '../../st10kids.js'
import { dustCloud, tallyBoard, keepOut, peasBowl, picBook, blockTower, pinkSock, irGoggles, infrared } from './kit.js'

export const DURATION = 60
const KEY = 'C#m'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c'
const SC = signStar('scorpio'), TA = signStar('taurus')
const MOON_TAG = '☾ THE MOON', SCO = '♏ SCORPIO', TAU = '♉ TAURUS'

const T = {
  hookOut: 2.8, moon: 3.0, duck: 3.6, want: 5.6, d1: 8.4, peek1: 11.0, d2: 12.0, d9: 15.0, d33: 18.0, d61: 21.2, d87: 24.6,
  ir: 30.2, f1: 33.2, f2: 36.2, huh: 39.4, d100: 42.0, out: 42.6, boo: 44.4, jump: 44.6, hi: 46.2, yard: 48.2, grow: 50.2,
  last: 52.0, lastOut: [55.1, 55.35], fade: [55.2, 55.6], ghost: 16.2,
}
const CUTS = [T.d1, T.d2, T.d9, T.d33, T.d61, T.d87, T.d100, T.yard]
const PUNCH = [
  { at: T.peek1, out: T.d2 - 0.1, zoom: 1.35, x: 760, y: 1140 },
  { at: T.boo, out: T.hi - 0.1, zoom: 1.3, x: 600, y: 1200 },
]
const DAYS = [[T.d1, 1], [T.d2, 2], [T.d9, 9], [T.d33, 33], [T.d61, 61], [T.d87, 87], [T.d100, 100]]
const dayAt = t => { let d = null; for (const [a, n] of DAYS) if (t >= a) d = n; return d }
const AGES = [
  { at: -1, out: T.yard - 0.1, text: 'AGE 1' },
  { at: T.yard + 0.3, out: T.grow - 0.1, text: 'AGE 5' },
]
const SAY = [
  { text: 'playtime, little one!', at: T.moon + 0.2, out: T.want - 0.1, who: 'moon' },
  { text: 'it wants a friend. a *sure* one.', at: T.want + 0.2, out: T.d1 - 0.15, who: 'moon' },
  { text: 'peekaboo?', at: T.d1 + 0.4, out: T.peek1 - 0.1, who: 'tau' },
  { text: 'same time *tomorrow*.', at: T.d2 + 0.4, out: T.d9 - 0.15, who: 'tau' },
  { text: 'i brought *peas* again.', at: T.d61 + 0.4, out: T.d87 - 0.15, who: 'tau' },
  { text: 'why do you keep *coming?*', at: T.d87 + 0.3, out: 27.0, who: 'moon' },
  { text: 'it’s my friend. it just doesn’t *know* yet.', at: 27.2, out: T.ir - 0.1, who: 'tau' },
  { text: 'in *infrared*, i can see you.', at: T.ir + 0.6, out: T.f1 - 0.1, who: 'moon' },
  { text: '…hiding is *normal?*', at: T.huh, out: T.d100 - 0.15, who: 'sco' },
  { text: 'boo.', at: T.boo, out: T.hi - 0.1, who: 'sco', size: 38 },
  { text: '*hi*. i waited.', at: T.hi, out: T.yard - 0.1, who: 'tau' },
]
const FACTS = [
  { text: 'Stars are born hidden inside dark clouds of dust.', at: T.f1, dur: 2.6, x: 540, y: 1440, label: '★ REAL SKY' },
  { text: 'Many can only be seen in infrared until they shine through.', at: T.f2, dur: 2.9, x: 540, y: 1440, label: '★ REAL SKY' },
]
export const GHOST = { at: T.ghost, x: 300, y: 1180, where: 'baby ghost rising from behind Taurus’s block tower on DAY 9' }

const CLOUD = [770, 1170]
// how far Scorpio peeks out of the cloud (0 = hidden, 1 = eyes out)
function peek(t) {
  if (t < T.moon) return 0.92 + 0.06 * Math.sin(t * 3)
  if (t < T.d1) return 1 - ease.inCubic(prog(t, T.duck - 0.2, T.duck + 0.15))
  if (t < T.d2) return prog(t, T.peek1 - 0.2, T.peek1 + 0.2) * (1 - prog(t, T.peek1 + 0.6, T.peek1 + 0.75))
  if (t >= T.d33 && t < T.d61) return prog(t, T.d33 + 0.8, T.d33 + 1.3) * (1 - prog(t, T.d33 + 2.4, T.d33 + 2.55))
  if (t >= T.ir && t < T.d100) return 0.15
  if (t >= T.d100) return 0.6
  return 0
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Baby Scorpio *hides* | in the nursery.', out: T.hookOut, accentColor: GOLD, top: 250 })
  const last = popText(root, 'Hidden isn’t | *alone.*', { top: 300, size: 124, accentSize: 172, lineHeight: 1.18, at: T.last, gap: 0.12, accentColor: GOLD, wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.72 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }
  const outK = t => ease.inOutCubic(prog(t, T.out, T.out + 1.4))
  function anchor(t, who) {
    if (who === 'moon') return t >= T.d87 ? [230, 1030] : [240, 890]
    if (who === 'tau') return t >= T.d100 ? [420, 1110] : [430, 1130]
    return t >= T.d100 ? [lerp(CLOUD[0], 620, outK(t)), 1080] : [CLOUD[0], 990]
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)

      if (t < T.yard) {
        // ── AGE 1 · the nursery corner: the dark dust cloud, the tally board, Taurus's daily visit
        drawNursery(x, t, { glow: 0.7, cribs: false, night: t < T.d1 ? 0.2 : 0.35 })
        const day = dayAt(t)
        if (day) tallyBoard(x, t, { day, x: 280, y: 700, at: DAYS.find(d => d[1] === day)[0] })
        const p = peek(t), ok = outK(t)
        const sx = lerp(CLOUD[0], 620, ok), sy = lerp(lerp(CLOUD[1] + 100, CLOUD[1] - 90, p), CLOUD[1] + 60, ok)
        const sMood = t < T.moon ? 'squint' : t < T.ir ? (t >= T.d33 ? 'sparkle' : 'squint') : t < T.d100 ? 'wide' : t < T.boo ? 'neutral' : t < T.hi ? 'wink' : 'happy'
        dustCloud(x, t, CLOUD[0], CLOUD[1], { layer: 'back', thin: ok })
        const draw = () => drawBabyStar(x, sx, sy, 230, t, { sign: 'scorpio', age: 'baby', mood: sMood, look: t < T.d100 ? [-0.8, 0] : [-1, 0], seed: 8, hops: [T.boo + 0.05, T.hi + 0.1], glow: 0.4 })
        if (ok < 0.5) draw()
        dustCloud(x, t, CLOUD[0], CLOUD[1], { layer: 'front', thin: ok })
        if (ok >= 0.5) { const r = draw(); pinkSock(x, r, 230) }
        if (ok < 0.5) pinkSock(x, { x: CLOUD[0] - 10, y: CLOUD[1] + 150 }, 230, { alone: true })
        if (t >= T.d9 && t < T.d100) keepOut(x, t, CLOUD[0] + 40, CLOUD[1] - 230, { maybe: t >= T.d61 })
        // Taurus's visits
        if (t >= T.d1) {
          const nap = t >= T.d33 && t < T.d61
          const tMood = t >= T.d100 ? (t < T.jump ? 'neutral' : t < T.hi ? 'wide' : 'laugh') : nap ? 'sleepy' : t >= T.ir && t < T.d100 ? 'sparkle' : 'happy'
          const enter = t < T.d2 ? ease.outCubic(prog(t, T.d1, T.d1 + 0.6)) : 1
          const tx = t >= T.hi ? lerp(430, 470, prog(t, T.hi, T.hi + 0.3)) : lerp(-120, 430, enter)
          const look = t >= T.d100 ? (t < T.jump ? [-1, 0.3] : [1, 0]) : t >= T.d87 && t < T.ir ? [-1, 0] : t >= T.peek1 + 0.6 && t < T.d2 ? [1, 0] : [1, 0]
          drawBabyStar(x, tx, 1290, 220, t, { sign: 'taurus', age: 'kid', mood: tMood, look: t >= T.peek1 - 0.2 && t < T.peek1 + 0.6 ? [-1, 0] : look, seed: 3, squash: nap ? 0.1 : 0, hops: [T.d1 + 0.5, T.d2 + 0.5, T.d61 + 0.5, 27.3, T.jump, T.jump + 0.4, T.hi + 0.1] })
          if (t < T.d100 || t < T.boo) peasBowl(x, t, tx + 120, 1400)
          if (t >= T.d2 && t < T.d9) picBook(x, t, tx + 10, 1330)
          if (t >= T.d9 && t < T.d33) { drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'below', cell: 2 }); blockTower(x, t, 300, 1400, T.d9) }
        }
        if (t >= T.d87 && t < T.d100) {
          const mk = ease.outCubic(prog(t, T.d87, T.d87 + 0.5))
          const m = drawMoonNurse(x, lerp(-140, 230, mk), 1140, 100, t, { mood: t < T.ir ? 'happy' : 'wide', look: [1, 0] })
          if (t >= T.ir) irGoggles(x, t, m, T.ir)
        } else if (t < T.d1) {
          const mk = ease.outCubic(prog(t, T.moon, T.moon + 0.5))
          if (mk > 0) drawMoonNurse(x, lerp(-140, 240, mk), 1000, 100, t, { mood: t < T.want ? 'happy' : 'wink', look: t < T.want ? [1, 0.2] : [0, 0] })
        }
        // infrared: the cloud goes see-through and Scorpio glows inside it
        if (t >= T.ir + 0.3 && t < T.d100) infrared(x, t, { at: T.ir + 0.3, star: [CLOUD[0], CLOUD[1] + 75], draw: () => drawBabyStar(x, CLOUD[0], CLOUD[1] + 75, 230, t, { color: '#fff0b0', age: 'baby', mood: t < T.huh ? 'wide' : 'sparkle', look: [-1, -0.2], seed: 8, glow: 1.5, hops: [T.huh + 0.1] }) })
        if (t >= T.hi && t < T.yard) for (let i = 0; i < 3; i++) { const q = ((t - T.hi) * 0.6 + i / 3) % 1; drawPixelStar(x, 545 + (i - 1) * 60, 1060 - q * 160, 12, i % 2, '#ff8fb1', '#ffd0e0') }
      } else {
        // ── AGE 5 · the Academy yard, hand in hand; then growUp
        drawAcademy(x, t, { room: 'yard' })
        const w = ease.outCubic(prog(t, T.yard, T.yard + 1.4))
        const g = growUp(x, t, { sign: 'scorpio', at: T.grow, x: lerp(220, 430, w), y: 1170, size: 270, look: [1, 0], seed: 8, caption: ['AGE 5', 'TODAY'], mood: 'happy' })
        pinkSock(x, g, g.size ?? 270)
        if (t < T.grow + 0.75) drawBabyStar(x, lerp(380, 650, w), 1170, 250, t, { sign: 'taurus', age: 'kid', backpack: true, mood: 'happy', look: [-1, 0], seed: 3 })
        else drawStarChar(x, 680, 1160, 280, t, { color: TA.color, glyph: TA.glyph, mood: 'heart', look: [-1, 0], seed: 3 })
      }
      x.restore()

      topScrim(t)
      for (const s of SAY) { const [ax, ay] = anchor(s.at + 0.01, s.who); speechBubble(x, t, { text: s.text, at: s.at, out: s.out, x: ax, y: ay, size: s.size ?? 46, w: 620, name: s.who === 'moon' ? MOON_TAG : s.who === 'tau' ? TAU : SCO, color: s.who === 'moon' ? '#f4ead8' : s.who === 'tau' ? TA.color : SC.color, side: s.who === 'moon' ? 0.35 : s.who === 'tau' ? 0.3 : -0.3 }) }
      for (const fct of FACTS) factChip(x, t, fct)
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

const CARD_CUTS = [{ t: T.d100, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E08' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const PITCH = { sco: 554.37, moon: 440, tau: 659.25 }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...SAY.flatMap(s => speechCues(s.at, { pitch: PITCH[s.who] })),
  ...AGES.filter(a => a.at > 0).flatMap(a => ageCaptionCues(a.at)),
  ['whoosh', T.duck - 0.1, 0.3, 0.03],
  ...DAYS.slice(1).flatMap(([a]) => [['pop', r3(a + 0.15), 1108.73, 0.035, -0.4], ['tick', r3(a + 0.25), 0.02]]),
  ['pop', T.peek1, 1661.22, 0.025, 0.4], ['whoosh', T.peek1 + 0.6, 0.2, 0.025],
  ['tick', T.ghost + 0.05, 0.015],
  ['bell', T.d33 + 0.8, 1661.22, 0.02, 1.4, 0.3],
  // the goggles, the infrared switch
  ['pop', T.ir, 220, 0.05, -0.3], ['riser', T.ir, T.ir + 0.6, 0.05], ['boom', T.ir + 0.3, 0.2], ['glitter', T.ir + 0.3, T.ir + 1.3],
  ...FACTS.flatMap(f => factChipCues(f.at, f)),
  ['bell', T.d100 + 0.2, 1108.73, 0.03, 1.8, 0], ['bell', T.d100 + 0.5, 1661.22, 0.025, 1.8, 0],
  ['whoosh', T.out, 1.2, 0.025],
  ['pop', T.boo + 0.05, 1318.51, 0.03, 0.2], ['boom', T.jump, 0.15], ['pop', T.jump + 0.05, 880, 0.05, 0],
  ['glitter', T.hi, T.hi + 1.2],
  ...growUpCues(T.grow),
  ...[0, 0.12, 0.24, 0.36].map((d, i) => ['pop', r3(T.last + d), [554.37, 659.25, 830.61, 1108.73][i], 0.038, 0]), ['pluck', T.last + 0.36, 1108.73, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
