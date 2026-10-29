// askgemini (20 s vertical Align ad, Star Talk S1 extra "Ask the Stars") · story 0–15.6, then the shared end card.
//   0.00–3.00  DM: "I never know what to *say*."  A little magic-show stage (curtains, bow tie). The ♊ star holds a deck of
//              question cards fanned like a magician's, shuffles them hand to hand, and flicks one right at you.
//   3.00–6.30  ♊ GEMINI STAR: "ask what made them *laugh* this week."  Chip: ♊ mutable air · ruled by Mercury.
//   6.30–9.20  The DM slides away; the flicked card spins back in and lands face up: a talk card, "what made you laugh this
//              week?". GEMINI: "then actually *listen* to the answer."  It leans in; little sound waves come off the card.
//   9.20–12.0  GEMINI: "follow-up *questions* are the whole trick."  TA-DA: a big fan of "?" cards.
//   12.05–15.45 card flip · "Curious is *charming*."  The cards orbit the star in a ring; it sparkles.
// One canvas (sky + stage + star + cards), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, loadFonts, pop01, outK, popOut, popText, dmCard, noteChip, drawBits, drawTalkCard, drawBurst, sparkles, wordPops } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const GEM = signStar('gemini'), YEL = GEM.color
const SPEAK = '♊ GEMINI STAR'
const TEAL = '#5fd0ff'

// ── the timeline
const T = {
  shuffle: [1.0, 2.0], flick: 2.15, flickEnd: 2.6,
  open: 2.95, l1: 3.15, chip: 4.25,
  dmOut: [6.05, 6.3], back: [6.3, 6.85], l2: 6.5, lean: 7.0, waves: [7.2, 8.6],
  l3: 9.25, tada: 10.15, close: 12.2,
  h2: 12.32, h2Land: 12.7, ring: 12.5, h2Out: [15.2, 15.42], out: [15.08, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'ask what made them *laugh* this week.', color: YEL },
  { t: T.l2, speaker: SPEAK, text: 'then actually *listen* to the answer.', color: YEL },
  { t: T.l3, speaker: SPEAK, text: 'follow-up *questions* are the whole trick.', color: YEL },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const BOWTIE = ['RR...RR', 'RRRKRRR', 'RRKKKRR', 'RRRKRRR', 'RR...RR']
const HERO = { x: 540, y: 1050, size: 380 }
const HAND_R = { x: HERO.x + 255, y: HERO.y + 20 }, HAND_L = { x: HERO.x - 255, y: HERO.y + 20 }
const CW = 140, CH = CW * 1.42
const HOPS = [0.4, T.flick, ...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.3), T.tada, T.h2Land]

function gemState(t) {
  if (t < T.shuffle[0]) return { mood: 'wink' }
  if (t < T.flick) return { mood: 'neutral', look: [Math.sin(t * 9) > 0 ? 1 : -1, 0], blink: false }   // eyes follow the riffle
  if (t < T.flickEnd + 0.2) return { mood: 'happy' }
  if (t < T.lean) return { mood: 'happy' }
  if (t < T.waves[1]) return { mood: 'wide', look: [0, -1], blink: false }
  if (t < T.tada) return { mood: 'happy' }
  if (t < T.h2) return { mood: 'sparkle' }
  return { mood: 'sparkle' }
}

/** a card held at a pivot (the "hand"), fanned by angle a */
function fanCard(x, px, py, a, opts) {
  const d = CH * 0.42
  drawTalkCard(x, px + Math.sin(a) * d, py - Math.cos(a) * d, CW, { rot: a, ...opts })
}

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const DM = dmCard(root, { question: 'I never know what to *say*.', accent: YEL, top: 170 })
  const CHIP = noteChip(root, { text: '♊ MUTABLE AIR · RULED BY MERCURY', color: YEL, top: 1306, at: T.chip })
  const CAP = el('div', { position: 'absolute', left: 0, width: '1080px', top: '170px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none' }, root, 'TALK CARDS · ANSWERS STAY HIDDEN<br>UNTIL YOU BOTH PLAY')
  const H2 = popText(root, 'Curious is | *charming.*', { top: 200, size: 128, accentSize: 196, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: YEL, lineHeight: 0.98 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawStage(t) {
    const a = 1 - prog(t, T.out[0], T.out[1])
    x.save(); x.globalAlpha = a
    // a warm pool + stage boards
    const pool = x.createRadialGradient(540, HERO.y + 190, 10, 540, HERO.y + 190, 560)
    pool.addColorStop(0, 'rgba(255,220,150,0.2)'); pool.addColorStop(1, 'rgba(255,220,150,0)')
    x.fillStyle = pool; x.fillRect(0, HERO.y - 400, 1080, 800)
    x.fillStyle = 'rgba(120,70,40,0.55)'; x.fillRect(80, HERO.y + 180, 920, 22)
    x.fillStyle = 'rgba(245,214,160,0.35)'; x.fillRect(80, HERO.y + 180, 920, 4)
    // curtains (pixel folds) at both edges, with a scalloped valance up top
    for (const side of [0, 1]) {
      for (let i = 0; i < 6; i++) {
        const cx = side ? 1080 - 16 - i * 18 : i * 18, sway = Math.sin(t * 1.3 + i * 0.7) * 3
        x.fillStyle = i % 2 ? '#8e1f3a' : '#b52a4a'
        x.fillRect(Math.round(cx + sway), 0, 16, HERO.y + 202)
      }
    }
    x.restore()
  }

  function drawDeck(t, r) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const N = 5
    if (t < T.shuffle[0]) {
      // the opening fan in the right hand, gently breathing
      const spread = 0.28 + 0.04 * Math.sin(t * 4)
      for (let i = 0; i < N; i++) fanCard(x, HAND_R.x, HAND_R.y, (i - (N - 1) / 2) * spread, { flip: 1 })
      return
    }
    if (t < T.flick) {
      // riffle: cards arc hand to hand (deterministic per index)
      for (let i = 0; i < N; i++) {
        const per = 0.32, ph = ((t - T.shuffle[0]) / per + i * 0.4) % 2
        const goingLeft = ph < 1, k = ease.inOutCubic(ph % 1)
        const from = goingLeft ? HAND_R : HAND_L, to = goingLeft ? HAND_L : HAND_R
        const cx = lerp(from.x, to.x, k), cy = lerp(from.y, to.y, k) - Math.sin(Math.PI * k) * 200 - 60
        drawTalkCard(x, cx, cy, CW, { rot: (goingLeft ? -1 : 1) * Math.sin(Math.PI * k) * 0.8, flip: 1 })
      }
      return
    }
    // after the flick: a squared deck stays in the right hand (one card short)
    const tada = t > T.tada && t < T.close + 0.1
    if (!tada && t < T.h2) {
      for (let i = 0; i < 4; i++) drawTalkCard(x, HAND_R.x + i * 2, HAND_R.y - 70 - i * 3, CW, { rot: 0.12, flip: 1, alpha: ok })
    }
    if (tada) {
      // TA-DA: a big fan of "?" cards over the star
      const p = easeOutBack(prog(t, T.tada, T.tada + 0.45), 1.8), M = 5
      for (let i = 0; i < M; i++) {
        const a = (i - (M - 1) / 2) * 0.36 * p
        drawTalkCard(x, HERO.x + Math.sin(a) * 430, HERO.y - 300 - Math.cos(a) * 430 + 430 - 120 * p, CW * 1.05, { rot: a, kicker: '', text: '?', textScale: 3.2, color: i % 2 ? TEAL : YEL, alpha: clamp(p * 2) })
      }
      drawBurst(x, HERO.x + 330, HERO.y - 520, 105, t, T.tada + 0.15, { word: 'TA-DA', color: YEL, size: 44, life: 1.2 })
    }
    if (t >= T.ring) {
      // the ending: cards orbit the star
      const p = easeOutBack(prog(t, T.ring, T.ring + 0.6), 1.5), M = 6
      for (let i = 0; i < M; i++) {
        const a = t * 0.9 + i * Math.PI * 2 / M
        const cx = r.x + Math.cos(a) * 330 * p, cy = r.y - 20 + Math.sin(a) * 120 * p
        const front = Math.sin(a) > 0
        if (front) continue
        drawTalkCard(x, cx, cy, CW * 0.8, { rot: Math.cos(a) * 0.3, flip: 1, alpha: ok * clamp(p), scale: 0.85 })
      }
    }
  }
  function drawRingFront(t, r) {
    if (t < T.ring) return
    const ok = popOut(t, T.out), p = easeOutBack(prog(t, T.ring, T.ring + 0.6), 1.5), M = 6
    for (let i = 0; i < M; i++) {
      const a = t * 0.9 + i * Math.PI * 2 / M
      if (Math.sin(a) <= 0) continue
      drawTalkCard(x, r.x + Math.cos(a) * 330 * p, r.y - 20 + Math.sin(a) * 120 * p, CW * 0.8, { rot: Math.cos(a) * 0.3, kicker: '', text: '?', textScale: 3, color: i % 2 ? TEAL : YEL, alpha: ok * clamp(p), scale: 1.05 })
    }
  }

  function drawFlick(t) {
    // out: the card spins at the camera
    if (t >= T.flick && t < T.flickEnd) {
      const k = prog(t, T.flick, T.flickEnd), e = ease.inCubic(k)
      drawTalkCard(x, lerp(HAND_R.x, 600, e), lerp(HAND_R.y - 80, 1000, e), CW, { rot: k * 9, flip: 1, scale: lerp(1, 7, e), alpha: 1 - prog(k, 0.7, 1) })
    }
    // back: it spins in and lands at the top, face up
    const a = 1 - prog(t, T.tada - 0.25, T.tada - 0.05)
    if (t < T.back[0] || a <= 0) { CAP.style.display = 'none'; return }
    const p = prog(t, ...T.back), e = easeOutBack(p, 1.3)
    CAP.style.display = 'block'; CAP.style.opacity = String(clamp(p * 2) * a)
    drawTalkCard(x, lerp(1300, 540, ease.outCubic(p)), lerp(200, 520, e), 300, { rot: (1 - ease.outCubic(p)) * 7 - 0.04 + 0.02 * Math.sin(t * 2), flip: p < 0.6 ? 1 : 0, kicker: 'TALK CARD', text: 'what made you laugh this week?', foot: 'YOUR TURN', color: '#c9a21a', alpha: a })
    // listening waves from the card down to the star
    if (t > T.waves[0] && t < T.waves[1] + 0.4) {
      x.save(); x.strokeStyle = TEAL; x.lineWidth = 6
      for (let i = 0; i < 3; i++) {
        const ph = ((t - T.waves[0]) * 1.4 + i / 3) % 1
        x.globalAlpha = Math.sin(Math.PI * ph) * (1 - prog(t, T.waves[1], T.waves[1] + 0.4)) * 0.8
        x.beginPath(); x.arc(540, 700 + ph * 160, 60 + ph * 70, 0.25 * Math.PI, 0.75 * Math.PI); x.stroke()
      }
      x.restore()
    }
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return null
    const st = gemState(t)
    const lean = t > T.lean && t < T.waves[1] ? -0.08 : 0
    const r = drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: YEL, glyph: GEM.glyph, ...st, hops: HOPS, squash: lean, seed: 7, glow: 1.1, pop: ok })
    // a little magician's bow tie under the eyes
    const cell = Math.round(HERO.size / 36)
    drawBits(x, BOWTIE, { R: '#e8414f', K: '#9e1a33' }, r.x, HERO.y + cell * 10.6, cell * 1.1 * ok)
    sparkles(x, drawPixelStar, t, r.x, r.y, T.flick + 0.05, 10, 230, 1, [GOLD, BONE, TEAL])
    sparkles(x, drawPixelStar, t, r.x, r.y, T.h2Land, 12, 260, 2, [GOLD, BONE, YEL])
    return r
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      if (t < T.out[1] + 0.02) {
        drawStage(t)
        const r0 = { x: HERO.x, y: HERO.y }
        drawDeck(t, r0)
        const r = drawStar(t)
        if (r) drawRingFront(t, r)
      }
      drawFlick(t)
      DM.update(t, outK(t, T.dmOut))
      CHIP.update(t, outK(t, [T.close - 0.1, T.close + 0.1]))
      box.update(t)
      H2.update(t, outK(t, T.h2Out))
      drawGrain(gx, t)
    },
  }
}

// one card cut: the box shuts → "Curious is charming." End card flips at 15.6.
const CUTS = [{ t: 12.25, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const riffle = Array.from({ length: 10 }, (_, i) => ['tick', +(T.shuffle[0] + i * 0.1).toFixed(2), 0.025])
export const CUES = [
  // hook: the DM buzz, the fan, the riffle, the flick
  ['pop', 0.02, 987.77, 0.04, 0], ['tick', 0.1, 0.04], ['tick', 0.24, 0.035], ['tick', 0.38, 0.03],
  ['pluck', 0.4, 1318.51, 0.03, 0.4, 0.3], ...riffle,
  ['whoosh', T.flick, 0.45, 0.06], ['pop', T.flick, 1567.98, 0.04, 0.3], ['glitter', T.flick + 0.05, T.flick + 0.5],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.chip, 1174.66, 0.04, 0.5, 0],
  // the card comes back; listening
  ['whoosh', T.dmOut[0], 0.3, 0.03], ['whoosh', T.back[0], 0.5, 0.04], ['pop', T.back[1], 880, 0.04, 0],
  ['bell', T.waves[0], 1318.51, 0.02, 0.8, 0], ['bell', T.waves[0] + 0.7, 1567.98, 0.018, 0.8, 0],
  // ta-da
  ['whoosh', T.tada - 0.05, 0.3, 0.04], ['pluck', T.tada + 0.15, 1174.66, 0.045, 0.5, 0], ['pluck', T.tada + 0.27, 1567.98, 0.045, 0.6, 0], ['glitter', T.tada + 0.15, T.tada + 0.7],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0], ['glitter', T.h2Land, T.h2Land + 0.5],
  ['whoosh', T.ring, 0.6, 0.03], ['bell', T.ring + 1.2, 1760, 0.02, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
