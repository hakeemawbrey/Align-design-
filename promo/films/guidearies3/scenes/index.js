// guidearies3 (20 s vertical Align ad, Star Talk "Your Star Guide", ♈ note 3 / 3: try this week) · story 0–15.6, then the end card.
//   0.00–2.80  "Try this week, *Aries.*"  The ♈ guide, lantern lit, big and centred.
//   2.80–6.90  The guide drifts up. Below, tiny Aries asks a question ("?") and the other star starts answering (a long,
//              wiggly speech bubble).  YOUR STAR: "ask one question. then wait for all of it."
//              Chip: ★ ASTROLOGY SAYS · ARIES: NATURAL RULER OF THE 1ST HOUSE (SELF).
//   6.90–10.6  The guide holds up a pixel stopwatch and counts on its points (each tip lights 1…5).
//              YOUR STAR: "no interrupting. we'll be counting."  Aries tries a "BUT—", the stopwatch BEEPs, Aries zips it
//              and leans in. The answer ends with a heart.
//   10.6–15.6  card flip · "Listen like you *mean* it."  The fifth tip lights; sparkles. Aries nods, all ears.
// One canvas (sky + stars + bubbles + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { popText } from '../../lesson.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { guideSign, guideSpeaker, drawGuide, noteChip, guideHook, factChip, guideCues, loadGuideFonts, GOLD, BONE, INK, INTER,
  pop01, outK, popOut, drawBits, drawBurst, sparkles, wordPops } from '../../stguide.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const S = guideSign('aries'), RED = S.color
const SPEAK = guideSpeaker(S.glyph)
const THEM = '#b7a6f2'

const T = {
  wink: [1.2, 1.6], lift: 1.25, hookOut: [2.55, 2.85], rise: [2.6, 3.4], scene: 2.9,
  open: 3.25, l1: 3.45, ask: 3.9, answer: 4.6, chip: 5.3,
  watch: 6.75, l2: 7.15, count: [7.4, 8.4, 9.4, 10.4, 11.9], but: 8.7, beep: 8.95, zip: 9.2, heart: 10.1,
  close: 10.65, h2: 10.8, h2Land: 11.2, done: 11.9, out: [15.0, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'ask one question. then wait for *all* of it.', color: RED },
  { t: T.l2, speaker: SPEAK, text: "no interrupting. we'll be *counting*.", color: '#ff9a7a' },
]
const CPS = 28
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const WATCH = ['...KK...', '..GGGG..', '.GWWWWG.', 'GWWWKWWG', 'GWWWKWWG', 'GWWKKWWG', 'GWWWWWWG', '.GWWWWG.', '..GGGG..']
const WATCH_C = { K: '#1b1236', G: GOLD, W: '#fffbea' }
const HEART = ['.PP.PP.', 'PPPPPPP', 'PPPPPPP', '.PPPPP.', '..PPP..', '...P...']
const HEART_C = { P: '#ff5c8e' }

const HERO = { x: 540, y: 880, size: 350 }
const UP = { x: 540, y: 600, size: 290 }
const GROUND = 1250, ARI_X = 330, THEM_X = 760, SM = 190, STAR_Y = GROUND - 110
// the five tips (cells from the 36-cell sprite centre), counted top → clockwise
const TIPS = [[0, -11.6], [12.2, -2.2], [12.4, 12.2], [-7.4, 11.6], [-12.2, -2.2]]
const HOPS = talkHops(LINES, SPEAK, { cps: CPS })

function guidePos(t) {
  const p = ease.inOutCubic(prog(t, ...T.rise))
  return { x: HERO.x, y: lerp(HERO.y, UP.y, p), size: lerp(HERO.size, UP.size, p) }
}

async function build(stage) {
  await loadGuideFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const CHIP = noteChip(root, { sign: S.name, glyph: S.glyph, n: 3, of: 3, top: 96, out: T.out })
  const HOOK = guideHook(root, { text: 'Try this week, | *Aries.*', accentColor: RED, top: 220, size: 112, accentSize: 150, out: T.hookOut })
  const H2 = popText(root, 'Listen like | you *mean* it.', { top: 1430, size: 118, accentSize: 168, at: T.h2, gap: 0.08, late: 2, lateAt: T.h2Land, lateGap: 0.14, accentColor: RED, lineHeight: 1.0 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  /** a canvas speech bubble with a tail toward (tx, ty) */
  function bubble(cx, cy, w, h, tx, ty, a, fillC = '#f5eedf') {
    x.save(); x.globalAlpha *= a; x.fillStyle = fillC; x.strokeStyle = INK; x.lineWidth = 6
    x.beginPath(); x.roundRect(cx - w / 2, cy - h / 2, w, h, 26); x.fill(); x.stroke()
    x.beginPath(); x.moveTo(cx - 18, cy + h / 2 - 3); x.lineTo(tx, ty); x.lineTo(cx + 18, cy + h / 2 - 3); x.closePath(); x.fill()
    x.beginPath(); x.moveTo(cx - 18, cy + h / 2); x.lineTo(tx, ty); x.lineTo(cx + 18, cy + h / 2); x.stroke()
    x.restore()
  }

  function drawScene(t) {
    const a = clamp(prog(t, T.scene, T.scene + 0.4)) * (1 - prog(t, T.out[0], T.out[1]))
    if (a <= 0) return
    // a little lantern-lit floor
    x.save(); x.globalAlpha = a
    const g0 = x.createRadialGradient(540, GROUND, 30, 540, GROUND, 520)
    g0.addColorStop(0, 'rgba(255,200,110,0.2)'); g0.addColorStop(1, 'rgba(255,200,110,0)')
    x.fillStyle = g0; x.fillRect(0, GROUND - 520, 1080, 900)
    x.fillStyle = 'rgba(16,10,38,0.7)'; x.fillRect(120, GROUND + 70, 840, 12)
    x.restore()
    const k1 = pop01(t, T.scene + 0.1, 0.4, 2.2) * popOut(t, T.out), k2 = pop01(t, T.scene + 0.22, 0.4, 2.2) * popOut(t, T.out)
    const listening = t > T.zip
    const lean = listening ? 30 * ease.outCubic(prog(t, T.zip, T.zip + 0.4)) : 0
    const nod = listening ? 0.05 * Math.max(0, Math.sin((t - T.zip) * 5)) : 0
    const ariMood = t > T.but && t < T.beep ? 'wide' : t > T.beep && t < T.zip + 0.3 ? 'squint' : t > T.heart ? 'heart' : listening ? 'sparkle' : 'neutral'
    drawStarChar(x, ARI_X + lean, STAR_Y, SM, t, { color: RED, glyph: S.glyph, mood: ariMood, look: [1, 0], seed: 4, glow: 0.85, pop: k1, squash: nod, hops: [T.ask, T.but] })
    const talking = t > T.answer && t < T.heart
    drawStarChar(x, THEM_X, STAR_Y, SM, t, { color: THEM, mood: t > T.heart ? 'happy' : 'neutral', look: [-1, 0], seed: 9, glow: 0.7, pop: k2, hops: talking ? [4.8, 5.3, 5.8, 6.4, 7.0, 7.6, 8.3, 9.0, 9.6] : [] })
    // Aries's zipped mouth: a tiny pixel zipper across its face once it decides to listen
    if (t > T.zip && t < T.heart) {
      x.save(); x.globalAlpha = a; x.fillStyle = '#aab3c8'
      const zx = ARI_X + lean - 22, zy = STAR_Y + 30
      for (let i = 0; i < 6; i++) x.fillRect(zx + i * 8, zy + (i % 2) * 3, 6, 4)
      x.fillRect(zx + 48, zy - 4, 6, 12)
      x.restore()
    }
    // the question
    if (t > T.ask && t < T.answer + 0.6) {
      const p = pop01(t, T.ask, 0.3, 2.6) * (1 - prog(t, T.answer + 0.3, T.answer + 0.6))
      bubble(ARI_X + 40, STAR_Y - 190, 110, 100, ARI_X + 10, STAR_Y - 110, p)
      x.save(); x.globalAlpha = p; x.fillStyle = INK; x.font = `800 70px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('?', ARI_X + 40, STAR_Y - 186); x.restore()
    }
    // the answer: a bubble whose wiggly lines keep growing (it's a long, real answer)
    if (t > T.answer && t < T.heart + 1.6) {
      const p = pop01(t, T.answer, 0.35, 2.2) * (1 - prog(t, T.heart + 1.2, T.heart + 1.6))
      const bw = 420, bh = 190, cx = THEM_X - 110, cy = STAR_Y - 250
      bubble(cx, cy, bw, bh, THEM_X - 30, STAR_Y - 110, p)
      x.save(); x.globalAlpha = p; x.fillStyle = '#7a6aa8'
      const fillUp = prog(t, T.answer + 0.2, T.heart)
      for (let row = 0; row < 3; row++) {
        const rp = clamp(fillUp * 3 - row)
        if (rp <= 0) continue
        const len = (bw - 80) * rp
        for (let s = 0; s < len; s += 12) x.fillRect(Math.round(cx - bw / 2 + 40 + s), Math.round(cy - 50 + row * 46 + Math.sin(s * 0.09 + row) * 7), 10, 8)
      }
      x.restore()
      if (t > T.heart) drawBits(x, HEART, HEART_C, cx + bw / 2 - 50, cy + 52, 7 * pop01(t, T.heart, 0.4, 3), { alpha: p })
    }
    // "BUT—" (interrupt attempt), crossed out by the beep
    if (t > T.but && t < T.zip + 0.3) {
      const p = pop01(t, T.but, 0.25, 3) * (1 - prog(t, T.zip, T.zip + 0.3))
      bubble(ARI_X - 10, STAR_Y - 200, 200, 96, ARI_X + 10, STAR_Y - 110, p)
      x.save(); x.globalAlpha = p; x.fillStyle = INK; x.font = `800 52px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('BUT—', ARI_X - 10, STAR_Y - 196)
      if (t > T.beep) { x.strokeStyle = '#e8414f'; x.lineWidth = 9; x.beginPath(); x.moveTo(ARI_X - 80, STAR_Y - 196); x.lineTo(lerp(ARI_X - 80, ARI_X + 60, prog(t, T.beep, T.beep + 0.15)), STAR_Y - 196); x.stroke() }
      x.restore()
    }
    sparkles(x, t, THEM_X - 30, STAR_Y - 260, T.heart, 8, 120, 2, [GOLD, BONE, '#ff8fb1'])
  }

  function drawTheGuide(t) {
    const g = guidePos(t), k = popOut(t, T.out)
    if (k <= 0) return
    const mood = t > T.wink[0] && t < T.wink[1] ? 'wink' : t < T.rise[0] ? 'happy' : t > T.beep && t < T.beep + 0.5 ? 'squint' : t > T.done ? 'sparkle' : t > T.l2 ? 'happy' : 'neutral'
    const raise = t > T.lift ? Math.exp(-(t - T.lift) * 4) : 0
    const r = drawGuide(x, g.x, g.y, g.size, t, { color: RED, glyph: S.glyph, mood, look: t < T.rise[1] ? [0, 0] : [0, 1], hops: [T.lift, ...HOPS, T.done], seed: 2, glow: 1.1, pop: k }, { lantern: 1 + 0.25 * raise, glow: 1.2 + raise, side: -1 })
    sparkles(x, t, r.lx, r.ly, T.lift, 8, 90, 1, [GOLD, BONE, RED])
    // the stopwatch in its right tip
    const cell = g.size / 36
    if (t > T.watch) {
      const p = pop01(t, T.watch, 0.35, 2.6) * k
      const shake = t > T.beep && t < T.beep + 0.4 ? Math.sin((t - T.beep) * 60) * 0.2 : 0
      drawBits(x, WATCH, WATCH_C, r.x + 17.5 * cell, r.y - 6 * cell, 10 * p, { rot: 0.2 + shake })
      drawBurst(x, r.x + 20 * cell, r.y - 15 * cell, 70, t, T.beep, { word: 'BEEP', color: '#ffd34d', size: 28, life: 0.6 })
    }
    // counting on its points: each tip lights with its number
    T.count.forEach((tc, i) => {
      if (t < tc) return
      const p = pop01(t, tc, 0.3, 3) * k
      const [u, v] = TIPS[i], px = r.x + u * cell, py = r.y + v * cell
      x.save()
      const gl = x.createRadialGradient(px, py, 0, px, py, 46)
      gl.addColorStop(0, `rgba(255,236,160,${0.8 * p})`); gl.addColorStop(1, 'rgba(255,236,160,0)')
      x.fillStyle = gl; x.fillRect(px - 46, py - 46, 92, 92)
      x.globalAlpha = p; x.fillStyle = INK; x.font = `800 ${Math.round(42 * p)}px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText(String(i + 1), px, py + 2)
      x.restore()
    })
    sparkles(x, t, r.x, r.y, T.done, 12, g.size * 0.75, 1, [GOLD, BONE, RED])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.75 })
      drawScene(t)
      drawTheGuide(t)
      factChip(x, t, { text: 'ARIES: NATURAL RULER OF|THE 1ST HOUSE (SELF)', at: T.chip, dur: 1.9, x: 540, y: 1350, color: GOLD })
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
  ['pop', T.ask, 1174.66, 0.04, -0.3], ['pop', T.answer, 659.25, 0.035, 0.3],
  ...guideCues(T.chip, { gain: 0.02, notes: [1174.66, 1318.51, 1567.98] }),
  ['whoosh', T.watch, 0.3, 0.03], ['pop', T.watch + 0.2, 1567.98, 0.035, 0.3],
  ...T.count.map((tc, i) => ['pluck', tc, [587.33, 659.25, 739.99, 880, 1174.66][i], 0.035, 0.5, 0.1]),
  ...T.count.map(tc => ['tick', tc + 0.5, 0.025]),
  ['pop', T.but, 523.25, 0.045, -0.3], ['pop', T.beep, 1975.53, 0.05, 0.3], ['pop', T.beep + 0.12, 1975.53, 0.045, 0.3], ['tick', T.zip, 0.04],
  ['pop', T.heart, 1318.51, 0.04, 0.2], ['glitter', T.heart, T.heart + 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 3, 0.08, 1, 0.026), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ...guideCues(T.done + 0.05, { gain: 0.022 }),
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
