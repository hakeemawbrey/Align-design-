// guidearies2 (15 s vertical Align ad, Star Talk "Your Star Guide", ♈ note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00–2.40  "What you *need,* Aries."  The ♈ guide, lantern lit, big and centred.
//   2.40–5.40  The guide drifts up; its lantern lights a little campfire below. Tiny Aries and a friend star sit by it.
//              YOUR STAR: "someone who loves your fire…"  Chip: ★ ASTROLOGY SAYS · THE FIRE SIGNS: ARIES, LEO, SAGITTARIUS.
//   5.40–8.50  A pixel hand-fan swoops in and fans it: FWOOSH, the fire flares into a red wildfire. The friend star pushes the
//              fan away; the flames settle back to a cozy glow and they toast a marshmallow.
//              YOUR STAR: "and doesn't fan every spark into a fight."
//   8.50–10.6  card flip · "Love the fire. Not the *fights*."  The campfire crackles, warm.
// One canvas (sky + campfire + stars + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const S = guideSign('aries'), RED = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

const T = {
  wink: [1.0, 1.4], lift: 1.05, hookOut: [2.15, 2.45], rise: [2.2, 2.95], scene: 2.4,
  open: 2.62, l1: 2.8, chip: 3.3,
  fan: 4.95, flare: [5.2, 6.7], l2: 5.26, shove: 6.5, settle: [6.7, 7.3], mallow: 7.3,
  close: 8.55, h2: 8.68, h2Land: 9.0, out: [10.1, 10.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'someone who loves your *fire*…', color: RED },
  { t: T.l2, speaker: SPEAK, text: "and doesn't fan every spark into a *fight*.", color: '#ff9a7a' },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const LOG = ['.BBBBBBBBBBBB.', 'BbBBBBBBBBBBbB', 'BBBBBBBBBBBBBB', '.BBBBBBBBBBBB.']
const LOG_C = { B: '#7a4a2a', b: '#c08a52' }
const FAN = ['....PPPP....', '..PPYPPYPP..', '.PYPPYPPYPP.', 'PPPYPPYPPYPP', '.....HH.....', '.....HH.....', '.....HH.....']
const FAN_C = { P: '#ff8fb1', Y: '#ffd34d', H: '#7a4a2a' }
const MALLOW = ['WW', 'WW']

const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 600, size: 280 }
const GROUND = 1260, FIRE_X = 540
const ARI_X = 300, THEM_X = 780, SM = 180, STAR_Y = GROUND - 100
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}
/** 0 = cozy campfire, 1 = wildfire */
const wild = t => ease.outCubic(prog(t, T.flare[0], T.flare[0] + 0.3)) * (1 - ease.inOutCubic(prog(t, ...T.settle)))

/** a procedural pixel flame on a cell grid; wildness makes it taller, wider, redder and jagged */
function drawFire(x, cx, base, t, w, a) {
  const C = 12, cols = Math.round(9 + w * 10), H = 150 + w * 330
  x.save(); x.globalAlpha = a
  // warm light on the ground
  const g = x.createRadialGradient(cx, base, 10, cx, base, 380 + w * 200)
  g.addColorStop(0, `rgba(255,${Math.round(190 - w * 90)},90,${0.32 + w * 0.2})`); g.addColorStop(1, 'rgba(255,150,60,0)')
  x.fillStyle = g; x.fillRect(cx - 600, base - 600, 1200, 900)
  for (let i = 0; i < cols; i++) {
    const u = (i + 0.5) / cols - 0.5
    const prof = Math.max(0, 1 - Math.abs(u) * 2.05) ** (0.9 - w * 0.3)
    const n = 0.72 + 0.18 * Math.sin(t * 9 + i * 1.7) + 0.1 * Math.sin(t * 15.3 + i * 3.1) + w * 0.25 * Math.sin(t * 21 + i * 5.3)
    const h = Math.round((H * prof * n) / C)
    for (let j = 0; j < h; j++) {
      const f = j / Math.max(1, h)
      const core = Math.abs(u) < 0.18 - w * 0.05 && f < 0.55
      x.fillStyle = core ? (w > 0.5 ? '#ffd34d' : '#fffbea') : f < 0.35 ? (w > 0.5 ? '#ff5a2a' : '#ffb347') : f < 0.7 ? (w > 0.5 ? '#e8323a' : '#ff7a3a') : (w > 0.5 ? '#a8203a' : '#e8414f')
      x.fillRect(Math.round(cx + u * cols * C - C / 2), base - (j + 1) * C, C, C)
    }
  }
  // embers
  for (let k = 0; k < 6 + w * 10; k++) {
    const ph = (t * (0.6 + w) + k * 0.173) % 1
    x.globalAlpha = a * (1 - ph)
    x.fillStyle = k % 2 ? '#ffd34d' : '#ff7a3a'
    x.fillRect(Math.round(cx + Math.sin(k * 2.3 + t * 2) * (40 + w * 120)), Math.round(base - 60 - ph * (220 + w * 360)), 8, 8)
  }
  x.restore()
  drawBits(x, LOG, LOG_C, cx - 30, base + 10, 9, { rot: 0.18, alpha: a })
  drawBits(x, LOG, LOG_C, cx + 30, base + 10, 9, { rot: -0.18, alpha: a })
}

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 2, of: 3, top: 96, out: T.out })
  const HOOK = guideHook(root, { text: 'What you *need,* | Aries.', accentColor: RED, top: 220, size: 112, out: T.hookOut })
  const H2 = popText(root, 'Love the fire. | Not the *fights.*', { top: 1430, size: 112, accentSize: 160, at: T.h2, gap: 0.07, late: 1, lateAt: T.h2Land, accentColor: RED, lineHeight: 1.02 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawScene(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.4)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    const w = wild(t)
    // the ground: a soft dark hill line
    x.save(); x.globalAlpha = a; x.fillStyle = 'rgba(16,10,38,0.75)'; x.fillRect(0, GROUND + 30, 1080, 14); x.restore()
    drawFire(x, FIRE_X, GROUND + 4, t, w, a)
    // the two stars: lean away when it roars, then settle back
    const k = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out)
    const lean = w * 60
    const ariMood = w > 0.3 ? 'wide' : t > T.mallow ? 'happy' : 'happy'
    drawStarChar(x, ARI_X - lean, STAR_Y, SM, t, { color: RED, glyph: S.glyph, mood: ariMood, look: w > 0.3 ? [1, -1] : [1, 0], squash: 0.14, seed: 4, glow: 0.8, pop: k })
    const k2 = pop01(t, T.scene + 0.22, 0.4, 2.2) * popOut(t, T.out)
    const shove = t > T.shove && t < T.shove + 0.6 ? Math.sin(prog(t, T.shove, T.shove + 0.6) * Math.PI) * -40 : 0
    drawStarChar(x, THEM_X + lean + shove, STAR_Y, SM, t, { color: THEM, mood: w > 0.3 ? 'squint' : t > T.mallow ? 'happy' : 'neutral', look: [-1, 0], squash: 0.14, seed: 9, glow: 0.7, pop: k2, hops: [T.shove] })
    // the marshmallow stick from the friend star into the cozy fire
    if (t > T.mallow) {
      const p = pop01(t, T.mallow, 0.4, 2)
      x.save(); x.globalAlpha = a; x.strokeStyle = '#c08a52'; x.lineWidth = 6
      const sx0 = THEM_X - 70, sy0 = STAR_Y + 10, ex = lerp(sx0, FIRE_X + 70, p), ey = lerp(sy0, GROUND - 120, p)
      x.beginPath(); x.moveTo(sx0, sy0); x.lineTo(ex, ey); x.stroke()
      const toast = prog(t, T.mallow + 0.6, T.close)
      x.fillStyle = toast > 0.5 ? '#e0a860' : '#fffbea'; x.fillRect(ex - 12, ey - 14, 24, 22)
      x.restore()
    }
    // the hand-fan: swoops in from the right, fans hard, gets shoved off
    if (t > T.fan && t < T.shove + 0.8) {
      const pin = ease.outCubic(prog(t, T.fan, T.fan + 0.3)), pout = ease.inCubic(prog(t, T.shove + 0.1, T.shove + 0.7))
      const fx = lerp(1200, FIRE_X + 230, pin) + pout * 700, fy = GROUND - 140 - pout * 300
      const flap = t > T.flare[0] ? Math.sin(t * 26) * 0.5 : 0
      drawBits(x, FAN, FAN_C, fx, fy, 11, { rot: -0.9 + flap + pout * 2 })
      if (t > T.flare[0] && t < T.shove) {
        x.save(); x.fillStyle = 'rgba(239,230,214,0.7)'
        for (let i = 0; i < 3; i++) { const ph = (t * 3 + i / 3) % 1; x.fillRect(Math.round(fx - 90 - ph * 120), Math.round(fy - 20 + i * 28), 50, 6) }
        x.restore()
      }
    }
    drawBurst(x, FIRE_X + 220, GROUND - 470, 120, t, T.flare[0] + 0.05, { word: 'FWOOSH!', color: '#ff7a3a', size: 40, life: 1.0 })
    drawBurst(x, THEM_X + 40, STAR_Y - 190, 90, t, T.shove, { word: 'NOPE.', color: '#ffd34d', size: 36, life: 0.8 })
    sparkles(x, t, FIRE_X, GROUND - 120, T.settle[1], 10, 150, 1, [GOLD, BONE, RED])
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const w = wild(t)
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : w > 0.3 ? 'wide' : t > T.settle[1] ? 'sparkle' : t < T.rise[0] ? 'happy' : 'neutral'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: RED, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : [0, 1], hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, RED])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawTheGuide(t)
      drawScene(t)
      factChip(x, t, { text: 'THE FIRE SIGNS: ARIES,|LEO, SAGITTARIUS', at: T.chip, dur: 1.75, x: 540, y: 880, color: GOLD })
      CHIP.update(t); HOOK.update(t); box.update(t)
      H2.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.close + 0.05, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  ...guideCues(0.02, { gain: 0.03 }), ...guideCues(T.lift, { gain: 0.024 }), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.rise[0], 0.4, 0.03], ['pop', T.scene + 0.1, 880, 0.035, -0.3], ['pop', T.scene + 0.22, 659.25, 0.035, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ['whoosh', T.fan, 0.3, 0.035], ['boom', T.flare[0], 0.18], ['whoosh', T.flare[0], 0.6, 0.05], ['riser', T.flare[0], T.shove, 0.02],
  ['pop', T.shove, 523.25, 0.045, 0.3], ['whoosh', T.shove + 0.1, 0.4, 0.035], ['glitter', T.settle[1], T.settle[1] + 0.4], ['pluck', T.mallow, 880, 0.03, 0.5, 0.2],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 5, 0.07, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...guideCues(T.h2Land + 0.3, { gain: 0.018 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
