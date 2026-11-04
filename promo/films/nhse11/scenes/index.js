// nhse11: HOLIDAY SURVIVAL GUIDE No. 11, "Cried at a Mitten." (30 s vertical, Next 30 · b29, music: cinematic · Ebm)
// The series look lives in ../../nhse01/survkit.js. This time Pisces is the hero (so the crying is the whole plot).
//   0.0–6.6    "Cried at a | *mitten.*"  ♓ Pisces holds up one tiny knitted mitten, tears already streaming, by the tree.
//   6.6–13.9   "Then a cookie. | *Then* a sweater."  Every little thing is a memory: an ornament, a cookie, a sweater
//              each pop up, the tissue box empties, a second box slides in, then a third drops from above.
//              ♓: "it's fine. it's a GOOD cry."
//   13.9       card cut.
//   13.9–21.6  "Big season. | *Big feelings.*"  THE STARS: "big season, *big feelings*. normal." / "water, a walk,
//              and one person *who gets it*." A glass of water, a walk in the snow, then a call: ♋ Cancer holds up the
//              other mitten. Both laugh through the tears.
//   21.6–25.6  "Packed: | *pocket tissues.*"  THE STARS: "Cry at the mitten. Call your person."
import { makeSurv, R, box, ink, room, tissues, phone, snow, drawBits, sparkles, hearts, label, shadow, bubble,
  pop01, outK, prog, lerp, clamp, ease, INK, BONE, GOLD, PINK, MINT, RED, PINE, INTER } from '../../nhse01/survkit.js'

const PIS = '#c9a6ff'
const MITT = ['.KKK....', 'KKKKK.KK', 'KKKKKKKK', 'KKKKKKK.', 'KKKKKK..', 'WWWWWW..', 'WWWWWW..']
function mitten(x, cx, cy, s, rot = 0, flip = false) { drawBits(x, MITT, { K: RED, W: BONE }, cx, cy, 10 * s, { rot, sx: flip ? -1 : 1 }) }
function tree(x, t, cx, by, h) {
  for (let i = 0; i < 4; i++) { const w = h * (0.3 + i * 0.16), y = by - h + i * h * 0.2; box(x, cx - w / 2, y + h * 0.1, w, h * 0.2, PINE, { b: 5 }) }
  R(x, '#6b3f2a', cx - 16, by - h * 0.1, 32, h * 0.12)
  drawBits(x, ['..G..', '.GGG.', 'GGGGG', '.G.G.'], { G: GOLD }, cx, by - h + 20, 7)
  for (let i = 0; i < 8; i++) { const on = Math.sin(t * 3 + i) > 0; R(x, on ? ['#ff5c6c', GOLD, '#7fd0ff'][i % 3] : '#2a1f4a', cx - h * 0.3 + ((i * 53) % (h * 0.6)), by - h * 0.75 + i * h * 0.08, 12, 12) }
}
function memory(x, t, cx, cy, k, kind, cap) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(kind === 'cookie' ? 0.06 : -0.06); x.scale(k, k)
  box(x, -110, -120, 220, 230, BONE, { b: 6 }); R(x, '#2a1f4a', -94, -104, 188, 150)
  if (kind === 'orn') { drawBits(x, ['..G..', '.RRR.', 'RRWRR', 'RRRRR', '.RRR.'], { G: GOLD, R: '#7fd0ff', W: BONE }, 0, -30, 18) }
  if (kind === 'cookie') { drawBits(x, ['..CCC..', '.CCCCC.', 'CCDCCDC', 'CCCCCCC', '.CCDCC.', '..CCC..'], { C: '#d49a4a', D: '#6b3f2a' }, 0, -30, 16) }
  if (kind === 'sweater') { drawBits(x, ['GG.....GG', 'GGGGGGGGG', '.GWGWGWG.', '.GGGGGGG.', '.GGGGGGG.'], { G: PINE, W: BONE }, 0, -30, 16) }
  ink(x, cap, 0, 82, { size: 20, font: INTER, weight: 800 })
  x.restore()
}

function act0(x, t, S) {
  const { u, pisces } = S
  room(x, t, { win: { x: 640, y: 470, w: 260, h: 280 } })
  tree(x, t, 860, 1240, 420)
  shadow(x, 420, 1255, 280)
  const F = pisces(x, t, { x: 420, y: 1040, s: 320, hops: [1.6, 3.2, 4.8] }, u > 3 ? 3 : 2, 'sparkle', [0.6, -0.6])
  mitten(x, 640, 840 + 8 * Math.sin(t * 2), 1.7, -0.2 + 0.05 * Math.sin(t * 3))
  tissues(x, 200, 1220, 110, { pull: 10 * Math.abs(Math.sin(t * 3)) })
  if (u > 1.6) label(x, 'it’s SO small…', 600, 720, { size: 32, col: BONE, alpha: clamp(prog(u, 1.6, 1.9)) * outK(t, [6.2, 6.5]) })
  void F
}

function act1(x, t, S) {
  const { u, pisces } = S
  room(x, t, { win: null })
  const ms = [[0.3, 'orn', 'the ornament'], [1.6, 'cookie', 'the cookie'], [2.9, 'sweater', 'the sweater']]
  ms.forEach(([a, k, c], i) => memory(x, t, [230, 540, 850][i], 600 + (i % 2) * 40, pop01(t, S.t0 + a, 0.35, 2.4), k, c))
  shadow(x, 540, 1255, 240)
  pisces(x, t, { x: 540, y: 1060, s: 260, hops: [S.t0 + 0.35, S.t0 + 1.65, S.t0 + 2.95, S.t0 + 4.4, S.t0 + 5.4] }, 3, u > 4 ? 'happy' : 'sparkle', [0, -1])
  // tissue boxes: one empties, a second slides in, a third drops
  const n1 = Math.max(0, 1 - prog(u, 0.3, 3.4))
  tissues(x, 220, 1220, 120, { col: n1 > 0 ? '#9fd8f6' : '#6a8aa8', pull: n1 > 0 ? 10 : -40 })
  if (u > 3.4) label(x, 'EMPTY', 220, 1150, { size: 22, col: RED })
  const sl = ease.outBack(prog(u, 3.6, 4.0)); if (sl > 0) tissues(x, lerp(1200, 820, sl), 1220, 120, { col: '#ffb3c8' })
  const dr = ease.inCubic(prog(u, 5.0, 5.35)); if (u > 5.0) tissues(x, 870, lerp(300, 1100, dr), 110, { col: '#c9f2d4' })
  if (u > 5.35) sparkles(x, t, 870, 1100, S.t0 + 5.36, 8, 80, 1, [BONE, MINT])
}

function act2(x, t, S) {
  const { u, pisces, star } = S
  if (u < 2.6) {
    // water, then a walk in the snow
    R(x, '#141a33', 0, 280, 1080, 980); R(x, '#aebbe0', 0, 1240, 1080, 680)
    snow(x, t, { n: 60, y1: 1250 })
    const wx = lerp(260, 640, ease.inOutQuad(prog(u, 0.9, 2.6)))
    for (let i = 0; i < 6; i++) if (wx > 200 + i * 70) R(x, '#8a96c0', 200 + i * 70, 1262 + (i % 2) * 14, 26, 12)
    pisces(x, t, { x: wx, y: 1100, s: 230, hops: [S.t0 + 1.0, S.t0 + 1.4, S.t0 + 1.8, S.t0 + 2.2] }, 1, 'happy')
    // the glass of water
    if (u < 1.2) { box(x, wx + 110, 1020, 50, 80, '#bfe8ff', { b: 5 }); R(x, '#7fd0ff', wx + 110, 1050, 50, 50) }
    return
  }
  room(x, t, { win: null })
  // the call: Cancer holds up the other mitten
  const pk = pop01(t, S.t0 + 2.7, 0.35, 2.2)
  x.save(); x.translate(720, 780); x.scale(pk, pk)
  box(x, -190, -260, 380, 480, '#2a2148', { b: 8 }); R(x, '#3a3f6a', -176, -230, 352, 430)
  x.restore()
  if (pk > 0.5) {
    star('cancer', x, t, { x: 720, y: 820, s: 200, mood: u > 4.2 ? 'happy' : 'wide', look: [0, 0], seed: 8, hops: [S.t0 + 3.6, S.t0 + 4.3, S.t0 + 4.7] })
    if (u > 3.4) mitten(x, 830, 700 - 40 * ease.outBack(prog(u, 3.4, 3.8)), 0.9, 0.2, true)
  }
  shadow(x, 300, 1255, 220)
  pisces(x, t, { x: 300, y: 1080, s: 240, hops: [S.t0 + 3.6, S.t0 + 4.3, S.t0 + 4.7, S.t0 + 5.1] }, u > 3.5 ? 3 : 2, u > 4 ? 'happy' : 'sparkle', [1, -0.4])
  mitten(x, 440, 880, 0.9, -0.2)
  if (u > 4.2) { label(x, 'HAHA', 520, 760, { size: 34, col: GOLD, font: INTER, weight: 800 }); hearts(x, t, S.t0 + 4.3, 540, 820, { n: 6 }) }
}

function item(x, t, cx, cy, s) {
  x.save(); x.translate(cx, cy); x.scale(s, s); x.rotate(-0.06)
  box(x, -130, -70, 260, 140, '#ffb3c8', { b: 7, hi: '#ffd6e4' })
  R(x, INK, -70, -76, 140, 14); R(x, '#ffffff', -40, -120, 80, 52)
  ink(x, 'POCKET', 0, 0, { size: 30, font: INTER, weight: 800 }); ink(x, 'TISSUES', 0, 36, { size: 26, font: INTER, weight: 800 })
  x.restore()
}

const EP = makeSurv({
  id: 'nhse11', ep: 11, hero: 'pisces', accent: '#7fd0ff',
  heads: ['Cried at a | *mitten.*', 'Then a cookie. | *Then* a sweater.', 'Big season. | *Big feelings.*', 'Packed: | *pocket tissues.*'],
  headSize: [100, 92, 96, 92],
  acts: [act0, act1, act2],
  line1: { t: 10.5, speaker: '♓︎ PISCES', color: PIS, text: 'it’s fine. it’s a *GOOD* cry.', close: 13.6 },
  tips: ['big season, *big feelings*. normal.', 'water, a walk, and one person *who gets it*.'],
  last: 'Cry at the mitten. Call *your person.*',
  item: { label: 'POCKET TISSUES', draw: item },
  pis: [null, null, null],
  finaleNoPisces: true,
  finaleHero(x, t, { pisces, star, ok, HOPS }) {
    shadow(x, 200, 1300, 200 * ok)
    pisces(x, t, { x: 200, y: 1150, s: 210, pop: ok, hops: HOPS }, 3, 'happy')
    star('cancer', x, t, { x: 880, y: 1150, s: 180, pop: ok, mood: 'happy', look: [-1, 0], seed: 8, hops: [HOPS[1] + 0.1, HOPS[3]] })
    mitten(x, 200 + 110, 1020, 0.6, -0.3); mitten(x, 880 - 100, 1030, 0.6, 0.3, true)
  },
  cues: [
    [['pluck', 0.1, 311.13, 0.035, 0.9, 0], ['pop', 1.6, 739.99, 0.03, 0.3], ['pluck', 3.0, 233.08, 0.03, 0.8, 0]],
    [['pop', 0.3, 987.77, 0.04, -0.3], ['pop', 1.6, 1174.66, 0.04, 0], ['pop', 2.9, 1318.51, 0.04, 0.3], ['pluck', 3.4, 233.08, 0.04, 0.6, -0.4], ['whoosh', 3.6, 0.4, 0.03], ['pop', 4.0, 880, 0.04, 0.4], ['whoosh', 5.0, 0.35, 0.03], ['tom', 5.35, 110, { gain: 0.2, decay: 0.2 }]],
    [['pop', 0.9, 880, 0.03, -0.3], ['tick', 1.2, 0.03], ['tick', 1.6, 0.03], ['tick', 2.0, 0.03], ['tick', 2.4, 0.03], ['whoosh', 2.6, 0.3, 0.025], ['pop', 2.75, 1174.66, 0.04, 0.3], ['pop', 3.5, 1318.51, 0.045, 0.3], ['pluck', 4.2, 1567.98, 0.04, 0.5, 0], ['glitter', 4.25, 4.7]],
    [],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [phone, bubble, PINK, lerp]
