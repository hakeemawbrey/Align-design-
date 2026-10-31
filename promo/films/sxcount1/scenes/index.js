// sxcount1 — COUNTDOWN, "1." (20 s vertical Align ad, Star Talk Shows, show 12) · story 0–15.6, then the shared end card.
//   0.00–5.75  "One *sleep.*"  A giant pixel 1 slams in and fills the frame, then settles back. All twelve sign stars
//              drop into one long line, Aries to Pisces (Pisces already crying). THE STARS: "okay everyone. hold hands."
//              Hand-clasps pop along the line, star to star… and stop dead at Scorpio.
//   5.75–11.0  "No exceptions, | *Scorpio.*"  Everyone turns to look. THE STARS: "yes, scorpio. you too." A long Scorpio
//              eye-roll… then it blushes and takes both hands. The chain completes; a gold current runs down the line;
//              tonight's deck rises up in front of them and glows.
//   11.0–15.45 card cut, "See you at | the *deal.*"  The line sways together, the deck flares, Pisces sobs happily.
// One canvas (sky + number + stars + deck), DOM type + the dialogue box, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, SIGNS } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { GOLD, BONE, PINK, MINT, INK, BEAT, r3, pop01, outK, popOut, drawDigit, digitState, buildBug, starTears,
  drawCard, sparkles, FX, chipS, womp, wordPops, slamCues } from './kit.js'

export const DURATION = 20
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const SCO = 7, PIS = 11

// ── the timeline
const T = {
  slam: 0.15, settle: 1.45,
  h0: 0.5, h0Late: 0.75, h0Out: [5.5, 5.68],
  line0: 1.75, lineGap: 0.12,                  // star i drops in at line0 + i·gap
  open: 3.35, l1: 3.55,
  link0: 4.75, linkGap: 0.13,                  // links 0–5 pop (Aries … Libra–Scorpio stops)
  stall: 5.55,                                 // the chain stalls at Scorpio; everyone turns
  h1: 5.78, h1Late: 6.15, h1Out: [10.85, 11.0],
  l2: 6.45, roll: [7.55, 8.15], give: 8.35,    // Scorpio gives in: links 6, 7 pop, then the rest
  current: 9.15, close: 9.25, deck: 9.55,
  cut: 11.05,
  h2: 11.15, h2Late: 11.6,
  sway: 12.0, flare: 13.1,
  out: [14.95, 15.42],
}
const SPEAK = 'THE STARS'
const LINES = [
  { t: T.l1, speaker: SPEAK, text: 'okay everyone. hold hands.' },
  { t: T.l2, speaker: SPEAK, text: 'yes, *scorpio*. you too.' },
]
const CPS = 28

// ── layout: one gentle smile-shaped line of twelve
const SZ = 124, GAP = 86
const STAR_AT = i => ({ x: 540 + (i - 5.5) * GAP, y: 1235 - 60 * ((i - 5.5) / 5.5) ** 2 })
// link k joins star k and k+1. Links 0–5 pop first (up to Libra), link 6 (Libra–Scorpio) and 7 (Scorpio–Sag) wait
const LINK_T = k => k < 6 ? T.link0 + k * T.linkGap : k < 8 ? T.give + (k - 6) * 0.18 : T.give + 0.36 + (k - 8) * T.linkGap
const ALL_LINKED = LINK_T(10) + 0.1

function stateOf(i, t) {
  const toward = [Math.sign(SCO - i), 0]
  if (i === SCO) {
    if (t < T.stall) return { mood: 'neutral', look: [0, 0] }
    if (t < T.roll[0]) return { mood: 'squint', look: [1, -1] }
    if (t < T.roll[1]) return { mood: 'eyeroll' }
    if (t < T.give + 0.5) return { mood: 'neutral', look: [0, 1], blush: 0.9 }
    if (t < T.current) return { mood: 'happy', blush: 0.9 }
    return { mood: t > T.deck ? 'sparkle' : 'happy', look: [0, 1] }
  }
  if (i === PIS) return { mood: t > T.current ? 'happy' : 'neutral', look: t > T.stall && t < T.give ? [-1, 0] : [0, 0] }
  if (t < T.line0 + i * T.lineGap + 0.5) return { mood: 'happy' }
  if (t < T.stall) return { mood: 'happy' }
  if (t < T.give) return { mood: 'neutral', look: toward }
  if (t < T.give + 0.6) return { mood: 'wide', look: toward, blink: false }
  if (t < T.deck) return { mood: 'happy' }
  if (t < T.flare) return { mood: 'sparkle', look: [0, 1] }
  return { mood: i % 3 === 0 ? 'heart' : 'happy' }
}
const pisK = t => t < T.current ? 0.7 : t < T.flare ? 1.3 : 1.9

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "italic 500 190px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'One *sleep.*', { top: 190, size: 136, accentSize: 204, at: T.h0, late: 1, lateAt: T.h0Late, wobble: true, accentColor: GOLD })
  const H1 = popText(root, 'No exceptions, | *Scorpio.*', { top: 170, size: 100, accentSize: 160, at: T.h1, late: 1, lateAt: T.h1Late, wobble: true, accentColor: SIGNS[SCO].color })
  const H2 = popText(root, 'See you at | the *deal.*', { top: 170, size: 112, accentSize: 176, at: T.h2, late: 1, lateAt: T.h2Late, wobble: true, accentColor: GOLD })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 230, open: T.open, close: T.close, cps: CPS })
  const bug = buildBug(root, { n: 1, start: 0.25, end: STORY_END })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function drawNumber(t) {
    const d = digitState(t, { slam: T.slam, settle: T.settle, big: 118, small: 66, bigY: 960, smallY: 730, fade: [T.cut, T.cut + 0.2, 0.14] })
    const ok = 1 - prog(t, T.out[0], T.out[1])
    const sh = prog(t, T.slam + 0.35, T.slam + 1.15), sh2 = prog(t, T.current, T.current + 0.8)
    drawDigit(x, 1, d.cx, d.cy, d.cell, { alpha: d.alpha * ok, glow: 0.9 + 0.5 * sh2 * (1 - prog(t, T.cut - 0.3, T.cut)), shine: sh > 0 && sh < 1 ? sh : sh2 > 0 && sh2 < 1 ? sh2 : null })
  }

  // where a star is this frame (sway in the last beat)
  const swayAt = (i, t) => t > T.sway ? Math.sin((t - T.sway) * 3.2 - i * 0.35) * 14 * ease.inOutQuad(prog(t, T.sway, T.sway + 0.6)) : 0

  function drawLine(t) {
    const ok = popOut(t, T.out)
    if (ok <= 0) return
    const rs = []
    for (let i = 0; i < 12; i++) {
      const t0 = T.line0 + i * T.lineGap, p = pop01(t, t0, 0.34, 2.2) * ok
      if (p <= 0.02) { rs.push(null); continue }
      const P = STAR_AT(i), s = SIGNS[i]
      const drop = (1 - ease.outCubic(prog(t, t0 - 0.15, t0 + 0.18))) * 520
      const sw = swayAt(i, t)
      const single = i === SCO ? ease.inOutCubic(prog(t, T.stall, T.stall + 0.25)) * (1 - ease.inOutCubic(prog(t, T.give + 0.2, T.give + 0.5))) : 0
      const lean = i === SCO ? 26 * ease.inOutCubic(prog(t, T.stall, T.stall + 0.3)) * (1 - ease.inOutCubic(prog(t, T.give, T.give + 0.3))) : 0
      const hops = [t0 + 0.2, LINK_T(i) + 0.02, i > 0 ? LINK_T(i - 1) + 0.02 : -9, T.current + i * 0.06, T.flare + 0.05 + (i % 2) * 0.1]
      const o = { color: s.color, glyph: s.glyph, ...stateOf(i, t), hops, seed: i + 2, pop: p, glow: 0.95, squash: i === PIS && pisK(t) > 1.5 ? Math.sin(t * 40) * 0.03 : 0 }
      const r = drawStarChar(x, P.x + sw, P.y - drop + lean, SZ * (1 + 0.12 * single), t, o)
      rs.push(r)
      if (i === PIS) starTears(x, r, t, pisK(t) * p)
    }
    // the hand-clasps: a little bone pixel clasp where two neighbours' points meet, with a pop sparkle
    for (let k = 0; k < 11; k++) {
      const a = rs[k], b = rs[k + 1]
      if (!a || !b) continue
      const lt = LINK_T(k), lp = pop01(t, lt, 0.25, 3) * ok
      if (lp <= 0.02) continue
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2 - SZ * 0.1
      const c = 5 * lp
      const lit = t > T.current ? Math.max(0, 1 - Math.abs((t - T.current) * 14 - k) / 2) : 0
      x.save()
      x.fillStyle = INK; x.fillRect(Math.round(mx - 2.5 * c), Math.round(my - 1.5 * c), Math.round(5 * c), Math.round(3 * c))
      x.fillStyle = lit > 0 ? '#fff6c8' : BONE; x.fillRect(Math.round(mx - 1.8 * c), Math.round(my - 0.9 * c), Math.round(3.6 * c), Math.round(1.8 * c))
      x.fillStyle = GOLD; x.fillRect(Math.round(mx - 0.5 * c), Math.round(my - 0.9 * c), Math.round(c), Math.round(1.8 * c))
      if (lit > 0) {
        x.globalCompositeOperation = 'lighter'
        const g = x.createRadialGradient(mx, my, 0, mx, my, 60)
        g.addColorStop(0, `rgba(255,230,150,${0.8 * lit})`); g.addColorStop(1, 'rgba(255,230,150,0)')
        x.fillStyle = g; x.fillRect(mx - 60, my - 60, 120, 120)
      }
      x.restore()
      sparkles(x, t, mx, my, lt, 6, 28, k, [GOLD, BONE, PINK, MINT], 0.45)
    }
    // the current: a glow line under the whole chain once complete
    if (t > T.current && rs.every(Boolean)) {
      const a = ease.outCubic(prog(t, T.current, T.current + 0.8)) * ok
      x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha = 0.35 * a * (0.8 + 0.2 * Math.sin(t * 5))
      x.strokeStyle = '#ffe7a8'; x.lineWidth = 10; x.lineCap = 'round'
      x.beginPath(); rs.forEach((r, i) => { const yy = r.y - SZ * 0.1; i ? x.lineTo(r.x, yy) : x.moveTo(r.x, yy) }); x.stroke()
      x.restore()
    }
  }

  function drawDeck(t) {
    const ok = popOut(t, T.out)
    const rise = ease.outCubic(prog(t, T.deck, T.deck + 0.7))
    if (rise <= 0 || ok <= 0) return
    const cx = 540, cy = lerp(2050, 1440, rise) + Math.sin(t * 2) * 8
    const fl = t > T.flare ? Math.exp(-(t - T.flare) * 2.5) : 0
    const gl = 0.5 + 0.2 * Math.sin(t * 4) + 0.8 * fl + 0.25 * prog(t, T.cut, T.cut + 0.5)
    // soft rays
    x.save(); x.globalCompositeOperation = 'lighter'
    for (let k = 0; k < 10; k++) {
      const ang = k / 10 * Math.PI * 2 + t * 0.25
      x.globalAlpha = (0.07 + 0.08 * fl) * ok * rise
      x.fillStyle = '#ffe2a0'
      x.beginPath(); x.moveTo(cx, cy); x.lineTo(cx + Math.cos(ang - 0.08) * 520, cy + Math.sin(ang - 0.08) * 520); x.lineTo(cx + Math.cos(ang + 0.08) * 520, cy + Math.sin(ang + 0.08) * 520); x.closePath(); x.fill()
    }
    x.restore()
    for (let i = 0; i < 6; i++) drawCard(x, cx, cy - i * 4, 128 * (1 + 0.08 * fl), { alpha: ok, glow: i === 5 ? gl : 0 })
    sparkles(x, t, cx, cy, T.flare, 14, 200, 0.2, [GOLD, BONE, PINK, MINT], 0.8)
    sparkles(x, t, cx, cy, T.deck + 0.6, 10, 140, 0.6, [GOLD, BONE, MINT], 0.6)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const ss = ease.inOutCubic(prog(t, 0, 3))
      const base = t < 3 ? { ...SKY_H, zoom: lerp(1.6, SKY_H.zoom, ss), dy: lerp(-30, 0, ss) } : SKY_H
      drawSky(x, t, base)
      if (t < T.out[1] + 0.02) {
        drawNumber(t)
        drawDeck(t)
        drawLine(t)
        sparkles(x, t, 540, 960, T.slam + 0.3, 14, 380, 0.2, [GOLD, BONE, '#ffd98a', PINK])
      }
      box.update(t)
      bug.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.7 (H0 out → "No exceptions, Scorpio.") and 11.05 (→ "See you at the deal.").
// cardfx keeps one for a film this short (the 11.05 flip). End card flips at 15.6.
const CUTS = [5.7, { t: T.cut, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END, corners: 'tr bl br' }), cardCuts(CUTS)]

// ── sound
const NOTES = [523.25, 587.33, 659.25, 783.99, 880, 1046.5, 1174.66, 1318.51, 1567.98, 1760, 2093, 2349.32]
export const CUES = [
  ...slamCues(T.slam),
  ['pop', T.h0, 880, 0.03, 0], ['pop', T.h0Late, 1046.5, 0.05, 0], ['pluck', T.h0Late, 1046.5, 0.045, 0.7, 0],
  ['whoosh', T.settle, 0.5, 0.03],
  ...Array.from({ length: 12 }, (_, i) => ['pop', r3(T.line0 + i * T.lineGap + 0.05), NOTES[i], 0.026, +((i - 5.5) / 7).toFixed(2)]),
  ['pop', T.open, 659.25, 0.035, 0], ['pop', T.open + 0.06, 880, 0.028, 0],
  ...talkCues(LINES, { cps: CPS }),
  // links pop up the scale… and stall
  ...Array.from({ length: 6 }, (_, k) => ['pluck', r3(LINK_T(k)), NOTES[k + 2], 0.035, 0.4, +((k - 5) / 7).toFixed(2)]),
  ['tapeStop', T.stall - 0.15, 0.35], ['tick', T.stall, 0.05], ['pop', T.stall + 0.05, 392, 0.035, 0.2],
  ...wordPops(T.h1, 2, 0.07, 2, 0.024), ['pop', T.h1Late, 1318.51, 0.05, 0],
  ...womp(T.roll[0]),
  // Scorpio gives in: the rest of the chain
  ...Array.from({ length: 5 }, (_, j) => ['pluck', r3(LINK_T(6 + j)), NOTES[8 + Math.min(j, 3)] * (j > 3 ? 1.122 : 1), 0.035, 0.4, +((j + 1) / 7).toFixed(2)]),
  ['riser', T.give + 0.3, T.current, 0.03],
  ['glitter', T.current, T.current + 0.9], ['bell', T.current, 1046.5, 0.035, 1.8, 0], ['bell', T.current + 0.12, 1567.98, 0.03, 1.8, 0.2],
  ['pop', T.close, 880, 0.028, 0], ['pop', T.close + 0.07, 587.33, 0.028, 0],
  ['whoosh', T.deck, 0.7, 0.04], ['bell', T.deck + 0.6, 2093, 0.03, 2.0, 0], ['glitter', T.deck + 0.55, T.deck + 1.1],
  ...wordPops(T.h2, 3, 0.07, 1, 0.024), ['pop', T.h2Late, 1046.5, 0.05, 0], ['pluck', T.h2Late, 1046.5, 0.045, 0.7, 0],
  ['boom', T.flare, 0.12], ['glitter', T.flare, T.flare + 0.7], ['bell', T.flare + 0.02, 1567.98, 0.03, 2.2, -0.2], ['bell', T.flare + 0.1, 2093, 0.025, 2.2, 0.2],
  ['whoosh', T.out[0], 0.35, 0.03],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void chipS; void FX; void clamp
