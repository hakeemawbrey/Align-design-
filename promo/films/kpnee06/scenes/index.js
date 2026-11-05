// kpnee06: PLANET TALK: NEPTUNE, "Neptune to Virgo: One Line Blank" (27 s vertical, star_advice, jazzy · G). Loop.
//   0.00  frame 0: a starry whirlpool sucking up Virgo's endless checklist, Neptune mid-spin in the middle, Virgo mid-grab.
//         "Virgo. Nobody matches | the *whole* list." · 0.55 whip zoom
//   2.6   the list scrolls forever (kind, honest, shows up … likes the same font … folds towels in thirds …).
//         "it's only *forty* points." · Neptune: "even in my films, nobody matches the *script.*"
//   9.6   gold circles round 1–3: "keep the ones that matter: *kind, honest, shows up.*" · Virgo strikes "likes the same
//         font": "loosen the rest. leave room to be *surprised.*"
//  17.0   someone sweet waves: "hi! I fold towels *wrong.*" · Virgo: "…that's *fine.* actually." · Pisces fountains
//  23.8   "Leave one line *blank.*" The loop eases back into the whirlpool.
import { episode, P, drawSpace, drawSign, pop01, outK, prog, ease, lerp, clamp, INK, BONE, GOLD, ROSE, NEP, MONO, INTER } from '../../kpnee01/scenes/nepkit.js'

const D = 27
const T = { list: 2.6, nep1: 5.6, keep: 9.6, loosen: 13.6, sweet: 17.0, fine: 20.0, end: 23.8 }
const SWEET = '#ffb38a'
const ITEMS = ['kind', 'honest', 'shows up', 'texts back same day', 'likes the same font', 'folds towels in thirds', 'alphabetised spices', 'owns a label maker', 'never says "irregardless"', 'plans dates 2 weeks ahead', 'perfect handwriting', 'same bedtime as me', 'reads the instructions']

function whirl(x, t, k = 1) {
  drawSpace(x, t, { planet: 'neptune', seed: 61 })
  x.save(); x.translate(540, 820)
  for (let i = 0; i < 9; i++) {
    x.strokeStyle = `rgba(${i % 2 ? '127,224,255' : '201,166,255'},${0.35 * k})`; x.lineWidth = 18 - i
    x.beginPath()
    for (let a = 0; a < 7; a += 0.08) { const r = 40 + a * 70 + i * 6, aa = a + t * 2.2 + i * 0.7; const px = Math.cos(aa) * r, py = Math.sin(aa) * r * 0.55; a ? x.lineTo(px, py) : x.moveTo(px, py) }
    x.stroke()
  }
  x.restore()
}
function sucked(x, t) {
  // the checklist spiralling into the whirlpool
  for (let i = 0; i < 7; i++) {
    const ph = (t * 0.35 + i / 7) % 1, a = ph * 9 + i, r = lerp(620, 60, ph)
    const px = 540 + Math.cos(a) * r, py = 820 + Math.sin(a) * r * 0.55
    x.save(); x.translate(px, py); x.rotate(a); x.scale(1 - ph * 0.7, 1 - ph * 0.7)
    P.box(x, 0, 0, 300, 80, '#fbf6ea', { r: 6, lw: 5, shadow: false })
    x.font = `700 24px ${MONO}`; x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(`☐ ${ITEMS[(i * 3) % ITEMS.length]}`.slice(0, 22), 0, 0)
    x.restore()
  }
}
function list(x, t, { scroll = 0, keep = 0, strike = 0, k = 1 } = {}) {
  if (k <= 0.01) return
  x.save(); x.translate(470, 800); x.scale(k, k)
  P.box(x, 0, 0, 720, 820, '#fbf6ea', { r: 10, lw: 8 })
  x.save(); x.beginPath(); x.rect(-350, -400, 700, 800); x.clip()
  x.font = `700 31px ${MONO}`; x.textAlign = 'left'; x.textBaseline = 'middle'
  P.mono(x, 'MY PERSON:', 0, -350, { color: INK, size: 40 })
  for (let n = 0; n < 40; n++) {
    const y = -270 + n * 66 - scroll
    if (y < -330 || y > 420) continue
    const it = ITEMS[n % ITEMS.length]
    x.fillStyle = INK; x.fillText(`${n + 1}. ${n < ITEMS.length ? it : '…' + it}`, -320, y)
    if (n === 4 && strike > 0) { x.strokeStyle = '#ff3b3b'; x.lineWidth = 8; x.beginPath(); x.moveTo(-330, y); x.lineTo(-330 + 640 * strike, y - 4); x.stroke() }
    if (n < 3 && keep > 0) { const p = clamp(keep * 3 - n); x.strokeStyle = GOLD; x.lineWidth = 8; x.beginPath(); x.ellipse(-180, y, 170 * p, 34 * p, 0, 0, Math.PI * 2); x.stroke() }
  }
  x.restore()
  P.mono(x, `${Math.min(40, Math.round(scroll / 66) + 9)}/40`, 280, 370, { color: '#d0303f', size: 32 })
  x.restore()
}

const E = episode({
  sign: 'virgo', duration: D, ending: 'loop',
  entrance: { kind: 'spin', at: -0.5, x: 540, y: 820, size: 400 },
  hook: { text: 'Virgo. Nobody matches | the *whole* list.', out: [2.35, 2.55], size: 104 },
  fx: [{ kind: 'whip', at: 0.55 }],
  caps: [{ at: T.end, text: 'Leave one line | *blank.*', top: 250, size: 116, out: [D - 0.5, D - 0.3] }],
  cry: [[0, 2], [4.0, 3], [6.5, 2], [11.0, 3], [13.5, 2], [17.8, 3], [T.end, 2]],
  shots: [
    { a: -1, b: T.list, bg: (x, t) => { whirl(x, t); sucked(x, t) },
      nep: { x: 540, y: 820, size: 400, mood: 'wide' }, sign: { x: 760, y: 1450, size: 290, mood: 'wide', look: [-1, -1] } },
    { a: T.list, b: T.keep, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 62 }), mid: (x, t) => list(x, t, { scroll: Math.max(0, t - T.list - 0.8) * 260, k: pop01(t, T.list, 0.4) }),
      nep: { x: 170, y: 1340, size: 240, mood: [[0, 'wide'], [T.nep1, 'happy']] }, sign: { x: 820, y: 1400, size: 280, mood: [[0, 'proud']], look: [-1, -1] } },
    { a: T.keep, b: T.sweet, bg: (x, t) => drawSpace(x, t, { planet: 'neptune', seed: 62 }), mid: (x, t) => list(x, t, { scroll: 0, keep: prog(t, T.keep + 0.3, T.keep + 1.6), strike: prog(t, T.loosen + 0.4, T.loosen + 1.2) }),
      nep: { x: 170, y: 1340, size: 240, mood: [[0, 'happy'], [T.loosen, 'love']] }, sign: { x: 820, y: 1400, size: 280, mood: [[0, 'neutral'], [T.loosen + 1.2, 'happy']], look: [-1, -1] } },
    { a: T.sweet, b: T.end, bg: (x, t) => { drawSpace(x, t, { planet: 'neptune', seed: 63 }); P.filmEdge(x, t, { alpha: 0.5 }) },
      back: (x, t) => { drawSign(x, 'libra', 330, 1000, 300, t, { color: SWEET, glyph: false, mood: 'happy', look: [1, 0.3], seed: 5, hops: [T.sweet + 0.2, T.sweet + 0.6, T.sweet + 1.0] }); P.sticker(x, 'not on the list', 330, 760, { k: pop01(t, T.sweet + 0.4, 0.3), col: GOLD, size: 34 }) },
      front: (x, t) => P.hearts(x, t, T.fine + 0.3, 600, 1200, { n: 10, spread: 600 }),
      nep: { x: 200, y: 1550, size: 200, mood: 'love' }, sign: { x: 760, y: 1240, size: 290, mood: [[0, 'wide'], [T.fine, 'happy'], [T.fine + 1.4, 'heart']], look: [-1, -0.2] } },
    { a: T.end, b: D + 1, tr: 0.5, bg: (x, t) => { whirl(x, t, prog(t, T.end, T.end + 1)); if (t > T.end + 1.5) sucked(x, t) },
      nep: { x: 540, y: 820, size: 400, mood: 'love' }, sign: { x: 760, y: 1450, size: 290, mood: 'happy', look: [-1, -1] } },
  ],
  lines: [
    { t0: T.list + 0.4, t1: T.nep1 - 0.25, who: 'virgo', text: "it's only *forty* points.", x: 600, y: 1720, tailUp: true, tail: 200 },
    { t0: T.nep1, t1: T.keep - 0.2, who: 'neptune', text: 'even in my films, nobody matches the *script.*', x: 520, y: 1720, tailUp: true, tail: -250 },
    { t0: T.keep + 0.2, t1: T.loosen - 0.2, who: 'neptune', text: 'keep the ones that matter: *kind, honest, shows up.*', x: 540, y: 1720, tailUp: true, tail: -250 },
    { t0: T.loosen, t1: T.sweet - 0.2, who: 'neptune', text: 'loosen the rest. leave room to be *surprised.*', x: 540, y: 1720, tailUp: true, tail: -250 },
    { t0: T.sweet + 0.5, t1: T.fine - 0.2, who: 'someone sweet', color: SWEET, text: 'hi! I fold towels *wrong.*', x: 400, y: 1560, tailUp: true, tail: -80 },
    { t0: T.fine, t1: T.end - 0.2, who: 'virgo', text: "…that's *fine.* actually.", x: 640, y: 1600, tailUp: true, tail: 120 },
  ],
  cues: [['whoosh', T.list, 0.4, 0.04], ...Array.from({ length: 12 }, (_, i) => ['tick', +(T.list + 0.9 + i * 0.22).toFixed(2), 0.025]), ['glitter', T.keep + 0.3, T.keep + 1.6], ['whoosh', T.loosen + 0.4, 0.3, 0.05], ['pop', T.sweet + 0.2, 987.77, 0.05, -0.2], ['glitter', T.fine + 1.4, T.fine + 2]],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
