// kaue19 · ACHIEVEMENT UNLOCKED: SINGLE LIFE E19 (long) "New Year's Eve with no one at midnight" (65 s, synthwave · A, hard cut).
//   0.0  Frame 0: Aquarius mid-sprint onto a rooftop, the clock at 11:59 PM. Hook "No one at midnight? *Watch.*" + tag WAIT FOR MIDNIGHT
//   1.2  record scratch: "rewind. *three hours* earlier."
//   2.6  CH 1 · THE INVITE: "rooftop party · 10 PM · bring yourself" → GO / STAY IN → GO → 9.5 ★ SAID YES TO THE PARTY
//   12   CH 2 · THE PARTY: everyone pairing up for midnight… "wait. who ELSE is solo?" → 23 ★ SPOTTED THE SOLO SQUAD
//   26   CH 3 · SIDE QUEST: THE SOLO CREW: Virgo, Capricorn, Pisces join → "solo crew. midnight. together?" → 36 ★ PARTY FORMED
//   40   CH 4 · THE COUNTDOWN: 10…1, HAPPY NEW YEAR, the big group hug, Pisces sobbing → 50 ★ MIDNIGHT: NOBODY LEFT OUT
//   54   CH 5 · NEW GAME+: the resolutions screen.   62.2 last line "Nobody at midnight. *Everybody* at midnight." · hard cut at 65.
import { makeAch } from '../../kaue01/achengine.js'
import { hero, R, box, label, sparkles, hearts, confetti, prog, ease, lerp, clamp, INK, BONE, GOLD, PINK, RED, GREEN, CYAN, INTER, MONO } from '../../kaue01/achkit.js'
import { daySky } from '../../st9day.js'
import { drawAquaHome } from '../../st9aquahome.js'

const CH = [0, 12, 26, 40, 54]
const chap = t => { let i = 0; CH.forEach((c, k) => { if (t >= c) i = k }); return i }
function rooftop(x, t) {
  // skyline silhouettes + lit windows
  const B = [[0, 980, 160], [150, 900, 140], [280, 1020, 120], [390, 860, 170], [550, 960, 130], [670, 880, 150], [810, 1000, 130], [930, 920, 160]]
  for (const [X, Y, w] of B) { R(x, '#140d30', X, Y, w, 600); for (let i = 0; i < 4; i++) for (let j = 0; j < 6; j++) if ((i * 7 + j * 3 + X) % 5 === 0) R(x, '#ffd890', X + 16 + i * 30, Y + 30 + j * 60, 14, 22) }
  // the roof deck + railing
  R(x, '#2a2448', 0, 1300, 1080, 620); for (let i = 0; i < 1080; i += 120) R(x, '#24203e', i, 1300, 6, 620)
  R(x, '#4a4470', 0, 1240, 1080, 14); for (let i = 20; i < 1080; i += 80) R(x, '#4a4470', i, 1240, 10, 70)
  // string lights
  for (let i = 0; i < 20; i++) { const lx = 20 + i * 55, ly = 640 + Math.sin(i * 0.6) * 30; R(x, '#1a1430', lx, ly - 20, 3, 20); R(x, (Math.floor(t * 3) + i) % 3 ? ['#ffd24a', '#ff8fb1', '#7fe3ff'][i % 3] : '#4a4470', lx - 6, ly, 14, 16) }
}
function bigClock(x, t, txt) { x.save(); x.translate(540, 520); box(x, -230, -70, 460, 140, '#140d30', { b: 8 }); label(x, txt, 0, 4, { size: 76, col: txt.startsWith('12') ? GREEN : GOLD }); x.restore() }
const clockAt = t => t < 1.2 ? '11:59 PM' : t < 12 ? '9:02 PM' : t < 26 ? `11:${String(Math.min(52, 40 + Math.floor((t - 12) * 0.9))).padStart(2, '0')} PM` : t < 40 ? '11:57 PM' : t < 45.4 ? '11:59 PM' : '12:00 AM'
function choice(x, t) {
  const k = ease.outBack(prog(t, 5.0, 5.4)) * (1 - ease.inCubic(prog(t, 9.0, 9.3)))
  if (k <= 0) return
  const pick = t > 7.6 ? 0 : Math.floor(t * 2.5) % 2
  x.save(); x.translate(540, 780); x.scale(k, k)
  ;[['GO', -170], ['STAY IN', 170]].forEach(([s, X], i) => { box(x, X - 140, -70, 280, 140, i === pick ? GOLD : '#2a2448', { b: 8 }); label(x, s, X, 4, { size: 48, col: i === pick ? INK : BONE }) })
  label(x, '▶', (pick ? 170 : -170) - 160, 4, { size: 40, col: GOLD })
  x.restore()
}
function resolutions(x, t) {
  const k = ease.outBack(prog(t, 54.4, 54.8))
  if (k <= 0) return
  x.save(); x.translate(540, 900); x.scale(k, k)
  box(x, -400, -280, 800, 560, '#140d30', { b: 8 }); R(x, CYAN, -400, -280, 800, 8)
  label(x, 'NEW GAME+', 0, -210, { size: 58, col: CYAN })
  ;['1. say yes to the invite', '2. find the other solo ones', '3. hug your friends at midnight'].forEach((s, i) => { if (t > 55.4 + i * 1.2) label(x, s, -340, -90 + i * 90, { size: 34, col: BONE, align: 'left' }) })
  x.restore()
}
function scene(x, t) {
  const c = chap(t)
  if (c === 0 && t < 1.2) { rooftop(x, t); hero(x, t, 'aquarius', lerp(140, 420, t / 1.2), 1360 - Math.abs(Math.sin(t * 14)) * 40, 320, { mood: 'wide', look: [1, 0], seed: 14, squash: -0.08 }); for (let k = 0; k < 5; k++) R(x, 'rgba(255,255,255,0.4)', 0 + k * 10, 1300 + k * 26, 200, 8); return }
  if (c === 0) {
    daySky(x, t, { hour: 21 })
    drawAquaHome(x, t, { room: 'bedroom', dark: 0.4 })
    hero(x, t, 'aquarius', 540, 1200, 320, { mood: t < 7.6 ? 'squint' : 'sparkle', look: t < 7.6 ? [Math.floor(t * 2.5) % 2 ? 1 : -1, 0] : [0, 0], seed: 14, hops: [7.7, 8.1, 9.6] })
    choice(x, t)
    sparkles(x, t, 540, 1100, 9.5, 12, 300, 0.4)
    return
  }
  rooftop(x, t)
  if (c === 1) {
    const pair = ease.inOutCubic(prog(t, 13, 17))
    hero(x, t, 'taurus', lerp(150, 220, pair), 1380, 200, { mood: 'happy', look: [1, 0], seed: 1 }); hero(x, t, 'libra', lerp(380, 320, pair), 1380, 200, { mood: 'happy', look: [-1, 0], seed: 2 })
    hero(x, t, 'leo', lerp(700, 780, pair), 1380, 200, { mood: 'happy', look: [1, 0], seed: 3, crown: true }); hero(x, t, 'sagittarius', lerp(960, 900, pair), 1380, 200, { mood: 'happy', look: [-1, 0], seed: 4 })
    if (pair > 0.9) { hearts(x, t, 17.2, 270, 1200, { n: 4 }); hearts(x, t, 17.4, 840, 1200, { n: 4 }) }
    hero(x, t, 'aquarius', 540, 1540, 300, { mood: t < 19.4 ? 'neutral' : 'sparkle', look: t < 19.4 ? [Math.sin(t) > 0 ? 1 : -1, -1] : [0, 0], seed: 14, hops: [19.5, 19.9, 23.1] })
    if (t > 19.4 && t < 22) { box(x, 520, 1300, 40, 60, '#ffd24a', { b: 5, hi: '#fff3b0' }); R(x, '#c8c4d8', 528, 1360, 24, 16) }
  } else {
    const crew = [['virgo', 27], ['capricorn', 29], ['pisces', 31]]
    const hug = c >= 3 ? ease.inOutCubic(prog(t, 46.6, 47.4)) : 0
    const slots = [220, 400, 700, 880]
    crew.forEach(([s, at], i) => {
      const k = ease.outCubic(prog(t, at, at + 0.8)), slot = [slots[0], slots[1], slots[3]][i]
      if (k <= 0) return
      const X = lerp(slot < 540 ? -150 : 1230, lerp(slot, 540 + (slot - 540) * 0.45, hug), k)
      hero(x, t, s, X, 1420 - (c >= 3 && t > 45.4 && t < 46.6 ? Math.abs(Math.sin(t * 8 + i)) * 50 : 0), 240, { mood: s === 'pisces' ? 'sparkle' : 'happy', look: [X < 540 ? 1 : -1, 0], tears: s === 'pisces' ? 3 : 0, seed: 20 + i, hops: [33.1, 33.5, 36.1] })
    })
    hero(x, t, 'aquarius', lerp(slots[2], 600, hug), 1420 - (c >= 3 && t > 45.4 && t < 46.6 ? Math.abs(Math.sin(t * 8)) * 50 : 0), 280, { mood: c >= 3 ? 'happy' : 'sparkle', look: [0, 0], seed: 14, hops: [26.5, 33.0, 33.4, 36.0] })
    if (c >= 3) { confetti(x, t, 45.4, 540, 700, { n: 40, life: 3 }); confetti(x, t, 46.2, 300, 700, { n: 30 }); sparkles(x, t, 540, 600, 45.5, 16, 420, 0.2); hearts(x, t, 47.3, 540, 1200, { n: 8 }) }
    if (c === 4) resolutions(x, t)
    sparkles(x, t, 540, 1350, 36, 14, 360, 0.4)
  }
}
const overlay = (x, t) => { if (t < 1.2 || (t >= 12 && t < 54)) bigClock(x, t, clockAt(t)) }

export const { DURATION, SCENES, CUES } = makeAch({
  dur: 65, ending: 'cut', key: 'A',
  shots: [
    { at: 0, cam: [1.15, 400, 1300] }, { at: 1.2, cam: [1.3, 540, 1150], silent: true }, { at: 12, cam: [1.05, 540, 1350] }, { at: 19.3, cam: [1.35, 540, 1450] },
    { at: 26, cam: [1.1, 540, 1350] }, { at: 40, cam: [1.1, 540, 1300] }, { at: 46.6, cam: [1.35, 540, 1380], silent: true }, { at: 54, cam: [1.0, 540, 960] },
  ],
  scene, overlay,
  whips: [{ at: -0.22, from: 1.45, blur: 8, cx: 400, cy: 1300 }, { at: 12, from: 1.35 }, { at: 26, from: 1.35 }, { at: 40, from: 1.4 }, { at: 54, from: 1.3 }],
  freezes: [{ at: 1.2, dur: 1.3, text: 'rewind. *three hours* earlier.', sub: 'how it started', top: 1500 }],
  shakes: [{ at: 45.4, dur: 0.6, amp: 24 }, { at: 46.8, dur: 0.4, amp: 14 }],
  kit: [
    ['notification', { at: 2.8, out: [4.8, 5.0], title: 'invite · tonight', body: 'rooftop party · 10 PM · *bring yourself*', glyph: '♒', color: '#38c4ec', y: 560 }],
    ['countdown', { at: 40.4, from: 10, gap: 0.5, go: 'YAY!', y: 860 }],
  ],
  chapters: [
    { at: 2.6, out: 4.6, n: 1, text: 'the invite' }, { at: 12.2, out: 15.6, n: 2, text: 'the party' }, { at: 26.2, out: 29.6, n: 3, text: 'side quest: the solo crew' },
    { at: 40.0, out: 43.6, n: 4, text: 'the countdown', col: RED }, { at: 54.2, out: 57.2, n: 5, text: 'new game+', col: GREEN },
  ],
  promise: { at: 0.3, out: 11.6, text: 'WAIT FOR MIDNIGHT' },
  hook: { text: 'No one at midnight? | *Watch.*', out: 1.2, top: 700 },
  bubbles: [
    { at: 6.0, out: 7.6, x: 540, y: 960, text: 'go? stay in? go? stay in?', tail: 0 },
    { at: 15.6, out: 18.8, x: 540, y: 1250, text: 'everyone’s pairing up for midnight…', size: 34, tail: 0 },
    { at: 19.6, out: 22.6, x: 540, y: 1250, text: 'wait. who ELSE is solo?', tail: 0 },
    { at: 31.6, out: 33.0, x: 880, y: 1180, text: 'me!! (crying already)', tail: 0 },
    { at: 33.2, out: 35.8, x: 700, y: 1180, text: 'solo crew. midnight. together?', size: 34, tail: 0 },
    { at: 46.0, out: 47.6, x: 540, y: 1150, text: 'HAPPY NEW YEAR!!', size: 52, tail: 0 },
    { at: 48.4, out: 50.0, x: 540, y: 1150, text: 'best midnight EVER', tail: 0.3 },
  ],
  achs: [
    { at: 9.5, out: 11.6, title: 'SAID YES TO THE PARTY', xp: 150, icon: 'star' },
    { at: 23.0, out: 25.4, title: 'SPOTTED THE SOLO SQUAD', xp: 200, icon: 'star', y: 700 },
    { at: 36.0, out: 37.8, title: 'PARTY FORMED: SOLO CREW', xp: 400, icon: 'heart', y: 700 },
    { at: 50.0, out: 53.0, title: 'MIDNIGHT: NOBODY LEFT OUT', xp: 1000, size: 40, icon: 'heart', y: 700 },
  ],
  cams: [{ at: 50.4, out: 53.6, line: 'happy new year, besties', lineAt: 50.8, tears: 3, mood: 'happy', y: 1060 }],
  last: { at: 62.2, text: 'Nobody at midnight. | *Everybody* at midnight.', top: 330, size: 92, accentSize: 120 },
})
