// kpjue07 · PLANET TALK: JUPITER → LIBRA · "Libra Spins Jupiter" (24 s, star_talk, loop).
//   0.0  frame 0: Jupiter mid-spin at the hub of a giant prize wheel of date ideas, Libra clinging to the rim.
//        Hook "LIBRA. Spin me. I dare you." Whip at 0.5.
//   3.0  forty minutes of "I don't mind, you pick".   6.8  "Spin me."   9.4  the spin → TACOS.   11.8  "best of three?"
//  14.2  picking is a gift to your date.   18.4  "Tacos. Final." Pisces cries.   21.6  "…Probably." → the spin again (loop).
import { drawSpace, drawSign, planetSize } from '../../planetkit.js'
import { whipZoom, whipZoomCues } from '../../hookkit.js'
import { jupFilm, drawJupiter, pisces, sticker, pr, easeOut, easeInOut, rr, INK, BONE, GOLD } from '../../kpjue01/jupkit.js'

export const DURATION = 24
const HOOK = { at: -1, text: 'LIBRA. Spin me. | I *dare* you.', top: 1330, size: 104, out: [2.7, 2.95] }
const WHIP = { at: 0.5, from: 1.5 }
const IDEAS = ['tacos', 'mini golf', 'museum', 'picnic', 'karaoke', 'bookshop', 'stargazing', 'noodles']
const COLS = ['#f2c75c', '#ff8fb1', '#7fe0ff', '#7dffb0', '#c9a6ff', '#ff9a4a', '#efe6d6', '#ff6b6b']
const N = IDEAS.length, W = Math.PI * 2 / N
const TH1 = -Math.PI / 2 - 3 * W                 // first stop: picnic
const TH2 = -Math.PI / 2 + Math.PI * 2 * 4        // second stop: tacos
const SPIN2 = 9.4, LAND2 = 11.6, RESPIN = 23.25
const WC = { x: 540, y: 720, r: 400 }

function theta(t) {
  if (t < 2.6) return TH1 - 6 * (2.6 - t) ** 2
  if (t < SPIN2) return TH1
  if (t < LAND2) { const p = pr(t, SPIN2, LAND2); return TH1 + (TH2 - TH1) * (1 - (1 - p) ** 3) }
  if (t < RESPIN) return TH2
  return TH2 + 8 * (t - RESPIN) ** 2
}

const B = [
  { t0: 3.0, t1: 6.6, x: 540, y: 1300, who: 'libra', text: 'Where should we go tonight? I don’t mind… *you pick!*', tail: 0, maxW: 720 },
  { t0: 6.8, t1: 9.2, x: 540, y: 1300, who: 'jupiter', text: 'Kiddo. Forty minutes. *Spin me.*', tail: 0, tailUp: true },
  { t0: 11.8, t1: 14.0, x: 540, y: 1300, who: 'libra', text: 'Hmm. *Best of three?*', tail: 0 },
  { t0: 14.2, t1: 18.2, x: 540, y: 1300, who: 'jupiter', text: 'Everything’s an adventure! Picking is a *gift* to your date.', tail: 0, tailUp: true, maxW: 720 },
  { t0: 18.4, t1: 21.2, x: 680, y: 1320, who: 'libra', text: 'Tacos. *Final.*', tail: 40 },
  { t0: 19.2, t1: 21.4, x: 300, y: 1480, who: 'pisces', text: 'they *DECIDED* 😭', tail: -60 },
  { t0: 21.6, t1: 23.3, x: 540, y: 1300, who: 'libra', text: 'Tacos. Final. *…Probably.*', tail: 0 },
]

function wheel(x, t, th) {
  x.save(); x.translate(WC.x, WC.y)
  // blur ghosts when spinning fast
  const v = Math.abs(theta(t + 0.02) - theta(t)) / 0.02
  const ghosts = v > 6 ? 3 : 1
  for (let gI = ghosts - 1; gI >= 0; gI--) {
    x.save(); x.globalAlpha = gI ? 0.25 : 1; x.rotate(th - gI * 0.08)
    for (let i = 0; i < N; i++) {
      x.fillStyle = COLS[i]; x.beginPath(); x.moveTo(0, 0); x.arc(0, 0, WC.r, i * W - W / 2, i * W + W / 2); x.closePath(); x.fill()
      x.strokeStyle = INK; x.lineWidth = 6; x.stroke()
      if (!gI) { x.save(); x.rotate(i * W); x.fillStyle = INK; x.font = '800 36px Inter'; x.textAlign = 'right'; x.textBaseline = 'middle'; x.fillText(IDEAS[i], WC.r - 26, 0); x.restore() }
    }
    x.restore()
  }
  x.lineWidth = 14; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, WC.r, 0, Math.PI * 2); x.stroke()
  for (let i = 0; i < 24; i++) { const a = i / 24 * Math.PI * 2 + th; x.fillStyle = (Math.floor(t * 8) + i) % 2 ? GOLD : BONE; x.beginPath(); x.arc(Math.cos(a) * (WC.r + 1), Math.sin(a) * (WC.r + 1), 9, 0, Math.PI * 2); x.fill() }
  x.restore()
  // pointer at the top
  x.fillStyle = '#ff3b3b'; x.strokeStyle = INK; x.lineWidth = 6
  x.beginPath(); x.moveTo(WC.x - 40, WC.y - WC.r - 70); x.lineTo(WC.x + 40, WC.y - WC.r - 70); x.lineTo(WC.x, WC.y - WC.r + 30); x.closePath(); x.fill(); x.stroke()
}

function draw(x, t, H) {
  drawSpace(x, t, { planet: 'jupiter', seed: 17 })
  const th = theta(t)
  wheel(x, t, th)
  const upright = t > 2.6 && t < RESPIN ? (t < SPIN2 || t > LAND2 ? 1 : 0) : 0
  const jr = upright ? 0 : th
  drawJupiter(x, WC.x, WC.y, planetSize('jupiter', 330), t, { rot: jr, mood: t < 3 ? 'wide' : t < 6.8 ? 'sleepy' : t > 18.4 && t < 21.4 ? 'happy' : 'happy', lines: H.lines, look: [0, 1], bob: 0, tears: t > 19.2 && t < 21.4 ? 1 : 0 })
  // Libra: clinging to the rim (frame 0 → 2.9), hops off, then on the ground
  if (t < 2.9 || t > RESPIN) {
    const a = th + Math.PI * 0.75
    drawSign(x, 'libra', WC.x + Math.cos(a) * (WC.r + 40), WC.y + Math.sin(a) * (WC.r + 40), 220, t, { mood: 'wide', rot: a + Math.PI / 2, look: [0, 0] })
  } else {
    const k = easeOut(pr(t, 2.9, 3.4))
    drawSign(x, 'libra', 540 + (1 - k) * 200, 1640 - Math.sin(k * Math.PI) * 120, 280, t, { mood: t < 6.8 ? 'happy' : t < 11.8 ? 'squint' : t < 14.2 ? 'wink' : t < 18.4 ? 'wide' : 'happy', lines: H.lines, look: [0, -1], hops: [11.9, 18.5], shadow: true })
  }
  if (t > 3.6 && t < 6.6) sticker(x, 'DECIDING… 40 MIN', 820, 1520, { size: 30, bg: '#ff8fb1', rot: 0.07, scale: easeOut(pr(t, 3.7, 4.0)) })
  if (t > LAND2 && t < 13.9) sticker(x, 'TACOS!', 540, 260, { size: 56, scale: easeOut(pr(t, LAND2, LAND2 + 0.3)), rot: -0.05 })
  if (t > 18.6 && t < 23.3) sticker(x, 'DECIDED ✓', 820, 1540, { size: 38, bg: '#7dffb0', rot: -0.08, scale: easeOut(pr(t, 18.6, 18.9)) })
  const pk = easeOut(pr(t, 19.0, 19.4)) * (1 - pr(t, 21.4, 21.7))
  if (pk > 0) pisces(x, 220, 1660, 240, t, { pop: pk, hops: [19.6, 20.3, 21] })
}

const film = jupFilm({
  duration: DURATION, draw, bubbles: B, hook: HOOK, loop: true,
  overlays: [[whipZoom(WHIP), whipZoomCues(WHIP)]],
  cues: [...Array.from({ length: 14 }, (_, i) => ['tick', +(i * 0.18).toFixed(2), 0.07]), ['pop', 2.6, 660, 0.06, 0], ['riser', SPIN2 - 0.3, SPIN2 + 0.2, 0.08], ...Array.from({ length: 16 }, (_, i) => ['tick', +(SPIN2 + 2.2 * (1 - (1 - i / 16) ** (1 / 3))).toFixed(2), 0.07]), ['bell', LAND2, 1318.5, 0.08, 1.4, 0], ['glitter', LAND2, LAND2 + 0.8], ['bell', 18.6, 1046.5, 0.06, 1.2, 0], ['glitter', 19.2, 20.4], ['whoosh', RESPIN, 0.6, 0.14]],
})
export const SCENES = film.SCENES
export const CUES = film.CUES
