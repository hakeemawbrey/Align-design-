// srtorsubway (20 s vertical, Star Talk Remix of torsubway "Swiping the same faces") · story 0–15.6, then the shared
// end card ("come" + the logo + the default CTA).
//   0.00–4.30  HOOK  "Stuck on | the subway, | swiping the | *same faces.*"  A subway car rocks through the tunnel; the ♉
//              Taurus star sits on the bench swiping a phone (magnified on the right): the same three faceless profiles
//              loop. The LED strip scrolls "NEXT STOP: SAME FACES". Drop (2.82): face #1 comes round again, "AGAIN." —
//              then faster, "AGAIN!?" (3.38), and ♓ Pisces, asleep at the end of the bench, wakes up sobbing.
//   4.00–9.60  "Taurus loves | a *routine.*"  THE STARS pops up outside the window in a conductor's cap. THE STARS: "babe.
//              that's the *same guy.* again." Taurus gazes at the phone, heart-eyed: "...but he's *familiar.*"
//              The conductor's slow eye-roll.
//   9.70 cut → "Tonight's deck: | a *new* hand, | every night."  Out through the window into the tunnel: rings of lights
//              rush past and five card backs fly out of the dark into a fan. THE STARS: "new cards. *every* night. all
//              aboard!"  12.0 "Card *first.* | Face last." — the centre card lifts and flips to a veiled mystery card.
//  13.20–15.45 "Get off | the *same loop.*"  A looping transit line circles over a generic skyline (needle tower, unnamed);
//              a gold branch opens off the loop and the little train, Taurus on the roof, rides it up to a star.
// One canvas (sky + scene + stars), DOM type + the dialogue box above it, grain on top. Pure f(t).
import { clamp, lerp, prog, ease, el, rng } from '../../../src/lib.js'
import { fill, A as ASSETS } from '../../../src/scenes/common.js'
import { drawSky, drawGrain, layerCanvas } from '../../sky.js'
import { SKY_H, GRAIN_H, easeOutBack } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar, STAR } from '../../startalk.js'
import {
  BONE, GOLD, PINK, CYAN, WARM, NIGHT, VIOLET, INK, MONO, INTER, TAU, D2R, BEAT, r3,
  rgba, pop01, outK, popOut, glowStroke, popText, drawBits, makeBurst, drawBurst, drawTears, floatHearts,
} from '../../srtorpatio/scenes/props.js'

export const DURATION = 20
const W = 1080
const STORY_END = DURATION - ENDCARD_LEN       // 15.6
const TAURUS = signStar('taurus'), PISCES = signStar('pisces')
const LAV = '#c9a6ff', AMBER = '#ffb86b', MINT = '#7fe0b5'

// ── the timeline
const T = {
  black: [0, 0.3], h0: 0.12, h0Late: BEAT(2),
  swipes: [BEAT(1.5), BEAT(2.5), BEAT(4), BEAT(4.5), BEAT(4.75), BEAT(5)],   // →B, →C, →A (AGAIN.), →B, →C, →A (AGAIN!?)
  again: [BEAT(4), BEAT(5)], wake: BEAT(5) + 0.05, cry: [3.7, 6.6], h0Out: [4.12, 4.3],
  cond: 3.95, boxA: 4.18, l1: 4.35, h1: 4.4, h1Late: 4.85, heart: 7.3, l2: 7.4, roll: [8.2, 9.3], boxAClose: 9.6, h1Out: [9.42, 9.6],
  cut: 9.7,
  h2: 9.76, deal: [10.0, 10.18, 10.36, 10.54, 10.72], glow: 11.1, boxB: 10.05, l3: 10.2,
  lift: [11.5, 11.9], flip: [11.9, 12.3], land: 12.3, h2Out: [11.78, 11.95], h3: 12.0, h3Late: 12.35, boxBClose: 13.3, tunnelOut: [12.95, 13.25], h3Out: [12.95, 13.12],
  h4: 13.25, h4Late: 13.7, loop: [13.15, 13.55], branch: [13.7, 13.98], ride: [14.0, 14.55], burst: 14.55, out: [15.05, 15.45],
}
const SPK = 'THE STARS', TSPK = '♉ TAURUS STAR'
const LINES_A = [
  { t: T.l1, speaker: SPK, text: "babe. that's the *same guy.* again." },
  { t: T.l2, speaker: TSPK, text: "...but he's *familiar.*", color: '#ffd27a' },
]
const LINES_B = [{ t: T.l3, speaker: SPK, text: 'new cards. *every* night. all aboard!' }]
const CPS = 30
const COND_HOPS = [...talkHops(LINES_A, SPK, { cps: CPS }), ...talkHops(LINES_B, SPK, { cps: CPS })]
const TAU_HOPS = [...talkHops(LINES_A, TSPK, { cps: CPS }), T.again[1], T.land + 0.05]

// the three regulars on the phone (no faces): body colour, hair, card tint, name
const FACES = [
  { body: PINK, hair: '#3a1f4d', style: 'bun', bg: ['#ffcf9e', '#ff8fb1'], name: 'JAY' },
  { body: CYAN, hair: '#1b2a55', style: 'beanie', bg: ['#b9ecff', '#8f9cf6'], name: 'SAM' },
  { body: GOLD, hair: '#4a2a1a', style: 'curls', bg: ['#ffe9a8', '#ffb86b'], name: 'ALEX' },
]
// ── layout
const CAR = { x: 40, y: 600, w: 1000, h: 960 }
const SEAT = 1350
const HERO = { x: 300, y: 1236, size: 300 }
const PIS = { x: 100, y: 1288, size: 120 }
const PH = { x: 800, y: 1150, w: 330, h: 580 }
const COND = { x: 205, y: 870, size: 180 }
const VP = { x: 540, y: 980 }
const CARD_H = 330
const FAN = [0, 1, 2, 3, 4].map(i => ({ x: 540 + (i - 2) * 160, y: 1040 + Math.abs(i - 2) * 34, rot: (i - 2) * 10 }))
const DEAL_ORDER = [0, 4, 1, 3, 2]
const BIG_H = 640, CARD_C = { x: 540, y: 1000 }
const TUN_C = { x: 170, y: 1390, size: 210 }, TUN_T = { x: 900, y: 1400, size: 190 }
const LOOP = { x: 540, y: 1150, r: 240 }, GOAL = { x: 540, y: 600 }, BASE = 1520

// a conductor's cap (pixel), worn by THE STARS
const CAP = [
  '....BBBBBBBB....',
  '..BBBBBBBBBBBB..',
  '.BBBBBGGGGBBBBB.',
  '.BBBBBGYYGBBBBB.',
  '.BBBBBBGGBBBBBB.',
  'KKKKKKKKKKKKKKKK',
  '..VVVVVVVVVVVV..',
]
const CAP_C = { B: '#27306e', G: GOLD, Y: '#fff1c8', K: '#11143a', V: '#0b0d26' }

const SKYL = (() => {
  const r = rng(52), out = []
  let xx = -20
  while (xx < W + 20) { const w = 70 + r() * 80; out.push({ x: xx, w, h: 110 + r() * 200, win: [] }); xx += w * (0.82 + r() * 0.2) }
  for (const b of out) for (let j = 0; j < Math.floor((b.h - 30) / 30); j++) for (let i = 0; i < Math.max(2, Math.floor((b.w - 18) / 22)); i++) if (r() > 0.45) b.win.push([b.x + 14 + i * 22, BASE - 26 - j * 30, r() < 0.75 ? '#ffd98a' : PINK])
  return out
})()
const NEEDLE_X = 860

async function build(stage) {
  try {
    await Promise.all(["800 104px Inter", "800 112px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'", "700 32px 'Space Mono'", "700 36px 'Space Mono'", "900 64px Inter", "800 34px Inter"].map(f => document.fonts.load(f)))
  } catch (_) { /* fonts optional */ }
  const loadImg = src => new Promise(res => { const im = new Image(); im.onload = () => res(im); im.onerror = () => res(null); im.src = ASSETS + src })
  const bitmap = (im, w) => { if (!im) return null; const c = document.createElement('canvas'); c.width = w; c.height = Math.round(w * im.height / im.width); const cx = c.getContext('2d'); cx.imageSmoothingQuality = 'high'; cx.drawImage(im, 0, 0, c.width, c.height); return c }
  const [backIm, profIm] = await Promise.all([loadImg('card-back.png'), loadImg('card-profile-2.png')])
  const backBmp = bitmap(backIm, 480), profBmp = bitmap(profIm, 900)

  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')

  // ── type
  const H0 = popText(root, 'Stuck on | the subway, | swiping the | *same* *faces.*', { top: 140, size: 104, accentSize: 150, accentColor: PINK, at: T.h0, gap: 0.08, late: 2, lateAt: T.h0Late, wobble: true, lineHeight: 0.98 })
  const H1 = popText(root, 'Taurus loves | a *routine.*', { top: 170, size: 116, accentSize: 170, accentColor: '#ffd27a', at: T.h1, gap: 0.09, late: 1, lateAt: T.h1Late, wobble: true })
  const H2 = popText(root, 'Tonight’s deck: | a *new* hand, | every night.', { top: 170, size: 104, accentSize: 160, accentColor: PINK, at: T.h2, gap: 0.08, wobble: true })
  const H3 = popText(root, 'Card *first.* | Face last.', { top: 180, size: 120, accentSize: 170, accentColor: GOLD, at: T.h3, gap: 0.1, late: 0, wobble: true })
  const H4 = popText(root, 'Get off | the *same* *loop.*', { top: 170, size: 120, accentSize: 170, accentColor: PINK, at: T.h4, gap: 0.09, late: 2, lateAt: T.h4Late, wobble: true })
  const HEADS = [[H0, T.h0Out], [H1, T.h1Out], [H2, T.h2Out], [H3, T.h3Out], [H4, T.out]]
  const boxA = dialogueBox(root, { lines: LINES_A, y: 1600, width: 960, height: 270, open: T.boxA, close: T.boxAClose, cps: CPS })
  const boxB = dialogueBox(root, { lines: LINES_B, y: 1600, width: 960, height: 270, open: T.boxB, close: T.boxBClose, cps: CPS })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')
  const black = el('div', { position: 'absolute', inset: 0, background: '#000' }, root)

  const B_AG1 = makeBurst(21, 10, 220), B_AG2 = makeBurst(22, 14, 280), B_COND = makeBurst(23, 8, 150), B_LAND = makeBurst(24, 16, 400), B_GOAL = makeBurst(25, 16, 260)

  const ink = (col, w, blur = 10) => { glowStroke(x, col, w, blur); x.stroke(); x.shadowBlur = 0 }

  // ═══ the hook: the car
  function bust(cx, by, s, P) {
    x.save(); x.translate(cx, by); x.scale(s, s)
    x.beginPath(); x.moveTo(-58, 0); x.quadraticCurveTo(-56, -66, 0, -70); x.quadraticCurveTo(56, -66, 58, 0); x.closePath()
    x.fillStyle = P.body; x.fill(); ink(BONE, 5, 6)
    const hy = -110
    x.beginPath(); x.arc(0, hy, 32, 0, TAU); x.fillStyle = BONE; x.fill(); ink(BONE, 5, 6)
    x.fillStyle = P.hair; x.strokeStyle = BONE; x.lineWidth = 4
    x.beginPath()
    if (P.style === 'bun') { x.arc(0, hy - 6, 33, Math.PI * 1.05, Math.PI * 1.95); x.closePath(); x.fill(); x.stroke(); x.beginPath(); x.arc(0, hy - 46, 16, 0, TAU) }
    else if (P.style === 'beanie') { x.moveTo(-35, hy - 4); x.quadraticCurveTo(-35, hy - 50, 0, hy - 50); x.quadraticCurveTo(35, hy - 50, 35, hy - 4); x.closePath(); x.fill(); x.stroke(); x.beginPath(); x.arc(0, hy - 54, 10, 0, TAU) }
    else { for (const [dx, dy, rr] of [[-28, -14, 16], [-15, -34, 17], [6, -40, 17], [26, -27, 16], [34, -6, 13], [-34, 2, 12]]) { x.moveTo(dx + rr, hy + dy); x.arc(dx, hy + dy, rr, 0, TAU) } }
    x.fill(); x.stroke()
    x.restore()
  }
  function profileCard(cx, cy, f, rot, sc, a) {
    if (a <= 0 || sc <= 0) return
    const P = FACES[f], w = 262, h = 360
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sc, sc); x.globalAlpha *= a
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26)
    const g = x.createLinearGradient(0, -h / 2, 0, h / 2); g.addColorStop(0, P.bg[0]); g.addColorStop(1, P.bg[1])
    x.fillStyle = g; x.fill()
    x.save(); x.clip(); bust(0, h / 2 + 4, 1.4, P); x.restore()
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 26); ink(BONE, 4, 6)
    x.fillStyle = 'rgba(14,9,34,0.85)'; x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, 120, 50, 25); x.fill()
    x.fillStyle = BONE; x.font = `700 32px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(P.name, -w / 2 + 76, -h / 2 + 43)
    x.restore()
  }
  const seen = t => T.swipes.filter(s => t >= s).length
  function phone(t, k, rock) {
    if (k <= 0) return
    const { x: px, y: py, w, h } = PH
    x.save(); x.translate(px, py + rock * 0.6); x.scale(k, k); x.rotate(3 * D2R)
    x.beginPath(); x.roundRect(-w / 2, -h / 2, w, h, 52); x.fillStyle = '#100a26'; x.fill(); ink(BONE, 7, 22)
    x.beginPath(); x.roundRect(-w / 2 + 16, -h / 2 + 16, w - 32, h - 32, 40); x.fillStyle = '#1b1240'; x.fill()
    x.beginPath(); x.roundRect(-34, -h / 2 + 30, 68, 14, 7); x.fillStyle = '#05040c'; x.fill()
    const n = seen(t), cur = n % 3
    x.fillStyle = BONE; x.font = `700 28px ${MONO}`; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(`${cur + 1}/3`, w / 2 - 40, -h / 2 + 76)
    let active = -1
    T.swipes.forEach((s, i) => { const d = i >= 3 ? 0.13 : 0.24; if (t >= s - d && t < s) active = i })
    const cy = -6
    if (active >= 0) {
      const s = T.swipes[active], d = active >= 3 ? 0.13 : 0.24, p = ease.inCubic(prog(t, s - d, s))
      profileCard(0, cy, (active + 1) % 3, 0, 0.9 + 0.1 * p, 1)
      profileCard(-420 * p, cy + 40 * p, active % 3, -22 * p, 1, 1 - p * 0.4)
    } else {
      const land = T.swipes.filter(s => t >= s).pop()
      const bump = land != null ? 1 + 0.05 * Math.exp(-(t - land) * 9) * Math.sin((t - land) * 22) : 1
      profileCard(0, cy, cur, 0, bump, 1)
    }
    for (const [bx, col, kind] of [[-70, PINK, 'x'], [70, MINT, 'h']]) {
      x.save(); x.translate(bx, h / 2 - 70); x.scale(active >= 0 && bx < 0 ? 1.18 : 1, active >= 0 && bx < 0 ? 1.18 : 1)
      x.beginPath(); x.arc(0, 0, 34, 0, TAU); x.fillStyle = 'rgba(14,9,34,0.9)'; x.fill(); ink(col, 4, 10)
      x.beginPath()
      if (kind === 'x') { x.moveTo(-12, -12); x.lineTo(12, 12); x.moveTo(12, -12); x.lineTo(-12, 12) } else { x.moveTo(0, 14); x.bezierCurveTo(-26, -4, -12, -22, 0, -9); x.bezierCurveTo(12, -22, 26, -4, 0, 14) }
      ink(col, 5, 0); x.restore()
    }
    // AGAIN stamps
    for (const [i, txt] of [[0, 'AGAIN.'], [1, 'AGAIN!?']]) {
      const s0 = T.again[i], p = prog(t, s0 - 0.02, s0 + 0.14), off = i === 0 ? prog(t, T.again[1] - 0.15, T.again[1] - 0.02) : prog(t, T.h0Out[0], T.h0Out[1])
      if (p <= 0 || off >= 1) continue
      x.save(); x.translate(i ? 10 : -20, i ? 60 : -40); x.rotate((i ? 8 : -8) * D2R); const sc = lerp(2.2, 1, ease.inCubic(p)) * (1 - off); x.scale(sc, sc)
      x.font = `900 ${i ? 76 : 64}px ${INTER}`; const tw = x.measureText(txt).width
      x.fillStyle = 'rgba(30,8,20,0.88)'; x.beginPath(); x.roundRect(-tw / 2 - 30, -56, tw + 60, 112, 18); x.fill()
      glowStroke(x, PINK, 8, 22); x.stroke(); x.shadowBlur = 0
      x.fillStyle = '#ff7aa0'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 0, 4)
      x.restore()
    }
    x.restore()
  }
  function taurusMood(t) {
    if (t < T.again[0]) return { mood: 'neutral', look: [1, 0] }
    if (t < T.again[1]) return { mood: 'wide', look: [1, 0], blink: false }
    if (t < T.l1 + 0.8) return { mood: 'wide', look: [0, 0], blink: false }
    if (t < T.heart) return { mood: 'neutral', look: [1, 0] }
    if (t < T.cut) return { mood: 'heart' }
    if (t < T.flip[1]) return { mood: 'wide', look: [-1, -1], blink: false }
    return { mood: 'heart' }
  }
  function car(t) {
    const rock = 4 * Math.sin(t * 7.1) + 2 * Math.sin(t * 13.3)
    x.save(); x.translate(0, rock)
    const { x: cx0, y: cy0, w, h } = CAR
    x.beginPath(); x.roundRect(cx0, cy0, w, h, 64); x.fillStyle = 'rgba(30,22,70,0.94)'; x.fill(); ink('#d8ddff', 7, 18)
    // LED strip
    x.beginPath(); x.roundRect(110, 628, 860, 66, 14); x.fillStyle = '#0a0618'; x.fill(); ink(rgba(AMBER, 0.8), 4, 10)
    x.save(); x.beginPath(); x.rect(126, 630, 828, 62); x.clip()
    x.font = `700 38px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'
    const msg = 'NEXT STOP: SAME FACES  ◆  ', mw = x.measureText(msg).width, off = 130 - ((Math.max(0, t - 0.2) * 210) % mw)
    x.shadowColor = AMBER; x.shadowBlur = 14; x.fillStyle = '#ffc070'
    for (let i = 0; i < 4; i++) x.fillText(msg, off + i * mw, 663)
    x.shadowBlur = 0; x.fillStyle = 'rgba(10,6,24,0.55)'; for (let yy = 632; yy < 692; yy += 6) x.fillRect(126, yy, 828, 2)
    x.restore()
    x.beginPath(); x.moveTo(80, 724); x.lineTo(1000, 724); ink(rgba(BONE, 0.75), 6, 6)
    // windows with the tunnel streaking past
    for (const [a, b] of [[80, 330], [410, 670], [750, 1000]]) {
      const wy = 750, wh = 230
      x.save(); x.beginPath(); x.roundRect(a, wy, b - a, wh, 26); x.fillStyle = '#07051a'; x.fill(); x.clip()
      const r = rng(7)
      for (let i = 0; i < 6; i++) {
        const lane = wy + 40 + (i % 3) * 46, sp = 1900 + r() * 700, px = W + 400 - ((t * sp + r() * 2000) % (W + 800))
        x.fillStyle = i % 3 === 1 ? rgba(PINK, 0.85) : 'rgba(255,214,140,0.9)'; x.fillRect(px, lane, 150 + r() * 120, 7)
      }
      if (a === 80) conductor(t)                 // THE STARS, looking in through the left window
      x.restore()
      x.beginPath(); x.roundRect(a, wy, b - a, wh, 26); ink(rgba(BONE, 0.85), 6, 8)
    }
    for (const px of [520, 700]) { x.beginPath(); x.moveTo(px, 700); x.lineTo(px, 1540); ink(rgba(GOLD, 0.85), 9, 10) }
    x.beginPath(); x.roundRect(60, 1040, 960, 300, 24); x.fillStyle = 'rgba(70,50,140,0.35)'; x.fill()
    x.beginPath(); x.roundRect(60, SEAT - 4, 960, 54, 20); x.fillStyle = '#3b2a7a'; x.fill(); ink(rgba(BONE, 0.7), 5, 6)
    x.beginPath(); x.moveTo(60, 1520); x.lineTo(1020, 1520); ink(rgba(LAV, 0.6), 5, 6)
    // Pisces, asleep at the end of the bench → wakes sobbing at AGAIN!?
    const pr = drawStarChar(x, PIS.x, PIS.y, PIS.size, t, { color: PISCES.color, mood: t < T.wake ? 'sleepy' : t < T.wake + 0.5 ? 'wide' : 'squint', look: [1, 0], seed: 9, glow: 0.7, hops: [T.wake] })
    drawTears(x, pr, t, T.cry[0], T.cry[1], 5)
    // Taurus
    const jolt = t > T.again[1] && t < T.again[1] + 0.6 ? -0.16 * Math.exp(-(t - T.again[1]) * 6) * Math.cos((t - T.again[1]) * 22) : 0
    const r = drawStarChar(x, HERO.x, HERO.y, HERO.size, t, { color: TAURUS.color, glyph: TAURUS.glyph, ...taurusMood(t), hops: TAU_HOPS, squash: jolt, seed: 3, glow: 1.1 })
    // the little phone in its right point + a beam to the big one
    const lx = r.x + 0.4 * r.size, ly = r.y - 10
    x.save(); x.translate(lx, ly); x.rotate(-14 * D2R); x.beginPath(); x.roundRect(-18, -30, 36, 60, 8); x.fillStyle = '#ffe3c0'; x.shadowColor = PINK; x.shadowBlur = 26; x.fill(); x.shadowBlur = 0; x.restore()
    x.save(); x.globalCompositeOperation = 'lighter'; x.globalAlpha *= 0.45
    const g = x.createLinearGradient(lx, 0, PH.x - PH.w / 2, 0); g.addColorStop(0, rgba(PINK, 0.5)); g.addColorStop(1, rgba(PINK, 0.05))
    x.fillStyle = g; x.beginPath(); x.moveTo(lx, ly); x.lineTo(PH.x - PH.w / 2 + 10, PH.y - PH.h / 2 + 80); x.lineTo(PH.x - PH.w / 2 + 10, PH.y + PH.h / 2 - 80); x.closePath(); x.fill()
    x.restore()
    if (t > T.heart && t < T.cut) floatHearts(x, t, r.x, r.y - 40, T.heart + 0.1, T.cut - 1, 2, 7, 160)
    x.restore()
    phone(t, pop01(t, 0.3, 0.45, 1.8), rock)
    drawBurst(x, B_AG1, PH.x, PH.y, t, T.again[0], [PINK, GOLD, BONE])
    drawBurst(x, B_AG2, PH.x, PH.y, t, T.again[1], [PINK, GOLD, BONE])
  }
  function conductor(t) {
    if (t < T.cond) return
    const k = pop01(t, T.cond, 0.4, 2.2)
    const rise = lerp(180, 0, ease.outCubic(prog(t, T.cond, T.cond + 0.4)))
    const mood = t >= T.roll[0] && t < T.roll[1] ? 'eyeroll' : t < T.l2 ? 'happy' : 'squint'
    const r = drawStarChar(x, COND.x, COND.y + rise, COND.size, t, { color: STAR.sky, mood, look: [1, 0], hops: COND_HOPS, pop: k, seed: 5, glow: 1 })
    drawBits(x, CAP, CAP_C, Math.round(r.x), Math.round(r.top + 2.4 * r.size / 36), r.size / 36 * 0.85)
  }

  // ═══ the tunnel + the deck
  function tunnel(t, a) {
    const pos = (t - T.cut) * 0.62
    x.save(); x.globalAlpha = a
    const g = x.createRadialGradient(VP.x, VP.y, 10, VP.x, VP.y, 1100); g.addColorStop(0, 'rgba(3,2,10,0.95)'); g.addColorStop(0.35, 'rgba(10,6,28,0.6)'); g.addColorStop(1, 'rgba(10,6,28,0)')
    x.fillStyle = g; x.fillRect(0, 0, W, 1920)
    for (const dx of [-1, 1]) { x.beginPath(); x.moveTo(VP.x + dx * 8, VP.y + 24); x.lineTo(VP.x + dx * 420, 1960); ink(rgba(LAV, 0.7), 5, 10) }
    const N = 11
    for (let i = 0; i < N; i++) {
      const d = ((i / N + pos) % 1 + 1) % 1, s = 0.05 * Math.exp(d * 3.4), al = clamp(d * 4) * clamp((1 - d) * 5)
      if (al <= 0) continue
      const hw = 560 * s, hh = 700 * s
      x.save(); x.globalAlpha = a * al * 0.8
      x.beginPath(); x.moveTo(VP.x - hw, VP.y + hh); x.lineTo(VP.x - hw, VP.y - hh * 0.25); x.arc(VP.x, VP.y - hh * 0.25, hw, Math.PI, TAU); x.lineTo(VP.x + hw, VP.y + hh)
      ink(i % 2 ? VIOLET : '#7f8fe0', Math.max(1.5, 7 * s), 14 * s)
      for (const dx of [-1, 1]) {
        const col = i % 3 === 0 ? PINK : '#ffd98a'
        x.beginPath(); x.arc(VP.x + dx * hw * 0.92, VP.y - hh * 0.05, Math.max(2, 12 * s), 0, TAU); x.fillStyle = col; x.shadowColor = col; x.shadowBlur = 20; x.fill(); x.shadowBlur = 0
      }
      x.restore()
    }
    x.restore()
  }
  function cardImg(bmp, cx, cy, h, rot, sx = 1, a = 1, glow = 0, glowCol = LAV) {
    if (!bmp || a <= 0 || h <= 0) return
    const w = h * bmp.width / bmp.height
    x.save(); x.translate(cx, cy); x.rotate(rot * D2R); x.scale(sx, 1); x.globalAlpha *= a
    if (glow > 0) { x.shadowColor = glowCol; x.shadowBlur = glow } else { x.shadowColor = 'rgba(0,0,0,0.6)'; x.shadowBlur = 30; x.shadowOffsetY = 12 }
    x.drawImage(bmp, -w / 2, -h / 2, w, h)
    x.restore()
  }
  const GLOWS = [CYAN, PINK, GOLD, MINT, LAV]
  const dealPose = (F, t0, td, t) => { const p = ease.outCubic(prog(t, t0, td)); return { cx: lerp(VP.x, F.x, p), cy: lerp(VP.y - 20, F.y, p) - Math.sin(Math.PI * p) * 90, h: CARD_H * lerp(0.06, 1, p), rot: F.rot + 300 * (1 - p) } }
  function deck(t) {
    DEAL_ORDER.forEach((ci, k) => {
      if (ci === 2) return
      const F = FAN[ci], td = T.deal[k], t0 = td - 0.45
      if (t < t0) return
      const off = ease.inCubic(prog(t, T.lift[0] - 0.05, T.lift[0] + 0.4))
      if (off >= 1) return
      const D = dealPose(F, t0, td, t), side = ci < 2 ? -1 : 1
      const gk = t > T.glow ? pop01(t, T.glow + k * 0.05, 0.3) : 0
      cardImg(backBmp, D.cx + side * 900 * off, D.cy - 200 * off, D.h, D.rot + side * 40 * off, 1, 1, gk > 0 ? 30 * clamp(gk) : 0, GLOWS[ci])
    })
    const td = T.deal[4], t0 = td - 0.45
    if (t < t0) return
    const D = dealPose(FAN[2], t0, td, t)
    const lp = ease.inOutCubic(prog(t, ...T.lift)), fp = prog(t, ...T.flip)
    const cx = lerp(D.cx, CARD_C.x, lp), cy = lerp(D.cy, CARD_C.y, lp) + (t > T.land + 0.4 ? 8 * Math.sin((t - T.land) * 2.2) : 0)
    const h = lerp(D.h, BIG_H, lp) * (1 + (t > T.land ? 0.05 * Math.exp(-(t - T.land) * 5) * Math.sin((t - T.land) * 18) : 0))
    const showProf = fp >= 0.5
    if (showProf) {
      const ak = clamp((t - T.land + 0.2) * 3)
      x.save(); x.globalCompositeOperation = 'lighter'
      const g = x.createRadialGradient(cx, cy, 60, cx, cy, 600); g.addColorStop(0, rgba(LAV, 0.5 * ak)); g.addColorStop(0.5, rgba(PINK, 0.16 * ak)); g.addColorStop(1, rgba(LAV, 0))
      x.fillStyle = g; x.beginPath(); x.arc(cx, cy, 600, 0, TAU); x.fill(); x.restore()
    }
    cardImg(showProf ? profBmp : backBmp, cx, cy, h, D.rot * (1 - lp), Math.max(0.02, Math.abs(Math.cos(Math.PI * fp))), 1, showProf ? 42 : t > T.glow ? 30 : 0, showProf ? LAV : GOLD)
    drawBurst(x, B_LAND, cx, cy, t, T.land, [GOLD, PINK, BONE, LAV], 0.85)
  }
  function tunnelCast(t, a) {
    x.save(); x.globalAlpha *= a
    const ck = pop01(t, T.cut + 0.1, 0.4, 2)
    const r = drawStarChar(x, TUN_C.x, TUN_C.y, TUN_C.size, t, { color: STAR.sky, mood: t < T.land ? 'happy' : 'wink', look: [1, -1], hops: COND_HOPS, pop: ck, seed: 5, glow: 1 })
    drawBits(x, CAP, CAP_C, Math.round(r.x), Math.round(r.top + 2.4 * r.size / 36), r.size / 36 * 0.85, { alpha: ck > 0.2 ? 1 : 0 })
    const tk = pop01(t, T.cut + 0.25, 0.4, 2)
    const tr = drawStarChar(x, TUN_T.x, TUN_T.y, TUN_T.size, t, { color: TAURUS.color, glyph: TAURUS.glyph, ...taurusMood(t), hops: TAU_HOPS, pop: tk, seed: 3 })
    if (t > T.land) floatHearts(x, t, tr.x, tr.y - 30, T.land + 0.1, T.tunnelOut[0], 4, 6, 120)
    x.restore()
  }

  // ═══ out of the tunnel: the loop line and the branch to a star
  function skyline(t, a) {
    x.save(); x.globalAlpha *= a
    // needle tower
    x.beginPath(); x.moveTo(NEEDLE_X - 26, BASE); x.lineTo(NEEDLE_X - 7, BASE - 330); x.lineTo(NEEDLE_X + 7, BASE - 330); x.lineTo(NEEDLE_X + 26, BASE); x.closePath(); x.fillStyle = NIGHT; x.fill(); ink(rgba(VIOLET, 0.9), 4, 10)
    x.beginPath(); x.ellipse(NEEDLE_X, BASE - 340, 44, 18, 0, 0, TAU); x.fillStyle = NIGHT; x.fill(); ink(VIOLET, 4, 10)
    x.beginPath(); x.moveTo(NEEDLE_X, BASE - 358); x.lineTo(NEEDLE_X, BASE - 470); x.strokeStyle = VIOLET; x.lineWidth = 4; x.stroke()
    for (const b of SKYL) {
      x.beginPath(); x.rect(b.x, BASE - b.h, b.w, b.h); x.fillStyle = NIGHT; x.fill(); ink(rgba(VIOLET, 0.8), 3, 8)
      for (const [wx, wy, col] of b.win) { x.fillStyle = rgba(col, 0.7); x.fillRect(wx, wy, 10, 14) }
    }
    x.restore()
  }
  function loop(t, a) {
    const dk = ease.outCubic(prog(t, ...T.loop))
    x.save(); x.globalAlpha *= a
    x.beginPath(); x.arc(LOOP.x, LOOP.y, LOOP.r, -Math.PI / 2, -Math.PI / 2 + TAU * dk); ink(PINK, 14, 22)
    for (let i = 0; i < 6; i++) { const an = -Math.PI / 2 + i * TAU / 6; if (i / 6 > dk) continue; x.beginPath(); x.arc(LOOP.x + Math.cos(an) * LOOP.r, LOOP.y + Math.sin(an) * LOOP.r, 16, 0, TAU); x.fillStyle = INK; x.fill(); ink(BONE, 6, 8) }
    // the gold branch: from the top of the loop up to the star
    const bk = ease.inOutCubic(prog(t, ...T.branch))
    const top = { x: LOOP.x, y: LOOP.y - LOOP.r }
    if (bk > 0) { x.beginPath(); x.moveTo(top.x, top.y); x.lineTo(top.x, lerp(top.y, GOAL.y + 40, bk)); ink(GOLD, 14, 26) }
    // the goal star
    const gk = pop01(t, T.branch[0], 0.4, 2)
    if (gk > 0) drawStarChar(x, GOAL.x, GOAL.y - 10, 150, t, { color: STAR.sky, mood: t > T.burst ? 'heart' : 'happy', pop: gk, seed: 8, glow: 1.3, look: [0, 1], alpha: a })
    // the train: circles the loop, then takes the branch
    let tx, ty, ang
    if (t < T.ride[0]) {
      const an = -Math.PI / 2 - Math.max(0, T.branch[0] - t) * 5.7      // arrives at the top of the loop as the branch opens
      tx = LOOP.x + Math.cos(an) * LOOP.r; ty = LOOP.y + Math.sin(an) * LOOP.r; ang = an + Math.PI / 2
    } else {
      const rp = ease.inOutCubic(prog(t, ...T.ride)); tx = top.x; ty = lerp(top.y, GOAL.y + 120, rp); ang = -Math.PI / 2
    }
    const ok = popOut(t, [T.burst, T.burst + 0.3])
    if (ok > 0) {
      x.save(); x.translate(tx, ty); x.rotate(ang); x.scale(ok, ok)
      x.beginPath(); x.roundRect(-60, -26, 120, 52, 20); x.fillStyle = '#2a1f5a'; x.fill(); ink(BONE, 5, 10)
      x.fillStyle = '#ffd98a'; for (const wx of [-36, -6, 24]) x.fillRect(wx, -12, 18, 16)
      x.restore()
      const vertical = t > T.ride[0]
      const tr = drawStarChar(x, tx + (vertical ? 70 : 0), ty - (vertical ? 0 : 70), 110, t, { color: TAURUS.color, mood: t < T.ride[0] ? 'happy' : 'heart', pop: ok, seed: 3, glow: 0.9, alpha: a })
      void tr
    }
    drawBurst(x, B_GOAL, GOAL.x, GOAL.y, t, T.burst, [GOLD, PINK, BONE], 0.9)
    x.restore()
  }

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      drawSky(x, t, SKY_H)
      if (t < T.cut) car(t)
      else if (t < T.tunnelOut[1]) {
        const a = outK(t, T.tunnelOut)
        tunnel(t, a)
        x.save(); x.globalAlpha = a; deck(t); x.restore()
        tunnelCast(t, a)
        drawBurst(x, B_COND, TUN_C.x, TUN_C.y, t, T.cut + 0.1, [GOLD, BONE])
      }
      if (t > T.loop[0] - 0.1) {
        const a = clamp(prog(t, T.loop[0] - 0.1, T.loop[0] + 0.25)) * outK(t, T.out)
        skyline(t, a); loop(t, a)
      }
      boxA.update(t); boxB.update(t)
      black.style.opacity = String(1 - ease.inOutQuad(prog(t, ...T.black)))
      for (const [hd, o] of HEADS) hd.update(t, outK(t, o))
      drawGrain(gx, t)
    },
  }
}

// card motif: one cut for a 20 s film, as we leave the car for the tunnel ("Tonight's deck…")
const CUTS = [{ t: T.cut, kind: 'deal' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END }), cardFrame({ start: 0, end: STORY_END }), cardCuts(CUTS)]

// ── sound (pitched SFX are shifted into the film's key by the engine)
const NOTE = [587.33, 659.25, 739.99, 880, 987.77, 1174.66, 1318.51]
const wordPops = (t0, n, gap, base = 0, gain = 0.026) => Array.from({ length: n }, (_, i) => ['pop', r3(t0 + i * gap), NOTE[(base + i) % NOTE.length], gain, (i % 2 ? 0.15 : -0.15)])
export const CUES = [
  ['whoosh', 0.05, 0.9, 0.03],
  ...wordPops(T.h0, 7, 0.08), ['pop', T.h0Late, 1174.66, 0.05, 0], ['pop', r3(T.h0Late + 0.1), 1318.51, 0.05, 0],
  ...T.swipes.map((s, i) => ['whoosh', r3(s - (i >= 3 ? 0.13 : 0.24)), 0.18, 0.03]),
  ...T.swipes.map(s => ['tick', s, 0.04]),
  ['boom', T.again[0], 0.12], ['pop', T.again[0], 987.77, 0.055, 0.3], ['bell', r3(T.again[0] + 0.03), 1318.51, 0.03, 0.9, 0.3],
  ['boom', T.again[1], 0.15], ['pop', T.again[1], 1174.66, 0.065, 0.3], ['bell', r3(T.again[1] + 0.03), 1760, 0.035, 1.0, 0.3],
  ['pop', T.wake, 659.25, 0.04, -0.6], ['pluck', r3(T.wake + 0.2), 196, 0.035, 0.6, -0.6],
  // the conductor
  ['whoosh', T.cond, 0.35, 0.035], ['pop', r3(T.cond + 0.3), 880, 0.05, -0.4], ['bell', r3(T.cond + 0.32), 1567.98, 0.03, 0.8, -0.4],
  ['pop', T.boxA, 739.99, 0.035, 0], ['pop', r3(T.boxA + 0.06), 987.77, 0.03, 0],
  ...talkCues(LINES_A, { cps: CPS }), ...talkCues(LINES_B, { cps: CPS }),
  ...wordPops(T.h1, 3, 0.09, 1, 0.022), ['pop', T.h1Late, 1174.66, 0.05, 0], ['pluck', T.h1Late, 880, 0.04, 0.6, 0],
  ['glitter', T.heart, r3(T.heart + 0.5)], ['bell', r3(T.heart + 0.02), 1318.51, 0.025, 1.0, -0.3],
  ['pluck', T.roll[0], 196, 0.045, 0.5, -0.4], ['pluck', r3(T.roll[0] + 0.18), 174.61, 0.04, 0.6, -0.4],
  // the tunnel + deck
  ...wordPops(T.h2, 6, 0.08, 2, 0.022),
  ['pop', r3(T.cut + 0.4), 880, 0.04, -0.5], ['pop', r3(T.cut + 0.55), 659.25, 0.04, 0.5],
  ...T.deal.flatMap((d, i) => [['whoosh', r3(d - 0.4), 0.3, 0.025], ['pop', d, NOTE[(i + 2) % NOTE.length], 0.04, (i - 2) * 0.2]]),
  ['glitter', T.glow, r3(T.glow + 0.4)], ['pop', T.boxB, 739.99, 0.035, 0],
  ['whoosh', T.lift[0], 0.4, 0.035], ['whoosh', T.flip[0], 0.3, 0.04],
  ['boom', T.land, 0.12], ['pop', T.land, 1318.51, 0.06, 0], ['glitter', T.land, r3(T.land + 0.8)], ['bell', r3(T.land + 0.03), 1760, 0.035, 1.4, 0],
  ...wordPops(T.h3, 4, 0.1, 3, 0.03),
  // the loop
  ['whoosh', T.loop[0], 0.5, 0.035], ...wordPops(T.h4, 2, 0.09, 1), ['pop', T.h4Late, 1174.66, 0.055, 0], ['pop', r3(T.h4Late + 0.1), 1318.51, 0.055, 0],
  ['pluck', T.branch[0], 587.33, 0.04, 0.5, 0], ['pluck', r3(T.branch[0] + 0.12), 880, 0.04, 0.5, 0], ['whoosh', T.ride[0], 0.5, 0.04],
  ['pop', T.burst, 1174.66, 0.06, 0], ['bell', T.burst, 1567.98, 0.045, 1.6, 0], ['glitter', T.burst, r3(T.burst + 0.7)],
  ['whoosh', T.out[0], 0.4, 0.035],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
