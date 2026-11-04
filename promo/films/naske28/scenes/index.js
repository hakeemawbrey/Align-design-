// naske28 · Ask the Stars, Volume 2, ep 28 · "I'm spending the holidays alone." (18 s, dreamy · C)
// The format lives in ../../naske19/scenes/askkit2.js. Story 0–15.6, then the short shared end card (2.4 s).
//   0.0   DM: "I'm spending the holidays *alone.*"  ♋ Cancer mid-set of a little table for one, lowering a paper crown
//         onto its own head; snow falls past the window.
//   3.0   "alone can still be warm. plan it."  The table fills: a plate of its favourite, a candle.
//   5.9   "cook your favorite. call someone you love."  A phone with a heart rings: "SIS". Cancer answers, beaming.
//   8.8   "and if an invite comes, yes is allowed."  An envelope slides in: "you're invited!"
//   12.1  "Be your own | *warm* place."
import { makeAsk, R, box, drawBits, mug, bubble, sparkles, hearts, shadow, inSprite, starFrame, label, pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, RED, SNOW, MONO, INTER } from '../../naske19/scenes/askkit2.js'

const CROWN = ['G.G.G.G', 'GGGGGGG', 'GRGGGBG', 'GGGGGGG']
const PHONE = ['KKKKKKK', 'KSSSSSK', 'KSHSHSK', 'KSHHHSK', 'KSSHSSK', 'KSSSSSK', 'KKKOKKK']

function windowFrame(x, t, X, Y, w, h) {
  R(x, INK, X - 12, Y - 12, w + 24, h + 24); R(x, '#1d2350', X, Y, w, h)
  x.save(); x.beginPath(); x.rect(X, Y, w, h); x.clip()
  for (let i = 0; i < 16; i++) { const yy = Y + ((i * 97 + t * (50 + i * 3)) % (h + 20)) - 10; const xx = X + (i * 53) % w + Math.sin(t + i) * 8; x.fillStyle = SNOW; x.fillRect(Math.round(xx), Math.round(yy), 8, 8) }
  R(x, '#e8eef9', X, Y + h - 30, w, 30)
  x.restore()
  R(x, '#c46a8a', X + w / 2 - 5, Y, 10, h); R(x, '#c46a8a', X, Y + h / 2 - 5, w, 10)
}
function table(x, cx, by) { box(x, cx - 200, by - 30, 400, 30, '#8a5a32', { b: 6, hi: '#a8743f' }); R(x, INK, cx - 170, by, 18, 120); R(x, INK, cx + 152, by, 18, 120) }

function scene(x, t, S) {
  const { k, out } = S
  if (k <= 2) {
    windowFrame(x, t, 110, 600, 260, 300)
    table(x, 720, 1080)
    if (k >= 1) {
      const pk = pop01(t, S.b[1] + 0.3, 0.35, 2.4)
      x.save(); x.translate(680, 1035); x.scale(pk, pk)
      R(x, INK, -90, -16, 180, 32); R(x, BONE, -84, -12, 168, 24); R(x, '#e8a03c', -50, -34, 100, 26); R(x, INK, -50, -38, 100, 6); R(x, '#7fbf5a', 10, -30, 24, 10)
      x.restore()
      const ck = pop01(t, S.b[1] + 0.7, 0.3, 2.4)
      if (ck > 0.01) { box(x, 830 - 12 * ck, 1050 - 60 * ck, 24 * ck, 60 * ck, BONE, { b: 4 }); const f = 1 + 0.15 * Math.sin(t * 17); R(x, '#ffb03c', 830 - 7 * ck, 1050 - (60 + 24 * f) * ck, 14 * ck, 24 * f * ck) }
      sparkles(x, t, 720, 1000, S.b[1] + 0.35, 8, 140, 1)
    }
    const o = { x: 470, y: 1010, s: 270, mood: k === 0 ? 'neutral' : k === 2 && t > S.b[2] + 0.9 ? 'sparkle' : 'happy', look: k === 0 ? [0, -1] : [1, 0], hops: [0.9, ...S.hops(0), ...S.hops(1)] }
    shadow(x, 470, 1180, 230)
    S.hero(x, t, o)
    // the paper crown: lowered onto its own head in the hook, then worn
    const F = starFrame(o.x, o.y, o.s, t, o)
    const drop = k === 0 ? ease.outCubic(prog(t, -0.3, 0.9)) : 1
    const topY = F.cy - F.S * 0.5 + 6
    drawBits(x, CROWN, { G: GOLD, R: RED, B: '#4fb3ff' }, o.x, lerp(topY - 160, topY, drop), 11, { rot: 0.08 })
    if (k === 2) {
      const pk = pop01(t, S.b[2] + 0.2, 0.35, 2.4)
      const ring = t < S.b[2] + 0.9
      drawBits(x, PHONE, { K: '#2b2140', S: '#ffd6dc', H: '#ff5c8a', O: '#5a5470' }, 760, 820 + (ring ? Math.sin(t * 50) * 4 : 0), 16 * pk, { rot: ring ? Math.sin(t * 40) * 0.08 : 0.1 })
      if (pk > 0.5) label(x, 'SIS', 760, 680, { size: 40, col: '#ffd6dc' })
      if (!ring) bubble(x, t, 640, 600, S.b[2] + 1.0, S.b[3], 'hi!! guess what i made', { size: 38, tail: -0.3 })
    }
    return
  }
  // beat 3: the invite slides in
  const kk = pop01(t, S.b[3] - 0.05, 0.4, 2) * out
  const sl = ease.outCubic(prog(t, S.b[3] + 0.3, S.b[3] + 0.9))
  shadow(x, 330, 1180, 230 * kk)
  const o = { x: 330, y: 1010, s: 270, pop: kk, mood: t > S.b[3] + 1.0 ? 'sparkle' : 'neutral', look: [1, -0.3], hops: S.hops(2) }
  S.hero(x, t, o)
  const F = starFrame(o.x, o.y, o.s, t, o)
  drawBits(x, CROWN, { G: GOLD, R: RED, B: '#4fb3ff' }, o.x, F.cy - F.S * 0.5 + 6, 11 * kk, { rot: 0.08 })
  x.save(); x.translate(lerp(1300, 740, sl), 880); x.rotate(-0.08 * sl)
  box(x, -190, -120, 380, 240, '#f7e9c4', { b: 7 })
  x.strokeStyle = '#c9b48a'; x.lineWidth = 6; x.beginPath(); x.moveTo(-190, -120); x.lineTo(0, 20); x.lineTo(190, -120); x.stroke()
  R(x, INK, -26, -6, 52, 52); R(x, '#e8414f', -20, 0, 40, 40)
  x.font = `italic 500 44px 'EB Garamond', serif`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = INK; x.fillText("you're invited!", 0, 86)
  x.restore()
  sparkles(x, t, 740, 880, S.b[3] + 0.9, 10, 260, 1)
  hearts(x, t, S.b[3] + 1.2, 330, 820, { n: 4, cell: 6, spread: 100 })
}

const EP = makeAsk({
  sign: 'cancer', name: 'CANCER', partner: 'taurus',
  question: "I'm spending the | holidays *alone.*",
  lines: ['alone can still be warm. plan it.', 'cook your favorite. call someone you love.', 'and if an invite comes, yes is allowed.'],
  chip: '♋ NATURAL RULER OF THE 4TH HOUSE: HOME',
  last: 'Be your own | *warm* place.', lastLate: 2,
  scene,
  pis: { x: 965, y: 1270, s: 100 },
  cues: [
    ['pluck', 0.85, 1318.51, 0.03, 0.6, 0], ['glitter', 0.85, 1.2],
    ['pop', 3.35, 1046.5, 0.035, 0.2], ['pop', 3.75, 1318.51, 0.03, 0.4],
    ['bell', 6.15, 1567.98, 0.025, 0.3, 0.3], ['bell', 6.45, 1567.98, 0.025, 0.3, 0.3], ['bell', 6.75, 1567.98, 0.025, 0.3, 0.3], ['pop', 6.95, 987.77, 0.035, 0.3],
    ['whoosh', 9.1, 0.4, 0.035], ['pop', 9.7, 1174.66, 0.04, 0.3], ['glitter', 9.7, 10.2],
  ],
})
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
