// kfae10: FAKE AD, ""Sorry, but…"" (9 s trial reel, lofi · Eb, hard cut). Row: promo/films/month2/m31.md
//   0     B&W: Aquarius mid-apology, a giant "BUT" crashing through its speech bubble, Gemini arms-crossed (eye roll);
//         hook "Can’t say sorry | *without “but”?*"   0.55 freeze, caught on the BUT.   1.45 colour: BUT-B-GONE (a spray)
//   tip "“I’m sorry I snapped. that wasn’t fair.”"   demo: a spritz, the "but" fizzles off; Gemini softens, hugs.
//   Pisces sobs "the GROWTH".   last line, hard cut.
import { makeAd, star, bubble, motion, hearts, sparkles, label, block, R, prog, ease, BONE, INK, RED, CYAN } from '../../kfae01/adkit.js'

function spray(x, cx, cy, rot = 0) { x.save(); x.translate(cx, cy); x.rotate(rot); block(x, -40, -60, 80, 140, '#5fe3ff', { bw: 6 }); block(x, -24, -100, 48, 40, BONE, { bw: 6 }); R(x, INK, 24, -94, 30, 12); x.restore() }
const AD = makeAd({
  id: 'kfae10', sign: 'aquarius', dur: 9, ending: 'cut', style: 'lofi', key: 'Eb', seed: 3110,
  hook: 'Can’t say sorry | *without “but”?*',
  caught: { x: 380, y: 760, r: 150, label: 'THERE IT IS', arrow: 'br' },
  product: 'BUT-B-GONE', sub: 'removes every “but”', icon: 'spark', col: '#5fe3ff', col2: '#ffffff', burst: ['#2fb0ff', '#ff6fb0'],
  tip: '“I’m sorry I snapped. that wasn’t fair.”',
  quote: 'the GROWTH',
  fine: '*AN APOLOGY WITH A “BUT” IS JUST AN ARGUMENT IN A HAT.',
  last: 'A real sorry | *doesn’t have a sequel.*',
  before(x, t, S) {
    bubble(x, t, 330, 860, -1, 99, 'I’m sorry…', { size: 40 })
    label(x, 'BUT', 380 + 6 * Math.sin(t * 40), 760, { size: 150, col: RED, rot: -0.15 + 0.05 * Math.sin(t * 20), k: 1 + 0.08 * Math.sin(t * 18) })
    motion(x, t, 380, 760, { r0: 150, r1: 210, n: 10 })
    S.hero(x, t, { x: 330, y: 1100, s: 280, mood: 'wide', look: [1, 0], rot: 0.1 * Math.sin(t * 9) })
    star(x, t, { sign: 'gemini', x: 780, y: 1090, s: 260, mood: 'eyeroll', seed: 4 })
  },
  after(x, t, S) {
    const u = S.u
    spray(x, 210, 900, -0.5)
    if (u > 0.05 && u < 0.8) { x.save(); x.globalAlpha = 0.6 * (1 - u / 0.8); x.fillStyle = CYAN; for (let i = 0; i < 18; i++) x.fillRect(260 + u * 300 + (i % 6) * 22, 800 + Math.floor(i / 6) * 22 + Math.sin(i) * 10, 10, 10); x.restore() }
    S.hero(x, t, { x: 380, y: 1100, s: 270, mood: u > 1.0 ? 'happy' : 'neutral', look: [1, 0], hops: [S.T.after + 1.0] })
    star(x, t, { sign: 'gemini', x: 760, y: 1100, s: 260, mood: u > 0.9 ? 'happy' : 'eyeroll', look: [-1, 0], seed: 4, hops: [S.T.after + 0.9] })
    bubble(x, t, 400, 840, S.T.after + 0.3, S.T.D + 1, 'I’m sorry I snapped. that wasn’t fair.', { size: 32, maxW: 360 })
    if (u < 0.6) label(x, 'BUT', 520, 760, { size: 90, col: RED, alpha: 1 - u / 0.6, k: 1 - u / 0.6 })
    sparkles(x, t, 520, 760, S.T.after + 0.05, 10, 120, 3, [CYAN, BONE])
    hearts(x, t, 570, 1000, S.T.after + 1.0, { n: 5 })
  },
  afterCues: [['whoosh', 0.02, 0.4, 0.05], ['glitter', 0.05, 0.6], ['pop', 0.3, 880, 0.04, -0.3], ['pluck', 1.0, 1174.66, 0.04, 0.5, 0.2]],
})
export const DURATION = AD.DURATION, SCENES = AD.SCENES, CUES = AD.CUES, MUSIC = AD.music
void [prog, ease]
