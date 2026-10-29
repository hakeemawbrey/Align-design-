// st10virgo (60 s vertical, Star Talk season 10 "Little Stars", S10 E06) · story 0–55.6, then the end card.
//   HOOK   "Baby Virgo lined up the *crayons*."  AGE 1, the nursery floor: a perfect rainbow row, the last crayon going in.
//   WANT   The Moon (night nurse): "by *colour?* you’re one."  VIRGO: "it has to be *just right*." (it straightens her cap)
//   TRY    AGE 6, art class. SATURN: "today: draw the *night sky*."  The paper insert: a ruled grid of stars, each with a
//          label-maker strip. VIRGO: "row one: *perfect*."  Next desk, Pisces daydreams over a jar of blue paint:
//          "i’m painting a *feeling*."  VIRGO: "feelings don’t have *rows*."  A dreamy swish, the jar tips, "*nooo!*", the spill
//          floods the grid. VIRGO (crying): "it’s *ruined*."  PISCES: "i’m *so* sorry."
//   TURN   Pisces swirls the spill: "wait… it looks like *space*."  ★ REAL SKY: Virgo is the biggest zodiac constellation.
//          SATURN: "a big sky has room for *messes*."  VIRGO: "…room for *stars*, too?"
//   WIN    Virgo takes the finest brush and dots tiny precise stars along the galaxy's arms. Both sign it, ♍ + ♓. In the hall
//          it's pinned up with a gold star, FIRST COLLAB, and two paint-covered hands hold. PISCES: "you made it *sparkle*."
//          VIRGO: "*we* did."
//   END    growUp: kid Virgo → today's Virgo, Pisces beside it, under the same painting. "Messy can be *magic*."
//   Rhyme: frame 0 is a neat row of crayons; the last shot is the same painting, its row of tiny stars running along a swirl.
//   Rewatch bait: the crayon box is labelled "LABELED BY VIRGO" (the season-9 label maker), and the fish in Pisces's thought
//   bubble is Fish, its imaginary friend from S10 E12. Ghost: baby ghost, cell 2, from behind the paint shelf.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas, drawPixelStar } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, signStar } from '../../startalk.js'
import { drawSaturn } from '../../st5cast.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { popText } from '../../lesson.js'
import { hookPOV, hookPOVCues, factChip, factChipCues, speechBubble, speechCues, vlogCam, vlogCutCues, DAY_FONTS } from '../../st9day.js'
import { drawBabyStar, drawNursery, drawAcademy, ACADEMY, drawCrayonFrame, ageCaption, ageCaptionCues, drawMoonNurse, growUp, growUpCues, KIDS_FONTS } from '../../st10kids.js'
import { crayonRow, paintJar, paperInsert, painting, thoughtFish, handprints } from './kit.js'

export const DURATION = 60
const KEY = 'Bb'
const STORY_END = DURATION - ENDCARD_LEN         // 55.6
const GOLD = '#f2c75c'
const VI = signStar('virgo'), PI = signStar('pisces')
const MOON_TAG = '☾ THE MOON', VIR = '♍ VIRGO', PIS = '♓ PISCES', SAT = '♄ SATURN'

const T = {
  hookOut: 2.8, click: 2.2, moon: 3.2, want: 5.8, cap: 7.0, cls: 8.4, paper: 11.4, pis: 14.6, roll: 17.6, tip: 20.4,
  spill: 22.8, cry: 24.6, swirl: 30.0, fact: 32.8, huh: 38.6, dots: 41.4, sign: 44.8, wall: 45.6, grow: 50.2,
  last: 52.0, lastOut: [55.1, 55.35], fade: [55.2, 55.6], ghost: 15.6,
}
const CUTS = [T.cls, T.paper, T.pis, T.spill, T.cry, T.swirl, T.fact, T.dots, T.wall]
const PUNCH = [
  { at: T.tip, out: T.spill - 0.1, zoom: 1.45, x: 700, y: 1150 },
  { at: T.cry + 0.1, out: T.cry + 2.4, zoom: 1.3, x: 250, y: 1080 },
]
const AGES = [
  { at: -1, out: T.cls - 0.1, text: 'AGE 1' },
  { at: T.cls + 0.25, out: T.grow - 0.1, text: 'AGE 6' },
]
const SAY = [
  { text: 'by *colour?* you’re one.', at: T.moon + 0.3, out: T.want - 0.1, who: 'moon' },
  { text: 'it has to be *just right*.', at: T.want + 0.1, out: T.cls - 0.2, who: 'vir' },
  { text: 'today: draw the *night sky*.', at: T.cls + 0.4, out: T.paper - 0.1, who: 'sat' },
  { text: 'row one: *perfect*.', at: T.paper + 0.6, out: T.pis - 0.1, who: 'vir' },
  { text: 'i’m painting a *feeling*.', at: T.pis + 0.4, out: T.roll - 0.1, who: 'pis' },
  { text: 'feelings don’t have *rows*.', at: T.roll + 0.2, out: T.tip - 0.1, who: 'vir' },
  { text: '*nooo!*', at: T.tip + 0.6, out: T.spill - 0.1, who: 'vir', size: 56 },
  { text: 'it’s *ruined*.', at: T.cry + 0.2, out: 27.0, who: 'vir' },
  { text: 'i’m *so* sorry.', at: 27.2, out: T.swirl - 0.1, who: 'pis' },
  { text: 'wait… it looks like *space*.', at: T.swirl + 0.4, out: T.fact - 0.1, who: 'pis' },
  { text: 'a big sky has room for *messes*.', at: 36.2, out: T.huh - 0.1, who: 'sat' },
  { text: '…room for *stars*, too?', at: T.huh, out: T.dots - 0.1, who: 'vir' },
  { text: 'you made it *sparkle*.', at: T.wall + 0.6, out: 48.4, who: 'pis' },
  { text: '*we* did.', at: 48.5, out: T.grow - 0.1, who: 'vir' },
]
const FACT = { text: 'Virgo is the biggest zodiac constellation.', at: T.fact + 0.2, dur: 3.0, x: 540, y: 1430, label: '★ REAL SKY' }
export const GHOST = { at: T.ghost, x: 1036, y: 1010, where: 'baby ghost peeking out from behind the paint shelf, right edge of the art class' }

// the art-class board, chalk lettering over the module's chalkboard
function boardText(x, t) {
  x.save(); x.font = "700 40px 'Space Mono', monospace"; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillStyle = 'rgba(255,255,255,0.86)'; x.fillText('ART: DRAW THE', 540, 700); x.fillText('NIGHT SKY ★', 540, 760)
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, ...KIDS_FONTS, "800 110px Inter", "italic 500 170px 'EB Garamond'", "700 30px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const endC = layerCanvas(root, { opacity: '0' }), ex = endC.getContext('2d')
  const hook = hookPOV(root, { text: 'Baby Virgo lined | up the *crayons.*', out: T.hookOut, accentColor: GOLD, top: 250 })
  const last = popText(root, 'Messy can | be *magic.*', { top: 300, size: 124, accentSize: 172, lineHeight: 1.18, at: T.last, gap: 0.12, accentColor: GOLD, wobble: true, fit: true })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  function topScrim(t) {
    const k = Math.max(1 - prog(t, T.hookOut - 0.1, T.hookOut + 0.2), prog(t, T.last - 0.2, T.last + 0.2) * (1 - prog(t, ...T.lastOut)))
    if (k <= 0) return
    const g = x.createLinearGradient(0, 0, 0, 760)
    g.addColorStop(0, `rgba(10,6,24,${0.72 * k})`); g.addColorStop(0.6, `rgba(10,6,24,${0.45 * k})`); g.addColorStop(1, 'rgba(10,6,24,0)')
    x.fillStyle = g; x.fillRect(0, 0, 1080, 760)
  }
  const insert = t => (t >= T.paper && t < T.pis) || (t >= T.spill && t < T.cry) || (t >= T.swirl && t < T.fact) || (t >= T.dots && t < T.wall)
  function anchor(t, who) {
    if (t < T.cls) return who === 'moon' ? [230, 1000] : [560, 1100]
    if (insert(t)) return who === 'pis' ? [760, 560] : [320, 560]
    if (t >= T.wall) return who === 'pis' ? [700, 1050] : [380, 1050]
    if (t >= T.fact && t < T.dots && who === 'sat') return [540, 890]
    return who === 'sat' ? [860, 930] : who === 'pis' ? [830, 940] : [250, 940]
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      drawSeedConstellation(x, t, 100, { alpha: 0.4 })
      const cam = vlogCam(t, { cuts: CUTS, punches: PUNCH })
      x.save(); cam.apply(x)

      if (t < T.cls) {
        // ── AGE 1 · the nursery floor: the crayon row, the last one going in
        drawNursery(x, t, { glow: 0.8 })
        const b = drawBabyStar(x, 540, 1240, 300, t, { sign: 'virgo', age: 'baby', mood: t < T.click ? 'determined' : t < T.moon ? 'happy' : t < T.want ? 'sparkle' : 'determined', look: t < T.click ? [0.6, 1] : t < T.cap ? [-0.4, 0.2] : [-1, -0.5], hops: [T.click + 0.05, T.want + 0.2, T.cap], seed: 6 })
        crayonRow(x, t, { y: 1470, placeAt: T.click, hand: [b.x + 160, b.y + 40] })
        const mk = ease.outCubic(prog(t, T.moon, T.moon + 0.5))
        if (mk > 0) drawMoonNurse(x, lerp(-140, 210, mk), 1120, 105, t, { mood: t < T.cap ? 'wide' : 'happy', look: [1, 0.4] })
      } else if (insert(t)) {
        // ── the paper, close up
        const mode = t < T.pis ? 'grid' : t < T.cry ? 'spill' : t < T.fact ? 'swirl' : 'dots'
        paperInsert(x, t, { mode, gridAt: T.paper + 0.2, spillAt: T.spill, swirlAt: T.swirl, dotsAt: T.dots, signAt: T.sign })
      } else if (t < T.wall) {
        // ── AGE 6 · art class: Virgo's desk (left), Pisces's desk (right), Saturn at the board
        drawAcademy(x, t, { room: 'class' })
        boardText(x, t)
        drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: 'right', cell: 2 })
        const [vx] = ACADEMY.class.spots.desks[0], [px] = ACADEMY.class.spots.desks[2]
        const crying = t >= T.cry && t < T.swirl
        const vMood = t < T.pis ? 'happy' : t < T.roll ? 'neutral' : t < T.tip ? 'eyeroll' : t < T.cry ? 'wide' : crying ? 'cry' : t < T.huh ? 'wide' : 'sparkle'
        drawBabyStar(x, vx, 1080, 260, t, { sign: 'virgo', age: 'kid', mood: vMood, look: t < T.pis ? [0, 0.8] : [1, 0], hops: [T.cls + 0.5, T.roll + 0.25, T.tip + 0.6, T.huh + 0.1], seed: 6 })
        const pMood = t < T.tip ? 'sleepy' : t < T.swirl ? 'wide' : 'sparkle'
        drawBabyStar(x, px, 1080, 260, t, { sign: 'pisces', age: 'kid', mood: pMood, zzz: false, look: t < T.tip ? [0.4, -0.8] : [-1, 0], hops: [T.pis + 0.45, 27.3], seed: 12 })
        if (t < T.tip) thoughtFish(x, t, px + 40, 820)
        paintJar(x, t, { x: 690, y: 1200, tipAt: T.tip })
        if (t < T.fact) drawSaturn(x, 900, 900, 230, t, { mood: t < T.tip ? 'happy' : 'wide', look: [-1, 0.2], seed: 7, pointer: t < T.paper })
        else drawSaturn(x, lerp(900, 540, ease.outCubic(prog(t, T.fact, T.fact + 0.5))), 980, 260, t, { mood: 'happy', look: [-0.4, 0.6], seed: 7 })
      } else {
        // ── the hall: the painting on the wall, two paint-covered hands; then growUp
        drawAcademy(x, t, { room: 'hall', banner: false })
        painting(x, t, { x: 540, y: 620, s: 0.62, pinAt: T.wall + 0.2 })
        const hk = ease.outCubic(prog(t, T.wall + 0.3, T.wall + 0.8))
        const g = growUp(x, t, { sign: 'virgo', at: T.grow, x: lerp(320, 400, hk), y: 1150, size: 280, look: [1, -0.2], seed: 6, caption: ['AGE 6', 'TODAY'] })
        if (t < T.grow + 0.75) drawBabyStar(x, lerp(780, 690, hk), 1160, 240, t, { sign: 'pisces', age: 'kid', mood: 'happy', look: [-1, 0], seed: 12, hops: [T.wall + 0.7] })
        else drawStarChar(x, 700, 1150, 270, t, { color: PI.color, glyph: PI.glyph, mood: 'heart', look: [-1, 0], seed: 12 })
        if (t < T.grow + 0.6) handprints(x, t, 545, 1235, hk)
        if (t > T.wall + 1 && t < T.grow) for (let i = 0; i < 3; i++) { const p = ((t - T.wall) * 0.6 + i / 3) % 1; drawPixelStar(x, 545 + (i - 1) * 60, 990 - p * 160, 12, i % 2, '#ff8fb1', '#ffd0e0') }
      }
      x.restore()

      topScrim(t)
      for (const s of SAY) { const [ax, ay] = anchor(s.at + 0.01, s.who); speechBubble(x, t, { text: s.text, at: s.at, out: s.out, x: ax, y: ay, size: s.size ?? 46, name: s.who === 'moon' ? MOON_TAG : s.who === 'sat' ? SAT : s.who === 'pis' ? PIS : VIR, color: s.who === 'moon' ? '#f4ead8' : s.who === 'sat' ? '#e8c37a' : s.who === 'pis' ? PI.color : VI.color, side: s.who === 'moon' ? 0.3 : s.who === 'vir' && ax < 400 ? 0.4 : s.who === 'pis' || s.who === 'sat' ? -0.35 : 0 }) }
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

const CARD_CUTS = [{ t: T.swirl, kind: 'flip' }, { t: T.wall, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S10 E06' }), cardCuts(CARD_CUTS)]

const r3 = v => +v.toFixed(3)
const PITCH = { vir: 739.99, moon: 440, sat: 392, pis: 587.33 }
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ['pop', T.click, 1396.91, 0.05, 0.2], ['tick', T.click + 0.06, 0.03], ['bell', T.click + 0.1, 1864.66, 0.03, 1.4, 0.2],
  ...SAY.flatMap(s => speechCues(s.at, { pitch: PITCH[s.who] })),
  ...AGES.filter(a => a.at > 0).flatMap(a => ageCaptionCues(a.at)),
  ['pop', T.cap, 1174.66, 0.03, -0.3],
  ...Array.from({ length: 10 }, (_, i) => ['tick', r3(T.paper + 0.2 + i * 0.25), 0.018]),
  ['tick', T.ghost + 0.05, 0.015],
  ['whoosh', T.tip, 0.6, 0.05], ['pop', T.tip + 0.4, 220, 0.05, 0.2], ['boom', T.tip + 0.5, 0.2],
  ['riser', T.spill, T.spill + 1.4, 0.05],
  ['glitter', T.swirl, T.swirl + 1.6], ...factChipCues(FACT.at, FACT),
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.dots + 0.3 + i * 0.22), [1396.91, 1567.98, 1760, 2093][i % 4], 0.022, (i % 3 - 1) * 0.3]),
  ['bell', T.sign, 1174.66, 0.03, 1.6, 0], ['bell', T.wall + 0.25, 1567.98, 0.03, 1.8, 0], ['glitter', T.wall + 0.2, T.wall + 1.2],
  ...growUpCues(T.grow),
  ...[0, 0.12, 0.24, 0.36].map((d, i) => ['pop', r3(T.last + d), [587.33, 698.46, 880, 1174.66][i], 0.038, 0]), ['pluck', T.last + 0.36, 1174.66, 0.04, 0.9, 0],
  ...vlogCutCues(CUTS),
  ...cardCutCues(CARD_CUTS),
  ...endcardCues(STORY_END),
]
