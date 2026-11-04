// ngwe26 · Your Star Guide: Winter · ♎ Libra, winter note 2 / 4: the holiday blind spot (25 s; story 0–20.6, then the end card)
//   0.00  "Libra, you said yes to how many parties?"  Libra mid-juggle: three party invitations, all "SAT 8 PM".
//   3.0   ♎ YOUR STAR: "three parties. one night. three yeses."  A calendar square for Saturday thunks in: sticker, sticker, sticker.
//   7.4   "your calendar square is full. so are you."  More stickers, the square overflows; Libra goes dizzy, the juggle wobbles.
//  11.8   "a no to them can be a yes to you."  Libra catches ONE invitation; the other two float up and turn into snowflakes.
//  15.45  card flip · "One plan | is plenty."  Libra hugs the one invite, calm. Pisces: happy fountains.
import { winterGuide, drawStarChar, prog, ease, lerp, clamp, INK, MONO, INTER, GOLD, BONE, R, box, heartsUp, SNOW } from '../../ngwe25/scenes/gwkit.js'

const INV = [{ col: '#ff7eb6', name: 'GALA' }, { col: '#7fe3ff', name: 'POTLUCK' }, { col: '#ffd34d', name: 'GAME NIGHT' }]
const T0 = { st: [4.2, 4.7, 5.2], more: [8.6, 8.9, 9.2, 9.5, 9.8], dizzy: [9.8, 11.6], catch: 13.0, float: 13.2 }
const CAL = { x: 540, y: 560, s: 260 }

function invite(x, cx, cy, i, { rot = 0, k = 1, alpha = 1 } = {}) {
  if (k <= 0.01 || alpha <= 0.01) return
  const I = INV[i]
  x.save(); x.globalAlpha *= alpha; x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  box(x, -88, -58, 176, 116, '#f8f0dc', { b: 5 })
  R(x, I.col, -88, -58, 176, 26)
  x.fillStyle = INK; x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = `700 17px ${MONO}`; x.fillText(I.name, 0, -44)
  x.font = `800 30px ${INTER}`; x.fillText('SAT', 0, -4)
  x.font = `700 24px ${MONO}`; x.fillText('8 PM', 0, 34)
  x.restore()
}

function sticker(x, cx, cy, col, k, rot) {
  if (k <= 0.01) return
  x.save(); x.translate(cx, cy); x.rotate(rot); x.scale(k, k)
  x.fillStyle = INK; x.beginPath(); x.arc(0, 0, 40, 0, Math.PI * 2); x.fill()
  x.fillStyle = col; x.beginPath(); x.arc(0, 0, 34, 0, Math.PI * 2); x.fill()
  x.fillStyle = INK; x.font = `800 22px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('YES', 0, 2)
  x.restore()
}

const STK = [[-70, -10, 0], [60, 20, 1], [-10, 80, 2], [100, -60, 0], [-110, 90, 1], [130, 100, 2], [-140, -70, 1], [20, -90, 0]]

const F = winterGuide({
  sign: 'libra', note: 2, duration: 25,
  hook: '*Libra,* you said yes | to how many parties?', hookSize: 92,
  lines: [
    { t: 3.0, text: 'three parties. one night. three *yeses.*' },
    { t: 7.4, text: 'your calendar square is *full.* so are you.' },
    { t: 11.8, text: 'a no to them can be a *yes* to you.' },
  ],
  fact: "LIBRA'S SYMBOL:|THE SCALES", factAt: 5.6, factDur: 2.6,
  last: '*One* plan | is plenty.',
  guide(t) {
    const dz = t > T0.dizzy[0] && t < T0.dizzy[1]
    return { x: 540, y: 1130, size: 290, mood: t < 3 ? 'happy' : dz ? 'squint' : t > T0.catch ? (t > 15.45 ? 'happy' : 'sparkle') : 'wide',
      look: [0, -1], squash: dz ? 0.06 * Math.sin(t * 14) : 0.03 * Math.abs(Math.sin(t * 7)) * (t < T0.catch ? 1 : 0), lanternSize: 76 }
  },
  drawBack(x, t, K) {
    const o = K.outAll(t)
    // the Saturday calendar square
    const k = K.pop01(t, 3.6, 0.4, 2.2) * o * (1 - ease.inCubic(prog(t, T0.catch + 0.8, T0.catch + 1.4)))
    if (k > 0.01) {
      x.save(); x.translate(CAL.x, CAL.y); x.scale(k, k)
      box(x, -CAL.s / 2, -CAL.s / 2, CAL.s, CAL.s, '#f8f0dc', { b: 7 })
      R(x, '#e8344e', -CAL.s / 2, -CAL.s / 2, CAL.s, 56)
      x.fillStyle = '#fff'; x.font = `800 34px ${INTER}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText('SATURDAY', 0, -CAL.s / 2 + 29)
      x.fillStyle = 'rgba(27,18,54,0.5)'; x.font = `700 26px ${MONO}`; x.fillText('8 PM', 0, CAL.s / 2 - 26)
      x.restore()
      // stickers stamp in: three, then the overflow
      const times = [...T0.st, ...T0.more]
      const tumble = t > T0.catch ? ease.inCubic(prog(t, T0.catch, T0.catch + 0.9)) : 0
      STK.forEach(([dx, dy, c], i) => {
        if (t < times[i]) return
        const sk = K.pop01(t, times[i], 0.25, 3) * k * (1 - tumble)
        sticker(x, CAL.x + dx * 1.0, CAL.y + dy + tumble * 300, INV[c].col, sk, (i % 3 - 1) * 0.25)
      })
      ;[...T0.st, ...T0.more].forEach((s, i) => K.burst(CAL.x + STK[i][0] + 50, CAL.y + STK[i][1] - 50, 50, t, s, { word: 'YES', size: 22, life: 0.4 }))
    }
  },
  drawFront(x, t, K, r) {
    const o = K.outAll(t)
    // the juggle: three invitations on an orbit over Libra's head
    const sp = t < T0.dizzy[0] ? 3.2 : t < T0.dizzy[1] ? 5.2 : 3.6
    const wob = t > T0.dizzy[0] && t < T0.dizzy[1] ? 40 : 0
    for (let i = 0; i < 3; i++) {
      const a = t * sp + i * Math.PI * 2 / 3
      let cx = 540 + Math.cos(a) * (210 + wob * Math.sin(t * 9 + i)), cy = 900 + Math.sin(a) * 70 - Math.abs(Math.cos(a * 0.5)) * 60
      let rot = Math.sin(a) * 0.4, alpha = o, k = 1
      if (t > T0.catch) {
        const ap = t * 0.0 + T0.catch * sp + i * Math.PI * 2 / 3
        const sx = 540 + Math.cos(ap) * 210, sy = 900 + Math.sin(ap) * 70
        if (i === 0) { const p = ease.outBack(prog(t, T0.catch, T0.catch + 0.5)); cx = lerp(sx, 420, p); cy = lerp(sy, 1060, p); rot = lerp(rot, -0.18, p) }
        else {
          const p = prog(t, T0.float, T0.float + 1.8)
          cx = sx + Math.sin(p * 6 + i) * 30; cy = sy - p * 380; k = 1 - ease.inCubic(p); rot = p * 2 * (i === 1 ? 1 : -1)
          // they become snowflakes
          if (p > 0.6) { x.save(); x.globalAlpha *= o * clamp((p - 0.6) * 3) * (1 - clamp((p - 0.95) * 10)); const s = 10; R(x, SNOW, cx - s / 2, cy - s * 1.5, s, s * 3); R(x, SNOW, cx - s * 1.5, cy - s / 2, s * 3, s); x.restore() }
        }
      }
      invite(x, cx, cy, i, { rot, k, alpha })
    }
    if (t > T0.catch) heartsUp(x, t, 470, 960, T0.catch + 0.6, { n: 2, c: 6 })
    if (t > 15.45) heartsUp(x, t, 540, 940, 16.4, { n: 3, c: 6 })
  },
  cues: [
    ['whoosh', 0.2, 0.3, 0.02], ['whoosh', 1.1, 0.3, 0.02], ['whoosh', 2.0, 0.3, 0.02],
    ['pop', 3.6, 880, 0.04, 0],
    ...T0.st.map((s, i) => ['boom', s, 0.07]), ...T0.st.map((s, i) => ['pop', s, [987.77, 1174.66, 1318.51][i], 0.035, 0]),
    ...T0.more.map((s, i) => ['tick', s, 0.05]), ...T0.more.map((s, i) => ['pop', s, 1318.51 + i * 60, 0.03, (i % 2 ? 0.3 : -0.3)]),
    ['whoosh', T0.dizzy[0], 0.6, 0.03],
    ['pluck', T0.catch + 0.3, 1174.66, 0.04, 0.8, 0], ['glitter', T0.float + 1.0, T0.float + 1.8],
  ],
})

export const DURATION = F.DURATION
export const SCENES = F.SCENES
export const CUES = F.CUES
