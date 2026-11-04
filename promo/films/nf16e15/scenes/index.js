// nf16e15: MEET THE FAMILY, "Quiet Isn't Unhappy" (40 s vertical, star_advice post, music: dreamy · Eb).
// Story 0–35.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.0    HOOK "My partner's gone | *quiet.*"  A loud living room: ♌ Leo mid-laugh, Mom ♈ Aries and Uncle ♐ Sag talk
//              over each other ("AND THEN—" "NO WAY!!"); ♍ Virgo very still at the end of the couch.
//   5.0–11.0   "Leo's brain: | *spiraling.*"  Thought bubbles: "they hate us" · "they hate ME" · "they hate the DIP".
//              Virgo calmly eats one chip. THE STARS: "or… just *ask?*"
//   11.0–17.2  "Ask in *private.*"  The hallway. LEO: "you ok? you're quiet." VIRGO: "I'm having a *great* time."
//              "I recharge by *listening.*"
//   17.2       card cut → NOTES: don't read the silence, ask · ask in private, not at the table · offer a break, not a spotlight.
//   25.8–35.6  "Quiet can be | *all in.*"  Virgo hands Mom a folded napkin swan. MOM: "a SWAN?! for *me?*"  Grandpa ♓ Pisces
//              sobs happily. THE STARS: "Quiet can be *all in.*"
import { makeFamily, bubble, mark, hearts, sparkles, drawBits, label, R, box, shadow, prog, clamp, BONE, GOLD, PINK, INK } from '../../nf16e13/famkit.js'

const SWAN = ['....WW.....', '...WWWOO...', '....WW.....', '....WW.....', '....WW.....', 'W...WWW..W.', 'WW..WWWWWW.', 'WWWWWWWWWW.', '.WWWWWWWWW.', '..WWWWWWW..']
function swan(x, cx, cy, cell = 9, rot = 0) { drawBits(x, SWAN, { W: '#fffaf0', O: '#ff9a3a' }, cx, cy, cell, { rot }) }
function chips(x, cx, cy) {
  box(x, cx - 60, cy - 10, 120, 34, '#4f7cd8', { b: 5 })
  for (let i = 0; i < 6; i++) R(x, '#f2c75c', cx - 50 + i * 17, cy - 22 - (i % 2) * 6, 14, 14)
}
const LIV = { couchX: 560, couchW: 560, treeX: 900 }
const EP = makeFamily({
  id: 'nf16e15', key: 'Eb',
  cast: {
    you: { sign: 'leo', role: 'LEO', acc: { scarf: '#ff5c5c' }, text: '#ffe0b0' },
    them: { sign: 'virgo', role: 'VIRGO', acc: { glasses: 1 }, text: '#d8ffd8' },
    mom: { sign: 'aries', role: 'MOM', acc: { pearls: 1 }, text: '#ffd0c0' },
    uncle: { sign: 'sagittarius', role: 'UNCLE', acc: { bow: '#7fd0ff' } },
  },
  beats: [
    { len: 5.0, room: 'living', roomOpts: LIV, head: 'My partner’s gone | *quiet.*',
      lines: [{ u: 2.4, who: 'you', text: 'wait. are they *too* quiet??' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'mom', { x: 200, y: 1040, s: 180, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.5, S.t0 + 1.6, S.t0 + 2.9] })
        S.cast(x, t, 'uncle', { x: 380, y: 1060, s: 170, mood: 'sparkle', look: [-1, 0], hops: [S.t0 + 1.0, S.t0 + 2.2, S.t0 + 3.6] })
        S.cast(x, t, 'you', { x: 590, y: 1040, s: 200, mood: u < 2.2 ? 'happy' : 'wide', look: u < 2.2 ? [-1, 0] : [1, 0], hops: [S.t0 + 0.2, S.t0 + 0.55, S.t0 + 0.9], squash: u < 1.4 ? 0.05 * Math.sin(t * 16) : 0 })
        S.cast(x, t, 'them', { x: 780, y: 1070, s: 170, mood: 'neutral', look: [-1, 0], bob: 0 })
        bubble(x, t, 220, 840, S.t0 - 1, S.t0 + 2.4, 'AND THEN—', { size: 30, col: '#ffd0c0' })
        bubble(x, t, 420, 760, S.t0 + 0.6, S.t0 + 3.4, 'NO WAY!!', { size: 30, col: '#bfe8ff' })
        bubble(x, t, 600, 860, S.t0 - 1, S.t0 + 1.8, 'HAHAHA', { size: 30, col: '#ffe0b0' })
        mark(x, t, 590, 860, S.t0 + 2.2, S.t0 + 4.9, '?', GOLD)
      },
      cues: [['pop', 0.6, 880, 0.025, 0.2], ['pop', 2.2, 1567.98, 0.04, 0]] },
    { len: 6.0, room: 'living', roomOpts: LIV, head: 'Leo’s brain: | *spiraling.*',
      lines: [{ u: 4.2, who: 'stars', text: 'or… just *ask?*' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'you', { x: 420, y: 1050, s: 230, mood: u < 3.2 ? 'wide' : 'squint', look: [1, -0.4], squash: 0.03 * Math.sin(t * 20) })
        S.cast(x, t, 'them', { x: 780, y: 1070, s: 170, mood: u > 2.9 && u < 3.6 ? 'happy' : 'neutral', look: [-1, 0.6], bob: 0 })
        chips(x, 780, 1170)
        if (u > 2.8 && u < 3.4) R(x, '#f2c75c', 770, 1100 - (u - 2.8) * 120, 14, 14)
        const th = [['they hate us', 0.4, 300, 820], ['they hate ME', 1.8, 520, 720], ['they hate the DIP', 3.2, 420, 610]]
        th.forEach(([s, a, cx, cy], i) => bubble(x, t, cx, cy, S.t0 + a, S.t1 - 0.1, s, { size: 30 + i * 4, think: true, col: i === 2 ? '#ffd0c0' : BONE }))
      },
      cues: [['pop', 0.4, 659.25, 0.03, -0.2], ['pop', 1.8, 739.99, 0.035, 0.2], ['pop', 3.2, 880, 0.045, 0], ['tick', 2.9, 0.04], ['tick', 3.0, 0.04]] },
    { len: 6.2, room: 'living', roomOpts: { couch: false, tree: false, winX: 860 }, head: 'Ask in *private.*',
      lines: [{ u: 0.3, who: 'you', text: 'you ok? you’re quiet.' }, { u: 2.0, who: 'them', text: 'I’m having a *great* time.' }, { u: 3.7, who: 'them', text: 'I recharge by *listening.*' }],
      draw(x, t, S) {
        const u = S.u
        // a hallway door, the party's glow spilling out
        box(x, 90, 760, 200, 460, '#ffd98a', { b: 7 }); label(x, 'HAHA', 190, 900, { size: 30, col: '#7a4a22', alpha: Math.sin(t * 5) > 0 ? 1 : 0.4 })
        shadow(x, 480, 1225, 220); shadow(x, 720, 1225, 220)
        S.cast(x, t, 'you', { x: 480, y: 1070, s: 220, mood: u < 2.0 ? 'neutral' : 'sparkle', look: [1, 0] })
        S.cast(x, t, 'them', { x: 720, y: 1070, s: 220, mood: u < 1.8 ? 'neutral' : 'happy', look: [-1, 0] })
        hearts(x, t, S.t0 + 4.4, 480, 900, { n: 4 })
      } },
    { len: 8.6, kind: 'notes',
      tips: ['Don’t read the silence. *Ask.*', 'Ask in private, *not at the table.*', 'Offer a *break*, not a spotlight.'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0], hops: [S.t0 + 5.5] })
      } },
    { len: 9.8, room: 'living', roomOpts: LIV, head: 'Quiet can be | *all in.*', pis: false,
      lines: [{ u: 0.9, who: 'mom', text: 'a SWAN?! for *me?*' }],
      lastU: 3.6, last: 'Quiet can be *all in.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        S.pisces(x, t, { x: 940, y: 1150, s: 130, mood: 'happy', tears: 3, acc: { glasses: 1, bow: '#7fd0ff' }, pop: ok })
        S.cast(x, t, 'mom', { x: 300, y: 1050, s: 210, mood: u > 0.8 ? 'heart' : 'wide', look: [1, 0], hops: [S.t0 + 0.8, S.t0 + 1.2], pop: ok })
        S.cast(x, t, 'them', { x: 560, y: 1060, s: 200, mood: 'happy', look: [-1, 0], pop: ok })
        S.cast(x, t, 'you', { x: 770, y: 1050, s: 200, mood: u > 1.5 ? 'heart' : 'sparkle', look: [-1, 0], hops: [S.t0 + 1.6], pop: ok })
        const sp = clamp(prog(u, 0, 0.6))
        swan(x, 560 - 130 * sp, 930 - 40 * Math.sin(Math.PI * sp), 12 * ok)
        sparkles(x, t, 430, 920, S.t0 + 0.6, 10, 130, 1, [GOLD, BONE, PINK])
        hearts(x, t, S.t0 + 1.0, 300, 880, { n: 6 })
      },
      cues: [['whoosh', 0.0, 0.3, 0.03], ['pluck', 0.6, 1318.51, 0.04, 0.5, -0.2], ['glitter', 0.6, 1.1]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void INK
