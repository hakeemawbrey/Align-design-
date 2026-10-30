// guidegemini2 (15 s vertical Align ad, Star Talk "Your Star Guide", ♊ note 2 / 3: what you need) · story 0–10.6, then the end card.
//   0.00–2.40  "What you *need,* Gemini."  The ♊ guide, lantern lit, big and centred.
//   2.40–5.70  The guide drifts up. Below, tiny Gemini talks fast: a blur of pixel letters streams out of it; the other star
//              keeps up, catching every letter, nodding.  YOUR STAR: "someone who keeps up with your brain…"
//              Chip: ★ ASTROLOGY SAYS · GEMINI'S TWO BRIGHTEST STARS: CASTOR AND POLLUX.
//   5.70–8.60  The letters stop. Gemini sits down, quiet ("…"). The other star scoots over and sits beside it; a heart rises.
//              YOUR STAR: "and still likes you when you're quiet."
//   8.60–10.6  card flip · "Fun *and* deep. You get both."
// One canvas (sky + stars + letters), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, MONO, INTER,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const S = guideSign('gemini'), COL = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

const T = {
  wink: [1.0, 1.4], lift: 1.05, hookOut: [2.15, 2.45], rise: [2.2, 2.95], scene: 2.4,
  open: 2.62, l1: 2.8, blur: [2.7, 5.5], chip: 3.85,
  l2: 5.75, sit: 5.7, dots: 6.0, scoot: [6.5, 7.2], heart: 7.4,
  close: 8.6, h2: 8.72, h2Land: 9.05, out: [10.1, 10.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'someone who keeps up with your *brain*…', color: COL },
  { t: T.l2, speaker: SPEAK, text: "and still likes you when you're *quiet*.", color: '#ffe48a' },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }
const GLYPHS = 'ABC?!★WOW#&IDEA@HA!?ZAP'.split('')
const LCOL = ['#ffe48a', '#7fd4ff', '#ff8fb1', '#efe6d6', '#3ce6cf', '#ffb347']

const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 580, size: 280 }
const GROUND = 1260, GX = 300, THEM_X0 = 790, SM = 190, STAR_Y = GROUND - 110
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}
const themX = t => lerp(THEM_X0, GX + 200, ease.inOutCubic(prog(t, ...T.scoot)))

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 2, of: 3, top: 96, out: T.out })
  const HOOK = guideHook(root, { text: 'What you *need,* | Gemini.', accentColor: COL, top: 220, size: 112, out: T.hookOut })
  const H2 = popText(root, 'Fun *and* deep. | You get both.', { top: 1420, size: 116, accentSize: 164, at: T.h2, gap: 0.07, accentColor: COL, lineHeight: 1.02 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawScene(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.4)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    const g0 = x.createRadialGradient(540, GROUND, 30, 540, GROUND, 520)
    g0.addColorStop(0, 'rgba(255,220,120,0.18)'); g0.addColorStop(1, 'rgba(255,220,120,0)')
    x.fillStyle = g0; x.fillRect(0, GROUND - 520, 1080, 900)
    x.fillStyle = 'rgba(16,10,38,0.7)'; x.fillRect(120, GROUND + 70, 840, 12)
    x.restore()
    const k1 = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out), k2 = pop01(t, T.scene + 0.22, 0.4, 2.2) * popOut(t, T.out)
    const blurring = t > T.blur[0] && t < T.blur[1]
    const sitting = t > T.sit
    const gMood = blurring ? 'wide' : sitting ? (t > T.heart ? 'happy' : 'neutral') : 'happy'
    const jitter = blurring ? Math.sin(t * 60) * 4 : 0
    const fastHops = blurring ? Array.from({ length: 14 }, (_, i) => T.blur[0] + i * 0.2) : []
    drawStarChar(x, GX + jitter, STAR_Y, SM, t, { color: COL, glyph: S.glyph, mood: gMood, look: blurring ? [1, -1] : sitting ? [0, 1] : [1, 0], seed: 4, glow: 0.85, pop: k1, hops: fastHops, squash: sitting ? 0.14 * ease.outCubic(prog(t, T.sit, T.sit + 0.3)) : 0 })
    const tx = themX(t)
    const nod = blurring ? Array.from({ length: 10 }, (_, i) => T.blur[0] + 0.3 + i * 0.27) : []
    drawStarChar(x, tx, STAR_Y, SM, t, { color: THEM, mood: t > T.heart ? 'heart' : blurring ? 'sparkle' : 'happy', look: [-1, 0], seed: 9, glow: 0.7, pop: k2, hops: [...nod, T.scoot[1]], squash: t > T.scoot[1] ? 0.14 : 0 })
    // the letter blur: glyphs zip from Gemini to the other star along a wavy arc
    if (blurring) {
      x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
      for (let i = 0; i < 52; i++) {
        const born = T.blur[0] + i * 0.05
        const p = prog(t, born, born + 0.55)
        if (p <= 0 || p >= 1) continue
        const lx = lerp(GX + 70, THEM_X0 - 80, p), ly = STAR_Y - 60 - Math.sin(p * Math.PI) * (120 + (i % 4) * 60) + Math.sin(i * 2.1) * 30
        x.globalAlpha = a * Math.min(1, (1 - p) * 4, p * 6)
        x.font = `800 ${54 + (i % 3) * 14}px ${i % 4 === 3 ? MONO : INTER}`
        x.lineWidth = 7; x.strokeStyle = INK
        const g = GLYPHS[i % GLYPHS.length]
        x.strokeText(g, lx, ly); x.fillStyle = LCOL[i % LCOL.length]; x.fillText(g, lx, ly)
        // motion smear
        x.fillStyle = 'rgba(255,240,220,0.4)'; x.fillRect(Math.round(lx - 60), Math.round(ly - 3), 36, 6)
      }
      x.restore()
    }
    drawBurst(x, GX + 30, STAR_Y - 210, 80, t, T.blur[0] + 0.1, { word: 'SO—', color: '#ffe48a', size: 34, life: 0.6 })
    // the quiet "…" bubble
    if (t > T.dots && t < T.close) {
      const p = pop01(t, T.dots, 0.3, 2.4) * (1 - prog(t, T.close - 0.3, T.close))
      const cx = GX - 10, cy = STAR_Y - 190
      x.save(); x.globalAlpha = a * p; x.fillStyle = '#f5eedf'; x.strokeStyle = INK; x.lineWidth = 6
      x.beginPath(); x.roundRect(cx - 70, cy - 40, 140, 80, 26); x.fill(); x.stroke()
      x.fillStyle = INK
      for (let i = 0; i < 3; i++) { const on = Math.floor(t * 3) % 4 > i; if (on) x.fillRect(cx - 36 + i * 30, cy - 6, 14, 14) }
      x.restore()
    }
    if (t > T.heart && t < T.heart + 2.6) {
      const p = pop01(t, T.heart, 0.4, 3), q = 1 - prog(t, T.heart + 2, T.heart + 2.6)
      drawBits(x, HEART, HEART_C, (GX + tx) / 2 + 10, STAR_Y - 170 - (t - T.heart) * 30, 9 * p, { alpha: q * a })
    }
    sparkles(x, t, (GX + tx) / 2, STAR_Y - 30, T.scoot[1], 10, 150, 2, [GOLD, BONE, COL])
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const blurring = t > T.blur[0] && t < T.blur[1]
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : blurring ? 'wide' : t > T.heart ? 'sparkle' : 'neutral'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: COL, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : blurring ? [Math.sin(t * 6), 1] : [0, 1], hops: [T.lift, ...HOPS], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, COL])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawTheGuide(t)
      drawScene(t)
      factChip(x, t, { text: "GEMINI'S TWO BRIGHTEST|STARS: CASTOR AND POLLUX", at: T.chip, dur: 1.75, x: 540, y: 820, color: GOLD })
      CHIP.update(t); HOOK.update(t); box.update(t)
      H2.update(t, outK(t, T.out))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.close + 0.05, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const NOTES = [880, 987.77, 1174.66, 1318.51, 1567.98]
export const CUES = [
  ...guideCues(0.02, { gain: 0.03 }), ...guideCues(T.lift, { gain: 0.024 }), ['pluck', T.wink[0], 1318.51, 0.03, 0.5, 0.2],
  ['whoosh', T.rise[0], 0.4, 0.03], ['pop', T.scene + 0.1, 880, 0.035, -0.3], ['pop', T.scene + 0.22, 659.25, 0.035, 0.3],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ...Array.from({ length: 13 }, (_, i) => ['pop', +(T.blur[0] + 0.05 + i * 0.2).toFixed(3), NOTES[i % 5], 0.02, (i % 2 ? 0.4 : -0.4)]),
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ['tick', T.sit, 0.04], ['tick', T.dots, 0.025], ['whoosh', T.scoot[0], 0.4, 0.025], ['pop', T.heart, 1318.51, 0.04, 0], ['glitter', T.scoot[1], T.scoot[1] + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 6, 0.07, 1, 0.024),
  ...guideCues(T.h2 + 0.6, { gain: 0.018 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
