// nf16e14: MEET THE FAMILY, "The Ex Question" (30 s vertical, star_advice post, music: jazzy · Bb).
// Story 0–25.6, then the shared end card. Series look: ../../nf16e13/famkit.js.
//   0.0–5.2    HOOK "Pass the potatoes and… | *the ex?*"  The holiday table. Aunt ♐ Sagittarius mid-lean, fork up;
//              ♉ Taurus mid-chew; ♎ Libra beside it. AUNT: "so whatever happened to *the last one?*"
//   5.2–8.8    "Record *scratch.*"  The frame freezes blue-grey, Libra's eyes go wide, Taurus sweats.
//              THE STARS: "pause. you don't owe the *whole story.*"
//   8.8        card cut → THE STARS' NOTES: keep it short · keep it kind · bring it back to now.
//   16.8–25.6  "Short. Kind. *Done.*"  TAURUS: "we wished each other well." "and this is *Sam!*"  Libra blushes, the aunt
//              melts, cousin ♓ Pisces sobs at "well". THE STARS: "Close that door *gently.*"
import { makeFamily, bubble, mark, hearts, sparkles, label, puff, R, prog, clamp, outK, BONE, GOLD, PINK, SKYB } from '../../nf16e13/famkit.js'

const AUNT_X = 190, TAU_X = 375, LIB_X = 715
const TOPTS = { roastX: 545, plates: [[190, '#e8b25a'], [375, '#7fbf5a'], [715, '#e8b25a'], [905, '#7fbf5a']], candles: [280, 810] }
function table(x, t, S, { lean = 0, freeze = false, u = 0 } = {}) {
  S.cast(x, t, 'aunt', { x: AUNT_X + lean * 50, y: 1040 - lean * 20, s: 210, mood: freeze ? 'wide' : 'sparkle', look: [1, 0], squash: -0.05 * lean })
  S.cast(x, t, 'you', { x: TAU_X, y: 1040, s: 210, mood: freeze ? 'wide' : 'happy', look: [-1, 0], squash: freeze ? 0 : 0.05 * Math.sin(t * 14) * (u < 1.5 ? 1 : 0) })
  S.cast(x, t, 'them', { x: LIB_X, y: 1040, s: 210, mood: freeze ? 'wide' : 'happy', look: [-1, 0] })
}
const EP = makeFamily({
  id: 'nf16e14', key: 'Bb',
  cast: {
    you: { sign: 'taurus', role: 'TAURUS', acc: { scarf: '#9fe6b0' }, text: '#d8ffd8' },
    them: { sign: 'libra', role: 'LIBRA', acc: { bow: '#ff8fb1' }, text: '#ffd8ec' },
    aunt: { sign: 'sagittarius', role: 'AUNT', acc: { pearls: 1, glasses: 1 }, text: '#ffd9b8' },
  },
  beats: [
    { len: 5.2, room: 'table', roomOpts: TOPTS, head: 'Pass the potatoes and… | *the ex?*',
      lines: [{ u: 0.6, who: 'aunt', text: 'so whatever happened to *the last one?*' }],
      draw(x, t, S) {
        const u = S.u, lean = clamp(prog(u, 0, 0.5) + 0.6)
        table(x, t, S, { lean, u })
        // the fork, raised
        R(x, '#1b1236', AUNT_X + 150, 900, 10, 90); R(x, '#cfd8ee', AUNT_X + 152, 902, 6, 86); for (let i = 0; i < 3; i++) R(x, '#cfd8ee', AUNT_X + 144 + i * 8, 884, 5, 20)
        mark(x, t, TAU_X, 860, S.t0 + 2.4, S.t0 + 5.1, '?', GOLD)
      },
      cues: [['pop', 2.4, 1567.98, 0.04, 0]] },
    { len: 3.6, head: 'Record *scratch.*', room: 'table', roomOpts: TOPTS,
      lines: [{ u: 0.4, who: 'stars', text: 'pause. you don’t owe the *whole story.*' }],
      draw(x, t, S) {
        table(x, t, S, { lean: 1, freeze: true })
        puff(x, t, TAU_X + 80, 940, S.t0, { n: 2, col: 'rgba(143,227,255,0.8)', rise: -60, size: 14 })
      },
      drawFront(x, t, S) {
        x.fillStyle = 'rgba(120,140,200,0.28)'; x.fillRect(40, 400, 1000, 960)
        for (let i = 0; i < 4; i++) R(x, 'rgba(255,255,255,0.25)', 40, 450 + ((i * 230 + S.u * 600) % 900), 1000, 3)
        label(x, '❚❚ PAUSED', 540, 480, { size: 40, col: BONE, alpha: Math.sin(t * 6) > -0.2 ? 1 : 0.3 })
      },
      cues: [['boom', 0, 0.2], ['tick', 0.02, 0.08], ['whoosh', 0.05, 0.25, 0.04]] },
    { len: 8.0, kind: 'notes',
      tips: ['Keep it *short.*', 'Keep it *kind.*', 'Then bring it *back to now.*'],
      draw(x, t, S) {
        S.cast(x, t, 'you', { x: 560, y: 1150, s: 170, mood: 'happy', look: [1, 0], hops: [S.t0 + 0.9, S.t0 + 3.2, S.t0 + 5.5] })
        S.cast(x, t, 'them', { x: 800, y: 1150, s: 170, mood: 'happy', look: [-1, 0] })
      } },
    { len: 8.8, room: 'table', roomOpts: TOPTS, head: 'Short. Kind. *Done.*', pis: false,
      lines: [{ u: 0.3, who: 'you', text: 'we wished each other well.' }, { u: 2.2, who: 'you', text: 'and this is *Sam!*' }],
      lastU: 4.6, last: 'Close that door *gently.*',
      draw(x, t, S) {
        const u = S.u, ok = S.out
        S.pisces(x, t, { x: 905, y: 1050, s: 170, mood: 'happy', tears: u > 0.5 ? 3 : 2, pop: ok })
        S.cast(x, t, 'aunt', { x: AUNT_X, y: 1040, s: 210, mood: u > 2.6 ? 'heart' : 'happy', look: [1, 0], pop: ok, hops: [S.t0 + 2.6] })
        S.cast(x, t, 'you', { x: TAU_X, y: 1040, s: 210, mood: 'happy', look: [1, 0], pop: ok, hops: [S.t0 + 2.2] })
        S.cast(x, t, 'them', { x: LIB_X, y: 1040, s: 210, mood: u > 2.4 ? 'sparkle' : 'happy', look: [-1, 0], blush: u > 2.4 ? 1 : undefined, pop: ok, hops: [S.t0 + 2.5] })
        hearts(x, t, S.t0 + 2.7, AUNT_X, 880, { n: 5 })
        sparkles(x, t, LIB_X, 960, S.t0 + 2.4, 10, 160, 1, [PINK, GOLD, BONE])
        bubble(x, t, AUNT_X + 20, 820, S.t0 + 3.0, S.t0 + 6.0, 'hi, Sam!!', { size: 32, col: '#ffd9b8' })
      },
      cues: [['pluck', 2.4, 1174.66, 0.04, 0.5, 0.3], ['glitter', 2.4, 2.9], ['pop', 3.0, 987.77, 0.03, -0.3]] },
  ],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [outK, SKYB]
