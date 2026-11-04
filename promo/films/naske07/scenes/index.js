// naske07 · Ask the Stars, Volume 2, ep 7 · "I say yes to every party. I'm exhausted." (18 s, star_advice post)
// Story 0–15.6, then the short end card (2.4 s). The look lives in ../../naske01/askkit.js.
//   0.00  frame 0: the DM; ♎ Libra under a big gold scale, the left pan piled with party invitations, tipping hard.
//   2.5   LIBRA: "a kind no is still kind."  chip ♎ CARDINAL AIR · RULED BY VENUS. More invites flutter onto the pile.
//   ~4.6  "'i can't this time, but i'd love to soon.'"  One invite floats back off the pile with a little heart.
//   ~7.4  "rest makes you better company."  A fat pillow drops onto the right pan: BOOF. The scale levels out.
//   box closes → "*Rest* is | a yes, too."  Libra yawns happily. Pisces (left) cries happily.
import { askFilm, drawBits, drawBurst, floatHeart, lerp, prog, ease, clamp, pop01, INK, GOLD } from '../../naske01/askkit.js'

const ENV = ['WWWWWWWW', 'WPWWWWPW', 'WWPWWPWW', 'WWWPPWWW', 'WWWWWWWW']
const ENVS = [{ W: '#f5eedf', P: '#e163d6' }, { W: '#ffe9b8', P: '#c8283c' }, { W: '#e6f3ff', P: '#3f7cf0' }]
const PILLOW = ['.WWWWWWWWWW.', 'WWWWWWWWWWWW', 'WWWWLWWLWWWW', 'WWWWWWWWWWWW', '.WWWWWWWWWW.']
const PILLOW_C = { W: '#c9b8f0', L: '#9a86d8' }
const PIV = { x: 540, y: 600 }, ARM = 260

const F = askFilm({
  id: 'naske07', sign: 'libra',
  question: 'I say yes to every party. I\'m *exhausted*.',
  lines: ['a kind no is still kind.', "'i can't this time, but i'd love to soon.'", 'rest makes you better company.'],
  chip: '♎ CARDINAL AIR · RULED BY VENUS',
  last: '*Rest* is | a yes, too.', late: 3,
  hero: { x: 540, y: 1030, size: 330 },
  extraT: T => ({ more: [T.l[0] + 0.5, T.l[0] + 1.1, T.l[0] + 1.7], back: T.l[1] + 0.6, pillow: T.l[2] + 0.35 }),
  state(t, T) {
    const tilt = tiltAt(t, T)
    if (t < T.pillow + 0.3) return { mood: t < T.l[1] ? 'squint' : 'neutral', look: [-1, -1], squash: 0.04 * Math.sin(t * 7), dx: -tilt * 60 }
    return { mood: t > T.h2Land ? 'sleepy' : 'happy', zzz: false }
  },
  back(x, t, T, H) {
    const ok = H.ok, tilt = tiltAt(t, T)
    if (ok <= 0.01) return
    // the post from the star's head up to the pivot
    x.fillStyle = INK; x.fillRect(PIV.x - 11, PIV.y, 22, H.y - 150 - PIV.y)
    x.fillStyle = GOLD; x.fillRect(PIV.x - 6, PIV.y, 12, H.y - 154 - PIV.y)
    const L = { x: PIV.x - Math.cos(tilt) * ARM, y: PIV.y + Math.sin(tilt) * ARM }, R = { x: PIV.x + Math.cos(tilt) * ARM, y: PIV.y - Math.sin(tilt) * ARM }
    // the beam
    x.save(); x.translate(PIV.x, PIV.y); x.rotate(-tilt); x.fillStyle = INK; x.fillRect(-ARM - 8, -12, ARM * 2 + 16, 24); x.fillStyle = GOLD; x.fillRect(-ARM - 4, -8, ARM * 2 + 8, 16); x.restore()
    x.fillStyle = INK; x.fillRect(PIV.x - 18, PIV.y - 18, 36, 36); x.fillStyle = GOLD; x.fillRect(PIV.x - 12, PIV.y - 12, 24, 24)
    for (const P of [L, R]) {
      x.strokeStyle = 'rgba(242,199,92,0.9)'; x.lineWidth = 4
      x.beginPath(); x.moveTo(P.x, P.y); x.lineTo(P.x - 80, P.y + 120); x.moveTo(P.x, P.y); x.lineTo(P.x + 80, P.y + 120); x.stroke()
      x.fillStyle = INK; x.fillRect(P.x - 100, P.y + 116, 200, 22); x.fillStyle = GOLD; x.fillRect(P.x - 96, P.y + 119, 192, 14)
    }
    // the invite pile on the left pan
    const n = 6 + T.more.filter(v => t > v + 0.4).length
    for (let i = 0; i < n; i++) {
      if (i === 3 && t > T.back) continue
      const dy = i * 20, ox = ((i * 37) % 60) - 30
      drawBits(x, ENV, ENVS[i % 3], L.x + ox, L.y + 100 - dy, 11, { rot: ((i * 13) % 7 - 3) * 0.06 })
    }
    // more invites fluttering in
    T.more.forEach((v, k) => {
      const p = prog(t, v - 0.2, v + 0.4)
      if (p <= 0 || p >= 1) return
      drawBits(x, ENV, ENVS[k % 3], lerp(L.x + 220 - k * 80, L.x, p) + Math.sin(p * 9) * 30, lerp(420, L.y + 100 - (6 + k) * 20, p), 11, { rot: Math.sin(p * 8) * 0.5 })
    })
    // the one invite that floats back (with a heart: "i'd love to soon")
    if (t > T.back) {
      const p = ease.outCubic(prog(t, T.back, T.back + 1.2))
      drawBits(x, ENV, ENVS[0], lerp(L.x, 200, p), lerp(L.y + 40, 470, p), 11 * (1 - prog(t, T.back + 1.6, T.back + 2.0)), { rot: p * 0.3 })
      floatHeart(x, t, T.back + 0.6, 220, 430)
    }
    // the pillow drops onto the right pan
    if (t > T.pillow - 0.4) {
      const p = clamp((t - T.pillow + 0.4) / 0.4)
      const sq = t > T.pillow ? 0.25 * Math.exp(-(t - T.pillow) * 6) : 0
      drawBits(x, PILLOW, PILLOW_C, R.x, lerp(200, R.y + 88, p * p), 15, { sx: 1 + sq, sy: 1 - sq })
    }
  },
  front(x, t, T, H) {
    drawBurst(x, 800, 470, 80, t, T.pillow, { word: 'BOOF', size: 42, color: '#c9b8f0', life: 0.8 })
    floatHeart(x, t, T.h2Land, H.x + 120, H.y - 200)
  },
  cues: T => [
    ['tick', 0.3, 0.025], ['tick', 0.8, 0.025],
    ...T.more.flatMap(v => [['whoosh', v - 0.2, 0.3, 0.02], ['tick', v + 0.4, 0.03]]),
    ['whoosh', T.back, 0.6, 0.025], ['pop', T.back + 0.6, 1318.51, 0.03, -0.4],
    ['whoosh', T.pillow - 0.4, 0.4, 0.035], ['boom', T.pillow, 0.1], ['pop', T.pillow + 0.02, 523.25, 0.04, 0.3], ['pluck', T.pillow + 0.3, 880, 0.03, 0.6, 0],
  ],
})
// the beam tilt (rad, + = left pan down): heavier with each invite, then the pillow levels it
function tiltAt(t, T) {
  let k = 0.32 + 0.04 * T.more.filter(v => t > v + 0.4).length + 0.03 * Math.sin(t * 3)
  if (t > T.back) k -= 0.04
  if (t > T.pillow) { const d = t - T.pillow; k = lerp(k, 0, clamp(d * 3)) + 0.12 * Math.exp(-d * 4) * Math.sin(d * 14) }
  return k
}
export const { DURATION, SCENES, CUES, T, DROP } = F
export default F
