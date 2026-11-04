// nf16e17: MEET THE FAMILY, "Offer to Help" (30 s vertical, star_advice post, music: funk · G).
// Story 0–25.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–4.6    HOOK "Your partner's family | is *cooking.*"  The kitchen. ♈ Aries mid-sprint with a whisk raised; Grandma
//              ♑ Capricorn at the stove. ARIES: "I'm here! I can *help!*"
//   4.6–9.8    "Aries stirs | *everything.*"  Aries zips pot to pot, steam everywhere; ♏ Scorpio winces in the doorway.
//              GRANDMA: "sit, *dear.*"
//   9.8        card cut → NOTES: offer once, warmly · if they say no, believe them · find a small job: plates, dishes.
//   17.6–25.6  "Help how | *they* like help."  Aries dries plates beside Grandma, the stack grows, they chat. GRANDMA: "come
//              back *next year.*"  Cousin ♓ Pisces sobs by the fridge. THE STARS: "Help how *they* like help."
import { makeFamily, bubble, mark, hearts, sparkles, puff, R, box, plate, prog, clamp, BONE, GOLD, PINK, INK } from '../../nf16e13/famkit.js'

function whisk(x, cx, cy, rot = 0) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  R(x, INK, -7, 0, 14, 70); R(x, '#8a5a3a', -4, 2, 8, 66)
  for (const d of [-14, -5, 5, 14]) { R(x, INK, d - 3, -70, 6, 72); R(x, '#cfd8ee', d - 1.5, -68, 3, 68) }
  R(x, INK, -18, -76, 36, 8)
  x.restore()
}
const KIT = { stoveX: 760, sinkX: 300 }
const EP = makeFamily({
  id: 'nf16e17', key: 'G',
  cast: {
    you: { sign: 'aries', role: 'ARIES', acc: { scarf: '#ffd25a' }, text: '#ffd0c0' },
    them: { sign: 'scorpio', role: 'SCORPIO', acc: { beanie: '#8a2f3e' }, text: '#ffd0e8' },
    gran: { sign: 'capricorn', role: 'GRANDMA', acc: { glasses: 1, apron: '#ffd0de', bun: '#d8d0e8' }, text: '#e0d8ff' },
  },
  beats: [
    { len: 4.6, room: 'kitchen', roomOpts: KIT, head: 'Your partner’s family | is *cooking.*',
      lines: [{ u: 0.5, who: 'you', text: 'I’m here! I can *help!*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'gran', { x: 590, y: 1010, s: 200, mood: u > 1.0 ? 'wide' : 'happy', look: [-1, 0] })
        const run = Math.min(1, u / 1.2), ax = 150 + 260 * run
        const F = S.cast(x, t, 'you', { x: ax, y: 1010 - 20 * Math.abs(Math.sin(t * 12)) * (1 - run * 0.7), s: 200, mood: 'sparkle', look: [1, 0], squash: -0.06 })
        whisk(x, ax + 100, F.cy - 70, 0.4 + 0.2 * Math.sin(t * 14))
        if (u < 1.3) for (let i = 0; i < 3; i++) R(x, 'rgba(239,230,214,0.5)', ax - 130 - i * 40, 980 + i * 26, 30 - i * 8, 8)
      },
      cues: [['whoosh', 0.0, 0.3, 0.04], ['pop', 1.0, 1567.98, 0.03, 0.3]] },
    { len: 5.2, room: 'kitchen', roomOpts: KIT, head: 'Aries stirs | *everything.*',
      lines: [{ u: 3.0, who: 'gran', text: 'sit, *dear.*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'them', { x: 130, y: 1030, s: 150, mood: u > 1.2 ? 'squint' : 'wide', look: [1, 0] })
        S.cast(x, t, 'gran', { x: 540, y: 1010, s: 190, mood: u > 2.8 ? 'happy' : 'wide', look: [1, 0], hops: [S.t0 + 2.9] })
        const zig = u < 2.8 ? Math.sin(u * 7) : 0, ax = u < 2.8 ? 760 + 90 * zig : 360
        const F = S.cast(x, t, 'you', { x: ax, y: u < 2.8 ? 990 : 1060, s: 190, mood: u < 2.8 ? 'sparkle' : 'wide', look: [u < 2.8 && Math.cos(u * 7) < 0 ? -1 : 1, 0.5], squash: u > 2.9 ? 0.15 : 0 })
        if (u < 2.8) whisk(x, ax + 40, F.cy + 40, 2.6 + 0.4 * Math.sin(t * 20))
        if (u < 3.0) for (const px of [700, 820]) puff(x, t, px, 980, S.t0, { n: 6, size: 34, rise: 260, life: 0.8, col: 'rgba(239,230,214,0.7)' })
        mark(x, t, 130, 880, S.t0 + 1.2, S.t0 + 3.0, '!', PINK)
      },
      cues: [['tick', 0.3, 0.05], ['tick', 0.75, 0.05], ['tick', 1.2, 0.05], ['tick', 1.65, 0.05], ['tick', 2.1, 0.05], ['tick', 2.55, 0.05], ['pop', 2.9, 659.25, 0.04, 0]] },
    { len: 7.8, kind: 'notes',
      tips: ['Offer once, *warmly.*', 'If they say no, *believe them.*', 'Find a small job: *plates, dishes.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9, S.t0 + 5.2] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0] })
      } },
    { len: 8.0, room: 'kitchen', roomOpts: { ...KIT, stove: true }, head: 'Help how | *they* like help.', pis: false,
      lines: [{ u: 0.6, who: 'gran', text: 'come back *next year.*' }],
      lastU: 3.0, last: 'Help how *they* like help.',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        S.pisces(x, t, { x: 960, y: 1020, s: 130, mood: 'happy', tears: 3, pop: ok })
        S.cast(x, t, 'gran', { x: 220, y: 1010, s: 190, mood: u > 0.5 ? 'happy' : 'neutral', look: [1, 0], pop: ok, hops: [S.t0 + 0.6] })
        S.cast(x, t, 'you', { x: 430, y: 1010, s: 190, mood: u > 1.2 ? 'heart' : 'happy', look: [-1, 0], pop: ok, hops: [S.t0 + 1.2] })
        // the stack of dried plates grows on the counter
        const n = Math.min(7, Math.floor(u * 1.2) + 2)
        for (let i = 0; i < n; i++) plate(x, 620, 1130 - i * 14, 110)
        // a dish towel in Aries' hand
        R(x, INK, 506, 1000, 40, 60); R(x, '#ff8fb1', 510, 1004, 32, 52); R(x, BONE, 510, 1020, 32, 6)
        hearts(x, t, S.t0 + 1.2, 430, 880, { n: 5 })
        sparkles(x, t, 620, 1060, S.t0 + 0.2, 8, 120, 1, [GOLD, BONE, PINK])
        bubble(x, t, 330, 830, S.t0 + 4.0, S.t0 + 7.4, 'same time next year?', { size: 28, col: '#ffd0c0' })
      },
      cues: [['pluck', 0.6, 1174.66, 0.035, 0.5, -0.2], ['pop', 1.2, 1318.51, 0.03, 0.2], ['tick', 1.7, 0.03], ['tick', 2.5, 0.03], ['tick', 3.3, 0.03], ['tick', 4.1, 0.03]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [clamp, prog, box]
