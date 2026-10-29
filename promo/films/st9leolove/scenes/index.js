// st9leolove (30 s vertical Align ad, Star Talk season 9 "A DAY IN THE LIFE", S9 E23: Leo · DATE NIGHT) · story 0–25.6, then
// the shared end card.
//   0.00  frame 0: Leo's kitchen at dusk, 7:02 PM. Leo mid-march with a drum, confetti already falling, a tiny pixel
//         marching band behind it. Hook: "A Leo in love is a whole *parade*."
//   2.60  the doorbell: Aquarius (Leo's fiancé since season 5, headphones on) comes in. "7:05 PM — wedding planning,
//         *round one.*"  Leo's notes app: WEDDING v1 (a parade, a marching band, twelve confetti cannons, fireworks?).
//         LEO: "okay: a parade, a band, twelve *confetti cannons.*"
//   7.30  the CONFETTI BUDGET bar fills past MAX and blinks red.
//   9.30  AQUARIUS: "love it. maybe… *smaller?*"  Gasp zoom on Leo.
//  11.90  ★ ASTROLOGY SAYS: in traditional astrology, Leo rules the heart. A pixel heart glows on Leo's chest.
//  14.40  WEDDING v2: us · your playlist · one confetti popper · the rooftop, two cups. LEO: "smaller party. same size
//         *heart.*"  The budget bar drops to PERFECT.
//  18.20  Aquarius slips one headphone onto Leo (sharing, season 4's rooftop); Leo pulls the one popper.
//  21.00  the last line, frame 0's framing with one small confetti burst over both: "Big love. *Loyal* love."
//   The ghost leans out from behind the fridge (16.2). Rewatch bait: the marching band's tuba player is the ghost's sheet
//   colour; the polaroid wall now has Aquarius on it.
// Pure f(t).
import { clamp, lerp, prog, ease } from '../../../src/lib.js'
import { fill } from '../../../src/scenes/common.js'
import { drawGrain, layerCanvas } from '../../sky.js'
import { GRAIN_H } from '../../wheel.js'
import { ENDCARD_LEN, buildEndcard, endcardCues } from '../../endcard.js'
import { cardCuts, cardCutCues, cardFrame } from '../../cardfx.js'
import { drawStarChar, dialogueBox, talkCues, talkHops, signStar } from '../../startalk.js'
import { drawSeedConstellation, drawGhostCameo } from '../../stlore.js'
import { gaspZoom, drawGaspLines, gaspCues } from '../../st5cast.js'
import { drawRecFrame, drawClock, clockCues, stampCaption, stampCues, hookPOV, hookPOVCues, factChip, factChipCues, phoneScreen, phoneCues, DAY_FONTS } from '../../st9day.js'
import { drawLeoHome, leoSpots, drawLeoStar } from '../../st9leohome.js'
import { GOLD, BONE, PINK, INK, pop01, outK, popOut, skyIn, camAt, camApply, sparkles, floatHearts, drawHeart, cheers, lastLine, pixelBubble, r3 } from '../st9kit.js'

export const DURATION = 30
const KEY = 'A'
const STORY_END = DURATION - ENDCARD_LEN       // 25.6
const LEON = '♌ LEO', AQUN = '♒ AQUARIUS'
const MONO = "'Space Mono', monospace"
const AQU = signStar('aquarius')

const T = {
  hookOut: 2.5, bell: 2.6, aquIn: 2.75, st1: 3.0, st1Out: 5.6,
  phone: 3.9, l1: 4.2, budget: [7.3, 8.6], over: 8.6, l2: 9.3, gasp: 10.75, fact: 11.9, factDur: 2.7, chest: [11.9, 14.6],
  phone2: 14.35, l3: 14.6, close: 17.7, budgetDown: [15.2, 16.0], ghost: 16.2,
  share: [18.2, 18.9], popper: 19.6, last: 21.0, lastOut: [25.15, 25.5],
}
const LINES = [
  { t: T.l1, speaker: LEON, text: 'okay: a parade, a band, twelve *confetti cannons.*', color: '#ffc27a' },
  { t: T.l2, speaker: AQUN, text: 'love it. maybe… *smaller?*', color: '#8fe6ff' },
  { t: T.l3, speaker: LEON, text: 'smaller party. same size *heart.*', color: '#ffc27a' },
]
const CPS = 28
const LEO_HOPS = [...talkHops(LINES, LEON, { cps: CPS }), 0.1, 0.55, 1.0, 1.45, 1.9, T.popper]
const AQU_HOPS = [...talkHops(LINES, AQUN, { cps: CPS }), T.aquIn + 0.3, T.share[0]]
const V1 = [{ text: '[x] a parade', at: T.phone + 0.3 }, { text: '[x] marching band', at: T.phone + 0.9 }, { text: '[x] confetti cannons x12', at: T.phone + 1.5 }, { text: '[ ] fireworks?', at: T.phone + 2.4 }]
const V2 = [{ text: '[x] us', at: T.phone2 + 0.3 }, { text: '[x] your playlist', at: T.phone2 + 0.9 }, { text: '[x] one confetti popper', at: T.phone2 + 1.5 }, { text: '[ ] rooftop, two cups', at: T.phone2 + 2.3 }]

const LEO0 = { x: 330, y: 1225, size: 310 }
const AQU0 = { x: 770, y: 1235, size: 280 }
const HIDE = leoSpots('kitchen').hide[0]
export const GHOST = { at: T.ghost, x: HIDE.x, y: HIDE.y, where: HIDE.where }
const SHOTS = [
  { t: 0, x: 500, y: 1040, s: 1.08 },
  { t: T.aquIn, x: 540, y: 960, s: 1 },
  { t: T.budget[0], x: 420, y: 980, s: 1.06 },
  { t: T.l2, x: 680, y: 1040, s: 1.1 },
  { t: T.fact, x: 500, y: 1040, s: 1.08 },
  { t: T.phone2, x: 540, y: 960, s: 1 },
  { t: T.share[0], x: 540, y: 1100, s: 1.12 },
  { t: T.last, x: 540, y: 1000, s: 1.04 },
]

function leoState(t) {
  if (t < T.aquIn) return { mood: 'happy', look: [1, 0] }
  if (t < T.l2) return { mood: 'sparkle', look: [1, 0] }
  if (t < T.gasp) return { mood: 'neutral', look: [1, 0] }
  if (t < T.fact) return { mood: 'wide', look: [1, 0], blink: false }
  if (t < T.l3) return { mood: 'neutral', look: [0, 1] }
  if (t < T.share[0]) return { mood: 'happy', look: [1, 0] }
  return { mood: 'heart', look: [1, 0] }
}
function aquState(t) {
  if (t < T.phone + 1) return { mood: 'happy', look: [-1, 0] }
  if (t < T.over) return { mood: 'wide', look: [-1, -1], blink: false }
  if (t < T.l2 + 1.5) return { mood: 'squint', look: [-1, 0] }
  if (t < T.l3 + 1.2) return { mood: 'neutral', look: [-1, 0] }
  return { mood: 'heart', look: [-1, 0] }
}

function R(x, a, b, w, h, c) { x.fillStyle = c; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)) }
// Aquarius's pink headphones (season 3); `share` 0…1 moves the right cup over onto Leo's left side
function headphones(x, r, size, share, leoR) {
  const c = Math.max(4, Math.round(size / 30))
  const cupY = r.y - size * 0.06, cupX = size * 0.4, ry = -size * 0.44
  const band = (col, w) => { for (let i = 0; i <= 26; i++) { const a = Math.PI * i / 26, bx = r.x - Math.cos(a) * cupX, by = cupY + Math.sin(a) * ry; x.fillStyle = col; x.fillRect(Math.round(bx - w / 2), Math.round(by - w / 2), w, w) } }
  band(INK, c * 3); band('#3a2a6e', c * 2)
  const cup = (cx, cy) => { R(x, cx - 2.5 * c, cy - 3.5 * c, 5 * c, 7 * c, INK); R(x, cx - 1.5 * c, cy - 2.5 * c, 3 * c, 5 * c, '#ff4fd8'); R(x, cx - 1.5 * c, cy - 2.5 * c, c, 2 * c, '#ffb3f0') }
  cup(r.x + cupX, cupY)
  // the left cup on its cord: it travels to Leo's right side
  const s = ease.inOutCubic(clamp(share))
  const lx = lerp(r.x - cupX, leoR.x + leoR.size * 0.4, s), ly = lerp(cupY, leoR.y - leoR.size * 0.06, s) - Math.sin(Math.PI * s) * 120
  if (s > 0) { x.save(); x.strokeStyle = INK; x.lineWidth = c; x.beginPath(); x.moveTo(r.x - cupX, cupY + 3 * c); x.quadraticCurveTo((r.x + lx) / 2, Math.max(cupY, ly) + 90, lx, ly + 3 * c); x.stroke(); x.restore() }
  cup(lx, ly)
}
// the frame-0 parade: Leo's drum, a tiny band marching along the counter, confetti
function drum(x, cx, cy, c, t) {
  R(x, cx - 7 * c, cy - 4 * c, 14 * c, 9 * c, INK); R(x, cx - 6 * c, cy - 3 * c, 12 * c, 7 * c, '#c8363f')
  for (let i = -5; i < 6; i += 2) R(x, cx + i * c, cy - 2 * c, c, 5 * c, GOLD)
  R(x, cx - 6 * c, cy - 4 * c, 12 * c, c, '#fff1e0')
  const hit = Math.abs(Math.sin(t * 9))
  R(x, cx - 10 * c, cy - 8 * c - hit * 2 * c, c, 6 * c, '#8a5330'); R(x, cx + 9 * c, cy - 8 * c - (1 - hit) * 2 * c, c, 6 * c, '#8a5330')
}
function band(x, t, k) {
  if (k <= 0) return
  const cols = ['#e163d6', '#ef5c94', '#efe6d6', '#2fc79a']
  for (let i = 0; i < 4; i++) {
    const bx = ((t * 90 + i * 150) % 820) + 120, by = 1104 - Math.abs(Math.sin(t * 8 + i)) * 12, c = 6
    x.save(); x.globalAlpha = k
    R(x, bx - 3 * c, by - 8 * c, 6 * c, 8 * c, INK); R(x, bx - 2 * c, by - 7 * c, 4 * c, 6 * c, cols[i])
    R(x, bx - 2 * c, by - 10 * c, 4 * c, 2 * c, '#c8363f'); R(x, bx - c, by - 12 * c, 2 * c, 2 * c, GOLD)     // shako hats
    if (i === 2) { R(x, bx + 2 * c, by - 7 * c, 4 * c, 4 * c, GOLD) }                                              // the tuba
    x.restore()
  }
}
function confetti(x, t, t0, dur, cx, cy, n, spread, seed) {
  const tt = t - t0
  if (tt < 0 || tt > dur) return
  for (let i = 0; i < n; i++) {
    const a = ((i * 137.5 + seed * 31) % 360) * Math.PI / 180, sp = 0.5 + ((i * 53) % 10) / 10
    const px = cx + Math.cos(a) * spread * sp * Math.min(1, tt * 2.5) + Math.sin(tt * 3 + i) * 14
    const py = cy + Math.sin(a) * spread * 0.4 * sp * Math.min(1, tt * 2.5) + tt * tt * 160 - 40
    x.save(); x.globalAlpha = 1 - prog(tt, dur * 0.7, dur)
    R(x, px, py, 10, 6 + 4 * Math.abs(Math.sin(tt * 8 + i)), ['#f2c75c', '#ff8fb1', '#7fdcff', '#a46cff', '#2fc79a'][i % 5]); x.restore()
  }
}
function rain(x, t, k) {   // falling confetti everywhere (frame 0)
  if (k <= 0) return
  for (let i = 0; i < 70; i++) {
    const px = (i * 157) % 1080 + Math.sin(t * 2 + i) * 20, py = ((t * 220 + i * 263) % 1500) + 250
    x.save(); x.globalAlpha = k; R(x, px, py, 10, 6 + 4 * Math.abs(Math.sin(t * 6 + i)), ['#f2c75c', '#ff8fb1', '#7fdcff', '#a46cff', '#2fc79a'][i % 5]); x.restore()
  }
}
function budgetBar(x, t) {
  const show = t > T.budget[0] - 0.3 && t < T.close
  if (!show) return
  const k = pop01(t, T.budget[0] - 0.3, 0.3) * (1 - prog(t, T.close - 0.3, T.close))
  const fill = t < T.budgetDown[0] ? ease.inQuad(prog(t, ...T.budget)) * 1.25 : lerp(1.25, 0.18, ease.inOutCubic(prog(t, ...T.budgetDown)))
  const over = fill > 1, shake = over && t < T.budgetDown[0] ? Math.sin(t * 60) * 5 : 0
  const bx = 110 + shake, by = 560, bw = 470, bh = 54
  x.save(); x.globalAlpha = clamp(k)
  R(x, bx - 12, by - 60, bw + 24, bh + 84, 'rgba(16,9,38,0.9)'); R(x, bx - 12, by - 60, bw + 24, 6, GOLD)
  x.font = `700 26px ${MONO}`; x.textBaseline = 'middle'; x.textAlign = 'left'; x.fillStyle = GOLD; x.fillText('CONFETTI BUDGET', bx, by - 28)
  R(x, bx - 4, by - 4, bw + 8, bh + 8, INK); R(x, bx, by, bw, bh, '#2b2440')
  const blink = Math.floor(t * 8) % 2 === 0
  R(x, bx, by, bw * Math.min(1, fill), bh, over ? (blink ? '#ff3b4f' : '#ff8fb1') : t > T.budgetDown[1] - 0.1 ? '#2fc79a' : GOLD)
  for (let i = 1; i < 10; i++) R(x, bx + i * bw / 10, by, 4, bh, 'rgba(16,9,38,0.4)')
  x.textAlign = 'right'; x.fillStyle = over ? '#ff3b4f' : t > T.budgetDown[1] - 0.1 ? '#2fc79a' : BONE
  x.fillText(over ? 'OVER MAX!' : t > T.budgetDown[1] - 0.1 ? 'PERFECT' : '', bx + bw, by - 28)
  x.restore()
}

async function build(stage) {
  try { await Promise.all([...DAY_FONTS, "800 104px Inter", "italic 500 160px 'EB Garamond'", "700 52px 'Space Mono'"].map(f => document.fonts.load(f))) } catch (_) { /* fonts optional */ }
  const root = fill(stage, { background: '#05040c' })
  const cv = layerCanvas(root), x = cv.getContext('2d')
  const hook = hookPOV(root, { text: 'A Leo in love is a whole *parade*.', at: 0, out: T.hookOut, top: 270 })
  const st1 = stampCaption(root, { at: T.st1, out: T.st1Out, time: '7:05 PM', text: 'wedding planning, *round one.*' })
  const box = dialogueBox(root, { lines: LINES, y: 1540, width: 960, height: 250, open: T.l1 - 0.2, close: T.close, cps: CPS })
  const last = lastLine(root, 'Big love. *Loyal* love.', { at: T.last, lateAt: T.last + 0.55, top: 300, size: 112, accentSize: 168, late: 2 })
  const grainC = layerCanvas(root, { mixBlendMode: 'overlay', opacity: String(GRAIN_H), pointerEvents: 'none' }), gx = grainC.getContext('2d')

  return {
    start: 0, end: STORY_END + 0.01, root,
    update(t) {
      const cam = camAt(t, SHOTS)
      const z = gaspZoom(t, { at: T.gasp, dur: 1.15, x: LEO0.x, y: LEO0.y - 60, amount: 0.3, follow: 0.6, cy: 1100 })
      x.save(); camApply(x, cam); z.apply(x)
      drawLeoHome(x, t, { room: 'kitchen', ep: 'love', sky: skyIn(t, 19.1), light: 0 })
      band(x, t, 1 - prog(t, T.bell, T.bell + 0.4))
      drawGhostCameo(x, t, { x: GHOST.x, y: GHOST.y, at: GHOST.at, dur: 1.5, from: HIDE.from, cell: 4 })
      const ok = popOut(t, [25.15, 25.5])
      const lr = drawLeoStar(x, LEO0.x, LEO0.y, LEO0.size, t, { ...leoState(t), hops: LEO_HOPS, seed: 5, pop: ok })
      if (t < T.aquIn + 0.4) drum(x, LEO0.x + 10, LEO0.y + 110, 6, t)
      // the heart on Leo's chest (the fact)
      const hk = prog(t, T.chest[0], T.chest[0] + 0.3) * (1 - prog(t, T.chest[1] - 0.3, T.chest[1]))
      if (hk > 0) { drawHeart(x, Math.round(lr.x), Math.round(lr.y + 18), Math.round(8 + 2 * Math.sin(t * 9) * hk), { alpha: hk }); sparkles(x, t, lr.x, lr.y, T.chest[0] + 0.05, 8, 110, 0.4, [PINK, '#ff4f86', BONE]) }
      const ap = pop01(t, T.aquIn, 0.4, 2.2) * ok
      if (ap > 0) {
        const ax = AQU0.x + (1 - clamp((t - T.aquIn) / 0.4)) * 200
        const ar = drawStarChar(x, ax, AQU0.y, AQU0.size, t, { color: AQU.color, glyph: AQU.glyph, ...aquState(t), hops: AQU_HOPS, seed: 8, pop: ap })
        headphones(x, ar, AQU0.size * ap, prog(t, ...T.share), { x: lr.x, y: lr.y, size: LEO0.size })
        if (t > T.l3 + 1.2) floatHearts(x, t, ar.x, ar.top, T.l3 + 1.2, T.last - 0.4, 3)
      }
      // the one confetti popper (19.6) and the last line's small burst (21.0, rhyming frame 0's confetti rain)
      if (t > T.share[1] && t < T.popper + 0.2) pixelBubble(x, lr.x - 40, lr.top - 70, 'one popper.', { size: 28, alpha: pop01(t, T.share[1], 0.25) })
      confetti(x, t, T.popper, 2.2, (lr.x + AQU0.x) / 2, lr.top - 40, 46, 340, 1)
      confetti(x, t, T.last + 0.5, 3.4, 540, 900, 60, 420, 2)
      x.restore()
      rain(x, t, 1 - prog(t, T.bell, T.bell + 0.5))
      drawGaspLines(x, t, { at: T.gasp, dur: 1.15, x: LEO0.x, y: LEO0.y - 60, follow: 0.6, cy: 1100, color: GOLD })
      budgetBar(x, t)
      if (t > T.phone - 0.1 && t < T.close) {
        const v2 = t >= T.phone2
        const pp = v2 ? pop01(t, T.phone2, 0.3, 2) : pop01(t, T.phone - 0.1, 0.35, 2)
        phoneScreen(x, t, { x: 800, y: 720, w: 340, h: 470, app: 'notes', title: v2 ? 'WEDDING v2' : 'WEDDING v1', lines: v2 ? V2 : V1, clock: '7:06', pop: pp * (v2 ? 1 - prog(t, T.close - 0.3, T.close) : 1 - prog(t, T.fact - 0.3, T.fact)), rot: 0.05, size: 22 })
      }
      drawSeedConstellation(x, t, 100, { alpha: 0.32 })
      drawRecFrame(x, t, { battery: 0.46 })
      drawClock(x, t, { from: '7:02', to: t < T.share[0] ? '7:05' : '7:41', at: t < T.share[0] ? T.bell : T.share[0], dur: t < T.share[0] ? 0.4 : 0.6, ampm: 'PM', sign: 'leo' })
      factChip(x, t, { text: 'In traditional astrology, Leo rules the heart.', at: T.fact, dur: T.factDur, y: 720, label: '★ ASTROLOGY SAYS', w: 760 })
      hook.update(t); st1.update(t); box.update(t)
      last.update(t, outK(t, T.lastOut))
      drawGrain(gx, t)
    },
  }
}

const CUTS = [{ t: T.phone2 - 0.05, kind: 'flip' }]
export const SCENES = [build, (stage) => buildEndcard(stage, { start: STORY_END, cta: 'SIGN UP TO VOTE YOUR CITY' }), cardFrame({ start: 0, end: STORY_END, numeral: 'S9 E23' }), cardCuts(CUTS)]

const FX = { bus: 'sfx', rev: 0.15, dly: 0 }
const drumHits = Array.from({ length: 5 }, (_, i) => ['tom', r3(0.1 + i * 0.45), 150, { ...FX, gain: 0.12, decay: 0.15 }])
export const CUES = [
  ...hookPOVCues(0, { key: KEY }),
  ...drumHits, ['glitter', 0, 1.6],
  ['bell', T.bell, 1318.51, 0.04, 0.6, 0.5], ['bell', r3(T.bell + 0.22), 1046.5, 0.04, 0.8, 0.5],
  ...clockCues(T.bell, 0.4),
  ['pop', T.aquIn + 0.05, 880, 0.04, 0.4],
  ...stampCues(T.st1),
  ...phoneCues(V1, { app: 'notes' }),
  ...talkCues(LINES, { cps: CPS, pitch: { [LEON]: 740, [AQUN]: 988 } }),
  ['riser', T.budget[0], T.over, 0.06], ...Array.from({ length: 6 }, (_, i) => ['tick', r3(T.over + i * 0.125), 0.07]),
  ...gaspCues(T.gasp, { key: KEY }),
  ...factChipCues(T.fact, { dur: T.factDur }), ['pluck', T.chest[0] + 0.1, 659.25, 0.04, 0.8, 0], ['pluck', T.chest[0] + 0.45, 659.25, 0.035, 0.8, 0],
  ['pop', T.phone2, 987.77, 0.04, 0.3], ...phoneCues(V2, { app: 'notes' }),
  ['whoosh', T.budgetDown[0], 0.6, 0.03], ['bell', T.budgetDown[1], 1567.98, 0.03, 1.0, -0.3],
  ['tick', T.ghost + 0.05, 0.015],
  ...clockCues(T.share[0], 0.6), ['whoosh', T.share[0] + 0.1, 0.5, 0.03], ['pop', T.share[1], 1174.66, 0.04, 0],
  ['clap', T.popper, { ...FX, gain: 0.25 }], ['glitter', T.popper, T.popper + 1.2],
  ['pop', T.last, 880, 0.04, 0], ['pop', r3(T.last + 0.09), 987.77, 0.04, 0], ['pop', r3(T.last + 0.55), 1318.51, 0.05, 0], ['pluck', r3(T.last + 0.65), 1318.51, 0.045, 0.6, 0],
  ['clap', r3(T.last + 0.5), { ...FX, gain: 0.2 }], ['glitter', r3(T.last + 0.5), r3(T.last + 1.8)],
  ...cardCutCues(CUTS),
  ...endcardCues(STORY_END),
]
void cheers; void BONE
