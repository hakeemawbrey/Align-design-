// kpjue06 · PLANET TALK: JUPITER → VIRGO · "Virgo's Very Long List" (28 s, star_advice, hard cut).
//   0.0  frame 0: Jupiter crashing down onto Virgo's clipboard, the partner checklist unrolling up off-screen.
//        Hook "VIRGO. That list is longer than me." Whip at 0.5.
//   3.0  ruled out for the wrong shoes.   7.0  "longer than ME".   11.0  dealbreakers vs details: the sort.
//  18.4  three lines stay.   21.0  Pisces cries reading them.   23.8  "Three lines. Fridge-worthy." hard cut.
import { drawSpace, drawSign, entrance, drawEntranceFx, entranceCues, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues, screenShake, shakeCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 28
const JS = planetSize('jupiter', 520)
const IN = { at: -0.62, x: 540, y: 600, size: JS }
const HOOK = { at: -1, text: 'VIRGO. That list is | longer than *me.*', top: 1660, size: 90, out: [2.7, 2.95] }
const WHIP = { at: 0.5, from: 1.45 }
const SHAKE = { at: 0.08, len: 0.5, amp: 26 }
const SORT = 11.6
const ITEMS = [
  ['wears the right shoes', 0], ['replies within 4 min', 0], ['kind', 1], ['likes my plant', 0], ['alphabetised spices', 0],
  ['honest', 1], ['never chews loudly', 0], ['makes me laugh', 1], ['neat handwriting', 0], ['same favourite font', 0],
]

const B = [
  { t0: 3.0, t1: 6.8, x: 540, y: 1080, who: 'virgo', text: 'They were *perfect.* But the shoes, Jupiter. *The shoes.*', tail: 0, maxW: 720 },
  { t0: 7.0, t1: 10.8, x: 540, y: 1080, who: 'jupiter', text: 'Kiddo, that list is longer than ME. And that’s *saying something.*', tail: 0, tailUp: true, maxW: 720 },
  { t0: 11.0, t1: 15.0, x: 540, y: 1080, who: 'jupiter', text: 'Keep the dealbreakers. *Bin the nitpicks.*', tail: 0, tailUp: true },
  { t0: 15.6, t1: 18.2, x: 540, y: 1080, who: 'virgo', text: '…okay. *Three* stay.', tail: 0 },
  { t0: 21.0, t1: 23.6, x: 300, y: 1080, who: 'pisces', text: 'that’s so *beautiful* 😭', tail: -60 },
  { t0: 23.8, t1: 29, x: 540, y: 1080, who: 'virgo', text: 'Three lines. *Fridge-worthy.*', tail: 0 },
]

function scroll(x, t, X, Ytop, Ybot, alpha) {
  // the long checklist paper from the clipboard up past the top of the frame
  x.save(); x.globalAlpha *= alpha
  x.fillStyle = '#fbf3df'; x.strokeStyle = INK; x.lineWidth = 6
  x.fillRect(X - 170, Ytop, 340, Ybot - Ytop); x.strokeRect(X - 170, Ytop, 340, Ybot - Ytop)
  x.font = '700 24px Inter'; x.fillStyle = INK
  for (let i = 0; i < 40; i++) { const y = Ybot - 40 - i * 52; if (y < Ytop + 10) break; x.fillText('☐ ' + ITEMS[i % ITEMS.length][0], X - 150, y) }
  x.restore()
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 13, horizon: { y: 1600 } })
  // the scroll (frame 0 → 3): unrolling upward
  const sa = 1 - pr(t, 2.6, 3.0)
  if (sa > 0) scroll(x, t, 540, -200 - 400 * (t + 0.6), 1560, sa)
  const P = entrance('crash', t, IN)
  drawEntranceFx(x, 'jupiter', 'crash', t, IN)
  drawJupiter(x, P.x, P.y, P.size, t, { rot: P.rot, squash: P.squash, mood: t < 3 ? 'wide' : t > 21 && t < 23.8 ? 'happy' : 'happy', lines: H.lines, look: [0, 0.8], hops: [7.1, 11.1], tears: t > 21 && t < 23.8 ? 1 : 0 })
  // Virgo with the clipboard
  drawSign(x, 'virgo', 540, 1460, 290, t, { mood: t < 3 ? 'wide' : t < 11 ? 'squint' : t < 15.6 ? 'wide' : 'happy', lines: H.lines, look: [0, -1], hops: [15.7, 18.6, 23.9], shadow: true })
  // the sort (11.6 – 18): items pop out, fly to DEALBREAKERS (keep) or DETAILS (bin)
  if (t > SORT - 0.2 && t < 21) {
    const bk = easeOut(pr(t, SORT - 0.2, SORT + 0.2)) * (1 - pr(t, 18.2, 18.5))
    if (bk > 0) {
      sticker(x, 'DEALBREAKERS', 260, 1300, { size: 32, bg: '#7dffb0', rot: -0.05, scale: bk })
      sticker(x, 'DETAILS → bin', 820, 1300, { size: 32, bg: '#ff8fb1', rot: 0.05, scale: bk })
    }
    ITEMS.forEach(([txt, keep], i) => {
      const t0 = SORT + 0.2 + i * 0.36, k = easeInOut(pr(t, t0, t0 + 0.5))
      if (t < t0 || t > 18.4) return
      const tx = keep ? 260 : 820, ty = keep ? 1380 + [0, 0, 60, 0, 0, 120, 0, 180][i] * 0 + ITEMS.slice(0, i).filter(a => a[1]).length * 0 : 1380
      const X = 540 + (tx - 540) * k, Y = 1300 - Math.sin(k * Math.PI) * 300 + (ty - 1300) * k
      const a = keep ? 1 : 1 - pr(t, t0 + 0.4, t0 + 0.6)
      if (keep && k >= 1) return
      sticker(x, txt, X, Y, { size: 34, bg: BONE, rot: (i % 2 ? 0.1 : -0.1) * (1 - k), alpha: a, scale: 1 - 0.3 * (keep ? 0 : k) })
    })
    // kept items stack under DEALBREAKERS
    ITEMS.filter(a => a[1]).forEach(([txt], j) => {
      const i = ITEMS.findIndex(a => a[0] === txt), t0 = SORT + 0.2 + i * 0.36
      if (t > t0 + 0.5 && t < 18.4) sticker(x, txt, 260, 1380 + j * 70, { size: 32, bg: BONE, rot: 0, scale: 0.9 })
    })
  }
  // the three-line card (18.4 →)
  const ck = easeOut(pr(t, 18.4, 18.9))
  if (ck > 0) {
    x.save(); x.translate(800, 1330); x.rotate(0.05); x.scale(ck, ck)
    x.fillStyle = '#fbf3df'; rr(x, -190, -150, 380, 300, 22); x.fill(); x.strokeStyle = INK; x.lineWidth = 7; x.stroke()
    x.fillStyle = INK; x.font = '800 30px Inter'; x.textAlign = 'center'; x.fillText('MY THREE', 0, -96)
    x.font = '700 34px Inter';['☑ kind', '☑ honest', '☑ makes me laugh'].forEach((s, i) => x.fillText(s, 0, -30 + i * 60))
    x.restore()
  }
  // Pisces reading over the shoulder
  const pk = easeOut(pr(t, 20.6, 21.0))
  if (pk > 0) pisces(x, 220, 1440, 250, t, { pop: pk, hops: [21.3, 22, 22.7], look: [1, 0] })
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK,
  overlays: [[screenShake(SHAKE), shakeCues(SHAKE)], [whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...entranceCues('crash', IN), ...ITEMS.map(([, keep], i) => keep ? ['bell', +(SORT + 0.7 + i * 0.36).toFixed(2), 1318.5, 0.05, 0.8, 0] : ['pop', +(SORT + 0.6 + i * 0.36).toFixed(2), 420, 0.05, 0]), ['bell', 18.4, 1046.5, 0.07, 1.6, 0], ['glitter', 21.0, 22.4]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
