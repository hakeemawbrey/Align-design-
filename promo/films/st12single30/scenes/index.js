// st12single30 (20 s vertical Align ad, Star Talk season 12 "Hot Takes", S12 E09) · story 0–15.6, then the end card.
//   🔥 HOT TAKE: "Single at 30 is a *flex*." (heat 4). ♄ SATURN (pro; in astrology the Saturn return lands at about
//   27–30) vs THE AUNTIES (♋ Cancer + ♉ Taurus in their reading glasses: "but WHEN?"). Behind them a waiting-room
//   "NOW SERVING" sign ticks 27 → 30; at the last line it reads YOU. THE STARS RULE: single is a whole life, not a
//   waiting room. Last line (Saturn): "Single isn't *behind*."
// The engine is ./hotkit.js (this folder's copy); the season look is ../../sthot.js. Pure f(t).
import { clamp, prog } from '../../../src/lib.js'
import { signStar } from '../../startalk.js'
import { drawSaturn, SATURN } from '../../st5cast.js'
import { auntie } from './props.js'
import { makeEpisode, R, INK, BONE, GOLD, r3 } from './hotkit.js'

const CAN = signStar('cancer'), TAU = signStar('taurus')
const SAT_COL = '#f7dca0'

function aunties(x, X, Y, s, t, o) {
  const { pop = 1, hops, seed, ...m } = o
  const fog = o.fog || 0
  const a = auntie(x, X - 104, Y + 20, s * 0.78, t, { ...CAN, ...m, pop, hops, seed: 5, glasses: { chain: true, fog, down: o.down || 0 } })
  auntie(x, X + 104, Y + 28, s * 0.74, t, { ...TAU, ...(o.m2 || m), pop, hops: hops && hops.map(h => h + 0.08), seed: 8, glasses: { frame: '#5a3a14', fog, down: o.down || 0 } })
  return { x: X, y: Y, size: s, top: a.top + 10 }
}

function sign(x, t, T) {
  // a waiting-room ticket display: NOW SERVING 27 … 30, then YOU
  const cx = 540, cy = 790, w = 300, h = 150
  R(x, INK, cx - w / 2 - 8, cy - h / 2 - 8, w + 16, h + 16)
  R(x, '#2a1f45', cx - w / 2, cy - h / 2, w, h)
  R(x, '#3c2f63', cx - w / 2, cy - h / 2, w, 8)
  R(x, INK, cx - 4, cy - h / 2 - 60, 8, 52)
  x.save(); x.textAlign = 'center'; x.textBaseline = 'middle'
  x.font = "700 24px 'Space Mono', monospace"; x.fillStyle = 'rgba(239,230,214,0.75)'
  x.fillText('NOW SERVING', cx, cy - 40)
  const steps = [0, T.lines[0].t, T.lines[1].t, T.lines[2].t]
  let n = 27; steps.forEach((s, i) => { if (t >= s) n = 27 + i })
  const you = t >= T.last
  const flick = steps.slice(1).some(s => t >= s && t < s + 0.12) || (t >= T.last && t < T.last + 0.12)
  x.font = "700 70px 'Space Mono', monospace"
  x.shadowColor = you ? GOLD : '#ff5c5c'; x.shadowBlur = flick ? 0 : 18
  x.fillStyle = flick ? '#5a2030' : you ? GOLD : '#ff6b6b'
  x.fillText(you ? 'YOU ★' : String(n), cx, cy + 22)
  x.restore()
}

const EP = makeEpisode({
  id: 'st12single30', numeral: 'S12 E09', duration: 20, key: 'D',
  take: 'Single at 30 is a *flex*.', takeAccent: SAT_COL, heat: 4,
  pro: { tag: SATURN.tag, color: SAT_COL, pitch: 330,
    draw: (x, X, Y, s, t, o) => drawSaturn(x, X, Y - 20, 330, t, { pointer: true, ...o }) },
  con: { tag: '♋♉ THE AUNTIES', color: CAN.color, accent: '#ffb3c7', pitch: 880, draw: aunties },
  lines: [
    ['con', 'single at 30?? but *WHEN??*'],
    ['pro', 'in astrology, my return lands around *27–30.*'],
    ['pro', 'it’s a glow-up, not a *deadline.*'],
  ],
  verdict: 'single is a whole life, not a waiting room.',
  last: 'Single isn’t *behind*.', lastWho: 'pro',
  moods(ph, t, T) {
    if (ph === 'take') return [{ mood: 'squint', look: [1, 0] }, {}]
    if (ph === 0) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0], fog: clamp(prog(t, T.lines[0].t, T.lines[0].t + 0.6)) * 0.8 }]
    if (ph === 1) return [{ mood: 'neutral', look: [1, 0] }, { mood: 'wide', look: [-1, 0], down: 1 }]
    if (ph === 2) return [{ mood: 'happy', look: [1, 0] }, { mood: 'squint', look: [-1, 0], down: 1 }]
    if (ph === 'verdict') return [{ mood: 'neutral', look: [0, -1] }, { mood: 'neutral', look: [0, -1] }]
    return [{ mood: 'happy', look: [0, 0] }, { mood: 'heart', look: [-1, 0] }]
  },
  set: (x, t, T) => sign(x, t, T),
  cues: T => [
    ...T.lines.map(L => ['tick', r3(L.t), 0.05]),
    ['bell', r3(T.last), 1567.98, 0.03, 1.4, 0],
  ],
})
void BONE

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
