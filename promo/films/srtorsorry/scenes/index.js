// srtorsorry (30 s vertical, Star Talk Remix of torsorry "So polite, nobody says it") · story 0–25.6, then the shared end
// card ("come" + the logo + VOTE FOR YOUR CITY, the original's CTA).
//   0.00–6.45  HOOK  "Toronto: | so polite, | nobody says | what they *want.*"  A first date at a little checked table in
//              front of a generic line-art skyline (one needle tower, unnamed): ♎ Libra and ♍ Virgo. Polite bubbles thud
//              down and pile up between them, one per beat ("sorry!", "no, sorry!", "you pick!", "no, YOU pick!" …
//              "SORRY!"); the wobbling stack climbs past the tower and pops (6.16). ♓ Pisces, alone at the next table,
//              sobs into its napkin the whole time.
//   6.60–12.0  THE STARS drops in over the table: "Everyone's | *thinking* it…"  THE STARS: "we can *read* you, babe." →
//              Thought clouds pop over both: "kids someday?" / "is this serious?"  → "…nobody's | *saying* it."
//              Out loud: "haha totally" / "all good!"  THE STARS: "you both want the *same* thing."  Slow eye-roll.
//  12.00 cut → "Dealbreakers | come *first.*"  A DEALBREAKERS card drops; three stamps, the third twisted after a beat of
//              silence: "✕ NOTHING SERIOUS", "✕ FLAKY PLANS", … "✕ “ANYTHING'S FINE”". ♎ LIBRA: "wait. I can just
//              *say* it?"
//  17.55      ★ LESSON UNLOCKED: "Polite is nice. | Clear is *kinder.*"  +1 SORRY-FREE
//  21.80 cut → "Say what you | *mean.*"  The date again: Libra: "I like you." Virgo starts "sorr—", catches itself:
//              "I like you too." Hearts, the skyline windows go gold, Pisces cries happy tears.
// One canvas (sky + scene + stars), DOM type + the dialogue box + the lesson above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { buildLesson, lessonCues } from '../../lesson.js'
import {
  BONE, GOLD, PINK, RED, CYAN, WARM, NIGHT, VIOLET, INK, MONO, INTER, TAU, BEAT, r3,
  rgba, mixHex, pop01, outK, popOut, glowStroke, popText, makeBurst, drawBurst, drawChat, drawStamp, drawTears, floatHearts,
} from '../../srtorpatio/scenes/props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const LIBRA = signStar('libra'), VIRGO = signStar('virgo'), PISCES = signStar('pisces')
const LAV = '#c9a6ff', MAPLE = '#ff5b4d'

// ── the timeline
const T = {
  black: [0, 0.3], h0: 0.1, h0Late: BEAT(4), bubs: [1, 2, 3, 4, 5, 6, 7, 8, 9].map(BEAT), pop: BEAT(10), h0Out: [6.05, 6.25],
  stars: 6.5, h1: 6.6, h1Late: 7.0, boxA: 6.82, l1: 6.98, think: [8.0, 8.35], h1Out: [8.85, 9.0],
  h1b: 9.05, h1bLate: 9.45, said: [9.25, 9.55], l2: 9.35, roll: [10.75, 11.65], boxAClose: 11.9, h1bOut: [11.7, 11.88], thinkOut: [11.55, 11.85],
  cut1: 12.0,
  h2: 12.05, h2Late: 12.4, dim: [11.95, 12.1], card: [12.2, 12.6], stamps: [12.9, 13.45, 14.3], boxB: 14.75, l3: 14.9,
  boxBClose: 17.35, h2Out: [17.15, 17.33], cardOut: [17.1, 17.45], undim: [17.3, 17.6],
  lesson: { at: BEAT(30.5), out: [21.45, 21.65], text: 'Polite is nice. | Clear is *kinder.*', chip: '+1 SORRY-FREE' },
  cut2: 21.8,
  h3: 21.85, h3Late: 22.2, like: 22.5, sorr: 23.05, too: 23.55, gold: [23.6, 24.2], out: [25.0, 25.42],
}
const ST = 'THE STARS', LB = '♎ LIBRA STAR', LBC = '#ffc2e2'
const LINES_A = [
  { t: T.l1, speaker: ST, text: "we can *read* you, babe." },
  { t: T.l2, speaker: ST, text: 'you both want the *same* thing.' },
]
const LINES_B = [{ t: T.l3, speaker: LB, text: 'wait. I can just *say* it?', color: LBC }]
const CPS = 30
const HOPS_ST = [...talkHops(LINES_A, ST, { cps: CPS }), T.stars + 0.3]
const HOPS_LB = [...talkHops(LINES_B, LB, { cps: CPS }), ...T.bubs.filter((_, i) => i % 2 === 0), T.said[0], T.stamps[2] + 0.1, T.like]
const HOPS_VG = [...T.bubs.filter((_, i) => i % 2 === 1), T.said[1], T.sorr, T.too]

// ── the scene geometry
const SB = 1190                   // skyline base
const TB = { x: 540, top: 1250, w: 640, cloth: 1400 }
const SEAT = { lb: 250, vg: 830, y: 1135, size: 250 }
const PIS = { x: 990, y: 1010, size: 110 }
const NEEDLE = { x: 640, h: 760 }
const TOWERS = (() => {
  const r = rng(52), out = []
  const spec = [[-20, 120, 300], [110, 90, 430], [210, 110, 340], [330, 100, 520], [450, 80, 380], [730, 110, 470], [850, 90, 330], [950, 140, 420]]
  for (const [tx, w, h] of spec) {
    const win = []
    for (let yy = 24; yy < h - 14; yy += 30) for (let xx = 12; xx < w - 14; xx += 22) if (r() < 0.35) win.push([xx, yy, r()])
    out.push({ x: tx, w, h, win })
  }
  return out
})()
const PILE = [
  ['sorry!', -1, -30, 230], ['no, sorry!', 1, 26, 290], ['you pick!', -1, -20, 270], ['no, YOU pick!', 1, 30, 340], ['anything’s fine!', -1, -10, 370],
  ['haha totally', 1, 16, 320], ['all good!', -1, -24, 260], ['sorry!!', 1, 20, 240], ['SORRY!', -1, 0, 280],
]
const PILE_FLY = (() => { const r = rng(17); return PILE.map(() => ({ vx: (r() - 0.5) * 1600, vy: -300 - r() * 700, spin: (r() - 0.5) * 8 })) })()

async function build(stage) {
  try {
    await Promise.all(["800 92px Inter", "800 104px Inter", "800 112px Inter", "italic 500 150px 'EB Garamond'", "italic 500 220px 'EB Garamond'", "700 52px 'Space Mono'", "700 40px 'Space Mono'", "900 40px Inter", "800 36px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Toronto: | so polite, | nobody says | what they *want.*', { top: 120, size: 92, accentSize: 130, accentColor: PINK, at: T.h0, gap: 0.09, late: 1, lateAt: T.h0Late, wobble: true, lineHeight: 0.98 })
  const H1 = popText(root, 'Everyone’s | *thinking* it…', { top: 150, size: 108, accentSize: 150, accentColor: GOLD, at: T.h1, gap: 0.1, late: 0, wobble: true })
  const H1b = popText(root, '…nobody’s | *saying* it.', { top: 150, size: 108, accentSize: 150, accentColor: PINK, at: T.h1b, gap: 0.1, late: 0, wobble: true })
  const H2 = popText(root, 'Dealbreakers | come *first.*', { top: 150, size: 112, accentSize: 160, accentColor: GOLD, at: T.h2, gap: 0.1, late: 1, lateAt: T.h2Late, wobble: true })
  const H3 = popText(root, 'Say what you | *mean.*', { top: 150, size: 112, accentSize: 220, accentColor: GOLD, at: T.h3, gap: 0.09, late: 1, lateAt: T.h3Late, wobble: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H1b, T.h1bOut], [H2, T.h2Out], [H3, T.out]]
  const BOX = { y: 1600, width: 960, height: 270, cps: CPS }
  const boxA = dialogueBox(root, { ...BOX, lines: LINES_A, open: T.boxA, close: T.boxAClose })
  const boxB = dialogueBox(root, { ...BOX, lines: LINES_B, open: T.boxB, close: T.boxBClose })
  const lesson = buildLesson(root, { ...T.lesson, dim: 0.55 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_POP = makeBurst(2, 20, 460), B_ST = makeBurst(3, 10, 150), B_LIKE = makeBurst(9, 18, 260)
  const B_STAMP = T.stamps.map((_, i) => makeBurst(30 + i, 14, 300))
  const goldK = t => ease.inOutQuad(prog(t, ...T.gold))
  const dimK = t => 0.75 * ease.inOutQuad(prog(t, ...T.dim)) * (1 - ease.inOutQuad(prog(t, ...T.undim)))

  // ═════════════ the world
  function skyline(t) {
    const gk = goldK(t)
    const cx = NEEDLE.x
    x.save()
    x.beginPath(); x.moveTo(cx - 30, SB); x.lineTo(cx - 9, SB - 470); x.lineTo(cx + 9, SB - 470); x.lineTo(cx + 30, SB); x.closePath()
    x.fillStyle = NIGHT; x.fill(); glowStroke(x, VIOLET, 4, 12); x.stroke(); x.shadowBlur = 0
    x.beginPath(); x.ellipse(cx, SB - 480, 54, 22, 0, 0, TAU); x.fillStyle = NIGHT; x.fill(); glowStroke(x, VIOLET, 4, 12); x.stroke(); x.shadowBlur = 0
    x.fillStyle = rgba(GOLD, 0.8); for (let i = -3; i <= 3; i++) x.fillRect(cx + i * 13 - 4, SB - 484, 8, 8)
    x.beginPath(); x.rect(cx - 7, SB - 600, 14, 110); x.fillStyle = NIGHT; x.fill(); glowStroke(x, VIOLET, 3, 10); x.stroke(); x.shadowBlur = 0
    x.beginPath(); x.moveTo(cx, SB - 600); x.lineTo(cx, SB - NEEDLE.h); x.strokeStyle = VIOLET; x.lineWidth = 4; x.stroke()
    x.beginPath(); x.arc(cx, SB - NEEDLE.h, 7, 0, TAU); x.fillStyle = rgba(MAPLE, 0.5 + 0.5 * Math.sin(t * 5)); x.fill()
    for (const tw of TOWERS) {
      const top = SB - tw.h
      x.fillStyle = rgba(NIGHT, 0.85); x.fillRect(tw.x, top, tw.w, tw.h)
      glowStroke(x, rgba(VIOLET, 0.7), 3, 10); x.strokeRect(tw.x, top, tw.w, tw.h); x.shadowBlur = 0
      for (const [wx, wy, q] of tw.win) {
        const on = 0.5 + 0.5 * Math.sin(t * (0.5 + q) + q * 30)
        x.fillStyle = rgba(gk > 0 ? mixHex(LAV, GOLD, gk) : (q > 0.7 ? CYAN : LAV), (0.18 + 0.3 * on) * (1 + 1.4 * gk)); x.fillRect(tw.x + wx, top + wy, 10, 14)
      }
    }
    glowStroke(x, rgba(LAV, 0.6), 3, 10); x.beginPath(); x.moveTo(0, SB); x.lineTo(1080, SB); x.stroke(); x.shadowBlur = 0
    x.restore()
  }
  function table(t) {
    x.save()
    // pedestal
    x.strokeStyle = BONE; x.lineWidth = 12; x.lineCap = 'round'
    x.beginPath(); x.moveTo(TB.x, TB.cloth); x.lineTo(TB.x, 1580); x.moveTo(TB.x - 110, 1580); x.lineTo(TB.x + 110, 1580); x.stroke()
    // checked cloth
    const L = TB.x - TB.w / 2, R = TB.x + TB.w / 2
    x.save(); x.beginPath(); x.moveTo(L - 10, TB.top); x.lineTo(R + 10, TB.top); x.lineTo(R + 30, TB.cloth)
    for (let px = R + 30; px >= L - 30; px -= 45) x.quadraticCurveTo(px - 22, TB.cloth + 26, px - 45, TB.cloth)
    x.closePath(); x.fillStyle = '#5a1430'; x.fill(); x.clip()
    x.fillStyle = rgba(MAPLE, 0.55)
    for (let yy = TB.top; yy < TB.cloth + 30; yy += 36) for (let xx = L - 30; xx < R + 30; xx += 36) if (((xx - L) / 36 + (yy - TB.top) / 36) % 2 < 1) x.fillRect(xx, yy, 36, 36)
    x.restore()
    glowStroke(x, rgba(MAPLE, 0.9), 4, 14); x.beginPath(); x.moveTo(L - 10, TB.top); x.lineTo(R + 10, TB.top); x.stroke(); x.shadowBlur = 0
    x.fillStyle = BONE; x.beginPath(); x.roundRect(L - 24, TB.top - 14, TB.w + 48, 20, 10); x.fill()
    // a candle
    x.fillStyle = BONE; x.fillRect(TB.x - 14, TB.top - 74, 28, 60)
    const fl = 1 + 0.12 * Math.sin(t * 17)
    x.save(); x.globalCompositeOperation = 'lighter'
    const g = x.createRadialGradient(TB.x, TB.top - 90, 2, TB.x, TB.top - 90, 80 * fl); g.addColorStop(0, rgba(WARM, 0.8)); g.addColorStop(1, rgba(WARM, 0))
    x.fillStyle = g; x.beginPath(); x.arc(TB.x, TB.top - 90, 80 * fl, 0, TAU); x.fill(); x.restore()
    x.fillStyle = '#ffe9a8'; x.beginPath(); x.ellipse(TB.x, TB.top - 88, 8, 16 * fl, 0, 0, TAU); x.fill()
    x.restore()
  }
  function pisces(t) {
    // a tiny table for one, at the back right
    x.save(); x.strokeStyle = rgba(BONE, 0.7); x.lineWidth = 6
    x.beginPath(); x.moveTo(PIS.x - 90, PIS.y + 70); x.lineTo(PIS.x + 60, PIS.y + 70); x.moveTo(PIS.x - 15, PIS.y + 70); x.lineTo(PIS.x - 15, PIS.y + 170); x.stroke(); x.restore()
    const happy = t > T.too + 0.2
    const r = drawStarChar(x, PIS.x - 15, PIS.y, PIS.size, t, { color: PISCES.color, mood: happy ? 'heart' : 'squint', look: [-1, 0], seed: 9, glow: 0.7, hops: [T.pop + 0.05, T.stamps[2] + 0.1, T.too + 0.15] })
    drawTears(x, r, t, 0.5, T.out[0], 4)
  }
  function dateStars(t) {
    // Libra (left) + Virgo (right)
    let lm = 'happy', vm = 'happy', ll = [1, 0], vl = [-1, 0]
    if (t < T.pop) { const i = T.bubs.filter(b => b <= t).length; lm = i > 6 ? 'wide' : i % 2 ? 'squint' : 'happy'; vm = i > 6 ? 'wide' : i % 2 ? 'happy' : 'squint' }
    else if (t < T.pop + 0.5) { lm = vm = 'wide'; ll = vl = [0, -1] }
    else if (t < T.think[0]) { lm = vm = 'neutral'; ll = vl = [0, -1] }
    else if (t < T.cut1) { lm = 'squint'; vm = 'squint'; ll = [1, 0]; vl = [-1, 0]; if (t > T.said[0]) { lm = vm = 'happy' } }
    else if (t < T.cut2) { lm = 'neutral'; vm = 'neutral' }
    else if (t < T.like) { lm = 'squint'; vm = 'neutral' }
    else if (t < T.too) { lm = 'happy'; vm = t > T.sorr && t < T.sorr + 0.35 ? 'wide' : 'sparkle' }
    else { lm = vm = 'heart' }
    const sweat = t < T.pop ? 3 * Math.sin(t * 40) * clamp((t - 3) / 3) : 0
    drawStarChar(x, SEAT.lb + sweat, SEAT.y, SEAT.size, t, { color: LIBRA.color, glyph: LIBRA.glyph, mood: lm, look: ll, hops: HOPS_LB, seed: 4, glow: 1 })
    drawStarChar(x, SEAT.vg - sweat, SEAT.y, SEAT.size, t, { color: VIRGO.color, glyph: VIRGO.glyph, mood: vm, look: vl, hops: HOPS_VG, seed: 5, glow: 1 })
  }
  // the polite pile
  function pile(t) {
    if (t < T.bubs[0] - 0.3 || t > T.pop + 0.6) return
    const fp = prog(t, T.pop, T.pop + 0.6)
    const sway = Math.sin(t * 3.2) * 0.012 * clamp((t - 2) / 3)
    PILE.forEach(([txt, side, dx, w], i) => {
      const tb = T.bubs[i]
      if (t < tb - 0.25) return
      const fall = ease.outBounce ? ease.outBounce(prog(t, tb - 0.25, tb)) : ease.outCubic(prog(t, tb - 0.25, tb))
      const restY = 1170 - i * 64
      let px = 540 + dx + Math.sin(sway * 40) * i * 6 * 0.0 + sway * i * 300, py = lerp(restY - 500, restY, fall), rot = sway * i
      if (fp > 0) { const f = PILE_FLY[i]; px += f.vx * fp; py += f.vy * fp + 1400 * fp * fp; rot += f.spin * fp }
      const a = 1 - fp
      x.save(); x.globalAlpha *= a; x.translate(px, py); x.rotate(rot)
      drawChat(x, 0, 0, w, 72, txt, clamp(fall * 3), { tail: side, size: 0.46, fillC: i % 2 ? '#e8e2ff' : '#ffe9d6' })
      x.restore()
    })
    drawBurst(x, B_POP, 540, 820, t, T.pop, [PINK, GOLD, BONE, LAV], 0.9)
  }
  // THE STARS over the table
  function narrator(t) {
    if (t < T.stars || t > T.cut2) return
    const k = pop01(t, T.stars, 0.4, 2.2)
    const low = ease.inOutCubic(prog(t, T.cut1 - 0.1, T.cut1 + 0.1))
    const px = lerp(540, 870, low), py = lerp(545, 1380, low), size = lerp(170, 200, low)
    let mood = 'happy', look = [0, 1]
    if (t < T.l1) mood = 'wide'
    else if (t > T.roll[0] && t < T.roll[1]) mood = 'eyeroll'
    else if (t > T.think[0] && t < T.l2) { mood = 'squint'; look = [0, 1] }
    else if (t > T.cut1) { mood = t > T.stamps[2] && t < T.stamps[2] + 0.8 ? 'wide' : 'happy'; look = [-1, -1] }
    drawStarChar(x, px, py, size, t, { color: STAR.sky, mood, look, pop: k, hops: HOPS_ST, seed: 2, glow: 1.2 })
    drawBurst(x, B_ST, 540, 545, t, T.stars, [GOLD, BONE])
  }
  function cloud(cx, cy, w, h, text, k, tail) {
    if (k <= 0) return
    x.save(); x.translate(cx, cy); x.scale(k, k); x.globalAlpha *= clamp(k * 2)
    const puffs = [[-0.36, 0.05, 0.36], [-0.12, -0.18, 0.4], [0.16, -0.16, 0.38], [0.38, 0.06, 0.34], [0, 0.2, 0.42]]
    x.fillStyle = '#fbf6ff'; x.shadowColor = rgba(GOLD, 0.8); x.shadowBlur = 26
    x.beginPath(); for (const [px, py, r] of puffs) { x.moveTo(px * w + r * h, py * h); x.arc(px * w, py * h, r * h, 0, TAU) }
    x.roundRect(-w * 0.42, -h * 0.28, w * 0.84, h * 0.6, h * 0.3); x.fill(); x.shadowBlur = 0
    for (const [i, r] of [[1, 16], [2, 10]]) { x.beginPath(); x.arc(tail * i * 34, h * 0.45 + i * 30, r, 0, TAU); x.fill() }
    x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.font = `800 40px ${INTER}`; x.fillText(text, 0, 4)
    x.restore()
  }
  function thoughts(t) {
    if (t < T.think[0] || t > T.thinkOut[1]) return
    const o = 1 - ease.inQuad(prog(t, ...T.thinkOut))
    cloud(270, 800, 380, 140, 'kids someday?', pop01(t, T.think[0], 0.4, 2.2) * o, 1)
    cloud(830, 700, 390, 140, 'is this serious?', pop01(t, T.think[1], 0.4, 2.2) * o, -1)
    // said out loud
    const s1 = pop01(t, T.said[0], 0.3, 2.4) * o, s2 = pop01(t, T.said[1], 0.3, 2.4) * o
    drawChat(x, 320, 960, 300, 76, 'haha totally', s1, { tail: -1, size: 0.46 })
    drawChat(x, 770, 960, 250, 76, 'all good!', s2, { tail: 1, size: 0.46 })
  }
  function dealCard(w, h) {
    x.shadowColor = 'rgba(0,0,0,0.55)'; x.shadowBlur = 40; x.shadowOffsetY = 16
    x.fillStyle = 'rgba(18,12,40,0.96)'; x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.fill(); x.shadowOffsetY = 0
    glowStroke(x, GOLD, 9, 26); x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 36); x.stroke(); x.shadowBlur = 0
    x.textAlign = 'center'; x.textBaseline = 'middle'
    x.fillStyle = GOLD; x.font = `700 40px ${MONO}`; x.fillText('DEALBREAKERS', 0, -h / 2 + 70)
    x.fillStyle = rgba(BONE, 0.7); x.font = `italic 500 40px 'EB Garamond', serif`; x.fillText('What ends it before it starts?', 0, -h / 2 + 128)
    for (const y of [-60, 90, 240]) { x.strokeStyle = rgba(BONE, 0.3); x.lineWidth = 4; x.beginPath(); x.roundRect(-w * 0.42, y - 44, w * 0.84, 88, 44); x.stroke() }
  }
  function dealbreakers(t) {
    const dk = dimK(t)
    if (dk > 0) { x.fillStyle = `rgba(8,5,20,${dk.toFixed(3)})`; x.fillRect(0, 0, 1080, 1920) }
    if (t < T.card[0] || t > T.cardOut[1]) return
    const ink = easeOutBack(prog(t, ...T.card), 1.7), outp = ease.inCubic(prog(t, ...T.cardOut))
    x.save(); x.translate(540, lerp(-500, 880, ink) - 900 * outp); x.rotate((1 - clamp(ink)) * -0.2)
    dealCard(700, 700)
    const TXT = ['✕ NOTHING SERIOUS', '✕ FLAKY PLANS', '✕ “ANYTHING’S FINE”']
    T.stamps.forEach((st, i) => {
      const p = prog(t, st - 0.12, st)
      if (p <= 0) return
      const big = lerp(2.2, 1, ease.inCubic(p)), shake = t > st && t < st + 0.25 ? 6 * Math.sin((t - st) * 80) * (1 - (t - st) / 0.25) : 0
      x.save(); x.translate(shake, [-60, 90, 240][i]); x.rotate([-0.04, 0.03, -0.05][i]); x.scale(big, big); drawStamp(x, TXT[i], clamp(p * 2), i === 2 ? 38 : 40); x.restore()
    })
    x.restore()
    T.stamps.forEach((st, i) => drawBurst(x, B_STAMP[i], 540, 880 + [-60, 90, 240][i], t, st, [RED, GOLD, BONE]))
    // Libra pops up bottom-left, wide-eyed at the third stamp
    const lk = pop01(t, T.card[1], 0.4, 2.2) * popOut(t, T.cardOut)
    const lm = t > T.stamps[2] && t < T.stamps[2] + 0.6 ? 'wide' : t > T.l3 ? 'sparkle' : 'happy'
    drawStarChar(x, 200, 1390, 220, t, { color: LIBRA.color, glyph: LIBRA.glyph, mood: lm, look: [1, -1], pop: lk, hops: HOPS_LB, seed: 14, glow: 1.1 })
  }
  function finale(t) {
    if (t < T.cut2) return
    const o = popOut(t, T.out)
    if (t > T.too) floatHearts(x, t, 540, 1150, T.too + 0.1, T.out[0], 4, 9, 300)
    drawChat(x, 330, 900, 300, 84, 'I like you.', pop01(t, T.like, 0.3, 2.4) * o, { tail: -1, size: 0.44, fillC: '#ffe9d6' })
    const sk = pop01(t, T.sorr, 0.25, 2.4) * (1 - prog(t, T.too - 0.1, T.too))
    drawChat(x, 760, 780, 220, 84, 'sorr—', sk, { tail: 1, size: 0.44 })
    drawChat(x, 740, 780, 380, 84, 'I like you too.', pop01(t, T.too, 0.32, 2.6) * o, { tail: 1, size: 0.42, fillC: '#e8e2ff' })
    drawBurst(x, B_LIKE, 540, 1000, t, T.too, [PINK, GOLD, BONE], 0.9)
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const wk = outK(t, T.out)
      if (wk > 0) {
        x.save(); x.globalAlpha = wk
        skyline(t)
        pisces(t)
        dateStars(t)
        table(t)
        pile(t)
        thoughts(t)
        narrator(t < T.cut1 ? t : -1)
        dealbreakers(t)
        if (t >= T.cut1) narrator(t)
        finale(t)
        x.restore()
      }
      boxA.update(t); boxB.update(t)
      lesson.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card motif: two cuts: the mind-reading box has shut → "Dealbreakers come first."; the lesson has cleared → "Say what you mean."
const CUTS = [{ t: T.cut1, kind: 'deal', keep: true }, { t: T.cut2, kind: 'flip', keep: true }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'VOTE FOR YOUR CITY' }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const accent = (t, hz = 1174.66) => [['pop', r3(t), hz, 0.06, 0], ['pluck', r3(t), hz * 0.75, 0.045, 0.6, 0]]
export const CUES = [
  // hook: the polite pile (each bubble a thud, a step higher)
  ...wordPops(T.h0, 8, 0.09, 0, 0.022), ...accent(T.h0Late),
  ...T.bubs.flatMap((b, i) => [['tick', b, 0.05], ['pop', b, NOTE[i % NOTE.length], 0.04, i % 2 ? 0.3 : -0.3]]),
  ['riser', 4.0, T.pop, 0.035], ['boom', T.pop, 0.14], ['glitter', T.pop, r3(T.pop + 0.8)], ['whoosh', T.pop, 0.5, 0.04],
  // thinking it / saying it
  ['pop', T.stars, 880, 0.05, 0], ['bell', r3(T.stars + 0.03), 1760, 0.03, 1.0, 0],
  ...wordPops(T.h1, 3, 0.1, 1), ['pop', T.boxA, 739.99, 0.035, 0], ['pop', r3(T.boxA + 0.06), 987.77, 0.03, 0],
  ...T.think.map((th, i) => ['bell', th, i ? 1318.51 : 1174.66, 0.035, 1.0, i ? 0.4 : -0.4]),
  ...wordPops(T.h1b, 3, 0.1, 3), ...T.said.map((s, i) => ['pop', s, i ? 987.77 : 880, 0.045, i ? 0.4 : -0.4]),
  ['pluck', T.roll[0], 196, 0.045, 0.5, 0], ['pluck', r3(T.roll[0] + 0.18), 174.61, 0.04, 0.6, 0],    // bwomp
  // dealbreakers
  ...wordPops(T.h2, 2, 0.1, 2), ...accent(T.h2Late, 1318.51), ['whoosh', r3(T.card[0] - 0.05), 0.4, 0.04], ['pop', r3(T.card[0] + 0.3), 739.99, 0.05, 0],
  ...T.stamps.flatMap((s, i) => [['whoosh', r3(s - 0.2), 0.2, 0.04], ['boom', s, i === 2 ? 0.16 : 0.11], ['tick', s, 0.09], ['bell', r3(s + 0.04), [659.25, 739.99, 987.77][i], 0.04, 1.0, 0]]),
  ['pop', T.boxB, 739.99, 0.035, 0], ['whoosh', T.cardOut[0], 0.4, 0.035],
  // the lesson
  ...lessonCues(T.lesson.at, { ...T.lesson, key: 'G' }),
  // say what you mean
  ...wordPops(T.h3, 3, 0.09, 1), ...accent(T.h3Late, 1318.51),
  ['pop', T.like, 880, 0.05, -0.3], ['pop', T.sorr, 659.25, 0.04, 0.3], ['tick', r3(T.too - 0.12), 0.05],
  ['pop', T.too, 1174.66, 0.06, 0.3], ['bell', T.too, 1567.98, 0.05, 1.6, 0], ['bell', r3(T.too + 0.05), 2093, 0.035, 1.6, 0.1], ['glitter', T.too, r3(T.too + 0.9)],
  ['whoosh', T.out[0], 0.4, 0.035],
  ...talkCues(LINES_A, { cps: CPS }), ...talkCues(LINES_B, { cps: CPS }),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
