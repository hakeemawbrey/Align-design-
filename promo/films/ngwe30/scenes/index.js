// ngwe30 · Your Star Guide: Winter · ♏ Scorpio, winter note 2 / 4: the holiday blind spot (25 s; story 0–20.6, then the end card)
//   0.00  "Scorpio, put down the list."  Scorpio, eyes narrowed, mid-scribble in a ledger titled DIDN'T TEXT BACK.
//   3.0   ♏ YOUR STAR: "you're keeping a list of who forgot to text."  Entries: GEMINI · 2 DAYS, LEO · "BUSY",
//         PISCES · SENT 9 HEARTS?? (Pisces, in the corner, sniffles harder.)
//   7.4   "the list is getting long, love."  The page unrolls into a scroll that runs off the bottom of the frame.
//  11.8   "tell them you missed them. then close the book."  SHUT. The scroll snaps back, the pages flutter off as snow.
//  15.45  card flip · "Close the ledger."  Scorpio, lighter, sends a bubble: "missed you!" Pisces: happy fountains.
import { winterGuide, prog, ease, lerp, clamp, INK, MONO, INTER, GOLD, BONE, R, box, SNOW, heartsUp } from '../../ngwe25/scenes/gwkit.js'

const T0 = { e: [-1, 5.0, 6.3], unroll: [8.6, 10.6], shut: 13.2, msg: 16.4 }
const ENTRIES = ['GEMINI ...... 2 DAYS', 'LEO ...... "BUSY"', 'PISCES .. 9 HEARTS??']
const BK = { x: 390, y: 800, w: 480, h: 340 }

function ledgerOpen(x, t, K, k, scrollLen) {
  x.save(); x.translate(BK.x, BK.y); x.scale(k, k)
  // the scroll unrolling down from the page
  if (scrollLen > 0) {
    box(x, -BK.w / 2 + 40, BK.h / 2 - 20, BK.w - 80, scrollLen, '#f3e6c4', { b: 5 })
    x.fillStyle = 'rgba(42,28,90,0.55)'
    for (let yy = BK.h / 2 + 20; yy < BK.h / 2 - 20 + scrollLen - 10; yy += 34) x.fillRect(-BK.w / 2 + 70 + ((yy / 34) % 3) * 10, yy, BK.w - 170 - ((yy / 34) % 4) * 30, 8)
  }
  box(x, -BK.w / 2, -BK.h / 2, BK.w, BK.h, '#f8f0dc', { b: 7 })
  R(x, '#6b1f33', -BK.w / 2, -BK.h / 2, BK.w, 64)
  x.fillStyle = '#ffe9a8'; x.font = `800 30px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.fillText("DIDN'T TEXT BACK", 0, -BK.h / 2 + 33)
  x.fillStyle = 'rgba(120,150,220,0.3)'; for (let i = 0; i < 4; i++) x.fillRect(-BK.w / 2 + 24, -BK.h / 2 + 120 + i * 64, BK.w - 48, 3)
  x.textAlign = 'left'; x.font = `700 28px ${MONO}`
  ENTRIES.forEach((e, i) => {
    const p = prog(t, T0.e[i], T0.e[i] + 0.6)
    if (p <= 0) return
    x.fillStyle = i === 2 ? '#b0485f' : '#2a1c5a'
    x.fillText(e.slice(0, Math.ceil(e.length * p)), -BK.w / 2 + 34, -BK.h / 2 + 104 + i * 64)
  })
  x.restore()
}
function ledgerClosed(x, cx, cy, k, rot = 0) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -130, -170, 260, 340, '#6b1f33', { b: 7, hi: '#8e3049' })
  R(x, '#4a1424', -130, -170, 30, 340)
  box(x, -70, -60, 160, 70, '#f8f0dc', { b: 4 })
  x.fillStyle = INK; x.font = `800 24px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('CLOSED', 10, -24)
  x.restore()
}

const F = winterGuide({
  sign: 'scorpio', note: 2, duration: 25,
  hook: '*Scorpio,* put | down the list.',
  lines: [
    { t: 3.0, text: "you're keeping a list of who forgot to *text.*" },
    { t: 7.4, text: 'the list is getting *long,* love.' },
    { t: 11.8, text: 'tell them you missed them. then *close the book.*' },
  ],
  fact: 'SCORPIO: RULED BY MARS (TRADITIONAL)|AND PLUTO (MODERN)', factAt: 4.8, factDur: 2.4,
  last: 'Close the | *ledger.*',
  pisHops: [6.3, 6.6],
  tissues: false,
  pisces: (t, d) => ({ ...d, x: 985, s: 120 }),
  guide(t) {
    const scrib = t < T0.shut ? 0.035 * Math.sin(t * 15) : 0
    const mood = t < T0.unroll[1] ? 'squint' : t < T0.shut ? 'wide' : t < 15.45 ? 'sparkle' : 'happy'
    return { x: 750, y: 1150, size: 270, mood, look: t < T0.shut ? [-1, -1] : [0, 0], squash: scrib + (t > T0.shut && t < T0.shut + 0.3 ? 0.15 : 0), lanternSize: 76 }
  },
  drawFront(x, t, K) {
    const o = K.outAll(t)
    if (t < T0.shut) {
      const k = 1
      const sl = 600 * ease.inOutCubic(prog(t, ...T0.unroll))
      ledgerOpen(x, t, K, k, sl)
      // the quill/pencil scribbling
      if (t < T0.unroll[0]) { const px = BK.x - 140 + ((t * 120) % 280), py = BK.y - 30 + Math.floor(t * 1.2 % 3) * 64; x.save(); x.translate(px, py); x.rotate(0.6); R(x, INK, -6, -70, 12, 80); R(x, '#ffd34d', -3, -67, 6, 60); R(x, '#f3c6a0', -3, -7, 6, 8); x.restore() }
    } else {
      // SHUT: the book slams closed, pages flutter off as snow
      const k = K.pop01(t, T0.shut, 0.3, 2.6) * o
      ledgerClosed(x, BK.x, BK.y, k * 0.9, -0.05)
      for (let i = 0; i < 9; i++) {
        const p = prog(t, T0.shut + i * 0.05, T0.shut + 2.2 + i * 0.05)
        if (p <= 0 || p >= 1) continue
        const px = BK.x + Math.sin(i * 2.1) * 80 + Math.sin(p * 8 + i) * 60 + (i - 4) * 50 * p, py = BK.y - p * 500
        x.save(); x.globalAlpha *= 1 - p
        if (p < 0.5) { x.translate(px, py); x.rotate(p * 6 + i); R(x, INK, -28, -20, 56, 40); R(x, '#f8f0dc', -24, -16, 48, 32); x.restore() }
        else { const s = 10; R(x, SNOW, px - s / 2, py - s * 1.5, s, s * 3); R(x, SNOW, px - s * 1.5, py - s / 2, s * 3, s); x.restore() }
      }
    }
    K.burst(BK.x + 180, BK.y - 180, 90, t, T0.shut, { word: 'SHUT', size: 40 })
    if (t > T0.msg) K.bubble(700, 930, 'missed you!', { size: 44, k: K.pop01(t, T0.msg, 0.3, 2.4) * o, color: '#b0244a' })
    heartsUp(x, t, 700, 850, T0.msg + 0.3, { n: 3, c: 6, col: '#e23d66' })
  },
  cues: [
    ['tick', 0.3, 0.03], ['tick', 0.7, 0.03], ['tick', 1.1, 0.03], ['tick', 1.5, 0.03], ['tick', 1.9, 0.03],
    ...T0.e.map((e, i) => ['pop', e, [740, 880, 1174.66][i], 0.035, 0]), ['tick', T0.e[2] + 0.6, 0.05],
    ['whoosh', T0.unroll[0], 1.6, 0.04], ...[0, 1, 2, 3, 4, 5].map(i => ['tick', T0.unroll[0] + i * 0.33, 0.03]),
    ['boom', T0.shut, 0.25], ['tick', T0.shut, 0.08], ['glitter', T0.shut + 0.3, T0.shut + 1.6],
    ['pop', T0.msg, 1174.66, 0.045, 0.3], ['pluck', T0.msg + 0.2, 1567.98, 0.035, 0.8, 0.3],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
