// kbxe11: BEFORE YOU TEXT YOUR EX, Ep 11, "Midnight countdown, thumb on send" (22 s, star_advice post, cinematic · G).
// Series look: ../../kbxe01/bxkit.js (read-only). No end card: hard cut on the last line.
//   0.00   frame 0: Capricorn mid-gasp in a party crowd, a giant 0:10 countdown on the wall, thumb over SEND with "happy new
//          year. new start?", STOP mid-drop. Hook "Midnight countdown. Thumb on *send.*"
//   0.35   STOP slams, the countdown freezes ("ten seconds of *nostalgia.*")
//   5.4    the check: 1 Do I want them, or a fresh start? 2 Would I send this on any other night? 3 Who's next to me?
//   14.3   instead: the phone goes in the pocket; the countdown 3-2-1 (hookkit); Capricorn hugs Taurus and Virgo at
//          midnight under the confetti; Pisces sobs.  20.0 "New year. Not the old *number.*"
import {
  shortBX, countdown, roomParty, pisces, sign, R, bubble, sparkles, confetti, label, tag, glowAt,
  pop01, outK, prog, ease, clamp, lerp, INK, BONE, GOLD, INTER,
} from '../../kbxe01/bxkit.js'

const DRAFT = 'happy new year. new start?'
const OLD = [{ stamp: 'AUG 30' }, { side: 'R', text: 'i need some space' }, { side: 'L', text: 'ok. i understand' }]

function wallClock(x, t, txt, a = 1) {
  x.save(); x.globalAlpha *= a
  R(x, INK, 340, 520, 400, 150); R(x, '#120d26', 350, 530, 380, 130)
  x.font = `900 96px ${INTER}`; x.fillStyle = '#ff5a6a'; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillText(txt, 540, 600)
  x.restore()
}
function partyRoom(x, t, S, a = 1) {
  roomParty(x, t, { a })
  // the crowd's silhouettes at the back
  for (let i = 0; i < 7; i++) { x.save(); x.globalAlpha = 0.35 * a; x.fillStyle = '#0b0820'; x.beginPath(); x.arc(80 + i * 150, 1360 + (i % 2) * 20, 70, 0, Math.PI * 2); x.fill(); x.restore() }
}
function draftExtra(x, t, S) {
  if (t > S.T.C0 - 0.3) return
  const sec = t < 0.35 ? '0:10' : '0:10'
  wallClock(x, t, sec, 0.85)
}

function instead(x, t, S, I) {
  partyRoom(x, t, S)
  const u = t - I.I0
  // the countdown on the wall (3, 2, 1 → 0:00)
  const left = Math.max(0, 3 - Math.floor((u - 1.0) / 0.7))
  if (u < 1.0) wallClock(x, t, '0:04')
  else wallClock(x, t, `0:0${left}`)
  const mid = u > 3.8
  if (mid) { confetti(x, t, I.I0 + 3.8, 540, 700, { n: 40, life: 2.6 }); confetti(x, t, I.I0 + 4.3, 300, 760, { n: 30 }); sparkles(x, t, 540, 600, I.I0 + 3.8, 12, 260, 1, [GOLD, BONE, '#ff8fb1']) }
  // Capricorn pockets the phone, then the group hug
  const hug = ease.inOutCubic(prog(u, 3.6, 4.1))
  sign(x, t, 'taurus', { x: lerp(170, 330, hug), y: 1180, s: 210, mood: mid ? 'happy' : 'neutral', look: [1, 0], seed: 4, hops: [I.I0 + 3.9, I.I0 + 4.6] })
  sign(x, t, 'virgo', { x: lerp(910, 750, hug), y: 1180, s: 210, mood: mid ? 'happy' : 'neutral', look: [-1, 0], seed: 7, hops: [I.I0 + 3.95, I.I0 + 4.65] })
  sign(x, t, 'capricorn', { x: 540, y: 1150, s: 250, mood: u < 0.5 ? 'neutral' : mid ? 'sparkle' : 'happy', look: [0, -0.6], hops: [I.I0 + 0.4, I.I0 + 3.85, I.I0 + 4.5] })
  if (u < 0.8) { const p = ease.inCubic(prog(u, 0.1, 0.6)); x.save(); x.translate(640, lerp(1000, 1320, p)); x.rotate(p); R(x, INK, -34, -58, 68, 116); R(x, '#2b2350', -28, -52, 56, 104); x.restore() }
  if (u > 0.6 && u < 1.8) tag(x, 'PHONE: POCKET', 540, 900, { size: 24, bg: GOLD, k: pop01(t, I.I0 + 0.6, 0.3, 2) * outK(t, [I.I0 + 1.5, I.I0 + 1.8]) })
  pisces(x, t, { x: 960, y: 1430, s: 150, tears: 3, mood: mid ? 'happy' : 'sparkle', look: [-1, -0.6], role: 'SOBBING AT 0:00', pop: pop01(t, I.I0 + 0.3, 0.3, 2) })
  if (mid) bubble(x, t, 540, 900, I.I0 + 4.3, I.D + 1, 'HAPPY NEW YEAR, MY PEOPLE', { size: 32 })
  glowAt(x, 540, 900, 600, '255,214,150', mid ? 0.15 : 0.05)
}

const C0 = 14.3
const COUNT = { at: C0 + 1.0, from: 3, gap: 0.7, go: 'YAY!', y: 800, color: GOLD }

const EP = shortBX({
  id: 'kbxe11', sign: 'capricorn', duration: 22, ending: 'cut', DE: 5.2, QL: 3.0,
  hook: { text: 'Midnight countdown. | Thumb on *send.*', out: [4.9, 5.1], accentColor: '#ff5a6a' },
  rec: { sub: 'DEC 31 · 11:59:50 PM', caption: 'ten seconds of *nostalgia.*' },
  room: partyRoom, contact: 'Blake', sub: 'last seen in August', clock: '11:59 PM', draft: DRAFT, old: OLD, draftExtra,
  hero: { x: 175, y: 1240, s: 220, mood0: 'wide', mood: 'wide', look: [1, -0.6] },
  pisRole: 'PARTY GUEST',
  stars: ['Capricorn. we *paused* midnight.', 'you’ve got time. three questions.'],
  qs: [
    { q: 'Do I want them, or a fresh start?', a: '…a fresh start, honestly.', mood: 'squint' },
    { q: 'Would I send this on any other night?', a: 'no. that’s the confetti talking.', mood: 'neutral', look: [0, 1] },
    { q: 'Who’s next to me right now?', a: 'oh. everyone I love.', mood: 'sparkle' },
  ],
  head: 'Capricorn hugged | the *room.*',
  lines: [{ t: 4.6, text: 'start the year with who *stayed.*' }],
  instead,
  last: 'New year. | Not the old *number.*',
  kit: [[countdown, COUNT]],
  cues: I => [
    ['whoosh', I.I0 + 0.1, 0.5, 0.035], ['tick', I.I0 + 0.6, 0.05],
    ['glitter', I.I0 + 3.8, I.I0 + 4.8], ['crash', I.I0 + 3.8, { gain: 0.06, len: 2 }], ['clap', I.I0 + 4.0, { gain: 0.14 }], ['clap', I.I0 + 4.2, { gain: 0.14, pan: 0.3 }],
    ['pluck', I.I0 + 4.4, 659.25, 0.035, 0.5, 0.5], ['pluck', I.I0 + 4.54, 587.33, 0.035, 0.5, 0.5],
  ],
})

export const DURATION = EP.DURATION
export const SCENES = EP.SCENES
export const CUES = EP.CUES
void [label, clamp]
