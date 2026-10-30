// srhtxmuseum (30 s vertical, Star Talk Remix of htxmuseum "Museum District first date") · story 0–25.6, then the
// shared end card. The guide is THE STARS as a museum tour guide (a gold star with a little pink tour flag). On the
// date: ♍ Virgo (overthinks everything) and ♒ Aquarius (loves a blank canvas). ♓ Pisces sobs at a painting of fruit.
//   0.00–5.30  "Classic Houston | first date: the | *Museum District.*"  A columned front builds on the beats; the guide
//              pops up with its flag: "welcome to the tour. no touching the art." Virgo and Aquarius on the steps.
//   5.30–11.1  "…and you're still | *guessing* | who they are."  Three frames: an abstract, a BLANK canvas, a fruit bowl.
//              AQUARIUS: "this one's about *nothing.* I love it." Virgo double-takes; each artwork spins into a "?" on the
//              beat. VIRGO (sweating): "is that a hint? are *they* about nothing?"  Pisces weeps at the fruit.
//   11.12      card cut (deal)
//   11.1–17.0  "You see who they | are *first.*"  A gilded frame under a velvet drape; the drape lifts on the veiled
//              mystery card, hung like a painting. Placards pop (matching the card): SUN · Libra, RISING · Aquarius, DEALBREAKER · ✕ one-word
//              texts. THE STARS: "card first. face last. no guessing *required.*"
//   17.0–21.5  "Skip the | *small talk.*"  "so… art?", "cool.", "lol" bubbles pop up; the guide bonks each one with its
//              flag. The painting flips to a talk card ("What's a hill you will die on?"). VIRGO: "wait. you'd die on
//              *that* hill too?"
//   21.5       card cut (flip)
//   21.5–25.4  "Skip the | *guessing.*"  Virgo and Aquarius lean in, heart-eyed; a heart of pixel stars; the guide dabs
//              a tear with its flag; Pisces cries happy fountains. Everything out by 25.42.
// One canvas, DOM type + dialogue box above, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { fill, A } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, drawPixelStar, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import { popText } from '../../lesson.js'
import { starFrame, inSprite, tearsCells, sweatCells, drawFacade, drawFrame, drawArt, drawQ, drawPlacard, drawBubble, drawFlag,
  drawDrape, drawSpot, loadImage, prescale, drawCardImg, PROF, TALK, thud, BONE, GOLD, PINK, RED, LILAC, SKYB, TEAL } from './props.js'

export const DURATION = 30
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const BEAT = n => +(0.6 + n * 0.5556).toFixed(3)
const VIR = signStar('virgo'), AQU = signStar('aquarius'), PIS = signStar('pisces')

const T = {
  h0: 0.12, h0Late: 1.2, h0Out: [4.8, 5.0], build: [0.3, 2.3], guideIn: 0.9, virIn: 1.5, aquIn: 1.75, open: 1.8, l1: 2.0, act1Out: [4.75, 5.1],
  h1: 5.15, h1Out: [10.8, 11.0], arts: [5.1, 5.55], virIn2: 5.12, l2: 5.9, take: 7.3, q: [BEAT(13), BEAT(14), BEAT(15)], l3: 9.1, act2Out: [10.85, 11.1],
  cut1: 11.12,
  h2: 11.2, h2Late: 11.55, h2Out: [16.75, 16.95], drape: [12.0, 12.6], plac: [BEAT(22), BEAT(23), BEAT(24)], l4: 12.7, placOut: [16.8, 17.05], slide: [16.9, 17.4],
  h3: 17.1, h3Late: 17.45, h3Out: [21.2, 21.4], bubs: [17.6, 18.05, 18.5], bonks: [BEAT(33), BEAT(33.5), BEAT(34)], flip: [19.3, 19.7], l5: 19.75,
  cut2: 21.5,
  h4: 21.6, h4Late: 22.0, h4Out: [25.2, 25.42], heart: 22.4, close: 23.3,
  out: [25.0, 25.42],
}
const SKYN = 'THE STARS · YOUR GUIDE', VIRN = '♍ VIRGO STAR', AQUN = '♒ AQUARIUS STAR'
const LINES = [
  { t: T.l1, speaker: SKYN, text: 'welcome to the tour. no touching the *art.*' },
  { t: T.l2, speaker: AQUN, color: AQU.color, text: "this one's about *nothing.* I love it." },
  { t: T.l3, speaker: VIRN, color: VIR.color, text: 'is that a hint? are *they* about nothing?' },
  { t: T.l4, speaker: SKYN, text: 'card first. face last. no guessing *required.*' },
  { t: T.l5, speaker: VIRN, color: VIR.color, text: "wait. you'd die on *that* hill too?" },
]
const CPS = 30

const pop01 = (t, t0, d = 0.32, s = 1.9) => easeOutBack(prog(t, t0, t0 + d), s)
const outK = (t, [a, b]) => 1 - ease.inQuad(prog(t, a, b))
const popOut = (t, [a, b]) => { const p = prog(t, a, b); return p <= 0 ? 1 : p >= 1 ? 0 : (1 + 0.18 * Math.sin(Math.PI * Math.min(1, p * 2.2))) * (1 - ease.inCubic(p)) }

const FR = [{ cx: 215, cy: 820, w: 250, h: 320 }, { cx: 540, cy: 790, w: 270, h: 380 }, { cx: 865, cy: 820, w: 250, h: 290 }]
const BIGF = { cx: 420, cy: 880, w: 420, h: 600 }
const CARD_H = 540
const PLAC = [{ y: 700, label: 'SUN', val: 'Libra', col: '#c0407a' }, { y: 860, label: 'RISING', val: 'Aquarius', col: '#1f9cc4' }, { y: 1020, label: 'DEALBREAKER', val: '✕ one-word texts', col: RED, mark: true }]
const BUBS = [{ txt: 'so… art?', x: 800, y: 660, r: 6, tailR: true }, { txt: 'cool.', x: 200, y: 760, r: -5, tailR: false }, { txt: 'lol', x: 880, y: 1010, r: 4, tailR: true }]

// stage positions per act (x, y, size)
function guidePos(t) {
  if (t < T.cut1) return t < T.act1Out[1] ? [150, 1290, 190] : [130, 1110, 130]
  if (t < T.slide[0]) return [140, 1320, 170]
  if (t < T.cut2) return [930, 1310, 160]
  return [935, 650, 150]
}
function virPos(t) {
  if (t < T.act1Out[1]) return [700, 1300, 150]
  if (t < T.cut1) return [330, 1300, 210]
  if (t < T.slide[0]) return [650, 1320, 170]
  if (t < T.cut2) { const p = ease.inOutCubic(prog(t, ...T.slide)); return [lerp(650, 310, p), 1320, lerp(170, 190, p)] }
  return [390, 1180, 260]
}
function aquPos(t) {
  if (t < T.act1Out[1]) return [880, 1300, 150]
  if (t < T.cut1) return [720, 1300, 210]
  if (t < T.slide[0]) return [880, 1320, 170]
  if (t < T.cut2) { const p = ease.inOutCubic(prog(t, ...T.slide)); return [lerp(880, 660, p), 1320, lerp(170, 190, p)] }
  return [700, 1180, 260]
}
// pop-in / pop-out per act for the three main stars
function actK(t, tin) {
  if (t < T.act1Out[1]) return pop01(t, tin, 0.36, 2.1) * popOut(t, T.act1Out)
  if (t < T.cut1) return pop01(t, T.virIn2, 0.36, 2.1) * popOut(t, T.act2Out)
  return pop01(t, T.cut1 + 0.05, 0.36, 2.1) * popOut(t, T.out)
}

function virMood(t) {
  if (t < T.act1Out[1]) return { mood: 'squint', look: [1, -1] }
  if (t < T.cut1) {
    if (t < T.l2 + 0.6) return { mood: 'neutral', look: [1, -1] }
    if (t < T.take) return { mood: 'neutral', look: [1, 0] }
    if (t < T.take + 0.25) return { mood: 'neutral', look: [1, -1] }
    if (t < T.q[0]) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.l3) return { mood: 'wide', look: [0, -1], blink: false }
    return { mood: 'squint', look: [1, 0] }
  }
  if (t < T.drape[1]) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.slide[0]) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.flip[1]) return { mood: 'squint', look: [1, 0] }
  if (t < T.cut2) return { mood: 'wide', look: [1, -1], blink: false }
  return { mood: 'heart', look: [1, 0] }
}
function aquMood(t) {
  if (t < T.act1Out[1]) return { mood: 'heart', look: [0, -1] }
  if (t < T.cut1) return t < T.q[1] ? { mood: 'heart', look: [-1, -1] } : { mood: 'sparkle', look: [-1, -1] }
  if (t < T.drape[1]) return { mood: 'neutral', look: [-1, -1] }
  if (t < T.slide[0]) return { mood: 'sparkle', look: [-1, -1] }
  if (t < T.l5 + 0.4) return { mood: 'happy', look: [-1, 0] }
  if (t < T.cut2) return { mood: 'heart', look: [-1, 0] }
  return { mood: 'heart', look: [-1, 0] }
}
function guideMood(t) {
  if (t < T.cut1) return { mood: 'happy', look: [1, 0] }
  if (t < T.slide[0]) return t < T.drape[0] ? { mood: 'wink' } : { mood: 'happy', look: [1, -1] }
  if (t < T.cut2) return t >= T.bonks[0] - 0.1 && t < T.bonks[2] + 0.4 ? { mood: 'squint', look: [-1, -1] } : { mood: 'neutral', look: [-1, -1] }
  return { mood: 'sparkle', look: [-1, 1] }
}

const VIR_HOPS = [T.virIn + 0.3, T.virIn2 + 0.3, ...talkHops(LINES, VIRN, { cps: CPS }), T.take, T.flip[1] + 0.1, T.heart]
const AQU_HOPS = [T.aquIn + 0.3, T.virIn2 + 0.35, ...talkHops(LINES, AQUN, { cps: CPS }), T.drape[1] + 0.05, T.heart + 0.1]
const GUIDE_HOPS = [T.guideIn + 0.3, ...talkHops(LINES, SKYN, { cps: CPS }), ...T.plac, ...T.bonks, T.heart + 0.3]

async function build(stage) {
  try {
    await Promise.all(["800 112px Inter", "800 52px Inter", "800 30px Inter", "italic 500 190px 'EB Garamond'", "italic 600 50px 'EB Garamond'", "700 52px 'Space Mono'", "700 26px 'Space Mono'"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const [imP0, imT0] = await Promise.all([loadImage(A + 'card-profile-3.png'), loadImage(A + 'card-talk-1.png')])
  const imP = prescale(imP0, 420), imT = prescale(imT0, 400)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  const H0 = popText(root, 'Classic Houston | first date: the | *Museum* *District.*', { top: 140, size: 98, accentSize: 140, at: T.h0, gap: 0.09, accentColor: GOLD, wobble: true, late: 2, lateAt: T.h0Late, lineHeight: 1.0, fit: true })
  const H1 = popText(root, '…and you’re still | *guessing* | who they are.', { top: 140, size: 96, accentSize: 150, at: T.h1, gap: 0.08, accentColor: PINK, lineHeight: 1.0, fit: true })
  const H2 = popText(root, 'You see who they | are *first.*', { top: 170, size: 100, accentSize: 140, at: T.h2, gap: 0.08, accentColor: GOLD, wobble: true, late: 1, lateAt: T.h2Late, fit: true })
  const H3 = popText(root, 'Skip the | *small* *talk.*', { top: 150, size: 116, accentSize: 156, at: T.h3, gap: 0.1, accentColor: SKYB, wobble: true, late: 2, lateAt: T.h3Late })
  const H4 = popText(root, 'Skip the | *guessing.*', { top: 190, size: 132, accentSize: 184, at: T.h4, gap: 0.1, accentColor: PINK, wobble: true, late: 1, lateAt: T.h4Late })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.h4Out]]
  const box = dialogueBox(root, { lines: LINES, y: 1450, width: 960, height: 270, open: T.open, close: T.close, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  function sparkles(t, cx, cy, t0, n, R, seed, cols = [GOLD, BONE, PINK]) {
    const tt = t - t0
    if (tt < 0 || tt > 0.7) return
    const p = ease.outCubic(tt / 0.7)
    x.save(); x.globalAlpha = 1 - ease.inQuad(tt / 0.7)
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + seed
      drawPixelStar(x, cx + Math.cos(a) * R * (0.7 + 0.5 * p), cy + Math.sin(a) * R * (0.7 + 0.5 * p), 26 * (1 - 0.4 * p), i % 2 ? 1 : 2, cols[i % cols.length])
    }
    x.restore()
  }

  function drawGuide(t) {
    const k = t < T.cut1 ? (t < T.act1Out[1] ? pop01(t, T.guideIn, 0.36, 2.1) * popOut(t, T.act1Out) : pop01(t, T.virIn2 + 0.1, 0.36, 2.1) * popOut(t, T.act2Out))
      : t < T.cut2 ? pop01(t, T.cut1 + 0.1, 0.36, 2.1) * (t < T.slide[0] ? popOut(t, [T.slide[0] - 0.25, T.slide[0]]) : pop01(t, T.slide[0] + 0.05, 0.36, 2.1))
      : pop01(t, T.cut2 + 0.1, 0.36, 2.1) * popOut(t, T.out)
    if (k <= 0.02) return
    const [gx0, gy0, gs] = guidePos(t), st = guideMood(t)
    const opts = { hops: GUIDE_HOPS, seed: 2, pop: k }
    const F = starFrame(gx0, gy0, gs, t, opts)
    // the flag: held on the far side; in act 4 it swings to bonk the bubbles; in act 5 it dabs a tear
    let side = gx0 > 540 ? -1 : 1, lean = 0
    if (t >= T.bonks[0] - 0.2 && t < T.cut2) { const b = T.bonks.reduce((m, s) => (t >= s - 0.2 ? s : m), T.bonks[0]); lean = -0.9 * Math.exp(-Math.max(0, t - b) * 6) * (t >= b - 0.2 ? 1 : 0) }
    const px = gx0 + side * gs * 0.48, py = F.cy + gs * 0.3
    x.save(); x.translate(px, py); x.rotate(side * (0.12 + lean * -side) + (t >= T.cut2 ? -side * 0.5 * Math.max(0, Math.sin((t - T.cut2) * 2.2)) : 0)); x.translate(-px, -py)
    drawFlag(x, px, py, gs * 1.15 * clamp(k), t, clamp(k))
    x.restore()
    drawStarChar(x, gx0, gy0, gs, t, { color: STAR.sky, mood: st.mood, look: st.look, glow: 1.15, ...opts })
    if (t >= T.cut2) inSprite(x, F, () => tearsCells(x, t, 1))
  }
  function drawSign(t, which) {
    const isV = which === 'v'
    const k = actK(t, isV ? T.virIn : T.aquIn)
    if (k <= 0.02) return
    const [px, py, ps] = isV ? virPos(t) : aquPos(t)
    const st = isV ? virMood(t) : aquMood(t)
    let lean = 0
    if (t >= T.cut2) lean = (isV ? 1 : -1) * 22 * ease.inOutCubic(prog(t, T.heart - 0.4, T.heart + 0.2))
    let squash = 0
    if (isV && t >= T.take && t < T.take + 0.6) squash = -0.14 * Math.exp(-(t - T.take) * 6) * Math.cos((t - T.take) * 22)
    const sb = { V: VIR, A: AQU }[isV ? 'V' : 'A']
    const opts = { hops: isV ? VIR_HOPS : AQU_HOPS, seed: isV ? 4 : 5, pop: k, squash }
    drawStarChar(x, px + lean, py, ps, t, { color: sb.color, glyph: ps >= 150 ? sb.glyph : null, mood: st.mood, look: st.look, blink: st.blink, ...opts })
    if (isV && t >= T.l3 - 0.2 && t < T.cut1) inSprite(x, starFrame(px, py, ps, t, opts), () => sweatCells(x, t, 2))
  }
  function drawPisces(t) {
    let P, k
    if (t < T.cut1) { P = [985, 1110, 110]; k = pop01(t, T.virIn2 + 0.4, 0.36, 2.1) * popOut(t, T.act2Out) }
    else if (t >= T.cut2) { P = [130, 880, 120]; k = pop01(t, T.cut2 + 0.3, 0.36, 2.1) * popOut(t, T.out) }
    else return
    if (k <= 0.02) return
    const tears = t < T.cut1 ? 2 : 3
    const opts = { hops: [T.heart + 0.2], seed: 6, pop: k, squash: 0.04 * Math.max(0, Math.sin(t * 15)) }
    drawStarChar(x, P[0], P[1], P[2], t, { color: PIS.color, glyph: null, mood: t < T.cut1 ? 'squint' : 'happy', look: [0, -1], ...opts })
    inSprite(x, starFrame(P[0], P[1], P[2], t, opts), () => tearsCells(x, t, tears))
  }

  function act1(t) {
    const a = outK(t, T.act1Out)
    drawFacade(x, t, prog(t, ...T.build), a)
  }
  function act2(t) {
    const a = clamp(prog(t, 5.0, 5.3)) * outK(t, T.act2Out)
    if (a <= 0) return
    x.save(); x.globalAlpha = a
    FR.forEach((f, i) => {
      drawFrame(x, f, { a: 1 })
      const tq = T.q[i]
      const kArt = clamp(prog(t, ...T.arts) * 1.4) * (1 - ease.inQuad(prog(t, tq - 0.2, tq + 0.05)))
      drawArt(x, i, f, t, kArt)
      drawQ(x, f, easeOutBack(prog(t, tq, tq + 0.3), 2.2), [PINK, GOLD, LILAC][i], t, tq)
    })
    x.restore()
  }
  function bigFrame(t) {
    if (t < T.cut1) return
    const k = t < T.cut2 ? pop01(t, T.cut1 + 0.02, 0.4, 1.6) : 0
    if (k <= 0.02) return
    const cx = t < T.slide[0] ? BIGF.cx : lerp(BIGF.cx, 540, ease.inOutCubic(prog(t, ...T.slide)))
    const f = { ...BIGF, cx }
    drawSpot(x, cx, 420, 1260, 700, clamp(k))
    x.save(); x.translate(cx, f.cy); x.scale(k, k); x.translate(-cx, -f.cy)
    drawFrame(x, f, { a: 1 })
    // the card: profile → (flip) → talk card
    const fp = prog(t, ...T.flip), sx = Math.abs(Math.cos(fp * Math.PI)) || 0.001
    x.save(); x.translate(cx, f.cy + 6 * Math.sin(t * 1.8)); x.scale(sx, 1)
    if (fp < 0.5) drawCardImg(x, imP, PROF, CARD_H)
    else drawCardImg(x, imT, TALK, CARD_H)
    x.restore()
    drawDrape(x, f, prog(t, ...T.drape))
    x.restore()
  }
  function placards(t) {
    if (t < T.cut1 || t > T.placOut[1]) return
    PLAC.forEach((p, i) => {
      const k = pop01(t, T.plac[i], 0.34, 2.2) * outK(t, T.placOut)
      if (k <= 0.02) return
      x.save(); x.translate(870, p.y); x.rotate((i - 1) * 0.03); x.scale(k, k)
      drawPlacard(x, 330, 130, p.label, p.val, p.col, { mark: p.mark })
      x.restore()
    })
  }
  function bubbles(t) {
    if (t < T.bubs[0] || t > T.cut2) return
    BUBS.forEach((b, i) => {
      const bonk = T.bonks[i]
      const k = pop01(t, T.bubs[i], 0.32, 2.4) * (t < bonk ? 1 : 0)
      if (k > 0.02) {
        x.save(); x.translate(b.x, b.y + 6 * Math.sin(t * 2 + i)); x.rotate(b.r * Math.PI / 180); x.scale(k, k); drawBubble(x, b.txt, b.tailR); x.restore()
      }
      sparkles(t, b.x, b.y, bonk, 10, 120, i + 1, [BONE, SKYB, GOLD])
    })
  }
  function heart(t) {
    if (t < T.heart) return
    const a = outK(t, T.out)
    const N = 26
    x.save(); x.globalAlpha = a
    for (let i = 0; i < N; i++) {
      const s = (i / N) * Math.PI * 2
      const ti = T.heart + i * 0.025
      if (t < ti) continue
      const k = easeOutBack(prog(t, ti, ti + 0.3), 2.4)
      const hx = 16 * Math.sin(s) ** 3, hy = -(13 * Math.cos(s) - 5 * Math.cos(2 * s) - 2 * Math.cos(3 * s) - Math.cos(4 * s))
      const tw = 0.8 + 0.2 * Math.sin(t * 6 + i)
      drawPixelStar(x, 545 + hx * 10, 860 + hy * 10, 36 * k * tw, i % 2 ? 1 : 2, i % 3 ? GOLD : PINK)
    }
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      const ok = popOut(t, T.out)
      void ok
      if (t < T.act1Out[1]) act1(t)
      if (t >= 5.0 && t < T.cut1) act2(t)
      bigFrame(t)
      placards(t)
      drawPisces(t)
      drawSign(t, 'v')
      drawSign(t, 'a')
      drawGuide(t)
      bubbles(t)
      heart(t)
      sparkles(t, 420, 880, T.drape[1] - 0.1, 14, 300, 1, [GOLD, PINK, BONE])
      sparkles(t, 540, 880, T.flip[1], 12, 280, 2, [GOLD, SKYB, BONE])
      box.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, 0, 0.3)))
      for (const [h, o] of HEADS) h.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card-motif candidates: 5.1 (front → gallery), 11.12 (the "?"s → the gilded frame; hides the re-block), 17.0 (placards
// out → small talk), 21.5 (the talk card → the pair). cardfx keeps 11.12 and 21.5 for a 30 s film.
const CUTS = [5.1, { t: T.cut1, kind: 'deal' }, 17.0, { t: T.cut2, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const FX = { bus: 'sfx', rev: 0.12, dly: 0 }
const wordPops = (t0, n, gap, base = 0, gain = 0.03) => Array.from({ length: n }, (_, i) => ['pop', +(t0 + i * gap).toFixed(3), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
const head = (t0, n, gap, land, base, gain = 0.026) => [...wordPops(t0, n, gap, base, gain), ['pop', land, 1174.66, 0.05, 0], ['pluck', land, 1174.66, 0.04, 0.6, 0]]
const sob = (t, f, n = 3) => Array.from({ length: n }, (_, i) => ['chip', +(t + i * 0.16).toFixed(3), f * (1 - i * 0.06), 0.12, { ...FX, wave: 'tri', slide: -6, gain: 0.016, decay: 0.08, sustain: 0.5 }])

export const CUES = [
  ['busFx', 'sfx', { gain: 25 }],
  ...head(T.h0, 7, 0.09, T.h0Late, 0),
  // the columns rise, the pediment thuds
  ...[0, 1, 2, 3].map(i => ['tom', +(T.build[0] + (0.25 + i * 0.125) * 2).toFixed(3), 140 + i * 15, { ...FX, gain: 0.12, decay: 0.15 }]),
  ['boom', +(T.build[0] + 1.5 + 0.3).toFixed(3), 0.1],
  ['pop', T.guideIn + 0.05, 880, 0.04, -0.3], ['pop', T.virIn + 0.05, 739.99, 0.035, 0.2], ['pop', T.aquIn + 0.05, 987.77, 0.035, 0.4],
  ['pop', T.open, 739.99, 0.04, 0], ['pop', T.open + 0.06, 987.77, 0.03, 0],
  ...talkCues(LINES, { cps: CPS, pitch: { [SKYN]: 660, [VIRN]: 880, [AQUN]: 1046.5 } }),
  // gallery
  ['whoosh', T.act1Out[0], 0.4, 0.05], ...wordPops(T.h1, 7, 0.08, 1),
  ['pluck', T.take, 1318.51, 0.04, 0.4, 0.2], ['chip', T.take, 600, 0.18, { ...FX, wave: 'square', duty: 0.25, slide: 10, gain: 0.02, decay: 0.12, sustain: 0.4 }],
  ...T.q.flatMap((s, i) => [['whoosh', s - 0.15, 0.2, 0.04], ['pop', s + 0.1, NOTE[2 + i * 2], 0.045, (i - 1) * 0.4]]),
  ...sob(6.4, 1400), ...sob(8.0, 1480, 2), ...sob(9.8, 1400, 2),
  // the reveal
  ...head(T.h2, 4, 0.08, T.h2Late, 2),
  ['whoosh', T.drape[0], 0.5, 0.06], ['bell', T.drape[1] - 0.05, 1318.51, 0.045, 1.8, 0], ['glitter', T.drape[1] - 0.1, T.drape[1] + 0.7],
  ...T.plac.map((s, i) => ['pop', s + 0.05, [880, 987.77, 587.33][i], 0.045, 0.3]), ['tom', T.plac[2] + 0.05, 120, { ...FX, gain: 0.15, decay: 0.18 }],
  // small talk
  ['whoosh', T.placOut[0], 0.3, 0.04], ...head(T.h3, 2, 0.1, T.h3Late, 4),
  ...T.bubs.map((s, i) => ['pop', s + 0.05, [659.25, 587.33, 739.99][i], 0.04, [0.3, -0.3, 0.4][i]]),
  ...T.bonks.flatMap((s, i) => [['chip', s, 900 + i * 120, 0.1, { ...FX, wave: 'square', duty: 0.5, slide: -10, gain: 0.025, decay: 0.08, sustain: 0.3 }], ['pop', s + 0.02, 1318.51, 0.04, (i - 1) * 0.4]]),
  ['whoosh', T.flip[0], 0.35, 0.05], ['bell', T.flip[1], 1567.98, 0.04, 1.4, 0], ['glitter', T.flip[1], T.flip[1] + 0.6],
  // skip the guessing
  ...head(T.h4, 2, 0.1, T.h4Late, 1),
  ['bell', T.heart, 1318.51, 0.045, 1.8, 0], ['glitter', T.heart, T.heart + 0.9],
  ['pop', T.close, 880, 0.03, 0], ['pop', T.close + 0.07, 587.33, 0.03, 0],
  ...sob(T.heart + 0.5, 1568), ...sob(T.heart + 1.1, 1660, 2),
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
