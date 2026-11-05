// klge08 · Your Sign's Love Glitch · "Libra.exe: I Don't Mind" (20 s vertical, star_advice post, hard cut).
//   0.0   frame 0: LIBRA.EXE: "I don't mind" (x47). Libra frozen in front of twelve dinner options, a loading spinner
//         over its head, the cursor hopping between tiles. 0.5 whip onto the spinner.
//   3.0   the glitch: hiding what you want. The date: "where do you want to eat?" Libra: "i don't mind!" "no YOU pick"…
//   7.4   error: PREFERENCE NOT FOUND.   9.1 Pisces pops out of the tray, crying (and hungry).
//   11.1  THE STARS: "your preference is *information*, not a fight."   13.7 patch 1.8 installs.
//   15.6  Libra: "NOODLES. i want noodles." The cursor slams onto NOODLES. The date: "finally!! noodles!" Confetti.
//   17.9  last line "Your opinion is *allowed.*", held to the cut at 20.0.
import { makeGlitch, R, box, label, bubble, hearts, sparkles, confetti, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER, MONO } from '../../klge01/scenes/glitchkit.js'

const PICK = 15.6
const FOODS = ['NOODLES', 'TACOS', 'PIZZA', 'SALAD', 'CURRY', 'SUSHI', 'BURGERS', 'SOUP', 'DUMPLINGS', 'PASTA', 'BRUNCH', 'TOAST']
const COLS = ['#f2cf4a', '#f39a3a', '#e8344e', '#9fe6b0', '#e9b24a', '#ff8fb1', '#c97a4a', '#7fd0f0', '#f4f0fa', '#e86a8a', '#c9a6ff', '#d9a35a']
const tileXY = i => [150 + (i % 4) * 210, 640 + Math.floor(i / 4) * 120]
const cursorAt = t => t >= PICK + 0.3 ? 0 : (Math.floor(t * 3.3) * 7 + 3) % 12

function scene(x, t, K) {
  R(x, '#1b1438', 70, 556, 940, 880)
  const pick = t >= PICK + 0.3
  FOODS.forEach((f, i) => {
    const [X, Y] = tileXY(i)
    const sel = pick && i === 0
    const dim = pick && !sel
    x.save(); x.globalAlpha = dim ? 0.35 : 1
    const k = sel ? 1 + 0.12 * pop01(t, PICK + 0.3, 0.3, 3) : 1
    x.translate(X + 90, Y + 45); x.scale(k, k); x.translate(-(X + 90), -(Y + 45))
    box(x, X, Y, 180, 90, COLS[i], { b: 5 })
    label(x, f, X + 90, Y + 47, { size: f.length > 7 ? 24 : 30, col: INK, font: INTER, weight: 900 })
    x.restore()
  })
  // the cursor
  const c = cursorAt(t), [cx, cy] = tileXY(c)
  x.save(); x.translate(cx + 140, cy + 70)
  const ar = ['X.....', 'XX....', 'XWX...', 'XWWX..', 'XWWWX.', 'XWWWWX', 'XWWXXX', 'XX.WX.', '...WX.']
  ar.forEach((row, j) => [...row].forEach((ch, i) => { if (ch !== '.') R(x, ch === 'X' ? INK : '#fff', i * 6, j * 6, 6, 6) }))
  x.restore()
  if (pick) { sparkles(x, t, 240, 685, PICK + 0.3, 12, 140, 1); confetti(x, t, PICK + 0.35, 240, 685) }
  // Libra + the date (Taurus star)
  const frozen = !pick
  K.hero(x, t, 330, 1260, 270, { mood: pick ? 'happy' : t > 7.4 && t < 9.1 ? 'wide' : 'squint', look: frozen ? [0, -1] : [1, 0], hops: [4.2, 5.8, 6.6, PICK, PICK + 0.6] })
  K.star(x, t, 'taurus', 780, 1260, 240, { mood: pick ? 'heart' : t > 5.6 ? 'eyeroll' : 'neutral', look: [-1, 0], seed: 5, hops: [3.2, 5.2, 16.6] })
  // the loading spinner over Libra's head
  if (frozen) {
    for (let i = 0; i < 8; i++) {
      const a = i / 8 * Math.PI * 2 + Math.floor(t * 10) * Math.PI / 4
      x.save(); x.globalAlpha = 0.25 + 0.75 * (i / 8)
      R(x, BONE, 330 + Math.cos(a) * 40 - 7, 1060 + Math.sin(a) * 40 - 7, 14, 14); x.restore()
    }
  }
  // the counter
  const n = t < 3 ? 47 : Math.min(52, 47 + Math.floor((t - 3) / 0.9))
  if (!pick) { box(x, 860, 1360, 130, 54, RED, { b: 4 }); label(x, `x${n}`, 925, 1388, { size: 32, col: BONE, font: INTER, weight: 900 }) }
  bubble(x, t, 760, 1050, 3.2, 4.9, 'where do you wanna eat?', { size: 28, col: '#ffe9c8', maxW: 360 })
  bubble(x, t, 330, 1060, 4.2, 5.6, 'i don’t mind!', { size: 32 })
  bubble(x, t, 760, 1050, 5.2, 6.4, 'you pick?', { size: 30, col: '#ffe9c8' })
  bubble(x, t, 330, 1060, 5.8, 7.3, 'no YOU pick', { size: 32 })
  bubble(x, t, 330, 1060, PICK, 17.6, 'NOODLES. i want noodles.', { size: 32, col: '#fff3a8', maxW: 360 })
  bubble(x, t, 770, 1040, 16.6, 19.9, 'finally!! noodles!', { size: 30, col: '#ffe9c8' })
  if (t > 16.6) hearts(x, t, 16.6, 780, 1100, { n: 5 })
}

const F = makeGlitch({
  id: 'klge08', sign: 'libra', len: 20, ending: 'cut',
  hook: 'LIBRA.EXE: "I don’t mind" *(x47)*',
  err: { msg: ['Question: "where to eat?"', 'Answer: still loading.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.4, 9.0]],
  hits: [{ kind: 'whip', at: 0.5, x: 330, y: 1060, z: 0.4, hold: 0.5 }, { kind: 'glitch', at: 7.4, dur: 0.45 }, { kind: 'flash', at: PICK, col: GOLD }, { kind: 'shake', at: PICK + 0.3, dur: 0.35, amp: 14 }],
  caps: [{ at: 3.0, out: 7.2, text: 'the glitch: hiding what you *want*' }],
  errs: [{ at: 7.4, out: 9.0, msg: ['PREFERENCE NOT FOUND.', 'Hunger: rising.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.1, out: 11.0, text: 'i’m so hungry i’m crying', tears: 3 }],
  stars: [{ t: 11.15, text: 'your preference is *information*, not a fight.' }],
  box: { close: 13.7 },
  patch: { at: 13.7, ver: '1.8', name: 'SAY WHAT YOU WANT', dur: 1.0, out: 15.5 },
  last: { at: 17.9, text: 'Your opinion is *allowed.*' },
  scene, accent: '#a03a9a',
  cues: [...Array.from({ length: 15 }, (_, i) => ['tick', +(i / 3.3 + 3).toFixed(2), 0.025]), ['pop', 3.2, 659.25, 0.04, 0.3], ['pop', 4.2, 880, 0.04, -0.3], ['pop', 5.2, 659.25, 0.04, 0.3], ['pop', 5.8, 880, 0.04, -0.3], ['pop', PICK + 0.3, 1046.5, 0.06, 0], ['glitter', PICK + 0.3, PICK + 1.2], ['pop', 16.6, 783.99, 0.04, 0.3]],
  music: { style: 'pop', key: 'F', seed: 1808, drop: 3.0, breakdown: [9.1], lift: [PICK] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
