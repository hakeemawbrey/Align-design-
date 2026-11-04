// naske24 · Ask the Stars, Volume 2, ep 24 · "How do I comfort someone who's sad?" (18 s, dreamy · Ab)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "How do I *comfort* someone who's sad?"  ♓ Pisces mid-tiptoe toward a partner sitting under a little
//         grey cloud, holding out a tissue box, already teary.
//   3.0   "sit with them. you don't need the perfect words."  Pisces sits down beside the partner. Quiet.
//   5.9   "ask: 'want a hug, or some quiet?'"  Two pixel buttons: HUG · QUIET. HUG lights up; they hug.
//   8.8   "then bring a blanket and their favorite snack."  A blanket over both, a snack bowl; the
//         cloud melts into sparkles.
//   12.1  "Just *stay* close."  (finale: Pisces and the partner, both happy-crying)
import { makeAsk, R, box, drawBits, bubble, sparkles, hearts, shadow, inSprite, starFrame, tearsCells, tissues, label, drawStarChar, signStar, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, INTER, T } from '../../naske19/scenes/askkit2.js'

const PART = signStar('virgo')
const BOWL = ['.YOYOYOY.', 'YOYOYOYOY', 'BBBBBBBBB', '.BBBBBBB.', '..BBBBB..']

function cloud(x, t, cx, cy, a, k = 1.45) {
  if (a <= 0) return
  x.save(); x.globalAlpha *= a; x.translate(cx, cy + Math.sin(t * 1.6) * 6); x.scale(k, k)
  const P = [[-70, 0, 70], [0, -30, 80], [70, 0, 70], [0, 20, 90]]
  for (const [dx, dy, r] of P) { R(x, INK, dx - r / 2 - 6, dy - r / 3 - 6, r + 12, r * 0.66 + 12) }
  for (const [dx, dy, r] of P) { R(x, '#8a8fa8', dx - r / 2, dy - r / 3, r, r * 0.66) }
  R(x, '#a8adc4', -60, -40, 90, 14)
  // a few slow grey flakes falling from it
  for (let i = 0; i < 4; i++) { const ph = (t * 0.7 + i / 4) % 1; x.globalAlpha = a * (1 - ph); x.fillStyle = '#b8bdd4'; x.fillRect(-60 + i * 40, 50 + ph * 120, 8, 8) }
  x.restore()
}
function sadPartner(x, t, o, mood = 'neutral', tears = 1) {
  drawStarChar(x, o.x, o.y, o.s, t, { color: PART.color, glyph: o.s >= 150 ? PART.glyph : null, mood, look: o.look || [0, 0.8], seed: 9, glow: 0.7, pop: o.pop ?? 1, hops: o.hops, squash: o.squash || 0 })
  if (tears) inSprite(x, starFrame(o.x, o.y, o.s, t, { pop: o.pop ?? 1, hops: o.hops, seed: 9, squash: o.squash || 0 }), () => tearsCells(x, t, tears))
}
function button(x, cx, cy, text, on, col) {
  const w = 230, h = 100
  R(x, INK, cx - w / 2 - 6, cy - h / 2 - 6 + 10, w + 12, h + 12)
  R(x, on ? col : '#4a4466', cx - w / 2, cy - h / 2 + (on ? 8 : 0), w, h)
  x.font = `800 46px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = on ? INK : BONE; x.fillText(text, cx, cy + (on ? 10 : 2))
}

function scene(x, t, S) {
  const { k, out } = S
  const PX = 700
  if (k === 0) {
    shadow(x, PX, 1180, 220); cloud(x, t, PX, 780, 1)
    sadPartner(x, t, { x: PX, y: 1040, s: 240, squash: 0.08 }, 'neutral', 1)
    const hx = lerp(190, 330, ease.inOutQuad(prog(t, -0.6, 2.8)))
    shadow(x, hx, 1180, 220)
    const F = S.pisces(x, t, { x: hx, y: 1030, s: 250, hops: [0.15, 0.75, 1.35, 1.95, 2.55] }, 2, 'wide', [1, 0])
    tissues(x, hx + 150, F.cy + 10, 110)
    return
  }
  if (k === 1) {
    shadow(x, PX, 1180, 220); cloud(x, t, PX, 780, 1)
    sadPartner(x, t, { x: PX, y: 1040, s: 240, squash: 0.08, look: [-0.6, 0.6] }, 'neutral', 1)
    const sit = ease.outCubic(prog(t, S.b[1] + 0.1, S.b[1] + 0.6))
    shadow(x, 430, 1180, 220)
    S.pisces(x, t, { x: 430, y: lerp(1030, 1060, sit), s: 240, hops: S.hops(0), squash: 0.08 * sit }, 2, 'neutral', [1, 0.4])
    tissues(x, 565, 1150, 90)
    label(x, '(quiet)', 560, 640, { size: 34, col: '#c9b8f0', alpha: clamp((t - S.b[1] - 1.2) * 2) })
    return
  }
  if (k === 2) {
    const u = t - S.b[2]
    const hug = u > 1.3
    shadow(x, PX, 1180, 220); cloud(x, t, PX, 780, 1 - 0.4 * prog(u, 1.3, 2.4))
    if (!hug) {
      button(x, 380, 620, 'HUG', u > 0.9 && Math.floor(u * 8) % 2 === 0 ? true : u > 1.1, '#ff8fb1')
      button(x, 700, 620, 'QUIET', false, '#9fd8ff')
      sadPartner(x, t, { x: PX, y: 1040, s: 240, look: [-0.8, -0.6] }, 'neutral', 1)
      S.pisces(x, t, { x: 430, y: 1060, s: 240, hops: S.hops(1), squash: 0.06 }, 2, 'neutral', [1, -0.2])
    } else {
      // the hug: both lean in, hearts
      const lean = ease.outCubic(prog(u, 1.3, 1.6))
      sadPartner(x, t, { x: lerp(PX, 610, lean), y: 1040, s: 240, look: [-1, 0], hops: [S.b[2] + 1.35] }, 'happy', 1)
      S.pisces(x, t, { x: lerp(430, 470, lean), y: 1050, s: 240, hops: [S.b[2] + 1.35] }, 3, 'happy', [1, 0])
      hearts(x, t, S.b[2] + 1.5, 540, 860, { n: 5, cell: 7, spread: 160 })
      label(x, 'HUG ✓', 540, 640, { size: 46, col: '#ff8fb1' })
    }
    return
  }
  // beat 3: a blanket over both, a snack bowl, the cloud melting into sparkles
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  const melt = prog(t, S.b[3] + 0.9, S.b[3] + 1.8)
  cloud(x, t, 540, 740, 1 - melt, 1.45 * (1 - 0.4 * melt))
  sparkles(x, t, 540, 740, S.b[3] + 1.5, 14, 200, 1, [GOLD, BONE, '#9fd8ff'])
  S.pisces(x, t, { x: 420, y: 1020, s: 230, pop: kk, hops: S.hops(2) }, 2, 'sparkle', [1, 0])
  sadPartner(x, t, { x: 660, y: 1020, s: 230, pop: kk, look: [-1, 0], hops: [S.b[3] + 1.9] }, melt > 0.6 ? 'happy' : 'neutral', melt > 0.6 ? 0 : 1)
  const bk = pop01(t, S.b[3] + 0.3, 0.4, 1.8) * kk
  if (bk > 0.01) {
    x.save(); x.translate(540, 1110); x.scale(bk, bk)
    box(x, -300, -50, 600, 120, '#c0587a', { b: 7, hi: '#d97a98' })
    for (let i = 0; i < 6; i++) R(x, '#f2c75c', -280 + i * 100, -40, 40, 100)
    x.restore()
  }
  const sk = pop01(t, S.b[3] + 0.6, 0.3, 2.4) * kk
  if (sk > 0.01) drawBits(x, BOWL, { Y: '#ffd34d', O: '#ff9a4a', B: '#7fd0ff' }, 540, 1060, 12 * sk)
  hearts(x, t, S.b[3] + 2.0, 540, 880, { n: 4, cell: 6, spread: 200 })
}

function finale(x, t, S) {
  const hk = pop01(t, T.finIn, 0.4, 2.2) * S.ok, pk = pop01(t, T.pisIn, 0.38, 2.2) * S.ok
  if (hk > 0.01) { shadow(x, 330, 1420, 260 * hk); S.pisces(x, t, { x: 330, y: 1220, s: 330, pop: hk, hops: S.FIN_HOPS, tips: true }, t > T.lastLand ? 3 : 2, 'sparkle', [0.6, -0.3]) }
  if (pk > 0.01) {
    shadow(x, 770, 1420, 240 * pk)
    sadPartner(x, t, { x: 770, y: 1240, s: 280, pop: pk, look: [-0.6, -0.3], hops: [T.pisIn + 0.3, T.lastLand + 0.1] }, 'sparkle', 2)
    tissues(x, 550, 1400, 100 * pk)
  }
  hearts(x, t, T.lastLand + 0.1, 550, 1080, { n: 6, cell: 7, spread: 260 })
}

const EP = makeAsk({
  sign: 'pisces', name: 'PISCES', partner: 'virgo', pis: false,
  question: "How do I *comfort* | someone who's sad?", qSize: 82,
  lines: ["sit with them. you don't need perfect words.", "ask: 'want a hug, or some quiet?'", 'then bring a blanket and their favorite snack.'],
  chip: '♓ MUTABLE WATER · JUPITER (TRAD.) · NEPTUNE (MODERN)',
  last: 'Just *stay* close.', lastLate: 2,
  scene, finale,
  cues: [
    ['tick', 0.15, 0.025], ['tick', 0.75, 0.025], ['tick', 1.35, 0.025], ['tick', 1.95, 0.025], ['tick', 2.55, 0.025],
    ['whoosh', 3.2, 0.2, 0.02], ['tom', 3.6, 110, { gain: 0.12, decay: 0.2 }],
    ['pop', 6.8, 880, 0.03, -0.3], ['pop', 7.0, 1046.5, 0.04, -0.3], ['glitter', 7.2, 7.6], ['pluck', 7.25, 1318.51, 0.04, 0.6, 0],
    ['whoosh', 9.1, 0.3, 0.03], ['pop', 9.45, 987.77, 0.035, 0], ['glitter', 10.3, 10.9],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
