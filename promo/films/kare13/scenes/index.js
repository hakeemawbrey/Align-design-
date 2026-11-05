// kare13 — THE ALMOST RELATIONSHIP, Ep 13: "Both waiting for the other one to say it" (20 s vertical, star_advice; house · D; hard cut).
//   0.0–3.0   split screen: Libra (left) and Aquarius (right), both mid-type on their phones, the same draft. The kit's
//             countdown runs 3-2-1 → "…NOBODY?" Hook "Both waiting. | *Nobody's saying it.*"
//   3.0–8.6   typed… deleted… typed… deleted, mirrored. Both finally send the same thing: "hey :)"
//   8.6–11.6  two thought clouds, the same sentence: "I want this to be real." Pisces in the middle, sobbing: "JUST SAY IT"
//  11.6–20.0  THE STARS: "You're both holding *the same door.*" · "Someone has to go first. *It can be you.*"
//             18.3 Libra presses send: "I want this to be real." Aquarius' phone lights up; hearts. HARD CUT.
import { makeAlmost, drawApartment, bedroom, split, star, stars, say, thought, hearts, sparkles, prog, ease, pop01, R, box, INK, BONE, GOLD, INTER, MONO } from '../../kare01/scenes/almostkit.js'

const D = 20
const T = { drafts: [3.0, 5.0], hey: 7.2, same: 8.6, pis: 9.6, just: 10.1, stars: 11.6, l1: 12.0, l2: 14.4, send: 18.3, buzz: 18.7 }
// the draft in the input bar at t: [start, text] typed at 14 cps, held, then deleted fast
const DRAFTS = [[-1.2, 'I really like y'], [T.drafts[0], 'so… are we'], [T.drafts[1], 'can we talk about us'], [T.hey - 0.6, 'hey :)']]
function draftAt(t) {
  let cur = ''
  for (let i = 0; i < DRAFTS.length; i++) {
    const [a, s] = DRAFTS[i], next = i + 1 < DRAFTS.length ? DRAFTS[i + 1][0] : 1e9
    if (t < a || t >= next) continue
    const typed = Math.min(s.length, Math.floor((t - a) * 14)), del = i < 3 ? Math.max(0, Math.floor((t - (next - 0.6)) * 40)) : 0
    cur = s.slice(0, Math.max(0, typed - del))
    if (i === 3 && t >= T.hey) cur = ''
  }
  return cur
}
function phone(x, t, cx, cy, { sent = [], draft = '' } = {}) {
  box(x, cx - 170, cy - 300, 340, 600, '#2a2050', { b: 8 })
  R(x, '#120c2a', cx - 154, cy - 270, 308, 500)
  x.font = `700 26px ${INTER}`; x.textBaseline = 'middle'
  sent.forEach((m, i) => { const k = pop01(t, m.at, 0.25, 2); if (k <= 0.01) return; x.save(); x.translate(cx + (m.side === 'R' ? 60 : -60), cy - 160 + i * 80); x.scale(k, k); x.font = `700 26px ${INTER}`; const w = x.measureText(m.text).width + 30; box(x, -w / 2, -24, w, 48, m.side === 'R' ? GOLD : '#e9e2f5', { b: 4 }); x.fillStyle = INK; x.textAlign = 'center'; x.fillText(m.text, 0, 1); x.restore() })
  // the input bar
  box(x, cx - 150, cy + 170, 300, 64, BONE, { b: 5 })
  x.save(); x.beginPath(); x.rect(cx - 140, cy + 170, 280, 64); x.clip()
  x.fillStyle = INK; x.textAlign = 'left'; x.font = `700 30px ${MONO}`; const tw = x.measureText(draft).width
  const off = Math.max(0, tw - 250); x.fillText(draft, cx - 138 - off, cy + 203)
  if (Math.floor(t * 3) % 2) R(x, INK, cx - 136 + tw - off, cy + 186, 4, 34)
  x.restore()
}
function side(x, t, sign, ox, flip, extra = {}) {
  const cx = 270 + ox
  const d = extra.draft ?? draftAt(t)
  const sent = t >= T.hey ? [{ at: T.hey, side: 'R', text: 'hey :)' }, { at: T.hey + 0.2, side: 'L', text: 'hey :)' }] : []
  phone(x, t, cx, 960, { sent: extra.sent || sent, draft: d })
  star(x, sign, cx, 1520, 260, t, { mood: extra.mood || (d.length ? 'neutral' : 'squint'), look: [flip ? -0.3 : 0.3, -0.9], hops: extra.hops || [] })
}
const shots = [
  { a: 0, b: T.stars, draw(x, t) {
    split(x, c => { bedroom(c, t, { lamp: 0.3 }); side(c, t, 'libra', 0, false) }, c => { drawApartment(c, t, { lamp: 0.4 }); side(c, t, 'aquarius', 540, true) })
    if (t > T.same) {
      thought(x, t, 270, 520, T.same, T.stars, 'I want this to be real.', { size: 28 })
      thought(x, t, 810, 520, T.same + 0.15, T.stars, 'I want this to be real.', { size: 28 })
    }
    if (t > T.pis) {
      const pk = pop01(t, T.pis, 0.35, 2.2)
      star(x, 'pisces', 540, 1240 + (1 - pk) * 600, 230, t, { tears: 3, mood: 'wide', look: [0, -0.5], hops: [T.just, T.just + 0.4, T.just + 0.8], box: false })
      say(x, t, 540, 1050, T.just, T.stars, 'JUST SAY IT', { size: 46 })
      sparkles(x, t, 540, 1200, T.just, 12, 240, 5)
    }
  } },
  { a: T.stars, b: D + 1, draw(x, t) {
    const sent = t > T.send
    const libSent = [{ at: T.hey, side: 'R', text: 'hey :)' }, ...(sent ? [{ at: T.send, side: 'R', text: 'I want this…' }] : [])]
    const aqSent = [{ at: T.hey, side: 'R', text: 'hey :)' }, ...(t > T.buzz ? [{ at: T.buzz, side: 'L', text: 'I want this…' }] : [])]
    split(x, c => { bedroom(c, t, { lamp: 0.3 }); side(c, t, 'libra', 0, false, { draft: sent ? '' : 'I want this to be real.', sent: libSent, mood: sent ? 'happy' : 'neutral', hops: [T.send] }) },
      c => { drawApartment(c, t, { lamp: 0.4 }); side(c, t, 'aquarius', 540, true, { draft: '', sent: aqSent, mood: t > T.buzz + 0.2 ? 'heart' : 'neutral', hops: [T.buzz + 0.1] }) })
    hearts(x, t, T.buzz + 0.2, 810, 1260, { n: 6 })
    stars(x, 540, 500, 160, t, { pop: pop01(t, T.stars, 0.38, 2.1), mood: t > T.send ? 'happy' : 'neutral', look: [0, 0.6], hops: [T.l1, T.l2, T.l2 + 0.7] })
    star(x, 'pisces', 540, 1270, 120, t, { tears: 2, mood: 'sparkle', look: [0, -0.4], box: false })
  } },
]
function cam(t) {
  const hit = [T.drafts[0], T.drafts[1], T.hey, T.stars].reduce((m, c) => (t >= c && t - c < 0.3 ? c : m), null)
  const k = hit === null ? 0 : 1 - ease.outCubic(prog(t, hit, hit + 0.3))
  const up = -260 * ease.inOutCubic(prog(t, T.stars, T.stars + 0.5))
  return { z: 1 + 0.06 * k, dy: up }
}
const CD = { at: 0.25, from: 3, gap: 0.55, go: '…NOBODY?', y: 1180, color: GOLD }
const E = makeAlmost({
  id: 'kare13', duration: D, ending: 'cut',
  hook: 'Both waiting. | *Nobody’s saying it.*', hookOut: [2.7, 2.9], hookTop: 220, hookSize: 100, hookPlate: [180, 480],
  shots, cam,
  fx: [['countdown', CD], ['screenShake', { at: T.just, len: 0.5, amp: 20 }]],
  lines: [
    { t: T.l1, speaker: 'THE STARS', text: 'You’re both holding *the same door.*' },
    { t: T.l2, speaker: 'THE STARS', text: 'Someone has to go first. *It can be you.*' },
  ],
  cues: [
    ...Array.from({ length: 30 }, (_, i) => ['tick', 3.0 + i * 0.14, 0.012]).filter(c => c[1] < T.hey),
    ['pop', T.hey, 1174.66, 0.04, -0.4], ['pop', T.hey + 0.2, 1174.66, 0.04, 0.4], ['pop', T.same, 880, 0.03, 0], ['pop', T.just, 1318.51, 0.04, 0], ['glitter', T.just, T.just + 0.5],
    ['whoosh', T.stars - 0.1, 0.3, 0.03], ['pop', T.stars + 0.1, 739.99, 0.035, 0], ['pop', T.send, 987.77, 0.04, -0.4], ['pluck', T.buzz, 1567.98, 0.04, 0.5, 0.4],
  ],
})
export const DURATION = E.DURATION, SCENES = E.SCENES, CUES = E.CUES
