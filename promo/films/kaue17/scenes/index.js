// kaue17 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E17 (long) "The holiday party, solo mode" (63 s, pop · Bb, hard cut).
//   0.0  Frame 0: Virgo mid-slide through the party door on a rug, confetti mid-air. Hook "Party. Solo mode. *Watch* this."
//        + tag WAIT FOR THE LAST QUEST
//   1.8  CH 1 · ARRIVE ALONE: "hi! just me!" · Libra: "party of… one?" · "party of one, ready." → 7.0 ★ ARRIVED ALONE
//   10   CH 2 · SMALL TALK GAUNTLET: "still single?" ×3 (Taurus, Gemini, Capricorn); each answer better → 22 ★ SMALL TALK MASTER
//   24   CH 3 · THE COUPLES PHOTO BOOTH: in alone, flash ×3, a four-pose strip → Pisces cam "THE POSES" → 33 ★ SOLO PHOTO STRIP
//   36   CH 4 · GIFT SWAP: "for you & your partner": two mugs. "two mugs. one me." → one for a best friend → 44 ★ GIFTED IT FORWARD
//   48   CH 5 · FINAL QUEST: LEAVE WHEN YOU WANT: the walk home → Pisces cam "on their OWN terms" → 56 ★ LEFT WHEN I WANTED
//   60.6 last line "Came alone. *Left* happy." · hard cut at 63.
import { makeAch } from '../../kaue01/achengine.js'
import { drawDiner, drawStreet, drawDinner } from '../../kaue01/sets.js'
import { hero, R, box, label, sparkles, hearts, confetti, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, RED, GREEN } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'

const CH = [0, 10, 24, 36, 48]
const chap = t => { let i = 0; CH.forEach((c, k) => { if (t >= c) i = k }); return i }
function booth(x, t) {
  box(x, 600, 700, 380, 700, '#3a2a6a', { b: 8, hi: '#4a3a8a' })
  R(x, '#c8344e', 620, 820, 340, 560); for (let k = 0; k < 6; k++) R(x, '#a82a40', 630 + k * 56, 820, 10, 560)
  box(x, 620, 720, 340, 80, '#ffd24a', { b: 6 }); label(x, 'PHOTO BOOTH · FOR 2', 790, 760, { size: 26, col: INK })
  const fl = [27, 27.6, 28.2].some(a => t >= a && t < a + 0.12)
  if (fl) { x.save(); x.globalAlpha = 0.8; R(x, '#ffffff', 620, 820, 340, 560); x.restore() }
}
function strip(x, t) {
  const k = ease.outBack(prog(t, 29, 29.4)) * (1 - ease.inCubic(prog(t, 35.4, 35.8)))
  if (k <= 0) return
  x.save(); x.translate(300, 960); x.rotate(-0.08); x.scale(k, k)
  box(x, -100, -330, 200, 660, BONE, { b: 6 })
  const moods = ['happy', 'wink', 'wide', 'sparkle']
  moods.forEach((m, i) => { R(x, '#3a2a6a', -84, -314 + i * 160, 168, 148); hero(x, t, 'virgo', 0, -244 + i * 160, 110, { mood: m, look: [0, 0], seed: i, bob: 0, tips: false, shades: i === 2 ? 1 : null }) })
  x.restore()
}
function gift(x, t) {
  const open = ease.outCubic(prog(t, 37.4, 37.9))
  if (open < 1) { box(x, 450, 1120 - open * 40, 180, 140, '#3fa86a', { b: 6 }); R(x, RED, 530, 1120, 20, 140); R(x, RED, 450, 1180, 180, 20) }
  const tag = ease.outBack(prog(t, 36.6, 37.0)) * (1 - ease.inCubic(prog(t, 39.6, 40.0)))
  if (tag > 0) { x.save(); x.translate(540, 900); x.rotate(0.05); x.scale(tag, tag); box(x, -230, -50, 460, 100, BONE, { b: 6 }); label(x, 'for you & your partner ♡', 0, 0, { size: 30, col: INK }); x.restore() }
  if (open > 0) {
    const give = ease.inOutCubic(prog(t, 40.6, 41.4))
    const mug = (X, Y, c) => { box(x, X - 40, Y - 50, 80, 90, c, { b: 5, hi: '#ffffff40' }); box(x, X + 40, Y - 30, 20, 44, c, { b: 4 }) }
    mug(lerp(470, 240, give), lerp(1090, 1150, give), '#ff8fb1')
    mug(600, 1090, '#7fd0ff')
  }
}
function scene(x, t) {
  const c = chap(t)
  if (c === 0) {
    drawDiner(x, t, { room: 'door' })
    hero(x, t, 'libra', 815, 960, 220, { mood: t < 4 ? 'wide' : 'happy', look: [-1, 0], seed: 4, hops: [4.0, 4.4] })
    box(x, 700, 1060, 230, 300, '#7a4a2a', { b: 8, hi: '#9a6238' })
    const slide = ease.outCubic(prog(t, -0.3, 1.2))
    const X = lerp(120, 400, slide)
    box(x, X - 150, 1330, 300, 26, '#c8344e', { b: 5 })
    hero(x, t, 'virgo', X, 1200, 290, { mood: t < 1.2 ? 'wide' : t < 5.6 ? 'happy' : 'sparkle', look: [1, 0], seed: 6, squash: t < 1.2 ? 0.1 : 0, hops: [2.6, 3.0, 5.6, 6.0] })
    confetti(x, t, -0.5, 300, 900, { life: 2.4 })
    sparkles(x, t, 400, 1150, 7.0, 12, 260, 0.3)
  } else if (c === 1 || c === 2 || c === 3) {
    drawDinner(x, t, { warm: 1 })
    if (c === 1) {
      const turn = t < 14 ? 0 : t < 18 ? 1 : 2
      const asker = ['taurus', 'gemini', 'capricorn'][turn]
      hero(x, t, asker, 780, 1130, 260, { mood: 'happy', look: [-1, 0], seed: 20 + turn, hops: [11, 15, 19].map(v => v) })
      hero(x, t, 'virgo', 330, 1130, 280, { mood: turn === 0 ? 'squint' : turn === 1 ? 'happy' : 'sparkle', look: [1, 0], seed: 6, hops: [12.4, 16.4, 20.4, 20.8] })
      hero(x, t, 'pisces', 560, 1180, 170, { mood: 'sparkle', tears: 2, seed: 30, look: [-1, 0] })
      sparkles(x, t, 330, 1050, 22, 12, 260, 0.6)
    } else if (c === 2) {
      booth(x, t)
      const inside = t > 26 && t < 28.8
      if (!inside) hero(x, t, 'virgo', t < 26 ? lerp(300, 560, prog(t, 24.6, 26)) : 420, 1200, 280, { mood: t < 29 ? 'happy' : 'sparkle', look: [1, 0], seed: 6, hops: [24.8, 25.2, 25.6, 29.2] })
      else hero(x, t, 'virgo', 790, 1150, 240, { mood: ['happy', 'wink', 'wide', 'sparkle'][Math.floor((t - 26) / 0.6) % 4], look: [0, 0], seed: 6, alpha: 0.5 })
      strip(x, t)
      sparkles(x, t, 300, 960, 33, 12, 300, 0.4)
    } else {
      hero(x, t, 'taurus', 230, 1180, 250, { mood: t < 41 ? 'neutral' : 'heart', look: [1, 0], seed: 21, hops: [41.4, 41.8] })
      hero(x, t, 'virgo', 560, 1020, 270, { mood: t < 38.4 ? 'wide' : t < 40.4 ? 'squint' : 'happy', look: t < 40.4 ? [0, 1] : [-1, 0], seed: 6, hops: [38.6, 40.6] })
      gift(x, t)
      hearts(x, t, 42.2, 240, 1000, { n: 7 })
    }
  } else {
    daySky(x, t, { hour: 23 })
    drawStreet(x, t, { bench: false })
    const walk = ease.inOutQuad(prog(t, 50, 58))
    hero(x, t, 'virgo', lerp(260, 820, walk), 1500 - Math.abs(Math.sin(t * 7)) * 20 * (walk > 0 && walk < 1 ? 1 : 0), 300, { mood: 'happy', look: [t < 50 ? -1 : 1, 0], seed: 6, hops: [48.6, 49.0, 56.2] })
    if (t < 50.4) { x.save(); x.globalAlpha = 1 - prog(t, 49.6, 50.4); for (const [s, X] of [['taurus', 100], ['gemini', 190]]) hero(x, t, s, X, 1530, 180, { mood: 'happy', seed: X, look: [1, 0] }); x.restore() }
    sparkles(x, t, 800, 1450, 56, 14, 300, 0.4)
  }
}

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 63, ending: 'cut', key: 'Bb',
  shots: [
    { at: 0, cam: [1.3, 470, 1100] }, { at: 10, cam: [1.45, 555, 1060] }, { at: 24, cam: [1.12, 620, 1050] }, { at: 26.6, cam: [1.6, 790, 1080], silent: true }, { at: 28.8, cam: [1.12, 560, 1050], silent: true },
    { at: 36, cam: [1.4, 430, 1060] }, { at: 48, cam: (t) => [1.25, lerp(380, 700, prog(t, 50, 58)), 1300] },
  ],
  scene,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 360, cy: 1180 }, { at: 10, from: 1.4 }, { at: 24, from: 1.4 }, { at: 36, from: 1.4 }, { at: 48, from: 1.4 }],
  shakes: [{ at: 0.02, dur: 0.4, amp: 18 }, { at: 37.4, dur: 0.3, amp: 12 }],
  flashes: [{ at: 27, a: 0.6 }, { at: 27.6, a: 0.6 }, { at: 28.2, a: 0.6 }],
  chapters: [
    { at: 1.8, out: 5.4, n: 1, text: 'arrive alone' }, { at: 10.2, out: 13.6, n: 2, text: 'the small talk gauntlet' }, { at: 24.2, out: 26.4, n: 3, text: 'the couples photo booth' },
    { at: 36.2, out: 39.4, n: 4, text: 'the gift swap' }, { at: 48.2, out: 51.8, n: 5, text: 'final quest: leave when you want', col: GREEN },
  ],
  promise: { at: 0.4, out: 9.6, text: 'WAIT FOR THE LAST QUEST' },
  hook: { text: 'Party. Solo mode. | *Watch* this.', out: 1.7 },
  bubbles: [
    { at: 2.6, out: 4.0, x: 400, y: 900, text: 'hi! just me!', tail: 0 },
    { at: 4.0, out: 5.6, x: 800, y: 760, text: 'party of… one?', tail: 0 },
    { at: 5.6, out: 7.0, x: 420, y: 900, text: 'party of one. ready.', tail: 0 },
    { at: 11.0, out: 12.4, x: 760, y: 900, text: 'still single?', tail: 0 },
    { at: 12.4, out: 14.0, x: 360, y: 900, text: 'um. yes?', tail: 0 },
    { at: 15.0, out: 16.4, x: 760, y: 900, text: 'still single??', tail: 0 },
    { at: 16.4, out: 18.0, x: 360, y: 900, text: 'yep! how’s your dog?', tail: 0 },
    { at: 19.0, out: 20.4, x: 760, y: 900, text: 'STILL single?', tail: 0 },
    { at: 20.4, out: 22.0, x: 360, y: 900, text: 'single and thriving. try the dip.', size: 32, tail: 0 },
    { at: 25.0, out: 26.4, x: 420, y: 940, text: 'for two? watch me.', tail: 0 },
    { at: 38.6, out: 40.4, x: 560, y: 700, text: 'two mugs. one me.', tail: 0 },
    { at: 40.8, out: 42.6, x: 520, y: 790, text: 'one for my best friend.', tail: -0.3 },
    { at: 48.4, out: 50.4, x: 300, y: 1260, text: 'night, everyone!', tail: 0 },
    { at: 51.6, out: 54.2, x: 560, y: 1260, text: 'had fun. going home. no guilt.', size: 34, tail: 0 },
  ],
  achs: [
    { at: 7.0, out: 9.4, title: 'ARRIVED ALONE', sub: '+courage', xp: 200, icon: 'star' },
    { at: 22.0, out: 23.8, title: 'SMALL TALK MASTER', xp: 300, icon: 'star' },
    { at: 33.0, out: 35.0, title: 'SOLO PHOTO STRIP', sub: 'four poses, zero waiting for someone', xp: 250, icon: 'heart' },
    { at: 44.0, out: 46.6, title: 'GIFTED IT FORWARD', xp: 300, icon: 'heart' },
    { at: 56.0, out: 58.4, title: 'LEFT WHEN I WANTED', xp: 500, icon: 'star' },
  ],
  cams: [
    { at: 30.2, out: 32.8, line: 'THE POSES', lineAt: 30.6, tears: 3, y: 1360, x: 830 },
    { at: 52.4, out: 55.8, line: 'on their OWN terms', lineAt: 52.8, tears: 3, mood: 'happy', y: 780 },
  ],
  last: { at: 60.6, text: 'Came alone. | *Left* happy.', top: 330 },
})
