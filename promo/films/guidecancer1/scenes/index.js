// guidecancer1 (20 s vertical Align ad, Star Talk "Your Star Guide", note 1 / 3: the blind spot) · story 0–15.6, then the end card.
//   0.00–2.30  "*Cancer*, your star has a note."  ♋ your star, lantern lit, balances a wobbling tower of soup bowls.
//   2.50–6.30  YOUR STAR: "you take care of everyone first."  The bowls fly out one by one to four little friend stars.
//              Cancer is left looking up at an empty dotted bowl outline (none for itself). Chip: cardinal water, the Moon.
//   6.40–11.6  YOUR STAR: "your feelings count too. say them."  Cancer says it ("i'd like some too.") and a fresh bowl
//              arcs back from the friends and lands on its head. Heart-eyes.
//   11.7–15.6  card flip · "Care for *you*, too."  The same pose as frame 0, but one bowl, and it's Cancer's.
import { clamp, lerp, prog, ease, el } from '../../../src/lib.js'
import { easeOutBack } from '../../wheel.js'
import { drawStarChar } from '../../startalk.js'
import { guideFilm } from './guidefilm.js'
import { INK, drawBits, pop01, popOut, SERIF } from './kit.js'

const T = {
  hookOut: [2.0, 2.3], open: 2.3, l1: 2.5, fly: [2.9, 3.45, 4.0, 4.55], empty: 5.2, fact: [5.4, 4.6],
  l2: 6.4, say: 8.2, back: 9.3, close: 11.55, cut: 11.62, last: 11.7, lastLand: 12.25, out: [15.1, 15.5],
}
const HERO = { x: 540, y: 1010, size: 330 }
const FRIENDS = [
  { x: 150, y: 1300, c: '#c9b8f0', seed: 4 }, { x: 345, y: 1345, c: '#ff8fb1', seed: 5 },
  { x: 735, y: 1345, c: '#7fe0b0', seed: 6 }, { x: 930, y: 1300, c: '#f2c75c', seed: 7 },
]
const BOWL = ['.SSSSSSSSS.', 'RSSSSSSSSSR', 'RRRRRRRRRRR', 'BBBBBBBBBBB', '.BBBBBBBBB.', '..BBBBBBB..', '...ddddd...']
const BOWL_C = { S: '#ffb35c', R: '#fff3dc', B: '#5fb8f0', d: '#2f6fb0' }
const HEART = ['.H.H.', 'HWHHH', 'HHHHH', '.HHH.', '..H..']
const CELL = 9, BH = 56

function steam(x, cx, cy, t, a = 1, k = 0) {
  x.save(); x.globalAlpha *= 0.75 * a; x.fillStyle = '#fff3dc'
  for (let s = 0; s < 3; s++) for (let j = 0; j < 5; j++) {
    const ph = (t * 1.1 + j * 0.2 + s * 0.33 + k * 0.17) % 1
    x.globalAlpha = 0.6 * a * Math.sin(Math.PI * ph)
    x.fillRect(Math.round(cx + (s - 1) * 22 + Math.sin(ph * 6 + s) * 6), Math.round(cy - 14 - ph * 46), 6, 6)
  }
  x.restore()
}
const arc = (a, b, p, h) => ({ x: lerp(a.x, b.x, p), y: lerp(a.y, b.y, p) - Math.sin(Math.PI * p) * h })

function cancerMood(t) {
  if (t < T.l1) return { mood: 'happy', look: [0, -1] }
  if (t < T.empty) return { mood: 'happy' }
  if (t < T.l2 + 0.6) return { mood: 'neutral', look: [0, -1], blink: false }
  if (t < T.say) return { mood: 'wide', look: [0, 0] }
  if (t < T.back + 0.45) return { mood: 'sparkle', look: [0, 0] }
  return { mood: 'heart' }
}

// where the bowls are: the stack sits on Cancer's top tip (i = 0 is the bottom bowl, the top one flies first)
function stackPos(r, i, t) {
  const sway = Math.sin(t * 3.2) * (t < T.fly[0] ? 1 : 0.4)
  return { x: r.x + sway * (i + 1) * 5, y: r.top - 18 - i * BH, rot: sway * 0.05 * (i + 1) }
}
const friendTop = (f, t) => ({ x: f.x, y: f.y - 82 + Math.sin(t * 2.2 + f.seed * 2.1) * 4 })

const film = guideFilm({
  duration: 20, sign: 'cancer', n: 1, seed: 3,
  hook: '*Cancer,* your star | has a note.',
  lines: [{ t: T.l1, text: 'you take care of *everyone* first.' }, { t: T.l2, text: 'your feelings count too. *say them.*' }],
  T, fact: 'CANCER: CARDINAL WATER · RULED BY THE MOON', factY: 640,
  last: 'Care for | *you,* too.', hero: HERO, mood: cancerMood,
  side: -1,
  hops: [...T.fly.map(f => f - 0.05), T.back + 0.45],
  back(x, t) {
    const ok = popOut(t, T.out)
    FRIENDS.forEach((f, i) => {
      const got = t > T.fly[3 - i] + 0.5
      drawStarChar(x, f.x, f.y, 124, t, { color: f.c, mood: t > T.say && t < T.back + 0.6 ? 'wide' : got ? (t > T.back + 0.6 ? 'heart' : 'happy') : 'neutral', look: got ? [0, 0] : [i < 2 ? 1 : -1, -1], seed: f.seed, glow: 0.6, pop: ok, hops: got ? [T.fly[3 - i] + 0.5] : [] })
    })
  },
  front(x, t, S) {
    const { r, ok } = S
    if (ok <= 0) return
    // the four flying bowls (top of the stack first, to the friends right→left alternating)
    T.fly.forEach((tf, k) => {
      const i = 3 - k, f = FRIENDS[[3, 0, 2, 1][k]]
      const from = stackPos(r, i, t), to = friendTop(f, t)
      const p = prog(t, tf, tf + 0.5)
      let pos, rot
      if (p <= 0) { pos = from; rot = from.rot } else if (p < 1) { pos = arc(from, to, ease.inOutQuad(p), 260); rot = p * Math.PI * 2 } else { pos = to; rot = 0.04 * Math.sin(t * 3 + k) }
      drawBits(x, BOWL, BOWL_C, pos.x, pos.y, CELL * (p >= 1 ? 0.8 : 1), { rot, alpha: ok })
      steam(x, pos.x, pos.y - 20, t, p > 0 && p < 1 ? 0 : ok, k)
      if (p >= 1 && t < tf + 1.3) drawBits(x, HEART, { H: '#ff4f86', W: '#ffd1de' }, to.x + 50, to.y - 40 - (t - tf - 0.5) * 80, 6, { alpha: 1 - prog(t, tf + 0.9, tf + 1.3) })
    })
    // none left: a dotted outline where Cancer's bowl should be
    const ghostA = clamp(prog(t, T.empty, T.empty + 0.3)) * (1 - prog(t, T.back + 0.3, T.back + 0.5))
    if (ghostA > 0) {
      x.save(); x.globalAlpha = 0.75 * ghostA; x.setLineDash([10, 10]); x.lineWidth = 5; x.strokeStyle = '#efe6d6'
      x.beginPath(); x.roundRect(r.x - 40, r.top - 50, 80, 42, [4, 4, 22, 22]); x.stroke(); x.restore()
      x.save(); x.globalAlpha = ghostA; x.fillStyle = '#efe6d6'; x.font = `800 44px Inter`; x.textAlign = 'center'; x.fillText('?', r.x + 70, r.top - 40 + Math.sin(t * 5) * 4); x.restore()
    }
    // Cancer's own bowl: arcs up from the pink friend and lands on its head
    const bp = prog(t, T.back, T.back + 0.55)
    if (bp > 0) {
      const from = friendTop(FRIENDS[1], t), to = stackPos(r, 0, t)
      const pos = bp < 1 ? arc(from, to, ease.inOutQuad(bp), 300) : to
      const land = t > T.back + 0.55 ? 1 + 0.25 * Math.exp(-(t - T.back - 0.55) * 9) * Math.sin((t - T.back - 0.55) * 30) : 1
      drawBits(x, BOWL, BOWL_C, pos.x, pos.y, CELL * land * easeOutBack(clamp(bp * 3), 2), { rot: bp < 1 ? -bp * Math.PI * 2 : to.rot * 0.5 })
      if (bp >= 1) steam(x, pos.x, pos.y - 20, t, ok, 9)
    }
    // the speech bubble: Cancer says it
    const sp = pop01(t, T.say, 0.3, 2.4) * (1 - prog(t, T.close - 0.4, T.close - 0.1))
    if (sp > 0.01) {
      x.save(); x.translate(r.x + 250, r.y - 150); x.scale(sp, sp); x.rotate(0.04)
      x.fillStyle = INK; x.beginPath(); x.roundRect(-190, -54, 380, 108, 22); x.fill()
      x.fillStyle = '#f5eedf'; x.beginPath(); x.roundRect(-182, -46, 364, 92, 18); x.fill()
      x.beginPath(); x.moveTo(-120, 44); x.lineTo(-70, 44); x.lineTo(-150, 96); x.closePath(); x.fill()
      x.fillStyle = '#245f8f'; x.font = `italic 500 50px ${SERIF}`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText("i'd like some too.", 0, 2)
      x.restore()
    }
    // frame 0: the stack is all on Cancer (drawn by the flying-bowl pass above, p <= 0)
  },
  cues: [
    ...T.fly.flatMap((f, k) => [['whoosh', f, 0.3, 0.025], ['pop', f + 0.5, [880, 987.77, 1174.66, 1318.51][k], 0.04, (k % 2 ? 0.3 : -0.3)]]),
    ['tick', 0.4, 0.02], ['tick', 0.9, 0.02], ['tick', 1.5, 0.02],
    ['pluck', T.empty, 587.33, 0.03, 0.5, 0], ['pop', T.say, 987.77, 0.035, 0.2],
    ['whoosh', T.back, 0.4, 0.03], ['bell', T.back + 0.55, 1760, 0.03, 1.2, 0], ['glitter', T.back + 0.5, T.back + 1.1],
  ],
  music: null,
})

export const { DURATION, SCENES, CUES, LINES } = film
export { T }
void el
