// og-nffe08: the social rework of nffe08, "Show up with soup" (star_advice, music: pop · D).
// Same bedroom, street, cast and story; static HOOK (box) from frame 0, no animated hook / bug / end card; a bigger
// sneeze and a Virgo whose soup is labelled and dated. Story 0–15.6 (ends on the last line). Original notes:
//   0.0–5.0    "Your friend | is *sick.*"  Taurus in bed under three blankets beside a tissue mountain, mid-sneeze
//              (ACHOO!). Pisces cries in sympathy at the bedside.
//   5.0        hard cut.  The snowy street: Virgo marches up to Taurus's door with a pot of soup. THE STARS (in the
//              sky): "care they don't have to *host*."
//   9.8        CHECK-IN: "soup's at your door. *no need to chat.*"  Virgo sets the pot on the step, waves, and goes. The door
//              opens a crack: Taurus, still in the blanket, finds the steaming pot. Hearts.
//   12.4       Last line: "Care, *left at the door.*"
import { makeFriends, stars, label, blanket, tissues, pot, R, INK, hearts, sparkles, lerp, ease, prog, pop01, outK, glow, phoneSmall } from './friendskit.js'

const TAU = 'taurus', VIR = 'virgo'
const ACHOO = [1.5, 3.4]
const EP = makeFriends({
  id: 'og-nffe08', dur: 20, cut: 5.0,
  lines: [stars(5.4, 'Virgo, leave the checklist. care they don’t *host.*')],
  boxes: [{ from: 0, to: 1, close: 9.4 }],
  check: { at: 9.9, out: [12.1, 12.3], text: 'soup’s at your door. | *no need to chat.*', accent: '#d9573f' },
  last: { at: 12.4, text: 'Care, *left at the door.*', color: '#b8f0c0' },
  shots: [
    { at: 0, set: 'bedroom', pis: { x: 860, y: 920, s: 110, tears: 3, mood: 'wide', look: [-1, 0], tissues: false },
      draw(x, t, S) {
        const sneeze = ACHOO.some(a => t > a && t < a + 0.25)
        S.star(x, t, TAU, { x: 300, y: 930, s: 300, mood: sneeze ? 'squint' : 'sleepy', zzz: false, look: [1, 0], hops: [-0.12, ...ACHOO], squash: sneeze ? -0.12 : 0 })
        blanket(x, 420, 1010, 620, 130, '#e8a24a'); blanket(x, 430, 1060, 600, 90, '#7c74f0'); blanket(x, 440, 1100, 580, 60, '#3fae6a')
        for (let i = 0; i < 9; i++) R(x, i % 2 ? '#ffffff' : '#e8e2f6', 700 + (i % 3) * 40 - (i > 5 ? -20 : 0), 1130 - Math.floor(i / 3) * 34, 40, 34)
        tissues(x, 760, 1000, 70)
        ACHOO.forEach(a => { const k = pop01(t, a, 0.2, 3) * outK(t, [a + 0.8, a + 1.0]); if (k > 0.01) label(x, a > 2 ? 'ACHOOOOOO!' : 'ACHOO!', 480, 760, { size: 64 * k, col: '#ffe58a', font: 'Inter, sans-serif', weight: 800, rot: -0.1 }) })
      } },
    { at: 5.0, set: 'street', pis: { x: 930, y: 1280, s: 100, tears: 3, mood: 'sparkle', look: [-1, -1], tissues: false },
      draw(x, t, S) {
        S.star(x, t, 'stars', { x: 300, y: 590, s: 190, mood: t > 6.7 ? 'happy' : 'neutral', look: [1, 1], hops: S.STARS_HOPS, seed: 2, glow: 1.1 })
        const walk = ease.inOutQuad(prog(t, 5.0, 8.5)), vx = lerp(140, 520, walk)
        const steps = Array.from({ length: 10 }, (_, i) => 5.0 + i * 0.35)
        S.star(x, t, VIR, { x: vx, y: 1060, s: 230, mood: 'sparkle', look: [1, 0], hops: steps })
        pot(x, t, vx + 90, 1110, 0.7)
        label(x, 'LABELLED + DATED', vx + 90, 1190, { size: 22, col: '#d6f0b0' })   // og: Virgo's soup
      } },
    { at: 9.8, set: 'street', pis: { x: 930, y: 1280, s: 100, tears: 3, mood: 'happy', tissues: false },
      draw(x, t, S) {
        const leave = ease.inQuad(prog(t, 10.6, 12.2)), open = ease.outCubic(prog(t, 11.6, 12.0))
        // the door opens a crack: warm light, Taurus in a blanket peeks
        if (open > 0) { glow(x, 755, 960, 260, open); R(x, '#ffd89a', 660, 760, 190 * open * 0.6, 410); S.star(x, t, TAU, { x: 720, y: 1000, s: 200, mood: t > 12.3 ? 'happy' : 'wide', look: [0, 1], hops: [12.3], pop: open }); if (open > 0.9) blanket(x, 720, 1040, 160, 120, '#e8a24a') }
        pot(x, t, 760, 1140, 0.6)
        S.star(x, t, VIR, { x: lerp(560, 120, leave), y: 1060, s: 230, mood: 'happy', look: [t < 10.6 ? 1 : -1, 0], hops: [10.0, 10.4, 10.8, 11.2, 11.6, 12.0] })
        hearts(x, t, 12.4, 720, 900, { n: 6 })
        sparkles(x, t, 760, 1100, 12.35, 8, 90, 1)
        void phoneSmall
      } },
  ],
  cues: [
    ...ACHOO.flatMap(a => [['whoosh', a - 0.1, 0.12, 0.02], ['pop', a + 0.02, 1318.51, 0.05, -0.2], ['tom', a + 0.02, 140, { gain: 0.15, decay: 0.15 }]]),
    ...Array.from({ length: 10 }, (_, i) => ['tick', 5.0 + i * 0.35, 0.025]),
    ['tick', 10.4, 0.04], ['tick', 11.55, 0.05], ['whoosh', 11.6, 0.4, 0.03], ['pluck', 12.35, 1174.66, 0.035, 0.5, 0.2], ['glitter', 12.35, 12.8],
  ],
})
export const HOOK = 'Sick friend? | *Don’t visit.*'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 3.0
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
export const WARN = EP.warn
