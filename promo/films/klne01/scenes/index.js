// klne01: LONG DISTANCE NOTES, "Good Morning, Recorded at Midnight" (22 s vertical, star_advice post, dreamy · Db).
// Kit: ../ldnkit.js (split screen, live clocks). No end card, no card cut. Hard cut on the last line.
// Toronto (EST, UTC−5) ↔ London (GMT): London is 5 hours ahead in November–December.
//   0.00  frame 0: Toronto 11:58 PM, ♋ Cancer mid-yawn in bed with a glowing phone; London 4:58 AM, ♑ Capricorn
//         asleep, a "missed call" toast mid-drop on its phone. "Your goodnight is | *their* good morning."
//   0.55  whip zoom, both clocks slam in · 1.0 "5 HOURS APART"
//   3.2   Cancer types "night!! miss y—" and deletes it: they're asleep. Pisces (the roommate) sniffles.
//   8.3   THE STARS: "can’t say goodnight live? leave a voice note for their *morning.*"
//  10.0   Cancer whispers a voice note; it flies across the seam (12.3).  13.6 the clocks jump 3 hours.
//  14.2   London 8 AM: Capricorn wakes, presses play, melts; records one back for Cancer's morning (17.2 → 18.4).
//  20.3   "Your night, | *their* morning."  Pisces fountains.
import { makeLDN, phone, card, fly, R, box, label, bubble, hearts, sparkles, GOLD, BONE, INK, INTER, pop01, prog, clamp } from '../ldnkit.js'

const T = { type: 3.2, del: 5.6, sad: 6.6, line: 8.3, rec: 10.0, send: 12.3, jump: 13.6, wake: 14.2, play: 15.0, back: 17.2, land: 18.4, cry: 18.6, last: 20.3 }
const wave = (x, cx, cy, t, n = 9, col = '#9fd0ff') => { for (let i = 0; i < n; i++) { const h = 10 + 26 * Math.abs(Math.sin(t * 9 + i * 1.3)); R(x, col, cx - n * 7 + i * 14, cy - h / 2, 8, h) } }
const voiceCard = (txt) => (x, px, py) => card(x, px, py, 220, 90, '#ffffff', { text: txt, size: 26, rot: -0.06 })

const EP = makeLDN({
  id: 'klne01', len: 22, ending: 'cut', music: { style: 'dreamy', key: 'Db', seed: 2321 },
  hook: 'Your goodnight is | *their* good morning.',
  L: { sign: 'cancer', city: 'Toronto', min0: 23 * 60 + 58 },
  R: { sign: 'capricorn', city: 'London', offset: 300 },
  jumps: [[T.jump, 180]],
  sets: [[0, 'room', 'room', { bedL: true, bedR: true, bedColL: '#c64a6a', bedColR: '#4a7a6a' }]],
  badgeAt: 0.6, gap: '5 HOURS APART', gapAt: 1.0, gapOut: [3.0, 3.2],
  lines: [{ t: T.line, text: 'can’t say goodnight live? leave a voice note for their *morning.*' }],
  boxes: [{ from: 0, to: 1, close: 12.6 }],
  pose(t, side) {
    if (side === 'L') {
      let mood = 'sleepy', look = [1, 0.4]
      if (t < 0.6) mood = 'wide'
      else if (t < T.del) { mood = 'happy'; look = [1, 0.5] }
      else if (t < T.line) { mood = 'neutral'; look = [0, 0.6] }
      else if (t < T.jump) { mood = 'sparkle'; look = [1, 0.3] }
      else if (t > T.land) { mood = 'happy'; look = [0, 0] }
      return { x: 240, y: 1135, s: 260, mood, look, hops: [T.rec, T.send, T.land + 0.05], squash: t < 0.6 ? -0.12 : 0,
        prop: (x, F) => { if (t < T.jump || t > T.land - 0.1) phone(x, F.ox + 150, F.oy - F.base - 30, { s: 0.55, rot: 0.15, glow: 1, lines: t > T.land ? ['▶ for your morning'] : t > T.type && t < T.del ? ['night!! miss y—'] : [] }) } }
    }
    let mood = 'sleepy', look = [0, 0]
    if (t > T.wake && t < T.wake + 0.5) mood = 'wide'
    else if (t > T.wake + 0.5 && t < T.play + 0.6) { mood = 'neutral'; look = [-1, 0.4] }
    else if (t > T.play + 0.6) { mood = 'heart'; look = [-1, 0] }
    if (t > T.back - 0.2 && t < T.land) mood = 'happy'
    return { x: 830, y: 1135, s: 250, mood, look, hops: [T.wake, T.play, T.back], prop: (x, F) => { if (t > T.wake) phone(x, F.ox - 150, F.oy - F.base - 30, { s: 0.55, rot: -0.15, glow: 1, lines: t > T.play ? ['▶ 0:12  good morning'] : ['1 voice note'] }) } }
  },
  pis: { side: 'L', x: 455, y: 1185, s: 120, look: [-1, 0.5], tears: t => (t > T.cry ? 3 : t > T.sad ? 2 : 1), mood: t => (t > T.cry ? 'happy' : 'wide'), hops: [T.cry, T.cry + 0.5] },
  draw(x, t, S) {
    // frame 0: a "missed call" toast mid-drop on London's side
    if (t < 1.4) { const k = Math.min(1, (t + 0.35) / 0.5); card(x, 810, 640 + (1 - k) * -160, 360, 90, '#ffffff', { text: 'missed call · Toronto', size: 26, alpha: 1 - prog(t, 1.0, 1.4) }) }
    // typing, then deleted
    bubble(x, t, 260, 760, T.type, T.del, 'night!! miss y—', { size: 34, tail: 0.2 })
    bubble(x, t, 260, 760, T.del, T.line - 0.2, '(deleted. they’re asleep.)', { size: 30, tail: 0.2, col: '#d9d4ea' })
    // the voice note
    if (t > T.rec && t < T.send) { bubble(x, t, 270, 800, T.rec, T.send, '“good morning, sleepy…”', { size: 32, tail: 0.3 }); wave(x, 270, 900, t); label(x, `● REC 0:${String(Math.min(12, Math.floor((t - T.rec) * 5))).padStart(2, '0')}`, 270, 960, { size: 28, col: '#ff6b81' }) }
    fly(x, t, T.send, T.send + 1.1, 330, 980, 760, 980, voiceCard('▶ 0:12'), 260)
    if (t > T.play && t < T.back) { wave(x, 820, 900, t, 9, GOLD); bubble(x, t, 810, 790, T.play, T.back, '“good morning, sleepy…”', { size: 30, tail: -0.2, col: '#ffe9a8' }) }
    hearts(x, t, T.play + 0.6, 830, 1000, { n: 6 })
    // and one back for Toronto's morning
    if (t > T.back - 0.6 && t < T.back) { wave(x, 820, 900, t, 9, '#ff6b81'); label(x, '● REC', 820, 960, { size: 28, col: '#ff6b81' }) }
    fly(x, t, T.back, T.land, 760, 980, 320, 980, voiceCard('▶ for your morning'), 240)
    sparkles(x, t, 300, 1000, T.land, 10, 140, 1)
  },
  last: { t: T.last, text: 'Your night, | *their* morning.', size: 92 },
  sections: { drop: 0.6, breakdown: [T.line], lift: [T.wake], outroAt: T.last + 0.5 },
  hits: [T.send, T.land],
})
export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = [...EP.CUES,
  ['whoosh', T.send, 0.5, 0.05], ['pop', T.send + 1.1, 1318.51, 0.05, 0.3], ['whoosh', T.back, 0.5, 0.05], ['pop', T.land, 1174.66, 0.05, -0.3],
  ['pop', T.del, 440, 0.04, -0.3], ['tick', T.del + 0.05, 0.03], ['bell', T.wake, 1760, 0.04, 0.8, 0.3], ['pop', T.play, 880, 0.05, 0.3],
  ['pluck', T.cry, 659.25, 0.035, 0.5, -0.3], ['pluck', T.cry + 0.14, 587.33, 0.035, 0.5, -0.3]]
export const MUSIC = EP.music
void [BONE, INK, INTER, pop01, clamp, box]
