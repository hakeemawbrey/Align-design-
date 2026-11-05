// k3se06: 3-SECOND ADVICE · They Said "ok." (6.4 s vertical trial reel, music: synthwave · C#m). Format: k3se01/threekit.js.
//   0.00  frame 0: ♍ Virgo mid-lunge with a giant magnifying glass over a big phone; the text just says "ok." and the
//         glass is scanning the period (scan lines, "analyzing…").
//         Hook: "They said 'ok.' | *With a period.*"  Pisces sniffles in the corner.
//   0.50  whip zoom onto the period; the frame holds.   0.95–2.45  3 · 2 · 1.
//   2.45  THE STARS: "Ask what they meant. | *Stop translating.*"  The glass drops, Virgo types "all good with you?"
//   5.25  the reply: "yes! busy day. call at 6?"  Virgo melts ("oh."). Hard cut at 6.4.
import { makeThree, R, box, label, shadow, phone, chat, hearts, lerp, prog, ease, clamp, INK, BONE, GOLD, MINT, INTER, MONO } from '../../k3se01/threekit.js'

const PH = { x: 640, y: 830, w: 440, h: 620 }
function screen(t, S) {
  return (c, w) => {
    c.font = `700 22px ${MONO}`; c.fillStyle = 'rgba(239,230,214,0.5)'; c.textAlign = 'center'; c.fillText('today 9:41 PM', w / 2, 40)
    // their "ok."
    R(c, '#3a3358', 24, 170, 170, 112); R(c, '#3a3358', 24, 276, 16, 16)
    c.font = `800 84px ${INTER}`; c.fillStyle = BONE; c.textAlign = 'left'; c.textBaseline = 'middle'; c.fillText('ok.', 44, 228)
    if (S.phase === 'fix') {
      const k1 = clamp(prog(S.u, 1.0, 1.15)), k2 = clamp(prog(S.u, 2.8, 2.95))
      if (k1 > 0) chat(c, w, 320, 'all good with you?', { mine: true, size: 32, k: k1 })
      if (k2 > 0) chat(c, w, 410, 'yes! busy day.', { size: 32, k: k2 }); chat(c, w, 480, 'call at 6? :)', { size: 32, k: clamp(prog(S.u, 2.95, 3.1)) })
      if (S.u > 0.4 && S.u < 1.0) { c.fillStyle = '#4f7cd8'; c.fillRect(24, 500, w - 48, 50); c.fillStyle = BONE; c.font = `700 30px ${INTER}`; c.fillText('all good with yo'.slice(0, Math.floor((S.u - 0.4) * 28)), 36, 526) }
    }
  }
}
function glass(x, t, gx, gy, rot) {
  x.save(); x.translate(gx, gy); x.rotate(rot)
  R(x, INK, -16, 80, 32, 220); R(x, '#a07850', -9, 84, 18, 210)
  x.lineWidth = 34; x.strokeStyle = INK; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.stroke()
  x.lineWidth = 20; x.strokeStyle = GOLD; x.beginPath(); x.arc(0, 0, 100, 0, 7); x.stroke()
  x.fillStyle = 'rgba(190,230,255,0.22)'; x.beginPath(); x.arc(0, 0, 90, 0, 7); x.fill()
  x.restore()
}

function scene(x, t, S) {
  const { phase, u, hero } = S
  R(x, '#211a3a', 0, 1150, 1080, 120); R(x, '#2e2650', 0, 1150, 1080, 10)
  phone(x, PH.x, PH.y, { w: PH.w, h: PH.h, draw: screen(t, S) })
  const period = [PH.x - PH.w / 2 + 16 + 150, PH.y - PH.h / 2 + 34 + 245]
  if (phase === 'hook') {
    shadow(x, 200, 1150, 260)
    hero(x, t, { x: 200, y: 1000, s: 300, mood: 'squint', look: [1, -1], squash: -0.1 })
    const gx = period[0] + 12 * Math.sin(t * 9), gy = period[1] + 8 * Math.cos(t * 7)
    glass(x, t, gx, gy, 0.6)
    // scan line sweeping the lens
    const sy = gy - 80 + ((t * 300) % 160)
    R(x, 'rgba(127,255,176,0.6)', gx - 80, sy, 160, 6)
    label(x, 'analyzing…', 880, 478, { size: 34, col: MINT })
    return
  }
  // the glass drops away
  const d = ease.inCubic(prog(u, 0, 0.45))
  if (d < 1) glass(x, t, lerp(period[0], period[0] - 120, d), lerp(period[1], 1300, d), 0.6 + 2 * d)
  const melt = u > 3.0
  shadow(x, 200, 1150, 260)
  hero(x, t, { x: 200, y: 1000, s: 300, mood: melt ? 'heart' : u < 0.5 ? 'wide' : 'neutral', look: [1, -0.5], hops: [2.45 + 0.3, 2.45 + 1.0, 2.45 + 2.95] })
  if (melt) { hearts(x, t, 2.45 + 3.0, 200, 840, { n: 5, cell: 7 }); label(x, 'oh.', 200, 740, { size: 56, col: BONE, font: INTER, weight: 800 }) }
}

const EP = makeThree({
  id: 'k3se06', sign: 'virgo', dur: 6.4, brk: 'whip', ending: 'cut', focus: [566, 789], whipFrom: 2.2,
  hook: "They said 'ok.' | *With a period.*", accent: '#9fe6b0',
  advice: 'Ask what they meant. | *Stop translating.*',
  scene,
  cues: [
    ['whoosh', 2.5, 0.4, 0.03], ['tom', 2.95, 80, { gain: 0.16, decay: 0.2 }],
    ...[2.9, 2.97, 3.04, 3.11, 3.18, 3.25, 3.32].map(t => ['tick', t, 0.03]),
    ['pop', 3.45, 1318.51, 0.04, 0.2], ['pop', 5.25, 987.77, 0.045, -0.2], ['pop', 5.33, 1318.51, 0.04, -0.2], ['pluck', 5.45, 1567.98, 0.035, -0.3, 0.4], ['glitter', 5.45, 5.9],
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
