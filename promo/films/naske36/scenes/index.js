// naske36 · Ask the Stars, Volume 2, ep 36 · "How do I know it's real this time?" (18 s, dreamy · Db)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "How do I know it's *real* this time?"  ♓ Pisces mid-lift of a pair of rose-tinted glasses off its face,
//         already teary; everything has a pink wash.
//   3.0   "real feels calm, not just exciting."  The glasses come off; the pink wash fades and the night stays warm.
//   5.9   "they show up on the boring days too."  A week of plain days: MON… SUN; a little star lands on each.
//   8.8   "and you feel like yourself around them."  Pisces and the partner on a bench in the snow,
//         happy tears.
//   12.1  "Real feels *calm.*"  (finale: Pisces and the partner, both happy-crying)
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, tearsCells, tissues, snowBank, label, drawStarChar, drawPixelStar, signStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, MONO, T } from '../../naske19/scenes/askkit2.js'

const PART = signStar('capricorn')
function glassesCells(x, up) {
  const y = 16.4 - up * 9
  for (const ex of [13.4, 22.6]) { x.fillStyle = INK; x.fillRect(ex - 3.8, y - 0.8, 7.6, 5.6); x.fillStyle = 'rgba(255,120,170,0.85)'; x.fillRect(ex - 3, y, 6, 4); x.fillStyle = 'rgba(255,255,255,0.8)'; x.fillRect(ex - 2.4, y + 0.6, 1.6, 0.8) }
  x.fillStyle = INK; x.fillRect(16.6, y + 0.6, 2.8, 1.2)
}
function partner(x, t, o, mood = 'happy', tears = 0) {
  drawStarChar(x, o.x, o.y, o.s, t, { color: PART.color, glyph: o.s >= 150 ? PART.glyph : null, mood, look: o.look || [-1, 0], seed: 9, glow: 1, pop: o.pop ?? 1, hops: o.hops })
  if (tears) inSprite(x, starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: 9 }), () => tearsCells(x, t, tears))
}

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 1) {
    const up = k === 0 ? 0.25 + 0.15 * Math.sin(t * 3) : ease.inOutCubic(prog(t, S.b[1] + 0.1, S.b[1] + 0.7))
    const o = { x: 540, y: 1010, s: 310, hops: [0.5, ...S.hops(0)] }
    shadow(x, 540, 1185, 260)
    const F = S.pisces(x, t, o, 1, up > 0.9 ? 'sparkle' : 'neutral', [0, -0.3])
    if (up < 1) inSprite(x, F, () => glassesCells(x, up))
    else {
      // the glasses, set aside on the ground
      const gk = pop01(t, S.b[1] + 0.7, 0.3, 2.4)
      x.save(); x.translate(800, 1170); x.scale(gk, gk)
      for (const dx of [-36, 36]) { R(x, INK, dx - 30, -22, 60, 44); R(x, 'rgba(255,120,170,0.85)', dx - 24, -16, 48, 32) }
      R(x, INK, -8, -8, 16, 8); x.restore()
    }
    // the pink wash over the whole scene, fading as the glasses come off
    const wash = k === 0 ? 1 : 1 - up
    if (wash > 0) { x.save(); x.globalCompositeOperation = 'source-over'; x.globalAlpha = 0.22 * wash; x.fillStyle = '#ff6fa8'; x.fillRect(0, 0, 1080, 1920); x.restore() }
    if (k === 0) for (let i = 0; i < 5; i++) { const ph = (t * 0.5 + i / 5) % 1; x.save(); x.globalAlpha = Math.sin(Math.PI * ph); drawBits(x, ['.HH.HH.', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...'], { H: '#ff8fb1' }, 200 + i * 170, 900 - ph * 260, 6); x.restore() }
    if (k === 1 && up >= 1) label(x, 'still lovely. just real.', 540, 700, { size: 34, col: '#ffd28a', alpha: clamp((t - S.b[1] - 1.0) * 2.5) })
    return
  }
  if (k === 2) {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
    const u = t - S.b[2]
    days.forEach((d, i) => {
      const cx = 135 + i * 135, cy = 760
      const dk = pop01(t, S.b[2] + 0.05 + i * 0.05, 0.3, 2)
      x.save(); x.translate(cx, cy); x.scale(dk, dk)
      box(x, -54, -70, 108, 140, '#e9e2d4', { b: 5 }); R(x, '#8a84a8', -54, -70, 108, 34)
      x.font = `700 24px ${MONO}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = BONE; x.fillText(d, 0, -52)
      x.restore()
      const sk = pop01(t, S.b[2] + 0.7 + i * 0.22, 0.3, 2.6)
      if (sk > 0.01) drawPixelStar(x, cx, cy + 16, 54 * sk, 2, GOLD)
    })
    if (u > 2.3) label(x, 'every. plain. day.', 540, 920, { size: 34, col: GOLD, alpha: clamp((u - 2.3) * 3) })
    shadow(x, 380, 1185, 200); shadow(x, 700, 1185, 200)
    S.pisces(x, t, { x: 380, y: 1060, s: 220, hops: S.hops(1) }, 1, 'happy', [0.6, -0.6])
    partner(x, t, { x: 700, y: 1060, s: 220, look: [-0.6, -0.6], hops: [S.b[2] + 1.0, S.b[2] + 2.0] }, 'neutral')
    return
  }
  // beat 3: the bench in the snow
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  snowBank(x, 1215, { a: kk })
  x.save(); x.globalAlpha = kk
  box(x, 240, 1080, 600, 40, '#8a5a32', { b: 6, hi: '#a8743f' }); box(x, 240, 980, 600, 30, '#8a5a32', { b: 6, hi: '#a8743f' })
  R(x, INK, 270, 1120, 20, 80); R(x, INK, 790, 1120, 20, 80)
  x.restore()
  S.pisces(x, t, { x: 410, y: 1000, s: 230, pop: kk, hops: S.hops(2) }, t > S.b[3] + 1.2 ? 2 : 1, 'sparkle', [1, 0])
  partner(x, t, { x: 670, y: 1000, s: 230, pop: kk, look: [-1, 0], hops: [S.b[3] + 1.6] }, 'happy')
  hearts(x, t, S.b[3] + 1.2, 540, 820, { n: 6, cell: 7, spread: 200 })
}

function finale(x, t, S) {
  const hk = pop01(t, T.finIn, 0.4, 2.2) * S.ok, pk = pop01(t, T.pisIn, 0.38, 2.2) * S.ok
  if (hk > 0.01) { shadow(x, 330, 1420, 260 * hk); S.pisces(x, t, { x: 330, y: 1220, s: 330, pop: hk, hops: S.FIN_HOPS, tips: true }, t > T.lastLand ? 3 : 2, 'sparkle', [0.6, -0.3]) }
  if (pk > 0.01) { shadow(x, 770, 1420, 240 * pk); partner(x, t, { x: 770, y: 1240, s: 280, pop: pk, look: [-0.6, -0.3], hops: [T.pisIn + 0.3, T.lastLand + 0.1] }, 'happy'); tissues(x, 550, 1400, 100 * pk) }
  hearts(x, t, T.lastLand + 0.1, 550, 1080, { n: 6, cell: 7, spread: 260 })
}

const EP = makeAsk({
  sign: 'pisces', name: 'PISCES', partner: 'capricorn', pis: false,
  question: "How do I know it's | *real* this time?",
  lines: ['real feels calm, not just exciting.', 'they show up on the boring days too.', 'and you feel like yourself around them.'],
  chip: '♓ NATURAL RULER OF THE 12TH HOUSE: DREAMS & REST',
  last: 'Real feels | *calm.*',
  scene, finale,
  cues: [
    ['pluck', 0.5, 1318.51, 0.02, 0.6, 0], ['glitter', 0.2, 0.7],
    ['whoosh', 3.15, 0.4, 0.03], ['bell', 3.75, 1046.5, 0.025, 1.2, 0], ['pop', 3.8, 659.25, 0.03, 0.3],
    ['pop', 6.6, 880, 0.02, -0.6], ['pop', 6.82, 987.77, 0.02, -0.4], ['pop', 7.04, 1046.5, 0.02, -0.2], ['pop', 7.26, 1174.66, 0.02, 0], ['pop', 7.48, 1318.51, 0.02, 0.2], ['pop', 7.7, 1479.98, 0.02, 0.4], ['pop', 7.92, 1567.98, 0.02, 0.6],
    ['whoosh', 9.1, 0.3, 0.025], ['glitter', 10.0, 10.5], ['pluck', 10.1, 1174.66, 0.03, 0.6, 0],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
