// askvirgo (20 s vertical Align ad, Star Talk S1 extra "Ask the Stars") · story 0–15.6, then the shared end card.
//   0.00–2.90  DM: "How long should I wait to *text* back?"  The ♍ star squints at a ticking stopwatch (03:59, 04:00…),
//              looks up at you, rolls its eyes and flings the stopwatch off screen.
//   2.90–6.20  ♍ VIRGO STAR: "there is no secret timer. we checked."  A clipboard: SECRET TIMER? · searched ✓ · none found ✓.
//              Chip: ♍ mutable earth · ruled by Mercury.
//   6.20–9.20  The DM slides away; your card deals in and a DEALBREAKER stamp thunks on: "games".
//              VIRGO: "reply when you can. mean what you say."
//   9.20–11.7  VIRGO: "games make tired people."  A pixel game controller blinks GAME OVER; Virgo goes sleepy.
//   11.75–15.45 card flip · "Clear is *kind*."  A sent text pops up: "free saturday? i'd love to see you." Then the stopwatch
//              falls back from the sky and clonks into a little bin.
// One canvas (sky + props + star), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, INTER, loadFonts, pop01, outK, popOut, popText, dmCard, noteChip, drawBits, drawTalkCard, drawBurst, sparkles, wordPops } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const VIR = signStar('virgo'), ROSE = VIR.color
const SPEAK = '♍ VIRGO STAR'
const MINT = '#7fe0b0'

// ── the timeline
const T = {
  look: 1.25, roll: [1.4, 1.85], fling: [1.95, 2.55],
  open: 2.9, l1: 3.1, clip: 4.1, check1: 4.45, check2: 4.8, chip: 5.3,
  dmOut: [5.95, 6.2], card: 6.15, l2: 6.3, stamp: 7.1,
  l3: 9.4, pad: 9.75, sleepy: [10.1, 10.9], close: 11.7,
  h2: 11.85, h2Land: 12.22, text: 12.5, fall: [13.6, 14.05], clonk: 14.05, h2Out: [15.2, 15.42], out: [15.08, 15.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'there is no *secret timer.* we checked.', color: '#ff9cc0' },
  { t: T.l2, speaker: SPEAK, text: 'reply when you can. *mean* what you say.', color: '#ff9cc0' },
  { t: T.l3, speaker: SPEAK, text: 'games make *tired* people.', color: '#ff9cc0' },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const WATCH = ['....DDD....', '.....D.....', '..SSSSSSS..', '.SWWWWWWWS.', 'SWWWWWWWWWS', 'SWWWWWWWWWS', 'SWWWWWWWWWS', 'SWWWWWWWWWS', 'SWWWWWWWWWS', '.SWWWWWWWS.', '..SSSSSSS..']
const WATCH_C = { D: '#c9cfe0', S: '#c9cfe0', W: '#fdf8ee' }
const PAD = ['..DD.....DD..', '.DDDDDDDDDDD.', 'DDGDDDDDDRDDD', 'DGGGDDDDBDYDD', 'DDGDDDDDDGDDD', 'DDDDDDDDDDDDD', '.DDD.....DDD.']
const PAD_C = { D: '#4a4466', G: '#9aa3c0', R: '#ff5d7a', B: '#5fd0ff', Y: '#ffd34d' }
const BIN = ['.KKKKKKK.', 'KKKKKKKKK', '.MMMMMMM.', '.MmMmMmM.', '.MmMmMmM.', '.MmMmMmM.', '..MMMMM..']
const BIN_C = { K: '#9aa3c0', M: '#c9cfe0', m: '#7d86a6' }

const HERO = { x: 470, y: 1050, size: 370 }
const GROUND = HERO.y + 175
const WATCH_AT = { x: HERO.x + 290, y: HERO.y - 50 }
const BIN_AT = { x: 860, y: GROUND - 36 }
const HOPS = [T.fling[0], ...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.3 && (h < T.sleepy[0] || h > T.sleepy[1])), T.h2Land, T.clonk + 0.05]

function virState(t) {
  if (t < T.look) return { mood: 'squint', look: [1, -1], blink: false }
  if (t < T.roll[0]) return { mood: 'neutral', look: [0, 0], blink: false }
  if (t < T.roll[1]) return { mood: 'eyeroll' }
  if (t < T.fling[1]) return { mood: 'squint', look: [-1, -1] }
  if (t < T.clip) return { mood: 'happy' }
  if (t < T.chip) return { mood: 'neutral', look: [-1, 0] }
  if (t < T.stamp) return { mood: 'neutral', look: [0, -1] }
  if (t < T.sleepy[0]) return { mood: 'happy' }
  if (t < T.sleepy[1]) return { mood: 'sleepy', zzz: true }
  if (t < T.text) return { mood: 'happy' }
  if (t < T.fall[0]) return { mood: 'sparkle' }
  if (t < T.clonk + 0.15) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'wink' }
}
const fmt = s => { const m = Math.floor(s / 60), r = Math.floor(s % 60); return String(m).padStart(2, '0') + ':' + String(r).padStart(2, '0') }

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const DM = dmCard(root, { question: 'How long should I wait to *text* back?', accent: '#ff9cc0', top: 170 })
  const CHIP = noteChip(root, { text: '♍ MUTABLE EARTH · RULED BY MERCURY', color: ROSE, top: 1306, at: T.chip })
  const CAP = el('div', { position: 'absolute', left: 0, width: '1080px', top: '170px', textAlign: 'center', font: `700 30px ${MONO}`, letterSpacing: '0.1em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none' }, root, 'DEALBREAKERS · PICKED AT SIGNUP,<br>STAMPED ON YOUR CARD')
  const H2 = popText(root, 'Clear is | *kind.*', { top: 200, size: 132, accentSize: 210, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: '#ff9cc0', lineHeight: 0.98 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawFloor(t) {
    const a = 1 - prog(t, T.out[0], T.out[1])
    x.save(); x.globalAlpha = a
    const pool = x.createRadialGradient(540, GROUND, 10, 540, GROUND, 520)
    pool.addColorStop(0, 'rgba(255,160,200,0.15)'); pool.addColorStop(1, 'rgba(255,160,200,0)')
    x.fillStyle = pool; x.fillRect(0, GROUND - 400, 1080, 700)
    x.fillStyle = 'rgba(239,230,214,0.35)'; x.fillRect(90, GROUND, 900, 5)
    x.restore()
  }

  /** the stopwatch at (cx, cy); hand from elapsed seconds; readout above */
  function watchAt(cx, cy, cell, rot, secs, readout = true, alpha = 1) {
    drawBits(x, WATCH, WATCH_C, cx, cy, cell, { rot, alpha })
    x.save(); x.globalAlpha *= alpha; x.translate(cx, cy + cell); x.rotate(rot)
    const a = (secs % 60) / 60 * Math.PI * 2
    x.strokeStyle = '#e8414f'; x.lineWidth = cell * 0.7; x.lineCap = 'square'
    x.beginPath(); x.moveTo(0, 0); x.lineTo(Math.sin(a) * cell * 3.4, -Math.cos(a) * cell * 3.4); x.stroke()
    x.fillStyle = INK; x.fillRect(-cell * 0.6, -cell * 0.6, cell * 1.2, cell * 1.2)
    x.restore()
    if (readout) {
      x.save(); x.globalAlpha *= alpha; x.fillStyle = BONE; x.font = `700 52px ${MONO}`; x.textAlign = 'center'; x.shadowColor = 'rgba(6,4,18,0.9)'; x.shadowBlur = 10
      x.fillText(fmt(secs), cx, cy - cell * 8); x.restore()
    }
  }

  function drawWatch(t) {
    const secs = 239 + t * 1.0       // 03:59 → 04:00 … (one real second per second)
    if (t < T.fling[0]) {
      const tick = Math.round(t * 2) % 2 ? 0.02 : -0.02
      watchAt(WATCH_AT.x, WATCH_AT.y + Math.sin(t * 2.4) * 6, 16, tick, secs)
      return
    }
    if (t < T.fling[1]) {
      const k = prog(t, ...T.fling)
      watchAt(lerp(WATCH_AT.x, -160, k), lerp(WATCH_AT.y, 380, k) - Math.sin(Math.PI * k) * 380, 16 * (1 - 0.3 * k), k * 14, secs, false)
      return
    }
    // it falls back from the sky at the end and clonks into the bin
    if (t >= T.fall[0] && t < T.clonk + 0.08) {
      const k = ease.inQuad(prog(t, ...T.fall))
      watchAt(lerp(BIN_AT.x - 60, BIN_AT.x, k), lerp(-150, BIN_AT.y - 40, k), 10, k * 6, secs, false)
    }
  }

  function drawBin(t) {
    const p = pop01(t, T.fall[0] - 0.5, 0.35, 2.2) * popOut(t, T.out)
    if (p <= 0.01) return
    const bonk = t > T.clonk ? 0.15 * Math.exp(-(t - T.clonk) * 8) * Math.sin((t - T.clonk) * 40) : 0
    drawBits(x, BIN, BIN_C, BIN_AT.x, BIN_AT.y - 20, 16 * p, { rot: bonk })
    if (t > T.clonk) {
      sparkles(x, drawPixelStar, t, BIN_AT.x, BIN_AT.y - 60, T.clonk, 8, 90, 2, [MINT, BONE, GOLD])
      x.save(); x.globalAlpha = 1 - prog(t, T.clonk + 0.6, T.clonk + 1); x.fillStyle = MINT; x.font = `700 40px ${MONO}`; x.textAlign = 'center'
      x.fillText('CLONK.', BIN_AT.x, BIN_AT.y - 120 - (t - T.clonk) * 30); x.restore()
    }
  }

  function drawClipboard(t) {
    const p = pop01(t, T.clip, 0.35, 2) * (1 - prog(t, T.dmOut[0], T.dmOut[1]))
    if (p <= 0.01) return
    const cx = 830, cy = 870
    x.save(); x.translate(cx, cy); x.scale(p, p); x.rotate(0.06)
    x.fillStyle = INK; x.fillRect(-128, -158, 256, 316)
    x.fillStyle = '#b07a48'; x.fillRect(-120, -150, 240, 300)
    x.fillStyle = '#fdf8ee'; x.fillRect(-100, -118, 200, 250)
    x.fillStyle = '#c9cfe0'; x.fillRect(-40, -164, 80, 34); x.fillStyle = INK; x.fillRect(-40, -164, 80, 6)
    x.fillStyle = INK; x.font = `700 24px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
    x.fillText('SECRET', -84, -80); x.fillText('TIMER?', -84, -50)
    const rows = [['searched', T.check1], ['none found', T.check2]]
    rows.forEach(([s, tc], i) => {
      const yy = 10 + i * 60
      x.fillStyle = '#7a6aa8'; x.font = `700 21px ${MONO}`; x.fillText(s, -84, yy)
      const c = easeOutBack(prog(t, tc, tc + 0.2), 3)
      if (c > 0) { x.save(); x.translate(74, yy); x.scale(c, c); x.strokeStyle = '#2fae6a'; x.lineWidth = 8; x.beginPath(); x.moveTo(-12, 0); x.lineTo(-3, 10); x.lineTo(14, -12); x.stroke(); x.restore() }
    })
    x.restore()
  }

  function drawCard(t) {
    const a = 1 - prog(t, T.close - 0.1, T.close + 0.1)
    if (t < T.card || a <= 0) { CAP.style.display = 'none'; return }
    const p = easeOutBack(prog(t, T.card, T.card + 0.5), 1.5)
    CAP.style.display = 'block'; CAP.style.opacity = String(clamp(p * 2) * a)
    const cy = lerp(-300, 520, p), rot = lerp(0.5, 0.04, p)
    drawTalkCard(x, 540, cy, 300, { rot, kicker: 'YOUR CARD', text: 'replies when I can. means it.', foot: '', color: ROSE, alpha: a })
    // the stamp thunks down
    const s = prog(t, T.stamp - 0.12, T.stamp)
    if (s > 0) {
      const sc = s < 1 ? lerp(2.4, 1, ease.inQuad(s)) : 1 + 0.08 * Math.exp(-(t - T.stamp) * 10) * Math.sin((t - T.stamp) * 40)
      x.save(); x.globalAlpha = a * clamp(s * 2); x.translate(560, cy + 150); x.rotate(-0.16); x.scale(sc, sc)
      x.strokeStyle = '#e8414f'; x.lineWidth = 6; x.strokeRect(-120, -34, 240, 68)
      x.fillStyle = '#e8414f'; x.font = `700 20px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.fillText('DEALBREAKER:', 0, -12); x.font = `800 26px ${INTER}`; x.fillText('MIND GAMES', 0, 14)
      x.restore()
    }
  }

  function drawPad(t) {
    const p = pop01(t, T.pad, 0.3, 2.4) * (1 - prog(t, T.close - 0.1, T.close + 0.1))
    if (p <= 0.01) return
    const cx = 820, cy = 900
    drawBits(x, PAD, PAD_C, cx, cy + Math.sin(t * 3) * 6, 18 * p)
    const blink = Math.floor((t - T.pad) * 3) % 2 === 0
    x.save(); x.globalAlpha = p * (blink ? 1 : 0.35); x.fillStyle = '#ff5d7a'; x.font = `700 40px ${MONO}`; x.textAlign = 'center'; x.shadowColor = '#ff5d7a'; x.shadowBlur = 14
    x.fillText('GAME OVER', cx, cy - 110); x.restore()
  }

  function drawSent(t) {
    const p = pop01(t, T.text, 0.35, 2.2) * popOut(t, T.out)
    if (p <= 0.01) return
    const cx = 690, cy = 740
    x.save(); x.translate(cx, cy); x.scale(p, p)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-232, -72, 464, 144, 34); x.fill()
    x.fillStyle = ROSE; x.beginPath(); x.roundRect(-224, -64, 448, 128, 28); x.fill()
    x.beginPath(); x.moveTo(-170, 60); x.lineTo(-120, 60); x.lineTo(-190, 104); x.closePath(); x.fill()
    x.fillStyle = '#fff'; x.font = `700 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillText('free saturday?', 0, -22); x.fillText("i'd love to see you.", 0, 22)
    x.fillStyle = BONE; x.font = `700 22px ${MONO}`; x.textAlign = 'right'; x.fillText('sent ✓✓', 220, 96)
    x.restore()
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = virState(t)
    const fling = t > T.fling[0] && t < T.fling[0] + 0.5 ? -0.1 * Math.sin(Math.PI * prog(t, T.fling[0], T.fling[0] + 0.5)) : 0
    const r = drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: ROSE, glyph: VIR.glyph, ...st, hops: HOPS, squash: fling, seed: 5, glow: 1.1, pop: ok })
    sparkles(x, drawPixelStar, t, r.x, r.y, T.h2Land, 12, 240, 2, [GOLD, BONE, '#ff9cc0'])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.8 })
      if (t < T.out[1] + 0.02) {
        drawFloor(t)
        drawBin(t)
        drawStar(t)
        drawWatch(t)
        drawClipboard(t)
        drawPad(t)
        drawSent(t)
      }
      drawCard(t)
      DM.update(t, outK(t, T.dmOut))
      CHIP.update(t, outK(t, [T.close - 0.1, T.close + 0.1]))
      box.update(t)
      H2.update(t, outK(t, T.h2Out))
      drawGrain(gx, t)
    },
  }
}

// one card cut: the box shuts → "Clear is kind." End card flips at 15.6.
const CUTS = [{ t: 11.76, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

const ticks = Array.from({ length: 4 }, (_, i) => ['tick', +(0.05 + i * 0.5).toFixed(2), 0.035])
export const CUES = [
  // hook: the DM buzz, the stopwatch ticking, eye-roll, fling
  ['pop', 0.02, 987.77, 0.04, 0], ['tick', 0.1, 0.04], ['tick', 0.24, 0.035], ...ticks,
  ['pluck', T.roll[0], 880, 0.03, 0.4, 0], ['whoosh', T.fling[0], 0.6, 0.05], ['pop', T.fling[1], 1567.98, 0.025, -0.8],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.clip, 880, 0.035, 0.4], ['pluck', T.check1, 1318.51, 0.035, 0.3, 0.4], ['pluck', T.check2, 1567.98, 0.035, 0.3, 0.4],
  ['pluck', T.chip, 1174.66, 0.04, 0.5, 0],
  // dealbreaker stamp
  ['whoosh', T.dmOut[0], 0.3, 0.03], ['whoosh', T.card, 0.4, 0.035], ['pop', T.card + 0.4, 880, 0.035, 0], ['boom', T.stamp, 0.16], ['tick', T.stamp, 0.05],
  // game over, sleepy
  ['pop', T.pad, 659.25, 0.04, 0.4], ['pop', T.pad + 0.35, 523.25, 0.035, 0.4], ['pop', T.pad + 0.7, 392, 0.035, 0.4],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  // last line: sent, then the clonk
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pop', T.text, 1174.66, 0.04, 0.3], ['pluck', T.text + 0.2, 1567.98, 0.03, 0.4, 0.3],
  ['whoosh', T.fall[0], 0.45, 0.035], ['boom', T.clonk, 0.12], ['pop', T.clonk, 1318.51, 0.04, 0.6], ['glitter', T.clonk, T.clonk + 0.5],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
