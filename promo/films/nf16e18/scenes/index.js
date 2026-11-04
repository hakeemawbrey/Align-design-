// nf16e18: MEET THE FAMILY, "Not in the Guest Room" (40 s vertical, star_advice post, music: cinematic · Cm).
// Story 0–35.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.4    HOOK "Whisper-fighting | in the *guest room?*"  ♏ Scorpio and ♐ Sagittarius nose to nose on a bed with nine
//              pillows. SCORPIO: "we *said* brunch." SAG: "I said *maybe* brunch."
//   5.4–11.4   "The walls are | *very thin.*"  The lamp flickers, the pillows slide off one by one. Mom ♓ Pisces, through the
//              wall: "everything ok in there??"  Both freeze.
//   11.4       card cut → NOTES: name it: "we're tense." · take a walk, just you two · talk it through outside the house.
//   20.2–27.4  "Walk *first.*"  A snowy street under the lights. SAG: "I panicked about the plan." SCORPIO: "I just wanted time
//              with *you.*"  They laugh.
//   27.4–35.6  "Talk *after.*"  Back at the door holding hands; Mom opens it and cries happy: "you're back!! *cocoa?*"
//              THE STARS: "Walk first. *Talk after.*"
import { makeFamily, bubble, mark, hearts, sparkles, label, R, prog, clamp, ease, lerp, drawBits, HEART, BONE, GOLD, PINK, INK } from '../../nf16e13/famkit.js'

const T_WALK = 20.2, T_DOOR = 27.4
const SLIDE0 = 5.4
const EP = makeFamily({
  id: 'nf16e18', key: 'Cm',
  cast: {
    you: { sign: 'scorpio', role: 'SCORPIO', acc: { scarf: '#c9a6ff' }, text: '#ffd0e8' },
    them: { sign: 'sagittarius', role: 'SAG', acc: { beanie: '#ff8a2a' }, text: '#ffe0b0' },
    mom: { sign: 'pisces', role: 'MOM', text: '#cfe4ff' },
  },
  beats: [
    { len: 5.4, room: 'guest', head: 'Whisper-fighting | in the *guest room?*',
      lines: [{ u: 0.6, who: 'you', text: 'we *said* brunch.' }, { u: 2.8, who: 'them', text: 'I said *maybe* brunch.' }],
      draw(x, t, S) {
        const u = S.u
        S.cast(x, t, 'you', { x: 450, y: 1010, s: 200, mood: 'squint', look: [1, 0], squash: 0.03 * Math.sin(t * 9) })
        S.cast(x, t, 'them', { x: 630, y: 1010, s: 200, mood: u > 2.6 ? 'squint' : 'neutral', look: [-1, 0] })
        label(x, 'psst', 380, 860, { size: 26, col: '#ffd0e8', alpha: u < 2.4 ? 0.8 : 0 })
        label(x, 'psst!!', 700, 850, { size: 26, col: '#ffe0b0', alpha: u > 2.6 ? 0.8 : 0 })
      } },
    { len: 6.0, room: 'guest', roomOpts: { lampOn: t => (t > SLIDE0 + 0.4 && t < SLIDE0 + 2.6 && Math.sin(t * 40) > 0.3) ? 0 : 1, slide: (t, i) => 140 * ease.inCubic(prog(t, SLIDE0 + 0.3 + i * 0.22, SLIDE0 + 0.6 + i * 0.22)) }, head: 'The walls are | *very thin.*',
      lines: [{ u: 2.8, who: 'mom', text: 'everything ok in there??' }],
      draw(x, t, S) {
        const u = S.u, fz = u > 2.8
        S.cast(x, t, 'you', { x: 450, y: 1010, s: 200, mood: fz ? 'wide' : 'squint', look: fz ? [-1, -1] : [1, 0], squash: fz ? 0 : 0.04 * Math.sin(t * 12), bob: fz ? 0 : undefined })
        S.cast(x, t, 'them', { x: 630, y: 1010, s: 200, mood: fz ? 'wide' : 'squint', look: fz ? [-1, -1] : [-1, 0], bob: fz ? 0 : undefined })
        // the knock on the wall
        const kn = [2.4, 2.6].map(a => S.t0 + a)
        kn.forEach((k, i) => { const a = 1 - prog(t, k, k + 0.5); if (t > k && a > 0) label(x, 'KNOCK', 160 + i * 60, 700 + i * 60, { size: 36, col: GOLD, alpha: a, font: "Inter, sans-serif", weight: 800, rot: -0.15 }) })
        mark(x, t, 540, 840, S.t0 + 2.9, S.t1 - 0.1, '!', PINK)
      },
      drawFront(x, t, S) { if (S.u > 2.8) { x.fillStyle = 'rgba(120,140,200,0.2)'; x.fillRect(40, 400, 1000, 960) } },
      cues: [['tick', 0.5, 0.03], ['tick', 0.9, 0.03], ['tick', 1.3, 0.03], ['tom', 2.4, 120, { gain: 0.2, decay: 0.15 }], ['tom', 2.6, 120, { gain: 0.2, decay: 0.15 }], ['pop', 2.9, 1760, 0.04, 0]] },
    { len: 8.8, kind: 'notes',
      tips: ['Name it: *“we’re tense.”*', 'Take a walk, *just you two.*', 'Talk it through *outside the house.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'neutral', look: [1, 0], hops: [S.t0 + 0.9] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: S.u > 3 ? 'happy' : 'neutral', look: [-1, 0], hops: [S.t0 + 3.2] })
      } },
    { len: 7.2, room: 'street', roomOpts: { scroll: t => (t - T_WALK) * 90 }, head: 'Walk *first.*',
      lines: [{ u: 0.4, who: 'them', text: 'I panicked about the plan.' }, { u: 2.8, who: 'you', text: 'I just wanted time with *you.*' }],
      draw(x, t, S) {
        const u = S.u, step = Math.abs(Math.sin(t * 5))
        S.cast(x, t, 'you', { x: 440, y: 1090 - 14 * step, s: 200, mood: u > 4.8 ? 'happy' : 'neutral', look: [1, 0], hops: [S.t0 + 4.9, S.t0 + 5.3] })
        S.cast(x, t, 'them', { x: 640, y: 1090 - 14 * (1 - step), s: 200, mood: u > 4.8 ? 'happy' : u > 2.8 ? 'sparkle' : 'neutral', look: [-1, 0], hops: [S.t0 + 5.0, S.t0 + 5.4] })
        bubble(x, t, 540, 880, S.t0 + 4.9, S.t1 - 0.1, 'HA!', { size: 32, col: BONE })
      },
      cues: [['pop', 4.9, 987.77, 0.03, -0.2], ['pop', 5.0, 1174.66, 0.03, 0.2]] },
    { len: 8.2, room: 'porch', roomOpts: { doorX: 540, open: t => ease.outCubic(prog(t, T_DOOR + 0.3, T_DOOR + 0.9)) }, head: 'Talk *after.*', pis: false,
      lines: [{ u: 0.7, who: 'mom', text: 'you’re back!! *cocoa?*' }],
      lastU: 3.1, last: 'Walk first. *Talk after.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        S.pisces(x, t, { x: 540, y: 1020, s: 200, mood: 'happy', tears: 3, pop: ok * clamp(prog(u, 0.4, 0.8)) })
        S.cast(x, t, 'you', { x: 280, y: 1090, s: 190, mood: 'happy', look: [1, -0.5], pop: ok })
        S.cast(x, t, 'them', { x: 800, y: 1090, s: 190, mood: 'happy', look: [-1, -0.5], pop: ok })
        // holding hands: a pixel heart floats between them
        drawBits(x, HEART, { H: PINK }, lerp(280, 800, 0.5 + 0.02 * Math.sin(t * 3)), 1180 - 6 * Math.sin(t * 4), 8 * ok)
        hearts(x, t, S.t0 + 0.9, 540, 900, { n: 5 })
        sparkles(x, t, 540, 960, S.t0 + 0.6, 10, 180, 2, [GOLD, PINK, BONE])
      },
      cues: [['tick', 0.3, 0.05], ['whoosh', 0.35, 0.3, 0.03], ['pluck', 0.7, 1318.51, 0.04, 0.5, 0], ['glitter', 0.6, 1.1]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [INK, R, T_WALK]
