// asktaurus (20 s vertical Align ad, Star Talk S1 extra "Ask the Stars") · story 0–15.6, then the shared end card.
//   0.00–3.00  DM: "What's a good *first* date?"  The ♉ star in a little apron, swinging a picnic basket. A gingham blanket
//              unrolls along the ground and a tiny candle lights itself.
//   3.00–6.30  ♉ TAURUS STAR: "somewhere you can actually hear each other."  Chip: ♉ fixed earth · ruled by Venus.
//   6.30–9.20  The DM slides away; tonight's deck deals one card and it flips: "what's your comfort food?"
//              TAURUS: "food helps. so does sitting down."  It plops down on the blanket.
//   9.20–11.9  A loud speaker pops in, blasting notes; Taurus squints. TAURUS: "loud bars are for third dates." The speaker poofs.
//   11.95–15.45 card flip · "Cozy beats *fancy*."  A tiny pie comes out of the basket; heart-eyes by candlelight.
// One canvas (sky + blanket + star + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, loadFonts, pop01, outK, popOut, popText, dmCard, noteChip, drawBits, drawTalkCard, sparkles, wordPops } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const TAU_ = signStar('taurus'), GREEN = TAU_.color
const SPEAK = '♉ TAURUS STAR'

// ── the timeline
const T = {
  unroll: [1.0, 1.9], candle: 2.25,
  open: 2.95, l1: 3.15, chip: 4.25,
  dmOut: [6.05, 6.3], deal: 6.3, flip: [6.95, 7.35], l2: 6.58, sit: 7.6,
  spk: 9.0, l3: 9.45, poof: 11.0, close: 11.97,
  h2: 12.08, h2Land: 12.46, pie: 13.1, heart: 13.5, h2Out: [15.2, 15.42], out: [15.08, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'somewhere you can actually *hear* each other.', color: GREEN },
  { t: T.l2, speaker: SPEAK, text: 'food helps. so does *sitting down.*', color: GREEN },
  { t: T.l3, speaker: SPEAK, text: 'loud bars are for *third* dates.', color: GREEN },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

// ── pixel props
const APRON = ['..s......s..', '..AAAAAAAA..', 'TTAAAAAAAATT', '.TAAAAAAAAT.', '..AAPPPPAA..', '..APAAAAPA..', '..APPPPPPA..', '..AAAAAAAA..', '...AAAAAA...']
const APRON_C = { s: '#f5eedf', A: '#f5eedf', P: '#ff8fb1', T: '#ff8fb1' }
const BASKET = ['...HHHHHH...', '..H......H..', '.H........H.', 'RWRWRWRWRWRW', 'BBBBBBBBBBBB', 'BbBbBbBbBbBb', 'BBBBBBBBBBBB', 'bBbBbBbBbBbB', '.BBBBBBBBBB.']
const BASKET_C = { H: '#7a4a24', R: '#e8414f', W: '#f5eedf', B: '#d9a25a', b: '#a8743a' }
const CANDLE = ['.WW.', '.WW.', '.WW.', 'gggg']
const SPEAKER = ['DDDDDDD', 'DgggggD', 'DgDDDgD', 'DgDGDgD', 'DgDDDgD', 'DgggggD', 'DgDDDgD', 'DgDGDgD', 'DgDDDgD', 'DDDDDDD']
const SPEAKER_C = { D: '#2b2440', g: '#55507a', G: '#ff3d8b' }
const NOTEB = ['..NN', '..N.', '..N.', 'NNN.', 'NN..']
const PIE = ['...ssss...', '.ssSsSss..', 'ssSsssSsss', 'CCCCCCCCCC', '.CCCCCCCC.']
const PIE_C = { s: '#e0a85a', S: '#b8722e', C: '#f5eedf' }

const HERO = { x: 560, y: 1050, size: 380 }
const GROUND = HERO.y + 182
const SIT = 46
const sitK = t => ease.outBack ? clamp(easeOutBack(prog(t, T.sit, T.sit + 0.35), 2)) : prog(t, T.sit, T.sit + 0.35)
const HOPS = [0.35, ...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.3 && (h < T.sit - 0.1 || h > T.sit + 0.6)), T.h2Land, T.pie + 0.1]

function taurusState(t) {
  if (t < T.unroll[0]) return { mood: 'happy' }
  if (t < T.candle + 0.4) return { mood: 'neutral', look: [-1, 1], blink: false }      // watches the blanket + candle
  if (t < T.l1) return { mood: 'sparkle' }
  if (t < T.l2) return { mood: 'happy' }
  if (t < T.sit + 0.5) return { mood: 'neutral', look: [0, 0] }
  if (t < T.spk + 0.2) return { mood: 'happy' }
  if (t < T.poof) return { mood: 'squint', look: [-1, 0], blink: false }
  if (t < T.heart) return { mood: 'happy' }
  return { mood: 'heart' }
}

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const DM = dmCard(root, { question: "What's a good *first* date?", accent: GREEN, top: 170 })
  const CHIP = noteChip(root, { text: '♉ FIXED EARTH · RULED BY VENUS', color: GREEN, top: 1306, at: T.chip })
  const CAP = el('div', { position: 'absolute', left: 0, width: '1080px', top: '170px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none' }, root, "TONIGHT'S DECK · A NEW HAND<br>DEALT EVERY NIGHT")
  const H2 = popText(root, 'Cozy beats | *fancy.*', { top: 200, size: 128, accentSize: 200, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: GREEN, lineHeight: 0.98 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawBlanket(t) {
    const p = ease.outCubic(prog(t, ...T.unroll)), a = 1 - prog(t, T.out[0], T.out[1])
    if (p <= 0 || a <= 0) return
    const x0 = 150, full = 780, w = full * p, top = GROUND - 30, h = 92, skew = 60, cell = 23
    x.save(); x.globalAlpha = a
    // a glow pool on the ground
    const pool = x.createRadialGradient(540, GROUND + 10, 10, 540, GROUND + 10, 520)
    pool.addColorStop(0, 'rgba(255,200,140,0.18)'); pool.addColorStop(1, 'rgba(255,200,140,0)')
    x.fillStyle = pool; x.fillRect(0, GROUND - 300, 1080, 500)
    // the gingham (a sheared grid of cells)
    x.beginPath(); x.moveTo(x0 + skew, top); x.lineTo(x0 + skew + w, top); x.lineTo(x0 + w, top + h); x.lineTo(x0, top + h); x.closePath(); x.save(); x.clip()
    const rows = Math.ceil(h / cell)
    for (let j = 0; j < rows; j++) for (let i = 0; i < Math.ceil((full + skew) / cell) + 2; i++) {
      const yy = top + j * cell, xx = x0 + i * cell + skew * (1 - j / rows) - cell
      const c = (i % 2) + (j % 2)
      x.fillStyle = c === 0 ? '#f5eedf' : c === 1 ? '#f08a8a' : '#d8444f'
      x.fillRect(Math.round(xx), Math.round(yy), cell + 1, cell + 1)
    }
    x.restore()
    x.strokeStyle = INK; x.lineWidth = 5; x.stroke()
    // the roll at the leading edge while unrolling
    if (p < 1) {
      const rx = x0 + w + skew / 2, rr = 30 * (1 - p) + 12
      x.fillStyle = '#d8444f'; x.beginPath(); x.ellipse(rx, top + h / 2, rr * 0.8, h / 2 + 6, -0.4, 0, Math.PI * 2); x.fill()
      x.strokeStyle = INK; x.stroke()
    }
    x.restore()
  }

  function drawCandle(t, cx, cy) {
    const p = pop01(t, T.unroll[1] - 0.1, 0.3, 2.2) * (1 - prog(t, T.out[0], T.out[1]))
    if (p <= 0.01) return
    const cell = 9 * p
    drawBits(x, CANDLE, { W: '#fff3dc', g: '#c9a24a' }, cx, cy, cell)
    if (t < T.candle) return
    const lit = easeOutBack(prog(t, T.candle, T.candle + 0.25), 3)
    const fl = 1 + 0.15 * Math.sin(t * 23) + 0.1 * Math.sin(t * 37)
    const g = x.createRadialGradient(cx, cy - 50, 0, cx, cy - 50, 170 * lit * fl)
    g.addColorStop(0, 'rgba(255,214,140,0.5)'); g.addColorStop(1, 'rgba(255,170,90,0)')
    x.save(); x.globalCompositeOperation = 'lighter'; x.fillStyle = g; x.fillRect(cx - 200, cy - 230, 400, 400); x.restore()
    const fy = cy - 2.5 * cell - 14 * lit
    x.fillStyle = '#ff9a3c'; x.fillRect(Math.round(cx - cell * 0.75), Math.round(fy - cell * 1.6 * lit * fl), Math.round(cell * 1.5), Math.round(cell * 2.2 * lit))
    x.fillStyle = '#fff1a8'; x.fillRect(Math.round(cx - cell * 0.35), Math.round(fy - cell * 0.6 * lit), Math.round(cell * 0.7), Math.round(cell * 1.1 * lit))
  }

  function drawSpeaker(t) {
    const p = pop01(t, T.spk, 0.3, 2.4), poof = prog(t, T.poof, T.poof + 0.16)
    if (p <= 0.01 || poof >= 1) return
    const thump = Math.abs(Math.sin((t - T.spk) * 14))
    const cx = 210, cy = 880
    drawBits(x, SPEAKER, SPEAKER_C, cx + Math.sin(t * 50) * 3, cy, 18 * p * (1 + 0.06 * thump) * (1 - poof))
    // notes flying out at Taurus
    for (let i = 0; i < 6; i++) {
      const ph = ((t - T.spk) * 1.3 + i / 6) % 1
      if (t - T.spk < i * 0.12) continue
      drawBits(x, NOTEB, { N: i % 2 ? '#ff3d8b' : '#5fd0ff' }, cx + 80 + ph * 220, cy - 60 + Math.sin(ph * 9 + i) * 50 - ph * 40, 7, { alpha: Math.sin(Math.PI * ph) * (1 - poof) })
    }
    // "LOUD" sign above
    x.save(); x.globalAlpha = p * (1 - poof) * (0.75 + 0.25 * thump); x.fillStyle = '#ff3d8b'; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.shadowColor = '#ff3d8b'; x.shadowBlur = 18
    x.fillText('LOUD BAR', cx, cy - 130); x.restore()
    if (t > T.poof) sparkles(x, drawPixelStar, t, cx, cy, T.poof, 8, 80, 3, [BONE, GOLD])
  }

  function drawDeck(t) {
    const a = 1 - prog(t, T.close - 0.1, T.close + 0.1)
    if (t < T.deal || a <= 0) { CAP.style.display = 'none'; return }
    const p = easeOutBack(prog(t, T.deal, T.deal + 0.45), 1.5)
    CAP.style.display = 'block'; CAP.style.opacity = String(clamp(p * 2) * a)
    const f = 1 - ease.inOutCubic(prog(t, ...T.flip))
    drawTalkCard(x, 540, lerp(-300, 520, p), 300, { rot: lerp(0.6, -0.04, p) + 0.02 * Math.sin(t * 2), flip: f, kicker: 'TALK CARD', text: "what's your comfort food?", foot: 'DEALT TONIGHT', color: GREEN, alpha: a })
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = taurusState(t)
    const sk = sitK(t)
    const sy = HERO.y + SIT * sk
    const swing = t < T.unroll[0] + 0.3 ? Math.sin(t * 7) : 0
    const r = drawStarChar(x, HERO.x, sy, HERO.size, t, { color: GREEN, glyph: TAU_.glyph, ...st, hops: HOPS, squash: 0.1 * sk + (st.mood === 'squint' ? 0.04 : 0), seed: 6, glow: 1.1, pop: ok })
    // the apron over the lower body
    const cell = Math.round(HERO.size / 36)
    drawBits(x, APRON, APRON_C, r.x, sy + cell * 10.2, cell * 1.5 * ok, { outline: 'rgba(27,18,54,0.8)' })
    // the basket at its side (swinging at first, set down when it sits)
    const bx = HERO.x + 250, by = lerp(sy + 30, GROUND - 30, clamp(prog(t, T.unroll[0], T.unroll[0] + 0.4)))
    drawBits(x, BASKET, BASKET_C, bx, by, 10 * ok, { rot: swing * 0.25 })
    sparkles(x, drawPixelStar, t, r.x, r.y, T.candle + 0.3, 10, 230, 1, [GOLD, BONE, GREEN])
    // the pie comes out of the basket
    const pp = pop01(t, T.pie, 0.4, 2.2) * ok
    if (pp > 0.01) {
      const k = ease.outCubic(prog(t, T.pie, T.pie + 0.4))
      drawBits(x, PIE, PIE_C, lerp(bx, HERO.x - 230, k), lerp(by - 60, GROUND - 10, k) - Math.sin(Math.PI * k) * 120, 13 * pp)
    }
    if (t > T.heart) for (let i = 0; i < 5; i++) {
      const born = T.heart + i * 0.25, p = (t - born) / 1.2
      if (p < 0 || p >= 1) continue
      drawBits(x, ['.H.H.', 'HHHHH', 'HHHHH', '.HHH.', '..H..'], { H: '#ff4f86' }, r.x + (i % 2 ? 1 : -1) * (80 + i * 20), r.y - 120 - p * 220, 7, { alpha: Math.sin(Math.PI * p) * ok })
    }
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      if (t < T.out[1] + 0.02) {
        drawBlanket(t)
        drawCandle(t, 260, GROUND + 4)
        drawSpeaker(t)
        drawStar(t)
      }
      drawDeck(t)
      DM.update(t, outK(t, T.dmOut))
      CHIP.update(t, outK(t, [T.close - 0.1, T.close + 0.1]))
      box.update(t)
      H2.update(t, outK(t, T.h2Out))
      drawGrain(gx, t)
    },
  }
}

// one card cut: the box shuts → "Cozy beats fancy." End card flips at 15.6.
const CUTS = [{ t: 12.02, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  // hook: the DM buzz, basket swings, the blanket unrolls, the candle lights
  ['pop', 0.02, 880, 0.04, 0], ['tick', 0.1, 0.04], ['tick', 0.24, 0.035], ['tick', 0.38, 0.03],
  ['tick', 0.35, 0.025], ['tick', 0.8, 0.025],
  ['whoosh', T.unroll[0], 0.9, 0.04], ['tick', T.unroll[1], 0.03], ['pop', T.unroll[1] - 0.05, 659.25, 0.03, -0.4],
  ['pluck', T.candle, 1174.66, 0.04, 0.6, -0.4], ['bell', T.candle + 0.05, 1760, 0.02, 1.2, -0.4], ['glitter', T.candle + 0.3, T.candle + 0.7],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pluck', T.chip, 1174.66, 0.04, 0.5, 0],
  // tonight's deck, sitting down
  ['whoosh', T.dmOut[0], 0.3, 0.03], ['whoosh', T.deal, 0.4, 0.035], ['pop', T.deal + 0.35, 880, 0.035, 0], ['whoosh', T.flip[0], 0.3, 0.03], ['pluck', T.flip[1], 1318.51, 0.035, 0.5, 0],
  ['boom', T.sit + 0.05, 0.08], ['tick', T.sit + 0.1, 0.03],
  // the loud bar
  ['pop', T.spk, 440, 0.045, -0.5], ['boom', T.spk + 0.1, 0.1], ['boom', T.spk + 0.32, 0.08], ['boom', T.spk + 0.54, 0.08], ['boom', T.spk + 0.76, 0.06],
  ['pop', T.poof, 1318.51, 0.035, -0.5], ['tick', T.poof + 0.04, 0.03],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['whoosh', T.pie, 0.3, 0.03], ['pop', T.pie + 0.4, 987.77, 0.035, -0.2], ['pluck', T.heart, 1174.66, 0.04, 0.5, 0], ['bell', T.heart + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
