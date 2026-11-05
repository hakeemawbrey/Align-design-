// kwme14: WAIT, THAT'S ME, "Replying “cool” to something that stung" (8 s loop, star_advice trial, music: lofi · Am).
//   0.00  frame 0: ♉ Taurus mid-type, its thumb over the keyboard, their message already on screen; hook on.
//   0.32  colour flash.  1.0 the draft types "cool"…  1.9 SENT.  2.5 a single raindrop pixel falls and lands on Taurus.
//   4.3–5.8  the slow turn.  5.9  last line: "it was not cool."   7.55–8 loop back.
import { makeWM, wmMusic, phone, sms, drawBits, prog, clamp, BONE } from '../../kwme01/wmkit.js'

const H = { x: 330, y: 1200, s: 420, face: 1 }
const TYPE = [1.0, 1.6], SEND = 1.9, DROP = [2.5, 3.3], TURN = 4.3
function scr(t) {
  return (c, w, h) => {
    c.fillStyle = '#1d1838'; c.fillRect(0, 0, w, 60); c.font = "700 26px 'Space Mono', monospace"; c.fillStyle = '#d9d4ff'; c.textAlign = 'center'; c.fillText('♌︎ them', w / 2, 40)
    sms(c, 'omg I totally forgot about tonight, sorry!!', 'L', 90, w, { size: 28 })
    if (t < SEND) { c.fillStyle = '#2a2148'; c.fillRect(10, h - 110, w - 20, 90); c.font = "700 30px 'Space Mono', monospace"; c.fillStyle = BONE; c.textAlign = 'left'; c.fillText('cool'.slice(0, Math.round(4 * prog(t, ...TYPE))) + (Math.floor(t * 3) % 2 ? '|' : ''), 26, h - 54) }
    else sms(c, 'cool', 'R', 300 + 140 * (1 - clamp((t - SEND) * 4)), w, { size: 32 })
  }
}
const EP = makeWM({
  id: 'kwme14', dur: 8, sign: 'taurus', turn: TURN, brk: 'flash',
  hook: 'Replying *“cool”* | to something that stung',
  last: 'it was not cool.',
  hero: H, wash: '#3a4a8a',
  heroOpts: (t) => ({ mood: t < SEND ? 'squint' : 'neutral', look: [1, 0.5], hops: [SEND], tilt: 0.04 }),
  front(x, t) {
    phone(x, 780, 1000, { w: 420, h: 660, rot: -0.04, draw: scr(t) })
    const p = prog(t, ...DROP)
    if (p > 0 && p < 1) drawBits(x, ['.D.', 'DDD', 'DDD'], { D: '#8fe3ff' }, H.x + 10, lerp0(500, H.y - 190, p * p), 10)
    if (t > DROP[1] && t < DROP[1] + 0.4) { const s = prog(t, DROP[1], DROP[1] + 0.4); for (const d of [-1, 1]) drawBits(x, ['D'], { D: '#8fe3ff' }, H.x + 10 + d * 50 * s, H.y - 190 - 40 * Math.sin(Math.PI * s), 10) }
  },
  cues: [...[0, 1, 2, 3].map(i => ['tick', +(TYPE[0] + i * 0.16).toFixed(2), 0.03]), ['whoosh', SEND, 0.25, 0.04], ['pop', SEND + 0.03, 659.25, 0.04, 0.3], ['pluck', DROP[1], 1567.98, 0.04, 0.3, -0.2]],
})
const lerp0 = (a, b, k) => a + (b - a) * k
export const DURATION = EP.DURATION, SCENES = EP.SCENES, CUES = EP.CUES
export const MUSIC = wmMusic(EP, { style: 'lofi', key: 'A', seed: 2614 })
