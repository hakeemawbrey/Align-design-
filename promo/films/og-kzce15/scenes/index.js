// og-kzce15: the social rework of kzce15, ZODIAC COURTROOM, "Six Months of Mutual Pining" (20 s vertical, pop · Ab).
// Same court, cast and story; static HOOK caption (box) from frame 0 instead of the animated title, crazier lines,
// ends on the last line (no loop back).
//   0.00  frame 0: ♎ Libra and ♉ Taurus side by side in the dock, both mid-blush, not looking at each other; gavel mid-slam.
//         HOOK (static box, until 2.8): "6 months of pining. | *Nobody* said a word."
//   1.0   CHARGE: SIX MONTHS OF MUTUAL CRUSH. ZERO WORDS.   1.4 JUDGE: "exhibit A… and exhibit *A.*"
//   3.0   EXHIBIT A: two diaries, the same lines written in both: do they like me?? · they smiled at me today ·
//         I'll say something tomorrow · 6.0 SAME PAGE. (gasp)
//   7.6   LIBRA: "I didn't want to make it *weird.*"  9.4 TAURUS: "me *neither…*"
//  11.4   GUILTY (BOTH OF YOU) · 12.0 sentence: "say it. this week."   13.6 both at once: "I like you!" (hearts, gasp)
//  16.4   last line "One of you. | Go *first.*"; 19.6–20.0 eases back into frame 0 (seamless loop).   Pisces fountains.
import { makeCourt, star, label, box, R, drawBits, clamp, prog, ease, INK, RED, PINK, popWords } from './courtkit.js'

const T = { ex: 3.0, same: 6.0, guilty: 11.4, both: 13.6, last: 16.4 }
const HEART = ['.HH.HH.', 'HHHHHHH', 'HHHHHHH', '.HHHHH.', '..HHH..', '...H...']
const LINES = [['do they like me??', 3.4], ['they said hi. I had to lie down', 4.2], ["I'll say something tomorrow", 5.0]]
function pair(x, t) {
  const after = t > T.both
  star(x, t, { x: 165, y: 1080, s: 200 }, { who: 'libra', mood: after ? 'heart' : t > 7.5 && t < 9.3 ? 'neutral' : 'sparkle', look: after ? [1, 0] : [-1, 0.3], blush: 1, seed: 41, hops: [7.7, 8.0, T.both, T.both + 0.3] })
  star(x, t, { x: 395, y: 1080, s: 200 }, { who: 'taurus', mood: after ? 'heart' : t > 9.3 && t < 11 ? 'neutral' : 'sparkle', look: after ? [-1, 0] : [1, 0.3], blush: 1, seed: 43, hops: [9.5, 9.8, T.both, T.both + 0.3] })
  if (after && t < 16.2) {
    const k = ease.outBack(clamp(prog(t, T.both, T.both + 0.2)))
    label(x, 'I like you!', 190, 905, { size: 42 * k, col: PINK, weight: 900, rot: -0.1 }); label(x, 'I like you!', 420, 860, { size: 42 * k, col: PINK, weight: 900, rot: 0.1 })
    for (let i = 0; i < 6; i++) { const ph = ((t - T.both) * 0.6 + i / 6) % 1; drawBits(x, HEART, { H: i % 2 ? PINK : '#ff4f86' }, 280 + Math.sin(i * 2 + t * 2) * 120, 1000 - ph * 300, 6, { alpha: 1 - ph }) }
  }
}
function diary(x, t, cx, cy, col, rot) {
  x.save(); x.translate(cx, cy); x.rotate(rot)
  box(x, -170, -260, 340, 520, col, { b: 6 }); box(x, -150, -240, 300, 480, '#fffaf0', { b: 3, hi: null })
  for (let i = 0; i < 10; i++) R(x, 'rgba(120,150,200,0.3)', -140, -200 + i * 44, 280, 3)
  LINES.forEach(([s, a], i) => { if (t < a) return; const kk = clamp(prog(t, a, a + 0.4)); x.save(); x.beginPath(); x.rect(-140, -230, 280 * kk, 470); x.clip(); x.textAlign = 'left'; x.font = `italic 500 34px 'EB Garamond', Georgia, serif`; x.fillStyle = '#2c2a7a'
    const words = s.split(' '); let line = '', y = -180 + i * 132; for (const w of words) { const tr = line ? line + ' ' + w : w; if (x.measureText(tr).width > 270) { x.fillText(line, -134, y); line = w; y += 40 } else line = tr } x.fillText(line, -134, y); x.restore() })
  x.restore()
}
const CFG = {
  id: 'og-kzce15', dur: 20, ending: 'cut',
  fx: { whips: [{ at: T.guilty + 0.08, from: 1.12, blur: 0, flash: 0 }], flashes: [[T.guilty + 0.1, '#ffd0d8']] },
  juryDx: -90,   // og full frame: the jury box clears the app's side buttons (x 960+)
  gavels: [0.05, 1.45, T.guilty],
  gasps: [-0.2, T.same + 0.05, T.guilty + 0.1, T.both + 0.05],
  jury: ['aquarius', 'aries', 'sagittarius', 'pisces', 'gemini', 'cancer'],
  tears: () => 3,
  juryMood: (t, id) => { if (id === 'pisces') return t > T.both + 0.2 ? 'heart' : undefined; if (t > T.both + 0.3) return 'heart'; if (t > 7.6 && t < 11) return 'eyeroll' },
  judge: { mood: t => t < 0.5 ? 'squint' : t < T.ex ? 'neutral' : t < 7.3 ? 'sparkle' : t < T.guilty ? 'eyeroll' : t < T.both ? 'neutral' : 'heart', look: t => t > T.ex && t < 7.2 ? [0, 1] : t > 7.5 && t < 13 ? [-1, 1] : [0, 0.3] },
  dock: [{ who: { color: '#000', tag: '' }, plate: 'DEFENDANTS', s: 1, prop: (x, t) => pair(x, t) }],
  heads: [{ text: 'One of you. | Go *first.*', at: T.last, late: 1, lateAt: T.last + 0.3, accent: '#ff8fb1', size: 108, top: 1330 }],   // og: stays to the last frame
  ticker: { at: 2.9, out: [16.1, 16.4], y: 392, label: 'CHARGE',   // og full frame: top band once the hook is gone
    text: 'SIX MONTHS OF MUTUAL CRUSH. ZERO WORDS. TWO VERY FULL DIARIES.' },
  boxes: [
    { open: 1.3, close: 2.95, y: 1330, height: 230, width: 900, W: 1020, lines: [{ t: 1.45, who: 'JUDGE', text: 'exhibit A… and exhibit *A.*' }] },
    { open: 7.5, close: 11.3, y: 1330, height: 230, width: 900, W: 1020, lines: [{ t: 7.6, who: 'libra', text: 'I made a pro/con list. *forty pages.*' }, { t: 9.4, who: 'taurus', text: 'I was waiting for *YOU* to go first.' }] },
  ],
  exhibits: [{ at: T.ex, out: [7.1, 7.4], label: 'EXHIBIT A + A', draw(x, t, k, B) {
    diary(x, t, B.cx - 180, B.cy, '#e163d6', -0.05); diary(x, t, B.cx + 180, B.cy, '#e9b24a', 0.05)
    if (t > T.same) { const k2 = clamp(prog(t, T.same, T.same + 0.15)); x.save(); x.translate(B.cx, B.cy + 40); x.rotate(-0.12); x.scale(2.2 - 1.2 * k2, 2.2 - 1.2 * k2); x.globalAlpha = k2; box(x, -230, -60, 460, 120, '#fffaf0', { b: 6, hi: null }); x.strokeStyle = RED; x.lineWidth = 8; x.strokeRect(-218, -48, 436, 96); label(x, 'SAME PAGE.', 0, 4, { size: 66, col: RED, weight: 900, shadow: false }); x.restore() }
  } }],
  stamps: [{ at: T.guilty, text: 'GUILTY', sub: 'BOTH OF YOU', color: RED, out: [13.3, 13.55], y: 860 }],
  sentence: { at: 12.0, out: [13.3, 13.55], text: 'say it. this week. out loud.' },
  cues: [...LINES.flatMap(([, a]) => [['tick', a, 0.04], ['tick', a + 0.15, 0.03], ['tick', a + 0.3, 0.03]]), ['boom', T.same + 0.1, 0.2], ['tom', T.same + 0.1, 80, { gain: 0.3, decay: 0.3 }],
    ['pop', T.both, 1318.51, 0.05, -0.3], ['pop', T.both, 1318.51, 0.05, 0.3], ['glitter', T.both, T.both + 0.8], ['bell', T.both + 0.1, 1760, 0.03, 1.2, 0], ...popWords(T.last + 0.3, 1, 0.1, 5, 0.045)],
}
const EP = makeCourt(CFG)
// social hook: static caption from frame 0 (the film's own animated title is removed above)
export const HOOK = '6 months of pining. | *Nobody* said a word.'
export const HOOK_STYLE = 'box'
export const HOOK_UNTIL = 2.8
export const HOOK_TOP = 150         // clear of the judge's wig
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
