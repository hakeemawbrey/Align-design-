// askleo (15 s vertical Align ad, Star Talk S1 extra "Ask the Stars") · story 0–10.6, then the shared end card.
//   0.00–2.40  DM: "How do I give a *real* compliment?"  The ♌ star in its crown admires itself in a hand mirror (heart-eyes),
//              then turns the mirror around to face YOU. The glass sparkles: "you".
//   2.40–5.40  ♌ LEO STAR: "skip 'you look nice.' be specific."  A "you look nice." bubble gets a big pixel X.
//              Chip: ♌ fixed fire · ruled by the Sun.
//   5.40–8.50  The DM slides away; their card deals in: "explains things so well" (CARD FIRST. FACE LAST.).
//              LEO: "'you explain things so well' hits harder."
//   8.55–10.45 card flip · "Notice the *details*."  Leo, heart-eyed again, but at you this time.
// One canvas (sky + spotlight + star + props), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { GOLD, BONE, PINK, INK, MONO, INTER, loadFonts, pop01, outK, popOut, popText, dmCard, noteChip, drawBits, drawTalkCard, sparkles, wordPops } from './kit.js'

export const DURATION = 15
const STORY_END = DURATION - ENDCARD_LEN       // 10.6
const LEO = signStar('leo'), ORANGE = LEO.color
const SPEAK = '♌ LEO STAR'

// ── the timeline
const T = {
  heart: 0, turn: [1.15, 1.6], wink: [1.75, 2.15],
  open: 2.4, l1: 2.6, bubble: 2.75, xout: 3.55, chip: 4.15,
  dmOut: [5.05, 5.3], card: 5.25, l2: 5.45, close: 8.5,
  h2: 8.62, h2Land: 9.0, heartAt: 9.2, h2Out: [10.2, 10.42], out: [10.08, 10.45],
}
const LINES = [
  { t: T.l1, speaker: SPEAK, text: "skip 'you look nice.' be *specific.*", color: ORANGE },
  { t: T.l2, speaker: SPEAK, text: "'you explain things so well' hits *harder.*", color: ORANGE },
]
const CPS = 30
export const LINES_EXPORT = { lines: LINES, cps: CPS, get close() { return T.close } }

const CROWN = ['g...g...g', 'gg.YgY.gg', 'YYYYYYYYY', 'YRYYBYYRY', 'YYYYYYYYY', 'ddddddddd']
const CROWN_C = { g: '#fff1c8', Y: '#f7c948', R: '#ff3d6e', B: '#5fd0ff', d: '#c98a1f' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const XMARK = ['XX....XX', 'XXX..XXX', '.XXXXXX.', '..XXXX..', '..XXXX..', '.XXXXXX.', 'XXX..XXX', 'XX....XX']

const HERO = { x: 430, y: 1050, size: 360 }
const GROUND = HERO.y + 170
const MIRROR = { x: 810, y: 930 }
const HOPS = [0.3, T.turn[1], ...talkHops(LINES, SPEAK, { cps: CPS }).filter(h => h > T.l1 + 0.3), T.h2Land]

function leoState(t) {
  if (t < T.turn[0]) return { mood: 'heart' }
  if (t < T.wink[0]) return { mood: 'neutral', look: [0, 0] }
  if (t < T.wink[1]) return { mood: 'wink' }
  if (t < T.xout) return { mood: 'happy' }
  if (t < T.xout + 0.5) return { mood: 'squint', look: [-1, -1], blink: false }
  if (t < T.heartAt) return { mood: 'happy' }
  return { mood: 'heart' }
}

async function build(stage) {
  await loadFonts()
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const DM = dmCard(root, { question: 'How do I give a *real* compliment?', accent: ORANGE, top: 170 })
  const CHIP = noteChip(root, { text: '♌ FIXED FIRE · RULED BY THE SUN', color: ORANGE, top: 1306, at: T.chip })
  const CAP = el('div', { position: 'absolute', left: 0, width: '1080px', top: '176px', textAlign: 'center', font: `700 34px ${MONO}`, letterSpacing: '0.12em', color: BONE, textShadow: '0 3px 0 rgba(6,4,18,0.85)', display: 'none' }, root, 'CARD FIRST. FACE LAST.')
  const H2 = popText(root, 'Notice the | *details.*', { top: 200, size: 128, accentSize: 200, at: T.h2, gap: 0.08, late: 1, lateAt: T.h2Land, wobble: true, accentColor: ORANGE, lineHeight: 0.98 })
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 300, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  function drawSpot(t) {
    const on = 1 - ease.inQuad(prog(t, T.out[0] + 0.1, T.out[1] + 0.1))
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createLinearGradient(0, -100, 0, GROUND + 40)
    g.addColorStop(0, `rgba(255,236,190,${0.16 * on})`); g.addColorStop(1, `rgba(255,190,120,${0.1 * on})`)
    x.fillStyle = g
    x.beginPath(); x.moveTo(540 - 90, -100); x.lineTo(540 + 90, -100); x.lineTo(540 + 470, GROUND + 40); x.lineTo(540 - 470, GROUND + 40); x.closePath(); x.fill()
    x.translate(540, GROUND); x.scale(1, 0.2)
    const p = x.createRadialGradient(0, 0, 0, 0, 0, 500)
    p.addColorStop(0, `rgba(255,214,150,${0.4 * on})`); p.addColorStop(1, 'rgba(255,190,120,0)')
    x.fillStyle = p; x.beginPath(); x.arc(0, 0, 500, 0, Math.PI * 2); x.fill()
    x.restore()
  }

  /** the hand mirror: glass toward Leo first (we see its gold back... no: we see the reflection of Leo), then turned to you */
  function drawMirror(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const k = prog(t, ...T.turn), sx = Math.cos(Math.PI * k)       // 1 → −1 (flips through edge-on)
    const facingYou = k >= 0.5
    const sc = (facingYou ? 1.25 : 1) * ok
    const cx = MIRROR.x + (facingYou ? 30 : 0), cy = MIRROR.y + Math.sin(t * 2.4 + 1) * 8 - (facingYou ? 30 : 0)
    const c = 13 * sc, RX = 7.5, RY = 9.5
    x.save(); x.translate(cx, cy); x.rotate(-0.12 + 0.05 * Math.sin(t * 1.7)); x.scale(Math.max(0.05, Math.abs(sx)), 1)
    x.fillStyle = INK; x.fillRect(-2 * c, (RY - 0.5) * c, 4 * c, 7 * c)
    x.fillStyle = '#c98a1f'; x.fillRect(-1 * c, RY * c, 2 * c, 6 * c); x.fillStyle = '#f7c948'; x.fillRect(-1 * c, RY * c, 1 * c, 6 * c)
    for (let j = -11; j <= 11; j++) for (let i = -9; i <= 9; i++) {
      const u = (i + 0.5) / RX, v = (j + 0.5) / RY, d = u * u + v * v
      const col = d <= 0.62 ? null : d <= 0.86 ? (u + v < -0.2 ? '#fff1c8' : '#f7c948') : d <= 1.0 ? '#c98a1f' : d <= 1.2 ? INK : undefined
      if (col === undefined) continue
      x.fillStyle = col || '#2a1f55'; x.fillRect(i * c, j * c, c + 0.5, c + 0.5)
    }
    x.save()
    x.beginPath(); x.ellipse(0, 0, RX * Math.sqrt(0.62) * c, RY * Math.sqrt(0.62) * c, 0, 0, Math.PI * 2); x.clip()
    const gl = x.createLinearGradient(0, -RY * c, 0, RY * c); gl.addColorStop(0, facingYou ? '#5a3f9a' : '#3a2c74'); gl.addColorStop(1, '#1d1440')
    x.fillStyle = gl; x.fillRect(-RX * c, -RY * c, 2 * RX * c, 2 * RY * c)
    if (!facingYou) {
      x.scale(-1, 1)
      drawStarChar(x, 0, 16 * sc, 140 * sc, t, { color: ORANGE, mood: leoState(t).mood === 'heart' ? 'heart' : 'happy', look: [1, 0], seed: 3, glow: 0.4, bob: 0, tips: false })
    } else {
      // "you": a soft sparkle field + the word
      for (let i = 0; i < 7; i++) {
        const a = i * 0.9 + t * 0.8, rr = (24 + (i * 13) % 36) * sc
        drawPixelStar(x, Math.cos(a) * rr * 1.4, Math.sin(a) * rr * 2 - 10 * sc, (18 + 10 * Math.sin(t * 4 + i)) * sc, i % 2 ? 1 : 2, i % 3 ? GOLD : '#fff3dc')
      }
      x.fillStyle = '#fff3dc'; x.font = `italic 500 ${Math.round(70 * sc)}px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'
      x.shadowColor = 'rgba(255,214,150,0.9)'; x.shadowBlur = 20
      x.fillText('you', 0, 4 * sc)
    }
    x.restore()
    x.fillStyle = 'rgba(255,255,255,0.5)'
    for (let q = 0; q < 4; q++) x.fillRect((-4 + q) * c, (-6 + q) * c, c, c)
    x.restore()
    if (facingYou) sparkles(x, drawPixelStar, t, cx, cy, T.turn[1] - 0.1, 10, 150, 1, [GOLD, BONE, ORANGE])
  }

  function drawBubble(t) {
    const p = pop01(t, T.bubble, 0.3, 2.4), gone = prog(t, T.xout + 0.7, T.xout + 0.95)
    if (p <= 0.01 || gone >= 1) return
    const cx = 330, cy = 760, s = p * (1 - gone)
    x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.05)
    x.fillStyle = INK; x.beginPath(); x.roundRect(-196, -56, 392, 112, 20); x.fill()
    x.fillStyle = '#f5eedf'; x.beginPath(); x.roundRect(-188, -48, 376, 96, 16); x.fill()
    x.beginPath(); x.moveTo(40, 46); x.lineTo(90, 46); x.lineTo(60, 96); x.closePath(); x.fill()
    x.fillStyle = '#3d3170'; x.font = `italic 500 48px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('you look nice.', 0, 2)
    x.restore()
    const xp = easeOutBack(prog(t, T.xout, T.xout + 0.2), 3)
    if (xp > 0) {
      x.save(); x.fillStyle = '#ff3d4e'; x.translate(cx, cy); x.rotate(-0.05)
      x.fillRect(-150, -4, 300 * clamp(prog(t, T.xout, T.xout + 0.15)), 9); x.restore()
      drawBits(x, XMARK, { X: '#ff3d4e' }, cx + 205, cy - 50, 8 * xp * (1 - gone))
    }
  }

  function drawCard(t) {
    const a = 1 - prog(t, T.close - 0.1, T.close + 0.1)
    if (t < T.card || a <= 0) { CAP.style.display = 'none'; return }
    const p = easeOutBack(prog(t, T.card, T.card + 0.5), 1.5)
    CAP.style.display = 'block'; CAP.style.opacity = String(clamp(p * 2) * a)
    drawTalkCard(x, 540, lerp(-300, 510, p), 290, { rot: lerp(-0.5, -0.04, p) + 0.02 * Math.sin(t * 2), kicker: 'THEIR CARD', text: 'explains things so well', foot: 'FACE: LATER', color: ORANGE, alpha: a })
  }

  function drawStar(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const st = leoState(t)
    const r = drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: ORANGE, glyph: LEO.glyph, ...st, hops: HOPS, seed: 3, glow: 1.15, pop: ok })
    const cell = Math.round(HERO.size / 36)
    drawBits(x, CROWN, CROWN_C, r.x, r.top + cell * 0.6 + Math.sin(t * 2.2 + 3 * 2.1) * 0, cell, { rot: -0.2 + 0.04 * Math.sin(t * 3), alpha: ok })
    // floating hearts while heart-eyed (at itself first, at you at the end)
    const hearts = (t0, t1, side) => {
      for (let i = 0; i < 6; i++) {
        const born = t0 + i * 0.18; if (t < born || born > t1) continue
        const p = (t - born) / 1.1; if (p >= 1) continue
        drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, r.x + side * 60 + (((i * 37) % 7) / 6 - 0.5) * 240, r.y - 80 - p * 240, 7, { alpha: Math.sin(Math.PI * p) * ok })
      }
    }
    hearts(-0.8, T.turn[0] - 0.3, 1)
    if (t > T.heartAt) hearts(T.heartAt, T.out[0], 0)
    sparkles(x, drawPixelStar, t, r.x, r.y, T.h2Land, 12, 240, 2, [GOLD, BONE, ORANGE])
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, { ...SKY_H, dim: (SKY_H.dim ?? 1) * 0.65 })
      drawSpot(t)
      if (t < T.out[1] + 0.02) { drawStar(t); drawMirror(t); drawBubble(t) }
      drawCard(t)
      DM.update(t, outK(t, T.dmOut))
      CHIP.update(t, outK(t, [T.close - 0.1, T.close + 0.1]))
      box.update(t)
      H2.update(t, outK(t, T.h2Out))
      drawGrain(gx, t)
    },
  }
}

// one card cut: the box shuts → "Notice the details." End card flips at 10.6.
const CUTS = [{ t: 8.56, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

export const CUES = [
  // hook: the DM buzz, heart-eyes, the mirror turns to you
  ['pop', 0.02, 987.77, 0.04, 0], ['tick', 0.1, 0.04], ['tick', 0.24, 0.035], ['tick', 0.38, 0.03],
  ['pluck', 0.3, 1174.66, 0.035, 0.5, 0], ['pluck', 0.42, 1567.98, 0.03, 0.5, 0],
  ['whoosh', T.turn[0], 0.45, 0.04], ['bell', T.turn[1], 1760, 0.03, 1.2, 0.4], ['glitter', T.turn[1] - 0.1, T.turn[1] + 0.5],
  ['pluck', T.wink[0], 1318.51, 0.035, 0.5, 0],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS }),
  ['pop', T.bubble, 880, 0.035, -0.4], ['boom', T.xout, 0.12], ['pop', T.xout, 440, 0.04, -0.4],
  ['pluck', T.chip, 1174.66, 0.04, 0.5, 0],
  ['whoosh', T.dmOut[0], 0.3, 0.03], ['whoosh', T.card, 0.4, 0.035], ['pop', T.card + 0.4, 880, 0.035, 0],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...wordPops(T.h2, 2, 0.08, 1, 0.028), ['pop', T.h2Land, 1318.51, 0.05, 0], ['pluck', T.h2Land, 1174.66, 0.05, 0.7, 0],
  ['pluck', T.heartAt, 1174.66, 0.04, 0.5, 0], ['bell', T.heartAt + 0.05, 1760, 0.025, 1.0, 0],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
