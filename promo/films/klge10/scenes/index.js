// klge10 · Your Sign's Love Glitch · "Capricorn.exe: Love Is a Meeting" (22 s vertical, star_advice post, hard cut).
//   0.0   frame 0: CAPRICORN.EXE scheduled your date. 30 min. Cap mid-type behind three laptops at a dinner table, a
//         calendar invite "DATE (30 min) · agenda attached" slamming in; the date waits. 0.5 whip onto the invite.
//   3.0   the glitch: work mode won't switch off. Notifications pile up; the date: "so… how was your week?" Cap:
//         "one sec, replying to—"; the meeting timer runs down.
//   7.6   error: WORK MODE STUCK ON.   9.3 Pisces pops out of the tray, crying.
//   11.3  THE STARS: "one evening, laptop *closed.* the work will wait."   13.9 patch 1.10 installs.
//   15.7  the laptops fold shut one by one; the date: "wait, you're funny??" Cap actually laughs.
//   19.4  last line "Clock out for *love.*", held to the cut at 22.0.
import { makeGlitch, R, box, label, bubble, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const SHUT = 15.7
const NOTES = [[-0.5, 'quick call?'], [-0.2, 're: re: re: plan'], [3.4, 'urgent-ish'], [4.3, 'one tiny thing'], [5.2, 'did you see my email'], [6.4, 'friendly reminder!!']]
function laptop(x, t, cx, by, shut) {
  // base
  box(x, cx - 110, by - 16, 220, 22, '#9aa0b8', { b: 4 })
  // the lid: open (screen up) → shut (folds down)
  const h = 150 * (1 - shut)
  if (h > 4) {
    box(x, cx - 100, by - 16 - h, 200, h, '#2a2f48', { b: 4 })
    if (h > 60) { R(x, '#7fe3ff', cx - 86, by - h - 4, 172, Math.max(0, h - 26)); for (let i = 0; i < 4; i++) R(x, '#2a5a7a', cx - 74, by - h + 8 + i * 22, 100 + ((i * 37) % 50), 8) }
  } else R(x, '#5a607a', cx - 100, by - 22, 200, 8)
}

function scene(x, t, K) {
  R(x, '#1a1234', 70, 556, 940, 880)
  // restaurant: a candle + the table
  box(x, 100, 1250, 880, 40, '#8a5a3a', { b: 6 }); R(x, INK, 180, 1290, 16, 146); R(x, INK, 880, 1290, 16, 146)
  // the date (Gemini star) waiting on the right
  K.star(x, t, 'gemini', 820, 1140, 230, { mood: t >= SHUT + 1.1 ? 'happy' : t > 5 ? 'neutral' : 'sparkle', look: [-1, 0], seed: 7, hops: [5.0, 16.8] })
  // candle
  box(x, 640, 1170, 30, 80, '#f4f0fa', { b: 4 }); x.save(); x.globalCompositeOperation = 'lighter'; const g = x.createRadialGradient(655, 1150, 4, 655, 1150, 120); g.addColorStop(0, 'rgba(255,200,120,0.5)'); g.addColorStop(1, 'rgba(255,200,120,0)'); x.fillStyle = g; x.fillRect(520, 1020, 280, 260); x.restore(); R(x, '#ffd060', 648, 1140 + Math.sin(t * 12) * 2, 14, 24)
  // Capricorn behind the laptops
  const off = t >= SHUT
  K.hero(x, t, 330, 1010, 250, { mood: off ? (t > 16.8 ? 'happy' : 'neutral') : t > 7.6 && t < 9.3 ? 'wide' : 'squint', look: off ? [1, 0] : [0, 1], hops: off ? [16.8, 17.1, 17.4] : [3.2, 3.5, 3.8, 4.1, 4.4, 4.7, 5.8, 6.1, 6.4] })
  for (let i = 0; i < 3; i++) laptop(x, t, 200 + i * 150, 1250 - (i % 2) * 6, off ? ease.inCubic(prog(t, SHUT + 0.1 + i * 0.25, SHUT + 0.35 + i * 0.25)) : 0)
  // notifications pile above the laptops
  if (!off || t < SHUT + 0.6) NOTES.forEach(([at, txt], i) => {
    if (t < at) return
    const k = pop01(t, at, 0.22, 2.4) * (off ? 1 - prog(t, SHUT, SHUT + 0.5) : 1)
    if (k <= 0.01) return
    x.save(); x.translate(540, 650 + i * 56); x.scale(k, k)
    box(x, -190, -24, 380, 48, '#f4f0fa', { b: 3 }); R(x, '#2fc79a', -190, -24, 10, 48); label(x, txt, -170, 1, { size: 24, align: 'left', col: INK, font: INTER, weight: 800 })
    x.restore()
  })
  // the meeting timer
  if (!off) { const left = Math.max(0, 30 * 60 - Math.max(0, t - 3) * 230); const mm = Math.floor(left / 60), ss = Math.floor(left % 60); box(x, 760, 640, 200, 70, RED, { b: 4 }); label(x, `${mm}:${String(ss).padStart(2, '0')} left`, 860, 676, { size: 30, col: BONE, font: INTER, weight: 900 }) }
  else { const k = pop01(t, SHUT + 0.9, 0.3, 2.4); x.save(); x.translate(860, 676); x.scale(k, k); box(x, -100, -35, 200, 70, '#2f9a6e', { b: 4 }); label(x, 'no timer', 0, 1, { size: 30, col: BONE, font: INTER, weight: 900 }); x.restore() }
  bubble(x, t, 780, 960, 5.0, 6.6, 'so… how was your week?', { size: 28, col: '#fff3a8', maxW: 340 })
  bubble(x, t, 330, 830, 5.8, 7.5, 'one sec, replying to—', { size: 28, maxW: 340 })
  bubble(x, t, 780, 960, 16.8, 19.2, 'wait, you’re funny??', { size: 30, col: '#fff3a8', maxW: 340 })
  sticker(x, t, 'HA!', 330, 840, 17.2, 19.2, { col: GOLD, size: 54, rot: -0.12 })
  if (t > 17.2) hearts(x, t, 17.2, 560, 1050, { n: 6 })
}
function overlay(x, t) {
  // the calendar invite slamming in on frame 0
  const k = (t < 0.2 ? 1.12 - 0.12 * (t / 0.2) : 1) * outK(t, [2.8, 3.0])
  if (k <= 0.01) return
  x.save(); x.translate(560, 820); x.rotate(-0.05); x.scale(k, k)
  box(x, -250, -90, 500, 180, '#f4f0fa', { b: 6 }); R(x, '#2fc79a', -250, -90, 500, 50)
  label(x, 'INVITE · 8:00 PM', 0, -64, { size: 24, col: INK })
  label(x, 'DATE (30 min)', 0, -6, { size: 46, col: INK, font: INTER, weight: 900 })
  label(x, 'agenda attached ✓', 0, 50, { size: 26, col: '#5a5470', font: INTER, weight: 800 })
  x.restore()
}

const F = makeGlitch({
  id: 'klge10', sign: 'capricorn', len: 22, ending: 'cut',
  hook: 'CAPRICORN.EXE scheduled your date. *30 min.*', hookSize: 68,
  err: { msg: ['Work mode: ON.', 'Romance: in the agenda.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.6, 9.2]],
  hits: [{ kind: 'whip', at: 0.5, x: 560, y: 820, z: 0.35, hold: 0.5 }, { kind: 'glitch', at: 7.6, dur: 0.45 }, { kind: 'flash', at: SHUT, col: '#ffd98a' }],
  caps: [{ at: 3.0, out: 7.4, text: 'the glitch: *work mode* won’t switch off' }],
  errs: [{ at: 7.6, out: 9.2, msg: ['WORK MODE: STUCK ON.', 'Date: still waiting.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 9.3, out: 11.2, text: 'they wore the nice shirt!! *sob*', tears: 3 }],
  stars: [{ t: 11.35, text: 'one evening, laptop *closed.* the work will wait.' }],
  box: { close: 13.9 },
  patch: { at: 13.9, ver: '1.10', name: 'CLOSE THE LAPTOP TONIGHT', dur: 1.0, out: 15.6 },
  last: { at: 19.4, text: 'Clock out for *love.*' },
  scene, overlay, accent: '#1f8a6a',
  cues: [...NOTES.filter(n => n[0] > 0).map(n => ['pop', n[0], 1174.66, 0.035, 0.4]), ...[0, 1, 2].map(i => ['tick', +(SHUT + 0.35 + i * 0.25).toFixed(2), 0.06]), ['pop', 5.0, 659.25, 0.04, 0.3], ['pop', 5.8, 880, 0.04, -0.3], ['pop', 16.8, 783.99, 0.04, 0.3], ['bell', 17.2, 1318.51, 0.04, 1, 0]],
  music: { style: 'synthwave', key: 'Fm', seed: 1810, drop: 3.0, breakdown: [9.3], lift: [SHUT] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
