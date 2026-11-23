// hst410 · 19 days · Virgo bought a label maker (kolache vs klobasnek, flour vs corn) · funk
import { ep, C, Y, Kp, clamp, prog, box, txt, sparkles, GOLD, BONE, PINK, INK, MONO, SKYB, MINT, BRAKE, kitchen, kolache, klobasnek, taco, clipboard, glasses } from './w17.js'

const L = 300, R = 780, M = 540
const tape = (x, cx, cy, s, k = 1, rot = -0.04) => { if (k <= 0) return; x.save(); x.translate(cx, cy); x.rotate(rot); x.font = `700 34px 'Space Mono', monospace`; const w = x.measureText(s).width * clamp(k) + 40; box(x, -w / 2, -28, w, 56, '#f4efe4', 4); x.beginPath(); x.rect(-w / 2, -28, w, 56); x.clip(); txt(x, s, 0, 2, { size: 34, col: INK, font: MONO, weight: 700 }); x.restore() }
const maker = (x, P, id) => { const [cx, cy, s] = P.at(id); box(x, cx + s * 0.36, cy - s * 0.02, s * 0.3, s * 0.2, '#ffd36b', 4); box(x, cx + s * 0.4, cy + s * 0.02, s * 0.14, s * 0.08, INK, 2) }
const set = (x, t) => kitchen(x, t, { wall: '#f0d9a8' })
const pastryBox = (x, cx, cy) => { box(x, cx - 170, cy - 60, 340, 120, '#f4e1b0', 6); x.fillStyle = PINK; x.fillRect(cx - 170, cy - 60, 340, 18) }

export const EP = ep(19, {
  hook: 'Virgo bought | a label maker. | 19 days left.',
  hookSet: (x, t, lt) => { set(x, t); pastryBox(x, 760, 1110); kolache(x, 690, 1060, 0.8); klobasnek(x, 840, 1060, 0.7); tape(x, 760, 960, 'KOLACHE (SWEET)', prog(lt, 0.2, 1.4)) },
  hookFront: (x, t, lt, P) => maker(x, P, 'virgo'),
  hookCast: C({ virgo: [[0, L, Y, 270], [1.3, L + 30, Y, 270]] }), hookMood: { virgo: 'squint' }, hookLook: { virgo: [0, 0] },
  calX: 800, calY: 690, calS: 0.62,
  cues: [['whoosh', 0.3, 0.6, 0.015]],
  scenes: [
    { dur: 3.4, set, front: (x, t, lt, P) => maker(x, P, 'virgo'), cast: C({ virgo: [M, Y, 300] }), mood: { virgo: 'squint' }, look: { virgo: [0, 0] },
      lines: [[0.15, 1.5, 'virgo', 'before you ask: | yes.'], [1.8, 1.4, 'virgo', "it's | necessary."]] },
    { dur: 3.4, set: (x, t, lt) => { set(x, t); kolache(x, 760, 1080, 1.4); tape(x, 760, 930, 'KOLACHE · SWEET', prog(lt, 0.2, 1.2)) }, front: (x, t, lt, P) => maker(x, P, 'virgo'), cast: C({ virgo: [L, Y, 250] }), mood: { virgo: 'happy' },
      lines: [[1.3, 1.9, 'virgo', 'this is | a kolache.']] },
    { dur: 3.4, set: (x, t, lt) => { set(x, t); klobasnek(x, 760, 1080, 1.3); tape(x, 760, 930, 'KLOBASNEK · SAUSAGE', prog(lt, 0.2, 1.2)) }, front: (x, t, lt, P) => maker(x, P, 'virgo'), cast: C({ virgo: [L, Y, 250] }), mood: { virgo: 'squint' },
      lines: [[1.3, 1.9, 'virgo', 'THIS is | a klobasnek.']] },
    { dur: 3.6, set: (x, t) => { set(x, t); klobasnek(x, 540, 1100, 1) }, cast: C({ sagittarius: [L, Y, 230], virgo: [R, Y, 240] }), mood: { sagittarius: 'happy', virgo: lt => lt > 1.6 ? 'wide' : 'squint' },
      lines: [[0.2, 1.5, 'sagittarius', "it's all | kolaches, mane."], [1.9, 1.5, 'virgo', '...excuse | me?']] },
    { dur: 3.4, set, front: (x, t, lt, P) => { const [cx, cy, s] = P.at('sagittarius'); tape(x, cx, cy - s * 0.62, 'SAGITTARIUS · WRONG', prog(lt, 0.3, 1.2), 0.05) }, cast: C({ sagittarius: [L, Y, 230], virgo: [R, Y, 240] }), mood: { sagittarius: 'wide', virgo: 'wink' },
      lines: [[1.5, 1.7, 'virgo', 'labeled.']] },
    { dur: 3.4, set: (x, t, lt) => { set(x, t); pastryBox(x, 540, 1110); if (lt < 1.6) kolache(x, 540, 1050, 0.9) }, cast: C({ taurus: [L, Y, 240], virgo: [R, Y, 230] }), mood: { taurus: 'heart', virgo: 'eyeroll' },
      lines: [[0.2, 1.4, 'taurus', 'and this one | is...'], [1.8, 1.4, 'taurus', '...gone.']] },
    { dur: 3.6, set: (x, t, lt) => { set(x, t); taco(x, 440, 1090, 1.3); taco(x, 640, 1090, 1.3); tape(x, 440, 960, 'FLOUR', prog(lt, 0.1, 0.6)); tape(x, 640, 960, 'CORN', prog(lt, 0.5, 1.0)) },
      cast: C({ gemini: [160, Y, 210], virgo: [900, Y, 230] }), mood: { gemini: 'wink', virgo: 'squint' },
      lines: [[1.0, 1.2, 'gemini', 'both?'], [2.2, 1.3, 'virgo', 'LABELED.']] },
    { dur: 3.6, set, front: (x, t, lt, P) => maker(x, P, 'virgo'), cast: C({ virgo: [M, Y, 300] }), mood: { virgo: 'happy' }, look: { virgo: [0, 0] },
      lines: [[0.15, 1.6, 'virgo', 'label your | feelings too.'], [1.9, 1.6, 'virgo', '"excited." | "nervous." both ok.']] },
  ],
  stamp: { set, front: (x, t, lt) => tape(x, 540, 940, 'VIRGO · EXCITED', prog(lt, 0.8, 1.6)), cast: C({ virgo: [L, Y, 240], taurus: [R, Y, 210] }), mood: { virgo: 'sparkle', taurus: 'heart' }, look: { virgo: [0, 0] },
    lines: [[1.8, 1.7, 'virgo', 'labeled: | excited.']] },
  line: 'Labeled: excited. Jan 9.', stars: ['virgo', 'sagittarius', 'taurus', 'gemini'],
})
