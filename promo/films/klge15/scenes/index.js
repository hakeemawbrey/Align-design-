// klge15 · Your Sign's Love Glitch · "Aries.exe: Triple Text" (19 s vertical, star_advice post, loop).
//   0.0   frame 0: ARIES.EXE: no reply in 4 minutes. Aries mid-thumb-slam, messages stacking up the phone mid-pop,
//         the NO REPLY timer on 4:00. 0.5 whip onto the timer.
//   3.0   the glitch: reading silence as a no. "hey??", "helloooo", "ok i guess", "forget it lol"; NIKO's typing dots
//         appear… and vanish.   7.2 error: messages sent 9, replies 0.   8.8 Pisces pops out of the tray, crying.
//   10.7  THE STARS: "a slow reply isn't a *no.* they have a life."   13.1 patch 1.15 installs.
//   14.9  the phone goes face-down; Aries goes for a run (+40 min). Buzz: "sorry, was at the gym! dinner?"
//   17.0  last line "Let them *answer.*"   18.55 loop back into frame 0.
import { makeGlitch, R, box, label, phone, hearts, sparkles, sticker, ease, prog, clamp, lerp, pop01, outK, GOLD, BONE, PINK, RED, INK, MINT, INTER } from '../../klge01/scenes/glitchkit.js'

const DOWN = 14.9, BUZZ = 16.0
const CHAT = [
  { from: 'me', text: 'hey', at: -3 },
  { from: 'me', text: 'hey!!', at: -2 },
  { from: 'me', text: 'saw a dog that looks like you', at: -1 },
  { from: 'me', text: 'hey??', at: 3.2 },
  { from: 'me', text: 'helloooo', at: 4.0 },
  { from: 'me', text: 'ok i guess', at: 6.0 },
  { from: 'me', text: 'forget it lol', at: 6.6 },
  { from: 'NIKO', text: 'sorry, was at the gym! dinner?', at: BUZZ + 0.2 },
]

function scene(x, t, K) {
  const down = t >= DOWN
  R(x, '#1a1236', 70, 556, 940, 880); R(x, '#2a2048', 70, 1330, 940, 106)
  // the no-reply timer
  const secs = down ? 0 : t < 3 ? 240 : 240 + (t - 3) * 30
  if (!down) { box(x, 120, 620, 300, 90, RED, { b: 5 }); label(x, 'NO REPLY', 270, 646, { size: 22, col: BONE }); label(x, `${Math.floor(secs / 60)}:${String(Math.floor(secs % 60)).padStart(2, '0')}`, 270, 684, { size: 40, col: BONE, font: INTER, weight: 900 }) }
  else { const k = pop01(t, DOWN + 0.4, 0.3, 2.4); x.save(); x.translate(270, 665); x.scale(k, k); box(x, -150, -45, 300, 90, '#2f9a6e', { b: 5 }); label(x, '+40 MIN', 0, 2, { size: 40, col: BONE, font: INTER, weight: 900 }); x.restore() }
  if (!down) {
    phone(x, t, { cx: 760, cy: 1000, w: 400, h: 760, title: 'NIKO', lines: CHAT, typing: [5.0, 5.8], size: 30, rot: 0.03 + (t < 0.6 ? Math.sin(t * 60) * 0.02 : 0), clock: '7:12', accent: '#c4442a' })
    if (t > 5.8 && t < 6.6) label(x, '(typing stopped)', 760, 1400, { size: 22, col: '#ff9aa8', stroke: INK })
    // Aries slamming the thumb
    K.hero(x, t, 300, 1160, 270, { mood: t > 7.2 && t < 8.8 ? 'wide' : t < 3 ? 'wide' : 'squint', look: [1, 0], squash: Math.abs(Math.sin(t * 9)) * 0.1, hops: [3.2, 4.0, 6.0, 6.6] })
    for (let i = 0; i < 3; i++) { const p = ((t * 2.2 + i / 3) % 1); x.save(); x.globalAlpha = 1 - p; R(x, GOLD, 470 + p * 60, 1060 - i * 30 - p * 20, 30, 6); x.restore() }
  } else {
    // the phone, face down on the floor, buzzing at BUZZ; Aries out for a run then back
    const bz = t > BUZZ && t < BUZZ + 0.6 ? Math.sin(t * 80) * 6 : 0
    const pickup = ease.outCubic(prog(t, BUZZ + 0.1, BUZZ + 0.4))
    if (pickup < 1) { box(x, 680 + bz, 1290, 240, 40, '#2a2148', { b: 5 }); if (bz) label(x, 'bzzt', 800, 1250, { size: 30, col: GOLD, font: INTER, weight: 900 }) }
    if (pickup > 0) phone(x, t, { cx: 760, cy: 1000, w: 400, h: 760, title: 'NIKO', lines: CHAT, size: 30, rot: 0.03, clock: '7:52', accent: '#c4442a', k: pickup })
    const run = t < BUZZ ? (t - DOWN) : 0
    const ax = t < BUZZ ? 300 + Math.sin(run * 3) * 120 : 300
    K.hero(x, t, ax, 1180 - Math.abs(Math.sin(run * 12)) * 30, 260, { mood: t > BUZZ + 0.3 ? 'heart' : 'happy', look: [t < BUZZ ? Math.sign(Math.cos(run * 3)) : 1, 0], squash: t < BUZZ ? -0.08 : 0, hops: [BUZZ + 0.3] })
    // a sweatband
    if (t < BUZZ) { R(x, INK, ax - 60, 1090 - Math.abs(Math.sin(run * 12)) * 30, 120, 22); R(x, '#ff6f6f', ax - 56, 1094 - Math.abs(Math.sin(run * 12)) * 30, 112, 14) }
    if (t > BUZZ + 0.3) hearts(x, t, BUZZ + 0.3, 300, 1000, { n: 6 })
  }
}

const F = makeGlitch({
  id: 'klge15', sign: 'aries', len: 19, ending: 'loop',
  hook: 'ARIES.EXE: no reply in *4 minutes.*',
  err: { msg: ['Messages sent: 5.', 'Patience: 0%.'], out: 2.75 },
  notResp: [[-1, 2.7], [7.2, 8.7]],
  hits: [{ kind: 'whip', at: 0.5, x: 270, y: 680, z: 0.4, hold: 0.5 }, { kind: 'glitch', at: 7.2, dur: 0.45 }, { kind: 'flash', at: DOWN, col: MINT }],
  caps: [{ at: 3.0, out: 7.0, text: 'the glitch: reading silence as *a no*' }],
  errs: [{ at: 7.2, out: 8.7, msg: ['MESSAGES SENT: 9.', 'Replies: 0. Panic: max.'], buttons: ['OK'], cy: 1520 }],
  pis: [{ at: 8.8, out: 10.6, text: 'i double text too *sob*', tears: 3 }],
  stars: [{ t: 10.75, text: 'a slow reply isn’t a *no.* they have a life.' }],
  box: { close: 13.1 },
  patch: { at: 13.1, ver: '1.15', name: 'PUT THE PHONE DOWN', dur: 0.9, out: 14.8 },
  last: { at: 17.0, text: 'Let them *answer.*' },
  scene, accent: '#c4442a',
  cues: [...[3.2, 4.0, 6.0, 6.6].map(t => ['pop', t, 1046.5, 0.04, 0.3]), ['tom', DOWN + 0.2, 80, { gain: 0.2 }], ['chip', BUZZ, 110, 0.5, { wave: 'square', duty: 0.5, gain: 0.03, decay: 0.1, sustain: 0.8 }], ['bell', BUZZ + 0.3, 1318.51, 0.05, 1, 0]],
  music: { style: 'funk', key: 'Em', seed: 1815, drop: 3.0, breakdown: [8.8], lift: [DOWN] },
})
export const { DURATION, SCENES, CUES, MUSIC } = F
